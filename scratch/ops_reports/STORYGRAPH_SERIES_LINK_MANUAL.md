# StoryGraph Series & Edition Linking — Manual Steps for Jason

**Prepared:** 2026-08-02 · **Updated:** 2026-08-02 (parent session investigation)  
**Status:** Series = **librarian ticket required** · Editions Vol I = **already grouped (4 editions)**  
**Jason approved:** Proceed with series/edition linking  
**Time estimate:** ~5 min to file one batch ticket (see `STORYGRAPH_SERIES_TICKET_DRAFT.md`)

---

## Why manual

Subagent `browser_tabs list` → empty. `browser_tabs new` creates tab (`viewId`) then immediately lost. `browser_navigate` → *No browser tab available*. Same pattern as ticks 8–12. **Run in parent chat with StoryGraph tab open**, or follow steps below in your logged-in browser.

---

## Scope

| Do link to series "Masters X" | Do NOT add to trilogy series |
|-------------------------------|------------------------------|
| Vol I digital/PB/HC (pos 1) | Omnibus PB (9798256072704) |
| Vol II digital/PB/HC (pos 2) | Omnibus HC (02ecee51…) |
| Vol III digital/PB/HC (pos 3) | Hawkes monograph ×3 (2a59e3aa, cce44cd0, 40572029) |

---

## Part A — Series linking (9 books) — **requires librarian ticket**

**Discovery (Tick 16):** `/books/{uuid}/edit` → unavailable. **Add Missing Information** shows: *"To add series information, file a book ticket."* Series cannot be self-assigned after creation.

**Fast path:** Submit **one batch ticket** using copy-paste text in `STORYGRAPH_SERIES_TICKET_DRAFT.md` (~5 min). Wait up to ~10 days for librarian.

Legacy per-book steps (only works at **Add book** creation time, not post-hoc):

1. Open book page (URL in table) while logged into StoryGraph.
2. ~~Click **Edit**~~ → use **Report Missing/Incorrect Information** / book ticket instead.
3. Find **Series** field — **not available** on add_missing_info for existing records.

### Book checklist

| Vol | Format | Series pos | URL / lookup |
|-----|--------|------------|--------------|
| I | digital | **1** | Search ISBN `9798256008819` (pre-import; no UUID in progress file) |
| I | paperback | **1** | https://app.thestorygraph.com/books/713110ba-71b5-49dc-a1fd-73565a88cf92/edit |
| I | hardcover | **1** | https://app.thestorygraph.com/books/8efdab53-d950-406e-b858-802b23ffc658/edit |
| II | digital | **2** | https://app.thestorygraph.com/books/636daf5f-7e23-4690-9d17-c8af2740509e/edit |
| II | paperback | **2** | https://app.thestorygraph.com/books/b67a2c5d-6cfe-4a0c-a3dc-dac02cdc02de/edit |
| II | hardcover | **2** | https://app.thestorygraph.com/books/375d37e0-5a6b-48eb-848e-3e9284137ebc/edit |
| III | digital | **3** | https://app.thestorygraph.com/books/3acac754-e8bf-4bc4-8986-e4fb1fe3c89e/edit |
| III | paperback | **3** | https://app.thestorygraph.com/books/f483f4f6-a683-4c42-a839-b7f39038fde1/edit |
| III | hardcover | **3** | https://app.thestorygraph.com/books/4b2e78d6-8091-410b-a94b-98ac23b95c0d/edit |

**Tip:** After Vol I digital is linked, open https://app.thestorygraph.com/series/masters-x (or search series name) to verify all 9 entries show positions 1–3.

---

## Part B — Edition linking (3 works × 3 formats)

Goal: group digital / paperback / hardcover of the **same title** under one work so readers see all formats together.

### Method 1 — Editions tab (preferred if available)

For each volume (I, II, III):

1. Open **any one** edition of that title (e.g. Vol II paperback).
2. On book page, find **Editions** section/tab.
3. For missing formats: **Add Edition** → enter ISBN + format:
   - Vol I: 9798256008819 (digital), 9798256008048 (PB), 9798295800801 (HC)
   - Vol II: 9798256009625 (digital), 9798256009953 (PB), 9798295812675 (HC)
   - Vol III: 9798256009809 (digital), 9798256010072 (PB), 9798295812705 (HC)
4. If StoryGraph finds an existing ISBN, it should attach rather than duplicate.
5. After linking, book page should list 3 editions under one work.

### Method 2 — Merge duplicate works (librarian)

If digital/PB/HC still appear as **separate works** (separate search hits):

1. On the **canonical** edition page → **Report an issue** / **Contact** / flag icon.
2. Request: *"Please merge these editions of the same work"* and paste the 3 UUIDs for that volume.
3. Repeat per volume only if Method 1 fails.

**Do not merge** Omnibus or Hawkes into trilogy works.

### Hawkes monograph (optional edition link only)

| Format | URL |
|--------|-----|
| digital | https://app.thestorygraph.com/books/2a59e3aa-b398-433a-b4de-103ab6d51328 |
| paperback | https://app.thestorygraph.com/books/cce44cd0-7e09-4da8-ac02-739446932c67 |
| hardcover | https://app.thestorygraph.com/books/40572029-5ba8-487f-a905-cd081a552807 |

Use Editions → Add Edition; **no series** field.

---

## Part C — Verify (5 min)

1. Search **Masters X** series → 9 books, positions 1–3 (3 books at each position = 3 formats).
2. Open Vol I PB → Editions shows digital + HC (or 3 total).
3. Confirm Omnibus PB/HC **not** in series list.
4. Reply **"StoryGraph series linked"** → Morgan updates gate to `complete`.

---

## Unblock agent automation (optional)

1. In Cursor, open **Browser** panel (agent-controlled, not external Chrome).
2. Navigate to https://app.thestorygraph.com/ — log in.
3. Confirm parent agent `browser_tabs list` shows stable tab.
4. Re-run: **"proceed with StoryGraph series linking"** in **parent chat** (not subagent).

---

## ISBN reference (all 14 catalog editions)

| ISBN | Title | Format | Series? |
|------|-------|--------|---------|
| 9798256008819 | Vol I | digital | Masters X #1 |
| 9798256008048 | Vol I | PB | Masters X #1 |
| 9798295800801 | Vol I | HC | Masters X #1 |
| 9798256009625 | Vol II | digital | Masters X #2 |
| 9798256009953 | Vol II | PB | Masters X #2 |
| 9798295812675 | Vol II | HC | Masters X #2 |
| 9798256009809 | Vol III | digital | Masters X #3 |
| 9798256010072 | Vol III | PB | Masters X #3 |
| 9798295812705 | Vol III | HC | Masters X #3 |
| 9798256072704 | Omnibus | PB | standalone |
| 9798295884412 | Omnibus | HC | standalone |
| 9798295778926 | Hawkes | digital | standalone |
| 9798295778247 | Hawkes | PB | standalone |
| 9798349308444 | Hawkes | HC | standalone |
