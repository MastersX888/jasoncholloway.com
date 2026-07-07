# MASTERS X OMNIBUS — ITALIC RENDERING FIX (one-line root cause, full regen)

## MISSION

`generate_omnibus_interior_v6.py` has a single missing function call that causes
every `<i>` tag in the body text to silently render as roman (non-italic). The
DOCX extraction, classification, and rich-text assembly are ALL correct — do not
touch them. Add the missing font mapping, then regenerate both omnibus interiors.

---

## ROOT CAUSE (confirmed, do not re-diagnose)

Lines 62–64 of `generate_omnibus_interior_v6.py` register three independent
TrueType fonts:

```python
pdfmetrics.registerFont(TTFont("Garamond", "C:/Windows/Fonts/GARA.TTF"))
pdfmetrics.registerFont(TTFont("GaramondBd", "C:/Windows/Fonts/GARABD.TTF"))
pdfmetrics.registerFont(TTFont("GaramondIt", "C:/Windows/Fonts/GARAIT.TTF"))
```

ReportLab treats these as three completely unrelated fonts. When a `Paragraph`
styled with `fontName="Garamond"` contains a `<i>...</i>` tag (which the script
correctly generates at line 401-402 from DOCX run.italic), ReportLab's
mini-HTML parser looks up the registered "italic variant" of the current font
family using its internal font-family mapping table. That table is empty for
"Garamond" because `addMapping()` was never called. Result: `<i>` is silently
ignored and the text renders in the regular face.

This was confirmed by inspecting the generated PDF's content streams directly:
the italic font (F3+0 = AAAAAA+Garamond-Italic) is embedded in every page's
resource dictionary but is only ever invoked on the front-matter epigraph page
(which uses a hardcoded `S_EPIG` style with `fontName="GaramondIt"` directly —
not via `<i>` tags, which is why epigraphs display correctly while body text
does not).

**Do not modify**: `extract_with_formatting()`, `classify()`, `build_body()`,
`escape()`, or any DOCX parsing logic. All of it is correct. The italic-run
detection at lines 392–405 and the paragraph stats counter at line 682 already
work — the count the script prints (`X with italic runs`) is accurate; it's
only the PDF rendering that's broken.

---

## THE FIX

### Step 1 — Open the script

Open `generate_omnibus_interior_v6.py` and locate the font registration block
at approximately lines 61–64:

```python
# ─── Fonts ───
pdfmetrics.registerFont(TTFont("Garamond", "C:/Windows/Fonts/GARA.TTF"))
pdfmetrics.registerFont(TTFont("GaramondBd", "C:/Windows/Fonts/GARABD.TTF"))
pdfmetrics.registerFont(TTFont("GaramondIt", "C:/Windows/Fonts/GARAIT.TTF"))
```

### Step 2 — Add the import

At the top of the file, in the existing import block (near line 27-39), add:

```python
from reportlab.lib.fonts import addMapping
```

### Step 3 — Add the mapping calls

Immediately after the three `registerFont` calls, insert:

```python
# Tell ReportLab's <i>/<b> mini-HTML parser which physical font to use
# for each style combination within the "Garamond" family. Without this,
# <i> and <b> tags in Paragraph markup are silently ignored and everything
# renders in the plain "Garamond" face — this was the entire bug.
addMapping("Garamond", 0, 0, "Garamond")     # normal
addMapping("Garamond", 0, 1, "GaramondIt")   # italic
addMapping("Garamond", 1, 0, "GaramondBd")   # bold
addMapping("Garamond", 1, 1, "GaramondIt")   # bold+italic — no separate BI
                                               # face exists, so this falls
                                               # back to italic, which is the
                                               # correct choice over plain.
```

The four `addMapping` arguments are: `(family_name, bold_flag, italic_flag,
font_to_use)`. `bold_flag` and `italic_flag` are `0`/`1` integers, not booleans.

### Step 4 — Verify no GaramondBI file exists (informational only)

