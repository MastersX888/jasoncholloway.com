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
- ~~Book 3 often describes the Quality Hill residence as a **house** (porch, driveway, flagstones) while some lines still say **apartment**.~~ **Resolved.** Author ruled the residence is an **apartment** with a **balcony**; 48 edits applied to Book 3 (see "Apartment / balcony pass" in `FIX_CHANGELOG.md` and `artifacts/fix_apartment_balcony.json`). This reversed `qh-3-4213` (`balcony`→`porch`) back to `balcony`.
- Open, awaiting author: two Book 2 lines still call the residence a house (l.6941, l.7419). Left untouched because the apartment/balcony pass was scoped to Book 3.
