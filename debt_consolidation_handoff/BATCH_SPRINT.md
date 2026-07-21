# Batch Sprint — Get It All Done ASAP
**Prepared:** July 16, 2026  
**Goal:** Maximum throughput using batch uploads. One sitting (~2–3 hours) + deploy.

---

## Before you start (5 min)

1. Open staged folder (run once):
   ```powershell
   cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
   powershell -File scratch/stage_batch_uploads.ps1
   ```
   Opens `Desktop\SCP_Batch_Upload_Jul2026\` with all packages.

2. Log into these in separate tabs:
   - [Cloudflare Dashboard](https://dash.cloudflare.com)
   - [Google Play Books Partner](https://play.google.com/books/publish)
   - [Google Business Profile Manager](https://business.google.com)
   - [Google Merchant Center](https://merchants.google.com)
   - [Google Search Console](https://search.google.com/search-console)
   - [Wikidata](https://www.wikidata.org/wiki/Q140275300)

3. **Deploy first** (publishes press kit + merchant feed already in `out/`):
   ```powershell
   cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
   npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
   ```
   Then: Cloudflare → jasoncholloway + seventhcitypress → **Purge Everything**

---

## BLOCK A — Deploy + Cloudflare (15 min) · do first

| # | Action | Batch? |
|---|--------|--------|
| A1 | Deploy author site (`out/` already built Jul 16) | 1 command |
| A2 | Purge cache both Pages projects | 2 clicks |
| A3 | **Redirect Rules** — www → apex both domains | 2 rules |

**Redirect rule template (create twice):**
- When: Hostname equals `www.jasoncholloway.com` (then repeat for seventhcitypress)
- Then: Dynamic redirect → `https://jasoncholloway.com${uri.path}` · 301

---

## BLOCK B — Google Play Books (20 min) · full batch

**Folder:** `01_google_play_books/`

| Step | Action | Files |
|------|--------|-------|
| B1 | Payment center → add **United States** territory | — |
| B2 | Book catalog → Advanced → **Upload book list** | `GoogleBooksTemplate_filled_v5_utf16.csv` |
| B3 | Advanced → **Upload content files** → Ebook | All **8 files** in `content/` (4 EPUB + 4 JPG) |

**One drag-select:** `9798256008819.epub/jpg`, `9798256009625`, `9798256009809`, `9798295778926`

Verify in **View uploaded lists** — 4 titles, no errors.

---

## BLOCK C — Google Merchant Center — DONE (Jul 16)

**Status:** 10/10 products approved · all live · no pending issues · account **Seventh City Press (5822707674)**

No further action needed unless you add new print SKUs or change prices (then regen feed + fetch).

<details>
<summary>Original setup steps (for reference)</summary>

| Step | Action |
|------|--------|
| C1 | Countries → United States ONLY |
| C2 | US shipping policy: $5.99 flat Standard |
| C3 | Return policy URL: `https://jasoncholloway.com/returns/` |
| C4 | Feeds → Fetch now on `jasoncholloway.com/feeds/google-shopping.csv` |

</details>

---

## BLOCK D — Google Business Profile (15 min) · CSV batch

**Folder:** `02_google_business/`

| Step | Action |
|------|--------|
| D1 | business.google.com → **Import profiles** |
| D2 | Download Google's template first; copy our row from `GOOGLE_BUSINESS_IMPORT.csv` if headers differ |
| D3 | Upload CSV |
| D4 | **Manual after import:** upload logo (`assets/scp-logo-profile-720.png` if present) |
| D5 | Set **service area** Kansas City MO · hide street from public |
| D6 | Add `press@seventhcitypress.com` in profile UI |
| D7 | Complete verification (postcard/phone/email) |

---

## BLOCK E — Search Console (10 min) · sitemap batch

**Folder:** `04_search_console/SITEMAP_URLS.txt`

| Step | Action |
|------|--------|
| E1 | Add property: **seventhcitypress.com** (domain or URL prefix) |
| E2 | Submit sitemap: `https://seventhcitypress.com/sitemap.xml` |
| E3 | Submit sitemap: `https://jasoncholloway.com/sitemap.xml` (if not already) |
| E4 | URL Inspection → **Request indexing** on 3 priority URLs (in txt file) |

---

## BLOCK F — Wikidata (10 min) · one edit session

**Folder:** `05_wikidata/EDIT_CHECKLIST.txt`

Open [Q140275300](https://www.wikidata.org/wiki/Q140275300) → add in one pass:
- **P856** official website = `https://seventhcitypress.com/`
- Link to Goodreads if not present
- Reference: seventhcitypress.com

---

## BLOCK G — Authority batch (30 min) · forms, not uploads

Do in one browser session — copy bios from `public/llms.txt` or About page:

| Platform | URL | Batch note |
|----------|-----|------------|
| **ISNI** | [isni.org](https://isni.org/page/isni-format/) | Register author name once; links all ISBNs |
| **Open Library** | [openlibrary.org](https://openlibrary.org) | Add author + 4 works by ISBN |
| **Google Books Partner** | [books.google.com/partner](https://books.google.com/partner) | Apply + link Play catalog after Block B |
| **Bookshop.org author** | bookshop.org | Claim author page; list already live (affiliate 126177) |
| **StoryGraph** | thestorygraph.com | Claim author; add trilogy |

---

## BLOCK H — Git commit (5 min) · lock in local work

After deploy succeeds:
```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
git add FOUNDATION_STATUS.md debt_consolidation_handoff/ public/feeds/ public/press-kit/ public/llms.txt
git add lib/data/ingram-catalog.json app/ content/ seventhcitypress/
git status   # review before commit
git commit -m "chore: foundation audit, batch sprint packages, press kit regen, merchant feed sync"
```

---

## What NOT to batch today (defer)

| Item | Why wait |
|------|----------|
| Encyclopedia print | Creative/layout — not a dashboard upload |
| Audible/ACX | Requires narration production first |
| YouTube channel | Separate content production block |
| IngramSpark Hawkes EPUB fix | Single-title dashboard edit — do after Play upload |
| Email provider migration | Web3Forms works; not blocking |

---

## Completion checklist

- [ ] A: Deploy + cache purge + www redirects
- [ ] B: Google Play — CSV + 8 content files
- [x] C: Merchant Center — 10/10 approved, all live (Jul 16)
- [ ] D: Google Business — CSV import + logo
- [ ] E: GSC — imprint property + 2 sitemaps
- [ ] F: Wikidata P856
- [ ] G: ISNI + Open Library (minimum)
- [ ] H: Git commit
- [ ] Update `FOUNDATION_STATUS.md` with date completed

---

## If you only have 45 minutes

**Minimum viable batch:** A → B → ~~C~~ → E → F  
(Merchant Center done Jul 16.)
