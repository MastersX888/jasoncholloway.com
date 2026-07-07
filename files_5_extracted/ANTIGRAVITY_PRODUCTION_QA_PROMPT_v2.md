# ANTIGRAVITY AGENT — MASTERS X PRODUCTION QA PROMPT (v2)
## Classification: L99 / GODMODE
## Pipeline: reportlab (PDF) + ebooklib (EPUB), source of truth = `_FIXED.docx`
## Supersedes v1. v1 incorrectly assumed a pandoc/Markdown/`prep.py` toolchain — IGNORE that.

---

## WHAT CHANGED FROM v1
- v1 assumed pandoc + `prep.py`. This environment has **no pandoc**. All builds run
  through the existing Python pipeline: `generate_book*_interior.py` (reportlab PDF),
  `generate_epubs_v1.py` (ebooklib EPUB), `generate_omnibus_interior_v6.py`.
- Source of truth is the **`_FIXED.docx`** master, not the `.epub` files.
- Defect Class B is now a **review manifest**, not an auto-conversion (see Task 4B).
- Omnibus page-count expectation is now **derived from your own per-volume counts**,
  not a hardcoded range.
- Two tested helper scripts ship with this prompt: `verify_deliverables.py`,
  `flag_long_spans.py`. Both are pipeline-agnostic — they inspect outputs/spans,
  not the build tool.

---

## CANON LOCKS (do not deviate)
| Field | Locked Value |
|---|---|
| Author name (every file, every position) | `Jason Carroll Holloway` |
| Publisher | Seventh City Press LLC |
| Series | Masters X |
| Vol 1 / 2 / 3 subtitles | The Inheritance of Frequency / The Grimoire / The Kingdom |
| Print trim | 6 × 9 in (432 × 648 pt) |
| Scene break (print) | `* * *` centered |
| Scene break (EPUB) | `◇ ◆ ◇` centered (class `sb`) |

---

## TASK 0 — PRE-FLIGHT: HOW ARE ITALICS STORED IN THE DOCX?  (run first, blocks everything)
The remediation method depends entirely on this. Run on each `_FIXED.docx`:

```bash
unzip -p BOOK1_FIXED.docx word/document.xml | grep -c '<w:i/>'     # real italic runs
unzip -p BOOK1_FIXED.docx word/document.xml | tr '>' '>\n' | grep -c '\*'  # literal asterisks in text
```
- **Real runs (`<w:i/>` count high, asterisks ~0):** remediation edits runs (Task 4, run-mode).
- **Asterisks in text (asterisks high):** the docx carries the same asterisk defect as the
  EPUB sources — normalise text first (strip stray spaces inside `* *`, re-pair), THEN
  let the build map emphasis to real italic runs. Do NOT ship asterisks into a PDF/EPUB.

Report the result for all three volumes before proceeding.

---

## TASK 1 — REMEDIATION (apply to the `_FIXED.docx` master)

### 4A · Dialogue-tag swallow (2 known instances)
The attribution verb is wrongly inside the italic span. Spoken words stay italic;
the attribution ("…said.") becomes roman.
- Real-run mode: locate the run italicising the attribution and set `run.italic = False`
  (split the run at the boundary if word + tag share a run).
- Asterisk mode: `*Just call her,* *a voice…said.*` → `*Just call her,* a voice…said.`
Known: Book 1 (`a voice that sounded like William's said.`); Book 3
(`grep -n "said\. \*" MASTERS_X_BOOK3_EPUB_v1.epub` to locate the parallel).

### 4B · Long italic blocks → REVIEW MANIFEST (do NOT auto-convert)
Run `flag_long_spans.py` over each volume's italic spans. It emits a manifest with a
recommendation per span: `KEEP_ITALIC`, `CONVERT_TO_BLOCK`, or `REVIEW`.
- Apply `CONVERT_TO_BLOCK` rows only after Jason confirms. Convert by applying a
  block-quote paragraph style in the reportlab generator (left indent ~0.4in, roman,
  slightly reduced size) — NOT italic. In ebooklib, wrap in `<blockquote>`.
- `KEEP_ITALIC` and `REVIEW` rows stay italic. The Prologue frame and all first-person
  framing narration MUST remain italic — they are structural, not letters.
Surface the manifest to Jason; do not restyle on your own judgment.

