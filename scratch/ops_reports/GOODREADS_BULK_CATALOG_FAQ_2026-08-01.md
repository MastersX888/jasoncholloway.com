# Goodreads Bulk Catalog Upload — FAQ for Jason

**Generated:** 2026-08-01 (evening)  
**Question:** "Can't you upload a fresh catalog with covers to Goodreads?"  
**Short answer:** **NO** — there is no bulk catalog+covers upload on Goodreads in 2026.

---

## TL;DR

| Path | Bulk? | Covers? | Jason time |
|------|-------|---------|------------|
| CSV at `/review/import` | Personal shelves only | ✗ No images | N/A for catalog |
| Goodreads Developer API | ✗ Retired Dec 2020 | ✗ | N/A |
| Author Dashboard → Add a book | One at a time | ✓ Upload per book | ~5 min × missing editions |
| Per-edition cover edit / ACE | One at a time | ✓ | ~3 min × broken covers |
| Amazon/KDP ASIN auto-import | Automatic (Kindle) | ✓ From Amazon | **Already working** (Vol I–III) |
| Ingram ONIX auto-import | Automatic (slow) | Sometimes missing | Hawkes arrived **without cover** |
| Librarian Group request | One thread per book | ✓ If attached | 1–3 days wait |

**Fastest path to all covers live:** ~**10 minutes** — only Hawkes placeholder + generic "Masters X" need clicks. Vol I–III + omnibus already have covers.

**Full 14-edition catalog on Goodreads:** ~**60–90 minutes** if Jason manually adds every missing Ingram EPUB/PB/HC edition one at a time — **not recommended tonight** unless you want complete ISBN parity.

---

## What Goodreads actually offers (2026)

### 1. CSV Import/Export — **NOT for catalog upload**

**URL:** https://www.goodreads.com/review/import (requires login → My Books → Tools → Import and Export)

| Direction | What it does | Covers? |
|-----------|--------------|---------|
| **Import** | Adds books to **your personal shelves** (read/to-read/custom) if ISBN already exists in GR database | ✗ |
| **Export** | Downloads **your reading library** as CSV (ratings, shelves, dates) | ✗ |

