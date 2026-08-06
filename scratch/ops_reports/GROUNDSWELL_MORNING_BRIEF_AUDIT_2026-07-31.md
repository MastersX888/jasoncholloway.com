# Groundswell Morning Brief Audit — 2026-07-31

**Agent:** Morgan (Groundswell wiring pass)  
**Scope:** Online vs desktop data divergence, social pipeline wiring, morning brief dashboard  
**Live dashboard:** https://groundswell-monitor.zh5779485.workers.dev/

---

## Executive summary

The online/desktop mismatch was caused by **three separate data stores** serving the same UI. The fix consolidates on **Worker KV** (`/api/state`) as the single canonical source, wires **all 7 Outstand social accounts** into that state, and adds a **Morning Brief** tab. Social metrics were pushed to KV during this audit; the updated UI (`public/index.html`) still needs a Worker deploy (blocked locally by network/proxy — use GitHub Actions or deploy from a clean network).

---

## Root cause: online vs desktop divergence

| Access path | What it served | Data freshness |
|-------------|----------------|----------------|
| **Online** (Workers URL + CF Access login) | Worker KV via `GET /api/state` | KV updated only when `TERMINAL_URL` push succeeded — **was not wired in GitHub Actions** |
| **Desktop `Groundswell Dashboard.lnk`** | `python server.py` → `C:\Groundswell_Data\state.json` | **Stale: latest snapshot 2026-07-06** |
| **Repo `mock_snapshot_single.json`** | Committed by nightly fetch | Fresh through **2026-07-30** — but **not read by live dashboard** |
| **Local submodule** | 17 commits behind origin | Outdated UI + missing dork engine, deploy workflow |

### Primary causes (ranked)

1. **Different URLs** — Desktop shortcut ran `localhost:8081` with legacy local DB; online used Cloudflare Worker + KV.
2. **Different API backends** — Local `server.py` read `C:\Groundswell_Data\state.json`; Worker reads `STATE_KV`.
3. **Missing KV push** — `groundswell_fetch.yml` did not set `TERMINAL_URL`, so nightly fetch updated git snapshot only, not KV.
4. **Stale submodule** — Local copy lacked tabbed UI, dork sweep, and canonical shortcut docs.
5. **CF Access** — Unauthenticated API calls return HTML login page (32903 bytes), not JSON — local scripts without `CF_ACCESS_*` creds appear to “fail silently.”

---

## Fixes applied

### 1. Submodule synced to origin/main (2026-07-31)

- Pulled 17 commits: tabbed UI, dork engine, deploy workflow, `START_HERE.md`, fresh snapshot through 2026-07-30.

### 2. Canonical desktop shortcut

- Ran `groundswell-monitor/scripts/install-desktop-shortcut.ps1`
- **New:** `Desktop\Seventh City Terminal.url` → Workers URL
- **Removed:** stale `Groundswell Dashboard.lnk` pattern (local server)
- `server.py` now **opens cloud URL** with deprecation message — no more local DB serving

### 3. Social pipeline wired (Outstand — all required platforms)

New: `groundswell-monitor/pipeline/social_ingest.py`

| Platform | Outstand ID | Status (2026-07-31 push) |
|----------|-------------|--------------------------|
| X (@jasonhollowaykc) | jaHn2 | Metrics error (token/reconnect) |
| Instagram | 1vWPG | OK |
| Facebook SCP | IwQhX | OK |
| Facebook Author | 7BvrW | OK |
| Bluesky imprint | 4RSwi | OK |
| Bluesky author | J15V3 | OK |
| Pinterest | pxPfM | OK |

Integrated into `groundswell_fetch.py` — nightly run now merges `state.social` + `state.morning_brief` before KV push.

### 4. GitHub Actions wiring

Updated `groundswell_fetch.yml`:

- `TERMINAL_URL` — **critical fix** for KV sync
- `OUTSTAND_API_KEY` — social ingest
- `INSECURE_SSL=1` — TLS on Actions runner

**Jason action:** Confirm GitHub repo secrets include `TERMINAL_URL`, `OUTSTAND_API_KEY`, `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`, `INGEST_TOKEN`.

### 5. Morning Brief dashboard tab

Updated `public/index.html`:

