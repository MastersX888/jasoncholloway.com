# Print cover audit and correction — 2026-07-28

Twelve print covers were audited against the artwork IngramSpark currently has on
file for each ISBN (downloaded e-proofs) and against the cover templates Ingram
issued tonight for the rebuilt interiors. All twelve covers generated earlier in
the session were discarded and replaced.

## What was wrong

| Defect | Cause | Affected |
| --- | --- | --- |
| Black ground lifted to washed brown (`#252122`, `#2C211D`) | hand-rolled RGB→CMYK in `remap_covers_to_templates.py` instead of the ICC path | B1–B3 HC jackets + case laminates |
| Ingram template raster baked into the artwork (pink/blue guide zones, "Template Instructions" copy, dimension callouts printed over the art) | the template render was used as the canvas rather than as a guide, then `apply_marks` painted its dark pixels back on top | all 4 PB wraps, both omnibus HC covers |
| Panels misplaced; art band overhanging the bleed zone | code assumed the bleed rectangle is centred in the document. Ingram places it off-centre (e.g. the 5.5×8.5 wrap bleed sits flush to the top and right of the 15×12 sheet) | all 4 PB wraps |
| Barcode rotated onto the spine, second barcode duplicated | barcode box coordinates were guessed after automatic detection failed | all 4 PB wraps |
| Spine text oversized and overflowing onto the back panel; flap copy and blurbs rebuilt from scratch and materially different from the live edition | omnibus HC jacket/case were re-typeset rather than reused | omnibus HC jacket + case |

## The finding that made a rebuild unnecessary

Every template Ingram issued for the new page counts specifies the **same spine as
the live edition**:

| Edition | ISBN | Live pp / spine | New pp / spine | Δ spine |
| --- | --- | --- | --- | --- |
| B1 hardcover | 9798295800801 | 156 / 0.500″ | 158 / 0.500″ | 0 |
| B2 hardcover | 9798295812675 | 218 / 0.625″ | 226 / 0.625″ | 0 |
| B3 hardcover | 9798295812705 | 170 / 0.563″ | 180 / 0.563″ | 0 |
| Omnibus hardcover | 9798295884412 | 686 / 1.625″ | 684 / 1.625″ | 0 |
| B1 paperback | 9798256008048 | 178 / 0.410″ | 186 / 0.428″ | +0.018″ |
| B2 paperback | 9798256009953 | 260 / 0.588″ | 266 / 0.601″ | +0.013″ |
| B3 paperback | 9798256010072 | 200 / 0.458″ | 206 / 0.472″ | +0.014″ |
| Omnibus paperback | 9798256072704 | 734 / 1.612″ | 732 / 1.608″ | −0.004″ |

Ingram quantises hardcover spines, so the hardcover jackets and case laminates did
not move at all. The paperback changes are 0.018″ at most, inside Ingram's
±0.0625″ cover tolerance. No cover needed to be redrawn for this upload.

## The correction

An Ingram e-proof carries the submitted cover as a single 300 dpi image; the trim
and fold marks, dimension callouts and PROOF wordmark are vector overlays added by
the proofing system. `recover_live_covers.py` copies that image XObject verbatim
into a fresh single-page PDF at the exact document size, positioned with the same
placement matrix Ingram used, and clips it to the bleed rectangle measured from the
new template. Nothing is decoded, recoloured or recompressed, so the result is the
accepted artwork with no colour shift, and the clip removes template callouts that
some of the accepted files had baked into the trimmed-off white margin.

Verified with `verify_covers.py` — all twelve match the live artwork's black ground
within one level, add no template coverage, and sit within 0.04″ of the template
bleed rectangle:

| ISBN | Cover | Doc size | Colour | Res | Ground (ours / live) |
| --- | --- | --- | --- | --- | --- |
| 9798295800801 | jacket | 24 × 12.5″ | DeviceCMYK | 300 dpi | `#060504` / `#060505` |
| 9798295800801 | case | 18 × 12.5″ | DeviceCMYK | 300 dpi | `#0B0501` / `#0B0501` |
| 9798295812675 | jacket | 24 × 12.5″ | DeviceCMYK | 300 dpi | `#050403` / `#050504` |
| 9798295812675 | case | 18 × 12.5″ | DeviceCMYK | 300 dpi | `#030201` / `#030302` |
| 9798295812705 | jacket | 24 × 12.5″ | DeviceCMYK | 300 dpi | `#050403` / `#050404` |
| 9798295812705 | case | 18 × 12.5″ | DeviceCMYK | 300 dpi | `#040301` / `#040302` |
| 9798295884412 | jacket | 24 × 12.5″ | DeviceCMYK | 300 dpi | `#080605` / `#080706` |
| 9798295884412 | case | 18 × 12.5″ | DeviceCMYK | 300 dpi | `#050402` / `#060403` |
| 9798256008048 | wrap | 15 × 12″ | ICCBased sRGB | 300 dpi | `#201811` / `#201812` |
| 9798256009953 | wrap | 15 × 12″ | ICCBased sRGB | 300 dpi | `#0E1721` / `#0E1722` |
| 9798256010072 | wrap | 15 × 12″ | ICCBased sRGB | 300 dpi | `#171512` / `#171512` |
| 9798256072704 | wrap | 15 × 12″ | DeviceCMYK | 300 dpi | `#090705` / `#090807` |

