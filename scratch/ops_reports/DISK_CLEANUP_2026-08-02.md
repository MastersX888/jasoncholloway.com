# Disk cleanup actions — 2026-08-02

Automated safe cleanup during system health pass. No GitHub archive branch was required (items were regenerable caches or automation temp files under ~1 MB total in repo).

## Removed or trimmed (local only)

| Target | Notes |
|--------|--------|
| `%TEMP%` / `%LOCALAPPDATA%\Temp` | Cleared stale session temp files |
| `%APPDATA%\Cursor\Cache`, `GPUCache`, `Code Cache`, `CachedData`, Dawn* caches | Safe to regenerate; Cursor may briefly re-fetch |
| `%APPDATA%\Cursor\logs` folders older than 7 days | Log rotation |
| `scratch/_seo_cache`, `scratch/_gr_cover_compare`, `scratch/_gr_covers` | Recreated empty dirs; compare JPG/PNG were untracked QA artifacts |
| `production_staging/_wikidata/cdp_*`, `b64_*`, `mcp_*`, `qs_*`, `fill_*` | CDP/MCP inject temp JSON from Wikidata automation (~73 KB) |
| `.git` | `git gc --prune=now` — ~76 MB reclaimed (1160 → 1084 MB) |

## Not touched (needs Jason)

- `CrossDevice\moto g 5G - 2024\storage` (~90 GB) — Phone Link mirror on C:
- `%APPDATA%\Cursor\User\globalStorage\state.vscdb` (~7.9 GB) — requires Cursor fully quit before any VACUUM/reset
- OneDrive `Documents` / `Desktop` local copies (~77 GB reported under profile)
- `production_staging` print PDFs / active staging assets

## C: free space

- Before: **3.08 GB** free (3335725056 bytes)
- After this pass: **3.12 GB** free (3347812352 bytes)
- Net on C: ~**11.5 MB** (temp/cache/git only; root cause is Phone Link + full disk)

See `SYSTEM_HEALTH_DIAGNOSIS_2026-08-02.md` for full diagnosis and manual steps.
