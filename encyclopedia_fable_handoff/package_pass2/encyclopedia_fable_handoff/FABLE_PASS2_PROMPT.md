# FABLE — Pass 2 · Two-Product Print Program (Rev. 3)

**Date:** July 10, 2026  
**Publisher:** Seventh City Press LLC  
**Author of record:** Jason Carroll Holloway  
**Supersedes:** `FABLE_ENCYCLOPEDIA_PROMPT.md` (Pass 1 — single 7×10 volume, Ingram-first)

---

## Executive summary

Pass 1 typeset a **7×10 single-volume encyclopedia** with the Distribution File in the center. The author rejected that architecture. **Pass 2 is a new program:**

| Product | Trim | Pages | Print route |
|---------|------|-------|-------------|
| **The Masters X Universe Companion** | 8.5 × 11 in | ~400–450 | **BookVault Bespoke** (primary) |
| **The Resonant Frequency Dictionary** | 8.5 × 11 in | ~3,156 total → **4 or 8 vols** + slipcase | **BookVault / Bookmobile / 48 Hour** — not Ingram |

**The Dictionary is the book.** The Companion is framing (entries, essays, apparatus) plus the **full 247-page DF facsimile as Part Four appendix (4b locked)**.

**Print only.** No website. No digital edition.

---

## Your role

Lead **publication producer** for the Masters X reference print line. Pass 1 proved the **interior design system** (Cinzel / EB Garamond / Courier Prime; two-register entries; DF facsimile engine). Pass 2 **re-homes that system** at **8.5×11** across two products and delivers **BookVault-ready** proofs + cover/slipcase art.

**You deliver:**

1. **Companion** — interior spec + press-proof PDF (~400–450 pp)
2. **Dictionary** — typography spec + volume-split plan + **at minimum Vol. 1 (Letter A)** press-proof; target full 4-volume set proofs
3. **Covers** — Companion case wrap + Dictionary volume spines + **box-set slipcase** art
4. **BookVault RFQ package** — build sheet, page counts, spine widths, foil/endpaper specs (inherit `EDITION_B_COLLECTOR_SPEC.md`)
5. **`PUBLICATION_STATUS.md`** — session log + author sign-off flags

**Cursor integrates** your `output/` return zip into the repo. **Do not** modify jasoncholloway.com.

---

## Read first (in order)

### Architecture (Rev. 3 — law for this pass)

1. `encyclopedia_fable_handoff/FABLE_PASS2_PROMPT.md` — this file
2. `encyclopedia_fable_handoff/KNOWN_ISSUES_PASS2.md` — punch list
3. `encyclopedia_fable_handoff/PASS1_RETURN_REFERENCE.md` — what to keep vs. discard from July 10 return
4. `encyclopedia_project/02_PUBLICATION_ARCHITECTURE_REV3.md`
5. `encyclopedia_project/03_TWO_PRODUCT_TOC.md`
6. `encyclopedia_project/output/print/LETTER_A_PAGINATION_REPORT.md`

### Canon & manuscript

7. `CANON.md`
8. `encyclopedia_project/output/HANDOFF_STATUS.md`
9. `encyclopedia_project/output/OPEN_DECISIONS.md`
10. `encyclopedia_project/output/encyclopedia/01_ANNOTATED_ENTRIES/` — 67 entries (trim to ~40–80 high-value before print; author defers expansion)
11. `encyclopedia_project/sources/frequency_data/` — **now in repo** (`frequency_bands.json`, `.docx` print master, companions)
12. `encyclopedia_project/sources/distribution_file_fulltext.txt` — DF source for Companion Part Four

### Pass 1 design return (reference — do not ship as final)

13. `encyclopedia_project/output/print/DESIGN_TEAM_RECOMMENDATIONS.md`
14. `encyclopedia_project/output/print/INTERIOR_SPEC.md` — **7×10 — superseded trim**
15. `encyclopedia_project/output/print/EDITION_B_COLLECTOR_SPEC.md` — **BookVault build sheet — still valid, adapt trim to 8.5×11**
16. `encyclopedia_project/output/print/interior_7x10_EDITION_A.pdf` — typography/chrome reference only

### Brand

