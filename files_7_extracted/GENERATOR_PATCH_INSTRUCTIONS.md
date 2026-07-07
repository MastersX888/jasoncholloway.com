# GENERATOR PATCH INSTRUCTIONS
# For: Antigravity Agent / Gemini 3.1
# Apply to: generate_book1_interior.py, generate_book2_interior.py,
#            generate_book3_interior.py, generate_omnibus_interior_v6.py,
#            generate_epubs_v1.py, generate_hawkes_interior.py (new),
#            generate_hawkes_epub.py (new)

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 1 — ADD THIS BLOCK AT THE TOP OF EVERY GENERATOR SCRIPT
# (immediately after imports, before any constants or page-size defs)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import os

# Build config injected by build_all_editions.py via environment variables.
# Falls back to safe defaults so the script still runs standalone.
BUILD_ISBN        = os.environ.get('BUILD_ISBN',        'ISBN-NOT-SET')
BUILD_IMPRINT     = os.environ.get('BUILD_IMPRINT',     'Seventh City Press')
BUILD_AUTHOR      = os.environ.get('BUILD_AUTHOR',      'Jason Carroll Holloway')
BUILD_TITLE       = os.environ.get('BUILD_TITLE',       '')
BUILD_EDITION_KEY = os.environ.get('BUILD_EDITION_KEY', '')
BUILD_OUTPUT      = os.environ.get('BUILD_OUTPUT',      None)

# Trim: if env vars are set, they override whatever was hardcoded below.
_w = os.environ.get('BUILD_WIDTH_PT')
_h = os.environ.get('BUILD_HEIGHT_PT')
BUILD_WIDTH_PT  = float(_w) if _w else None
BUILD_HEIGHT_PT = float(_h) if _h else None


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 2 — REPLACE HARDCODED PAGE SIZE WITH ENV-AWARE VERSION
# Find wherever the script sets the ReportLab page size, e.g.:
#
#   PAGE_WIDTH  = 6.14 * 72   # old hardcoded Royal
#   PAGE_HEIGHT = 9.21 * 72
#
# Replace with:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE_WIDTH  = BUILD_WIDTH_PT  if BUILD_WIDTH_PT  else 6.14 * 72   # default Royal
PAGE_HEIGHT = BUILD_HEIGHT_PT if BUILD_HEIGHT_PT else 9.21 * 72

# For the ReportLab canvas:
#   c = canvas.Canvas(output_path, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 3 — REPLACE HARDCODED ISBN ON COPYRIGHT PAGE
# Find the line that draws the ISBN string, e.g.:
#
#   c.drawString(x, y, "ISBN: 979-8-XXXXXX-XX-X")
#
# Replace with:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def format_isbn(raw):
    """Insert hyphens into a 13-digit ISBN-13 string."""
    d = raw.replace('-','').replace(' ','')
    if len(d) == 13:
        return f"{d[0:3]}-{d[3]}-{d[4:9]}-{d[9:12]}-{d[12]}"
    return raw  # return as-is if unexpected length

# Then on the copyright page:
#   isbn_display = format_isbn(BUILD_ISBN)
#   c.drawString(x, y, f"ISBN: {isbn_display}")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 4 — REPLACE HARDCODED IMPRINT ON COPYRIGHT PAGE
# Find wherever the imprint/publisher string is drawn, e.g.:
#
#   c.drawString(x, y, "Seventh City Press LLC")
#
# Replace with:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#   c.drawString(x, y, BUILD_IMPRINT)

# NOTE: Some editions use "Sacred Books" as imprint (see edition_registry.json).
# BUILD_IMPRINT carries the exact correct string for each edition — do not alter it.


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 5 — REPLACE HARDCODED AUTHOR NAME EVERYWHERE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#   c.drawString(x, y, BUILD_AUTHOR)
# BUILD_AUTHOR is always "Jason Carroll Holloway" — never "Jason C. Holloway"


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 6 — REPLACE HARDCODED OUTPUT PATH
# Find the line that opens the canvas, e.g.:
#
#   c = canvas.Canvas("INTERIOR_MASTERS_X_BOOK1.pdf", ...)
#
# Replace with:
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

#   output_path = BUILD_OUTPUT or "INTERIOR_MASTERS_X_BOOK1.pdf"  # keep fallback
#   c = canvas.Canvas(output_path, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# EPUB GENERATOR (generate_epubs_v1.py) — additional change
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Find where dc:identifier is set in the OPF, e.g.:
#
#   book.set_identifier("978-X-XXXXXX-XX-X")
#
# Replace with:
#
#   book.set_identifier(BUILD_ISBN)
#
# Also find where dc:publisher / imprint is set and replace with BUILD_IMPRINT.
# Also find where dc:creator is set and replace with BUILD_AUTHOR.


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# HAWKES GENERATORS (new scripts) — minimum viable structure
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# If generate_hawkes_interior.py doesn't exist, create it by cloning
# generate_book1_interior.py and:
#   1. Pointing the DOCX source at the Hawkes _FIXED.docx
#   2. Applying Steps 1-6 above (so trim/ISBN/imprint/output all come from env)
#   3. Default PAGE_WIDTH/HEIGHT = 432.0/648.0 (6x9) — Hawkes ships in 6x9 too
#      but build_all_editions.py will override with Royal dims when building
#      the Royal 8vo edition (9798349308444)
# Same pattern for generate_hawkes_epub.py from generate_epubs_v1.py.


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FOREIGN ISBN SCRUB — add to every generator before saving
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Before any ISBN string is drawn onto a page, ensure no OTHER
# 13-digit ISBN from the registry is already in the template text.
# Simple check to add to the copyright-page drawing function:
#
#   import re
#   def assert_no_foreign_isbn(text_block, current_isbn):
#       others = re.findall(r'97[89]\d{10}', text_block.replace('-','').replace(' ',''))
#       foreign = [x for x in others if x != current_isbn.replace('-','').replace(' ','')]
#       if foreign:
#           raise ValueError(f"Foreign ISBN found in template: {foreign}. Remove it.")
#
# Call assert_no_foreign_isbn() on any string block before drawString().


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# VERIFICATION — run after each file is generated (do not skip)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# build_all_editions.py handles this automatically.
# If running a generator standalone, verify manually:
#
#   python3 verify_deliverables.py <output.pdf> <isbn> <w_pt> <h_pt>
#   python3 verify_trim_isbn.py    <output.pdf> <isbn> <w_pt> <h_pt>
#
# Both must exit 0. If either fails, DO NOT mark the file as done.
