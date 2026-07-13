# Previous Pass Summary (Pass 1 — integrated July 10, 2026)

Source: `jasoncholloway-elevation-pass-RETURN.zip`

## Shipped to production

- `responsive.css` import in `app/layout.tsx` (root-cause mobile breakage)
- Mobile nav drawer in `components/layout/Header.tsx`
- Dead Amazon print links removed (7 phantom ASINs); Kindle-only retained
- `HAWKES_KINDLE_ASIN B072BLH7X7` removed from `buyLinks.ts`
- Contact: Seventh City Press mailing address; press-kit PDF button
- Editorial desk lat/long removed from contact (Pass 2 prep)
- Homepage: "Available Now"; IndieBound → Bookshop.org
- `llms.txt` Hawkes ISBN fix; version 1.1
- Cover aspect ratios (55/85 PB, 614/921 HC)
- Bookshop.org per-title ISBN searches

## Cursor integration after Pass 1

- Omnibus page `/books/masters-x/omnibus/` (was 404 from press page)
- Homepage: PB + HC + omnibus cover rows
- Omnibus in About Selected Works
- Omnibus prices corrected: $29.99 HC / $19.99 PB
- Hawkes novel count → 17 (site + feeds; epub back matter still says 16)
- CANON updated: Available now, omnibus prices

## Deliberately not touched in Pass 1

- `/chapters-sent/` delivery logic
- Web3Forms keys
- Ingram long descriptions (except Hawkes count sync)
- Chamber tool internals
- `google-shopping.csv` regeneration from report.csv (manual price fixes only)

## Pass 2 should focus on

See `KNOWN_ISSUES_AND_FIXES.md` — especially `/books/` 404, JSON-LD Offers, footer/nav omnibus, chamber/field-notes conversion loops.
