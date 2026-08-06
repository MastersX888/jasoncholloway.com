# C: Drive Cleanup — 2026-08-01

## Crisis snapshot

| Metric | Value |
|--------|-------|
| **C: total** | ~115.3 GB |
| **C: used** | ~115.1 GB |
| **Free at start** | **0.24 GB** (~242 MB) |
| **Free after Temp sweep #1** | **0.37 GB** (~377 MB) |
| **Free after safe cleanup** | **~0.25 GB** (~256 MB) — `.next`, `node_modules`, npm cache removed (~591 MB deleted; net +89 MB free)

**Root cause:** OneDrive-synced user data on C: dominates the volume. Dev caches (Cursor, workspace `node_modules`) are secondary but worth trimming.

---

## Top space hogs (profile + workspace)

| Rank | Path | ~Size | Tier |
|------|------|-------|------|
| 1 | `C:\Users\zh577\OneDrive` | **77.2 GB** | **Ask Jason** — move/archive or Files On-Demand |
| 2 | `OneDrive\Documents` | **43 GB** | Ask — identify large subfolders, cloud-only or move to D:/external |
| 3 | `OneDrive\Desktop` | **34.2 GB** | Ask — includes upload batches; dedupe vs workspace |
| 4 | `AppData\Roaming\Cursor` | **8.27 GB** | **Ask** — `User\globalStorage\state.vscdb` alone **~7.46 GB** (chat/index state) |
| 5 | `C:\Users\zh577\.gemini` | **6.41 GB** | Mixed — mostly Antigravity scratch |
| 6 | `Program Files\Microsoft Office` | **5.09 GB** | Keep unless uninstall planned |
| 7 | `AppData\Local\Programs` | **2.73 GB** | Review per-app uninstall |
| 8 | `AppData\Local\Microsoft` | **1.92 GB** | Partially safe caches — review |
| 9 | `AppData\Local\BraveSoftware` | **1.74 GB** | Browser profile — clear cache in Brave settings |
| 10 | `jasoncholloway\.git` | **1.06 GB** | **Ask** — `git gc`, remove old objects, or fresh clone |
| 11 | `Program Files\Google` | **1.20 GB** | Keep |
| 12 | `Program Files\WSL` | **0.82 GB** | Ask if WSL unused |
| 13 | `jasoncholloway\node_modules` | **0.52 GB** | **Safe** — delete then `npm install` (delete did not complete while disk this full) |
| 14 | `jasoncholloway\production_staging` | **0.49 GB** | **Ask** — print PDFs / EPUB masters |
| 15 | `AppData\Local\Temp` | **0.28–0.51 GB** | **Safe** — recurring sweep |
| 16 | `Desktop\SCP_Batch_Upload_Jul2026` | **0.21 GB** | Ask — may duplicate OneDrive Desktop |
| 17 | `Desktop\MASTER_UPLOAD_FOLDER` | **0.13 GB** | Ask |
| 18 | `.cursor\projects` (transcripts/terminals) | **~0.05 GB** | **Ask** before deleting agent transcripts |
| 19 | `groundswell-monitor` (workspace) | **~3 MB** | **Ask** — data submodule |

**Playwright:** No `.playwright_profile` found at expected `02_ingramspark` paths (already absent or never on C:).

**Docker:** `AppData\Local\Docker` present but **~0 GB** measured.

---

## Actions taken this session (safe tier)

1. **Local Temp sweep #1** — freed **~135 MB** (242 MB → 377 MB free).
2. **Attempted:** `.next`, `node_modules`, `npm cache clean`, Temp sweep #2 — **`node_modules` still present** at report time (likely locks and/or no scratch space for delete metadata). **Close Cursor/Node processes and retry after freeing ≥1 GB from OneDrive.**

**Not executed (ask first):** OneDrive moves, `state.vscdb`, `production_staging`, git history, agent transcripts.

---

## Safe to delete now (after ~1 GB headroom)

Run in **PowerShell (Admin not required)**:

```powershell
# 1) Temp (safe, repeat weekly)
Remove-Item "$env:LOCALAPPDATA\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $env:TEMP\* -Recurse -Force -ErrorAction SilentlyContinue

# 2) Workspace rebuild caches (close dev server first)
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
npm cache clean --force

# 3) Python bytecode (safe, small)
Get-ChildItem -Path . -Recurse -Directory -Filter __pycache__ -ErrorAction SilentlyContinue |
  Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# 4) npm reinstall when ready
npm install
```

**Brave cache (UI):** Brave → Settings → Privacy → Clear browsing data (cached images/files).

---

## Ask Jason first (largest wins)


### OneDrive drill-down (measured)

**Documents (~43 GB):**
| Folder | Size |
|--------|------|
| `Old Stuff to Sort DONT LOSE!!!` | **38.9 GB** |
| `Tiffany` | 3.4 GB |
| `Jason Health Data` | 0.35 GB |

**Desktop (~34 GB):**
| Folder | Size |
|--------|------|
| `Stuff` | **34.2 GB** |

**Fastest wins:** Right-click `Old Stuff to Sort DONT LOSE!!!` and Desktop `Stuff` → **Free up space** (Files On-Demand) after confirming anything needed locally is backed up elsewhere.


### A. OneDrive (~77 GB) — **priority #1**

Freeing local copies of synced files is the fastest path to tens of GB.

