# Claude — Website Edits Handoff
**Date:** July 12, 2026  
**Author:** Jason Carroll Holloway / Seventh City Press LLC  
**Repo:** `jasoncholloway.com` (author + bookstore) + `seventhcitypress.com` (imprint)

---

## Your job

Draft and apply **exact website code changes** for the two Cloudflare Pages sites. Read `CURRENT_STATUS.md` and `OPEN_EDITS.md` first.

**Do not break:**
- `jasoncholloway.com/feeds/google-shopping.csv` (Google Merchant Center)
- All `/books/*` product URLs and buy links
- Author `metadataBase` stays `https://jasoncholloway.com`

---

## Two sites, one repo

| Site | Domain | Project folder | Cloudflare project |
|------|--------|----------------|-------------------|
| Author | jasoncholloway.com | repo root (`app/`, `components/`, `lib/`) | `jasoncholloway` |
| Imprint | seventhcitypress.com | `seventhcitypress/` | `seventhcitypress` |

Deploy is **manual** (not git auto-deploy):

```powershell
# Author site
powershell -ExecutionPolicy Bypass -File scratch\build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main

# Imprint site
cd seventhcitypress
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

If wrangler fails with `fetch failed`, try: `$env:NODE_TLS_REJECT_UNAUTHORIZED = '0'` (corporate proxy).

---

## Package layout

```
website_edits_handoff/
├── CLAUDE_START_HERE.md          ← this file
├── CURRENT_STATUS.md             ← what's done vs pending
├── OPEN_EDITS.md                 ← prioritized edit queue
├── author_site/                  ← key author-site source (mirror of repo paths)
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/_redirects
│   └── public/llms.txt
├── imprint_site/seventhcitypress/ ← standalone imprint project
├── docs/                         ← migration + deploy notes
└── deploy/build_export.ps1
```

---

## Build gotcha (fix this)

`npm run build` at repo root **fails TypeScript** because `author_patches/` is included in `tsconfig.json` (`**/*.tsx`) but `author_patches/components/layout/Footer.tsx` imports `./NewsletterForm` which doesn't exist in that folder.

**Options:**
1. Add `"author_patches"` to `tsconfig.json` `exclude` array (recommended — patches are reference only)
2. Or delete `author_patches/` after merge (already applied to live source)

`scratch/build_export.ps1` copies only production dirs and avoids this — prefer that script for author deploys.

---

## Email placement (locked decision)

| Address | Site |
|---------|------|
| `press@seventhcitypress.com` | Imprint only |
| `info@seventhcitypress.com` | Author `/contact/` |
| `jason@seventhcitypress.com` | Author `/contact/` + `/about/` |

---

## Report back with

1. Files changed (paths + one-line why)
2. Build output (route count, any errors)
3. Post-deploy verification URLs
4. Anything you could not complete
