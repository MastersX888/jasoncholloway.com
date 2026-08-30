#!/usr/bin/env python3
"""Query Outstand live API for FB Author posts and slots needing image fix."""
import json
import re
from pathlib import Path

import requests

ROOT = Path(r"c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
KEY = None
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    if line.startswith("OUTSTAND_API_KEY="):
        KEY = line.split("=", 1)[1].strip()
        break

if not KEY:
    raise SystemExit("OUTSTAND_API_KEY not found")

H = {"Authorization": f"Bearer {KEY}"}
r = requests.get("https://api.outstand.so/v1/posts?limit=100", headers=H, timeout=60)
print("HTTP", r.status_code)
data = r.json()
posts = data.get("posts") or data.get("data") or []

deleted = [
    "QKLly",
    "VctaN",
    "aVmMb",
    "niDJl",
    "X8s2e",
    "FMXgZ",
]
still = [x for x in deleted if any(p["id"] == x for p in posts)]
print("Deleted text-only IDs still in API:", still or "none")

fb = []
for p in posts:
    for sa in p.get("socialAccounts", []):
        if sa.get("id") != "7BvrW":
            continue
        media = p.get("containers", [{}])[0].get("media") or []
        fn = media[0]["filename"] if media else ""
        slot = re.search(r"slot(\d+)", fn)
        fb.append(
            {
                "slot": slot.group(1) if slot else "?",
                "outstand": p["id"],
                "at": p.get("publishedAt"),
                "media": len(media),
                "fn": fn,
                "fb_url": sa.get("platformPostUrl"),
                "status": sa.get("status"),
            }
        )

fb.sort(key=lambda x: int(x["slot"]) if x["slot"].isdigit() else 99)
print(f"\nLive FB Author posts: {len(fb)}")
for x in fb:
    print(
        f"  slot {x['slot']} | media={x['media']} {x['fn']} | {x['outstand']} | {x['fb_url']}"
    )
