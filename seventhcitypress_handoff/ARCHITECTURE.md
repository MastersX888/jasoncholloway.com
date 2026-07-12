# Seventh City Press — Two-Project Domain Split
## Architecture · jasoncholloway.com + seventhcitypress.com

**Decision:** Two separate **Cloudflare Pages** projects. Clean imprint split.

---

## Project map

| Project | Cloudflare name | Domain(s) | Purpose |
|---------|-----------------|-------------|---------|
| **Author** | `jasoncholloway` (existing) | `jasoncholloway.com`, `www` → apex | Books, Field Notes, Chamber, feeds, author About |
| **Imprint** | `seventhcitypress` (new) | `seventhcitypress.com`, `www` → apex | Press hub, media kit, imprint identity |

---

## URL ownership after migration

| URL | Owner | Notes |
|-----|-------|-------|
| `jasoncholloway.com/` | Author | Homepage unchanged |
| `jasoncholloway.com/books/*` | Author | **Canonical product URLs** — do not move |
| `jasoncholloway.com/field-notes/*` | Author | Research archive |
| `jasoncholloway.com/chamber/*` | Author | Analysis Chamber |
| `jasoncholloway.com/feeds/google-shopping.csv` | Author | **Merchant Center** — do not move |
| `jasoncholloway.com/contact/` | Author | Author contact (optional imprint link in sidebar) |
| `jasoncholloway.com/press` | **301 → SCP** | Redirect only after imprint live |
| `jasoncholloway.com/press-kit/*` | **301 → SCP** (optional) or keep mirrored | See Phase C |
| `seventhcitypress.com/` | Imprint | Current `/press` page content at **root** |
| `seventhcitypress.com/press-kit/*` | Imprint | PDF downloads |
| `seventhcitypress.com/contact` | Imprint | Press/review-copy contact (optional) |

---

## Cross-links (required)

Imprint site uses **absolute URLs** to author storefront:

```
https://jasoncholloway.com/books/masters-x/...
https://jasoncholloway.com/chamber/research-archive
https://jasoncholloway.com/about/
```

Author site Publisher links → `https://seventhcitypress.com/`

---

## Metadata / SEO split

| Entity | `url` after migration |
|--------|------------------------|
| `Person` (Jason) | `https://jasoncholloway.com/` |
| `Organization` (Seventh City Press) | `https://seventhcitypress.com/` |
| `WebSite` (author) | `https://jasoncholloway.com/` |
| Book `publisher` | Organization @ SCP domain |
| Google Shopping `link` | Stay `jasoncholloway.com/books/...` |

---

## Build & deploy (two commands)

**Author** (unchanged pattern):
```powershell
powershell -File scratch/build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
```

**Imprint** (new):
```powershell
cd seventhcitypress
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

---

## Repo layout (target)

```
jasoncholloway/                    ← author site (existing)
  app/press/                       ← remove or redirect-only after migration
  public/_redirects                ← add /press → SCP

seventhcitypress/                  ← NEW imprint site (Claude creates)
  app/page.tsx                     ← ported press page (homepage)
  app/contact/page.tsx             ← optional imprint contact
  public/press-kit/                ← copy PDFs
  public/covers/                   ← copy cover images used on press page
  wrangler.toml                    ← pages_build_output_dir = "out"
  next.config.ts                   ← output: 'export', metadataBase: SCP
```

---

## What NOT to break

- Google Merchant feed URL on author domain
- ISBN / JSON-LD on book pages
- `metadataBase` on author site stays `jasoncholloway.com`
- Ingram / Kindle — no domain dependency on press URL

---

## Rollback

If imprint deploy fails: **do not** add `/press` redirect on author site. DNS can point SCP to a holding page until ready.
