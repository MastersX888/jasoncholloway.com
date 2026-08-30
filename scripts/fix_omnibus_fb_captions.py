#!/usr/bin/env python3
"""Fix backslash-apostrophe artifacts on Jason author FB omnibus post."""
from __future__ import annotations

import json
import ssl
import sys
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path

import requests
import urllib3
from requests.adapters import HTTPAdapter

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://api.outstand.so/v1"
BROKEN_POST = "vI1Xl"
AUTHOR_ACCOUNT = "7BvrW"
AUTHOR_LINK = (
    "https://jasoncholloway.com/books/masters-x/"
    "?utm_source=facebook&utm_medium=social&utm_campaign=omnibus-launch&utm_content=author-page"
)

CAPTION = f"""What if the most dangerous secret in the world is a frequency?

Beneath the Strahov Library in Prague, monks have guarded a sealed crypt for seven centuries. In the limestone vaults beneath Kansas City, a fired security guard photographs carvings that shouldn't exist. Between them: thirty years of classified acoustic research, three real manuscripts, and 111.2 Hz — a frequency measured in stone chambers on four continents.

The complete Masters X trilogy is now one hardcover omnibus — 686 pages, one order, one story, no waiting between volumes. For readers who loved Foucault's Pendulum and wished it moved like a thriller.

Get the hardcover omnibus: {AUTHOR_LINK}

#MastersX #ConspiracyThriller #LiteraryThriller #DarkAcademia #JasonCarrollHolloway"""

ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()


class TLSAdapter(HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        ctx = ssl.create_default_context()
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        kwargs["ssl_context"] = ctx
        return super().init_poolmanager(*args, **kwargs)


S = requests.Session()
S.mount("https://", TLSAdapter())
S.verify = False
H = {"Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}", "Content-Type": "application/json"}


def get_post(pid: str) -> dict:
    r = S.get(f"{BASE}/posts/{pid}", headers=H, timeout=90)
    r.raise_for_status()
    return r.json()["post"]


def poll(pid: str) -> dict:
    for _ in range(20):
        post = get_post(pid)
        accs = post.get("socialAccounts") or []
        if accs and all(a.get("status") in ("published", "failed") for a in accs):
            return post
        time.sleep(3)
    return get_post(pid)


def main() -> int:
    old = get_post(BROKEN_POST)
    media = (old.get("containers") or [{}])[0].get("media") or []

    # New clean post (published FB posts can't reliably be edited in-place)
    payload = {
        "containers": [{"content": CAPTION, "media": media}],
        "accounts": [AUTHOR_ACCOUNT],
    }
    r = S.post(
        f"{BASE}/posts",
        headers={**H, "Idempotency-Key": str(uuid.uuid4())},
        json=payload,
        timeout=120,
    )
    r.raise_for_status()
    new_id = r.json()["post"]["id"]
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    S.patch(f"{BASE}/posts/{new_id}", headers=H, json={"scheduledAt": now}, timeout=90)
    post = poll(new_id)
    acc = (post.get("socialAccounts") or [{}])[0]
    content = (post.get("containers") or [{}])[0].get("content", "")

    result = {
        "new_post_id": new_id,
        "old_post_id": BROKEN_POST,
        "url": acc.get("platformPostUrl"),
        "status": acc.get("status"),
        "has_bad_escapes": "\\'" in content,
        "outstand": f"https://app.outstand.so/posts/{new_id}",
    }
    print(json.dumps(result, indent=2))
    return 0 if acc.get("status") == "published" and not result["has_bad_escapes"] else 1


if __name__ == "__main__":
    sys.exit(main())
