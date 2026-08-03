"""Probe ITALICIZED DOCX vs DEMY authority text for geo/apartment strings."""
from docx import Document
from pathlib import Path

checks = {
    1: [
        "1647 Genessee",
        "Warren County",
        "Midwest Precote",
        "hundred and fifty feet",
        "RIVERWARDS",
        "2847 Genessee",
        "Washington County",
        "Bethany Falls Limestone Company",
        "fifty-five feet",
    ],
    2: [
        "Washington Street office",
        "Pennsylvania Avenue",
        "Troost Avenue",
        "Hotel Phillips",
        "apartment hummed",
        "in an apartment in Kansas City",
        "in a house in Kansas City",
        "The house hummed its limestone",
    ],
    3: [
        "across the river at SubTropolis",
        "Iceland basalt",
        "Quality Hill balcony",
        "apartment hummed",
        "the long way",
        "front porch",
        "hallway outside",
        "Somewhere below them",
        "West Bottoms, where, 160",
        "Iceland basalt chamber",
    ],
}

base = Path("production_staging/_sources")
for b, needles in checks.items():
    demy_files = list(base.glob(f"MASTERS_X_BOOK{b}_DEMY_*.txt"))
    demy_t = demy_files[0].read_text(encoding="utf-8")
    docx_t = "\n".join(
        p.text for p in Document(base / f"MASTERS_X_BOOK{b}_ITALICIZED_FIXED.docx").paragraphs
    )
    print("==== BOOK", b, "====")
    for n in needles:
        print(f"  {n[:48]:48s}  DEMY={n in demy_t}  DOCX={n in docx_t}")
