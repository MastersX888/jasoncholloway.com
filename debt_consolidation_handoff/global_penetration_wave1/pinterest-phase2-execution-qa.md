# Pinterest Phase 2 — Execution QA + Wave 3 Completion
## Seventh City Press · Jason Carroll Holloway
### Prepared: July 20, 2026
### Phase 1 Audit: July 19, 2026 (Grade: B−)

---

## 1. EXECUTION QA SCORECARD

I verified live OG tags on key URLs and cross-referenced all attached files (crops-index.json, pinterest-media-manifest.json, pinterest-wave3-design-batch.md, designed pins D-01..D-05 visual QA).

### P0 Items

| Original P0 Item | Expected State | Verification Method | Status | Notes |
|---|---|---|---|---|
| Folio Visualizer OG tags | Page-specific og:title, og:description, og:image on `/chamber/folio-visualizer/` | Live fetch of URL | **NOT DEPLOYED** | Fix is in source (`layout.tsx`) per ground truth, but live site still shows default site-wide OG: `og:title = "Jason Carroll Holloway — Masters X Trilogy"`, `og:image = /opengraph-image?16400e3142a91323`, `og:url = https://jasoncholloway.com/` (root, not page-specific). Deploy is the blocker. |
| Vol I book page og:image | Page-specific book cover OG image instead of generic `og-image.png` | Live fetch of URL | **DEPLOYED ✓** | Now shows `og:image = /books/masters-x/the-inheritance-of-frequency/opengraph-image?e4f236eca25ee669` with `og:image:alt = "Book Cover"` and page-specific title "The Inheritance of Frequency — Masters X Book 1". This is live. |
| Rich Pins validated (5 URLs) | All 5 pass Pinterest URL debugger | Blocked on deploy | **Pending Jason** | 4 of 5 URLs have correct OG tags live now. Folio-visualizer will fail until deployed. Validate the 4 good ones now; hold folio-visualizer for post-deploy. |
| 1000×1500 crop JPGs | 18 crops at 2:3 ratio | crops-index.json reviewed | **Done ✓** | 18 entries in crops-index.json mapping all 25 pins (some crops serve multiple pins, e.g., strahov-og → Pins 6/7/8, omnibus-hc → Pins 11/23). All source URLs match pinterest-media-manifest.json. |
| Replace landscape images on 25 existing pins | Swap live pin images to crop JPGs | Pinterest admin action | **Pending Jason** | Crops exist locally. Jason must edit each pin on Pinterest → replace image → upload from `pinterest-assets/crops/`. |

### P1 Items

| Original P1 Item | Expected State | Verification Method | Status | Notes |
|---|---|---|---|---|
| Board SEO descriptions pasted | 4 boards have keyword-rich descriptions | Pinterest admin action | **Pending Jason** | Paste-ready copy in `pinterest-p1-admin-checklist.md` §1. 5-minute task. |
| Display name keyword-optimized | Contains genre/topic keywords | Pinterest Settings → Profile | **Pending Jason** | Two options in checklist §2. |
| Text overlay / designed pins | Templates A/B/C/D produced, D-01..D-05 generated | Visual QA of D-01.jpg..D-05.jpg | **Done ✓ (D-01..D-05)** | See visual QA notes below. D-06..D-15 not yet generated. |
| Pin 18 duplicate image fix | Pin image swapped from cymatics.png to hub.png | Pinterest admin (manual swap) | **Pending Jason** | Documented in pinterest-media-manifest.json `pin18ImageFix`. Pin ID: `1110700326880461590`. |
| Board cover images set | 4 boards have 600×600 cover images | Pinterest admin action | **Pending Jason** | Suggested covers in checklist §3 (use crop files). |
| Metadata edits on 12 existing pins | Fuller descriptions, long-tail keywords | Pinterest admin (edit each pin) | **Pending Jason** | See Section 3 below for paste-ready copy. |

### Cursor Gaps Identified

**Gap 1: Folio Visualizer deploy is THE critical blocker.** The OG fix exists in source but is not live. Until `wrangler deploy` runs, Rich Pins validation on `/chamber/folio-visualizer/` will fail, and Pins 3, 20, 22 (plus D-02 which links there) will pull incorrect metadata. **Action: Deploy before any Rich Pins validation.**

**Gap 2: Folio Visualizer OG image may not exist yet.** The manifest doesn't include a dedicated 1200×630 OG image for the folio-visualizer page. If Cursor's `layout.tsx` fix points to a file that doesn't exist in the build, the deployed page will still fall back to defaults. **Action: Verify that the OG image referenced in `layout.tsx` is committed to the repo and included in the Cloudflare Pages build output. If no dedicated image exists, use a folio composite screenshot or the cymatics OG as a temporary fallback.**

**Gap 3: Grimoire, Kingdom, and Omnibus OG images — status unclear.** The ground truth says "Vol I + all Masters X volume cover OG images → Done." Vol I is confirmed live. But I haven't verified the Grimoire (`/books/masters-x/the-grimoire/`), Kingdom (`/books/masters-x/the-kingdom/`), or Omnibus (`/books/masters-x/omnibus/`) pages. These feed Pins 13, 14, 11/23, and future D-07/D-08. **Action: After deploy, spot-check all 4 book page OG images with `curl -s URL | grep og:image`.**

