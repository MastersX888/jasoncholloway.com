# Typography ruling — "Restless candlelight guttered." — 2026-08-29

**Author ruling: the sentence is ROMAN in both places. Nothing was changed.**

No prose was edited. No DOCX, PDF or EPUB was opened for writing. No build was
run. **All fourteen upload-ready artifacts remain valid and byte-identical.**
This document exists only so that a future italic-normalisation or QC pass does
not "fix" a line that is already correct.

Companion to `CANON.md` (the ruling, §3), its mirror
`production_staging/_docs/CANON.md`, and `universe_memory/04_STORY_CANON_DIGEST.md`
item **6d**. The hazard this guards against is documented at
`scratch/ops_reports/ITALICS_STRIP_INVESTIGATION_2026-07-30.md`.

---

## 1. The question

Jason asked whether the final line of Book 3 — **"Restless candlelight
guttered."** — should be italicised.

The premise behind the question is sound: Vol. III's last page is dominated by
Blake's closing report, which is set in italic, and the final sentence sits a
few lines below it in roman. The question was whether that roman was intended or
whether it was residue from an earlier italic-handling failure.

---

## 2. The finding — it was never italic

### 2.1 The source of record says so explicitly

In `production_staging/_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx`, the
sentence is paragraph **1602** of 1606, a single run:

```xml
<w:r>
  <w:rPr>
    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
    <w:b w:val="0"/>
    <w:i w:val="0"/>
    <w:color w:val="1A1A1A"/>
    <w:sz w:val="22"/>
  </w:rPr>
  <w:t>Restless candlelight guttered.</w:t>
</w:r>
```

`<w:i w:val="0"/>` is an **explicit instruction not to italicise**, not the
absence of an instruction. A run that had merely never been italicised would
carry no `<w:i>` element at all. Whoever set this paragraph turned italic off on
purpose.

### 2.2 Every rendered artifact agrees

Of the fourteen upload-ready artifacts, **ten** contain at least one instance.
All ten render it roman. Measured directly from the staged files (read-only;
see §5):

| Artifact | Instance(s) | Page | Font of the sentence |
|---|---|---|---|
| `b1_inheritance/9798256008048_PB/interior.pdf` | Vol. I opening | 10 / 189 | **Garamond** |
| `b1_inheritance/9798295800801_HC/interior.pdf` | Vol. I opening | 9 / 163 | **Garamond** |
| `b3_kingdom/9798256010072_PB/interior.pdf` | Vol. III close | 202 / 205 | **Garamond** |
| `b3_kingdom/9798295812705_HC/interior.pdf` | Vol. III close | 173 / 177 | **Garamond** |
| `omnibus/9798256072704_PB/interior.pdf` | **both** | 10 and 730 / 732 | **Garamond** |
| `omnibus/9798295884412_HC/interior.pdf` | **both** | **9 and 677** / 684 | **Garamond** |
| `b1_inheritance/9798256008819_EPUB/…epub` | Vol. I opening | `chapter_001.xhtml` | `<p class="first-para">` — no `<em>` |
| `b1_inheritance/9798256008819_KINDLE/…epub` | Vol. I opening | `chapter_001.xhtml` | `<p class="first-para">` — no `<em>` |
| `b3_kingdom/9798256009809_EPUB/…epub` | Vol. III close | `chapter_028.xhtml` | `<p>` — no `<em>` |
| `b3_kingdom/9798256009809_KINDLE/…epub` | Vol. III close | `chapter_028.xhtml` | `<p>` — no `<em>` |

The four Vol. II artifacts contain no instance, as expected.

### 2.3 It is not italic-strip damage

This is the distinction that matters, because the repo really does have a
history of italics being painted roman by accident. On 2026-07-30 a missing
`registerFontFamily` call in the ReportLab build stripped body italics out of
all six standalone interiors
(`scratch/ops_reports/ITALICS_STRIP_INVESTIGATION_2026-07-30.md`). The repo also
still carries `MASTERS_X_BOOK3_ITALICIZED_FIXED.docx` files named after that
repair. A reasonable auditor could suspect this line of being a survivor of the
same fault.

**It is not, and the same page proves it.** Italic still renders correctly right
next to the sentence:

| Page | Garamond spans | Garamond-Italic spans |
|---|---|---|
| Vol. III PB p. 202 | 12 | **14** |
| Vol. III HC p. 173 | 11 | **20** |
| Omnibus HC p. 677 | 11 | **1** |
| Omnibus HC p. 9 (Vol. I opening) | 3 | **8** |
| Vol. I HC p. 9 | 5 | **7** |

Blake's closing report, the byline, and the Vol. I epigraph on those same pages
are all set in **Garamond-Italic** and render correctly. The font family is
registered and working. The roman is a choice, not a casualty.

*(A note for whoever compares this against the original desk investigation: the
italic span count on the Vol. III final page is **fourteen**, not twelve —
twelve is the count of *roman* spans on that page in the PB. The conclusion is
unaffected. Span counts are per rendered line and differ by trim size; the
omnibus PB reflows the report onto the preceding page, so its p. 730 carries no
italic at all.)*

---

## 3. The Book 1 twin — why this is structural, not incidental

The sentence occurs **exactly twice in the trilogy**, and the second occurrence
is not a stray echo:

