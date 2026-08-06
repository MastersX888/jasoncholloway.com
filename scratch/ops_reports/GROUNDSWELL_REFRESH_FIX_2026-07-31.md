# Groundswell Terminal Refresh Fix — 2026-07-31

**Issue:** Command Center and Intel Wire showed stale/empty data because the dashboard only read Worker KV, which was not updated when opening the terminal.

**Root cause:**
- Live UI reads `GET /api/state` (KV only)
- Nightly pipeline commits `public/mock_snapshot_single.json` to git but KV push often failed without CF Access credentials from local scripts
- No refresh-on-open — opening the terminal showed whatever was last manually pushed to KV

**Fix (groundswell-monitor `770d5c5`, pushed to main):**

1. **`GET /api/refresh`** — Worker merges on each dashboard load:
   - Latest committed snapshot from `/mock_snapshot_single.json` → `state.snapshots`
   - Terms catalog from `/data/terms.json` → `state.terms` + `state.profile`
   - Confirmed mentions from snapshots → `state.intel`
   - Live Outstand social metrics + approval queue → `state.social` + `state.morning_brief` (when `OUTSTAND_API_KEY` on Worker)

2. **Dashboard boot** — calls `/api/refresh` before `/api/state` (⟳ Refresh forces `?force=1`)

3. **Pipeline** — `groundswell_fetch.py` intel push now sends CF Access headers (matches state push)

**Deploy:** GitHub Actions `Deploy Worker` workflow runs on push to `main`. **Pushed:** commit `770d5c5` (2026-07-31 PM). Confirm green at https://github.com/MastersX888/groundswell-monitor/actions

**Jason verification (after deploy ~2 min):**
1. Open [Seventh City Terminal](https://groundswell-monitor.zh5779485.workers.dev/)
2. Status pill should show **wire refreshed** (not just "wire live")
3. Command tab: visitors/requests/countries from Jul 30 snapshot; social table populated
4. Intel Wire: still quiet if no confirmed mentions in snapshot (expected); populates after nightly `Intel Sweep` / `Groundswell Daily Fetch` runs

**Intel Wire note:** Refresh merges **confirmed mentions** from pipeline snapshots. Full LLM-scored intel still comes from nightly `intel_engine.py` (GitHub Actions `Intel Sweep`). Trigger manually: Actions → Intel Sweep → Run workflow.

**If social still stale:** Confirm Worker secret `OUTSTAND_API_KEY` is set (`wrangler secret list` or Cloudflare dashboard).