**Gap 4: No `og:type = "article"` on Field Notes.** Pinterest Article Rich Pins require `og:type = "article"`. The Voynich, Strahov, and Cymatics Field Notes pages don't include this meta tag (I see `og:type` only on the folio-visualizer where it defaults to `website`). If Pinterest's validator expects `og:type = "article"` for Article Rich Pins, these may validate as generic web pages instead. **Action: Add `<meta property="og:type" content="article" />` to all Field Note routes. Low effort, high impact for Rich Pins classification.**

### Visual QA — Designed Pins D-01..D-05

| Pin | Assessment | Issues |
|---|---|---|
| D-01 | **Good.** Folio f1r with dark overlay, clear "600 Years. Still Undeciphered." headline, jasoncholloway.com footer. Scholarly aesthetic, text readable at thumbnail. | Folio scan slightly low-contrast against the dark overlay at mobile thumbnail size. Consider a subtle brightness/contrast boost on the folio source in future template iterations. |
| D-02 | **Good.** Rosette foldout f85v-86r, dramatic full-bleed treatment, "The Great Rosette Foldout" headline. Strong scroll-stop power. | Text positioning close to bottom edge — verify it clears Pinterest's 15% safe zone on mobile. |
| D-03 | **Good.** Clean quote-card template (Template C). "Rudolf II Paid 600 Gold Ducats" on cream/dark background. Readable, authoritative. | No folio image — purely text-based. This is correct for Template C; just noting it performs differently in visual-heavy feeds. Consider testing performance against folio-backed variants. |
| D-04 | **Good.** Strahov OG with Template D treatment. Location bar ("STRAHOV MONASTERY · PRAGUE"), "Europe's Most Beautiful Baroque Library" hook. Travel-board ready. | Source image is the 1200×630 OG cropped to 2:3, which means top/bottom of the original are clipped. Acceptable for launch; a native 2:3 Strahov photo would be stronger for Prague board long-term. |
| D-05 | **Good.** Same Strahov source, different angle/crop treatment. "Hidden Prague: Beyond the Tourist Trail" — travel-discovery framing. | Same source image as D-04 (strahov-og). On the same board, two pins with identical base images may trigger visual dedup. If both go on Prague board, ensure Pinterest sees them as distinct (different crop, different overlay weight). |

---

## 2. POST-DEPLOY RICH PINS CHECKLIST

### Pre-requisites
1. Run `wrangler deploy` (or whatever your Cloudflare Pages deploy command is)
2. Wait 2–5 minutes for edge cache propagation
3. Verify folio-visualizer OG fix is live: open `https://jasoncholloway.com/chamber/folio-visualizer/` in an incognito browser → View Page Source → search for `og:title`. It should NOT say "Jason Carroll Holloway — Masters X Trilogy | Kansas City Conspiracy Thriller". It should say something specific to the folio visualizer.

### URLs to validate (in order)

**URL 1: Vol I Book Page (should pass now)**
```
https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/
```
- Expected og:title: `The Inheritance of Frequency — Masters X Book 1`
- Expected og:description: Contains "fired Kansas City security guard" and "Prague crypt sealed since 1267"
- Expected og:image: Page-specific route (`/books/masters-x/the-inheritance-of-frequency/opengraph-image?...`) showing book cover
- If fails: This page is already live and correct. If Pinterest still shows old metadata, click "Fetch new scrape" in the debugger to force a recrawl.

**URL 2: Voynich Manuscript Field Note (should pass now)**
```
https://jasoncholloway.com/field-notes/voynich-manuscript/
```
- Expected og:title: Contains "Voynich Manuscript, Rudolf II, and the Book No One Can Read"
- Expected og:description: Contains "Carbon-dated to the early 1400s, undeciphered for 600 years"
- Expected og:image: `https://jasoncholloway.com/og/field-notes/voynich-manuscript.png`
- If fails: Check that `og:type` is present. If missing, add `<meta property="og:type" content="article" />` to the Field Notes layout.

**URL 3: Strahov Monastery Field Note (should pass now)**
```
https://jasoncholloway.com/field-notes/strahov-monastery/
```
- Expected og:title: Contains "Strahov Library" and "Most Beautiful Room in Prague"
- Expected og:description: Contains "Founded 1143" and "200,000 volumes"
- Expected og:image: `https://jasoncholloway.com/og/field-notes/strahov-monastery.png`
- If fails: Same `og:type` check as URL 2.

**URL 4: Cymatics Field Note (should pass now)**
```
https://jasoncholloway.com/field-notes/cymatics/
```
- Expected og:title: Contains "Cymatics: Sound You Can See"
- Expected og:description: Contains "Sand on a metal plate" or "Chladni figures"
- Expected og:image: `https://jasoncholloway.com/og/field-notes/cymatics.png`
- If fails: Same `og:type` check.

**URL 5: Folio Visualizer (BLOCKED until deploy)**
```
https://jasoncholloway.com/chamber/folio-visualizer/
```
- Expected og:title (post-deploy): Something like "Voynich Manuscript Folio Visualizer" or "Virtual Folio Pattern Visualizer" — NOT the generic site title
- Expected og:description: Something about 181 folios, interactive tool — NOT "Beneath Kansas City's SubTropolis..."
- Expected og:image: A page-specific image — NOT `/opengraph-image?16400e3142a91323`
- If fails post-deploy: The `layout.tsx` metadata export may be overridden by a parent layout or by Next.js `opengraph-image` file convention. Check:
  1. Is there an `opengraph-image.tsx` or `opengraph-image.png` in `app/chamber/folio-visualizer/`?
  2. Does the `metadata` export in `layout.tsx` include `openGraph.images`?
  3. Is a parent layout (e.g., `app/chamber/layout.tsx` or `app/layout.tsx`) overriding the child?

