# PUBLICATION STATUS — FABLE PASS 2
## Two-Product Print Program (Rev. 3) · July 10, 2026 · Seventh City Press LLC

## Quality gates — all green

**Companion:** 8.5 × 11 throughout ✓ · 357 pp typeset / 358 submit ✓ · DF Part Four = 251
facsimile pages, *DF* pp. 1–247 stable ✓ · frequency tables set live from
`frequency_bands.json`, zero FPO ✓ · fonts embedded, K-only ✓ · all 25 openers recto ✓

**Dictionary:** Vol. 1 complete press-proof ✓ — **and Vols. 2–3 (stretch) complete**: full
set typeset, 2,062 pp, all 115,504 entries ✓ · volume plan documented with measured counts ✓ ·
density 56.8 entries/page at readable size (gate: ≥35) ✓ · no encyclopedia prose in any
dictionary volume ✓

**Covers/route:** BookVault RFQ complete ✓ · Companion + all three volume spines match
calculated widths (built into the wraps) ✓ · slipcase art for the full set ✓ · zero website
files touched ✓

**Authority:** Rev. 3 architecture followed — no reversion to single 7×10 ✓ · discrepancies
flagged, not silently resolved ✓ (see below)

## Completed this pass

1. Re-spec at 8.5 × 11 (`INTERIOR_SPEC_8.5x11.md`) — Pass 1 system re-homed, not shrunk:
   two-column entries, inset essays, compact dictionary rule.
2. **Companion interior** built end-to-end on the Rev. 3 architecture (DF moved to Part Four;
   How-to-Use-the-Dictionary page added; citations addendum integrated into the bibliography;
   real frequency tables under the five fiction/fact headnotes plus a factual brainwave note).
3. **Full dictionary set** — parsed the 13.9 MB print master (docx → 115,504 entries exactly),
   built a production dictionary typography (guide words, in-flow letter dividers, compact
   band-tag key with printed legend, seam note in the Vol. 1 preface per Rev. 3 §7), and
   typeset all three volumes including the Vol. 3 back matter (Prayers & Sacred Words,
   research notes, Appendices A–G).
4. **Five cover art proofs** — Companion wrap, three matched volume wraps, slipcase panels —
   CMYK vectors on the locked brand (K-100 / gold foil separation / Cinzel / heptagram
   construction motif), each carrying its spine math in a slug.
5. **BookVault RFQ** consolidated (inherits and supersedes the Pass 1 Edition B build sheet
   at the new trim), with Bookmobile / 48 Hour as parallel-quote alternates.

## Discrepancies logged (flagged, not silently resolved)

| # | Finding | Disposition |
|---|---|---|
| D-1 | **Letter-count table in the prior pagination report does not match the print master.** Verified counts: A = 6,132 (not 8,968); E = 3,907 (not 25,615 — no 700-pp E volume exists); S = 12,286 is the largest letter. Total 115,504 exact. | Volume plan rebuilt on authoritative counts; `LETTER_A_PAGINATION_REPORT.md` updated; prior distribution superseded. |
| D-2 | Production density 56.8 e/p vs. 36.6 baseline → set = 2,062 pp, not ~3,156. | **Three-volume set proposed** (546/714/802), all under 840. Author sign-off requested. |
| D-3 | Companion lands at 358 pp vs. 400–450 estimate (two-column efficiency). | Ledger documents the delta; no content cut. |
| D-4 | Dictionary preface names "Dr. Alexander Lloyd"; P2-1 directs "Loyd" in prose. Source text retained verbatim in the facsimile-faithful preface; compact tag stays `Lloyd·` matching the source's own band lines. | **[AUTHOR VERIFY]** — reconcile Loyd/Lloyd for the dictionary product specifically. |

## Open — author sign-off queue

1. **Three-volume split** (A–D / E–M / N–Z) — DICTIONARY_VOLUME_PLAN.md
2. **ISBN block: 5 assignments** (Companion, set, three volumes) — blocks barcodes + copyright pages
3. Entry list: all 69 typeset by default; optional trim to author's 40–80 list (P1-1)
4. Essays 3–7 prose (cast off at 6 pp each meanwhile) (P1-2)
5. Loyd/Lloyd in the dictionary preface/tags (D-4; P2-1)
6. Holloway family clearance — `[AUTHOR VERIFY]` flags remain printed (P1-4)
7. Set retail pricing after RFQ returns
8. Dictionary cover giant-numeral treatment sign-off (quieter variant is a one-line regen)

## Pipeline (in `pipeline/`)

Companion: `engine.py` / `content.py` / `dfset.py` / `main.py` (Pass 1 system at 8.5 × 11,
Rev. 3 order, recto-parity solver). Dictionary: `dict_engine.py` / `dict_main.py`
(docx-extracted master → 3 volumes in ~16 s). Covers: `covers.py` (all five files, spine math
inline). All deterministic — Pass 3 content changes are a rebuild, not a redesign.

## File state

All PDFs are press-proofs: correct geometry, embedded subset fonts, K-only interiors, CMYK
covers with foil-ready gold separation. Final PDF/X export + template re-flow happens on
BookVault template receipt.
