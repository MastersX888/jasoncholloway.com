# CLAUDE — Seventh City Press Imprint Site + Author Migration

**Date:** July 11, 2026  
**Publisher:** Seventh City Press LLC  
**Author:** Jason Carroll Holloway  
**Registrar:** IONOS (`seventhcitypress.com`)  
**Hosting:** Cloudflare Pages — **new project** `seventhcitypress` (separate from `jasoncholloway`)

---

## Your role

You are the **web engineer** for a **clean two-project split**:

1. **Create** a new static Next.js site at `seventhcitypress/` — imprint homepage = current author `/press` page
2. **Patch** the existing author site (`jasoncholloway/`) for redirects and metadata — per `AUTHOR_SITE_MIGRATION.md`
3. **Do not break** Google Merchant feed, book URLs, or Field Notes / Chamber

**Cursor** (or Jason) deploys after your return. **Jason** runs DNS steps in `SETUP_GUIDE.md`.

---

## Read first (in order)

1. `CLAUDE_SCP_SITE_PROMPT.md` — this file
2. `SETUP_GUIDE.md` — human DNS/deploy order
3. `ARCHITECTURE.md` — URL ownership
4. `AUTHOR_SITE_MIGRATION.md` — author repo patches
5. `KNOWN_ISSUES.md` — locks and don't-break list
6. `reference/author_site/app/press/page.tsx` — page to port
7. `reference/author_site/app/press/press-page.module.css`
8. `design_memory/BRAND_SOURCE.md` · `CANON.md`

---

## Mission — Phase 1: New imprint site (`seventhcitypress/`)

### Stack (match author site)

- Next.js 16 App Router, TypeScript
- `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`
- Same fonts: Cormorant Garamond, EB Garamond, Inter, JetBrains Mono
- Same CSS variables / dark scriptorium aesthetic — copy minimal `globals.css` + `responsive.css` subset needed for press page

### `metadataBase`

```ts
metadataBase: new URL("https://seventhcitypress.com")
```

### Pages required

| Route | Content |
|-------|---------|
| `/` | Full press page (ported from `app/press/page.tsx`) — **homepage** |
| `/contact/` | Optional slim imprint contact (press/review copies) OR link to author contact |
| `/sitemap.xml` | Imprint sitemap (home + contact + press-kit paths) |

### Port rules for homepage

1. Copy press page layout and `press-page.module.css`
2. **Replace all internal `Link href="/books/..."`** with absolute URLs:
   - `https://jasoncholloway.com/books/masters-x/...`
3. **Replace** `Link href="/chamber/research-archive"` → `https://jasoncholloway.com/chamber/research-archive`
4. **Replace** `Link href="/contact"` → `/contact/` (imprint) or `https://jasoncholloway.com/contact/` — pick imprint `/contact/` with Web3Forms if form component can be copied; else link to author contact
5. Header/footer: **imprint-branded** — logo "Seventh City Press", nav: Press (home), Catalog → `jasoncholloway.com/books/`, Author → `jasoncholloway.com/about/`, Contact
6. Copy assets:
   - `public/press-kit/*.pdf` (all 5 files)
   - `public/covers/*` used by press gallery (book1–3, omnibus variants)
   - `public/og-image.png` or imprint-specific OG if you create one
7. `public/_redirects`:
   ```
   https://www.seventhcitypress.com/* https://seventhcitypress.com/:splat 301
   ```

### JSON-LD on imprint homepage

- `Organization` @id `https://seventhcitypress.com/#organization`, `url` = `https://seventhcitypress.com/`
- `Person` founder → `https://jasoncholloway.com/#person` (external)
- `Book` entities — same as current press page but `publisher` → SCP organization
- `WebPage` @id `https://seventhcitypress.com/`

### `wrangler.toml`

```toml
name = "seventhcitypress"
compatibility_date = "2026-06-16"
pages_build_output_dir = "out"
```

### `package.json`

- Scripts: `build`, `dev`, `lint`
- Dependencies aligned with author `package.json` versions

### Build must pass

```bash
cd seventhcitypress && npm install && npm run build
```

Output: static `out/` with `index.html`, `press-kit/`, `covers/`.

---

## Mission — Phase 2: Author site patches

Apply **every** item in `AUTHOR_SITE_MIGRATION.md` to `reference/author_site/` paths (return as `author_patches/` diff or inline revised files).

**Critical:** `public/_redirects` on author site adds `/press` → SCP **only in returned patch** — document that Jason deploys imprint **before** enabling redirect.

---

## Mission — Phase 3: Press kit generator

Update `scripts/generate_press_kit.py` footers:
- `jasoncholloway.com/press` → `seventhcitypress.com`
- Regeneration note in `YOUTUBE_STATUS.md` equivalent: `SCP_MIGRATION_STATUS.md`

---

## Deliverables (return zip)

**Zip name:** `seventhcitypress-site-RETURN.zip`

```
seventhcitypress-site-RETURN.zip
├── seventhcitypress/              ← complete new Next.js project
│   ├── app/
│   ├── public/
│   ├── wrangler.toml
│   ├── next.config.ts
│   ├── package.json
│   └── README.md
├── author_patches/                ← files to merge into jasoncholloway repo
│   ├── public/_redirects
│   ├── app/layout.tsx             ← Organization url only
│   ├── components/layout/Footer.tsx
│   ├── components/layout/Header.tsx
│   ├── app/sitemap.ts
│   ├── public/llms.txt
│   ├── app/contact/page.tsx       ← sidebar press link
│   └── scripts/generate_press_kit.py
├── SCP_MIGRATION_STATUS.md        ← checklist, deploy commands, open flags
└── seventhcitypress_handoff/
    └── DEPLOY_NOTES.md            ← anything Jason must do manually
```

---

## Quality gates

| Gate | Requirement |
|------|-------------|
| Imprint builds | `npm run build` zero errors |
| No relative book links on SCP | All catalog → jasoncholloway.com |
| Merchant safe | **No** changes to `feeds/google-shopping.csv` product URLs |
| Author metadataBase | Stays `https://jasoncholloway.com` |
| Organization schema | SCP domain on both sites (author points to SCP) |
| Redirect | `/press` 301 documented, not active until imprint verified |
| Press PDFs | Load on SCP domain |
| Register | Literary imprint — not Dan Brown tourist aesthetic |

---

## Out of scope

- IONOS DNS changes (Jason)
- Cloudflare dashboard clicks (Jason)
- Encyclopedia, YouTube, audiobook
- Moving book pages to SCP domain
- Email provider migration

---

## One-sentence brief

**Stand up `seventhcitypress.com` as its own Cloudflare Pages project with the press page at root, wire the author site to redirect `/press` and point Organization schema at the imprint — without touching book URLs or the Google Shopping feed.**
