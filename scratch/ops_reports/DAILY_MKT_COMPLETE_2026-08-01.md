# Daily Marketing Complete — Goodreads + StoryGraph — 2026-08-01

**Agent:** Morgan (browser MCP + public audit)  
**Jason directive:** Covers first → GR cleanup → shelves/bio → StoryGraph profile + ISBN entries → GR export → SG import (import last)  
**Vivian gate:** Bio copy from runbooks only — no unverified trade claims

> **Cover status updated:** See [`GOODREADS_FULL_AUDIT_2026-08-01.md`](GOODREADS_FULL_AUDIT_2026-08-01.md) — **0/10 covers pass v3**, but **GR UI blocks author cover upload** (Jason cannot ACE/upload). Covers deferred; metadata-only path ~15 min tonight.

---

## Executive summary

| Area | Agent result | Jason remaining |
|------|--------------|-----------------|
| **Browser MCP** | **BLOCKED** — tab create OK, navigate fails (×9 runs) | Optional — metadata editable manually |
| **Goodreads covers** | 0/10 pass v3; **upload BLOCKED at GR UI** (not MCP) | **Deferred** — librarian request or organic sync |
| **GR cleanup** | Crypto not on author shelf (10 works); dupes still present | ~5 min Combine Editions |
| **GR export gate** | **2/5 pass** — bio partial, no shelves, genre blank | ~8 min bio + shelves (**covers NOT required for gate**) |
| **StoryGraph profile** | Cloudflare blocks fetch; Vol I EPUB confirmed live | ~5 min profile + GR link |
| **StoryGraph books #2–14** | Form packet ready; none submitted | ~25 min (13 forms) — optional tomorrow |
| **GR CSV export** | **NOT READY** — gate fails G2, G3, G4 | After metadata gate passes (~2 min) |
| **SG CSV import** | **DEFERRED** — wait for clean GR export | After GR export |

**Total Jason time tonight (metadata-only):** ~15 min GR → export gate. StoryGraph forms (~30 min) can wait until tomorrow.

---

## Browser MCP log (this run)

| Step | Result |
|------|--------|
| `browser_tabs` list | Empty |
| `browser_tabs` new (side) | ✓ Created `viewId: cd1bff` |
| `browser_navigate` → Hawkes edit | **FAILED** — *Browser view not found* |
| `browser_navigate` (no viewId) | **FAILED** — *No browser tab available* |
| `browser_navigate` sign-in (side) | **FAILED** — *No browser tab available* |
| File upload / form submit | **Not attempted** — no stable tab |

**Unblock path for Jason (~1 min):**

1. In Cursor chat, click **Browser** in the agent tool panel (not Simple Browser, not external Chrome).
2. Ask agent to run `browser_tabs new` → use the **blank side-panel tab the agent creates**.
3. Navigate to https://www.goodreads.com/user/sign_in → **Continue with Amazon**.
4. Reply **go** — agent can then walk §B Hawkes cover → author edit → StoryGraph forms.

---

## Goodreads — done vs blocked

### Completed by agent (public audit, no login)

| Item | Status | Evidence |
|------|--------|----------|
| Author claim | ✓ Live | Goodreads Author badge, ID 20924993 |
| Vol I–III covers | ✗ Pre-v3 geometry | ACE → v3 HC art per FULL_AUDIT |
| Omnibus cover | ✗ **P0** — old rotunda/dome | ACE → `omnibus-hardcover-v3.png` first |
| Bio (partial) | ⚠ Partial | Hawkes book page shows StoryGraph + imprint links; **author page About missing full cross-links** |
| Crypto on author shelf | ✓ Not listed | Author page shows 10 SCP works; crypto book 56035497 exists but **not on bibliography** |
| Hawkes placeholder | ✗ Still broken | `og:image` contains `goodreads_wide` (confirmed 2026-08-01 ~7:21 PM) |

### Blocked — covers deferred (GR UI restriction)

> Jason confirmed 2026-08-01: Goodreads won't allow cover upload via ACE or direct edit. See § Cover upload blocked in `GOODREADS_FULL_AUDIT_2026-08-01.md`. **Proceed metadata-only.**

