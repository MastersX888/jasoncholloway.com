# ELEVATION III STATUS — 14-JUL-2026 (IV closure pass)

## IV Closure — 14-JUL-2026

- GA4 conversion tracking: `components/analytics/` (`G-79RDL3BDEH`), `view_item` + `begin_checkout` on book pages, `generate_lead` on `/chapters-sent/`
- Bookshop.org affiliate `126177` wired in `lib/data/buyLinks.ts` + all `books.ts` buy links (trilogy PB, omnibus PB/HC, Hawkes PB/HC)
- Bookshop list URL on trilogy hub + omnibus page (`BOOKSHOP_LIST_URL`)
- Trilogy hub Bookshop link matcher fixed (`label.startsWith("Bookshop.org")`)
- Omnibus page unified to inline two-price `TrackedBuyLink` pattern (matches `[slug]`)
- Ebook copy: trilogy digital card — Kindle on Amazon; EPUB via IngramSpark partners (removed vague “retail ebook systems”)
- `ASSET_GAP_REPORT.md` published — 0 blocking media gaps; 181/181 folio paths present locally

## Completed Tasks

- III-1A: stale footer/header sweep — 0 files matched in source (already corrected); production stale pending redeploy + cache purge
- III-1B: Bookshop.org labels updated to "Bookshop.org (Independent)" in `lib/data/books.ts` (3 links)
- III-1C: omnibus JSON-LD MSRP + two-price buy buttons — already present in source via `BuyDirectButton` + `price_*_msrp ?? price_*_is`
- III-1D: asset gap report completed (see Asset Status below)
- III-2A: chamber conversion strip added to `app/chamber/page.tsx`
- III-2B: per-note volume bridge via `lib/data/fieldNotes.ts` + `FieldNoteLayout.tsx` sidebar
- III-2C: omnibus savings narrative — already present in `omnibus/page.tsx`
- III-3A: JSON-LD sameAs audit — no unverified phantom URLs found in audited pages
- III-3B: footer IngramSpark link — not present in `Footer.tsx` (already links to seventhcitypress.com only); skipped
- III-3C: IngramSpark EPUB "sixteen novels" flag documented (see Deferred)
- III-4A: research register tokens + `data-register="research"` on FieldNoteLayout wrapper
- III-4B: about/contact CTA audit — about: 1 btn-gold (Contact Jason); contact: 1 btn-gold (Press Kit PDF) — correct
- III-4C: `.price-row`, `.price-msrp`, `.buy-direct-is` utilities added; applied in `[slug]/page.tsx` + hawkes-monograph
- III-5A–D: imprint v1.1 tokens already in source; added `.display-md`, hero press-kit link, mobile-nav active gold
- III-6A: reduced-motion guard merged (animate-fade-up, artifact-strip, cover-object)
- III-6B: 412px artifact-item + 480px buy-direct-is/btn full-width rules added; chamber layer-card selector not present — skipped
- III-6C: mobile CTA audit documented (see Mobile CTA Audit)
- Folio `beineckeRef`: 166/166 Voynich rows mapped in `lib/folios.json` (commit `e4f9cc9`)
- SubTropolis field note: Great Big Story YouTube embed (`b1YDufouqbY`) + VideoObject JSON-LD

## Deferred — [NEEDS AUTHOR]

- ~~Bookshop.org affiliate ID~~ — **complete**: `126177` in `buyLinks.ts` + `books.ts` (14-JUL-2026)
- IngramSpark EPUB description: "sixteen" → "seventeen-novel corpus" (ISBN 9798295778926) — fix in IngramSpark dashboard
- ~~Visual folio verification~~ — **complete**: 166/166 Voynich rows have `beineckeRef` in `lib/folios.json` (130 distance-0 auto + 34 distance-2 finish + `v3-052` corrected to `f85v-86r`)
- E: drive asset copy: `/media/THE_CITY_BENEATH_KANSAS_CITY.mp4` — **resolved**: SubTropolis field note now embeds Great Big Story YouTube (`b1YDufouqbY`) with attribution + VideoObject JSON-LD

