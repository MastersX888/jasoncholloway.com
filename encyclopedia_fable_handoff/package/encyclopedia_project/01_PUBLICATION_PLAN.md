# Masters X Universe Encyclopedia — Publication Plan

**Seventh City Press LLC** · Draft foundation (July 2026)  
**Status:** Research-backed specs and architecture — not final copy or layout. Creative annotation pass deferred.

---

## 1. Executive Summary

The encyclopedia should function as:

1. **Research companion** — "facts behind the fiction" for serious readers  
2. **In-universe artifact** — integrates *The Distribution File* (247 pp) as a core document  
3. **Collector object** — optional limited run with premium materials  

**Recommended architecture:** Two editions — a **standard POD reference** (IngramSpark, wide distribution) and a **numbered collector run** (short-run offset or bespoke POD, no IngramSpark slipcase).

**Estimated core content (reformatted at 7×10):** 480–600 pages for a single-volume reference integrating Distribution File excerpts, frequency tables, annotated bibliography, and fresh encyclopedia entries. *Exact count requires layout pass — do not cite until measured.*

---

## 2. Comparable Titles (cited)

| Title | Pages | Format | Price (retail) | Source |
|-------|-------|--------|----------------|--------|
| *The Wheel of Time Companion* | 816 | Hardcover 6.14×9.21 | $39.99 | [Tor/ Macmillan](https://torpublishinggroup.com/the-wheel-of-time-companion/?format=hardback&isbn=9780765314611), [Wikipedia](https://en.wikipedia.org/wiki/The_Wheel_of_Time_Companion) |
| *The World of Ice & Fire* (Martin) | ~336 | Illustrated HC | ~$35–50 | Genre comp; illustrated reference |
| *House of Leaves* (Danielewski) | ~709 | Trade / artifact book | ~$22–55 | Experimental artifact-book comp |
| *The Dune Encyclopedia* (McNelly) | ~526 | Reference (out of print) | Collector premium | In-universe scholarship model |

**Positioning:** Price standard HC at **$45–55** (816-page WoT Companion at $39.99 sets floor; research-density + niche literary fiction supports premium). Collector at **$95–175** depending on materials.

---

## 3. Edition Architecture

### Edition A — Standard Reference (primary)

| Spec | Recommendation | Rationale |
|------|----------------|-----------|
| Trim | **7×10 in** (254×178 mm) | Reference format; IngramSpark case laminate available |
| Binding | Case laminate hardcover | Dust jacket on IngramSpark limited to max **6.14×9.21 in** — larger trims require case laminate ([Trim Size Matrix](https://www.ingramspark.com/hubfs/downloads/trim-sizes.pdf)) |
| Interior | B&W, 50 lb white or 70 lb white | Cost control; frequency tables and line art |
| Page range | Target 520–600 (even count) | IngramSpark HC max **840 pages** on 7×10 ([File Creation Guide](https://www.ingramspark.com/hubfs/downloads/Print-Book-File-Guidelines.pdf)) |
| Distribution | IngramSpark → Ingram wholesale | Matches existing trilogy ISBN workflow |
| Retail | $49.95 suggested | ~40% wholesale → ~$30 net to retailer; POD unit cost TBD via calculator |

### Edition B — Collector (limited)

| Spec | Recommendation | Rationale |
|------|----------------|-----------|
| Run | 250–500 numbered copies | Scarcity without absurdity |
| Printer | Bookmobile, PrintNinja, 48 Hour Books, or BookVault Bespoke | IngramSpark does not offer slipcases or sprayed edges |
| Binding | Cloth or printed case + foil stamp | 48 Hour Books: foil setup $250–600 + per-unit ([vendor quote range from industry norms](https://www.48hourbooks.com/)) |
| Extras | Ribbon marker, slipcase, facsimile Distribution File saddle-stitch in slipcase pocket | *S.* / House of Leaves artifact model |
| Retail | $125–150 | Sanderson deluxe slipcase comps ~$50; premium materials justify uplift |

---

## 4. Content Modules (existing assets)

| Module | Source | Pages (source) | Encyclopedia role |
|--------|--------|----------------|-------------------|
| Distribution File | PDF fulltext extracted | 247 | Core in-universe document — excerpt or facsimile reprint |
| Frequency system | `frequency_bands.json` + Dictionary | Tables | Reference appendix |
| Research bibliography | `E:\Research` (188 files) | — | Annotated source list with "fact behind fiction" pointers |
| Omnibus annotations | `omnibus_v8_fulltext.txt` | 684 | **Fresh annotations** — not V3 wholesale |
| Story canon | `CANON.md` + `universe_memory/` | — | Index backbone |

**Distribution File parts (for TOC):**
1. Preparation Protocols  
2. Chamber Specifications  
3. Harmonic Frequency Derivations  
4. Facilitator Training Manual  
5. Acoustic Research Appendix  

---

## 5. Production Constraints (IngramSpark — cited)

| Constraint | Value | Source |
|------------|-------|--------|
| HC page max (7×10) | 840 pages | [Trim Size Matrix PDF](https://www.ingramspark.com/hubfs/downloads/trim-sizes.pdf) |
| HC trim range (white paper) | 5×8 to 8.5×11 | [IngramSpark Trim Sizes](https://www.ingramspark.com/plan-your-book/print/trim-sizes) |
| Case laminate bleed | 0.625 in (16 mm) wrap | [Print Book File Guidelines](https://www.ingramspark.com/hubfs/downloads/Print-Book-File-Guidelines.pdf) |
| Page count divisibility | Even (barcode page added) | File Creation Guide |
| Dust jacket max trim | 6.14×9.21 | Trim Size Matrix — **not usable for 7×10** |

**Spine width:** Calculate via IngramSpark/Lightning Source spine calculator once final page count and paper weight are locked.

---

## 6. Reference-Book Design Conventions

- **Organization:** Thematic sections (Frequency / Places / Factions / Sources) with A–Z index at rear — standard for single-volume literary companions  
- **Cross-references:** "See also" entries per *Chicago Manual of Style* index conventions  
- **Citations:** Distinguish in-universe vs. real-world sources explicitly (Eco/PKD model)  
- **Index:** Proper name index + frequency/number index (111.2, 1267, 247, etc.)

---

## 7. Open Decisions (require author sign-off)

1. **Single volume vs. multi-volume set** — Content may support 2 vols. (Text + Distribution File facsimile) for collector edition only  
2. **Omnibus page count** — **Resolved:** HC 686, PB 734 (`CANON.md` §2A)
3. **ISBN** — New ISBN block needed; assign before IngramSpark upload  
4. **Illustration budget** — B&W line art from chamber assets vs. text-only first edition  
5. **Distribution File treatment** — Full reprint vs. excerpted vs. separate saddle-stitch in slipcase (collector)  

---

## 8. Next Steps (ordered)

1. Lock edition count and trim from §3  
2. Build measured page-count spreadsheet from InDesign layout (not estimated)  
3. Complete `universe_memory/` cross-reference index  
4. **Creative pass:** Fresh annotations from omnibus + research (Claude / author)  
5. Run IngramSpark print calculator for unit economics at final page count  
6. Collector printer RFQ (Bookmobile / 48 Hour Books) with foil + slipcase specs  

---

## 9. Sources

- [IngramSpark Trim Size Matrix (PDF)](https://www.ingramspark.com/hubfs/downloads/trim-sizes.pdf)  
- [IngramSpark Print Book File Guidelines (PDF)](https://www.ingramspark.com/hubfs/downloads/Print-Book-File-Guidelines.pdf)  
- [IngramSpark Trim Sizes (web)](https://www.ingramspark.com/plan-your-book/print/trim-sizes)  
- [The Wheel of Time Companion — Tor](https://torpublishinggroup.com/the-wheel-of-time-companion/?format=hardback&isbn=9780765314611)  
- [The Wheel of Time Companion — Wikipedia](https://en.wikipedia.org/wiki/The_Wheel_of_Time_Companion)  
- Internal: `CANON.md`, `encyclopedia_project/sources/*`, `universe_memory/*`
