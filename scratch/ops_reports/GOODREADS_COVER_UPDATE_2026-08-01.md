# Goodreads Cover Update — Jason Carroll Holloway

**Generated:** 2026-08-01 (evening)  
**Author ID:** 20924993  
**Author page:** https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway  
**Agent:** Morgan (public audit + browser MCP retry)  
**Jason directive:** "Covers first" — update all SCP titles before GR export gate

> **Superseded for cover verdicts:** Full pixel+metadata audit → [`GOODREADS_FULL_AUDIT_2026-08-01.md`](GOODREADS_FULL_AUDIT_2026-08-01.md). **0/10 covers pass v3** — omnibus P0 (old dome art), trilogy pre-v3 geometry, Hawkes placeholder. This doc remains useful for upload rules and click paths.
>
> **2026-08-01 update:** Jason **cannot upload covers** via ACE or direct edit — Goodreads UI restriction. Covers deferred; proceed metadata-only path per FULL_AUDIT § Cover upload blocked.

---

## Status summary

| Verdict | Count | Meaning |
|---------|-------|---------|
| **P0 — replace cover now** | 1 | Omnibus HC (252797588) — pre-v3 rotunda/dome, not v3 mandala |
| **P1 — placeholder upload** | 2 | Hawkes + generic "Masters X" (`goodreads_wide` logo) |
| **P1 — ACE v3 refresh** | 7 | Vol I–III Kindle + 4 HC dupes — pre-v3 art, "Jason C. Holloway" on jacket |
| **P2 cleanup** | 4 | Duplicate "Jason C. Holloway" co-author editions → Combine Editions |
| **P3 — investigate** | 1 | Unrelated crypto book (56035497) |
| **Browser MCP** | **BLOCKED** | Tab created → lost on navigate (same subagent blocker as prior GR runs) |

**Nothing was uploaded by the agent.** All uploads require Jason logged in as Goodreads Author.

---

## Goodreads cover rules (author)

Goodreads **does not allow deleting or replacing** an existing cover on a published edition. Policy: readers may have shelved the old cover.

| Situation | What to do |
|-----------|------------|
| Edition already has a cover (even wrong/old) | Create **Alternate Cover Edition (ACE)** → upload new image → **Set as primary edition** |
| Edition has **placeholder** (Goodreads wide logo) | Edit edition directly → upload cover (may work without ACE) |
| Duplicate listings (Jason C. Holloway vs Jason Carroll Holloway) | **Combine Editions** on author page first, then fix cover on canonical edition |
| Cover dimensions | Prefer **≥500×750** JPG/PNG. Local `*-hardcover-v3.png` files are 2000×3000 ✓ |

**Author FAQ:** https://www.goodreads.com/topic/show/1012751-author-faq-authors-look-here-first  
**Help:** https://help.goodreads.com/s/question/0D58V000086js46SAA/ (ACE workflow)

---

## Canonical cover file map

### Primary upload files (meet Goodreads size minimum)

| Title | Recommended local file | Dimensions | Live URL fallback |
|-------|------------------------|------------|-------------------|
| Vol I | `public/covers/book1-hardcover-v3.png` | 2000×3000 | https://jasoncholloway.com/covers/book1-hardcover-v3.png |
| Vol II | `public/covers/book2-hardcover-v3.png` | 2000×3000 | https://jasoncholloway.com/covers/book2-hardcover-v3.png |
| Vol III | `public/covers/book3-hardcover-v3.png` | 2000×3000 | https://jasoncholloway.com/covers/book3-hardcover-v3.png |
| Omnibus | `public/covers/omnibus-hardcover-v3.png` | 2000×3000 | https://jasoncholloway.com/covers/omnibus-hardcover-v3.png |
| Hawkes | `public/covers/hawkes-paperback.png` | 1850×2775 | https://jasoncholloway.com/covers/hawkes-paperback.png |

### Alternate / format-specific sources

| Use case | Local path | Notes |
|----------|------------|-------|
| Kindle edition cover | `public/covers/book{N}-ebook.jpg` | 1600×2400 — good for Kindle-listed GR editions |
| Paperback (web) | `public/covers/book{N}-paperback.png` | **434×673** — below GR recommended minimum; avoid for upload |
| Production staging HC | `production_staging/_covers/web/book{N}-hardcover-v3.png` | Same as public v3 |
| Omnibus PB (staging) | `production_staging/omnibus/9798256072704_PB/cover_front_web.png` | PB variant if needed |
| Hawkes HC | `public/covers/hawkes-hardcover.png` | 1640×2460 alt |

