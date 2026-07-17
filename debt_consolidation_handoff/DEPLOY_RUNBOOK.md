# Deploy Runbook — Seventh City Press Platform
**When to use:** Any time source changes should go live.

---

## Rule zero

**Git push does NOT deploy.** Every production update requires build + wrangler + cache purge.

---

## Author site (jasoncholloway.com)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway

# 1. Build (uses temp dir to avoid EBUSY on out/)
powershell -File scratch/build_export.ps1

# 2. Deploy
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main

# 3. Purge cache
# Cloudflare dashboard → Workers & Pages → jasoncholloway → Caching → Purge Everything
```

### Post-deploy smoke test (5 URLs)

```
https://jasoncholloway.com/
https://jasoncholloway.com/books/
https://jasoncholloway.com/press          → must 301 to seventhcitypress.com
https://jasoncholloway.com/feeds/google-shopping.csv
https://jasoncholloway.com/chamber/folio-visualizer/
```

---

## Imprint site (seventhcitypress.com)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\seventhcitypress

npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main

# Purge cache on seventhcitypress Pages project
```

### Post-deploy smoke test

```
https://seventhcitypress.com/
https://seventhcitypress.com/contact/
https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf
```

---

## www → apex redirect (Jul 17, 2026 — live)

`_redirects` in repo is **not sufficient** for www hostnames on Pages. Implemented with:

1. **Worker** `www-to-apex` in `scratch/www-redirect/` — 301 from `www.*` to apex, preserves path + query
2. **Removed** `www.jasoncholloway.com` and `www.seventhcitypress.com` from Pages custom domains (otherwise Pages serves 200 on www)
3. Worker routes (zone-level):
   - `www.jasoncholloway.com/*`
   - `www.seventhcitypress.com/*`

Redeploy worker after edits:
```powershell
cd scratch/www-redirect
$env:NODE_TLS_REJECT_UNAUTHORIZED='0'   # only if wrangler hits proxy cert errors
npx wrangler deploy
```

**Alternative (dashboard):** Redirect Rules still work if you prefer no Worker — see below.

### Redirect Rules (dashboard alternative)

### jasoncholloway.com
1. Cloudflare → jasoncholloway.com → **Rules** → **Redirect Rules** → Create
2. Name: `www to apex`
3. When: Hostname equals `www.jasoncholloway.com`
4. Then: Dynamic redirect → `https://jasoncholloway.com${uri.path}` · 301

### seventhcitypress.com
Same pattern with `www.seventhcitypress.com` → `https://seventhcitypress.com${uri.path}`

Repeat for both Pages projects if domains are attached separately.

---

## When you change X, also update Y

| You changed… | Also update… |
|--------------|--------------|
| ISBN / price / page count | `CANON.md` → `books.ts` → `ingram-catalog.json` → rebuild → `scripts/generate-google-merchant-feed.py` |
| Press-facing copy | `scripts/generate_press_kit.py` → regen PDFs → copy to `seventhcitypress/public/press-kit/` → deploy **both** sites |
| Buy link / affiliate | `lib/data/buyLinks.ts` + `books.ts` |
| New public route | `app/sitemap.ts` → build → deploy |
| Ops status | `FOUNDATION_STATUS.md` |

---

## Regenerate feeds & press kit

```powershell
# Merchant feed
python scripts/generate-google-merchant-feed.py

# Press kit PDFs
python scripts/generate_press_kit.py
```

Then rebuild and deploy.

---

## Current deploy queue (Jul 16, 2026)

Build **already succeeded** with uncommitted local changes (press kit PDFs, copy tweaks).  
**One wrangler deploy** publishes them. See `FOUNDATION_STATUS.md`.
