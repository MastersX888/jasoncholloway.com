## Instagram carousel visuals

**Post composed overlays only:** `public/social/imagen-overlaid/slot{N}/ig-slot{N}-slideXX.jpg`  
**X / FB / Pinterest:** `public/social/platform-overlaid/*.jpg`  
**Never post** raw `public/social/imagen/` plates (no message on image).

Rebuild: `python scripts/overlay_carousel.py` · `python scripts/overlay_platform_heroes.py`  
Brief: `content/social/REDESIGN_BRIEF.md`

---

# Social Posts Ready to Post


**Two-week cadence per slot:** X and Bluesky on publish day, Instagram carousel 2 days later.

---

## 🔴 SLOT 1 INSTAGRAM (OVERDUE - Post ASAP)

**Essay:** The Frequency That Was Already There  
**URL:** https://jasoncholloway.com/blog/the-frequency-that-was-already-there/  
**Field Note:** https://jasoncholloway.com/field-notes/111-hz/

### Instagram Caption

```
110 Hz is measured. 111.2 Hz is mine.

The Ħal-Saflieni Hypogeum is an underground temple complex in Malta, carved from limestone somewhere between 3600 and 2500 BCE. Eighty visitors a day are allowed inside. In the Oracle Chamber, researchers have documented a pronounced resonance around 110 to 111 Hz.

Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band at Neolithic chambers across Britain and Ireland. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.

That is the documented part, caveats included. The neurological study everyone cites had a small sample, and one study is one study.

The trilogy runs on 111.2 Hz instead. The extra decimal is the fiction signing its own work: close enough to honor the research, far enough that nobody mistakes my invention for their measurement.

Full essay linked in bio. Research layer at jasoncholloway.com/field-notes/111-hz/
```

### Carousel (6 slides)

**Slide 1:** `f = 111.2 Hz`, a footer stamp on a manuscript page  
**Slide 2:** **Malta, 3600 BCE.** Hypogeum, 80 visitors a day, resonance documented near 110 Hz  
**Slide 3:** **Britain and Ireland.** Neolithic chambers, peaks in the 95 to 120 Hz band  
**Slide 4:** **Lascaux.** Paintings cluster where the resonance is strongest  
**Slide 5:** **The caveat.** One small-sample study is not a finding. The literature is real and thin.  
**Slide 6:** **The decimal is the fiction.** 110 is theirs. 111.2 is mine. Full essay in bio.

**Action:** Create carousel manually in Meta Business Suite or Canva → Post to @jasonhollowaykc

---

## 🟢 SLOT 2: SOUND INTO FORM (Ready to Start)

**Essay:** Sound Into Form: What Hans Jenny Actually Proved  
**URL:** https://jasoncholloway.com/blog/sound-into-form-hans-jenny/  
**Field Notes:** https://jasoncholloway.com/field-notes/cymatics/

### X - Post A

```
The oldest special effect in my trilogy needs no computer.

A metal plate. A violin bow. A spoonful of sand.

Draw the bow and the sand jumps into a geometric figure. Chladni demonstrated it in 1787. You can do it on your kitchen table tonight.

jasoncholloway.com/blog/sound-into-form-hans-jenny/
```

### X - Post B (Thread, 3 tweets)

```
1/ Hans Jenny found that shifting a tone from 800 to 865 cycles per second does not adjust the pattern in the medium. It transforms it into a categorically different figure.

2/ That is why the trilogy's 111.2 Hz cannot be swapped for 111 or 112. In a world where sound makes form, decimals are not decoration.

3/ What Jenny did not prove: anything about healing frequencies, water memory, or consciousness. Sound organizes matter. That the resulting geometry reorganizes the observer is my invention, and the novels say so.
```

**Action:** Copy Post A → Paste into X → Post. (Thread is optional; use if engagement is strong.)

---

### Bluesky

```
Ernst Chladni, 1787: bow a sand-covered metal plate and the sand collects on the nodal lines, the places where the plate is still. The figure you see is a map of the silence.

Hans Jenny turned that parlor demonstration into a research program in the 1960s, swapping crystal oscillators for violin bows and publishing *Kymatik*. Two findings carried into my trilogy: patterns are exquisitely sensitive to frequency, and they collapse the moment the tone stops. Order is maintained, not built.

Where the record ends: there is no evidence that *viewing* a cymatics pattern does anything to consciousness. That claim is entirely the novels'.

jasoncholloway.com/blog/sound-into-form-hans-jenny/
```

**Action:** Copy → Paste into Bluesky → Post

---

### Instagram (Post 2 days after X/Bluesky)

**Caption:**

```
Sound has shapes. That part is not mystical. It is 1787.

Ernst Chladni drew a violin bow along a sand-covered metal plate and showed that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it.

Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern rather than nudging it, and how patterns collapse when the tone stops and return identically when it resumes.

That is the real floor under everything strange in my trilogy. Here is the ceiling: nothing in the research says that looking at one of these patterns changes the person looking. The novels claim it does. That claim is mine, and I would rather say so than let it pass as physics.

Essay linked in bio. Research at jasoncholloway.com/field-notes/cymatics/
```

**Carousel (6 slides):**

**Slide 1:** **1787.** A plate, a bow, a spoonful of sand  
**Slide 2:** **Nodal lines.** The figure is a map of where the plate is still  
**Slide 3:** **Jenny, 1967.** Oscillators replace bows; *Kymatik* published  
**Slide 4:** **800 to 865 cps.** The pattern does not adjust. It transforms.  
**Slide 5:** **Turn the tone off.** The pattern collapses. Order is maintained, not built.  
**Slide 6:** **Where the record ends.** Sound makes form: measured. Form remakes the observer: invented.

---

## Posting Workflow

1. **Slot 1 Instagram** → Post immediately (overdue)
2. **Slot 2 X + Bluesky** → Post on same day (target: within next 2 weeks per cadence)
3. **Slot 2 Instagram** → Post 2 days after X/Bluesky

### Mark as Posted

After posting, update status:

```powershell
# Slot 1 Instagram
node scripts/post-to-social.mjs mark 1 instagram

# Slot 2 X
node scripts/post-to-social.mjs mark 2 x

# Slot 2 Bluesky
node scripts/post-to-social.mjs mark 2 bluesky

# Slot 2 Instagram (when ready)
node scripts/post-to-social.mjs mark 2 instagram
```

---

## Notes

- No LinkedIn (excluded per author request)
- No X API (manual copy/paste only)
- Instagram carousel: Create visuals manually (Canva, Figma, or Meta Business Suite)
- Bluesky: Manual posting via app or web (BLUESKY_HANDLE + BLUESKY_APP_PASSWORD in groundswell-monitor/.env if using API later)
