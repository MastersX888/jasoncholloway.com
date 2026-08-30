#!/usr/bin/env python3
"""Slot 47 only: Facebook author, Instagram, Pinterest via Outstand.

Does not touch X (already live), Bluesky, or FB SCP.
Uses OUTSTAND_API_KEY from .env. Original credit card — no StoryCorps video.
"""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

import urllib3
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

urllib3.disable_warnings()

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

API_KEY = ENV.get("OUTSTAND_API_KEY", "").strip()
if not API_KEY:
    raise SystemExit("OUTSTAND_API_KEY missing from .env")

BASE = "https://api.outstand.so/v1"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

ACCOUNTS = {
    "fb_author": "7BvrW",
    "ig": "1vWPG",
    "pinterest": "pxPfM",
}

CARD = ROOT / "scratch" / "ops_reports" / "social" / "repost-campaign" / "slot47-storycorps-attribution.png"
SOURCE = "https://storycorps.org/animation/silvias-legacy/"
CAPTION = (
    "In the novel, a retired carpenter holds out his hands: "
    "\u201cThey have been vibrating for years. I thought it was the arthritis.\u201d "
    "The kingdom is a grandmother in a folding chair. It always has been.\n\n"
    "#MastersX\n"
    f"{SOURCE}"
)
PIN_TITLE = "Masters X \u2014 a grandmother in a folding chair"
RESULTS = ROOT / "scratch" / "ops_reports" / "social" / "repost-campaign" / "slot47-outstand-results.json"


S = requests.Session()
S.verify = False
S.mount(
    "https://",
    HTTPAdapter(max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])),
)


def upload(path: Path) -> dict:
    ct = "image/png" if path.suffix.lower() == ".png" else "image/jpeg"
    r = S.post(
        f"{BASE}/media/upload",
        headers=HEADERS,
        json={"filename": path.name, "content_type": ct},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    with path.open("rb") as f:
        put = S.put(
            data["upload_url"],
            data=f,
            headers={"Content-Type": ct, "Content-Length": str(path.stat().st_size)},
            timeout=180,
        )
        put.raise_for_status()
    return data


def resolve_pinterest_board() -> str:
    fallback = ENV.get("PINTEREST_BOARD_ID") or ""
    for path in (
        f"/social-accounts/{ACCOUNTS['pinterest']}/boards",
        f"/pinterest/{ACCOUNTS['pinterest']}/boards",
        "/boards",
    ):
        try:
            r = S.get(f"{BASE}{path}", headers=HEADERS, timeout=20)
            print(f"  boards {path} -> {r.status_code}")
            if r.status_code != 200:
                continue
            payload = r.json()
            data = payload.get("data") or payload.get("boards") or payload
            if not isinstance(data, list):
                continue
            for b in data:
                print(f"    {b.get('id')} {b.get('name')}")
            for b in data:
                name = (b.get("name") or "").lower()
                if "vol. iii" in name or "vol iii" in name or "the kingdom" in name:
                    return str(b["id"])
            for b in data:
                name = (b.get("name") or "").lower()
                if "masters" in name:
                    return str(b["id"])
            if data:
                return str(data[0]["id"])
        except Exception as exc:
            print(f"  board list fail {path}: {exc}")
    if fallback:
        return fallback
    raise SystemExit("Could not resolve Pinterest board")


def create_post(content: str, media: dict, account_id: str, extra: dict | None = None):
    body = {
        "content": content,
        "publishNow": True,
        "media": [{"id": media["id"], "type": "image"}],
        "accounts": [account_id],
    }
    if extra:
        body.update(extra)
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll(post_id: str, account_id: str, attempts: int = 36):
    for _ in range(attempts):
        r = S.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data") or {}
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == account_id]
        sa = accounts[0] if accounts else {}
        status = sa.get("status")
        if status in ("published", "failed") or post.get("publishedAt"):
            return {
                "status": status or "published",
                "url": sa.get("platformPostUrl"),
                "error": sa.get("error"),
            }
        time.sleep(3)
    return {"status": "timeout", "url": None, "error": "poll timeout"}


def main():
    if not CARD.exists():
        raise SystemExit(f"missing card: {CARD}")
    print("Uploading", CARD)
    media = upload(CARD)
    print("  media id", media.get("id"))
    board_id = None
    try:
        board_id = resolve_pinterest_board()
        print("Pinterest board", board_id)
    except SystemExit as e:
        print("Pinterest board unresolved:", e)
        print("Continuing with Facebook and Instagram only")

    report = {"posts": [], "board_id": board_id, "media_id": media.get("id")}
    jobs = [
        ("Facebook author", ACCOUNTS["fb_author"], None),
        ("Instagram", ACCOUNTS["ig"], None),
    ]
    if board_id:
        jobs.append(
            (
                "Pinterest",
                ACCOUNTS["pinterest"],
                {
                    "pinterest": {"board_id": board_id, "link": SOURCE, "title": PIN_TITLE},
                    "pinterestConfiguration": {"board_id": board_id},
                    "networkOverrideConfiguration": {ACCOUNTS["pinterest"]: {"board_id": board_id}},
                },
            )
        )
    for label, account_id, extra in jobs:
        print(f"\n=== {label} ===")
        sc, resp = create_post(CAPTION, media, account_id, extra)
        post = resp.get("post") or resp.get("data") or {}
        pid = post.get("id")
        print("  create", sc, json.dumps(resp)[:400])
        if sc in (200, 201) and pid:
            outcome = poll(pid, account_id)
            print(" ", outcome)
            report["posts"].append({"label": label, "post_id": pid, **outcome})
        else:
            report["posts"].append({"label": label, "success": False, "response": resp})
        time.sleep(1.5)

    RESULTS.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print("\nWrote", RESULTS)


if __name__ == "__main__":
    sys.exit(main() or 0)
