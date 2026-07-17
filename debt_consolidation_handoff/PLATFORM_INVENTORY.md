# Platform Inventory — Trilogy & Seventh City Press
**Snapshot:** July 16, 2026 (post live audit)  
**Repo:** `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\`  
**Live verification:** See `AUDIT_REPORT.md` · **Ops status:** `../FOUNDATION_STATUS.md`

### Audit highlights (Jul 16, 2026)
- Both sites: **200 OK**
- `/books/`, omnibus, chamber, merchant feed: **200 OK**
- Imprint redirects (`/press`, `/press-kit/*`): **working**
- www hostnames: **NOT redirecting** (P0 dashboard fix)
- Build: **48 routes succeeded** · deploy pending
- GA4 + Bookshop: **on live production**

---

## 1. OWNED PROPERTIES (you control the domain/code)

### 1A. Websites

| ID | Name | URL | Repo path | Deploy | Last known deploy |
|----|------|-----|-----------|--------|-------------------|
| WEB-A | Author site | https://jasoncholloway.com | `/` (repo root) | `npx wrangler pages deploy out --project-name=jasoncholloway` | `95deaa44.jasoncholloway.pages.dev` (Jul 14, 2026) |
| WEB-B | Imprint site | https://seventhcitypress.com | `/seventhcitypress/` | `cd seventhcitypress && npx wrangler pages deploy out --project-name=seventhcitypress` | `f10dc265.seventhcitypress.pages.dev` |

**Stack (both):** Next.js 16 App Router, TypeScript, `output: 'export'`, Cloudflare Pages, Web3Forms.

**Build command (author):** `powershell -File scratch/build_export.ps1`

**Important:** Git push to GitHub does **not** trigger deploy. Every code change requires manual build + Wrangler deploy + cache purge.

### 1B. Author site route map

| Route | Purpose |
|-------|---------|
| `/` | Homepage — catalog cards, hero |
| `/about/` | Author bio, publisher card |
| `/contact/` | Contact form, press kit download, role emails |
| `/books/` | Catalog index |
| `/books/masters-x/` | Trilogy hub |
| `/books/masters-x/the-inheritance-of-frequency/` | Vol I |
| `/books/masters-x/the-grimoire/` | Vol II |
| `/books/masters-x/the-kingdom/` | Vol III |
| `/books/masters-x/omnibus/` | Omnibus edition |
| `/books/hawkes-monograph/` | Hawkes critical monograph |
| `/books/books-like-foucaults-pendulum/` | SEO comparison page |
| `/chamber/` | Analysis Chamber hub |
| `/chamber/folio-visualizer/` | Voynich folio explorer |
| `/chamber/global-map/` | Geographic research map |
| `/chamber/harmonic-stack/` | Frequency stack tool |
| `/chamber/harmonic-derivations/` | Harmonic derivations |
| `/chamber/reading-sequence/` | Reading order tool |
| `/chamber/research-archive/` | Research archive |
| `/chamber/schumann-baseline/` | Schumann baseline tool |
| `/chamber/tremor-analysis/` | Tremor analysis tool |
| `/field-notes/` | Real-history article hub |
| `/field-notes/{12 slugs}/` | Individual Field Notes |
| `/chapters-sent/` | Post-form thank-you + downloads |
| `/feeds/google-shopping.csv` | Google Merchant Center product feed |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | SEO / AI discovery |

**Field Notes slugs:** subtropolis, 111-hz, voynich-manuscript, ars-notoria, strahov-monastery, codex-gigas, kansas-city-locations, oscar-01, u2-test-pilots, cymatics, gospel-of-thomas, meramec-caverns

### 1C. Imprint site routes

| Route | Purpose |
|-------|---------|
| `/` | Press homepage (catalog, author link, press kit) |
| `/contact/` | Press inquiries form |
| `/press-kit/*.pdf` | 6 press PDFs |
| `/sitemap.xml` | Sitemap |

### 1D. Redirects (author site `_redirects`)

| From | To | Status |
|------|-----|--------|
| `www.jasoncholloway.com/*` | apex | Rule exists; may need Cloudflare Redirect Rules |
| `/press`, `/press/` | seventhcitypress.com | Live |
| `/press-kit/*` | seventhcitypress.com/press-kit/:splat | Active in `_redirects` |

### 1E. Email (Google Workspace @seventhcitypress.com)

| Address | Role | Used on |
|---------|------|---------|
| jason@ | Direct author line | Author contact |
| info@ | General inquiries | Author contact |
| press@ | Media/review copies | Imprint contact |

**Forms:** Web3Forms — shared access key on both sites; distinguished by email subject line.

### 1F. GitHub

| Repo | URL | Branch |
|------|-----|--------|
| jasoncholloway.com | https://github.com/MastersX888/jasoncholloway.com | main |

Imprint site lives in subdirectory `seventhcitypress/` of same repo (not separate repo).

### 1G. Cloudflare infrastructure

| Resource | ID / name | Notes |
|----------|-----------|-------|
| Pages project (author) | `jasoncholloway` | Custom domain jasoncholloway.com |
| Pages project (imprint) | `seventhcitypress` | Custom domain seventhcitypress.com |
| KV namespace | `STATE_KV` (`6f0e96702c3d4da4ad652abd51b5d82e`) | Author site + Groundswell Monitor |
| Worker | `groundswell-monitor` | Reach monitoring dashboard |

---

## 2. RENTED / THIRD-PARTY PRESENCE

### 2A. Retail & distribution

| Platform | What you have | URL pattern | Notes |
|----------|---------------|-------------|-------|
| Amazon KDP | 3 Kindle editions ($6.99) | amazon.com/dp/{ASIN} | Trilogy only; no omnibus on Amazon |
| IngramSpark | Print + EPUB + direct buy | shop.ingramspark.com/b/084?params=... | Primary print distribution |
| Bookshop.org | Affiliate + curated list | bookshop.org/lists/masters-x-trilogy-seventh-city-press?affiliate=126177 | Affiliate ID 126177 |
| Google Play Books | EPUB uploads | play.google.com/books | Upload package in scratch/ |
| Google Merchant Center | **Live** — 10/10 approved, no pending issues (acct 5822707674) | jasoncholloway.com/feeds/google-shopping.csv | 10 print SKUs |

**Kindle ASINs:**
- Vol I: B0H4KYMSM1
- Vol II: B0H4KQ4YQJ
- Vol III: B0H4L36X21

### 2B. Discovery & authority

| Platform | Status | ID / URL |
|----------|--------|----------|
| Goodreads | Claimed | author/show/20924993 |
| Wikidata | Exists; incomplete | Q140275300 — needs P856 → seventhcitypress.com |
| Amazon Author Central | Mentioned in checklists | Verify manually |
| BookBub | Mentioned in checklists | Verify manually |
| Google Search Console | Author domain | sc-domain:jasoncholloway.com |
| Google Search Console (imprint) | Pending | Add seventhcitypress.com |
| Google Business Profile | Package ready | seventhcitypress/google_business/ |
| ISNI | **Assigned + on site** | 0000 0005 3044 7935 · manual: Wikidata P213, Open Library |
| LoC PCN / VIAF | Not done | Tier 1 |
| Google Books Partner | Not done | Tier 1 |
| Open Library | Not done | Tier 1 |
| The StoryGraph | Not done | Tier 3 |
| WorldCat | Passive via Ingram | — |

### 2C. Analytics

| Service | ID | Location |
|---------|-----|----------|
| Google Analytics 4 | G-79RDL3BDEH | lib/analytics/gtag.ts |

**Events tracked:** view_item, begin_checkout (book pages), generate_lead (/chapters-sent/)

---

## 3. CREATIVE PIPELINES (local WIP — not public presence)

| Pipeline | Folder | Status | Next gate |
|----------|--------|--------|-----------|
| Encyclopedia | encyclopedia_project/ | 67 entries; Pass 2 creative done | Print via BookVault; author decisions on page count |
| Audiobook | audiobook_project/ | 77 ElevenLabs scripts complete | Audible/ACX upload not started |
| YouTube | encyclopedia_project/output/marketing/youtube/ | Scripts + SETUP_CHECKLIST | Channel creation unconfirmed |
| Universe memory | universe_memory/ | Canon reference | Internal only |
| Design memory | design_memory/ | Cover briefs | Internal only |
| Folio verify tool | scratch/folio_verify/ | 164 pending visual checks | Internal QA |

---

## 4. CANONICAL DATA SOURCES (which file is truth?)

| Domain | Primary source | Secondary |
|--------|----------------|-----------|
| Bibliographic facts | CANON.md | public/llms.txt |
| Site book data | lib/data/books.ts | lib/data/ingram-catalog.json |
| Buy links | lib/data/buyLinks.ts | books.ts buyLinks arrays |
| Publisher catalog | content/catalog.ts | — |
| Folio/Voynich data | lib/folios.json | — |
| Field Notes metadata | lib/data/fieldNotes.ts | — |
| Press kit PDFs | public/press-kit/ (author) + seventhcitypress/public/press-kit/ | Generated by scripts/generate_press_kit.py |
| Merchant feed | scripts/generate-google-merchant-feed.py → public/feeds/ | — |
| Website ops status | ELEVATION_III_STATUS.md | website_edits_handoff/CURRENT_STATUS.md |

**Recommendation for agents:** Treat `CANON.md` as narrative/bibliographic law; `books.ts` + `ingram-catalog.json` as site implementation truth.

---

## 5. HANDOFF / STATUS DOCUMENTS (doc sprawl map)

| Doc | Date | Authority | Superseded by? |
|-----|------|-----------|----------------|
| CANON.md | Ongoing | Bibliographic canon | — |
| ELEVATION_III_STATUS.md | Jul 14, 2026 | Latest website elevation pass | — |
| website_edits_handoff/CURRENT_STATUS.md | Jul 12, 2026 | Deploy/migration status | Partially superseded by ELEVATION III |
| website_elevation_handoff/KNOWN_ISSUES_AND_FIXES.md | Jul 10, 2026 | Historical punch list | Many items fixed in Elevation III |
| website_edits_handoff/docs/SCP_MIGRATION_STATUS.md | Jul 12, 2026 | Imprint split checklist | Phase 3 items may still be open |
| ASSET_GAP_REPORT.md | Jul 14, 2026 | Media inventory | 0 blocking gaps |
| encyclopedia_project/output/HANDOFF_STATUS.md | Jul 2026 | Encyclopedia progress | — |
| audiobook_project/output/AUDIOBOOK_STATUS.md | Jul 11, 2026 | Audiobook scripts | — |
| groundswell-monitor/Author_Platform_Playbook.md | — | Reach strategy tiers | — |
| debt_consolidation_handoff/* | Jul 16, 2026 | Consolidation + audit package | — |
| **FOUNDATION_STATUS.md** | Jul 16, 2026 | **Canonical ops status** | Day-to-day truth |

---

## 6. LOCAL OPS SCRATCH (not deployed)

| Folder | Purpose |
|--------|---------|
| scratch/google_play_upload/ | Google Play batch upload instructions + EPUBs |
| scratch/GOOGLE_MERCHANT_CENTER_BATCH_FIX.md | Merchant feed fixes |
| scratch/bookshop_* | Bookshop list + banner notes |
| scratch/press/ | Press fact sheet regen notes |
| scratch/build_export.ps1 | Build + export script |
| seventhcitypress/google_business/ | GBP import package |

---

## 7. PUBLISHED WORKS (quick reference)

### Masters X Trilogy
| Vol | Title | PB ISBN | HC ISBN | Ebook ISBN |
|-----|-------|---------|---------|------------|
| I | The Inheritance of Frequency | 9798256008048 | 9798295800801 | 9798256008819 |
| II | The Grimoire | 9798256009953 | 9798295812675 | 9798256009625 |
| III | The Kingdom | 9798256010072 | 9798295812705 | 9798256009809 |
| Omnibus | — | 9798256072704 | 9798295884412 | — |

### Hawkes Monograph
- PB: 9798295778247 · HC: 9798349308444 · EPUB: 9798295778926
- Title: *Innocence, Desire, and the Architecture of the Fall...*

---

## 8. AGENT ACCESS POINTS

| What | Where |
|------|-------|
| Cursor workspace (deploy output) | `...\jasoncholloway\out\` |
| Cursor workspace (source) | `...\jasoncholloway\` |
| Agent transcripts | Cursor projects folder |
| llms.txt (AI-facing summary) | https://jasoncholloway.com/llms.txt |
| MCP / agent discovery | `.well-known/` routes in out/ |
