# PUBLICATION STATUS — DESIGN & TYPESETTING PASS
## July 10, 2026 · Seventh City Press LLC

## Completed this pass

1. **Printer research (verified against current sources).** IngramSpark file requirements
   and paper PPI (Paper Specs rev. 8/18/23: 50# white 512 PPI / 50# crème 444 / 70# 377);
   7 × 10 jacketed HC unavailable on Ingram (case laminate confirmed as Edition A route);
   collector vendors compared — BookVault Bespoke recommended, Bookmobile and 48 Hour Books
   as US alternates.
2. **Full interior design system** — documented in DESIGN_TEAM_RECOMMENDATIONS.md and
   implemented, not merely proposed.
3. **Both editions typeset end-to-end.** Edition A 369 pp / Edition B 371 pp; 7 × 10;
   Cinzel / EB Garamond / Courier Prime, subset-embedded; two-register entry typography;
   two-pass generated contents; two-column index; recto openers solver-enforced;
   roman→arabic folios.
4. **Distribution File reset whole** — 251 facsimile pages, one source page per book page,
   *DF* pp. 1–247 stable; data tables reconstructed from the flattened capture into true
   grids; DF chrome + marginal register rule on every page (Rev. 2 executed).
5. **Spec-sheet package for the cover phase** — interior spec, spine math (both stocks,
   current + projected extents), Ingram metadata with BISAC and description, cover handoff
   with wrap geometry and brand rules, Edition B collector build sheet.
6. Canon compliance held: Cognigenics.txt never cited; omnibus cited only as 686 HC /
   734 PB qualified; "Loyd" in prose; verification flags printed in place, not resolved
   silently.

## Open — needs the author (unchanged priority order)

| # | Decision | Where it bites |
|---|---|---|
| 1 | **ISBN assignment** (new; do not reuse trilogy block entries) | Copyright page + barcode |
| 2 | **Pass 3 content**: entry tranche 3 (+53–83), Essays 3–7 prose | Final page count → spine |
| 3 | DF page-target overage sign-off (full 251-pp facsimile confirmed as built) | Already typeset; reversal = major re-flow |
| 4 | Holloway family clearance [AUTHOR VERIFY] — flags remain printed | Entries, Persons section |
| 5 | Moreau 1924 / Mikulov 1617 / Grabovoi citation pins | Individual entries |
| 6 | Collector slipcase Option B; Edition B edition size (350 is now in type) | Edition B quote + limitation leaf |
| 7 | Illustration budget (grid accommodates figures; none placed) | Possible +pp |
| 8 | `frequency_bands.json` delivery (external drive) | Part Four tables are FPO slugs |

## File state

`print/interior_7x10_EDITION_A.pdf` and `print/interior_7x10_EDITION_B_COLLECTOR.pdf` are
**press-proofs**: final geometry and pagination for current content, embedded fonts,
K-only. PDF/X-1a export is the last prepress step at upload time, after Pass 3 re-flow.
The deterministic build pipeline ships in `pipeline/` — same inputs, same pagination.

## Next phase

**Cover design.** Everything the designer needs is in `print/COVER_PHASE_HANDOFF.md`.
Blocking inputs: ISBN, final page count (→ regenerate Ingram Cover Template Generator for
the authoritative spine), slipcase decision.
