# Groundswell Setup Status — 2026-08-09

## Done (agent)

| Item | Status |
|------|--------|
| Worker ASSETS refresh fix | ✅ Deployed (`8b160dd`) |
| GSC Moment vs Volume panel | ✅ Pushed `19f15e4` → Deploy Worker CI |
| Ops rollups refresh | ✅ Included in `19f15e4` |
| KV rebuild (traffic + social + sales) | ✅ Ran today (pre/post panel) |

## Done (Jason)

| Item | Status |
|------|--------|
| GSC service account in Search Console | ✅ `groundswell-gsc-reader@groundswell-monitor.iam.gserviceaccount.com` |
| `GSC_SERVICE_ACCOUNT_JSON` GitHub secret | ✅ (Jason confirmed) |

## Still needs Jason (one click)

**Trigger a fresh fetch** so GSC clicks/impressions land in the snapshot:

1. Open: https://github.com/MastersX888/groundswell-monitor/actions/workflows/groundswell_fetch.yml  
2. **Run workflow** → Run  
3. Confirm log has no Search Console 403  
4. Confirm `public/mock_snapshot_single.json` has numeric `clicks` / `impr` (not `null`)

Until that runs, the new Moment panel will show **zeros** even though UI is live — data source is still empty.

## Optional (nightly KV push without opening dashboard)

Confirm these GitHub secrets exist and match Worker:

- `CF_ACCESS_CLIENT_ID` / `CF_ACCESS_CLIENT_SECRET`
- `INGEST_TOKEN` (same value as `npx wrangler secret put INGEST_TOKEN`)
- `TERMINAL_URL` (optional; default Worker URL)

Look for log line: `Successfully pushed data to the Cloudflare Worker!`

## Verify dashboard

https://groundswell-monitor.zh5779485.workers.dev/

1. SEO & Analytics → **Moment Pages vs Volume Pages** panel visible  
2. After fetch: Morning Brief **GSC Clicks** is a number, not `—`  
3. ⟳ Refresh → wire refreshed  
