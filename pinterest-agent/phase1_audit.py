"""
Phase 1: Complete Pinterest Account Audit.

Crawls all boards, sections, and pins. Validates against brand_canon.json.
Collects analytics and produces a structured audit report.
"""

import json
import logging
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

from rich.console import Console
from rich.table import Table

from pinterest_client import PinterestClient, PinterestAPIError

console = Console()
logger = logging.getLogger("phase1_audit")

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


def load_brand_canon() -> dict:
    with open(CONFIG_DIR / "brand_canon.json") as f:
        return json.load(f)


def validate_pin(pin: dict, canon: dict) -> list:
    """Validate a single pin against brand canon. Returns list of issues."""
    issues = []
    title = pin.get("title", "")
    description = pin.get("description", "")
    link = pin.get("link", "")
    alt_text = pin.get("alt_text", "")

    if not title or title.strip() == "":
        issues.append({"type": "missing_title", "severity": "high"})

    if len(description) < 30:
        issues.append({
            "type": "weak_description",
            "severity": "medium",
            "detail": f"Only {len(description)} chars",
        })

    if not alt_text or alt_text.strip() == "":
        issues.append({"type": "missing_alt_text", "severity": "medium"})

    if link:
        canonical_domains = ["jasoncholloway.com", "seventhcitypress.com"]
        is_canonical = any(domain in link for domain in canonical_domains)
        if not is_canonical:
            issues.append({
                "type": "non_canonical_link",
                "severity": "low",
                "detail": link,
            })

    for isbn_entry in canon.get("isbn_matrix", []):
        isbn = isbn_entry["isbn"]
        if isbn in description or isbn in title:
            if isbn != isbn_entry["isbn"]:
                issues.append({
                    "type": "incorrect_isbn",
                    "severity": "critical",
                    "detail": f"Found ISBN that doesn't match canon for {isbn_entry['title']}",
                })

    return issues


def collect_analytics(client: PinterestClient, pin_id: str) -> dict:
    """Collect 30-day analytics for a pin. Returns empty dict on failure."""
    end_date = datetime.now().strftime("%Y-%m-%d")
    start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")

    try:
        return client.get_pin_analytics(pin_id, start_date, end_date)
    except PinterestAPIError as e:
        logger.warning("Analytics unavailable for pin %s: %s", pin_id, e)
        return {}


def run_audit():
    setup_logging()
    OUTPUT_DIR.mkdir(exist_ok=True)

    console.print("[bold blue]Phase 1: Pinterest Account Audit[/bold blue]")
    console.print("=" * 50)

    client = PinterestClient()
    canon = load_brand_canon()

    console.print("\n[yellow]Fetching user account...[/yellow]")
    user = client.get_user_account()
    console.print(f"  Account: {user.get('username', 'unknown')}")

    console.print("\n[yellow]Crawling boards...[/yellow]")
    boards = client.list_boards()
    console.print(f"  Found {len(boards)} boards")

    audit_data = {
        "timestamp": datetime.now().isoformat(),
        "account": user,
        "boards": [],
        "summary": {
            "total_boards": 0,
            "total_sections": 0,
            "total_pins": 0,
            "issues": {
                "critical": 0,
                "high": 0,
                "medium": 0,
                "low": 0,
            },
        },
        "all_issues": [],
    }

    total_pins = 0
    all_issues = []

    for board in boards:
        board_id = board["id"]
        board_name = board.get("name", "Untitled")
        console.print(f"\n  [cyan]Board:[/cyan] {board_name}")

        sections = client.list_sections(board_id)
        console.print(f"    Sections: {len(sections)}")

        pins = client.list_pins(board_id)
        console.print(f"    Pins: {len(pins)}")

        board_report = {
            "id": board_id,
            "name": board_name,
            "description": board.get("description", ""),
            "pin_count": len(pins),
            "section_count": len(sections),
            "sections": [],
            "pins": [],
            "issues": [],
        }

        for section in sections:
            section_pins = client.list_section_pins(board_id, section["id"])
            board_report["sections"].append({
                "id": section["id"],
                "name": section.get("name", ""),
                "pin_count": len(section_pins),
            })

        for pin in pins:
            pin_issues = validate_pin(pin, canon)
            analytics = collect_analytics(client, pin["id"])

            pin_report = {
                "id": pin["id"],
                "title": pin.get("title", ""),
                "description": pin.get("description", "")[:100],
                "link": pin.get("link", ""),
                "has_alt_text": bool(pin.get("alt_text")),
                "created_at": pin.get("created_at", ""),
                "analytics": analytics,
                "issues": pin_issues,
            }

            board_report["pins"].append(pin_report)
            board_report["issues"].extend(pin_issues)

            for issue in pin_issues:
                issue["pin_id"] = pin["id"]
                issue["pin_title"] = pin.get("title", "Untitled")
                issue["board"] = board_name
                all_issues.append(issue)

        total_pins += len(pins)
        audit_data["boards"].append(board_report)
        audit_data["summary"]["total_sections"] += len(sections)

    audit_data["summary"]["total_boards"] = len(boards)
    audit_data["summary"]["total_pins"] = total_pins
    audit_data["all_issues"] = all_issues

    for issue in all_issues:
        severity = issue.get("severity", "low")
        audit_data["summary"]["issues"][severity] = (
            audit_data["summary"]["issues"].get(severity, 0) + 1
        )

    report_path = OUTPUT_DIR / "audit_report.json"
    with open(report_path, "w") as f:
        json.dump(audit_data, f, indent=2, default=str)

    console.print("\n" + "=" * 50)
    console.print("[bold green]Audit Complete[/bold green]")
    console.print(f"\n  Report: {report_path}")

    table = Table(title="Audit Summary")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="green")
    table.add_row("Total Boards", str(audit_data["summary"]["total_boards"]))
    table.add_row("Total Sections", str(audit_data["summary"]["total_sections"]))
    table.add_row("Total Pins", str(audit_data["summary"]["total_pins"]))
    table.add_row("Critical Issues", str(audit_data["summary"]["issues"]["critical"]))
    table.add_row("High Issues", str(audit_data["summary"]["issues"]["high"]))
    table.add_row("Medium Issues", str(audit_data["summary"]["issues"]["medium"]))
    table.add_row("Low Issues", str(audit_data["summary"]["issues"]["low"]))
    table.add_row("API Calls Made", str(client.request_count))
    console.print(table)

    return audit_data


if __name__ == "__main__":
    run_audit()
