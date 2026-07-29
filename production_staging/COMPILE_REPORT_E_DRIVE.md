# COMPILE REPORT ADDENDUM — E: archive recovery · 2026-07-28 (later)
**Drive:** `E:\` (Elements, 7.4 TB) now mounted

## Recovered from `E:\Masters_X_Trilogy_Archive\`

| Asset | Path |
|---|---|
| Book 1–3 HC/PB generators | `antigravity_workspace_2026-07-07\build_scripts\generate_book*_interior*.py` |
| EPUB generator | `…\generate_epubs_v1.py` |
| Authentic Omnibus HC generator | `…\generate_omnibus_interior_HC_6x9_v8.py` (copied; Omnibus HC already rebuilt earlier) |
| **Book 1 PB wrap** | `Old_Drafts_and_Backups\IngramSpark_Upload\Standard_BW_Paperback\Book1_…\COVER_MASTERS_X_BOOK1_PB.pdf` → staged as `b1_inheritance/9798256008048_PB/cover_wrap.pdf` |

## Individual book interiors (retuned)

Archived generators shipped at **12.5pt / wide margins / next-book preview** (~v6 page counts).  
Retuned to match live PRE_GEO density: **11pt / 15.5 leading**, wider text block, **preview disabled**.

| Edition | Pages | CANON | Δ | Trim | Geo |
|---|---:|---:|---:|---|---|
| B1 HC 9798295800801 | **159** | 156 | +3 | Royal 6.14×9.21 | PASS |
| B1 PB 9798256008048 | **185** | 178 | +7 | Demy 5.5×8.5 | PASS |
| B2 HC 9798295812675 | **225** | 218 | +7 | Royal | PASS |
| B2 PB 9798256009953 | **265** | 260 | +5 | Demy | PASS |
| B3 HC 9798295812705 | **179** | 170 | +9 | Royal | PASS |
| B3 PB 9798256010072 | **205** | 200 | +5 | Demy | PASS |

Spine note: Δ vs CANON is small (≈0.01–0.02″ on 50# White). Covers reused; regenerate only if Ingram rejects.

## EPUBs

Rebuilt from BUILD docx via `generate_epubs_v1.py` →  
`production_staging/_epub_build/{isbn}.epub` and copied into `*_EPUB` / `*_KINDLE` folders.  
Geo spot-checks PASS. (Clear `BUILD_OUTPUT` env before running — leftover env briefly overwrote Omnibus HC with an EPUB; HC restored to 684 pp.)

## Desktop packages

- Omnibus-only (earlier): `Desktop\SCP_UploadReady_Omnibus_2026-07-28.zip`
- **Full trilogy:** `Desktop\SCP_UploadReady_Full_2026-07-28\` (+ zip)

## Still optional

- Fine-tune individual leading further if Jason wants exact CANON page counts  
- CMYK recheck of B1 PB wrap (old May 31 asset)  
- Kindle `.kpf` conversion (still absent)

*COMPOSITOR · E: recovery pass · f = 111.2 Hz*
