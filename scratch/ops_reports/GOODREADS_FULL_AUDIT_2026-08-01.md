# Goodreads Full Audit — Covers + Metadata

**Generated:** 2026-08-01 (evening)  
**Author ID:** 20924993  
**Author page:** https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway  
**Agent:** Morgan (public scrape + cover compare vs canonical sources)  
**Sources:** `CANON.md`, `scratch/press_extract/Masters_X_Fact_Sheet.txt`, `lib/data/books.ts`, `lib/data/ingram-catalog.json`, website book pages, `production_staging/_covers/web/*-v3.png`, prior `GOODREADS_COVER_UPDATE_2026-08-01.md`, `scratch/_gr_cover_compare/`

---

## 1. Executive summary

| Category | Pass | Fail / Action | Notes |
|----------|------|---------------|-------|
| **Covers (vs v3 HC art)** | **0** | **10** | All SCP listings use pre-v3 geometry or placeholder |
| **Metadata (full parity)** | **0** | **10** | Missing descriptions, series, publisher, ISBN on most |
| **Author page** | Partial | 4 fields | Bio present; website/genre/shelves need work |
| **Stray listing** | — | **1** | Crypto book (56035497) — remove from bibliography |

### Verdict counts

| Priority | Count | Items |
|----------|-------|-------|
| **P0 — cover fix** | **10** | **DEFERRED** — GR UI blocks author upload (2026-08-01) |
| **P0 — metadata tonight** | **10** | Descriptions, series, publisher, ISBN on canonical editions |
| **P1 — dedupe** | **5** | 4 co-author dupes + generic Masters X |
| **P2 — author + shelves** | **4** | Bio, website, genre, 3 public comp shelves |
| **P3 — stray** | **1** | Crypto book (56035497) — not on shelf; low priority |

**Bottom line:** All 10 covers fail v3 audit — but **cover upload is blocked at Goodreads UI level** (Jason cannot ACE/upload as of 2026-08-01). **Proceed metadata-only tonight** (~15 min): descriptions, author bio, Combine Editions, public shelves → GR CSV export → StoryGraph. Covers deferred until librarian request or organic sync.

**Revised priority (2026-08-01 evening):** Metadata + dedupe + export gate — **covers deferred**.

---

## 2. Per-book audit table

