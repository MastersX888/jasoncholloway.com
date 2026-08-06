# MASTER_UPLOAD_FOLDER Cleanup — 2026-07-31

**Target:** `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER`  
**Trigger:** Jason visual approval of covers (Jul 31)  
**Action:** Delete stale/backup assets; rename upload files to `{ISBN}_{format}_{type}` scheme.

---

## Safety check (pre-delete)

Verified Vivian-passed cover PDFs existed before removing backups:

| File | Status |
|------|--------|
| `9798256008048_PB/cover_wrap.pdf` | ✓ present → renamed |
| `9798256009953_PB/cover_wrap.pdf` | ✓ present → renamed |
| `9798295800801_HC/cover_jacket.pdf` | ✓ present → renamed |
| `9798295800801_HC/cover_caselam.pdf` | ✓ present → renamed |
| `9798295812705_HC/cover_jacket.pdf` | ✓ present → renamed |
| `9798295812705_HC/cover_caselam.pdf` | ✓ present → renamed |

All 8 print interiors verified present before cleanup.

---

## Deletions (24 files)

### Interior/cover backups (`*_PRE_*`) — 16 files

| Path |
|------|
| `9798256008048_PB/cover_wrap_PRE_2026-07-30.pdf` |
| `9798256008048_PB/interior_PRE_ITALIC_FIX_2026-07-30.pdf` |
| `9798256008048_PB/interior_PRE_PREVIEW_FIX_2026-07-30.pdf` |
| `9798256009953_PB/cover_wrap_PRE_2026-07-30.pdf` |
| `9798256009953_PB/interior_PRE_ITALIC_FIX_2026-07-30.pdf` |
| `9798256009953_PB/interior_PRE_PREVIEW_FIX_2026-07-30.pdf` |
| `9798256010072_PB/interior_PRE_ITALIC_FIX_2026-07-30.pdf` |
| `9798295800801_HC/cover_caselam_PRE_2026-07-30.pdf` |
| `9798295800801_HC/cover_jacket_PRE_2026-07-30.pdf` |
| `9798295800801_HC/interior_PRE_ITALIC_FIX_2026-07-30.pdf` |
| `9798295800801_HC/interior_PRE_PREVIEW_FIX_2026-07-30.pdf` |
| `9798295812675_HC/interior_PRE_ITALIC_FIX_2026-07-30.pdf` |
| `9798295812675_HC/interior_PRE_PREVIEW_FIX_2026-07-30.pdf` |
| `9798295812705_HC/cover_caselam_PRE_2026-07-30.pdf` |
| `9798295812705_HC/cover_jacket_PRE_2026-07-30.pdf` |
| `9798295812705_HC/interior_PRE_ITALIC_FIX_2026-07-30.pdf` |

### Web-only assets — 4 PNGs

| Path |
|------|
| `9798295800801_HC/cover_front_web.png` |
| `9798295812675_HC/cover_front_web.png` |
| `9798295812705_HC/cover_front_web.png` |
| `9798295884412_HC/cover_front_web.png` |

### Superseded preview thumbnails — 4 JPGs

| Path |
|------|
| `_cover_preview/9798295800801_HC_cover_front_web.jpg` |
| `_cover_preview/9798295812675_HC_cover_front_web.jpg` |
| `_cover_preview/9798295812705_HC_cover_front_web.jpg` |
| `_cover_preview/9798295884412_HC_cover_front_web.jpg` |

---

## Renames (38 operations)

### Print PDFs (20)

