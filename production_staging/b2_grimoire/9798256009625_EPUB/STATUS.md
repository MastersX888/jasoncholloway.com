# Book 2 Grimoire — EPUB 9798256009625
**Priority:** HIGH — re-upload pending
**Upload ready:** YES — current build **2026-08-29 17:22:30**; **required** Google Play / IngramSpark upload this round
**Carries:** scene-break centering fix AND the character-name pass — **4 character references changed in this volume**
**Google Play:** LIVE v3 — geo EPUB uploaded 2026-07-31 (874 KB, catalog Last updated Jul 31)
**IngramSpark:** STALE — pre-fix build still live

## Present
- `9798256009625.epub` — **853,389 bytes**, built **2026-08-29 17:22:30** from the
  post-name-fix BUILD docx. EPUBCheck 5.3.0: **0 fatals / 0 errors / 0 warnings / 0 infos**.
  ~~853,387 bytes~~ was the 11:22 centering build and was superseded by the 17:22
  rebuild that carries the character-name pass.
- Staged for upload at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256009625_RETAIL.epub` — byte-identical, SHA256 `db289aad4fe9d5a2…`
- Cover JPG in folder / `_covers/ebook/`

## Why it was rebuilt
Same defect found in Book 1 via the Booktopia preview. `generate_epubs_v1.py` added
`style/book.css` to the book but never registered it against the individual pages;
ebooklib rebuilds each document `<head>` on write, so the stylesheet reference was
dropped and **every page shipped unstyled**. Scene-break ornaments rendered flush
left and front/back matter was not centered. All three retail volumes share the
generator, so all three were affected.

## Verification (2026-08-29)
| Check | Result |
|---|---|
| Zip / mimetype first | OK |
| Identifier | 9798256009625 ✓ |
| EPUBCheck 5.x | **VALID — 0 errors, 0 warnings** |
| `validate_epub` gates | PASS |
| Stylesheet linked | 33/33 pages (`cover.xhtml` exempt) |
| Scene breaks | 135 × `<div class="scene-break">`, 0 legacy `<hr class="sb-rule">` |
| File size | ~~853,387 bytes~~ → **853,389 bytes** at 17:22 (Ingram limit 100 MB) |
| Largest image | 3,840,000 px (Ingram limit 5,600,000) |
| Geo strings | Washington Street ✓ (9) · Pennsylvania Avenue ✓ (1) · apartment hummed ✓ (1) |
| Geo markers | balcony 0 · porch 0 · apartment 11 — matches the geo-fixed omnibus (balconies are a Book 3 feature) |

## Character-name pass — second rebuild, 2026-08-29 17:22
Rebuilt to carry the character-name pass. **4 character references changed in
Book 2** — **Sarah Chen** → **Rosalind Lindgren** (2), **Margaret** Masters →
**Lorraine** Masters (1), Senator **Margaret** Holt → Senator **Deborah** Holt
(1) — plus the non-name Sabrina Volkov "shared by marriage" → "had been born
with" rewording. Full write-up: `production_staging/NAME_FIX_2026-08-29.md`.

Book 2 was at one point described as skippable this round. That was false and has
been retracted — see the CORRECTED section in
`production_staging/b2_grimoire/9798295812675_HC/STATUS.md`. All four Book 2
formats are required uploads.

The verification table above was measured on the 11:22 build; its structural
findings are unchanged by a name substitution. EPUBCheck was re-run against the
17:22 file and is clean.

**Kindle sibling.** `b2_grimoire/9798256009625_KINDLE/9798256009625_KINDLE.epub`
(853,440 bytes, 17:24:39) is a separate **required** KDP upload. It is not
interchangeable with this file: its `dc:identifier` is a UUID rather than the
ISBN, and it carries the print ISBN in `dc:source`.

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx`
- Built via `generate_epubs_v1.py 9798256009625`
