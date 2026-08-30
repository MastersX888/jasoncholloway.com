# HARVEST REPORT — PORTER · 2026-07-28
**Machine:** Jason Windows PC (`zh577`)  
**Branch:** `cursor/upload-staging-f9e1`  
**Repo:** `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway`

> **SUPERSEDED FIGURES — banner added 2026-08-29. Do not use any page count below.**
> This is the July 2026 harvest record and is kept as the July record, not rewritten.
> Every page figure in it, and all `NEAR_LIVE` / `STALE_V6` page-count language, is
> **stale**. The verified counts — confirmed 2026-08-29 two independent ways, by PyMuPDF
> against the eight interior PDFs on disk and against the live IngramSpark listings
> (6 of 6 print titles matched) — are:
>
> | Edition | ISBN | Pages |
> |---|---|---:|
> | Vol. I *Inheritance of Frequency* HC | 9798295800801 | **163** |
> | Vol. I PB | 9798256008048 | **189** |
> | Vol. II *The Grimoire* HC | 9798295812675 | **225** |
> | Vol. II PB | 9798256009953 | **271** |
> | Vol. III *The Kingdom* HC | 9798295812705 | **177** |
> | Vol. III PB | 9798256010072 | **205** |
> | Omnibus *Complete Trilogy* HC | 9798295884412 | **684** |
> | Omnibus PB | 9798256072704 | **732** |
>
> **Source of truth: `lib/data/ingram-catalog.json`** — the IngramSpark sync artifact, i.e.
> the counts readers actually see. `CANON.md` is no longer the authority for page counts and
> no longer names figures to cite (demoted 2026-08-29): a canon instruction to cite fixed
> page numbers is what pushed the stale July table out to live external listings on
> 2026-08-02. The "+7 HC / +11 PB drift" reported earlier on 2026-08-29 was a comparison
> against these same stale numbers, not a regression, and was retracted the same day; no
> spine or cover rework is required.

## Verdict

**Binaries are on this PC and are now co-located in `production_staging/`.**  
None are safe to treat as final upload-ready against the current geo-fixed + apartment/balcony draft.

| Tier | Status |
|---|---|
| Omnibus HC | Interior + jacket **found** · 684 pp (CANON 686) · PRE_GEO · trim OK |
| Omnibus PB | Interior + wrap **found** · **732 pp = STALE_V6** (CANON 734) · PRE_GEO |
| Books 1–3 HC/PB interiors | **Found** · consistently **CANON − 2** · PRE_GEO |
| Book 1 PB wrap | **MISSING** |
| EPUB (all 3) | **Found** · identifiers OK · PRE_GEO |
| Kindle `.kpf` | **MISSING** (EPUB used as KDP stand-in) |
| E: archive drives | **Not mounted** |

**Recommended next step:** rebuild print interiors + EPUBs from `_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` and per-book `*_DEMY_*.txt` using recovered generators (partial) — do **not** re-upload harvested interiors as the geo-fixed edition. Omnibus covers (jacket/wrap) can be reused after spine-width check against new page counts.

---

## Roots searched

