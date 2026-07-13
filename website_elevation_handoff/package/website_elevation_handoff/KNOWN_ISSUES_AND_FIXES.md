# Known Issues & Fix Instructions — jasoncholloway.com
**Prepared:** July 10, 2026 (post first elevation pass + Cursor integration)

This document is the authoritative punch list for Claude's **final deep pass**. Fix what you can in `output/REVISED_FILES/`; flag `[NEEDS AUTHOR]` for anything requiring a business decision.

---

## P0 — Broken or misleading (fix in this pass)

### 1. `/books/` breadcrumb 404
- **Symptom:** JSON-LD `BreadcrumbList` on volume pages references `https://jasoncholloway.com/books/` — route does not exist.
- **Fix options (pick one, implement fully):**
  - **A (recommended):** Create `app/books/page.tsx` — lightweight catalog index linking Masters X hub, omnibus, Hawkes monograph, and Field Notes bridge.
  - **B:** Change breadcrumb position 1 to point at `/books/masters-x/` and rename crumb to "Masters X Trilogy" on volume pages only.
- **Files:** `app/books/masters-x/[slug]/page.tsx`, new `app/books/page.tsx` if option A.

### 2. Footer IngramSpark link misleads buyers
- **Symptom:** Footer "Publisher" column links to `https://www.ingramspark.com` (print-services company), not a storefront.
- **Fix:** Replace with omnibus HC IngramSpark product URL from `books.ts` omnibus `buyLinks`, label "Buy Direct (IngramSpark)" or remove link and keep text-only imprint line.
- **Files:** `components/layout/Footer.tsx`

### 3. Omnibus missing from global nav/footer
- **Symptom:** Omnibus page exists at `/books/masters-x/omnibus/` but is not in Header nav or Footer publications list.
- **Fix:** Add "Omnibus Edition" link under Masters X in Footer; consider dropdown or secondary nav item in Header (do not overcrowd 7-item nav — footer + trilogy hub is minimum).
- **Files:** `components/layout/Footer.tsx`, optionally `components/layout/Header.tsx`

### 4. JSON-LD missing `Offer` objects
- **Symptom:** Book schema has ISBNs but no price/availability — not eligible for rich results.
- **Fix:** Add `offers` array per `workExample` using `price_*_is` from `books.ts`, `priceCurrency: "USD"`, `availability: InStock`, `url` = IngramSpark buy link.
- **Files:** `app/books/masters-x/[slug]/page.tsx`, `app/books/masters-x/omnibus/page.tsx`, `app/books/hawkes-monograph/page.tsx`

### 5. Hawkes epub back-matter typo (out of repo — flag only)
- **Symptom:** `Hawkes_Monograph_V26.epub` About the Author says "sixteen-novel corpus"; manuscript body says seventeen throughout.
- **Site status:** Website aligned to **17 novels** (CANON §2B, `books.ts`, feeds).
- **Action:** Note in `HANDOFF_STATUS.md` — author must fix `ch013.xhtml` in publishing workflow; do not revert site to sixteen.

---

## P1 — Conversion, SEO, polish

### 6. Bookshop.org ISBN search links — verify or replace
- **Symptom:** Trilogy PB links use `bookshop.org/search?keywords={ISBN}` — may not resolve to product pages.
- **Fix:** Audit each ISBN; if search fails, switch to direct product URL or remove link and keep IngramSpark + "order by ISBN" copy.
- **Files:** `lib/data/books.ts`, trilogy pages

### 7. Chamber is a cul-de-sac
- **Symptom:** Analysis Chamber tools have no path back to catalog.
- **Fix:** Add quiet footer strip on chamber layout: "Research companion to the Masters X Trilogy → View the books" linking to `/books/masters-x/`.
- **Files:** `app/chamber/layout.tsx` or shared chamber component

### 8. Field Notes → Books bridge
- **Symptom:** Field notes don't tell readers which novel uses each location.
- **Fix:** In `FieldNoteLayout`, add per-note bridge line (map in `lib/data/fieldNotes.ts` or inline table): e.g. SubTropolis → Vol I.
- **Files:** `components/field-notes/FieldNoteLayout.tsx`, `lib/data/fieldNotes.ts`