Official help: [How do I import or export my books?](https://help.goodreads.com/s/article/How-do-I-import-or-export-my-books-1553870934590)

Librarian group consensus (closed thread): *"We can not add books to goodreads.com's database through import option"* — [bulk adding discussion](https://www.goodreads.com/topic/show/1492230-adding-multiple-books-at-a-time-bulk-adding).

**This is the CSV you use for StoryGraph import — not for pushing SCP catalog upstream.**

---

### 2. Goodreads Developer API — **DEAD**

- Deprecated December 8, 2020; no new keys issued
- No public write endpoints for books, covers, or author catalog
- Topic: https://www.goodreads.com/topic/show/21788520-api-deprecation

Reverse-engineered CLI tools exist (session-cookie based) but require logged-in browser session + explicit write approval. Not a supported or reliable bulk path.

---

### 3. Author Dashboard — **one book at a time**

**URLs (logged in as Goodreads Author):**

| Tool | URL |
|------|-----|
| Author Dashboard | Profile menu → **Author Dashboard** (stats + book list) |
| Add a book (fastest) | https://www.goodreads.com/book/new |
| Author page | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway |

**Click path — add one edition:**

1. Sign in → https://www.goodreads.com/user/sign_in → **Continue with Amazon**
2. Go to https://www.goodreads.com/book/new (or Dashboard → **Add a book**)
3. Fill: Title, ISBN/ASIN, format, pages, pub date, publisher, description
4. **Upload cover image** (≥500×750 PNG/JPG)
5. Click **Create book**
6. Processing: ~1–3 days before fully live

Official help: Author Program → Dashboard → Add a book ([librarian FAQ mirrors this](https://www.goodreads.com/topic/show/23775803-adding-two-new-books-to-my-author-dashboard), Jan 2026).

---

### 4. Cover upload — **per edition, not bulk**

**Policy (Author FAQ, Mar 2024):** Goodreads does **not replace** covers on published editions. Upload via:

| Situation | Path |
|-----------|------|
| **Placeholder** (Goodreads wide logo) | Edit edition directly → upload cover → Save |
| **Existing cover, want new art** | **Add alternate cover edition (ACE)** → upload → **Set as primary edition** |
| **Kindle/Audible only** | Amazon store is authoritative — cover auto-syncs from KDP (may take up to 72h) |

**Hawkes (only broken cover):**

1. https://www.goodreads.com/book/show/253986900/edit
2. Upload `public/covers/hawkes-paperback.png`
3. Set format Paperback, ISBN 9798295778926, Save

Note: Hawkes **HC** edition (ISBN 9798349308444) already exists on GR **with cover**. The placeholder listing (253986900) is a separate "Unknown Binding" edition — fix or merge via Combine Editions.

---

### 5. Amazon/KDP auto-sync — **already working for Kindle**

Goodreads runs periodic Amazon catalog import (timing opaque, runs continuously per librarian staff).

| SCP title | Amazon? | GR status |
|-----------|---------|-----------|
| Vol I–III Kindle | ✓ KDP ASINs | ✓ On author page with KDP covers |
| Omnibus | Ingram only | ✓ HC cover present (Ingram import) |
| Hawkes | Ingram only | ⚠ Listed but **placeholder cover** |
| Ingram EPUBs | ✗ Not on Amazon | ✗ **Not indexed** (ISBN search returns 0) |

Kindle/Audible covers may be updated by Amazon bots to match Amazon.com store ([librarian manual exception](https://help.goodreads.com/s/article/Librarian-Manual-Book-edit-page-uploading-book-covers)).

**There is no Author Central button to "push catalog to Goodreads."** Amazon ownership means Kindle listings auto-import; everything else is manual or Ingram ONIX.

---

### 6. Ingram ISBN → Goodreads auto-match — **partial, unreliable for covers**

Goodreads imports ONIX feeds from Ingram ("ONIX Ingram" data source). This is how many print editions appeared under "Jason C. Holloway" co-author listings.

| Behavior | Reality |
|----------|---------|
| New ISBN appears | Eventually, if Ingram feed includes it |
| Cover image | Often missing or placeholder (Hawkes case) |
| Author attribution | Frequently wrong → duplicate "Jason C. Holloway" editions |
| Timing | Unpredictable; not a same-day pipeline |
| Overrides | Librarian/author edits take precedence over future imports |

Blog: [Goodreads Transitions to New Data Sources](https://www.goodreads.com/blog/show/338-goodreads-transitions-to-new-data-sources) — welcomes member cover uploads for missing images.

**Do not wait for Ingram to fix Hawkes cover** — manual upload is faster.

---

## SCP catalog vs Goodreads today

| Category | Count | Action |
|----------|-------|--------|
| Covers OK (verify only) | 4 | Vol I–III Kindle + omnibus HC |
| Cover broken | 2 | Hawkes placeholder + generic "Masters X" |
| Duplicate co-author editions | 4 | Combine Editions (~5 min) |
| Ingram EPUB ISBNs on GR | 0 | Optional manual add if ISBN parity wanted |
| Ingram print ISBNs on GR | Most | Already via ONIX (some under wrong author name) |
| Hawkes HC (9798349308444) | ✓ | Has cover — separate from placeholder listing |

**ISBN spot-checks (2026-08-01):**

| ISBN | GR search |
|------|-----------|
| 9798256008819 (Vol I EPUB) | 0 results — expected |
| 9798256008048 (Vol I PB) | ✓ Found (co-author edition) |
| 9798295778926 (Hawkes digital) | 0 results — listing exists as Unknown Binding |
| 9798349308444 (Hawkes HC) | ✓ Found with cover |

---

## Realistic paths ranked by speed

### Path A — **Covers live tonight (~10 min)** ← RECOMMENDED

Only fix what's broken; accept that EPUB editions won't be on GR (normal for indie publishers).

1. Hawkes cover upload → 253986900/edit (~3 min)
2. Combine 4 duplicate editions (~5 min)
3. Merge generic "Masters X" 253243207 into Vol I (~2 min)

Vol I–III + omnibus: spot-check only.

### Path B — **Full edition parity (~60–90 min)**

Add every missing Ingram edition manually via https://www.goodreads.com/book/new

Per edition (~5 min each): ISBN, format, pages, pub date, publisher, description, cover upload.

Missing from GR by ISBN search: all 3 EPUBs + Hawkes digital binding. Print editions mostly exist (some under co-author dupes).

**Not worth bulk effort unless a retailer specifically requires GR ISBN-level listing.**

### Path C — **Librarian delegation (1–3 days)**

Post in [Goodreads Librarians Group](https://www.goodreads.com/group/show/220-goodreads_librarians) → Add New Books & Editions.

One thread per book. Attach cover URL from https://jasoncholloway.com/covers/ — librarians upload for you. Slow, not bulk.

---

## Browser MCP (this run)

| Step | Result |
|------|--------|
| `browser_tabs` list | Empty (no Jason tabs to attach) |
| `browser_tabs` new | ✓ `viewId: de5175` |
| `browser_navigate` → Author Dashboard | **FAILED** — view lost |
| Automated upload | **None** |

Jason must log in on agent-controlled browser tab, then reply **go**.

---

## Sources

- [Author FAQ (covers, ACE, primary edition)](https://www.goodreads.com/topic/show/1012751-author-faq-authors-look-here-first) — Jaclyn, Mar 2024
- [Bulk adding closed thread](https://www.goodreads.com/topic/show/1492230-adding-multiple-books-at-a-time-bulk-adding)
- [Amazon catalog auto-sync](https://www.goodreads.com/topic/show/21861114-does-the-amazon-catalog-auto-sync-or-are-all-new-books-added-manually)
- [Import/export help](https://help.goodreads.com/s/article/How-do-I-import-or-export-my-books-1553870934590)
- [API deprecation](https://www.goodreads.com/topic/show/21788520-api-deprecation)
- Prior audit: `scratch/ops_reports/GOODREADS_COVER_UPDATE_2026-08-01.md`