| Root | Exists? | Notes |
|---|---|---|
| Repo `jasoncholloway\` | YES | Scout CSV written |
| `Jason_Carroll_Holloway_Final_Export\` | NO | |
| `files_3_extracted\` | NO | |
| `build_scripts\` | NO | |
| `Desktop\google_books_upload\` | YES | **Primary interior + EPUB source** |
| `Desktop\SCP_Batch_Upload_Jul2026\` | YES | EPUB duplicates |
| `Desktop\OMNIBUS_FINAL_FILES\` | YES | Best Omnibus HC interior + jacket |
| `Desktop\MASTERS_X_OMNIBUS_FIXED_2026-07-02\` | YES | Best Omnibus PB interior + CMYK wraps |
| `Desktop\amazon_kdp_upload\` | YES | Kindle EPUB stand-ins |
| `Downloads\` (+ HardcoverInteriors, EPUBS, KindleInteriors) | YES | Older HC set + covers |
| `E:\Masters_X_Trilogy_Archive\` | NO | Drive not present |
| `E:\Archive\Masters_Trilogy_2026\` | NO | Drive not present |

Raw scout: `_docs/WINDOWS_SCOUT_MERGED.md` + `windows_scout_*.csv`

---

## Copied map (source → destination)

### Omnibus (priority)

| Slot | Destination | Source | Pages / note |
|---|---|---|---|
| HC interior | `omnibus/9798295884412_HC/interior.pdf` | `Desktop\OMNIBUS_FINAL_FILES\INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf` | **684** Royal · NEAR_LIVE (−2 vs 686) |
| HC jacket | `…/cover_jacket.pdf` | `Desktop\OMNIBUS_FINAL_FILES\MASTERS_X_OMNIBUS_HC_JACKET_FINAL_v9.pdf` | 1-page wrap |
| HC caselam | `…/cover_caselam.pdf` | `Desktop\MASTERS_X_OMNIBUS_FIXED_2026-07-02\covers\…CASELAM…` | CMYK ink-limited |
| PB interior | `omnibus/9798256072704_PB/interior.pdf` (+ `interior_STALE_V6.pdf`) | `Desktop\MASTERS_X_OMNIBUS_FIXED_2026-07-02\interiors\…DEMY…INTERIOR.pdf` | **732** Demy · **STALE_V6** |
| PB wrap | `…/cover_wrap.pdf` | `Desktop\MASTERS_X_OMNIBUS_FIXED_2026-07-02\covers\…DEMY…COVER.pdf` | CMYK ink-limited |

### Books 1–3

| ISBN | Dest interior/EPUB | Source |
|---|---|---|
| 9798295800801 HC | `b1…/interior.pdf` | `google_books_upload\9798295800801_interior.pdf` · **154** pp |
| 9798256008048 PB | `b1…/interior.pdf` | `google_books_upload\9798256008048_interior.pdf` · **176** pp |
| 9798256008819 EPUB | `b1…/9798256008819.epub` | `google_books_upload\9798256008819.epub` |
| 9798256008819 Kindle | `b1…_KINDLE/9798256008819.epub` | `amazon_kdp_upload\Masters_X_The_Inheritance…epub` |
| 9798295812675 HC | `b2…/interior.pdf` | `google_books_upload\9798295812675_interior.pdf` · **216** pp |
| 9798256009953 PB | `b2…/interior.pdf` | `google_books_upload\9798256009953_interior.pdf` · **258** pp |
| 9798256009625 EPUB/Kindle | `b2…` | google_books / amazon_kdp |
| 9798295812705 HC | `b3…/interior.pdf` | `google_books_upload\9798295812705_interior.pdf` · **168** pp |
| 9798256010072 PB | `b3…/interior.pdf` | `google_books_upload\9798256010072_interior.pdf` · **198** pp |
| 9798256009809 EPUB/Kindle | `b3…` | google_books / amazon_kdp |

Jackets/wraps for B1 HC, B2 HC/PB, B3 HC/PB were already staged; standardized copies as `cover_jacket.pdf` / `cover_wrap.pdf`.

---

## Page count vs CANON

| Edition | ISBN | CANON | Harvested | Class |
|---|---|---:|---:|---|
| Omnibus HC | 9798295884412 | 686 | **684** | NEAR_LIVE (−2) · PRE_GEO |
| Omnibus PB | 9798256072704 | 734 | **732** | **STALE_V6** · PRE_GEO |
| B1 HC | 9798295800801 | 156 | 154 | NEAR_LIVE (−2) |
| B1 PB | 9798256008048 | 178 | 176 | NEAR_LIVE (−2) |
| B2 HC | 9798295812675 | 218 | 216 | NEAR_LIVE (−2) |
| B2 PB | 9798256009953 | 260 | 258 | NEAR_LIVE (−2) |
| B3 HC | 9798295812705 | 170 | 168 | NEAR_LIVE (−2) |
| B3 PB | 9798256010072 | 200 | 198 | NEAR_LIVE (−2) |

Pattern: every non-omnibus-PB interior is exactly **2 pages under** live Ingram counts. None match the old v6 book counts (257/311/383/…).

### Rejected / losers (notable)
- Omnibus HC `google_books_upload\9798295884412_interior.pdf` — 694 pp @ **6.0×9.0** (wrong trim) → kept as `interior_WRONG_TRIM_6x9_694pp.pdf`
- Downloads Jun 26 omnibus interiors — 536 / 630 pp (older)
- `OMNIBUS_FINAL_FILES\MASTERS_X_OMNIBUS_PB_FINAL.pdf` — 1-page cover, not an interior

---

## Hard misses (honest)

| Asset | Searched | Result |
|---|---|---|
| Book 1 PB print wrap | Desktop/Downloads/repo; `COVER_MASTERS_X_BOOK1*`, `*9798256008048*cover*` | **MISS** (ebook JPG only) |
| Any `.kpf` / `.mobi` | Desktop, Downloads, Documents | **MISS** |
| `generate_book*_interior*.py` | User profile recurse | **MISS** (only omnibus PB generator found) |
| `generate_epubs*.py` | User profile recurse | **MISS** |
| `run_log.json` (live) | Roots | Only `_docs/run_log_v6_STALE.json` in staging |
| E: trilogy archives | `E:\…` | Drive absent — expand search when mounted |

### Generators recovered → `_scripts_from_windows/`
- `generate_omnibus_interior_PB_5x8_v8.py`
- `compose_omnibus_covers_FINAL.py` (from Downloads)
- Omnibus FIXED changelog / verification / cover-fix JSON

---

## Omnibus cover status

| Cover | Status |
|---|---|
| HC jacket FINAL v9 | **FOUND** — staged as `cover_jacket.pdf` |
| HC caselam (CMYK/TAC fixed) | **FOUND** — `cover_caselam.pdf` |
| PB wrap (CMYK/TAC fixed) | **FOUND** — `cover_wrap.pdf` |
| Older Downloads covers | Archived under `_covers/print_recoverable/` |

Spine widths were built for harvested page counts (684/732), not necessarily live 686/734 after a geo rebuild.

---

## Upload readiness matrix

| Folder | Binaries present? | Ready? |
|---|---|---|
| Omnibus HC | YES | **NO** — PRE_GEO + 684≠686 |
| Omnibus PB | YES | **STALE_V6** |
| B1 HC | YES | **NO** — PRE_GEO |
| B1 PB | interior YES / wrap NO | **NO** |
| B1 EPUB/Kindle | EPUB YES / kpf NO | **NO** — PRE_GEO |
| B2 HC/PB/EPUB/Kindle | YES (no kpf) | **NO** — PRE_GEO |
| B3 HC/PB/EPUB/Kindle | YES (no kpf) | **NO** — PRE_GEO |

---

## Suggested order for Jason

1. Mount E: archives if they exist elsewhere and re-run PORTER for any newer interiors / missing B1 wrap / generators.
2. Or authorize interior rebuild from `_sources/` (Omnibus first).
3. Create Book 1 PB wrap (never existed on this machine).
4. Recheck Omnibus jacket/wrap spine vs new page counts; reuse CMYK-fixed assets if spine still matches.
5. Optional Desktop zip of staging binaries — ask before committing large PDFs (`git add -f`); `.gitignore` blocks `*.pdf` / `*.epub`.

---

*Seventh City Press · PORTER · f = 111.2 Hz*
