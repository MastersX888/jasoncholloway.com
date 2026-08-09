"""
Phase 4: Template-Based Content Generation.

Reads content_plan.json and pin_templates.json to generate pin specs.
Validates all content against brand canon. Outputs staged_pins.json
for human review — does NOT auto-publish anything.
"""

import json
import logging
import sys
from datetime import datetime
from pathlib import Path

from rich.console import Console
from rich.table import Table

console = Console()
logger = logging.getLogger("phase4_generate")

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


def load_config(filename: str) -> dict:
    with open(CONFIG_DIR / filename) as f:
        return json.load(f)


def load_content_plan() -> dict:
    plan_path = OUTPUT_DIR / "content_plan.json"
    if not plan_path.exists():
        console.print("[red]No content plan found. Run phase3_analyze.py first.[/red]")
        sys.exit(1)
    with open(plan_path) as f:
        return json.load(f)


def resolve_link(link_rule: str, canon: dict) -> str:
    """Resolve a link rule from templates against brand canon."""
    parts = link_rule.split(".")
    obj = canon
    for part in parts:
        if isinstance(obj, dict):
            obj = obj.get(part, "")
        else:
            return ""
    return obj if isinstance(obj, str) else ""


def validate_against_canon(pin_spec: dict, canon: dict) -> list:
    """Validate generated pin content against brand canon. Returns issues."""
    issues = []

    for isbn_entry in canon.get("isbn_matrix", []):
        isbn = isbn_entry["isbn"]
        if isbn in pin_spec.get("description", ""):
            matching = [
                e for e in canon["isbn_matrix"] if e["isbn"] == isbn
            ]
            if not matching:
                issues.append(f"ISBN {isbn} not found in brand canon")

    link = pin_spec.get("link", "")
    if link:
        valid_domains = ["jasoncholloway.com", "seventhcitypress.com"]
        if not any(d in link for d in valid_domains):
            issues.append(f"Link {link} not a canonical domain")

    factual_anchors = canon.get("factual_anchors", {})
    desc = pin_spec.get("description", "").lower()

    if "voynich" in desc and "yale" not in desc and "beinecke" not in desc:
        issues.append("Voynich mentioned without Yale Beinecke attribution")
    if "schumann" in desc and "7.83" not in desc:
        issues.append("Schumann resonance mentioned without 7.83 Hz")
    if "chladni" in desc and "1756" not in desc:
        issues.append("Chladni mentioned without birth year 1756")
    if "hans jenny" in desc.lower() and "1904" not in desc:
        issues.append("Hans Jenny mentioned without birth year 1904")
    if "codex gigas" in desc and "stockholm" not in desc:
        issues.append("Codex Gigas mentioned without Stockholm location")
    if "subtropolis" in desc and "kansas city" not in desc.lower():
        issues.append("SubTropolis mentioned without Kansas City")
    if "strahov" in desc and "prague" not in desc.lower():
        issues.append("Strahov mentioned without Prague")

    return issues


def generate_book_promo_pin(canon: dict, templates: dict, isbn_entry: dict) -> dict:
    """Generate a book promo pin from an ISBN entry."""
    template = templates["templates"]["book_promo"]
    volume = isbn_entry.get("volume", "")
    volume_hashtag = f"Volume{volume}" if volume else "Omnibus"

    title = template["title_pattern"].format(
        title=isbn_entry["title"],
        format=isbn_entry["format"],
        volume=volume or "Complete",
    )

    description = template["description_pattern"].format(
        title=isbn_entry["title"],
        volume=volume or "Complete Collection",
        tagline=canon["tagline"],
        isbn=isbn_entry["isbn"],
        volume_hashtag=volume_hashtag,
    )

    link = resolve_link(template["link_rule"], canon)

    return {
        "title": title[:100],
        "description": description[:500],
        "link": link,
        "alt_text": f"{isbn_entry['title']} by Jason Carroll Holloway — {isbn_entry['format']} edition",
        "keywords": template["keywords"],
        "pin_type": "book_promo",
        "source_isbn": isbn_entry["isbn"],
    }


