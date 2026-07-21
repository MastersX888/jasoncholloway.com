# Pinterest Audit → Pin Strategy → Design Handoff
## Seventh City Press · Jason Carroll Holloway · Masters X Trilogy
### Prepared: July 19, 2026

---

## 1. EXECUTIVE SUMMARY (Grade: B− → A path clear)

**Current state:** A surprisingly well-structured Pinterest account for an indie author one month in. Four boards with genuine audience logic, ~25 pins with real destination URLs and scholarly image discipline, business account active, both domains claimed. The foundation is architecturally sound — most indie authors at this stage have zero boards, recycled Instagram content, and no link strategy.

**What's holding you back from an A:**

1. **Rich Pins not yet validated.** This is the single highest-ROI action remaining. Your Field Notes have excellent OG tags (og:title, og:description, og:image all present on Voynich, Strahov, Cymatics pages). The book page for Vol I uses a generic `og-image.png` rather than the book cover — fix that, then validate. Until Rich Pins are live, Pinterest treats your links as second-class content.

2. **Folio Visualizer OG tags are broken.** The `/chamber/folio-visualizer/` page falls back to the site-wide default OG image and title ("Jason Carroll Holloway — Masters X Trilogy | Kansas City Conspiracy Thriller"). It has no page-specific og:title, og:description, or og:image. Any pin linking there will pull generic metadata in search. This is a dev fix (Next.js head tags for that route).

3. **All pins use 1200×630 OG images on a 2:3 platform.** Pinterest's algorithm and user experience are built around 1000×1500 vertical pins. Your landscape OG images get letterboxed, lose scroll-stopping power, and underperform in the feed by 60–80% compared to native vertical pins. The crop script exists (`generate_pinterest_pin_images.ps1`) — run it, or better, design 3–4 native templates.

**Top 3 actions (do this week):**
- P0: Fix folio-visualizer OG tags, fix Vol I og:image to use book cover, then validate Rich Pins on 5 URLs
- P0: Generate 1000×1500 pin images for all 25 existing pins using crop script as stopgap
- P1: Paste board SEO descriptions (copy already written in Wave 2 batch doc)

---

## 2. AUDIT SCORECARD

| # | Dimension | Score | Notes |
|---|-----------|-------|-------|
| 1 | **Profile completeness** | 4/5 | Business account ✓, profile photo ✓, both domains claimed ✓, website link ✓. Missing: Rich Pins validation (checklist says not done). Bio likely needs keyword optimization — display name should include searchable terms like "Literary Thriller Author" or "Manuscript History." |
| 2 | **Board architecture** | 4/5 | Excellent for this stage. Four boards map to four distinct audience segments. Naming is keyword-aware (Pinterest search will match "Voynich Manuscript," "Prague," "Literary Conspiracy Thrillers"). The Frequency & Esoteric History board is the weakest name for search — consider "Cymatics & Archaeoacoustics" or "Sound Frequency & Ancient History" for higher search match. No cover pins set (cosmetic but signals professionalism). |
| 3 | **Pin quality** | 2/5 | This is the biggest gap. All pins use 1200×630 landscape OG images — wrong aspect ratio for Pinterest's 2:3 vertical format. No text overlay on pins (losing scroll-stop power in a text-overlay-heavy platform). Folio scans are scholarly-accurate but low-contrast on mobile thumbnails. Book cover pins are the strongest visual assets. Alt text exists on Wave 2 pins (good). |
| 4 | **SEO & discoverability** | 3/5 | Pin titles are good (keyword-forward, under 100 chars). Descriptions need work — many are too short or lack the 2–3 keyword phrases a Pinterest search user would type. Board descriptions not yet pasted (copy exists, just needs to be applied). Hashtags present but sparse. The biggest SEO gap: no "Books like Foucault's Pendulum" or "Voynich Manuscript explained" long-tail phrases in descriptions. |
| 5 | **Link strategy** | 5/5 | Outstanding. Every pin links to a real, deep page (Field Note, book page, Chamber tool). No dead-end links. Funnel architecture (Field Note → book page → purchase) is built into the site itself. This is the strongest dimension — most indie authors link everything to Amazon. Your content funnel is a genuine competitive advantage. |
| 6 | **Brand consistency** | 3/5 | The site itself is beautifully branded (dark academia, manuscript cream, scholarly authority). But that brand does not yet transfer to pin visuals — pins are raw OG images without branded typography, color palette, or Seventh City Press identity. The heptagram, the "f = 111.2 Hz" footer motif, the cream-and-charcoal palette — none of these appear on pin images yet. |
| 7 | **Compliance** | 5/5 | Exemplary. Duplicate pins removed with documented audit trail (pin-map.json with deletedDuplicates). Scholarly image rules enforced (Beinecke scans only on Voynich board). No decoding claims. Fiction disclaimers present on site. One pin per URL per board rule followed. This is better compliance hygiene than most publishers. |
| 8 | **Competitive gap** | 3/5 | Similar accounts (Voynich researchers, Prague travel bloggers, dark academia book accounts) have 3 advantages you lack: (a) designed vertical pin templates with text overlays, (b) 5–10 pins per destination URL with varied angles/headlines, and (c) 50–100+ pins providing enough signal for Pinterest's algorithm. Your 25 pins are a solid start but below the ~50-pin threshold where Pinterest starts recommending your content to non-followers. |