17. `design_memory/BRAND_SOURCE.md` + `design_memory/TRILOGY_COVER_BRIEF.md`

---

## What Pass 1 got right (keep)

| Element | Pass 1 implementation | Pass 2 action |
|---------|----------------------|---------------|
| Two-register entry typography | Cinzel labels + EB Garamond body | **Keep** — Companion Part One only |
| DF facsimile engine | 1 source page = 1 book page; table reconstruction; `f = 111.2 Hz` footer; marginal register rule | **Keep** — move to Companion **Part Four appendix** (not book center) |
| Three typeface manifest | Cinzel / EB Garamond / Courier Prime | **Keep** — all products |
| K-only interior discipline | Working-file interior, gold on case only | **Keep** |
| BookVault research | Edition B spec, foil/endpapers/edges | **Promote to primary route** for Companion + Dictionary |
| Recto openers, roman→arabic folios | Enforced in build | **Keep** per product |

## What Pass 1 got wrong (discard)

| Element | Why superseded |
|---------|----------------|
| **7×10 trim** | Author locked **8.5 × 11 in** |
| Single-volume architecture | **Two products:** Companion + Dictionary box set |
| DF as Part Two center | **4b:** DF is Companion **appendix** only |
| Dictionary as FPO / excerpt | **115,505 entries** = full print from `.docx` |
| Ingram as default | **BookVault Bespoke** primary; Ingram optional for stripped trade Companion only |
| 251 pp DF dominating the interior | DF still 247 pp but no longer the book's bulk — Dictionary is |

---

## Non-negotiable constraints

| Rule | Source |
|------|--------|
| **CANON.md** is law for story facts, trilogy ISBNs, page counts | Root canon |
| Author: **Jason Carroll Holloway** · Imprint: **Seventh City Press LLC** | CANON §1 |
| Two-register entries: **In the novels** / **In the world** | All entry `.md` files |
| **4b:** Full DF facsimile in Companion Part Four — *DF* pp. 1–247 stable | `03_TWO_PRODUCT_TOC.md` |
| Dictionary: **no essays, no encyclopedia entries** — headwords only | Rev. 3 §6 |
| Do **not** cite `Cognigenics.txt` | OPEN_DECISIONS |
| Omnibus pagination: **686 HC / 734 PB** when citing novels | CANON §2A |
| Fiction/fact seam on frequency tables — headnotes before numbers | `10_APPARATUS_HEADNOTES.md` |
| Phoneme layer = real (CMU, Peterson & Barney); Hz tags = constructed taxonomy | Dictionary preface + Rev. 3 §7 |
| **Out of scope:** website, trilogy edits, marketing deployment |

---

## Mission — ordered phases

### Phase 0 — Re-spec at 8.5 × 11

Recalculate geometry for **finished trim 8.625 × 11.25 in** (confirm with BookVault; Ingram uses this finished size).

| Element | Starting point |
|---------|----------------|
| Text block | Scale from Pass 1 proportions; wider measure suits 8.5×11 — **do not shrink type to fit old 7×10 block** |
| Gutter | ≥1 in inner — Dictionary vols. at 400–840 pp need generous gutter |
| Dictionary density | **Target ≥36 entries/page** (Cursor measured 36.6 in `dictionary_letter_a_sample_8.5x11.pdf` — match or improve with EB Garamond) |

**Deliverable:** `output/print/INTERIOR_SPEC_8.5x11.md` — both products, margin table, type scale, running heads per product.

---

### Phase 1 — Companion interior (Priority A)

**Target:** ~400–450 pp single HC.

#### Structure (per `03_TWO_PRODUCT_TOC.md`)

| Part | Content | Est. pp |
|------|---------|--------|
| Front matter | Half title, copyright, epigraph, How to Read, Canon, How to Use Dictionary | 12–20 |
| **Part One** | Annotated entries (67 now; trim to ~40–80 per author) | 80–120 |
| **Part Two** | Essays 1–7 (1–2 written; 3–7: **cast off 6 pp each** if prose not ready) | 40–80 |
| **Part Three** | Frequency tables (`frequency_bands.json`), bibliography, index, About Author | 30–50 |
| **Part Four** | **DF facsimile appendix** — full 247 pp + 4 roman DF front = **251 book pages** | 251 |

