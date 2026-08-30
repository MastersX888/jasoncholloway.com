#!/usr/bin/env python3
"""Fix social post captions to match slot content (images unchanged).

Reads content/social/CAPTION_MANIFEST.json and audits Outstand posts.
For published mismatches, reposts with the same media URLs and corrected caption text.
For unassigned drafts, PATCHes caption in place (no delete/repost).

Usage:
  python scripts/fix_social_captions.py --audit
  python scripts/fix_social_captions.py --apply
  python scripts/fix_social_captions.py --apply --platform instagram
  python scripts/fix_social_captions.py --audit --unassigned-only
  python scripts/fix_social_captions.py --apply --unassigned-only
  python scripts/fix_social_captions.py --delete-test-stubs
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content" / "social" / "CAPTION_MANIFEST.json"
BASE_URL = "https://api.outstand.so/v1"

ACCOUNTS = {
    "instagram": "1vWPG",
    "fb_author": "7BvrW",
    "fb_scp": "IwQhX",
    "x": "jaHn2",
    "x_legacy": "oPCuc",
    "pinterest": "pxPfM",
    "bsky_author": "J15V3",
    "bsky_imprint": "4RSwi",
}

# Which manifest field each Outstand account uses
CAPTION_FIELD = {
    "1vWPG": "instagram",
    "7BvrW": "facebook_author",
    "IwQhX": "facebook_author",  # SCP uses author-length FB copy from manifest slot
    "jaHn2": "x",
    "oPCuc": "x",
    "pxPfM": "instagram",  # Pinterest uses IG-length body; title derived below
    "J15V3": "bluesky",
    "4RSwi": "bluesky",
}

EXPECTED_OPENERS = {
    1: "110 Hz is measured",
    2: "Sound has shapes",
    3: "Four traditions looked",
    4: "A medieval grimoire",
    5: "The fire took everything",
    6: "One government published",
    7: "The trilogy ends",
}

TEST_STUB_IDS = {"8gvXI", "SjQjJ", "TaVN1"}

SLOT_FROM_FILE = re.compile(
    r"(?:slot|pinterest-slot|ig-slot)(\d+)|slot(\d+)-|(\d{2})-slot(\d+)",
    re.I,
)

ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

SESSION = requests.Session()
SESSION.verify = False
HEADERS = {"Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}", "Content-Type": "application/json"}


def load_manifest() -> dict:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return data["slots"]


def slot_from_filename(name: str | None) -> int | None:
    if not name:
        return None
    m = SLOT_FROM_FILE.search(name)
    if not m:
        return None
    for g in m.groups():
        if g:
            return int(g)
    return None


def caption_for_slot(slots: dict, slot: int, field: str) -> str:
    return slots[str(slot)][field]


def list_posts() -> list[dict]:
    r = SESSION.get(f"{BASE_URL}/posts?limit=100", headers=HEADERS, timeout=120)
    r.raise_for_status()
    return r.json().get("posts") or r.json().get("data") or []


def delete_post(post_id: str) -> tuple[int, dict]:
    r = SESSION.delete(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=60)
    body = r.json() if r.content else {}
    return r.status_code, body


def create_post(content: str, media: list[dict], account_ids: list[str]) -> tuple[int, dict]:
    body = {
        "containers": [{"content": content, "media": media}],
        "accounts": account_ids,
    }
    r = SESSION.post(f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=90)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"raw": r.text[:500]}


def caption_field_from_filename(name: str | None) -> str:
    """Infer manifest caption field from draft media filename."""
    if not name:
        return "instagram"
    lower = name.lower()
    if "xfb" in lower or "-x." in lower:
        return "x"
    if "hero" in lower or "pinterest" in lower:
        return "instagram"
    return "instagram"


def is_unassigned(post: dict) -> bool:
    return not post.get("socialAccounts")


def patch_post_caption(post_id: str, content: str) -> tuple[int, dict]:
    body = {"containers": [{"content": content}]}
    r = SESSION.patch(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, json=body, timeout=90)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"raw": r.text[:500]}


def audit_unassigned(slots: dict) -> dict:
    rows = []
    mismatches = []
    for p in list_posts():
        if not is_unassigned(p):
            continue
        containers = p.get("containers") or [{}]
        content = (containers[0].get("content") or "").strip()
        media_raw = containers[0].get("media") or []
        fn = media_raw[0].get("filename") if media_raw else None
        inferred = slot_from_filename(fn)
        field = caption_field_from_filename(fn)
        expected = caption_for_slot(slots, inferred, field) if inferred else None
        opener = content.split("\n", 1)[0][:80]
        exp_opener = EXPECTED_OPENERS.get(inferred) if inferred else None
        match = bool(inferred and exp_opener and exp_opener.lower() in content.lower())
        row = {
            "outstand_id": p.get("id"),
            "status": "unassigned",
            "media_file": fn,
            "inferred_slot": inferred,
            "caption_field": field,
            "caption_opener": opener,
            "caption_matches_slot": match,
            "media_count": len(media_raw),
            "is_test_stub": p.get("id") in TEST_STUB_IDS,
        }
        rows.append(row)
        if inferred and not match and expected:
            mismatches.append({**row, "expected_caption": expected})

    return {"rows": rows, "mismatches": mismatches}


def apply_unassigned_fixes(mismatches: list[dict]) -> list[dict]:
    results = []
    for m in mismatches:
        pid = m["outstand_id"]
        if pid in TEST_STUB_IDS:
            results.append({**m, "action": "skip", "reason": "test stub"})
            continue
        caption = m["expected_caption"]
        if not caption:
            results.append({**m, "action": "skip", "reason": "missing caption"})
            continue
        print(f"PATCH unassigned slot {m['inferred_slot']} post {pid}...")
        sc, resp = patch_post_caption(pid, caption)
        ok = sc in (200, 201) and resp.get("success", True)
        results.append({
            "slot": m["inferred_slot"],
            "post_id": pid,
            "patch_status": sc,
            "success": ok,
            "response": resp,
        })
        print(f"  patch={sc} ok={ok}")
        time.sleep(1.5)
    return results


def delete_test_stubs() -> list[dict]:
    results = []
    posts = {p["id"]: p for p in list_posts()}
    for pid in sorted(TEST_STUB_IDS):
        p = posts.get(pid)
        if not p:
            results.append({"post_id": pid, "action": "skip", "reason": "not found"})
            continue
        if not is_unassigned(p):
            results.append({"post_id": pid, "action": "skip", "reason": "not unassigned"})
            continue
        content = ((p.get("containers") or [{}])[0].get("content") or "").strip()
        if content.lower() != "test":
            results.append({"post_id": pid, "action": "skip", "reason": f"content={content!r}"})
            continue
        print(f"DELETE test stub {pid}...")
        sc, resp = delete_post(pid)
        ok = sc in (200, 204) and resp.get("success", True)
        results.append({"post_id": pid, "delete_status": sc, "success": ok, "response": resp})
        print(f"  delete={sc} ok={ok}")
        time.sleep(1)
    return results


def audit(slots: dict) -> dict:
    rows = []
    mismatches = []
    for p in list_posts():
        containers = p.get("containers") or [{}]
        content = (containers[0].get("content") or "").strip()
        media_raw = containers[0].get("media") or []
        fn = media_raw[0].get("filename") if media_raw else None
        inferred = slot_from_filename(fn)
        media = [{"url": m["url"], "filename": m.get("filename", "media.jpg")} for m in media_raw]

        for sa in p.get("socialAccounts") or []:
            aid = sa.get("id")
            if aid not in CAPTION_FIELD:
                continue
            field = CAPTION_FIELD[aid]
            expected = caption_for_slot(slots, inferred, field) if inferred else None
            opener = content.split("\n", 1)[0][:80]
            exp_opener = EXPECTED_OPENERS.get(inferred) if inferred else None
            match = bool(inferred and exp_opener and exp_opener.lower() in content.lower())
            row = {
                "outstand_id": p.get("id"),
                "account_id": aid,
                "network": sa.get("network"),
                "platform_url": sa.get("platformPostUrl"),
                "status": sa.get("status"),
                "media_file": fn,
                "inferred_slot": inferred,
                "caption_opener": opener,
                "caption_matches_slot": match,
                "media_count": len(media),
            }
            rows.append(row)
            if inferred and not match:
                mismatches.append({**row, "expected_caption": expected, "existing_media": media})

    return {"rows": rows, "mismatches": mismatches}


def apply_fixes(mismatches: list[dict], platform_filter: str | None) -> list[dict]:
    results = []
    acct_to_platform = {v: k for k, v in ACCOUNTS.items()}

    for m in mismatches:
        aid = m["account_id"]
        platform = acct_to_platform.get(aid, aid)
        if platform_filter and platform_filter not in (platform, aid):
            continue

        pid = m["outstand_id"]
        caption = m["expected_caption"]
        media = m["existing_media"]
        if not caption or not media:
            results.append({**m, "action": "skip", "reason": "missing caption or media"})
            continue

        print(f"Fixing [{platform}] slot {m['inferred_slot']} post {pid}...")
        sc_del, _ = delete_post(pid)
        time.sleep(1.5)
        sc_create, resp = create_post(caption, media, [aid])
        ok = sc_create in (200, 201) and resp.get("success", True)
        results.append({
            "platform": platform,
            "slot": m["inferred_slot"],
            "old_post_id": pid,
            "delete_status": sc_del,
            "create_status": sc_create,
            "success": ok,
            "response": resp,
            "old_url": m.get("platform_url"),
        })
        print(f"  delete={sc_del} create={sc_create} ok={ok}")
        time.sleep(2)

    return results


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--audit", action="store_true")
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--unassigned-only", action="store_true")
    parser.add_argument("--delete-test-stubs", action="store_true")
    parser.add_argument("--platform", help="Limit apply to platform key (instagram, x, fb_author, ...)")
    args = parser.parse_args()

    if not MANIFEST.exists():
        print(f"Missing {MANIFEST}", file=sys.stderr)
        return 1

    slots = load_manifest()

    if args.delete_test_stubs:
        results = delete_test_stubs()
        res_path = ROOT / ".caption-fix-stub-delete.json"
        res_path.write_text(json.dumps(results, indent=2), encoding="utf-8")
        print(f"Wrote {res_path}")
        failed = [r for r in results if r.get("success") is False]
        return 1 if failed else 0

    if args.unassigned_only:
        report = audit_unassigned(slots)
        out = ROOT / ".caption-fix-unassigned-audit.json"
        out.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"Unassigned rows: {len(report['rows'])}  Mismatches: {len(report['mismatches'])}")
        for m in report["mismatches"]:
            print(
                f"  slot {m['inferred_slot']} {m['outstand_id']}\n"
                f"    file: {m['media_file']}\n"
                f"    caption: {m['caption_opener']}"
            )
        print(f"Wrote {out}")
        if args.apply:
            if not report["mismatches"]:
                print("Nothing to fix.")
                return 0
            results = apply_unassigned_fixes(report["mismatches"])
            res_path = ROOT / ".caption-fix-unassigned-results.json"
            res_path.write_text(json.dumps(results, indent=2), encoding="utf-8")
            print(f"Wrote {res_path}")
            failed = [r for r in results if not r.get("success")]
            return 1 if failed else 0
        return 1 if report["mismatches"] else 0

    report = audit(slots)
    out = ROOT / ".caption-fix-audit.json"
    out.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(f"Rows: {len(report['rows'])}  Mismatches: {len(report['mismatches'])}")
    for m in report["mismatches"]:
        print(
            f"  slot {m['inferred_slot']} [{m.get('network')}] {m.get('platform_url')}\n"
            f"    file: {m['media_file']}\n"
            f"    caption: {m['caption_opener']}"
        )
    print(f"Wrote {out}")

    if args.apply:
        if not report["mismatches"]:
            print("Nothing to fix.")
            return 0
        results = apply_fixes(report["mismatches"], args.platform)
        res_path = ROOT / ".caption-fix-results.json"
        res_path.write_text(json.dumps(results, indent=2), encoding="utf-8")
        print(f"Wrote {res_path}")
        failed = [r for r in results if not r.get("success")]
        return 1 if failed else 0

    return 1 if report["mismatches"] else 0


if __name__ == "__main__":
    sys.exit(main())