| GR URL | Edition | Cover status | Metadata mismatches | Fix action |
|--------|---------|--------------|---------------------|------------|
| [253640099](https://www.goodreads.com/book/show/253640099) | Vol I · Kindle (primary) | **OLD geometry** — cymatics circles; cover reads "Jason C. Holloway" (≠ v3 sigil HC) | Title: extra `: Volume One` (canonical: *The Inheritance of Frequency*). Pages: 153 (Kindle equiv — OK for format). Pub: **June 9, 2026** (canonical ebook: **June 1**). No description, series, publisher, ISBN on page. ASIN should be **B0H4KYMSM1**. | ACE → upload `book1-hardcover-v3.png` OR add separate HC edition with v3 + set primary. Edit metadata: series *Masters X*, publisher *Seventh City Press*, paste website blurb. [Edit](https://www.goodreads.com/book/show/253640099/edit) |
| [253641522](https://www.goodreads.com/book/show/253641522) | Vol II · Kindle (primary) | **OLD geometry** — golden labyrinth; "Jason C. Holloway" | Title: `: Volume Two`. Pages: 277 (Kindle). Pub: June 9 vs June 1. No desc/series/publisher. ASIN **B0H4KQ4YQJ**. | Same ACE flow. `book2-hardcover-v3.png`. [Edit](https://www.goodreads.com/book/show/253641522/edit) |
| [253641205](https://www.goodreads.com/book/show/253641205) | Vol III · Kindle (primary) | **OLD geometry** — astrolabe; "Jason C. Holloway" | Title: `: Volume Three`. Pages: 210 (Kindle). Pub: June 9 vs June 1. No desc/series/publisher. ASIN **B0H4L36X21**. | Same ACE flow. `book3-hardcover-v3.png`. [Edit](https://www.goodreads.com/book/show/253641205/edit) |
| [252797588](https://www.goodreads.com/book/show/252797588) | **Omnibus · HC (primary)** | **P0 FAIL — OLD geometry** — rotunda/dome interior with subtitle list (pre-v3). Local v3 = black + golden mandala + "111.2 Hz". Evidence: `scratch/_gr_cover_compare/omni-hc-gr.jpg` vs `omni-hc-local.png` | Co-author **Jason C. Holloway** listed. Title: *The Complete Trilogy* (website: *Omnibus Edition* — acceptable variant). Pages: **686 HC ✓**. Pub: **June 1, 2026 ✓**. No ISBN **9798295884412**, no description, no series, no publisher, no price. | **ACE + set primary** → `production_staging/_covers/web/omnibus-hardcover-v3.png` (2000×3000). Add ISBN, publisher, description from omnibus page. [Edit](https://www.goodreads.com/book/show/252797588/edit) |
| [253986900](https://www.goodreads.com/book/show/253986900) | Hawkes monograph | **P1 PLACEHOLDER** — `goodreads_wide` logo (`og:image` confirmed) | Title: lowercase *architecture of the fall* (canonical: *Architecture of the Fall*). **Missing full subtitle.** Format: Unknown Binding. No pages (**84 PB / 84 HC**), no pub date (**2026-04-02**), no ISBN (**9798295778247** PB), no description. | Direct upload on edit page → `public/covers/hawkes-paperback.png` (1850×2775). Fix title case + full subtitle. Set PB, ISBN, pages, pub date. [Edit](https://www.goodreads.com/book/show/253986900/edit) |
| [253243207](https://www.goodreads.com/book/show/253243207) | Generic "Masters X" | **P1 PLACEHOLDER** — `goodreads_wide` | Stray work — no subtitle, Unknown Binding, no metadata. Likely duplicate of Vol I. | **Combine Editions** into Vol I work (253640099) OR upload Vol I v3 cover + full metadata. [Edit](https://www.goodreads.com/book/show/253243207/edit) |
| [251407365](https://www.goodreads.com/book/show/251407365) | Vol I · HC dupe | **OLD geometry** — pre-v3 HC art | Co-author Jason C. Holloway. Pages: **160** (canonical HC: **156**). Pub: May 14 ✓. No ISBN on page. | **Combine** into 253640099. If merged edition has better metadata, keep canonical. |
| [251753947](https://www.goodreads.com/book/show/251753947) | Vol II · HC dupe | **OLD geometry** — pre-v3 | Co-author. Pages: **226** (canonical HC: **218**). Pub: May 14 ✓. | **Combine** into 253641522 |
| [251783293](https://www.goodreads.com/book/show/251783293) | Vol III · HC dupe | **OLD geometry** — pre-v3 | Co-author. Pages: **180** (canonical HC: **170**). Pub: May 14 ✓. ASIN **B0GZCX3L8S** on page — **not** a canonical Kindle ASIN (verify/remove). | **Combine** into 253641205 |
| [252929307](https://www.goodreads.com/book/show/252929307) | Omnibus · PB dupe | **OLD geometry** — same dome art as HC (wrong for v3) | Pages: **734 PB ✓**. Pub: June 1 ✓. Separate work from HC omnibus — may be valid PB edition. | After HC fix: ACE with v3 omnibus art (PB uses same jacket face on site) OR add PB-specific if cover differs. **Combine** with 252797588 if same work. |
| [56035497](https://www.goodreads.com/book/show/56035497) | Crypto (stray) | N/A — wrong book | Unrelated 2020 Kindle crypto guide. 1 rating. Not SCP. | **Remove from author bibliography** (edit author → unlink) or librarian request. |

### Cover comparison key

| Signal | Meaning |
|--------|---------|
| `goodreads_wide` in og:image | Placeholder — direct upload OK |
| Dome/rotunda omnibus | Pre-v3 — **replace** |
| Cymatics / labyrinth / astrolabe trilogy art | Pre-v3 — **replace with v3 sigil/mandala** |
| "Jason C. Holloway" on cover | Violates CANON §1 — must be **Jason Carroll Holloway** |

**Local v3 upload files (2000×3000):**

| Title | Path |
|-------|------|
| Vol I | `production_staging/_covers/web/book1-hardcover-v3.png` |
| Vol II | `production_staging/_covers/web/book2-hardcover-v3.png` |
| Vol III | `production_staging/_covers/web/book3-hardcover-v3.png` |
| Omnibus | `production_staging/_covers/web/omnibus-hardcover-v3.png` |
| Hawkes PB | `public/covers/hawkes-paperback.png` (verify deployed; compare art in `scratch/_gr_cover_compare/hawkes-pb-local.png`) |

Live URL fallbacks: `https://jasoncholloway.com/covers/{book1,book2,book3,omnibus}-hardcover-v3.png`

---

## 3. Author page metadata audit

**URL:** https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway  
**Edit:** https://www.goodreads.com/author/edit/20924993

| Field | Current (GR) | Canonical | Status |
|-------|--------------|-----------|--------|
| **Name** | Jason Carroll Holloway | Jason Carroll Holloway | ✓ |
| **Goodreads Author badge** | Present | — | ✓ |
| **Born** | Jefferson City, United States | Not on website about page (Kansas City residence cited) | ⚠ Acceptable if Jason entered; not verified in CANON |
| **Website** | Field visible; value unclear on scrape | `https://jasoncholloway.com/` | **FIX** — confirm saved |
| **Genre** | Empty | Fiction, Literary Fiction, Thriller | **FIX** |
| **Bio** | Truncated/duplicated Masters X blurb; includes Field Notes + comp list links | See `GOODREADS_EXPORT_GATE_2026-08-01.md` clean block + StoryGraph + imprint | **FIX** — dedupe, add StoryGraph |
| **Distinct works** | 10 (+ crypto visible in full list) | 5 SCP titles × editions | Dupes inflate count |
| **Public shelves** | Empty | `foucaults-pendulum-readers`, `literary-conspiracy-thriller`, `prague-thriller-fiction` | **FIX** (Phase 2 export gate) |
| **Sort order** | Hawkes listed first | — | Low priority |
| **Ratings** | 0 across catalog | — | Expected pre-launch |

---

## 4. Canonical reference table (fact sheet / CANON / books.ts)

### Masters X Trilogy — individual volumes

| Volume | Format | ISBN-13 | ASIN (Kindle only) | Pages | US List | Pub date |
|--------|--------|---------|---------------------|-------|---------|----------|
| **I · The Inheritance of Frequency** | PB | 9798256008048 | — | 178 | $16.99 | 2026-06-01 (PB) |
| | HC | 9798295800801 | — | 156 | $29.99 | 2026-05-14 (HC) |
| | EPUB | 9798256008819 | — | 267 | $6.99 | 2026-06-01 |
| | Kindle | — | **B0H4KYMSM1** | — | $6.99 | 2026-06-01 |
| **II · The Grimoire** | PB | 9798256009953 | — | 260 | $16.99 | 2026-06-01 |
| | HC | 9798295812675 | — | 218 | $29.99 | 2026-05-14 |
| | EPUB | 9798256009625 | — | 385 | $6.99 | 2026-06-01 |
| | Kindle | — | **B0H4KQ4YQJ** | — | $6.99 | 2026-06-01 |
| **III · The Kingdom** | PB | 9798256010072 | — | 200 | $16.99 | 2026-06-01 |
| | HC | 9798295812705 | — | 170 | $29.99 | 2026-05-14 |
| | EPUB | 9798256009809 | — | 291 | $6.99 | 2026-06-01 |
| | Kindle | — | **B0H4L36X21** | — | $6.99 | 2026-06-01 |

### Omnibus

| Format | ISBN-13 | Pages | US List | Pub date |
|--------|---------|-------|---------|----------|
| PB | 9798256072704 | 734 | $32.99 | 2026-06-01 |
| HC | 9798295884412 | 686 | $44.99 | 2026-06-01 |
| Kindle | — | — | — | **Not on Amazon** |

### Hawkes monograph

| Format | ISBN-13 | Pages | US List | Pub date |
|--------|---------|-------|---------|----------|
| PB | 9798295778247 | 84 | $14.98 | 2026-04-02 |
| HC | 9798349308444 | 84 | $24.99 | 2026-06-01 |
| EPUB | 9798295778926 | 90 | $9.99 | 2026-04-02 |

**Publisher (all):** Seventh City Press  
**Author of record:** Jason Carroll Holloway  
**Series:** Masters X (Vol I–III + omnibus)

### Canonical full titles

| Work | Full title |
|------|------------|
| Vol I | Masters X: The Inheritance of Frequency |
| Vol II | Masters X: The Grimoire |
| Vol III | Masters X: The Kingdom |
| Omnibus | Masters X: Omnibus Edition *(GR variant "The Complete Trilogy" acceptable)* |
| Hawkes | Innocence, Desire, and the Architecture of the Fall: The Grape and Its Counter-Symbols in the Fiction of John Hawkes |

---

## 5. Jason manual fix order — metadata-only path (~15 min tonight)

> **Covers deferred** — GR UI blocks ACE/upload (see § Cover upload blocked). Do metadata + dedupe + export gate only.

Login once: https://www.goodreads.com/user/sign_in → Continue with Amazon

| # | Time | Action | URL |
|---|------|--------|-----|
| **1** | **5 min** | **Combine Editions** — merge 4 Jason C. Holloway dupes into canonical Kindle/HC primaries | [Author → Combine Editions](https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway) |
| **2** | **2 min** | Generic "Masters X" (253243207) — combine into Vol I | [253243207/edit](https://www.goodreads.com/book/show/253243207/edit) |
| **3** | **3 min** | Hawkes metadata: fix title case, add subtitle, PB, 84 pp, ISBN 9798295778247, pub 2026-04-02, paste description | [253986900/edit](https://www.goodreads.com/book/show/253986900/edit) |
| **4** | **5 min** | Vol I–III + Omnibus: add series *Masters X*, publisher, ISBNs, descriptions (from `lib/data/books.ts`), fix pub dates | [253640099](https://www.goodreads.com/book/show/253640099/edit), [253641522](https://www.goodreads.com/book/show/253641522/edit), [253641205](https://www.goodreads.com/book/show/253641205/edit), [252797588](https://www.goodreads.com/book/show/252797588/edit) |
| **5** | **3 min** | Author page: website, genre, clean bio (EXPORT_GATE block) | [author/edit/20924993](https://www.goodreads.com/author/edit/20924993) |
| **6** | **5 min** | Public comp shelves (3) | My Books → Bookshelves |
| **7** | **2 min** | GR CSV export (after G1–G5 pass) | My Books → Tools → Import and Export |

**Deferred (covers blocked):** Omnibus ACE, Hawkes cover, Vol I–III ACE — see § Cover upload blocked for librarian request path.

**Total est. tonight: ~15 min** (metadata + dedupe + export gate)

Reply **"done: GR metadata + gate"** when complete → proceed to StoryGraph (`GOODREADS_EXPORT_GATE_2026-08-01.md`).

---

## Audit evidence

- Author page scraped 2026-08-01: 10 distinct SCP works + 1 crypto stray
- `og:image` extracted via public HTML for all 11 book IDs
- Placeholder detection: `goodreads_wide` → Hawkes (253986900), generic Masters X (253243207)
- Cover visual compare: `scratch/_gr_cover_compare/` — omnibus, vol1–3 GR vs local v3 (all pre-v3 geometry on GR)
- Omnibus GR cover MD5 source: Amazon CDN `1781143538i/252797588.jpg` — dome interior, not v3 mandala
- Prior cover audit merged: `GOODREADS_COVER_UPDATE_2026-08-01.md`
- Browser MCP: not required; public fetch sufficient this run

---

## Goodreads policy reminder

Existing covers cannot be deleted — use **Alternate Cover Edition (ACE)** → upload → **Set as primary**. Placeholder editions may allow direct upload on edit page.

**Author FAQ:** https://www.goodreads.com/topic/show/1012751-author-faq-authors-look-here-first

---

## Cover upload blocked — 2026-08-01

**Status:** Jason **cannot upload covers via ACE or direct edit** — Goodreads UI restriction, not agent/MCP limitation. Jason attempted ACE + direct upload on omnibus (252797588) and Hawkes (253986900); Goodreads rejected or disabled the upload control. **No SCP cover can be updated by the author through self-service tools right now.**

| What was tried | Result |
|----------------|--------|
| ACE flow (⋮ → Add alternate cover edition) | Upload blocked / unavailable |
| Direct edit → Upload cover image | Blocked on placeholder and existing-cover editions |
| Browser MCP automation | Separate blocker — subagents cannot attach to Jason's GR tabs (see execution logs below) |

**Workarounds (when ready to pursue covers):**

| # | Path | Notes |
|---|------|-------|
| **a** | **Goodreads librarian merge/request** | On each book page → **Report/Contact** → request cover update with v3 image URL or attach file per librarian instructions. Omnibus P0: https://www.goodreads.com/book/show/252797588 |
| **b** | **Amazon Author Central / KDP cover change** | Kindle editions (Vol I–III ASINs B0H4KYMSM1, B0H4KQ4YQJ, B0H4L36X21) may eventually sync to GR Kindle listings — slow, not guaranteed for HC/omnibus |
| **c** | **Organic Ingram/Amazon metadata refresh** | ONIX/Amazon CDN refresh can propagate covers over weeks; Hawkes may update when Ingram metadata catches up |
| **d** | **Goodreads Author Program support ticket** | Author FAQ forum or Goodreads support — cite Author ID 20924993, list ISBNs, attach v3 cover URLs from `https://jasoncholloway.com/covers/` |

**Revised priority — proceed without covers:**

| Priority | Action | Est. time |
|----------|--------|-----------|
| **P0 tonight** | Metadata-only: descriptions, series, publisher, ISBNs on canonical editions | ~10 min |
| **P0 tonight** | Author bio + website + genre + 3 public comp shelves | ~8 min |
| **P0 tonight** | Combine Editions (4 dupes + generic Masters X) | ~5 min |
| **P0 tonight** | GR CSV export → StoryGraph profile + ISBN entries | ~30 min (SG forms optional tomorrow) |
| **Deferred** | All cover uploads (10 editions) | Librarian / organic / support ticket |

**Cover files ready when unblocked:** `production_staging/_covers/web/*-hardcover-v3.png`, `public/covers/hawkes-paperback.png` — see §2 table.

---

## Execution log — 2026-08-01 evening ("go" approved)

**Agent:** Morgan (browser MCP subagent)  
**Jason directive:** Drive cover + metadata fixes from open GR tabs.

### Browser MCP status — BLOCKED

| Step | Result |
|------|--------|
| `browser_tabs` list | **Empty** — agent could not see Jason's prior GR tabs |
| `browser_tabs` new (background + side) | Tab created (`viewId` returned) → **lost before navigate** |
| `browser_navigate` → omnibus edit | **FAILED** — *No browser tab available* / *Browser view not found* |
| `open_resource` (https URL) | **FAILED** — agent routing error |
| Metadata fields filled | **None** — no stable tab to automate |
| Cover uploads attempted | **None** — file picker requires Jason click regardless |

**Root cause:** Subagent `browser_tabs` returns empty — Jason's GR tabs visible only to **main Morgan chat**, not background subagents.

**Main chat follow-up (2026-08-01 ~7:53 PM):** Attached to tab `bfcfbc` → navigated to `/book/edit/252797588` ✓. Metadata fields already filled. **Do not use `browser_fill` on GR forms** — corrupts fields with literal `undefined`. Cover ACE + description paste remain Jason manual.

**Unblock for subagents:** Unlikely — use main chat with Jason's tabs open.

### Local cover files verified ✓

| File | Size |
|------|------|
| `production_staging/_covers/web/omnibus-hardcover-v3.png` | 3.7 MB |
| `public/covers/hawkes-paperback.png` | 1.5 MB |
| `production_staging/_covers/web/book{1,2,3}-hardcover-v3.png` | 2.0–2.8 MB each |

---

### P0 — Omnibus ACE (252797588) — **Jason manual**

**URL:** https://www.goodreads.com/book/edit/252797588 *(not `/book/show/…/edit` — that 404s)*

**Pre-filled on edit page (Jason or prior session):** ISBN `9798295884412`, Publisher Seventh City Press, 686 pp, June 1 2026, Hardcover ✓

1. On book page → **⋮** → **Add alternate cover edition** *(or use librarian edit page → Upload Photo if visible)*
2. On new edition edit page → **Upload cover image** → pick:
   `c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\production_staging\_covers\web\omnibus-hardcover-v3.png`
3. Set **Format:** Hardcover · **ISBN:** `9798295884412` · **Publisher:** Seventh City Press · **Pages:** 686 · **Pub date:** 2026-06-01
4. **Description** (paste if field editable):

```
What if the most dangerous secret in human history isn't a weapon or a prophecy, but a frequency?

Beneath the Strahov Library in Prague, Premonstratensian monks have guarded a sealed crypt for seven centuries. A thirteenth-century brother scattered a single truth across seven European cities, because what he discovered in the acoustic resonance was too dangerous to keep in one place — and too important to destroy.

Blake Masters is a graduate student who lost his security clearance and his job as a guard in the subterranean limestone vaults beneath Kansas City. But when he photographs impossible geometric carvings in an unmapped tunnel, he triggers a chain reaction that forces him to confront a terrifying family legacy.

The carvings point to a hidden acoustic signature: 111.2 Hz. It is the exact resonant frequency of ancient caves, megalithic cathedrals, and the human chest cavity. And once you learn how to listen, your nervous system is permanently restructured.

Collected here in a single omnibus edition, the Masters X trilogy bridges acoustic science, medieval cryptography, and the absolute frontiers of human consciousness.
```

5. **Save** → right sidebar → **Set this book as the primary edition for this work**

**Agent:** — | **Jason:** cover upload + save + set primary

---

### P1 — Hawkes (253986900) — **Jason manual**

**URL:** https://www.goodreads.com/book/show/253986900/edit

1. **Upload cover image** → `c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\covers\hawkes-paperback.png`
2. **Title:** Innocence, Desire, and the Architecture of the Fall
3. **Subtitle:** The Grape and Its Counter-Symbols in the Fiction of John Hawkes
4. **Format:** Paperback · **ISBN:** `9798295778247` · **Pages:** 84 · **Pub date:** 2026-04-02 · **Publisher:** Seventh City Press
5. **Description** (paste):

```
What does a single recurring image reveal about the hidden architecture of a novelist's entire body of work? Across John Hawkes's seventeen novels the word "grape" appears 129 times — concentrated in the mature fiction where innocence, desire, and architectural enclosure converge. This monograph traces the grape — its cultivation, its crushing, its fermentation — through the complete fiction of John Hawkes, revealing how its counter-symbols (the Camera, the Wounded Body, the Architecture of Enclosure, and the Child) create a coherent moral architecture across four decades of America's most challenging postmodern writer.

Through meticulous close reading and structural analysis, Jason Carroll Holloway maps the symbolic DNA of Hawkes's fiction, demonstrating that beneath the apparent chaos lies precise literary engineering. What emerges is a comprehensive anatomy of literary architecture: how Hawkes built fiction not from plot, but from the spatial and symbolic logic of desire meeting its consequences.

Originally completed as a graduate thesis at Mercy University, this study represents the first comprehensive analysis of motif architecture across Hawkes's complete seventeen-novel corpus.
```

6. **Save**

**Agent:** — | **Jason:** cover upload + all metadata fields

---

### P1 — Vol I–III ACE (if time) — **Jason manual**

| Vol | Edit URL | Cover file |
|-----|----------|------------|
| I | https://www.goodreads.com/book/show/253640099/edit | `production_staging\_covers\web\book1-hardcover-v3.png` |
| II | https://www.goodreads.com/book/show/253641522/edit | `book2-hardcover-v3.png` |
| III | https://www.goodreads.com/book/show/253641205/edit | `book3-hardcover-v3.png` |

Each: **⋮ → Add alternate cover edition** → upload v3 → Hardcover/Kindle as appropriate → **Set as primary**.

**Agent:** — | **Jason:** 3× cover upload + set primary

---

### P2 — Author edit (20924993) — **Jason manual**

**URL:** https://www.goodreads.com/author/edit/20924993

| Field | Value |
|-------|-------|
| Website | `https://jasoncholloway.com/` |
| Genre | Fiction, Literary Fiction, Thriller |
| About | See `GOODREADS_EXPORT_GATE_2026-08-01.md` block (StoryGraph + seventhcitypress.com links) |

**Agent:** — | **Jason:** paste bio + save

---

### P3 — Combine Editions — **Jason manual**

Author page → **Combine Editions** → merge:

| Duplicate | Into canonical |
|-----------|----------------|
| 251407365 | 253640099 (Vol I) |
| 251753947 | 253641522 (Vol II) |
| 251783293 | 253641205 (Vol III) |
| 252929307 | 252797588 (Omnibus) |

Also: generic **253243207** → combine into Vol I; **56035497** (crypto) → unlink from bibliography.

**Agent:** — | **Jason:** 6 merge actions

---

### Summary

| Priority | Item | Agent | Jason |
|----------|------|-------|-------|
| P0 | Omnibus ACE + metadata | Blocked (no tab) | Cover + ISBN + desc + set primary |
| P1 | Hawkes cover + metadata | Blocked | Cover + title/subtitle/format/ISBN/pages/date |
| P1 | Vol I–III ACE | Blocked | 3× cover + set primary |
| P2 | Author bio/website/genre | Blocked | Paste + save |
| P3 | Combine dupes | Blocked | 6 merges |

**Next:** Jason completes P0+P1 (~8 min), replies **"tab ready"** if he wants agent to fill remaining metadata fields, or **"done: GR full audit"** when all rows above are checked.

---

## Execution log — 2026-08-01 ~8:08 PM ("proceed" approved)

**Agent:** Morgan browser subagent (Jason: *"proceed — assuming you don't need me"*)  
**Directive:** Execute P0→P4 with minimal Jason involvement; file-picker clicks only.

### Browser MCP — STILL BLOCKED (subagent)

| Attempt | Result |
|---------|--------|
| `browser_tabs` list ×3 | **Empty** each time — cannot see Jason's open GR tabs |
| `browser_tabs` new (background) | Created `viewId:342d95` → **lost before navigate** |
| `browser_tabs` new (side) | Created `viewId:b32e8d` → **lost before navigate** |
| `browser_navigate` (default, newTab, viewId) | **FAILED** — *No browser tab available* / *Browser view not found* |
| `browser_lock` | **FAILED** — no tab |
| `open_resource` (https URL) | **FAILED** — agent routing error |
| Forms touched | **None** — no corrupted fields |

**Conclusion:** Subagents cannot attach to Jason's GR session. **Parent Morgan chat** (with Jason's tabs visible) must run metadata automation. Jason's only required actions: **OS file-picker clicks** for cover uploads (~5 files).

### Public scrape — no changes since prior run

| Item | Current (2026-08-01 ~8:10 PM) | Still needed |
|------|-------------------------------|--------------|
| **252797588 Omnibus** | Co-author **Jason C. Holloway** still listed; 686 pp HC Jun 1 2026; **no description**; pre-v3 cover | ACE v3 cover, remove co-author, paste description, set primary |
| **253986900 Hawkes** | Title lowercase; **Unknown Binding**; placeholder cover; no ISBN/pages/date/desc | Cover upload + full metadata |
| **Author 20924993** | Bio **duplicated**; Website/Genre fields empty on page; no StoryGraph in main bio | Paste EXPORT_GATE bio; website + genre |
| **Dupes** | 10 distinct works; 4× Jason C. Holloway co-author editions | Combine Editions (6 merges) |

### Local cover files verified ✓ (unchanged)

| File | Exists |
|------|--------|
| `production_staging/_covers/web/omnibus-hardcover-v3.png` | ✓ 3.7 MB |
| `public/covers/hawkes-paperback.png` | ✓ 1.5 MB |
| `book{1,2,3}-hardcover-v3.png` | ✓ |

---

### What parent Morgan can automate (once tab attached)

**Requires:** Jason keeps GR logged-in tab open; parent chat runs browser MCP (not subagent).

| Priority | Agent automates | Jason |
|----------|-----------------|-------|
| **P0** | Remove co-author "Jason C. Holloway"; paste omnibus description via `browser_type`; add change comment; **Save** | **ONE click:** file picker → `omnibus-hardcover-v3.png` on ACE flow; **ONE click:** Set as primary |
| **P1 Hawkes** | Title/subtitle case, format PB, ISBN `9798295778247`, 84 pp, pub `2026-04-02`, publisher, description paste, Save | **ONE click:** file picker → `hawkes-paperback.png` |
| **P2 Author** | Website, genre, bio paste from EXPORT_GATE, Save | — |
| **P3 Combine** | Navigate Combine Editions; select merge pairs | Confirm merge dialogs if GR prompts |
| **P4 Vol I–III** | ACE metadata per volume | **3 clicks:** file picker ×3 for v3 covers + set primary each |

**Do NOT use `browser_fill` on GR forms** — use `browser_click` + `browser_type` only.

**Correct edit URLs:** `/book/edit/{id}` (not `/book/show/{id}/edit`).

---

### Jason minimum-involvement checklist (~5 min)

If parent agent cannot attach either, Jason does this alone:

1. **P0** — Open https://www.goodreads.com/book/edit/252797588  
   - ⋮ → Add alternate cover edition → **pick** `omnibus-hardcover-v3.png` → Save → Set as primary  
   - Delete co-author Jason C. Holloway; paste description from § P0 above; comment: *SCP v3 cover + metadata sync per fact sheet*

2. **P1** — Open https://www.goodreads.com/book/edit/253986900  
   - **Pick** `hawkes-paperback.png`; fix title/subtitle/format/ISBN/pages/date (values in § P1 above)

3. Reply **"tab ready"** → parent Morgan fills P2 author + P3 combines without Jason.

---

### Session summary

| Priority | Item | Fully automated | Needs Jason |
|----------|------|-----------------|-------------|
| P0 | Omnibus ACE + metadata | **Blocked** (no tab) | Cover file picker + set primary (or full manual if no tab) |
| P1 | Hawkes cover + metadata | **Blocked** | Cover file picker (metadata agent-fillable once tab ready) |
| P2 | Author bio/website/genre | **Blocked** | — (agent-only once tab ready) |
| P3 | Combine dupes | **Blocked** | Merge confirm clicks if prompted |
| P4 | Vol I–III ACE | **Not attempted** | 3× cover file picker |

**Status:** No GR changes made this session. Unblock = parent chat browser on Jason's open tab, or Jason P0+P1 file picks (~2 min) then **"tab ready"**.

---

## Execution log — 2026-08-01 ~8:32 PM ("go metadata" approved)

**Agent:** Morgan browser subagent  
**Jason directive:** Metadata-only fixes (covers deferred — GR blocks upload). Fix order: Combine → Hawkes → Vol I–III + Omnibus → Author → shelves → export gate checklist.

### Browser MCP — BLOCKED (subagent, 6 attempts)

| Attempt | Result |
|---------|--------|
| `browser_tabs` list ×4 | **Empty** each time — cannot see Jason's open GR tabs |
| `browser_tabs` new (background) | Created `viewId:001631` → **lost before navigate** |
| `browser_tabs` new (side) | Created `viewId:0a51a0` → **lost before navigate** |
| `browser_navigate` (with/without viewId, newTab) | **FAILED** — *No browser tab available* / *Browser view not found* |
| `open_resource` (https URL) | **FAILED** — agent routing error |
| Forms touched | **None** — zero fields corrupted |

**Root cause:** Unchanged — subagents cannot attach to Jason's GR session; **parent Morgan chat** must run browser MCP on Jason's logged-in tab.

### Public scrape verification (~8:35 PM) — current GR state

| Item | Public page status | Gate |
|------|-------------------|------|
| **Author website** | `https://jasoncholloway.com/` saved ✓ | **G1 pass** |
| **Author genre** | Fiction, **Historical Fiction**, Thriller (canonical: Literary Fiction) | **G2 partial** |
| **Author bio** | Masters X blurb + Field Notes + comp list; **no StoryGraph, no seventhcitypress.com** | **G3 fail** |
| **Public shelves** | `foucaults-pendulum-readers`, `literary-conspiracy-thriller`, `prague-thriller-fiction` found on author page | **G4 likely pass** — spot-check books on shelves |
| **Distinct works** | **10** (dupes not merged) | Combine pending |
| **Hawkes 253986900** | Title lowercase (*architecture of the fall*); placeholder cover; no ISBN/pages/pub/desc on public page | **Not saved** |
| **Omnibus 252797588** | Title OK; pre-v3 cover; no ISBN/publisher/series/description on public page | **Not saved** (prior edit-page pre-fill not reflected publicly) |
| **Vol I–III** | Pre-v3 covers; no series/publisher/description on public pages | **Not saved** |
| **Covers (all)** | — | **Deferred** — GR UI blocks upload |

### Metadata-only session results

| # | Item | URL | Saved | Blocked / Jason action |
|---|------|-----|-------|------------------------|
| 1 | **Combine Editions** (5 merges + generic 253243207) | [author page](https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway) | — | **Blocked** — no tab. Jason: merge 251407365→253640099, 251753947→253641522, 251783293→253641205, 252929307→252797588, 253243207→253640099 |
| 2 | **Hawkes** (253986900) | `/book/edit/253986900` | — | **Blocked** — no tab. Paste: title/subtitle/PB/ISBN 9798295778247/84 pp/pub 2026-04-02/publisher/description §P1 → **Save** |
| 3 | **Vol I–III + Omnibus** | `/book/edit/{id}` | — | **Blocked** — no tab. Add series *Masters X*, publisher, ISBNs, descriptions from books.ts; omnibus remove co-author Jason C. Holloway |
| 4 | **Author** (20924993) | `/author/edit/20924993` | **Partial** — website ✓, genre partial | **Bio paste remaining** — add StoryGraph + seventhcitypress.com per EXPORT_GATE; fix Literary Fiction if desired |
| 5 | **Public shelves** (3) | My Books → Bookshelves | **Likely done** (names on author page) | Spot-check Vol I–III + omnibus on each shelf |
| 6 | **CSV export** | My Books → Tools → Import and Export | — | **Jason only** — after G1–G5 pass; do not export without approval |
| — | **Covers** (all editions) | — | **Skipped** | **Deferred** — GR UI blocks ACE/upload |

### Export gate checklist (Jason evening)

- [x] G1 Website saved (`https://jasoncholloway.com/`)
- [ ] G2 Genre — change Historical Fiction → **Literary Fiction** (optional but canonical)
- [ ] G3 About — paste EXPORT_GATE block (StoryGraph + seventhcitypress.com)
- [ ] G4 Public shelves — verify books assigned to all 3 comp shelves
- [ ] G5 Spot-check author page after book metadata saves
- [ ] Book metadata — Hawkes + Vol I–III + Omnibus descriptions/series/publisher/ISBN
- [ ] Combine Editions — reduce 10 → ~5 distinct works
- [ ] **CSV export** — Jason clicks Export Library when gate passes

### Handoff → parent Morgan chat OR Jason manual (~15 min)

**Unblock:** Jason keeps GR logged-in tab open in Cursor browser; parent chat runs browser MCP.

**Parent can automate (metadata-only, no covers):** Combine → Hawkes → Vol I–III + Omnibus → Author bio paste → Save each.

**Rules:** `browser_tabs list` first · `/book/edit/{id}` URLs · **never `browser_fill`** · use `browser_click` + `browser_type` only.

**Jason minimum if no tab attach:** Open edit URLs above, paste from §P0–P1 + EXPORT_GATE + books.ts descriptions, click Save on each. Covers skipped.

**Jason reply when complete:** **"done: GR metadata + gate"** → proceed to CSV export → StoryGraph.

---

## Execution log — 2026-08-02 ~1:55 AM (parent Morgan chat follow-up)

**Trigger:** [GR metadata-only fixes](b4e07054-b326-4ba9-b73b-84290280bfba) subagent blocked (empty `browser_tabs` ×3). Parent chat resumed with Jason's logged-in tab (`viewId: e2da43`).

### Saved this session (CDP + click, no `browser_fill`)

| Item | ID | Result |
|------|-----|--------|
| **Hawkes** | 253986900 | **Saved ✓** — title+subtitle case, PB, ISBN 9798295778247, 84 pp, pub 2026-04-02, Seventh City Press, full description §P1 |
| **Omnibus** | 252797588 | **Saved ✓** — full description §P0 pasted; ISBN/pages/date/HC already correct; duplicate author row removed on save (was Jason Carroll ×2) |

### Still open (~10 min)

| # | Item | Notes |
|---|------|-------|
| 1 | **Vol I–III** (253640099, 253641522, 253641205) | Add series *Masters X*, publisher, descriptions from books.ts |
| 2 | **Author bio** (20924993) | G3 — paste EXPORT_GATE block (StoryGraph + seventhcitypress.com); optional G2 Literary Fiction |
| 3 | **Combine Editions** | 5 merges — reduce 10 distinct works |
| 4 | **G4 shelf spot-check** | Shelves exist on author page; verify books assigned |
| 5 | **CSV export** | Jason only, after gate pass |

**Covers:** Still deferred (GR blocks upload).

---

## Execution log — 2026-08-02 ~2:05 AM (parent follow-up to [GR metadata-only fixes](ef18cfb8-c9d0-41ac-9d5a-d79af2565a73))

**Subagent:** Blocked again (empty `browser_tabs` ×4). **Parent chat** continued on `viewId: e2da43`.

### Additional saves this session

| Item | ID | Result |
|------|-----|--------|
| **Vol I** | 253640099 | **Saved ✓** — description, ISBN 9798256008819, pub date Jun 1 |
| **Vol II** | 253641522 | **Saved ✓** — description, ISBN 9798256009625, pub date Jun 1 (verified on reload) |
| **Vol III** | 253641205 | **Saved ✓** — description, ISBN 9798256009809, pub date Jun 1 |
| **Author bio** | 20924993 | **Already complete ✓** — EXPORT_GATE block incl. StoryGraph + seventhcitypress.com |
| **Hawkes + Omnibus** | — | Saved prior session (~1:55 AM) — subagent report was stale |

### Export gate (updated)

- [x] G1 Website
- [ ] G2 Genre — still Historical Fiction (Literary Fiction not applied; low priority)
- [x] G3 About — StoryGraph + seventhcitypress present
- [x] G4 Public shelves — 3 comp slugs on author page
- [ ] G5 Spot-check public book pages after 15 min cache refresh
- [ ] **Combine Editions** — 5 merges still pending (10 distinct works)
- [ ] **Series *Masters X*** — not set on Vol I–III (GR series UI needs manual click)
- [ ] **CSV export** — Jason only

**Jason reply when ready:** **"done: GR metadata + gate"** after Combine + CSV export.

---

## Execution log — 2026-08-02 ~2:15 AM ("go combines" approved)

**Agent:** Morgan browser subagent  
**Jason directive:** Execute 5 Combine Editions merges (metadata dedupe).

### Browser MCP — BLOCKED (subagent)

| Attempt | Result |
|---------|--------|
| `browser_tabs` list | **Empty** — cannot see Jason's logged-in GR tab (`viewId: e2da43`) |
| `browser_tabs` new (background) | Created `viewId: cb9b2a` → **lost before navigate** |
| `browser_navigate` (default) | **FAILED** — *No browser tab available* |
| `browser_navigate` (viewId: cb9b2a) | **FAILED** — *Browser view not found* |
| `browser_lock` | **FAILED** — no tab |
| Forms touched | **None** — zero merges attempted |

**Root cause:** Unchanged — subagents cannot attach to Jason's GR session. **Parent Morgan chat** must run Combine Editions on Jason's logged-in tab.

### Combine Editions results

| # | Duplicate → Canonical | Title | Result | Notes |
|---|----------------------|-------|--------|-------|
| 1 | 251407365 → 253640099 | Vol I HC dupe → Vol I Kindle primary | **Blocked** | No browser tab |
| 2 | 251753947 → 253641522 | Vol II HC dupe → Vol II Kindle primary | **Blocked** | No browser tab |
| 3 | 251783293 → 253641205 | Vol III HC dupe → Vol III Kindle primary | **Blocked** | No browser tab |
| 4 | 252929307 → 252797588 | Omnibus PB dupe → Omnibus HC primary | **Blocked** | No browser tab |
| 5 | 253243207 → 253640099 | Generic "Masters X" → Vol I | **Blocked** | No browser tab |

**Distinct works count:** Still **10** (unchanged — merges not executed).

### Manual steps for Jason OR parent chat

Per merge, from canonical edit page (`/book/edit/{canonical_id}`):

1. Click **Combine editions** in sidebar
2. Search/select duplicate edition ID
3. Confirm merge if prompted

| Merge | Start URL |
|-------|-----------|
| Vol I HC | https://www.goodreads.com/book/edit/253640099 → merge 251407365 |
| Vol II HC | https://www.goodreads.com/book/edit/253641522 → merge 251753947 |
| Vol III HC | https://www.goodreads.com/book/edit/253641205 → merge 251783293 |
| Omnibus PB | https://www.goodreads.com/book/edit/252797588 → merge 252929307 |
| Generic Masters X | https://www.goodreads.com/book/edit/253640099 → merge 253243207 |

**Expected after all 5 merges:** Distinct works **10 → ~5** (Vol I–III, Omnibus, Hawkes + crypto stray).

**Handoff:** Parent Morgan chat with Jason's GR tab open → run merges via CDP/click (never `browser_fill`).

---

## Execution log — 2026-08-02 ~2:25 AM (parent "continue combines" — subagent blocked)

**Agent:** Morgan browser subagent (continuing parent session on `viewId: e2da43`)  
**Parent progress before handoff:**

| Step | Result |
|------|--------|
| Vol I merge (works 290475023 + 294525959) | **Enqueued ✓** — "Enqueued job to combine works" |
| HC Vol I author fix (251407365) | **Saved ✓** — primary author → Jason Carroll Holloway |
| HC Vol II author fix (251753947) | **Attempted** — parent session; verify on filter page |
| HC Vol III author fix (251783293) | **Attempted** — parent session; verify on filter page |

### Browser MCP — BLOCKED (subagent, 2026-08-02 ~2:25 AM)

| Attempt | Result |
|---------|--------|
| `browser_tabs` list | **Empty** — cannot see Jason's tab (`viewId: e2da43`) |
| `browser_navigate` (viewId: e2da43) | **FAILED** — *Browser view not found* |
| `browser_tabs` new (side) → `viewId: f8d7ae` | Created → **lost before navigate** |
| `browser_navigate` (newTab: true) | **FAILED** — *No browser tab available* |
| `browser_cdp` (viewId: e2da43) | **FAILED** — *No browser tab available* |
| `open_resource` (https URL) | **FAILED** — agent routing error |
| Merges attempted this subagent | **None** |

**Root cause:** Unchanged — subagents cannot attach to Jason's GR session. **Parent Morgan chat** must complete remaining merges on `viewId: e2da43`.

### Combine Editions results (full run)

| # | Merge | Work IDs | Filter URL | Result | Notes |
|---|-------|----------|------------|--------|-------|
| 1 | Vol I HC+Kindle | 290475023, 294525959 | `?filter=work&value=290475023,294525959` | **Enqueued ✓** | Parent session — job queued; public page still shows 251407365 separate (GR async) |
| 2 | Vol II HC+Kindle | 291334472, 294528456 | `?filter=work&value=291334472,294528456&commit=Find+Works` | **Pending** | Subagent blocked; fix author 251753947 if HC missing |
| 3 | Vol III HC+Kindle | 291410617, 294527579 | `?filter=work&value=291410617,294527579&commit=Find+Works` | **Pending** | Subagent blocked; fix author 251783293 if HC missing |
| 4 | Omnibus PB+HC | 293373809, 293617509 | `?filter=work&value=293373809,293617509&commit=Find+Works` | **Pending** | Subagent blocked |
| 5 | Generic Masters X → Vol I | 294081989, 294525959 | `?filter=work&value=294081989,294525959&commit=Find+Works` | **Pending** | Subagent blocked |
| 6 | Generic Masters X internal dupes | 253243207, 253243429 | Default combine page (no filter) | **Pending** | Subagent blocked — check row on `/book/combine/20924993.Jason_Carroll_Holloway` |

**Base URL (prepend utf8 param):**  
`https://www.goodreads.com/book/combine/20924993.Jason_Carroll_Holloway?utf8=%E2%9C%93&…`

**Author fix URLs (if HC work missing on filter page):**

| Book ID | Edit URL | Fix |
|---------|----------|-----|
| 251753947 | https://www.goodreads.com/book/edit/251753947 | `author[name]` → `Jason Carroll  Holloway` (double space per parent); delete secondary author; save with comment |
| 251783293 | https://www.goodreads.com/book/edit/251783293 | Same |

**Per-merge automation (parent chat):** Navigate filter URL → CDP check all work checkboxes → click **Combine Editions** → confirm "Enqueued job to combine works".

**Rules:** Never `browser_fill`; use CDP `Runtime.evaluate` for form values; `browser_navigate` + `browser_cdp` + `browser_click`.

### Author page post-merge check (public scrape ~2:28 AM)

| Metric | Value |
|--------|-------|
| **Distinct works** | **10** (unchanged — async merge + 5 merges still pending) |
| **Book IDs visible** | 251407365, 251753947, 251783293, 252797588, 252929307, 253243207, 253640099, 253641205, 253641522, 253986900, 56035497 |
| **Expected after all merges** | **~5–6** distinct works (Vol I–III, Omnibus, Hawkes + crypto stray) |

### Blockers

1. **Subagent browser attach** — cannot see/use `viewId: e2da43`; parent chat must run remaining 5 merges.
2. **GR async combine jobs** — Vol I enqueued but not yet reflected on public author page.
3. **Author mismatch on HC dupes** — Vol II/III HC may not appear on filter until author fix confirmed saved.

### Handoff → parent Morgan chat

Complete merges 2–6 on Jason's logged-in tab, then re-check:  
https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway

**Jason reply when all enqueued:** **"done: GR combines"** → proceed to CSV export gate.

---

## Execution log — 2026-08-02 ~3:00 AM (parent follow-up — subagent handoff completed)

**Agent:** Parent Morgan chat (`viewId: d61b59`)  
**Subagent [Finish GR edition merges](3a3473ed-3bcd-4f2f-865d-19fd8089f6e8) was blocked; parent completed remaining work.**

### Root cause resolved — Omnibus HC author profile split

Omnibus HC (252797588) was linked to **duplicate author profile 71590441** instead of canonical **20924993**. Combine sidebar on HC edit pointed to `/book/combine/71590441…`, so work 293373809 never appeared on Jason Carroll Holloway (20924993) filter pages.

**Fix applied:** `/book/edit/252797588` — set `author[name]` → `Jason Carroll  Holloway` (double space); saved with comment. After save, both Omnibus works appeared on filter.

### Combine Editions — final status

| # | Merge | Work IDs | Result | Notes |
|---|-------|----------|--------|-------|
| 1 | Vol I HC+Kindle | 290475023 + 294525959 | **Done ✓** | Async job completed; Vol I row shows Kindle + PB + HC editions |
| 2 | Vol II HC+Kindle | 291334472 + 294528456 | **Done ✓** | 3 editions in works[294528456] |
| 3 | Vol III HC+Kindle | 291410617 + 294527579 | **Done ✓** | 3 editions in works[294527579] |
| 4 | Omnibus PB+HC | 293373809 + 293617509 | **Done ✓** | After author fix; PB+HC in works[293617509] |
| 5 | Generic Masters X → Vol I | 294081989 + 294525959 | **Enqueued ✓** | Confirmed "Enqueued job to combine works" (~3:00 AM) |
| 6 | Generic internal dupes | 253243207 + 253243429 | **N/A** | Absorbed by merge #5 (cross-work combine) |

### Author page check (logged-in, ~3:00 AM)

| Metric | Before | After |
|--------|--------|-------|
| **Distinct works** | 10 | **6** |
| SCP catalog works | Vol I–III, Omnibus, Generic Masters X (duped) | Vol I–III, Omnibus, Generic Masters X (pending async #5) |
| Non-SCP | Innocence, Desire… (crypto stray, 7 editions) | Same — do NOT combine with SCP |

**Remaining after async #5 completes:** Generic "Masters X" work should collapse into Vol I → target **5 distinct works** (Vol I–III, Omnibus, Hawkes + crypto stray).

### Export gate status

- [x] All 6 combine jobs enqueued or completed
- [ ] Re-check distinct works after ~15 min (merge #5 async)
- [ ] G5 spot-check + cache refresh on canonical editions
- [ ] Series *Masters X* on Vol I–III (manual GR UI)
- [ ] CSV export — Jason only

**Jason reply when verified:** **"done: GR combines"** → CSV export gate.

---

## Confirmation — "done: GR combines" (2026-08-01 ~10:11 PM)

**Jason verified:** All 6 Combine Editions jobs complete. Proceed to export gate.

### Verification snapshot (public scrape, same session)

| Metric | Value | Expected post-merge |
|--------|-------|---------------------|
| **Distinct works (public)** | **10** | **~5–6** (Vol I–III, Omnibus, Hawkes + crypto stray 56035497) |
| **GR cache lag** | Suspected | Public author page not yet collapsed dupes; logged-in view may differ |

### Works visible on public author page (pre-cache refresh)

| GR ID | Title | Editions (public) | Merge status |
|-------|-------|-------------------|--------------|
| 253640099 | Vol I : Volume One | — | Canonical; HC dupe 251407365 should collapse |
| 251407365 | Vol I (HC) | 2 | **Merged ✓** (Jason) |
| 253641522 | Vol II : Volume Two | — | Canonical |
| 251753947 | Vol II (HC) | 2 | **Merged ✓** (Jason) |
| 253641205 | Vol III : Volume Three | — | Canonical |
| 251783293 | Vol III (HC) | 2 | **Merged ✓** (Jason) |
| 252797588 | Omnibus HC | — | Canonical |
| 252929307 | Omnibus PB | — | **Merged ✓** (Jason) |
| 253243207 | Generic "Masters X" | 2 | **Merged into Vol I ✓** (Jason) |
| 253986900 | Hawkes monograph | 7 | Separate work — **do NOT combine** |
| 56035497 | Crypto stray | (in Hawkes work 287907355) | **Do NOT combine with SCP** |

### Author metadata (public scrape)

| Field | Status |
|-------|--------|
| Website | ✓ `https://jasoncholloway.com/` |
| Genre | Fiction, Historical Fiction, Thriller (Literary Fiction optional) |
| Bio StoryGraph + seventhcitypress | Not visible on public scrape — saved in prior logged-in session |
| Public comp shelves | ✓ 3 gate shelves + 2 bonus (4 books each) |

### Export gate handoff

→ See [`GOODREADS_EXPORT_GATE_2026-08-01.md`](GOODREADS_EXPORT_GATE_2026-08-01.md) for G1–G5 status and Jason CSV checklist.

**Next Jason action:** Spot-check logged-in author page (expect ~5–6 works) → Export Library CSV → reply **"GR updated, CSV exported"** → StoryGraph import via [`STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md`](STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md).
