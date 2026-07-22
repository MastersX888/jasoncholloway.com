"""Phase 4 — Generate staged pins from templates and content plan."""

from __future__ import annotations

from agent_utils import CONFIG_DIR, OUTPUT_DIR, load_json, save_json, setup_logging

logger = setup_logging()


def render_template(pattern: str, values: dict) -> str:
    result = pattern
    for key, value in values.items():
        result = result.replace("{" + key + "}", str(value))
    return result


def resolve_board_id(board_name: str, audit: dict, legacy_map: dict) -> str | None:
    name_lower = board_name.lower()
    for board in audit.get("boards", []):
        if board["name"].lower() == name_lower:
            return board["id"]
    target = legacy_map.get(board_name, board_name).lower()
    for board in audit.get("boards", []):
        if board["name"].lower() == target:
            return board["id"]
        if target in board["name"].lower() or board["name"].lower() in target:
            return board["id"]
    for board in audit.get("boards", []):
        if name_lower in board["name"].lower() or board["name"].lower() in name_lower:
            return board["id"]
    return None


def generate_staged_pins() -> dict:
    templates_cfg = load_json(CONFIG_DIR / "pin_templates.json")
    taxonomy = load_json(CONFIG_DIR / "board_taxonomy.json")
    audit_path = OUTPUT_DIR / "audit_report.json"
    audit = load_json(audit_path) if audit_path.exists() else {"boards": []}
    legacy_map = taxonomy.get("legacy_board_map", {})

    staged = {"generated_at": "", "pins": [], "skipped": []}

    for seed in templates_cfg.get("seed_pins", []):
        template_name = seed["template"]
        template = templates_cfg["templates"].get(template_name)
        if not template:
            staged["skipped"].append({"seed": seed, "reason": "unknown template"})
            continue

        board_id = resolve_board_id(seed.get("board_legacy", ""), audit, legacy_map)
        if not board_id:
            staged["skipped"].append(
                {
                    "seed": seed.get("subject") or seed.get("book_title"),
                    "reason": f"board not found: {seed.get('board_legacy')}",
                }
            )
            continue

        title = render_template(
            template["title_pattern"],
            {
                "book_title": seed.get("book_title", seed.get("subject", "Masters X")),
                "format": seed.get("format", "Edition"),
                "subject": seed.get("subject", ""),
                "location": seed.get("location", "Kansas City"),
                "angle": seed.get("angle", "Critical Study"),
            },
        )[:100]

        description = render_template(
            template["description_pattern"],
            {
                "book_title": seed.get("book_title", seed.get("subject", "Masters X")),
                "format": seed.get("format", "Edition"),
                "hook": seed.get("hook", seed.get("fact", "")),
                "fact": seed.get("fact", ""),
                "isbn": seed.get("isbn", ""),
                "subject": seed.get("subject", ""),
            },
        )
        if len(description) < 100:
            description = description + " Seventh City Press · Jason Carroll Holloway · jasoncholloway.com"

        staged["pins"].append(
            {
                "board_id": board_id,
                "board_name": seed.get("board_legacy"),
                "title": title,
                "description": description[:500],
                "link": seed["link"],
                "image_url": seed["image_url"],
                "alt_text": seed.get("alt_text", title)[:500],
                "template": template_name,
                "pillar": seed.get("pillar"),
                "requires_review": True,
            }
        )

    from agent_utils import utc_now_iso

    staged["generated_at"] = utc_now_iso()
    save_json(OUTPUT_DIR / "staged_pins.json", staged)

    print(f"Staged pins: {len(staged['pins'])}")
    print(f"Skipped: {len(staged['skipped'])}")
    print(f"Review: {OUTPUT_DIR / 'staged_pins.json'}")
    if staged["skipped"]:
        print("Run phase1 audit first if boards were not matched.")
    return staged


if __name__ == "__main__":
    generate_staged_pins()
