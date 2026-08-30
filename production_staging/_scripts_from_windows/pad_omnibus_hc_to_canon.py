#!/usr/bin/env python3
"""Pad the omnibus hardcover interior back to its canon 684 pages.

WHY THIS EXISTS
---------------
Removing the two SUB-BOOK divider constructs (author ruling 2026-08-29) reclaimed
four pages in the hardcover: each divider had occupied a recto plus its blank verso.
The paperback absorbed the change through reflow and stayed at its canon 732, but
the hardcover fell 684 -> 680.

The live IngramSpark jacket and caselam were built for 684 pages and their source
PDFs are NOT on this machine (only cover_front_web.png survived the July cleanup),
so the page count has to be held rather than the cover reissued.

Padding is appended at the end rather than at the former divider positions: trailing
blanks are standard in print and invisible to readers, whereas a blank recto dropped
into the middle of the narrative reads as a binding defect.

RUN THIS AFTER EVERY omnibus HC REBUILD. generate_omnibus_interior_HC_CURRENT.py
produces 680 pages; shipping requires 684.

    python pad_omnibus_hc_to_canon.py            # pad in place
    python pad_omnibus_hc_to_canon.py --check     # report only, exit 1 if not 684
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

import fitz

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
INTERIOR = ROOT / "production_staging/omnibus/9798295884412_HC/interior.pdf"
CANON_PAGES = 684
TRIM_W_IN, TRIM_H_IN = 6.14, 9.21
TOL = 0.02


def main() -> int:
    check_only = "--check" in sys.argv
    if not INTERIOR.is_file():
        print(f"MISSING: {INTERIOR}")
        return 1

    doc = fitz.open(INTERIOR)
    pages = doc.page_count
    rect = doc[0].rect
    w_in, h_in = rect.width / 72, rect.height / 72
    trim_ok = abs(w_in - TRIM_W_IN) < TOL and abs(h_in - TRIM_H_IN) < TOL
    print(f"interior.pdf: {pages} pages, trim {w_in:.2f} x {h_in:.2f} in")

    if not trim_ok:
        doc.close()
        print(f"REFUSING: trim is not Royal {TRIM_W_IN} x {TRIM_H_IN}")
        return 1

    if pages == CANON_PAGES:
        doc.close()
        print(f"already at canon {CANON_PAGES}; nothing to do")
        return 0

    if pages > CANON_PAGES:
        doc.close()
        print(f"REFUSING: {pages} exceeds canon {CANON_PAGES}; padding cannot remove pages")
        return 1

    need = CANON_PAGES - pages
    print(f"short by {need} page(s) vs canon {CANON_PAGES}")

    if check_only:
        doc.close()
        return 1

    # Refuse to pad a suspiciously large gap - that would mean a real layout change,
    # not the known 4-page divider reclamation.
    if need > 4:
        doc.close()
        print(f"REFUSING: gap of {need} is larger than the known 4-page divider delta")
        return 1

    bak = INTERIOR.with_suffix(".pdf.PRE_PAD_2026-08-29.bak")
    if not bak.exists():
        shutil.copy2(INTERIOR, bak)
        print(f"backup -> {bak.name}")

    for _ in range(need):
        doc.new_page(width=rect.width, height=rect.height)

    # PyMuPDF refuses a non-incremental save over its own open file, so write to a
    # sibling temp and swap once it is safely on disk.
    tmp = INTERIOR.with_suffix(".pdf.padtmp")
    doc.save(str(tmp), deflate=True, garbage=3)
    doc.close()
    tmp.replace(INTERIOR)

    v = fitz.open(INTERIOR)
    final = v.page_count
    fr = v[0].rect
    tail_blank = [
        i + 1 for i in range(final - need, final) if not v[i].get_text().strip()
    ]
    v.close()
    print(
        f"padded: {final} pages, trim {fr.width/72:.2f} x {fr.height/72:.2f}, "
        f"appended blanks at {tail_blank}"
    )
    return 0 if final == CANON_PAGES else 1


if __name__ == "__main__":
    sys.exit(main())
