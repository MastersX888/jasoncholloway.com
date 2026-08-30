# HANDOVER PROMPT — Windows PC asset harvest for Masters X upload staging
**Codename:** PORTER  
**For:** A new Cursor / Claude agent running on Jason’s Windows machine  
**Repo:** `MastersX888/jasoncholloway.com`  
**Target branch:** `cursor/upload-staging-f9e1` (pull latest first)  
**Destination tree:** `production_staging/` (already scaffolded in repo)  
**Priority order:** Omnibus HC → Omnibus PB → Book 1–3 HC/PB → EPUB/Kindle  

**Do not** work on audiobook scripts.  
**Do not** regenerate interiors in this pass unless harvest fails and Jason asks.  
**Do** find, copy, inventory, and co-locate files. Report gaps honestly.

---

## 0. Who you are and what success looks like

You are a production file porter. The cloud agent already:

1. Ran a geographic integrity audit and applied locked manuscript fixes.
2. Applied the apartment/balcony dwelling ruling (not house/porch).
3. Built `production_staging/` with ISBN-named folders and partial covers.
4. Confirmed that **print interiors / EPUB binaries live on this Windows machine**, not in the cloud VM.

Your job: **harvest the real upload binaries from disk into `production_staging/`**, verify them, update each folder’s `STATUS.md`, and produce `production_staging/HARVEST_REPORT.md`.

**Success =** every edition folder either has the correct `interior.pdf` / `{isbn}.epub` / cover wrap **or** a documented miss with the exact path searched.

---

## 1. First commands (run these before hunting)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
git fetch origin
git checkout cursor/upload-staging-f9e1
git pull origin cursor/upload-staging-f9e1

# Confirm staging exists
dir production_staging
type production_staging\UPLOAD_MANIFEST.md | more
```

If the repo root is elsewhere on this PC, find it:

```powershell
Get-ChildItem -Path C:\Users\zh577 -Recurse -Directory -Filter "jasoncholloway" -ErrorAction SilentlyContinue |
  Select-Object -First 20 FullName
```

Work from the repo that contains `production_staging\UPLOAD_MANIFEST.md`.

---

## 2. Known Windows search roots (search all that exist)

Search these roots recursively. Do not assume only one is current.

| Root | Why |
|---|---|
| `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\` | Primary build repo |
| `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\Jason_Carroll_Holloway_Final_Export\` | Historic export / interior outputs |
| `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\files_3_extracted\` | DOCX sources |
| `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\build_scripts\` | Generators (`.py` + `__pycache__`) |
| `C:\Users\zh577\Desktop\google_books_upload\` | Google Play EPUB staging (historically) |
| `C:\Users\zh577\Desktop\SCP_Batch_Upload_Jul2026\` | Batch upload staging |
| `C:\Users\zh577\Downloads\` | IngramSpark cover templates (`979*-Jacket*.pdf`, `979*-Perfect*.pdf`) |
| `E:\Masters_X_Trilogy_Archive\` | Archive vault (if mounted) |
| `E:\Archive\Masters_Trilogy_2026\` | Photo / production archive (if mounted) |
| `C:\Users\zh577\Downloads\` + Desktop for anything named `INTERIOR_*`, `MASTERS_X_*`, `COVER_OMNIBUS_*` | Loose deliverables |

### Filename patterns to find

```text
MASTERS_X_BOOK1_ROYAL_*.pdf
MASTERS_X_BOOK1_DEMY_*.pdf
MASTERS_X_BOOK2_ROYAL_*.pdf
MASTERS_X_BOOK2_DEMY_*.pdf
MASTERS_X_BOOK3_ROYAL_*.pdf
MASTERS_X_BOOK3_DEMY_*.pdf
MASTERS_X_OMNIBUS_ROYAL_*.pdf
MASTERS_X_OMNIBUS_DEMY_*.pdf
INTERIOR_MASTERS_X_OMNIBUS*.pdf
MASTERS_X_BOOK*_EPUB_*.epub
COVER_OMNIBUS*.pdf
COVER_MASTERS_X_BOOK*_PB*.pdf
DUSTJACKET*.pdf
*9798295884412*
*9798256072704*
*9798295800801*
*9798256008048*
*9798256008819*
*9798295812675*
*9798256009953*
*9798256009625*
*9798295812705*
*9798256010072*
*9798256009809*
*.kpf
*.mobi
generate_*interior*.py
generate_epubs*.py
compose_omnibus_covers*.py
run_log.json
```

PowerShell harvest scout (adapt roots that exist):

```powershell
$roots = @(
  'C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway',
  'C:\Users\zh577\Desktop',
  'C:\Users\zh577\Downloads',
  'E:\Masters_X_Trilogy_Archive',
  'E:\Archive\Masters_Trilogy_2026'
) | Where-Object { Test-Path $_ }

