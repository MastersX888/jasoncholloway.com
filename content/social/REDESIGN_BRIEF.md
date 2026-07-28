# Social Redesign Brief · Jason C. Holloway

**Panel:** Social content strategist (indie/book-aware) · Instagram visual designer (carousel/text-overlay) · Brand voice editor (INFJ / warm-humble) · Platform standards reviewer  
**Date:** 2026-07-26  
**Priority:** Instagram first (only account with followers), then align all platforms.

---

## 1. Diagnosis: why current output feels like a different product

### What was approved conceptually
The original Slot 1–7 carousel concepts in `SOCIAL_FROM_BLOG.md` and `INSTAGRAM_SLOT1_PREVIEW.md` were right: **message-led slides** that educate, name the research, name the fiction, and invite curiosity. Early Cursor assets (e.g. leather-stamp `f = 111.2 Hz` with quiet Seventh City Press mark) treated **typography as the image**.

### What shipped instead
1. **Imagen doctrine flipped the product.** `content/social/imagen-manifest.json` and `SOCIAL_POSTING_WORKFLOW.md` mandated photographic images with **no in-image text**, with copy only in captions.
2. **Overlay was bolted on late** (`scripts/overlay_carousel.py`, `ig-carousel-overlay-repost.py`) as a flat black bar + Arial/Calibri. That reads like a caption strip glued under a stock still—not an editorial composition.
3. **Result for the viewer:** beautiful but mute photos. The educate/inspire job moved off the image into a caption few people finish. On Instagram especially, the carousel must **teach while they swipe**.
4. **Tone risk:** silent cinematic product photography can feel like brand advertising; message-in-image field notes feel like sharing subject matter with people who care about the same things.

### What did *not* fail
- Essay-aligned captions and carousel *copy* in `SOCIAL_FROM_BLOG.md` (curious, caveated, fiction-named).
- Photographic atmosphere from Imagen (worth keeping as the **visual ground**).
- Anti-overmarket rules already in the social voice docs.

**Verdict:** Elevate the original text-overlay / carousel system. Do not invent a new “pretty photos only” product. Keep Imagen as atmosphere; restore typography as the primary communicative layer.

---

## 2. Elevated text-overlay / carousel system

### Mission per post
Pique interest · inspire · educate. Visibility for the trilogy is **accurate representation + findability**, never funnel language.

### Composition rules (Instagram 1:1 carousel)
| Zone | Rule |
|------|------|
| Image ground | Keep Imagen documentary photography; do not regenerate for text. |
| Safe type area | Lower ~38–42% soft gradient veil (not a hard rectangle). Upper image stays readable as atmosphere. |
| Hierarchy | 1) Micro-label (FIELD NOTE / essay theme) 2) Headline (EB Garamond Bold) 3) Body (EB Garamond Regular) 4) Slide index `01 / 06` |
| Accent | Single thin ochre/limestone hairline under the micro-label—never glow, never pill badges. |
| Color | Warm cream type `#F3EDE2` on deep veil; no pure neon white, no purple accents. |
| Fonts | Project `fonts/EBGaramond_*.ttf` + `fonts/Cinzel_*.ttf` for micro-labels. Never Arial/Inter/Roboto as the face of the brand. |
| Slide chrome | Editorial fraction, not Instagram-style dots (dots feel UI-native and cheap). |
| Trilogy | Appears on **hook** (lightly, if the idea is from the books) and **close** (fiction named + essay in bio)—not on every teach slide. |

### Slide roles (every educational carousel)
1. **Hook** — Iconic phrase or year. Large type. Minimal or no body. Curiosity without spoiling.
2. **Teach** (middle slides) — One fact + one clause of context. Research voice.
3. **Caveat / gap** — Honesty slide. Literature is thin; fiction is named. Earns indie-community trust.
4. **Bridge** — Fiction vs measured, or “full essay in bio.” Soft trilogy visibility; never “buy now.”

### When trilogy appears vs educational content
- **Default:** subject-matter education (archaeoacoustics, cymatics, KC ground, Ars Notoria, etc.).
- **Trilogy:** as the *reason the author cares*, and as the place invention lives—always labeled.
- **Never:** discount codes, urgency, “link in bio to buy,” thread-funnel CTAs, engagement bait.

### Quality bar (A+++)
- Readable at phone size without zooming.
- Type feels *composed with* the photo (veil + margins), not stamped after.
- Matches site field-note / manuscript dignity (EB Garamond + quiet Cinzel), not Canva template energy.
- One idea per slide; no emoji; no hashtag walls on-image.

---

## 3. Voice samples (INFJ · community-first · anti-overmarket)

