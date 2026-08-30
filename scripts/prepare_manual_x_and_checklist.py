#!/usr/bin/env python3
"""
Prepare manual-x-upload folder with clean filenames + verify platform assets.
Also write a precise delete checklist for leftover on-platform Meta posts.
"""

from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
PLAT = ROOT / "public" / "social" / "platform-overlaid"
MANUAL_X = ROOT / "public" / "social" / "manual-x-upload"

X_MAP = {
    1: "slot1-frequency-xfb.jpg",
    2: "slot2-cymatics-xfb.jpg",
    3: "slot3-kansas-city-xfb.jpg",
    4: "slot4-grimoire-xfb.jpg",
    5: "slot5-stone-xfb.jpg",
    6: "slot6-factions-xfb.jpg",
    7: "slot7-unreleased-xfb.jpg",
}

KEEP_IG = [
    ("1", "DbSMQbcjfSl"),
    ("2", "DbSMawbjYH1"),
    ("3", "DbSMpa1jXg5"),
    ("4", "DbSM0wGDWgQ"),
    ("5", "DbSM_o4CMVJ"),
    ("6", "DbSNLAfDYgS"),
    ("7", "DbSNYbojjaz"),
]
OLD_IG = [
    "DbRCSJoF1iy",
    "DbRCDsjl4IG",
    "DbRB38zl8LU",
    "DbRBrbTl01E",
    "DbRBb7IDdeh",
    "DbRBLzSjUpX",
    "DbRA7wTDZvY",
]
OLD_FB_AUTHOR = [
    "1224164874114610_122097149271290334",
    "1224164874114610_122097148227290334",
    "1224164874114610_122097146733290334",
    "1224164874114610_122097145863290334",
    "1224164874114610_122097144261290334",
    "1224164874114610_122097141645290334",
    "1224164874114610_122097140487290334",
]


def main():
    MANUAL_X.mkdir(parents=True, exist_ok=True)
    # Remove awkward prior copies
    for p in MANUAL_X.glob("*.jpg"):
        p.unlink()

    copied = []
    for slot, src_name in X_MAP.items():
        src = PLAT / src_name
        if not src.exists():
            raise SystemExit(f"Missing {src}")
        dst_name = f"{slot:02d}-slot{slot}-x.jpg"
        dst = MANUAL_X / dst_name
        shutil.copy2(src, dst)
        copied.append({"slot": slot, "src": str(src), "dst": str(dst), "bytes": dst.stat().st_size})
        print(f"copied {dst_name} ({dst.stat().st_size} bytes)")

    checklist = {
        "instagram": {
            "keep": [f"https://www.instagram.com/p/{sc}/" for _, sc in KEEP_IG],
            "delete_still_live": [f"https://www.instagram.com/p/{sc}/" for sc in OLD_IG],
            "note": (
                "Outstand already removed its records for the old 7. Instagram Graph can delete "
                "media with instagram_manage_contents, but no Meta page token is in .env, and "
                "Outstand remote-delete endpoints are unavailable for orphaned platform IDs. "
                "Delete the 7 OLD URLs in the Instagram app / Meta Business Suite. Do not delete KEEP."
            ),
        },
        "facebook_author": {
            "keep_new_elevated": [
                "https://facebook.com/1224164874114610_122097503355290334",
                "https://facebook.com/1224164874114610_122097503799290334",
                "https://facebook.com/1224164874114610_122097504603290334",
                "https://facebook.com/1224164874114610_122097505695290334",
                "https://facebook.com/1224164874114610_122097506355290334",
                "https://facebook.com/1224164874114610_122097506853290334",
                "https://facebook.com/1224164874114610_122097507585290334",
            ],
            "delete_still_live": [f"https://facebook.com/{pid}" for pid in OLD_FB_AUTHOR],
            "note": (
                "Outstand DELETE only removed scheduler records. Old Author Page posts still resolve. "
                "Delete via Meta Business Suite as Page admin (see SOCIAL_SCP_FACEBOOK_CATALOG.md steps)."
            ),
        },
        "facebook_scp": {
            "status": "Old prior-audit SCP posts appear unavailable (content isn't available). 7 elevated posts live in Outstand.",
            "voice_gap": (
                "REDESIGN_BRIEF + SOCIAL_SCP_FACEBOOK_CATALOG say SCP Page should be catalog/imprint voice, "
                "not essay-mirror. Current 7 posts are elevated essay heroes — graphics OK, voice may need "
                "catalog replace later after author approval of SOCIAL_SCP_FACEBOOK_CATALOG.md."
            ),
        },
        "pinterest": {
            "status": "7 elevated pins live via Outstand; prior Outstand pin records had no platformPostIds (likely never published or already cleared).",
        },
        "bluesky": {
            "status": "7 text-first posts on jasonhollowaykc.bsky.social; voice aligned; no image overlays (correct for caption-led).",
        },
        "x": {
            "status": "Not posted (token unauthorized). Manual assets prepared in public/social/manual-x-upload/ + CAPTIONS.md. User-owned reconnect.",
            "assets": copied,
        },
        "linkedin_threads_tiktok": {
            "status": "Not connected in Outstand social-accounts. No action possible.",
        },
    }

    out = ROOT / ".social-shore-up-status.json"
    out.write_text(json.dumps(checklist, indent=2), encoding="utf-8")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
