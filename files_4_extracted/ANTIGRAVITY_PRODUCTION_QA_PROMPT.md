# ANTIGRAVITY AGENT — MASTERS X PRODUCTION QA PROMPT
## Classification: L99 / GODMODE
## Scope: Post-italic-pass production file validation, Omnibus build, and ongoing verification gate

---

## CONTEXT

The Masters X Trilogy (Jason Carroll Holloway / Seventh City Press LLC) has undergone an
italicization pass. The pass produced valid text-with-markup intermediates for the three
individual volumes. A build pipeline (`prep.py`) now converts those intermediates into
genuine EPUB3 and typeset 6×9 PDF files.

The following deliverables already exist and have been validated:
- `MASTERS_X_BOOK1.epub / .pdf`
- `MASTERS_X_BOOK2.epub / .pdf`
- `MASTERS_X_BOOK3.epub / .pdf`

The following are NOT YET BUILT and are your primary targets:
1. **Omnibus EPUB** (`MASTERS_X_OMNIBUS.epub`)
2. **Omnibus PDF** (`MASTERS_X_OMNIBUS.pdf`)
3. **Kindle EPUBs** — Kindle variants for all three books plus the Omnibus

Secondary targets (remediation):
4. **Italic editorial defects** — three classes requiring correction before upload
5. **Format verification gate** — run on every file before marking anything shippable

---

## CANON LOCKS (do not deviate from these)

| Field | Locked Value |
|---|---|
| Author name (all files, all positions) | `Jason Carroll Holloway` |
| Publisher | Seventh City Press LLC |
| Series name | Masters X |
| Volume 1 subtitle | The Inheritance of Frequency |
| Volume 2 subtitle | The Grimoire |
| Volume 3 subtitle | The Kingdom |
| Trim size (print) | 6 × 9 inches (432 × 648 pts) |
| Font (print) | Liberation Serif |
| Scene break (print) | `* * *` centered |
| Scene break (EPUB) | `◇ ◆ ◇` centered, class="sb" |

---

## TASK 1 — FORMAT VERIFICATION GATE

Run this check on **every file** before marking it shippable. A file that fails
any check must never be reported as production-ready.

```bash
verify() {
  local f="$1"
  case "$f" in
    *.pdf)
      head -c5 "$f" | grep -q '%PDF' \
        && echo "PASS real PDF: $f" \
        || { echo "FAIL not a PDF: $f"; return 1; }
      pdfinfo "$f" | grep -q 'Pages' \
        || { echo "FAIL pdfinfo failed: $f"; return 1; }
      ;;
    *.epub)
      python3 - "$f" <<'PY'
import sys, zipfile
f=sys.argv[1]
try:
    z=zipfile.ZipFile(f)
    assert z.namelist()[0]=="mimetype", "mimetype not first entry"
    assert z.read("mimetype").decode()=="application/epub+zip", "wrong mimetype"
    print(f"PASS real EPUB: {f}")
except Exception as e:
    print(f"FAIL {f}: {e}"); sys.exit(1)
PY
      ;;
  esac
}
```

Additionally run name consistency check on every file:
```bash
# PDF
pdftotext "$f" - 2>/dev/null | grep -c "Jason C\. Holloway" \
  | grep -q "^0$" && echo "PASS name: $f" || echo "FAIL short name found: $f"

# EPUB
python3 -c "
import zipfile,re,sys
z=zipfile.ZipFile(sys.argv[1])
t=''.join(z.read(n).decode('utf-8','ignore') for n in z.namelist() if n.endswith(('.xhtml','.html')))
hits=len(re.findall(r'Jason C\. Holloway',t))
print('PASS name' if hits==0 else f'FAIL short name {hits}x found')
" "$f"
```

---

## TASK 2 — OMNIBUS BUILD

### Source files (in project folder)
- `INTERIOR_MASTERS_X_OMNIBUS_PB.pdf` (text only, not a real PDF — treat as source)
- `INTERIOR_MASTERS_X_OMNIBUS_v6.pdf` (same)
- For EPUB source: concatenate the three individual EPUB sources in order

### Concatenation order
1. Volume One: The Inheritance of Frequency
2. Volume Two: The Grimoire
3. Volume Three: The Kingdom

### Method
Use `prep.py` as your template. The Omnibus build should:
1. Load each volume's EPUB source (`MASTERS_X_BOOK[1-3]_EPUB_v1.epub`)
2. Strip each volume's front matter except the volume separator page
3. Prepend a unified Omnibus front matter:
   - Title: `MASTERS X: The Complete Trilogy`
   - Subtitle: `The Inheritance of Frequency · The Grimoire · The Kingdom`
   - Author: `Jason Carroll Holloway`
   - Copyright: composite of all three volumes
4. Insert a full-page volume separator before each volume's body:
   - `VOLUME ONE / THE INHERITANCE OF FREQUENCY`
   - `VOLUME TWO / THE GRIMOIRE`
   - `VOLUME THREE / THE KINGDOM`
