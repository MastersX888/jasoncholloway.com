# Omnibus Hardcover — 9798295884412
**Portal status (Jason verbal ~2026-08-03 afternoon CT):** **LIVE / APPROVED** — see `scratch/ops_reports/INGRAM_ALL_TITLES_LIVE_2026-08-03.md`. Local harvest notes below are historical staging inventory, not portal evidence.
**Priority:** HIGHEST
**Upload ready:** CHECK — spine/visual review required
**Covers:** geometry jacket + caselam staged 2026-07-28 (from omnibus-hardcover-v3 + new Ingram template)

## ⚠ MANDATORY POST-BUILD STEP (added 2026-08-29)
`generate_omnibus_interior_HC_CURRENT.py` now emits **680** pages, not 684. The
SUB-BOOK divider removal reclaimed four pages (each divider held a recto plus its
blank verso). The live jacket and caselam were built for 684 and their source PDFs
are not on this machine, so the count must be held.

After **every** omnibus HC rebuild, run:

```
python production_staging/_scripts_from_windows/pad_omnibus_hc_to_canon.py
```

It appends the shortfall as blank pages at Royal trim, is idempotent, and refuses
to run on a wrong trim or an unexpected gap. Verify 684 before upload. See
`production_staging/SUBBOOK_REMOVAL_2026-08-29.md`.

## Canon fix rebuild 2026-08-29 — UPLOAD READY
Rebuilt from the patched Book 1 BUILD docx to carry the Chapter One canon fix
(grandfather d. 2003; "a grandson who did not yet exist"). See
`production_staging/CANON_FIX_2026-08-29.md`.

- **684 pp — exactly canon** (680 from the generator + 4 padded blanks). Spine
  width unchanged, so the staged jacket and caselam remain valid. No cover rework.
- Trim verified Royal 6.14×9.21.
- Canon fix confirmed present in the rendered PDF text.
- SUB-BOOK dividers removed; both chapter boundaries now match the standard shape.

The omnibus reproduces its canon page count exactly. Books 1–3 individually are
resolved as well: all six individual print interiors match their live IngramSpark
counts exactly, 6 of 6. The earlier "+7 HC / +11 PB drift" report was a comparison
against stale canon figures and was retracted 2026-08-29 — those titles are not
blocked and need no spine or cover rework.

## Present
- `interior.pdf` — 684 pp Royal
- `cover_jacket.pdf` / `cover_caselam.pdf` — geometry era, new template spine
