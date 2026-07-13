# INTERIOR SPECIFICATION SHEET
## The Masters X Universe Encyclopedia
**Seventh City Press LLC · as-typeset July 10, 2026**

## 1. Trim, block, margins

| Item | Value |
|---|---|
| Trim size | 7.000 × 10.000 in (504 × 720 pt) |
| Bleed | None (interior has no bleeding elements; all content inside text block) |
| Text block | 5.125 × 8.150 in (369 × 586.8 pt) |
| Inner (gutter) margin | 1.000 in |
| Outer margin | 0.875 in |
| Top margin | 0.950 in (running head sits inside it, baseline ~0.14 in above block) |
| Bottom margin | 0.900 in (DF foot chrome sits inside it) |
| Index setting | Two columns, 2.4375 in each, 0.25 in gutter, mirrored |

## 2. Typeface manifest (all SIL OFL — commercial embedding cleared)

| Role | Face | Sizes in use |
|---|---|---|
| Display, heads, labels | Cinzel Regular / SemiBold / Bold (static instances from VF) | 6.8–26 pt |
| Body text | EB Garamond Regular / SemiBold / Italic (static instances from VF) | 8.6–13 pt; body 10.5/14 justified |
| DF facsimile, flags, ISBNs | Courier Prime Regular / Bold / Italic | 5.2–13 pt; DF prose 8.2/11 |

Fonts are TrueType, subset-embedded in the PDFs. Note: Cinzel and Courier Prime carry no
U+2002/2004/2009 space glyphs — all letterspacing is plain-space tracking by design; do not
reintroduce typographic spaces in these faces.

## 3. Page counts (as typeset)

| Edition | Typeset | Submit to Ingram (even) |
|---|---|---|
| A — Standard | 369 | **370** |
| B — Collector (adds limitation leaf + blank verso) | 371 | **372** |

Projected final extent after Pass 3 (entry tranche 3 at +53–83 entries, Essays 3–7 in
prose, frequency tables set from JSON): **560–680 pages** — comfortably under Ingram's
840-page ceiling for 7 × 10 B&W case laminate. See PAGE_COUNT.txt for the section ledger.

## 4. Pagination rules (enforced in the build)

1. Front matter in lowercase roman; arabic restarts at 1 on the first entry page.
2. Every part, section, essay, and apparatus division opens **recto**; blank versos are
   inserted automatically and run blind.
3. DF pagination is sacrosanct: one DF source page per book page, 251 pages, so
   *DF* pp. 1–247 cite identically in every edition and printing.
4. Openers, blanks, title/copyright/epigraph pages run blind (no folio, no running head).

## 5. Paper and print route (Edition A)

- **IngramSpark, B&W book block, 50 lb white** (512 PPI per Ingram Paper Specs rev.
  8/18/23) — chosen over crème for the working-file aesthetic and the thinner spine at
  projected length. Crème 50 lb (444 PPI) remains an approved alternate; see
  SPINE_CALCULATION.md for both.
- Binding: case laminate (Ingram's 7 × 10 jacketed ceiling is 6.14 × 9.21 — jacketed
  hardcover is not available at this trim; the collector jacket need is met by Edition B's
  vendor instead).

## 6. File state and remaining prepress steps

The two PDFs in this folder are **press-proofs**: correct geometry, embedded subset fonts,
K-only content, final pagination for current content. Before upload:

1. **PDF/X-1a:2001 export** — run Ghostscript conversion or export from InDesign after any
   Pass 3 re-flow; embed OutputIntent (Ingram accepts standard CMYK intents for B&W blocks).
2. Resolve or consciously retain the printed `[NEEDS SOURCE]` / `[AUTHOR VERIFY]` flags.
3. Replace ISBN placeholder `979-8-XXXXXXX-XX-X` on the copyright page (new ISBN required —
   do not reuse a trilogy ISBN).
4. Set frequency tables from `frequency_bands.json`; assign index locators; re-run the
   recto-parity pass (automatic in the build pipeline).

## 7. Build pipeline (reproducibility)

`/home/claude/build/` — `engine.py` (geometry, templates, chrome), `dfset.py` (DF facsimile
+ table reconstruction), `content.py` (parsers/builders), `main.py` (orchestrator with
recto-parity solver and two-pass contents). Deterministic: same inputs → same pagination.
A copy ships in this package under `pipeline/` for the Pass 3 re-flow.