#### P0 — Combine duplicate editions (~5 min) — DO FIRST

Author page → **Combine Editions** → merge co-author listings into canonical:

| Duplicate | Canonical |
|-----------|-----------|
| https://www.goodreads.com/book/show/251407365 | 253640099 (Vol I) |
| https://www.goodreads.com/book/show/251753947 | 253641522 (Vol II) |
| https://www.goodreads.com/book/show/251783293 | 253641205 (Vol III) |
| https://www.goodreads.com/book/show/252929307 | 252797588 (omnibus) |

#### P1 — Hawkes metadata (~3 min)

- https://www.goodreads.com/book/show/253986900/edit — fix title case, subtitle, format PB, ISBN 9798295778247, 84 pp, pub 2026-04-02, paste description (cover upload deferred)

#### P1 — Generic "Masters X" stray listing (~2 min)

- https://www.goodreads.com/book/show/253243207 — combine with Vol I work (253640099)

#### P2 — Crypto book unlink (~2 min, if reappears on shelf)

- https://www.goodreads.com/book/show/56035497 — wrong book, same author name collision
- **Action:** Edit author bibliography → remove/unlink (not currently on public author page)

#### P3 — Export gate: bio + shelves (~8 min)

Open: https://www.goodreads.com/author/edit/20924993

| Field | Paste value |
|-------|-------------|
| **Website** | `https://jasoncholloway.com/` |
| **Genre** | Fiction, Literary Fiction, Thriller |
| **About** | Full block from `GOODREADS_EXPORT_GATE_2026-08-01.md` (includes StoryGraph + seventhcitypress.com) |

**Public shelves** (My Books → Bookshelves → Add shelf, set **public**):

| Shelf | Titles to add |
|-------|---------------|
| `foucaults-pendulum-readers` | Vol I–III + Complete Trilogy |
| `literary-conspiracy-thriller` | Vol I–III + Complete Trilogy |
| `prague-thriller-fiction` | Vol I–III + Complete Trilogy |

Canonical book URLs for shelf adds:

- Vol I: https://www.goodreads.com/book/show/253640099
- Vol II: https://www.goodreads.com/book/show/253641522
- Vol III: https://www.goodreads.com/book/show/253641205
- Omnibus: https://www.goodreads.com/book/show/252797588

---

## Goodreads export gate checklist

| Gate | Status | Notes |
|------|--------|-------|
| G1 Website saved | ⚠ Unverified | Label shown on author page; URL not confirmed in public fetch |
| G2 Genre populated | ✗ Blank | Not shown on public author page |
| G3 About includes StoryGraph + SCP | ✗ Partial | StoryGraph link on Hawkes book-page author snippet only; author About missing full block |
| G4 Three public comp shelves | ✗ None visible | No public shelves on author page |
| G5 Public page spot-check | ⚠ Partial | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway |

**Export readiness: NOT READY** — complete P0–P3 above first. **Covers are NOT required for export gate** (G1–G5 are metadata/shelves only).

**When gate passes:**

1. My Books → Tools → Import and Export → **Export Library**
2. Save CSV locally
3. Reply **"GR updated, CSV exported"**
4. **Do NOT** upload to StoryGraph until export is clean

---

## StoryGraph — done vs blocked

### Live URLs (confirmed)

| # | Edition | ISBN | StoryGraph URL | Status |
|---|---------|------|----------------|--------|
| 1 | Vol I — digital (EPUB) | 9798256008819 | https://app.thestorygraph.com/books/b9be8008-a674-4846-94a0-8397289e63b4 | ✓ Live (Jason) |
| 2–14 | All other editions | See packet | *(not created)* | **Open** |

### Profile (~5 min)

1. Sign in: https://app.thestorygraph.com/
2. Manage Account → username `jason_carroll_holloway`, Privacy = **Public**
3. **Website:** `https://jasoncholloway.com/`
4. **Bio (147 chars):**

   ```
   Jason Carroll Holloway writes the Masters X trilogy (Seventh City Press) — literary conspiracy thriller. Goodreads: https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway
   ```

