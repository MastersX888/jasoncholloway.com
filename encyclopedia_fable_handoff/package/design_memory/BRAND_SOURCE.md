# BRAND_SOURCE.md — Masters X / Jason Carroll Holloway Brand Research

**Prepared for:** Cover redesign team — *Masters X: The Complete Trilogy* (omnibus)
**Date:** July 7, 2026
**Sources:** www.jasoncholloway.com (homepage, /about, /books/masters-x/), public/llms.txt (the site's own AI-summary file), Everand series listing, and local workspace assets at `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway`

---

## 1. What the website says — positioning, bio, marketing language

### Author positioning
- **Byline:** Jason Carroll Holloway (primary/formal); "Jason C. Holloway" is an accepted alternate. The site's llms.txt explicitly instructs: use "Jason Carroll Holloway" for attribution.
- Positioned as a **writer-researcher**, not a genre novelist: "a writer and researcher whose work explores the intersection of acoustic science, medieval scholarship, and human consciousness. He lives in Kansas City."
- Credentials foregrounded: M.A. English Literature (Mercy University, Dobbs Ferry, NY); B.A. Psychology/Sociology (Columbia College, MO); certificates in Creative Writing and Data Analytics.
- Second title in catalog: a John Hawkes critical monograph (*Innocence, Desire, and the Architecture of the Fall*) — reinforces the literary-scholar identity.
- **Imprint:** Seventh City Press (Kansas City, MO; www.seventhcitypress.com), founded "as the publishing home for work that operates at the intersection of imaginative and intellectual ambition: novels that think, and criticism that speaks." Jason C. Holloway is listed as Publisher.

### Homepage headline / tagline language
- Site title tag: "Masters X Trilogy — A Kansas City Conspiracy of Frequency & Medieval Manuscripts."
- Hero copy: *"What the medieval masters encoded in cathedral geometry, grimoire tradition, and acoustic stonework wasn't mysticism. The Masters X Trilogy is the account of proving it."*
- Established back-cover epigraph: **"The pattern beneath everything."**
- Recurring stat-style branding on the homepage: **June 2026** launch window · **111.2 Hz** "The Carrier Frequency" · **181** chamber folios mapped · **Seventh** City Press imprint. The number 7 and the frequency 111.2 Hz function as brand motifs.

### How the books are described / marketed
- Trilogy: *The Inheritance of Frequency* (Vol I, 322 pp) · *The Grimoire* (Vol II, 256 pp) · *The Kingdom* (Vol III, 362 pp). Omnibus: 736 pp. BISAC FIC019000 Literary Fiction; site also uses "Fiction · Speculative Mystery" and "Kansas City Conspiracy Thriller."
- One-line pitch used everywhere: Blake Masters inherits a safe-deposit box his grandfather paid for **57 years in advance**; inside are **seven notebooks**, 30 years of classified aerospace/acoustic research, and a cross-reference to a sealed crypt beneath Prague.
- The marketing leans hard on **"the research is real"**: a Field Notes archive (SubTropolis, 111 Hz, Voynich Manuscript, Ars Notoria, Strahov Monastery, Codex Gigas, U-2 pilots, cymatics, Gospel of Thomas), plus an interactive "Masters Analysis Chamber" / Folio Pattern Visualizer (181 manuscript leaves, harmonic stacks, cave maps, Schumann monitor). Tagline: "Grounded in Real Places… The Chamber isn't an illustration of the novels — it's the research archive that preceded them."
- Character-voiced pull-quotes rotate on the homepage:
  - "Those aren't diagrams, they're technical specifications." — Andrew Chen, Book I
  - "The preparation is not about the frequency. The preparation is about the organism that will receive it." — Nadia Volkov, Book II
  - "The gate is not arbitrary. The gate is the body. The body requires time. This is not theology. This is physics. This is love." — Blake Masters, Book III
- Distribution: IngramSpark · Amazon · IndieBound; hardcover, paperback, ebook; "Buy Direct (Best Price)" via publisher with QR codes.
- Everand/Scribd listings live (series ID 1039587482) with the same bio and Kingdom synopsis ("Blake Masters returns to Kansas City with a restructured nervous system…").

---

## 2. Visual identity on the website

- **Dark, archival, scriptorium aesthetic.** The site presents itself as a research instrument ("Access the Scriptorium Archives," "Analysis Chamber," layer status monitors reading [ONLINE]) — dark ground with technical/monastic overtones, part cathedral, part mission control.
- Background imagery in the site's public assets: **cathedral rose window** renders (`public/bg-rose-window.png`, `public/bg-cathedral-rose-window.png`) — radial sacred-geometry imagery consistent with the cymatics/mandala motif on the book covers.
- The newsletter and Chamber features are framed in the same warm-gold-on-dark language as the covers; the number-heavy "stat blocks" (111.2 Hz, 181 folios) are a signature layout device.
- Author photo assets: `public/media/JasonCHolloway-v2.png` (and `JasonCHolloway.png` referenced by the cover handoff for the back flap). Never substitute a stock or AI face.
- OG/social image: `public/og-image.png`.

---

## 3. Established brand elements found locally (authoritative)

From `handoff_package/handoff_package/MASTERS_X_OMNIBUS_COVER_HANDOFF.md`, `omnibus_cover_text.txt`, `scratch/AGENT_PROMPT_omnibus_cover_final.md`, and `public/covers/`:

### Core design system (non-negotiable per the existing handoff)
- **Black ground** (print: K-only 100%, never registration black; max 240% total ink, FOGRA39 coated ICC).
- **Gold / warm amber** primary accent — "warm, precious, ancient." Print gold ≈ CMYK (0, 0.15, 0.60, 0.25). Cream off-white for body text, not pure white.
- **Cinzel** (Trajan-class inscriptional caps) for all display type, wide-tracked ("letters breathe"): title white, subtitle gold, author white.
- **EB Garamond Italic** for all body/flap/bio text.
- **Heptagram imprint mark** for Seventh City Press — placed at the spine foot and beside "Seventh City Press" bottom-left of the back cover (per the final agent prompt checklist). The seven-pointed star echoes "Seventh City" and the seven notebooks / seven copies / seven cities motif.
- Fonts on disk: `fonts/Cinzel_0.ttf`, `Cinzel_2.ttf`, `EBGaramond_00/01/02.ttf`.

### Existing trilogy covers (the visual lineage the omnibus must culminate)
- **Book 1:** black ground, glowing **gold cymatics mandala** (interference pattern), wide-tracked Cinzel caps, ghosted medieval Latin manuscript watermark. This is the anchor of the identity.
- **Book 2:** medieval astronomical instrument, same black/gold/Cinzel system.
- **Book 3:** silver-grey medieval astrolabe, same type system.
- Files: `public/covers/book1|2|3-hardcover*.png`, `-paperback.png`, `.jpg` variants; handoff package includes `DUSTJACKET_BOOK1/2/3_full` spreads and front-panel close-ups as typography references.

### Approved omnibus copy (verbatim, from handoff + omnibus_cover_text.txt)
- Front: **MASTERS X / THE COMPLETE TRILOGY / JASON CARROLL HOLLOWAY**.
- Back epigraph: *"The pattern beneath everything."* Header: THE MASTERS X TRILOGY. Four-paragraph synopsis (1267 Premonstratensian monk / seven copies across seven cities → Blake fired from the Kansas City vault, 57-year safe-deposit box, seven notebooks → the gift that "killed his father, unmade his grandfather" → "Spanning Bohemia in 1267, the edge of the atmosphere in 1961, and a Kansas City winter…").
- Front flap: the approved Nadia Volkov "Thai food, bandages, and a diagnosis" teaser — do not alter.
- Back flap: standard author bio + **SEVENTH CITY PRESS / www.jasoncholloway.com**.
- A later iteration (`AGENT_PROMPT_omnibus_cover_final.md`) also used closing quote *"Only love lets you survive it."* and epigraph *"In the beginning was the Word. / But before the Word, there was the listening."* — flag both variants for the art director; the handoff doc's copy is marked APPROVED/verbatim.
- Omnibus ISBNs: HC **9798295884412** · PB **9798256072704**. Full ISBN/ASIN matrix in `public/llms.txt`.

### Manuscript-grounded imagery bank (from the handoff — covers must draw from these, not invent)
Hyperboloid resonance chamber ("a cave above ground," golden oculus, 111.23 Hz) · eight engraved silver cymatics discs (4.1 cm) · SubTropolis limestone under Kansas City · Strahov Library / Prague crypt · Sagrada Família hyperboloids · U-2 cockpit at 70,000 ft · seven notebooks · the black-iron-bound codex. Comp shelf: Tartt, Doerr, Eco, Kostova, Stephenson, Follett. Explicitly NOT: Dan Brown, occult/New Age, fantasy, YA.

---

## 4. Cover imagery currently in public use

- `public/covers/` carries the live web covers: books 1–3 in hardcover/paperback/ebook crops, the Hawkes monograph, and multiple omnibus generations (`omnibus-hardcover-correct.png`, `omnibus-cover-v4.jpg`, `omnibus-hc-epub-v2.jpg`, `omnibus-pb-final.png`, plus a `wraps_backup/` folder). The books page displays paperback/hardcover renders per volume.
- Print-side artifacts at repo root: `MASTERS_X_OMNIBUS_HC_JACKET_FINAL_v9.pdf`, `MASTERS_X_OMNIBUS_PB_FINAL.pdf`, `MASTERS_X_EPUB_COVER.jpg`, `HC_preview.png`, `PB_preview.png`, plus `old_draft_book1.png` / `old_draft_book2.png`.
- Two prior omnibus art directions exist and their status matters:
  1. **Pantheon/Roman dome interior** — explicitly REJECTED ("reads as Dan Brown," not in the book, broke black/gold continuity). Do not revive. (Note: a later "dome + candle" compositor pipeline exists in `AGENT_PROMPT_omnibus_cover_final.md` / v9 PDF; confirm with Jason which lineage the current public omnibus files use before treating any of them as approved.)
  2. **Resonance chamber tunnel** (Midjourney, warm amber spiral toward golden oculus) — the direction called "correct" in the handoff; v7 execution was flawed (background not true black, soft image).
- The handoff's standing brief: the omnibus must feel like **the culmination of Books 1–3, not a fourth volume** — four sanctioned directions: (A) evolved cymatics mandala, (B) the chamber done right, (C) abstract convergence point, (D) close-up silver disc object.

---

## 5. Useful source image URLs / paths

- Site (live): `https://jasoncholloway.com/` — cover renders are served from the same Next.js `public/` tree found locally, so local files are the masters.
- OG image: `https://jasoncholloway.com/og-image.png`
- Local masters (preferred over scraping):
  - Trilogy covers: `public/covers/book1-hardcover-v2.png`, `book2-hardcover-v3.jpg`, `book3-hardcover-v2.png` (+ paperback/jpg variants)
  - Current omnibus renders: `public/covers/omnibus-hardcover-correct.png`, `omnibus-paperback-correct.png`, `omnibus-cover-v4.jpg`
  - Rose-window/site background: `public/bg-rose-window.png`
  - Author photo: `public/media/JasonCHolloway-v2.png`
  - Reference spreads: `handoff_package/handoff_package/DUSTJACKET_BOOK1_full.jpg` (primary typography reference), `_full` files for Books 2–3, `v7_*` negative references
  - Press kit PDFs: `public/press-kit/Masters_X_Press_Kit.pdf`, `Masters_X_Fact_Sheet.pdf`, `Masters_X_Synopses.pdf`, `Holloway_Author_Bios.pdf`
  - Fonts: `fonts/Cinzel_*.ttf`, `fonts/EBGaramond_*.ttf`
- Retail listings: Everand series `https://www.everand.com/series/1039587482/Masters-X`; Amazon ASINs in `public/llms.txt` (omnibus HC ASIN B0H364814B).

---

## 6. Brand constraints and opportunities for the cover redesign

### Hard constraints (violating these breaks the established brand)
1. **Black ground, gold/warm-amber accent, Cinzel display + EB Garamond Italic body.** This system spans three published covers, the website, business cards, and press kit. The omnibus must extend it, not replace it.
2. **Seventh City Press heptagram** imprint mark on spine foot and back cover — keep it; it is the imprint's only logo.
3. **Approved copy is locked**: title stack, four-paragraph synopsis, "The pattern beneath everything" epigraph, Nadia front-flap teaser, bio, ISBN 9798295884412 (HC) / 9798256072704 (PB).
4. **Imagery must come from the manuscript bank** (chamber, discs, limestone, codex, frequency/cymatics, convergence) — no Pantheon, no invented architecture, no Dan Brown foreshortening, no occult/New Age or fantasy registers.
5. Literary shelf register: must sit beside *The Secret History*, *All the Light We Cannot See*, *The Name of the Rose* — restrained, inscriptional, precious.
6. Real author photo only on the back flap; print specs per handoff Part 7 (K-100 black, 240% ink cap, FOGRA39, live vector text, IngramSpark jacket geometry).

### Opportunities
1. **"Culmination, not volume 4."** Books 1–3 each carry one gold artifact on black (mandala → instrument → astrolabe). The omnibus can unify them — e.g. all eight cymatics disc patterns resolved into a single master mandala (handoff Direction A), which is also the site's rose-window motif; strongest continuity play.
2. **The number seven is an untapped brand asset**: seven notebooks, seven copies, seven cities, Seventh City Press, the heptagram. A sevenfold geometry in the cover art would fuse story and imprint identity.
3. **111.2 Hz as a design element**: the site brands the frequency itself. A literal standing-wave/interference rendering (Direction C) is on-brand and ownable — no other book on the shelf looks like visualized sound.
4. **Website synergy**: the rose-window background and Folio Visualizer mean any radial gold-on-black figure the cover establishes can propagate site-wide, to OG images, QR-driven direct sales, and the press kit — brand assets already flow between covers and web here.
5. **Deliberate break options are narrow but real**: the silver-grey of the Book 3 astrolabe licenses a silver secondary accent (the silver discs, Direction D) for a materials shift while keeping black/gold dominance; and the ghosted-Latin watermark from Book 1 can return at omnibus scale as a "complete work" gesture.
6. **What to fix from prior attempts**: true K-100 black (v7 was RGB 34,31,31), sharp hero imagery (upscale before compositing), hero image confined to front panel, and mockup-before-PDF workflow.
