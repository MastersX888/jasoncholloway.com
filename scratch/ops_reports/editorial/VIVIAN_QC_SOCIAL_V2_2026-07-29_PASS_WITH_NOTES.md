# Vivian QC — Social v2 Batch (Slots 1–7)
**Status:** COMPLETE  
**Verdict:** **PASS WITH NOTES**  
**Checked:** 2026-07-29  
**Owner:** Vivian · routed by Morgan  
**Ready for checklist:** yes  

---

## Scope

All v2 social creative generated after Jason approved the slot 1 system (51 JPGs: IG carousels + platform squares + Pinterest talls).

| Check | Reference | Result |
|-------|-----------|--------|
| Fact-check (Field Note claims) | `scripts/overlay_carousel.py` CAROUSEL_DATA | **PASS** |
| Brand voice + identifiers | `scratch/EDITORIAL_QC_PROTOCOL.md` §2 | **PASS** |
| Caption/manifest alignment | `CAPTION_MANIFEST.json`, `.caption-fix-audit.json` | **PASS WITH NOTES** |
| ISBN/ASIN (if cited on slides) | `scratch/MORGAN_OPERATING_MEMORY.md` | **PASS** (none cited) |
| Cross-format (IG slide 01 vs platform square) | Spot-check slots 1, 4, 7 + slides 2, 3, 6 | **PASS WITH NOTES** |

**Spot-checked heroes:** slot 1 IG + X/FB, slot 4 IG + X/FB, slot 7 IG + X/FB; IG slide 01 for slots 2, 3, 6.

---

## Verdict

- [x] **PASS WITH NOTES** — advance to Jason spot-check → Diana Outstand assignment (after Jason Phase 4 approval)
- [ ] **PASS**
- [ ] **BLOCK**

---

## Checklist detail

### 1. Fact-check layer — PASS

Slide copy in `CAROUSEL_DATA` and `overlay_platform_heroes.py` HEROES matches manifest research/fiction boundaries:

| Slot | Research on record | Fiction boundary named |
|------|-------------------|------------------------|
| 1 Frequency | 110 Hz Hypogeum / Devereux / Reznikoff-Dauvois; caveat on small sample | Slide 6 + platform: 111.2 Hz is fiction |
| 2 Cymatics | Chladni 1787, Jenny Kymatik, 800–865 cps | Slide 6 + platform: observer effect is invented |
| 3 Kansas City | Hopewell, Osage, Independence 1831, SubTropolis | Slide 6–7: no KC underground acoustics study; sited not sourced |
| 4 Ars Notoria | MS Sloane 1712, Turner 1657, condemnation as shortcut | Slide 6 + platform: “that it works” is invented |
| 5 Stone | Westport Presbyterian 2011 fire; cathedral brick correction | Slide 5 names correction; metaphor warrant explicit |
| 6 Factions | 1984 translation asymmetry | Slide 6: three-way sort is author reading, not document heading |
| 7 CC0/File | CC0 and open-science tradition real | Slide 6 + platform: file/pages/downloads invented |

No invented citations, wrong dates, or canon contradictions found on overlaid copy.

### 2. Brand voice — PASS

- `FIELD NOTE · …` labels present and slot-consistent on all spot-checked frames
- Footer lockup: `JASON C. HOLLOWAY · SEVENTH CITY PRESS` + heptagram mark + `jasoncholloway.com`
- Tone: literate, grounded Field Note — no hype CTAs, pill clusters, or off-brand slang
- Cover whispers use correct volume per `SLOTS_V2_BATCH_REPORT.md` (Vol I / II / III / omnibus slot 7)

### 3. Caption / manifest alignment — PASS WITH NOTES

**Image layer vs caption layer (by design):** IG carousels use `CAROUSEL_DATA` hooks on slide 01, not manifest caption openers. Platform squares use `HEROES` headlines/bodies. Outstand captions must still come from `CAPTION_MANIFEST.json` at assignment — image copy is complementary, not a substitute.

| Slot | Manifest opener (caption) | IG slide 01 hook | Aligned? |
|------|---------------------------|------------------|----------|
| 1 | 110 Hz is measured. 111.2 Hz is mine. | f = 111.2 Hz / footer-stamp metaphor | Thematic ✓; not literal opener |
| 2 | Sound has shapes. That part is not mystical. It is 1787. | 1787. / plate, bow, sand | Thematic ✓ |
| 3 | Four traditions looked at the same thirty miles… | Why Kansas City? / four traditions, one riverbank | Thematic ✓ |
| 4 | A medieval grimoire condemned as cheating. | Condemned as cheating. / Not devil-worship | **Literal match ✓** |
| 5 | The fire took everything except the walls. | 2011. / Westport Presbyterian burns | Thematic ✓ |
| 6 | One government published. The other classified… | 1984. / A translation, not an assessment | Thematic ✓ |
| 7 | The trilogy ends with a license. | 247 pages. Midnight. CC0. | Thematic ✓ |

