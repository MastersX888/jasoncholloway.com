# FABLE — Content Production Pass · Masters X Marketing Block

**Date:** July 23, 2026  
**Publisher:** Seventh City Press LLC  
**Author of record:** Jason Carroll Holloway  
**Package:** `masters-x-content-production-fable-handoff.zip`

---

## Executive summary

The creative research is done. The **Field Notes** (12 live articles on jasoncholloway.com) are the canonical web layer. This pass turns existing **drafts and outlines** into **publish-ready content** across four channels:

| Channel | Input state | Your deliverable |
|---------|-------------|------------------|
| **YouTube** | 5 episode scripts + shoot package + channel setup docs | Final narration scripts, shot lists, metadata blocks, thumbnail briefs, channel copy (ready to shoot + upload) |
| **Social** | 15 platform-agnostic drafts | 15 finished posts: X, Instagram, Bluesky — with character counts, hashtags, and link targets |
| **Blog / newsletter** | 8 outlines | 8 full posts (~1,200–1,800 words each), newsletter subject lines, excerpt blurbs |
| **Field Notes crosswalk** | 12 live articles (source TSX in package) | Content matrix linking every asset; optional 5 **Field Notes companion videos** (short scripts) for Voynich, Strahov, Codex Gigas, Foucault, 111 Hz |

**Do not invent ISBNs, biographical claims, or URLs.** When unsure, flag `[AUTHOR VERIFY]`. Fiction is always labeled as fiction.

**Do not modify jasoncholloway.com source code** unless Jason explicitly asks in a follow-up. Deliver markdown files only.

---

## Your role

You are **content producer** for Seventh City Press — the same discipline as the July 2026 audiobook pass: take sourced material, apply the voice rules, and return a zip Jason can shoot, paste, and publish.

**Voice:** Literary-documentary. Measured, first-person where appropriate, no hype adjectives, no Dan Brown energy, no occult-influencer register. The **two-register ethic** governs everything: state what was measured, what was documented, what the novel invented — and label the seam.

**Standing close (every channel):**

> The facts are in the files. The fiction is in the books.

YouTube may add: *The encyclopedia holds the seam.*

---

## Read first (in order)

1. `FABLE_CONTENT_PRODUCTION_PROMPT.md` — this file
2. `HANDOFF_STATUS.md` — inventory + quality gates
3. `package/reference/CANON.md` — locked facts (page counts, names, dates)
4. `package/reference/universe_memory/04_STORY_CANON_DIGEST.md` — canon + open flags
5. `package/field_notes_source/fieldNotes.ts` — 12 Field Notes index
6. `package/marketing/youtube/CHANNEL_ROADMAP.md` — publish order and phases
7. `package/marketing/youtube/shoot_package/SERIES_BIBLE.md` — visual/audio rules (non-negotiable)

---

## Deliverable A — YouTube (5 episodes + channel)

### Source files

| File | Role |
|------|------|
| `package/marketing/youtube/YOUTUBE_SCRIPTS.md` | Master script archive (5 episodes) |
| `package/marketing/youtube/shoot_package/EP01–EP05_*.md` | Per-episode shoot scripts + props |
| `package/marketing/youtube/shoot_package/SERIES_BIBLE.md` | Series look, anti-slop rules |
| `package/marketing/youtube/shoot_package/GEAR_CHECKLIST.md` | Chladni kit, camera, audio |
| `package/marketing/youtube/channel/SETUP_CHECKLIST.md` | Channel creation steps |
| `package/marketing/youtube/channel/BRANDING.md` | About, banner, footer |
| `package/marketing/youtube/channel/EPISODE_METADATA.md` | Titles, descriptions, tags, chapters |
| `package/marketing/youtube/channel/THUMBNAILS.md` | Thumbnail specs |
| `package/marketing/youtube/channel/UPLOAD_WORKFLOW.md` | Upload checklist |

### What to produce

Return folder: `output/youtube/`

