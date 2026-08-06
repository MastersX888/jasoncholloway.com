# SEO Fixes Applied — 2026-07-31

**Branch:** `cursor/ops-dashboard-3e24` (deploy worktree `_webfix_wt`)  
**Commit:** `f12290c` — *Unify SEO metadata, Book schema, and OG image generation across both sites*  
**Prior commits on same branch:** `ac84659` (blog redirects + HSTS), `d3e2935` (P0 binaries), `282ba47` (mobile/a11y)  
**Status:** Integrated, **not pushed**. `next build` not run — no `node_modules` in sparse worktree; C: at ~1.5 GB free.  
**Routing:** Morgan → Vivian QC → Jason evening approval

---

## What was fixed (mapped to audit)

| Audit ID | Fix | Commit |
|---|---|---|
| **P0-1** | Press-kit PDFs + EPUB lead magnet tracked via `.gitignore` negations | `d3e2935` |
| **P0-2** | Imprint JSON-LD moved to plain `<script>` in layout; shared `imprintSiteGraph` | `f12290c` |
| **P0-3** | Sitemap PDF URL resolves once binaries deploy | `d3e2935` |
| **P1-1** | Eight `/blog/` → `/field-notes/` 301 redirects in `public/_redirects` | `ac84659` |
| **P1-2** | Per-page `buildMetadata()` — `openGraph` and `twitter` derived from same inputs on ~40 pages | `f12290c` |
| **P1-3** | Blank volume OG cards — `opengraph-image.tsx` now `await params` (Next.js Promise params) | `f12290c` |
| **P1-4** | Book pages use generated 1200×630 OG routes instead of raw tall cover URLs | `f12290c` |
| **P1-5** | Unified `@id` for Person/Organization across both domains (`lib/seo/entities.ts`) | `f12290c` |
| **P1-6** | Book schema: `url`, `image`, `inLanguage`, per-edition `datePublished`, correct ReadAction targets | `f12290c` |
| **P1-7** | HSTS on both sites; field-note OG JPEG content-type override | `ac84659` |
| **P1-8** | GA4 on seventhcitypress.com (`GoogleAnalytics` + cross-domain linker) | `f12290c` |
| **P1-9** | Press-kit download event tracking (`PressKitDownloadTracker`) | `f12290c` |

---

## New / changed files

- `lib/seo/metadata.ts` — shared `buildMetadata()` helper (author site)
- `lib/seo/entities.ts` — canonical Person/Organization/WebSite graph nodes
- `lib/seo/bookSchema.ts` — `buildBookGraph()`, `mastersXSeriesNode`
- `lib/data/authorAuthority.ts` — unified `@id`s, expanded `sameAs`, series Wikidata URL
- `lib/data/books.ts` — per-edition publication dates for schema
- `seventhcitypress/lib/metadata.ts`, `entities.ts`, `analytics/gtag.ts` — imprint mirrors
- `seventhcitypress/components/analytics/` — GA4 + press-kit download events

---

## Mobile/a11y preserved

SEO integration copied staging drafts then re-applied mobile fixes on overlapping files:

- `app/contact/page.tsx` — `card-link` tap targets retained
- `app/books/masters-x/page.tsx` — omnibus `aria-label` retained
- `seventhcitypress/app/contact/page.tsx` — `resp-main-sidebar` grid retained
- `seventhcitypress/app/page.tsx` — hero press-kit `card-link` retained
- `seventhcitypress/app/globals.css` — **not overwritten** (contrast/focus token darkening from `282ba47` kept)

---

## Still open (not in this pass)

- **Google Search Console** verification meta tags — commented placeholders in both `layout.tsx` files; needs Jason token or DNS confirm
- **Rename field-note OG images** from `.png` to `.jpeg` (audit P2; `_headers` workaround in place)
- **`/privacy/` in sitemap** — audit flagged; not addressed
- **Core Web Vitals / PSI** — not measured
- **`next build` verification** — blocked on disk + install

---

## Deploy branch stack (15 commits ahead)

```
f12290c Unify SEO metadata, Book schema, and OG image generation across both sites
ac84659 Add blog-to-field-notes redirects and HSTS headers before deploy
d3e2935 Track web-deliverable public binaries so they stop 404ing in production
282ba47 Fix mobile layout blowout, focus states, and tap targets on both sites
```

Push triggers Cloudflare rebuild of **both** sites. Requires Vivian QC + Jason approval.
