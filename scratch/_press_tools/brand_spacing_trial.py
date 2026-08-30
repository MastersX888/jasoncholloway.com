"""Render the brand line candidates at the real style so the gap can be judged.

Existing line is a single narrow mark plus one space. `VII` is three glyphs
wide, so the same one-space gap may read as "VII Seventh" rather than as a
mark followed by the wordmark. This lays the candidates out and measures them.
"""

from __future__ import annotations

import sys
from pathlib import Path

import fitz
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / "scratch" / "_press_tools"
PDF = TOOLS / "_brand_spacing_trial.pdf"

GOLD = colors.HexColor("#B8922E")
base = getSampleStyleSheet()
brand = ParagraphStyle(
    "brand", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=9,
    textColor=GOLD, leading=11, spaceAfter=2,
)

CANDIDATES = [
    ("A one space", "VII Seventh City Press"),
    ("B nbsp x2", "VII&nbsp;&nbsp;Seventh City Press"),
    ("C nbsp x3", "VII&nbsp;&nbsp;&nbsp;Seventh City Press"),
    ("D bullet", "VII&nbsp;\u00b7&nbsp;Seventh City Press"),
]

print("Helvetica-Bold 9pt metrics")
sp = stringWidth(" ", "Helvetica-Bold", 9)
print(f"  space advance          : {sp:.3f} pt")
print(f"  'VII'                  : {stringWidth('VII', 'Helvetica-Bold', 9):.3f} pt")
print(f"  U+2166 has no Helvetica glyph; ZapfDingbats fallback square at 9pt is ~7.1 pt")
for label, raw in CANDIDATES:
    plain = raw.replace("&nbsp;", "\u00a0")
    print(f"  {label:<12} full line width: {stringWidth(plain, 'Helvetica-Bold', 9):7.3f} pt")

story = [Spacer(1, 2)]
for label, raw in CANDIDATES:
    story.append(Paragraph(raw, brand))
    story.append(Spacer(1, 6))

doc = SimpleDocTemplate(
    str(PDF), pagesize=letter,
    leftMargin=0.85 * inch, rightMargin=0.85 * inch,
    topMargin=0.75 * inch, bottomMargin=0.65 * inch,
)
doc.build(story)

doc2 = fitz.open(PDF)
page = doc2[0]
clip = fitz.Rect(56, 48, 210, 140)
page.get_pixmap(matrix=fitz.Matrix(8, 8), clip=clip).save(TOOLS / "brand_spacing_candidates.png")
print(f"\nrendered -> {(TOOLS / 'brand_spacing_candidates.png').relative_to(ROOT).as_posix()}")
for block in page.get_text("dict", clip=clip)["blocks"]:
    for line in block["lines"]:
        for span in line["spans"]:
            print(f"  font={span['font']:<18} text={span['text']!r}")
doc2.close()
