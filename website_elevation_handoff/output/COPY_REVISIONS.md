# COPY REVISIONS — Pass 2
Before/after for every changed string. All marked **[CANON-SAFE]** unless noted.

---

## `/books/` — NEW `app/books/page.tsx`

New page. Key copy:
- Hero: "Fiction built on real research. Criticism built on close reading. Everything published by Seventh City Press, available now."
- Trilogy section: "Three novels tracing a safety deposit box, seven notebooks of classified acoustic research, and a sealed crypt beneath Prague's Strahov Monastery. For readers of Eco, Kostova, and Doerr."
- Research bridge: "The research archive underlying the trilogy is open and interactive."

All [CANON-SAFE].

---

## `/` — `app/page.tsx`

**OpenGraph title** [CANON-SAFE]
- Before: `Jason Carroll Holloway | Masters X Trilogy — A Kansas City Conspiracy of Frequency & Medieval Manuscripts`
- After: `Jason Carroll Holloway | Masters X Trilogy — Available Now`
- Note: `<title>` tag unchanged (retains long-form for SEO); only `openGraph.title` shortened for social/SERP click-through.

---

## `/about` — `app/about/page.tsx`

**Sidebar publisher card** [CANON-SAFE — CANON §1]
- Before: `Jason C. Holloway, Publisher`
- After: `Jason Carroll Holloway, Publisher`

**Schema `sameAs`** [CANON-SAFE]
- Before: includes `"https://amazon.com/author/jasoncholloway"`
- After: removed (unverified URL)

---

## Footer — `components/layout/Footer.tsx`

**Books column** [CANON-SAFE]
- Before: Masters X Trilogy, 3 volumes, Hawkes Monograph (5 items)
- After: Full Catalog, Masters X Trilogy, 3 volumes, Omnibus Edition, Hawkes Monograph (7 items)

**Publisher column** [CANON-SAFE]
- Before: Seventh City Press, About the Author, Contact, IngramSpark (external link to ingramspark.com)
- After: Seventh City Press, About the Author, Contact (IngramSpark link removed — it pointed to a print-services portal, not a storefront)

---

## `/books/masters-x/[slug]` — JSON-LD only

No visible copy changes. Added `offers` objects to all three `workExample` entries per volume (PB, HC, Ebook). Fixed `numberOfPages` to use format-specific page counts. Fixed breadcrumb `/books` → `/books/` trailing slash.

---

## `/books/masters-x/omnibus` — JSON-LD only

Added `offers` objects to both `workExample` entries (HC, PB).

---

## `/books/hawkes-monograph` — JSON-LD only

Added `offers` objects to all three `workExample` entries (PB, HC, Ebook).

---

## Field Notes layout — `components/field-notes/FieldNoteLayout.tsx`

**New bridge callout** [CANON-SAFE]
- Before: (none — jumped from Fiction section directly to novel excerpt)
- After: Gold-bordered callout: "This history appears in the Masters X Trilogy — fiction built on the documented record above." with link to the volume page.

---

## Chamber layout — NEW `app/chamber/layout.tsx`

**New bridge footer** [CANON-SAFE]
- "The Analysis Chamber is the research companion to the Masters X Trilogy. View the Trilogy →"
