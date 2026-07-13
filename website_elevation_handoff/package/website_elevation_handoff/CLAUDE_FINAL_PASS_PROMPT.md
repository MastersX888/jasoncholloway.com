# CLAUDE FINAL DEEP PASS — jasoncholloway.com

**Date:** July 10, 2026  
**Pass:** 2 of 2 (final elevation)  
**Publisher:** Seventh City Press  
**Author of record:** Jason Carroll Holloway  
**Live site:** https://jasoncholloway.com

---

## Your role

You are the lead creative director and senior copy/UX/SEO editor for **jasoncholloway.com**. Pass 1 (July 2026) shipped mobile nav, dead-link purge, contact fixes, and responsive foundations. **This is the final deep pass** — polish what remains, close structural gaps, and deliver production-ready revised files.

**You write.** Cursor integrates your `output/REVISED_FILES/` into the Next.js repo, builds, and deploys.

---

## Read first (in order)

1. `KNOWN_ISSUES_AND_FIXES.md` — **your punch list** (P0 → P2, with file paths)
2. `CANON.md` — law for ISBNs, page counts, story facts, author spelling
3. `PREVIOUS_PASS_SUMMARY.md` — what Pass 1 already changed (don't redo or break)
4. `design_memory/BRAND_SOURCE.md` — voice, palette, motifs
5. `lib/data/books.ts` + `lib/data/ingram-catalog.json` — live product metadata

---

## What “final pass” means

| Area | Goal |
|------|------|
| **Structural gaps** | `/books/` index or breadcrumb fix; omnibus in footer; footer Ingram link |
| **Schema / SEO** | `Offer` JSON-LD; breadcrumb accuracy; optional homepage OG "Available Now" |
| **Conversion loops** | Chamber → catalog; Field Notes → volume bridges |
| **Copy polish** | Remaining flat sections; CTA discipline; "Jason Carroll Holloway" everywhere visible |
| **Consistency** | Prices match IngramSpark; seventeen Hawkes novels; no phantom Amazon print |
| **Mobile** | Verify P0 routes; fix any regressions in `responsive.css` |

**Out of scope:** New features (checkout, accounts), cover art creation, encyclopedia content, novel writing, Web3Forms/MailerLite migration.

---

## Non-negotiable constraints

| Rule | Source |
|------|--------|
| **CANON.md** is law | ISBNs, page counts, story facts |
| Author display name: **Jason Carroll Holloway** | CANON §1 |
| Launch framing: **Available now** (June 2026) | CANON §1 — not "Forthcoming" |
| **Amazon = Kindle only** for Masters X (3 ASINs) | `buyLinks.ts` policy |
| Omnibus: **$29.99 HC / $19.99 PB** direct | CANON §2A — verified on IngramSpark July 2026 |
| Omnibus pages: **686 HC / 734 PB** pages | CANON §2A |
| Hawkes: **17 novels**, 129 grape count | CANON §2B; verified from `Hawkes_Monograph_V26.epub` |
| **Do not break** `/chapters-sent/` EPUB + Distribution File delivery | fixed July 2026 |
| **Do not change** Web3Forms `access_key` or redirect URLs | `NewsletterForm.tsx`, `ContactForm.tsx` |
| **Do not revert** `responsive.css` import or mobile nav | `app/layout.tsx`, `Header.tsx` |

---

## Priority routes

| Priority | Route | File |
|----------|-------|------|
| P0 | `/books/` (create or fix breadcrumbs) | new `app/books/page.tsx` or `[slug]/page.tsx` |
| P0 | `/books/masters-x/omnibus/` | `app/books/masters-x/omnibus/page.tsx` |
| P0 | `/books/masters-x/[slug]` | `app/books/masters-x/[slug]/page.tsx` |
| P0 | Footer / Header | `components/layout/Footer.tsx`, `Header.tsx` |
| P1 | `/` | `app/page.tsx` |
| P1 | `/books/masters-x/` | `app/books/masters-x/page.tsx` |
| P1 | `/books/hawkes-monograph/` | `app/books/hawkes-monograph/page.tsx` |
| P1 | `/field-notes/` + layout | `components/field-notes/FieldNoteLayout.tsx` |
| P2 | `/chamber/` | `app/chamber/layout.tsx` or shared wrapper |
| P2 | `/about/`, `/contact/`, `/press/` | respective `page.tsx` |

Data layer: `lib/data/books.ts`, `content/catalog.ts`, `lib/data/fieldNotes.ts`, `lib/data/buyLinks.ts`.

---

## Deliverables (write to `output/`)

### 1. `output/FINAL_AUDIT.md`
Page-by-page audit focused on **remaining** issues from `KNOWN_ISSUES_AND_FIXES.md`. Severity P0/P1/P2. Note what Pass 1 already fixed.

### 2. `output/COPY_REVISIONS.md`
Before/after for every changed string. Group by route. Mark `[CANON-SAFE]` or `[NEEDS AUTHOR]`.

### 3. `output/UX_AND_SEO.md`
- Navigation/footer changes shipped
- Meta title/description rewrites (full strings)
- JSON-LD `Offer` implementation notes
- Internal linking (Field Notes ↔ books ↔ chamber)
- Mobile verification notes

### 4. `output/REVISED_FILES/`
Complete revised files mirroring repo paths, e.g.:
- `output/REVISED_FILES/app/books/page.tsx`
- `output/REVISED_FILES/components/layout/Footer.tsx`

**Only include files you actually changed.**

### 5. `output/HANDOFF_STATUS.md`
Checklist completed, open `[NEEDS AUTHOR]` items, integration notes for Cursor (including PowerShell `[slug]` copy warning).

---

## Integration notes for Cursor

- Stack: **Next.js 16** App Router, static export, Cloudflare Pages
- Build: `powershell -File scratch/build_export.ps1`
- Deploy: `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`
- Google Shopping: `public/feeds/google-shopping.csv` (sync via `scripts/sync-ingram-metadata.py` if Ingram data changes)
- Site is fully static — no server APIs

---

## Brand voice (quick reference)

- Dark scriptorium: gold `#D4AA52`, cyan `#4CC9C9`
- Writer-researcher positioning, not pulp thriller
- Motifs: **111.2 Hz**, **seven** notebooks, **181** folios, SubTropolis, Strahov
- Comps: Eco, Kostova, Doerr — not Dan Brown clone voice

---

## Start here

1. Read `KNOWN_ISSUES_AND_FIXES.md` — work P0 first.
2. Audit live site mental model against package files.
3. Implement fixes in `output/REVISED_FILES/`.
4. Document everything in deliverables 1–5.
5. End with `HANDOFF_STATUS.md`.

Elevate — don't replace the thesis.
