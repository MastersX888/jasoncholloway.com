# Current Status — July 12, 2026

## Live and verified ✅

| Item | Status |
|------|--------|
| `/press` → 301 to `seventhcitypress.com` | Live |
| Omniscript LLC purged from author site | Live |
| Homepage logline: "classified **acoustic** research" | Live |
| Role emails on `/contact/` and `/about/` | Live |
| Imprint site at `seventhcitypress.com` | Live |
| Press-kit PDFs with imprint URLs | Live |
| Google Merchant feed `/feeds/google-shopping.csv` | Live (do not change URLs) |
| IngramSpark buy links in `lib/data/books.ts` | Valid (200 from external network) |

Latest git commits on `main`:
- `bee00f1` — Folio visualizer Vol 2/3 image path case fix
- `01d7134` — SCP migration (imprint split, redirects, emails)
- Pushed to `https://github.com/MastersX888/jasoncholloway.com`

---

## Fixed in git, NOT yet deployed ⚠️

| Item | File | Notes |
|------|------|-------|
| Folio Visualizer broken thumbnails (Vol 2 + 3) | `lib/folios.json` | Paths were `Voynich2-009.jpg` but files are `voynich2-009.jpg`. Case-sensitive 404 on Cloudflare. **Fix committed; needs rebuild + deploy.** |

Deploy blocked locally by **low disk space** (~5.4 GB free). Clear temp caches before building.

---

## Not a website bug (user environment)

| Issue | Notes |
|-------|-------|
| IngramSpark `ERR_NETWORK_ACCESS_DENIED` | Local Brave Shields / AVG / firewall blocking `shop.ingramspark.com`. Links on site return 200 externally. |

---

## Manual / dashboard only (not code)

- Cloudflare Email Obfuscation ON for `jasoncholloway.com`
- Google Workspace: `jason@` primary + `info@`/`press@` aliases
- `www` → apex redirect ( `_redirects` rule not working; use Cloudflare Redirect Rules)
- Search Console reindex lists (see `docs/SCP_MIGRATION_STATUS.md`)
- Wikidata, Goodreads, BookBub, Amazon Author Central, Google Business Profile

---

## Two Cloudflare Pages projects

| Project | Domain | Last known deploy |
|---------|--------|-------------------|
| `jasoncholloway` | jasoncholloway.com | Manual wrangler (git push does not auto-deploy) |
| `seventhcitypress` | seventhcitypress.com | `f10dc265.seventhcitypress.pages.dev` |
