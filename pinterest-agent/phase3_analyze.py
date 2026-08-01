"""Phase 3 — Content gap analysis vs board taxonomy."""

from __future__ import annotations

from difflib import SequenceMatcher

from agent_utils import CONFIG_DIR, OUTPUT_DIR, load_json, save_json, setup_logging

logger = setup_logging()


def fuzzy_match(a: str, b: str, threshold: float = 0.6) -> bool:
    return SequenceMatcher(None, a, b).ratio() > threshold


def analyze_gaps() -> dict:
    audit = load_json(OUTPUT_DIR / "audit_report.json")
    taxonomy = load_json(CONFIG_DIR / "board_taxonomy.json")
    legacy_map = taxonomy.get("legacy_board_map", {})

    existing_boards = {b["name"].lower(): b for b in audit["boards"]}
    plan = {
        "missing_boards": [],
        "underpopulated": [],
        "content_needed": [],
        "legacy_alignment": [],
    }

    for blueprint in taxonomy["boards"]:
        name_lower = blueprint["name"].lower()
        match = None
        for existing_name, existing_board in existing_boards.items():
            if fuzzy_match(name_lower, existing_name):
                match = existing_board
                break

        if not match:
            plan["missing_boards"].append(
                {
                    "name": blueprint["name"],
                    "pillar": blueprint["pillar"],
                    "description": blueprint["description"],
                    "action": "CREATE",
                }
            )
            for pin_type in blueprint["pin_types"]:
                plan["content_needed"].append(
                    {
                        "board": blueprint["name"],
                        "pillar": blueprint["pillar"],
                        "pin_type": pin_type,
                        "priority": "HIGH",
                    }
                )
        else:
            current_count = match.get("actual_pin_count", 0)
            target = blueprint["target_pin_count"]
            if current_count < target:
                plan["underpopulated"].append(
                    {
                        "board": blueprint["name"],
                        "matched_board": match["name"],
                        "current": current_count,
                        "target": target,
                        "gap": target - current_count,
                        "pillar": blueprint["pillar"],
                    }
                )

    for legacy_name, target_name in legacy_map.items():
        legacy_lower = legacy_name.lower()
        if legacy_lower in existing_boards:
            plan["legacy_alignment"].append(
                {
                    "current_board": existing_boards[legacy_lower]["name"],
                    "taxonomy_target": target_name,
                    "note": "Existing board maps to expanded taxonomy — review rename or merge",
                }
            )

    save_json(OUTPUT_DIR / "content_plan.json", plan)
    print(f"Missing boards: {len(plan['missing_boards'])}")
    print(f"Underpopulated: {len(plan['underpopulated'])}")
    print(f"Content items needed: {len(plan['content_needed'])}")
    print(f"Legacy alignment notes: {len(plan['legacy_alignment'])}")
    print(f"Plan: {OUTPUT_DIR / 'content_plan.json'}")
    return plan


if __name__ == "__main__":
    analyze_gaps()
