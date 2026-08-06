# Outstand v2 Assignment Plan — Diana (prep only)
**Prepared:** 2026-07-29 evening  
**Status:** Captions synced · **v2 assignment complete 2026-07-29** · **do not publish without Jason Phase 4 approval**

Jason approved Vivian QC follow-ups: v2 for Outstand assignment path, slot 1 full carousel, IG slide 01 subline swap.

---

## Summary

| Bucket | Count | Action |
|--------|------:|--------|
| Content drafts (unassigned) | **17** | PATCH v2 media paths; captions already synced from manifest |
| Duplicate drafts (slots 3–6) | **4** | Delete after v2 assigned to primary draft |
| Test stubs deleted | **2** (`8gvXI`, `TaVN1`) | Done |
| Test stub remaining | **0** | `SjQjJ` deleted during assignment run |
| Live published | separate | **No touch** — edit-first policy |

**Caption sync:** `python scripts/fix_social_captions.py --apply --unassigned-only` — **17/17 PATCH OK** (2026-07-29).

---

## v2 media paths (local)

### IG carousels → `public/social/imagen-overlaid/slotN/v2/`

| Slot | Slides | Pattern |
|------|--------|---------|
| 1 Frequency | 6 | `ig-slot1-slide01-v2.jpg` … `ig-slot1-slide06-v2.jpg` |
| 2 Cymatics | 6 | `ig-slot2-slide01-v2.jpg` … `ig-slot2-slide06-v2.jpg` |
| 3 Kansas City | 7 | `ig-slot3-slide01-v2.jpg` … `ig-slot3-slide07-v2.jpg` |
| 4 Ars Notoria | 6 | `ig-slot4-slide01-v2.jpg` … `ig-slot4-slide06-v2.jpg` |
| 5 Stone | 6 | `ig-slot5-slide01-v2.jpg` … `ig-slot5-slide06-v2.jpg` |
| 6 Factions | 6 | `ig-slot6-slide01-v2.jpg` … `ig-slot6-slide06-v2.jpg` |
| 7 CC0/File | 6 | `ig-slot7-slide01-v2.jpg` … `ig-slot7-slide06-v2.jpg` |

Regenerate: `python scripts/overlay_slot1_v2.py` (slot 1) · `python scripts/overlay_slots_v2_batch.py` (slots 2–7)

### Platform singles → `public/social/platform-overlaid/*-v2.jpg`

| Slot | X/FB square | Pinterest tall |
|------|-------------|----------------|
| 1 | `slot1-frequency-xfb-v2.jpg` | `pinterest-slot1-frequency-v2.jpg` |
| 2 | `slot2-cymatics-xfb-v2.jpg` | `pinterest-slot2-cymatics-v2.jpg` |
| 3 | `slot3-kansas-city-xfb-v2.jpg` | `pinterest-slot3-kansas-city-v2.jpg` |
| 4 | `slot4-grimoire-xfb-v2.jpg` | `pinterest-slot4-ars-notoria-v2.jpg` |
| 5 | `slot5-stone-xfb-v2.jpg` | `pinterest-slot5-stone-remembers-v2.jpg` |
| 6 | `slot6-factions-xfb-v2.jpg` | `pinterest-slot6-three-factions-v2.jpg` |
| 7 | `slot7-unreleased-xfb-v2.jpg` | `pinterest-slot7-unreleased-v2.jpg` |

---

## Draft → slot → v2 media mapping

Captions from `content/social/CAPTION_MANIFEST.json` (already PATCHed). Assign v2 files via Outstand media upload + PATCH.

### Primary drafts (keep)

