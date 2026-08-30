"""Stack the pre-fix and post-fix brand lines into one comparison PNG."""

from __future__ import annotations

import sys
from pathlib import Path

import fitz

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / "scratch" / "_press_tools"
BEFORE = ROOT / "scratch" / "press_kit_backups_2026-08-29" / "Masters_X_Fact_Sheet.PRE_GLYPH_2026-08-29.pdf.bak"
AFTER = ROOT / "public" / "press-kit" / "Masters_X_Fact_Sheet.pdf"

CLIP = fitz.Rect(50, 55, 235, 74)
SCALE = 8


def crop(pdf: Path) -> fitz.Pixmap:
    doc = fitz.open(pdf)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), clip=CLIP)
    doc.close()
    return pix


a, b = crop(BEFORE), crop(AFTER)
gap = 24
w = max(a.width, b.width)
h = a.height + b.height + gap
out = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, w, h), False)
out.clear_with(255)
a.set_origin(0, 0)
out.copy(a, fitz.IRect(0, 0, a.width, a.height))
b.set_origin(0, a.height + gap)
out.copy(b, fitz.IRect(0, a.height + gap, b.width, a.height + gap + b.height))

dst = TOOLS / "brand_line_before_after_2026-08-29.png"
out.save(dst)
print(f"top = before (U+2166 -> ZapfDingbats square), bottom = after (ASCII VII)")
print(f"{dst.relative_to(ROOT).as_posix()}  {dst.stat().st_size} bytes  {w}x{h}")

for label, pdf in (("before", BEFORE), ("after", AFTER)):
    doc = fitz.open(pdf)
    for line in doc[0].get_text("dict", clip=fitz.Rect(50, 50, 300, 78))["blocks"][0]["lines"]:
        for span in line["spans"]:
            print(f"  {label:<7} font={span['font']:<16} text={span['text']!r}")
        break
    doc.close()
