# INTERIOR SPECIFICATION — 8.5 × 11
## The Masters X Universe Companion · The Resonant Frequency Dictionary
**Seventh City Press LLC · Pass 2, July 10, 2026 · supersedes Pass 1 `INTERIOR_SPEC.md` (7×10)**

## 1. Trim and page geometry (both products)

| Item | Companion | Dictionary |
|---|---|---|
| Trim | 8.5 × 11 in (612 × 792 pt) | same |
| Finished size note | Ingram lists 8.625 × 11.25 finished; **BookVault is primary — confirm finished/board sizes on their template** | same |
| Inner (gutter) margin | 1.000 in | 1.000 in |
| Outer margin | 0.875 in | 0.750 in |
| Top margin | 1.000 in | 0.950 in |
| Bottom margin | 0.950 in | 0.850 in |
| Text block | 6.625 × 9.05 in | 6.750 × 9.20 in |
| Columns | Entries/index two-column (0.3 in gutter); essays & front matter single column inset 52 pt each side | Two-column throughout (0.3 in gutter, 3.225 in columns) |
| Bleed | None (no bleeding interior elements) | None |

## 2. Type scale

**Companion** — Pass 1 system re-homed, not shrunk-to-fit:
entries EB Garamond 9.8/12.8 justified in two columns with Cinzel SB 10.2 heads and small-cap
register lead-ins; essays EB Garamond 11/15.2 on the inset single-column measure with Cinzel
small-caps lead-ins; DF facsimile Courier Prime (shrink-fit per page); running heads Cinzel 7.2
letterspaced over 0.5 pt rule, folios EB Garamond 9.5 outer.

**Dictionary** — compact display rule per Rev. 3 (no Cinzel entry heads at density):
headword **EB Garamond SemiBold 9/10.6** + syllables + Hz (Garamond 9) + phonemes (Courier
Prime 7.2) on one line where it fits; band tags Garamond 7.6/9.2 indented 10 pt in the compact
key (`Sol·`, `MF·`, `QHC·`, `Lloyd·`, `Chakra·`, brainwave unprefixed — key printed in every
volume's How to Read an Entry page). Letter openers: Cinzel Bold 64 pt initial + rule + entry
count. Running heads: series title (verso) / `VOL. n · RANGE` (recto) in Cinzel 7.0, **guide
words** (first–last headword) in Garamond SB 8.6 at the outer position, folios outer.

## 3. Page counts (as typeset, this pass)

| Product | Typeset | Submit (even) |
|---|---|---|
| Companion | 357 | **358** |
| Dictionary Vol. 1 · A–D | 546 | 546 |
| Dictionary Vol. 2 · E–M | 714 | 714 |
| Dictionary Vol. 3 · N–Z (+ Prayers, research notes, Appendices A–G) | 802 | 802 |
| **Dictionary set** | **2,062** | — |

Dictionary volumes already end on even counts (enforced in build). Companion lands under the
~400–450 estimate because the two-column entry setting at this trim is more efficient than the
single-column assumption behind the estimate; the DF appendix is unchanged at 251 book pages.

## 4. Structure

**Companion (Rev. 3 / Option B / 4b locked):** front matter (half title, also-by, title,
copyright, epigraph, contents, How to Read This Book, A Note on Canon, **How to Use the
Resonant Frequency Dictionary**) → Part One, 69 annotated entries in six thematic sections,
two-register → Part Two, Essays 1–2 in prose, 3–7 cast off at 6 pp each → Part Three,
apparatus: **frequency tables set live from `frequency_bands.json`** (no FPO) under the
fiction/fact headnotes, annotated bibliography **with the Pass 2 citations addendum
integrated**, two-column index, About the Author + ISBN matrix → **Part Four, the Distribution
File facsimile appendix**: opener + headnote + 251 pages, one source page per book page,
*DF* pp. 1–247 stable, DF chrome + marginal register rule per the Pass 1 system → colophon.

**Dictionary:** Vol. 1 carries the full preface (with the science/fiction seam note on its
first spread, per Rev. 3 §7) and epigraphs; every volume carries half title, volume title,
copyright, and the How to Read an Entry key; Vol. 3 closes with the print master's back
matter — Prayers & Sacred Words, Healing Words, Sigil Research, Symbology Research, and
Appendices A–G. **No essays, no encyclopedia entries in any dictionary volume.**

## 5. Pagination rules

Companion: roman front matter → arabic restart at Part One; all 25 division openers recto
(solver-enforced); DF pagination sacrosanct. Dictionary: single arabic sequence per volume;
letters open where the flow lands (dictionary convention) with the letter initial as divider;
entries begin recto after front matter; volumes end even.

## 6. Ink, paper, file state

K-only interiors throughout (no rich black, no color objects). Paper: 50 lb white B&W (512 PPI
per Ingram paper spec; **confirm BookVault equivalent bulk at RFQ** — spine math in
COMPANION_SPINE_CALCULATION.md carries the assumption explicitly). The PDFs in this folder are
**press-proofs**: final geometry and pagination for current content, embedded subset fonts.
Remaining prepress at order time: PDF/X export per BookVault's spec, ISBN placeholder
replacement (copyright pages + barcodes), resolution or retention of printed `[AUTHOR VERIFY]`
flags, and index locator assignment after any Pass 3 content change.

## 7. Source-data correction logged this pass

The dictionary print master's own per-letter counts (section headers, verified against a full
parse of the docx: **115,504 entries**) differ materially from the Letter A pagination report's
table (which showed A = 8,968 and E = 25,615). Authoritative counts: A = 6,132; largest letter
is **S = 12,286**; E = 3,907. The volume plan is built from the authoritative counts — see
DICTIONARY_VOLUME_PLAN.md and the updated LETTER_A_PAGINATION_REPORT.md.
