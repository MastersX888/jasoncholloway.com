# Ingram wholesale ingest — 2026-08-08

**Source:** `WholesalePODCompensationUSD-JUL-26.pdf` (Lightning Source / IngramSpark, run 2026-08-05, period JUL-26)

**Archived PDF:** `scratch/ops_reports/sales/WholesalePODCompensationUSD-JUL-26.pdf`  
**CSV for Intake:** `scratch/ops_reports/sales/ingram_wholesale_ytd_2026-08-08.csv`  
**Push script:** `scripts/groundswell_sales_push.py`

## YTD through 2026-07-31 (US POD wholesale)

| Catalog key | Title | ISBN (PB) | Units | Net pub comp |
|-------------|-------|-----------|------:|-------------:|
| inheritance | Masters X: The Inheritance of Frequency | 9798256008048 | 5 | $6.50 |
| grimoire | Masters X: The Grimoire | 9798256009953 | 5 | $7.20 |
| kingdom | Masters X: The Kingdom | 9798256010072 | 5 | $10.05 |
| omnibus | Masters X: The Complete Trilogy | 9798256072704 | 1 | $3.91 |
| **Total** | | | **16** | **$27.66** |

July 2026 alone: **1 unit** (omnibus PB), **$3.91** net comp.

Portal lifetime chart (Jun 15 + Jul 1 + Aug 2) shows **18 units** — PDF YTD stops at July (**16**); August sales not in this report.

## Groundswell

- **KV pushed 2026-08-08** via `python scripts/groundswell_sales_push.py` — 4 fresh rows, 16 units, catalog snapshot merged (`inheritance` 5 · `grimoire` 5 · `kingdom` 5 · `omnibus` 1).
- Re-run: same command (skips duplicate hashes).
- Manual alternative: Seventh City Terminal → **Intake** tab → upload the CSV → Commit.

## Notes

- 55% wholesale discount confirmed on all PB SKUs in report.
- Hawkes monograph: no wholesale sales in this period.
