#!/usr/bin/env python3
"""Batch-rebuild Books 1-3 HC/PB interiors from BUILD docx (post-geo)."""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
SCRIPTS = ROOT / "production_staging" / "_scripts_from_windows"

# ---------------------------------------------------------------------------
# Authoritative page counts. DO NOT reintroduce hardcoded numbers below.
#
# HISTORY (2026-08-29): this module used to carry a literal `canon_pages` column
# in JOBS -- 156/178/218/260/170/200 -- captured from a July snapshot. The
# interiors were later rebuilt and legitimately grew, but nobody updated the
# column, so the SUMMARY block at the end of main() diffed *correct* rebuild
# output against *stale* constants and reported a phantom "+7 HC / +11 PB"
# drift. That falsely marked six shippable titles as blocked and cost a day of
# investigation. The same stale table also propagated into live public metadata
# on four external sites. Correct counts: 163/189 (Vol I HC/PB), 225/271
# (Vol II), 177/205 (Vol III).
#
# The fix is structural, not numeric: the comparator is now read at startup from
# lib/data/ingram-catalog.json (synced from IngramSpark), so it cannot go stale
# independently of the catalog. Any future page-count change belongs in that
# JSON. If you are tempted to paste an integer into this file, don't.
#
# Path is resolved from this file's location, not the cwd and not an absolute
# literal, so it survives being run from anywhere or from another checkout.
# ---------------------------------------------------------------------------
CATALOG = Path(__file__).resolve().parents[2] / "lib" / "data" / "ingram-catalog.json"


def _load_catalog_by_isbn() -> dict:
    """Load the IngramSpark catalog. Fail loudly; never fall back to constants."""
    if not CATALOG.exists():
        raise SystemExit(
            "FATAL: authoritative page-count source not found:\n"
            f"  {CATALOG}\n"
            "Refusing to run. Page counts must come from lib/data/ingram-catalog.json,\n"
            "never from constants in this script (see HISTORY comment above).\n"
            "Restore the file or correct CATALOG, then re-run."
        )
    try:
        catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        raise SystemExit(f"FATAL: cannot read/parse {CATALOG}: {exc}")
    by_isbn = catalog.get("byIsbn")
    if not isinstance(by_isbn, dict) or not by_isbn:
        raise SystemExit(f"FATAL: {CATALOG} has no usable 'byIsbn' map; refusing to guess page counts.")
    return by_isbn


def canon_page_count(isbn: str) -> int:
    """Authoritative page count for one ISBN, or a loud abort."""
    record = _CATALOG_BY_ISBN.get(isbn)
    if record is None:
        raise SystemExit(
            f"FATAL: ISBN {isbn} is absent from {CATALOG.name}; cannot verify its page count.\n"
            "Add the edition to the catalog rather than hardcoding a number here."
        )
    pages = record.get("pageCount")
    if not isinstance(pages, int) or pages <= 0:
        raise SystemExit(
            f"FATAL: ISBN {isbn} has no usable integer pageCount in {CATALOG.name} (got {pages!r})."
        )
    return pages


_CATALOG_BY_ISBN = _load_catalog_by_isbn()

JOB_SPECS = [
    # book, kind, script, isbn, folder_rel, width_in, height_in
    (1, "HC", "generate_book1_interior.py", "9798295800801", "b1_inheritance/9798295800801_HC", 6.14, 9.21),
    (1, "PB", "generate_book1_interior_paperback.py", "9798256008048", "b1_inheritance/9798256008048_PB", 5.5, 8.5),
    (2, "HC", "generate_book2_interior.py", "9798295812675", "b2_grimoire/9798295812675_HC", 6.14, 9.21),
    (2, "PB", "generate_book2_interior_paperback.py", "9798256009953", "b2_grimoire/9798256009953_PB", 5.5, 8.5),
    (3, "HC", "generate_book3_interior.py", "9798295812705", "b3_kingdom/9798295812705_HC", 6.14, 9.21),
    (3, "PB", "generate_book3_interior_paperback.py", "9798256010072", "b3_kingdom/9798256010072_PB", 5.5, 8.5),
]

# The trailing canon_pages field is appended from the catalog, not typed in, so
# JOBS keeps the exact 8-field shape main() already consumes. Resolved at import
# time on purpose: a missing or broken catalog aborts before any interior.pdf is
# touched, rather than halfway through a rebuild.
JOBS = [spec + (canon_page_count(spec[3]),) for spec in JOB_SPECS]


def main() -> int:
    results = []
    for book, kind, script, isbn, folder, w, h, canon in JOBS:
        out_dir = ROOT / "production_staging" / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        interior = out_dir / "interior.pdf"
        if interior.exists():
            backup = out_dir / f"interior_PRE_GEO.pdf"
            if not backup.exists():
                shutil.copy2(interior, backup)
                print(f"archived {backup.name}", flush=True)

        env = os.environ.copy()
        env["PYTHONIOENCODING"] = "utf-8"
        env["BUILD_ISBN"] = isbn
        env["BUILD_IMPRINT"] = "Seventh City Press"
        env["BUILD_AUTHOR"] = "Jason Carroll Holloway"
        env["BUILD_OUTPUT"] = str(interior)
        env["BUILD_WIDTH_PT"] = str(w * 72)
        env["BUILD_HEIGHT_PT"] = str(h * 72)

        print(f"\n=== BOOK {book} {kind} ISBN {isbn} -> {interior} ===", flush=True)
        rc = subprocess.call([sys.executable, "-u", str(SCRIPTS / script)], env=env, cwd=str(ROOT))
        results.append((book, kind, isbn, rc, interior if interior.exists() else None, canon))
        if rc != 0:
            print(f"FAILED rc={rc}", flush=True)

    print("\n=== SUMMARY ===", flush=True)
    try:
        import fitz
    except ImportError:
        fitz = None
    for book, kind, isbn, rc, path, canon in results:
        if rc != 0 or path is None:
            print(f"  FAIL Book{book} {kind} {isbn}", flush=True)
            continue
        pages = "?"
        trim = "?"
        if fitz:
            doc = fitz.open(path)
            pages = doc.page_count
            r = doc[0].rect
            trim = f"{r.width/72:.2f}x{r.height/72:.2f}"
            doc.close()
        print(f"  OK Book{book} {kind} {isbn} pages={pages} (canon {canon}) trim={trim}", flush=True)
    return 0 if all(r[3] == 0 for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
