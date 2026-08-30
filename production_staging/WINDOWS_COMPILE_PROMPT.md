# HANDOVER PROMPT — Compile Masters X upload package (Windows)
**Codename:** COMPOSITOR  
**For:** New Cursor / Claude agent on Jason’s Windows PC  
**Repo:** `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway`  
**Branch:** `cursor/upload-staging-f9e1` (pull latest first)  
**Depends on:** PORTER harvest already done (`production_staging/HARVEST_REPORT.md`)

**Goal:** Rebuild print interiors (+ EPUBs if possible) from the **geo-fixed + apartment/balcony** draft, drop them into ISBN folders beside covers, and produce a Desktop upload zip.  
**Priority:** Omnibus HC → Omnibus PB → Books 1–3 → EPUB/Kindle.

Audiobook: **out of scope**.

---

## 0. What the cloud agent already knows

Read these before doing anything:

1. `production_staging/HARVEST_REPORT.md` — binaries found on this PC; all PRE_GEO; Omnibus PB STALE_V6 (732 pp).
2. `production_staging/UPLOAD_MANIFEST.md` — folder map + ISBN matrix.
3. `production_staging/_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` — **authority text for rebuild**.
4. `production_staging/_sources/MASTERS_X_BOOK{1,2,3}_DEMY_*.txt` — per-book authority text.
5. `production_staging/_scripts_from_windows/generate_omnibus_interior_PB_5x8_v8.py` — recovered PB generator (still points at stale DOCX paths).
6. `production_staging/_scripts_from_windows/compose_omnibus_covers_FINAL.py` — cover compositor.

### Hard facts from PORTER
| Item | Status on this PC |
|---|---|
| Harvested interiors/EPUBs/covers | Present under `production_staging/**` (may be gitignored — still on disk) |
| Safe to re-upload harvested interiors as “current”? | **NO** — PRE_GEO / missing geo + apartment fixes |
| Book generators `generate_book*_interior*.py` | **MISSING** |
| `generate_epubs*.py` | **MISSING** |
| Omnibus PB generator | **FOUND** |
| Omnibus HC generator | **MISSING** (only PB script recovered; HC was a separate build historically) |
| Book 1 PB wrap | **MISSING** |

---

## 1. First commands

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
git fetch origin
git checkout cursor/upload-staging-f9e1
git pull origin cursor/upload-staging-f9e1

# Confirm harvest binaries still on disk (git may not track them)
Get-ChildItem -Recurse production_staging\omnibus, production_staging\b1_inheritance, production_staging\b2_grimoire, production_staging\b3_kingdom |
  Where-Object { $_.Extension -in '.pdf','.epub' } |
  Select-Object FullName, Length, LastWriteTime
```

If interiors are missing from disk, stop and re-run PORTER copy steps from `WINDOWS_HANDOVER_PROMPT.md` before compiling.

---

## 2. Build strategy (do this, in order)

### Phase A — Make a buildable source that includes ALL current fixes

Harvested generators read **DOCX with italic runs**, not plain txt.

**Authority text** is the DEMY txt / omnibus geo-fixed txt (includes Washington Street HQ, SubTropolis chamber, apartment/balcony, etc.).

**Stale DOCX** is `production_staging/_sources/MASTERS_X_BOOK*_ITALICIZED_FIXED.docx` (and/or `files_3_extracted\` if present).

#### Required work
1. Create `production_staging/_sources/build_docx/`:
   - `MASTERS_X_BOOK1_BUILD.docx`
   - `MASTERS_X_BOOK2_BUILD.docx`
   - `MASTERS_X_BOOK3_BUILD.docx`
2. Populate them by **merging geo-fixed txt into the italicized DOCX structure**:
   - Prefer: apply the known fix patches from `production_staging/_docs/FIX_CHANGELOG.md` + `cartographer/artifacts/fix_*.json` onto the italicized DOCX (preserves `<i>` runs).
   - Acceptable fallback: rebuild DOCX paragraphs from the geo-fixed txt (italics may degrade — flag clearly).
3. Verify apartment/balcony + key geo strings exist in BUILD docx:

```powershell
python - <<'PY'
from docx import Document
from pathlib import Path
checks = {
 1: ["1647 Genessee", "Warren County", "Midwest Precote", "hundred and fifty feet"],
 2: ["Washington Street office", "Pennsylvania Avenue", "apartment hummed"],
 3: ["across the river at SubTropolis", "Iceland basalt", "Quality Hill apartment", "balcony", "She drove\nthe long way"],
}
# also search joined text for Troost drive rewrite
for b, needles in checks.items():
    p = Path(f'production_staging/_sources/build_docx/MASTERS_X_BOOK{b}_BUILD.docx')
    t = '\n'.join(x.text for x in Document(p).paragraphs)
    print('BOOK', b, p.exists())
    for n in needles:
        print(' ', n[:40], '→', n in t or n.replace('\n',' ') in t.replace('\n',' '))
