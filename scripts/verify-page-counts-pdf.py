#!/usr/bin/env python3
"""Verify lib/data/ingram-catalog.json against the printed interiors.

The catalog JSON is the single source of truth for page counts, but it is filed
by hand from an IngramSpark report. This checks it against the only harder
evidence available: the page count PyMuPDF reads out of each interior PDF.

Opt-in, and deliberately *not* part of `prebuild`. The prebuild gate must run on
any machine that can run `next build`, including CI where Python and PyMuPDF are
not installed; making the Node build depend on a Python wheel would trade a
metadata bug for a broken build. Run this instead whenever an interior is
re-flowed, and before an upload:

    python scripts/verify-page-counts-pdf.py

Exits 0 when every interior matches the catalog, 1 on any mismatch.

The PDFs are opened read-only and never saved. Each file's size and modification
time are recorded before the read and re-checked afterwards, so a regression that
made this script write would fail loudly rather than quietly alter a print
master.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = REPO_ROOT / "lib" / "data" / "ingram-catalog.json"
STAGING_ROOT = REPO_ROOT / "production_staging"

# production_staging/<book>/<ISBN>_<FORMAT>/interior.pdf
EDITION_DIR = re.compile(r"^(?P<isbn>97[89]\d{10})_(?P<fmt>HC|PB)$")


def load_catalog_counts() -> dict[str, int]:
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    return {e["isbn"]: e["pageCount"] for e in catalog["editions"]}


def find_interiors() -> list[tuple[str, str, Path]]:
    """Return (isbn, format, path) for every staged interior PDF."""
    found = []
    for pdf in sorted(STAGING_ROOT.glob("*/*/interior.pdf")):
        match = EDITION_DIR.match(pdf.parent.name)
        if match:
            found.append((match["isbn"], match["fmt"], pdf))
    return found


def read_page_count(pdf: Path) -> int:
    import fitz  # PyMuPDF; imported here so --help works without it installed

    before = pdf.stat()
    doc = fitz.open(pdf)
    try:
        page_count = doc.page_count
    finally:
        doc.close()
    after = pdf.stat()
    if (before.st_size, before.st_mtime_ns) != (after.st_size, after.st_mtime_ns):
        raise RuntimeError(f"{pdf} was modified while being read — aborting")
    return page_count


def main() -> int:
    catalog_counts = load_catalog_counts()
    interiors = find_interiors()
    if not interiors:
        print(f"No interior PDFs found under {STAGING_ROOT}", file=sys.stderr)
        return 1

    problems: list[str] = []
    print(f"Checking {len(interiors)} interiors against {CATALOG_PATH.name}\n")

    for isbn, fmt, pdf in interiors:
        expected = catalog_counts.get(isbn)
        try:
            actual = read_page_count(pdf)
        except Exception as exc:  # noqa: BLE001 - report and keep going
            problems.append(f"{isbn} {fmt}: could not read {pdf.name}: {exc}")
            continue

        if expected is None:
            problems.append(f"{isbn} {fmt}: no catalog entry for this ISBN")
            continue

        status = "OK " if actual == expected else "BAD"
        print(f"  {status} {isbn} {fmt}  catalog={expected:>4}  pdf={actual:>4}")
        if actual != expected:
            problems.append(
                f"{isbn} {fmt}: catalog says {expected} pages, "
                f"{pdf.relative_to(REPO_ROOT)} has {actual}"
            )

    if problems:
        print("\nPDF page-count verification FAILED\n", file=sys.stderr)
        for problem in problems:
            print(f"  {problem}", file=sys.stderr)
        print(
            "\nEither the interior was re-flowed and lib/data/ingram-catalog.json "
            "needs a\nfresh sync, or the wrong interior is staged.\n",
            file=sys.stderr,
        )
        return 1

    print(f"\nAll {len(interiors)} interiors match lib/data/ingram-catalog.json.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
