# VIVIAN QC — Ingram Covers — 2026-07-31

**Current overall verdict: PASS — 6 of 6 files pass final independent re-QC.**  
**Upload gate:** Vivian's cover QC gate is cleared; upload still requires Jason's explicit approval.

## Method

Visual inspection used low-resolution full-page renders of the six upload PDFs, the six July 30 Ingram templates, the supplied failure screenshot, and the July 28 comparison bundle. MediaBox and CropBox were also checked. No cover was repaired or uploaded.

## Exact verdicts

### 1. `9798256008048_PB/cover_wrap.pdf` — **BLOCK**

- **Clipping:** The supplied screenshot shows the lower spine title cut off, but it is a partial-page viewport; the full PDF render contains the complete title. The typography is nevertheless oversized and leaves poor spine margin.
- **Spine:** Artwork uses a **0.460 in** spine inside an **11.710 × 8.750 in** PDF. The current Ingram template requires **0.436 in** and **11.686 × 8.750 in** (190 pages). It is not template-centered after imposition.
- **Crop/distortion/safe area:** No intrinsic page-edge crop or visible image distortion in the full render; panel text and barcode area are otherwise inside the visible safe zones.
- **Template correspondence:** **Fails by +0.024 in in width.**
- **Likely root cause:** Rebuild used a manually widened/calculated spine and scaled spine typography instead of the exact July 30 Ingram template spine.

### 2. `9798256009953_PB/cover_wrap.pdf` — **BLOCK**

- **Clipping:** No visible page-edge clipping; front, back, and spine text render completely.
- **Spine:** Title is visually centered and contained in the generated spine, but that spine is **0.640 in** rather than the template's **0.614 in**.
- **Crop/distortion/safe area:** No visible distortion; front/back copy and barcode area remain inside the visible safe zones.
- **Template correspondence:** PDF is **11.890 × 8.750 in**; template requires **11.864 × 8.750 in** (272 pages). **Fails by +0.026 in in width.**
- **Likely root cause:** Same manual spine-width calculation/rebuild error as Vol I PB; the exact Ingram template width was not used.

### 3. `9798295800801_HC/cover_jacket.pdf` — **PASS**

- No visible clipping, crop, or distortion. Flap copy, back copy, barcode, front title, and author line are contained in safe areas.
- Spine title is contained and visually centered; panel transitions align.
- PDF is **20.910 × 9.710 in** versus template bleed artwork **20.905 × 9.710 in**; the 0.005 in difference is sub-point PDF rounding and does not produce visible template drift.

### 4. `9798295800801_HC/cover_caselam.pdf` — **PASS**

- No visible clipping, crop, or distortion. Front image/title, back imprint/barcode, and spine copy are contained in safe areas.
- Spine is visually centered and fully contained.
- PDF is **14.660 × 10.710 in** versus template bleed artwork **14.661 × 10.710 in**; the 0.001 in difference is rounding only.

### 5. `9798295812705_HC/cover_jacket.pdf` — **PASS**

- No visible clipping, crop, or distortion. Flap text, back copy, barcode, front title/art, and author line are contained in safe areas.
- Spine title is centered and fully contained.
- PDF is **20.970 × 9.710 in** versus template bleed artwork **20.968 × 9.710 in**; the 0.002 in difference is rounding only with no visible drift.

### 6. `9798295812705_HC/cover_caselam.pdf` — **PASS**

- No visible clipping, crop, or distortion. Front art/title, back imprint/barcode, and spine copy are contained in safe areas.
- Spine is visually centered and fully contained.
- PDF is **14.730 × 10.710 in** versus template bleed artwork **14.724 × 10.710 in**; the 0.006 in difference is sub-point rounding and does not create visible safe-area or fold drift.

## Release decision

The four hardcover files clear visual QC. The two paperback wraps do not correspond to their current Ingram templates and stop the line. Do not upload any covers until both paperback wraps are rebuilt to the exact template dimensions and all six files pass re-QC together.

*VIVIAN — Editorial Quality & Pre-Publication Control*

---

## Final independent re-QC after paperback repairs — 2026-07-31 02:34 CT

**Final verdict: PASS — six of six current MASTER files pass.**

