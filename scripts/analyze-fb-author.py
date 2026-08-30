#!/usr/bin/env python3
"""Analyze FB Author posts from Outstand audit or live API."""
import json
import sys
from pathlib import Path

ROOT = Path(r"c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")


def load_audit():
    path = ROOT / ".outstand-posts-audit.json"
    text = path.read_text(encoding="utf-8-sig")
    data = json.loads(text)
    return data.get("posts") or data.get("data") or []


def fb_author_posts(posts):
    out = []
    seen_fb_ids = set()
    for p in posts:
        for sa in p.get("socialAccounts", []):
            if sa.get("id") != "7BvrW":
                continue
            fb_id = sa.get("platformPostId")
            if fb_id in seen_fb_ids:
                continue
            seen_fb_ids.add(fb_id)
            media = []
            content = ""
            for c in p.get("containers", []):
                content = c.get("content") or ""
                media = c.get("media") or []
            out.append(
                {
                    "outstand_id": p["id"],
                    "publishedAt": p.get("publishedAt"),
                    "platformPostId": fb_id,
                    "platformPostUrl": sa.get("platformPostUrl"),
                    "status": sa.get("status"),
                    "error": sa.get("error"),
                    "has_media": bool(media),
                    "media_files": [m.get("filename") for m in media],
                    "content_start": content[:120].replace("\n", " "),
                }
            )
    out.sort(key=lambda x: x["publishedAt"] or "")
    return out


def main():
    posts = load_audit()
    fb = fb_author_posts(posts)
    print(f"Unique FB Author posts in audit: {len(fb)}\n")
    slot_hints = [
        (1, ["110 Hz", "111.2 Hz", "Hypogeum"]),
        (2, ["Chladni", "cymatics", "1787"]),
        (3, ["Kansas City", "Hopewell", "river bluff"]),
        (4, ["Ars Notoria", "grimoire", "cheating"]),
        (5, ["stone remembers", "Westport Presbyterian", "fire took"]),
        (6, ["1984", "Three Factions", "classified the act"]),
        (7, ["CC0", "247 pages", "license"]),
    ]
    for i, x in enumerate(fb, 1):
        slot = "?"
        cl = x["content_start"].lower()
        for s, keys in slot_hints:
            if any(k.lower() in cl for k in keys):
                slot = s
                break
        print(f"{i}. Slot {slot} | {x['publishedAt']}")
        print(f"   media={x['has_media']} {x['media_files']}")
        print(f"   fb={x['platformPostId']}")
        print(f"   url={x['platformPostUrl']}")
        print(f"   outstand={x['outstand_id']} status={x['status']} error={x['error']}")
        print(f"   {x['content_start']}...")
        print()


if __name__ == "__main__":
    main()
