# Google Play sale ingest — 2026-08-11

**Source:** Play Books Partner Center → Analytics (30 days · All titles · All countries)  
**CSV:** `scratch/ops_reports/sales/google_play_book1_2026-08-09.csv`

| Catalog key | Title | ISBN (EPUB) | Date | Units | Earnings |
|-------------|-------|-------------|------|------:|---------:|
| inheritance | Masters X: The Inheritance of Frequency | 9798256008819 | 2026-08-09 | 1 | $1.00 |

Geography: United States (100%). Format: Ebook.

## Groundswell

Pushed via `python scripts/groundswell_sales_push.py … --channel GooglePlay`.

## API path (wired 2026-08-11)

Google has **no public Play Books Partner sales API**. Ingest path:

1. Partner Center → **Reports** → **Google Play Sales Transaction Report** → Export (TSV/CSV)
2. `python scripts/groundswell_sales_push.py report.tsv`  
   - Auto-detects `GooglePlay` from columns (`Primary ISBN`, `Payment Amount`, …)  
   - Prefers `POST {TERMINAL_URL}/api/sales` with `Authorization: Bearer $INGEST_TOKEN` + CF Access service-token headers  
   - Falls back to Wrangler KV if HTTP fails  
3. Intake tab also maps Google Play exports (channel `GooglePlay`)

Ops rollup `google_play_sales` marked **wired** (manual export → `/api/sales`).
