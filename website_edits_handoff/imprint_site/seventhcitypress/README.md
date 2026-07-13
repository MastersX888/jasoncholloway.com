# Seventh City Press — Imprint Site

**Domain:** `seventhcitypress.com`  
**Cloudflare Pages project:** `seventhcitypress`  
**Stack:** Next.js 16 App Router · TypeScript · Static Export

---

## Deploy

```powershell
cd seventhcitypress
npm install
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

Then: Cloudflare Pages → `seventhcitypress` → Custom domains → add `seventhcitypress.com` and `www.seventhcitypress.com`.

---

## Structure

```
app/
  layout.tsx        Root layout — SCP Organization JSON-LD, fonts, header/footer
  page.tsx          Homepage = press page (ported from jasoncholloway /press)
  press-page.module.css
  contact/page.tsx  Press contact form
  sitemap.ts        /sitemap.xml
components/
  layout/
    Header.tsx      Imprint nav: Press · Catalog · Author · Contact
    Footer.tsx      Imprint footer with catalog links → jasoncholloway.com
    ContactForm.tsx Web3Forms — routes to press@seventhcitypress.com subject
public/
  covers/           Book cover PNGs (7 files)
  press-kit/        Press PDF files (6 files)
  og-image.png      OG image
  _redirects        www → apex 301
wrangler.toml
```

---

## URL rules

- All book links → `https://jasoncholloway.com/books/masters-x/...`
- Research archive → `https://jasoncholloway.com/chamber/research-archive/`
- Contact form routes subject line to `press@seventhcitypress.com`
- Press PDFs served from `/press-kit/` on this domain
- Do NOT redirect back to `jasoncholloway.com/press` (loop risk)

---

## Web3Forms

The contact form uses the existing Web3Forms `access_key`. All submissions are tagged  
`subject: "New Press Inquiry — SeventhCityPress.com"` to distinguish from author site submissions.
If you want a separate inbox routing, create a new Web3Forms key and update `ContactForm.tsx`.
