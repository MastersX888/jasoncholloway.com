# Retail EPUB rebuild — 2026-08-29

> **DATED RECORD — this documents the 11:22 rebuild, not the files being uploaded
> tonight.** Annotation added 2026-08-29 evening; the body below is kept as the
> morning record and is not rewritten. The three retail EPUBs were rebuilt **again
> at 17:22** to carry the character-name pass, so every byte figure in the Results
> table is superseded:
>
> | ISBN | Recorded here (11:22) | Current on disk (17:22) |
> |---|---:|---:|
> | 9798256008819 | 754,069 B | **754,075 B** · 17:22:28 |
> | 9798256009625 | 853,387 B | **853,389 B** · 17:22:30 |
> | 9798256009809 | 752,644 B | **752,604 B** · 17:22:32 |
>
> EPUBCheck was re-run against the 17:22 files on 2026-08-29 evening with
> EPUBCheck 5.3.0: all three **0 fatals / 0 errors / 0 warnings / 0 infos**, so the
> VALID verdict below still holds for the current build.
>
> Two further items in the body are now out of date. The **Open editorial item**
> (grandfather 2010) was **resolved the same day** — see
> `production_staging/CANON_FIX_2026-08-29.md`. And the Upload manifest section
> covers the retail line only; the three **Kindle** EPUBs
> (`*_KINDLE.epub`, built 17:24) are separate required KDP uploads with UUID
> `dc:identifier` values, documented in the per-volume `*_KINDLE/STATUS.md` files.

**Trigger:** Jason noticed the scene-break ornaments were not centered in the
Booktopia ebook preview for
`https://www.booktopia.com.au/masters-x-jason-carroll-holloway/ebook/9798256008819.html`.

**Scope:** All three retail EPUBs. Print editions untouched.

---

## Root cause

`generate_epubs_v1.py` registered `style/book.css` against the *book* but never
against the individual pages. ebooklib rebuilds every document `<head>` when it
writes the package, so a `<link>` present in the raw markup is discarded — it only
emits a stylesheet reference for items the sheet is registered against.

The result: the stylesheet was packaged inside the EPUB but **no page referenced
it**. Reading systems fell back to their own defaults, so the `◇ ◆ ◇` ornaments
rendered flush left and nothing in the front or back matter was centered.

Two aggravating factors in the same file:

1. `content=CSS_PATH.read_bytes() if CSS_PATH.is_file() else b""` — a missing
   stylesheet silently produced an empty one rather than failing the build.
2. `validate_epub` was never called from `__main__`, so the existing gates only ran
   if someone invoked them by hand.

### Not the same as the website fix

