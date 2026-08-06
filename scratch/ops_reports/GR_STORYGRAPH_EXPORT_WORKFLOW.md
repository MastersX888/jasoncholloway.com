# GR → StoryGraph Export Workflow

**Created:** 2026-08-01 ~10:22 PM CT  
**Owner:** Morgan (ops agent)  
**Jason approval:** Explicit — poll until gate passes, then Export Library → StoryGraph import

---

## Goal

Automated retry loop that waits for Goodreads author page to collapse to **≤ 6 distinct works** after combine jobs propagate, then executes **Export Library** and proceeds to **StoryGraph import**.

---

## Success criteria

| # | Criterion | Target |
|---|-----------|--------|
| S1 | Logged-in distinct works | **≤ 6** (Vol I–III, Omnibus, Hawkes, crypto stray) |
| S2 | G1–G4 export gate | Website, genre, bio, shelves — see [`GOODREADS_EXPORT_GATE_2026-08-01.md`](GOODREADS_EXPORT_GATE_2026-08-01.md) |
| S3 | CSV exported | `goodreads_library_export.csv` downloaded |
| S4 | StoryGraph | CSV import submitted OR 14 manual form entries from [`STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md`](STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md) |

---

## Retry logic

```
┌─────────────────┐
│  Poll GR author │◄──────────────────────────┐
│  (every 20 min) │                           │
└────────┬────────┘                           │
         │ distinct ≤ 6?                       │
    NO   │         YES                         │
    ┌────▼────┐    ┌──────────────┐            │
    │ attempt │    │ Export CSV   │            │
    │  < 4 ?  │    └──────┬───────┘            │
    └────┬────┘           │                    │
     YES │ NO             ▼                    │
         │         ┌──────────────┐            │
         │         │ StoryGraph   │            │
         │         │ import/fill  │            │
         │         └──────┬───────┘            │
         │                │ done               │
    wait │         ┌──────▼───────┐            │
         │         │ STOP + notify│            │
         │         └──────────────┘            │
         ▼                                       │
    ┌─────────────┐                              │
    │ Fix pass:   │                              │
    │ legacy HC   │──────────────────────────────┘
    │ re-combine  │         (re-poll next tick)
    └─────────────┘
```

| Phase | Trigger | Action |
|-------|---------|--------|
| **poll** | Default | Refresh author page, count distinct works |
| **fix_pass** | Still > 6 after attempt ≥ 4 (~60 min) | Merge legacy Jason C. Holloway HC rows via combine page |
| **export** | distinct ≤ 6 | My Books → Tools → Import/Export → Export Library |
| **storygraph** | CSV ready | Upload to StoryGraph import OR manual form fill |
| **done** | Import submitted | Stop loop, notify Jason |

---

## Stop conditions

1. **Success** — S1–S4 complete
2. **Max attempts** — 12 ticks (~4 hours) without gate pass → escalate to Jason with status report
3. **Manual stop** — Jason says `stop-gr-loop` or kills loop process
4. **Blockers** — GR login expired, StoryGraph Plus paywall (needs Jason approval), browser MCP unavailable 3+ ticks

---

## Scheduling mechanism

**Primary:** Agent loop (Cursor `/loop` pattern) — local session with browser MCP access.

| Artifact | Purpose |
|----------|---------|
| `scratch/ops/gr-storygraph-export-loop.ps1` | PowerShell sleeper — emits tick every 20 min |
| `scratch/ops/prompts/gr-storygraph-export-loop.md` | Agent instructions per tick |
| `scratch/ops/gr_gate_state.json` | Durable state between ticks |
| `scratch/ops/.gr-loop.pid` | Loop process ID for stop |

**Why not Cursor Automation?** Scheduled cloud automations cannot use local `cursor-ide-browser` MCP (not dashboard-eligible). Browser work requires Jason's logged-in GR session in this IDE.

### Start

```powershell
# From repo root — runs first tick immediately, then every 20 min
powershell -ExecutionPolicy Bypass -File scratch/ops/gr-storygraph-export-loop.ps1
```

Or tell the agent: **"run GR export gate tick"**

### Monitor

- State: `scratch/ops/gr_gate_state.json` — check `attempt`, `last_distinct_works_logged_in`, `phase`, `next_retry_at`
- Log: `scratch/ops_reports/GR_STORYGRAPH_EXPORT_STATUS.md` — append-only tick history
- Gate checklist: [`GOODREADS_EXPORT_GATE_2026-08-01.md`](GOODREADS_EXPORT_GATE_2026-08-01.md)

### Stop

```powershell
# Kill loop by PID file
$pid = Get-Content scratch/ops/.gr-loop.pid
Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
Remove-Item scratch/ops/.gr-loop.pid -ErrorAction SilentlyContinue
```

Or: **"stop-gr-loop"** in chat.

---

## Browser MCP rules

| Platform | Form fill method |
|----------|------------------|
| **Goodreads** | CDP `Runtime.evaluate` only — **never** `browser_fill` |
| **StoryGraph** | CDP or dedicated browser tools OK |

### Key URLs

| Purpose | URL |
|---------|-----|
| Author page | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway |
| Author edit | https://www.goodreads.com/author/edit/20924993 |
| Combine | https://www.goodreads.com/book/combine/20924993.Jason_Carroll_Holloway |
| Export | https://www.goodreads.com/review/import |
| StoryGraph import | https://app.thestorygraph.com/import |
| StoryGraph add book | https://app.thestorygraph.com/books/new |

### Do NOT combine

- Crypto stray work `56035497` with any SCP title

---

## Expected final catalog (6 works)

1. Masters X: The Inheritance of Frequency : Volume One
2. Masters X: The Grimoire : Volume Two
3. Masters X: The Kingdom : Volume Three
4. Masters X: The Complete Trilogy
5. Innocence, Desire, and the Architecture of the Fall (Hawkes monograph)
6. *(optional stray)* crypto-related work 56035497 — leave separate

---

## Jason manual actions (if blocked)

| Blocker | Jason action |
|---------|--------------|
| GR session expired | Re-login via Amazon (KDP account) in Cursor browser |
| StoryGraph Plus paywall | Approve $4.99/mo OR choose manual ISBN form fill |
| Fix pass fails | Manually combine legacy HC rows on combine page |
| Loop exhausted (12 attempts) | Review `GR_STORYGRAPH_EXPORT_STATUS.md`, decide wait vs manual export |

---

## Related files

- [`GOODREADS_EXPORT_GATE_2026-08-01.md`](GOODREADS_EXPORT_GATE_2026-08-01.md) — G1–G5 checklist
- [`GOODREADS_FULL_AUDIT_2026-08-01.md`](GOODREADS_FULL_AUDIT_2026-08-01.md) — full catalog audit
- [`STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md`](STORYGRAPH_FORM_FILL_PACKET_2026-08-01.md) — 14 edition form data
- [`GOODREADS_STORYGRAPH_SYNC_2026-08-01.md`](GOODREADS_STORYGRAPH_SYNC_2026-08-01.md) — platform sync overview
