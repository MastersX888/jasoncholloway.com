# Cover Template Generator — Submissions (Jul 30, 2026 ~11:05 PM CT)

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
2. **HC:** Run `production_staging/_scripts_from_windows/remap_covers_to_templates.py` after updating `BOOKS` page counts (163→164 for B1 HC, 177→178 for B3 HC).
3. **HC:** Run `build_bleed_covers.py` after updating `BLEED` dimensions from new template geometry.
4. **PB:** Remap Vol I PB + Vol II PB wraps onto new Perfect Bound templates (extend remap script or compose from press masters + template spine marks).
5. Promote to `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\{ISBN}_PB|HC\`.
6. Run `measure_cover_geometry.py` — confirm spine width within tolerance before Jason approves Ingram interior replace.

## Blockers

- **Email MCP unavailable** — cannot poll zh5779485@gmail.com automatically. Gmail browser session requires login.
- **Templates not yet in Downloads** as of submission closeout — Ingram usually delivers within minutes.