Commit `aa80554` (2026-08-21, *"Center scene-break spacers in the opening-chapters
EPUB"*) fixed the same visible symptom, but only in `public/downloads/masters-x-*.epub`.
The samplers are produced by a separate hand-rolled pipeline that writes the `<link>`
directly into the XHTML, which is why the fix held there and never reached the retail
line.

---

## Changes

| File | Change |
|---|---|
| `_scripts_from_windows/generate_epubs_v1.py` | Register the stylesheet against every page: title, copyright, epigraph, all chapters, back matter, end closer, nav |
| `_scripts_from_windows/generate_epubs_v1.py` | Raise on a missing `epub_book.css` instead of embedding an empty stylesheet |
| `_scripts_from_windows/generate_epubs_v1.py` | New `validate_epub` gate: fail if any page except `cover.xhtml` lacks a stylesheet link |
| `_epub_build/epub_book.css` | Added the missing rules for `title-page`, `copyright-page`, `epigraph-page`, `end-closer`, including `text-indent: 0` so centered matter clears the body first-line indent |

A `padding-left` compensation for the trailing letter-space on `.scene-break` was
tried and reverted — measurement showed the flanking `.sb-rule` spans already absorb
it, and zero padding centers to within 0.01px.

---

## Results

| | 9798256008819 | 9798256009625 | 9798256009809 |
|---|---|---|---|
| Volume | One — Inheritance | Two — Grimoire | Three — Kingdom |
| Size | 754,069 B | 853,387 B | 752,644 B |
| EPUBCheck 5.x | VALID, 0 msgs | VALID, 0 msgs | VALID, 0 msgs |
| `validate_epub` | PASS | PASS | PASS |
| Pages with no stylesheet | 0 | 0 | 0 |
| Scene-break divs | 76 | 135 | 138 |
| Legacy `hr.sb-rule` | 0 | 0 | 0 |
| Largest image (px) | 3,840,000 | 3,840,000 | 3,840,000 |
| Worst centering offset | 0.01 px | 0.01 px | 0.01 px |
| Wrapped ornaments (1200→260px) | 0 | 0 | 0 |

Centering was measured in-browser across 95 pages and 406 centered elements total.
Ingram limits for reference: 100 MB per file, 5,600,000 px per image.

---

## Upload manifest — IngramSpark

Same ISBNs; the new file replaces the old one and re-flows through the normal
automated ingestion to retail partners.

| ISBN | EPUB | Cover JPG |
|---|---|---|
| 9798256008819 | `b1_inheritance/9798256008819_EPUB/9798256008819.epub` | `b1_inheritance/9798256008819_EPUB/9798256008819.jpg` |
| 9798256009625 | `b2_grimoire/9798256009625_EPUB/9798256009625.epub` | `b2_grimoire/9798256009625_EPUB/9798256009625.jpg` |
| 9798256009809 | `b3_kingdom/9798256009809_EPUB/9798256009809.epub` | `b3_kingdom/9798256009809_EPUB/9798256009809.jpg` |

Covers are 1600 × 2400. Check the portal for a current file revision fee before
submitting — reporting conflicts on whether it was eliminated in February 2026.
Expect a lag before Booktopia's cached preview refreshes.

Also worth pushing the same files to Google Play and KDP so all channels match; the
per-volume `STATUS.md` files record the existing KDP aliases.

---

## Master files: where they actually live

The retail masters are **not** recoverable from a general disk search. The documented
locations are both gone:

- `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\9798256008819_EPUB\` — directory no longer exists
- `C:\Users\zh577\Desktop\google_books_upload\9798256008819.epub` (2026-07-03) — gone

`.gitignore` blocks `*.epub`, so they were never committed either. What survives and
what matters is the **build chain**, which is fully intact in git on
`cursor/upload-staging-f9e1`:

- `_sources/build_docx/MASTERS_X_BOOK{1,2,3}_BUILD.docx` — geo-fixed manuscript sources
- `_scripts_from_windows/generate_epubs_v1.py` + `generate_book{1,2,3}_interior_paperback.py`
- `_epub_build/epub_book.css`
- `_covers/ebook/*.jpg`

Any master can be regenerated with `python generate_epubs_v1.py <isbn>`. Treat the
DOCX + generator + CSS as the master, not the `.epub`.

`production_staging/` is disk-parked; restore with
`git checkout HEAD -- production_staging`.

---

## Open editorial item — needs an author ruling

`"My grandfather died in 2010."` appears once in Book 1. `CANON.md` records
**William Masters' death as 2003** and James Masters' as September 2010, so the line
conflates grandfather and father.

It is present in every draft on disk, including
`_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt`, and the `validate_epub` gate that
used to catch it is commented out (alongside several other canon gates). This was
**not** introduced by the rebuild.

Fixing it means editing the DOCX source and rebuilding Book 1 and the omnibus
together, print editions included — so it is deliberately left alone here.

## Stale record corrected

`MASTER_UPLOAD_REFERENCE/9798256008819_EPUB/STATUS.md` claimed
`Upload ready: NO — PRE_GEO_FIX`. That was a July snapshot of the deleted
`google_books_upload` build. Verified against the geo-fixed omnibus: the Book 1 slice
matches the Book 1 BUILD docx exactly (balcony 0 / porch 3 / apartment 15 /
house 27), and the balcony ruling lands in Book 3 (balcony 15). Book 1 is correctly
geo-fixed. The file is now marked superseded.
