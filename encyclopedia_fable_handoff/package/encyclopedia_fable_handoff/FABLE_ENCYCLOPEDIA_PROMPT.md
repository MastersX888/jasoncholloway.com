# FABLE — Masters X Universe Encyclopedia · Print Publication Pass

**Date:** July 10, 2026  
**Publisher:** Seventh City Press LLC  
**Author of record:** Jason Carroll Holloway  
**Scope:** Complete the encyclopedia manuscript, design the cover, and deliver **print-ready files for IngramSpark** — **not** website deployment, **not** trilogy novel work.

---

## Your role

You are the lead **publication producer** for *The Masters X Universe Encyclopedia: The Facts Behind the Fiction*. Cursor completed Pass 1 (Draft 1 entries) and Pass 2 partial (67 entries, 2 essays, Distribution File integration Rev. 2). **Your job is to finish the book and get it to the printer.**

**You deliver:**
1. Completed manuscript (entries, essays, apparatus, merged index)
2. Cover design (7×10 case laminate hardcover)
3. Interior layout specification + print PDFs meeting IngramSpark requirements
4. Metadata worksheet (ISBN placeholder, BISAC, description, keywords)
5. A concise `PUBLICATION_STATUS.md` log of what you finished and what still needs author sign-off

**Cursor integrates** your `output/` deliverables into the repo and coordinates IngramSpark upload after author review. **Do not** modify jasoncholloway.com.

---

## Read first (in order)

1. `KNOWN_ISSUES_AND_FIXES.md` — punch list (P0 → P2)
2. `CANON.md` — law for story facts, ISBNs, page counts, author spelling
3. `encyclopedia_project/output/HANDOFF_STATUS.md` — what's done vs. deferred
4. `encyclopedia_project/output/OPEN_DECISIONS.md` — author sign-offs; do not invent around these
5. `encyclopedia_project/01_PUBLICATION_PLAN.md` — trim, editions, Ingram constraints
6. `encyclopedia_project/output/encyclopedia/00_ENCYCLOPEDIA_TOC.md` — architecture
7. `encyclopedia_project/output/encyclopedia/02_DISTRIBUTION_FILE_INTEGRATION.md` — **Rev. 2** (full in-book DF default)
8. `design_memory/BRAND_SOURCE.md` + `design_memory/TRILOGY_COVER_BRIEF.md` — visual language (adapt for reference book, do not clone trilogy jacket art)
9. `universe_memory/00_INDEX.md` — research layer map
10. `EXTERNAL_ASSETS.md` — paths to files not in this zip

---

## Non-negotiable constraints

| Rule | Source |
|------|--------|
| **CANON.md** is law for story facts, trilogy ISBNs, omnibus page counts | Root canon |
| Author display name: **Jason Carroll Holloway** | CANON §1 |
| Imprint: **Seventh City Press LLC** | CANON §1 |
| Two-register entry format: **In the novels** / **In the world** | All `01_ANNOTATED_ENTRIES/*.md` |
| Distinguish fiction from documented research explicitly (Eco/PKD model) | Publication plan §6 |
| **Full Distribution File in-book** (Part Two, facsimile-styled) — default for all editions | `02_DISTRIBUTION_FILE_INTEGRATION.md` Rev. 2 |
| Do **not** cite `Cognigenics.txt` — file missing | OPEN_DECISIONS |
| Keep `[AUTHOR VERIFY]` on Holloway family-history until cleared | William Masters entry |
| Omnibus citations: **686 (HC) / 734 (PB)** when citing novel pagination | CANON §2A |
| DF internal pages cite as ***DF* pp. 1–247** (stable) | Integration plan §4 |
| **Out of scope:** jasoncholloway.com, trilogy covers, novel rewriting, Web3/marketing site |

---

## Mission — ordered phases

### Phase 1 — Complete the manuscript (Priority A)

**Current inventory:** 67 annotated entries + 5 apparatus headnotes + Essays 1–2 in prose. Target: **~120–150 entries** for first print pass.

#### 1A — Third entry tranche (~53–83 entries)

Write fresh annotations (not V3 wholesale reprint). Candidates from `HANDOFF_STATUS.md`:

- Holt-hearing apparatus figures; David (receptionist-class minor cast)
- Crane & Emmanuel Crane; Elena (first Prague candidate)
- The Analysis Chamber; Sirach 51+1 derivation
- Solfeggio-adjacent DF derivations
- Computer_Use_in_Literature layer for Andrew Chen (Grier)

Also mine `sources/annotated_v3_fulltext.txt` **only** for research links absent from synthesis — feed **new** entries, do not retro-fit Draft 1 wholesale.

