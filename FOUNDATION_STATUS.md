# Foundation Status — Single Source of Truth
**Last updated:** July 17, 2026 (deploy + www redirect complete)  
**Supersedes for ops:** `website_edits_handoff/CURRENT_STATUS.md`, `ELEVATION_III_STATUS.md` (historical detail retained there)

---

## Live health (verified Jul 16, 2026)

| Check | Result |
|-------|--------|
| https://jasoncholloway.com/ | 200 |
| https://seventhcitypress.com/ | 200 |
| https://jasoncholloway.com/books/ | 200 (catalog index exists) |
| https://jasoncholloway.com/books/masters-x/omnibus/ | 200 |
| https://jasoncholloway.com/chamber/folio-visualizer/ | 200 |
| https://jasoncholloway.com/feeds/google-shopping.csv | 200 |
| https://jasoncholloway.com/press → SCP | 301 |
| https://jasoncholloway.com/press-kit/*.pdf → SCP | 301 → 200 |
| Folio Vol 2 images (lowercase) | 200 |
| Folio Vol 3 images (vol3-*.jpg) | 200 |
| GA4 on live homepage | Present (`G-79RDL3BDEH`) |
| Bookshop affiliate on live | Present |
| JSON-LD `Offer` on book pages | Present |

### www → apex (fixed Jul 17, 2026)

| Check | Result |
|-------|--------|
| https://www.jasoncholloway.com/ | **301** → apex |
| https://www.seventhcitypress.com/ | **301** → apex |

Implemented via Cloudflare Worker `www-to-apex` (`scratch/www-redirect/`). www hostnames were removed from Pages custom domains so the Worker route handles redirects; `_redirects` alone is not sufficient for www on Pages.

### Recently completed (Jul 16 — see peg board)

| Item | Status |
|------|--------|
| Google Play Books | 4 titles uploaded — **pending account review** |
| Google Merchant Center | **10/10 approved, all live** — acct 5822707674, no pending issues |
| ISNI | **On site JSON-LD** — 0000 0005 3044 7935 (Wikidata P213 manual) |
| Bing Webmaster | Both sitemaps submitted |
| Brave Web Discovery | Enabled + crawled |
| Ops peg board | `debt_consolidation_handoff/scp-peg-board.jsx` |

---

## Build & deploy state

| Item | Status |
|------|--------|
| TypeScript (`npx tsc --noEmit`) | 0 errors |
| Static build (`scratch/build_export.ps1`) | **Succeeded** Jul 16, 2026 · 48 routes |
| Built output | Merged into `out/` |
| Wrangler deploy | **Blocked** — `CLOUDFLARE_API_TOKEN` not set in agent environment |
| Git | `main` tracking `origin/main` · **uncommitted local changes** (press kit PDFs, book page copy, llms.txt) |

**Action for Jason:** Run deploy locally after reviewing uncommitted diff:
```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
# Then: Cloudflare dashboard → both Pages projects → Purge All Cache
```

---

## What's fixed in source (may need deploy)

Uncommitted working tree includes:
- Regenerated press kit PDFs (`public/press-kit/*.pdf`)
- Book page / homepage copy tweaks
- `public/llms.txt` updates
- `lib/data/buyLinks.ts` additions

Build already merged these into `out/` — **one wrangler deploy publishes them**.

---

## Resolved from old punch lists (no longer open)

| Former issue | Status |
|--------------|--------|
| `/books/` 404 | Fixed — live 200 |
| Footer bad IngramSpark link | Fixed — no ingramspark.com in Footer |
| Omnibus missing from footer | Fixed — link present |
| JSON-LD missing Offers | Fixed — live on book pages |
| Folio case sensitivity (Vol 2) | Fixed — live lowercase paths work |
| `app/press/` dead route | Already removed from source |
| Groundswell `seventhcitypress.com` term | Already enabled in `terms.json` |
| Elevation IV (GA4, Bookshop) | Live on production |

---

## Open foundation items (prioritized)

### P0 — Do before expansion
1. **Deploy** built `out/` (wrangler + cache purge) — see `BATCH_SPRINT.md` Block A
2. **Batch upload sprint** — Google Play + Merchant + GBP + GSC + Wikidata in one session
3. **www → apex** redirect rules in Cloudflare dashboard (both domains)
4. **Commit** or discard uncommitted working tree changes

### P1 — Dashboard (Jason manual)
4. Add `seventhcitypress.com` to Google Search Console + submit sitemap *(HTML meta tag ready via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)*
5. ~~Wikidata Q140275300 — P856~~ **done** (Jul 22 — includes seventhcitypress.com)
6. Google Business Profile import (`seventhcitypress/google_business/`) — CSV + logo URL ready
7. ~~ISNI registration~~ **done** (0000 0005 3044 7935 on site + Open Library)
8. ~~Open Library author + 15 ISBNs~~ **done** (Jul 22)
9. Hawkes EPUB "sixteen novels" fix in IngramSpark dashboard

### P2 — Creative pipelines (not blocking web foundation)
9. Encyclopedia print (BookVault)
10. Audiobook → Audible/ACX
11. YouTube channel creation

---

## Canonical files (when something changes, update these)

| Change type | Update |
|-------------|--------|
| ISBN, price, page count | `CANON.md` → `lib/data/books.ts` → `lib/data/ingram-catalog.json` → rebuild → Merchant feed regen |
| Press copy | `scripts/generate_press_kit.py` → regen PDFs → deploy both sites |
| New route/page | source → build → deploy author site |
| Imprint-only change | `seventhcitypress/` → build → deploy imprint project |
| Public AI summary | `public/llms.txt` |
| Ops status | **this file** |

---

## Quick reference

| Property | Deploy command |
|----------|----------------|
| Author | `powershell -File scratch/build_export.ps1` then `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main` |
| Imprint | `cd seventhcitypress; npm run build; npx wrangler pages deploy out --project-name=seventhcitypress --branch=main` |

GitHub: https://github.com/MastersX888/jasoncholloway.com  
Package for Claude: `debt_consolidation_handoff/`
