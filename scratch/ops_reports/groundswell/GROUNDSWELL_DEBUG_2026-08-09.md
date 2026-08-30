# Groundswell Debug — 2026-08-09

**Agent:** Groundswell debug pass  
**Live:** https://groundswell-monitor.zh5779485.workers.dev/  
**Repo:** `MastersX888/groundswell-monitor` · local `groundswell-monitor/`

---

## Verdict

The terminal was still broken for two independent reasons:

1. **Worker refresh never merged traffic JSON** — commit `8b160dd` used `env.ASSETS`, but `wrangler.toml` never set `binding = "ASSETS"`. Deployed bindings were only `STATE_KV`. Refresh fell back to public HTTP → Cloudflare Access HTML → “snapshot unavailable”.
2. **GSC clicks/impr stay null in the committed snapshot** — Daily Fetch after “GSC secret added” still wrote `clicks: null`, `impr: null` (see `3a1d275` / HEAD snapshot date `2026-08-08`). Pipeline warns and returns nulls when the SA file/auth fails or the secret name/value is wrong.

---

## Evidence

### Local snapshot (`public/mock_snapshot_single.json`)

| Field | Value |
|-------|--------|
| date | `2026-08-08` |
| visitors | `241` |
| requests | `1601` |
| clicks | `null` |
| impr | `null` |
| signups | `null` |

### Git

| SHA | Note |
|-----|------|
| `19f15e4` | GSC moment/volume SEO panel + ops rollups (on `origin/main` before this fix) |
| `8b160dd` | ASSETS *code* path + safe `POST /api/state` merge — **on origin/main**, but wrangler binding missing |
| `3a1d275` | Automated data fetch 2026-08-09 — still null GSC |
| **`7978c57`** | **This fix:** `binding = "ASSETS"` + `run_worker_first = ["/api/*"]` + hardened GSC workflow — **pushed to main** |

### Live Worker / Access

- Unauthenticated GET `/`, `/api/state`, `/api/refresh`, `/mock_snapshot_single.json` → **Cloudflare Access login HTML** (status 200, `text/html`).
- Browser MCP could not open a session (no Access cookie); same wall.
- Worker settings **before fix:** bindings = `[STATE_KV]` only; `has_assets: true` but **no `ASSETS` binding**.
- KV before rebuild: no `2026-08-08` traffic row; latest reach dates sales-only; `ops_rollups` missing; `refreshed_at` recent but notes effectively “snapshot unavailable”.

### After agent actions (API)

| Item | Result |
|------|--------|
| `ASSETS` binding | Patched live via CF API; confirmed `ASSETS:assets` + `STATE_KV` |
| `OUTSTAND_API_KEY` | Re-put after settings patch (inherit may have dropped it); confirmed present |
| KV merge | Inserted snapshot `2026-08-08` visitors **241**; terms **17**; `social.ok` still true |
| Push `7978c57` | Succeeded → Deploy Worker landed as Worker versions **120–121** (`source: wrangler`) with `run_worker_first = ["/api/*"]` |

---

## Root cause detail

### A. Refresh / blank panels

`src/refresh.js` (from `8b160dd`):

```js
if (env.ASSETS) { /* fetch JSON from assets */ }
// else public fetch → Access HTML
```

`wrangler.toml` had only:

```toml
[assets]
directory = "public"
```

Cloudflare docs require `binding = "ASSETS"` for `env.ASSETS`. Without it, refresh never merged `mock_snapshot_single.json` / `ops_rollups.json` into KV → UI looked empty/stale for traffic & ops panels.

### B. Null GSC

`pipeline/groundswell_fetch.py` `fetch_search_console()`:

- Needs `GSC_SERVICE_ACCOUNT_FILE` or `GSC_SERVICE_ACCOUNT_B64`
- On any failure → `(None, None, [], [])` → snapshot `clicks`/`impr` null
- Workflow previously always set `GSC_SERVICE_ACCOUNT_FILE=./gsc-service-account.json` even when the create step skipped → FileNotFound → nulls

Also possible after secret exists: wrong property URL (`GSC_SITE_URL`, default `sc-domain:jasoncholloway.com`), SA not added as GSC user, or imprint vs author property gap (ops_rollups already notes SCP GSC verify AUTH-01).

---

## Fixes applied (no Jason required)

1. **`wrangler.toml`** — `binding = "ASSETS"` + `run_worker_first = ["/api/*"]`
2. **Live Worker** — ASSETS binding patched; OUTSTAND secret restored
3. **KV** — merged Aug 8 traffic snapshot + terms catalog
4. **`.github/workflows/groundswell_fetch.yml`** — write SA JSON/B64 safely via Python; only set FILE when file exists; print snapshot KPI summary in Actions log
5. **Pushed** `7978c57` to `origin/main` (triggers Deploy Worker)

---

## Remaining Jason steps

1. **Sign in** to the dashboard (Cloudflare Access) → hard refresh → confirm visitors **241** for 2026-08-08 and panels populate. Optional: open DevTools → `/api/refresh?force=1` should return `snapshot_merged: true` and notes including `snapshot 2026-08-08` / `ops rollups`.
2. **Confirm Deploy Worker** Action for `7978c57` succeeded (Actions tab; private repo — needs your login).
3. **GSC (why clicks/impr still null):**
   - Repo secret name must be `GSC_SERVICE_ACCOUNT_JSON` (raw JSON) **or** `GSC_SERVICE_ACCOUNT_B64`
   - Service account email must be added in GSC with access to the property
   - Secret `GSC_SITE_URL` should match the property exactly (e.g. `sc-domain:jasoncholloway.com` or `https://www.jasoncholloway.com/`)
   - Run **Groundswell Daily Fetch** (workflow_dispatch) → check log line `snapshot date=… clicks=… impr=…`
   - If still null, open the Actions log for `[skip] Search Console: …` and fix that error
4. **Optional:** re-put Worker secret `INGEST_TOKEN` if intel ingest from Actions starts failing (not verified present after settings patch; OUTSTAND was restored).
5. **wrangler login** on this machine is expired — local `npx wrangler` deploy/KV needs `wrangler login` or `CLOUDFLARE_API_TOKEN` if you want agent-side wrangler again.

---

## How to verify

| Check | Expect |
|-------|--------|
| Worker bindings | `ASSETS`, `STATE_KV`, `OUTSTAND_API_KEY` |
| KV snapshot `2026-08-08` | `visitors: 241` |
| After Access login + refresh | `/api/refresh` notes include snapshot merge; ops rollups appear |
| After successful GSC fetch | `mock_snapshot_single.json` has numeric `clicks`/`impr` (not null) committed by Actions |

---

## Not inventable / blocked here

- GitHub Actions run logs / secret values (`gh` not installed; public API 404 on private repo)
- Cloudflare Access interactive login (browser MCP / unauthenticated HTTP)
- GSC service-account private key contents
