"""
Phase 5: Publishing Pipeline.

Reads staged_pins.json, creates missing boards, publishes pins.
ALWAYS defaults to dry_run=True. Validates every pin before publishing.
Rate limits all operations. Creates rollback snapshot before batch ops.
"""

import json
import logging
import sys
import time
from datetime import datetime
from pathlib import Path

from rich.console import Console
from rich.table import Table

from pinterest_client import PinterestClient, PinterestAPIError

console = Console()
logger = logging.getLogger("phase5_publish")

BASE_DIR = Path(__file__).parent
CONFIG_DIR = BASE_DIR / "config"
OUTPUT_DIR = BASE_DIR / "output"
LOGS_DIR = BASE_DIR / "logs"

RATE_LIMIT_PIN_CREATE = 2.0
RATE_LIMIT_BOARD_CREATE = 1.0


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


def load_staged_pins() -> dict:
    staged_path = OUTPUT_DIR / "staged_pins.json"
    if not staged_path.exists():
        console.print("[red]No staged pins found. Run phase4_generate.py first.[/red]")
        sys.exit(1)
    with open(staged_path) as f:
        return json.load(f)


def load_brand_canon() -> dict:
    with open(CONFIG_DIR / "brand_canon.json") as f:
        return json.load(f)


def load_content_plan() -> dict:
    plan_path = OUTPUT_DIR / "content_plan.json"
    if plan_path.exists():
        with open(plan_path) as f:
            return json.load(f)
    return {}


def validate_pin_before_publish(pin: dict, canon: dict) -> list:
    """Final validation gate before publishing."""
    issues = []

    if not pin.get("title"):
        issues.append("Missing title")

    if not pin.get("description") or len(pin["description"]) < 30:
        issues.append("Description too short (<30 chars)")

    link = pin.get("link", "")
    if link:
        valid_domains = ["jasoncholloway.com", "seventhcitypress.com"]
        if not any(d in link for d in valid_domains):
            issues.append(f"Non-canonical link: {link}")

    desc = pin.get("description", "")
    for isbn_entry in canon.get("isbn_matrix", []):
        if isbn_entry["isbn"] in desc:
            break
    else:
        if "isbn" in desc.lower() or "ISBN" in desc:
            potential_isbns = [
                w for w in desc.split()
                if w.startswith("978") and len(w) == 13
            ]
            canon_isbns = {e["isbn"] for e in canon["isbn_matrix"]}
            for potential in potential_isbns:
                if potential not in canon_isbns:
                    issues.append(f"Unrecognized ISBN: {potential}")

    return issues


def create_rollback_snapshot(client: PinterestClient) -> dict:
    """Capture current state before batch operations for potential rollback."""
    console.print("\n[yellow]Creating rollback snapshot...[/yellow]")

    boards = client.list_boards()
    snapshot = {
        "created_at": datetime.now().isoformat(),
        "boards": [],
    }

    for board in boards:
        board_data = {
            "id": board["id"],
            "name": board.get("name", ""),
            "pin_ids": [],
        }
        pins = client.list_pins(board["id"])
        board_data["pin_ids"] = [p["id"] for p in pins]
        snapshot["boards"].append(board_data)

    snapshot_path = OUTPUT_DIR / "rollback_snapshot.json"
    with open(snapshot_path, "w") as f:
        json.dump(snapshot, f, indent=2)

    console.print(f"  Snapshot saved: {snapshot_path}")
    return snapshot


def create_missing_boards(
    client: PinterestClient, content_plan: dict, dry_run: bool = True
) -> dict:
    """Create boards that are in the taxonomy but missing from the account."""
    board_map = {}
    missing = content_plan.get("missing_boards", [])

    if not missing:
        console.print("  No boards to create.")
        return board_map

    for board_spec in missing:
        name = board_spec["name"]
        description = board_spec["description"]

        if dry_run:
            console.print(f"  [dim]DRY RUN — Would create board:[/dim] {name}")
            board_map[name] = {"id": "DRY_RUN", "name": name}
        else:
            try:
                result = client.create_board(name, description)
                board_map[name] = result
                logger.info("Created board: %s (id: %s)", name, result.get("id"))
                console.print(f"  [green]Created:[/green] {name}")
                time.sleep(RATE_LIMIT_BOARD_CREATE)
            except PinterestAPIError as e:
                logger.error("Failed to create board '%s': %s", name, e)
                console.print(f"  [red]Failed:[/red] {name} — {e}")

    return board_map