1. **`FINAL_SCRIPTS/`** — EP01–EP05 narration scripts, verbatim-ready, with `[VISUAL]` and `[OST]` cues preserved. Tighten where needed; do not change factual grades.
2. **`CHANNEL_READY/`** — finalized SETUP_CHECKLIST (all copy paste-ready), banner text layout spec, About tab, default upload footer with placeholder for playlist URL.
3. **`METADATA/`** — one file per episode: title (primary + 2 alts), description (episode block + footer), tags, chapters, pinned comment, end-screen targets. Already 80% done in `EPISODE_METADATA.md` — polish and align with final scripts.
4. **`THUMBNAILS/`** — one brief per episode: subject object, 3-word Cinzel headline, black + gold, safe-zone notes (see `THUMBNAILS.md`).
5. **`FIELD_NOTES_VIDEO_SCRIPTS/`** (stretch) — 5 short scripts (6–8 min each) aligned with live Field Notes:
   - Voynich Manuscript (`voynich-manuscript`)
   - Strahov Monastery (`strahov-monastery`)
   - Codex Gigas (`codex-gigas`)
   - Foucault / Eco pattern-hunting (draw from EP03 + literary comp social post #5)
   - 111 Hz (`111-hz`) — distinct from EP01 if possible; EP01 is ladder-focused, this is chamber archaeology

**Publish order (locked):** EP04 (pilot) → EP01 → EP05 → EP03 → EP02

**Anti-slop (non-negotiable):** No AI presenter. No AI B-roll. Jason's voice, Jason's desk, physical documents. See SERIES_BIBLE.

---

## Deliverable B — Social (15 posts)

### Source

`package/marketing/social/SOCIAL_POSTS.md` — 15 drafts with internal `(int: …)` research pointers.

### What to produce

Return folder: `output/social/`

File: **`SOCIAL_POSTS_FINAL.md`** with this structure for each post:

```
## Post N — [theme] · [primary platform]

**X (280 chars):** …
**Bluesky (300 chars):** …
**Instagram caption:** … (with line breaks)
**Instagram carousel slides:** (if applicable) Slide 1 … / Slide 2 …
**Link target:** https://jasoncholloway.com/field-notes/[slug]/ or /books/masters-x/
**Hashtags:** (3–5 max, no spam)
**Best day/time note:** (optional)
```

**Rules:**
- Every factual claim must trace to a Field Note or CANON fact
- Fiction always labeled ("In the novel…" / "The trilogy's invention…")
- Post 15 (encyclopedia announce) → point to jasoncholloway.com + Field Notes hub until encyclopedia prints
- Match live social handles: `@jasonhollowaykc` (IG/X), Facebook Author Page, Pinterest `seventhcitypress`

**Bonus:** `SOCIAL_CALENDAR.md` — suggested 4-week posting schedule (Mon/Wed/Fri), mapping posts to blog publish dates and YouTube drops.

---

## Deliverable C — Blog / newsletter (8 posts)

### Source

`package/marketing/blog_newsletter/BLOG_NEWSLETTER_OUTLINES.md` — 8 outlines in series *The Facts Behind the Fiction*.

### What to produce

Return folder: `output/blog/`

| File | Outline # | Target length | Primary Field Notes links |
|------|-----------|---------------|---------------------------|
| `01_frequency_that_was_already_there.md` | 1 | ~1,500 w | 111-hz, cymatics |
| `02_grimoire_study_aid.md` | 2 | ~1,400 w | ars-notoria |
| `03_sound_into_form.md` | 3 | ~1,600 w | cymatics, strahov-monastery |
| `04_why_kansas_city.md` | 4 | ~1,700 w | kansas-city-locations, subtropolis |
| `05_man_under_zion.md` | 5 | ~1,500 w | kansas-city-locations, subtropolis |
| `06_three_factions.md` | 6 | ~1,400 w | (books/omnibus; no dedicated FN) |
| `07_stone_remembers.md` | 7 | ~1,300 w | kansas-city-locations |
| `08_cannot_be_unreleased.md` | 8 | ~1,500 w | (Distribution File; books) |

Also deliver:

- **`NEWSLETTER_SUBJECTS.md`** — 8 subject lines + 1-line preview text each
- **`BLOG_SEO_METADATA.md`** — meta title, meta description, slug for each post
- **`INTERNAL_LINKS.md`** — cross-links between posts, Field Notes, and book pages

**Structure per post:**
1. Open on one concrete trilogy detail
2. Walk into real research (cite Field Notes URLs inline)
3. Name the seam — measured / documented / invented
4. Close with quiet CTA: books + Field Notes hub

**Do not** reuse Field Note prose verbatim — expand, narrate, and link back. Field Notes are the encyclopedic layer; blog posts are the essay layer.

---

## Deliverable D — Content crosswalk

Return file: `output/CONTENT_CROSSWALK.md`

Matrix columns: **YouTube EP** | **Blog post** | **Social posts** | **Field Notes** | **Book page**

Every row must have live URLs. Flag gaps where no Field Note exists (e.g., CIA factions post → omnibus only).

---

## Field Notes reference (live site — do not contradict)

| Slug | URL | Theme |
|------|-----|-------|
| subtropolis | `/field-notes/subtropolis/` | Beneath KC |
| kansas-city-locations | `/field-notes/kansas-city-locations/` | Beneath KC |
| meramec-caverns | `/field-notes/meramec-caverns/` | Beneath KC |
| oscar-01 | `/field-notes/oscar-01/` | Beneath KC |
| 111-hz | `/field-notes/111-hz/` | The Frequency |
| cymatics | `/field-notes/cymatics/` | The Frequency |
| u2-test-pilots | `/field-notes/u2-test-pilots/` | The Frequency |
| voynich-manuscript | `/field-notes/voynich-manuscript/` | The Manuscripts |
| ars-notoria | `/field-notes/ars-notoria/` | The Manuscripts |
| codex-gigas | `/field-notes/codex-gigas/` | The Manuscripts |
| gospel-of-thomas | `/field-notes/gospel-of-thomas/` | The Manuscripts |
| strahov-monastery | `/field-notes/strahov-monastery/` | The Sites |

Full source TSX: `package/field_notes_source/*.tsx`  
Layout pattern: **THE RECORD** → **THE PATTERN** → **THE FICTION** + FAQ schema.

---

## Quality gates (all must pass)

- [ ] Zero invented ISBNs, dates, or biographical claims not in CANON.md
- [ ] Every frequency claim graded: measured / contested / invented
- [ ] Fiction labeled in every channel
- [ ] All links use `https://jasoncholloway.com/...` (trailing slash on Field Notes)
- [ ] No AI-slop register (no "journey," "delve," "unlock the secrets")
- [ ] YouTube deliverables respect SERIES_BIBLE anti-slop rules
- [ ] Blog posts are original prose — not copy-paste from Field Notes
- [ ] `CONTENT_CROSSWALK.md` complete
- [ ] `RETURN_MANIFEST.md` lists every file with one-line description

---

## Return format

Zip your `output/` folder as:

**`masters-x-content-production-fable-RETURN.zip`**

Include `RETURN_MANIFEST.md` at root.

Jason integrates into repo at `content_fable_handoff/return/` — same pattern as audiobook Fable return.

---

## Out of scope (explicit)

- Website code changes
- Encyclopedia print / BookVault
- Audiobook ElevenLabs generation
- Pinterest pin creation (separate agent)
- Shooting or editing video (Jason shoots from your scripts)

---

## Mode

**EXECUTION.** Do not ask more than 3 clarifying questions. If blocked, proceed with labeled assumptions in `RETURN_MANIFEST.md`.

**Priority order if time-constrained:**

1. YouTube FINAL_SCRIPTS + METADATA (unblocks channel launch)
2. Blog posts 1, 3, 4 (highest SEO overlap with Field Notes)
3. Social posts 1–14 (skip encyclopedia announce if needed)
4. Field Notes video scripts (stretch)
5. Remaining blog posts
