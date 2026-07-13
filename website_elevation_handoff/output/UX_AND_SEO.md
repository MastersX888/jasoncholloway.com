# UX & SEO NOTES — Pass 2
July 10, 2026

## 1. Navigation & footer changes shipped

**Footer:** Omnibus Edition and Full Catalog links added to the Books column. IngramSpark print-services link removed from Publisher column (it was the only external link in the footer sending buyers to a wholesale portal; all purchase paths now route through book-page buy buttons to IngramSpark *product* URLs). Header unchanged from Pass 1 — mobile drawer and 7-item desktop nav remain.

## 2. Structural SEO: `/books/` catalog index

New page resolves the BreadcrumbList 404 that every volume page's JSON-LD pointed to. The page also creates an internal hub for cross-linking: trilogy → omnibus → Hawkes → Field Notes → Chamber. Google can now crawl a complete Books → Masters X → Volume path.

The page uses `resp-2col` for the three-column volume grid, which will collapse to single-column on mobile via the existing responsive rules.

## 3. JSON-LD `Offer` implementation

Every book page now has `offers` on its `workExample` entries, structured per schema.org Book + Offer guidelines:

```json
"offers": {
  "@type": "Offer",
  "price": "16.99",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "url": "https://shop.ingramspark.com/b/084?params=..."
}
```

This makes the site eligible for Google's book rich results, which can display price + availability directly in SERPs. Prices are sourced from `books.ts` (`price_pb_is`, `price_hc_is`, `price_ebook`), which are Ingram-synced. URLs point to the IngramSpark product page for print editions and Amazon for Kindle editions.

Also fixed: `numberOfPages` on PB and HC `workExample` entries was using the generic `pageCount` (always the PB number) for both. Now correctly uses `pageCountPB` and `pageCountHC` respectively — matters because the HC interior is a different page count (e.g., Vol I: 178 PB vs 156 HC).

## 4. Internal linking: conversion loops closed

**Chamber → Catalog:** New `app/chamber/layout.tsx` wraps all chamber tool pages with a footer bridge ("Research companion to the Masters X Trilogy → View the Trilogy"). This is the minimum viable conversion path; it doesn't break the research framing and is styled as a quiet text link, not a CTA banner.

**Field Notes → Books:** The `FieldNoteLayout` component now includes a gold-accented bridge callout between the Fiction section and the novel excerpt. Every field note already had a `bookHref` prop wiring it to the right volume — now that prop is surfaced to readers in context, not just used for the sidebar card.

**Books Index → Everything:** The new `/books/` page links to the trilogy hub, each volume, the omnibus, the monograph, Field Notes, and the Chamber — closing the loop from discovery to research.

## 5. Mobile verification notes

**New `/books/` page** uses the `resp-2col` responsive utility for the three-column volume grid. At ≤768px this collapses to single-column per the existing responsive.css rules.

**FieldNoteLayout** now has `resp-main-sidebar` on its article grid (was a fixed `1fr 280px` with no responsive class — the sidebar would have been crushed on phones). Will now stack below the article content.

**Chamber layout** bridge footer is centered text — no grid, fully responsive by default.

**All other mobile fixes from Pass 1 remain in place.** Recommended post-integration device test: Moto G 412×915 on the new `/books/` page and any field note page to confirm the sidebar collapse.
