# Book 3 Kingdom — EPUB 9798256009809
**Priority:** HIGH — re-upload pending
**Upload ready:** YES (rebuilt 2026-08-29)
**Google Play:** LIVE v3 — geo EPUB uploaded 2026-07-31 (913 KB, catalog Last updated Jul 31)
**IngramSpark:** STALE — pre-fix build still live

## Present
- `9798256009809.epub` — 752,644 bytes, rebuilt 2026-08-29 from the geo-fixed BUILD docx
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
| File size | 752,644 bytes (Ingram limit 100 MB) |
| Largest image | 3,840,000 px (Ingram limit 5,600,000) |
| Geo strings | Quality Hill ✓ (18) · balcony ✓ (14) · Iceland ✓ (47) · basalt ✓ (26) · apartment hummed ✓ (2) |
| Geo markers | balcony 15 · porch 0 · apartment 47 — the balcony ruling lands here, matching the geo-fixed omnibus |

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx`
- Built via `generate_epubs_v1.py 9798256009809`
