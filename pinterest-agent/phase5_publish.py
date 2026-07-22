"""Phase 5 — Publishing pipeline (dry-run by default)."""

from __future__ import annotations

import time

from agent_utils import OUTPUT_DIR, rollback_snapshot, save_json, setup_logging
from pinterest_client import PinterestClient

logger = setup_logging()


def validate_pin(pin_spec: dict) -> bool:
    required = ["title", "description", "link", "image_url", "board_id"]
    for field in required:
        if not pin_spec.get(field):
            print(f"  [FAIL] Missing {field}: {pin_spec.get('title', 'untitled')}")
            return False

    if len(pin_spec["description"]) < 100:
        print(f"  [FAIL] Description too short: {pin_spec.get('title')}")
        return False

    link = pin_spec["link"]
    canonical_prefixes = [
        "https://jasoncholloway.com",
        "https://seventhcitypress.com",
        "https://www.amazon.com/dp/",
        "https://www.amazon.com/stores/",
    ]
    if not any(link.startswith(p) for p in canonical_prefixes):
        print(f"  [FAIL] Non-canonical link: {link}")
        return False

    return True


def publish(dry_run: bool = True) -> dict:
    client = PinterestClient()
    plan_path = OUTPUT_DIR / "content_plan.json"
    plan = {}
    if plan_path.exists():
        from agent_utils import load_json

        plan = load_json(plan_path)

    results = {"boards_created": [], "pins_created": [], "errors": []}

    # Skip board creation if content_plan has missing boards — they need manual or separate handling
    for board_spec in plan.get("missing_boards", []):
        if dry_run:
            print(f"[DRY RUN] Would create board: {board_spec['name']}")
            continue
        try:
            result = client.create_board(
                name=board_spec["name"],
                description=board_spec["description"],
            )
            results["boards_created"].append(
                {"name": board_spec["name"], "id": result["id"]}
            )
            print(f"[CREATED] Board: {board_spec['name']} -> {result['id']}")
            time.sleep(1)
        except Exception as exc:  # noqa: BLE001
            results["errors"].append(
                {"action": "create_board", "target": board_spec["name"], "error": str(exc)}
            )

    staged_path = OUTPUT_DIR / "staged_pins.json"
    if not staged_path.exists():
        print("No staged_pins.json found. Run: python pinboard.py generate")
        save_json(OUTPUT_DIR / "publish_results.json", results)
        return results

    from agent_utils import load_json

    staged = load_json(staged_path)
    approved_pins = [
        p for p in staged.get("pins", []) if p.get("requires_review") is False or p.get("approved") is True
    ]

    if not dry_run and approved_pins:
        rollback_snapshot("pre_publish", staged)

    for pin_spec in staged.get("pins", []):
        if pin_spec.get("requires_review") and not pin_spec.get("approved"):
            print(f"[SKIP] Needs review: {pin_spec.get('title')}")
            continue

        if not validate_pin(pin_spec):
            results["errors"].append(
                {
                    "action": "validate_pin",
                    "target": pin_spec.get("title", "untitled"),
                    "error": "Failed brand canon validation",
                }
            )
            continue

        if dry_run:
            print(f"[DRY RUN] Would publish: {pin_spec['title']}")
            continue

        try:
            result = client.create_pin(
                board_id=pin_spec["board_id"],
                title=pin_spec["title"],
                description=pin_spec["description"],
                link=pin_spec["link"],
                image_url=pin_spec["image_url"],
                alt_text=pin_spec.get("alt_text"),
                board_section_id=pin_spec.get("board_section_id"),
            )
            results["pins_created"].append(
                {
                    "title": pin_spec["title"],
                    "pin_id": result["id"],
                    "board_id": pin_spec["board_id"],
                }
            )
            print(f"[PUBLISHED] {pin_spec['title']} -> {result['id']}")
        except Exception as exc:  # noqa: BLE001
            results["errors"].append(
                {
                    "action": "create_pin",
                    "target": pin_spec["title"],
                    "error": str(exc),
                }
            )

    save_json(OUTPUT_DIR / "publish_results.json", results)
    return results


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--live", action="store_true", help="Actually publish (requires approved pins)")
    args = parser.parse_args()
    publish(dry_run=not args.live)
