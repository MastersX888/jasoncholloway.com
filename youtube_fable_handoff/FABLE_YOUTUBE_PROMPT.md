# FABLE — YouTube Channel · Script Proof + Visual Design Pass

**Date:** July 11, 2026  
**Publisher:** Seventh City Press LLC  
**Author / on-camera voice:** Jason Carroll Holloway  
**Series:** *The Facts Behind the Fiction* (5 episodes, 8–12 min each)  
**Scope:** Proof all episode scripts for speakability and factual seam-labeling · deliver channel/thumbnail/OST graphic assets · **not** shoot video · **not** website deploy · **not** encyclopedia print · **not** Instagram/blog (deferred)

---

## Your role

You are the **YouTube production editor and visual designer** for Jason Carroll Holloway's research-explainer channel. The author will **shoot and narrate** himself at a desk (real documents, live Chladni demo in EP04). Your job is to make the scripts **broadcast-ready** and the channel **look world-class** — without cheap AI-video slop.

**You deliver:**

### A — Script proof (Priority 1)

1. **Five proofed episode scripts** in `output/scripts/proofed/` — one file per episode, filename pattern `EP##_SHORTTITLE_PROOFED.md`
2. **`SCRIPT_PROOF_LOG.md`** — line-by-line change log per episode; every factual claim graded (`measured` / `scholarly` / `contested` / `invented`)
3. **`SPEAKABILITY_NOTES.md`** — breath marks, emphasis, words-to-avoid, estimated spoken runtime per beat

### B — Visual design (Priority 2)

4. **`output/design/channel_banner_2560x1440.png`** — per `IMAGE_DESIGN_BRIEF.md`
5. **`output/design/thumbnails/EP01–EP05.png`** — 1280×720 each; typography-led; see brief (EP04 may use abstract plate geometry, not fake photo)
6. **`output/design/ost_cards/`** — PNG set of all on-screen text cards needed across 5 episodes (Cinzel on black, gold type)
7. **`output/design/lower_third_template.png`** + **`lower_third_safe_spec.md`** — series footer `f = 111.2 Hz`
8. **`IMAGE_GENERATION_PROMPTS.md`** — every prompt you used, reusable templates, and **explicit reject list** (what not to generate)

### C — Session close

9. **`YOUTUBE_STATUS.md`** — deliverables checklist, open flags, author sign-off queue

**Cursor integrates** your return zip into `youtube_project/` or `encyclopedia_project/output/marketing/youtube/return/`. **Do not** modify jasoncholloway.com live site.

---

## Read first (in order)

1. `FABLE_YOUTUBE_PROMPT.md` — this file
2. `SCRIPT_PROOF_SPEC.md` — proofing law
3. `IMAGE_DESIGN_BRIEF.md` — asset dimensions + anti-slop image rules
4. `KNOWN_ISSUES_YOUTUBE.md` — brand locks, CANON facts, `[AUTHOR VERIFY]` items
5. `SERIES_CONTEXT.md` — register, shoot model, publish order
6. `package/youtube_production/shoot_package/SERIES_BIBLE.md` — look and sound
7. `package/youtube_production/channel/EPISODE_METADATA.md` — titles/descriptions (align proofed scripts)
8. `CANON.md` — spelling, names, story locks
9. `design_memory/BRAND_SOURCE.md` — colors, fonts, heptagram, comp shelf (Eco yes, Dan Brown tourist no)

**Source scripts to proof** (Cursor draft — treat as authoritative structure, not final prose):

- `package/youtube_production/shoot_package/EP01_FREQUENCY_IN_THE_STONE.md`
- `package/youtube_production/shoot_package/EP02_PROPHETS_UNDERGROUND_CITY.md`
- `package/youtube_production/shoot_package/EP03_THREE_FACTIONS.md`
- `package/youtube_production/shoot_package/EP04_TABLE_TOP_MIRACLE.md` (**pilot**)
- `package/youtube_production/shoot_package/EP05_FIVE_TRADITIONS.md`
- Archive: `package/youtube_production/YOUTUBE_SCRIPTS.md`

**Fact-check sources** (when tightening claims):

- `package/encyclopedia_project/output/encyclopedia/PART_THREE_ESSAYS/ESSAY_01_SOUND_INTO_FORM.md`
- `package/encyclopedia_project/output/encyclopedia/PART_THREE_ESSAYS/ESSAY_02_THE_GROUND_ITSELF.md`
- `CANON.md` · `KNOWN_ISSUES_YOUTUBE.md`

---

## Mission — ordered phases

### Phase 1 — Script proof (all 5 episodes)

For **each** episode file:

1. **Read** shoot script + shot list + OST cues + metadata title/description
2. **Proof narration** per `SCRIPT_PROOF_SPEC.md`:
   - Speakability (spoken numbers, names, pacing)
   - Factual seam labels preserved or strengthened
   - No hype adjectives; literary-documentary register
   - Hook under 50 sec spoken; CTA includes series close line
   - Align chapter timestamps in metadata if beats shift >15 sec
