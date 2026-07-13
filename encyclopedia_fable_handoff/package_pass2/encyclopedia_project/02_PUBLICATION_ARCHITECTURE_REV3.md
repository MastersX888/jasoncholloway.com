# Masters X Universe Encyclopedia — Publication Architecture (Rev. 3)

**Date:** July 10, 2026  
**Author decision:** Jason Carroll Holloway  
**Status:** **Supersedes** Rev. 1–2 plans that centered annotated entries + in-book Distribution File at 7×10.

---

## 1. What this book is

**The Resonant Frequency Dictionary is the book.** Everything else is framing — published as a **separate Companion volume** (Option **B**, author confirmed July 10, 2026).

### Two products

| Product | ISBN | Contents | Scale |
|---------|------|----------|-------|
| **The Masters X Universe Companion** | TBD (1 vol.) | How to read; canon; annotated entries; essays; frequency tables; bibliography; index; **DF facsimile (4b)** | **~400–450 pp** @ 8.5×11 |
| **The Resonant Frequency Dictionary** | TBD (set + per-vol.) | Full A–Z dictionary only — **no** encyclopedia essays mixed in | **~3,156 pp** measured → **4–8 vol. box set** |

The Companion is the reader's **door**; the Dictionary is the **building**. Cross-references in the Companion point into dictionary headwords; dictionary volumes carry a minimal frontispiece (title, copyright, how to use) only.

| Layer (conceptual) | Lives in | Approx. scale |
|--------------------|----------|---------------|
| **Framing — narrative & apparatus** | **Companion** | ~150–300 pp |
| **Core — 115k headwords** | **Dictionary box set** | ~3,156 pp (measured) |
| **Distribution File** | **Companion** Part Four appendix (**4b locked**) | 247 pp source |

**Print only** until the author completes the print edition. Digital edition deferred.

**Trim:** **8.5 × 11 in** (Ingram finished size **8.625 × 11.25 in** — matches ~8.62 × 11.22 reference feel).

**Supersedes:** Fable July 2026 interior at **7×10** (`output/print/interior_7x10_*.pdf`) — layout reference only, not production path.

---

## 2. Primary source texts (authority order)