$patterns = '*.pdf','*.epub','*.kpf','*.mobi','generate_*interior*.py','generate_epubs*.py','run_log.json','COVER_OMNIBUS*','INTERIOR_*'

foreach ($r in $roots) {
  Write-Host "=== SCOUT $r ===" -ForegroundColor Cyan
  Get-ChildItem -Path $r -Recurse -File -Include $patterns -ErrorAction SilentlyContinue |
    Where-Object {
      $_.Name -match 'MASTERS_X|OMNIBUS|INTERIOR_|DUSTJACKET|COVER_|97982|generate_.*interior|generate_epubs|run_log'
    } |
    Select-Object FullName, Length, LastWriteTime |
    Sort-Object LastWriteTime -Descending |
    Export-Csv -Path "production_staging\_docs\windows_scout_$($r -replace '[^a-zA-Z0-9]','_').csv" -NoTypeInformation
}
```

Write a merged inventory to `production_staging/_docs/WINDOWS_SCOUT_MERGED.md` (path, size, mtime, guessed edition).

---

## 3. Destination map (copy into these exact slots)

Repo-relative paths. Prefer **newest valid file** per ISBN. If multiple candidates, keep the newest that passes the verification checks in §5, and note losers in the harvest report.

### Omnibus (do these first)

| Edition | Copy as |
|---|---|
| Omnibus HC interior (Royal 6.14×9.21) | `production_staging/omnibus/9798295884412_HC/interior.pdf` |
| Omnibus HC jacket | `production_staging/omnibus/9798295884412_HC/cover_jacket.pdf` |
| Omnibus PB interior (Demy 5.5×8.5) | `production_staging/omnibus/9798256072704_PB/interior.pdf` |
| Omnibus PB wrap | `production_staging/omnibus/9798256072704_PB/cover_wrap.pdf` |

Expected historic names (may differ):
- `MASTERS_X_OMNIBUS_ROYAL_9798295884412.pdf`
- `MASTERS_X_OMNIBUS_DEMY_9798256072704.pdf`
- `INTERIOR_MASTERS_X_OMNIBUS_v6.pdf` / `v8` / similar
- `COVER_OMNIBUS_HC_9798295884412_CORRECTED_v6.pdf`
- `COVER_OMNIBUS_PB_9798256072704_CORRECTED_v6.pdf`

**Live Omnibus page counts (corrected 2026-08-29):** HC **684**, PB **732**. Source of truth is `lib/data/ingram-catalog.json`, **not** `CANON.md` — canon no longer holds page counts. The line that stood here, *"Live Ingram page counts (CANON): HC 686, PB 734"*, was false twice over: the figures were a stale July estimate, and Ingram never held them. **Note that 732 is now the correct Omnibus PB count**, so an on-count 732 pp Demy interior must not be flagged stale on page count alone.  
If harvested interiors still show ~732 / ~907, flag as **STALE_V6** — usable as reference but must be rebuilt from current draft before re-upload.

### Book 1 — Inheritance

| Format | ISBN | Destination |
|---|---|---|
| HC interior | 9798295800801 | `b1_inheritance/9798295800801_HC/interior.pdf` |
| HC jacket | 9798295800801 | `b1_inheritance/9798295800801_HC/cover_jacket.pdf` (or keep recovered dustjacket if identical) |
| PB interior | 9798256008048 | `b1_inheritance/9798256008048_PB/interior.pdf` |
| PB wrap | 9798256008048 | `b1_inheritance/9798256008048_PB/cover_wrap.pdf` |
| EPUB | 9798256008819 | `b1_inheritance/9798256008819_EPUB/9798256008819.epub` |
| Kindle | 9798256008819 | `b1_inheritance/9798256008819_KINDLE/` (`.kpf` or EPUB used for KDP) |

### Book 2 — Grimoire

| Format | ISBN | Destination |
|---|---|---|
| HC | 9798295812675 | `b2_grimoire/9798295812675_HC/interior.pdf` (+ jacket) |
| PB | 9798256009953 | `b2_grimoire/9798256009953_PB/interior.pdf` (+ wrap) |
| EPUB/Kindle | 9798256009625 | `b2_grimoire/9798256009625_EPUB/9798256009625.epub` etc. |

### Book 3 — Kingdom

| Format | ISBN | Destination |
|---|---|---|
| HC | 9798295812705 | `b3_kingdom/9798295812705_HC/interior.pdf` (+ jacket) |
| PB | 9798256010072 | `b3_kingdom/9798256010072_PB/interior.pdf` (+ wrap) |
| EPUB/Kindle | 9798256009809 | `b3_kingdom/9798256009809_EPUB/9798256009809.epub` etc. |

Also copy into `_covers/print_recoverable/` any better/newer cover PDFs found.

### Generators & logs (copy, do not delete originals)

```text
production_staging/_scripts_from_windows/
  generate_book1_interior.py
  generate_book1_interior_paperback.py
  generate_book2_interior.py
  generate_book2_interior_paperback.py
  generate_book3_interior.py
  generate_book3_interior_paperback.py
  generate_omnibus_interior_v6.py   # or v8 if present
  generate_epubs_v1.py
  compose_omnibus_covers_FINAL.py
  verify_trim_isbn.py
  verify_deliverables.py
  run_log.json                      # newest
