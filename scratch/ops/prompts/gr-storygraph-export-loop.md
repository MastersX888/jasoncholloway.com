# GR → StoryGraph Export Loop — Agent Prompt

**Trigger:** `AGENT_LOOP_TICK_GR_STORYGRAPH` sentinel (every ~20 min) or manual "run GR export gate tick"

**State file:** `scratch/ops/gr_gate_state.json` — read before acting, update after every tick.

**Specs:** `scratch/ops_reports/GR_STORYGRAPH_EXPORT_WORKFLOW.md`

---

## Each tick — execute in order

### 1. Load state

Read `scratch/ops/gr_gate_state.json`. Increment `attempt`. If `attempt > max_attempts`, write final report to `scratch/ops_reports/GR_STORYGRAPH_EXPORT_STATUS.md` and **stop loop** (kill PID in `scratch/ops/.gr-loop.pid`).

### 2. Poll Goodreads author page (logged-in preferred)

1. `browser_tabs` list — prefer Jason's logged-in tab on `author/show/20924993` (historical viewId `81b56e`; use whatever tab matches).
2. If no GR tab: `browser_navigate` → `https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway`
3. `browser_lock` → refresh page → count **distinct works** via `browser_cdp` Runtime.evaluate:

```javascript
(() => {
  const m = document.body.innerText.match(/(\d+)\s+distinct\s+works/i);
  const titles = [...document.querySelectorAll('a.bookTitle')].map(a => a.textContent.trim());
  return { distinct: m ? parseInt(m[1], 10) : null, titles, loggedIn: !!document.querySelector('a[href*="/user/sign_out"]') };
})()
```

4. Fallback if browser MCP blocked: public fetch + `python scratch/_parse_gr_author.py` (note: public may lag logged-in by 15–60 min).

5. Update state: `last_distinct_works_logged_in`, `last_check_at`, `next_retry_at`.

### 3. Gate decision

| Condition | Action |
|-----------|--------|
| `distinct <= 6` | Set `gate_passed: true`, `phase: "export"` → go to §4 |
| `distinct > 6` AND `attempt < 4` | Wait — GR async merge propagating. Log and exit tick. |
| `distinct > 6` AND `attempt >= 4` | Set `phase: "fix_pass"` → go to §5 |

### 4. Export Library (gate passed)

**Requires Jason logged-in session.**

1. Navigate: `https://www.goodreads.com/review/import` (My Books → Tools → Import and Export)
2. Snapshot — locate **Export Library** link/button
3. Click Export Library via `browser_click` (not CDP Input)
4. Wait for CSV download — note filename `goodreads_library_export.csv`
5. Update state: `phase: "storygraph"`, `csv_exported_at`, `csv_path` if detectable
6. Proceed to §6

### 5. Fix pass (legacy HC rows still showing after 3+ polls)

**Only when distinct still > 6 after ~60 min of polling.**

Target legacy shortened-title rows (Jason C. Holloway HC duplicates):
- `Masters X: The Inheritance of Frequency` (no ": Volume One")
- `Masters X: The Grimoire` (no ": Volume Two")
- `Masters X: The Kingdom` (no ": Volume Three")
- Duplicate Complete Trilogy row

**Steps per orphan work:**
1. Open combine page: `https://www.goodreads.com/book/combine/20924993.Jason_Carroll_Holloway`
2. Identify orphan work group — merge into canonical ": Volume X" work
3. **Never** merge crypto stray `56035497` with SCP titles
4. If author attribution wrong: open `/book/edit/{id}` → fix author to Jason Carroll Holloway via CDP form set (never `browser_fill` on GR)
5. Re-poll author page next tick

### 6. StoryGraph import

**User explicitly approved export → StoryGraph execution.**

#### Option A — CSV import (preferred if Plus available)

1. Navigate: `https://app.thestorygraph.com/import`
2. Upload `goodreads_library_export.csv`
3. If paywall (StoryGraph Plus $4.99/mo): **stop and flag Jason** — do not subscribe without approval
4. Complete field mapping → submit
5. Flag Jason: "CSV import submitted — confirm email"

#### Option B — Manual form fill (fallback)

Use `scratch/ops_reports/STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md` — 14 editions.

Per book:
1. Navigate `https://app.thestorygraph.com/books/new`
2. Fill fields via CDP Runtime.evaluate (StoryGraph allows form interaction)
3. Snapshot before submit
4. Click **Add book**
5. Track progress in state: `storygraph_books_added: [isbn...]`

**Flag Jason** if any field needs manual approval (bio, public visibility, Plus subscription).

### 7. Write tick report

Append to `scratch/ops_reports/GR_STORYGRAPH_EXPORT_STATUS.md`:

```markdown
## Tick {attempt} — {timestamp}
- Distinct works (logged-in): N
- Phase: poll|fix_pass|export|storygraph|done
- Action taken: ...
- Next retry: ...
- Blockers: ...
```

Update `scratch/ops/gr_gate_state.json`.

### 8. Stop loop when done

If `phase === "done"` (export + StoryGraph import complete):
- Kill loop: read PID from `scratch/ops/.gr-loop.pid`, stop process
- Notify Jason: reply template **"GR updated, CSV exported"** + StoryGraph status

---

## Hard constraints

- **Never** `browser_fill` on Goodreads — use CDP Runtime.evaluate for GR forms
- **Never** merge crypto `56035497` with SCP
- **Never** auto-subscribe StoryGraph Plus without Jason approval
- **Never** publish social posts — metadata/export only
- Combine base: `https://www.goodreads.com/book/combine/20924993.Jason_Carroll_Holloway`