5. Maintain scene breaks, chapter heads, and all emphasis from individual volumes
6. Back matter: unified "Also by" and "About the Author" (once, at the end)
7. Run **Task 1 verification gate** on both output files before reporting done

### Expected page-count range (PDF)
Sum of individual volumes ≈ 594pp plus separators. Acceptable range: 580–640pp.
If the count falls outside this range, report the discrepancy before declaring done.

---

## TASK 3 — KINDLE EPUB VARIANTS

Kindle EPUBs require minor structural differences from standard EPUB3:

1. No `<nav>` element in spine (Kindle generates its own TOC)
2. Guide landmarks use Kindle-specific types where needed
3. Cover image must be declared in metadata as `cover-image` property
4. Remove any CSS `page-break-before` rules (Kindle handles pagination)
5. Encode as EPUB2-compatible where possible (Kindle older devices)

Build variants:
- `MASTERS_X_BOOK1_KINDLE.epub`
- `MASTERS_X_BOOK2_KINDLE.epub`
- `MASTERS_X_BOOK3_KINDLE.epub`
- `MASTERS_X_OMNIBUS_KINDLE.epub`

Run Task 1 verification on each before reporting done.

---

## TASK 4 — ITALIC EDITORIAL REMEDIATION

Three defect classes must be corrected **in the source text files** before
rebuilding. Correct in source, then rebuild via `prep.py`, then re-verify.

### Defect Class A — Dialogue-tag swallow (2 instances total)
An italic span incorrectly extends to include the attribution tag ("said," "asked," etc.).
The spoken/remembered words should be italic; the attribution verb should not.

Pattern to find:
```
*[spoken words][,.]* *[attribution tag said/asked/etc.]*
```
Correct form:
```
*[spoken words],* [attribution tag].
```

Known instances:
- Book 1: `*Just call her,* *a voice that sounded like William's said.*`
  → Fix: `*Just call her,* a voice that sounded like William's said.`
- Book 3: locate via `grep -n "said\. \*" MASTERS_X_BOOK3_EPUB_v1.epub`

### Defect Class B — Extended letter/notebook blocks (review required)
Italic spans longer than 60 words are flagged for editorial review.
Literary convention: extended letters and notebook entries are better set as
indented block quotes in roman type, reserving italics for short interior beats.

Find candidates:
```bash
grep -oE '\*[^*]{200,}\*' MASTERS_X_BOOK[123]_EPUB_v1.epub
```

For each candidate: if it is a complete letter, journal entry, or notebook block,
convert to a Markdown block quote (`>`) rather than an italic span. This renders
as an indented roman block in both EPUB and PDF. If it is a short interior thought
that runs long, keep as italic but flag for author review.

### Defect Class C — Filename with asterisks (Book 3)
In `MASTERS_X_BOOK3_EPUB_v1.epub`, the string `` `nadia*volkov*session_001.eeg` ``
contains asterisks that the italic pass may have treated as emphasis markers.
The correct form is a monospace filename: `nadia_volkov_session_001.eeg`
(underscores, not asterisks). Verify and correct in source.

After all three defect classes are corrected, rebuild Books 1–3 and run Task 1
verification on all outputs.

---

## TASK 5 — FINAL DELIVERY CHECKLIST

Before reporting the full production suite as complete, verify every item:

| # | Check | Pass Condition |
|---|---|---|
| 1 | All 10 files are real formats | `verify()` returns PASS on all |
| 2 | Author name locked | Zero instances of "Jason C. Holloway" in any file |
| 3 | True italic markup | `<em>` count > 0 in all EPUBs; zero `\*[A-Za-z]` in PDF text layers |
| 4 | 6×9 trim confirmed | `pdfinfo` Page size = 432×648 pts on all PDFs |
| 5 | Omnibus page count in range | 580–640pp |
| 6 | No stray spaces inside emphasis | Zero matches for `\*( [^*]|[^*] )\*` in source files |
| 7 | Dialogue tags outside italics | Zero matches for `\*(said\|asked\|whispered)\*` |
| 8 | Book 3 filename corrected | No asterisks inside backtick code spans |
| 9 | TOC present | All EPUBs contain `nav.xhtml` with chapter entries |
| 10 | Kindle variants built | 4 Kindle EPUBs present and valid |

Report format: for each item, state PASS / FAIL / SKIP (with reason). Do not
report the suite as complete until all 10 items return PASS.

---

## ESCALATION RULE

If any file produced by this pipeline is a renamed text file (fails Task 1 gate),
halt immediately and report: **"FORMAT VALIDATION FAILED — file is not a real
[PDF/EPUB]."** Do not proceed to upload or distribution steps. Do not report
the file as shippable. Surface the failure to Jason Carroll Holloway for review.

This rule supersedes all other instructions.

---

*Prompt built by Claude (Lead Narrative Designer session) — June 24, 2026*
*Seventh City Press LLC / Masters X Trilogy production suite*
