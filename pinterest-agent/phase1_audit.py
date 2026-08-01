"""Phase 1 — Full Pinterest account audit."""

from __future__ import annotations

import html
from datetime import datetime, timedelta, timezone

from agent_utils import (
    CONFIG_DIR,
    OUTPUT_DIR,
    canonical_link_prefixes,
    ensure_dirs,
    extract_isbns,
    is_valid_link,
    isbn_lookup,
    load_canon,
    load_json,
    save_json,
    setup_logging,
    utc_now_iso,
)
from pinterest_client import PinterestClient

logger = setup_logging()


def extract_image_url(pin: dict) -> str:
    media = pin.get("media", {})
    images = media.get("images", {})
    for size in ("1200x", "600x", "400x300", "originals"):
        if size in images:
            return images[size].get("url", "")
    return ""


def generate_html_report(report: dict) -> None:
    rows = []
    for board in report["boards"]:
        for pin in board["pins"]:
            rows.append(
                f"<tr><td>{html.escape(board['name'])}</td>"
                f"<td>{html.escape(pin.get('title') or '(untitled)')}</td>"
                f"<td><a href='{html.escape(pin.get('link') or '')}'>{html.escape((pin.get('link') or '')[:60])}</a></td>"
                f"<td>{'yes' if pin.get('alt_text') else 'no'}</td></tr>"
            )

    warning_items = "".join(
        f"<li><strong>{html.escape(w['type'])}</strong>: {html.escape(str(w))}</li>"
        for w in report.get("warnings", [])[:100]
    )
    body = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>Operation Pinboard Audit — {html.escape(report['timestamp'])}</title>
<style>
body {{ font-family: Georgia, serif; background:#0f1115; color:#e8e4dc; padding:2rem; }}
h1 {{ color:#c9a227; }} table {{ border-collapse:collapse; width:100%; margin-top:1rem; }}
th, td {{ border:1px solid #333; padding:0.5rem; text-align:left; font-size:0.9rem; }}
th {{ background:#1a1d24; }} .stat {{ display:inline-block; margin-right:1.5rem; }}
</style></head><body>
<h1>Operation Pinboard — Account Audit</h1>
<p class="stat"><strong>Boards:</strong> {len(report['boards'])}</p>
<p class="stat"><strong>Pins:</strong> {report['total_pins']}</p>
<p class="stat"><strong>Warnings:</strong> {len(report['warnings'])}</p>
<p class="stat"><strong>Broken links:</strong> {len(report['broken_links'])}</p>
<p class="stat"><strong>ISBN errors:</strong> {len(report['isbn_errors'])}</p>
<h2>Top warnings</h2><ul>{warning_items or '<li>None</li>'}</ul>
<h2>All pins</h2>
<table><thead><tr><th>Board</th><th>Title</th><th>Link</th><th>Alt text</th></tr></thead>
<tbody>{''.join(rows)}</tbody></table></body></html>"""
    path = OUTPUT_DIR / "audit_report.html"
    path.write_text(body, encoding="utf-8")
    logger.info("HTML report -> %s", path)


def audit(include_analytics: bool = False) -> dict:
    ensure_dirs()
    client = PinterestClient()
    canon = load_canon()
    valid_prefixes = canonical_link_prefixes(canon)
    isbn_map = isbn_lookup(canon)

    report = {
        "timestamp": utc_now_iso(),
        "account": client.get_user_account(),
        "boards": [],
        "total_pins": 0,
        "issues": [],
        "warnings": [],
        "orphan_pins": [],
        "broken_links": [],
        "missing_alt_text": [],
        "missing_descriptions": [],
        "isbn_errors": [],
    }

    boards = client.paginate_all(client.list_boards)
    logger.info("Found %s boards", len(boards))

    end_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    start_date = (datetime.now(timezone.utc) - timedelta(days=30)).strftime("%Y-%m-%d")

    for board in boards:
        board_audit = {
            "id": board["id"],
            "name": board["name"],
            "description": board.get("description", ""),
            "pin_count": board.get("pin_count", 0),
            "privacy": board.get("privacy", ""),
            "sections": [],
            "pins": [],
            "issues": [],
        }

        if not board.get("description") or len(board.get("description", "")) < 20:
            report["warnings"].append(
                {
                    "type": "BOARD_DESCRIPTION_WEAK",
                    "board": board["name"],
                    "board_id": board["id"],
                    "current": board.get("description", "(empty)"),
                }
            )

        try:
            sections = client.list_board_sections(board["id"]).get("items", [])
        except Exception:  # noqa: BLE001
            sections = []

        for section in sections:
            section_pins = client.paginate_all(
                client.list_section_pins, board["id"], section["id"]
            )
            board_audit["sections"].append(
                {
                    "id": section["id"],
                    "title": section.get("title", ""),
                    "pin_count": len(section_pins),
                }
            )

        pins = client.paginate_all(client.list_board_pins, board["id"])
        for pin in pins:
            pin_record = {
                "id": pin["id"],
                "title": pin.get("title", ""),
                "description": pin.get("description", ""),
                "link": pin.get("link", ""),
                "alt_text": pin.get("alt_text", ""),
                "created_at": pin.get("created_at", ""),
                "media_type": pin.get("media", {}).get("media_type", ""),
                "image_url": extract_image_url(pin),
                "board_id": board["id"],
                "board_name": board["name"],
            }
            board_audit["pins"].append(pin_record)

            if not pin.get("title"):
                report["warnings"].append(
                    {"type": "MISSING_TITLE", "pin_id": pin["id"], "board": board["name"]}
                )

            desc = pin.get("description", "")
            if not desc or len(desc) < 30:
                report["missing_descriptions"].append(
                    {
                        "pin_id": pin["id"],
                        "board": board["name"],
                        "title": pin.get("title", "(untitled)"),
                    }
                )

            if not pin.get("alt_text"):
                report["missing_alt_text"].append(
                    {
                        "pin_id": pin["id"],
                        "board": board["name"],
                        "title": pin.get("title", "(untitled)"),
                    }
                )

            link = pin.get("link", "")
            if link and not is_valid_link(link, valid_prefixes):
                report["broken_links"].append(
                    {
                        "pin_id": pin["id"],
                        "board": board["name"],
                        "link": link,
                        "title": pin.get("title", "(untitled)"),
                    }
                )

            for found in extract_isbns(desc + " " + pin.get("title", "")):
                if found not in isbn_map:
                    report["isbn_errors"].append(
                        {
                            "pin_id": pin["id"],
                            "board": board["name"],
                            "isbn_found": found,
                            "title": pin.get("title", "(untitled)"),
                        }
                    )

            if include_analytics:
                pin_record["analytics_30d"] = client.get_pin_analytics(
                    pin["id"], start_date, end_date
                )

        board_audit["actual_pin_count"] = len(pins)
        report["boards"].append(board_audit)
        report["total_pins"] += len(pins)

    save_json(OUTPUT_DIR / "audit_report.json", report)
    generate_html_report(report)

    print(f"\nAudit complete. {report['total_pins']} pins across {len(report['boards'])} boards.")
    print(f"Warnings: {len(report['warnings'])} | Broken links: {len(report['broken_links'])}")
    print(f"ISBN errors: {len(report['isbn_errors'])} | Missing alt text: {len(report['missing_alt_text'])}")
    print(f"Reports: {OUTPUT_DIR / 'audit_report.json'}")
    print(f"         {OUTPUT_DIR / 'audit_report.html'}")
    return report


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--analytics", action="store_true")
    args = parser.parse_args()
    audit(include_analytics=args.analytics)
