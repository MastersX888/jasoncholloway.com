#!/usr/bin/env python3
"""
X bulk publish handoff — Jason approved 2026-07-31.
Creates AiQX7-only posts from v2 manifest + images; one slot at a time, logged.
Skips slots if live duplicate detected via syndication (non-empty tweet-result).
"""
from __future__ import annotations

import json
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content" / "social" / "CAPTION_MANIFEST.json"
LOG = ROOT / ".x-bulk-publish-log.json"
BASE = "https://api.outstand.so/v1"
X_ACCOUNT = "AiQX7"

# v2 x_facebook source posts (media + caption reference; FB already live)
V2_XFB = {
    1: "Jh6i6",
    2: "4nymj",
    3: "7PmTO",
    4: "ZA0Vm",
    5: "NTCsA",
    6: "8enPj",
    7: "HoaSC",
}

# Prior v2 publish tweet IDs — empty syndication = deleted, safe to republish
PRIOR_V2_TWEET_IDS = {
    1: "2082689862918905970",
    2: "2082689899325493522",
    3: "2082689938596712859",
    4: "2082689976718762082",
    5: "2082690017323778280",
    6: "2082690052233044274",
    7: "2082690088236912959",
}

ENV: dict[str, str] = {}
for p in [ROOT / ".env", ROOT / "groundswell-monitor" / "pipeline" / ".env"]:
    if p.exists():
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                ENV[k.strip()] = v.strip()

SESSION = requests.Session()
SESSION.verify = False
HEADERS = {"Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}", "Content-Type": "application/json"}


def tweet_live(tweet_id: str) -> bool:
    r = SESSION.get(f"https://cdn.syndication.twimg.com/tweet-result?id={tweet_id}", timeout=20)
    if r.status_code != 200:
        return False
    try:
        data = r.json()
    except Exception:
        return False
    return bool(data.get("text") or data.get("legacy", {}).get("full_text"))


def get_post(post_id: str) -> dict | None:
    r = SESSION.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=90)
    if r.status_code != 200:
        return None
    return r.json().get("post") or r.json().get("data")


def media_from_post(post: dict) -> list[dict]:
    out: list[dict] = []
    for c in post.get("containers") or []:
        for m in c.get("media") or []:
            if m.get("url"):
                out.append({"url": m["url"], "filename": m.get("filename") or "image.jpg"})
    return out[:1]


def create_x_post(content: str, media: list[dict]) -> tuple[int, dict]:
    body = {
        "containers": [{"content": content, "media": media}],
        "accounts": [X_ACCOUNT],
    }
    r = SESSION.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=90)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"raw": r.text[:500]}


def post_id_from(resp: dict) -> str | None:
    if resp.get("post", {}).get("id"):
        return resp["post"]["id"]
    if resp.get("data", {}).get("id"):
        return resp["data"]["id"]
    return resp.get("id")


def poll_post(post_id: str, attempts: int = 25, interval: float = 3.0) -> dict | None:
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


def run(dry_run: bool = False) -> list[dict]:
    slots = json.loads(MANIFEST.read_text(encoding="utf-8"))["slots"]
    results: list[dict] = []

    for slot in range(1, 8):
        row: dict = {"slot": slot, "source_post": V2_XFB[slot], "timestamp": datetime.now(timezone.utc).isoformat()}
        caption = slots[str(slot)]["x"]
        row["caption_preview"] = " ".join(caption.split())[:120]

        prior_id = PRIOR_V2_TWEET_IDS[slot]
        if tweet_live(prior_id):
            row.update({
                "success": False,
                "action": "skipped_duplicate",
                "reason": f"prior v2 tweet {prior_id} still live on X",
            })
            results.append(row)
            print(f"Slot {slot}: SKIP — prior tweet live")
            continue

        src = get_post(V2_XFB[slot])
        if not src:
            row.update({"success": False, "error": "source post not found"})
            results.append(row)
            print(f"Slot {slot}: FAIL — source missing")
            continue

        media = media_from_post(src)
        if not media:
            row.update({"success": False, "error": "no media on source post"})
            results.append(row)
            print(f"Slot {slot}: FAIL — no media")
            continue

        if dry_run:
            row.update({"success": True, "action": "dry_run", "media": media[0].get("filename")})
            results.append(row)
            print(f"Slot {slot}: DRY RUN OK")
            continue

        print(f"Slot {slot}: CREATE + publish...")
        sc, resp = create_x_post(caption, media)
        new_id = post_id_from(resp)
        row["create_status"] = sc
        row["post_id"] = new_id
        row["outstand_url"] = f"https://app.outstand.so/posts/{new_id}" if new_id else None

        if sc not in (200, 201) or not new_id:
            row.update({"success": False, "error": resp})
            results.append(row)
            print(f"  FAIL create: {sc}")
            time.sleep(2)
            continue

        outcome = poll_post(new_id)
        if not outcome:
            row.update({"success": False, "error": "poll timeout"})
            results.append(row)
            continue

        x_sa = next((a for a in outcome.get("socialAccounts") or [] if a.get("network") == "x"), None)
        row["publishedAt"] = outcome.get("publishedAt") or (x_sa or {}).get("publishedAt")
        row["x_status"] = (x_sa or {}).get("status")
        row["x_url"] = (x_sa or {}).get("platformPostUrl")
        row["x_error"] = (x_sa or {}).get("error")
        row["success"] = (x_sa or {}).get("status") == "published"

        if row["success"] and not row["x_url"] and (x_sa or {}).get("platformPostId"):
            row["x_url"] = f"https://x.com/i/status/{x_sa['platformPostId']}"

        results.append(row)
        status = "OK" if row["success"] else f"FAIL — {row.get('x_error')}"
        print(f"  -> {status} {row.get('x_url', '')}")
        time.sleep(90)

    return results


def main() -> int:
    dry = "--dry-run" in sys.argv
    results = run(dry_run=dry)
    LOG.write_text(json.dumps(results, indent=2, default=str), encoding="utf-8")
    ok = sum(1 for r in results if r.get("success"))
    skip = sum(1 for r in results if r.get("action") == "skipped_duplicate")
    print(f"\nDone: {ok} published, {skip} skipped, {len(results) - ok - skip} failed")
    print(f"Log: {LOG}")
    return 0 if ok + skip == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
