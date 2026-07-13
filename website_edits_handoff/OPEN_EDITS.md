# Open Website Edits — Priority Order

## P0 — Deploy pending fix

### 1. Folio Visualizer Vol 2/3 images
- **Already fixed** in `lib/folios.json` (commit `bee00f1`)
- **Action:** Rebuild + redeploy author site
- **Verify:** `/chamber/folio-visualizer` → filter Astronomical → V2-009/010/011 thumbnails load
- **Test URL:** `https://jasoncholloway.com/folios/voynich/Vol%202/voynich2-009.jpg` → 200

### 2. Fix build reliability
- **Problem:** `npm run build` fails on `author_patches/` TypeScript error
- **Action:** Add `"author_patches"` and `"scp_verification_return"` to `tsconfig.json` exclude
- **Verify:** `npm run build` completes; `scratch/build_export.ps1` still works

---

## P1 — Polish (code or dashboard)

### 3. www → apex redirect
- `_redirects` has rules but `www.jasoncholloway.com` and `www.seventhcitypress.com` still return 200
- **Dashboard fix:** Cloudflare → Rules → Redirect Rules → 301 www to apex
- Or investigate why Pages `_redirects` host rules aren't firing

### 4. Optional press-kit redirect
- `public/_redirects` has commented rule:
  ```
  # /press-kit/*    https://seventhcitypress.com/press-kit/:splat    301
  ```
- **Decision needed:** Enable redirect so old author `/press-kit/` URLs go to imprint?

---

## P2 — SEO / metadata (if not done manually)

### 5. Search Console reindex
**Priority 1 URLs** (request indexing):

Imprint:
```
https://seventhcitypress.com/
https://seventhcitypress.com/contact/
https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf
```

Author:
```
https://jasoncholloway.com/press/
https://jasoncholloway.com/
https://jasoncholloway.com/about/
https://jasoncholloway.com/contact/
```

### 6. Imprint OG image
- `seventhcitypress/public/og-image.png` exists but may be generic
- Consider imprint-specific OG with heptagram mark

---

## Do NOT change

- `metadataBase` on author site (`jasoncholloway.com`)
- `app/books/**` product canonicals and buy URLs (unless Jason requests)
- `public/feeds/google-shopping.csv` product URLs
- `lib/data/books.ts` IngramSpark params (verified working)
- Chamber / field-notes content pages

---

## Key files for common edits

| Task | Files |
|------|-------|
| Homepage copy | `app/page.tsx` |
| Contact emails | `app/contact/page.tsx` |
| About page | `app/about/page.tsx` |
| Nav / footer | `components/layout/Header.tsx`, `Footer.tsx` |
| JSON-LD | `app/layout.tsx` |
| Sitemap | `app/sitemap.ts` |
| Redirects | `public/_redirects` |
| Book buy links | `lib/data/books.ts`, `app/books/hawkes-monograph/page.tsx` |
| Folio visualizer | `app/chamber/folio-visualizer/page.tsx`, `lib/folios.json` |
| Imprint homepage | `seventhcitypress/app/page.tsx` |
| Imprint contact | `seventhcitypress/app/contact/page.tsx` |
