#!/usr/bin/env python3
"""Publish all assigned v2 Outstand drafts (Jason approved 2026-07-30)."""
from __future__ import annotations

import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content" / "social" / "CAPTION_MANIFEST.json"
REPORT = ROOT / "content" / "social" / "OUTSTAND_V2_PUBLISH_REPORT.md"
RESULTS_JSON = ROOT / ".outstand-v2-publish-results.json"
BASE_URL = "https://api.outstand.so/v1"

# Canonical v2 post IDs (PREVIEW_MANIFEST.json)
POSTS = {
    "instagram": ["FEPVh", "gIiz1", "Oxr7T", "ySUef", "TpuHk", "BK2vq", "mvXEE"],
    "x_facebook": ["Jh6i6", "4nymj", "7PmTO", "ZA0Vm", "NTCsA", "8enPj", "HoaSC"],
    "pinterest": ["Irl0J", "ySUIq", "cNGhW", "Q2hIc", "lQJgD", "ei9tY", "CuzcX"],
}

# Same board as all v1 Outstand Pinterest publishes
PINTEREST_BOARD_ID = "1110700395541688804"

ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

SESSION = requests.Session()
SESSION.verify = False
HEADERS = {
    "Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}",
    "Content-Type": "application/json",
}


def load_slot_links() -> dict[int, str]:
    slots = json.loads(MANIFEST.read_text(encoding="utf-8"))["slots"]
    return {int(k): v["blog"] for k, v in slots.items()}


def get_post(post_id: str) -> dict | None:
    r = SESSION.get(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=90)
    if r.status_code != 200:
        return None
    return r.json().get("post") or r.json().get("data")


def all_accounts_published(post: dict) -> bool:
    accs = post.get("socialAccounts") or []
    return bool(accs) and all(a.get("status") == "published" for a in accs)


def extract_urls(post: dict) -> dict[str, str]:
    urls: dict[str, str] = {}
    for a in post.get("socialAccounts") or []:
        net = a.get("network", "unknown")
        url = a.get("platformPostUrl")
        if not url and a.get("platformPostId") and net == "x":
            url = f"https://x.com/i/status/{a['platformPostId']}"
        if url:
            key = f"{net}:{a.get('nickname', a.get('username', ''))}"
            urls[key] = url
    return urls


def extract_statuses(post: dict) -> dict[str, str]:
    out: dict[str, str] = {}
    for a in post.get("socialAccounts") or []:
        key = f"{a.get('network')}:{a.get('nickname', a.get('username', ''))}"
        out[key] = a.get("status", "?")
    return out


def poll_post(post_id: str, attempts: int = 20, interval: float = 3.0) -> dict | None:
    for _ in range(attempts):
        post = get_post(post_id)
        if not post:
            time.sleep(interval)
            continue
        accs = post.get("socialAccounts") or []
        if not accs:
            time.sleep(interval)
            continue
        if all(a.get("status") in ("published", "failed") for a in accs):
            return post
        time.sleep(interval)
    return get_post(post_id)


def publish_pinterest(post_id: str, link: str, slot: int) -> dict:
    """PATCH board_id + link, then schedule now."""
    row: dict = {"post_id": post_id, "bucket": "pinterest", "slot": slot}

    post = get_post(post_id)
    if not post:
        row.update({"success": False, "error": "post not found"})
        return row

    if all_accounts_published(post):
        row.update({
            "success": True,
            "action": "already_published",
            "statuses": extract_statuses(post),
            "urls": extract_urls(post),
            "publishedAt": post.get("publishedAt"),
        })
        return row

    title_map = {
        1: "The Frequency That Was Already There",
        2: "Sound Into Form: Hans Jenny and Cymatics",
        3: "Why Kansas City?",
        4: "The Grimoire That Was a Study Aid",
        5: "The Stone Remembers",
        6: "Three Factions, One Declassified Document",
        7: "A Document That Cannot Be Un-Released",
    }

    pinterest_cfg = {
        "board_id": PINTEREST_BOARD_ID,
        "link": link,
        "title": title_map.get(slot, f"Masters X Field Note — Slot {slot}"),
    }

    print(f"  PATCH pinterest config for {post_id} slot {slot}...")
    r = SESSION.patch(
        f"{BASE_URL}/posts/{post_id}",
        headers=HEADERS,
        json={"pinterest": pinterest_cfg},
        timeout=90,
    )
    if r.status_code not in (200, 201):
        row.update({"success": False, "error": f"PATCH pinterest failed ({r.status_code})", "response": r.text[:300]})
        return row

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    print(f"  PATCH scheduledAt=now...")
    r2 = SESSION.patch(
        f"{BASE_URL}/posts/{post_id}",
        headers=HEADERS,
        json={"scheduledAt": now},
        timeout=90,
    )
    if r2.status_code not in (200, 201):
        row.update({"success": False, "error": f"PATCH schedule failed ({r2.status_code})", "response": r2.text[:300]})
        return row

    print(f"  polling...")
    outcome = poll_post(post_id)
    if not outcome:
        row.update({"success": False, "error": "poll timeout"})
        return row

    row["statuses"] = extract_statuses(outcome)
    row["urls"] = extract_urls(outcome)
    row["publishedAt"] = outcome.get("publishedAt")
    row["success"] = all_accounts_published(outcome)
    if not row["success"]:
        errors = {
            f"{a.get('network')}:{a.get('nickname')}": a.get("error") or a.get("status")
            for a in outcome.get("socialAccounts") or []
            if a.get("status") != "published"
        }
        row["errors"] = errors
        # One retry if failed
        if any(a.get("status") == "failed" for a in outcome.get("socialAccounts") or []):
            print(f"  retry once...")
            time.sleep(2)
            r3 = SESSION.patch(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, json={"scheduledAt": now}, timeout=90)
            outcome2 = poll_post(post_id, attempts=15)
            if outcome2:
                row["statuses"] = extract_statuses(outcome2)
                row["urls"] = extract_urls(outcome2)
                row["publishedAt"] = outcome2.get("publishedAt")
                row["success"] = all_accounts_published(outcome2)
                row["retry_status"] = r3.status_code
    return row


