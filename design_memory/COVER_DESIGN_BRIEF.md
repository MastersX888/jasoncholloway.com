# COVER_DESIGN_BRIEF.md — Masters X Omnibus Redesign

**Synthesized from:** `MANUSCRIPT_ANALYSIS.md` (deep read of the 684-page omnibus) and `BRAND_SOURCE.md` (jasoncholloway.com + local brand assets). Read those two artifacts before any future design work.

**Status of prior art:** The Pantheon/dome direction is DEAD — rejected twice (once by Jason as "Dan Brown," once by the market as a shitty cover). Do not revive it in any form.

---

## 1. The assignment

A complete redesign of the omnibus cover (*Masters X: The Complete Trilogy*, Jason Carroll Holloway, Seventh City Press). The cover must read as the **culmination of Books 1–3** (gold artifact on black: cymatics mandala → medieval instrument → astrolabe), not as a fourth volume, and must sit on the literary shelf — beside *Piranesi*, *The Name of the Rose*, *The Secret History* — not the airport-thriller shelf.

## 2. Hard constraints (from BRAND_SOURCE)

1. Black ground (print: K-100, not registration black; 240% ink cap, FOGRA39).
2. Gold / warm-amber primary accent (~CMYK 0/0.15/0.60/0.25); parchment-cream body text.
3. Cinzel wide-tracked display caps; EB Garamond Italic body. Fonts on disk in `fonts/`.
4. Seventh City Press heptagram at spine foot + back cover.
5. Locked copy: MASTERS X / THE COMPLETE TRILOGY / JASON CARROLL HOLLOWAY; epigraph "The pattern beneath everything."; approved 4-paragraph synopsis; Nadia front-flap teaser; ISBNs HC 9798295884412, PB 9798256072704.
6. Imagery must be authentic to the manuscript. Explicitly banned: Pantheon/dome, EQ-bar waveforms, monk-silhouette thriller montage, blue-teal techno gradients, occult/fractal-app sacred geometry, horror or romance coding.

## 3. The governing idea (from MANUSCRIPT_ANALYSIS)

> *A monk's compass-drawn figure that turns out to be a physicist's standing wave — gold and iron-gall ink on candlelit black — for a trilogy in which cathedrals are instruments, a family inheritance is a frequency, and the kingdom of God turns out to be the hum in your own chest.*

Tone: warm-dark, elegiac, numinous. A hymn, not a chase.

## 4. The four concept directions

**A. THE MASTER FIGURA (recommended lead).** One large compass-drawn seven-fold rosette / nota, circles within circles with hairline construction lines, that reads at distance as a cymatic resonance pattern and up close as an illuminated manuscript figure. Unifies Book 1's mandala, the site's rose-window motif, the heptagram imprint, and the seven-of-everything story math. Gold + iron-gall brown on black, faint ghosted Latin.

**B. THE TREMBLING LINE.** Ultra-minimal literary treatment: a single gold ruled line that breaks into a 111.2 Hz sine wobble and settles again — Blake's tremor-script made into the whole cover. Small `111.2 Hz` notation. Most ownable; boldest; risk: too quiet for retail thumbnails.

**C. CANDLELIGHT THROUGH VELLUM.** A glowing translucent vellum leaf, geometric figures showing through from behind like stained glass, edges falling to black. Honors the first/last line ("Restless candlelight guttered") and the 1267 frame. Warmest, most textural.

**D. THE CATHEDRAL WITHIN.** Engraved Gothic nave cross-section ghosted into a human chest/torso ("Your chest is the nave. Your skull is the dome."). The book's own whiteboard drawing made cover. Most conceptual; strongest hook for readers who finish the book.

## 5. DECISION (2026-07-07, Jason)

- **Concept A (Master Figura) = front cover** on both HC jacket and PB wrap. Confirmed by thumbnail A/B test (`concepts/AB_test_A_vs_D_thumbnails.png`): A survives at 100–160px retail size; D collapses to noise.
- **Concept D (Cathedral Within) = printed case under the jacket.** IngramSpark's "Jacketed Case Laminate" binding explicitly supports a custom-designed file printed on the book beneath the jacket (extra charge, limited trims). Jason must switch the HC title's binding to Jacketed Case Laminate in the IngramSpark portal and download the case template for ISBN 9798295884412; compose the case PDF to THAT template (do not guess case geometry). Press-res D art staged at `press_art/CASE_D_cathedral_within_3400.png`.
- Produced 2026-07-07: `redesign_A_package/COVER_OMNIBUS_HC_9798295884412_REDESIGN_A_v1.pdf` (24×12.5", spine 1.625") and `COVER_OMNIBUS_PB_9798256072704_REDESIGN_A_v1.pdf` (15×12", spine 1.6122") — ICCBased FOGRA39 CMYK, Ingram template marks preserved, live-set Cinzel/EB Garamond, EAN-13 barcodes. Front-type stack per concept A: MASTERS X dominant (Cinzel Bold, cream), THE COMPLETE TRILOGY gold subtitle with flanking rules, 111.2 Hz mark under the figura, author with rules at foot.
- The dome-era global K-correction was removed from `save_pdf` — it was calibrated for photographic art and would crush the figura's gold linework.
- **2026-07-07 (later):** Jason switched the HC title to Jacketed Case Laminate and provided the Ingram case template. Case composed: `redesign_A_package/CASE_OMNIBUS_HC_9798295884412_CONCEPT_D_v1.pdf` (18×12.5", spine folds 8.7946/10.4208, Concept D art on front board, spine text + heptagram, imprint back, barcode in template box, marks preserved, FOGRA39 CMYK). Composer: `scratch/compose_case_laminate_D.py`. Jacket template v3 measured identical to v2 — REDESIGN_A_v1 jacket unchanged and valid. All three Ingram templates snapshotted in `design_memory/templates/`.
- **2026-07-07 (v2):** HC front overlap fixed (figura in middle band, title cleared). Body 9→10.5 pt; bio Regular 10 pt. `*_REDESIGN_A_v2.pdf`. Case laminate unchanged.
- **Next:** Trilogy dual-cover redesign — `TRILOGY_COVER_BRIEF.md`. Start Book 1.

## 6. Production notes

- Front-panel art must be generated/upscaled to ≥ 2913 px tall (HC front face) BEFORE compositing; the 1024px dome source was a known failure point.
- Typography is set live in the compositor (Cinzel/EB Garamond on disk), never baked into generated art — generated concepts are comps only.
- Compositor: `scratch/compose_omnibus_covers_FINAL.py` (patched 2026-07-07 to preserve Ingram template marks; template geometry: PB spine 1.6122", HC spine 1.625", HC panel 6.5775×9.46").
- Workflow: concept comp → Jason approves → hi-res art → mockup review → PDF → Ingram preflight.