There is no bold-italic TTF registered (only GARA.TTF, GARABD.TTF, GARAIT.TTF).
If true bold-italic runs exist anywhere in the DOCX (run.bold AND run.italic
both True), they will render in italic only, not bold-italic, because no such
font face was registered. This is a pre-existing limitation, not something
introduced by this fix. Do not attempt to synthesize a bold-italic face —
just confirm via the verification step below whether any bold-italic runs
actually exist in the source text; if the count is zero or near-zero, this
limitation is irrelevant.

### Step 5 — Do not touch anything else in the file

Specifically do NOT modify:
- `extract_with_formatting()` (lines 367–410) — already correct
- `classify()` (lines 332–356) — already correct
- `build_body()` (lines 543–619) — already correct
- The `S_EPIG`, `S_CHSUB`, `S_HZ` styles that use `fontName="GaramondIt"`
  directly — these work correctly today and must keep working identically
  after the fix (they bypass the `<i>` tag mechanism entirely, so they are
  unaffected by `addMapping`, but verify this in testing anyway)

---

## STEP 6 — REGENERATE BOTH INTERIORS

This single script currently outputs one PDF sized for the hardcover trim
(6.14×9.21, see lines 51–59). Confirm whether a parallel PB-trim version of
this same fixed script already exists from prior work (look for
`generate_omnibus_interior_PB_5x8.py` or similar). If it exists, apply the
identical fix (Steps 2–3 above) to that copy too — the font registration
block should be byte-identical between the two trim variants. If it does not
exist, create it by copying the now-fixed HC script and changing only the
Trim section (lines 51–59) to:

```python
# ─── Trim (IngramSpark US Trade 5.5 x 8.5) ───
TRIM_W = 5.5 * inch
TRIM_H = 8.5 * inch
M_GUTTER = 0.875 * inch
M_OUTSIDE = 0.5 * inch
M_TOP = 0.75 * inch
M_BOTTOM = 0.75 * inch
TEXT_W = TRIM_W - M_GUTTER - M_OUTSIDE
TEXT_H = TRIM_H - M_TOP - M_BOTTOM
```

And update `OUTPUT_PDF` (line 49) to a distinct filename, e.g.
`INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf`.

For the HC script, update `OUTPUT_PDF` to
`INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf`.

Run both:

```bash
python generate_omnibus_interior_HC_6x9_v8.py
python generate_omnibus_interior_PB_5x8_v8.py
```

Each prints its own italic-paragraph-count stats per volume (line 700) —
record these numbers, they're needed for verification.

---

## STEP 7 — VERIFICATION (mandatory, do not skip)

### 7a. Confirm italic font is now used in body text

```python
import pikepdf, re

def check_italic_usage(pdf_path, sample_pages):
    pdf = pikepdf.open(pdf_path)
    results = []
    for pnum in sample_pages:
        if pnum >= len(pdf.pages):
            continue
        page = pdf.pages[pnum]
        content = page.get('/Contents')
        if hasattr(content, 'read_bytes'):
            data = content.read_bytes().decode('latin-1')
        elif hasattr(content, '__iter__'):
            data = b''.join(c.read_bytes() for c in content).decode('latin-1')
        else:
            data = ''
        fonts = set(re.findall(r'/(\S+)\s+[\d.]+\s+Tf', data))
        # F3+0 maps to GaramondIt in this script's font dictionary
        has_italic = any('F3' in f for f in fonts)
        results.append((pnum + 1, fonts, has_italic))
    return results

for label, path in [
    ("HC v8", "INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf"),
    ("PB v8", "INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf"),
]:
    print(f"\n=== {label} ===")
    sample = list(range(10, 300, 15))  # broad sample across early-mid book
    results = check_italic_usage(path, sample)
    italic_pages = sum(1 for _, _, hi in results if hi)
    for pnum, fonts, hi in results:
        print(f"  Page {pnum}: fonts={fonts}  italic={'YES' if hi else 'no'}")
    print(f"  -> italic present on {italic_pages}/{len(results)} sampled pages")
    assert italic_pages >= 3, (
        f"FAIL: {label} still shows little/no italic in body text. "
        f"addMapping fix did not take effect — check font name string "
        f"matches exactly ('Garamond' must match the fontName used in "
        f"S_BODY/S_BODY1 styles, case-sensitive)."
    )
    print(f"  PASS")
```