### After all 5 pass:
Go to **Pinterest Settings → Claimed accounts** (or **Settings → Claim**) → Apply for Rich Pins. Pinterest will recrawl within 24–72 hours. After approval, all pins linking to your claimed domains will automatically pull Article Rich Pin metadata.

### Partial validation strategy:
If URL 5 continues to fail after deploy, validate URLs 1–4 now and get Rich Pins approved on those. URL 5 can be fixed and recrawled later without losing Rich Pin status on the other pages.

---

## 3. METADATA EDIT BATCH — 12 EXISTING PINS

Cross-referenced against `pinterest-pin-batch.md` (Wave 1) and `pinterest-wave2-batch.md` / `pinterest-wave2-pin-map.json` (Wave 2). Destination URLs unchanged.

| Pin # | Board | Current Issue | New Title (≤100 chars) | New Description (≤500 chars) | Alt Text | Hashtags |
|---|---|---|---|---|---|---|
| 2 | Voynich | Description too vague ("Why Central Europe keeps appearing"); no long-tail search terms | Voynich Manuscript and Prague — Rudolf II's 600-Ducat Mystery | Emperor Rudolf II of Bohemia purchased an undeciphered manuscript for 600 gold ducats. Central European provenance theory — real documented history, not a decoding claim. Free Field Note with sourced research. Beinecke MS 408 folio f68r3. #VoynichManuscript #MedievalManuscripts | Voynich Manuscript folio f68r3 biological section Beinecke MS 408 | #VoynichManuscript #MedievalManuscripts |
| 4 | Voynich | High-search-volume term ("books like Foucault's Pendulum") but description is thin; this pin should be on Literary board, not Voynich — **note: do not move, just optimize copy** | Books Like Foucault's Pendulum — Literary Conspiracy Thrillers | Umberto Eco's manuscript mystery set the standard. Looking for more? Readalike list with real manuscripts, European settings, and intellectual depth. Masters X trilogy: Kansas City to Prague, Voynich to Ars Notoria. Not Dan Brown pace — Eco patience. #FoucaultsPendulum #LiteraryThriller #BookRecommendations | Text: books like Foucault's Pendulum literary conspiracy thriller readalikes | #FoucaultsPendulum #LiteraryThriller #BookRecommendations |
| 7 | Prague | Duplicate destination URL with Pin 6 (both → strahov-monastery Field Note); description doesn't differentiate | The Most Beautiful Library Room in Prague — Strahov Theological Hall | Strahov Theological Hall: barrel-vaulted ceiling frescoed by Siard Nosecký, 200,000+ volumes, chained manuscripts. One of the most beautiful baroque libraries in the world. Visit strahovskyklaster.cz. Free research article with sourced history. #StrahovLibrary #Prague #BeautifulLibraries | Strahov Monastery Theological Hall baroque barrel vault ceiling frescoes Prague | #StrahovLibrary #Prague #BeautifulLibraries |
| 8 | Prague | "Prague Axis — Manuscript Thriller Setting" is too inside-baseball; doesn't match search intent | Prague in Fiction — Where Manuscripts and Conspiracy Meet | Rudolf II's Prague: Voynich Manuscript, Codex Gigas, Strahov Monastery. The real geography behind the Masters X trilogy. Fiction disclaimer on page — the history is real, the interpretation is the novel's. #Prague #HistoricalFiction #ConspiracyThriller | Prague Castle and Strahov Monastery area manuscript thriller setting | #Prague #HistoricalFiction #ConspiracyThriller |
| 12 | Literary | "For Fans of The Historian (Kostova)" — good hook but description too short, no search terms | Books Like The Historian by Elizabeth Kostova — Manuscript Mystery Fiction | Manuscript-driven literary thriller with European settings, medieval libraries, and a mystery that spans centuries. If you loved The Historian, the Masters X trilogy connects Voynich Manuscript provenance to a Prague crypt sealed since the 13th century. English edition worldwide. #TheHistorian #LiteraryThriller #BookRecommendations | Text: books like The Historian by Elizabeth Kostova manuscript mystery recommendations | #TheHistorian #LiteraryThriller #BookRecommendations |
| 13 | Literary | Description too terse ("Strahov crypt · Ars Notoria · Chartres acoustics · Iceland"); no emotional hook | Masters X Vol II: The Grimoire — Strahov Crypt, Ars Notoria, Cymatics | The sealed chamber beneath the Strahov Library. A medieval grimoire reimagined as cognitive technology. Cymatics patterns in an Icelandic cave. Volume 2 of the Masters X trilogy — where the preparation protocol begins. For readers of Eco and Kostova. Kindle, paperback, hardcover. #LiteraryThriller #MedievalManuscripts | The Grimoire paperback cover Masters X Vol II by Jason Carroll Holloway | #LiteraryThriller #MedievalManuscripts |
| 14 | Literary | Description too terse ("Conspiracy becomes open source. 61 countries. Trilogy finale.") | Masters X Vol III: The Kingdom — Conspiracy Goes Global, 61 Countries | The Foundation's secret goes open source. Sixty-one countries. The trilogy's argument about consciousness, frequency, and manuscripts resolves. "The kingdom is spread upon the earth, and people do not see it." Volume 3 — the finale. Kindle, paperback, hardcover. #LiteraryThriller #ConspiracyThriller | The Kingdom paperback cover Masters X Vol III by Jason Carroll Holloway | #LiteraryThriller #ConspiracyThriller |
| 15 | Literary (→ should be Frequency if possible, but do not move) | Good content but on wrong board; description says "Global alt-history curiosity → Masters X bridge" which is too meta | 111 Hz — The Frequency in Ancient Stone Chambers | Hypogeum Malta, Newgrange, Hal Saflieni — ancient chambers that resonate at 111 Hz. Real archaeoacoustics research, documented and sourced. Free Field Note from the research archive behind the Masters X trilogy. What happens at 111 Hz? #111Hz #Archaeoacoustics #AncientHistory | Illustration: 111 Hz frequency resonance archaeoacoustics ancient chambers | #111Hz #Archaeoacoustics #AncientHistory |
| 18 | Frequency | Uses same image as Pin 16 (cymatics.png duplicate); description too short | Analysis Chamber — Free Interactive Research Tools | Folio visualizer (181 Voynich folios), harmonic stack (Ars Notoria as acoustic spec), global cave map. Free curiosity tools from the Masters X research archive. Explore real manuscripts, real frequency data, real archaeology. No login, no paywall. #VoynichManuscript #InteractiveTools | Analysis Chamber interactive research tools folio visualizer harmonic stack | #VoynichManuscript #InteractiveTools |
| 20 | Voynich | Title says "f27r" but description is thin; needs folio ref and search terms | Voynich Manuscript Astronomical Diagrams — Beinecke MS 408 Folio f27r | Circular astronomical diagrams from the Voynich Manuscript's second section. Beinecke MS 408, folio f27r — undeciphered for 600 years. Explore all 181 folios interactively in the free Analysis Chamber folio visualizer. Real manuscript scans, no AI illustration. #VoynichManuscript #MedievalAstronomy #BeineckeLibrary | Voynich Manuscript folio f27r astronomical circular diagram Beinecke MS 408 | #VoynichManuscript #MedievalAstronomy #BeineckeLibrary |
| 21 | Voynich | Description thin; needs folio section context for scholarly readers | Voynich Pharmaceutical Section — Beinecke MS 408 Folio f88r | Tiered vessels, hanging botanical specimens — the Voynich Manuscript's pharmaceutical section. Beinecke MS 408, folio f88r. Real scan from Yale's digital collection. Read the full Voynich Field Note with documented history and explore all 181 folios free. #VoynichManuscript #MedievalManuscripts | Voynich Manuscript folio f88r pharmaceutical vessels hanging specimens Beinecke MS 408 | #VoynichManuscript #MedievalManuscripts |
| 22 | Voynich | Weakest Voynich pin; description says "marine creatures, roots" but no context | Voynich Recipe Section — Beinecke MS 408 Folio f99r | Marine creatures, root systems, and complex recipe-page layout — one of the Voynich Manuscript's most detailed pharmaceutical folios. Beinecke MS 408, folio f99r. Explore all 181 folios in the free Analysis Chamber visualizer. Undeciphered for 600 years. #VoynichManuscript #MedievalManuscripts #DarkAcademia | Voynich Manuscript folio f99r recipe page marine specimens Beinecke MS 408 | #VoynichManuscript #MedievalManuscripts #DarkAcademia |