**DF placement change from Pass 1:** Same facsimile treatment, different location. Companion running heads resume on non-DF pages; DF chrome flips per Pass 1 `DESIGN_TEAM_RECOMMENDATIONS.md` §4.

#### Source files

- Entries: `output/encyclopedia/01_ANNOTATED_ENTRIES/*.md`
- Essays: `output/encyclopedia/PART_THREE_ESSAYS/`
- Tables: `sources/frequency_data/frequency_bands.json` — **set real tables; no `[TABLE FPO]`**
- DF: `sources/distribution_file_fulltext.txt`
- Index: `output/encyclopedia/04_INDEX_DRAFT.md` — rebuild locators after pagination

#### Deliverables

```
output/print/
  INTERIOR_SPEC_8.5x11.md
  companion_interior_8.5x11.pdf
  COMPANION_PAGE_COUNT.txt
  COMPANION_SPINE_CALCULATION.md
```

---

### Phase 2 — Dictionary interior (Priority A)

**Source authority:** `sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx` (print master).  
**Pipeline reference:** `encyclopedia_project/scripts/typeset_letter_a_sample.py` (Cursor proof — upgrade typography).

#### Scale (measured)

| Metric | Value |
|--------|-------|
| Total entries | 115,505 |
| Total pages @ 36.6 e/page | ~3,156 |
| Letter E alone | 25,615 entries · ~700 pp |

#### Volume split — propose final plan

**Preferred starting point (4 vols @ 840 pp):**

| Vol. | Range | Est. pp |
|------|-------|--------|
| 1 | A–D | 656 |
| 2 | E | 700 |
| 3 | F–N | 1,090 → **must split** (exceeds 840) |
| 4 | O–Z | 1,010 → **must split** |

**Your job:** Propose **final volume count and letter breakpoints** after typesetting Vol. 1 (A) and sampling E. Document in `DICTIONARY_VOLUME_PLAN.md`. Target ≤840 pp/vol for BookVault.

#### Dictionary typography

- Two-column A–Z
- Entry: **headword (syllables) Hz** in display face · phonemes · band tags in body
- Minimal front matter per volume (half-title, copyright, letter-range banner, pointer to Companion)
- **No** Cinzel entry heads at dictionary density — use a compact display rule (EB Garamond bold small caps or dedicated dictionary head style)
- Running heads: `RESONANT FREQUENCY DICTIONARY` / letter range / volume number

#### Deliverables (minimum → stretch)

| Priority | Deliverable |
|----------|-------------|
| **Required** | Vol. 1 (Letter A, 8,968 entries, ~245 pp) press-proof PDF |
| **Required** | `DICTIONARY_VOLUME_PLAN.md` + per-volume page ledger |
| **Required** | `dictionary_vol01_interior_8.5x11.pdf` |
| Stretch | Vol. 2–N interiors |
| Stretch | Full 4-volume set proofs |

```
output/print/
  DICTIONARY_TYPOGRAPHY_SPEC.md
  DICTIONARY_VOLUME_PLAN.md
  dictionary_vol01_interior_8.5x11.pdf
  DICTIONARY_PAGE_COUNT.txt
  dictionary_vol02–0N_*.pdf          ← as completed
```

---

### Phase 3 — Covers & slipcase (Priority A)

**BookVault Bespoke** — inherit Pass 1 Edition B materials spec at new trim.

#### Companion cover

- 8.5 × 11 case laminate or case bound (per BookVault quote)
- Black matte + **gold foil** title stack + heptagram
- Spine from `COMPANION_SPINE_CALCULATION.md`
- Back: description, Companion scope statement, Dictionary box-set pointer, ISBN placeholder, trilogy matrix

#### Dictionary covers

- **Matched spines** across N volumes — volume number + letter range prominent
- Series title: **THE RESONANT FREQUENCY DICTIONARY**
- Foil/heptagram consistent with Companion

#### Box-set slipcase

- Holds all dictionary volumes
- Series title + volume list + Companion cross-reference
- **Set ISBN** barcode area

