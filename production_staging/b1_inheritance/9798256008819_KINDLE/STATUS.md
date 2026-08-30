# Book 1 Inheritance — Kindle 9798256008819
**Priority:** HIGH — required KDP upload this round
**Upload ready:** YES — rebuilt 2026-08-29 17:24:36; **required** KDP upload, not optional
**Carries:** the Chapter One canon fix AND the character-name pass — **27 character references changed in this volume**
**KDP:** STALE — the live listing still serves the pre-fix build

## Required this round — do not skip
This volume is one of the 14 required uploads for the 2026-08-29 revision round.
Skipping it would leave `Sarah Chen` and `Margaret Masters` in the Kindle edition
permanently, which are precisely the names the author decided to change.

**27 character references changed in Book 1**, per
`production_staging/NAME_FIX_2026-08-29.md`:

| Reference | Before | After | Refs |
|---|---|---|---:|
| Cambridge manuscript scholar | Sarah **Chen** | Sarah **Ashworth** | 4 |
| Blake's mother | **Margaret** Masters | **Lorraine** Masters | 23 |

The three bare Book 1 surname references are included in the four above; all now
read "Ashworth", so bare "Chen" means Andrew Chen everywhere. This file also
carries the Chapter One canon fix (grandfather d. **2003**; "a grandson who did
not yet exist") — see `production_staging/CANON_FIX_2026-08-29.md`.

## Present
- `9798256008819_KINDLE.epub` — **754,129 bytes (0.75 MB)** · built **2026-08-29 17:24:36**
- Staged for upload at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256008819_KINDLE.epub` — byte-identical, SHA256 `627d0d767cb8fdb2…`
- Cover JPG in folder / `_covers/ebook/`
- `MANUSCRIPT_CURRENT.txt`

## Verification (2026-08-29, this file, on disk)
| Check | Result |
|---|---|
| File size | 754,129 bytes |
| Build time (mtime) | 2026-08-29 17:24:36 |
| `dcterms:modified` in OPF | `2026-08-29T17:24:36Z` — agrees with mtime |
| Zip / `mimetype` first entry | OK |
| EPUBCheck 5.3.0 (EPUB 3.3 rules) | **VALID — 0 fatals / 0 errors / 0 warnings / 0 infos** |
| `dc:identifier` | `urn:uuid:5ccf893b-a74e-4bd6-a759-67161e7bf369` — a **UUID, not the ISBN** ✓ |
| `dc:source` | `urn:isbn:9798256008819` — the print ISBN is carried here ✓ |
| Distinct from the retail EPUB | **YES** — Kindle SHA256 `627d0d767cb8fdb2…` vs retail `32ac82818e89c280…` |
| What differs from retail | exactly 3 of 36 zip entries: `EPUB/content.opf` (UUID identifier), `EPUB/copyright.xhtml` (`ASIN B0H4KYMSM1` in place of the ISBN), `EPUB/toc.ncx` (`dtb:uid`). The other 33 entries are byte-identical — same manuscript, Kindle-specific identity block, exactly the three differences `generate_kindle_epubs.py` documents. |

The UUID identifier is the **defining difference** between the Kindle and retail
variants and was a real prior defect: an earlier Kindle build reused the print
ISBN as `dc:identifier`, which collides with the Ingram retail record. It is
correct in this build.

## Staleness corrected 2026-08-29
This file previously read `Upload ready: NO` and described a July KDP file that
**no longer exists on disk**. Those claims were removed as false:

- ~~`9798256008819.epub` — 5.87 MB (KDP upload copy; no `.kpf` found on this PC)~~
  **False.** No 5.87 MB file exists anywhere on disk. The current Kindle EPUB is
  754,129 bytes and is named `9798256008819_KINDLE.epub`.
- ~~Rebuild from geo-fixed draft before KDP re-upload~~ **DONE 2026-08-29 17:24.**
- ~~`C:\Users\zh577\Desktop\amazon_kdp_upload\Masters_X_The_Inheritance_of_Frequency_B0H4KYMSM1.epub` (2026-07-03)~~
  **Gone — that directory no longer exists on this PC.**
- ~~`Downloads\KindleInteriors\MASTERS_X_BOOK1_KINDLE_B0H4KYMSM1.epub` (2026-06-26, older)~~
  **Gone.**
- ~~identifier 9798256008819~~ **Superseded:** the identifier is a UUID by design
  now; the ISBN lives in `dc:source`.

`.kpf` / `.mobi` are still absent and are **not required** — KDP accepts the EPUB
directly.

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK1_BUILD.docx` (post name-fix, post canon-fix)
- Built by `_scripts_from_windows/generate_kindle_epubs.py` (which drives
  `generate_epubs_v1.py` with `is_kindle=True` and an explicit `BUILD_OUTPUT`, so it
  cannot clobber the retail file); `validate_epub` gate passed at build time
