# PRODUCTION STAGING — Masters X Upload Package
**Branch:** `cursor/upload-staging-f9e1`  
**Draft authority:** `production_staging/_sources/` (geo-fixed + apartment/balcony)  
**Priority:** Omnibus HC / PB first

Audiobook scripts are **out of scope** for this package.

---

## Critical truth (read this first)

| Item | Status |
|---|---|
| **Latest manuscript text** | YES — in `_sources/` (geo fixes + apartment/balcony) |
| **Print interiors (PDF)** | MISSING here — last built on Windows / Ingram. Must regenerate or copy from that machine. |
| **EPUB / Kindle files** | MISSING (never committed; `.gitignore` blocks `*.epub`) |
| **Covers co-located** | PARTIAL — see checklist |
| **Omnibus jacket / PB wrap** | MISSING — never finished |

**You cannot finish Ingram/KDP uploads from this folder alone until interiors are rebuilt or recovered.**  
This folder is the single place to drop those files: current draft + covers already wait in ISBN-named slots.

---

## Folder map

```
production_staging/
  UPLOAD_MANIFEST.md   ← this file
  _sources/            ← CURRENT DRAFT
  _covers/             ← master cover library
  _docs/               ← CANON, fix log, build prompt
  omnibus/             ← PRIORITY
  b1_inheritance/
  b2_grimoire/
  b3_kingdom/
```

Each edition folder = `ISBN_FORMAT`. Each has `MANUSCRIPT_CURRENT.txt` (symlink) + `STATUS.md`.

---

## Current draft (source of truth)

| File | Role |
|---|---|
| `_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` | **Omnibus rebuild source** (Books 1–3 concatenated, current) |
| `_sources/MASTERS_X_BOOK1_DEMY_9798256008048.txt` | Book 1 current |
| `_sources/MASTERS_X_BOOK2_DEMY_9798256009953.txt` | Book 2 current |
| `_sources/MASTERS_X_BOOK3_DEMY_9798256010072.txt` | Book 3 current (apartment/balcony) |
| `_sources/omnibus_v8_fulltext_PRE_GEO_FIX.txt` | Pre-fix shipped extract (reference only) |
| `_sources/MASTERS_X_BOOK*_ITALICIZED_FIXED.docx` | Pre-geo DOCX — **stale**; do not rebuild from these until merged |

---

## Checklist by edition

### Omnibus — PRIORITY

| Format | ISBN | Interior | Cover | Ready? |
|---|---|---|---|---|
| HC | 9798295884412 | drop `interior.pdf` | web front only; need `cover_jacket.pdf` | NO |
| PB | 9798256072704 | drop `interior.pdf` | need `cover_wrap.pdf` (never existed) | NO |

Live page counts: HC **686** · PB **734** (not v6 732/907).

### Book 1

| Format | ISBN | Cover present | Interior | Ready? |
|---|---|---|---|---|
| HC | 9798295800801 | YES — CMYK dustjacket PDF | NO | NO |
| PB | 9798256008048 | NO — wrap never existed | NO | NO |
| EPUB/Kindle | 9798256008819 | YES — JPG | NO | NO |

### Book 2

| Format | ISBN | Cover present | Interior | Ready? |
|---|---|---|---|---|
| HC | 9798295812675 | YES — jacket PDF (RGB→CMYK) | NO | NO |
| PB | 9798256009953 | YES — wrap PDF (check spine vs 260 pp) | NO | NO |
| EPUB/Kindle | 9798256009625 | YES — JPG | NO | NO |

### Book 3

| Format | ISBN | Cover present | Interior | Ready? |
|---|---|---|---|---|
| HC | 9798295812705 | YES — jacket PDF (RGB→CMYK) | NO | NO |
| PB | 9798256010072 | YES — wrap PDF (check spine vs 200 pp) | NO | NO |
| EPUB/Kindle | 9798256009809 | YES — JPG | NO | NO |

---

## Fastest path to first upload

1. From Windows, copy any existing interiors/EPUBs into the matching ISBN folders as `interior.pdf` / `{isbn}.epub`.
2. Rebuild from `_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` if Windows files are pre-geo-fix.
3. Finish Omnibus HC jacket + PB wrap at 686/734 pages.
4. Create Book 1 PB wrap.
5. CMYK-convert B2/B3 covers via `_sources/FOGRA39L_coated.icc`.
6. Upload order: **Omnibus HC → Omnibus PB → individuals**.

Drop convention: `interior.pdf`, `cover_jacket.pdf`, `cover_wrap.pdf`, `{isbn}.epub`, `{isbn}.jpg`.

---

*Seventh City Press*
