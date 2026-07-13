# Site Context — July 2026 (Final Pass)

## Stack
- Next.js 16 App Router, TypeScript, static export
- Fonts: Cormorant Garamond, EB Garamond, Inter, JetBrains Mono
- Hosting: Cloudflare Pages (`wrangler pages deploy out`)
- Forms: Web3Forms → redirect to `/chapters-sent/` with on-page downloads

## Recent fixes (do not regress)
- Pass 1: mobile nav, responsive.css, dead Amazon links, contact address
- Omnibus page `/books/masters-x/omnibus/` + prices $29.99 HC / $19.99 PB
- Hawkes 17 novels; homepage PB/HC/omnibus covers
- `www` → apex redirect in `public/_redirects`
- Google Merchant feed at `/feeds/google-shopping.csv` (10 print SKUs)

## Active products (US list, July 2026)
See `lib/data/ingram-catalog.json` — 14 editions including trilogy jacketed HC, omnibus 686/734.

## Deploy commands
```powershell
powershell -File scratch/build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
```

## Open items for final pass
See `KNOWN_ISSUES_AND_FIXES.md` — P0: `/books/` 404, footer Ingram link, JSON-LD Offers, omnibus nav.

## Out of scope
- Email provider migration (Web3Forms works today)
- Encyclopedia edition
- Cover art creation