**Legacy opener drift (`.caption-fix-audit.json`):** Affects **published v1** Pinterest pins and **unassigned Outstand drafts** — not v2 JPG copy. Diana should PATCH captions from manifest when assigning v2 media; no River rebuild required for drift alone.

### 4. ISBN / ASIN — PASS (N/A)

No ISBN or ASIN on any overlaid slide. Product whispers are cover art only (no catalog numbers visible at whisper scale).

### 5. Cross-format — PASS WITH NOTES

| Slot | IG slide 01 subline | Platform square body | Issue |
|------|---------------------|----------------------|-------|
| **1** | A footer stamp on a manuscript page | 110 is measured. The extra decimal is the fiction signing its own work. | **Known split** — carousel metaphor vs platform manifest-adjacent line |
| 4 | Not devil-worship | Not devil-worship. What I invented is narrower: that it works. | Platform extends; consistent |
| 7 | A conspiracy trilogy that ends with a file format | The file is fiction. Public domain is not. | Different emphasis; both factually sound |

Slots 2–6 follow the same pattern: IG slide 01 = carousel hook; platform = stronger hero line from `HEROES`. No factual conflict.

---

## Notes (yellow flags — Jason decides)

1. **Slot 1 IG vs platform subline** — ~~Platform carries the manifest-adjacent 110/111.2 boundary; IG slide 01 uses carousel metaphor~~ **RESOLVED 2026-07-29:** Jason chose **SWAP** — IG slide 01 now uses platform line (*“110 is measured. The extra decimal is the fiction signing its own work.”*). Regenerated in `overlay_carousel.py` + full slot 1 v2 carousel.
2. **Slot 1 scope** — ~~Only slide 01 v2 exists~~ **RESOLVED 2026-07-29:** Jason authorized **full 6-slide v2 carousel** → `public/social/imagen-overlaid/slot1/v2/`.
3. **Slot 7 omnibus whisper** — **SKIPPED 2026-07-29:** Morgan default; Vivian already cleared; no River rebuild unless images look wrong on regen.
4. **Unassigned caption sync** — **DONE 2026-07-29:** Diana ran `scripts/fix_social_captions.py --apply --unassigned-only` — 17/17 PATCH OK. Media assignment plan: `content/social/OUTSTAND_V2_ASSIGNMENT_PLAN.md`.
5. **Published Pinterest v1** — Five pins still on SEO-style openers per audit; edit-first policy = leave live unless Jason approves caption edit. v2 Pinterest assets ready for **forward** drafts only.

---

## Blockers

None.

---

## Post-mortem (2026-07-30)

**Visual layout pass missed text clipping.** Slot 7 IG carousel: headline rendered as *"hy leaking fails"* (leading *W* clipped off left edge of panel). Jason caught on preview 2026-07-30; corrected same day. **Protocol updated:** `scratch/EDITORIAL_QC_PROTOCOL.md` §4 Visual / layout QC now mandatory for image assets — Vivian must preview carousels before PASS, not caption/manifest audit alone.

---

## Cross-team sign-off

| Owner | Status |
|-------|--------|
| **River** | v2 assets generated; slot 1 full carousel + subline swap complete |
| **Diana** | Captions PATCHed (17/17); assignment plan written — **await Jason publish approval** |
| **Nina** | Alt/metadata pass not in this QC scope |
| **Claire** | N/A |

---

## Jason Phase 4 decisions (2026-07-29 evening)

| Item | Decision |
|------|----------|
| v2 for Outstand assignment | **Approved** (prep only — no publish) |
| Slot 1 IG subline | **SWAP** to platform line |
| Slot 1 carousel | **Full 6-slide v2** |
| Slot 7 omnibus whisper | **Skipped** — Vivian cleared |

---

## Session handoff (Morgan → Jason)

### Vivian QC — Social v2 batch (slots 1–7)
- **Verdict:** PASS WITH NOTES
- **Checked:** 2026-07-29
- **Notes:** Jason locked subline swap + full slot 1 carousel; captions synced on unassigned drafts; publish still gated
- **Ready for checklist:** yes (executed)

---

*VIVIAN — Editorial Quality & Pre-Publication Control, Seventh City Press LLC*
