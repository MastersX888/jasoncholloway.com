# Auto Status Check Protocol — 2026-08-04

**Why:** Long ESS / finance download + Edge print jobs stalled silently (paystubs once frozen ~12/120 with no chat surface). Watchdog prevents that.

**Sensitive:** Counts and folder presence only. Never open PDF contents, never log wages/SSN/payroll dollars.

---

## Artifacts

| Path | Role |
|------|------|
| `C:\Users\zh577\Desktop\Personal_Finance_Dashboard\_status_watchdog.ps1` | Watchdog script |
| `...\Personal_Finance_Dashboard\_AUTO_STATUS.md` | Latest human-readable status |
| `...\Personal_Finance_Dashboard\_watchdog_prev.json` | Prior snapshot for STUCK detection (>30 min flat count) |

---

## How to run

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\zh577\Desktop\Personal_Finance_Dashboard\_status_watchdog.ps1"
```

Exit codes: `0` = not stuck · `2` = STUCK (count flat while below expected).

---

## Parent / Morgan rules for long downloads

When starting any multi-file portal download or PDF conversion (paystubs, W-2s, similar):

1. **Spawn the job** (browser/ESS agent or converter).
2. **In parallel**, either:
   - **(a)** Run `_status_watchdog.ps1` every **10–15 minutes**, or
   - **(b)** Spawn a shell agent with Cursor **`/loop 15m`** (or scheduled check) that runs the watchdog and **surfaces `STUCK` in chat** when exit code 2 / state STUCK.
3. Do **not** leave a converter overnight without a watcher — that is how silent stalls happen.

### Reply phrases (Jason / parent)

| Phrase | Action |
|--------|--------|
| `status` | Run watchdog + paste `_AUTO_STATUS.md` summary |
| `finance status` | Same, finance-focused |
| `continue mo paystubs` | Resume ESS/converter if paystubs incomplete or STUCK |
| `start mo w2s` | Create `MO_W2s` + begin ESS W-2 download |

---

## Suggested Cursor rule snippet (Morgan)

Do **not** invent secrets. Optional add under `.cursor/rules/` or Morgan memory:

```markdown
## Long finance / portal downloads
When running multi-file ESS or similar downloads/conversions:
- Always run a parallel status watcher (`Personal_Finance_Dashboard\_status_watchdog.ps1`)
  every 10–15 min OR via `/loop`, until count hits expected or Jason stops the job.
- On STUCK: surface in chat immediately with NEXT ACTION from `_AUTO_STATUS.md`.
- Never open paystub/W2 PDF contents in chat; counts and paths only.
```

---

## STUCK definition

Paystub PDF count `< 120` **and** no count progress vs `_watchdog_prev.json` for **> 30 minutes** (or newest PDF age ≥ 30 min on first incomplete check).

---

*Morgan — protocol for silent-stall prevention*
