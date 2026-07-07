# Distribution File Implementation Prompt
## For the Antigravity IDE agent — taking the distribution file live on jasoncholloway.com

### Context

Three deliverables are ready for deployment on jasoncholloway.com:

1. **The Distribution File** (`The_Distribution_File.pdf`) — a 247-page (251 total with front matter) in-universe research document. This is the file Andrew Chen released at midnight in Book III, Chapter 14. It is the lead magnet: visitors sign up to receive it.

2. **The Reading Sequence** (`reading-sequence.html`) — an indexable HTML page listing the 15 texts in the Foundation's reading sequence, each annotated. Deploys at `/chamber/reading-sequence/`.

3. **The Harmonic Frequency Derivations** (`harmonic-derivations.html`) — an indexable HTML page presenting the 8-harmonic stack, the calibration data, and the 5-site cathedral cross-reference. Deploys at `/chamber/harmonic-derivations/`.

The PDF is the gated download. The two HTML pages are the open, crawlable front door that earns search traffic and funnels visitors to the gated download. This architecture is deliberate: Google indexes the HTML; the HTML links to the download; the download is gated by a signup form.

### What to Deploy

#### 1. The PDF
- Place `The_Distribution_File.pdf` in `public/downloads/` (or equivalent static asset path)
- This file should NOT be freely linked — it is behind a signup gate
- File size: ~1.1 MB, 251 pages

#### 2. Reading Sequence Page
- Deploy `reading-sequence.html` as a Next.js page at `/chamber/reading-sequence/`
- Convert the HTML to a Next.js component (App Router: `src/app/chamber/reading-sequence/page.tsx`)
- Preserve the JSON-LD structured data in a `<Script>` tag
- Preserve all semantic HTML (`<article>`, `<ol>`, `<h1>`, `<h3>`)
- The page contains 15 annotated text entries (not 23 — this was corrected against the manuscript)
- Links at the bottom point to `/chamber/harmonic-derivations/` and `/chamber/research-archive/`

#### 3. Harmonic Derivations Page
- Deploy `harmonic-derivations.html` as a Next.js page at `/chamber/harmonic-derivations/`
- Convert to `src/app/chamber/harmonic-derivations/page.tsx`
- Preserve the JSON-LD (Article + Dataset schema)
- The page contains 8 harmonics on the series (111.2 → 889.6 Hz), NOT 14 — this is canon-correct
- Links to `/chamber/reading-sequence/` and `/chamber/research-archive/`

#### 4. Modify the Research Archive Page
The existing page at `/chamber/research-archive/` needs a download section added:
- Add a prominent "Download the Distribution File" call-to-action
- The CTA should gate behind an email signup (ConvertKit, Mailchimp, or a simple form — Jason's choice)
- After signup, deliver the PDF via email or direct download link
- Include a secondary offer: "Receive the first three chapters of each novel" alongside the file
- Style the CTA to match the site's existing design language (dark background, gold accents, the `f = 111.2 Hz` brand mark)

#### 5. Cross-link Everything
- `/chamber/research-archive/` → links to both new pages and the download CTA
- `/chamber/reading-sequence/` → links to harmonic derivations and research archive
- `/chamber/harmonic-derivations/` → links to reading sequence and research archive
- The `/press` page should mention the Analysis Chamber archive in its "About Seventh City Press" section
- Consider adding the distribution file to the site's main navigation under "Analysis Chamber"

#### 6. SEO Checklist
After deployment:
- [ ] Validate JSON-LD on both pages using Google Rich Results Test (`search.google.com/test/rich-results`)
- [ ] Submit both new URLs to Google Search Console for indexing
- [ ] Verify `<title>`, `<meta description>`, and Open Graph tags render correctly (use the OG debugging tools for Facebook and Twitter)
- [ ] Confirm canonical URLs are set on both pages
- [ ] Add both pages to the site's sitemap.xml
- [ ] Verify mobile rendering (the tables should scroll horizontally on narrow viewports)

### Canon Notes (Critical — Do Not Change)

These values were verified against the published manuscripts and must not be altered:

- **8 harmonics** on the series: 111.2, 222.4, 333.6, 444.8, 556.0, 667.2, 778.4, 889.6 Hz
- **NOT** 14 notae — the earlier version of this file had a fabricated 14-frequency system
- **Specchi family** mirrors (Murano, 1340–1720), NOT "Moreau 12-mirror configuration"
- **Father Benjamin Moreau** built St. Francis Parish in KC West Bottoms (the 1843 mirror commission predates him by 27 years)
- **45 BPM** cardiac threshold, NOT 40 BPM
- **No session time limit** — there is no "Volkov session limit"
- **Nadia Volkov** = institutional architect, Blake's partner
- **Sabrina Volkov, M.D.** = clinical director, Nadia's sister-in-law (different characters)
- **Maryland incident** = Completion Sect (antagonists), NOT Foundation candidates
- **15 texts** in the reading sequence (starting with Sirach), NOT 23
- **5 cathedral sites** (Chartres 108.0, Reims 111.8, Uppsala 109.0, Barcelona 110.3, Montserrat 112.1), NOT 2
- **Creative Commons** licensing (the manuscript says "Creative Commons," the archive page says CC0 — use "Creative Commons" in body text)

### Files Provided
- `The_Distribution_File.pdf` — the 247-page downloadable artifact
- `reading-sequence.html` — standalone HTML, convert to Next.js component
- `harmonic-derivations.html` — standalone HTML, convert to Next.js component
- `CANON_CORRECTIONS.md` — full correction specification with manuscript citations

### Design Integration
Both HTML pages use the existing site palette:
- `--ink: #1a1815`, `--gold: #8a6410`, `--paper: #fdfcf9`, `--panel: #f4efe4`
- Fonts: Cormorant Garamond (display), EB Garamond (body), Inter (UI), JetBrains Mono (data)
- The `f = 111.2 Hz` mark appears in the footer of both pages
- Match the existing site's dark hero, gold accents, and section divider treatment

### What NOT to Do
- Do not change the text content of the PDF
- Do not expose the PDF as a direct, ungated download link
- Do not alter the JSON-LD structured data
- Do not change the harmonic frequencies, reading list, or canon-critical values listed above
- Do not add "Omniscript LLC" anywhere — the imprint is "Seventh City Press" only
