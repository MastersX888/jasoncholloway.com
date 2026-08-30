#!/usr/bin/env python3
"""Sync Ingram report.csv metadata across the Seventh City Press project."""

from __future__ import annotations

import csv
import html
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT_DEFAULT = Path.home() / "Downloads" / "report.csv"
CATALOG_JSON = ROOT / "lib" / "data" / "ingram-catalog.json"
SHOPPING_CSV = ROOT / "public" / "feeds" / "google-shopping.csv"
GOOGLE_BOOKS_TEMPLATE = Path.home() / "Downloads" / "GoogleBooksTemplate_Default_Settings.en_US.csv"
GOOGLE_BOOKS_OUT = Path.home() / "Desktop" / "google_books_upload" / "GoogleBooksTemplate_filled_v4.csv"
GOOGLE_BOOKS_UPLOAD = Path.home() / "Desktop" / "google_books_upload"
EPUB_COVERS = ROOT / "epub_covers"

SITE = "https://jasoncholloway.com"
BRAND = "Seventh City Press"
AUTHOR = "Jason Carroll Holloway"
CONTRIBUTOR = f"{AUTHOR} [Author]"
BIO = (
    "Jason Carroll Holloway holds an M.A. in English Literature from Mercy "
    "University in Dobbs Ferry, New York, as well as various degrees and "
    "certificates in Psychology, Sociology, Creative Writing, and Data "
    "Analytics. He is a writer and researcher whose work explores the "
    "intersection of acoustic science, medieval scholarship, and human "
    "consciousness. He lives in Kansas City."
)
PUBLISHER = "Seventh City Press"

# Google Merchant Center — US print defaults (batch-applied to all 10 SKUs).
# Verify against a live IngramSpark checkout and adjust if needed.
SHIPPING_COUNTRY = "US"
SHIPPING_SERVICE = "Standard"
SHIPPING_PRICE_USD = "5.99"  # flat US rate; must match Merchant Center shipping policy
SHIPPING_TRANSIT_MIN = 5
SHIPPING_TRANSIT_MAX = 10
GOOGLE_BOOKS_CATEGORY = "784"  # Media > Books (numeric ID)

# ISBNs included in Google Shopping (print only)
SHOPPING_PRODUCTS: dict[str, dict[str, str]] = {
    "9798295778247": {
        "id": "hawkes-pb",
        "link": f"{SITE}/books/hawkes-monograph/",
        "image": f"{SITE}/covers/hawkes-paperback-web.png",
        "format_label": "Paperback",
        "weight_lb": "0.35",
    },
    "9798349308444": {
        "id": "hawkes-hc",
        "link": f"{SITE}/books/hawkes-monograph/",
        "image": f"{SITE}/covers/hawkes-hardcover-web.png",
        "format_label": "Hardcover",
        "weight_lb": "0.55",
    },
    "9798256008048": {
        "id": "mx1-pb",
        "link": f"{SITE}/books/masters-x/the-inheritance-of-frequency/",
        "image": f"{SITE}/covers/book1-paperback-web.jpg",
        "format_label": "Paperback",
        "weight_lb": "0.65",
    },
    "9798295800801": {
        "id": "mx1-hc",
        "link": f"{SITE}/books/masters-x/the-inheritance-of-frequency/",
        "image": f"{SITE}/covers/book1-hardcover-v3.png",
        "format_label": "Hardcover",
        "weight_lb": "0.85",
    },
    "9798256009953": {
        "id": "mx2-pb",
        "link": f"{SITE}/books/masters-x/the-grimoire/",
        "image": f"{SITE}/covers/book2-paperback-web.jpg",
        "format_label": "Paperback",
        "weight_lb": "0.75",
    },
    "9798295812675": {
        "id": "mx2-hc",
        "link": f"{SITE}/books/masters-x/the-grimoire/",
        "image": f"{SITE}/covers/book2-hardcover-v3.png",
        "format_label": "Hardcover",
        "weight_lb": "0.95",
    },
    "9798256010072": {
        "id": "mx3-pb",
        "link": f"{SITE}/books/masters-x/the-kingdom/",
        "image": f"{SITE}/covers/book3-paperback-web.jpg",
        "format_label": "Paperback",
        "weight_lb": "0.80",
    },
    "9798295812705": {
        "id": "mx3-hc",
        "link": f"{SITE}/books/masters-x/the-kingdom/",
        "image": f"{SITE}/covers/book3-hardcover-v3.png",
        "format_label": "Hardcover",
        "weight_lb": "1.05",
    },
    "9798295884412": {
        "id": "mx-omnibus-hc",
        "link": f"{SITE}/books/masters-x/omnibus/",
        "image": f"{SITE}/covers/omnibus-hardcover-v3.png",
        "format_label": "Hardcover",
        "weight_lb": "2.75",
    },
    "9798256072704": {
        "id": "mx-omnibus-pb",
        "link": f"{SITE}/books/masters-x/omnibus/",
        "image": f"{SITE}/covers/omnibus-hardcover-v3.png",
        "format_label": "Paperback",
        "weight_lb": "2.25",
    },
}

