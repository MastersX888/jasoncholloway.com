# SUB-BOOK divider removal — 2026-08-29

Author-reported: the omnibus hardcover had "SUB-BOOK TWO" orphaned at the foot of
p526 with "The Opposition" stranded alone at the top of p527. Author ruling:
delete, hold the page count, fix every edition.

Companion to `CANON_FIX_2026-08-29.md` (Chapter One prose) and
`EPUB_REBUILD_2026-08-29.md` (scene-break centering). All three shipped together.

## What was actually wrong

Book 3's DOCX carried four bare paragraphs with no structural markup:

```
text -> SECT -> SECT -> 'SUB-BOOK TWO'   -> 'The Opposition' -> SECT -> CHBR -> CHAPTER NINE
text -> SECT -> SECT -> 'SUB-BOOK THREE' -> 'The Frequency'  -> SECT -> CHBR -> CHAPTER EIGHTEEN
```

All **27** other chapter boundaries in Book 3 read `text -> SECT -> CHBR -> CHAPTER N`.
These two sites were the only deviation, and each carried a redundant duplicate
`SECT` ornament.

No renderer had divider logic for them, so placement was down to page-fill luck.
Of eight print instances, **six were broken**:

| Edition | SUB-BOOK TWO | SUB-BOOK THREE |
|---|---|---|
| Omnibus HC | p526 mid-flow, subtitle stranded on p527 | p599 clean page (coincidence) |
| Omnibus PB | p567 mid-flow | p646 clean page (coincidence) |
| Book 3 HC | p57 mid-flow | p111 mid-flow |
| Book 3 PB | p68 clean page (coincidence) | p131 mid-flow |

The retail ebook was wrong in a different and worse way. `SUB-BOOK TWO` was
absorbed into the chapter header as a *second* `chapter-subtitle`, and the title
line became the chapter's opening paragraph:

```html
<p class="chapter-label">CHAPTER EIGHT</p>
<p class="chapter-subtitle">MORNING COFFEE</p>
<p class="chapter-subtitle">SUB-BOOK TWO</p>      <!-- wrong -->
<p class="chapter-hz">107.3 Hz · Kansas City</p>
...
<p class="first-para">The Opposition</p>           <!-- wrong: orphan opening para -->
```

`classify()` routed `SUB-BOOK TWO` to `chtitle` via the generic
`text.isupper() and len(text) < 60` rule, while `The Opposition` fell through to
`body`.

## Why deletion rather than restyling

There is **no SUB-BOOK ONE** anywhere — not in the BUILD docx, the DEMY corpus,
the ITALICIZED source, or the omnibus draft — and `CANON.md` never mentions
sub-books at all. A "Sub-Book Two" with no Sub-Book One is a leftover from an
earlier structure. Author ruled: delete.

## Sources patched (7 files, `.PRE_SUBBOOK_2026-08-29.bak` backups)

Each site had its shape asserted paragraph-by-paragraph before anything was cut;
the script refuses to proceed on any mismatch.

| File | Cut |
|---|---|
| `_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx` | duplicate SECT + label + subtitle + trailing SECT, ×2 sites |
| `_sources/MASTERS_X_BOOK3_ITALICIZED_FIXED.docx` | same |
| `cartographer/corpus_raw/BOOK3_from_docx.txt` | same (mirrors the paragraph stream) |
| `_sources/MASTERS_X_BOOK3_DEMY_9798256010072.txt` | label + subtitle lines only (page-dump artifact) |
| `_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt` | same |
| `cartographer/corpus/MASTERS_X_BOOK3_DEMY_9798256010072.txt` | same |
| `cartographer/corpus_raw/omnibus_v8_fulltext.txt` | same |

Both boundaries now match the standard 27-chapter shape.

## Page counts — the constraint the author set

| Artifact | Before | After delete | Shipped | Canon | Note |
|---|---|---|---|---|---|
| Omnibus HC `9798295884412` | 684 | **680** | **684** | 684 | padded, see below |
| Omnibus PB `9798256072704` | 732 | **732** | 732 | 732 | absorbed by reflow, no action |
| Book 3 HC `9798295812705` | 177 | 177 | 177 | 170 | unchanged; pre-existing drift |
| Book 3 PB `9798256010072` | 205 | 205 | 205 | 200 | unchanged; pre-existing drift |

The hardcover lost four pages because each divider had occupied a recto **plus**
its blank verso. Everywhere else the labels sat mid-flow, so removing them only
reflowed within existing pages.

### Why the hardcover was padded rather than re-covered

The live IngramSpark jacket and caselam were built for 684 pages and their source
PDFs are **not on this machine** — only `cover_front_web.png` survived the July
cleanup. So the page count had to be held.

`_scripts_from_windows/pad_omnibus_hc_to_canon.py` appends the shortfall as blank
pages at the correct Royal trim. It is idempotent, refuses to run if the trim is
wrong, if the file already exceeds canon, or if the gap is larger than the known
4-page divider delta.

**This step is mandatory after every omnibus HC rebuild.** The generator emits 680;
shipping requires 684.

Padding goes at the end, not at the former divider positions: trailing blanks are
standard in print and invisible, whereas a blank recto dropped into the middle of
the narrative reads as a binding defect.

## Verification

| Artifact | SUB-BOOK | orphan title | pages | trim | epubcheck |
|---|---|---|---|---|---|
| Omnibus HC | 0 | 0 | 684 = canon | 6.14×9.21 | — |
| Omnibus PB | 0 | 0 | 732 = canon | 5.50×8.50 | — |
| Book 3 HC | 0 | 0 | 177 | 6.14×9.21 | — |
| Book 3 PB | 0 | 0 | 205 | 5.50×8.50 | — |
| Book 3 EPUB `9798256009809` | 0 | 0 | — | — | 0 fatal / 0 error / 0 warn / 0 info |

Chapter Eight's header is now `CHAPTER EIGHT / MORNING COFFEE / 107.3 Hz · Kansas City`
and its first paragraph is the real opening line. Chapter Seventeen likewise.
Book 3 scene-break count moved 138 → 134, exactly the four redundant ornaments removed.
The Chapter One canon fix is still present in Book 1 and both omnibus interiors, and
all eight print interiors verified as genuine `%PDF`.

## Incident: omnibus PB interior briefly clobbered

`generate_epubs_v1.py` reads `BUILD_OUTPUT` from `os.environ` **at module import**.
The interactive shell leaked that variable between commands, so a Book 3 EPUB build
wrote an EPUB to
`production_staging/omnibus/9798256072704_PB/interior.pdf`, replacing the PDF with a
ZIP. Detected by a file-signature check (`PK` instead of `%PDF`).

Repaired by rebuilding the paperback interior from source with an explicitly
constructed environment; the result is 732 pages and byte-identical in size
(1,315,351 B) to the pre-incident build, confirming a deterministic rebuild. No
other artifact was affected — all eight interiors were signature-checked afterwards.

Lesson for future runs: drive these generators from a script that strips `BUILD_*`
from the environment per job rather than setting shell variables.

## Still open

- The Books 1–3 individual print interiors remain blocked on the pre-existing
  +7 HC / +11 PB page-count drift documented in `CANON_FIX_2026-08-29.md`. This
  change did not affect it.
- `cover_wrap.pdf` for Book 1 paperback `9798256008048` is still missing.