This must show italic on a meaningful fraction of sampled pages (internal
thoughts, foreign terms, and emphasis recur throughout all three volumes —
expect italic on roughly 20–40% of body pages, not 100%, since most pages
are plain narrative prose).

### 7b. Cross-check against the script's own paragraph stats

Compare the `italic_count` the script printed in Step [1/5] of its own log
output against actual PDF usage. If the script reported, say, "1775 paragraphs
(340 with italic runs)" for Volume 1, the PDF should show F3 usage scattered
across roughly that many distinct locations — not zero.

### 7c. Confirm epigraphs still render correctly (regression check)

```python
import subprocess
subprocess.run(["pdftoppm", "-jpeg", "-r", "150", "-f", "5", "-l", "5",
                "INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf",
                "/tmp/epigraph_check_hc"])
subprocess.run(["pdftoppm", "-jpeg", "-r", "150", "-f", "5", "-l", "5",
                "INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf",
                "/tmp/epigraph_check_pb"])
```

Visually confirm both still show the six epigraph quotes in italic, identical
in style to the pre-fix version (this page uses the `S_EPIG` style directly,
not `<i>` tags, so it should be unaffected — but confirm nothing regressed).

### 7d. Spot-check specific known italic passages

Search both PDFs for text known to use italic in the source. Use `pdftotext`
to confirm the text exists (pdftotext won't show font styling, so this only
confirms the words are present, not that they're italic — combine with 7a/7b
for actual styling confirmation):

```bash
pdftotext -layout INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf - | grep -i "Codex Gigas"
pdftotext -layout INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf - | grep -i "Ars Notoria"
```

### 7e. Re-verify v7 text revisions survived (regression check)

This fix touches only font rendering, not text content, but confirm nothing
else shifted:

```bash
pdftotext -layout INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf - | grep -c "James Alan Masters"
pdftotext -layout INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf - | grep -c "Kateryna"
pdftotext -layout INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf - | grep -c "Vivian Chen"
pdftotext -layout INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf - | grep -c "Markus chose"
```

Expect non-zero counts for the first three, zero for the last (Markus should
not appear — it was corrected to Marcus).

### 7f. Page count and dimension sanity check

```bash
pdfinfo INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf | grep -E "Pages|Page size"
pdfinfo INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf | grep -E "Pages|Page size"
```

Page counts should be very close to the pre-fix versions (684 for HC, 732 for
PB) — italic text at the same point size occupies essentially the same
horizontal space as roman, so reflow should be minimal to none. Flag if either
count changed by more than ~5 pages, since that would suggest something
besides font mapping was affected.

---

## OUTPUT

- `INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf`
- `INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf`
- Verification report covering all of 7a–7f with pass/fail per check

---

## IF VERIFICATION FAILS

If 7a still shows zero or near-zero italic usage after the fix, check:

1. **Font name string mismatch** — `addMapping("Garamond", ...)` must use the
   exact same string as `fontName="Garamond"` in `S_BODY`/`S_BODY1` (line 71,
   73). If there's any case difference or whitespace, the mapping won't match.

2. **Mapping called after first font use** — `addMapping` must execute before
   any `Paragraph` objects are built. Since it's placed right after
   `registerFont` at module level (top of file, before `main()` runs), this
   should not be an issue, but confirm the calls weren't accidentally placed
   inside a function that runs after document construction.

3. **Wrong font key for bold style** — `S_CHTITLE` and other bold styles use
   `fontName="GaramondBd"` directly (not "Garamond" with bold=True), so they
   are unaffected by this mapping and don't need it. Don't confuse a failure
   there (if any) with the body-text italic fix — they're unrelated code paths.

Do not attempt alternate fixes (e.g., switching to `<font face="GaramondIt">`
tags instead of `<i>`) without first confirming the `addMapping` approach
failed for a specific, identified reason. The diagnosis above is confirmed
against the actual PDF content streams, not speculative.
