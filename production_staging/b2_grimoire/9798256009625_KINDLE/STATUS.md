# Book 2 Grimoire — Kindle 9798256009625
**Priority:** HIGH — required KDP upload this round
**Upload ready:** YES — rebuilt 2026-08-29 17:24:39; **required** KDP upload, not optional
**Carries:** the character-name pass — **4 character references changed in this volume**
**KDP:** STALE — the live listing still serves the pre-fix build

## Required this round — do not skip
This volume is one of the 14 required uploads for the 2026-08-29 revision round.

> **Book 2 was at one point described as skippable. That claim was false and has
> been retracted** — see the CORRECTED section in
> `production_staging/b2_grimoire/9798295812675_HC/STATUS.md`. Book 2 hardcover,
> paperback, retail EPUB and Kindle EPUB are **all required uploads**.

**4 character references changed in Book 2**, per
`production_staging/NAME_FIX_2026-08-29.md`:

| Reference | Before | After | Refs |
|---|---|---|---:|
| Stanford neuroscience dept. chair | **Sarah Chen** | **Rosalind Lindgren** | 2 |
| Blake's mother | **Margaret** Masters | **Lorraine** Masters | 1 |
| Commerce subcommittee chair | Senator **Margaret** Holt | Senator **Deborah** Holt | 1 |

Retained characters are unchanged and are **not** errors: **Andrew Chen** 6,
**Yuki Tanaka** 4, bare surname **Holt** 17. One further non-name correction
rides along — the Sabrina Volkov "shared by marriage" → "had been born with"
rewording — for five changed paragraphs in total.

**Skipping this title would leave Margaret Masters, Senator Margaret Holt and
Sarah Chen in the Kindle edition permanently.**

## Present
- `9798256009625_KINDLE.epub` — **853,440 bytes (0.85 MB)** · built **2026-08-29 17:24:39**
- Staged for upload at `Desktop/MASTER_UPLOAD_FOLDER_2026-08-29/9798256009625_KINDLE.epub` — byte-identical, SHA256 `1e3b7cdafd01a8e5…`
- Cover JPG in folder / `_covers/ebook/`
- `MANUSCRIPT_CURRENT.txt`

## Verification (2026-08-29, this file, on disk)
| Check | Result |
|---|---|
| File size | 853,440 bytes |
| Build time (mtime) | 2026-08-29 17:24:39 |
| `dcterms:modified` in OPF | `2026-08-29T17:24:39Z` — agrees with mtime |
| Zip / `mimetype` first entry | OK |
| EPUBCheck 5.3.0 (EPUB 3.3 rules) | **VALID — 0 fatals / 0 errors / 0 warnings / 0 infos** |
| `dc:identifier` | `urn:uuid:84321c9b-d2aa-415a-aa1f-7d310134d374` — a **UUID, not the ISBN** ✓ |
| `dc:source` | `urn:isbn:9798256009625` — the print ISBN is carried here ✓ |
| Distinct from the retail EPUB | **YES** — Kindle SHA256 `1e3b7cdafd01a8e5…` vs retail `db289aad4fe9d5a2…` |
| What differs from retail | exactly 3 of 39 zip entries: `EPUB/content.opf` (UUID identifier), `EPUB/copyright.xhtml` (`ASIN B0H4KQ4YQJ` in place of the ISBN), `EPUB/toc.ncx` (`dtb:uid`). The other 36 entries are byte-identical — same manuscript, Kindle-specific identity block, exactly the three differences `generate_kindle_epubs.py` documents. |

The UUID identifier is the **defining difference** between the Kindle and retail
variants and was a real prior defect: an earlier Kindle build reused the print
ISBN as `dc:identifier`, which collides with the Ingram retail record. It is
correct in this build.

## Staleness corrected 2026-08-29
This file previously read `Upload ready: NO` and described a July KDP file that
**no longer exists on disk**. Those claims were removed as false:

- ~~`9798256009625.epub` — 7.14 MB (KDP copy; no `.kpf` found)~~
  **False.** No 7.14 MB file exists anywhere on disk. The current Kindle EPUB is
  853,440 bytes — roughly **one twelfth** the claimed size — and is named
  `9798256009625_KINDLE.epub`. If you were sizing the upload against 7 MB, that
  figure was never real for this build.
- ~~Rebuild from geo-fixed draft~~ **DONE 2026-08-29 17:24.**
- ~~`C:\Users\zh577\Desktop\amazon_kdp_upload\Masters_X_The_Grimoire_B0H4KQ4YQJ.epub` (2026-07-03)~~
  **Gone — that directory no longer exists on this PC.**

`.kpf` / `.mobi` are still absent and are **not required** — KDP accepts the EPUB
directly.

## Source
- `production_staging/_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx` (post name-fix)
- Built by `_scripts_from_windows/generate_kindle_epubs.py` (which drives
  `generate_epubs_v1.py` with `is_kindle=True` and an explicit `BUILD_OUTPUT`, so it
  cannot clobber the retail file); `validate_epub` gate passed at build time
