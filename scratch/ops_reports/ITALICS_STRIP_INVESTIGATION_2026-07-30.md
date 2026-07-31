# Italics Strip Investigation — 2026-07-30

**Reporter:** Jason (~5:46 PM CT) — italics missing in Ingram paperback e-proofs  
**Investigator:** Morgan / compositor pass  
**Status:** CONFIRMED (PB Vol I–III) · Root cause found · Fixed rebuilds staged · **Re-upload blocked pending Vivian QC + Jason approval**

---

## 1. Verdict (Jason-facing)

| ISBN | Title | E-proof body italics | Confirmed missing? |
|---|---|---|---|
| **9798256008048** | Vol I PB — *The Inheritance of Frequency* | Structural only (titles / Hz keys / epigraph shell) | **YES** |
| **9798256009953** | Vol II PB — *The Grimoire* | Structural only | **YES** |
| **9798256010072** | Vol III PB — *The Kingdom* | Structural only | **YES** |

**Ingram did not strip italics.** The uploaded interiors already lacked body italics. E-proofs match `Desktop\MASTER_UPLOAD_FOLDER\*_PB\interior.pdf` span-for-span on sampled probes.

---

## 2. Evidence — e-proofs vs uploaded interiors

### Method
MuPDF (`fitz`) span scan: italic = font flag bit 2 **or** font name contains `italic`/`oblique`. Classified structural (Hz keys, volume titles, epigraph attribution, “A PREVIEW OF”) vs body.

### Counts

| File | Pages | Body italic spans | Structural italic spans |
|---|---:|---:|---:|
| EPROOF-9798256008048.pdf | 191 | ~5 (false “body” from epigraph line / preview labels) | 30 |
| MASTER `9798256008048_PB/interior.pdf` | 185 | 1 | 34 |
| EPROOF-9798256009953.pdf | 271 | ~4 | 35 |
| MASTER `9798256009953_PB/interior.pdf` | 265 | 1 | 38 |
| EPROOF-9798256010072.pdf | 211 | ~1 | 32 |
| MASTER `9798256010072_PB/interior.pdf` | 205 | 1 | 32 |

### Probe quotes (roman in e-proof **and** MASTER PB)

| Book | Passage | E-proof | MASTER PB |
|---|---|---|---|
| Vol I | `Always know your exits.` | roman (`VdmdrpGaramond`) | roman (`Garamond`) — merged into surrounding sentence |
| Vol II | `The Big Bang was a sound.` | roman | roman |
| Vol II | `The Moleskine. Seventh volume. Final entry:` | roman | roman |
| Vol III | `The Moleskine. The tenth. First Kansas City entry:` | roman | roman |
| Vol III | `Teach. Just teach. …` | roman | roman |

What *is* italic in the e-proofs: half-title / volume subtitle, chapter frequency keys (`109 Hz · Kansas City`), epigraph style pages — **not** narrative emphasis.

---

## 3. Source of truth

| Asset | Path | Italics status |
|---|---|---|
| BUILD DOCX B1–B3 | `production_staging/_sources/build_docx/MASTERS_X_BOOK*_BUILD.docx` | **Intact** — 104 / 36 / 48 italic runs (6454 / 2039 / 5033 chars) |
| ITALICIZED_FIXED DOCX | `production_staging/_sources/MASTERS_X_BOOK*_ITALICIZED_FIXED.docx` | Same counts (pre-geo; do not rebuild from these alone) |
| MASTER PB interiors | `Desktop\MASTER_UPLOAD_FOLDER\9798256008{048,9953,0072}_PB\interior.pdf` | Body italics **missing** (bug in PDF compose) |
| staging PB copies | `production_staging/b*_*/97982560*_PB/interior.pdf` | Same as MASTER (byte-identical lineage) |

DOCX probe (BUILD Book 1): run `Always know your exits.` has `italic=True` — source is good.

---

## 4. Omnibus + EPUB (Jason’s suspicion: OK)

| Format | Body italics? | Notes |
|---|---|---|
| **Omnibus PB** `9798256072704` | **YES** — ~311 body italic spans in sample classification | Probe `Always know your exits.` → `Garamond-Italic` |
| **Omnibus HC** `9798295884412` | **YES** — ~296 body italic spans | Same |
| **EPUB Vol I** `9798256008819` | **YES** — 103 `<em>` tags | Matches DOCX run count |
| **EPUB Vol II** `9798256009625` | **YES** — 36 `<em>` | |
| **EPUB Vol III** `9798256009809` | **YES** — 48 `<em>` | |

