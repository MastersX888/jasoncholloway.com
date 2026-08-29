# Book 2 Grimoire — EPUB 9798256009625
**Priority:** HIGH — re-upload pending
**Upload ready:** YES (rebuilt 2026-08-29)
**Google Play:** LIVE v3 — geo EPUB uploaded 2026-07-31 (874 KB, catalog Last updated Jul 31)
**IngramSpark:** STALE — pre-fix build still live

## Present
- `9798256009625.epub` — 853,387 bytes, rebuilt 2026-08-29 from the geo-fixed BUILD docx
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
| File size | 853,387 bytes (Ingram limit 100 MB) |
| Largest image | 3,840,000 px (Ingram limit 5,600,000) |
| Geo strings | Washington Street ✓ (9) · Pennsylvania Avenue ✓ (1) · apartment hummed ✓ (1) |
| Geo markers | balcony 0 · porch 0 · apartment 11 — matches the geo-fixed omnibus (balconies are a Book 3 feature) |

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx`
- Built via `generate_epubs_v1.py 9798256009625`
