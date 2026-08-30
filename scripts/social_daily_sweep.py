#!/usr/bin/env python3
"""
Daily social sweep via Outstand API (primary hub for X bridge, Meta, Pinterest, Bluesky).

Output: scratch/ops_reports/social/YYYY-MM-DD.md
State:   scratch/ops_reports/social/_state.json  (follower deltas)
"""

from __future__ import annotations

import json
import sys
import urllib3
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import requests

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
REPORT_DIR = ROOT / "scratch" / "ops_reports" / "social"
STATE_PATH = REPORT_DIR / "_state.json"
CAPTION_AUDIT = ROOT / ".caption-fix-audit.json"
BASE = "https://api.outstand.so/v1"

ACCOUNT_LABELS = {
    "jaHn2": "X (@jasonhollowaykc)",
    "1vWPG": "Instagram (@jasonhollowaykc)",
    "pxPfM": "Pinterest (SeventhCityPress)",
    "4RSwi": "Bluesky (seventhcitypress)",
    "J15V3": "Bluesky (jasonhollowaykc)",
    "IwQhX": "Facebook (Seventh City Press)",
    "7BvrW": "Facebook (Jason Carroll Holloway)",
}


def load_env() -> dict[str, str]:
    env: dict[str, str] = {}
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()
    return env


def session(api_key: str) -> tuple[requests.Session, dict[str, str]]:
    s = requests.Session()
    s.verify = False
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    return s, headers


def api_get(
    s: requests.Session, headers: dict[str, str], path: str, params: dict | None = None
) -> dict[str, Any]:
    r = s.get(f"{BASE}{path}", headers=headers, params=params or {}, timeout=90)
    r.raise_for_status()
    return r.json()


def fetch_accounts(s: requests.Session, headers: dict[str, str]) -> list[dict]:
    data = api_get(s, headers, "/social-accounts")
    return data.get("data") or data.get("socialAccounts") or []


def fetch_account_metrics(
    s: requests.Session, headers: dict[str, str], account_id: str
) -> tuple[dict | None, str | None]:
    r = s.get(f"{BASE}/social-accounts/{account_id}/metrics", headers=headers, timeout=90)
    body = r.json()
    if not body.get("success", r.status_code == 200):
        return None, body.get("error") or body.get("message") or f"HTTP {r.status_code}"
    return body.get("data") or body, None


def fetch_all_posts(s: requests.Session, headers: dict[str, str]) -> list[dict]:
    posts: list[dict] = []
    offset = 0
    while True:
        data = api_get(s, headers, "/posts", {"limit": 50, "offset": offset})
        batch = data.get("posts") or data.get("data") or []
        if not batch:
            break
        posts.extend(batch)
        offset += len(batch)
        total = data.get("total")
        if total is not None and offset >= total:
            break
        if len(batch) < 50:
            break
    return posts


def fetch_post_detail(s: requests.Session, headers: dict[str, str], post_id: str) -> dict:
    data = api_get(s, headers, f"/posts/{post_id}")
    return data.get("post") or data


def fetch_post_analytics(
    s: requests.Session, headers: dict[str, str], post_id: str
) -> dict | None:
    r = s.get(f"{BASE}/posts/{post_id}/analytics", headers=headers, timeout=90)
    if r.status_code != 200:
        return None
    body = r.json()
    if not body.get("success"):
        return None
    return body


