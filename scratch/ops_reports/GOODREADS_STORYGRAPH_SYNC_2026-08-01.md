# Goodreads ↔ StoryGraph Sync — 2026-08-01

**Agent:** Morgan (cursor-ide-browser MCP + public fetch)  
**Jason request:** Update Goodreads author page + connect to StoryGraph  
**Vivian gate:** Bio copy matches press kit / `goodreads-comp-shelves.md` — no unverified trade claims

---

## Status summary

| Platform | Verdict | Notes |
|----------|---------|-------|
| **Goodreads** | **PARTIAL — JASON CLICK** | Author claimed; About bio live; shelves + website verify remain |
| **StoryGraph** | **BLOCKED — JASON CLICK** | Browser MCP cannot attach; profile + books not configured |
| **GR ↔ SG link** | **JASON CLICK** | No OAuth — one-time CSV import only (steps below) |

---

## URLs

| Platform | URL | Status |
|----------|-----|--------|
| Goodreads author | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway | Live · Author ID **20924993** |
| StoryGraph profile | *(not created)* | After setup: `https://app.thestorygraph.com/profile/{username}` |
| StoryGraph import | https://app.thestorygraph.com/import | Manage Account → Import Goodreads Library |
| Goodreads export | https://www.goodreads.com/review/import | My Books → Tools → Import and Export |

---

## Goodreads — public audit (2026-08-01)

**Claim status:** ✓ **Goodreads Author** (claimed Nov 2020)

### Already done (no click needed)

- **About bio** — Masters X trilogy + Seventh City Press + comp line (Eco / Brown / Kostova) + Field Notes link. Matches `goodreads-comp-shelves.md` §1.
- **10 works listed** — Vol I–III, omnibus, Hawkes monograph, plus duplicate co-author editions under "Jason C. Holloway"
- **Vol I quote** — added Jul 20, 2026 (*"The cross-references. Between cave carvings…"*)
- **Reading activity** — Jason marked trilogy + omnibus Read (Jul 17, 2026)

### Remaining Jason clicks (~10 min)

1. **Verify website field** — Author page → **edit data** → confirm **Website** = `https://jasoncholloway.com/` (public fetch shows label but URL not confirmed)
2. **Genre** — Fiction, Literary Fiction, Thriller (if blank)
3. **Public shelves** (MKT-02) — My Books → Bookshelves → Add shelf (public):

   | Shelf | Add titles |
   |-------|------------|
   | `foucaults-pendulum-readers` | Vol I–III + omnibus |
   | `literary-conspiracy-thriller` | Vol I–III + omnibus |
   | `prague-thriller-fiction` | Vol I–III + omnibus |

4. **Optional:** Author photo — use site portrait `public/media/JasonCHolloway-v2.png` (same as `/about/`)
5. **Optional:** Combine Editions — merge "Jason C. Holloway" duplicates into canonical Jason Carroll Holloway editions
6. **Optional:** Blog post "Reading Masters X outside the US" (`goodreads-bridge-runbook.md` §4)

**Login:** https://www.goodreads.com/user/sign_in → **Continue with Amazon** (KDP account)

---

## StoryGraph — prior run + this run

**Prior run:** `scratch/ops_reports/STORYGRAPH_CLAIM_RUN_2026-08-01.md` — browser MCP blocked  
**This run:** Same blocker — `browser_tabs` creates tabs but `browser_navigate` / `browser_snapshot` return *"No browser tab available"*

**Platform note:** StoryGraph has **no formal author claim** (no email verification). Best practice = public reader profile + add/tag books by ISBN.

### Jason clicks (~15 min) — use logged-in StoryGraph tab

#### A. Profile (Manage Account)

| Field | Value |
|-------|-------|
| Username | `jason_carroll_holloway` |
| Privacy | Public |
| Bio (160 char max) | Jason Carroll Holloway writes the Masters X trilogy (Seventh City Press) — literary conspiracy thriller linking Prague's Strahov Library, medieval manuscripts, and acoustic science. |
| Website | `https://jasoncholloway.com/` |
| Photo | `public/media/JasonCHolloway-v2.png` |
| Beta | Check **Interested in beta testing new features** |

