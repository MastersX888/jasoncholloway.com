# Google Search Console Manual Steps

## Task 1: Submit Sitemap

1. **Navigate to GSC**
   - Go to: https://search.google.com/search-console
   - Sign in with your Google account (zh5779485@gmail.com)
   - Select property: `sc-domain:jasoncholloway.com` (or `https://jasoncholloway.com`)

2. **Submit Sitemap**
   - In the left sidebar, click **Sitemaps**
   - In the "Add a new sitemap" field, enter: `sitemap.xml`
   - Click **Submit**
   - Status should show "Success" after processing

## Task 2: Request Indexing for Blog URLs (Optional - Speeds Up Discovery)

Use the **URL Inspection Tool** for each URL below:

### Method A: URL Inspection Tool (Recommended)
1. Copy a URL from the list below
2. Paste into the search bar at the top of GSC
3. Wait for inspection to complete
4. Click **Request Indexing**
5. Repeat for each URL

### URLs to Submit (7 total)

```
https://jasoncholloway.com/blog/the-frequency-that-was-already-there/
https://jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/
https://jasoncholloway.com/blog/sound-into-form-hans-jenny/
https://jasoncholloway.com/blog/why-kansas-city/
https://jasoncholloway.com/blog/three-factions-one-declassified-document/
https://jasoncholloway.com/blog/the-stone-remembers/
https://jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/
```

### Method B: Wait for Google to Crawl (Alternative)
- Once the sitemap is submitted, Google will automatically discover these URLs
- Typically takes 1-3 days for initial crawl
- Check the **Coverage** report in GSC to monitor progress

## Task 3: Verify Imprint SCP Verification (If Pending)

If the Imprint property verification is still pending:

1. Check `GOOGLE_SITE_VERIFICATION_SCP` environment variable or meta tag
2. See details in: `debt_consolidation_handoff/gsc-gbp-handoff.md`

---

## Notes

- **Author property**: sc-domain:jasoncholloway.com
- **Sitemap URL**: https://jasoncholloway.com/sitemap.xml (includes /blog/ index + all 7 blog posts)
- **GSC API**: Not configured yet (would need `.gsc-credentials.json` for programmatic submission)