**File convention:** Add to existing section files or create `11_DRAFT3_*.md` under `output/encyclopedia/01_ANNOTATED_ENTRIES/`. Update the A–Z list in `00_ENCYCLOPEDIA_TOC.md`.

#### 1B — Part Three essays 3–7 (prose)

Outlines exist in TOC; write full essays:

| # | Title | Primary sources (see `universe_memory/01_RESEARCH_CATALOG.md`) |
|---|-------|----------------------------------------------------------------|
| 3 | The Governments Were Studying It Too | `COMPREHENSIVE_RESEARCH_SYNTHESIS.md` (CIA 1984 translation) |
| 4 | Stone Remembers | `KC_CHURCHES_RESEARCH_ANALYSIS.md` |
| 5 | The Jesuit Bridge | `JESUIT_GEORGETOWN_CIA_RESEARCH.md` |
| 6 | Hidden Architectures | `research_synthesis/Bible_Cryptography/` cluster |
| 7 | Reading Blake Through Dick and Eco | `PKD_EXEGESIS_MASTERS_REFERENCE.md`, `UMBERTO_ECO_MASTERS_REFERENCE.md` |

Save as `output/encyclopedia/PART_THREE_ESSAYS/ESSAY_03_*.md` through `ESSAY_07_*.md`. Match tone and length of Essays 1–2.

#### 1C — Polish existing draft

- Integrate `output/CITATIONS_ADDENDUM.md` into `03_ANNOTATED_BIBLIOGRAPHY.md`
- Resolve or escalate remaining `[NEEDS SOURCE]` / `[AUTHOR VERIFY]` per `OPEN_DECISIONS.md`
- **Missouri wine:** hold both layers (Nadia "third-largest" in v8 vs. history = 2nd-largest) — do not change novel text
- **Loyd vs. Lloyd:** use real-world "Loyd" in headnote prose; JSON key name only as data citation (OPEN_DECISIONS item 12)
- **Grabovoi conviction:** pin legal citation before print (item 13)
- **Mikulov 1617:** source or invention label (item 11)

#### 1D — Distribution File (Part Two)

Implement Rev. 2 plan: reset full 247-page DF from `sources/distribution_file_fulltext.txt` as facsimile-styled Part Two. Preserve CC0 page, running footer `f = 111.2 Hz`, five-part structure. Part One entries become analytic headnotes pointing *into* Part Two — no duplicate tables (see integration plan duplication-control table).

#### 1E — Apparatus

- **Frequency Tables Appendix:** from `universe_memory/03_FREQUENCY_SYSTEM.md` + external `frequency_bands.json` (see EXTERNAL_ASSETS). Print tables **not** duplicated in DF Part III; include concordance to DF pp. 113–178
- **Merged index:** rebuild `04_INDEX_DRAFT.md` after third tranche (proper names + numbers/frequencies + DF locators once layout page numbers exist)
- Front matter: half title, title page, copyright, epigraph, **How to Read This Book**, **A Note on Canon**

---

### Phase 2 — Cover design (Priority A)

**No encyclopedia cover exists yet.** Design for **Edition A — Standard Reference**:

| Spec | Value |
|------|-------|
| Trim | **7×10 in** (254×178 mm) |
| Binding | **Case laminate hardcover** (no dust jacket — Ingram max DJ trim 6.14×9.21) |
| Bleed | 0.625 in wrap per Ingram guidelines |

**Design direction (reference book, not trilogy clone):**

- Same brand system: black ground, gold/warm-amber accent, **Cinzel** display + **EB Garamond** body
- Heptagram imprint (Seventh City Press)
- Hero motif: **reference/companion** identity — e.g., open codex + frequency lattice, or annotated manuscript grid with marginalia lanes (two-register visual echo)
- Title stack: eyebrow **MASTERS X** → main title **THE UNIVERSE ENCYCLOPEDIA** → subtitle **The Facts Behind the Fiction** → author **Jason Carroll Holloway**
- Back cover: 150-word flap-equivalent description, ISBN barcode area placeholder, trilogy ISBN matrix (from CANON §2), Seventh City Press URL
- **Do not** reuse trilogy volume jacket art verbatim; this is a sibling title in the same visual family

**Deliverables in `output/cover/`:**

- `COVER_BRIEF.md` — rationale, typography, color CMYK values
- `cover_spread_7x10.pdf` — full wrap (back + spine + front) with Ingram template marks
- `cover_spread_7x10.png` — RGB proof for author review
- Spine width: **calculate from final page count** via IngramSpark spine calculator (even page count; placeholder until Phase 3 locks pages)

