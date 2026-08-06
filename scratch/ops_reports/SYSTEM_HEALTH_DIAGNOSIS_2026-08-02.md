# System health diagnosis — 2026-08-02

**Machine:** Jason Windows PC (`zh577`)  
**Workspace:** `c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway`  
**Context:** Cursor + general PC slowness before the work week.

---

## Executive snapshot

| Signal | Finding | Severity |
|--------|---------|----------|
| **C: free space** | **3.08 GB → 3.12 GB** free of **~115 GB** total (~97% full) | **Critical** |
| **Primary disk hog** | Phone Link **CrossDevice** mirror: **~90.5 GB** on C: | **Critical** |
| **Cursor state DB** | `state.vscdb` **~7.9 GB** in Roaming profile | **High** |
| **Cursor processes** | **57** `Cursor.exe` instances, high cumulative CPU | **High** |
| **RAM** | **~7.8 GB** total, **~74%** in use at sample time | **Moderate** |
| **Repo workspace** | **~0.92 GB** (not the main problem) | Low |
| **Brave** | **13** processes, **~1.65 GB** local profile cache | Moderate |

Windows and apps thrash when the system drive stays under ~10–15% free. At **~3 GB free**, paging, indexing, OneDrive sync, and IDE I/O all degrade together — this matches reported slowness.

---

## Disk volumes

| Drive | Used (GB) | Free (GB) | Total (GB) |
|-------|-----------|-----------|------------|
| **C:** | 112.23 | **3.12** (after cleanup) | 115.32 |
| **G:** | 112.39 | 2.93 | 115.32 |

G: appears to mirror similar utilization (likely same physical pool or mapped volume). Treat both as tight until Phone Link / OneDrive local footprint is reduced.

**Measurement:** PowerShell `Get-PSDrive` before cleanup: **3335725056** bytes free; after: **3347812352** bytes (**+~11.5 MB**).

---

## Top space consumers (profile-level)

| Location | ~Size | Notes |
|----------|-------|--------|
| `~\CrossDevice\moto g 5G - 2024\storage` | **90.47 GB** | Windows **Phone Link** exposing phone storage on C: |
| → `F74E-120F` | 50.39 GB | Likely SD / removable volume on phone |
| → `MindPersuasion` | 30.09 GB | Phone folder synced locally |
| → `DCIM` | 6.95 GB | Camera roll |
| `~\OneDrive` (profile tree) | **~77 GB** | Documents **~43 GB**, Desktop **~34 GB** local |
| `%APPDATA%\Cursor` | **~8.66 GB** | Mostly **`User\globalStorage\state.vscdb` (~7.9 GB)** |
| `~\CrossDevice` (total) | 90.47 GB | Same as phone mirror |
| Workspace repo | **~0.92 GB** | Includes **`.git` ~1.08 GB** after `git gc` |
| `production_staging` | **~0.49 GB** | Active print/staging; not bulk-deleted |
| `scratch` | **~0.04 GB** | Small |
| Brave `%LOCALAPPDATA%\BraveSoftware` | **~1.65 GB** | Browser cache/profile |
| Downloads | **~0.19 GB** | Not a major factor |

**Not irreplaceable but not auto-deleted:** `production_staging` PDFs/covers — left intact per print-master safety rule.

---

## Memory / CPU suspects (sample)

| Process / group | Observation |
|-----------------|-------------|
| **Cursor (×57)** | Multiple processes **~76–942 MB** WS each; very high CPU seconds on several workers — typical of many agent windows, extensions, and indexing on a full disk |
| **Brave (×13)** | Moderate memory; adds pressure on 8 GB RAM |
| **AVG / aswidsagent** | Antivirus services present |
| **explorer / CrossDeviceService** | Phone Link background sync competes for disk |

**RAM reading:** Total visible **~8022 MB**, free **~2078 MB** at sample (~74% used).

---

## Cursor-specific findings

1. **`state.vscdb` (~7.9 GB)** — Cursor global SQLite store (chat/index/state). Grows over long agent sessions. **Do not delete while Cursor is running.** Safe path: fully quit Cursor → backup file → optional SQLite `VACUUM` or Cursor “clear history” if offered; worst case rename file (Cursor recreates; you lose local chat index).
2. **Many Cursor processes** — Restart Cursor after closing extra composer/agent tabs; reboot if count stays high.
3. **Caches cleared (safe):** `%APPDATA%\Cursor\Cache`, GPU/Code caches, logs >7 days — **~15 MB** class savings.

---

## Browser tab cleanup (Cursor IDE browser)

**Planned:** Close blank / duplicate StoryGraph & import-goodreads tabs via `cursor-ide-browser` MCP.

**Actual:** MCP browser tools were **not available** in this subagent session (`CallMcpTool` unavailable). **No automated tab closes performed.**

**Manual for Jason (2 min):** In Cursor’s Simple Browser / IDE browser panel → tab list → close all **blank** tabs and duplicate **import-goodreads** / StoryGraph tabs; keep **at most 1–2** logged-in StoryGraph tabs. Also close unused **Brave** windows (13 processes observed).

---

## Actions taken (automated, safe)

