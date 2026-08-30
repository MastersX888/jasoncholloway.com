"""Rewrite scratch/press_extract/*.txt from the current press-kit PDFs.

The pre-existing extracts were made with a poppler-style extractor that is not
installed on this machine, so PyMuPDF is used instead. One cosmetic difference
follows from that and is accepted deliberately: poppler emitted a leading space
on the centred footer lines. That is a quirk of that tool, not content, and is
not reproduced.

The brand mark no longer needs normalising. It was U+2166, which Helvetica
cannot encode, so ReportLab fell back to a ZapfDingbats filled square that
PyMuPDF misreported as "I"; that had to be rewritten to U+25A0 for the record
to match the page. The mark is now ASCII "VII" drawn in Helvetica-Bold, so
`page.get_text()` already agrees with what is printed and is copied verbatim.
"""

from __future__ import annotations

import hashlib
import sys
from pathlib import Path

import fitz

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
PDF_DIR = ROOT / "public" / "press-kit"
TXT_DIR = ROOT / "scratch" / "press_extract"

NAMES = [
    "Masters_X_Press_Release",
    "Masters_X_Fact_Sheet",
    "Holloway_Author_Bios",
    "Masters_X_Synopses",
    "Masters_X_Press_Kit",
]

# Nothing may reach the extracts through a fallback font any more. Assert it
# rather than silently repairing it, so a regression fails here instead of
# being papered over the way the U+25A0 substitution used to paper over it.
FALLBACK_FONTS = {"ZapfDingbats", "Symbol"}

for name in NAMES:
    pdf = PDF_DIR / f"{name}.pdf"
    doc = fitz.open(pdf)

    fonts = {
        span["font"]
        for page in doc
        for block in page.get_text("dict")["blocks"]
        for line in block.get("lines", [])
        for span in line["spans"]
    }
    bad = fonts & FALLBACK_FONTS
    if bad:
        raise SystemExit(f"{pdf.name}: fallback font(s) still in use: {sorted(bad)}")

    text = "\n".join(page.get_text() for page in doc)
    brand_lines = [
        line for line in text.splitlines()
        if "Seventh City Press" in line and line.startswith("VII")
    ]
    out = TXT_DIR / f"{name}.txt"
    out.write_text(text, encoding="utf-8", newline="\n")
    digest = hashlib.sha256(out.read_bytes()).hexdigest()[:16]
    print(
        f"  {out.relative_to(ROOT).as_posix():<44} {len(text):>6} chars  "
        f"{doc.page_count} pp  brand-marks={len(brand_lines)}  fonts={sorted(fonts)}  "
        f"sha={digest}"
    )
    doc.close()

README = TXT_DIR / "README_HOW_THESE_ARE_MADE.md"
README.write_text(
    "# scratch/press_extract\n\n"
    "Plain-text extractions of the five PDFs in `public/press-kit/`, kept so the\n"
    "figures the press kit prints can be diffed and grepped without opening a PDF.\n\n"
    "They are **derived files**. Do not hand-edit them: correct the generator\n"
    "(`scripts/generate_press_kit.py`), rerun it, and regenerate these.\n\n"
    "## Regenerate\n\n"
    "```\n"
    "python scripts/generate_press_kit.py\n"
    "python scratch/_press_tools/refresh_extracts.py\n"
    "```\n\n"
    "## Notes\n\n"
    "- Extraction is PyMuPDF (`page.get_text()`), one blank-line-joined block per page.\n"
    "- The extracts are now a verbatim copy of `get_text()`. No glyph normalisation\n"
    "  is applied, and the refresh script asserts that no span is drawn in a fallback\n"
    "  font (ZapfDingbats or Symbol) rather than repairing the text after the fact.\n"
    "- **Superseded caveat, kept for context.** The brand line used to read `\u25a0 Seventh\n"
    "  City Press`. Its mark was `\u2166` (U+2166 ROMAN NUMERAL SEVEN), which\n"
    "  Helvetica/WinAnsi cannot encode, so ReportLab silently substituted a\n"
    "  ZapfDingbats filled square; PyMuPDF misread that glyph as `I` and the script\n"
    "  rewrote it to `\u25a0` so the record matched the printed page. On 2026-08-29 the\n"
    "  mark was changed to the ASCII letters `VII`, which Helvetica-Bold encodes\n"
    "  directly. The brand line now reads `VII  Seventh City Press` (two spaces, from\n"
    "  the `&nbsp;&nbsp;` that separates the mark from the wordmark) and needs no\n"
    "  normalisation. If `\u25a0` or a stray leading `I` ever reappears here, the glyph\n"
    "  fallback has returned and the generator is at fault.\n"
    "- Page counts here must match `lib/data/ingram-catalog.json`. The prebuild gate\n"
    "  (`scripts/check-page-counts.mjs`) does not scan `scratch/`, so these files are\n"
    "  a record, never a source.\n",
    encoding="utf-8",
    newline="\n",
)
print(f"  {README.relative_to(ROOT).as_posix()}")
