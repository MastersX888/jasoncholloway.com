# ZIP File Manifest — Read This First

**Everything Claude needs is inside this zip.** Extract fully before starting.

## Start here

0. `CLAUDE_START_HERE.md` (zip root) — full package confirmation
1. `seventhcitypress_handoff/CLAUDE_SCP_SITE_PROMPT.md`
2. `seventhcitypress_handoff/CONTEXT_UPDATE.md`
3. `seventhcitypress_handoff/AUTHOR_SITE_MIGRATION.md`

## Press page source (PORT — do not rewrite from scratch)

| File | Path in zip |
|------|-------------|
| Press page | `reference/author_site/app/press/page.tsx` |
| Press CSS | `reference/author_site/app/press/press-page.module.css` |
| Globals | `reference/author_site/app/globals.css` |
| Responsive | `reference/author_site/app/responsive.css` |
| Author layout | `reference/author_site/app/layout.tsx` |
| Contact page ref | `reference/author_site/app/contact/page.tsx` |
| Header | `reference/author_site/components/layout/Header.tsx` |
| Footer | `reference/author_site/components/layout/Footer.tsx` |
| ContactForm | `reference/author_site/components/layout/ContactForm.tsx` |

## Brand & canon

| File | Path in zip |
|------|-------------|
| CANON | `CANON.md` |
| Brand | `design_memory/BRAND_SOURCE.md` |
| Site context | `website_elevation_handoff/SITE_CONTEXT.md` |

## Handoff specs

| File | Path in zip |
|------|-------------|
| Architecture | `seventhcitypress_handoff/ARCHITECTURE.md` |
| Author patches | `seventhcitypress_handoff/AUTHOR_SITE_MIGRATION.md` |
| Known issues | `seventhcitypress_handoff/KNOWN_ISSUES.md` |
| Setup guide | `seventhcitypress_handoff/SETUP_GUIDE.md` |

## Build reference

| File | Path in zip |
|------|-------------|
| package.json | `reference/author_site/package.json` |
| next.config.ts | `reference/author_site/next.config.ts` |
| wrangler.toml | `reference/author_site/wrangler.toml` |
| Press kit script | `reference/author_site/scripts/generate_press_kit.py` |

## Binary assets (included in zip)

| Asset | Path in zip |
|-------|-------------|
| Press kit PDFs (5) | `assets/press-kit/*.pdf` |
| Cover images (7) | `assets/covers/*.png` |
| OG image | `assets/og-image.png` (if present) |

## Return

`seventhcitypress-site-RETURN.zip` per `CLAUDE_SCP_SITE_PROMPT.md`