**Overall: 29/40 → B−**

---

## 3. PRIORITIZED FIX LIST

| Priority | Issue | Why It Hurts | Exact Fix | Owner | Effort |
|----------|-------|-------------|-----------|-------|--------|
| **P0** | Folio Visualizer has default/fallback OG tags | Pins 3, 20, 22 linking to `/chamber/folio-visualizer/` pull generic site metadata. Rich Pins will show wrong title/description/image. | Add page-specific `og:title`, `og:description`, `og:image` to the folio-visualizer route in Next.js. Suggested og:title: "Voynich Manuscript Folio Visualizer — 181 Folios Interactive" / og:image: a folio composite screenshot at 1200×630. | Dev | S |
| **P0** | Vol I book page uses generic `og-image.png` | Rich Pin for your most important conversion page will show the site-wide OG image instead of the book cover. | Change `og:image` on `/books/masters-x/the-inheritance-of-frequency/` to `https://jasoncholloway.com/covers/book1-paperback.png` (or a designed 1200×630 with cover + tagline). | Dev | S |
| **P0** | Rich Pins not validated | Without Rich Pins, Pinterest doesn't pull article metadata (title, description, author) automatically. Your pins look amateur next to accounts with Rich Pins. | After fixing the two OG issues above: go to `developers.pinterest.com/tools/url-debugger/`, paste each of the 5 canonical URLs, verify pass, then apply for Rich Pins in Pinterest Settings → Claimed accounts. | You | S |
| **P0** | All pins are 1200×630 landscape | 60–80% lower engagement than 2:3 vertical pins. Letterboxed in feed. Thumbnails unreadable on mobile. This is the biggest reach suppressor. | Run `scripts/generate_pinterest_pin_images.ps1` on all 25 existing pin URLs as a stopgap. Then commission 3–4 designed templates (see Phase 3 brief). | You / Design | M |
| **P1** | Board SEO descriptions not pasted | Boards without descriptions don't rank in Pinterest search. You have 4 boards with zero description text — Pinterest can't categorize them. | Copy-paste the 4 board descriptions from the Wave 2 batch doc into Edit Board on each board. Takes 5 minutes. | You | S |
| **P1** | Display name not keyword-optimized | "Seventh City Press" alone is not searchable. Pinterest users search for genres and topics, not publisher names. | Change display name to: "Seventh City Press · Literary Thriller & Manuscript History" or "Jason Carroll Holloway · Conspiracy Thriller Author" | You | S |
| **P1** | No text overlay on any pins | In a feed full of designed pins with bold headlines, your raw OG images and folio scans are invisible. Text overlay is the #1 engagement driver on Pinterest. | Design team produces 4 templates (see Phase 3). Retrofit at least the 10 highest-priority pins with designed versions. | Design | M |
| **P1** | Pin 18 reuses cymatics.png (same image as Pin 16) | Two pins on the same board with identical images signal spam to Pinterest's visual dedup. | Replace Pin 18 image with a screenshot of the Analysis Chamber interface, or a composite of the folio visualizer + harmonic stack tools. | Design | S |
| **P2** | Only 25 pins total (below algorithm threshold) | Pinterest's recommendation engine needs ~50+ pins to start surfacing your content to non-followers via "More like this" and home feed suggestions. | Execute Wave 3 (15–20 new pins, see Section 5) to cross the 40-pin mark, then Wave 4 to reach 50+. | You / Design | L |
| **P2** | No seasonal/trending pin variants | Pinterest search volume for "Prague travel" peaks Mar–Jun and Sep–Oct. "Books like Foucault's Pendulum" spikes around gift-giving season and summer reading lists. | Create seasonal pin variants with date-aware copy (e.g., "Summer Reading: Books Like Foucault's Pendulum 2026"). Schedule 2–3 seasonal pins per quarter. | You | S |
| **P2** | No email opt-in pins | Pinterest → Field Note → read → leave. No capture mechanism on the platform itself. | Create 2–3 pins with CTA linking directly to a "free opening chapters" landing page or the newsletter signup. Pin copy: "Get the opening chapters free." | You | S |
| **P2** | Board cover images not set | Default covers look unfinished. Signals "new account" to browsers. | Upload a 600×600 representative image to each board as cover. Use: a folio scan for Voynich, Strahov OG for Prague, omnibus cover for Literary, cymatics OG for Frequency. | You | S |

