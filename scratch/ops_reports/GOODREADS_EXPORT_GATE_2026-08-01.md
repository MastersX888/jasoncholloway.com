# Goodreads Export Gate — Update Before StoryGraph Import

**Generated:** 2026-08-01 · Source: [Goodreads update then export](00c5006e-983b-40d3-a504-85554a363f4c)

**Rule:** Metadata + shelves FIRST → export CSV → StoryGraph import (not yet). **Covers are NOT blocking this gate.**

> **2026-08-01:** Jason cannot upload covers via Goodreads ACE/edit — GR UI restriction. Covers deferred; see § Cover upload blocked in [`GOODREADS_FULL_AUDIT_2026-08-01.md`](GOODREADS_FULL_AUDIT_2026-08-01.md). Export gate (G1–G5) requires **author bio, genre, website, and public shelves only** — wrong/outdated covers do not block CSV export.

---

## Phase 1 — Author edit (~5 min)

Open: https://www.goodreads.com/author/edit/20924993

| Field | Value |
|-------|-------|
| **Website** | `https://jasoncholloway.com/` |
| **Genre** | Fiction, Literary Fiction, Thriller |

**About the author** (replace entire block):

```
Jason Carroll Holloway writes the Masters X trilogy (Seventh City Press) — a literary conspiracy thriller linking Prague's Strahov Library, medieval manuscripts, and acoustic science. For readers who loved Foucault's Pendulum, The Da Vinci Code, and The Historian.

Also on StoryGraph: https://app.thestorygraph.com/profile/jason_carroll_holloway
Imprint: https://seventhcitypress.com/

Real-history Field Notes (free): https://jasoncholloway.com/field-notes/
Comp list: https://jasoncholloway.com/books/books-like-foucaults-pendulum/
```

Save.

---

## Phase 2 — Public shelves (~5 min)

My Books → Bookshelves → Add shelf (public). Add Vol I–III + Complete Trilogy to each:

- `foucaults-pendulum-readers`
- `literary-conspiracy-thriller`
- `prague-thriller-fiction`

---

## Phase 3 — Export (only after gate passes)

My Books → Tools → Import and Export → **Export Library**

Do **not** upload CSV to StoryGraph until G1–G5 below pass.

---

## Ready-to-export gate

**Covers:** Not required — G1–G5 are metadata/shelves only. Cover fixes (10 editions) deferred until librarian request or organic sync.

**Last updated:** 2026-08-01 ~10:15 PM — Jason confirmed **"done: GR combines"**. Public scrape may lag logged-in state by 15–60 min.

| Gate | Status | Notes |
|------|--------|-------|
| **G1** Website | **PASS** | `https://jasoncholloway.com/` on public author page |
| **G2** Genre | **PARTIAL** | Fiction, **Historical Fiction**, Thriller — canonical wants *Literary Fiction* (cosmetic) |
| **G3** About | **LIKELY PASS** | Saved in logged-in session (~2:05 AM); public scrape still shows truncated bio without StoryGraph/seventhcitypress — refresh cache or spot-check logged-in |
| **G4** Public shelves | **PASS** | `foucaults-pendulum-readers`, `literary-conspiracy-thriller`, `prague-thriller-fiction` (+ 2 bonus shelves, 4 books each) |
| **G5** Spot-check | **PARTIAL** | Jason verified combines complete; **public page still shows 10 distinct works** at scrape time — confirm logged-in count ≈5–6 before CSV |
| **Combines** | **DONE ✓** | All 6 jobs enqueued/completed per Jason (Vol I–III HC+Kindle, Omnibus PB+HC, Generic → Vol I) |
| **Series *Masters X*** | **OPEN** | Not set on Vol I–III — optional GR UI click |
| **CSV export** | **JASON ONLY** | My Books → Tools → Import and Export → Export Library — **do not auto-export** |

### Remaining blockers before CSV

