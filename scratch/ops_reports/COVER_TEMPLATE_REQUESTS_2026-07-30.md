# Cover Template Generator â€” Submissions (Jul 30, 2026 ~11:05 PM CT)

All four spine-affected titles submitted via IngramSpark Cover Template Generator. Delivery email: **zh5779485@gmail.com**. Format: **PDF**.

## Submitted

| ISBN | Title | Actual pages | Template pages (even) | Price | Request ID |
|------|-------|--------------|----------------------|-------|------------|
| 9798256008048 | Vol I PB | 189 | **190** | $16.99 | CSS5343306 |
| 9798295800801 | Vol I HC | 163 | **164** | $29.99 | CSS5343307 |
| 9798256009953 | Vol II PB | 271 | **272** | $22.99 | CSS5343308 |
| 9798295812705 | Vol III HC | 177 | **178** | $32.99 | CSS5343309 |

**Not requested** (page count unchanged): Vol II HC 225, Vol III PB 205.

## Notes

- Ingram requires **even** page counts in the template generator; odd interiors are rounded up (+1 blank verso is standard for spine calc).
- ISBN lookup + native typing triggers Vue state correctly; page count must be set via CDP `input`/`change` events (browser_fill corrupts the field).
- Expected attachment naming: `979*-Perfect*.pdf` (PB), `979*-Jacket*.pdf` + `979*-Case*.pdf` (HC).

## Processing pipeline (when emails arrive)