- it is the **first narrative line of Vol. I**, and
- it is the **last line of Vol. III**.

In the omnibus hardcover the two sit on **p. 9 and p. 677** — 667 printed pages
apart in one volume. Both are roman.

The Vol. I opening and the Vol. III close are built as mirror images of each
other. Vol. I opens with a Blake Masters italic epigraph, a byline, a scene
break, and then the sentence in roman as `<p class="first-para">`. Vol. III
closes by leaving the italic register in the same order and arriving at the same
sentence:

```
  italic   … The Word is still speaking. You have always been listening.
  italic   — Blake Masters, Mýrdalsjökull, Iceland
  roman    He drew a line under the byline.
  roman    He turned the page over. Smoothed it under his palm. …
  roman    The cottage was warm. The wind was high. The Breitling on the desk …
  roman    Blake wrote the first line of the manuscript.
  roman    Restless candlelight guttered.
```

The last five paragraphs of Vol. III are a deliberate *exit* from italic:
Blake's report ends, the byline is ruled under, the scene break fires, and four
roman paragraphs of physical narration follow. The closing sentence is the fifth.

**The typographic identity is the ending.** The trilogy closes by returning
verbatim to its own opening sentence, and the recognition depends on the two
lines matching on the page. Italicising the Vol. III instance would:

1. reverse a movement out of italic in its final six words;
2. break the match with page one, so the return no longer reads as a return;
3. label a beginning as a quoted specimen — italic in this trilogy marks
   documents, reports and epigraphs, which is precisely what this sentence is
   not.

There is also **no closing-line italic convention** to appeal to: Vols. I, II
and III all end in roman narration in all three formats.

---

## 4. The ruling

> **Both instances stay roman. No italic-normalisation or QC pass may change
> either one.**

Recorded in three places so a future pass meets it wherever it looks:

| File | Where |
|---|---|
| `CANON.md` | §3, bullet immediately before the Masters Foundation entry (added by the author) |
| `production_staging/_docs/CANON.md` | same bullet, same position — mirrored by this pass |
| `universe_memory/04_STORY_CANON_DIGEST.md` | item **6d**, following 6b and 6c |

---

## 5. No rebuild, no artifact touched

**Nothing was rebuilt and no artifact changed.** The source of record was already
correct, so there was nothing for a build to propagate.

- Every `.docx`, `.pdf` and `.epub` in the repository — 65 files — was
  mtime-and-size snapshotted before this pass and re-checked after. **Zero
  differences.**
- The DOCX and the ten artifacts above were inspected **read-only** (`zipfile`
  in read mode, PyMuPDF `open` without `save`). Each file's mtime was captured
  before and asserted unchanged after the read.
- `pre_upload_audit.py` was **not** modified — its `BANNED` and `REQUIRED` lists
  are untouched.
- `generate_epubs_v1.py` was **not** modified — its `validate_epub()` gates are
  untouched.
- No new gate was added. This ruling asserts a *formatting* property that
  neither gate can express: both operate on whitespace-normalised plain text,
  which cannot see italics at all. Enforcement here is documentary by necessity.

### Files changed by this pass — 2, both documentation

| File | Change | Line endings | Backup |
|---|---|---|---|
| `production_staging/_docs/CANON.md` | ruling bullet mirrored from root `CANON.md`, byte-identical, same logical position | **CRLF preserved** — 119 → 123 CRLF, zero bare LF, zero bare CR | `.PRE_TYPORULING_2026-08-29.bak` |
| `universe_memory/04_STORY_CANON_DIGEST.md` | item **6d** added after 6c | **LF preserved** — zero CRLF, zero bare CR | `.PRE_TYPORULING_2026-08-29.bak` |

Root `CANON.md` was **read only** — the author had already added the ruling
there, and this pass copied those four lines out of it verbatim rather than
re-typing them, so the two files are diffable line-for-line. Its LF endings were
confirmed unchanged (123 LF, zero CRLF) after the pass.

Backup naming follows the convention of the three name-fix passes earlier the
same day (`.PRE_NAMEFIX_`, `.PRE_MOTHERFIX_`, `.PRE_BATCH3_`). Both backups are
true pre-edit copies, taken before the write and byte-compared against the
originals.

---

## 6. Why this is a separate document

This pass changed no names, so it does not belong in `NAME_FIX_2026-08-29.md`.

That file is titled *"Name fix — the Chen collision"* and its whole architecture
— three batches, rename tables of old → new → refs → books, three generations of
`.PRE_*` backups, contamination scans — presupposes prose substitution. Every
section in it records substitutions actually applied to source text. This ruling
applied **zero** substitutions and is a decision *not* to change anything.

Filing it there would have three costs. It would make a documentation-only
ruling read as a fourth rename batch. It would leave a future reader scanning
that file for regressions hunting prose changes that do not exist. And it would
bury the ruling where its actual audience will not look: the reader who needs
this is running an italics or typography pass, and will search for *italic*,
*roman*, *Garamond*, or the sentence itself — not for a name-collision report.

`NAME_FIX_2026-08-29.md` was therefore left completely untouched. The pointers
that matter run the other way: `CANON.md`, its mirror, and digest item 6d all
carry the ruling, and 6d names this file.
