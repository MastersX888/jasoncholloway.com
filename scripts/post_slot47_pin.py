#!/usr/bin/env python3
"""Slot 47 Pinterest pin to Masters X Vol III board via Outstand."""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

import requests
import urllib3
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

API_KEY = ENV["OUTSTAND_API_KEY"].strip()
BASE = "https://api.outstand.so/v1"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
PIN = "pxPfM"
BOARD = "1110700395541846741"  # Masters X — Vol. III: The Kingdom
CARD = ROOT / "scratch" / "ops_reports" / "social" / "repost-campaign" / "slot47-storycorps-attribution.png"
SOURCE = "https://storycorps.org/animation/silvias-legacy/"
CAPTION = (
    "In the novel, a retired carpenter holds out his hands: "
    "\u201cThey have been vibrating for years. I thought it was the arthritis.\u201d "
    "The kingdom is a grandmother in a folding chair. It always has been.\n\n"
    "#MastersX\n"
    f"{SOURCE}"
)
TITLE = "Masters X \u2014 a grandmother in a folding chair"
OUT = ROOT / "scratch" / "ops_reports" / "social" / "repost-campaign" / "slot47-pinterest-outstand.json"

S = requests.Session()
S.verify = False
S.mount("https://", HTTPAdapter(max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])))


def upload(path: Path) -> dict:
    ct = "image/png"
    r = S.post(f"{BASE}/media/upload", headers=HEADERS, json={"filename": path.name, "content_type": ct}, timeout=60)
    r.raise_for_status()
    data = r.json()["data"]
    raw = path.read_bytes()
    S.put(data["upload_url"], data=raw, headers={"Content-Type": ct}, timeout=180).raise_for_status()
    confirm = S.post(f"{BASE}/media/{data['id']}/confirm", headers=HEADERS, json={"size": path.stat().st_size}, timeout=60)
    confirm.raise_for_status()
    url = (confirm.json().get("data") or {}).get("url")
    print("confirm", json.dumps(confirm.json())[:300])
    return {"id": data["id"], "url": url, "filename": path.name}


def poll(post_id: str, attempts: int = 40):
    for _ in range(attempts):
        r = S.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data") or {}
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == PIN]
        sa = accounts[0] if accounts else {}
        status = sa.get("status")
        if status in ("published", "failed") or post.get("publishedAt"):
            return {"status": status or "published", "url": sa.get("platformPostUrl"), "error": sa.get("error")}
        time.sleep(3)
    return {"status": "timeout", "url": None, "error": "poll timeout"}


def main():
    media = upload(CARD)
    body = {
        "containers": [{"content": CAPTION, "media": [{"url": media["url"], "filename": media["filename"]}]}],
        "accounts": [PIN],
        "pinterest": {"board_id": BOARD, "link": SOURCE, "title": TITLE},
        "pinterestConfiguration": {"board_id": BOARD},
        "networkOverrideConfiguration": {PIN: {"board_id": BOARD}},
    }
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=60)
    print("create", r.status_code, json.dumps(r.json())[:600])
    resp = r.json()
    post = resp.get("post") or resp.get("data") or {}
    pid = post.get("id")
    outcome = poll(pid) if pid else {"status": "no-id", "response": resp}
    print(outcome)
    OUT.write_text(json.dumps({"post_id": pid, "board": BOARD, "media": media, **outcome}, indent=2), encoding="utf-8")


if __name__ == "__main__":
    sys.exit(main() or 0)