PY
```

Do **not** proceed to PDF generation until Book 3 has apartment/balcony and SubTropolis chamber fixes.

### Phase B — Omnibus PB interior (have generator)

1. Copy generator to a working script:
   `production_staging/_scripts_from_windows/generate_omnibus_interior_PB_CURRENT.py`
2. Point `DOCX_PATH1/2/3` at the **BUILD** docx files from Phase A.
3. Point fonts at `C:\Windows\Fonts\GARA*.TTF` (already in script).
4. Set output:
   - `production_staging/omnibus/9798256072704_PB/interior.pdf`
5. Env overrides if script supports them:

```powershell
$env:BUILD_ISBN = '9798256072704'
$env:BUILD_IMPRINT = 'Seventh City Press'
$env:BUILD_AUTHOR = 'Jason Carroll Holloway'
$env:BUILD_OUTPUT = "$pwd\production_staging\omnibus\9798256072704_PB\interior.pdf"
python production_staging\_scripts_from_windows\generate_omnibus_interior_PB_CURRENT.py
```

6. Verify with `production_staging/_docs/porter_verify_pdfs.py` (or PyMuPDF):
   - Demy 5.5×8.5
   - ISBN 9798256072704 on copyright
   - Page count **732** per `lib/data/ingram-catalog.json` — corrected 2026-08-29 from a stale CANON 734 (record actual)
   - Spot-check geo strings in extracted text

### Phase C — Omnibus HC interior (generator missing)

Search again for HC generator:

```powershell
Get-ChildItem -Path C:\Users\zh577 -Recurse -Filter '*omnibus*interior*.py' -ErrorAction SilentlyContinue |
  Select-Object FullName, LastWriteTime
```

**If found:** adapt paths like PB; output to  
`production_staging/omnibus/9798295884412_HC/interior.pdf` · Royal 6.14×9.21 · ISBN 9798295884412 · target **684** pp *(per `lib/data/ingram-catalog.json`, corrected 2026-08-29 from a stale CANON 686)*.

**If not found:** clone the PB generator to `generate_omnibus_interior_HC_CURRENT.py` and change:
- trim to 6.14×9.21 in
- margins appropriate for HC
- ISBN default 9798295884412
- output path HC folder  
Keep typography parallel to PB so HC/PB stay aligned.

Rename previous harvested HC interior to `interior_PRE_GEO_684pp.pdf` before overwriting.

### Phase D — Omnibus covers (reuse, then spine-check)

Harvested covers are good CMYK candidates:
- HC: `cover_jacket.pdf`, `cover_caselam.pdf`
- PB: `cover_wrap.pdf`

After new page counts are known:
1. Compute whether spine width still matches Ingram template for new pp count.
2. If spine off, re-run `compose_omnibus_covers_FINAL.py` against fresh Ingram templates in Downloads (`9798295884412-Jacket*.pdf`, `9798256072704-Perfect*.pdf`).
3. Leave final files named:
   - `cover_jacket.pdf` / `cover_caselam.pdf`
   - `cover_wrap.pdf`

### Phase E — Individual books (generators missing)

Search for `generate_book*_interior*.py` and `generate_epubs*.py` on Desktop/Downloads/E: if mounted.

| If found | Rebuild each ISBN into its folder as `interior.pdf` / `{isbn}.epub` from BUILD docx |
| If not found | Document MISS; package Omnibus only this pass; do not fake book interiors from omnibus splits without a real generator |

Book 1 PB wrap remains a cover-design task if still missing.

### Phase F — EPUB/Kindle

If `generate_epubs*.py` found → rebuild 3 EPUBs into ISBN_EPUB folders and copy into KINDLE folders.  
If not → keep harvested PRE_GEO epubs renamed `PRE_GEO_{isbn}.epub` and mark STATUS **NO**.

---

## 3. Package the upload drop

Create:

```text
C:\Users\zh577\Desktop\SCP_UploadReady_Omnibus_<yyyy-mm-dd>\
  9798295884412_HC\
    interior.pdf
    cover_jacket.pdf
    cover_caselam.pdf
    STATUS.md
  9798256072704_PB\
    interior.pdf
    cover_wrap.pdf
    STATUS.md
  README_UPLOAD.txt
