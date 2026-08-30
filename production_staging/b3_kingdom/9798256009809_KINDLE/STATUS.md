# Book 3 Kingdom — Kindle 9798256009809
**Priority:** HIGH — required KDP upload this round
**Upload ready:** YES — rebuilt 2026-08-29 17:24:42; **required** KDP upload, not optional
**Carries:** the character-name pass — **14 character references changed in this volume**
**KDP:** STALE — the live listing still serves the pre-fix build

## Required this round — do not skip
This volume is one of the 14 required uploads for the 2026-08-29 revision round,
and it carries the largest name delta of the three volumes.

**14 character references changed in Book 3**, per
`production_staging/NAME_FIX_2026-08-29.md`:

| Reference | Before | After | Refs |
|---|---|---|---:|
| Director of Instruction | Marcus **Chen** | Marcus **Whitaker** | 3 |
| Vol. III board chair | Margaret **Chen** | Margaret **Ferrand** | 5 |
| Cohort — thermal perception | Laura **Chen** | Laura **Okada** | 1 |
| — | Lin **Chen** | Lin **Zhao** | 1 |
| — | Michael **Chen** | Michael **Halloran** | 1 |
| Reykjavik uplink confirmation | **Andrew Tanaka** | **Nolan Eriksen** | 1 |
| Cohort — rhythmic pattern recognition | **Marcus Jr.** | **Idris Broussard** | 1 |
| University of Ghana / Volta caves | **Kofi Mensah** | **Kofi Asante** | 1 |

Twelve of these came from the Chen pass and two (`Marcus Jr.`, `Kofi Mensah`)
from the final Batch 3 pass. Retained characters are unchanged and are **not**
errors: **Andrew Chen** 6, **Marcus Whitaker** 3 (unchanged surname, deliberately),
**Margaret Ferrand** 5 — Ferrand keeps her given name by ruling.

## Present
- `9798256009809_KINDLE.epub` — **752,658 bytes (0.75 MB)** · built **2026-08-29 17:24:42**
- Staged for upload at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256009809_KINDLE.epub` — byte-identical, SHA256 `6e4fe9e061dd77f9…`
- Cover JPG in folder / `_covers/ebook/`
- `MANUSCRIPT_CURRENT.txt`

## Verification (2026-08-29, this file, on disk)
| Check | Result |
|---|---|
| File size | 752,658 bytes |
| Build time (mtime) | 2026-08-29 17:24:42 |
| `dcterms:modified` in OPF | `2026-08-29T17:24:42Z` — agrees with mtime |
| Zip / `mimetype` first entry | OK |
| EPUBCheck 5.3.0 (EPUB 3.3 rules) | **VALID — 0 fatals / 0 errors / 0 warnings / 0 infos** |
| `dc:identifier` | `urn:uuid:27c769e7-6289-4cfb-8b4e-de40dbaf09c7` — a **UUID, not the ISBN** ✓ |
| `dc:source` | `urn:isbn:9798256009809` — the print ISBN is carried here ✓ |
| Distinct from the retail EPUB | **YES** — Kindle SHA256 `6e4fe9e061dd77f9…` vs retail `07c26d71f884d82d…` |
| What differs from retail | exactly 3 of 41 zip entries: `EPUB/content.opf` (UUID identifier), `EPUB/copyright.xhtml` (`ASIN B0H4L36X21` in place of the ISBN), `EPUB/toc.ncx` (`dtb:uid`). The other 38 entries are byte-identical — same manuscript, Kindle-specific identity block, exactly the three differences `generate_kindle_epubs.py` documents. |

The UUID identifier is the **defining difference** between the Kindle and retail
variants and was a real prior defect: an earlier Kindle build reused the print
ISBN as `dc:identifier`, which collides with the Ingram retail record. It is
correct in this build.

## Staleness corrected 2026-08-29
This file previously read `Upload ready: NO` and described a July KDP file that
**no longer exists on disk**. Those claims were removed as false:

- ~~`9798256009809.epub` — 4.05 MB (KDP copy; no `.kpf` found)~~
  **False.** No 4.05 MB file exists anywhere on disk. The current Kindle EPUB is
  752,658 bytes and is named `9798256009809_KINDLE.epub`.
- ~~Rebuild from geo-fixed + apartment/balcony draft~~ **DONE 2026-08-29 17:24.**
- ~~`C:\Users\zh577\Desktop\amazon_kdp_upload\Masters_X_The_Kingdom_B0H4L36X21.epub` (2026-07-03)~~
  **Gone — that directory no longer exists on this PC.**

`.kpf` / `.mobi` are still absent and are **not required** — KDP accepts the EPUB
directly.

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx` (post name-fix, post Batch 3)
- Built by `_scripts_from_windows/generate_kindle_epubs.py` (which drives
  `generate_epubs_v1.py` with `is_kindle=True` and an explicit `BUILD_OUTPUT`, so it
  cannot clobber the retail file); `validate_epub` gate passed at build time
