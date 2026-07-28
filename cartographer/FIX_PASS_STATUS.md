# FIX PASS STATUS
**Completed:** 2026-07-28  
**Executor:** Claude Opus 5 (prose/adjudication) + apply script  
**Target:** `cartographer/corpus/MASTERS_X_BOOK*_DEMY_*.txt`  
**Edits applied:** 20 (see `FIX_CHANGELOG.md`)

All nine locked author rulings executed. Verification sweep: banned geographic error strings absent.

## Not synced (downstream)
- `corpus_raw/omnibus_v8_fulltext.txt` — still pre-fix extract
- Audiobook ElevenLabs scripts — still pre-fix
- Print PDF / Ingram interiors — author production pipeline

## Author follow-ups flagged (out of geo scope)
- Book 3 often describes the Quality Hill residence as a **house** (porch, driveway, flagstones) while some lines still say **apartment**. Geo pass kept “apartment” per locked house-style wording except `balcony`→`porch` at B3:4213.