| Action | Approx. bytes freed |
|--------|---------------------|
| User + Local `%TEMP%` sweep | Part of ~15 MB Cursor/temp bundle |
| Cursor safe cache dirs + old logs | ~15 MB (reported) |
| `scratch/_seo_cache`, `_gr_cover_compare`, `_gr_covers` (untracked QA) | ~0.8 MB |
| `production_staging/_wikidata` CDP/MCP temp `*.json` | ~73 KB |
| `git gc --prune=now` in repo | **~76 MB** from `.git` |
| **Net C: change** | **~11.5 MB** |

Detail log: `DISK_CLEANUP_2026-08-02.md`.

**Not done:** Archive branch push (nothing large enough warranted it; Phone Link requires manual offload, not git).

---

## Remaining risks

1. **C: stays ~97% full** until Phone Link / OneDrive local data is reduced — production builds, npm, and Cursor will remain slow.
2. **`state.vscdb` growth** will continue until trimmed or Cursor restarted with history cleanup.
3. **57 Cursor processes** — risk of OOM and CPU starvation on 8 GB RAM.
4. **OneDrive** local Documents/Desktop — another **~77 GB** in profile; may duplicate cloud + phone content strategies.
5. **Antivirus + full disk** — scans amplify I/O stalls.

---

## Exact asks for Jason (priority order)

### P0 — Free tens of GB on C: (you must do this)

1. **Phone Link / CrossDevice (~90 GB)**  
   - Open **Phone Link** → Settings → reduce or disable **full device storage browsing** / stop mirroring large phone folders to PC.  
   - Or move offload: copy `CrossDevice\moto g 5G - 2024\storage\F74E-120F` and `MindPersuasion` to external drive or OneDrive-only (not local), then remove local copies **after** verifying backup.  
   - **Target:** reclaim **50–80+ GB** on C:.

2. **Storage Sense**  
   - Settings → System → Storage → enable cleanup; review **Temporary files**, **Downloads**, **Previous Windows installations** if present.

3. **OneDrive**  
   - Right-click heavy folders (Documents/Desktop) → **Free up space** / Files On-Demand so large archives are online-only.

### P1 — Cursor responsiveness (today)

4. **Restart Cursor** (File → Exit, confirm tray icon gone) after saving work — clears excess processes.  
5. **Trim `state.vscdb`** after full quit (optional): backup `%APPDATA%\Cursor\User\globalStorage\state.vscdb`, then use Cursor settings to clear old chat data or SQLite VACUUM from a SQLite tool.  
6. **Close IDE browser clutter** manually (StoryGraph / Goodreads duplicates).

### P2 — General PC hygiene

7. **Reboot** once after disk cleanup — clears stuck handles.  
8. **Brave:** restart browser or clear cache if still sluggish (`~1.65 GB` local).  
9. **Long term:** 8 GB RAM + full disk is tight for multi-agent Cursor; consider **16 GB RAM** or keeping phone mirror **off** C:.

---

## Repo / production note

- Git remote: `origin` → `https://github.com/MastersX888/jasoncholloway.com.git` (archive path available if large local-only assets need a branch later).  
- No force-push, no print PDF deletion, no secrets touched.

---

*Generated by automated system health pass — 2026-08-02.*

---

## Post-unlink verification (Phone Link / CrossDevice)

**When:** 2026-08-02 evening, after Jason restarted Cursor and unlinked phone in Phone Link.

| Metric | Before (same-day baseline) | After (this check) |
|--------|---------------------------|---------------------|
| **C: free** | **~3.12 GB** (~97% full) | **~7.09–7.19 GB** (`Get-Volume` / `Get-PSDrive`) |
| **C: used** | **112.23 GB** | **~108.13–108.47 GB** |
| **Net C: change** | — | **~+4.0 GB free** vs morning post-cleanup baseline |

**CrossDevice paths**

| Path | Status | ~Size |
|------|--------|-------|
| `%LOCALAPPDATA%\CrossDevice` | **Missing** | — |
| `%USERPROFILE%\CrossDevice` | **Present** | **~0.1 GB** |
| `~\CrossDevice\moto g 5G - 2024\storage\…` | **Shell only** (folder names remain; `F74E-120F`, `MindPersuasion`, etc. empty or tiny) | **~0.1 GB** total tree (was **~90.5 GB** in morning scan) |
| `Packages\Microsoft.YourPhone_*` | App package remains | **~0.09 GB** |

**Verdict:** Phone mirror **data appears removed** from C:; **~0.1 GB residual** empty/stub tree under `C:\Users\zh577\CrossDevice\moto g 5G - 2024` (262 small files; `DCIM` ~0.1 GB). **Do not bulk-delete** until Jason confirms these are useless placeholders—unlink may have left reparse/shortcut folders that are safe to remove manually via Phone Link “remove device” cleanup or deleting the empty `CrossDevice` folder after confirming Phone Link shows no paired device.

**Note:** Logical CrossDevice footprint dropped **~90 GB → ~0.1 GB**, but **C: only gained ~4 GB** vs the documented **3.12 GB** free baseline—possible same-day OneDrive/temp growth, measurement timing, or morning **90 GB** figure including phone-side sizes not fully materialized on disk. Re-check **Settings → System → Storage** for authoritative “Other” / user profile breakdown.

*Post-unlink pass — automated — 2026-08-02.*