**Wins — do not change these:**
- Link strategy is best-in-class for indie author Pinterest. Every pin goes to a real content page with a clear path to books.
- Scholarly image discipline (Beinecke scans only, folio refs cited) is a genuine differentiator. Keep it.
- Four-board architecture maps perfectly to four audience segments. Do not add more boards yet.
- Dedup policy with documented audit trail is professional-grade.
- Site content quality (Field Notes, Analysis Chamber) is the actual competitive moat — most authors have nothing this deep to link to.

---

## 4. AUDIENCE × CONTENT MATRIX

### Segment 1: Eco / Foucault's Pendulum Readers

**Search intents they type into Pinterest:**
- "books like foucault's pendulum"
- "literary conspiracy thriller recommendations"
- "novels about secret societies"
- "books like the name of the rose"
- "intelligent thriller books 2026"

**Emotional hook:** Intellectual satisfaction — they want fiction that rewards their knowledge, not insults it.

**Best landing page:** `/books/books-like-foucaults-pendulum/` (comp page) → `/books/masters-x/the-inheritance-of-frequency/`

**Book bridge copy:** "For readers who finished Foucault's Pendulum and wanted more — a trilogy where the Voynich Manuscript, a Prague crypt, and a Kansas City limestone cavern converge."

**Board:** Literary Conspiracy Thrillers

---

### Segment 2: Voynich / Manuscript Twitter-Brain / Dark Academia

**Search intents:**
- "voynich manuscript explained"
- "voynich manuscript folios"
- "undeciphered manuscripts"
- "beinecke ms 408"
- "dark academia aesthetic books"

**Emotional hook:** Mystery, scholarly beauty, the pleasure of the unsolved.

**Best landing page:** `/field-notes/voynich-manuscript/` → `/chamber/folio-visualizer/`

**Book bridge copy:** "Real Beinecke MS 408 folios, interactive tools, and documented history — from the research archive behind a trilogy where the Voynich is one of three manuscripts hiding a common original."

**Board:** Voynich Manuscript & Codices

---

### Segment 3: Prague Travel + Baroque Library Enthusiasts

**Search intents:**
- "most beautiful libraries in europe"
- "strahov library prague"
- "prague hidden gems"
- "baroque architecture prague"
- "prague literary travel"

**Emotional hook:** Beauty, wanderlust, cultural depth beyond tourist checklist.

**Best landing page:** `/field-notes/strahov-monastery/`

**Book bridge copy:** "The Strahov Monastery Library has been open since 1143. What the trilogy found beneath the Theological Hall is fiction. The library is exactly as documented."

**Board:** Prague & Strahov Library

---

### Segment 4: Esoteric History / Cymatics / 111 Hz Curiosity

**Search intents:**
- "cymatics sound patterns"
- "111 hz frequency meaning"
- "chladni figures explained"
- "archaeoacoustics ancient sites"
- "nag hammadi gospel of thomas"

**Emotional hook:** Curiosity, "is this real?" wonder, science-meets-ancient crossover.

**Best landing page:** `/field-notes/cymatics/` or `/field-notes/111-hz/`

**Book bridge copy:** "Ernst Chladni documented visible sound in 1787. The physics hasn't changed. The trilogy built a story on what happens when you play 111 Hz inside a 13th-century crypt."

**Board:** Frequency & Esoteric History

---

### Segment 5: Kostova / Literary Thriller Readers

**Search intents:**
- "books like the historian"
- "european mystery novels"
- "manuscript mystery books"
- "historical thriller recommendations"
- "books set in prague"

**Emotional hook:** Atmospheric immersion, European settings, slow-burn investigation.

**Best landing page:** `/books/masters-x/`

**Book bridge copy:** "A trilogy for readers of The Historian — European settings, medieval manuscripts, and a mystery that spans seven centuries and sixty-one countries."

**Board:** Literary Conspiracy Thrillers

---

### Pin Calendar Recommendation

**Realistic cadence for a solo author:** 3–5 pins per week, batched on Sunday evenings. Pinterest rewards consistency over volume. Do NOT try to post daily — burnout kills indie Pinterest accounts.

**Batch method:** Design 10–15 pins in one session (2–3 hours), schedule via Pinterest's native scheduler (Create → Schedule) over the next 2–3 weeks. Repeat monthly.

