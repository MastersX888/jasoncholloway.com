#!/usr/bin/env python3
"""
Post X carousel threads mirroring Instagram carousels.

Each slot becomes an Outstand containers[] thread:
  - Tweet 1: full IG caption + slide 1
  - Tweets 2–N: slide counter + one image each

Media URLs pulled from live IG Outstand posts (same CDN assets as Instagram).
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
PRIOR = ROOT / ".x-ig-sync-results.json"
OUT = ROOT / ".x-carousel-thread-results.json"

X_ACCOUNT = "jaHn2"
IG_BY_SLOT = {
    1: "coXGL",
    2: "gvcox",
    3: "LceYV",
    4: "lnFhK",
    5: "2jWCS",
    6: "4rGvi",
    7: "corML",
}

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


def fetch_ig_slides(ig_post_id: str) -> list[dict]:
    r = S.get(f"{BASE}/posts/{ig_post_id}", headers=HEADERS, timeout=90)
    r.raise_for_status()
    post = r.json().get("post") or {}
    media = (post.get("containers") or [{}])[0].get("media") or []
    return [{"filename": m["filename"], "url": m["url"]} for m in media if m.get("url")]


def build_containers(caption: str, slides: list[dict]) -> list[dict]:
    total = len(slides)
    containers: list[dict] = []
    for i, slide in enumerate(slides):
        if i == 0:
            content = caption
        else:
            content = f"{i + 1}/{total}"
        containers.append(
            {
                "content": content,
                "media": [{"url": slide["url"], "filename": slide["filename"]}],
            }
        )
    return containers


def create_thread(containers: list[dict]) -> tuple[int, dict]:
    body = {"accounts": [X_ACCOUNT], "containers": containers}
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=120)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"error": r.text[:500]}


def poll_thread(post_id: str, attempts: int = 60) -> dict:
    for _ in range(attempts):
        r = S.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or {}
        sas = [a for a in post.get("socialAccounts", []) if a.get("id") == X_ACCOUNT]
        sa = sas[0] if sas else {}
        status = sa.get("status")
        if status in ("published", "failed") or post.get("publishedAt"):
            urls = []
            for c in post.get("containers") or []:
                for pr in c.get("publishResults") or []:
                    if pr.get("platformPostUrl"):
                        urls.append(pr["platformPostUrl"])
            return {
                "status": status or ("published" if post.get("publishedAt") else "unknown"),
                "url": sa.get("platformPostUrl"),
                "thread_urls": urls,
                "error": sa.get("error"),
            }
        time.sleep(3)
    return {"status": "timeout", "url": None, "thread_urls": [], "error": "poll timeout"}


def delete_remote_outstand_post(post_id: str) -> tuple[int, str]:
    for suffix in ("/remote", "/delete-remote"):
        r = S.delete(f"{BASE}/posts/{post_id}{suffix}", headers=HEADERS, timeout=60)
        if r.status_code in (200, 204):
            return r.status_code, suffix
    return r.status_code, r.text[:200]


def main() -> int:
    dry_run = "--dry-run" in sys.argv
    skip_delete = "--skip-delete" in sys.argv
    slots = list(range(1, 8))
    slot_args = [int(a.split("=", 1)[1]) for a in sys.argv[1:] if a.startswith("--slot=")]
    if slot_args:
        slots = slot_args

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    report: dict = {"started_at": now(), "slots": slots, "deleted_prior": [], "threads": []}

    if not skip_delete and PRIOR.exists() and not dry_run:
        prior = json.loads(PRIOR.read_text(encoding="utf-8"))
        for p in prior.get("posts") or []:
            pid = p.get("post_id")
            if not pid:
                continue
            sc, detail = delete_remote_outstand_post(pid)
            report["deleted_prior"].append({"post_id": pid, "slot": p.get("slot"), "status": sc, "detail": detail})
            print(f"delete prior slot {p.get('slot')} ({pid}): {sc} {detail}")
            time.sleep(1)

    for slot in slots:
        caption = manifest["slots"][str(slot)]["instagram"]
        ig_id = IG_BY_SLOT[slot]
        label = f"X thread slot {slot}"
        print(f"\n{label} — IG source {ig_id}")

        try:
            slides = fetch_ig_slides(ig_id)
            if not slides:
                raise RuntimeError("no slides on IG post")
            containers = build_containers(caption, slides)
            print(f"  {len(containers)} tweets, caption {len(caption)} chars")

            if dry_run:
                report["threads"].append({"slot": slot, "success": True, "dry_run": True, "tweets": len(containers)})
                continue

            sc, resp = create_thread(containers)
            post = resp.get("post") or resp.get("data") or {}
            pid = post.get("id")
            if sc not in (200, 201) or not resp.get("success") or not pid:
                print(f"  FAIL create {sc} {json.dumps(resp)[:400]}")
                report["threads"].append({"slot": slot, "success": False, "response": resp})
                continue

            outcome = poll_thread(pid)
            print(f"  {outcome['status']} root={outcome.get('url')} tweets={len(outcome.get('thread_urls') or [])}")
            report["threads"].append(
                {
                    "slot": slot,
                    "success": outcome["status"] == "published",
                    "post_id": pid,
                    "slides": len(slides),
                    **outcome,
                }
            )
        except Exception as e:
            print(f"  ERROR {e}")
            report["threads"].append({"slot": slot, "success": False, "error": str(e)})

        time.sleep(3)

    report["finished_at"] = now()
    ok = sum(1 for t in report["threads"] if t.get("success"))
    report["summary"] = {"ok": ok, "total": len(report["threads"])}
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"\nDONE {ok}/{len(report['threads'])} -> {OUT}")
    return 0 if ok == len(slots) else 1


if __name__ == "__main__":
    raise SystemExit(main())