### 4C · Book 3 filename artifact
`nadia*volkov*session_001.eeg` → `nadia_volkov_session_001.eeg` (underscores).
Render as plain roman or italic text, not monospace `code` font, inside prose.
(Note: `verify_deliverables.py` flags Book 3 as FAIL until this is fixed — the
asterisks trip the stray-emphasis check, which is intended.)

---

## TASK 2 — REBUILD (existing Python pipeline)
After remediation, regenerate from the corrected `_FIXED.docx`:
- `generate_book1_interior.py` / book2 / book3  → three 6×9 PDFs
- `generate_epubs_v1.py`                          → three EPUBs
Confirm the author-name normalisation (`Jason C. Holloway` → `Jason Carroll Holloway`)
is applied in the generators or in the docx before this step.

---

## TASK 3 — OMNIBUS BUILD
Extend `generate_omnibus_interior_v6.py` (PDF) and the EPUB generator:
1. Order: Vol One → Vol Two → Vol Three.
2. Unified front matter once: title `MASTERS X: The Complete Trilogy`,
   author `Jason Carroll Holloway`, composite copyright.
3. Full-page volume separator before each volume body
   (`VOLUME ONE / THE INHERITANCE OF FREQUENCY`, etc.).
4. Carry over every emphasis, scene break, and chapter head from the volumes.
5. Unified back matter once at the end ("Also by", "About the Author").

**Page-count sanity (derive from YOUR build, not a fixed range):**
```
expected ≈ (book1_pdf_pages + book2_pdf_pages + book3_pdf_pages) + separators(≈3–6)
```
Pull the three actual page counts from your reportlab outputs via `pdfinfo`. Flag if the
Omnibus falls outside ±5% of that sum. (Do not reuse v1's 580–640 figure — that was a
different toolchain's geometry.)

---

## TASK 4 — KINDLE VARIANTS (confirm necessity first)
Modern KDP ingests a valid **EPUB3** directly and converts server-side; a separate
hand-built Kindle file is often unnecessary. **First confirm** whether your KDP upload
path needs a distinct Kindle artifact at all.
- If NO: skip — upload the validated EPUB3 per title.
- If YES: from `generate_epubs_v1.py`, output variants that (a) declare `cover-image`
  in metadata, (b) drop CSS `page-break-before`, (c) keep a valid nav. Validate each
  with Kindle Previewer if available.

---

## TASK 5 — VERIFICATION GATE (mandatory, every file, last step)
```bash
python3 verify_deliverables.py <every .pdf and .epub produced>
```
Exit code 0 = all pass. The gate checks: real PDF/EPUB headers, EPUB mimetype-first +
correct type, no `Jason C. Holloway`, no stray emphasis asterisks, 6×9 trim on PDFs,
true `<em>` in EPUBs, nav/TOC present. A non-zero exit means DO NOT report shippable.

### Final 10-item checklist (all must PASS)
1. All files real formats (gate exit 0)
2. Zero `Jason C. Holloway` anywhere
3. True italics present (EPUB `<em>`; PDF visual spot-check one italic page per book)
4. 6×9 trim on every PDF (432×648 pt)
5. Omnibus page count within ±5% of derived expectation
6. Zero stray spaces inside emphasis in source (`\*( [^*]|[^*] )\*`)
7. Dialogue tags outside italics (Defect 4A applied)
8. Book 3 `eeg` filename corrected (4C) — gate passes Book 3
9. EPUB nav present with chapter entries
10. Kindle path resolved (variants built OR confirmed unnecessary)

---

## ESCALATION RULE (supersedes all else)
If any produced file fails the Task 5 gate — especially if it is a renamed text/markup
file masquerading as a PDF/EPUB — HALT. Report: **"FORMAT VALIDATION FAILED — not a real
[PDF/EPUB]."** Do not proceed to upload/distribution. Do not call it shippable. Surface
to Jason Carroll Holloway.

---

## STILL-OPEN (not for the agent to decide)
- Matching the live Canadian paperback typographic spec: pull the accepted IngramSpark/KDP
  interior, diff its trim/margins/leading against the reportlab settings, lock to match
  before pushing any revision over a selling edition.

*v2 built by Claude (Lead Narrative Designer session) — June 24, 2026 — Seventh City Press LLC.*
