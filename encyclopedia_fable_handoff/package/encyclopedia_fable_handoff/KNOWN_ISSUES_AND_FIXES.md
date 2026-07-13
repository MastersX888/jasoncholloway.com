# Encyclopedia Print Publication — Known Issues & Fixes

**For:** Fable publication pass  
**Updated:** July 10, 2026  
**Full decision log:** `encyclopedia_project/output/OPEN_DECISIONS.md`

---

## P0 — Blocks print upload

| # | Issue | Fix | File(s) |
|---|-------|-----|---------|
| P0-1 | **Manuscript incomplete** — 67 of ~120–150 target entries | Write third tranche; update TOC A–Z list | `01_ANNOTATED_ENTRIES/`, `00_ENCYCLOPEDIA_TOC.md` |
| P0-2 | **Essays 3–7 not written** — outlined only | Write prose essays 3–7 | `PART_THREE_ESSAYS/ESSAY_03–07_*.md` |
| P0-3 | **No cover art** | Design 7×10 case laminate wrap per `FABLE_ENCYCLOPEDIA_PROMPT.md` Phase 2 | `output/cover/` |
| P0-4 | **No print PDFs** | Layout interior + export Ingram-compliant PDF | `output/print/` |
| P0-5 | **No ISBN assigned** | Placeholder in metadata; author assigns new block before upload | `INGRAM_METADATA.md` |
| P0-6 | **Spine width unknown** | Lock interior page count first, then recalculate cover spine | `SPINE_CALCULATION.md` |

---

## P1 — Author sign-off required (flag, do not invent)

| # | Issue | Action | Source |
|---|-------|--------|--------|
| P1-1 | **DF page-target overage** — ~560–680 pp vs. 480–600 target | Confirm acceptable or trim second tranche, **not** DF | OPEN_DECISIONS item 9; CANON §4 TODO 6 |
| P1-2 | **Full in-book DF** as default | Implement Rev. 2; collector slipcase optional only | `02_DISTRIBUTION_FILE_INTEGRATION.md` |
| P1-3 | **Holloway family-history clearance** | Keep `[AUTHOR VERIFY]` on William Masters | CANON §4 TODO 10 |
| P1-4 | **June 1924 Moreau article** | Flag only until author confirms source | Moreau entry |
| P1-5 | **Illustration budget** | B&W line art vs. text-only — author call | `01_PUBLICATION_PLAN.md` §7.4 |
| P1-6 | **Collector slipcase (Option B)** | Prototypes pending; do not schedule standard edition against it | OPEN_DECISIONS item 2 |

---

## P2 — Polish at print pass

| # | Issue | Fix | File(s) |
|---|-------|-----|---------|
| P2-1 | **Loyd vs. Lloyd spelling** | "Loyd" in prose; JSON key as citation only | `10_APPARATUS_HEADNOTES.md` |
| P2-2 | **Grabovoi fraud conviction** | Pin legal citation (living person claim) | Apparatus headnote |
| P2-3 | **Mikulov 1617 Jesuit planting** | Source or `[INVENTED]` label | Khoury-related entry |
| P2-4 | **Cognigenics.txt missing** | Do not cite anywhere | — |
| P2-5 | **Missouri wine rank** | Hold novel line + historical fact in two layers | Nadia / KC entries |
| P2-6 | **Index stale** | Rebuild merged index after third tranche | `04_INDEX_DRAFT.md` |
| P2-7 | **Citations addendum not merged** | Integrate into bibliography | `CITATIONS_ADDENDUM.md` → `03_ANNOTATED_BIBLIOGRAPHY.md` |
| P2-8 | **Resonant Frequency Dictionary excerpt** | Curate appendix excerpt from external 13MB file | EXTERNAL_ASSETS.md path |
| P2-9 | **Frequency tables duplication** | DF Part III vs. appendix — concordance only | Integration plan §2 |
| P2-10 | **"Andrew Park" name form** | Log only; no propagation | OPEN_DECISIONS item 10 |

---

## External assets (not in zip)

See `EXTERNAL_ASSETS.md` in the handoff package:

- `E:\frequency_data\frequency_bands.json` — canonical frequency tables
- `E:\Research\` — 188-file research library (paths in `universe_memory/01_RESEARCH_CATALOG.md`)
- `encyclopedia_project/sources/resonant_frequency_dictionary.txt` — ~13.7M chars; excerpt only
- Trilogy cover references: `public/covers/`, `design_memory/trilogy_reference/` (manifest in ASSET_MANIFEST.md)

---

## Out of scope (do not fix in this pass)

- jasoncholloway.com deployment or encyclopedia web page
- Trilogy novel edits or new ISBNs for existing volumes
- Hawkes monograph
- Marketing site / newsletter integration