All `public/covers/` files confirmed present locally (2026-08-01).

---

## Per-book status table

### P0 — Canonical editions (update or verify)

| Book | GR book URL | Work ID | Current cover | Local file | Status | Upload steps |
|------|-------------|---------|---------------|------------|--------|--------------|
| **Masters X: The Inheritance of Frequency : Volume One** | https://www.goodreads.com/book/show/253640099 | 294525959 | Pre-v3 cymatics geometry; "Jason C. Holloway" on art | `book1-hardcover-v3.png` | **ACE + set primary** | Not placeholder but **wrong art** vs v3. See FULL_AUDIT. |
| **Masters X: The Grimoire: Volume Two** | https://www.goodreads.com/book/show/253641522 | 294528456 | Pre-v3 labyrinth geometry | `book2-hardcover-v3.png` | **ACE + set primary** | Same — replace with v3. |
| **Masters X: The Kingdom : Volume Three** | https://www.goodreads.com/book/show/253641205 | 294527579 | Pre-v3 astrolabe geometry | `book3-hardcover-v3.png` | **ACE + set primary** | Same — replace with v3. |
| **Masters X: The Complete Trilogy** | https://www.goodreads.com/book/show/252797588 | 293373809 | **P0 — pre-v3 rotunda/dome** (not v3 mandala) | `omnibus-hardcover-v3.png` | **ACE + set primary — DO FIRST** | Jason flagged this. Evidence: `scratch/_gr_cover_compare/`. |

### P1 — Missing covers (Jason must upload)

| Book | GR book URL | Work ID | Current cover | Local file | Status | Upload steps |
|------|-------------|---------|---------------|------------|--------|--------------|
| **Innocence, Desire, and the architecture of the fall** (Hawkes) | https://www.goodreads.com/book/show/253986900 | 287907355 | **Placeholder** (Goodreads wide logo) | `hawkes-paperback.png` | **MANUAL — upload** | See §B below. **Highest priority.** |
| **Masters X** (generic, no subtitle) | https://www.goodreads.com/book/show/253243207 | — | **Placeholder** | — | **MANUAL — merge or cover** | Combine with canonical Vol I work OR upload Vol I cover. Likely stray listing. |

### P2 — Duplicate co-author editions

| Book | GR book URL | Current cover | Canonical twin | Status | Upload steps |
|------|-------------|---------------|----------------|--------|--------------|
| Masters X: The Inheritance of Frequency (co-author) | https://www.goodreads.com/book/show/251407365 | HC cover present | 253640099 | **MANUAL — combine** | Author page → **Combine Editions** → merge into 253640099 |
| Masters X: The Grimoire (co-author) | https://www.goodreads.com/book/show/251753947 | Cover present | 253641522 | **MANUAL — combine** | Merge into 253641522 |
| Masters X: The Kingdom (co-author) | https://www.goodreads.com/book/show/251783293 | Cover present | 253641205 | **MANUAL — combine** | Merge into 253641205 |
| Masters X: The Complete Trilogy (co-author) | https://www.goodreads.com/book/show/252929307 | PB cover present | 252797588 | **MANUAL — combine** | Merge into 252797588 |

### P3 — Unrelated / remove

| Book | GR book URL | Status | Action |
|------|-------------|--------|--------|
| The Digital Gold Rush: A Beginner's Guide to Crypto Tra… | https://www.goodreads.com/book/show/56035497 | **Wrong book on author shelf** | Remove from author bibliography via edit/unlink or librarian request |

---

## Upload click paths

### Login (once)

1. https://www.goodreads.com/user/sign_in → **Continue with Amazon** (KDP account)
2. Confirm **Goodreads Author** badge on https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway

### §A — Edition with existing cover (Vol I–III, omnibus if art wrong)

Use when current cover is outdated but edition already has an image.

1. Open book page (URLs in table above)
2. Click **⋮** (three dots) next to **Edit details** → **Add alternate cover edition**
   - Alt path: open **All editions** → https://www.goodreads.com/work/editions/{WORK_ID} → **Add new edition**