| Draft ID | Slot | Current v1 media | v2 target | Caption field |
|----------|------|------------------|-----------|---------------|
| `co4CL` | 1 | `slot1-frequency-xfb.jpg` | `platform-overlaid/slot1-frequency-xfb-v2.jpg` | `x` |
| `i4mZB` | 1 | `slot1-frequency-hero.png` | `platform-overlaid/pinterest-slot1-frequency-v2.jpg` | `instagram` |
| `Mp2IC` | 2 | `slot2-cymatics-xfb.jpg` | `platform-overlaid/slot2-cymatics-xfb-v2.jpg` | `x` |
| `OdLDv` | 3 | `slot3-kansas-city-xfb.jpg` | `platform-overlaid/slot3-kansas-city-xfb-v2.jpg` | `x` |
| `Bidvn` | 3 | `slot3-kansas-city-hero.png` | `platform-overlaid/pinterest-slot3-kansas-city-v2.jpg` | `instagram` |
| `D5eQo` | 4 | `slot4-grimoire-xfb.jpg` | `platform-overlaid/slot4-grimoire-xfb-v2.jpg` | `x` |
| `AEaA7` | 4 | `slot4-ars-notoria-hero.png` | `platform-overlaid/pinterest-slot4-ars-notoria-v2.jpg` | `instagram` |
| `LciHV` | 5 | `slot5-stone-xfb.jpg` | `platform-overlaid/slot5-stone-xfb-v2.jpg` | `x` |
| `LcUCV` | 5 | `slot5-stone-remembers-hero.png` | `platform-overlaid/pinterest-slot5-stone-remembers-v2.jpg` | `instagram` |
| `8xTnI` | 6 | `slot6-factions-xfb.jpg` | `platform-overlaid/slot6-factions-xfb-v2.jpg` | `x` |
| `7ATrW` | 6 | `slot6-three-factions-hero.png` | `platform-overlaid/pinterest-slot6-three-factions-v2.jpg` | `instagram` |
| `nBuLl` | 7 | `slot7-unreleased-xfb.jpg` | `platform-overlaid/slot7-unreleased-xfb-v2.jpg` | `x` |
| `y9lnj` | 7 | `slot7-unreleased-hero.png` | `platform-overlaid/pinterest-slot7-unreleased-v2.jpg` | `instagram` |

### Duplicate drafts (delete after v2 on primary)

| Draft ID | Slot | Duplicate of | Notes |
|----------|------|--------------|-------|
| `2y94S` | 3 | `Bidvn` | Same hero media |
| `FMGaZ` | 4 | `AEaA7` | Same hero media |
| `gOmqx` | 5 | `LcUCV` | Same hero media |
| `Omt0v` | 6 | `7ATrW` | Same hero media |

### Manifest caption openers (post-PATCH)

| Slot | Opener |
|------|--------|
| 1 | 110 Hz is measured. 111.2 Hz is mine. |
| 2 | Sound has shapes. That part is not mystical. It is 1787. |
| 3 | Four traditions looked at the same thirty miles… |
| 4 | A medieval grimoire condemned as cheating. |
| 5 | The fire took everything except the walls. |
| 6 | One government published. The other classified… |
| 7 | The trilogy ends with a license. |

Full text per platform: `content/social/CAPTION_MANIFEST.json` → `slots.N.{instagram|x|facebook_author|bluesky}`.

---

## IG carousel forward posts (not in current unassigned queue)

Current unassigned drafts are **single-image** (hero / xfb). To ship v2 IG carousels forward:

1. Create new Outstand drafts (or repurpose duplicates after delete).
2. Upload all slides from `imagen-overlaid/slotN/v2/`.
3. Caption: `CAPTION_MANIFEST.json` → `slots.N.instagram`.
4. Slot 1 is now **6-slide v2 complete** with platform-aligned slide 01 subline.

---

## Assignment workflow (Diana)

1. Upload v2 JPG from local paths to Outstand media.
2. PATCH `/v1/posts/{id}` — swap `containers[0].media` to new URLs (caption already synced).
3. Assign platform accounts **only after Jason second approval**.
4. Delete duplicates (`2y94S`, `FMGaZ`, `gOmqx`, `Omt0v`) and stub `SjQjJ`.
5. Do **not** publish or schedule without explicit Jason sign-off.

---

## Jason decisions locked (2026-07-29)

- [x] Slot 1 IG slide 01 subline → platform line (*110 is measured…*)
- [x] Full slot 1 six-slide v2 carousel
- [x] v2 authorized for Outstand assignment (prep only)
- [x] Slot 7 omnibus whisper — skipped; Vivian cleared

---

**Assignment report:** `content/social/OUTSTAND_V2_ASSIGNMENT_REPORT.md` · script: `scripts/assign_outstand_v2.py`

*Diana · assignment complete · await Jason publish approval*
