#!/usr/bin/env python3
"""
Audit Outstand posts and optionally delete old Instagram (and other platform)
content while keeping the elevated redesign keep-set.
"""

from __future__ import annotations

import json
import ssl
import sys
import time
from pathlib import Path

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
BASE_URL = "https://api.outstand.so/v1"
RESULTS_PATH = ROOT / ".social-cleanup-results.json"

KEEP_IG_SHORTCODES = {
    "DbSMQbcjfSl",  # slot 1
    "DbSMawbjYH1",  # slot 2
    "DbSMpa1jXg5",  # slot 3
    "DbSM0wGDWgQ",  # slot 4
    "DbSM_o4CMVJ",  # slot 5
    "DbSNLAfDYgS",  # slot 6
    "DbSNYbojjaz",  # slot 7
}
KEEP_IG_OUTSTAND_IDS = {"coXGL", "gvcox", "LceYV", "lnFhK", "2jWCS", "4rGvi", "corML"}

# Elevated platform-overlaid posts from .platform-overlaid-post-results.json
KEEP_FB_AUTHOR = {"Q97Yy", "i4CoB", "Tb991", "Pz6b0", "3Jtjk", "I819X", "i4FcB"}
KEEP_FB_SCP = {"CMSdF", "XI1De", "jyzq2", "EuhaA", "1TQbG", "Q9W6y", "XIGoe"}
KEEP_PINTEREST = {"dmcjO", "5HXOD", "i4C7B", "repO4", "4rCni", "KlAD9", "gvacx"}

ACCOUNTS = {
    "ig": "1vWPG",
    "fb_author": "7BvrW",
    "fb_scp": "IwQhX",
    "pinterest": "pxPfM",
    "x": "oPCuc",
}

ENV = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

API_KEY = ENV["OUTSTAND_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}


class TLSAdapter(HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        ctx = ssl.create_default_context()
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        kwargs["ssl_context"] = ctx
        return super().init_poolmanager(*args, **kwargs)


SESSION = requests.Session()
SESSION.mount(
    "https://",
    TLSAdapter(max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])),
)


def shortcode_from_url(url: str | None) -> str | None:
    if not url or "/p/" not in url:
        return None
    return url.rstrip("/").split("/p/")[-1].split("/")[0].split("?")[0]


def fetch_all_posts():
    all_posts = []
    cursor = None
    for page in range(20):
        url = f"{BASE_URL}/posts?limit=100"
        if cursor:
            url += f"&cursor={cursor}"
        r = SESSION.get(url, headers=HEADERS, timeout=90)
        r.raise_for_status()
        data = r.json()
        posts = data.get("posts") or data.get("data") or []
        all_posts.extend(posts)
        cursor = (
            data.get("nextCursor")
            or data.get("cursor")
            or (data.get("pagination") or {}).get("next")
            or (data.get("pagination") or {}).get("nextCursor")
        )
        print(f"  page {page + 1}: +{len(posts)} (total {len(all_posts)})")
        if not posts or not cursor or len(posts) < 100:
            break
    return all_posts


def account_sa(post, account_id):
    for sa in post.get("socialAccounts") or []:
        if sa.get("id") == account_id:
            return sa
    return None


def summarize_post(post, account_id):
    sa = account_sa(post, account_id) or {}
    containers = post.get("containers") or [{}]
    media = containers[0].get("media") or []
    content = containers[0].get("content") or ""
    url = sa.get("platformPostUrl") or ""
    return {
        "id": post["id"],
        "status": sa.get("status"),
        "url": url,
        "shortcode": shortcode_from_url(url),
        "platformPostId": sa.get("platformPostId"),
        "publishedAt": sa.get("publishedAt") or post.get("publishedAt"),
        "media_count": len(media),
        "filenames": [m.get("filename") for m in media],
        "media_urls": [m.get("url") for m in media],
        "snippet": content[:80].replace("\n", " "),
        "error": sa.get("error"),
    }