---

## 4. IMAGE RETROFIT MAP — 25 EXISTING PINS

All crop files are 1000×1500 JPGs in `pinterest-assets/crops/`. Filenames from `crops-index.json`.

| Pin # | Board | Current Problem | Replace With Crop File | Priority |
|---|---|---|---|---|
| 1 | Voynich | Landscape 1200×630 folio scan | `voynich-f1r.jpg` | P0 |
| 2 | Voynich | Landscape 1200×630 folio scan | `voynich-f68r3.jpg` | P0 |
| 3 | Voynich | Landscape 1200×630 folio scan | `voynich-rosette.jpg` | P0 |
| 4 | Voynich | Landscape 1200×630 (likely generic or readalike image) | **NO MATCHING CROP** — see note below | P1 |
| 5 | Voynich→Literary | Landscape 1200×630 book cover | `book1-pb.jpg` | P0 |
| 6 | Prague | Landscape 1200×630 Strahov OG | `strahov-og.jpg` | P0 |
| 7 | Prague | Landscape 1200×630 Strahov OG (same source as Pin 6) | `strahov-og.jpg` | P1 |
| 8 | Prague | Landscape 1200×630 Strahov OG (same source as Pin 6) | `strahov-og.jpg` | P1 |
| 9 | Prague | Landscape 1200×630 Codex Gigas OG | `codex-gigas-og.jpg` | P0 |
| 10 | Prague | Landscape 1200×630 Ars Notoria scan | `ars-notoria-3.jpg` | P0 |
| 11 | Literary | Landscape 1200×630 omnibus cover | `omnibus-hc.jpg` | P0 |
| 12 | Literary | Landscape 1200×630 (likely generic or readalike image) | **NO MATCHING CROP** — see note below | P1 |
| 13 | Literary | Landscape 1200×630 book cover | `book2-pb.jpg` | P0 |
| 14 | Literary | Landscape 1200×630 book cover | `book3-pb.jpg` | P0 |
| 15 | Literary | Landscape 1200×630 111 Hz OG | `111hz-og.jpg` | P1 |
| 16 | Frequency | Landscape 1200×630 cymatics OG | `cymatics-og.jpg` | P0 |
| 17 | Frequency | Landscape 1200×630 Gospel of Thomas OG | `gospel-thomas-og.jpg` | P0 |
| 18 | Frequency | **DUPLICATE IMAGE (cymatics.png, same as Pin 16)** | `field-notes-hub-og.jpg` (**fixes both aspect ratio AND duplicate**) | P0 |
| 19 | Frequency | Landscape 1200×630 Ars Notoria scan | `ars-notoria-3.jpg` | P1 |
| 20 | Voynich | Landscape 1200×630 folio scan | `voynich-f27r.jpg` | P0 |
| 21 | Voynich | Landscape 1200×630 folio scan | `voynich-f88r.jpg` | P0 |
| 22 | Voynich | Landscape 1200×630 folio scan | `voynich-f99r.jpg` | P0 |
| 23 | Literary | Landscape 1200×630 omnibus cover | `omnibus-hc.jpg` | P0 |
| 24 | Literary | Landscape 1200×630 Field Notes hub OG | `field-notes-hub-og.jpg` | P1 |
| 25 | Prague | Landscape 1200×630 book cover | `book1-pb.jpg` | P1 |