- New **Morning Brief** tab (default landing)
- Social accounts table (followers, deltas, engagement)
- Anomalies, publishing blockers, approval queue
- Published-last-24h feed from Outstand

### 6. Manual push script (parent repo)

New: `scripts/groundswell_social_push.py` — run anytime to refresh social + morning brief in KV:

```powershell
python scripts/groundswell_social_push.py
```

**Verified this session:** `POST /api/state` → `{"ok":true}` with 6/7 platforms reporting, 22 unassigned, 14 failed posts flagged.

---

## Data accuracy notes

| Metric | Issue | Status |
|--------|-------|--------|
| GSC clicks/impressions | Often `null` in snapshots | Check `GSC_SERVICE_ACCOUNT_JSON` secret + domain verification |
| Signups | `null` | Verify `WEB3FORMS_API_KEY` |
| X metrics | Outstand token expired | Jason: reconnect X in Outstand (posting works; analytics don't) |
| Facebook follower counts | Show 0 via Outstand | Meta Graph API direct optional — not blocking morning brief |
| Bluesky `b` channel in mention charts | Label = "Blogs & Press" (not Bluesky social) | Known UI quirk — Bluesky social is in Morning Brief tab |

---

## Vivian QC note

**Public-facing copy changed:** Morning Brief tab labels and anomaly strings in `public/index.html` (dashboard UI only — not customer-facing web or social posts). No publish/send actions taken. Copy is operational (approval queue, anomaly flags) — **Vivian pass recommended before any external screenshot/share of dashboard.**

No social posts, emails, or press replies were sent.

---

## Verification: online vs desktop should now match

1. Open **only** `Desktop\Seventh City Terminal.url` (or bookmark Workers URL)
2. Sign in with Cloudflare Access
3. Confirm **Morning Brief** tab shows 7 platform rows (after UI deploy)
4. Check footer: snapshot count and intel items
5. **Do not** use `localhost:8081` or `Groundswell Dashboard.lnk`

After Worker deploy, both online and the new shortcut load identical HTML + same KV state.

Compare KV freshness:

```powershell
python scripts/groundswell_social_push.py
```

Then refresh dashboard — `briefStamp` should show recent timestamp.

---

## Remaining blockers (Jason / infra)

| Item | Owner | Action |
|------|-------|--------|
| Deploy updated `index.html` | Agent/Jason | Push submodule to GitHub → Deploy Worker workflow, or `wrangler deploy` from clean network |
| GitHub secret `OUTSTAND_API_KEY` | Jason | Add to groundswell-monitor repo secrets if not present |
| GitHub secret `TERMINAL_URL` | Jason | Set to `https://groundswell-monitor.zh5779485.workers.dev` |
| X Outstand reconnect | Jason | Outstand dashboard → reconnect @jasonhollowaykc for metrics |
| 22 unassigned posts | Jason | Frozen per River redesign — do not assign until v2 approved |
| 14 failed publishes | Jason | Review in Outstand |
| GSC null metrics | Jason/Agent | Verify service account + property access |

---

## Jason evening checklist (tonight)

1. **Delete** any remaining bookmarks to `localhost:8081` or old Groundswell `.lnk`
2. **Open** `Seventh City Terminal.url` → confirm CF Access login works
3. **Trigger** Groundswell Daily Fetch workflow (manual dispatch) after secrets confirmed
4. **Review** Morning Brief approval queue: 22 unassigned + 14 failed (no auto-action)
5. **Optional:** Reconnect X in Outstand for analytics
6. **Read** `scratch/ops_reports/social/2026-07-30.md` for full social sweep detail

---

## Files changed (not committed — Jason has not requested commit)

| Path | Change |
|------|--------|
| `groundswell-monitor/` | Synced to origin/main + local patches |
| `groundswell-monitor/pipeline/social_ingest.py` | **New** — Outstand ingest |
| `groundswell-monitor/pipeline/groundswell_fetch.py` | Social + morning brief KV merge |
| `groundswell-monitor/public/index.html` | Morning Brief tab |
| `groundswell-monitor/server.py` | Redirect to cloud (deprecated local) |
| `groundswell-monitor/.github/workflows/groundswell_fetch.yml` | TERMINAL_URL + OUTSTAND |
| `scripts/groundswell_social_push.py` | **New** — manual KV push |

---

## Approval queue UX (2026-07-31 follow-up)

### What changed

The Jason Approval Queue is now **actionable** on the Morning Brief tab:

| Feature | Behavior |
|---------|----------|
| **Summary cards** | Click "N unassigned" or "N failed" to open the item panel |
| **Inspect** | Expands full caption + media; logs inspect to KV audit |
| **Assign** | Per-post confirm modal + account checkboxes → Worker creates **draft copy** in Outstand (no auto-publish) |
| **Retry draft** | Requires inspect first → creates **draft retry copy** for failed account |
| **Dismiss** | Removes from active queue; logged to audit for evening checklist |
| **Open in Outstand** | Deep link to `https://app.outstand.so/posts/{id}` |

### API endpoints (Worker)

- `GET /api/approval-queue` — active items + audit tail
- `POST /api/approval-queue/:id/inspect` — mark inspected, fetch live Outstand detail
- `POST /api/approval-queue/:id/dismiss` — mark reviewed/dismissed
- `POST /api/approval-queue/:id/approve` — assign or retry (requires `confirmed: true`)

Audit trail stored in KV `state.approval_audit` (decisions, dismissed, inspected).

### End-to-end vs deep-link-only

| Action | End-to-end in dashboard | Notes |
|--------|-------------------------|-------|
| Inspect | ✅ | Live Outstand fetch when `OUTSTAND_API_KEY` on Worker |
| Dismiss | ✅ | KV audit only |
| Open in Outstand | ✅ | Deep link fallback always works |
| Assign unassigned | ✅* | Creates draft copy via Outstand API; original unassigned post unchanged |
| Retry failed | ✅* | Creates draft retry copy; does not delete original |
| Bulk assign 22 River v2 | ❌ blocked | No bulk action — one post + explicit confirm only |
| Auto-publish | ❌ blocked | Assign/retry always draft; confirm modal required |

\*Requires Worker secret `OUTSTAND_API_KEY` (same key as pipeline). Without it, Inspect/Dismiss/Open still work; Assign/Retry return error.

### Jason verification steps

1. Push/deploy this commit (Deploy Worker CI on `groundswell-monitor` main).
2. Confirm Worker secret: `wrangler secret put OUTSTAND_API_KEY` (or Cloudflare dashboard).
3. Run `python scripts/groundswell_social_push.py` to refresh KV with `approval_queue_items`.
4. Open Seventh City Terminal → Morning Brief → click unassigned/failed cards.
5. Inspect one failed post, then Retry draft — confirm draft appears in Outstand (not published).
6. Dismiss one item — confirm it leaves active queue; check "Recent decisions" footer.
7. **Do not** bulk-assign River v2 until v2 approved — assign is one post at a time with checkbox confirm.

### Vivian QC note (approval queue copy)

New user-facing strings in dashboard only (`public/index.html`): confirm modals ("River v2 posts stay frozen…", "does not publish"), button labels. Operational tone — no customer-facing publish. **Vivian pass before external screenshot.**

---

## Agent maintenance log

- 2026-07-31: Submodule fast-forward 17 commits; social pushed to KV; desktop shortcut replaced; wrangler deploy failed (corporate proxy/TLS) — UI deploy pending via CI.
- 2026-07-31 (follow-up): **`7b28c4c` pushed to `groundswell-monitor` main** — triggers Deploy Worker CI; `scripts/groundswell_social_push.py` added to parent repo. Bluesky both channels OK via Outstand (account reinstatement confirmed by Jason).
- 2026-07-31 (approval queue): **`4860713` on main** — actionable Jason Approval Queue (inspect/assign/retry/dismiss + audit trail). Jason confirmed **X reconnected** in Outstand — refresh KV after `OUTSTAND_API_KEY` is in `pipeline/.env` or Worker secrets.
- 2026-07-31 (Worker secret verified): Live `POST /api/approval-queue/…/inspect` returned Outstand post data — **`OUTSTAND_API_KEY` on Worker confirmed**. Queue ready: 22 unassigned, 14 failed (most failures = Bluesky captions >300 graphemes, not X).
- 2026-07-31 (approval queue): Actionable Jason Approval Queue — full post objects in KV, Worker `/api/approval-queue/*`, UI panel + confirm modals, audit trail in `state.approval_audit`.

*Morgan — the office that never closes.*
