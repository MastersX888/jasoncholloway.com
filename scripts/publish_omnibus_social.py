#!/usr/bin/env python3
"""Publish Masters X omnibus FB + Pinterest posts (Jason approved 2026-08-23)."""
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
ASSETS = Path(r"C:\Users\zh577\Downloads\Masters-X-Social-Posts")
REPORT = ROOT / "scratch" / "ops_reports" / "social" / "OMNIBUS_PUBLISH_REPORT_2026-08-23.md"
BASE = "https://api.outstand.so/v1"

FB_ACCOUNT = "IwQhX"  # Seventh City Press
PIN_ACCOUNT = "pxPfM"  # SeventhCityPress
PIN_BOARD = "1110700395541688804"  # Literary Conspiracy Thrillers

FB_LINK = (
    "https://jasoncholloway.com/books/masters-x/"
    "?utm_source=facebook&utm_medium=social&utm_campaign=omnibus-launch"
)
PIN_LINK = (
    "https://jasoncholloway.com/books/masters-x/"
    "?utm_source=pinterest&utm_medium=social&utm_campaign=omnibus-launch"
)

FB_CAPTION = """What if the most dangerous secret in the world is a frequency?

Beneath the Strahov Library in Prague, monks have guarded a sealed crypt for seven centuries. In the limestone vaults beneath Kansas City, a fired security guard photographs carvings that shouldn't exist. Between them: thirty years of classified acoustic research, three real manuscripts, and 111.2 Hz — a frequency measured in stone chambers on four continents.

The complete Masters X trilogy is now one hardcover omnibus — 686 pages, one order, one story, no waiting between volumes. For readers who loved Foucault's Pendulum and wished it moved like a thriller.

Get the hardcover omnibus: """ + FB_LINK + """

#MastersX #ConspiracyThriller #LiteraryThriller #DarkAcademia #JasonCarrollHolloway"""

PIN_TITLE = (
    "Masters X: The Complete Trilogy — Hardcover Omnibus | A Conspiracy Thriller in One Volume"
)
PIN_DESCRIPTION = """Masters X trilogy hardcover omnibus — a literary conspiracy thriller for readers of Foucault's Pendulum and The Historian. What if the most dangerous secret in human history isn't a weapon, but a frequency? 686 pages: acoustic science, medieval cryptography, the Voynich Manuscript, and a sealed crypt beneath Prague's Strahov Library. The manuscripts are real; the fiction begins where the record runs out. Order the complete trilogy in one volume → jasoncholloway.com/books/masters-x"""

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


SESSION = requests.Session()
SESSION.mount("https://", TLSAdapter())
SESSION.verify = False
HEADERS = {
    "Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}",
    "Content-Type": "application/json",
}


def upload_image(path: Path) -> dict:
    content_type = "image/jpeg"
    r = SESSION.post(
        f"{BASE}/media/upload",
        headers=HEADERS,
        json={"filename": path.name, "content_type": content_type},
        timeout=90,
    )
    r.raise_for_status()
    data = r.json()["data"]
    media_id = data["id"]
    upload_url = data["upload_url"]
    raw = path.read_bytes()

    put_headers = {"Content-Type": content_type}
    pr = SESSION.put(upload_url, data=raw, headers=put_headers, timeout=180)
    pr.raise_for_status()

    cr = SESSION.post(
        f"{BASE}/media/{media_id}/confirm",
        headers=HEADERS,
        json={"size": len(raw)},
        timeout=90,
    )
    cr.raise_for_status()
    return cr.json().get("data") or cr.json()


def create_post(accounts: list[str], content: str, media: dict) -> dict:
    payload = {
        "containers": [
            {
                "content": content,
                "media": [
                    {"url": media["url"], "filename": media.get("filename", Path(media["url"]).name)},
                ],
            }
        ],
        "accounts": accounts,
    }
    r = SESSION.post(
        f"{BASE}/posts",
        headers={**HEADERS, "Idempotency-Key": str(uuid.uuid4())},
        json=payload,
        timeout=120,
    )
    if r.status_code not in (200, 201):
        raise RuntimeError(f"create post failed {r.status_code}: {r.text[:500]}")
    return r.json().get("post") or r.json().get("data")


