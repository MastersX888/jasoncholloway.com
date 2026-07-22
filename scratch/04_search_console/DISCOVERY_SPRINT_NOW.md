# Discovery Sprint — Do Now (15 min)

Skip Google Books Partner. Two logins, one sitting.

## 0 · Deploy logo first (if not live)

Check: https://seventhcitypress.com/brand/scp-logo-profile-720.png

If 404, either wait for GitHub Actions **Deploy Imprint Site** or run locally:

```powershell
cd seventhcitypress
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

---

## 1 · GSC Imprint (~5 min)

1. [Search Console](https://search.google.com/search-console) → **Add property**
2. **Domain** → `seventhcitypress.com`
3. **Verify** — DNS TXT on Cloudflare (recommended):
   - Cloudflare → seventhcitypress.com → DNS → Add TXT record Google gives you
   - Or HTML meta tag → copy token → Cloudflare Pages → seventhcitypress → Settings → Environment → `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → redeploy
4. **Sitemaps** → add `https://seventhcitypress.com/sitemap.xml`
5. Optional: add GSC service account user (same as author domain) for Groundswell SEO panel

---

## 2 · Google Business Profile (~10 min)

1. [Business Profile Manager](https://business.google.com) → **Add profile** → **Import profiles**
2. Upload `seventhcitypress/google_business/GOOGLE_BUSINESS_IMPORT.csv`
3. Confirm:
   - Name: Seventh City Press
   - Website: https://seventhcitypress.com/
   - Category: Book publisher
   - Service area: Kansas City, MO (hide street address if prompted)
4. Logo: CSV includes `https://seventhcitypress.com/brand/scp-logo-profile-720.png` — or upload `assets/scp-logo-profile-720.png` manually
5. Add email in UI: `press@seventhcitypress.com`
6. Complete verification (postcard / phone / email — Google decides)

---

## Done when

- [ ] GSC shows seventhcitypress.com verified + sitemap submitted
- [ ] GBP shows Seventh City Press (pending or verified)
- [ ] Ops board: mark GSC + GBP green after refresh
