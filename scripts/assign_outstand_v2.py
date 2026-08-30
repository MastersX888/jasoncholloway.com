#!/usr/bin/env python3
"""Assign v2 media + platform accounts to Outstand (delete/recreate pattern).

Outstand API: accounts must be set at POST creation; PATCH accounts returns 400.
Jason approved 2026-07-29 — assignment only, no publish/schedule.
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content" / "social" / "CAPTION_MANIFEST.json"
REPORT = ROOT / "content" / "social" / "OUTSTAND_V2_ASSIGNMENT_REPORT.md"
PUBLIC = ROOT / "public" / "social"
BASE_URL = "https://api.outstand.so/v1"

ACCOUNTS = {
    "instagram": "1vWPG",
    "fb_author": "7BvrW",
    "fb_scp": "IwQhX",
    "x": "jaHn2",
    "pinterest": "pxPfM",
    "bsky_author": "J15V3",
    "bsky_imprint": "4RSwi",
}

XFB_OLD = ["co4CL", "Mp2IC", "OdLDv", "D5eQo", "LciHV", "8xTnI", "nBuLl"]
XFB_V2 = {
    1: "platform-overlaid/slot1-frequency-xfb-v2.jpg",
    2: "platform-overlaid/slot2-cymatics-xfb-v2.jpg",
    3: "platform-overlaid/slot3-kansas-city-xfb-v2.jpg",
    4: "platform-overlaid/slot4-grimoire-xfb-v2.jpg",
    5: "platform-overlaid/slot5-stone-xfb-v2.jpg",
    6: "platform-overlaid/slot6-factions-xfb-v2.jpg",
    7: "platform-overlaid/slot7-unreleased-xfb-v2.jpg",
}

PIN_OLD = {
    1: "i4mZB",
    3: "Bidvn",
    4: "AEaA7",
    5: "LcUCV",
    6: "7ATrW",
    7: "y9lnj",
}
PIN_V2 = {
    1: "platform-overlaid/pinterest-slot1-frequency-v2.jpg",
    2: "platform-overlaid/pinterest-slot2-cymatics-v2.jpg",
    3: "platform-overlaid/pinterest-slot3-kansas-city-v2.jpg",
    4: "platform-overlaid/pinterest-slot4-ars-notoria-v2.jpg",
    5: "platform-overlaid/pinterest-slot5-stone-remembers-v2.jpg",
    6: "platform-overlaid/pinterest-slot6-three-factions-v2.jpg",
    7: "platform-overlaid/pinterest-slot7-unreleased-v2.jpg",
}

# Keep newest IG carousel per slot from first successful run
IG_KEEP = {
    1: "FEPVh",
    2: "gIiz1",
    3: "Oxr7T",
    4: "ySUef",
    5: "TpuHk",
    6: "BK2vq",
    7: "mvXEE",
}
PIN2_KEEP = "ySUIq"

DUPLICATE_IDS = ["2y94S", "FMGaZ", "gOmqx", "Omt0v"]
STUB_ID = "SjQjJ"

IG_SLIDE_COUNTS = {1: 6, 2: 6, 3: 7, 4: 6, 5: 6, 6: 6, 7: 6}

ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

SESSION = requests.Session()
SESSION.verify = False
HEADERS = {
    "Authorization": f"Bearer {ENV['OUTSTAND_API_KEY']}",
    "Content-Type": "application/json",
}

media_cache: dict[str, dict] = {}


def load_slots() -> dict:
    return json.loads(MANIFEST.read_text(encoding="utf-8"))["slots"]


def post_id_from(resp: dict) -> str | None:
    if resp.get("post", {}).get("id"):
        return resp["post"]["id"]
    if resp.get("data", {}).get("id"):
        return resp["data"]["id"]
    return resp.get("id")


def list_posts() -> list[dict]:
    r = SESSION.get(f"{BASE_URL}/posts?limit=100", headers=HEADERS, timeout=120)
    r.raise_for_status()
    return r.json().get("posts") or r.json().get("data") or []


def upload_media(filepath: Path, filename: str) -> dict:
    key = str(filepath)
    if key in media_cache:
        return media_cache[key]

    content_type = "image/jpeg" if filename.lower().endswith(".jpg") else "image/png"
    file_size = filepath.stat().st_size

    r = SESSION.post(
        f"{BASE_URL}/media/upload",
        headers=HEADERS,
        json={"filename": filename, "content_type": content_type},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    media_id = data["id"]
    upload_url = data["upload_url"]

    raw = filepath.read_bytes()
    r2 = requests.put(
        upload_url,
        data=raw,
        headers={"Content-Type": content_type},
        timeout=120,
        verify=False,
    )
    r2.raise_for_status()

    r3 = SESSION.post(
        f"{BASE_URL}/media/{media_id}/confirm",
        headers=HEADERS,
        json={"size": file_size},
        timeout=60,
    )
    r3.raise_for_status()
    result = {"url": r3.json()["data"]["url"], "filename": filename}
    media_cache[key] = result
    time.sleep(0.4)
    return result


def resolve_v2(relative: str) -> dict:
    path = PUBLIC / "platform-overlaid" / Path(relative).name
    if not path.exists():
        raise FileNotFoundError(path)
    return upload_media(path, path.name)


def create_post(content: str, media: list[dict], account_ids: list[str]) -> tuple[int, dict]:
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": m["url"], "filename": m["filename"]} for m in media],
            }
        ],
        "accounts": account_ids,
    }
    r = SESSION.post(f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=90)
    try:
        return r.status_code, r.json()
    except Exception:
        return r.status_code, {"raw": r.text[:500]}


def delete_post(post_id: str) -> tuple[int, dict]:
    r = SESSION.delete(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=60)
    try:
        return r.status_code, r.json() if r.content else {}
    except Exception:
        return r.status_code, {"raw": r.text[:500]}


def ok(sc: int, resp: dict) -> bool:
    return sc in (200, 201) and resp.get("success", True)


def is_unassigned(post: dict) -> bool:
    return not post.get("socialAccounts")


def recreate(
    old_id: str | None,
    content: str,
    media: list[dict],
    accounts: list[str],
    label: str,
    dry_run: bool,
) -> dict:
    row = {"label": label, "old_id": old_id, "accounts": accounts}
    if dry_run:
        row["success"] = True
        row["action"] = "dry_run"
        return row

    if old_id:
        print(f"  DELETE old {old_id}...")
        dsc, _ = delete_post(old_id)
        row["delete_status"] = dsc
        time.sleep(1)

    print(f"  CREATE {label}...")
    sc, resp = create_post(content, media, accounts)
    new_id = post_id_from(resp)
    row.update({
        "post_id": new_id,
        "create_status": sc,
        "success": ok(sc, resp) and bool(new_id),
        "response": resp if not ok(sc, resp) else {"id": new_id},
    })
    print(f"    -> {new_id} status={sc}")
    time.sleep(1.5)
    return row


def resolve_ig_v2_slide(slot: int, slide_idx: int) -> Path:
    path = (
        PUBLIC
        / "imagen-overlaid"
        / f"slot{slot}"
        / "v2"
        / f"ig-slot{slot}-slide{slide_idx:02d}-v2.jpg"
    )
    if not path.is_file():
        raise FileNotFoundError(path)
    return path


def refresh_ig_carousels(slots: load_slots, dry_run: bool) -> list[dict]:
    """Delete + recreate IG carousel drafts with refreshed v2 slide media."""
    rows: list[dict] = []
    for slot, old_id in IG_KEEP.items():
        content = slots[str(slot)]["instagram"]
        label = f"ig carousel slot {slot}"
        row: dict = {"slot": slot, "old_id": old_id, "label": label}
        try:
            media = [
                upload_media(resolve_ig_v2_slide(slot, i), resolve_ig_v2_slide(slot, i).name)
                for i in range(1, IG_SLIDE_COUNTS[slot] + 1)
            ]
        except Exception as e:
            row.update({"success": False, "error": str(e)})
            rows.append(row)
            continue
        refreshed = recreate(
            old_id,
            content,
            media,
            [ACCOUNTS["instagram"]],
            label,
            dry_run,
        )
        refreshed["slot"] = slot
        refreshed["slide_count"] = len(media)
        rows.append(refreshed)
    return rows
    """Delete extra v2 IG carousel drafts; keep IG_KEEP ids."""
    keep = set(IG_KEEP.values()) | {PIN2_KEEP}
    to_delete = []
    for p in posts:
        pid = p["id"]
        if pid in keep:
            continue
        c = (p.get("containers") or [{}])[0]
        media = c.get("media") or []
        if not media:
            continue
        fn = media[0].get("filename", "")
        if "-v2.jpg" in fn and fn.startswith("ig-slot") and p.get("socialAccounts"):
            nets = {a.get("network") for a in p["socialAccounts"]}
            if nets == {"instagram"}:
                to_delete.append(pid)
    return to_delete


def find_pin2_duplicates(posts: list[dict]) -> list[str]:
    to_delete = []
    for p in posts:
        pid = p["id"]
        if pid == PIN2_KEEP:
            continue
        c = (p.get("containers") or [{}])[0]
        media = c.get("media") or []
        fn = media[0].get("filename", "") if media else ""
        if fn == "pinterest-slot2-cymatics-v2.jpg" and p.get("socialAccounts"):
            to_delete.append(pid)
    return to_delete


def run(dry_run: bool = False) -> dict:
    slots = load_slots()
    posts = list_posts()
    posts_by_id = {p["id"]: p for p in posts}
    xfb_accounts = [ACCOUNTS["x"], ACCOUNTS["fb_author"], ACCOUNTS["fb_scp"]]

    results: dict = {
        "cleanup_deletes": [],
        "xfb": [],
        "pinterest": [],
        "instagram_carousels": [],
        "stub_duplicate_deletes": [],
    }

    # --- Cleanup duplicate IG / pin2 from partial runs ---
    dup_ig = find_ig_duplicates(posts)
    dup_pin = find_pin2_duplicates(posts)
    for pid in dup_ig + dup_pin:
        row = {"post_id": pid, "reason": "duplicate v2 carousel/pin2"}
        if dry_run:
            row["success"] = True
        else:
            print(f"CLEANUP delete duplicate {pid}")
            sc, resp = delete_post(pid)
            row.update({"delete_status": sc, "success": sc in (200, 204)})
            time.sleep(0.8)
        results["cleanup_deletes"].append(row)

    # --- XFB: delete broken drafts, create with v2 + X+FB accounts ---
    for slot in range(1, 8):
        old_id = XFB_OLD[slot - 1]
        content = slots[str(slot)]["x"]
        try:
            media = [resolve_v2(XFB_V2[slot])]
        except Exception as e:
            results["xfb"].append({"slot": slot, "old_id": old_id, "success": False, "error": str(e)})
            continue
        row = recreate(
            old_id,
            content,
            media,
            xfb_accounts,
            f"xfb slot {slot}",
            dry_run,
        )
        row["slot"] = slot
        row["media_file"] = XFB_V2[slot]
        results["xfb"].append(row)

    # --- Pinterest ---
    for slot, old_id in PIN_OLD.items():
        content = slots[str(slot)]["instagram"]
        try:
            media = [resolve_v2(PIN_V2[slot])]
        except Exception as e:
            results["pinterest"].append({"slot": slot, "old_id": old_id, "success": False, "error": str(e)})
            continue
        row = recreate(
            old_id,
            content,
            media,
            [ACCOUNTS["pinterest"]],
            f"pinterest slot {slot}",
            dry_run,
        )
        row["slot"] = slot
        row["media_file"] = PIN_V2[slot]
        results["pinterest"].append(row)

    # Slot 2 pinterest already created (ySUIq) — record only
    if posts_by_id.get(PIN2_KEEP):
        results["pinterest"].append({
            "slot": 2,
            "post_id": PIN2_KEEP,
            "success": True,
            "action": "kept_existing",
            "media_file": PIN_V2[2],
            "accounts": [ACCOUNTS["pinterest"]],
        })

    # --- IG carousels: keep existing ---
    for slot, pid in IG_KEEP.items():
        post = posts_by_id.get(pid)
        media_n = len(((post or {}).get("containers") or [{}])[0].get("media") or [])
        results["instagram_carousels"].append({
            "slot": slot,
            "post_id": pid,
            "media_count": media_n or IG_SLIDE_COUNTS[slot],
            "accounts": [ACCOUNTS["instagram"]],
            "success": bool(post),
            "action": "kept_existing",
        })

    # --- Delete stub + slot duplicates ---
    for pid in DUPLICATE_IDS + [STUB_ID]:
        post = posts_by_id.get(pid)
        row = {"post_id": pid}
        if not post:
            row.update({"success": True, "action": "not_found"})
        elif not is_unassigned(post):
            row.update({"success": False, "action": "skip_assigned"})
        elif dry_run:
            row.update({"success": True, "action": "dry_run_delete"})
        else:
            print(f"DELETE stub/dup {pid}")
            sc, _ = delete_post(pid)
            row.update({"delete_status": sc, "success": sc in (200, 204)})
            time.sleep(0.8)
        results["stub_duplicate_deletes"].append(row)

    return results


def write_report(results: dict) -> None:
    lines = [
        "# Outstand v2 Assignment Report",
        "**Executed:** 2026-07-29 evening (Jason approved assignment only)",
        "**Gate:** No publish · no schedule · Morgan Phase 4 publish still blocked",
        "",
        "## API note",
        "",
        "Outstand rejects PATCH on `accounts` for existing posts. Assignment uses **delete + recreate**",
        "for X/FB and Pinterest singles. IG carousels created with accounts at POST time.",
        "",
        "## Summary",
        "",
        "| Bucket | OK | Total |",
        "|--------|---:|------:|",
    ]

    def stat(key: str) -> tuple[int, int]:
        rows = results.get(key, [])
        return sum(1 for r in rows if r.get("success")), len(rows)

    for key, label in [
        ("xfb", "X + FB singles (v2)"),
        ("pinterest", "Pinterest (v2)"),
        ("instagram_carousels", "IG carousels (v2)"),
        ("cleanup_deletes", "Duplicate cleanup deletes"),
        ("stub_duplicate_deletes", "Stub + duplicate deletes"),
    ]:
        ok_n, tot = stat(key)
        lines.append(f"| {label} | {ok_n} | {tot} |")

    lines.extend(["", "## X + Facebook (3 accounts each)", ""])
    lines.append("| New Post ID | Slot | Old ID | Media | Accounts | Status |")
    lines.append("|-------------|-----:|--------|-------|----------|--------|")
    for r in results.get("xfb", []):
        ac = ", ".join(r.get("accounts", []))
        st = "OK" if r.get("success") else r.get("error", "FAIL")
        lines.append(
            f"| `{r.get('post_id', '—')}` | {r.get('slot', '')} | `{r.get('old_id', '')}` | "
            f"{r.get('media_file', '')} | {ac} | {st} |"
        )

    lines.extend(["", "## Pinterest", ""])
    lines.append("| Post ID | Slot | Old ID | Media | Status |")
    lines.append("|---------|-----:|--------|-------|--------|")
    for r in results.get("pinterest", []):
        st = r.get("action") or ("OK" if r.get("success") else r.get("error", "FAIL"))
        lines.append(
            f"| `{r.get('post_id', '—')}` | {r.get('slot', '')} | `{r.get('old_id', '—')}` | "
            f"{r.get('media_file', '')} | {st} |"
        )

    lines.extend(["", "## Instagram carousels", ""])
    lines.append("| Post ID | Slot | Slides | Account | Status |")
    lines.append("|---------|-----:|-------:|---------|--------|")
    for r in results.get("instagram_carousels", []):
        st = r.get("action") or ("OK" if r.get("success") else "FAIL")
        lines.append(
            f"| `{r.get('post_id', '')}` | {r.get('slot', '')} | {r.get('media_count', '')} | "
            f"`1vWPG` | {st} |"
        )

    lines.extend([
        "",
        "## Jason — still required for publish",
        "",
        "- [ ] Spot-check assigned drafts in Outstand (media + captions + platform tags)",
        "- [ ] Approve **publish** or **schedule** per slot (Phase 4 gate)",
        "- [ ] Bluesky (author `J15V3` + imprint `4RSwi`) — not assigned in this pass",
        "",
        "## Live published posts",
        "",
        "Untouched — edit-first policy. v1 IG carousels and live X/FB/Pinterest remain on profiles.",
        "",
    ])

    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    (ROOT / ".outstand-v2-assignment-results.json").write_text(
        json.dumps(results, indent=2, default=str), encoding="utf-8"
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--refresh-ig",
        action="store_true",
        help="Delete+recreate IG carousel drafts with current v2 slide JPGs",
    )
    args = parser.parse_args()

    if args.refresh_ig:
        slots = load_slots()
        rows = refresh_ig_carousels(slots, args.dry_run)
        results = {"instagram_carousels": rows}
        write_report(results)
        failed = [r for r in rows if not r.get("success")]
        print(f"\nIG refresh: {len(rows) - len(failed)}/{len(rows)} OK")
        print(f"Report: {REPORT}")
        return 1 if failed else 0

    results = run(dry_run=args.dry_run)
    write_report(results)

    failed = [
        r
        for key in ("xfb", "pinterest", "instagram_carousels")
        for r in results.get(key, [])
        if not r.get("success")
    ]
    print(f"\nReport: {REPORT}")
    print(f"Failures: {len(failed)}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
