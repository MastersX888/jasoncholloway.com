# Story Canon Digest

**Authority:** `CANON.md` (website-locked facts) — **except print page counts,** whose authority is `lib/data/ingram-catalog.json` (demoted out of canon 2026-08-29; see §Open Decisions 1–2). This digest adds measured print data and flags open discrepancies.

---

## Bibliographic Canon

### Masters X Trilogy

**Print page counts are NOT canon — source of truth is `lib/data/ingram-catalog.json`.** `CANON.md` §2A was demoted from authority to pointer on 2026-08-29 and no longer names figures to cite; the table below is a convenience copy of the JSON and is **not** authoritative. If the two disagree, the JSON is right.

| Edition | ISBN | HC | PB | EPUB (reflowable, est.) |
|------|------|---:|---:|---:|
| Vol. I *Inheritance of Frequency* | 9798295800801 HC · 9798256008048 PB | 163 | 189 | 267 |
| Vol. II *The Grimoire* | 9798295812675 HC · 9798256009953 PB | 225 | 271 | 385 |
| Vol. III *The Kingdom* | 9798295812705 HC · 9798256010072 PB | 177 | 205 | 291 |
| Omnibus *Complete Trilogy* | 9798295884412 HC · 9798256072704 PB | 684 | 732 | — |

Print figures verified 2026-08-29 two independent ways: PyMuPDF read them out of the eight interior PDFs on disk, and they match the live IngramSpark counts 6 of 6. EPUB figures are unverified July 2026 Ingram estimates — EPUB has no fixed pagination.

| Item | Measured | Notes |
|------|---------:|-------|
| Distribution File | **247** | In-universe document; 5 parts; see extracted fulltext |

### ISBN Matrix (locked — from CANON.md)

Vol. I HC 9798295800801 · PB 9798256008048 · EB 9798256008819  
Vol. II HC 9798295812675 · PB 9798256009953 · EB 9798256009625  
Vol. III HC 9798295812705 · PB 9798256010072 · EB 9798256009809  
Omnibus HC 9798295884412 · PB 9798256072704

### Annotated Edition (prior draft)

- **323 pages** (V3 PDF) — salvage annotations selectively; fresh annotations preferred per author direction

---

## Locked Story Facts (CANON.md §3)

| Fact | Value |
|------|-------|
| William Masters' death | 2003 |
| James Masters' death | September 2010 |
| Breitling Navitimer year | 1967 |
| Ozark lake depth | 90 feet |
| SubTropolis bedrock tunnel depth | 160 feet |
| Blake's bilateral tremor frequency | 111.2 Hz |
| Brother Aldric's scriptorium date | 1267 (Bohemia) |
| Blake's location in Book 3 | Iceland (Mýrdalsjökull) — not KC physically |
| Nadia's location in Book 3 | Ghana (Volta Region) |

---

## Distribution File Structure (247 pp)

1. Preparation Protocols  
2. Chamber Specifications  
3. Harmonic Frequency Derivations  
4. Facilitator Training Manual  
5. Acoustic Research Appendix  

**Full text:** `encyclopedia_project/sources/distribution_file_fulltext.txt`

---

## Open Decisions / Contradictions to Resolve