def publish_pins(
    client: PinterestClient,
    staged: dict,
    canon: dict,
    board_map: dict,
    dry_run: bool = True,
) -> dict:
    """Publish staged pins. ALWAYS dry_run=True by default."""
    results = {
        "published": [],
        "skipped": [],
        "failed": [],
        "dry_run": dry_run,
    }

    pins = staged.get("pins", [])
    valid_pins = [p for p in pins if p.get("valid", False)]

    console.print(f"\n  Publishing {len(valid_pins)} valid pins...")

    for i, pin in enumerate(valid_pins):
        pre_publish_issues = validate_pin_before_publish(pin, canon)
        if pre_publish_issues:
            results["skipped"].append({
                "title": pin["title"],
                "issues": pre_publish_issues,
            })
            console.print(f"  [yellow]Skipped:[/yellow] {pin['title']} — {pre_publish_issues}")
            continue

        board_id = pin.get("target_board_id", "")
        if not board_id:
            board_name = pin.get("target_board", "")
            if board_name in board_map:
                board_id = board_map[board_name].get("id", "")

        if not board_id or board_id == "DRY_RUN":
            if dry_run:
                console.print(f"  [dim]DRY RUN — Would publish:[/dim] {pin['title']}")
                results["published"].append({"title": pin["title"], "dry_run": True})
            else:
                results["skipped"].append({
                    "title": pin["title"],
                    "issues": ["No valid board_id"],
                })
            continue

        if dry_run:
            console.print(f"  [dim]DRY RUN — Would publish:[/dim] {pin['title']}")
            results["published"].append({"title": pin["title"], "dry_run": True})
        else:
            try:
                result = client.create_pin(
                    board_id=board_id,
                    title=pin["title"],
                    description=pin["description"],
                    link=pin.get("link"),
                    alt_text=pin.get("alt_text"),
                )
                results["published"].append({
                    "title": pin["title"],
                    "pin_id": result.get("id"),
                    "board_id": board_id,
                })
                logger.info("Published pin: %s (id: %s)", pin["title"], result.get("id"))
                console.print(f"  [green]Published:[/green] {pin['title']}")
                time.sleep(RATE_LIMIT_PIN_CREATE)
            except PinterestAPIError as e:
                results["failed"].append({
                    "title": pin["title"],
                    "error": str(e),
                })
                logger.error("Failed to publish '%s': %s", pin["title"], e)
                console.print(f"  [red]Failed:[/red] {pin['title']} — {e}")

    return results


def run_publish(dry_run: bool = True):
    setup_logging()
    OUTPUT_DIR.mkdir(exist_ok=True)

    console.print("[bold blue]Phase 5: Publishing Pipeline[/bold blue]")
    console.print("=" * 50)

    if dry_run:
        console.print("\n[bold yellow]MODE: DRY RUN — Nothing will be published.[/bold yellow]")
    else:
        console.print("\n[bold red]MODE: LIVE — Pins will be published![/bold red]")
        confirm = input("Type 'PUBLISH' to confirm: ").strip()
        if confirm != "PUBLISH":
            console.print("[yellow]Aborted.[/yellow]")
            return

    client = PinterestClient()
    canon = load_brand_canon()
    staged = load_staged_pins()
    content_plan = load_content_plan()

    if not dry_run:
        create_rollback_snapshot(client)

    console.print("\n[yellow]Step 1: Create missing boards[/yellow]")
    board_map = create_missing_boards(client, content_plan, dry_run=dry_run)

    console.print("\n[yellow]Step 2: Publish pins[/yellow]")
    results = publish_pins(client, staged, canon, board_map, dry_run=dry_run)

    results_output = {
        "timestamp": datetime.now().isoformat(),
        "dry_run": dry_run,
        "boards_created": len(board_map),
        "pins_published": len(results["published"]),
        "pins_skipped": len(results["skipped"]),
        "pins_failed": len(results["failed"]),
        "details": results,
    }

    results_path = OUTPUT_DIR / "publish_results.json"
    with open(results_path, "w") as f:
        json.dump(results_output, f, indent=2, default=str)

    console.print("\n" + "=" * 50)
    console.print("[bold green]Publishing Complete[/bold green]")
    console.print(f"\n  Results: {results_path}")

    table = Table(title="Publishing Summary")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="yellow")
    table.add_row("Mode", "DRY RUN" if dry_run else "LIVE")
    table.add_row("Boards Created", str(len(board_map)))
    table.add_row("Pins Published", str(len(results["published"])))
    table.add_row("Pins Skipped", str(len(results["skipped"])))
    table.add_row("Pins Failed", str(len(results["failed"])))
    table.add_row("API Calls", str(client.request_count))
    console.print(table)

    if dry_run:
        console.print("\n[bold]To publish for real:[/bold]")
        console.print("  python phase5_publish.py --live")

    return results_output


if __name__ == "__main__":
    live = "--live" in sys.argv
    run_publish(dry_run=not live)