# EPUB rows for Google Books Partner Center
GOOGLE_BOOKS_EPUBS = [
    {
        "isbn": "9798256008819",
        "subtitle": "The Inheritance of Frequency",
        "series": "Masters X",
        "volume": "1",
        "related_pb": "9798256008048",
        "related_hc": "9798295800801",
        "buy_url": "https://www.amazon.com/dp/B0H4KYMSM1",
        "cover_src": "book1-epub.jpg",
    },
    {
        "isbn": "9798256009625",
        "subtitle": "The Grimoire",
        "series": "Masters X",
        "volume": "2",
        "related_pb": "9798256009953",
        "related_hc": "9798295812675",
        "buy_url": "https://www.amazon.com/dp/B0H4KQ4YQJ",
        "cover_src": "book2-epub.jpg",
    },
    {
        "isbn": "9798256009809",
        "subtitle": "The Kingdom",
        "series": "Masters X",
        "volume": "3",
        "related_pb": "9798256010072",
        "related_hc": "9798295812705",
        "buy_url": "https://www.amazon.com/dp/B0H4L36X21",
        "cover_src": "book3-epub.jpg",
    },
    {
        "isbn": "9798295778926",
        "subtitle": "The Grape and Its Counter-Symbols in the Fiction of John Hawkes",
        "series": "",
        "volume": "",
        "related_pb": "9798295778247",
        "related_hc": "9798349308444",
        "buy_url": "",
        "cover_src": "hawkes-epub.jpg",
        "title_override": "Innocence, Desire, and the Architecture of the Fall",
    },
]

FORMAT_LABELS = {
    "Perfect Bound": "Paperback",
    "Jacketed Case Laminate": "Hardcover",
    'Digital Cloth! Cover - Gray"': "Hardcover",
    "EPUB": "Ebook",
}