def audit_post(post_id: str, bucket: str, slot: int) -> dict:
    """Record status for already-published posts."""
    post = get_post(post_id)
    if not post:
        return {"post_id": post_id, "bucket": bucket, "slot": slot, "success": False, "error": "not found"}

    row = {
        "post_id": post_id,
        "bucket": bucket,
        "slot": slot,
        "statuses": extract_statuses(post),
        "urls": extract_urls(post),
        "publishedAt": post.get("publishedAt"),
    }
    row["success"] = all_accounts_published(post)
    if row["success"]:
        row["action"] = "already_published"
    else:
        failed = [a for a in post.get("socialAccounts") or [] if a.get("status") == "failed"]
        row["errors"] = {f"{a.get('network')}:{a.get('nickname')}": a.get("error") for a in failed}
    return row


def run() -> list[dict]:
    links = load_slot_links()
    results: list[dict] = []

    for bucket, ids in POSTS.items():
        for idx, pid in enumerate(ids):
            slot = idx + 1
            print(f"\n[{bucket}] {pid} slot {slot}")

            if bucket == "pinterest":
                row = publish_pinterest(pid, links[slot], slot)
            else:
                row = audit_post(pid, bucket, slot)

            results.append(row)
            st = "OK" if row.get("success") else "FAIL"
            print(f"  -> {st}")
            time.sleep(1.0)

    return results


def write_report(results: list[dict]) -> None:
    ok = sum(1 for r in results if r.get("success"))
    fail = len(results) - ok
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    lines = [
        "# Outstand v2 Publish Report",
        f"**Executed:** {ts}",
        "**Jason approval:** publish all v2 (2026-07-30 evening)",
        "",
        "## Summary",
        "",
        "| Metric | Count |",
        "|--------|------:|",
        f"| Total posts | {len(results)} |",
        f"| Published OK | {ok} |",
        f"| Failed / partial | {fail} |",
        "",
        "### By bucket",
        "",
        "| Bucket | OK | Total |",
        "|--------|---:|------:|",
    ]

    for bucket in ("instagram", "x_facebook", "pinterest"):
        rows = [r for r in results if r["bucket"] == bucket]
        bok = sum(1 for r in rows if r.get("success"))
        lines.append(f"| {bucket} | {bok} | {len(rows)} |")

    lines.extend([
        "",
        "## Publish method",
        "",
        "- **IG / X / FB:** Published via Outstand immediate publish (accounts set at creation)",
        "- **Pinterest:** PATCH `pinterest.board_id` + `link`, then PATCH `scheduledAt=now`",
        f"- **Pinterest board:** `{PINTEREST_BOARD_ID}` (Literary Conspiracy Thrillers — same as v1)",
        "",
        "## Results",
        "",
        "| Post ID | Bucket | Slot | Status | URLs |",
        "|---------|--------|-----:|--------|------|",
    ])

    for r in results:
        st = "OK" if r.get("success") else "FAIL"
        if r.get("action") == "already_published":
            st = "OK (live)"
        urls = "; ".join(f"{k}: {v}" for k, v in (r.get("urls") or {}).items())
        if not r.get("success"):
            err = r.get("error") or str(r.get("errors", ""))[:80]
            st = f"FAIL — {err}"
        lines.append(f"| `{r['post_id']}` | {r['bucket']} | {r['slot']} | {st} | {urls or '—'} |")

    failures = [r for r in results if not r.get("success")]
    lines.extend(["", "## Failures", ""])
    if failures:
        for r in failures:
            lines.append(f"- `{r['post_id']}` ({r['bucket']} slot {r['slot']}): {r.get('error') or r.get('errors')}")
    else:
        lines.append("None — all 21 posts live.")

    lines.extend([
        "",
        "## Policy",
        "",
        "v1 live posts untouched (edit-first). v2 are new publishes.",
        "Bluesky not in scope this pass.",
        "",
    ])

    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    RESULTS_JSON.write_text(json.dumps(results, indent=2, default=str), encoding="utf-8")


def main() -> int:
    results = run()
    write_report(results)
    ok = sum(1 for r in results if r.get("success"))
    print(f"\n{'='*60}")
    print(f"PUBLISH COMPLETE: {ok}/{len(results)} OK")
    print(f"Report: {REPORT}")
    return 0 if ok == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