def is_elevated_media(filenames, media_urls):
    blob = " ".join((filenames or []) + (media_urls or [])).lower()
    # elevated pipeline artifacts
    if "platform-overlaid" in blob or "imagen-overlaid" in blob:
        return True
    # old crude overlays / plain grounds often look like these
    if any(x in blob for x in ("slot", "pinterest-slot", "hero", "-fb.", "-x.")):
        # still elevated if filename came from platform-overlaid upload names
        return True
    return False


def delete_post(post_id: str):
    r = SESSION.delete(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=60)
    body = {}
    try:
        if r.content:
            body = r.json()
    except Exception:
        body = {"raw": r.text[:300]}
    return r.status_code, body


def classify_ig(posts):
    keep, delete = [], []
    for p in posts:
        rec = summarize_post(p, ACCOUNTS["ig"])
        if rec["shortcode"] in KEEP_IG_SHORTCODES or rec["id"] in KEEP_IG_OUTSTAND_IDS:
            keep.append(rec)
        else:
            delete.append(rec)
    return keep, delete


def classify_keep_set(posts, account_id, keep_ids):
    keep, delete = [], []
    for p in posts:
        rec = summarize_post(p, account_id)
        if rec["id"] in keep_ids:
            keep.append(rec)
        else:
            delete.append(rec)
    return keep, delete


