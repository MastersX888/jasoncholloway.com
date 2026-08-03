# Disk Cleanup Report — 2026-07-30
**Morgan desk · C: drive + repo workspace**

## Situation

**C: drive is critically low on space.** Full mirror of `MASTER_UPLOAD_FOLDER` (~150 MB) to repo failed mid-copy with "not enough space on the disk."

Partial repo mirror: **38 files / ~67 MB** at `production_staging/MASTER_UPLOAD_REFERENCE/`.

---

## Committed to git (this pass)

| Category | Path | Notes |
|----------|------|-------|
| Upload reference manifest | `production_staging/MASTER_UPLOAD_REFERENCE/README.md` | Points to C: canonical |
| Partial upload mirror | `production_staging/MASTER_UPLOAD_REFERENCE/*` | STATUS, EPUB JPGs, 3 HC fronts |
| Social v2 assets | `public/social/imagen-overlaid/`, `platform-overlaid/`, `imagen/` | Staged pre-pass |
| Social workflow | `content/social/*.json`, `*.md`, `preview/` | Manifests + reports |
| Blog voice pack | `content/blog/SOCIAL_FROM_BLOG.md` | Already staged |
| Ops reports | `scratch/ops_reports/*_2026-07-30.md` | This workstream |
| Production STATUS | `production_staging/**/STATUS.md` | Metadata updates |

**Not committed (excluded):**

- `_localhost.crt`, `_localhost.key` — secrets
- `_epub_build/_chunk_*.txt`, `_inject_steps/` — build temp (deleted from workspace)
- `_wikidata/` scratch JSON — transient automation
- Root `.outstand-*`, `.x-*`, `.ig-*`, `.caption-*` audit JSON — move to scratch on next pass

---

## Deleted (workspace)

| Item | Est. recovery | Rationale |
|------|---------------|-----------|
| `production_staging/_epub_build/_chunk_*.txt` (8 files) | ~variable | EPUB inject temp |
| `production_staging/_epub_build/_inject_steps/` | ~variable | Completed inject artifacts |
| `production_staging/_epub_build/_upload_b64_vol2.txt` | ~large | Base64 upload scratch |
| `production_staging/_epub_build/_localhost.crt` | small | Dev cert — never commit |
| `production_staging/_epub_build/_localhost.key` | small | Dev key — never commit |

**C: drive orphans:** No Desktop/Documents/Downloads manuscript duplicates found in surface scan. Conservative — no C: deletes performed.

**Repo git deletes (already staged):** Superseded cover PDFs in `production_staging/_covers/print_recoverable/` and per-ISBN dust jackets — replaced by geometry-era covers in MASTER_UPLOAD_FOLDER.

---

## Space recovered (estimate)

| Action | Estimate |
|--------|----------|
| EPUB build temp removal | 50–200 MB (pending shell confirm — disk errors during cleanup) |
| Git deletion of old cover PDFs | ~80 MB from repo history on next commit |
| C: orphans deleted | **0 MB** (none confirmed safe) |

**Net:** Modest repo workspace recovery; **C: still blocked** for full MASTER_UPLOAD sync.

---

## Remains on C: (keep)

| Path | Size | Action |
|------|------|--------|
| `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER` | ~150 MB | **KEEP** — canonical upload reference |
| All contents | 65 files | Do not delete after git commit |

---

## Next steps (Jason / Morgan)

1. **Free C: drive** — identify large Downloads/Desktop duplicates manually
2. Re-run MASTER_UPLOAD sync to `production_staging/MASTER_UPLOAD_REFERENCE/`
3. Copy omnibus `cover_front_web.png` → `public/covers/omnibus-case-front.png`
4. Consider Git LFS for print PDFs if full mirror needed in repo

---

## Canonical reference

Live upload packages: `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER`  
Repo manifest: `production_staging/MASTER_UPLOAD_REFERENCE/README.md`