1. **Omnibus page counts:** **Resolved 2026-08-29** — HC **684**, PB **732**, read from the interior PDFs and matching the live IngramSpark listings. The old 686/734 pair was never a print measurement.
2. **Vol. I–III page counts:** **Resolved 2026-08-29** — HC 163 / 225 / 177, PB 189 / 271 / 205; all six match live 6 of 6, so they are no longer estimates. They are also no longer canon: page counts moved out of `CANON.md` §2A into `lib/data/ingram-catalog.json` on 2026-08-29. The stale July table had been published from canon to TheStoryGraph, Goodreads, Open Library and Pinterest on 2026-08-02 and into the site's JSON-LD `numberOfPages` — a canon instruction to cite fixed page numbers is what carried it there. Page counts are build data, not narrative canon.
2b. **EPUB `numberOfPages` — deliberately omitted:** **Ruled 2026-08-30 — leave it omitted, nothing changed.** The JSON-LD on both domains emits `numberOfPages` for every paperback and hardcover edition and **none** for the three ebooks. That is correct. The catalog's Vol. I 267 / Vol. II 385 / Vol. III 291 are **July 2026 Ingram estimates that were never verified** — item 2 above verified the eight *print* counts 6 of 6 against live IngramSpark and explicitly did not verify these — and a reflowable EPUB has no fixed pagination to be right about. Publishing unverified counts to retailers is the 2026-08-02 failure in item 2, still unwound on four listings. **Measure the EPUBs before any pass adds the field.** No code was changed and neither site was redeployed — see `EBOOK_PAGECOUNT_RULING_2026-08-30.md`.
3. **Email delivery:** On-page at `/chapters-sent/` (commit `5f292c3`).
4. **Hawkes monograph ISBNs:** **Resolved** — PB 9798295778247, HC 9798349308444, EB 9798295778926.
5. **Andrew Chen:** **Resolved** — canonical (not Blackwood).
6. **Multiple Chens:** **Resolved 2026-08-29** — there were seven; Andrew Chen is now the **only** Chen. Sarah Chen → Sarah Ashworth (Vol. I) and Rosalind Lindgren (Vol. II, a different person); Marcus → Whitaker; Margaret → Ferrand; Laura → Okada; Lin → Zhao; Michael → Halloran; Andrew Tanaka → Nolan Eriksen. See `production_staging/NAME_FIX_2026-08-29.md`.
6a. **Sabrina Volkov / Nadia:** **Resolved 2026-08-29** — **sisters**, not relations by marriage. Vol. II "shared by marriage" phrasing corrected.
6b. **Multiple Margarets:** **Resolved 2026-08-29 (Batch 2)** — there were three, not two. Blake's mother **Margaret Masters → Lorraine Masters** (24 refs, Vols. I–II); **Senator Margaret Holt → Senator Deborah Holt** (1 ref, Vol. II — *given name only*, the surname Holt and its ~17 bare references are unchanged); **Margaret Ferrand** (Vol. III board chair) keeps her name. **Margaret Ferrand is now the only Margaret in the trilogy** — Vol. III holds exactly ten `Margaret` tokens, Vols. I–II hold zero, and any Margaret outside Vol. III is a regression. Blake's mother also gained her first `CANON.md` entry, having never had one.
6c. **Marcus Jr. / Kofi Mensah:** **Resolved 2026-08-29 (Batch 3)** — two Vol. III single-token fixes. **Marcus Jr. → Idris Broussard** (cohort student): there is no Marcus Sr. in the trilogy, so the suffix falsely implied he was the son of **Marcus Whitaker**, the Director of Instruction, and he was the only member of the eight-student list without a surname. **Marcus Whitaker is unaffected and keeps all his mentions.** **Kofi Mensah → Kofi Asante** (1 ref): a typo, not a second character — he is **Kofi Asante** everywhere else, same university, same role, same Volta cave responsibility. `Kofi Asante` is the single canonical name; `Kofi Mensah` must never be restored.
6d. **"Restless candlelight guttered." — closing-line italics:** **Ruled 2026-08-29 — roman in both places, nothing changed.** The sentence occurs exactly **twice** in the trilogy: it is the **first narrative line of Vol. I** and the **last line of Vol. III**, 667 printed pages apart in the omnibus (HC pp. 9 and 677). **Both are roman by author ruling** — the recognition at the close depends on the two lines matching on the page. The run in `_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx` (para 1602) carries an **explicit** `<w:i w:val="0"/>`: deliberate, not italic-strip damage. The trilogy has **no closing-line italic convention** — Vols. I, II and III all end in roman narration in all three formats. **No italic-normalisation or QC pass may change either instance.** No prose was edited and no artifact was rebuilt — see `production_staging/TYPOGRAPHY_RULING_2026-08-29.md`.
7. **Foundation naming:** **Resolved** — in-universe evolution.
8. **Collector edition / Distribution File split:** Open — author wants prototypes (`OPEN_DECISIONS.md` §2).
9. **Moleskine seventeen count:** Open — needs trilogy deep read.
10. **15 in-entry source flags:** Open — `OPEN_DECISIONS.md` §8.

**Full detail:** `encyclopedia_project/output/OPEN_DECISIONS.md`

---

## Encyclopedia Draft 1 (Claude pass, July 2026)

Integrated at `encyclopedia_project/output/`:

| Deliverable | Path |
|-------------|------|
| Table of contents | `output/encyclopedia/00_ENCYCLOPEDIA_TOC.md` |
| 38 annotated entries | `output/encyclopedia/01_ANNOTATED_ENTRIES/` |
| Distribution File strategy | `output/encyclopedia/02_DISTRIBUTION_FILE_INTEGRATION.md` |
| Annotated bibliography | `output/encyclopedia/03_ANNOTATED_BIBLIOGRAPHY.md` |
| Index draft | `output/encyclopedia/04_INDEX_DRAFT.md` |
| Blog/newsletter (8) | `output/marketing/blog_newsletter/` |
| Social (15) | `output/marketing/social/` |
| YouTube (3 scripts) | `output/marketing/youtube/` |
| Session status | `output/HANDOFF_STATUS.md` |
| Part Three essays (2 of 7) | `output/encyclopedia/PART_THREE_ESSAYS/` |
| Draft 2 entries (29 + 5 headnotes) | `output/encyclopedia/01_ANNOTATED_ENTRIES/06–10_*.md` |

*67 entries total (Pass 1 + Pass 2). Part Three essays 3–7 still outlined only. Third entry tranche deferred.*
