#!/usr/bin/env python3
"""Batch-rebuild Books 1-3 HC/PB interiors from BUILD docx (post-geo)."""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
SCRIPTS = ROOT / "production_staging" / "_scripts_from_windows"

JOBS = [
    # book, kind, script, isbn, folder_rel, width_in, height_in, canon_pages
    (1, "HC", "generate_book1_interior.py", "9798295800801", "b1_inheritance/9798295800801_HC", 6.14, 9.21, 156),
    (1, "PB", "generate_book1_interior_paperback.py", "9798256008048", "b1_inheritance/9798256008048_PB", 5.5, 8.5, 178),
    (2, "HC", "generate_book2_interior.py", "9798295812675", "b2_grimoire/9798295812675_HC", 6.14, 9.21, 218),
    (2, "PB", "generate_book2_interior_paperback.py", "9798256009953", "b2_grimoire/9798256009953_PB", 5.5, 8.5, 260),
    (3, "HC", "generate_book3_interior.py", "9798295812705", "b3_kingdom/9798295812705_HC", 6.14, 9.21, 170),
    (3, "PB", "generate_book3_interior_paperback.py", "9798256010072", "b3_kingdom/9798256010072_PB", 5.5, 8.5, 200),
]


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