5. **Save** → confirm profile URL: https://app.thestorygraph.com/profile/jason_carroll_holloway

### Books #2–14 — manual add-book forms (~25 min)

Form URL: https://app.thestorygraph.com/books/new  
Full field values: `scratch/ops_reports/STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md`

| # | Title | Format | ISBN |
|---|-------|--------|------|
| 2 | Masters X: The Inheritance of Frequency | paperback | 9798256008048 |
| 3 | Masters X: The Inheritance of Frequency | hardcover | 9798295800801 |
| 4 | Masters X: The Grimoire | digital | 9798256009625 |
| 5 | Masters X: The Grimoire | paperback | 9798256009953 |
| 6 | Masters X: The Grimoire | hardcover | 9798295812675 |
| 7 | Masters X: The Kingdom | digital | 9798256009809 |
| 8 | Masters X: The Kingdom | paperback | 9798256010072 |
| 9 | Masters X: The Kingdom | hardcover | 9798295812705 |
| 10 | Masters X: The Complete Trilogy | paperback | 9798256072704 |
| 11 | Masters X: The Complete Trilogy | hardcover | 9798295884412 |
| 12 | Innocence, Desire… (Hawkes) | digital | 9798295778926 |
| 13 | Innocence, Desire… (Hawkes) | paperback | 9798295778247 |
| 14 | Innocence, Desire… (Hawkes) | hardcover | 9798349308444 |

**Workflow per entry:** Navigate to `/books/new` → fill ISBN + fields from packet → **Add book** → copy returned URL into this report (or reply with URLs).

**Note:** Packet lists 14 editions total (#1 done). User brief said #2–15; only 14 entries exist in catalog.

### StoryGraph CSV import — DEFERRED

Do **not** import until GR export gate passes and CSV is exported clean.

Import path (after gate): https://app.thestorygraph.com/import  
May require StoryGraph Plus ($4.99/mo) — manual ISBN add of 14 editions is sufficient without Plus.

---

## Codebase updates (this run)

| File | Change |
|------|--------|
| `lib/data/authorAuthority.ts` | Added `AUTHOR_STORYGRAPH_URL` constant (not yet in `authorSameAs` — pending profile verify) |
| `seventhcitypress/lib/authorAuthority.ts` | Mirror sync |
| `lib/data/socialProfiles.ts` | No change — reading platforms live in `authorAuthority.ts` |

After Jason confirms StoryGraph profile live, add `AUTHOR_STORYGRAPH_URL` to `authorSameAs` array for JSON-LD cross-link.

---

## Recommended Jason evening order — metadata-only (~15 min tonight)

| Step | Task | Time |
|------|------|------|
| 1 | Combine 4 duplicate editions | 5 min |
| 2 | Generic Masters X merge (253243207) | 2 min |
| 3 | Hawkes metadata (no cover) | 3 min |
| 4 | Author edit: website + genre + full About bio | 3 min |
| 5 | Create 3 public comp shelves | 5 min |
| 6 | GR export CSV (if G1–G5 pass) | 2 min |
| 7 | StoryGraph profile + Goodreads bio link | 5 min — optional tomorrow |
| 8 | StoryGraph add-book forms #2–14 | 25 min — optional tomorrow |
| — | **Covers (all 10 editions)** | **DEFERRED** — GR UI blocks upload |

**Minimum viable tonight (~15 min):** Steps 1–6 → reply **"done: GR metadata + gate"**  
**StoryGraph block (~30 min):** Steps 7–8 → reply **"done: SG entries"** with new book URLs

---

## Reference runbooks

- `scratch/ops_reports/GOODREADS_COVER_UPDATE_2026-08-01.md`
- `scratch/ops_reports/GOODREADS_EXPORT_GATE_2026-08-01.md`
- `scratch/ops_reports/STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md`
- `scratch/ops_reports/GOODREADS_STORYGRAPH_LINK_2026-08-01.md`

---

## Closeout phrase

When complete, reply: **"done: GR + SG"** with StoryGraph profile URL + any new book URLs → Morgan closes MKT-02 / MKT-03.
