# Ingram rank / units ingest — 2026-08-17

**Source:** `C:\Users\zh577\Downloads\report (1).csv` (IngramSpark subject-rank export)  
**Archived UTF-8:** `scratch/ops_reports/sales/ingram_rank_units_2026-08-17.csv`

This is **not** a compensation statement. Columns are Title, Author, Format, ISBN, Subject Rank, Units Sold. No royalty date and no dollars. Intake failed because Excel saved the file as **UTF-16** with formula-wrapped ISBNs (`="9798…"`).

## Snapshot (units only)

| Catalog | Title | Format | ISBN | Units | Rank |
|---------|-------|--------|------|------:|------|
| omnibus | Masters X: The Complete Trilogy | Hardcover | 9798295884412 | 4 | #367 Thrillers / Suspense |
| hawkes | Innocence, Desire, and the Architecture of the Fall | Hardcover | 9798349308444 | 2 | #5 Literary Criticism / American |
| omnibus | Masters X: The Complete Trilogy | Paperback | 9798256072704 | 1 | #967 Thrillers / Suspense |
| **Total** | | | | **7** | revenue unknown |

Omnibus paperback **1 unit** already appeared on the July wholesale ingest. The dashboard sums import rows, so that SKU may show 2 until a later reconciliation.

## Groundswell

Pushed via `python scripts/groundswell_sales_push.py "C:\Users\zh577\Downloads\report (1).csv" --channel IngramSpark`.
