# Deploy Notes — Seventh City Press
**For:** Jason Carroll Holloway  
**Date:** July 12, 2026

---

## What Claude built

```
seventhcitypress/              ← complete new Next.js project (deploy first)
author_patches/                ← files to merge into jasoncholloway repo (deploy second)
SCP_MIGRATION_STATUS.md        ← full checklist with open flags
```

---

## Step 1 — Merge `seventhcitypress/` into your repo

Copy the `seventhcitypress/` folder into:
```
C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\seventhcitypress\
```

The folder is a **standalone Next.js project** — it has its own `package.json`, `next.config.ts`, `tsconfig.json`, and `wrangler.toml`. It does **not** share `node_modules` with the parent `jasoncholloway` project.

---

## Step 2 — Build and verify locally

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\seventhcitypress
npm install
npm run build
```

Build output goes to `out/`. Open `out/index.html` in a browser to do a quick sanity check — covers and layout should render (images may be broken in file:// mode; that's fine).

---

## Step 3 — Deploy imprint to Cloudflare Pages

```powershell
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

Note the `*.pages.dev` URL Wrangler prints. Open it and confirm:
- Press homepage loads with hero, cover gallery, press release, and download buttons
- `/contact/` loads and form renders
- `/press-kit/Masters_X_Press_Kit.pdf` downloads

---

## Step 4 — Attach custom domain in Cloudflare dashboard

1. Cloudflare → Workers & Pages → **seventhcitypress** → Custom domains
2. Add `seventhcitypress.com`
3. Add `www.seventhcitypress.com` (Cloudflare will offer to set up a redirect — accept it, or the `_redirects` file handles it)
4. Wait for SSL to show **Active** (usually 2–5 minutes on same-account domains)
5. Verify: `https://seventhcitypress.com/` loads press page

---

## Step 5 — Merge `author_patches/` into jasoncholloway repo

Merge these files (overwrite existing):

| Patch file | Destination in jasoncholloway repo |
|------------|-------------------------------------|
| `author_patches/public/_redirects` | `public/_redirects` |
| `author_patches/app/layout.tsx` | `app/layout.tsx` |
| `author_patches/components/layout/Header.tsx` | `components/layout/Header.tsx` |
| `author_patches/components/layout/Footer.tsx` | `components/layout/Footer.tsx` |
| `author_patches/app/sitemap.ts` | `app/sitemap.ts` |
| `author_patches/app/contact/page.tsx` | `app/contact/page.tsx` |
| `author_patches/public/llms.txt` | `public/llms.txt` |
| `author_patches/scripts/generate_press_kit.py` | `scripts/generate_press_kit.py` |

⚠️ **The `/press` 301 in `_redirects` is already uncommented.** Only deploy the author patches after the imprint is live and verified.

---

## Step 6 — Deploy author site

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
powershell -File scratch/build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
```

---

## Step 7 — Verify redirects

```
curl -I https://jasoncholloway.com/press
# → HTTP/2 301, Location: https://seventhcitypress.com/

curl -I https://jasoncholloway.com/books/masters-x/omnibus/
# → HTTP/2 200  (must NOT be redirected)

curl -I https://jasoncholloway.com/feeds/google-shopping.csv
# → HTTP/2 200  (must NOT be redirected)
```

---

## Step 8 — Post-deploy housekeeping

1. **Regenerate press kit PDFs** (footer URLs updated):
   ```powershell
   cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
   python scripts/generate_press_kit.py
   # Then redeploy author site to pick up new PDFs in public/press-kit/
   # And copy updated PDFs to seventhcitypress/public/press-kit/ + redeploy imprint
   ```

2. **Google Search Console** — add `seventhcitypress.com` property; submit `https://seventhcitypress.com/sitemap.xml`

3. **Wikidata Q140275300** — add `official website` P856 = `https://seventhcitypress.com/`

4. **Groundswell `terms.json`** — enable `seventhcitypress.com` as a tier-3 monitoring term

---

## What was NOT changed

| Area | Status |
|------|--------|
| `metadataBase` on author site | Unchanged — stays `https://jasoncholloway.com` |
| `app/books/**` | Unchanged — all product canonicals intact |
| `public/feeds/google-shopping.csv` | Unchanged — Merchant Center safe |
| `lib/data/books.ts` buy links | Unchanged |
| `app/chamber/**` | Unchanged |
| `app/field-notes/**` | Unchanged |
| `app/press/page.tsx` | Left in place — redirect in `_redirects` intercepts it; delete when convenient |

---

## Contact form note

The imprint contact form uses your existing Web3Forms access key (`29ea1914-...`).  
Submissions from the imprint are tagged `subject: "New Press Inquiry — SeventhCityPress.com"` to distinguish them from author site submissions in your Web3Forms inbox.  
If you want a completely separate routing, create a second Web3Forms key at web3forms.com and replace the `access_key` in `seventhcitypress/components/layout/ContactForm.tsx`.