```

---

## 4. Manuscript authority (do not overwrite casually)

These are the **current geo-fixed + apartment/balcony** drafts already in the repo:

| File | Role |
|---|---|
| `production_staging/_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` | Omnibus rebuild source |
| `production_staging/_sources/MASTERS_X_BOOK*_DEMY_*.txt` | Per-book current text |
| `production_staging/_sources/MASTERS_X_BOOK*_ITALICIZED_FIXED.docx` | **Pre-fix DOCX — stale** |

### Rules
1. **Never overwrite** the `*_DEMY_*.txt` or `OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` with older Windows copies.
2. If you find a newer author DOCX/PDF text that might already include geo fixes, place it beside them as:
   - `_sources/FROM_WINDOWS/<filename>`  
   and compare; do not replace until Jason confirms.
3. Harvested **interiors are binaries for upload/rebuild comparison**, not a license to discard the fixed draft text.

---

## 5. Verification gates (run on every harvested PDF/EPUB)

### PDF interior
- File starts with `%PDF`
- Trim roughly:
  - Royal HC: 6.14×9.21 in (≈442×663 pt)
  - Demy PB: 5.5×8.5 in (≈396×612 pt)
- Target ISBN appears in file metadata or first/last pages
- Page count vs live targets *(corrected 2026-08-29 from `lib/data/ingram-catalog.json`; these are build data, not canon)*:

| Edition | ISBN | Live pages |
|---|---|---|
| B1 HC | 9798295800801 | 163 |
| B1 PB | 9798256008048 | 189 |
| B2 HC | 9798295812675 | 225 |
| B2 PB | 9798256009953 | 271 |
| B3 HC | 9798295812705 | 177 |
| B3 PB | 9798256010072 | 205 |
| Omnibus HC | 9798295884412 | **684** |
| Omnibus PB | 9798256072704 | **732** |

If page count matches old v6 (~257/311/383/495/285/355/732/907), mark **STALE_V6 — rebuild required before re-upload**.

### EPUB
- Valid zip; `mimetype` first entry
- `dc:identifier` matches ISBN
- Cover JPG already present in folder — leave it

### Cover wrap / jacket
- Note RGB vs CMYK
- Note whether spine width likely matches live page count
- Omnibus jacket: if only panels / incomplete comps exist, say so; do not invent a jacket

Use Python/`fitz`/pdfinfo if available; otherwise record what you can from file properties.

---

## 6. Update STATUS.md in each edition folder

For every ISBN folder, rewrite `STATUS.md` to:

```markdown
# {Title} — {ISBN}
**Priority:** ...
**Upload ready:** YES | NO | STALE_V6