## Asset Status

### Present in public/

- `/bg-cathedral-rose-window.png`
- `/covers/book1-paperback.png`, `/covers/book1-hardcover-v3.png`
- `/covers/book2-paperback.png`, `/covers/book2-hardcover-v3.png`
- `/covers/book3-paperback.png`, `/covers/book3-hardcover-v3.png`
- `/covers/omnibus-hardcover-v3.png`
- `/covers/hawkes-paperback.png`, `/covers/hawkes-hardcover.png`, `/covers/hawkes-paperback-web.png`
- `/media/JasonCHolloway-v2.png`, `/media/qr1.png`, `/media/qr2.png`, `/media/qr3.png`
- `/field-notes/subtropolis-entrance.jpg`, `/field-notes/voynich-folio-thumb.jpg`
- `/og/field-notes/*.png` (all 12 hub + note OG images)
- `/og-image.png`
- `/press-kit/Masters_X_Press_Kit.pdf` (+ synopses, bios, fact sheet, press release)
- `/downloads/The_Distribution_File.pdf`
- `/folios/**` (Voynich + Ars Notoria folio images referenced in chamber)

### Missing from public/ — search E: drive

_(none blocking — SubTropolis video served via YouTube embed)_

### [NEEDS AUTHOR] — cannot resolve without E: drive access

_(SubTropolis MP4 no longer required)_

## JSON-LD · [NEEDS AUTHOR] — unverified sameAs URLs

None flagged. Audited URLs in `app/layout.tsx`, `app/about/page.tsx`, `app/page.tsx`, `app/books/masters-x/[slug]/page.tsx`, `app/books/masters-x/omnibus/page.tsx`, `app/books/hawkes-monograph/page.tsx`:

- `goodreads.com/author/show/20924993` — external, valid domain ✓
- `seventhcitypress.com` — publisher site ✓
- `amazon.com/dp/{ASIN}` — Kindle buy targets ✓
- `shop.ingramspark.com` — direct buy URLs ✓
- `jasoncholloway.com` canonical paths — site-owned ✓

## Mobile CTA Audit

Pages with multiple `btn-gold` elements visible in the same ~100vh zone at ≤768px (author review only — no JSX changes made):

| Route | Violation | Details |
|-------|-----------|---------|
| `/` | Yes | "Explore Masters X" + "Hawkes Monograph" gold CTAs in paired catalog cards (same section) |
| `/books/masters-x/` | Yes | Each volume card: Kindle + Buy Direct gold buttons; 3 cards stack in viewport |
| `/books/masters-x/the-grimoire/` | Yes | Hero: Kindle + IngramSpark PB/HC buy-direct gold buttons simultaneously visible |
| `/books/masters-x/omnibus/` | Yes | Hero: two gold `buy-direct-is` PB/HC buttons side-by-side (14-JUL-2026 inline two-price) |
| `/books/hawkes-monograph/` | Yes | PB + HC edition cards each with gold buy-direct buttons side-by-side |
| `/chamber/` | No | Conversion strip: 1 gold + 1 outline |

## Build Output

- TypeScript: **0 errors** (`npx tsc --noEmit`)
- Author routes: **~48** static/SSG routes (38 HTML files in `out/`)
- Imprint routes: **5** (`/`, `/_not-found`, `/contact`, `/sitemap.xml` — 4 content pages)
- Author deploy: `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`
- Imprint deploy: `cd seventhcitypress && npx wrangler pages deploy out --project-name=seventhcitypress --branch=main`
- **Latest author deploy:** `https://95deea44.jasoncholloway.pages.dev` (14-JUL-2026, `a4c5eba`)
- **Post-deploy:** Purge all cache on both Cloudflare Pages projects