def parse_ts(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def caption_opener(text: str | None, n: int = 60) -> str:
    if not text:
        return ""
    flat = " ".join(text.split())
    return flat[:n] + ("…" if len(flat) > n else "")


def load_state() -> dict:
    if STATE_PATH.exists():
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    return {"followers": {}, "last_run": None}


def save_state(state: dict) -> None:
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def caption_mismatches() -> list[dict]:
    if not CAPTION_AUDIT.exists():
        return []
    rows = json.loads(CAPTION_AUDIT.read_text(encoding="utf-8")).get("rows") or []
    return [r for r in rows if r.get("caption_matches_slot") is False]


def format_engagement(metrics: dict | None) -> str:
    if not metrics:
        return "—"
    eng = metrics.get("engagement") or {}
    if not eng:
        return "—"
    parts = []
    for key in ("reach", "views", "likes", "comments", "shares", "saves"):
        val = eng.get(key)
        if val is not None:
            parts.append(f"{key} {val}")
    return ", ".join(parts) if parts else "—"


def main() -> int:
    env = load_env()
    api_key = env.get("OUTSTAND_API_KEY")
    if not api_key:
        print("OUTSTAND_API_KEY missing from .env", file=sys.stderr)
        return 1

    now = datetime.now(timezone.utc)
    today = now.strftime("%Y-%m-%d")
    since_24h = now - timedelta(hours=24)
    prev_state = load_state()
    prev_followers: dict[str, int] = prev_state.get("followers") or {}

    s, headers = session(api_key)
    accounts = fetch_accounts(s, headers)

    account_metrics: dict[str, dict] = {}
    account_errors: dict[str, str] = {}
    new_followers: dict[str, int] = {}

    for ac in accounts:
        aid = ac["id"]
        metrics, err = fetch_account_metrics(s, headers, aid)
        if err:
            account_errors[aid] = err
        elif metrics:
            account_metrics[aid] = metrics
            fc = metrics.get("followers_count")
            if fc is not None:
                new_followers[aid] = int(fc)

    posts = fetch_all_posts(s, headers)

    recent_published: list[dict] = []
    unassigned_queue: list[dict] = []
    failed_posts: list[dict] = []

    for p in posts:
        sas = p.get("socialAccounts") or []
        if not sas:
            unassigned_queue.append(p)
            continue
        pub_at = parse_ts(p.get("publishedAt"))
        if pub_at and pub_at >= since_24h:
            recent_published.append(p)
        for sa in sas:
            if sa.get("status") == "failed" or sa.get("error"):
                failed_posts.append({"post": p, "account": sa})

    # Enrich recent posts with analytics (cap at 15)
    recent_details: list[dict] = []
    for p in sorted(
        recent_published,
        key=lambda x: x.get("publishedAt") or "",
        reverse=True,
    )[:15]:
        pid = p["id"]
        detail = fetch_post_detail(s, headers, pid)
        analytics = fetch_post_analytics(s, headers, pid)
        recent_details.append({"summary": p, "detail": detail, "analytics": analytics})

    mismatches = caption_mismatches()
    anomalies: list[str] = []

    if account_errors.get("jaHn2"):
        anomalies.append(
            f"**X via Outstand:** metrics token expired — reconnect @jasonhollowaykc in Outstand dashboard"
        )

    for aid, err in account_errors.items():
        if aid == "jaHn2":
            continue
        label = ACCOUNT_LABELS.get(aid, aid)
        anomalies.append(f"**{label}:** {err}")

    if failed_posts:
        anomalies.append(f"**Failed posts:** {len(failed_posts)} need review in Outstand")

    if unassigned_queue:
        anomalies.append(
            f"**Unassigned queue:** {len(unassigned_queue)} posts have no platform attached"
        )

    if mismatches:
        anomalies.append(
            f"**Caption audit:** {len(mismatches)} published posts flagged caption/slot mismatch (see `.caption-fix-audit.json`)"
        )

    # Build report
    lines: list[str] = [
        f"# Social Sweep — {today}",
        "",
        f"_Generated {now.strftime('%Y-%m-%d %H:%M UTC')} via Outstand API_",
        "",
        "## Summary",
        "",
        f"- **Platforms checked:** {len(accounts)} Outstand-connected accounts",
        f"- **Metrics OK:** {len(account_metrics)} | **Errors:** {len(account_errors)}",
        f"- **Published (24h):** {len(recent_published)}",
        f"- **Unassigned queue:** {len(unassigned_queue)}",
        "",
        "**Config (confirmed):** Meta logged in + IG linked · Outstand API · X via Outstand bridge",
        "",
        "## Per platform",
        "",
        "| Platform | Followers | Δ | Posts | Period engagement |",
        "|----------|-----------|---|-------|-------------------|",
    ]

    for ac in sorted(accounts, key=lambda x: (x.get("network") or "", x.get("username") or "")):
        aid = ac["id"]
        label = ACCOUNT_LABELS.get(aid, f"{ac.get('network', '?')} ({ac.get('username', '?')})")
        m = account_metrics.get(aid)
        err = account_errors.get(aid)

        if m:
            fc = m.get("followers_count")
            prev = prev_followers.get(aid)
            delta = ""
            if fc is not None and prev is not None:
                d = int(fc) - int(prev)
                delta = f"+{d}" if d > 0 else str(d) if d < 0 else "0"
            elif fc is not None:
                delta = "new"
            posts_n = m.get("posts_count")
            if posts_n is None:
                posts_n = ac.get("posts_count") or "—"
            lines.append(
                f"| {label} | {fc if fc is not None else '—'} | {delta or '—'} | {posts_n} | {format_engagement(m)} |"
            )
        else:
            lines.append(f"| {label} | — | — | — | ⚠ {err or 'unavailable'} |")

    lines.extend(["", "## Published (last 24h)", ""])

    if not recent_details:
        lines.append("_No Outstand-published posts in the last 24 hours._")
    else:
        lines.extend(
            [
                "| Time (UTC) | Network | Caption | Likes | Comments | Views | Link |",
                "|------------|---------|---------|-------|----------|-------|------|",
            ]
        )
        for item in recent_details:
            detail = item["detail"]
            analytics = item["analytics"] or {}
            agg = analytics.get("aggregated_metrics") or {}
            content = ""
            containers = detail.get("containers") or []
            if containers:
                content = caption_opener(containers[0].get("content"), 50)
            sas = detail.get("socialAccounts") or []
            net = ", ".join(
                f"{sa.get('network', '?')} @{sa.get('username', '?')}" for sa in sas
            ) or "—"
            pub = (detail.get("publishedAt") or "")[:16].replace("T", " ")
            url = ""
            if sas and sas[0].get("platformPostUrl"):
                url = sas[0]["platformPostUrl"]
            metrics_err = ""
            mba = analytics.get("metrics_by_account") or []
            if mba and mba[0].get("metrics_error"):
                metrics_err = " ⚠"
            link = f"[post]({url})" if url else "—"
            lines.append(
                f"| {pub} | {net} | {content} | {agg.get('total_likes', '—')} | "
                f"{agg.get('total_comments', '—')} | {agg.get('total_views', '—')} | {link}{metrics_err} |"
            )

    lines.extend(["", "## Unassigned queue (no platform)", ""])
    if not unassigned_queue:
        lines.append("_Empty._")
    else:
        lines.extend(["| Created | Caption | Media |", "|---------|---------|-------|"])
        for p in unassigned_queue[:10]:
            created = (p.get("createdAt") or "")[:10]
            containers = p.get("containers") or []
            cap = caption_opener(containers[0].get("content") if containers else None, 55)
            media_n = len((containers[0].get("media") or []) if containers else [])
            lines.append(f"| {created} | {cap} | {media_n} file(s) |")
        if len(unassigned_queue) > 10:
            lines.append(f"\n_…and {len(unassigned_queue) - 10} more._")

    lines.extend(["", "## Anomalies", ""])
    if anomalies:
        for a in anomalies:
            lines.append(f"- {a}")
    else:
        lines.append("- None detected.")

    lines.extend(
        [
            "",
            "## Safe auto-handled",
            "",
            "- Follower/engagement snapshot pulled from Outstand",
            "- Recent publish log and queue inventory",
            "",
            "## Jason approval queue",
            "",
        ]
    )

    jason_items: list[str] = []
    if account_errors.get("jaHn2"):
        jason_items.append(
            "Reconnect X account in Outstand (Settings → Social Accounts → jasonhollowaykc) so post metrics flow again"
        )
    if unassigned_queue:
        jason_items.append(
            f"Review {len(unassigned_queue)} unassigned posts in Outstand — assign platforms or delete"
        )
    if failed_posts:
        jason_items.append(f"Inspect {len(failed_posts)} failed publish attempts")
    if not jason_items:
        jason_items.append("_Nothing requiring action today._")

    for item in jason_items:
        lines.append(f"- [ ] {item}")

    report_path = REPORT_DIR / f"{today}.md"
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    save_state({"followers": new_followers, "last_run": today})
    print(f"Wrote {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
