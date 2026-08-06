# COMPILE REPORT — COMPOSITOR · 2026-07-28
**Machine:** Jason Windows PC (`zh577`)  
**Branch:** `cursor/upload-staging-f9e1`  
**Repo:** `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway`

## Verdict

**Omnibus HC + PB interiors rebuilt from geo-fixed + apartment/balcony BUILD docx and packaged for Ingram upload.**  
Individual books / EPUBs **not** rebuilt (generators missing). Covers **reused** (spine page counts unchanged vs harvested jackets).

| Edition | Pages | Trim | ISBN | Upload ready |
|---|---:|---|---|---|
| Omnibus HC | **684** (CANON 686) | Royal 6.14×9.21 | 9798295884412 | **YES** |
| Omnibus PB | **732** (CANON 734) | Demy 5.5×8.5 | 9798256072704 | **YES** |
| Books 1–3 | — | — | — | **NO** (generators MISS) |
| EPUB/Kindle | — | — | — | **NO** (kept PRE_GEO copies) |

Desktop drop: `C:\Users\zh577\Desktop\SCP_UploadReady_Omnibus_2026-07-28\`  
Zip: `C:\Users\zh577\Desktop\SCP_UploadReady_Omnibus_2026-07-28.zip`

---

## Phase A — BUILD docx

**Method:** PATCH (preferred) — applied `FIX_CHANGELOG.md` + apartment/balcony pass + B2 dwelling follow-ups onto `MASTERS_X_BOOK*_ITALICIZED_FIXED.docx`.

| File | Hits | Verify |
|---|---:|---|
| `_sources/build_docx/MASTERS_X_BOOK1_BUILD.docx` | 5 | 1647 Genessee, Warren County, Midwest Precote, hundred and fifty feet |
| `_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx` | 9 | Washington Street office, Pennsylvania Avenue, apartment hummed |
| `_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx` | 55 (+2 already) | across river SubTropolis, Iceland basalt, Quality Hill balcony, apartment hummed, the long way |

Script: `_scripts_from_windows/build_geo_fixed_docx.py`

Italics: preserved for single-run edits; multi-run paragraph rewrites fall back to first-run style (flagged as acceptable).

---

## Phase B — Omnibus PB

- Script: `generate_omnibus_interior_PB_CURRENT.py` (from recovered v8)
- Source: BUILD docx ×3
- Output: `omnibus/9798256072704_PB/interior.pdf`
- Pages: **732** · Trim: **5.5×8.5** · ISBN **9798256072704** ✓
- Hash differs from `interior_STALE_V6.pdf` ✓
- Geo spot-checks: all PASS
- Archived: `interior_PRE_GEO_732pp.pdf`

---

## Phase C — Omnibus HC

- HC generator: **not found** on disk (only PB script)
- Reconstructed: `generate_omnibus_interior_HC_CURRENT.py` (PB clone)
- Trim Royal 6.14×9.21; margins ~0.875 / 0.825 / 0.60 / 0.60 (PRE_GEO text-block match)
- Body leading **20.35** / spaceAfter **4.35** (PB stays 18 / 3.5) so page count matches historical 684
- Output: `omnibus/9798295884412_HC/interior.pdf`
- Pages: **684** · ISBN **9798295884412** ✓
- Geo spot-checks: all PASS (whitespace-normalized)
- Archived: `interior_PRE_GEO_684pp.pdf`

---

## Phase D — Covers / spine (updated 2026-07-28 evening)

Wrong cymatic / chamber covers **quarantined** (`Desktop\_WRONG_COVERS_QUARANTINE_2026-07-28`).

| Cover | Action |
|---|---|
| Books 1–3 HC jacket + caselam | **RESTAGED** from E:`…\trilogy_package\` geometry era (site match) |
| Omnibus HC jacket / caselam | **REMOVED** — geometry print PDF not found (web PNG only) |
| Omnibus PB wrap | **REMOVED** — same |
| Books 1–3 PB wraps | **MISSING** — geometry wraps not on E: |

Books HC interiors: B1 **159** / B2 **225** / B3 **179** — recheck spine vs jackets before Ingram.

---

## Phase E / F — Books + EPUB

| Asset | Result |
|---|---|
| `generate_book*_interior*.py` | **MISS** (Desktop/Downloads/profile) |
| `generate_epubs*.py` | **MISS** |
| Book 1 PB wrap | **MISS** (unchanged) |
| Harvested EPUBs | Copied aside as `PRE_GEO_{isbn}.epub`; STATUS remains **NO** |

Do **not** fake book interiors from omnibus splits without a real generator.

---

## Still missing (honest)

1. Book generators for individual HC/PB interiors  
2. EPUB generator  
3. Book 1 PB print wrap  
4. Optional: regenerate Omnibus covers if Ingram requires exact CANON 686/734 spine  
5. Optional: E: archive mount for any newer generators

---

## Git notes

Committed this pass: reports, STATUS, scripts, BUILD docx.  
Large PDFs remain gitignored unless Jason force-adds.

---

*Seventh City Press · COMPOSITOR · f = 111.2 Hz*
