# Book 3 Kingdom — EPUB 9798256009809
**Priority:** HIGH — re-upload pending
**Upload ready:** YES — current build **2026-08-29 17:22:32**; **required** Google Play / IngramSpark upload this round
**Carries:** scene-break centering fix AND the character-name pass — **14 character references changed in this volume**
**Google Play:** LIVE v3 — geo EPUB uploaded 2026-07-31 (913 KB, catalog Last updated Jul 31)
**IngramSpark:** STALE — pre-fix build still live

## Present
- `9798256009809.epub` — **752,604 bytes**, built **2026-08-29 17:22:32** from the
  post-name-fix BUILD docx. EPUBCheck 5.3.0: **0 fatals / 0 errors / 0 warnings / 0 infos**.
  ~~752,644 bytes~~ was the 11:22 centering build and was superseded by the 17:22
  rebuild that carries the character-name pass.
- Staged for upload at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256009809_RETAIL.epub` — byte-identical, SHA256 `07c26d71f884d82d…`
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
| Identifier | 9798256009809 ✓ |
| EPUBCheck 5.x | **VALID — 0 errors, 0 warnings** |
| `validate_epub` gates | PASS |
| Stylesheet linked | 35/35 pages (`cover.xhtml` exempt) |
| Scene breaks | 138 × `<div class="scene-break">`, 0 legacy `<hr class="sb-rule">` |
| File size | ~~752,644 bytes~~ → **752,604 bytes** at 17:22 (Ingram limit 100 MB) |
| Largest image | 3,840,000 px (Ingram limit 5,600,000) |
| Geo strings | Quality Hill ✓ (18) · balcony ✓ (14) · Iceland ✓ (47) · basalt ✓ (26) · apartment hummed ✓ (2) |
| Geo markers | balcony 15 · porch 0 · apartment 47 — the balcony ruling lands here, matching the geo-fixed omnibus |

## Character-name pass — second rebuild, 2026-08-29 17:22
Rebuilt to carry the character-name pass. **14 character references changed in
Book 3** — Marcus **Chen** → Marcus **Whitaker** (3), Margaret **Chen** →
Margaret **Ferrand** (5), Laura **Chen** → Laura **Okada** (1), Lin **Chen** →
Lin **Zhao** (1), Michael **Chen** → Michael **Halloran** (1), **Andrew Tanaka**
→ **Nolan Eriksen** (1), **Marcus Jr.** → **Idris Broussard** (1), **Kofi
Mensah** → **Kofi Asante** (1). Largest name delta of the three volumes. Full
write-up: `production_staging/NAME_FIX_2026-08-29.md`.

The verification table above was measured on the 11:22 build; its structural
findings are unchanged by a name substitution. EPUBCheck was re-run against the
17:22 file and is clean.

**Kindle sibling.** `b3_kingdom/9798256009809_KINDLE/9798256009809_KINDLE.epub`
(752,658 bytes, 17:24:42) is a separate **required** KDP upload. It is not
interchangeable with this file: its `dc:identifier` is a UUID rather than the
ISBN, and it carries the print ISBN in `dc:source`.

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx`
- Built via `generate_epubs_v1.py 9798256009809`
