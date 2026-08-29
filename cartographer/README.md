# CARTOGRAPHER — Masters X Geographic Integrity Audit

> **Before running any phase script, read [`REGEN_2026-08-29.md`](./REGEN_2026-08-29.md).**
> `corpus_raw/omnibus_v8_fulltext.txt` is the **pre-geo-fix** omnibus. The geo fixes
> were applied by phase8 directly to `corpus/`, never back into that raw file, so
> re-running `phase1_normalize.mjs` against the default input **reverts 39 geo
> fixes**. Use `production_staging/_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt`.

## Deliverables (Section 7)

| Artifact | Path |
|---|---|
| Defect register | [`DEFECT_REGISTER.csv`](./DEFECT_REGISTER.csv) |
| Location bible | [`KC_LOCATION_BIBLE.md`](./KC_LOCATION_BIBLE.md) |
| Distance matrix | [`kc_distance_matrix.csv`](./kc_distance_matrix.csv) |
| Author decisions | [`AUTHOR_DECISION_BRIEF.md`](./AUTHOR_DECISION_BRIEF.md) |

## Corpus provenance

Named DEMY PDF-as-text files (`MASTERS_X_BOOK*_DEMY_*.pdf`) were **not present** in the cloud agent environment. Corpus reconstructed from `omnibus_v8_fulltext.txt` (print-faithful extract recovered from git history), split into DEMY-named book files under `corpus/`.

- **Citations** use `B{n}:{book_line}` in those reconstructed files.
- **Section 4 seed cites** (e.g. B2:825) are crosswalked in `artifacts/seed_xref.json` (all 25 seeds found).
- Audiobook scripts (~135,606 words) used as secondary check for scene-slug recall.
- Italicized DOCX recovered from git for word-count sanity (~135,838 words).

## Pipeline gates

| Gate | Result |
|---|---|
| 1 Normalize | 1,939 paragraphs · 669 scenes · 667 slug lines · 139,025 words |
| 2 Concordance | 3,784 occurrences · 653 distinct · 570 capitalized/place |
| 3 Classification | 28 HYBRID · see `artifacts/entity_graph.json` |
| 4–7 Adjudication | 20 register rows · see defect register |

## Intermediate artifacts

Under `artifacts/`: `corpus_clean.jsonl`, `scene_manifest.csv`, `entities.csv`, `entity_frequency.csv`, `entity_graph.json`, `seed_xref.json`, phase reports.