1. **Public cache refresh** — spot-check author page logged-in; expect **~5 SCP works + crypto stray (56035497)** after async merge propagates
2. **G2 genre** (optional) — Historical Fiction → Literary Fiction at [author/edit/20924993](https://www.goodreads.com/author/edit/20924993)
3. **G3 bio cache** — if logged-in bio has StoryGraph + seventhcitypress, proceed; if not, re-paste EXPORT_GATE block
4. **Series assignment** (optional) — add *Masters X* series to Vol I–III on each edit page
5. **CSV export** — Jason clicks Export Library when satisfied with spot-check

Reply **"GR updated, CSV exported"** when CSV is downloaded.

---

## Logged-in spot-check — 2026-08-01 ~10:11 PM (parent follow-up)

**Source:** Jason's logged-in tab (`viewId: 81b56e`), not public scrape.

| Metric | Value |
|--------|-------|
| **Distinct works (logged-in)** | **10** — not yet collapsed to ~5–6 |
| **Combine page work groups** | 7 (`294525959`, `294528456`, `294527579`, `293617509`, `294081989`, + Hawkes/crypto) — Vol I–III + Omnibus show merged editions internally |
| **Generic Masters X** | Work `294081989` still separate — merge #5 async may still be propagating |

**Extra rows on author page (likely legacy HC works under Jason C. Holloway):**
- `Masters X: The Inheritance of Frequency` (2 ed.) — not the ": Volume One" canonical row
- `Masters X: The Grimoire` (2 ed.)
- `Masters X: The Kingdom` (2 ed.)
- Duplicate `Masters X: The Complete Trilogy` row (Jason Carroll Holloway + Jason Carroll  Holloway)

**Recommendation:** Wait 15–30 min and refresh author page before CSV export. If still 10, investigate whether legacy shortened-title HC works need author fix + re-combine (separate from Vol I–III merges already enqueued). CSV is safe to export once logged-in count ≈ **5–6** (Vol I–III, Omnibus, Hawkes + crypto stray).

---

## Scheduled workflow — GR → StoryGraph export loop

**Armed:** 2026-08-01 ~10:22 PM CT  
**Spec:** [`GR_STORYGRAPH_EXPORT_WORKFLOW.md`](GR_STORYGRAPH_EXPORT_WORKFLOW.md)

| Setting | Value |
|---------|-------|
| **Mechanism** | Agent loop (`/loop` pattern) — 20 min interval |
| **Script** | `scratch/ops/gr-storygraph-export-loop.ps1` |
| **Agent prompt** | `scratch/ops/prompts/gr-storygraph-export-loop.md` |
| **State** | `scratch/ops/gr_gate_state.json` |
| **Tick log** | `scratch/ops_reports/GR_STORYGRAPH_EXPORT_STATUS.md` |

### What the loop does

1. Poll logged-in GR author page until **distinct works ≤ 6**
2. If still > 6 after ~60 min → fix pass on legacy Jason C. Holloway HC rows (combine page; never merge crypto 56035497)
3. When gate passes → **Export Library** CSV
4. Upload CSV to StoryGraph import (or manual form fill per [`STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md`](STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md))

### Jason controls

| Action | Command |
|--------|---------|
| **Start** | `powershell -ExecutionPolicy Bypass -File scratch/ops/gr-storygraph-export-loop.ps1` |
| **Monitor** | Read `scratch/ops/gr_gate_state.json` — fields `attempt`, `last_distinct_works_logged_in`, `phase`, `next_retry_at` |
| **Stop** | `Stop-Process -Id (Get-Content scratch/ops/.gr-loop.pid) -Force` or say **stop-gr-loop** |
| **Manual tick** | Say **run GR export gate tick** |

### First-run status (tick 1)

| Metric | Value |
|--------|-------|
| Distinct works (public) | **10** |
| Distinct works (logged-in, last check) | **10** (~10:11 PM) |
| Phase | `poll` |
| Next retry | ~10:42 PM CT |
| Blocker | Browser MCP tab attach failed in first subagent run — next tick needs Jason's logged-in GR tab open in Cursor browser |