def main():
    dry_run = "--dry-run" in sys.argv
    # default: audit only unless --execute
    execute = "--execute" in sys.argv
    do_ig = "--ig" in sys.argv or "--all" in sys.argv
    do_fb = "--fb" in sys.argv or "--all" in sys.argv
    do_pin = "--pinterest" in sys.argv or "--all" in sys.argv
    # If no platform flags, audit everything and execute IG+FB+PIN when --execute
    if not any(x in sys.argv for x in ("--ig", "--fb", "--pinterest", "--all")):
        do_ig = do_fb = do_pin = True

    print("=" * 60)
    print("SOCIAL CLEANUP AUDIT")
    print(f"  dry_run={dry_run or not execute} execute={execute}")
    print(f"  targets: ig={do_ig} fb={do_fb} pinterest={do_pin} (x untouched)")
    print("=" * 60)

    r = SESSION.get(f"{BASE_URL}/social-accounts", headers=HEADERS, timeout=60)
    r.raise_for_status()
    accounts = r.json().get("data") or []
    print("\nConnected accounts:")
    for a in accounts:
        print(f"  {a['id']:6} {a['network']:12} {a.get('username') or a.get('nickname')}")

    print("\nFetching posts...")
    all_posts = fetch_all_posts()
    (ROOT / ".outstand-posts-audit-live.json").write_text(
        json.dumps(all_posts, indent=2), encoding="utf-8"
    )

    by = {k: [] for k in ACCOUNTS}
    for p in all_posts:
        for key, aid in ACCOUNTS.items():
            if account_sa(p, aid):
                by[key].append(p)

    report = {
        "fetched": len(all_posts),
        "counts": {k: len(v) for k, v in by.items()},
        "ig": {},
        "fb_author": {},
        "fb_scp": {},
        "pinterest": {},
        "x": {},
        "deleted": [],
        "kept": [],
        "execute": execute,
    }

    # Instagram
    ig_keep, ig_delete = classify_ig(by["ig"])
    report["ig"] = {"keep": ig_keep, "delete_candidates": ig_delete}
    print(f"\n=== INSTAGRAM keep={len(ig_keep)} delete_candidates={len(ig_delete)} ===")
    for rec in ig_keep:
        print(f"  KEEP   {rec['id']} {rec['shortcode']} {rec['url']}")
    for rec in ig_delete:
        print(f"  DELETE {rec['id']} sc={rec['shortcode']} media={rec['media_count']} {rec['snippet'][:50]}")

    # FB / Pinterest
    for label, key, keep_ids in [
        ("FB AUTHOR", "fb_author", KEEP_FB_AUTHOR),
        ("FB SCP", "fb_scp", KEEP_FB_SCP),
        ("PINTEREST", "pinterest", KEEP_PINTEREST),
    ]:
        keep, delete = classify_keep_set(by[key], ACCOUNTS[key], keep_ids)
        report[key] = {"keep": keep, "delete_candidates": delete}
        print(f"\n=== {label} keep={len(keep)} delete_candidates={len(delete)} ===")
        for rec in keep:
            print(f"  KEEP   {rec['id']} {rec['filenames'][:1]} {rec['url']}")
        for rec in delete:
            print(
                f"  DELETE {rec['id']} status={rec['status']} fn={rec['filenames'][:1]} "
                f"elevatedish={is_elevated_media(rec['filenames'], rec['media_urls'])} {rec['url']}"
            )

    # X — list only, never delete/post
    print(f"\n=== X (list only, no action) count={len(by['x'])} ===")
    x_recs = [summarize_post(p, ACCOUNTS["x"]) for p in by["x"]]
    report["x"] = {"listed": x_recs}
    for rec in x_recs:
        print(f"  NOTE   {rec['id']} status={rec['status']} err={rec['error']} {rec['url']}")

    if execute and not dry_run:
        to_delete = []
        if do_ig:
            to_delete.extend(("ig", rec) for rec in ig_delete)
        if do_fb:
            to_delete.extend(("fb_author", rec) for rec in report["fb_author"]["delete_candidates"])
            to_delete.extend(("fb_scp", rec) for rec in report["fb_scp"]["delete_candidates"])
        if do_pin:
            to_delete.extend(("pinterest", rec) for rec in report["pinterest"]["delete_candidates"])

        # Safety: never delete keep sets
        forbidden = (
            KEEP_IG_OUTSTAND_IDS
            | KEEP_IG_SHORTCODES
            | KEEP_FB_AUTHOR
            | KEEP_FB_SCP
            | KEEP_PINTEREST
        )
        print(f"\n=== EXECUTING DELETES ({len(to_delete)}) ===")
        for platform, rec in to_delete:
            if rec["id"] in forbidden or (rec.get("shortcode") in KEEP_IG_SHORTCODES):
                print(f"  SKIP SAFETY {platform} {rec['id']}")
                continue
            sc, body = delete_post(rec["id"])
            ok = sc in (200, 204)
            print(f"  {'OK' if ok else 'WARN'} delete {platform} {rec['id']} HTTP {sc}")
            report["deleted"].append(
                {"platform": platform, "id": rec["id"], "status": sc, "body": body, "url": rec.get("url")}
            )
            time.sleep(0.6)

        # Re-verify IG keep set still present
        print("\n=== RE-VERIFY after deletes ===")
        time.sleep(2)
        refreshed = fetch_all_posts()
        ig_now = []
        for p in refreshed:
            sa = account_sa(p, ACCOUNTS["ig"])
            if not sa:
                continue
            rec = summarize_post(p, ACCOUNTS["ig"])
            ig_now.append(rec)
            mark = "KEEP" if (rec["shortcode"] in KEEP_IG_SHORTCODES or rec["id"] in KEEP_IG_OUTSTAND_IDS) else "OTHER"
            print(f"  [{mark}] {rec['id']} {rec['shortcode']} {rec['url']}")
        report["ig_after"] = ig_now
        remaining_keep = [
            r
            for r in ig_now
            if r["shortcode"] in KEEP_IG_SHORTCODES or r["id"] in KEEP_IG_OUTSTAND_IDS
        ]
        report["ig_keep_remaining"] = len(remaining_keep)
        print(f"\n  IG keep remaining: {len(remaining_keep)}/7")
        print(f"  IG total remaining: {len(ig_now)}")

    RESULTS_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"\nWrote {RESULTS_PATH}")


if __name__ == "__main__":
    main()