| From | To |
|------|-----|
| `9798256008048_PB/interior.pdf` | `9798256008048_PB/9798256008048_PB_interior.pdf` |
| `9798256008048_PB/cover_wrap.pdf` | `9798256008048_PB/9798256008048_PB_wrap.pdf` |
| `9798256009953_PB/interior.pdf` | `9798256009953_PB/9798256009953_PB_interior.pdf` |
| `9798256009953_PB/cover_wrap.pdf` | `9798256009953_PB/9798256009953_PB_wrap.pdf` |
| `9798256010072_PB/interior.pdf` | `9798256010072_PB/9798256010072_PB_interior.pdf` |
| `9798256010072_PB/cover_wrap.pdf` | `9798256010072_PB/9798256010072_PB_wrap.pdf` |
| `9798256072704_PB/interior.pdf` | `9798256072704_PB/9798256072704_PB_interior.pdf` |
| `9798256072704_PB/cover_wrap.pdf` | `9798256072704_PB/9798256072704_PB_wrap.pdf` |
| `9798295800801_HC/interior.pdf` | `9798295800801_HC/9798295800801_HC_interior.pdf` |
| `9798295800801_HC/cover_jacket.pdf` | `9798295800801_HC/9798295800801_HC_jacket.pdf` |
| `9798295800801_HC/cover_caselam.pdf` | `9798295800801_HC/9798295800801_HC_case.pdf` |
| `9798295812675_HC/interior.pdf` | `9798295812675_HC/9798295812675_HC_interior.pdf` |
| `9798295812675_HC/cover_jacket.pdf` | `9798295812675_HC/9798295812675_HC_jacket.pdf` |
| `9798295812675_HC/cover_caselam.pdf` | `9798295812675_HC/9798295812675_HC_case.pdf` |
| `9798295812705_HC/interior.pdf` | `9798295812705_HC/9798295812705_HC_interior.pdf` |
| `9798295812705_HC/cover_jacket.pdf` | `9798295812705_HC/9798295812705_HC_jacket.pdf` |
| `9798295812705_HC/cover_caselam.pdf` | `9798295812705_HC/9798295812705_HC_case.pdf` |
| `9798295884412_HC/interior.pdf` | `9798295884412_HC/9798295884412_HC_interior.pdf` |
| `9798295884412_HC/cover_jacket.pdf` | `9798295884412_HC/9798295884412_HC_jacket.pdf` |
| `9798295884412_HC/cover_caselam.pdf` | `9798295884412_HC/9798295884412_HC_case.pdf` |

### EPUB cover JPGs (3)

| From | To |
|------|-----|
| `9798256008819_EPUB/9798256008819.jpg` | `9798256008819_EPUB/9798256008819_EPUB_cover.jpg` |
| `9798256009625_EPUB/9798256009625.jpg` | `9798256009625_EPUB/9798256009625_EPUB_cover.jpg` |
| `9798256009809_EPUB/9798256009809.jpg` | `9798256009809_EPUB/9798256009809_EPUB_cover.jpg` |

### Preview thumbnails (11)

| From | To |
|------|-----|
| `_cover_preview/9798256008048_PB_cover_wrap.jpg` | `_cover_preview/9798256008048_PB_wrap.jpg` |
| `_cover_preview/9798256009953_PB_cover_wrap.jpg` | `_cover_preview/9798256009953_PB_wrap.jpg` |
| `_cover_preview/9798256010072_PB_cover_wrap.jpg` | `_cover_preview/9798256010072_PB_wrap.jpg` |
| `_cover_preview/9798256072704_PB_cover_wrap.jpg` | `_cover_preview/9798256072704_PB_wrap.jpg` |
| `_cover_preview/9798295800801_HC_cover_caselam.jpg` | `_cover_preview/9798295800801_HC_case.jpg` |
| `_cover_preview/9798295800801_HC_cover_jacket.jpg` | `_cover_preview/9798295800801_HC_jacket.jpg` |
| `_cover_preview/9798295812675_HC_cover_caselam.jpg` | `_cover_preview/9798295812675_HC_case.jpg` |
| `_cover_preview/9798295812675_HC_cover_jacket.jpg` | `_cover_preview/9798295812675_HC_jacket.jpg` |
| `_cover_preview/9798295812705_HC_cover_caselam.jpg` | `_cover_preview/9798295812705_HC_case.jpg` |
| `_cover_preview/9798295812705_HC_cover_jacket.jpg` | `_cover_preview/9798295812705_HC_jacket.jpg` |
| `_cover_preview/9798295884412_HC_cover_caselam.jpg` | `_cover_preview/9798295884412_HC_case.jpg` |
| `_cover_preview/9798295884412_HC_cover_jacket.jpg` | `_cover_preview/9798295884412_HC_jacket.jpg` |
| `_cover_preview/9798256008819_EPUB_9798256008819.jpg` | `_cover_preview/9798256008819_EPUB_cover.jpg` |
| `_cover_preview/9798256009625_EPUB_9798256009625.jpg` | `_cover_preview/9798256009625_EPUB_cover.jpg` |
| `_cover_preview/9798256009809_EPUB_9798256009809.jpg` | `_cover_preview/9798256009809_EPUB_cover.jpg` |