3. **Do not** change core claims without flagging in `SCRIPT_PROOF_LOG.md`
4. **Preserve** anti-slop production notes (live demo, no AI B-roll, etc.)
5. Output `EP##_PROOFED.md` with sections:
   - Metadata block (title, runtime est, Field Notes links)
   - **PROOFED NARRATION** (full text, ready to teleprompter or memorize)
   - Shot list (carry forward from Cursor; fix only if proofing changes timing)
   - OST card list (text verbatim for designer)
   - Proof flags `[PROOF: …]` inline where author must confirm

**Pilot EP04:** proof first; other episodes follow same standard.

---

### Phase 2 — Speakability pass

1. Add `|` breath marks sparingly in proofed narration
2. Expand awkward written forms: `f = 111.2 Hz` → spoken "f equals one eleven point two hertz" in narration column; keep `f = 111.2 Hz` on OST cards
3. Flag Czech/Icelandic/Latin terms with phonetic hint in `SPEAKABILITY_NOTES.md`
4. Estimate spoken runtime per beat; total should land 8–12 min per episode
5. Missouri wine, Temple Lot, Billings sourcing — use careful language from essays; never sensationalize

---

### Phase 3 — Visual design

Per `IMAGE_DESIGN_BRIEF.md`:

1. **Channel banner** — typography on K-black; Cinzel + gold; heptagram watermark optional; **no AI cathedral photos**
2. **Thumbnails** — one hero object + ≤3 words; readable at phone size; see per-episode brief in `channel/THUMBNAILS.md`
3. **OST cards** — export every OST string from proofed scripts as 1920×1080 PNG (safe title safe zone)
4. **Lower third** — transparent PNG template for editor overlay
5. Document all image prompts in `IMAGE_GENERATION_PROMPTS.md`

**Author photo:** Profile uses `public/media/JasonCHolloway-v2.png` — **do not** AI-generate author face. Crop spec only in status file if needed.

**EP04 thumbnail:** Prefer **abstract Chladni nodal line diagram** (vector/graphics) over AI sand photo. Author will replace with on-set still after shoot if desired.

---

### Phase 4 — Quality gates (all must pass)

| Gate | Requirement |
|------|-------------|
| Scripts | 5 proofed files + proof log |
| Facts | Every episode has grade table in proof log |
| Register | No thumbnail-scream copy; no Dan Brown tone |
| Anti-slop | `IMAGE_GENERATION_PROMPTS.md` includes reject list; no synthetic presenter art |
| Thumbnails | 5 × 1280×720 PNG |
| Banner | 2560×1440 PNG, safe-zone compliant |
| OST | Complete set for all episodes |
| Status | `YOUTUBE_STATUS.md` with author sign-off queue |
| Site | Zero modifications to jasoncholloway.com |

---

## Return package

Zip name: **`masters-x-youtube-fable-RETURN.zip`**

```
masters-x-youtube-fable-RETURN.zip
├── youtube_fable_handoff/
│   ├── YOUTUBE_STATUS.md
│   ├── SCRIPT_PROOF_LOG.md
│   ├── SPEAKABILITY_NOTES.md
│   └── IMAGE_GENERATION_PROMPTS.md
└── output/
    ├── scripts/proofed/
    │   ├── EP01_FREQUENCY_IN_THE_STONE_PROOFED.md
    │   ├── EP02_PROPHETS_UNDERGROUND_CITY_PROOFED.md
    │   ├── EP03_THREE_FACTIONS_PROOFED.md
    │   ├── EP04_TABLE_TOP_MIRACLE_PROOFED.md
    │   └── EP05_FIVE_TRADITIONS_PROOFED.md
    └── design/
        ├── channel_banner_2560x1440.png
        ├── lower_third_template.png
        ├── lower_third_safe_spec.md
        ├── thumbnails/
        │   ├── EP01.png … EP05.png
        └── ost_cards/
            └── [all OST strings].png
```

---

## Author sign-off queue (flag in YOUTUBE_STATUS.md)

- [ ] Proofed narration — any `[PROOF: author]` lines
- [ ] Billings segment wording (EP02, EP05)
- [ ] Loyd/Lloyd not in YouTube scripts — N/A unless you find stray
- [ ] Thumbnail hero choices (author may swap EP04 after shoot)
- [ ] Chapter timestamps — adjust in metadata after final edit

---

## Out of scope

- Video editing, color grade, upload to YouTube
- Blog posts, Instagram carousels
- Encyclopedia print, audiobook scripts
- AI talking-head video, AI B-roll of locations
- Website deployment

---

## One-sentence brief

**Make five desk-documentary scripts airtight for Jason's voice, and give the channel a black-and-gold scholarly look that could sit beside Eco readers — not beside crypto-conspiracy slop.**
