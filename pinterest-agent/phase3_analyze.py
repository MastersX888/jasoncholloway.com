"""
Phase 3: Content Gap Analysis.

Compares current account state against board_taxonomy.json blueprint.
Identifies missing boards, underpopulated boards, and needed content types.
Outputs prioritized content plan.
"""

import json
import logging
import sys
from datetime import datetime
from pathlib import Path

from rich.console import Console
from rich.table import Table

console = Console()
logger = logging.getLogger("phase3_analyze")

BASE_DIR = Path(__file__).parent
CONFIG_DIR = BASE_DIR / "config"
OUTPUT_DIR = BASE_DIR / "output"
LOGS_DIR = BASE_DIR / "logs"


def setup_logging():
    LOGS_DIR.mkdir(exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
        handlers=[
            logging.FileHandler(LOGS_DIR / "agent.log"),
            logging.StreamHandler(),
        ],
    )


def load_taxonomy() -> dict:
    with open(CONFIG_DIR / "board_taxonomy.json") as f:
        return json.load(f)


def load_audit_report() -> dict:
    audit_path = OUTPUT_DIR / "audit_report.json"
    if not audit_path.exists():
        console.print("[red]No audit report found. Run phase1_audit.py first.[/red]")
        sys.exit(1)
    with open(audit_path) as f:
        return json.load(f)


def normalize_board_name(name: str) -> str:
    """Normalize for fuzzy matching of board names."""
    return name.lower().strip().replace("—", "-").replace("–", "-")


def find_matching_board(target_name: str, existing_boards: list) -> dict:
    """Find an existing board that matches the taxonomy target."""
    target_norm = normalize_board_name(target_name)
    for board in existing_boards:
        board_norm = normalize_board_name(board.get("name", ""))
        if target_norm == board_norm:
            return board
        if target_norm in board_norm or board_norm in target_norm:
            return board
    return None


def analyze_gaps(taxonomy: dict, audit: dict) -> dict:
    """Compare taxonomy blueprint against actual account state."""
    existing_boards = audit.get("boards", [])
    blueprint_boards = taxonomy.get("boards", [])

    content_plan = {
        "generated_at": datetime.now().isoformat(),
        "missing_boards": [],
        "underpopulated_boards": [],
        "content_actions": [],
        "summary": {
            "boards_to_create": 0,
            "boards_underpopulated": 0,
            "pins_needed": 0,
            "priority_high": 0,
            "priority_medium": 0,
            "priority_low": 0,
        },
    }

    for blueprint in blueprint_boards:
        target_name = blueprint["name"]
        target_count = blueprint["target_pin_count"]
        pillar = blueprint["pillar"]
        pin_types = blueprint["pin_types"]

        match = find_matching_board(target_name, existing_boards)

        if not match:
            content_plan["missing_boards"].append({
                "name": target_name,
                "pillar": pillar,
                "description": blueprint["description"],
                "target_pin_count": target_count,
                "pin_types": pin_types,
                "priority": "high",
            })
            content_plan["summary"]["boards_to_create"] += 1

            for pin_type in pin_types:
                content_plan["content_actions"].append({
                    "action": "create_pin",
                    "board": target_name,
                    "board_exists": False,
                    "pillar": pillar,
                    "pin_type": pin_type,
                    "quantity_needed": max(1, target_count // len(pin_types)),
                    "priority": "high",
                })
                content_plan["summary"]["priority_high"] += 1

            content_plan["summary"]["pins_needed"] += target_count
        else:
            current_count = match.get("pin_count", 0)
            deficit = target_count - current_count

            if deficit > 0:
                content_plan["underpopulated_boards"].append({
                    "name": target_name,
                    "matched_board": match.get("name", ""),
                    "board_id": match.get("id", ""),
                    "pillar": pillar,
                    "current_pins": current_count,
                    "target_pins": target_count,
                    "deficit": deficit,
                    "pin_types_needed": pin_types,
                    "priority": "medium" if deficit < target_count * 0.5 else "high",
                })
                content_plan["summary"]["boards_underpopulated"] += 1

                priority = "medium" if deficit < target_count * 0.5 else "high"
                for pin_type in pin_types:
                    qty = max(1, deficit // len(pin_types))
                    content_plan["content_actions"].append({
                        "action": "create_pin",
                        "board": target_name,
                        "board_id": match.get("id", ""),
                        "board_exists": True,
                        "pillar": pillar,
                        "pin_type": pin_type,
                        "quantity_needed": qty,
                        "priority": priority,
                    })
                    if priority == "high":
                        content_plan["summary"]["priority_high"] += 1
                    else:
                        content_plan["summary"]["priority_medium"] += 1

                content_plan["summary"]["pins_needed"] += deficit

    content_plan["content_actions"].sort(
        key=lambda x: {"high": 0, "medium": 1, "low": 2}.get(x["priority"], 3)
    )

    return content_plan


def run_analysis():
    setup_logging()
    OUTPUT_DIR.mkdir(exist_ok=True)

    console.print("[bold blue]Phase 3: Content Gap Analysis[/bold blue]")
    console.print("=" * 50)

    taxonomy = load_taxonomy()
    audit = load_audit_report()

    console.print(f"\nBlueprint: {len(taxonomy['boards'])} boards defined")
    console.print(f"Current:   {len(audit.get('boards', []))} boards found")

    content_plan = analyze_gaps(taxonomy, audit)

    plan_path = OUTPUT_DIR / "content_plan.json"
    with open(plan_path, "w") as f:
        json.dump(content_plan, f, indent=2)

    console.print("\n" + "=" * 50)
    console.print("[bold green]Gap Analysis Complete[/bold green]")
    console.print(f"\n  Content plan: {plan_path}")

    table = Table(title="Content Gap Summary")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="yellow")
    table.add_row("Boards to Create", str(content_plan["summary"]["boards_to_create"]))
    table.add_row("Boards Underpopulated", str(content_plan["summary"]["boards_underpopulated"]))
    table.add_row("Total Pins Needed", str(content_plan["summary"]["pins_needed"]))
    table.add_row("High Priority Actions", str(content_plan["summary"]["priority_high"]))
    table.add_row("Medium Priority Actions", str(content_plan["summary"]["priority_medium"]))
    console.print(table)

    if content_plan["missing_boards"]:
        console.print("\n[bold]Missing Boards:[/bold]")
        for board in content_plan["missing_boards"]:
            console.print(f"  [red]✗[/red] {board['name']} ({board['pillar']})")

    if content_plan["underpopulated_boards"]:
        console.print("\n[bold]Underpopulated Boards:[/bold]")
        for board in content_plan["underpopulated_boards"]:
            console.print(
                f"  [yellow]△[/yellow] {board['name']} — "
                f"{board['current_pins']}/{board['target_pins']} pins"
            )

    return content_plan


if __name__ == "__main__":
    run_analysis()