This was a fresh inspection of the current MASTER PDFs, not acceptance of the
repair log's claims. I rendered all six files directly, rendered the two actual
July 30 paperback Ingram guides, overlaid their bleed, panel, safe-area, spine,
and barcode geometry on the current wraps, and compared the repaired paperback
panels with the pre-repair source wraps. MediaBox, CropBox, TrimBox, BleedBox,
placed-image bounds, color space, resolution, and template geometry were also
checked. The supplied original Vol I failure screenshot was used as the
clipping reference. Temporary low-disk JPEG renders were deleted after review.

### Strict file verdicts

1. `9798256008048_PB/cover_wrap.pdf` — **PASS**
   - All four page boxes are exactly **11.686 × 8.750 in**, matching the July
     30 guide's required upload dimensions.
   - Panel boundaries are exactly **0 / 5.625 / 6.061 / 11.686 in**; the spine
     is exactly **0.436 in**, with the template's 0.0625 in inner safe inset
     visible on both sides.
   - Spine title and author are centered, fully contained, legible, and
     correctly oriented bottom-to-top. The repaired title is complete; the
     lower clipping/unsafe sizing visible in the supplied original screenshot
     is absent.
   - Back and front remain separate **5.625 × 8.750 in** panels at approximately
     300 dpi. Direct before/current renders show no front/back crop, stretch,
     distortion, seam, or lost edge content.
   - All back/front copy and logos are inside the template safe areas; artwork
     reaches every bleed edge. The white ISBN barcode area is intact and fully
     inside the back-cover safe area.

2. `9798256009953_PB/cover_wrap.pdf` — **PASS**
   - All four page boxes are exactly **11.864 × 8.750 in**, matching the July
     30 guide's required upload dimensions.
   - Panel boundaries are exactly **0 / 5.625 / 6.239 / 11.864 in**; the spine
     is exactly **0.614 in**, with the guide's spine-safe inset respected.
   - Spine title and author are centered, fully contained, legible, and
     correctly oriented bottom-to-top; no glyph or ornament is clipped.
   - Back and front remain separate **5.625 × 8.750 in** panels at approximately
     300 dpi. Direct before/current renders show no crop, stretch, distortion,
     seam, or loss of front/back art.
   - Text, logos, and the intact white ISBN barcode area remain within the
     guide's safe areas, while backgrounds fully cover the bleed.

3. `9798295800801_HC/cover_jacket.pdf` — **PASS**
   - Prior PASS holds. Fresh full-jacket rendering shows complete flap copy,
     back copy, barcode, spine, front title/art, and author line with no
     clipping, crop, distortion, or unsafe fold/edge placement.
   - Page boxes are **20.910 × 9.710 in**; correspondence with the July 30 guide
     remains within the previously documented sub-point rounding.

4. `9798295800801_HC/cover_caselam.pdf` — **PASS**
   - Prior PASS holds. Fresh rendering shows complete front/back art, imprint,
     barcode, spine title/author, and ornaments with no clipping, distortion,
     or unsafe edge placement.
   - Page boxes are **14.660 × 10.710 in**; guide correspondence remains within
     the previously documented rounding.

5. `9798295812705_HC/cover_jacket.pdf` — **PASS**
   - Prior PASS holds. Fresh full-jacket rendering shows complete flap and back
     copy, barcode, centered spine, front art/title, and author line with no
     clipping, crop, distortion, or fold/edge conflict.
   - Page boxes are **20.970 × 9.710 in**; guide correspondence remains within
     the previously documented sub-point rounding.

6. `9798295812705_HC/cover_caselam.pdf` — **PASS**
   - Prior PASS holds. Fresh rendering shows complete front/back art, imprint,
     barcode, centered spine copy, and ornaments with no clipping, crop,
     distortion, or unsafe edge placement.
   - Page boxes are **14.730 × 10.710 in**; guide correspondence remains within
     the previously documented sub-point rounding.

### Final release decision

The paperback repair defects are closed, and the four unchanged hardcover
files retain their PASS. **All six audited cover files clear Vivian's visual
and template QC gate.** No repair, upload, publication, commit, or push was
performed during this re-QC.

*VIVIAN — Editorial Quality & Pre-Publication Control*