def generate_field_note_pin(canon: dict, templates: dict, subject: str, description_text: str, pillar: str) -> dict:
    """Generate a field note pin."""
    template = templates["templates"]["field_note"]
    pillar_hashtag = pillar.replace(":", "").replace(" ", "")

    title = template["title_pattern"].format(subject=subject)

    description = template["description_pattern"].format(
        description=description_text,
        link=resolve_link(template["link_rule"], canon),
        pillar_hashtag=pillar_hashtag,
    )

    return {
        "title": title[:100],
        "description": description[:500],
        "link": resolve_link(template["link_rule"], canon),
        "alt_text": f"Field Note: {subject} — researched facts behind the Masters X trilogy",
        "keywords": template["keywords"],
        "pin_type": "field_note",
    }


def generate_kansas_city_pin(canon: dict, templates: dict, location: str, description_text: str) -> dict:
    """Generate a Kansas City location pin."""
    template = templates["templates"]["kansas_city"]
    location_hashtag = location.replace(" ", "").replace("'", "")

    title = template["title_pattern"].format(location=location)

    description = template["description_pattern"].format(
        location=location,
        description=description_text,
        location_hashtag=location_hashtag,
    )

    return {
        "title": title[:100],
        "description": description[:500],
        "link": resolve_link(template["link_rule"], canon),
        "alt_text": f"{location}, Kansas City — real location featured in Masters X",
        "keywords": template["keywords"],
        "pin_type": "kansas_city",
    }


def generate_manuscript_pin(canon: dict, templates: dict, name: str, description_text: str, repository: str) -> dict:
    """Generate a manuscript reference pin."""
    template = templates["templates"]["manuscript"]
    manuscript_hashtag = name.replace(" ", "").replace("'", "")

    title = template["title_pattern"].format(manuscript_name=name)

    description = template["description_pattern"].format(
        manuscript_name=name,
        description=description_text,
        repository=repository,
        manuscript_hashtag=manuscript_hashtag,
    )

    return {
        "title": title[:100],
        "description": description[:500],
        "link": resolve_link(template["link_rule"], canon),
        "alt_text": f"{name} — medieval manuscript referenced in Masters X",
        "keywords": template["keywords"],
        "pin_type": "manuscript",
    }


def generate_acoustic_pin(canon: dict, templates: dict, phenomenon: str, description_text: str) -> dict:
    """Generate an acoustic science pin."""
    template = templates["templates"]["acoustic_science"]
    science_hashtag = phenomenon.replace(" ", "")

    title = template["title_pattern"].format(phenomenon=phenomenon)

    description = template["description_pattern"].format(
        description=description_text,
        science_hashtag=science_hashtag,
    )

    return {
        "title": title[:100],
        "description": description[:500],
        "link": resolve_link(template["link_rule"], canon),
        "alt_text": f"{phenomenon} — real acoustic science explored in Masters X",
        "keywords": template["keywords"],
        "pin_type": "acoustic_science",
    }


def generate_monograph_pin(canon: dict, templates: dict, subject: str, description_text: str) -> dict:
    """Generate a Hawkes monograph pin."""
    template = templates["templates"]["monograph"]
    hawkes_isbns = [
        e for e in canon["isbn_matrix"]
        if "Innocence" in e["title"] and e["format"] == "Paperback"
    ]
    isbn = hawkes_isbns[0]["isbn"] if hawkes_isbns else ""

    title = template["title_pattern"].format(subject=subject)

    description = template["description_pattern"].format(
        description=description_text,
        isbn=isbn,
    )

    return {
        "title": title[:100],
        "description": description[:500],
        "link": resolve_link(template["link_rule"], canon),
        "alt_text": f"From 'Innocence, Desire and the Architecture of the Fall' — on {subject}",
        "keywords": template["keywords"],
        "pin_type": "monograph",
    }


