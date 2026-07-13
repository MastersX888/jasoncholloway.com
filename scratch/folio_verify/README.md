# Folio BeineckeRef Visual Verification Engine

Human-in-the-loop tool for confirming `beineckeRef` values in `lib/folios.json` against Yale's open-access Beinecke MS 408 digitization.

**Rule:** Suggestions are similarity hints only. Nothing is written to `folios.json` until you visually confirm each row.

## Prerequisites

- Python 3.10+
- `pip install Pillow imagehash`
- E: folio export present at:
  `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\next_export_folios\voynich\`
- Network access (Yale IIIF manifest + thumbnails)

## Quick start

```powershell
cd scratch\folio_verify
python prepare.py          # ~3–5 min first run (downloads Yale thumbs + hashes)
python serve.py            # opens http://127.0.0.1:8765
```

## Workflow

1. **Prepare** builds:
   - `data/queue.json` — 166 Voynich rows (164 pending + 2 already verified)
   - `data/yale_folio_index.json` — 213 Yale MS 408 canvases (IIIF URLs)
   - `data/suggestions.json` — top-8 perceptual-hash matches per pending folio
   - `data/state.json` — your session progress (gitignored)

2. **Review** in the browser:
   - Left pane: local export JPEG from E: drive
   - Right pane: Yale digital surrogate (pick folio from dropdown or suggestion chips)
   - Sync pan/zoom, optional overlay compare
   - Enter confirmed `beineckeRef` (e.g. `f2v`, `f68r3`, `f85v-86r`)
   - **Confirm** saves to session state; **Skip** defers

3. **Export** when ready:
   ```powershell
   python export_patch.py --dry-run
   python export_patch.py
   ```
   Or use **Export patch JSON** in the UI → `data/beinecke_ref_patch.json`.

## Current baseline

| Status | Count |
|--------|------:|
| Voynich rows | 166 |
| Verified in `folios.json` | 2 (`v1-009`→`f2v`, `v3-052`→`f68r3`) |
| Pending visual verification | 164 |
| Vol 4 with filename hints | 9 (still require visual confirm) |

## Notes

- **Vol 1–3** filenames (`voynich-004`, `voynich2-000`, `vol3-052`) are export sequence numbers, not Beinecke folio numbers. OCR on corner foliation failed — do not infer from index.
- **Vol 4** filenames (`f85v-86r.jpg`) are hints only until visually confirmed.
- **Foldout panels** (e.g. rosette sub-panels) may need custom refs like `f68r3` — compare against the full Yale foldout canvas and note the panel in the reviewer note field.
- Re-run `python prepare.py suggestions` after Yale updates their manifest.

## Files

| File | Purpose |
|------|---------|
| `prepare.py` | Build queue + Yale index + similarity suggestions |
| `serve.py` | Local review UI server |
| `export_patch.py` | Apply session verifications to `lib/folios.json` |
| `config.py` | Paths and constants |

## After verification

When all 164 rows are confirmed, commit with:

```
fix(folios): beineckeRef site-wide caption accuracy
```

Per `ELEVATION_III_PROMPT.md`.
