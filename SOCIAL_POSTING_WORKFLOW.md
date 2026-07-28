# Social Posting Workflow - Ready to Execute

**Current Status:** Slot 1 complete (3/3 platforms). Slot 2 ready to post.

---

## Social graphics (message-in-image system)

**Doctrine (2026-07-26 redesign):** Social posts must **not** be plain photos. The message is part of the image (carousel overlays / platform heroes). Imagen supplies photographic atmosphere only; typography is applied by the overlay pipeline. See `content/social/REDESIGN_BRIEF.md`.

**Do not use Cursor GenerateImage for production social posts** when the Imagen + overlay pipeline is available.

### A) Photographic grounds (Google Imagen / Gemini Image)

1. Add your key to `.env` at repo root: `GOOGLE_API_KEY=...` (see `.env.example`; `GEMINI_API_KEY` also works)
2. Preview prompts: `npm run social:graphics:dry`
3. Regenerate grounds only if a *photo* is wrong: `node scripts/generate-social-imagen.mjs --slot N`
4. Full manifest: `node scripts/generate-social-imagen.mjs --all`

**Output (grounds, no baked text):** `public/social/imagen/slot{N}/`  
**Manifest:** `content/social/imagen-manifest.json`  
**Optional Desktop mirror:** disposable; prefer the repo copy if disk is tight.

### B) Elevated text overlays (required before posting)

```powershell
python scripts/overlay_carousel.py          # all IG carousels → public/social/imagen-overlaid/*.jpg
python scripts/overlay_carousel.py 1 2      # specific slots
python scripts/overlay_platform_heroes.py   # X / FB / Pinterest → public/social/platform-overlaid/*.jpg
```

**Post from `imagen-overlaid/` and `platform-overlaid/`, never from raw `imagen/`.**

**Typography:** EB Garamond + Cinzel (`fonts/`), soft gradient veil, cream type, ochre hairline, editorial `01 / 06` index. JPEG @ 1080 for disk headroom.

**Design brief:** `content/social/REDESIGN_BRIEF.md`

---

## ⚠️ IMPORTANT: How the Script Works

When you run `node scripts/post-to-social.mjs post <slot> <platform>`, it will:
1. Display the content to copy
2. **IMMEDIATELY mark it as posted** in `.social-post-status.json`

**Therefore:** Only run the command when you're ready to copy and post right away.

---

## 🟢 SLOT 2: Sound Into Form (Hans Jenny Cymatics)

**Essay URL:** https://jasoncholloway.com/blog/sound-into-form-hans-jenny/  
**Field Note:** https://jasoncholloway.com/field-notes/cymatics/

### Step 1: Post to X (do this first)

Run when ready:
```powershell
node scripts/post-to-social.mjs post 2 x
```

This will display **Post A** (standalone) and **Post B** (3-tweet thread). 

**Recommended:** Start with Post A only. Post the thread (Post B) if engagement is strong.

**Post A to copy:**
```
The oldest special effect in my trilogy needs no computer.

A metal plate. A violin bow. A spoonful of sand.

Draw the bow and the sand jumps into a geometric figure. Chladni demonstrated it in 1787. You can do it on your kitchen table tonight.

jasoncholloway.com/blog/sound-into-form-hans-jenny/
```

**Action:** Copy → Paste at https://x.com/jasonhollowaykc → Post

---

### Step 2: Post to Bluesky (same day as X)

Run when ready:
```powershell
node scripts/post-to-social.mjs post 2 bluesky
```

**Content to copy:**
```
Ernst Chladni, 1787: bow a sand-covered metal plate and the sand collects on the nodal lines, the places where the plate is still. The figure you see is a map of the silence.

Hans Jenny turned that parlor demonstration into a research program in the 1960s, swapping crystal oscillators for violin bows and publishing *Kymatik*. Two findings carried into my trilogy: patterns are exquisitely sensitive to frequency, and they collapse the moment the tone stops. Order is maintained, not built.

Where the record ends: there is no evidence that *viewing* a cymatics pattern does anything to consciousness. That claim is entirely the novels'.

jasoncholloway.com/blog/sound-into-form-hans-jenny/
```

**Action:** Copy → Paste at https://bsky.app → Post

---

### Step 3: Post to Instagram (2 days after X/Bluesky)

Run when ready (2 days after posting to X/Bluesky):
```powershell
node scripts/post-to-social.mjs post 2 instagram
```

**Caption to copy:**
```
Sound has shapes. That part is not mystical. It is 1787.

Ernst Chladni drew a violin bow along a sand-covered metal plate and showed that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it.

Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern rather than nudging it, and how patterns collapse when the tone stops and return identically when it resumes.

That is the real floor under everything strange in my trilogy. Here is the ceiling: nothing in the research says that looking at one of these patterns changes the person looking. The novels claim it does. That claim is mine, and I would rather say so than let it pass as physics.

Essay linked in bio. Research at jasoncholloway.com/field-notes/cymatics/
```

**Carousel (6 slides) - Text overlays for visuals:**
1. **1787.** A plate, a bow, a spoonful of sand
2. **Nodal lines.** The figure is a map of where the plate is still
3. **Jenny, 1967.** Oscillators replace bows; *Kymatik* published
4. **800 to 865 cps.** The pattern does not adjust. It transforms.
5. **Turn the tone off.** The pattern collapses. Order is maintained, not built.
6. **Where the record ends.** Sound makes form: measured. Form remakes the observer: invented.

**Action:** Create carousel in Canva/Figma → Post via Instagram app or Meta Business Suite

---

## Check Status Anytime

```powershell
node scripts/post-to-social.mjs status
```

---

## GSC Tasks (In Parallel)

You'll need to manually complete the GSC tasks since authentication is required:

1. **Submit sitemap** at https://search.google.com/search-console
   - Property: `sc-domain:jasoncholloway.com`
   - Sitemap: `sitemap.xml`
   
2. **Request indexing** for the 7 blog URLs using URL Inspection Tool (optional, speeds up discovery)
   - See full instructions in `GSC_MANUAL_STEPS.md`

---

## Two-Week Cadence Reminder

Per `SOCIAL_FROM_BLOG.md`:
- Slot 1 posted: 2026-07-25
- **Slot 2 target window:** ~2026-08-08 (two weeks after Slot 1)
- Slot 3 target: ~2026-08-22
- Slot 4 target: ~2026-09-05
- And so on...

X and Bluesky post on same day. Instagram follows 2 days later.

---

## Notes

- LinkedIn excluded per author request
- No X API key (manual copy/paste only)
- Pinterest Trial API (manual pin upload for now)
- No em-dashes in copy
- Never imply 111.2 Hz or Distribution File stats are real
