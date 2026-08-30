#!/usr/bin/env python3
"""Post X slots 2-7 only (slot 1 already live)."""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from post_overnight_shore_up import ACCOUNTS, ENV, PLAT, XFB, X_CAPTIONS  # noqa: E402

BASE = "https://api.outstand.so/v1"
HEADERS = {"Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}", "Content-Type": "application/json"}
OUT = ROOT / ".x-slots-2-7-results.json"

S = requests.Session()
S.verify = False


def upload(path: Path) -> str:
    ct = "image/jpeg" if path.suffix.lower() in (".jpg", ".jpeg") else "image/png"
    r = S.post(
        f"{BASE}/media/upload",
        headers=HEADERS,
        json={"filename": path.name, "content_type": ct},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    with path.open("rb") as f:
        put = requests.put(
            data["upload_url"],
            data=f,
            headers={"Content-Type": ct, "Content-Length": str(path.stat().st_size)},
            timeout=180,
            verify=False,
        )
        put.raise_for_status()
    return data["id"]


def create_post(text: str, media_ids: list[str], account_id: str):
    body = {
        "content": text,
        "publishNow": True,
        "media": [{"id": mid, "type": "image"} for mid in media_ids],
        "accounts": [account_id],
    }
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll(post_id: str, account_id: str, attempts: int = 30):
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
                "status": status or ("published" if post.get("publishedAt") else "unknown"),
                "url": sa.get("platformPostUrl"),
                "error": sa.get("error"),
            }
        time.sleep(3)
    return {"status": "timeout", "url": None, "error": "poll timeout"}


def post_one(label: str, text: str, img: Path, account_id: str, report: dict):
    print(f"\n{label}")
    try:
        mid = upload(img)
        print(f"  uploaded {img.name} -> {mid}")
        sc, resp = create_post(text, [mid], account_id)
        post = resp.get("post") or resp.get("data") or {}
        pid = post.get("id")
        if sc in (200, 201) and resp.get("success") and pid:
            outcome = poll(pid, account_id)
            print(f"  {outcome['status']} {outcome.get('url') or outcome.get('error')}")
            report["posts"].append(
                {"label": label, "success": outcome["status"] == "published", "post_id": pid, **outcome}
            )
        else:
            print(f"  FAIL create {sc} {json.dumps(resp)[:240]}")
            report["posts"].append({"label": label, "success": False, "response": resp})
    except Exception as e:
        print(f"  ERROR {e}")
        report["posts"].append({"label": label, "success": False, "error": str(e)})
    time.sleep(1.5)


def main() -> int:
    report = {"posts": []}
    for slot in range(2, 8):
        path = PLAT / XFB[slot]
        if not path.exists():
            report["posts"].append({"label": f"X slot {slot}", "success": False, "error": f"missing {path}"})
            continue
        post_one(f"X slot {slot}", X_CAPTIONS[slot], path, ACCOUNTS["x"], report)

    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    ok = sum(1 for p in report["posts"] if p.get("success"))
    print(f"\nDone {ok}/{len(report['posts'])} -> {OUT}")
    return 0 if ok == len(report["posts"]) else 1


if __name__ == "__main__":
    sys.exit(main())