### 9. Homepage SERP "Available Now" signal
- **Symptom:** Hero says Available Now; OG title does not.
- **Fix (optional, author sign-off):** Append `· Available Now` to homepage `openGraph.title` only — not every page.
- **Files:** `app/page.tsx`

### 10. Omnibus paperback cover art
- **Symptom:** No dedicated PB omnibus cover; homepage/trilogy hub reuse HC art for PB slot.
- **Fix:** Do not fabricate art. Label honestly ("Hardcover cover shown; paperback edition uses same jacket art" OR show HC only until PB render exists). **[NEEDS AUTHOR]** if commissioning new art.

### 11. Press kit PDF currency
- **Symptom:** `public/press-kit/Masters_X_Press_Kit.pdf` may predate omnibus page, price corrections, Available Now framing.
- **Fix:** Flag for author regeneration; verify contact page download link still valid.
- **Files:** `app/contact/page.tsx`, `app/press/page.tsx`

### 12. Ebook retail channel claims
- **Symptom:** Novel pages mention EPUB distributed to "library and retail ebook systems" — verify accuracy per title.
- **Fix:** Align copy to actual distribution (Kindle only on Amazon for trilogy; Hawkes on Google Play). Remove Nook/Apple claims if unverified.
- **Files:** `app/books/masters-x/[slug]/page.tsx`, `app/books/hawkes-monograph/page.tsx`

### 13. Schema `sameAs` / Amazon Author Central
- **Status:** Unverified `amazon.com/author/jasoncholloway` already removed from about page JSON-LD.
- **Fix:** Audit all JSON-LD blocks site-wide for phantom `sameAs` URLs.

### 14. `Premium Color (70lb)` interior claim
- **Symptom:** Volume pages list interior as "Premium Color (70lb)" — verify against Ingram print specs.
- **Fix:** Match `ingram-catalog.json` format strings or remove if inaccurate. **[NEEDS AUTHOR]** if specs differ by title.

### 15. About page publisher card still says "Jason C. Holloway"
- **Symptom:** Sidebar press card uses "Jason C. Holloway, Publisher" — CANON bans "Jason C. Holloway" in display headers.
- **Fix:** Change to "Jason Carroll Holloway, Publisher".
- **Files:** `app/about/page.tsx`

---

## P2 — Nice to have

### 16. Inline style consolidation
- Hundreds of inline `style={{}}` blocks — consider extracting repeated patterns to `globals.css` / `responsive.css` utilities. Only refactor where it improves maintainability; do not rewrite entire pages for aesthetics.

### 17. Gold button discipline
- Audit pages for competing gold CTAs above the fold — one primary gold action per viewport.

### 18. Google Shopping feed link for omnibus
- **Status:** Feed now points to `/books/masters-x/omnibus/` with correct prices ($29.99 HC / $19.99 PB).
- **Verify:** Description text still accurate after any copy pass.

### 19. Device test matrix (post-integration, Cursor task)
Moto G class 412×915: trilogy hub, book detail hero, homepage featured cards, contact form, hamburger nav, no horizontal scroll on P0 routes.

---

## Already fixed (do not regress)

| Fix | Date |
|-----|------|
| `responsive.css` imported in `layout.tsx` | July 2026 |
| Mobile nav drawer in `Header.tsx` | July 2026 |
| Dead Amazon print ASINs removed; Kindle-only | July 2026 |
| Contact mailing address (Garden City, ID) | July 2026 |
| Editorial desk lat/long removed from contact | July 2026 |
| `llms.txt` Hawkes ISBN correction | July 2026 |
| `www` → apex redirect (`_redirects`) | July 2026 |
| Omnibus page `/books/masters-x/omnibus/` | July 2026 |
| Omnibus prices $29.99 HC / $19.99 PB | July 2026 |
| Hawkes novel count → 17 on site + feeds | July 2026 |
| Homepage shows PB + HC + omnibus covers | July 2026 |
| Omnibus in About Selected Works | July 2026 |

---

## Integration checklist (for Claude → Cursor handoff)

1. Place complete revised files in `output/REVISED_FILES/` mirroring repo paths.
2. PowerShell copies `[slug]` paths with `-LiteralPath` (brackets are wildcards).
3. Run `powershell -File scratch/build_export.ps1` — must pass TypeScript.
4. Deploy: `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`
5. Do **not** change Web3Forms keys, `/chapters-sent/` delivery logic, or Ingram descriptions unless author approves.