#### B. Add & tag books (ISBN search)

| Title | Ebook ISBN | Tags |
|-------|------------|------|
| Masters X: The Inheritance of Frequency | 9798256008819 | literary fiction, conspiracy, mystery, slow burn, historical fiction, dark academia |
| Masters X: The Grimoire | 9798256009625 | literary fiction, conspiracy, emotional, adventurous |
| Masters X: The Kingdom | 9798256009809 | literary fiction, thought-provoking, conspiracy, tense |
| Hawkes monograph *(optional)* | 9798295778926 | literary criticism, nonfiction, academic |

#### C. Optional shelves

Mirror Goodreads: `foucaults-pendulum-readers`, `literary-conspiracy-thriller`, `prague-thriller-fiction`

---

## Goodreads ↔ StoryGraph connection

**There is no OAuth or live sync.** StoryGraph imports a **one-time CSV export** from Goodreads.

### Steps (Jason — ~5 min, after both profiles exist)

1. **Goodreads export**
   - Log in → **My Books**
   - Left sidebar → **Tools** → **Import and Export**
   - Click **Export Library** → download `goodreads_library_export.csv`

2. **StoryGraph import**
   - Log in → profile icon → **Manage Account**
   - Scroll to **Import Goodreads Library** (or visit https://app.thestorygraph.com/import)
   - Upload the CSV → confirm field mapping → submit
   - Wait for email confirmation (library size dependent)

3. **Ongoing:** New reads on Goodreads do **not** auto-sync. Re-export/import periodically, or maintain StoryGraph manually. Third-party scripts exist but are unofficial.

**Note:** Some guides report Goodreads CSV import requires **StoryGraph Plus** ($4.99/mo). If the import page shows a paywall, Jason can either subscribe for one month to import, or manually add the 3–4 SCP titles on StoryGraph (recommended for minimal library).

---

## Catalog reference (canonical)

From `lib/data/books.ts` + `ingram-catalog.json`:

| Work | PB ISBN | EPUB ISBN | HC ISBN |
|------|---------|-----------|---------|
| Vol I — The Inheritance of Frequency | 9798256008048 | 9798256008819 | 9798295800801 |
| Vol II — The Grimoire | 9798256009953 | 9798256009625 | 9798295812675 |
| Vol III — The Kingdom | 9798256010072 | 9798256009809 | 9798295812705 |
| Omnibus | 9798256072704 | — | 9798295884412 |
| Hawkes monograph | *(see ingram)* | 9798295778926 | — |

Kindle ASINs are Amazon-only — use ISBN search on Goodreads/StoryGraph.

---

## Browser MCP blocker (retry instructions)

To unblock agent automation in a future run:

1. Ask agent to open StoryGraph/Goodreads in the **agent-controlled browser** (side panel)
2. Confirm `browser_tabs list` shows the tab before agent runs edits
3. Jason's separate Simple Browser tab ≠ MCP browser context

---

## Ops task impact

| Task | Before | After |
|------|--------|-------|
| **MKT-02** Goodreads shelves + About | open | **open** — About done; shelves + website verify remain |
| **MKT-03** StoryGraph profile | open | **open** — browser blocked; manual steps above |
| **MKT-07** $0 evening stack Block 1 | open | **open** — StoryGraph + GR shelves still incomplete |

---

## Jason evening checklist (combined ~25 min)

- [ ] Goodreads: verify website + create 3 public shelves
- [ ] StoryGraph: public profile + 3 vols tagged by ISBN
- [ ] StoryGraph: Import Goodreads CSV (optional if Plus; else manual add is enough)
- [ ] Reply **"done: GR + SG"** with StoryGraph profile URL → Morgan closes MKT-02/MKT-03

**Packets:** `goodreads-bridge-runbook.md` · `goodreads-comp-shelves.md` · `STORYGRAPH_CLAIM_RUN_2026-08-01.md`