def strip_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_date(value: str) -> str:
    value = (value or "").strip()
    for fmt in ("%d-%b-%y", "%m/%d/%Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return value


def load_report(path: Path) -> dict[str, dict]:
    rows: dict[str, dict] = {}
    with path.open(newline="", encoding="utf-8-sig") as handle:
        for row in csv.DictReader(handle):
            isbn = (row.get("ISBN") or "").strip()
            if not isbn:
                continue
            fmt = (row.get("Format") or "").strip()
            rows[isbn] = {
                "isbn": isbn,
                "title": (row.get("Title") or "").strip(),
                "status": (row.get("Status") or "").strip(),
                "format": fmt,
                "formatLabel": FORMAT_LABELS.get(fmt, fmt),
                "series": (row.get("Series Name") or "").strip(),
                "seriesNumber": (row.get("Series Number") or "").strip(),
                "language": (row.get("Language") or "").strip(),
                "imprint": (row.get("Imprint") or "").strip(),
                "pageCount": int((row.get("Page Count") or "0").strip() or 0),
                "pubDate": parse_date(row.get("Pub Date") or ""),
                "streetDate": parse_date(row.get("Street Date") or ""),
                "usList": (row.get("US List") or "").strip(),
                "keywords": [
                    k.strip()
                    for k in (row.get("Keywords") or "").split(",")
                    if k.strip()
                ],
                "bisac": [
                    code
                    for code in [
                        (row.get("BISAC 1") or "").strip(),
                        (row.get("BISAC 2") or "").strip(),
                        (row.get("BISAC 3") or "").strip(),
                    ]
                    if code
                ],
                "bisacDescriptions": [
                    desc
                    for desc in [
                        (row.get("BISAC 1 Description") or "").strip(),
                        (row.get("BISAC 2 Description") or "").strip(),
                        (row.get("BISAC 3 Description") or "").strip(),
                    ]
                    if desc
                ],
                "booktype": (row.get("Booktype") or "").strip(),
                "descriptionHtml": (row.get("Full Description") or "").strip(),
                "description": strip_html(row.get("Full Description") or row.get("Short Description") or ""),
                "shortDescription": strip_html(row.get("Short Description") or ""),
            }
    return rows


def write_catalog(catalog: dict[str, dict]) -> None:
    payload = {
        "source": "IngramSpark report.csv",
        "syncedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "editions": list(catalog.values()),
        "byIsbn": catalog,
    }
    CATALOG_JSON.parent.mkdir(parents=True, exist_ok=True)
    CATALOG_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {CATALOG_JSON} ({len(catalog)} editions)")


def format_price_usd(value: str) -> str:
    """Google Merchant Center expects 'NN.NN USD' for US listings."""
    return f"{float(value):.2f} USD"


def shipping_attribute() -> str:
    """country:region:service:price — batch default for all print SKUs."""
    return (
        f"{SHIPPING_COUNTRY}::{SHIPPING_SERVICE}:"
        f"{format_price_usd(SHIPPING_PRICE_USD)}"
    )


def write_shopping_feed(catalog: dict[str, dict]) -> None:
    rows = []
    for isbn, meta in SHOPPING_PRODUCTS.items():
        source = catalog.get(isbn)
        if not source:
            raise KeyError(f"ISBN {isbn} missing from report")
        if source["status"] != "Available for Printing/Download":
            print(f"Skipping shopping {isbn}: {source['status']}", file=sys.stderr)
            continue
        title = source["title"]
        if meta["format_label"] not in title:
            title = f"{title} ({meta['format_label']})"
        price = format_price_usd(source["usList"])
        weight = f"{meta['weight_lb']} lb"
        rows.append(
            {
                "id": meta["id"],
                "title": title,
                "description": source["description"] or title,
                "link": meta["link"],
                "image_link": meta["image"],
                "availability": "in_stock",
                "price": price,
                "brand": BRAND,
                "gtin": isbn,
                "condition": "new",
                "google_product_category": GOOGLE_BOOKS_CATEGORY,
                "product_type": f"Books > {meta['format_label']}",
                "identifier_exists": "yes",
                "shipping": shipping_attribute(),
                "shipping_weight": weight,
                "shipping_label": "standard-us",
                "min_handling_time": "1",
                "max_handling_time": "2",
                "min_transit_time": str(SHIPPING_TRANSIT_MIN),
                "max_transit_time": str(SHIPPING_TRANSIT_MAX),
                "age_group": "adult",
            }
        )
    SHOPPING_CSV.parent.mkdir(parents=True, exist_ok=True)
    fields = [
        "id", "title", "description", "link", "image_link", "availability",
        "price", "brand", "gtin", "condition", "google_product_category",
        "product_type", "identifier_exists",
        "shipping", "shipping_weight", "shipping_label",
        "min_handling_time", "max_handling_time",
        "min_transit_time", "max_transit_time",
        "age_group",
    ]
    with SHOPPING_CSV.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {SHOPPING_CSV} ({len(rows)} products)")


def related(pb: str, hc: str) -> str:
    parts = []
    if pb:
        parts.append(f"{pb} [Paperback, Epublication based on]")
    if hc:
        parts.append(f"{hc} [Hardback, Epublication based on]")
    return "; ".join(parts)


def bisac_field(catalog: dict[str, dict], isbn: str) -> str:
    codes = catalog[isbn]["bisac"]
    return "; ".join(f"{code} [BISAC]" for code in codes)


def write_google_books(catalog: dict[str, dict]) -> None:
    if not GOOGLE_BOOKS_TEMPLATE.exists():
        print(f"SKIP Google Books: template not found at {GOOGLE_BOOKS_TEMPLATE}", file=sys.stderr)
        return

    GOOGLE_BOOKS_UPLOAD.mkdir(parents=True, exist_ok=True)
    for item in GOOGLE_BOOKS_EPUBS:
        src = EPUB_COVERS / item["cover_src"]
        dst = GOOGLE_BOOKS_UPLOAD / f"{item['isbn']}.jpg"
        if src.exists():
            shutil.copy2(src, dst)

    book_rows = []
    for item in GOOGLE_BOOKS_EPUBS:
        src = catalog[item["isbn"]]
        title = item.get("title_override") or src["title"]
        if title.startswith("Masters X:"):
            title = "Masters X"
        book_rows.append(
            {
                "Identifier": item["isbn"],
                "Enable for Sale?": "Yes",
                "Title": title,
                "Subtitle": item["subtitle"],
                "Book Format": "Digital",
                "Related Identifier [Format, Relationship], Semicolon-Separated": related(
                    item["related_pb"], item["related_hc"]
                ),
                "Contributor [Role], Semicolon-Separated": CONTRIBUTOR,
                "Biographical Note": BIO,
                "Language": "eng",
                "Subject Code [Schema], Semicolon-Separated": bisac_field(catalog, item["isbn"]),
                "Age Group, Comma-Separated": "18+",
                "Description": src["description"],
                "Publication Date": src["pubDate"],
                "Page Count": str(src["pageCount"]),
                "Series Name": item["series"],
                "Volume in Series": item["volume"],
                "Preview Type": "",
                "Preview Territories": "",
                "Buy Link Text": "Buy on Amazon Kindle" if item["buy_url"] else "",
                "Buy Link": item["buy_url"],
                "Publisher Name": PUBLISHER,
                "Publisher Website": SITE,
                "Show Photos in Preview?": "",
                "PDF Download Allowed?": "",
                "On Sale Date": src["streetDate"] or src["pubDate"],
                "DRM Enabled?": "",
                "Show Photos in eBook?": "",
                "Include Scanned Pages?": "",
                "For Mature Audiences?": "",
                "Copy-Paste Percentage": "",
                "USD [Recommended Retail Price, Excluding Tax] Price": src["usList"],
                "Countries for USD [Recommended Retail Price, Excluding Tax] Price": "WORLD",
                "International Rounding for USD [Recommended Retail Price, Excluding Tax] Price": "",
            }
        )

    with GOOGLE_BOOKS_TEMPLATE.open(encoding="utf-16", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        fieldnames = reader.fieldnames
        rows = list(reader)
    if not rows:
        raise SystemExit("Google Books template missing default row")

    with GOOGLE_BOOKS_OUT.open("w", encoding="utf-16", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, delimiter="\t", quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows([rows[0]] + book_rows)
    print(f"Wrote {GOOGLE_BOOKS_OUT} ({len(book_rows)} EPUBs)")


def main() -> None:
    report_path = Path(sys.argv[1]) if len(sys.argv) > 1 else REPORT_DEFAULT
    if not report_path.exists():
        raise SystemExit(f"Report not found: {report_path}")

    catalog = load_report(report_path)
    write_catalog(catalog)
    write_shopping_feed(catalog)
    write_google_books(catalog)


if __name__ == "__main__":
    main()
