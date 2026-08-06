# Disk cleanup — 2026-07-31

**Agent:** command cleanup (C: drive, Jason workspace)

## Summary

| Metric | Value |
|--------|------:|
| C: free **before** | **1.30 GB** |
| C: free **after** | **1.93 GB** |
| **Recovered (measured delta)** | **~0.63 GB** |
| Tracked removals (files deleted) | ~634 MB |

> Note: Jason reported ~400 MB free earlier; at run time DriveInfo showed **1.30 GB** available. After cleanup: **1.93 GB**.

## Removed (safe)

| Path | ~MB |
|------|----:|
| `jasoncholloway/.next/` | 24.4 |
| `jasoncholloway/out/` | 327.5 |
| `%TEMP%/jch-site-build/` | 21.6 |
| `jasoncholloway/seventhcitypress/.next/` | 7.6 |
| npm cache (`npm cache clean --force`) | 144.7 |
| `git gc --prune=now` in `jasoncholloway` | 108.1 |
| `git gc --prune=now` in `groundswell-monitor` | 0.4 |

## Not removed (by design or blocked)

| Item | ~Size | Reason |
|------|------:|--------|
| `public/downloads/`, press-kit PDFs, covers | in `public/` ~318 MB | Do-not-delete list |
| `production_staging/` | ~503 MB | Cover/book staging; not build cache |
| `node_modules/` (jasoncholloway) | ~530 MB | Required for dev/build |
| `.git/` (jasoncholloway) | ~1084 MB after gc | History; further shrink needs manual ref pruning |
| `%TEMP%/vscode-stable-user-x64-*/CodeSetup-*.exe` | ~190 MB | **File locked** (VS Code/Cursor installer in use) |
| `groundswell-monitor/.wrangler-dry/`, `unzipped/` | negligible | Already empty/tiny |
| `_webfix_wt/` | ~6 MB | Small |
| Desktop `MASTER_UPLOAD_FOLDER` | not scanned | Do-not-delete |

## Rebuild / deploy notes

- **`out/` deleted** — regenerate with your usual static export/build before deploy if you rely on a local `out/` tree.
- **`.next/` deleted** — next `npm run build` / dev will recreate.

## Manual purge later (optional)

1. **~190 MB** — After closing Cursor/VS Code, delete `%LOCALAPPDATA%\Temp\vscode-stable-user-x64-*` (stale update installer).
2. **Windows Disk Cleanup** — Temp files, Delivery Optimization, Recycle Bin (not scanned here).
3. **`.git` (~1 GB)** — If acceptable, audit large blobs / `git filter-repo` or move old LFS; only with Jason approval.
4. **`production_staging/`** — Archive to external drive if no longer needed for active uploads (~500 MB); contains `_covers` and book bundles.

## Top consumers remaining in `jasoncholloway` (for awareness)

| Directory | ~MB |
|-----------|----:|
| `.git` | 1084 |
| `node_modules` | 530 |
| `production_staging` | 503 |
| `public` | 319 |

---
*Generated 2026-07-31 (local).*
