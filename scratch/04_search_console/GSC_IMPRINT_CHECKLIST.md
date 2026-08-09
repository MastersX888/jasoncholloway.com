# GSC Imprint — seventhcitypress.com

**Status:** Pending (author domain already verified)

## Steps

1. Open [Google Search Console](https://search.google.com/search-console)
2. **Add property** → Domain → `seventhcitypress.com`
3. **Verify** (pick one):
   - **DNS TXT** (recommended if Cloudflare DNS) — add the record Google gives you
   - **HTML meta tag** — copy token → set env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` on Cloudflare Pages imprint project → redeploy
4. **Submit sitemap:** `https://seventhcitypress.com/sitemap.xml`
5. **Grant service account** (optional, for Groundswell dashboard SEO panel):
   - Add the GSC service account email as a user on the new property
   - Set `GSC_SITE_URL=sc-domain:seventhcitypress.com` or run dual fetch

## Priority URL inspection (optional)

- `https://seventhcitypress.com/`
- `https://seventhcitypress.com/catalog/`
