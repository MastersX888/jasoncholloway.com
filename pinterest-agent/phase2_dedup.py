"""
Phase 2: Duplicate Detection & Removal Plan.

Detects duplicates across three dimensions:
- Title duplicates (exact + fuzzy via SequenceMatcher)
- Image duplicates (perceptual hash via imagehash)
- Link duplicates (same URL on same board)

NEVER auto-deletes. Always requires human approval.
"""

import io
import json
import logging
import os
import sys
from collections import defaultdict
from datetime import datetime
from difflib import SequenceMatcher
from pathlib import Path

import imagehash
import requests
from PIL import Image
from rich.console import Console
from rich.table import Table

from pinterest_client import PinterestClient, PinterestAPIError

console = Console()
logger = logging.getLogger("phase2_dedup")

BASE_DIR = Path(__file__).parent
OUTPUT_DIR = BASE_DIR / "output"
LOGS_DIR = BASE_DIR / "logs"

FUZZY_THRESHOLD = 0.85


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


def load_audit_report() -> dict:
    audit_path = OUTPUT_DIR / "audit_report.json"
    if not audit_path.exists():
        console.print("[red]No audit report found. Run phase1_audit.py first.[/red]")
        sys.exit(1)
    with open(audit_path) as f:
        return json.load(f)


def find_title_duplicates(boards: list) -> list:
    """Find exact and fuzzy title duplicates across and within boards."""
    duplicates = []
    all_pins = []

    for board in boards:
        for pin in board.get("pins", []):
            if pin.get("title"):
                all_pins.append({
                    "id": pin["id"],
                    "title": pin["title"],
                    "board": board["name"],
                    "board_id": board["id"],
                    "created_at": pin.get("created_at", ""),
                })

    for i, pin_a in enumerate(all_pins):
        for pin_b in all_pins[i + 1:]:
            title_a = pin_a["title"].strip().lower()
            title_b = pin_b["title"].strip().lower()

            if title_a == title_b:
                duplicates.append({
                    "type": "exact_title",
                    "pin_a": pin_a,
                    "pin_b": pin_b,
                    "similarity": 1.0,
                })
            else:
                ratio = SequenceMatcher(None, title_a, title_b).ratio()
                if ratio >= FUZZY_THRESHOLD:
                    duplicates.append({
                        "type": "fuzzy_title",
                        "pin_a": pin_a,
                        "pin_b": pin_b,
                        "similarity": round(ratio, 3),
                    })

    return duplicates


def find_link_duplicates(boards: list) -> list:
    """Find pins with identical links on the same board."""
    duplicates = []

    for board in boards:
        link_map = defaultdict(list)
        for pin in board.get("pins", []):
            link = pin.get("link", "").strip()
            if link:
                link_map[link].append({
                    "id": pin["id"],
                    "title": pin.get("title", "Untitled"),
                    "board": board["name"],
                    "board_id": board["id"],
                    "created_at": pin.get("created_at", ""),
                })

        for link, pins in link_map.items():
            if len(pins) > 1:
                pins_sorted = sorted(pins, key=lambda p: p.get("created_at", ""))
                for dupe in pins_sorted[1:]:
                    duplicates.append({
                        "type": "link_duplicate",
                        "link": link,
                        "keep": pins_sorted[0],
                        "remove": dupe,
                        "board": board["name"],
                    })

    return duplicates


def compute_image_hash(image_url: str) -> str:
    """Download image and compute perceptual hash."""
    try:
        resp = requests.get(image_url, timeout=15)
        if resp.status_code == 200:
            img = Image.open(io.BytesIO(resp.content))
            return str(imagehash.phash(img))
    except Exception as e:
        logger.warning("Failed to hash image %s: %s", image_url, e)
    return None


def find_image_duplicates(client: PinterestClient, boards: list) -> list:
    """Find pins with identical or near-identical images via perceptual hashing."""
    duplicates = []
    hash_map = defaultdict(list)

    console.print("\n[yellow]Computing image hashes (this may take a while)...[/yellow]")

    for board in boards:
        for pin_summary in board.get("pins", []):
            try:
                pin_detail = client.get_pin(pin_summary["id"])
            except PinterestAPIError:
                continue

            media = pin_detail.get("media", {})
            images = media.get("images", {})
            orig = images.get("original", images.get("600x", {}))
            url = orig.get("url", "")

            if not url:
                continue

            phash = compute_image_hash(url)
            if phash:
                hash_map[phash].append({
                    "id": pin_summary["id"],
                    "title": pin_summary.get("title", "Untitled"),
                    "board": board["name"],
                    "board_id": board["id"],
                    "created_at": pin_summary.get("created_at", ""),
                    "image_url": url,
                })

    for phash, pins in hash_map.items():
        if len(pins) > 1:
            pins_sorted = sorted(pins, key=lambda p: p.get("created_at", ""))
            for dupe in pins_sorted[1:]:
                duplicates.append({
                    "type": "image_duplicate",
                    "phash": phash,
                    "keep": pins_sorted[0],
                    "remove": dupe,
                })

    return duplicates


