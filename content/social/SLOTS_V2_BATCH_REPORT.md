# Slots 2–7 v2 Batch Report
**River · 2026-07-29 evening**  
**Status:** Generated locally — not published, Outstand untouched.

---

## Summary

Jason approved the slot 1 v2 system. This pass batched slots **2–7** with the same layer stack:

- Brand footer: `JASON C. HOLLOWAY · SEVENTH CITY PRESS` + heptagram mark
- Product whisper: appropriate volume cover ~12% upper-right (slide 1 / single-image posts only)
- Exit line: `jasoncholloway.com`
- Typography: EB Garamond + Cinzel via `scripts/overlay_carousel.py`

**Generated:** 37 IG carousel slides + 12 platform assets (X/FB squares + Pinterest talls).

---

## Regenerate

```bash
python scripts/overlay_slots_v2_batch.py          # slots 2–7 (default)
python scripts/overlay_slots_v2_batch.py 4 5      # subset
python scripts/overlay_slot1_v2.py                  # slot 1 mock only
```

**Prerequisite:** Imagen ground PNGs under `public/social/imagen/slotN/`. These were restored from commit `af34db8` (cloud-agent branch) before the batch run; only slot 1 grounds were previously on disk.

---

## Output paths

### IG carousels → `public/social/imagen-overlaid/slotN/v2/`

| Slot | Slides | Hook ground |
|------|--------|-------------|
| 2 Cymatics | 6 | `ig-slot2-slide01.png` |
| 3 Kansas City | 7 | `ig-slot3-slide01.png` |
| 4 Ars Notoria | 6 | `ig-slot4-slide01.png` |
| 5 Stone | 6 | `ig-slot5-slide01.png` |
| 6 Factions | 6 | `ig-slot6-slide01.png` |
| 7 CC0/File | 6 | `ig-slot7-slide01.png` |

Naming: `ig-slotN-slideNN-v2.jpg` (1080×1080 JPEG).

### Platform → `public/social/platform-overlaid/*-v2.jpg`

| Slot | X/FB square | Pinterest tall |
|------|-------------|----------------|
| 2 | `slot2-cymatics-xfb-v2.jpg` | `pinterest-slot2-cymatics-v2.jpg` |
| 3 | `slot3-kansas-city-xfb-v2.jpg` | `pinterest-slot3-kansas-city-v2.jpg` |
| 4 | `slot4-grimoire-xfb-v2.jpg` | `pinterest-slot4-ars-notoria-v2.jpg` |
| 5 | `slot5-stone-xfb-v2.jpg` | `pinterest-slot5-stone-remembers-v2.jpg` |
| 6 | `slot6-factions-xfb-v2.jpg` | `pinterest-slot6-three-factions-v2.jpg` |
| 7 | `slot7-unreleased-xfb-v2.jpg` | `pinterest-slot7-unreleased-v2.jpg` |

Platform copy uses the stronger platform-hero headlines/bodies from `scripts/overlay_platform_heroes.py` (same as v1 platform layer, now with v2 footer + whisper).

---

## Product whisper mapping

| Slot | Cover asset | Rationale |
|------|-------------|-----------|
| 2 Cymatics | Vol I (`book1-hardcover-v3.png`) | Foundational research layer |
| 3 Kansas City | Vol I | KC underground = Inheritance setting |
| 4 Ars Notoria | Vol II (`book2-hardcover-v3.png`) | Grimoire / notae thread |
| 5 Stone | Vol I | KC locations essay |
| 6 Factions | Vol III (`book3-hardcover-v3.png`) | Declassified file / Kingdom |
| 7 CC0/File | Omnibus (`omnibus-hardcover-v3.png`) | Trilogy-ending release |

Whisper appears on **IG slide 01** and all **platform single-image** posts. Slides 2+ get brand footer + exit line only.

---

## Slot-specific decisions

1. **No gear swap needed (2–7)** — Slot 1 was the only ground flagged for modern recording gear. Slots 2–7 use existing Imagen carousel grounds as-is.
2. **Full carousels batched** — Unlike the slot 1 mock (hero only), this pass generated **all** carousel slides per slot, not just slide 01.
3. **Imagen source recovery** — Raw `public/social/imagen/slot2–7/` PNGs were missing from working tree; restored via `git checkout af34db8 -- public/social/imagen/` before generation. Recommend committing imagen sources so future batches do not depend on the cloud-agent branch.
4. **v1 preserved** — All v1 outputs in `imagen-overlaid/slotN/` (non-v2) and `platform-overlaid/*.jpg` (non-v2) left untouched per edit-first policy.

---

## Code touched

| File | Change |
|------|--------|
| `scripts/overlay_slots_v2_batch.py` | **New** — batch runner for slots 2–7 |
| `scripts/overlay_carousel.py` | `product_whisper` + `cover_path` params on `add_text_overlay` |
| `scripts/overlay_slot1_v2.py` | `cover_path` + `portrait` on `overlay_platform_hero_v2` |

No Outstand API calls. No live post edits.

---

## Optional next steps (not done)

- **Caption PATCH:** `python scripts/fix_social_captions.py --apply` on unassigned drafts (images swap later when Diana assigns v2 paths).
- **Commit imagen sources:** Stage restored `public/social/imagen/slot2–7/` PNGs.
- **Slot 1 full carousel v2:** Extend `overlay_slot1_v2.py` to batch slides 2–6 with chamber-only ground if Jason wants parity.

---

## Jason follow-up

1. Spot-check one hero per slot (IG slide 01 + platform square) for cover scale and footer quietness.
2. Confirm omnibus whisper on slot 7 reads correctly vs single-volume whispers.
3. Decide whether slot 1 should get the full 6-slide v2 carousel pass (currently mock is slide 01 only).

---

*Hand back to Diana for draft assignment / Morgan for caption sync queue.*