SAMPLE_CONTENT = {
    "field_notes": [
        ("The Voynich Manuscript", "MS 408 at Yale Beinecke Rare Book & Manuscript Library — an undeciphered 15th-century codex central to the Masters X plot"),
        ("SubTropolis, Kansas City", "A real 55-million-square-foot underground business complex in Kansas City, Missouri, carved from limestone mines"),
        ("The Strahov Monastery Library", "Strahov Monastery in Prague houses one of Europe's most significant theological and philosophical collections"),
        ("Schumann Resonance", "The Earth's electromagnetic resonance at 7.83 Hz — the fundamental frequency explored in the trilogy"),
        ("The Ars Notoria", "A real medieval grimoire from the Lesser Key of Solomon tradition, promising divine knowledge through ritual prayer"),
    ],
    "kansas_city": [
        ("SubTropolis", "The world's largest underground business complex — 55 million square feet beneath Kansas City, Missouri"),
        ("West Bottoms", "Historic industrial district in Kansas City with 19th-century warehouse architecture"),
        ("Union Station", "Kansas City's Beaux-Arts railroad station, opened 1914, site of the 1933 Union Station Massacre"),
        ("Liberty Memorial", "National World War I Museum and Memorial, Kansas City — the only major U.S. WWI memorial"),
    ],
    "manuscripts": [
        ("Voynich Manuscript (MS 408)", "Undeciphered illustrated codex, carbon-dated to early 15th century", "Yale Beinecke Rare Book & Manuscript Library"),
        ("Codex Gigas", "The largest extant medieval manuscript, 13th century, containing the famous Devil's Bible illustration", "National Library of Sweden, Stockholm"),
        ("Ars Notoria", "Medieval grimoire promising knowledge through angelic invocations, part of the Solomonic magical tradition", "Multiple repositories; British Library holds key copies"),
    ],
    "acoustic_science": [
        ("Chladni Patterns", "Ernst Chladni (1756–1827) demonstrated that vibrating plates produce geometric patterns in sand — the foundation of modern acoustics"),
        ("Cymatics", "Term coined by Hans Jenny (1904–1972) for the study of visible sound and vibration patterns in matter"),
        ("Schumann Resonance", "The Earth's fundamental electromagnetic resonance frequency at 7.83 Hz, first predicted by Winfried Otto Schumann in 1952"),
    ],
    "monograph": [
        ("Hawkes and the Landscape of Cruelty", "Examining how John Hawkes constructs landscapes that externalize psychological violence without moral commentary"),
        ("The Architecture of Innocence Lost", "Close reading of innocence as structural element in Hawkes's experimental narratives"),
    ],
}