def generate_removal_plan(title_dupes: list, link_dupes: list, image_dupes: list) -> dict:
    """Generate a removal plan. Keep oldest pin, flag newer as duplicates."""
    plan = {
        "generated_at": datetime.now().isoformat(),
        "dry_run": True,
        "title_duplicates": [],
        "link_duplicates": [],
        "image_duplicates": [],
        "total_removals": 0,
    }

    for dupe in title_dupes:
        pins = [dupe["pin_a"], dupe["pin_b"]]
        pins_sorted = sorted(pins, key=lambda p: p.get("created_at", ""))
        plan["title_duplicates"].append({
            "keep": pins_sorted[0],
            "remove": pins_sorted[1],
            "similarity": dupe["similarity"],
            "match_type": dupe["type"],
        })
        plan["total_removals"] += 1

    for dupe in link_dupes:
        plan["link_duplicates"].append({
            "keep": dupe["keep"],
            "remove": dupe["remove"],
            "link": dupe["link"],
            "board": dupe["board"],
        })
        plan["total_removals"] += 1

    for dupe in image_dupes:
        plan["image_duplicates"].append({
            "keep": dupe["keep"],
            "remove": dupe["remove"],
            "phash": dupe["phash"],
        })
        plan["total_removals"] += 1

    return plan


def execute_removals(client: PinterestClient, plan: dict, dry_run: bool = True):
    """
    Execute the removal plan. ALWAYS defaults to dry_run=True.
    Requires explicit dry_run=False to actually delete pins.
    """
    if dry_run:
        console.print("\n[bold yellow]DRY RUN — No pins will be deleted.[/bold yellow]")
        console.print("Review the removal plan and re-run with dry_run=False to execute.")
        return

    console.print("\n[bold red]LIVE MODE — Pins will be deleted![/bold red]")
    confirm = input("Type 'DELETE' to confirm: ").strip()
    if confirm != "DELETE":
        console.print("[yellow]Aborted. No pins deleted.[/yellow]")
        return

    removed = 0
    all_removals = (
        plan.get("title_duplicates", [])
        + plan.get("link_duplicates", [])
        + plan.get("image_duplicates", [])
    )

    for item in all_removals:
        pin_to_remove = item["remove"]
        pin_id = pin_to_remove["id"]
        try:
            client.delete_pin(pin_id)
            removed += 1
            logger.info("Deleted pin %s (%s)", pin_id, pin_to_remove.get("title", ""))
            console.print(f"  [red]Deleted:[/red] {pin_to_remove.get('title', pin_id)}")
        except PinterestAPIError as e:
            logger.error("Failed to delete pin %s: %s", pin_id, e)
            console.print(f"  [red]Failed:[/red] {pin_id} — {e}")

    console.print(f"\n[green]Removed {removed} duplicate pins.[/green]")


def run_dedup(skip_images: bool = False):
    setup_logging()
    OUTPUT_DIR.mkdir(exist_ok=True)

    console.print("[bold blue]Phase 2: Duplicate Detection[/bold blue]")
    console.print("=" * 50)

    audit = load_audit_report()
    boards = audit.get("boards", [])

    console.print(f"\nAnalyzing {len(boards)} boards for duplicates...")

    console.print("\n[yellow]Checking title duplicates...[/yellow]")
    title_dupes = find_title_duplicates(boards)
    console.print(f"  Found {len(title_dupes)} title duplicates")

    console.print("\n[yellow]Checking link duplicates...[/yellow]")
    link_dupes = find_link_duplicates(boards)
    console.print(f"  Found {len(link_dupes)} link duplicates")

    image_dupes = []
    if not skip_images:
        console.print("\n[yellow]Checking image duplicates...[/yellow]")
        client = PinterestClient()
        image_dupes = find_image_duplicates(client, boards)
        console.print(f"  Found {len(image_dupes)} image duplicates")
    else:
        console.print("\n[dim]Skipping image dedup (--skip-images)[/dim]")

    plan = generate_removal_plan(title_dupes, link_dupes, image_dupes)

    plan_path = OUTPUT_DIR / "removal_plan.json"
    with open(plan_path, "w") as f:
        json.dump(plan, f, indent=2, default=str)

    console.print("\n" + "=" * 50)
    console.print("[bold green]Dedup Analysis Complete[/bold green]")
    console.print(f"\n  Removal plan: {plan_path}")

    table = Table(title="Duplicate Summary")
    table.add_column("Type", style="cyan")
    table.add_column("Count", style="yellow")
    table.add_row("Title Duplicates", str(len(title_dupes)))
    table.add_row("Link Duplicates", str(len(link_dupes)))
    table.add_row("Image Duplicates", str(len(image_dupes)))
    table.add_row("Total Removals Proposed", str(plan["total_removals"]))
    console.print(table)

    console.print("\n[bold]Next steps:[/bold]")
    console.print("  1. Review removal_plan.json")
    console.print("  2. Run execute_removals() with dry_run=False after review")

    return plan


if __name__ == "__main__":
    skip = "--skip-images" in sys.argv
    run_dedup(skip_images=skip)
