#!/usr/bin/env python3
"""Dump DOCX paragraphs containing PRE_GEO needles for patch tuning."""
from pathlib import Path
from docx import Document

NEEDLES = {
    1: ["2847", "Washington County", "Bethany Falls Limestone", "fifty-five feet", "shaft dropped"],
    2: ["Troost Avenue", "Hotel Phillips", "Quality Hill entrance", "mailbox", "11 PM. Quality",
        "house hummed its limestone", "house in Kansas City"],
    3: ["Somewhere below them", "Troost corridor", "West Bottoms, where", "drove down Troost",
        "basalt chamber", "second floor of the Washington", "The house", "front porch",
        "Quality Hill porch", "chambers beneath the bluffs"],
}

base = Path("production_staging/_sources")
for b, needles in NEEDLES.items():
    doc = Document(str(base / f"MASTERS_X_BOOK{b}_ITALICIZED_FIXED.docx"))
    print(f"\n########## BOOK {b} ##########")
    for i, p in enumerate(doc.paragraphs):
        t = p.text or ""
        for n in needles:
            if n in t:
                print(f"--- para {i} needle={n!r} ---")
                print(t[:500])
                print()
                break
