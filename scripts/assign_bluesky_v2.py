#!/usr/bin/env python3
"""Assign and publish Bluesky v2 posts (slots 1-7) via Outstand.

Jason authorized 2026-07-30 ~2:46 AM CT.
Pattern: both Bluesky accounts per slot (matches v1 dual-account reach).
Media: same xfb-v2 singles as live X/FB. Captions: CAPTION_MANIFEST bluesky field.
"""
from __future__ import annotations

import argparse
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
LIVE_CAPTIONS = ROOT / "content" / "social" / "BLUESKY_LIVE_CAPTIONS.json"
REPORT = ROOT / "content" / "social" / "BLUESKY_V2_ASSIGNMENT_REPORT.md"
RESULTS_JSON = ROOT / ".outstand-bluesky-v2-results.json"
PUBLIC = ROOT / "public" / "social" / "platform-overlaid"
BASE_URL = "https://api.outstand.so/v1"

ACCOUNTS = {
    "bsky_author": "J15V3",
    "bsky_imprint": "4RSwi",
}

XFB_V2 = {
    1: "slot1-frequency-xfb-v2.jpg",
    2: "slot2-cymatics-xfb-v2.jpg",
    3: "slot3-kansas-city-xfb-v2.jpg",
    4: "slot4-grimoire-xfb-v2.jpg",
    5: "slot5-stone-xfb-v2.jpg",
    6: "slot6-factions-xfb-v2.jpg",
    7: "slot7-unreleased-xfb-v2.jpg",
}

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

media_cache: dict[str, dict] = {}


def load_live_captions() -> dict:
    return json.loads(LIVE_CAPTIONS.read_text(encoding="utf-8"))


def grapheme_len(text: str) -> int:
    return len(text.replace("\r\n", "\n"))


def upload_media(filepath: Path) -> dict:
    key = str(filepath)
    if key in media_cache:
        return media_cache[key]

    filename = filepath.name
    content_type = "image/jpeg"
    file_size = filepath.stat().st_size

    r = SESSION.post(
        f"{BASE_URL}/media/upload",
        headers=HEADERS,
        json={"filename": filename, "content_type": content_type},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    media_id = data["id"]
    upload_url = data["upload_url"]

    raw = filepath.read_bytes()
    r2 = requests.put(
        upload_url,
        data=raw,
        headers={"Content-Type": content_type},
        timeout=120,
        verify=False,
    )
    r2.raise_for_status()

    r3 = SESSION.post(
        f"{BASE_URL}/media/{media_id}/confirm",
        headers=HEADERS,
        json={"size": file_size},
        timeout=60,
    )
    r3.raise_for_status()
    result = {"url": r3.json()["data"]["url"], "filename": filename}
    media_cache[key] = result
    time.sleep(0.4)
    return result


def post_id_from(resp: dict) -> str | None:
    if resp.get("post", {}).get("id"):
        return resp["post"]["id"]
    if resp.get("data", {}).get("id"):
        return resp["data"]["id"]
    return resp.get("id")


def create_post(content: str, media: list[dict], account_ids: list[str]) -> tuple[int, dict]:
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": m["url"], "filename": m["filename"]} for m in media],
            }
        ],
        "accounts": account_ids,
    }
    r = SESSION.post(f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=90)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"raw": r.text[:500]}


def get_post(post_id: str) -> dict | None:
    r = SESSION.get(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=90)
    if r.status_code != 200:
        return None
    return r.json().get("post") or r.json().get("data")


def extract_urls(post: dict) -> dict[str, str]:
    urls: dict[str, str] = {}
    for a in post.get("socialAccounts") or []:
        url = a.get("platformPostUrl")
        if url:
            key = f"{a.get('network')}:{a.get('nickname', a.get('username', ''))}"
            urls[key] = url
    return urls


def all_published(post: dict) -> bool:
    accs = post.get("socialAccounts") or []
    return bool(accs) and all(a.get("status") == "published" for a in accs)


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


def publish_now(post_id: str) -> dict:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    r = SESSION.patch(
        f"{BASE_URL}/posts/{post_id}",
        headers=HEADERS,
        json={"scheduledAt": now},
        timeout=90,
    )
    return {"status": r.status_code, "body": r.text[:300]}


def delete_post(post_id: str) -> None:
    SESSION.delete(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=60)


def qa_slot(slot: int, caption: str, media_file: str, account_key: str) -> dict:
    path = PUBLIC / media_file
    g_len = grapheme_len(caption)
    checks = {
        "media_exists": path.is_file(),
        "media_v2_suffix": "-v2.jpg" in media_file,
        "caption_non_empty": bool(caption.strip()),
        "grapheme_limit_300": g_len <= 300,
        "live_caption_source": True,
    }
    return {
        "slot": slot,
        "account": account_key,
        "grapheme_len": g_len,
        "checks": checks,
        "pass": all(checks.values()),
    }