```

`README_UPLOAD.txt` must state:
- manuscript generation date
- page counts
- that text includes geo + apartment/balcony fixes
- Ingram target trim for each
- whether spine was regenerated

Also update each `production_staging/omnibus/*/STATUS.md` to **Upload ready: YES** only if interior is post-geo and trim/ISBN verify.

Zip:

```powershell
Compress-Archive -Path "C:\Users\zh577\Desktop\SCP_UploadReady_Omnibus_*" `
  -DestinationPath "C:\Users\zh577\Desktop\SCP_UploadReady_Omnibus_<date>.zip"
```

---

## 4. Verification checklist (fail = not ready)

Omnibus HC
- [ ] Royal 6.14×9.21
- [ ] ISBN 9798295884412
- [ ] Text extract contains `Washington Street office` OR equivalent geo fixes / `1647 Genessee` / `Warren County` / `apartment` (Quality Hill) — proves post-geo source
- [ ] Jacket + caselam present
- [ ] Page count recorded vs **684** (`lib/data/ingram-catalog.json`; CANON 686 was stale, corrected 2026-08-29)

Omnibus PB
- [ ] Demy 5.5×8.5
- [ ] ISBN 9798256072704 (not HC ISBN on copyright)
- [ ] Same geo spot-checks
- [ ] Wrap present
- [ ] Not the old 732 PRE_GEO file (hash differs from `interior_STALE_V6.pdf` if that remains)

---

## 5. Git / reports

Write `production_staging/COMPILE_REPORT.md` with:
- source docx method (patch vs regenerate)
- generator scripts used
- output paths, page counts, trim, ISBN checks
- geo spot-check results
- what is still missing (book generators, B1 wrap, epub generator)

Commit reports + STATUS + scripts (not necessarily huge PDFs):

```powershell
git add -f production_staging/COMPILE_REPORT.md production_staging/omnibus/*/STATUS.md production_staging/_scripts_from_windows/*.py
git add -f production_staging/_sources/build_docx/*.docx
# Ask Jason before force-adding multi‑MB interiors:
# git add -f production_staging/omnibus/*/interior.pdf production_staging/omnibus/*/cover_*.pdf
git commit -m "compose: rebuild Omnibus interiors from geo-fixed draft"
git push -u origin cursor/upload-staging-f9e1
```

---

## 6. Stop conditions / ask Jason

Stop and ask if:
- BUILD docx cannot be proven to contain geo fixes
- Garamond fonts missing
- HC generator cannot be reconstructed cleanly
- New page count breaks Omnibus spine and templates are missing

---

## 7. Start now

1. Pull branch  
2. Confirm harvested PDFs on disk  
3. Phase A BUILD docx  
4. Phase B Omnibus PB rebuild  
5. Phase C Omnibus HC rebuild  
6. Spine-check covers  
7. Desktop upload folder + COMPILE_REPORT  
8. Summarize for Jason with exact paths to the zip

*Seventh City Press · COMPOSITOR · f = 111.2 Hz*
