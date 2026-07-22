"""Phase 2 — Duplicate detection (dry-run by default)."""

from __future__ import annotations

from collections import defaultdict
from difflib import SequenceMatcher
from io import BytesIO

import imagehash
import requests
from PIL import Image

from agent_utils import OUTPUT_DIR, load_json, rollback_snapshot, save_json, setup_logging
from pinterest_client import PinterestClient

logger = setup_logging()


def detect_duplicates() -> dict:
    audit = load_json(OUTPUT_DIR / "audit_report.json")
    all_pins = []
    for board in audit["boards"]:
        all_pins.extend(board["pins"])

    duplicates = {
        "title_dupes": [],
        "image_dupes": [],
        "link_dupes": [],
        "removal_plan": [],
    }

    title_groups: dict[str, list] = defaultdict(list)
    for pin in all_pins:
        title = pin.get("title", "").strip().lower()
        if title:
            title_groups[title].append(pin)

    for title, pins in title_groups.items():
        if len(pins) > 1:
            duplicates["title_dupes"].append(
                {
                    "title": title,
                    "count": len(pins),
                    "pins": [
                        {
                            "id": p["id"],
                            "board": p["board_name"],
                            "created_at": p.get("created_at", ""),
                        }
                        for p in pins
                    ],
                }
            )

    checked: set[tuple[str, str]] = set()
    for i, pin_a in enumerate(all_pins):
        for j, pin_b in enumerate(all_pins):
            if i >= j:
                continue
            pair = tuple(sorted([pin_a["id"], pin_b["id"]]))
            if pair in checked:
                continue
            checked.add(pair)
            title_a = pin_a.get("title", "").strip().lower()
            title_b = pin_b.get("title", "").strip().lower()
            if title_a and title_b:
                ratio = SequenceMatcher(None, title_a, title_b).ratio()
                if 0.85 < ratio < 1.0:
                    duplicates["title_dupes"].append(
                        {
                            "type": "FUZZY_MATCH",
                            "similarity": round(ratio, 3),
                            "pin_a": {
                                "id": pin_a["id"],
                                "title": title_a,
                                "board": pin_a["board_name"],
                            },
                            "pin_b": {
                                "id": pin_b["id"],
                                "title": title_b,
                                "board": pin_b["board_name"],
                            },
                        }
                    )

    hash_map: dict[str, list] = defaultdict(list)
    for pin in all_pins:
        img_url = pin.get("image_url", "")
        if not img_url:
            continue
        try:
            resp = requests.get(img_url, timeout=15)
            resp.raise_for_status()
            img = Image.open(BytesIO(resp.content))
            phash = str(imagehash.phash(img))
            hash_map[phash].append(pin)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Image hash failed for pin %s: %s", pin["id"], exc)

    for phash, pins in hash_map.items():
        if len(pins) > 1:
            duplicates["image_dupes"].append(
                {
                    "phash": phash,
                    "count": len(pins),
                    "pins": [
                        {
                            "id": p["id"],
                            "title": p.get("title", ""),
                            "board": p["board_name"],
                        }
                        for p in pins
                    ],
                }
            )

    board_link_map: dict[str, dict[str, list]] = defaultdict(lambda: defaultdict(list))
    for pin in all_pins:
        link = pin.get("link", "").rstrip("/")
        if link:
            board_link_map[pin["board_id"]][link].append(pin)

    for board_id, links in board_link_map.items():
        for link, pins in links.items():
            if len(pins) > 1:
                duplicates["link_dupes"].append(
                    {
                        "link": link,
                        "board": pins[0]["board_name"],
                        "count": len(pins),
                        "pins": [
                            {"id": p["id"], "title": p.get("title", ""), "created_at": p.get("created_at", "")}
                            for p in pins
                        ],
                    }
                )

    seen_removals: set[str] = set()
    for group_type in ("title_dupes", "image_dupes", "link_dupes"):
        for group in duplicates[group_type]:
            pins = group.get("pins", [])
            if len(pins) < 2:
                continue
            sorted_pins = sorted(pins, key=lambda p: p.get("created_at", ""))
            keep = sorted_pins[0]
            for remove_pin in sorted_pins[1:]:
                if remove_pin["id"] not in seen_removals:
                    duplicates["removal_plan"].append(
                        {
                            "action": "DELETE",
                            "pin_id": remove_pin["id"],
                            "reason": group_type.rstrip("s"),
                            "keeping": keep["id"],
                            "requires_approval": True,
                            "approved": False,
                        }
                    )
                    seen_removals.add(remove_pin["id"])

    save_json(OUTPUT_DIR / "duplicates.json", duplicates)
    print(f"Title dupes: {len(duplicates['title_dupes'])}")
    print(f"Image dupes: {len(duplicates['image_dupes'])}")
    print(f"Link dupes:  {len(duplicates['link_dupes'])}")
    print(f"Removal plan: {len(duplicates['removal_plan'])} pins flagged")
    print(f"Review: {OUTPUT_DIR / 'duplicates.json'}")
    return duplicates


def execute_removals(dry_run: bool = True, require_approval: bool = True) -> None:
    client = PinterestClient()
    duplicates = load_json(OUTPUT_DIR / "duplicates.json")
    plan = duplicates.get("removal_plan", [])
    to_delete = [
        item
        for item in plan
        if not require_approval or item.get("approved") is True
    ]

    if not dry_run and to_delete:
        rollback_snapshot("pre_dedup", duplicates)

    for item in to_delete:
        if dry_run:
            print(f"[DRY RUN] Would delete pin {item['pin_id']} (reason: {item['reason']})")
            continue
        try:
            client.delete_pin(item["pin_id"])
            print(f"[DELETED] Pin {item['pin_id']}")
        except Exception as exc:  # noqa: BLE001
            print(f"[ERROR] Could not delete {item['pin_id']}: {exc}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--execute", action="store_true")
    parser.add_argument("--approve-all", action="store_true", help="DANGER: mark all removals approved")
    args = parser.parse_args()
    detect_duplicates()
    if args.execute:
        if args.approve_all:
            d = load_json(OUTPUT_DIR / "duplicates.json")
            for item in d["removal_plan"]:
                item["approved"] = True
            save_json(OUTPUT_DIR / "duplicates.json", d)
        execute_removals(dry_run=False)
