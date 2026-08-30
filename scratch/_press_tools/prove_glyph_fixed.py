"""Font-level proof that the brand line no longer takes the ZapfDingbats path.

Three independent checks per PDF:
  1. No page's /Resources /Font dictionary references /ZapfDingbats at all.
  2. The content-stream operators around "Seventh City Press" select only the
     Helvetica-Bold resource -- no intervening Tf switch.
  3. PyMuPDF reports Helvetica-Bold for every span on the brand line.

Then the brand line is rendered to PNG at 8x for visual confirmation.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import fitz
import pypdf

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
PDF_DIR = ROOT / "public" / "press-kit"
TOOLS = ROOT / "scratch" / "_press_tools"

NAMES = [
    "Masters_X_Press_Release.pdf",
    "Masters_X_Fact_Sheet.pdf",
    "Holloway_Author_Bios.pdf",
    "Masters_X_Synopses.pdf",
    "Masters_X_Press_Kit.pdf",
]

print("== 1. FONT RESOURCES PER PAGE (any /ZapfDingbats anywhere?) ==")
overall_zapf = False
for name in NAMES:
    reader = pypdf.PdfReader(PDF_DIR / name)
    seen: set[str] = set()
    for page in reader.pages:
        fonts = page.get("/Resources", {}).get("/Font", {}) or {}
        for ref in fonts.values():
            seen.add(str(ref.get_object()["/BaseFont"]))
    zapf = any("ZapfDingbats" in f for f in seen)
    overall_zapf = overall_zapf or zapf
    print(f"  {name:<32} pages={len(reader.pages)}  ZapfDingbats={zapf}")
    for f in sorted(seen):
        print(f"      {f}")
print(f"  -> /ZapfDingbats present in any press-kit PDF: {overall_zapf}")

print("\n== 2. CONTENT STREAM AROUND THE BRAND LINE ==")
for name in NAMES:
    reader = pypdf.PdfReader(PDF_DIR / name)
    page = reader.pages[0]
    stream = page["/Contents"].get_data().decode("latin-1")
    fonts = {k: str(v.get_object()["/BaseFont"]) for k, v in page["/Resources"]["/Font"].items()}
    i = stream.find("Seventh City Press")
    window = stream[max(0, i - 200):i + 30]
    # The font in force is the last /Fn <size> Tf before the drawing operator.
    tfs = re.findall(r"/(F\d+)\s+([\d.]+)\s+Tf", stream[:i])
    in_force = tfs[-1] if tfs else None
    print(f"\n  {name}")
    print(f"    resource map: { {k: v for k, v in sorted(fonts.items())} }")
    print(f"    font in force at the brand line: /{in_force[0]} {in_force[1]}pt"
          f" -> {fonts.get('/' + in_force[0], '?')}")
    print(f"    Tf switches inside the window : {re.findall(r'/F\\d+\\s+[\\d.]+\\s+Tf', window)}")
    print(f"    window: {window!r}")

print("\n== 3. PyMuPDF SPAN FONTS ON THE BRAND LINE ==")
for name in NAMES:
    doc = fitz.open(PDF_DIR / name)
    for pno, page in enumerate(doc):
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                joined = "".join(s["text"] for s in line["spans"])
                if "Seventh City Press" in joined and "SEVENTH" not in joined:
                    fonts = {s["font"] for s in line["spans"]}
                    print(f"  {name:<32} p{pno + 1}  fonts={sorted(fonts)}  "
                          f"text={joined!r}  first2={[hex(ord(c)) for c in joined[:2]]}")
    doc.close()

print("\n== 4. RENDER ==")
doc = fitz.open(PDF_DIR / "Masters_X_Fact_Sheet.pdf")
page = doc[0]
clip = fitz.Rect(50, 50, 260, 78)
out = TOOLS / "brand_line_VII_2026-08-29.png"
page.get_pixmap(matrix=fitz.Matrix(8, 8), clip=clip).save(out)
print(f"  {out.relative_to(ROOT).as_posix()}  ({out.stat().st_size} bytes)")

kit = fitz.open(PDF_DIR / "Masters_X_Press_Kit.pdf")
out2 = TOOLS / "brand_line_VII_merged_kit_2026-08-29.png"
kit[0].get_pixmap(matrix=fitz.Matrix(8, 8), clip=clip).save(out2)
print(f"  {out2.relative_to(ROOT).as_posix()}  ({out2.stat().st_size} bytes)")
doc.close()
kit.close()
