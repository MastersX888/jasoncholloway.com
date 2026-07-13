# DESIGN TEAM RECOMMENDATIONS
## The Masters X Universe Encyclopedia · Interior Design System
**Seventh City Press LLC · July 10, 2026 · Design review, all disciplines signed off**

This document records the design system as built into the typeset interiors
(`print/interior_7x10_EDITION_A.pdf`, 369 pp as-typeset / 370 Ingram, and
`print/interior_7x10_EDITION_B_COLLECTOR.pdf`, 371 / 372). Every decision below is
implemented, not proposed — the PDFs are the proof of concept at full length.

---

## 1. The governing idea: design the seam

The book's editorial premise is a two-register apparatus — fiction marked IN THE NOVELS,
documented research marked IN THE WORLD — and the design's single job is to keep that seam
visible on every page. Three visual languages, one per register plus one for the artifact:

| Register | Voice | Face |
|---|---|---|
| Display / structure | Roman inscriptional capitals — the "carved" register | **Cinzel** (Natália Raices) |
| Scholarly text | Mid-16th-c. French roman — the annotator's register | **EB Garamond** (Duffner/Pardo) |
| The Distribution File | Typewriter/laser-printed working file — the artifact's register | **Courier Prime** (Quote-Unquote Apps) |

All three are SIL OFL licensed — cleared for commercial embedding in both editions with no
license fee and no attribution requirement beyond the colophon courtesy already set.

**Rationale.** A reader flipping to any page can tell within a second whether they are in
the encyclopedia's voice or inside the in-universe document. That is the Eco/PKD-Exegesis
tradition the editorial plan invokes, executed typographically rather than by disclaimer.

## 2. Page architecture (7 × 10 in, both editions)

- **Text block:** 5.125 × 8.15 in (369 × 586.8 pt)
- **Margins:** inner (gutter) 1.000 in · outer 0.875 in · top 0.95 in · bottom 0.90 in.
  The 1-inch gutter is deliberate headroom: the projected final extent (560–680 pp once
  Pass 3 lands) is deep enough that Ingram's perfect-bound/case pinch would eat a 0.75 in
  gutter. All values clear Ingram's minimums with margin to spare.
- **Mirrored templates** throughout; parts, sections, essays, and apparatus all open recto,
  enforced programmatically (blank versos inserted where required).
- **Folios:** lowercase roman through the front matter; arabic restarts at 1 on the first
  entry page of Part One — standard scholarly-reference convention.
- **Running heads:** Cinzel 7.2 pt letterspaced caps over a 0.5 pt rule; verso carries the
  part, recto carries the section; folio in EB Garamond 9.5 at the outer corner. Openers
  and display pages run blind (no chrome).

## 3. Part One — entry typography

- **Entry head:** Cinzel SemiBold 11.5 pt caps, flush left, with a 30%-measure 0.6 pt
  hairline beneath. Not letterspaced — Cinzel's fitting is already wide, and multi-word
  headwords ("FIFTY-TWO-WEEK PRODUCTION PROTOCOL") must not wrap ugly.
- **Registers:** run-in small labels, Cinzel 7.4 pt — IN THE NOVELS / IN THE WORLD — then
  EB Garamond 10.5/14 justified. The label is the seam-marker; it repeats on every entry
  without exception.
- **Cross-references:** EB Garamond Italic 9.3/12, indented, under a Cinzel 6.8 pt
  CROSS-REFERENCES label.
- **Source flags:** `[NEEDS SOURCE]` / `[AUTHOR VERIFY …]` set in Courier Prime Bold 7.6 pt
  exactly where they occur. Printed, not hidden, per the canon note. These are proof-stage
  flags and must be resolved or consciously retained before upload.
- **Section structure:** the two drafting tranches are merged into seven thematic sections
  (Persons; Places & Geography; The Frequency System; Factions & Institutions; Objects &
  Documents; Texts & Traditions; Hidden Architectures), entries alphabetized within each.
  69 entries as typeset.

## 4. Part Two — the Distribution File facsimile (the book's signature)

Rev. 2 of the integration plan calls for the full 247-page DF reset whole. The build does
exactly that: **one source page = one book page**, 251 pages total (247 numbered + 4 roman
DF front pages), so the citation convention *DF* pp. 1–247 is stable in print.

- **Chrome flip:** on DF pages the encyclopedia recedes. Header becomes the File's own —
  `THE DISTRIBUTION FILE` / current DF part in Courier Bold over a rule. Foot carries
  `f = 111.2 Hz` centered, the **DF folio** prominent at the outer corner, and the
  encyclopedia's folio demoted to small bracketed type at the inner corner.
- **Marginal register rule:** every DF page carries a rotated 6.3 pt italic rule in the
  outer margin — *"in-universe document · for the research behind it, see the entry
  cross-references."* The seam stays visible even mid-artifact.
- **Table reconstruction:** the source capture flattened the File's data tables into token
  streams. The typesetting engine detects repeating header groups (e.g. `Hz GAIN COH` × 4)
  and single wide headers (`# DATE SITE CANDIDATE …`), rebuilds the original grids, and
  sets them in Courier at 5.2–7 pt with group rules — a faithful reset, not a scan.
  Prose pages preserve the File's line structure. Every page shrink-fits its frame, so
  pagination can never drift.

## 5. Part Three — essays

Essay openers: essay number in letterspaced Cinzel, rule, Cinzel Bold title, italic
subtitle, and a Courier SOURCES block naming the research-library files. First paragraph
opens with a five-word Cinzel small-caps lead-in (the classic literary convention; chosen
over drop caps, which fight justified Garamond at this measure). Essays One and Two are
typeset in full; Essays Three–Seven are **cast off at 6 pages each** with title leaf,
abstract, and galley-reserved pages, so the pagination model already carries their weight.

## 6. Part Four — apparatus

- **Frequency Tables:** the five fiction/fact headnotes set as entries, each followed by a
  `[TABLE FPO]` slug — the tables themselves live in `frequency_data/frequency_bands.json`,
  external to this package (per EXTERNAL_ASSETS.md). The Rev. 2 duplication-control note is
  set as the appendix's headnote: Masters-band derivations print once, in the DF
  (*DF* pp. 113–178); this appendix prints only what the DF does not contain.
- **Annotated Bibliography:** hanging-indent entries, file names in Courier, domain heads
  in Cinzel.
- **Index:** true two-column setting (separate two-frame page templates, mirrored), 8.8/11,
  locators flagged as draft pending final pagination.
- **About the Author** page includes the full Masters X ISBN matrix as a table — a
  collector-facing touch that also serves discovery.
- **Colophon** ("A Note on the Type") closes the book on a recto with the heptagram mark.

## 7. Ink and color discipline

Interior is **K-only** (true single-black, no rich black, no color objects) — correct for
Ingram's B&W book block and the cheapest path to the 840-page ceiling if Pass 3 runs long.
The brand's gold lives exclusively on the case (see COVER_PHASE_HANDOFF.md). This split —
austere working-file interior, black-and-gold ceremonial exterior — *is* the brand
statement for a book whose subject is a document.

## 8. What the design intentionally defers

- Final PDF/X-1a export happens at upload (see INTERIOR_SPEC.md §6).
- Frequency tables await the external JSON.
- Index locators await final pagination after Pass 3 content lands.
- Illustration program (maps, diagrams) remains an open author decision (budget flag in
  KNOWN_ISSUES); the grid accommodates full-measure figures without redesign.