```powershell
# Inspect largest top-level folders (already sampled: Documents 43 GB, Desktop 34 GB)
Get-ChildItem C:\Users\zh577\OneDrive\Documents, C:\Users\zh577\OneDrive\Desktop |
  ForEach-Object {
    $s = (Get-ChildItem $_.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
    [pscustomobject]@{ GB = [math]::Round($s/1GB,2); Path = $_.FullName }
  } | Sort-Object GB -Descending
```

**Options (pick one strategy):**

- Enable **Files On-Demand** and set large folders to **Free up space** (right-click in Explorer).
- Move cold archives to **external drive** or another volume; keep shortcuts in OneDrive if needed.
- Remove duplicate **Desktop upload batches** if copies also live under OneDrive Desktop.

### B. Cursor `state.vscdb` (~7.5 GB)

Contains editor/agent state. **Do not delete blindly** while Cursor is open.

- Quit Cursor completely → backup then trim (or use Cursor support guidance for DB vacuum).
- Backup command:

```powershell
Copy-Item "$env:APPDATA\Cursor\User\globalStorage\state.vscdb" "$env:USERPROFILE\Desktop\state.vscdb.backup"
```

### C. Git repo bloat (~1 GB in `.git`)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
git count-objects -vH
git gc --aggressive --prune=now   # only if Jason confirms no needed lost refs
```

### D. `production_staging` (~0.5 GB)

Print recoverable PDFs were deleted in git status; folder may still hold EPUB build artifacts. **Confirm against Ingram/KDP masters before delete.**

### E. Agent transcripts

`C:\Users\zh577\.cursor\projects\` — small today (~53 MB) but historically valuable; archive to external before delete.

---

## Recommended order (evening checklist)

1. **OneDrive:** Free up space on largest Desktop/Documents folders (target **≥20 GB** first pass).
2. Re-run Temp + remove `node_modules` / `.next` + `npm install`.
3. Review Cursor `state.vscdb` backup + compaction.
4. Optional: `git gc`, Brave cache, uninstall unused apps under `AppData\Local\Programs`.
5. Long-term: move Antigravity scratch or OneDrive root to a larger drive.

---


---

## OneDrive session 2026-08-01 (subagent 9c83fcf9)

| Finding | Detail |
|---------|--------|
| **OneDrive folder** | `C:\Users\zh577\OneDrive` — ~**77 GB** logical size, ~**0.09 GB** on disk (already cloud placeholders / sparse) |
| **Hydration reclaim** | **None available** — local footprint is minimal; no Free up space win left on C: for this tree |
| **Client state** | **OneDrive.exe not installed**; Microsoft account **unlinked** from OneDrive sync on this PC |
| **Free space after subagent temp sweep** | ~**1.31 GB** on C: |
| **Jason action (optional)** | Reinstall OneDrive + sign in if you want Explorer/UI to manage cloud-only files again; deleting or moving OneDrive paths without the client is **not** recommended |

**Implication for priority #1:** The ~77 GB OneDrive line in the hog table is **logical/cloud catalog size**, not recoverable local disk unless files are re-hydrated elsewhere or the folder is removed with a proper unlink/migration plan.

---

## Follow-up session 2026-08-01 (post–OneDrive subagent)

**C: free at follow-up start:** ~**1.26–1.31 GB** (Get-PSDrive; slow on this volume).

### Safe cleanups executed (no Jason approval)

| Action | Result |
|--------|--------|
| `%LOCALAPPDATA%\Temp` + `%TEMP%` sweep | ~**27 MB** freed (measured before/after bytes) |
| `npm cache clean --force` | npm cache was ~**26 MB**; cleared |
| `pip cache purge` | pip cache **empty** / negligible |
| `cargo cache` | **cargo not used** / no meaningful cache |
| `jasoncholloway\.next` | **Already absent** |
| `jasoncholloway\node_modules` | **Already absent** (prior session or incomplete delete) |
| Yarn / pnpm / NuGet caches | **Not present** or negligible under profile |

**C: free after follow-up cleanups:** ~**0.13–0.72 GB** (Get-PSDrive fluctuated during session; disk critically full).

**Net note:** Workspace rebuild caches were already gone; incremental gain this pass was **~27 MB** from temp + npm. Free space may **drop** vs the ~1.31 GB post–OneDrive-sweep snapshot due to background writes — treat **Cursor DB / .gemini scratch** as the real reclaim path.

### Still manual for Jason (largest wins unchanged)

1. **Cursor `state.vscdb`** (~**7.5 GB**) — backup + vacuum/trim per section B; **do not delete** without procedure and Cursor fully quit.
2. **`.gemini` Antigravity scratch** (~**6.4 GB**) — review/move cold projects (ask first).
3. **OneDrive reinstall (optional)** — only if you need sync UI; **not** a local disk reclaim while placeholders stay sparse.
4. **`production_staging`**, **`.git` bloat**, **agent transcripts** — unchanged from sections C–E above.
5. Re-run **`npm install`** in `jasoncholloway` when free space is at least ~**1 GB** and dev work resumes.

---

## Verify free space

```powershell
Get-PSDrive C | Select-Object @{N='FreeGB';E={[math]::Round($_.Free/1GB,2)}}, @{N='UsedGB';E={[math]::Round($_.Used/1GB,2)}}
```

---

*Generated by C: drive diagnostic — 2026-08-01. Before free: ~0.24 GB. After Temp sweep: ~0.37 GB. Report-time free: ~0.16 GB.*


