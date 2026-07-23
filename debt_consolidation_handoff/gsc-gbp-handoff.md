# GSC + Google Business Profile — Your Two Actions

Everything else is wired in code. You only need to log into Google twice.

---

## 1. Google Search Console (AUTH-01) — ~5 min

### Get the verification token

1. Open [Google Search Console](https://search.google.com/search-console)
2. **Add property** → URL prefix → `https://seventhcitypress.com`
3. Choose **HTML tag** verification
4. Copy only the `content="..."` value from the meta tag (not the full tag)

Example — copy `AbCdEf1234567890` from:

```html
<meta name="google-site-verification" content="AbCdEf1234567890" />
```

### Add the secret and redeploy

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
   - Name: `GOOGLE_SITE_VERIFICATION_SCP`
   - Value: paste the token
3. **Actions** → **Deploy Seventh City Press to Cloudflare Pages** → **Run workflow** (branch: `cursor/ops-dashboard-3e24` or `main` after merge)
4. Wait for deploy (~2 min)
5. Back in GSC → click **Verify**
6. **Sitemaps** → add `https://seventhcitypress.com/sitemap.xml`

---

## 2. Google Business Profile (AUTH-04) — ~15 min

1. Open [Business Profile Manager](https://business.google.com)
2. **Add profile** → **Import profiles**
3. Download Google's template first — if headers differ, copy our row from:
   - `seventhcitypress/google_business/GOOGLE_BUSINESS_IMPORT.csv`
4. Upload CSV
5. When prompted:
   - **Service-area business** — yes
   - **Service area:** Kansas City, MO metro
   - **Hide street address** from public profile (recommended)
6. Add email manually if not imported: `press@seventhcitypress.com`
7. Logo should pull from CSV: `https://seventhcitypress.com/brand/scp-logo-profile-720.png`
8. Complete verification (postcard / phone / email — Google decides)

Full reference: `seventhcitypress/google_business/IMPORT_INSTRUCTIONS.md`

---

## After both are done

| Task | Where |
|------|-------|
| Wikidata P856 | [Q140275300](https://www.wikidata.org/wiki/Q140275300) → add `https://seventhcitypress.com/` |
| Wikidata P213 | Same entry → ISNI `0000 0005 3044 7935` |
| Facebook username | Page settings → set `jasonhollowaykc` on Author Page |