3. On new edition **Edit** page (e.g. `/book/show/{NEW_ID}/edit`):
   - **Upload cover image** → select local `*-hardcover-v3.png`
   - Fill format (Hardcover / Kindle) + ISBN if prompted
   - **Save**
4. On same edit page, right sidebar → **Set this book as the primary edition for this work**
5. Wait up to 48h for author-page default to propagate

**Edit URLs (canonical editions):**

| Title | Edit URL |
|-------|----------|
| Vol I | https://www.goodreads.com/book/show/253640099/edit |
| Vol II | https://www.goodreads.com/book/show/253641522/edit |
| Vol III | https://www.goodreads.com/book/show/253641205/edit |
| Omnibus | https://www.goodreads.com/book/show/252797588/edit |

### §B — Placeholder cover (Hawkes — do this first)

1. Open https://www.goodreads.com/book/show/253986900
2. Click **Edit details** (pencil icon) — or go to https://www.goodreads.com/book/show/253986900/edit
3. **Upload cover image** → `public/covers/hawkes-paperback.png` (1850×2775)
4. Verify **Unknown Binding** → set format to **Paperback** or **Hardcover** as appropriate (ISBN 9798295778926)
5. **Save**
6. If upload blocked → use §A ACE flow instead, then set primary

### §C — Combine duplicate editions (~5 min)

1. Author page → **Combine Editions** (below author bio)
2. Search each duplicate pair (251407365 ↔ 253640099, etc.)
3. Merge co-author listings under **Jason Carroll Holloway** canonical edition
4. Re-run §A on canonical edition if merged edition had better cover

---

## Browser MCP log (this run)

| Step | Result |
|------|--------|
| `browser_tabs` list | Empty (Jason had no GR tab open) |
| `browser_tabs` new (background) | ✓ Created `viewId: ce2bf8` → **lost on navigate** |
| `browser_tabs` new (side) | ✓ Created `viewId: 53ce3c`, `186322` → **lost on navigate** |
| `browser_navigate` → author or book page | **FAILED** — *Browser view not found* |
| Cover upload attempted | **No** — login + file picker require stable tab |

**Handoff:** Parent agent or Jason opens Goodreads in agent-controlled browser, confirms `browser_tabs list` shows stable tab, Jason logs in, then agent can walk through §B Hawkes upload first.

---

## Recommended order (~15 min)

1. **Hawkes** (253986900) — only title with placeholder on canonical listing → §B
2. **Spot-check** Vol I–III + omnibus covers against v3 art → §A only if mismatch
3. **Combine Editions** on 4 duplicate co-author listings → §C
4. **Masters X** generic (253243207) — merge or delete stray listing
5. **Crypto book** (56035497) — remove from author page
6. Author page spot-check → reply **"done: GR covers"**

Then proceed: `GOODREADS_EXPORT_GATE_2026-08-01.md` (bio/shelves/export).

---

## Audit evidence

- Author page scraped 2026-08-01: 11 book IDs found; 10 SCP + 1 unrelated
- Placeholder detection: `og:image` contains `goodreads_wide` → Hawkes + generic Masters X
- Vol I hash compare: GR cover (MD5 `E1606BC6…`) ≠ local paperback PNG (`0DD46178…`) — expected (Amazon Kindle vs local PB file); dimensions GR 322×500 vs local PB 434×673 vs **v3 HC 2000×3000**
- Prior partial report merged from `GOODREADS_COVER_UPDATE_2026-08-01.md` (stub)

---

## Bulk catalog upload FAQ

**Jason asked (2026-08-01):** "Can't you upload a fresh catalog with covers to Goodreads?"

**Answer: NO.** Goodreads has no bulk catalog+covers upload in 2026.

| Method | Works for catalog? | Covers? |
|--------|-------------------|---------|
| CSV at `/review/import` | Personal shelves only | ✗ |
| Developer API | Retired 2020 | ✗ |
| Author Dashboard / `book/new` | One edition at a time | ✓ per form |
| KDP Kindle auto-import | Kindle ASINs only | ✓ (already live Vol I–III) |
| Ingram ONIX import | Slow, partial | Often missing (Hawkes) |

**Fastest covers path (~10 min):** Hawkes upload + Combine dupes — Vol I–III + omnibus already OK.  
**Full 14-edition catalog:** ~60–90 min manual adds — not recommended unless ISBN parity required.

Full research: `scratch/ops_reports/GOODREADS_BULK_CATALOG_FAQ_2026-08-01.md`
