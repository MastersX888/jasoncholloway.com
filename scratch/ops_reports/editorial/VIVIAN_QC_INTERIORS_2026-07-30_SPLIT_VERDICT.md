# VIVIAN QC — Six corrected print interiors (italic remediation)

- **Asset:** `interior.pdf` for 9798256008048 / 9798256009953 / 9798256010072 (PB) and 9798295800801 / 9798295812675 / 9798295812705 (HC)
- **Submitted by:** Morgan desk, 2026-07-30 evening
- **Reason for QC:** Italic body emphasis was silently stripped by the ReportLab generators; all six interiors were rebuilt for Ingram replace
- **Checked:** 2026-07-30
- **Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md` v1.0
- **Visual pass:** performed (rendered page crops, not font-flag reports alone)

---

> **RESOLVED 2026-07-30 ~9:45 PM — final verdict PASS on all six.** Jason chose to
> populate real previews. Four interiors were rebuilt from the canonical build
> DOCX; the block below is cleared. See "Resolution" at the end of this report.
> Ingram page counts changed — **Vol I PB 189, Vol I HC 163, Vol II PB 271,
> Vol II HC 225.**

## VERDICT — SPLIT (superseded by Resolution)

| Scope | Verdict |
|---|---|
| Italic remediation itself (all six files) | **PASS** |
| Upload of 9798256008048 PB, 9798295800801 HC, 9798256009953 PB | **BLOCK** — unrelated pre-existing defect found in back matter |
| Upload of 9798256010072 PB, 9798295812705 HC, 9798295812675 HC | **PASS** — clear to replace at Ingram on Jason's approval |

Vivian does not block the italic work. She blocks three of the six *files* because
shipping them tonight would re-publish a defective page while the replace window
is open — the cheapest moment to fix it.

---

## 1. Italic remediation — PASS

Narrative emphasis is restored and confirmed by eye in every rebuilt interior.
Chapter subtitles were excluded from sampling because they are italic by
template and prove nothing; the probes below are mid-paragraph emphasis mixing
roman and italic on the same line, drawn from past the 35% mark of each book.

| Edition | Sample page | Emphasis verified |
|---|---|---|
| Vol I PB | p67 | *someone should be here while you're processing* |
| Vol II PB | p118 | *I can't compete with a cave. I shouldn't have to try.* |
| Vol III PB | p76 | *They are not asking the wrong question…* |
| Vol I HC | p56 | *I'm here.* |
| Vol II HC | p98 | sticky-note passage |
| Vol III HC | p66 | *They are not asking the wrong question…* |

Before/after crops of the same passages: `scratch/ops_reports/editorial/italic_proofs/*_INLINE_BEFORE.png` / `*_INLINE_AFTER.png`.
The pre-fix crops show the identical sentences set in roman.

**No content drift.** Word counts are byte-identical pre-fix vs rebuilt in all six:

| Edition | pre-fix words | rebuilt words | delta |
|---|---|---|---|
| Vol I PB | 32,991 | 32,991 | 0 |
| Vol I HC | 32,993 | 32,993 | 0 |
| Vol II PB | 59,466 | 59,466 | 0 |
| Vol II HC | 61,110 | 61,110 | 0 |
| Vol III PB | 43,017 | 43,017 | 0 |
| Vol III HC | 43,016 | 43,016 | 0 |

**Layout conventions intact.** Chapter openers still land recto in all six; opener
titles identical pre/post; every new blank page created by italic reflow is an
intentional verso blank immediately preceding a recto chapter opener (Vol II PB
p28 before Chapter Three on p29; Vol III HC blanks shifted two pages, same rule).

### Protocol sections cleared

- **§5 ISBN accuracy** — each interior carries its own registry ISBN on the copyright page; no foreign-edition ISBN appears in any front matter.
- **§2 brand voice** — author name renders **Jason Carroll Holloway** in all six.
- **§4 layout** — no text intrudes into the 0.375in trim-edge safety margin on any page of any of the six; running heads and drop folios are the only margin-zone elements, as designed.
- Trim geometry correct: 5.5 × 8.5 (PB), 6.14 × 9.21 (HC).

---

## 2. BLOCK — empty "A PREVIEW OF" page in three editions

Found during cross-format comparison, **not caused by tonight's fix** — present
identically in the pre-fix backups, so it is live in market now.

Vol I PB p177–179, Vol I HC p153–155, and Vol II PB p259–261 each render a
three-page back-matter teaser that contains **no preview text**: a half-title
("A PREVIEW OF · MASTERS X · The Grimoire · Volume Two · Available now"), a
blank verso, then a chapter opener —

> CHAPTER ONE
> **THE STONE COTTAGE**
> *3.915 Hz · Iceland*
> *End of Preview*
> The Grimoire continues at your bookseller.

— with the chapter body absent. A reader reaches a chapter opening that ends
before its first sentence. Visual proof: `italic_proofs/VOL1_PB_EMPTY_PREVIEW.png`,
`VOL2_PB_EMPTY_PREVIEW.png`.

**Root cause (same failure class as the italic bug — silent no-op):**
`generate_book1_interior.py`, `generate_book1_interior_paperback.py`, and
`generate_book2_interior_paperback.py` call `_build_elements(book, [])` with the
comment *"preview disabled (live CANON has no preview)"* — but
`preview_section(paras)` emits its half-title, blank, chapter opener and
End-of-Preview closer unconditionally, then iterates an empty list. Intent was
"no preview"; output is "empty preview shell."

**Catalog inconsistency this exposes:**

| Edition | Back-matter preview |
|---|---|
| Vol I PB / Vol I HC | empty shell — **defect** |
| Vol II PB | empty shell — **defect** |
| Vol II HC | complete, 1,657 words of Vol III Ch.1 (preview text embedded in generator) |
| Vol III PB / HC, both omnibus, all three EPUBs | no preview section at all |

So the same volume ships two different back matters in hardcover vs paperback,
which is exactly the cross-format inconsistency Jason asked to eliminate. The
1,644-word gap between Vol II HC and Vol II PB is entirely this preview.

**Fix feasibility:** `E:\Masters_X_Trilogy_Archive` is not mounted, but
`production_staging/_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx` and
`MASTERS_X_BOOK3_BUILD.docx` are present locally, so a real preview can be
sourced without the archive. Removing the shell instead is a few lines
(early-return when `paras` is empty). Either path changes page counts again and
therefore Ingram spine metadata.

---

## 3. Notes — PASS WITH NOTES items (Jason decides, no block)

1. **Imprint absent from all print copyright pages.** All eight print interiors
   (including both omnibus editions, untouched tonight) say only "Published in
   the United States of America / First Edition / ISBN …" with no
   **Seventh City Press** line. All three EPUBs do carry the imprint. Protocol §2
   expects the imprint where context requires; this is pre-existing and
   catalog-wide, and adding a line reflows pagination, so Vivian logs it rather
   than blocking.
2. **Mixed quote styles.** House style is straight quotes; Vol II and Vol III
   carry a small number of typographic curly quotes (Vol III: 13 curly
   apostrophes, 22 curly opening doubles against ~681/1,056 straight). Identical
   in print and EPUB per volume, so not a rendering fault — a manuscript-level
   cleanup item for a future edition.
3. **Cross-format typography otherwise exact.** Full-document character census
   matches to the character across PB, HC, and EPUB for Vol I and Vol III
   (e.g. Vol I: 1,131 apostrophes / 2,248 doubles / 2 em dashes in all three).
   Em dashes are present and correct — an earlier zero count was a sampling
   artifact of a page-range subset, not a glyph bug.
4. **C: drive at ~0.6 GB free.** Not an editorial matter, but it constrains any
   rebuild ordered as a result of this QC.

---

## 4. Handoff

```markdown
### Vivian QC — six corrected print interiors (italic remediation)
- Verdict: PASS on italic remediation; BLOCK on 3 of 6 files (9798256008048 PB, 9798295800801 HC, 9798256009953 PB)
- Checked: 2026-07-30
- Notes: empty "A PREVIEW OF" back matter is pre-existing and live in market; missing imprint line on all print copyright pages; mixed quote styles in Vol II/III
- Visual pass: yes — inline-emphasis before/after crops and full-page renders of the defect
- Ready for checklist: yes for 9798256010072 PB, 9798295812705 HC, 9798295812675 HC; no for the other three pending Jason's decision on the preview
```

Decision required from Jason before the blocked three can be cleared: remove the
empty preview shell, populate a real preview, or accept as-is and replace only
the italic fix tonight.

---

## RESOLUTION — 2026-07-30 ~9:45 PM · verdict now PASS (all six)

Jason chose **populate real previews**. Scope widened from three files to four
once a second defect surfaced during implementation.

### Second defect found while fixing the first

Vol II HC's preview was not merely present — it was a **stale draft** of Vol III
Chapter One, hardcoded as a 142-line literal in `generate_book2_interior.py`
under the comment *"Embedded verbatim — do not alter."* Diffed against the
canonical Book 3 build DOCX with quote styles normalised, it contradicted the
published Vol III in three places:

| Vol II HC preview said | Published Vol III says |
|---|---|
| "The **house** was clean. The **house** was empty." | "The **apartment** was clean. The **apartment** was empty." |
| "Marcus Chen **on his front porch**" | "Marcus Chen **in the hallway outside his door**" |
| "chosen with the precision of a woman" | "chosen with the **institutional** precision of a woman" |

It was also missing three section-break ornaments. A reader following that
teaser into Vol III would find Blake living somewhere else. Under §1 this is a
canon contradiction, so Vol II HC was rebuilt too and the stale literal deleted.

### What changed

- New `preview_source.py` extracts Chapter One of the following volume from the
  canonical build DOCX with italic runs preserved — one source of truth, no
  retyped literals, no dependency on the unmounted `E:` archive.
- `preview_section()` in all six generators now returns nothing when handed an
  empty paragraph list, so the empty-shell failure cannot recur. Book 3's
  generators got the same guard even though they never call it.
- Book 1 PB/HC and Book 2 PB/HC now pass real preview content instead of `[]`.

### Verification

| Edition | Pages (orig → now) | Preview | Body outside preview |
|---|---|---|---|
| Vol I PB | 185 → **189** | 1,764 words of *The Grimoire* Ch.1 | identical to shipped |
| Vol I HC | 159 → **163** | 1,764 words | identical to shipped |
| Vol II PB | 265 → **271** | 1,645 words of *The Kingdom* Ch.1 | identical to shipped |
| Vol II HC | 225 → **225** | 1,645 words (canon, replaces stale draft) | identical to shipped |

- **PB and HC previews are now word-for-word identical within each volume.**
- Every word outside the preview region matches the shipped file exactly — the
  teaser is the only change.
- Chapter openers still land recto in all four (generator layout pass confirms
  all opener pages odd-numbered).
- Vol II HC preview now reads "apartment" and "in the hallway outside his door".
- `pre_upload_audit.py` — the hardened gate — passes: editorial ✓ italics ✓
  cross-format consistency ✓.
- Re-ran `vivian_interior_qc.py` across all six: ISBNs correct, no foreign-edition
  ISBN, author name correct, trim correct, no margin intrusions.
- Backups: `interior_PRE_PREVIEW_FIX_2026-07-30.pdf` beside each interior
  (alongside the earlier `interior_PRE_ITALIC_FIX_2026-07-30.pdf`).

### Ingram consequences — page counts must be updated

| ISBN | Edition | New page count | Spine delta vs original |
|---|---|---|---|
| 9798256008048 | Vol I PB | 189 | +0.010 in |
| 9798295800801 | Vol I HC | 163 | +0.010 in |
| 9798256009953 | Vol II PB | 271 | +0.015 in |
| 9798295812675 | Vol II HC | 225 | none |
| 9798256010072 | Vol III PB | 205 | none |
| 9798295812705 | Vol III HC | 177 | −0.005 in |

Spine deltas use the same 0.0025 in/page basis as tonight's earlier italic
assessment. They are small, but Vivian does not own cover geometry — **River
should confirm the existing cover wraps still fit before upload**, or regenerate
the three affected wraps from the new page counts.

### Final verdict

**PASS — all six interiors cleared for Ingram replace on Jason's approval.**
Notes in §3 (missing imprint line, mixed quote styles) remain open as
future-edition items and do not block.

---

*VIVIAN — Editorial Quality & Pre-Publication Control, Seventh City Press LLC*
*"Nothing goes out the door with the wrong ISBN on it."*