### Pins with no matching crop (2 gaps)

**Pin 4** ("Books Like Foucault's Pendulum") — This pin links to `/books/books-like-foucaults-pendulum/`. The media manifest doesn't include an entry for this URL's OG image. **Fix:** Either add a crop entry for the books-like page OG image, or use `omnibus-hc.jpg` as a substitute (the omnibus cover works as a "here's the book" visual for readalike pins). Better long-term: create a designed Template C quote card for this pin ("Books Like Foucault's Pendulum" text on dark academia background).

**Pin 12** ("For Fans of The Historian") — Links to `/books/masters-x/`. Same gap — no OG image crop specifically for the series landing page. **Fix:** Use `omnibus-hc.jpg` (the omnibus cover represents the trilogy). Or create a designed Template B pin (book cover + comp line).

### Workflow for image retrofit
1. Open each pin on Pinterest (click pin → Edit pin)
2. Click the image → Replace image
3. Upload the crop file from `pinterest-assets/crops/`
4. Save
5. Do P0 pins first (15 pins), then P1 (10 pins)
6. Estimated time: ~20 minutes for all 25

---

## 5. DESIGN BRIEF — D-06 THROUGH D-15

D-01..D-05 are complete. These 10 designed pins complete the original Phase 1 production queue. Follow the same template specs (A/B/C/D), color palette, typography, and safe-zone rules from Phase 1 §6.

