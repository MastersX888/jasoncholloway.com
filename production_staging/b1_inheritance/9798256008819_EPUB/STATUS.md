# Book 1 Inheritance — EPUB 9798256008819
**Priority:** HIGH — re-upload pending
**Upload ready:** YES — current build **2026-08-29 17:22:28**; **required** Google Play / IngramSpark upload this round
**Carries:** scene-break centering fix, the Chapter One canon fix AND the character-name pass — **27 character references changed in this volume** — one upload covers all three
**Google Play:** LIVE v3 — geo EPUB uploaded 2026-07-31 (604 KB, catalog Last updated Jul 31)
**IngramSpark:** STALE — still serving the 2026-07-03 build (visible in the Booktopia preview)

## Present
- `9798256008819.epub` — **754,075 bytes**, built **2026-08-29 17:22:28** from the
  post-name-fix BUILD docx. EPUBCheck 5.3.0: **0 fatals / 0 errors / 0 warnings / 0 infos**.
  ~~754,069 bytes~~ was the 11:22 centering-plus-canon build and was superseded by
  the 17:22 rebuild that carries the character-name pass.
- Staged for upload at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256008819_RETAIL.epub` — byte-identical, SHA256 `32ac82818e89c280…`
- Cover JPG in folder / `_covers/ebook/`

## Why it was rebuilt
Reported via the Booktopia ebook preview: scene-break ornaments (`◇ ◆ ◇`) were not
centered. Root cause was **not** the CSS — it was that `generate_epubs_v1.py` added
`style/book.css` to the book but never registered it against the individual pages.
ebooklib rebuilds each document `<head>`, so the `<link>` was dropped and **every
XHTML page shipped with no stylesheet reference at all**. Readers fell back to their
defaults, so the ornaments rendered flush left and nothing on the front/back matter
was centered.

Note this is a different bug from the website sampler fix in commit `aa80554`
(2026-08-21), which only touched `public/downloads/masters-x-*.epub`. The retail
line was never covered by that fix.

## Fixes applied
| Where | Change |
|---|---|
| `_scripts_from_windows/generate_epubs_v1.py` | Register the stylesheet against every page (title, copyright, epigraph, chapters, back matter, closer, nav) |
| `_scripts_from_windows/generate_epubs_v1.py` | Hard-fail when `epub_book.css` is absent instead of silently embedding an empty stylesheet |
| `_scripts_from_windows/generate_epubs_v1.py` | New `validate_epub` gate: fail if any page except `cover.xhtml` lacks a stylesheet link |
| `_epub_build/epub_book.css` | Added the missing rules for `title-page`, `copyright-page`, `epigraph-page` and `end-closer`, including `text-indent: 0` so centered matter clears the body first-line indent |

## Verification (2026-08-29)
| Check | Result |
|---|---|
| Zip / mimetype first | OK |
| Identifier | 9798256008819 ✓ |
| EPUBCheck 5.x | **VALID — 0 errors, 0 warnings** |
| `validate_epub` gates | PASS |
| Stylesheet linked | 29/30 pages (`cover.xhtml` exempt — full-bleed image) |
| Scene breaks | 76 × `<div class="scene-break">`, 0 legacy `<hr class="sb-rule">` |
| Centering offset | ≤ 0.01px from true centre on scene breaks, title, copyright, epigraph, closer, back matter |
| Ornament wrapping | Single line at every width 1200px → 260px |
| Geo strings | 1647 Genessee ✓ · RIVERWARDS ✓ · SubTropolis ✓ · Westport ✓ |
| Geo-fix parity | Book 1 slice of `OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` matches this source exactly (balcony 0 / porch 3 / apartment 15 / house 27). Balconies are a Book 2–3 feature; Book 1 is correctly geo-fixed. |

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK1_BUILD.docx`
- Built via `generate_epubs_v1.py 9798256008819`

## Canon fix — RESOLVED 2026-08-29 (author ruling obtained)
Two Chapter One sentences were corrected and this EPUB was rebuilt a second time
to carry them. Full write-up: `production_staging/CANON_FIX_2026-08-29.md`.

| Was | Now |
|---|---|
| `"My grandfather died in 2010."` | `"My grandfather died in 2003."` — matches `CANON.md` (William d. 2003; James d. Sept 2010) |
| `aimed at a future grandson he would never meet` | `aimed at a grandson who did not yet exist` — William teaches nine-year-old Blake to fly in the summer of 1999, so they demonstrably met |

Both edits are pagination-neutral (verified by controlled A/B: Book 1 builds to
163 HC / 189 PB both before and after). `validate_epub` was also **found to be
dead code — defined but never called** — which is the real reason no canon gate
ever fired. It is now wired into `__main__` with a non-zero exit on failure, and
the grandfather gates plus a new `"would never meet"` gate are live.

## Character-name pass — third rebuild, 2026-08-29 17:22
This EPUB was rebuilt a third time to carry the character-name pass. **27
character references changed in Book 1** — Sarah **Chen** → Sarah **Ashworth**
(4, including the three bare surname references) and **Margaret** Masters →
**Lorraine** Masters (23). Full write-up:
`production_staging/NAME_FIX_2026-08-29.md`.

The verification table above was measured on the 11:22 build. Its structural
findings (stylesheet linkage, scene-break counts, centering, geo strings) are
unchanged by a name substitution; the size and build time in **Present** are the
current figures. EPUBCheck was re-run against the 17:22 file and is clean.

**Kindle sibling.** `b1_inheritance/9798256008819_KINDLE/9798256008819_KINDLE.epub`
(754,129 bytes, 17:24:36) is a separate **required** KDP upload. It is not
interchangeable with this file: its `dc:identifier` is a UUID rather than the
ISBN, and it carries the print ISBN in `dc:source`.

## Stale record
`production_staging/MASTER_UPLOAD_REFERENCE/9798256008819_EPUB/STATUS.md` still says
`Upload ready: NO — PRE_GEO_FIX`. That snapshot predates the geo-fixed BUILD docx and
is superseded by this file.
