# Text Clip Fix Report
**Executed:** 2026-07-30  
**Gate:** No publish — Jason re-verify in Social Preview, then say **"publish all v2"**

---

## Root cause

**Primary:** Social Preview CSS displayed square 1080×1080 IG slides inside a **4:5 frame with `object-fit: cover`**, cropping ~108px from each side. Headlines drawn at ~59px left margin were clipped — e.g. slot 7 slide 3 showed **"hy leaking fails"** instead of **"Why leaking fails"**.

**Secondary (hardening):** Overlay margin was 5.5% (~59px). Raised to **6% with 64px floor at 1080w** and added font-bearing-safe text placement via `safe_text_x()` / `draw_text_line()`.

Source JPGs were largely correct; the defect was most visible in preview. Margin hardening protects against edge cases (EB Garamond negative bearing on some glyphs).

---

## Fixes applied

| File | Change |
|------|--------|
| `scripts/overlay_carousel.py` | `horizontal_margin()`, `safe_text_x()`, `draw_text_line()`; margin 6% / 64px min |
| `content/social/preview/index.html` | IG carousel `.slide-frame`: `aspect-ratio: 1/1`, `object-fit: contain` |
| `scripts/assign_outstand_v2.py` | `--refresh-ig` flag for media-only carousel refresh |

---

## Regeneration

```bash
python scripts/overlay_slot1_v2.py
python scripts/overlay_slots_v2_batch.py 1 2 3 4 5 6 7
python scripts/assign_outstand_v2.py --refresh-ig
```

**Result:** 43 IG v2 slides regenerated (slots 1–7). Filenames unchanged — same paths overwrite.

---

## Slot 7 slide 3 — before / after

| | |
|---|---|
| **Before (preview)** | Headline clipped: "hy leaking fails" · body "eserves scarcity…" |
| **After (regen + preview fix)** | **"Why leaking fails."** fully visible · body **"It preserves scarcity and relocates the power"** · text anchor x≈66px |

---

## Outstand IG carousel update

All 7 drafts **delete + recreate** with refreshed media (same captions, account `1vWPG`):

| Slot | Old ID | New ID | Slides |
|-----:|--------|--------|-------:|
| 1 | `Tpu6J` | `FEPVh` | 6 |
| 2 | `BK2dP` | `gIiz1` | 6 |
| 3 | `ei9qz` | `Oxr7T` | 7 |
| 4 | `AzfaG` | `ySUef` | 6 |
| 5 | `4nyf4` | `TpuHk` | 6 |
| 6 | `kwHns` | `BK2vq` | 6 |
| 7 | `1MEHF` | `mvXEE` | 6 |

`PREVIEW_MANIFEST.json` Outstand IDs updated. X/FB and Pinterest drafts unchanged.

---

## Jason — next step

1. Re-open **Social Preview** (`content/social/preview/index.html` or `scripts/Open_Social_Preview.bat`) — hard refresh (Ctrl+F5).
2. Spot-check slot 7 slides 2–4 and any other slots.
3. When satisfied, say **"publish all v2"** — do not auto-mass-publish until verified.