| ID | Board | Template | Image Source | Headline (≤8 words) | Title (≤100 chars) | Description (≤500 chars) | Destination URL | Alt Text | Hashtags |
|---|---|---|---|---|---|---|---|---|---|
| D-06 | Prague | A | `/folios/arsnotoria/Ars_Notoria_Screenshot_3.png` | Medieval Cognitive Technology | Ars Notoria — The Medieval Book of Memory and Illumination | Solomonic grimoire tradition: geometric notae designed as cognitive exercises. Not magic — medieval information architecture. British Library copies documented. Real history Field Note with sourced research. Companion to Masters X Vol II. | `/field-notes/ars-notoria/` | Ars Notoria geometric notae compendium medieval manuscript page | #MedievalManuscripts #ArsNotoria |
| D-07 | Literary | B | `/covers/omnibus-hardcover-v3.png` | Three Manuscripts. Seven Cities. One System. | Masters X Trilogy — Literary Conspiracy Thriller, Complete Omnibus | 686 pages. Kansas City → Prague → 61 countries. Where the Voynich Manuscript, the Ars Notoria, and a sealed 13th-century crypt converge. For readers of Eco, Kostova, and Crouch. Kindle, paperback, hardcover — all formats available now. | `/books/masters-x/omnibus/` | Masters X trilogy omnibus hardcover edition by Jason Carroll Holloway | #LiteraryThriller #ConspiracyThriller |
| D-08 | Literary | B | `/covers/book1-paperback.png` | Kansas City to Prague. One Frequency. | The Inheritance of Frequency — Masters X Vol I | A fired security guard inherits classified acoustic research linking SubTropolis carvings to a Prague crypt sealed since 1267. Literary conspiracy thriller for readers of Foucault's Pendulum and The Historian. Kindle $6.99, paperback, hardcover. | `/books/masters-x/the-inheritance-of-frequency/` | The Inheritance of Frequency paperback cover Masters X Vol I | #LiteraryThriller #FoucaultsPendulum |
| D-09 | Literary | C | — (text-only card) | Books Like Foucault's Pendulum | Literary Conspiracy Thrillers for Eco, Kostova, and Brown Readers | Looking for fiction with real manuscripts, European settings, and intellectual depth? Readalike list featuring literary conspiracy novels plus the Masters X trilogy. Not Dan Brown pace — Umberto Eco patience. Free reading list article. | `/books/books-like-foucaults-pendulum/` | Text card: books like Foucault's Pendulum literary conspiracy thrillers | #FoucaultsPendulum #BookRecommendations |
| D-10 | Literary | C | — (text-only card) | Get the Opening Chapters Free | Masters X Vol I — Free Opening Chapters Delivered by Email | Start reading The Inheritance of Frequency. Opening chapters delivered free by email — no spam, unsubscribe anytime. Kansas City limestone, Voynich Manuscript, Prague crypt. The cost of perception is everything ordinary. | `/books/masters-x/the-inheritance-of-frequency/` | Text card: get free opening chapters of Masters X trilogy by email | #LiteraryThriller #FreeBooks |
| D-11 | Frequency | C | — (text-only card) | What Happens at 111 Hz? | 111 Hz — The Frequency in Ancient Stone Chambers Worldwide | Hypogeum Malta, Newgrange, Hal Saflieni — ancient chambers that resonate at 111 Hz. Real archaeoacoustics research, documented and sourced. Free Field Note from the research archive behind the Masters X trilogy. | `/field-notes/111-hz/` | Text card: 111 Hz frequency in ancient stone chambers archaeoacoustics | #Archaeoacoustics #111Hz |
| D-12 | Frequency | A | `/og/field-notes/cymatics.png` | Sound You Can See. Real Physics. | Cymatics — Chladni Figures and Visible Sound Patterns Since 1787 | Sand on a metal plate. A violin bow at the edge. Resonant frequency. Geometric patterns emerge from nowhere. Ernst Chladni documented it in 1787. Hans Jenny coined "cymatics" in the 1960s. The physics is real. Free Field Note. | `/field-notes/cymatics/` | Cymatics Chladni figures sand patterns on vibrating metal plate | #Cymatics #SoundScience |
| D-13 | Voynich | A | `/folios/voynich/Vol 2/voynich2-000.jpg` | Voynich Astronomical Section — f27r | Voynich Manuscript Astronomical Diagrams — Beinecke MS 408 f27r | Circular astronomical diagrams from the Voynich Manuscript's second section. Beinecke MS 408, folio f27r. Undeciphered for 600 years. Explore all 181 folios interactively in the free Analysis Chamber folio visualizer. | `/chamber/folio-visualizer/` | Voynich Manuscript folio f27r astronomical circular diagram Beinecke MS 408 | #VoynichManuscript #MedievalAstronomy |
| D-14 | Prague | D | `/og/field-notes/codex-gigas.png` | The Devil's Bible — Codex Gigas | Codex Gigas: Medieval Bohemia's Largest Manuscript, the Devil's Bible | From medieval Bohemia to the Swedish Royal Library. The largest extant medieval manuscript, with its famous full-page devil illustration. Emperor Rudolf II owned this AND the Voynich. Real history Field Note — free. | `/field-notes/codex-gigas/` | Codex Gigas Devil's Bible medieval manuscript illustration | #CodexGigas #MedievalHistory |
| D-15 | Frequency | A | `/folios/arsnotoria/Ars_Notoria_Screenshot_5.png` | Hexagonal Geometry in a Medieval Grimoire | Harmonic Stack — Ars Notoria Notae as Acoustic Specifications | 14 geometric notae from the Ars Notoria analyzed as frequency patterns. Hexagonal trefoil network. Layer I of the Analysis Chamber — free interactive tool. Companion to Masters X Vol II: The Grimoire. | `/chamber/harmonic-stack/` | Ars Notoria hexagonal trefoil network notae geometric pattern | #ArsNotoria #SacredGeometry |

### Design agent instructions
- Run `generate_pinterest_designed_pins.ps1` with the updated pin specs above
- Use the same 4 templates established by D-01..D-05
- Verify all output is 1000×1500 px, key text clears the bottom 15% safe zone
- For Template A pins: folio scan full-bleed with dark overlay on bottom 25%, folio ref in gold serif, hook in white sans
- For Template B pins: book cover centered at ~60% height, comp line above, dark background with manuscript texture
- For Template C pins: cream background, large serif hook text, thin gold rule, sans-serif context line
- For Template D pins: OG image top 65%, text block on solid panel bottom 35%, location in small caps

---

## 6. WAVE 3 REMAINING CONCEPTS

D-01..D-05 covered W3-01 (Voynich overview), W3-02 (Rosette), W3-03 (Rudolf II), W3-04 (Strahov), and W3-05 (Hidden Prague). D-06..D-15 cover W3-06 (Ars Notoria), W3-07 (Codex Gigas), W3-08 (Omnibus), and several Literary/Frequency concepts. Below are 12 additional concepts NOT yet covered by any designed pin:

