# Pass 1 Return — What to Keep vs. Discard

**For:** Fable Pass 2  
**Pass 1 return archived:** `encyclopedia_project/return/masters-x-encyclopedia-design-pass-RETURN.zip`  
**Pass 1 PDFs:** `encyclopedia_project/output/print/interior_7x10_*.pdf`

---

## Keep (design system — migrate to 8.5×11)

| Asset | Path | Use in Pass 2 |
|-------|------|---------------|
| Design system doc | `output/print/DESIGN_TEAM_RECOMMENDATIONS.md` | Typography, registers, DF chrome rules |
| DF facsimile logic | Pass 1 `pipeline/` (if in return zip) | Companion Part Four appendix |
| Typefaces | Cinzel / EB Garamond / Courier Prime | Companion + Dictionary (dictionary: compact variant) |
| Edition B build sheet | `output/print/EDITION_B_COLLECTOR_SPEC.md` | BookVault RFQ — **update trim to 8.5×11** |
| Cover handoff brand rules | `output/print/COVER_PHASE_HANDOFF.md` | Adapt geometry to 8.5×11 |
| Spine math method | `output/print/SPINE_CALCULATION.md` | Recalculate at new trim + page counts |
| Page count ledger format | `output/print/PAGE_COUNT.txt` | Template for Companion + Dictionary ledgers |

---

## Discard (wrong architecture — do not extend)

| Asset | Why |
|-------|-----|
| `interior_7x10_EDITION_A.pdf` | Wrong trim; wrong content architecture (DF center, no dictionary) |
| `interior_7x10_EDITION_B_COLLECTOR.pdf` | Same |
| `INTERIOR_SPEC.md` §1 trim 7×10 | Superseded by `INTERIOR_SPEC_8.5x11.md` |
| `INGRAM_METADATA.md` as primary | BookVault primary; Ingram optional trade Companion only |
| `00_ENCYCLOPEDIA_TOC.md` Part Two DF center | Superseded by `03_TWO_PRODUCT_TOC.md` |
| `02_DISTRIBUTION_FILE_INTEGRATION.md` Rev. 2 default | DF moves to Companion Part Four (4b) |
| 560–680 pp single-volume target | Companion ~400–450; Dictionary ~3,156 separate |
| `[TABLE FPO]` slugs in Part Four | `frequency_bands.json` now in repo — set tables |
| Edition A / Edition B product split | Replaced by **Companion / Dictionary box set** |

---

## Pass 1 page ledger (historical — do not cite)

| Section | Pass 1 pp |
|---------|-----------|
| Front matter | 16 |
| Part One entries | 69 |
| Part Two DF facsimile | 251 |
| Part Three essays | 12+ cast-off |
| Part Four apparatus | FPO tables |
| **Total** | 369 typeset / 370 Ingram |

Pass 2 Companion replaces Part Two DF bulk with framing + moves DF to Part Four. Dictionary absorbs the 115k-entry core.

---

## Cursor proofs included in Pass 2 handoff

| File | Role |
|------|------|
| `output/print/dictionary_letter_a_sample_8.5x11.pdf` | Pagination baseline (36.6 e/page) — beat this with production typography |
| `output/print/LETTER_A_PAGINATION_REPORT.md` | Letter counts + volume split options |
| `scripts/typeset_letter_a_sample.py` | Parser reference for `.docx`/txt pipeline |

---

## Author feedback on Pass 1 PDF (why Pass 2 exists)

- Interior looked like "random data mess" — DF facsimile dominated; dictionary absent
- Wrong trim (7×10 vs. 8.5×11)
- Resonant Frequency Dictionary must be **primary text**, not appendix excerpt
- Science layering correct in manuscript but PDF balance wrong

Pass 2 corrects architecture; Pass 1 corrects typography.
