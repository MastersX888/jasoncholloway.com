# PRODUCTION STAGING — Masters X Upload Package
**Branch:** `cursor/upload-staging-f9e1`  
**Draft authority:** `production_staging/_sources/` (geo-fixed + apartment/balcony)  
**Priority:** Omnibus HC / PB first  
**Harvest:** see `HARVEST_REPORT.md` (2026-07-28 Windows PORTER)

Audiobook scripts are **out of scope** for this package.

---

## Critical truth (read this first)

| Item | Status |
|---|---|
| **Latest manuscript text** | YES — in `_sources/` (geo fixes + apartment/balcony) |
| **Print interiors (PDF)** | HARVESTED on Windows into ISBN folders — **PRE_GEO**; page counts NEAR_LIVE or STALE_V6 |
| **EPUB / Kindle files** | HARVESTED (EPUB); no `.kpf` found |
| **Covers co-located** | MOSTLY — Omnibus jacket/wrap found; **Book 1 PB wrap still missing** |
| **Omnibus jacket / PB wrap** | FOUND (Jul 2 FIXED / FINAL packages) |

**Do not treat harvested interiors as final.** Rebuild from `_sources/` before claiming geo-fixed upload readiness.  
This folder is the single place those files now live next to the current draft.

---

## Folder map

```
production_staging/
  HARVEST_REPORT.md    ← Windows harvest results
  UPLOAD_MANIFEST.md   ← this file
  _sources/            ← CURRENT DRAFT
  _covers/             ← master cover library
  _docs/               ← CANON, fix log, scout
  _scripts_from_windows/
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
| HC | 9798295884412 | YES — 684 pp Royal (CANON 686) | YES — `cover_jacket.pdf` + caselam | **NO** (PRE_GEO / −2 pp) |
| PB | 9798256072704 | YES — 732 pp Demy | YES — `cover_wrap.pdf` (CMYK fixed) | **STALE_V6** |

Live page counts: HC **686** · PB **734** (not v6 732/907).

### Book 1

| Format | ISBN | Cover present | Interior | Ready? |
|---|---|---|---|---|
| HC | 9798295800801 | YES — CMYK dustjacket / `cover_jacket.pdf` | YES — 154 pp | **NO** (PRE_GEO / −2) |
| PB | 9798256008048 | **NO** — wrap never found on this PC | YES — 176 pp | **NO** |
| EPUB/Kindle | 9798256008819 | YES — JPG | YES — EPUB (no kpf) | **NO** (PRE_GEO) |

### Book 2

| Format | ISBN | Cover present | Interior | Ready? |
|---|---|---|---|---|
| HC | 9798295812675 | YES — jacket / `cover_jacket.pdf` | YES — 216 pp | **NO** (PRE_GEO / −2) |
| PB | 9798256009953 | YES — wrap / `cover_wrap.pdf` | YES — 258 pp | **NO** (PRE_GEO / −2) |
| EPUB/Kindle | 9798256009625 | YES — JPG | YES — EPUB (no kpf) | **NO** (PRE_GEO) |

### Book 3

| Format | ISBN | Cover present | Interior | Ready? |
|---|---|---|---|---|
| HC | 9798295812705 | YES — jacket / `cover_jacket.pdf` | YES — 168 pp | **NO** (PRE_GEO / −2) |
| PB | 9798256010072 | YES — wrap / `cover_wrap.pdf` | YES — 198 pp | **NO** (PRE_GEO / −2) |
| EPUB/Kindle | 9798256009809 | YES — JPG | YES — EPUB (no kpf) | **NO** (PRE_GEO) |

---

## Fastest path to first upload

1. ~~From Windows, copy existing interiors/EPUBs into ISBN folders~~ **DONE 2026-07-28** — see `HARVEST_REPORT.md`.
2. Rebuild from `_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` (harvested files are pre-geo).
3. Recheck Omnibus HC jacket + PB wrap spine at new page counts (assets exist).
4. Create Book 1 PB wrap.
5. CMYK-convert B2/B3 covers via `_sources/FOGRA39L_coated.icc` if not already.
6. Upload order after rebuild: **Omnibus HC → Omnibus PB → individuals**.

Drop convention: `interior.pdf`, `cover_jacket.pdf`, `cover_wrap.pdf`, `{isbn}.epub`, `{isbn}.jpg`.

---

*Seventh City Press*