**Which existing 25 pins to keep / edit / retire:**
- **Keep as-is (10):** Pins 1, 3, 5, 6, 9, 10, 11, 16, 17, 19 — strong titles, unique destinations, good copy
- **Edit metadata (12):** Pins 2, 4, 7, 8, 12, 13, 14, 15, 18, 20, 21, 22 — need fuller descriptions, long-tail keywords, and hashtag additions
- **Retire (0):** None. All 25 pins have valid destinations and non-duplicate URLs per board. Replace images with designed versions as templates become available, but don't delete.
- **Priority retrofits (5):** Pins 4 (Foucault's comp — high search volume), 12 (Kostova comp), 11 (omnibus — conversion pin), 23 (trilogy series — conversion), 15 (111 Hz — curiosity bridge)

---

## 5. WAVE 3 PIN CONCEPTS (18 new pins)

### Voynich Manuscript & Codices (+4)

| # | Title | Hook | Destination | Board |
|---|-------|------|-------------|-------|
| W3-01 | Voynich Manuscript: What We Know in 2026 | Definitive overview pin for "voynich manuscript explained" search | `/field-notes/voynich-manuscript/` | Voynich |
| W3-02 | Voynich Botanical Folios — Unidentified Plants | Visual beauty + mystery of unknown species illustrations | `/chamber/folio-visualizer/` | Voynich |
| W3-03 | Rudolf II Bought This Book for 600 Gold Ducats | Price-hook for history readers — Emperor collector angle | `/field-notes/voynich-manuscript/` | Voynich |
| W3-04 | Undeciphered for 600 Years — Beinecke MS 408 | Dark academia aesthetic, longevity of the mystery | `/field-notes/voynich-manuscript/` | Voynich |

### Prague & Strahov Library (+4)

| # | Title | Hook | Destination | Board |
|---|-------|------|-------------|-------|
| W3-05 | Strahov Theological Hall — Barrel Vaults & Frescoes | Architecture-forward pin for "most beautiful libraries" search | `/field-notes/strahov-monastery/` | Prague |
| W3-06 | Prague's Hidden Libraries — Beyond the Tourist Trail | Travel discovery angle, positions Strahov as insider tip | `/field-notes/strahov-monastery/` | Prague |
| W3-07 | Codex Gigas: Why Is It Called the Devil's Bible? | Question-hook for medieval curiosity readers | `/field-notes/codex-gigas/` | Prague |
| W3-08 | Ars Notoria — The Medieval Book of Memory | Reframe as cognitive tool (not occult) for broader reach | `/field-notes/ars-notoria/` | Prague |

### Literary Conspiracy Thrillers (+5)

| # | Title | Hook | Destination | Board |
|---|-------|------|-------------|-------|
| W3-09 | Books Like The Da Vinci Code (But Better Written) | Provocative comp that targets huge search volume | `/books/books-like-foucaults-pendulum/` | Literary |
| W3-10 | 5 Conspiracy Thrillers with Real History | Listicle-style pin with Masters X positioned in context | `/books/masters-x/` | Literary |
| W3-11 | Get the Opening Chapters Free — Masters X | Direct email capture CTA pin | `/books/masters-x/the-inheritance-of-frequency/` (email form) | Literary |
| W3-12 | Summer Reading 2026: Literary Thrillers | Seasonal discovery pin | `/books/masters-x/` | Literary |
| W3-13 | From Kansas City to Prague — One Thriller's Geography | Setting-as-hook pin for readers who love place-driven fiction | `/books/masters-x/the-inheritance-of-frequency/` | Literary |

### Frequency & Esoteric History (+5)

| # | Title | Hook | Destination | Board |
|---|-------|------|-------------|-------|
| W3-14 | What Is 111 Hz? The Frequency in Ancient Chambers | Direct answer to a high-search-volume question | `/field-notes/111-hz/` | Frequency |
| W3-15 | Chladni Figures: Sound Made Visible Since 1787 | Science beauty pin — shareable visual concept | `/field-notes/cymatics/` | Frequency |
| W3-16 | Hypogeum Malta — 5,000-Year-Old Acoustic Chamber | Travel + archaeoacoustics crossover | `/field-notes/111-hz/` | Frequency |
| W3-17 | Harmonic Stack: Ars Notoria as Frequency Engineering | Tool-promotion pin for the Analysis Chamber | `/chamber/harmonic-stack/` | Frequency |
| W3-18 | Gospel of Thomas — "The Kingdom Is Already Here" | Nag Hammadi curiosity hook for seekers and scholars | `/field-notes/gospel-of-thomas/` | Frequency |

---

## 6. DESIGN TEAM BRIEF

### Brand & Format Specs

**Pin dimensions:** 1000 × 1500 px (2:3 vertical) — Pinterest standard. All pins MUST be this size.

**Safe zones:** Keep key text and logos out of the bottom 15% (150px) — Pinterest overlays save/share buttons there on mobile.

**Typography rules:**
- Maximum 8 words on pin image
- Font must be readable at 236×354 px (mobile thumbnail size)
- Primary: serif face (matches site's scholarly tone) — suggest Playfair Display or similar
- Secondary: clean sans-serif for subtitles — suggest Inter or Source Sans Pro
- White or cream text on dark overlays, or dark text on light manuscript-texture backgrounds

**Color palette (derived from jasoncholloway.com):**

| Role | Color | Hex (approximate) |
|------|-------|----|
| Primary dark | Charcoal/near-black | `#1a1a1a` |
| Manuscript cream | Warm parchment | `#f5f0e8` |
| Accent gold | Scholarly warmth | `#c4a35a` |
| Prague stone | Cool architectural gray | `#8a8578` |
| Seventh City accent | Brand heptagram context | `#4a3728` |

**Heptagram usage:** Watermark-opacity in corner, NOT as primary visual element. It's a publisher mark, not a decorative motif.

### Templates Needed (4 reusable layouts)

**Template A: "Folio Hero + Reference Bar"**
- Use for: Voynich and Ars Notoria manuscript pins
- Layout: Full-bleed folio scan (center-cropped to 2:3), semi-transparent dark overlay on bottom 25%, folio reference in gold serif text (e.g., "Beinecke MS 408 · f85v-86r"), one-line hook in white sans-serif
- Bottom bar: "jasoncholloway.com" in small caps

**Template B: "Book Cover + Comp Line"**
- Use for: Literary thriller board, conversion pins
- Layout: Book cover (centered, ~60% of pin height), comp line above in serif ("For readers of Foucault's Pendulum"), title below, dark background with subtle manuscript texture
- Bottom: "Available now · Kindle · Paperback · Hardcover"

**Template C: "Field Note Quote Card"**
- Use for: Curiosity-hook pins across all boards
- Layout: Full-pin manuscript-cream background, 4–6 word hook in large serif (centered), thin gold rule, one-line context in smaller sans-serif, small folio or OG image inset (optional)
- Example: "600 Years. Still Undeciphered." / "Voynich Manuscript · Real History Article"

**Template D: "Prague / Travel Photo-Style"**
- Use for: Prague board, architectural/travel pins
- Layout: OG image or photo (top 65%), text block on solid cream or dark panel (bottom 35%), location text in small caps, hook line in serif
- Example: [Strahov image] / "STRAHOV MONASTERY · PRAGUE" / "One of Europe's Most Beautiful Libraries"

### Pin Production Queue (15 designed pins — minimum order)

| ID | Board | Template | Image Source | Headline on Pin (≤8 words) | Pin Title (≤100 chars) | Description (≤500 chars) | Destination URL | Alt Text | Hashtags |
|----|-------|----------|-------------|---------------------------|----------------------|-------------------------|----------------|----------|----------|
| D-01 | Voynich | A | `/folios/voynich/Vol 1/voynich-004.jpg` | 600 Years. Still Undeciphered. | What Is the Voynich Manuscript? Real History, No Decoding Claims | The world's most famous undeciphered book — Beinecke MS 408, folio f1r. Carbon-dated 1404–1438, owned by Emperor Rudolf II. Free research article with sourced history + interactive folio visualizer. For readers of Eco and Kostova. | `/field-notes/voynich-manuscript/` | Voynich Manuscript folio f1r, first page, Beinecke MS 408, botanical illustration in undeciphered script | #VoynichManuscript #MedievalManuscripts #DarkAcademia |
| D-02 | Voynich | A | `/folios/voynich/Vol 4/f85v-86r.jpg` | The Great Rosette Foldout | Voynich Rosette Foldout — Beinecke MS 408 f85v-86r | The most famous page of the Voynich Manuscript: a nine-rosette cosmological diagram that unfolds from the codex. Explore all 181 folios interactively in the Analysis Chamber folio visualizer. | `/chamber/folio-visualizer/` | Voynich Manuscript folio f85v-86r rosette foldout diagram Beinecke MS 408 | #VoynichManuscript #BeineckeLibrary |
| D-03 | Voynich | C | — (text-only card) | Rudolf II Paid 600 Gold Ducats | Rudolf II Bought the Voynich Manuscript — Real History Field Note | Emperor Rudolf II of Bohemia purchased this undeciphered manuscript for 600 gold ducats. He also owned the Codex Gigas. Real history from the research archive behind the Masters X trilogy. | `/field-notes/voynich-manuscript/` | Text card: Rudolf II purchased the Voynich Manuscript for 600 gold ducats | #VoynichManuscript #RudolfII |
| D-04 | Prague | D | `/og/field-notes/strahov-monastery.png` | Europe's Most Beautiful Baroque Library | Strahov Library Prague — Theological Hall, 1143 to Today | Premonstratensian monastery, barrel-vaulted frescoes by Siard Nosecký, 200,000 volumes. Free Field Note with sourced history. The Strahov Library is real. What the trilogy found beneath it is fiction. | `/field-notes/strahov-monastery/` | Strahov Monastery Theological Hall baroque library interior Prague | #StrahovLibrary #Prague #BeautifulLibraries |
| D-05 | Prague | D | `/og/field-notes/strahov-monastery.png` | Hidden Prague: Beyond the Tourist Trail | Prague's Literary History — Strahov, Rudolf II, Manuscript Culture | Prague was the manuscript capital of Central Europe under Rudolf II. Strahov Library, Voynich provenance, Codex Gigas connections. Free research article. | `/field-notes/strahov-monastery/` | Prague castle and Strahov Monastery area, baroque architecture | #Prague #LiteraryTravel #HiddenGems |
| D-06 | Prague | A | `/folios/arsnotoria/Ars_Notoria_Screenshot_3.png` | Medieval Cognitive Technology | Ars Notoria — The Book of Memory and Illumination | Solomonic grimoire tradition: geometric notae designed as cognitive exercises. Not magic — medieval information architecture. British Library copies documented. Real history Field Note. | `/field-notes/ars-notoria/` | Ars Notoria geometric notae compendium, medieval manuscript page | #MedievalManuscripts #ArsNotoria |
| D-07 | Literary | B | `/covers/omnibus-hardcover-v3.png` | Three Manuscripts. Seven Cities. One System. | Masters X Trilogy — Literary Conspiracy Thriller, Complete Omnibus | 686 pages. Kansas City → Prague → 61 countries. Where the Voynich Manuscript, the Ars Notoria, and a sealed 13th-century crypt converge. For readers of Eco, Kostova, and Crouch. | `/books/masters-x/omnibus/` | Masters X trilogy omnibus hardcover edition by Jason Carroll Holloway | #LiteraryThriller #ConspiracyThriller |
| D-08 | Literary | B | `/covers/book1-paperback.png` | Kansas City to Prague. One Frequency. | The Inheritance of Frequency — Masters X Vol I | A fired security guard inherits classified acoustic research linking SubTropolis carvings to a Prague crypt sealed since 1267. For readers of Foucault's Pendulum and The Historian. Kindle, paperback, hardcover. | `/books/masters-x/the-inheritance-of-frequency/` | The Inheritance of Frequency paperback cover, Masters X Vol I | #LiteraryThriller #FoucaultsPendulum |
| D-09 | Literary | C | — (text-only card) | Books Like Foucault's Pendulum | Literary Conspiracy Thrillers for Eco and Kostova Readers | Looking for fiction with real manuscripts, European settings, and intellectual depth? Readalike list + the Masters X trilogy. Not Dan Brown pace — Umberto Eco patience. | `/books/books-like-foucaults-pendulum/` | Text card: books like Foucault's Pendulum literary conspiracy thrillers | #FoucaultsPendulum #BookRecommendations |
| D-10 | Literary | C | — (text-only card) | Get the Opening Chapters Free | Masters X Vol I — Free Opening Chapters by Email | Start reading The Inheritance of Frequency. Opening chapters delivered free by email. Unsubscribe anytime. Kansas City, Voynich, Prague. | `/books/masters-x/the-inheritance-of-frequency/` | Text card: get free opening chapters of Masters X trilogy | #LiteraryThriller #FreeBooks |
| D-11 | Frequency | C | — (text-only card) | What Happens at 111 Hz? | 111 Hz — The Frequency in Ancient Stone Chambers | Hypogeum Malta, Newgrange, Hal Saflieni — ancient chambers that resonate at 111 Hz. Real archaeoacoustics research. Free Field Note from the Masters X research archive. | `/field-notes/111-hz/` | Text card: 111 Hz frequency in ancient stone chambers archaeoacoustics | #Archaeoacoustics #111Hz |
| D-12 | Frequency | A | `/og/field-notes/cymatics.png` | Sound You Can See. Real Physics. | Cymatics — Chladni Figures and Visible Sound Patterns | Sand on a metal plate. A violin bow at the edge. Resonant frequency. Geometric patterns. Ernst Chladni documented it in 1787. The physics is real. Free Field Note. | `/field-notes/cymatics/` | Cymatics Chladni figures sand patterns on vibrating metal plate | #Cymatics #SoundScience |
| D-13 | Voynich | A | `/folios/voynich/Vol 2/voynich2-000.jpg` | Voynich Astronomical Section | Voynich Manuscript Astronomical Diagrams — Folio f27r | Circular astronomical diagrams in the Voynich Manuscript's second section. Beinecke MS 408 folio f27r. Explore all 181 folios in the interactive Analysis Chamber visualizer. | `/chamber/folio-visualizer/` | Voynich Manuscript folio f27r astronomical circular diagram Beinecke MS 408 | #VoynichManuscript #MedievalAstronomy |
| D-14 | Prague | D | `/og/field-notes/codex-gigas.png` | The Devil's Bible — Codex Gigas | Codex Gigas: Medieval Bohemia's Largest Manuscript | From medieval Bohemia to the Swedish Royal Library. The largest extant medieval manuscript, with its famous full-page devil illustration. Real history Field Note — sourced and free. | `/field-notes/codex-gigas/` | Codex Gigas Devil's Bible medieval manuscript illustration | #CodexGigas #MedievalHistory |
| D-15 | Frequency | A | `/folios/arsnotoria/Ars_Notoria_Screenshot_5.png` | Hexagonal Geometry in a Medieval Grimoire | Harmonic Stack — Ars Notoria Notae as Acoustic Specifications | 14 geometric notae from the Ars Notoria analyzed as frequency patterns. Layer I of the Analysis Chamber. Interactive tool — free. Companion to Masters X Vol II. | `/chamber/harmonic-stack/` | Ars Notoria hexagonal trefoil network notae geometric pattern | #ArsNotoria #SacredGeometry |

### Assets Inventory

**Already have (use directly or crop):**

| Asset Type | Count | Location | Pinterest-Ready? |
|------------|-------|----------|------------------|
| Book cover PNGs | 5+ | `/covers/` | Need 2:3 crop/composite |
| Field Note OG images | 8+ | `/og/field-notes/` | Need 2:3 crop (1200×630 → 1000×1500) |
| Voynich folio scans | 181 | `/folios/voynich/` | Crop to 2:3 + add overlay template |
| Ars Notoria scans | 15 | `/folios/arsnotoria/` | Crop to 2:3 + add overlay template |
| Crop script | 1 | `scripts/generate_pinterest_pin_images.ps1` | Exists, run it |

**Must be designed from scratch:**

| Asset | Count Needed | Notes |
|-------|-------------|-------|
| Template A (Folio Hero) | 1 master PSD/Figma | Reusable for all folio pins |
| Template B (Book Cover) | 1 master | Reusable for all conversion pins |
| Template C (Quote Card) | 1 master | Reusable for all text-hook pins |
| Template D (Travel/Photo) | 1 master | Reusable for Prague + location pins |
| Board cover images | 4 (one per board) | 600×600, representative |
| Folio Visualizer OG image | 1 | 1200×630 composite screenshot for og:image fix |

**Recommended ratio:** 60% cropped/overlaid existing assets, 40% designed-from-scratch pins. The folio scans and book covers are strong source material — they just need the template treatment.

### Copy Voice Guide (for design team)

- **Tone:** Authoritative, curious, never clickbait. "Real history article" not "shocking secrets revealed."
- **Vocabulary:** "Field Note" (not blog post), "Analysis Chamber" (not tools page), "research archive" (not content hub)
- **Framing:** "Real history, real sources" — always position the documented record first, fiction second
- **Geographic voice:** Global English. Light EU/CZ appeal on Prague board ("Visit strahovskyklaster.cz"). No Americanisms on international boards.
- **What never to say:** "Decoded," "solved," "secret meaning discovered," "ancient aliens," "hidden knowledge unlocked"
- **What to say:** "Undeciphered," "documented," "sourced," "real history," "fiction built on the record"

---

## 7. 90-DAY PINTEREST ROADMAP

### Week 1 (Jul 19–25) — FOUNDATIONS
- [ ] Fix folio-visualizer OG tags (dev)
- [ ] Fix Vol I book page og:image (dev)
- [ ] Paste 4 board SEO descriptions (5 min, you)
- [ ] Set board cover images (4 boards, 10 min)
- [ ] Update display name with keywords
- [ ] Run Rich Pins validation on 5 URLs
- [ ] Run crop script on all 25 existing pin images → replace landscape images with 1000×1500 crops

### Week 2 (Jul 26–Aug 1) — TEMPLATE DESIGN
- [ ] Commission/create 4 pin templates (A/B/C/D)
- [ ] Design first 5 pins from production queue (D-01 through D-05)
- [ ] Edit metadata on 12 existing pins flagged for revision (fuller descriptions, keywords)
- [ ] Publish 3 Wave 3 concept pins (W3-01, W3-09, W3-14 — one per high-search-volume term)

### Week 3 (Aug 2–8) — WAVE 3 LAUNCH
- [ ] Design pins D-06 through D-10
- [ ] Publish 5 pins (1/day schedule)
- [ ] Verify Rich Pins are pulling metadata correctly on all new pins

### Week 4 (Aug 9–15) — WAVE 3 COMPLETION
- [ ] Design pins D-11 through D-15
- [ ] Publish remaining Wave 3 pins (5 more, 1/day)
- [ ] Total pin count target: ~43 pins

### Weeks 5–8 (Aug 16 – Sep 12) — GROWTH MODE
- [ ] Publish 3–4 pins per week (mix of new concepts + repin variants of top performers)
- [ ] Create 2–3 seasonal pins ("Fall reading list," "Prague autumn travel")
- [ ] Monitor Pinterest Analytics: identify top 5 pins by saves and outbound clicks
- [ ] Create 2 new pin variants for each top performer (different headline, same destination)
- [ ] Target: 55–60 pins total by end of Week 8

### Weeks 9–12 (Sep 13 – Oct 17) — OPTIMIZATION
- [ ] Analyze 60-day data: which boards drive most outbound clicks?
- [ ] Double down on winning board (create 5–8 more pins for it)
- [ ] Test 1 Idea Pin (multi-page storytelling format) — suggested topic: "5 Things You Didn't Know About the Voynich Manuscript"
- [ ] Create holiday-season pins: "Gift guide: literary thrillers for smart readers"
- [ ] Prague travel board: add 3 autumn-themed pins (peak travel search for spring planning)
- [ ] Target: 70–80 pins total by end of Week 12
- [ ] Run full 90-day performance report

### Ongoing cadence after 90 days:
3–5 new pins per week, batched monthly. One design session per month (10–15 pins). Seasonal refreshes quarterly.

---

## 8. METRICS TO TRACK

### What to measure

| Metric | Where to Find | Why It Matters |
|--------|--------------|----------------|
| **Outbound clicks** | Pinterest Analytics → Overview | The money metric. This is traffic to your site. Everything else is vanity unless it drives clicks. |
| **Saves** | Pin-level analytics | Saves = distribution. Each save puts your pin in front of that user's followers. Saves compound over months. |
| **Impressions** | Pinterest Analytics → Overview | Reach indicator. Low impressions + good content = SEO/keyword problem. High impressions + low clicks = visual/CTA problem. |
| **Top pins (by saves)** | Analytics → Top Pins | Tells you which topics and templates resonate. Double down on these. |
| **Top pins (by outbound clicks)** | Analytics → Top Pins | Tells you which pins actually drive traffic. Often different from saves leaders. |
| **Board-level traffic** | Analytics → Boards | Which audience segment is most engaged? Shift investment toward winning boards. |
| **Audience insights** | Analytics → Audience | Demographics, interests, top categories. Verify your actual audience matches your target segments. |
| **Site traffic from Pinterest** | Google Analytics (or Cloudflare Analytics) → Referral → pinterest.com | The ultimate validation. How much real traffic does Pinterest send? |

### What "good" looks like for a literary indie at 30/60/90 days

| Timeframe | Realistic benchmarks (25–80 pin account, niche literary) |
|-----------|----------------------------------------------------------|
| **30 days** | 1,000–5,000 monthly impressions. 10–50 saves total. 5–20 outbound clicks. Top pin identified. If you're hitting these, the foundation is working. Don't panic about low numbers — Pinterest is a slow-burn platform with 3–6 month compounding. |
| **60 days** | 5,000–15,000 monthly impressions. 50–200 saves total. 20–100 outbound clicks. 2–3 pins consistently appearing in search results for target terms. At least 1 pin with 10+ saves (this is your template for future pins). Pinterest referral traffic visible in site analytics. |
| **90 days** | 10,000–30,000 monthly impressions. 100–500 saves total. 50–200 outbound clicks per month. Clear picture of which board performs best. 1–2 pins that drive 50%+ of all traffic (this is normal — Pinterest is power-law distributed). Monthly Pinterest referral traffic should be 5–15% of total site traffic for a well-run niche account. |

**Red flags at 90 days:** Under 1,000 monthly impressions = keyword/SEO problem, audit board descriptions and pin titles. High impressions but under 1% click-through rate = visual problem, pins aren't compelling enough to click. High saves but low clicks = pins are pretty but CTA/destination isn't clear.

**Green flags at 90 days:** Any pin with 50+ saves is a signal to create 5 more variants on that topic. Voynich board outperforming others = lean into manuscript content. Prague board outperforming = lean into travel/architecture angle. If outbound clicks to Field Notes exceed clicks to book pages, that's actually good — the funnel is working (discovery → trust → conversion happens on-site, not on Pinterest).

---

*Document prepared for Seventh City Press internal use. Design team: execute from Section 6. Dev team: execute P0 fixes from Section 3. Jason: execute P1 items from Section 3 this week.*