1. `sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx` — **authoritative print master** (13.9 MB)
2. `sources/resonant_frequency_dictionary.txt` — extracted text for grep/pipeline (~13.7M chars)
3. `sources/frequency_data/frequency_bands.json` — band tables for front apparatus
4. `sources/frequency_data/phoneme_formants.json`, `names_db.json` — dictionary companions
5. Annotated entries in `output/encyclopedia/01_ANNOTATED_ENTRIES/` — **framing**, not the core
6. `sources/distribution_file_fulltext.txt` — **back-matter candidate** or separate volume (no longer default center of book)
7. `CANON.md`, `universe_memory/`, `E:\Research\` — citation layer for front/back framing only

---

## 3. Dictionary scale (measured July 10, 2026)

| Metric | Value |
|--------|-------|
| Words (txt extract) | ~1,886,330 |
| Letter sections | A–Z (26) |
| **Headword entries** | **~115,504** (per section headers in source) |
| Entry format | `headword (syllables) Hz · phonemes · band tags` |

**Page projections (8.5×11, dictionary density):**

| Source | Estimated pages |
|--------|-----------------|
| **Letter A sample (measured)** | **~3,156** @ 36.6 entries/page |
| Early heuristic (~15 entries/page) | ~7,700 |
| Early heuristic (~500 words/page) | ~3,770 |

**Implication:** Multi-volume print work. Not a single upload — and not an Ingram box set (no slipcases, no matched short-run sets).

---

## 4. Print routes (Fable-aligned)

Fable's July 10, 2026 pass researched printers and locked a **two-tier model** for the old Edition A/B split. Rev. 3 maps that research onto the new two-product architecture:

| Fable (7×10) | Rev. 3 (8.5×11) | Printer |
|--------------|-----------------|---------|
| Edition A — Standard | **Companion (primary)** | See routes below |
| Edition B — Collector | **Dictionary box set** + premium Companion | **Non-Ingram bespoke** |

**Source docs:** `output/print/EDITION_B_COLLECTOR_SPEC.md`, `output/print/PUBLICATION_STATUS.md`, `output/print/INTERIOR_SPEC.md` §5.

### Primary route — bespoke (recommended)

**Vendor:** **BookVault Bespoke** (primary, per Fable). US alternates: **Bookmobile** (Minneapolis), **48 Hour Books**.

| Product | Why bespoke, not Ingram |
|---------|-------------------------|
| **Companion** | ~400–450 pp may exceed Ingram 8.5×11 page caps; full DF facsimile + premium materials (foil, sprayed edges, endpapers, ribbon) match Fable Edition B spec; **direct sales** per `EDITION_B_COLLECTOR_SPEC.md` §5 |
| **Dictionary set** | Multi-volume matched HC + **slipcase/box** — Ingram does not produce slipcases (`OPEN_DECISIONS.md` item 2; `01_PUBLICATION_PLAN.md` §3B) |

**Distribution:** jasoncholloway.com / Seventh City Press storefront. ISBNs assigned for cataloguing; wholesale optional later.

**Build sheet inherits Fable Edition B** (`EDITION_B_COLLECTOR_SPEC.md`): 8.5×11 trim, B&W 50# white, case bound (smyth-sewn if offered), black matte case + gold foil, sprayed black edges, heptagram endpapers, gold ribbon, black head/tail bands. Dictionary slipcase: matched set box with series title + volume list.

### Optional route — Ingram trade Companion only

A **stripped-down Companion** *without* collector extras could go **IngramSpark case laminate** for bookstore wholesale — **only if** final page count clears the 8.5×11 trim matrix (verify ≤400 pp for some HC configs; 4b DF makes this unlikely).

| Ingram-eligible | Ingram-excluded |
|-----------------|-----------------|
| Companion trade edition (case laminate, K-only, no slipcase) | Dictionary volumes |
| | Box set / slipcase |
| | Foil, sprayed edges, custom endpapers |
| | Numbered collector runs |

**Do not assume Ingram for the flagship program.** Treat Ingram as an optional downstream trade edition of the Companion, not the production default.

### Trim & binding (both products)

| Item | Value |
|------|-------|
| Trim | **8.5 × 11 in** (finished **8.625 × 11.25 in** on Ingram; confirm with bespoke vendor) |
| Interior | B&W K-only, 50# white — working-file aesthetic (Fable `DESIGN_TEAM_RECOMMENDATIONS.md` §7) |
| Typography | Cinzel / EB Garamond / Courier Prime (Fable interior system; adapt from 7×10 proofs) |

### Volume split — **Option B (locked)**

**Two products:** Companion (framing) + Dictionary (multi-volume box set).

| Component | Binding | Print route |
|-----------|---------|-------------|
| **Companion** | Single 8.5×11 HC | **BookVault Bespoke** (primary) · Ingram trade optional |
| **Dictionary** | Matched HC volumes + **slipcase/box** | **BookVault / Bookmobile / 48 Hour** — not Ingram |

**Dictionary volume split (measured Letter A sample, July 10, 2026):** **~36.6 entries/page** → **~3,156 total dictionary pages** → **~8 volumes @ 400 pp** or **~4 volumes @ 840 pp**. See `output/print/LETTER_A_PAGINATION_REPORT.md`.

**Box set metadata:** one **set ISBN** (UPC/EAN-13 for the slipcase) + **individual volume ISBNs** for each dictionary book. Companion gets its own ISBN.

~~Option A (alphabet volumes with framing in Vol. 1)~~ — rejected.  
~~Option C (phased A–C first)~~ — may still apply *within* the dictionary set (print Vol. 1–2 first as proof), but product architecture is B.

---

## 5. Companion volume — contents

Single book: **The Masters X Universe Companion** (working title). Condensed two-register framing:

- How to Read This Book / Note on Canon
- Frequency band tables from `frequency_bands.json` (with fiction/fact headnotes)
- **High-value annotated entries** (~40–80 of current 67; trim before print)
- Part Three essays 1–7 (point into dictionary headwords)
- Annotated bibliography + proper-name / frequency index
- About the Author · trilogy ISBN matrix
- **Part Four — Distribution File (4b locked):** full 247-pp facsimile appendix (*DF* pp. 1–247, one source page per book page)
- **Not included:** the 115k-entry dictionary (that is the box set)

Companion page estimate with 4b: **~400–450 pp** (framing ~150–200 + DF 247 + apparatus/index).

**Print:** BookVault Bespoke (Fable primary). RFQ at final page count; US alternates Bookmobile, 48 Hour Books. Optional stripped Ingram trade edition only if page count clears trim matrix.

---

## 6. Dictionary box set — contents

**The Resonant Frequency Dictionary** — dictionary volumes only:

- Per-volume: half-title, copyright, letter-range banner, entries
- Set-level: slipcase with series title, volume list, Companion cross-reference
- Source: `sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx`
- Minimal front matter per vol. (no essays, no encyclopedia entries)

Target retail: **TBD after volume count** — collector/reference premium pricing.

**Print:** Matched set quote from BookVault (primary) or Bookmobile / 48 Hour. **Does not go through Ingram** (per Fable Edition B §5, extended to full dictionary set).

---

## 7. Science / fiction seam (unchanged ethic)

The dictionary’s **phoneme layer** is grounded in CMU + Peterson & Barney / Hillenbrand. The **Hz assignments and “healing band” tags** are the project’s constructed taxonomy (documented in `frequency_bands.json`). Front matter must state this on page 1. Do not present Solfeggio/Grabovoi/chakra Hz as peer-reviewed medicine.

---

## 8. Immediate next steps

1. ~~**Author:** Confirm volume split~~ → **Option B locked.**
2. ~~**Author:** DF placement~~ → **4b locked:** full 247-pp DF facsimile in Companion appendix.
3. **Pipeline:** Build dictionary → InDesign/TeX flow from `.docx` or structured extract.
4. ~~**Sample vol:** Typeset Letter A~~ → **done** — `output/print/LETTER_A_PAGINATION_REPORT.md`, `dictionary_letter_a_sample_8.5x11.pdf`.
5. **Companion:** Trim 67 entries → ~40–80; typeset Companion proof at 8.5×11 (incl. DF 247 pp).
6. **Printer RFQ:** BookVault (+ Bookmobile, 48 Hour alternates) at final Companion + Dictionary page counts — per Fable `EDITION_B_COLLECTOR_SPEC.md` build sheet.
7. **ISBN block:** 1 Companion + 1 set + N dictionary volumes — assign before cover phase.

---

## 9. Files updated with Rev. 3

- `sources/frequency_data/` — copied from `E:\frequency_data\` (July 10, 2026)
- This document
- `01_PUBLICATION_PLAN.md` — add Rev. 3 pointer (full rewrite pending author volume decision)
- `output/HANDOFF_STATUS.md` — pivot logged