---

## Also updated

| File | Change |
|------|--------|
| `README_UPLOAD.txt` | New naming convention + page-count reminder |
| `COVER_PREVIEW.html` | Paths updated; web-reference cards removed; backup section removed |
| `scratch/ops_reports/CHECKLIST_2026-07-30.md` | Jason approval + cleanup note |

---

## Final folder tree

```
MASTER_UPLOAD_FOLDER/
├── COVER_PREVIEW.html
├── README_UPLOAD.txt
├── _cover_preview/
│   ├── 9798256008048_PB_wrap.jpg
│   ├── 9798256008819_EPUB_cover.jpg
│   ├── 9798256009625_EPUB_cover.jpg
│   ├── 9798256009809_EPUB_cover.jpg
│   ├── 9798256009953_PB_wrap.jpg
│   ├── 9798256010072_PB_wrap.jpg
│   ├── 9798256072704_PB_wrap.jpg
│   ├── 9798295800801_HC_case.jpg
│   ├── 9798295800801_HC_jacket.jpg
│   ├── 9798295812675_HC_case.jpg
│   ├── 9798295812675_HC_jacket.jpg
│   ├── 9798295812705_HC_case.jpg
│   ├── 9798295812705_HC_jacket.jpg
│   ├── 9798295884412_HC_case.jpg
│   └── 9798295884412_HC_jacket.jpg
├── 9798256008048_PB/
│   ├── 9798256008048_PB_interior.pdf
│   ├── 9798256008048_PB_wrap.pdf
│   └── STATUS.md
├── 9798256008819_EPUB/
│   ├── 9798256008819.epub
│   ├── 9798256008819_EPUB_cover.jpg
│   ├── MANUSCRIPT_CURRENT.txt
│   └── STATUS.md
├── 9798256009625_EPUB/ … (same pattern)
├── 9798256009809_EPUB/ … (same pattern)
├── 9798256009953_PB/
│   ├── 9798256009953_PB_interior.pdf
│   ├── 9798256009953_PB_wrap.pdf
│   └── STATUS.md
├── 9798256010072_PB/ … (interior + wrap + STATUS.md)
├── 9798256072704_PB/ … (interior + wrap + STATUS.md)
├── 9798295800801_HC/
│   ├── 9798295800801_HC_case.pdf
│   ├── 9798295800801_HC_interior.pdf
│   ├── 9798295800801_HC_jacket.pdf
│   └── STATUS.md
├── 9798295812675_HC/ … (case + interior + jacket + STATUS.md)
├── 9798295812705_HC/ … (case + interior + jacket + STATUS.md)
└── 9798295884412_HC/ … (case + interior + jacket + STATUS.md)
```

---

## Summary counts

| Metric | Count |
|--------|-------|
| Files deleted | **24** |
| Files renamed | **38** |
| Upload-ready PDFs | **23** (8 interior + 4 wrap + 8 HC cover + 3 omnibus/trilogy HC) |
| EPUB packages | **3** (unchanged `.epub`; cover JPG renamed) |

---

## Uncertain / notes for Jason

1. **Vol II HC + Omnibus HC covers** (`9798295812675_HC`, `9798295884412_HC`) — dated Jul 29; not in Vivian's Jul 31 six-file re-QC batch but retained as current upload files. Jason approved visually.
2. **Vol III PB wrap** (`9798256010072_PB_wrap.pdf`) — dated Jul 29; same note as above.
3. **Omnibus PB wrap** (`9798256072704_PB_wrap.pdf`) — dated Jul 29; unchanged since geometry-era restage.
4. **STATUS.md / MANUSCRIPT_CURRENT.txt** — kept as local ops notes; not for Ingram upload.
5. **No upload performed** — folder staged only.
