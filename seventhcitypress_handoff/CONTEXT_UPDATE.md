# Context Update — July 12, 2026

**For Claude:** Jason completed infrastructure before this handoff.

## Done (do not re-instruct)

- [x] `seventhcitypress.com` added to Cloudflare (same account as `jasoncholloway.com`)
- [x] IONOS parking A/AAAA removed from Cloudflare DNS
- [x] Google Workspace MX + SPF + site verification TXT retained in Cloudflare
- [x] Nameservers switched to `kallie.ns.cloudflare.com` + `rory.ns.cloudflare.com`
- [x] Gmail tested — delivers to inbox
- [x] Zone should be **Active** (or propagating)

## Use on imprint site

- **Domain:** `https://seventhcitypress.com`
- **metadataBase:** `https://seventhcitypress.com`
- **Press contact email:** `press@seventhcitypress.com` (or `info@` — use `press@` on contact/press kit)
- **Cloudflare Pages project name:** `seventhcitypress` (new project, separate from `jasoncholloway`)

## Jason deploys after your return

```powershell
cd seventhcitypress
npm install
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

Then: Pages → Custom domains → `seventhcitypress.com` + `www`

## Author site redirect

Include `author_patches/` but **document** that Jason deploys imprint **before** enabling `/press` 301 on jasoncholloway.com.
