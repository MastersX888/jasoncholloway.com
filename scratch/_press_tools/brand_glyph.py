"""Show how U+2166 in the brand line is actually encoded and rendered."""

from __future__ import annotations

from pathlib import Path

import fitz
import pypdf

ROOT = Path(__file__).resolve().parents[2]
PDF = ROOT / "public" / "press-kit" / "Masters_X_Fact_Sheet.pdf"

reader = pypdf.PdfReader(PDF)
page = reader.pages[0]
stream = page["/Contents"].get_data().decode("latin-1")
i = stream.find("Seventh City Press")
print("content stream around the brand mark:")
print(f"  {stream[max(0, i - 130):i + 25]!r}")
print("\nfonts on page 1:")
for key, ref in page["/Resources"]["/Font"].items():
    obj = ref.get_object()
    print(f"  {key} -> {obj['/BaseFont']}  encoding={obj.get('/Encoding', '(builtin)')}")

doc = fitz.open(PDF)
p = doc[0]
clip = fitz.Rect(50, 50, 260, 78)
p.get_pixmap(matrix=fitz.Matrix(6, 6), clip=clip).save(
    ROOT / "scratch" / "_press_tools" / "brand_line_new.png"
)
print("\nrendered crop -> scratch/_press_tools/brand_line_new.png")
print("glyph rects on the brand line:")
for span in p.get_text("dict", clip=clip)["blocks"][0]["lines"][0]["spans"]:
    print(f"  font={span['font']:<16} text={span['text']!r}")
