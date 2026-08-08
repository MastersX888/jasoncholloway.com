# GSC Indexing — Phase 4 Literary Showcase (2026-08-07)

**Owner:** Morgan → Jason (Search Console)  
**Sites:** jasoncholloway.com · seventhcitypress.com  
**Trigger:** Phase 4 deploy — 5 new moment pages, chronological reorder, comp pages live

## 1. Resubmit sitemaps (both properties)

| Property | Sitemap URL |
|----------|-------------|
| Author | https://jasoncholloway.com/sitemap.xml |
| Imprint | https://seventhcitypress.com/sitemap.xml |

**Search Console:** [Google Search Console](https://search.google.com/search-console) → Sitemaps → enter URL → Submit.

Bing (automated ping run by agent): `https://www.bing.com/ping?sitemap=…`

## 2. Request indexing — priority URLs (author site)

Submit via **URL Inspection** → **Request indexing** (batch over 2–3 evenings; do not spam >10/day).

### New Phase 4 moment pages

- https://jasoncholloway.com/books/masters-x/moments/the-forgetting/
- https://jasoncholloway.com/books/masters-x/moments/breitling-stopped/
- https://jasoncholloway.com/books/masters-x/moments/breitling-wound-again/
- https://jasoncholloway.com/books/masters-x/moments/pentecost-condition/
- https://jasoncholloway.com/books/masters-x/moments/breitling-eight-hertz/

### Hub + high-intent motif pages

- https://jasoncholloway.com/books/masters-x/moments/
- https://jasoncholloway.com/books/masters-x/moments/breitling-stopped/ *(Breitling SEO)*
- https://jasoncholloway.com/books/masters-x/moments/breitling-wound-again/
- https://jasoncholloway.com/books/masters-x/moments/breitling-eight-hertz/

### Comp / readalike (Phase 3 — index if not yet crawled)

- https://jasoncholloway.com/books/books-like-the-historian/
- https://jasoncholloway.com/books/literary-conspiracy-fiction/

### Redirect (verify 301 → moments hub)

- https://jasoncholloway.com/books/masters-x/reading-experience/

## 3. Full moment index (17 URLs)

```
/books/masters-x/moments/safety-deposit-box/
/books/masters-x/moments/unmapped-tunnel/
/books/masters-x/moments/technical-specifications/
/books/masters-x/moments/nadia-at-the-door/
/books/masters-x/moments/three-fragments/
/books/masters-x/moments/tuning-manual/
/books/masters-x/moments/notae-as-engineering/
/books/masters-x/moments/strahov-reading-stations/
/books/masters-x/moments/saying-113/
/books/masters-x/moments/the-forgetting/
/books/masters-x/moments/breitling-stopped/
/books/masters-x/moments/breitling-wound-again/
/books/masters-x/moments/frequency-geological/
/books/masters-x/moments/tenth-moleskine/
/books/masters-x/moments/twenty-three-candidates/
/books/masters-x/moments/pentecost-condition/
/books/masters-x/moments/breitling-eight-hertz/
```

Prefix: `https://jasoncholloway.com`

## 4. Post-submit verification (7 days)

- GSC → Pages → filter `/books/masters-x/moments/`
- Groundswell → **Moment Pages vs Volume Pages** panel (GSC aggregate)
- Branded query spot-check: `site:jasoncholloway.com Breitling Masters X`

## Agent log

- **Deploy 2026-08-08:** jasoncholloway.com Pages `a8ae136b` (554 new assets) · seventhcitypress `4d5db95c` · groundswell-monitor Worker `265ff340`
- **Cache:** Full zone purge jasoncholloway.com (zone `31d0ad31001578d17c2774d02247d568`)
- **Live check:** `/moments/` hub shows 17 scenes + Breitling URLs; sitemap.xml lists all 5 new slugs
- **Bing ping:** `bing.com/ping?sitemap=…` returns **410 Gone** (endpoint retired) — use [Bing Webmaster Tools](https://www.bing.com/webmasters) → Sitemaps instead
- **Google:** manual GSC required (no Indexing API scope for literary pages)