### Side finding — individual HC also broken
MASTER HC interiors for Vol I–III show the **same** body-italic collapse (body spans ≈ 3–5, structural only). Same ReportLab bug. Not in tonight’s e-proof complaint, but must rebuild before any HC re-submit.

---

## 5. Root cause

**ReportLab font-family map missing in individual book generators.**

Generators register three faces:

```python
pdfmetrics.registerFont(TTFont("Garamond", ...))
pdfmetrics.registerFont(TTFont("GaramondBd", ...))
pdfmetrics.registerFont(TTFont("GaramondIt", ...))
```

They extract DOCX italic runs into `<i>…</i>` markup correctly (Book 1: **96 paragraphs with italic runs** at extract time).

But without:

```python
pdfmetrics.registerFontFamily(
    "Garamond",
    normal="Garamond",
    bold="GaramondBd",
    italic="GaramondIt",
    boldItalic="GaramondIt",
)
```

ReportLab **silently drops** `<i>` tags inside `Paragraph(..., fontName="Garamond")` and paints roman. Reproduced in a minimal test:

- No family → `Always know your exits.` merges into roman `Garamond`
- With family → separate `Garamond-Italic` span

Structural italics still appeared because those styles set `fontName="GaramondIt"` directly (Hz, subtitle, epigraph) — never going through `<i>` markup.

**Why omnibus/EPUB were fine:** Omnibus PDF was composed with a working italic path (body italics present). EPUB uses HTML `<em>`, not ReportLab.

**Why PRE_UPLOAD_AUDIT passed (2026-07-28):** It counted *any* italic spans (including Hz keys). False confidence — did not require body/narrative italics.

---

## 6. Fix applied (this session)

### Code
Added `registerFontFamily(...)` to all six generators:

- `generate_book{1,2,3}_interior_paperback.py`
- `generate_book{1,2,3}_interior.py` (HC — patched, not yet rebuilt)

Also made unused E: preview markdown load **optional** on B1/B2 PB scripts (preview is already disabled in live CANON `_build_elements(..., [])`; missing E: was hard-failing rebuild).

### Rebuilt interiors (staged — not uploaded, not copied over MASTER)

`production_staging/_italic_fix_2026-07-30/`

| File | Pages | Body italic spans | Probe |
|---|---:|---:|---|
| `9798256008048_PB_interior.pdf` | **183** (was 185) | **162** (was 1) | `Always know your exits.` → italic |
| `9798256009953_PB_interior.pdf` | **265** (same) | **59** (was 1) | `The Big Bang was a sound.` → italic |
| `9798256010072_PB_interior.pdf` | **205** (same) | **103** (was 1) | `The Moleskine. The tenth…` → italic |

**Page-count note:** Vol I shrank 185→183 (likely reflow from real italic metrics + empty preview body). Confirm spine/wrap still acceptable before Ingram replace. Vol II/III page counts unchanged.

**Disk:** C: was ~0.2–0.25 GB free during rebuild — do **not** copy large e-proofs; free space before broader packaging.

---

## 7. Exact next actions (do not auto-upload)

1. **Tonight (Jason):** No Ingram action required. Cash App borrow still the only money item. Optional: glance one rebuilt PDF page with known italics.
2. **Tomorrow:** Free C: disk space first.
3. **Compositor:** Rebuild **individual HC** interiors with the same patched generators; spot-check page counts vs spines.
4. **Copy** approved PB (+ HC if ready) into `Desktop\MASTER_UPLOAD_FOLDER\*_PB\interior.pdf` (and staging ISBN folders). Keep prior interiors as `interior_PRE_ITALIC_FIX_*.pdf` if space allows.
5. **Vivian QC** — print/PDF pass: body italics + geo strings + page counts / spine. Protocol: `scratch/EDITORIAL_QC_PROTOCOL.md`.
6. **Jason approval** on evening checklist.
7. **Ingram:** Replace interiors for 9798256008048 / 9953 / 0072 (and HC ISBNs if rebuilt). Request new e-proofs; re-verify body italic probes before approving print.
8. **Audit hardening:** Update `pre_upload_audit.py` to fail if body italic spans ≈ 0 while DOCX italic runs > 0.

---

## 8. What not to do

- Do **not** rewrite manuscripts or re-italicize DOCX (already correct).
- Do **not** rebuild from plain `*_DEMY_*.txt` or stale ITALICIZED without BUILD merge.
- Do **not** upload without Vivian + Jason.
- Do **not** assume omnibus needs rework for this bug (already OK).

---

*Seventh City Press · Italics investigation · 2026-07-30 evening*