| ID | Title | Hook | Destination | Board | Suggested Template | Asset |
|---|---|---|---|---|---|---|
| W3-R01 | Books Like The Da Vinci Code (But Better Written) | Provocative comp targeting massive search volume ("books like da vinci code") | `/books/books-like-foucaults-pendulum/` | Literary | C (text card) | None needed |
| W3-R02 | 5 Conspiracy Thrillers with Real History | Listicle-format pin; positions Masters X among comp titles | `/books/masters-x/` | Literary | C (text card) | None needed |
| W3-R03 | Summer Reading 2026: Literary Thrillers Worth the Commitment | Seasonal discovery pin (replace "Summer" with current season as needed) | `/books/masters-x/` | Literary | C (text card) | None needed |
| W3-R04 | From Kansas City to Prague — One Thriller's Geography | Setting-as-hook for readers who love place-driven fiction | `/books/masters-x/the-inheritance-of-frequency/` | Literary | D (travel/photo style) | `strahov-og.jpg` or new KC image |
| W3-R05 | Chladni Figures: Sound Made Visible Since 1787 | Science-beauty pin with high shareability among physics/art crossover audiences | `/field-notes/cymatics/` | Frequency | A (with cymatics OG) | `cymatics-og.jpg` |
| W3-R06 | Hypogeum Malta — 5,000-Year-Old Acoustic Chamber | Travel + archaeoacoustics crossover; high curiosity hook | `/field-notes/111-hz/` | Frequency | D (travel/photo style) | New: need Hypogeum image or use 111 Hz OG |
| W3-R07 | Gospel of Thomas — "The Kingdom Is Already Here" | Nag Hammadi curiosity hook for seekers, scholars, and dark academia | `/field-notes/gospel-of-thomas/` | Frequency | C (text card with Saying 113 as hook) | None needed |
| W3-R08 | Voynich Botanical Folios — Plants That Don't Exist | Visual beauty + mystery; targets "voynich manuscript plants" search | `/chamber/folio-visualizer/` | Voynich | A (folio hero) | Crop any Vol 1 botanical folio (f2r, f5r, f9r — not already used) |
| W3-R09 | What Is Dark Academia? Books, Libraries, Manuscripts | Dark academia aesthetic tag targets a large Pinterest subculture | `/field-notes/voynich-manuscript/` | Voynich | C (text card) | None needed |
| W3-R10 | Strahov Monastery — Chained Books and Barrel Vaults | Different angle from D-04/D-05; focuses on chained-library tradition | `/field-notes/strahov-monastery/` | Prague | D | `strahov-og.jpg` |
| W3-R11 | Masters X Vol II: The Grimoire — Enter the Strahov Crypt | Volume-specific conversion pin not yet on the board | `/books/masters-x/the-grimoire/` | Literary | B (book cover) | `book2-pb.jpg` |
| W3-R12 | Masters X Vol III: The Kingdom — Sixty-One Countries | Volume-specific conversion pin for finale | `/books/masters-x/the-kingdom/` | Literary | B (book cover) | `book3-pb.jpg` |

### Dedup check
- W3-R01, W3-R02, W3-R03, W3-R09 are text-card pins — no image overlap risk
- W3-R04 uses Strahov OG but goes on Literary board (not Prague), so no same-board image duplicate
- W3-R08 must use a folio NOT already assigned (f1r → Pin 1/D-01, f68r3 → Pin 2, f85v-86r → Pin 3/D-02, f27r → Pin 20/D-13, f88r → Pin 21, f99r → Pin 22). Use f2r, f5r, f9r, or any other botanical folio from Vol 1.
- W3-R11/R12 use book2/book3 covers on Literary board — check that Pins 13/14 (which already link to these URLs) are on the same board. If so, these are duplicate destination URLs on the same board and MUST link to different URLs. **Solution:** Link W3-R11 to `/books/masters-x/the-grimoire/` only if Pin 13 links there too. If duplicate, W3-R11 becomes an edit/redesign of Pin 13 (replace its image with a designed Template B pin), not a new pin.

---

## 7. 30-DAY CHECK-IN TEMPLATE

### When to run: August 19, 2026 (30 days after Phase 1 audit)

### Screenshots needed from Pinterest Analytics

1. **Overview tab** — screenshot the 30-day summary showing: Impressions, Engagements, Outbound clicks, Saves, Pin clicks
2. **Top Pins** — sort by Saves, screenshot top 10. Then sort by Outbound clicks, screenshot top 10.
3. **Top Boards** — screenshot board-level engagement breakdown
4. **Audience insights** — screenshot the Interests, Age, Gender, and Location panels

### Fill-in performance review

```
PINTEREST 30-DAY PERFORMANCE — [DATE]

Total impressions (30 days): ___________
Total saves (30 days): ___________
Total outbound clicks (30 days): ___________
Total pin clicks (30 days): ___________

Top pin by saves: Pin ___ ("___________") — ___ saves
Top pin by outbound clicks: Pin ___ ("___________") — ___ clicks
Top board by engagement: ___________

Referral traffic from Pinterest (Cloudflare Analytics): ___ visits

Pin count live: ___ (target was 43 by Week 4)

Rich Pins status: Validated / Pending / Failed
Board descriptions pasted: Y / N
Display name updated: Y / N
Image retrofits complete: ___ / 25 pins
D-01..D-05 uploaded: Y / N
D-06..D-15 uploaded: Y / N
```

### Decision rules at day 30

**Which board to double down on:**
- Whichever board has the highest outbound clicks per pin (not total, per-pin average). That's your highest-converting audience segment.
- If Voynich board leads → create 5 more folio pins using unused folios from the visualizer database. Lean into "voynich manuscript explained," "beinecke ms 408," "undeciphered manuscripts" keywords.
- If Prague board leads → create 3–4 travel-angle pins targeting "most beautiful libraries europe," "prague hidden gems," "baroque architecture."
- If Literary board leads → create variant pins for each comp author (Kostova, Eco, Brown, Crouch) as separate pins with dedicated search terms.
- If Frequency board leads → create 3–4 more curiosity-hook pins targeting "cymatics," "111 hz," "archaeoacoustics," "sound healing science."

**Which pins to retire vs. variant:**
- Any pin with 0 saves AND 0 outbound clicks after 30 days → candidate for retirement or complete redesign. Check its image first — if it's still a landscape OG crop, the image is likely the problem, not the concept.
- Any pin with 5+ saves → create 2 more variant pins on the same topic with different headlines and fresh designed images. Same destination URL is fine (on a different board, or as a new pin replacing the original image).

