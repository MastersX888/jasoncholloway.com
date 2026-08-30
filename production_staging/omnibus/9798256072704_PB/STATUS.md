# Omnibus Paperback — 9798256072704
**Portal status (Jason verbal ~2026-08-03 afternoon CT):** **LIVE / APPROVED** — see `scratch/ops_reports/INGRAM_ALL_TITLES_LIVE_2026-08-03.md`. Local harvest notes below are historical staging inventory, not portal evidence.
**Priority:** HIGHEST
**Upload ready:** CHECK — visual review required
**Covers:** geometry wrap staged 2026-07-28 (template 732 pp / spine 1.684")

## Canon fix rebuild 2026-08-29 — UPLOAD READY
Rebuilt from the patched Book 1 BUILD docx to carry the Chapter One canon fix
(grandfather d. 2003; "a grandson who did not yet exist"). See
`production_staging/CANON_FIX_2026-08-29.md`.

- **732 pp — exactly canon.** Matches the existing wrap template (732 pp /
  spine 1.684"), so no cover rework needed.
- Trim verified Demy 5.5×8.5.
- Canon fix confirmed present in the rendered PDF text.
- SUB-BOOK dividers removed 2026-08-29; the paperback absorbed the change through
  reflow and needed no padding, unlike the hardcover. See
  `production_staging/SUBBOOK_REMOVAL_2026-08-29.md`.
- Note: this interior was briefly overwritten by a stray EPUB during that session
  (leaked `BUILD_OUTPUT`) and was rebuilt from source. Signature verified `%PDF`,
  732 pp, ~~1,315,351 B~~ — byte-size identical to the pre-incident build.
  **Size superseded 2026-08-29:** that figure predates the 17:22 character-name
  rebuild. The current `interior.pdf` is **1,315,378 bytes**, built **2026-08-29
  17:22:23**, SHA256 `1de0fef6337e3d0c…`, and is byte-identical to the staged
  copy at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256072704_PB_interior.pdf`.
  732 pp and the 1.684" spine are unchanged, so the wrap is still valid.

The omnibus reproduces its canon page count exactly. Books 1–3 individually are
resolved as well: all six individual print interiors match their live IngramSpark
counts exactly, 6 of 6. The earlier "+7 HC / +11 PB drift" report was a comparison
against stale canon figures and was retracted 2026-08-29 — those titles are not
blocked and need no spine or cover rework.

## Present
- `interior.pdf` — 732 pp Demy
- `cover_wrap.pdf` — geometry era