Production rules from trilogy brief (still apply): FOGRA39 ICC CMYK, 240% ink cap, K-100 ground, 10.5 pt minimum on cover copy.

---

### Phase 3 — Interior layout & print PDFs (Priority A)

Target workflow: **InDesign** (preferred) or structured Word → PDF with professional typography.

#### Interior spec (Edition A)

| Element | Spec |
|---------|------|
| Trim | 7×10 in |
| Margins | Reference-book: generous inner gutter for 560–680 pp range |
| Body | EB Garamond 10/12 or 10.5/13 (match omnibus readability lesson) |
| Display | Cinzel for part titles, section heads |
| Part Two (DF) | Distinct facsimile treatment: monospaced or typewriter-adjacent footer, preserved DF page numbers in margin |
| Illustrations | B&W line art **if** author approves budget (plan §7.4); default text-only |
| Page count | Project **560–680 pp** with full DF; must be **even**; under **840 pp** Ingram ceiling |

#### Print deliverables in `output/print/`:

- `INTERIOR_SPEC.md` — font sizes, styles, part breaks, running heads
- `interior_7x10.pdf` — single PDF, all pages, embedded fonts, PDF/X-1a or Ingram-compliant export
- `PAGE_COUNT.txt` — final even page count
- `SPINE_CALCULATION.md` — paper weight assumption + spine width for cover finalization
- `INGRAM_METADATA.md` — title, subtitle, author, BISAC (suggest **REF019000** or **LIT004020** — justify choice), description (≤3500 chars), keywords, retail price suggestion ($49.95 per plan §3), **ISBN: ASSIGN NEW BLOCK — placeholder 978-XXXXXXXXXX**

Re-run cover spine after interior page count is locked.

---

### Phase 4 — Collector edition (Priority C — defer)

Edition B (250–500 numbered, slipcase, foil) is **optional** and requires author sign-off. Document specs in `output/COLLECTOR_EDITION_NOTES.md` only if time permits. **Do not** block standard edition on collector prototypes (OPEN_DECISIONS item 2; CANON §4 TODO 5).

---

### Phase 5 — Marketing copy (Priority B — if tokens remain)

Expand from new entries only; files already exist under `output/marketing/`. Optional: 2 YouTube scripts from new Part Three essays. **Not required for print.**

---

## Return package structure

Place all new work under `encyclopedia_project/output/` preserving existing paths:

```
encyclopedia_project/output/
  PUBLICATION_STATUS.md          ← your session log (required)
  encyclopedia/
    00_ENCYCLOPEDIA_TOC.md       ← updated
    01_ANNOTATED_ENTRIES/        ← new + revised entries
    PART_THREE_ESSAYS/           ← ESSAY_03–07
    02_DISTRIBUTION_FILE_INTEGRATION.md  ← update if layout changes
    03_ANNOTATED_BIBLIOGRAPHY.md
    04_INDEX_DRAFT.md            ← merged index
    MANUSCRIPT_MASTER.md           ← single concatenated manuscript (or .docx)
  cover/
    COVER_BRIEF.md
    cover_spread_7x10.pdf
    cover_spread_7x10.png
  print/
    INTERIOR_SPEC.md
    interior_7x10.pdf
    PAGE_COUNT.txt
    SPINE_CALCULATION.md
    INGRAM_METADATA.md
  COLLECTOR_EDITION_NOTES.md     ← optional
```

If returning a zip: name it `masters-x-encyclopedia-fable-RETURN.zip` with the `encyclopedia_project/output/` tree above.

---

## Quality gates before calling done

- [ ] Entry count ≥ 120 (stretch 150)
- [ ] All 7 Part Three essays in prose
- [ ] Full DF Part Two integrated per Rev. 2
- [ ] No duplicate frequency tables (DF vs. appendix concordance only)
- [ ] Index covers all entries + key numbers
- [ ] Cover PDF matches final spine width
- [ ] Interior PDF even page count, embeds fonts, ≤840 pp
- [ ] All OPEN_DECISIONS author items either resolved or explicitly flagged in PUBLICATION_STATUS.md
- [ ] Zero website files touched

---

## Authority hierarchy (when sources conflict)

1. `CANON.md`
2. `sources/omnibus_v8_fulltext.txt`
3. `sources/distribution_file_fulltext.txt`
4. `universe_memory/` + `output/VERIFICATION_LOG.md`
5. `sources/annotated_v3_fulltext.txt` (salvage only)

Log new discrepancies in `OPEN_DECISIONS.md` — do not silently resolve.
