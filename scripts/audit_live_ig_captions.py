#!/usr/bin/env python3
"""Verify live IG caption openers vs CAPTION_MANIFEST."""
from __future__ import annotations

import json
import re
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / "content/social/CAPTION_MANIFEST.json").read_text(encoding="utf-8"))

POSTS = {
    1: "DbSMQbcjfSl",
    2: "DbSMawbjYH1",
    3: "DbSMpa1jXg5",
    4: "DbSM0wGDWgQ",
    5: "DbR6T8cCBW3",
    6: "DbR6UH1iK0P",
    7: "DbR6YMQiJN3",
}
DUPES = ["DbR6D9ADHBX", "DbR6JXkl5Af", "DbR6PVcjUcV"]

s = requests.Session()
s.verify = False
s.headers["User-Agent"] = "Mozilla/5.0"


def opener(shortcode: str) -> str:
    r = s.get(f"https://www.instagram.com/p/{shortcode}/", timeout=30)
    m = re.search(r'property="og:description" content="([^"]+)"', r.text)
    if not m:
        return "(not found)"
    text = m.group(1)
    if ' on Instagram:' in text:
        text = text.split(" on Instagram:", 1)[1].strip().strip('"')
    if ": " in text and text.count('"') >= 2:
        parts = text.split(": ", 1)
        if len(parts) == 2:
            text = parts[1]
    return text.split("\n", 1)[0][:120]


def main() -> None:
    for slot, sc in POSTS.items():
        live = opener(sc)
        exp = MANIFEST["slots"][str(slot)]["instagram"].split("\n", 1)[0][:50]
        ok = exp[:15].lower() in live.lower()
        print(f"[{'OK' if ok else 'FIX'}] slot {slot} {sc}")
        print(f"  expected: {exp}")
        print(f"  live:     {live}\n")
    print("--- duplicates (should delete) ---")
    for sc in DUPES:
        print(f"{sc}: {opener(sc)[:80]}")


if __name__ == "__main__":
    main()
