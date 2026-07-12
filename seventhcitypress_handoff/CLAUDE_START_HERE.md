# CLAUDE — START HERE (full package, not a brief)

**You previously reported missing source files. This zip includes everything.**

1. **Extract the entire zip** before reading. Do not work from upload previews of markdown only.
2. Open `FILE_TREE.txt` — 52 files, ~15 MB. Confirm `SOURCE_*` aliases and `assets/` binaries exist on disk.
3. **Do not** scaffold a placeholder homepage. **Port** the press page from the included source.

## Required reads (in order)

1. `seventhcitypress_handoff/CONTEXT_UPDATE.md` — DNS, Gmail, Cloudflare already done
2. `seventhcitypress_handoff/CLAUDE_SCP_SITE_PROMPT.md` — mission + deliverable tree
3. `seventhcitypress_handoff/AUTHOR_SITE_MIGRATION.md` — exact author-site patches
4. `seventhcitypress_handoff/ZIP_FILE_MANIFEST.md` — full file index

## Press page — port these (aliases at zip root)

| What | Path |
|------|------|
| Page | `SOURCE_press_page.tsx` (= `reference/author_site/app/press/page.tsx`) |
| CSS | `SOURCE_press_page.module.css` (= `reference/author_site/app/press/press-page.module.css`) |
| Globals / responsive | `reference/author_site/app/globals.css`, `responsive.css` |
| Layout ref | `reference/author_site/app/layout.tsx` |

## Author patches spec

`SOURCE_AUTHOR_SITE_MIGRATION.md` (= `seventhcitypress_handoff/AUTHOR_SITE_MIGRATION.md`)

Produce `author_patches/` per that file — do not invent redirect or JSON-LD changes.

## Brand & canon

- `CANON.md`
- `design_memory/BRAND_SOURCE.md`
- `seventhcitypress_handoff/ARCHITECTURE.md`
- `seventhcitypress_handoff/KNOWN_ISSUES.md`

## Binary assets (included — not manifest-only)

- `assets/press-kit/*.pdf` — 6 PDFs
- `assets/covers/*.png` — 7 cover images
- `assets/og-image.png`, `assets/bg-rose-window.png`

## Build alignment

- `reference/author_site/package.json` + `package-lock.json`
- `reference/author_site/scripts/generate_press_kit.py` — update for SCP domain if needed

## Return

Zip name: **`seventhcitypress-site-RETURN.zip`**

Must contain:
- `seventhcitypress/` — new Next.js static export site (homepage = ported press page)
- `author_patches/` — jasoncholloway.com changes (deploy imprint **before** enabling `/press` 301)
- `SCP_MIGRATION_STATUS.md`
- `DEPLOY_NOTES.md`

## Locks

- `metadataBase: https://seventhcitypress.com`
- Contact: `press@seventhcitypress.com`
- Book links: absolute `https://jasoncholloway.com/books/...`
- Do **not** change `google-shopping.csv` or book product URLs