### On-image (short)
- Hook: `f = 111.2 Hz` / `A footer stamp on a manuscript page`
- Teach: `Malta, 3600 BCE.` / `Hypogeum, 80 visitors a day, resonance documented near 110 Hz`
- Caveat: `The caveat.` / `One small-sample study is not a finding. The literature is real and thin.`
- Bridge: `The decimal is the fiction.` / `110 is theirs. 111.2 is mine. Full essay in bio.`

### Caption (warm, humble—keep existing Slot copy; this is the register)
> I keep coming back to the same quiet question: where does the research stop, and where does the story begin?
>
> Near 110 Hz shows up in stone chambers people have measured. My novels use 111.2. The extra decimal is not a claim about the stones. It is the fiction signing its own work.
>
> If this subject is already yours, the essay is linked in bio. If you are new to it, you are welcome here.

### Rejected register (do not use)
- “Hot take,” “you need to hear this,” “game-changer,” countdown urgency
- “Support an indie author” guilt framing as the lead
- Inflated authority (“as a researcher,” “experts agree” without sources)

---

## 4. Platform standards (after Instagram)

| Platform | Format | Message-in-image | Notes |
|----------|--------|------------------|--------|
| **Instagram** | 6–7 slide carousel | Required on every slide | Primary; educate on swipe |
| **Pinterest** | 3:4 pin | Required (title + one line) | Discovery depends on readable type |
| **X** | Single still or 1–2 images | Required on hero still | Caption can be short; image carries the thesis line |
| **Bluesky** | Text-first OK; optional still | Prefer overlaid still when attaching media | Same voice as X; no growth-hack tone |
| **Facebook (author)** | Single / carousel | Required when using graphics | Same overlays as IG where possible |
| **LinkedIn** | Pillar slots only (1, 3, 7) | Overlaid hero + thoughtful caption | Professional curiosity, not personal brand flex |
| **SCP Facebook** | Catalog/imprint | Separate file (`SOCIAL_SCP_FACEBOOK_CATALOG.md`) | Do not mash with author essay voice |

---

## 5. Asset pipeline + quality bar

```
Imagen photos (no baked text)
  → public/social/imagen/slot{N}/
Elevated overlay engine
  → public/social/imagen-overlaid/slot{N}/*.jpg   (Instagram carousels, 1080 JPEG)
  → public/social/platform-overlaid/*.jpg         (X / FB / Pinterest heroes)
Captions & slide copy source of truth
  → content/blog/SOCIAL_FROM_BLOG.md
```

**Commands**
- Rebuild IG overlays: `python scripts/overlay_carousel.py`
- Rebuild platform heroes: `python scripts/overlay_platform_heroes.py`
- Imagen regen only if a *photo* is wrong: `npm run social:graphics -- --slot N` (still no baked text; overlay remains the message layer)

**Do not** use Cursor GenerateImage for production social posts when Imagen + overlay pipeline is available.

---

## 6. Disk-space workflow

Machine context at redesign: **~2.9 GB free on C:**. Social media folders already ~420+ MB across repo + Desktop duplicate + Cursor assets.

Before any large regen:
1. Delete duplicate `Desktop\social-imagen\` if repo `public/social/imagen` is complete.
2. Delete prior `imagen-overlaid` outputs immediately before rewriting (same paths).
3. Prefer overlay-only rebuilds over re-running Imagen.
4. Keep one canonical set in-repo; Desktop copies are optional and disposable.
5. If free space &lt; 2 GB, stop generation and clean `out/` build artifacts / old scratch media first.

---

## 7. Implementation status (this redesign pass)

- [x] Panel brief (this document)
- [x] Doctrine update in `SOCIAL_POSTING_WORKFLOW.md`
- [x] Elevated IG overlay engine (`scripts/overlay_carousel.py`) — soft veil, EB Garamond + Cinzel, editorial `01 / 06`
- [x] Full Instagram rebuild: **43 slides** → `public/social/imagen-overlaid/slot{1-7}/*.jpg`
- [x] Platform hero overlays: **14 assets** → `public/social/platform-overlaid/*.jpg` (X/FB + Pinterest)
- [x] Disk cleanup: Desktop `social-imagen` + crude bar overlays archived to `E:\Masters_X_Trilogy_Archive\social_media_regen_2026-07-26\`; JPEG finals keep C: lean
- [x] User visual approval of Slot 1 sample before Outstand re-post
- [x] Re-post Instagram carousels (elevated overlays via Outstand; TLS adapter fix)
- [x] FB Author + FB SCP + Pinterest re-posted with `platform-overlaid` heroes
- [ ] X re-post blocked: Outstand X token Unauthorized + native TWITTER_* tokens expired — reconnect required
- [x] Captions kept (no hard-sell changes)
