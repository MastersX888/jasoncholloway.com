"""
Publish all pins from the generated batch.
Run this once Standard API access is granted.

Usage: python publish_pins.py [--dry-run] [--board BOARD_NAME]
"""

import json
import time
import sys
from pathlib import Path
from pinterest_client import PinterestClient

OUTPUT = Path(__file__).parent / "output"
PINS_FILE = OUTPUT / "pins_to_create.json"


def main():
    dry_run = "--dry-run" in sys.argv
    board_filter = None
    if "--board" in sys.argv:
        idx = sys.argv.index("--board")
        board_filter = sys.argv[idx + 1] if idx + 1 < len(sys.argv) else None

    client = PinterestClient()

    # Verify access level
    print("Checking access...")
    try:
        test_resp = client.create_pin(
            board_id="1110700395541688804",
            title="__access_check__",
            description="Temporary access verification",
            link="https://jasoncholloway.com/__test__",
            image_url="https://jasoncholloway.com/covers/book1-case.png",
        )
        # If we got here, delete the test pin immediately
        client.delete_pin(test_resp["id"])
        print("✓ Standard access confirmed — pin creation works!\n")
    except Exception as e:
        if "Trial access" in str(e) or "403" in str(e):
            print("✗ Still on Trial access. Cannot create pins via API.")
            print("  Upload the demo video at https://developers.pinterest.com/apps/1593046/")
            print("  OR use the manual CSV at: output/pinterest_bulk_upload.csv")
            print("  (Pinterest Business Hub → Create → Bulk create)")
            sys.exit(1)
        raise

    # Load pin batch
    with open(PINS_FILE) as f:
        pins = json.load(f)

    print(f"Loaded {len(pins)} pins to create")
    if board_filter:
        pins = [p for p in pins if board_filter.lower() in p["board"].lower()]
        print(f"Filtered to {len(pins)} pins for board containing '{board_filter}'")

    # Get existing pin links to avoid duplicates
    boards = client.paginate_all(client.list_boards)
    existing_links = set()
    for b in boards:
        bpins = client.paginate_all(client.list_board_pins, b["id"])
        for p in bpins:
            if p.get("link"):
                existing_links.add(p["link"])

    # Board name → ID mapping
    board_ids = {b["name"]: b["id"] for b in boards}

    created = 0
    skipped = 0
    failed = 0

    for i, pin in enumerate(pins, 1):
        board_name = pin["board"]
        board_id = board_ids.get(board_name)
        if not board_id:
            # Partial match
            for bname, bid in board_ids.items():
                if board_name.lower() in bname.lower():
                    board_id = bid
                    break
        if not board_id:
            print(f"  [{i}] ⚠ Board not found: {board_name}")
            failed += 1
            continue

        if pin["link"] in existing_links:
            skipped += 1
            continue

        if dry_run:
            print(f"  [{i}] DRY RUN: {pin['title'][:50]} → {board_name}")
            created += 1
            continue

        try:
            client.create_pin(
                board_id=board_id,
                title=pin["title"],
                description=pin["description"],
                link=pin["link"],
                image_url=pin["image_url"],
                alt_text=pin.get("alt_text"),
            )
            existing_links.add(pin["link"])
            created += 1
            print(f"  [{i}] ✓ {pin['title'][:50]}")
        except Exception as e:
            print(f"  [{i}] ✗ {pin['title'][:50]} — {e}")
            failed += 1

    print(f"\n{'DRY RUN ' if dry_run else ''}COMPLETE:")
    print(f"  Created: {created}")
    print(f"  Skipped (existing): {skipped}")
    print(f"  Failed: {failed}")


if __name__ == "__main__":
    main()