## Correction 2 — page size must be the bleed spread, not the template sheet

The first pass wrote each cover at the template's document size (24 × 12.5″ and so
on), which leaves Ingram's white template margin on the page. Ingram treats the
whole page as the cover, so that margin would have shipped as part of the wrap.

`build_bleed_covers.py` now crops every cover to Ingram's bleed-artwork rectangle and
sets the page to exactly those dimensions. The artwork is located by its own solid
ink extent — requiring a column or row to be at least 60% non-white, which ignores
the thin trim marks and callouts a few accepted files had baked into the margin — and
anchored on its horizontal centre and top edge, which is where every accepted file
meets the bleed rectangle. Where artwork fell a few thousandths short of spec it is
scaled up by at most 0.25% to guarantee coverage; where it overhangs (0.13″ below the
jackets, 0.13″ per side on the trilogy case laminates) the excess is cropped.

Sources changed too. The Book 1–3 jackets and case laminates now build from the press
masters on disk (`_covers/print_geometry_v1/`), verified against the live artwork as
sharing the same spread centre, top edge and barcode anchor. Only the omnibus
hardcover pair and the four paperback wraps still come from the e-proof raster, as no
source file for those exists anywhere on C: or E:.

Final upload geometry, all verified full-bleed with zero paper white on any edge:

| ISBN | Cover | Page size | Colour | Res | Source |
| --- | --- | --- | --- | --- | --- |
| 9798295800801 | jacket | 20.905 × 9.710″ | DeviceCMYK | 300 dpi | press master |
| 9798295800801 | case | 14.661 × 10.710″ | DeviceCMYK | 300 dpi | press master |
| 9798295812675 | jacket | 21.030 × 9.710″ | DeviceCMYK | 300 dpi | press master |
| 9798295812675 | case | 14.786 × 10.710″ | DeviceCMYK | 300 dpi | press master |
| 9798295812705 | jacket | 20.968 × 9.710″ | DeviceCMYK | 300 dpi | press master |
| 9798295812705 | case | 14.724 × 10.710″ | DeviceCMYK | 300 dpi | press master |
| 9798295884412 | jacket | 22.030 × 9.710″ | DeviceCMYK | 300 dpi | e-proof raster |
| 9798295884412 | case | 15.786 × 10.710″ | DeviceCMYK | 300 dpi | e-proof raster |
| 9798256008048 | wrap | 11.678 × 8.750″ | ICCBased sRGB | 300 dpi | e-proof raster |
| 9798256009953 | wrap | 11.851 × 8.750″ | ICCBased sRGB | 300 dpi | e-proof raster |
| 9798256010072 | wrap | 11.722 × 8.750″ | ICCBased sRGB | 300 dpi | e-proof raster |
| 9798256072704 | wrap | 12.858 × 8.750″ | DeviceCMYK | 300 dpi | e-proof raster |

The only remaining pure-white areas are the barcode blocks — a real barcode on the
hardcovers and omnibus paperback, and the "ISBN BARCODE AREA" placeholder that Ingram
fills at print time on the three trilogy paperbacks, as in the live files.

## Notes carried forward

- The three trilogy paperback wraps are **sRGB, not CMYK**, and their barcode is a
  white "ISBN BARCODE AREA" placeholder that Ingram fills at print time. Both are
  as-live and as-printed, so they were left untouched rather than converted.
- The three trilogy **case laminates** carry roughly 0.13″ of artwork overhang per
  side beyond Ingram's bleed rectangle. That overhang is in the live files too; the
  clip trims it back to the bleed edge.
- Front cover design differs by format: the hardcovers and the omnibus paperback use
  the black-and-gold sacred-geometry artwork, while the three trilogy paperbacks
  still use the earlier photographic fronts (library, water, stone). That is a
  design decision, not a defect, and it is unchanged from what is live.

## Files

- Recovered masters: `production_staging/_covers/live_recovered/`
- Discarded composites: `Desktop/_BROKEN_COVERS_QUARANTINE_2026-07-28/`
- Measurements: `Desktop/_cover_audit_live/` (`spines.json`, `placement.json`,
  `master_matches.json`, live vs ours renders)
- Scripts: `_scripts_from_windows/` — `audit_covers.py`, `audit_eproof_covers.py`,
  `measure_spines.py`, `find_live_cover_masters.py`, `recover_live_covers.py`,
  `check_placement.py`, `verify_covers.py`, `refresh_upload_packages.py`
