# FINAL AUDIT — jasoncholloway.com (Pass 2)
**Date:** July 10, 2026

---

## P0 — Structural fixes (all shipped)

### 1. `/books/` breadcrumb 404 → FIXED
Created `app/books/page.tsx` — a lightweight catalog index page linking the trilogy (3 volume cards with covers, prices, page counts), the omnibus edition CTA, the Hawkes monograph, and a bridge to Field Notes / Analysis Chamber. This resolves the JSON-LD `BreadcrumbList` pointing at a 404 on every volume page. All breadcrumbs already point to `/books/` with trailing slash; the page now exists.

### 2. Footer IngramSpark link → FIXED
The raw `https://www.ingramspark.com` link (a print-services portal, not a store) has been removed entirely. The "Publisher" column is now text-only: Seventh City Press, About the Author, Contact. Buyers reach IngramSpark product URLs through the buy buttons on book pages, which is the correct path.

### 3. Omnibus missing from footer → FIXED
Added "Omnibus Edition" link (`/books/masters-x/omnibus`) and "Full Catalog" link (`/books`) to the Footer's Books column. The omnibus is now reachable from every page on the site.

### 4. JSON-LD missing `Offer` objects → FIXED
Added `offers: { @type: "Offer", price, priceCurrency: "USD", availability: "https://schema.org/InStock", url }` to every `workExample` on:
- `/books/masters-x/[slug]` — PB, HC, and ebook editions (3 offers per volume × 3 volumes = 9 total)
- `/books/masters-x/omnibus` — HC and PB editions (2 offers)
- `/books/hawkes-monograph` — all three editions (3 offers)

URLs point to IngramSpark product pages for print, Amazon for Kindle, and the book page as fallback. Also fixed: `numberOfPages` on PB/HC workExamples now uses per-format page counts (`pageCountPB`, `pageCountHC`) instead of the generic `pageCount`, which was always the PB number.

### 5. Hawkes epub back-matter typo → FLAGGED (not in repo)
`Hawkes_Monograph_V26.epub` `ch013.xhtml` About the Author says "sixteen-novel corpus." The manuscript body and all site copy correctly say seventeen. **[NEEDS AUTHOR]** — fix in publishing workflow before next epub upload.

---

## P1 — Conversion, SEO, polish (all shipped except as noted)

### 6. Bookshop.org ISBN search links → FLAGGED
Cannot verify live resolution from this environment. The ISBN searches are structurally correct (`bookshop.org/search?keywords={PB ISBN}`). **[NEEDS AUTHOR]** — open each in a browser and confirm the product page appears. If any fails, replace with the IngramSpark direct link (already present as the primary CTA).

### 7. Chamber cul-de-sac → FIXED
Created `app/chamber/layout.tsx` — wraps all chamber pages. Adds a quiet footer strip: "The Analysis Chamber is the research companion to the Masters X Trilogy. View the Trilogy →" linking to `/books/masters-x`. Tone matches the research framing without selling.

### 8. Field Notes → Books bridge → FIXED
Added a gold-accented bridge callout in `FieldNoteLayout.tsx` between the Fiction section and the novel excerpt: "This history appears in the Masters X Trilogy — fiction built on the documented record above." Links to the volume via the existing `bookHref` prop. Also added `resp-main-sidebar` class to the article grid so the sidebar collapses properly on mobile (it was using a fixed `1fr 280px` grid with no responsive rule).

### 9. Homepage SERP "Available Now" → FIXED
OpenGraph title changed from the full discovery tagline to: `Jason Carroll Holloway | Masters X Trilogy — Available Now`. The `<title>` tag retains the longer keyword-rich version for the tab bar; OG is for social sharing and SERPs where brevity + "Available Now" helps click-through.

### 10. Omnibus PB cover art → NO CHANGE (per brief)
No PB omnibus cover exists. The omnibus page and books index show only the HC cover. Not fabricating art. **[NEEDS AUTHOR]** if commissioning.

### 11. Press kit PDF currency → FLAGGED
Cannot verify PDF contents from this environment. The download link on `/contact` and `/press` points at `/press-kit/Masters_X_Press_Kit.pdf` and works. **[NEEDS AUTHOR]** — confirm the PDF reflects post-launch pricing, "Available Now" framing, and the omnibus.

### 12. Ebook retail claims → ALREADY CORRECT
Pass 1 changed the novel detail pages to say "Kindle edition available on Amazon. EPUB edition distributed to library and retail ebook systems." — accurate and conservative. Hawkes monograph correctly says "Available on Google Play Books." No further change needed.

### 13. Schema `sameAs` / Amazon Author Central → FIXED
About page (`app/about/page.tsx`) still had `"https://amazon.com/author/jasoncholloway"` in its Person JSON-LD — now removed. Layout.tsx was already clean from Pass 1. All JSON-LD site-wide now carries only the verified Goodreads URL.

### 14. `Premium Color (70lb)` interior → FLAGGED
Still present on volume detail pages in the Publication Details card. Cannot verify against Ingram specs from here. **[NEEDS AUTHOR]** — if the trilogy interiors are actually B&W cream (standard for fiction), change to "Standard B&W (Cream Paper)" in the static data or remove the row.

### 15. About page "Jason C. Holloway, Publisher" → FIXED
Changed to "Jason Carroll Holloway, Publisher" in the sidebar press card. The `alternateName` in JSON-LD schema remains (correct usage for search disambiguation).

---

## P2 — Noted, not shipped

### 16. Inline style consolidation
Not attempted — would touch every page file with high regression risk for purely cosmetic benefit. Recommended for a dedicated refactor pass.

### 17. Gold button discipline
The `/books/` index page follows this: one gold CTA ("View the Trilogy") with the omnibus as outline. Existing pages are unchanged; discipline should be adopted page-by-page in future passes.

### 18. Google Shopping feed
Verified: feed has correct omnibus prices ($29.99 HC / $19.99 PB) and no Amazon URLs. Description text uses seventeen-novel Hawkes count. No changes needed.