1. Save templates to `C:\Users\zh577\Downloads\` (or `Desktop\Ingram_Templates_2026-07-30\`).
2. **HC:** Run `production_staging/_scripts_from_windows/remap_covers_to_templates.py` after updating `BOOKS` page counts (163â†’164 for B1 HC, 177â†’178 for B3 HC).
3. **HC:** Run `build_bleed_covers.py` after updating `BLEED` dimensions from new template geometry.
4. **PB:** Remap Vol I PB + Vol II PB wraps onto new Perfect Bound templates (extend remap script or compose from press masters + template spine marks).
5. Promote to `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\{ISBN}_PB|HC\`.
6. Run `measure_cover_geometry.py` â€” confirm spine width within tolerance before Jason approves Ingram interior replace.

## Blockers (resolved Jul 31 ~12:20 AM CT)

- ~~Email MCP unavailable~~ â€” `user-email` MCP now works; all 6 PDFs downloaded via `download_attachment`.
- ~~Templates not yet delivered~~ â€” arrived ~11:14â€“11:21 PM CT; saved to `Desktop\Ingram_Templates_2026-07-30\`.

## Downloaded (Jul 31 ~12:20 AM CT)

| File | Size |
|------|------|
| `9798256008048-Perfect.pdf` | 642,581 B |
| `9798256009953-Perfect.pdf` | 641,774 B |
| `9798295800801-Jacket.pdf` | 665,502 B |
| `9798295800801-Case.pdf` | 650,450 B |
| `9798295812705-Jacket.pdf` | 666,094 B |
| `9798295812705-Case.pdf` | 648,874 B |

Cover remap/processing **complete** â€” see Â§ Processing complete below.

---

## Processing complete â€” Jul 31 ~12:30 AM CT

### Template geometry (measured from `Ingram_Templates_2026-07-30`)

| ISBN | Kind | Bleed W Ã— H | Spine | Î” vs Jul 28 template |
|------|------|-------------|-------|----------------------|
| 9798295800801 | jacket | 20.910 Ã— 9.710â€³ | **0.505â€³** | unchanged (was 0.505â€³ @ 158 pp) |
| 9798295800801 | case | 14.660 Ã— 10.710â€³ | **0.485â€³** | unchanged |
| 9798295812705 | jacket | 20.970 Ã— 9.710â€³ | **0.565â€³** | unchanged (was 0.565â€³ @ 180 pp) |
| 9798295812705 | case | 14.730 Ã— 10.710â€³ | **0.555â€³** | unchanged |
| 9798256008048 | wrap | 11.710 Ã— 8.760â€³ | **0.460â€³** | +0.032â€³ (was 0.428â€³ @ 186 pp) |
| 9798256009953 | wrap | 11.890 Ã— 8.760â€³ | **0.640â€³** | +0.039â€³ (was 0.601â€³ @ 266 pp) |

Ingram **quantizes hardcover spines** â€” 164 pp Vol I HC and 178 pp Vol III HC land in the same spine buckets as the Jul 28 templates. No HC spine remap required.

### Pipeline run

| Step | 9798295800801 HC | 9798295812705 HC | 9798256008048 PB | 9798256009953 PB |
|------|------------------|------------------|------------------|------------------|
| `measure_cover_geometry.py` | âœ… | âœ… | âœ… | âœ… |
| `remap_covers_to_templates.py` | â­ skipped | â­ skipped | n/a | n/a |
| `build_bleed_covers.py` (press masters) | âœ… jacket + case | âœ… jacket + case | n/a | n/a |
| `remap_pb_spines.py` | n/a | n/a | âœ… 0.428â†’0.460â€³ | âœ… 0.601â†’0.640â€³ |
| Promoted â†’ `MASTER_UPLOAD_FOLDER` | âœ… | âœ… | âœ… | âœ… |

**HC remap skip:** `remap_covers_to_templates.py` hit `ArrayMemoryError` (~309 MiB) on jacket CMYK conversion. Because measured HC spines are unchanged, bleed rebuild from `print_geometry_v1` press masters is the correct path (same approach as Jul 28 audit).

**PB source:** No `EPROOF-*.pdf` in Downloads. `remap_pb_spines.py` updated to fall back to staged `cover_wrap.pdf` embedded JPEG.

### Files promoted

All verified at bleed-artwork page size in `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\`:

| Destination | Page size | Bytes |
|-------------|-----------|-------|
| `9798295800801_HC/cover_jacket.pdf` | 20.910 Ã— 9.710â€³ | 10,386,257 |
| `9798295800801_HC/cover_caselam.pdf` | 14.660 Ã— 10.710â€³ | 8,081,743 |
| `9798295812705_HC/cover_jacket.pdf` | 20.970 Ã— 9.710â€³ | 10,511,936 |
| `9798295812705_HC/cover_caselam.pdf` | 14.730 Ã— 10.710â€³ | 8,182,475 |
| `9798256008048_PB/cover_wrap.pdf` | 11.710 Ã— 8.750â€³ | 11,844,435 |
| `9798256009953_PB/cover_wrap.pdf` | 11.890 Ã— 8.750â€³ | 9,693,212 |

Staging mirrors updated under `production_staging/{b1,b2,b3}_*/`. Prior HC files backed up in staging as `*_PRE_2026-07-30.pdf`; prior MASTER copies as `*_PRE_2026-07-30.pdf` (6/6 â€” Vol II PB restored Jul 31 from `SCP_UploadReady_Full_2026-07-28` after disk-full skip).

### Failures / warnings

1. **`measure_spines.py`** â€” aborts when Jul 28-only templates (e.g. `9798295812675-Jacket.pdf`) are absent from the Jul 30 folder. Use targeted measurement or `measure_cover_geometry.py` instead.
2. **HC raster remap** â€” memory limit on 7200Ã—3750 CMYK float conversion; skipped (not needed).
3. **Vol II PB MASTER backup** â€” initial `WinError 112` disk full; **recovered** by copying Jul 28 upload bundle `cover_wrap.pdf` â†’ `cover_wrap_PRE_2026-07-30.pdf`.
4. **C: drive space** â€” ðŸ”´ critically low (~33 MB free); free space before next promotion batch.

### Script updates (committed in working tree)

- `measure_spines.py` / `measure_cover_geometry.py` â€” `TPL` â†’ `Ingram_Templates_2026-07-30`
- `remap_covers_to_templates.py` â€” B1 158â†’164 pp, B3 180â†’178 pp, measured spine overrides, `ONLY` filter
- `build_bleed_covers.py` â€” `BLEED` dict + staged-source fallback
- `remap_pb_spines.py` â€” B1 190 pp / B2 272 pp, staged-cover fallback

---


### Jason upload checklist

All assets in `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\`:

| ISBN | Interior | Cover | Action |
|------|----------|-------|--------|
| 9798256008048 Vol I PB | ✅ rebuilt | ✅ new wrap (0.460″) | Replace both + update pp → 189 |
| 9798295800801 Vol I HC | ✅ rebuilt | ✅ jacket + case (spine unchanged) | Replace interior + update pp → 163 |
| 9798256009953 Vol II PB | ✅ rebuilt | ✅ new wrap (0.640″) | Replace both + update pp → 271 |
| 9798295812675 Vol II HC | ✅ rebuilt | ✅ existing (225 pp) | Replace interior only |
| 9798256010072 Vol III PB | ✅ rebuilt | ✅ existing (205 pp) | Replace interior only |
| 9798295812705 Vol III HC | ✅ rebuilt | ✅ jacket + case (spine unchanged) | Replace interior + update pp → 177 |

---

## Paperback correction - Jul 31

The earlier PB measurements at 0.460/0.640 inches and 11.710/11.890 inches are superseded. They came from hard-coded manual spine values rather than the July 30 template guide geometry.

| ISBN | Template/output page | Spine | Status |
|------|----------------------|-------|--------|
| 9798256008048 | **11.686 x 8.750 in** | **0.436 in** | repaired, pending independent Vivian re-QC |
| 9798256009953 | **11.864 x 8.750 in** | **0.614 in** | repaired, pending independent Vivian re-QC |


remap_pb_spines.py now measures the templates directly, always starts from the immutable _PRE_2026-07-30 sources, preserves the 5.625-inch back/front panels, and auto-fits and centers the spine text. The upload gate remains closed until Vivian independently re-checks all six covers. See editorial/COVER_PB_REPAIR_2026-07-31.md. Status: repaired, pending independent Vivian re-QC.