**Go/no-go for Idea Pins:**
- GO if: any single pin has 20+ saves at day 30. Idea Pins (multi-page) work when you have a proven topic. Convert that topic into a 3–5 page Idea Pin sequence.
- NO-GO if: all pins under 10 saves. Focus on standard pin volume and image quality first.

**Go/no-go for email-capture pins (D-10 / W3-R01):**
- GO if: outbound clicks to `/books/masters-x/the-inheritance-of-frequency/` exceed 10 clicks at day 30. The funnel is working; add explicit email-capture pins.
- NO-GO if: under 5 outbound clicks total to book pages. Focus on discovery/curiosity pins first; the funnel needs more top-of-funnel traffic before capture pins justify their slot in the queue.

### Green flags at day 30
- 1,000+ impressions: Pinterest is indexing your content
- 10+ saves: Your topics resonate with someone
- 5+ outbound clicks: The funnel is converting attention into site visits
- Any single pin with 10+ saves: Template for future pins identified

### Red flags at day 30
- Under 500 impressions: Board descriptions may not be pasted, or keywords are too niche. Check board SEO.
- 0 outbound clicks: Pin CTAs may be weak, or landing pages aren't loading (check for 404s).
- Saves but no clicks: Pins are pretty but don't motivate action. Strengthen CTAs in descriptions.

---

## 8. REVISED GRADE + TOP 5 ACTIONS THIS WEEK

### Revised score (assuming Week 1 foundations completed)

| Dimension | Phase 1 Score | Revised Score (post-execution) | Change |
|---|---|---|---|
| Profile completeness | 4/5 | **5/5** | Rich Pins validated, display name optimized, both domains claimed |
| Board architecture | 4/5 | **4.5/5** | Board descriptions pasted, cover images set. (Held from 5 because Frequency board name could still be better for search.) |
| Pin quality | 2/5 | **3.5/5** | 25 pins retrofitted with 1000×1500 crops + 5 designed pins with text overlay. Still not 4/5 because only 5 of ~30 pins have designed templates; the rest are simple crops without text overlay. |
| SEO & discoverability | 3/5 | **4/5** | Board descriptions live, 12 pins with improved metadata, Rich Pins pulling article data. |
| Link strategy | 5/5 | **5/5** | Unchanged — already best-in-class. |
| Brand consistency | 3/5 | **3.5/5** | D-01..D-05 establish brand templates, but only 5 of 30 pins carry the brand treatment. Improves to 4/5 when D-06..D-15 are live. |
| Compliance | 5/5 | **5/5** | Unchanged — exemplary. Pin 18 image fix resolves the last duplicate. |
| Competitive gap | 3/5 | **3.5/5** | 30 pins (25 retrofitted + 5 designed) still below the 50-pin algorithm threshold, but closing. Wave 3 remaining concepts (Section 6) push toward 45–50. |

**Revised overall: 34/40 → B+**

Path to A (38+/40) requires: D-06..D-15 designed and uploaded (Pin quality → 4/5, Brand → 4.5/5), Wave 3 remaining concepts (Competitive gap → 4/5), and 60+ days of indexing time for SEO scores to mature.

### Top 5 Actions This Week (priority order)

**1. DEPLOY THE SITE** (blocks everything downstream)
Run `wrangler deploy`. Then verify folio-visualizer OG tags are live in incognito. Then verify Grimoire/Kingdom/Omnibus OG images. If folio-visualizer still shows default OG after deploy, the `layout.tsx` fix didn't take — escalate to Cursor with the exact current output of `curl -s https://jasoncholloway.com/chamber/folio-visualizer/ | grep og:`.

**2. VALIDATE RICH PINS ON 4 URLS IMMEDIATELY** (even before deploy fixes URL 5)
Paste these into `developers.pinterest.com/tools/url-debugger/` right now:
- `https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/` (Vol I — OG is live)
- `https://jasoncholloway.com/field-notes/voynich-manuscript/`
- `https://jasoncholloway.com/field-notes/strahov-monastery/`
- `https://jasoncholloway.com/field-notes/cymatics/`

If all 4 pass → Apply for Rich Pins. Add URL 5 (folio-visualizer) after deploy.

**3. PASTE BOARD DESCRIPTIONS + UPDATE DISPLAY NAME** (15 minutes)
Copy-paste from `pinterest-p1-admin-checklist.md` §1 and §2. This is the lowest-effort, highest-impact SEO action remaining.

**4. RETROFIT PIN IMAGES** (20 minutes)
Replace images on the 15 P0-priority pins (Section 4 above) with crop files from `pinterest-assets/crops/`. Then do the 10 P1 pins. Fix Pin 18 image (swap to `field-notes-hub-og.jpg`).

**5. UPLOAD D-01..D-05** (10 minutes)
Follow the copy from `pinterest-wave3-design-batch.md`. Upload the 5 designed JPGs, paste title/description/alt/hashtags, assign to correct boards. Schedule 1/day over the next 5 days.

### After this week: hand D-06..D-15 specs (Section 5 above) to Cursor/design agent for generation. Then upload Wave 3 remaining concepts (Section 6) over weeks 3–4. You'll cross 45 pins and be solidly in B+ territory with a clear runway to A by day 60.

---

*Phase 2 complete. All 8 sections delivered. Next checkpoint: 30-day review (August 19, 2026).*
