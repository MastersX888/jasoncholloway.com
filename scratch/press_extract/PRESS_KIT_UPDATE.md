# Press Kit Update — July 10, 2026

## Verification summary

Compared Downloads PDFs against `CANON.md`, `lib/data/books.ts`, and live site copy.

### Masters_X_Fact_Sheet.pdf — **OUT OF DATE (regenerated)**

| Issue (old) | Fix (new) |
|-------------|-----------|
| Vol III HC listed as **200** pages | **170** pages |
| Omnibus PB **731 pending** / HC **674 pending** | **734** / **686** — **live** |
| "Hardcover editions pending" | All editions **Available now** |
| "OUTSTANDING ITEMS — FOR AGENT COMPLETION" block | **Removed** |
| Wrong omnibus trim (both Royal 8vo) | PB 5.5×8.5 · HC 6.14×9.21 case laminate |
| No US list prices in matrix | Full price column added |
| No Kindle-only Amazon policy | Clarified in footer note |

### Masters_X_Press_Release.pdf — **UPDATED**

- Added **Available now** + omnibus pricing ($29.99 HC / $19.99 PB)
- Omnibus book row with page counts
- Availability section aligned with `/press` page (Kindle $6.99, IngramSpark print)

### Masters_X_Synopses.pdf — **UPDATED**

- Added **Omnibus** section with prices, page counts, product URL

### Holloway_Author_Bios.pdf — **CURRENT (minor regen)**

- Content was already aligned (Jason Carroll Holloway, Mercy University, Analysis Chamber, Hawkes monograph). Regenerated for kit consistency.

### Masters_X_Press_Kit.pdf — **CREATED**

- Combined PDF (release + fact sheet + bios + synopses) — was missing from `public/press-kit/`

## Regeneration

```powershell
python scripts/generate_press_kit.py
```

Outputs to `public/press-kit/` and copies to `Downloads/`.

## Deployed

PDFs copied to `out/press-kit/` and deployed to jasoncholloway.com/press-kit/