## Present
- list files with sizes and source path

## Still missing
- ...

## Verification
- trim / pages / ISBN checks

## Source path on Windows
- full original path + LastWriteTime
```

---

## 7. Deliverables you must write

1. **`production_staging/HARVEST_REPORT.md`**
   - What was found (path → destination)
   - What is missing
   - Which interiors are LIVE-count vs STALE_V6
   - Omnibus cover status (found / incomplete / missing)
   - Recommended next step: upload as-is vs rebuild from `OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt`

2. **`production_staging/_docs/WINDOWS_SCOUT_MERGED.md`** — raw scout results

3. Updated **`production_staging/UPLOAD_MANIFEST.md`** checklist (Ready? column)

4. Optional zip for Jason’s convenience (outside git if huge):
   `Desktop\SCP_UploadReady_<date>.zip` containing only folders marked YES or STALE_V6 with binaries present

---

## 8. Git rules for this Windows pass

- Commit on `cursor/upload-staging-f9e1`
- `.gitignore` blocks `*.pdf` and `*.epub` — use `git add -f` for harvested binaries you intend to keep in-repo, **or** keep large binaries only in the Desktop zip and commit the report + STATUS updates
- Prefer: commit reports + STATUS + small files; if interiors are huge, ask Jason before force-adding multi‑hundred‑MB PDFs
- Push: `git push -u origin cursor/upload-staging-f9e1`
- Do **not** modify manuscript prose in this pass

---

## 9. Decision tree if harvest is incomplete

| Situation | Action |
|---|---|
| Omnibus HC interior found at 684 pp | Slot it; Omnibus becomes first upload candidate once jacket exists |
| Omnibus HC interior found at ~732 pp | Slot as `interior_STALE_V6.pdf`; report rebuild needed from current draft |
| Omnibus jacket missing | Search Downloads for Ingram templates; list best comps; do not fabricate |
| Generators `.py` found | Copy to `_scripts_from_windows/`; note they can rebuild from current draft next |
| Nothing found under expected roots | Expand search to whole user profile; ask Jason which drive letter holds the archive |

---

## 10. Paste-ready one-liner for the human

Jason: after this agent finishes, you should be able to open `production_staging/HARVEST_REPORT.md` and know exactly which ISBN folders are one drag away from Ingram/KDP, and which still need a rebuild from the geo-fixed draft.

---

## 11. Start now

1. `git checkout cursor/upload-staging-f9e1 && git pull`
2. Run the scout across all roots
3. Copy Omnibus binaries first
4. Verify page counts against CANON
5. Fill STATUS files + HARVEST_REPORT
6. Stop and summarize for Jason — do not start a full interior rebuild unless he says go

*Seventh City Press · PORTER · f = 111.2 Hz*