def patch_post(post_id: str, body: dict) -> dict:
    r = SESSION.patch(f"{BASE}/posts/{post_id}", headers=HEADERS, json=body, timeout=90)
    if r.status_code not in (200, 201):
        raise RuntimeError(f"patch {post_id} failed {r.status_code}: {r.text[:500]}")
    return r.json().get("post") or r.json().get("data")


def publish_now(post_id: str) -> dict:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    return patch_post(post_id, {"scheduledAt": now})


def poll_post(post_id: str, attempts: int = 25, interval: float = 3.0) -> dict | None:
    for _ in range(attempts):
        r = SESSION.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=90)
        if r.status_code != 200:
            time.sleep(interval)
            continue
        post = r.json().get("post") or r.json().get("data")
        accs = post.get("socialAccounts") or []
        if accs and all(a.get("status") in ("published", "failed") for a in accs):
            return post
        time.sleep(interval)
    r = SESSION.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=90)
    return (r.json().get("post") or r.json().get("data")) if r.ok else None


def extract_urls(post: dict) -> dict[str, str]:
    urls: dict[str, str] = {}
    for a in post.get("socialAccounts") or []:
        key = f"{a.get('network')}:{a.get('nickname', a.get('username'))}"
        url = a.get("platformPostUrl")
        if url:
            urls[key] = url
    return urls


def main() -> int:
    fb_img = ASSETS / "facebook-x_16x9_omnibus.jpg"
    pin_img = ASSETS / "pinterest_2x3_omnibus.jpg"
    for p in (fb_img, pin_img):
        if not p.exists():
            raise FileNotFoundError(p)

    results: dict[str, object] = {"approved": "2026-08-23 Jason", "posts": {}}

    print("Uploading FB image...")
    fb_media = upload_image(fb_img)
    print("Creating FB draft...")
    fb_post = create_post([FB_ACCOUNT], FB_CAPTION, fb_media)
    fb_id = fb_post["id"]
    print(f"Publishing FB {fb_id}...")
    publish_now(fb_id)
    fb_out = poll_post(fb_id)
    results["posts"]["facebook"] = {
        "post_id": fb_id,
        "outstand_url": f"https://app.outstand.so/posts/{fb_id}",
        "urls": extract_urls(fb_out or {}),
        "statuses": {
            f"{a.get('network')}:{a.get('nickname')}": a.get("status")
            for a in (fb_out or {}).get("socialAccounts") or []
        },
    }

    print("Uploading Pinterest image...")
    pin_media = upload_image(pin_img)
    print("Creating Pinterest draft...")
    pin_post = create_post([PIN_ACCOUNT], PIN_DESCRIPTION, pin_media)
    pin_id = pin_post["id"]
    print(f"Configuring Pinterest {pin_id}...")
    patch_post(
        pin_id,
        {
            "pinterest": {
                "board_id": PIN_BOARD,
                "link": PIN_LINK,
                "title": PIN_TITLE,
            }
        },
    )
    print(f"Publishing Pinterest {pin_id}...")
    publish_now(pin_id)
    pin_out = poll_post(pin_id)
    results["posts"]["pinterest"] = {
        "post_id": pin_id,
        "outstand_url": f"https://app.outstand.so/posts/{pin_id}",
        "urls": extract_urls(pin_out or {}),
        "statuses": {
            f"{a.get('network')}:{a.get('nickname')}": a.get("status")
            for a in (pin_out or {}).get("socialAccounts") or []
        },
    }

    ok = all(
        any(s == "published" for s in block.get("statuses", {}).values())  # type: ignore[union-attr]
        for block in results["posts"].values()
    )

    lines = [
        "# Omnibus FB + Pinterest Publish Report",
        f"**Executed:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "**Jason approval:** approve both (2026-08-23)",
        "",
        "## Results",
        "",
    ]
    for platform, block in results["posts"].items():  # type: ignore[union-attr]
        lines.append(f"### {platform.title()}")
        lines.append(f"- Post ID: `{block['post_id']}`")
        lines.append(f"- Outstand: {block['outstand_url']}")
        for k, url in (block.get("urls") or {}).items():
            lines.append(f"- Live: [{k}]({url})")
        lines.append(f"- Statuses: `{block.get('statuses')}`")
        lines.append("")

    REPORT.write_text("\n".join(lines), encoding="utf-8")
    (ROOT / "scratch" / "ops_reports" / "social" / ".omnibus-publish-results.json").write_text(
        json.dumps(results, indent=2), encoding="utf-8"
    )
    print(json.dumps(results, indent=2))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
