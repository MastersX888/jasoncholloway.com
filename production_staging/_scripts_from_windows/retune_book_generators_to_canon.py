#!/usr/bin/env python3
"""Retune recovered book generators to match live PRE_GEO density (CANON)."""
from __future__ import annotations

import re
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent

# Live PRE_GEO metrics (from harvested interiors):
# HC: textW~4.67 on Royal 6.14; body ~11pt
# PB: textW~4.03 on Demy 5.5; body ~11pt
# No next-volume preview chapter.

HC_MARGINS = """M_GUTTER = 0.75 * inch
M_OUTSIDE = 0.724 * inch
M_TOP = 0.50 * inch
M_BOTTOM = 0.55 * inch"""

PB_MARGINS = """M_GUTTER = 0.75 * inch
M_OUTSIDE = 0.724 * inch
M_TOP = 0.50 * inch
M_BOTTOM = 0.55 * inch"""

BODY_RE = re.compile(
    r'S_BODY = ParagraphStyle\(\s*"Body",\s*fontName="Garamond",\s*fontSize=[0-9.]+,\s*leading=[0-9.]+,'
    r'\s*alignment=TA_JUSTIFY,\s*firstLineIndent=[0-9.]+,\s*spaceAfter=[0-9.]+,\s*spaceBefore=[0-9.]+\)',
    re.M,
)

MARGINS_RE = re.compile(
    r"M_GUTTER\s*=\s*[^\n]+\nM_OUTSIDE\s*=\s*[^\n]+\nM_TOP\s*=\s*[^\n]+\nM_BOTTOM\s*=\s*[^\n]+",
    re.M,
)


def patch_file(path: Path, is_pb: bool) -> None:
    t = path.read_text(encoding="utf-8")
    t2, n1 = BODY_RE.subn(
        'S_BODY = ParagraphStyle("Body", fontName="Garamond", fontSize=11, leading=18,\n'
        "                         alignment=TA_JUSTIFY, firstLineIndent=20, spaceAfter=3.5, spaceBefore=0)",
        t,
        count=1,
    )
    margins = PB_MARGINS if is_pb else HC_MARGINS
    t3, n2 = MARGINS_RE.subn(margins, t2, count=1)

    # Disable preview: force empty preview list after it is built
    # Prefer rewriting _build_elements call sites to pass []
    t3 = re.sub(
        r"doc1\.build\(_build_elements\((\w+),\s*preview\)\)",
        r"doc1.build(_build_elements(\1, []))  # preview disabled (live CANON has no preview)",
        t3,
    )
    t3 = re.sub(
        r"doc\.build\(_build_elements\((\w+),\s*preview\)\)",
        r"doc.build(_build_elements(\1, []))  # preview disabled (live CANON has no preview)",
        t3,
    )
    # Book2/3 may use different var names
    t3 = re.sub(
        r"\.build\(_build_elements\(([^,]+),\s*preview\)\)",
        r".build(_build_elements(\1, []))  # preview disabled",
        t3,
    )

    path.write_text(t3, encoding="utf-8")
    print(f"{path.name}: body={n1} margins={n2}")


def main() -> None:
    for book in (1, 2, 3):
        patch_file(SCRIPTS / f"generate_book{book}_interior.py", is_pb=False)
        patch_file(SCRIPTS / f"generate_book{book}_interior_paperback.py", is_pb=True)


if __name__ == "__main__":
    main()
