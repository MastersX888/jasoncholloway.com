# Encyclopedia Print — Known Issues (Pass 2)

**For:** Fable Pass 2  
**Updated:** July 10, 2026  
**Supersedes:** `KNOWN_ISSUES_AND_FIXES.md` (Pass 1 — single 7×10 Ingram volume)

---

## P0 — Blocks Pass 2 completion

| # | Issue | Fix | File(s) |
|---|-------|-----|---------|
| P0-1 | **Wrong trim in Pass 1 PDFs** | Re-spec and re-typeset at **8.5 × 11 in** | `INTERIOR_SPEC_8.5x11.md` |
| P0-2 | **Wrong architecture** — single volume, DF center, no dictionary | Two products per `03_TWO_PRODUCT_TOC.md` | Rev. 3 docs |
| P0-3 | **Dictionary not typeset** | Full pipeline from `THE_RESONANT_FREQUENCY_DICTIONARY.docx`; Vol. 1 (A) minimum | `DICTIONARY_VOLUME_PLAN.md` |
| P0-4 | **Frequency tables FPO** | Set from `sources/frequency_data/frequency_bands.json` | Companion Part Three |
| P0-5 | **No 8.5×11 covers** | Companion + Dictionary vol. 1 + slipcase | `output/cover/` |
| P0-6 | **No BookVault RFQ** | Consolidate build sheet; not Ingram-first | `BOOKVAULT_RFQ.md` |
| P0-7 | **ISBN block unassigned** | Placeholders: 1 Companion + 1 set + N dictionary vols | RFQ + copyright pages |
| P0-8 | **DF wrong location** | Move facsimile to Companion **Part Four** (4b); keep 1:1 pagination | `distribution_file_fulltext.txt` |

---

## P1 — Author sign-off (flag, do not invent)

| # | Issue | Action | Source |
|---|-------|--------|--------|
| P1-1 | **Entry count** — 67 written; trim to ~40–80? | Default: typeset all 67; author may cut list | Rev. 3 §5 |
| P1-2 | **Essays 3–7** — outlined only | Cast off 6 pp each if prose not ready | Pass 2 Phase 5 |
| P1-3 | **Dictionary volume count** — 4 vs 8 vols | Propose after Vol. 1 + E sample | `LETTER_A_PAGINATION_REPORT.md` |
| P1-4 | **Holloway family clearance** | Keep `[AUTHOR VERIFY]` | CANON §4 |
| P1-5 | **Illustration budget** | B&W figures optional; default text-only | Publication plan |
| P1-6 | **Ingram trade Companion** | Optional downstream only; likely >400 pp with 4b DF | Rev. 3 §4 |

---

## P2 — Polish

| # | Issue | Fix | File(s) |
|---|-------|-----|---------|
| P2-1 | Loyd vs. Lloyd | "Loyd" in prose | `10_APPARATUS_HEADNOTES.md` |
| P2-2 | Grabovoi conviction | Pin legal citation | Apparatus headnote |
| P2-3 | Mikulov 1617 | Source or `[INVENTED]` | Khoury entry |
| P2-4 | Cognigenics.txt | Do not cite | — |
| P2-5 | Missouri wine | Two layers | KC entries |
| P2-6 | Index locators | Rebuild after pagination | `04_INDEX_DRAFT.md` |
| P2-7 | Science/fiction seam | Dictionary preface + table headnotes | Rev. 3 §7 |
| P2-8 | Letter E = 700 pp | Split Vol. 2 or E-only volume | Volume plan |

---

## Resolved since Pass 1

| # | Was | Resolution |
|---|-----|------------|
| R-1 | `frequency_bands.json` external | **In repo:** `sources/frequency_data/` |
| R-2 | Dictionary excerpt only | **Full 115,505 entries** — separate box set |
| R-3 | DF center of book | **4b:** Companion appendix |
| R-4 | Ingram default | **BookVault primary** |
| R-5 | 7×10 trim | **8.5×11 locked** |
| R-6 | Volume split undecided | **Option B:** Companion + Dictionary set |

---

## Assets in Pass 2 zip

| Asset | Path | Notes |
|-------|------|-------|
| Dictionary print master | `sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx` | 13.9 MB — **bundled** |
| Frequency JSON + companions | `sources/frequency_data/*.json` | Bundled |
| Dictionary txt extract | `sources/resonant_frequency_dictionary.txt` | **Excluded** (~14 MB one-line); use `.docx` |
| Letter A sample PDF | `output/print/dictionary_letter_a_sample_8.5x11.pdf` | Pagination baseline |
| Research library | `E:\Research\` | External — catalog in `universe_memory/` |

---

## Out of scope

- jasoncholloway.com
- Trilogy novel edits
- Third entry tranche (120–150 target) — **deferred**
- Digital edition
