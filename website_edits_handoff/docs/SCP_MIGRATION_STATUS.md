# SCP Migration Status
**Generated:** July 12, 2026  
**Project:** `seventhcitypress.com` imprint split from `jasoncholloway.com`

---

## Phase Checklist

### Phase 1 — Imprint site build (Claude return)
- [x] `seventhcitypress/` Next.js project scaffolded
- [x] Homepage = press page ported from `app/press/page.tsx`
- [x] All book `Link href` → absolute `https://jasoncholloway.com/books/masters-x/...`
- [x] Chamber link → `https://jasoncholloway.com/chamber/research-archive/`
- [x] `/contact/` → imprint contact page with ContactForm
- [x] JSON-LD: Organization `@id` = `https://seventhcitypress.com/#organization`
- [x] JSON-LD: Person founder → `https://jasoncholloway.com/#person` (external)
- [x] JSON-LD: Book publisher → SCP organization
- [x] Header: imprint nav (Press · Catalog · Author · Contact)
- [x] Footer: catalog links → jasoncholloway.com
- [x] `metadataBase` = `https://seventhcitypress.com`
- [x] `wrangler.toml` — project-name `seventhcitypress`
- [x] `public/_redirects` — www → apex 301
- [x] `public/covers/` — 7 cover PNGs included
- [x] `public/press-kit/` — 6 PDF files included
- [x] `public/og-image.png` included
- [x] `app/sitemap.ts` — home + contact + press-kit PDF

### Phase 2 — Author site patches (author_patches/)
- [x] `public/_redirects` — `/press` and `/press/` → SCP 301 (⚠️ deploy after imprint verified)
- [x] `app/layout.tsx` — Organization `url` → `https://seventhcitypress.com/`
- [x] `app/layout.tsx` — Person `sameAs` adds `https://seventhcitypress.com/`
- [x] `components/layout/Header.tsx` — Press nav → external `<a>` to SCP
- [x] `components/layout/Footer.tsx` — Publisher link → SCP
- [x] `app/sitemap.ts` — `/press` entry removed
- [x] `app/contact/page.tsx` — sidebar press link → SCP
- [x] `public/llms.txt` — Publisher URL → `https://seventhcitypress.com/`
- [x] `scripts/generate_press_kit.py` — footer URLs → `seventhcitypress.com`

### Phase 3 — Post-deploy (Jason)
- [ ] `npm run build` passes in `seventhcitypress/` locally
- [ ] `wrangler pages deploy out --project-name=seventhcitypress`
- [ ] Cloudflare Pages → Custom domains → `seventhcitypress.com` + `www`
- [ ] SSL Active on both hostnames
- [ ] Verify: `https://seventhcitypress.com/` loads press page
- [ ] Verify: `https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf` downloads
- [ ] Book links on SCP → jasoncholloway.com/books/ (check network tab)
- [ ] **Then** deploy author site patches
- [ ] Verify: `https://jasoncholloway.com/press` → 301 → `https://seventhcitypress.com/`
- [ ] Verify: `https://jasoncholloway.com/books/masters-x/omnibus/` → 200 (not redirected)
- [ ] Verify: `https://jasoncholloway.com/feeds/google-shopping.csv` → 200
- [ ] Rich Results Test: `jasoncholloway.com` Organization url = `https://seventhcitypress.com/`
- [ ] Add `seventhcitypress.com` to Google Search Console; submit `/sitemap.xml`
- [ ] Update Wikidata Q140275300: add `official website` = `https://seventhcitypress.com/`
- [ ] Regenerate press kit PDFs: `python scripts/generate_press_kit.py`
- [ ] Enable Groundswell `terms.json` tier-3 term: `seventhcitypress.com`

---

## Open Flags

| # | Flag | Decision needed |
|---|------|----------------|
| 1 | Web3Forms key | Both sites share the same access key. Submissions are distinguished by subject line (`"New Press Inquiry — SeventhCityPress.com"` vs `"New Contact Form Submission — JasonCHolloway.com"`). If you want separate routing/inboxes, create a new Web3Forms key and update `seventhcitypress/components/layout/ContactForm.tsx`. |
| 2 | `/press-kit/*` redirect on author | Currently commented out in `author_patches/public/_redirects`. Enable if you want all PDF traffic canonical on SCP. Leave disabled to serve PDFs from both domains (fine for now — no SEO penalty for PDF duplication). |
| 3 | `app/press/page.tsx` on author | Migration doc recommends deleting the route after redirect is live. Cloudflare Pages `_redirects` will intercept `/press` before Next.js serves the page, so the page is dead weight. Safe to delete `app/press/` directory on next author repo cleanup. |
| 4 | OG image | SCP uses the same `og-image.png` from the author site. Consider creating an imprint-specific OG image (SCP wordmark on dark background) for cleaner social previews from the imprint domain. |
| 5 | Newsletter form | The imprint contact page has no newsletter signup (by design — that lives on the author site). Confirm this is intentional or add `NewsletterForm` to the SCP footer. |

---

## Deploy commands (copy-paste)

```powershell
# ── Imprint (deploy first) ───────────────────────────────────────
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\seventhcitypress
npm install
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main

# ── Author site (deploy after imprint verified) ──────────────────
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
# Merge author_patches/ into repo, then:
powershell -File scratch/build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
```

---

## Verification URLs

```
https://seventhcitypress.com/                                → 200  press homepage
https://seventhcitypress.com/contact/                        → 200  contact form
https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf → 200 PDF download
https://www.seventhcitypress.com/                            → 301 → apex

https://jasoncholloway.com/press                             → 301 → https://seventhcitypress.com/
https://jasoncholloway.com/press/                            → 301 → https://seventhcitypress.com/
https://jasoncholloway.com/books/masters-x/omnibus/          → 200 (must NOT redirect)
https://jasoncholloway.com/feeds/google-shopping.csv         → 200 (must NOT redirect)
https://jasoncholloway.com/chamber/research-archive/         → 200 (must NOT redirect)
```
