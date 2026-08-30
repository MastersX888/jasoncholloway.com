#!/usr/bin/env python3
"""
Repost X slots to match Instagram: same caption + slot hero (slide01) image.

For full carousel threads (all slides as X thread), use:
  python scripts/sync_x_carousel_threads.py
"""

from __future__ import annotations

import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content" / "social" / "CAPTION_MANIFEST.json"
IMG_ROOT = ROOT / "public" / "social" / "imagen-overlaid"
OUT = ROOT / ".x-ig-sync-results.json"
X_ACCOUNT = "jaHn2"

ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

BASE = "https://api.outstand.so/v1"
HEADERS = {"Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}", "Content-Type": "application/json"}
S = requests.Session()
S.verify = False


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


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


def create_post(text: str, media_ids: list[str]) -> tuple[int, dict]:
    body = {
        "content": text,
        "publishNow": True,
        "media": [{"id": mid, "type": "image"} for mid in media_ids],
        "accounts": [X_ACCOUNT],
    }
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=90)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"error": r.text[:500]}


def poll(post_id: str, attempts: int = 40) -> dict:
    for _ in range(attempts):
        r = S.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or {}
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == X_ACCOUNT]
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


def slot_image(slot: int) -> Path:
    return IMG_ROOT / f"slot{slot}" / f"ig-slot{slot}-slide01.jpg"


def main() -> int:
    dry_run = "--dry-run" in sys.argv
    slots = list(range(1, 8))
    for arg in sys.argv[1:]:
        if arg.startswith("--slot="):
            slots = [int(arg.split("=", 1)[1])]

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    report = {"started_at": now(), "slots": slots, "posts": []}

    for slot in slots:
        key = str(slot)
        slot_data = manifest["slots"][key]
        caption = slot_data["instagram"]
        img = slot_image(slot)
        label = f"X slot {slot} (IG-aligned)"
        print(f"\n{label} — {len(caption)} chars, {img.name}")

        if not img.exists():
            print(f"  MISSING {img}")
            report["posts"].append({"slot": slot, "success": False, "error": f"missing {img}"})
            continue

        if dry_run:
            print(f"  [dry-run] would post {img.name}")
            report["posts"].append({"slot": slot, "success": True, "dry_run": True})
            continue

        try:
            mid = upload(img)
            print(f"  uploaded -> {mid}")
            sc, resp = create_post(caption, [mid])
            post = resp.get("post") or resp.get("data") or {}
            pid = post.get("id")
            if sc in (200, 201) and resp.get("success") and pid:
                outcome = poll(pid)
                print(f"  {outcome['status']} {outcome.get('url') or outcome.get('error')}")
                report["posts"].append(
                    {
                        "slot": slot,
                        "success": outcome["status"] == "published",
                        "post_id": pid,
                        **outcome,
                    }
                )
            else:
                print(f"  FAIL {sc} {json.dumps(resp)[:300]}")
                report["posts"].append({"slot": slot, "success": False, "response": resp})
        except Exception as e:
            print(f"  ERROR {e}")
            report["posts"].append({"slot": slot, "success": False, "error": str(e)})

        time.sleep(2)

    report["finished_at"] = now()
    ok = sum(1 for p in report["posts"] if p.get("success"))
    report["summary"] = {"ok": ok, "total": len(report["posts"])}
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"\nDONE {ok}/{len(report['posts'])} -> {OUT}")
    return 0 if ok == len(slots) else 1


if __name__ == "__main__":
    raise SystemExit(main())