```
output/cover/
  COVER_BRIEF_PASS2.md
  companion_cover_wrap_8.5x11.pdf
  dictionary_vol01_cover_wrap_8.5x11.pdf
  dictionary_slipcase_8.5x11.pdf          ← box panels
  cover_proofs_rgb/                         ← PNG review assets
```

**Do not** reuse trilogy jacket art verbatim.

---

### Phase 4 — BookVault RFQ package (Priority A)

Consolidate for author quote request. **Not Ingram-first.**

```
output/print/
  BOOKVAULT_RFQ.md              ← consolidated build sheet
  EDITION_B_COLLECTOR_SPEC.md   ← update trim 7×10 → 8.5×11 (or supersede with RFQ)
```

Include: trim, page counts per SKU, paper (50# white B&W), binding (smyth-sewn if offered), foil, sprayed black edges, heptagram endpapers, ribbon, head/tail bands, slipcase dimensions.

**Optional appendix:** `INGRAM_TRADE_COMPANION_NOTES.md` — stripped case-laminate Companion for wholesale **only if** page count ≤400 on 8.5×11 matrix. Flag likely overage with 4b DF.

---

### Phase 5 — Manuscript polish (Priority B — defer if schedule tight)

Pass 1 scope assumed 120–150 entries. **Rev. 3 defers expansion.** Use existing 67 entries unless author requests trim list.

| Task | Priority |
|------|----------|
| Essays 3–7 prose | B — cast off if not written |
| Third entry tranche | **Deferred** — not required for Pass 2 |
| Merged index rebuild | A — after Companion pagination locked |
| `[AUTHOR VERIFY]` flags | Keep printed until cleared |

---

## Return package structure

Zip name: **`masters-x-encyclopedia-fable-pass2-RETURN.zip`**

```
encyclopedia_project/output/
  PUBLICATION_STATUS.md
  print/
    INTERIOR_SPEC_8.5x11.md
    companion_interior_8.5x11.pdf
    COMPANION_PAGE_COUNT.txt
    COMPANION_SPINE_CALCULATION.md
    DICTIONARY_TYPOGRAPHY_SPEC.md
    DICTIONARY_VOLUME_PLAN.md
    dictionary_vol01_interior_8.5x11.pdf
    DICTIONARY_PAGE_COUNT.txt
    BOOKVAULT_RFQ.md
    LETTER_A_PAGINATION_REPORT.md      ← update if your density differs
  cover/
    COVER_BRIEF_PASS2.md
    companion_cover_wrap_8.5x11.pdf
    dictionary_vol01_cover_wrap_8.5x11.pdf
    dictionary_slipcase_8.5x11.pdf
```

Preserve Pass 1 pipeline in `pipeline/` if reused — document changes in `PUBLICATION_STATUS.md`.

---

## Quality gates

### Companion
- [ ] Trim 8.5 × 11 throughout
- [ ] ~400–450 pp (even count)
- [ ] DF Part Four: 251 facsimile pages, *DF* pp. 1–247 stable
- [ ] Frequency tables set from JSON (no FPO)
- [ ] Fonts embedded, K-only

### Dictionary
- [ ] Vol. 1 (A) complete press-proof
- [ ] Volume split plan documented with measured page counts
- [ ] Entry density ≥35/page at readable size
- [ ] No encyclopedia prose in dictionary volumes

### Covers / print route
- [ ] BookVault RFQ package complete
- [ ] Companion + Vol. 1 spines match calculated widths
- [ ] Slipcase art for full set (even if volumes 2–N interior pending)
- [ ] Zero website files touched

### Authority
- [ ] OPEN_DECISIONS items flagged, not silently resolved
- [ ] Rev. 3 architecture followed — no reversion to single 7×10 volume

---

## Authority hierarchy

1. `02_PUBLICATION_ARCHITECTURE_REV3.md` + `03_TWO_PRODUCT_TOC.md` (this pass)
2. `CANON.md`
3. `sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx`
4. `sources/omnibus_v8_fulltext.txt` + `sources/distribution_file_fulltext.txt`
5. Pass 1 return (`DESIGN_TEAM_RECOMMENDATIONS.md`) — typography only, not architecture

Log new discrepancies in `OPEN_DECISIONS.md`.