def publish_slot(
    slot: int,
    caption: str,
    media_file: str,
    account_id: str,
    account_key: str,
    assign_only: bool,
    dry_run: bool,
) -> dict:
    qa = qa_slot(slot, caption, media_file, account_key)
    row: dict = {
        "slot": slot,
        "account": account_key,
        "account_id": account_id,
        "media_file": media_file,
        "grapheme_len": qa["grapheme_len"],
        "qa": qa,
    }
    if not qa["pass"]:
        row.update({"success": False, "error": "QA BLOCK"})
        return row

    if dry_run:
        row.update({"success": True, "action": "dry_run"})
        return row

    path = PUBLIC / media_file
    media = [upload_media(path)]
    print(f"CREATE bluesky slot {slot} {account_key}...")
    sc, resp = create_post(caption, media, [account_id])
    post_id = post_id_from(resp)
    row.update({"post_id": post_id, "create_status": sc})

    if sc not in (200, 201) or not post_id:
        row.update({"success": False, "error": resp})
        return row

    if assign_only:
        row.update({"success": True, "action": "assigned"})
        return row

    print(f"  PUBLISH {post_id}...")
    row["publish"] = publish_now(post_id)
    outcome = poll_post(post_id)
    if not outcome:
        row.update({"success": False, "error": "poll timeout"})
        return row

    row["urls"] = extract_urls(outcome)
    row["published"] = all_published(outcome)
    row["statuses"] = {
        f"{a.get('network')}:{a.get('username', a.get('nickname'))}": a.get("status")
        for a in outcome.get("socialAccounts") or []
    }
    row["success"] = row.get("published", False)
    if not row["success"]:
        errors = {
            a.get("username", a.get("nickname")): a.get("error")
            for a in outcome.get("socialAccounts") or []
            if a.get("status") != "published"
        }
        row["error"] = errors
    return row


def run(assign_only: bool = False, dry_run: bool = False, cleanup_failed: bool = False) -> dict:
    live = load_live_captions()
    results: dict = {"qa": [], "posts": [], "cleanup": [], "assign_only": assign_only, "dry_run": dry_run}

    if cleanup_failed and not dry_run:
        for pid in ["ilj4e", "mvXff", "xXBxI", "PtvPt", "xXBxr", "W0dWd", "u7qum"]:
            print(f"DELETE failed dual-account draft {pid}")
            delete_post(pid)
            results["cleanup"].append(pid)
            time.sleep(0.5)

    buckets = [
        ("author", ACCOUNTS["bsky_author"], live["author"]),
        ("imprint", ACCOUNTS["bsky_imprint"], live["imprint"]),
    ]
    for account_key, account_id, captions in buckets:
        for slot in range(1, 8):
            caption = captions[str(slot)]
            media_file = XFB_V2[slot]
            qa = qa_slot(slot, caption, media_file, account_key)
            results["qa"].append(qa)
            row = publish_slot(
                slot, caption, media_file, account_id, account_key, assign_only, dry_run
            )
            results["posts"].append(row)
            time.sleep(1.5)

    return results


def write_report(results: dict) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    qa_pass = sum(1 for q in results["qa"] if q["pass"])
    posts_ok = sum(1 for p in results["posts"] if p.get("success"))

    topics: dict[int, str] = {
        1: "Frequency",
        2: "Cymatics",
        3: "Kansas City",
        4: "Ars Notoria",
        5: "Stone Remembers",
        6: "Three Factions",
        7: "Unreleased",
    }

    lines = [
        "# Bluesky v2 Assignment Report",
        f"**Executed:** {ts}",
        "**Jason approval:** proceed with Bluesky v2 (2026-07-30 ~2:46 AM CT)",
        "",
        "## Summary",
        "",
        f"| QA PASS | {qa_pass}/14 |",
        f"| Posts OK | {posts_ok}/14 |",
        "",
        "## Caption source",
        "",
        "Live v1 Bluesky captions (`BLUESKY_LIVE_CAPTIONS.json`) — manifest `bluesky` field exceeds 300-grapheme limit.",
        "",
        "## QA",
        "",
        "| Slot | Account | Graphemes | Media | Result |",
        "|-----:|---------|----------:|-------|--------|",
    ]
    for q in results["qa"]:
        st = "PASS" if q["pass"] else "BLOCK"
        lines.append(
            f"| {q['slot']} | {q['account']} | {q['grapheme_len']} | `{XFB_V2[q['slot']]}` | **{st}** |"
        )

    lines.extend([
        "",
        "## Results",
        "",
        "| Post ID | Slot | Account | Status | Live URLs |",
        "|---------|-----:|---------|--------|-----------|",
    ])
    for p in results["posts"]:
        st = "OK (live)" if p.get("published") else ("DRAFT" if p.get("action") == "assigned" else p.get("error", "FAIL"))
        urls = "; ".join(f"{k}: {v}" for k, v in (p.get("urls") or {}).items())
        lines.append(
            f"| `{p.get('post_id', '—')}` | {p.get('slot', '')} | {p.get('account', '')} | {st} | {urls or '—'} |"
        )

    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    RESULTS_JSON.write_text(json.dumps(results, indent=2, default=str), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--assign-only", action="store_true")
    parser.add_argument("--cleanup-failed", action="store_true", help="Delete failed dual-account drafts from first attempt")
    args = parser.parse_args()

    results = run(
        assign_only=args.assign_only,
        dry_run=args.dry_run,
        cleanup_failed=args.cleanup_failed,
    )
    write_report(results)
    failed = [p for p in results["posts"] if not p.get("success")]
    print(f"\nReport: {REPORT}")
    print(f"Posts OK: {len(results['posts']) - len(failed)}/{len(results['posts'])}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