def generate_all_pins(content_plan: dict) -> list:
    """Generate pins based on content plan and templates."""
    canon = load_config("brand_canon.json")
    templates = load_config("pin_templates.json")
    staged_pins = []

    for action in content_plan.get("content_actions", []):
        pin_type = action.get("pin_type", "")
        board = action.get("board", "")
        board_id = action.get("board_id", "")
        quantity = action.get("quantity_needed", 1)

        if pin_type == "book_cover" or pin_type == "buy_link" or pin_type == "format_comparison":
            for isbn_entry in canon["isbn_matrix"][:quantity]:
                pin = generate_book_promo_pin(canon, templates, isbn_entry)
                pin["target_board"] = board
                pin["target_board_id"] = board_id
                staged_pins.append(pin)

        elif pin_type == "field_note" or pin_type == "historical_document":
            for subject, desc in SAMPLE_CONTENT["field_notes"][:quantity]:
                pin = generate_field_note_pin(canon, templates, subject, desc, action.get("pillar", ""))
                pin["target_board"] = board
                pin["target_board_id"] = board_id
                staged_pins.append(pin)

        elif pin_type in ("kansas_city", "location_photo", "map_pin"):
            for location, desc in SAMPLE_CONTENT["kansas_city"][:quantity]:
                pin = generate_kansas_city_pin(canon, templates, location, desc)
                pin["target_board"] = board
                pin["target_board_id"] = board_id
                staged_pins.append(pin)

        elif pin_type in ("manuscript", "archive_reference", "illumination"):
            for name, desc, repo in SAMPLE_CONTENT["manuscripts"][:quantity]:
                pin = generate_manuscript_pin(canon, templates, name, desc, repo)
                pin["target_board"] = board
                pin["target_board_id"] = board_id
                staged_pins.append(pin)

        elif pin_type in ("acoustic_science", "cymatics_visual", "experiment"):
            for phenomenon, desc in SAMPLE_CONTENT["acoustic_science"][:quantity]:
                pin = generate_acoustic_pin(canon, templates, phenomenon, desc)
                pin["target_board"] = board
                pin["target_board_id"] = board_id
                staged_pins.append(pin)

        elif pin_type in ("monograph", "literary_criticism"):
            for subject, desc in SAMPLE_CONTENT["monograph"][:quantity]:
                pin = generate_monograph_pin(canon, templates, subject, desc)
                pin["target_board"] = board
                pin["target_board_id"] = board_id
                staged_pins.append(pin)

    return staged_pins


def run_generation():
    setup_logging()
    OUTPUT_DIR.mkdir(exist_ok=True)

    console.print("[bold blue]Phase 4: Content Generation[/bold blue]")
    console.print("=" * 50)

    content_plan = load_content_plan()
    canon = load_config("brand_canon.json")

    actions = content_plan.get("content_actions", [])
    console.print(f"\nContent plan has {len(actions)} actions")

    console.print("\n[yellow]Generating pin specs from templates...[/yellow]")
    staged_pins = generate_all_pins(content_plan)
    console.print(f"  Generated {len(staged_pins)} pin specs")

    console.print("\n[yellow]Validating against brand canon...[/yellow]")
    valid_pins = []
    invalid_pins = []

    for pin in staged_pins:
        issues = validate_against_canon(pin, canon)
        pin["validation_issues"] = issues
        pin["valid"] = len(issues) == 0
        if issues:
            invalid_pins.append(pin)
            logger.warning("Validation issues for '%s': %s", pin["title"], issues)
        else:
            valid_pins.append(pin)

    staged_output = {
        "generated_at": datetime.now().isoformat(),
        "total_pins": len(staged_pins),
        "valid_pins": len(valid_pins),
        "invalid_pins": len(invalid_pins),
        "requires_human_review": True,
        "auto_publish": False,
        "pins": staged_pins,
    }

    staged_path = OUTPUT_DIR / "staged_pins.json"
    with open(staged_path, "w") as f:
        json.dump(staged_output, f, indent=2)

    console.print("\n" + "=" * 50)
    console.print("[bold green]Content Generation Complete[/bold green]")
    console.print(f"\n  Staged pins: {staged_path}")

    table = Table(title="Generation Summary")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="yellow")
    table.add_row("Total Generated", str(len(staged_pins)))
    table.add_row("Valid (ready)", str(len(valid_pins)))
    table.add_row("Invalid (needs review)", str(len(invalid_pins)))
    console.print(table)

    if invalid_pins:
        console.print("\n[bold red]Pins with validation issues:[/bold red]")
        for pin in invalid_pins[:10]:
            console.print(f"  [red]✗[/red] {pin['title']}")
            for issue in pin["validation_issues"]:
                console.print(f"      → {issue}")

    console.print("\n[bold]Next steps:[/bold]")
    console.print("  1. Review staged_pins.json")
    console.print("  2. Fix any validation issues")
    console.print("  3. Run phase5_publish.py (dry_run=True first)")

    return staged_output


if __name__ == "__main__":
    run_generation()
