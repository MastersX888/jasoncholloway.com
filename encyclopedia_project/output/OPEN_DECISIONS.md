# OPEN DECISIONS — Masters X Universe Encyclopedia
## Author sign-off log (July 2026)

---

## Resolved (author confirmed)

| # | Decision | Resolution | Propagated to |
|---|----------|------------|---------------|
| 1 | Omnibus page count | **HC 686 · PB 734** (format-specific; v8 extraction PDF = 684 interior content pages) | `CANON.md` §2A, `books.ts`, `catalog.ts`, site |
| 3 | Andrew Chen vs. Blackwood | **Andrew Chen** — canonical | `CANON.md` §3 |
| 4 | Two Chens | **Intentional** — Andrew and Marcus Chen are unrelated | `CANON.md` §3 |
| 5 | Hawkes monograph ISBNs | **PB 9798295778247 · HC 9798349308444 · EPUB 9798295778926** | `CANON.md` §2B, `books.ts`, `catalog.ts`, site |
| 6 | Foundation naming | **In-universe evolution** — *Masters Foundation for Acoustic Research* → *William Masters Foundation* | `CANON.md` §3, encyclopedia entry |
| 7 | Moleskine / notebook count | **William = 7 notebooks; Blake = Moleskines IX–X** (not seventeen) | `CANON.md` §3, `VERIFICATION_LOG.md`, encyclopedia entry |

---

## Open — needs prototype, author, or Claude Pass 2

### 2. Collector vs. standard edition content split
**Proposal:** Excerpts (~40–55 pp) in standard 7×10 reference; full 247-page Distribution File as separate facsimile in collector slipcase (`02_DISTRIBUTION_FILE_INTEGRATION.md`).

**Author (July 2026):** Intrigued but wants prototypes before committing. Concern: reference books should keep all information in one place; a detached slipcase risks separation/loss. Open to seeing physical prototypes. Also needs a non-IngramSpark print vendor if slipcase/facsimile proceeds.

**Status:** Deferred pending prototype review. Standard edition should integrate Distribution File content in-book until decided.

---

### 8. Invented-vs-sourced flags — Cursor pre-pass status

**Resolved in Draft 1 entries:** Oscar-01, Malta/Cook 2008, Miller Nichols, Hotel Phillips, Codex Gigas, Ghana fiction label, Temple Lot (no v8 scene), Missouri wine (dialogue vs. history documented).

**Still open (author):** June 1924 Moreau article · Holloway family clearance · Cognigenics.txt (file missing) · Specchi 1843 mission ID (optional).

**Claude Pass 2:** Integrate `CITATIONS_ADDENDUM.md` into bibliography; second entry tranche.

---

## Cursor verification reference

Full grep evidence: `output/VERIFICATION_LOG.md` · Pinned URLs: `output/CITATIONS_ADDENDUM.md`

## Original issue notes (archive)

<details>
<summary>Item 1 — omnibus page count (resolved)</summary>

Previously: CANON locked 736; v8 PDF measured 684 content pages. Author resolved with edition-specific counts: HC 686, PB 734.

</details>

<details>
<summary>Item 3 — Andrew Chen (resolved)</summary>

v8 omnibus and Distribution File use **Andrew Chen** exclusively (13 omnibus occurrences; DF title page). Zero "Blackwood" in v8.

</details>

<details>
<summary>Item 5 — Hawkes ISBNs (resolved)</summary>

Reconciled to Ingram catalog: PB 9798295778247, HC 9798349308444, EPUB 9798295778926.

</details>

**Standing rule:** CANON.md governs website-visible copy. Discrepancies are logged here, not silently resolved.

---

# PASS 2 ADDITIONS (Claude, July 2026)

## New items logged

### 9. Distribution File integration — REVISED to in-book default (needs confirmation, not prototype)
Per author feedback on item 2, `02_DISTRIBUTION_FILE_INTEGRATION.md` (Rev. 2) now recommends **full in-book integration of the 247-page DF in all editions** (~200–230 reset pages; projected volume ~560–680 pp, over the 480–600 target but well under the 840 pp Ingram ceiling). Collector slipcase facsimile demoted to optional prototype (Option B — and redesigned as a *duplicate* of the bound copy, so nothing detachable is unique). **Author action:** confirm the page-target overage is acceptable, or direct trimming from the second entry tranche.

### 10. "Andrew Park" — third archival name form (no action)
The V3 annotation layer refers to Blake's friend once as **"Andrew Park"** — predating both the "Blackwood" project records and the canonical **Andrew Chen** (CANON §3, resolved item 3). Logged for the project's name-history record only; no propagation needed.

### 11. Mikulov "Jesuits planted in 1617" (Khoury scene) — minor, new
The Moravian Riesling detail in the Khoury scene (*Omnibus*, Vol. II) cites a 1617 Jesuit planting near Mikulov. Real Moravian viticulture and Jesuit presence are documented in general; the specific 1617 date needs a source or an invention label if the encyclopedia repeats it. Entry currently carries `[NEEDS SOURCE]`.

### 12. Loyd vs. Lloyd orthography (apparatus)
`frequency_bands.json` spells "Lloyd healing codes"; the published author of *The Healing Code* is Alex(ander) **Loyd**. The apparatus headnote flags it; pick one spelling at the print pass (recommend the real-world "Loyd" in the headnote prose, retaining the JSON's key name only as a data citation).

### 13. Grabovoi fraud-conviction sentence (apparatus) — verify before print
The Quantum Healing Codes headnote states Grabovoi's 2008 Russian fraud conviction from general knowledge. Accurate to the best of current information, but it is a legal claim about a living person — pin a citation at the print pass.

## Status update on standing author items (unchanged, per Pass 2 instructions)
- Holloway family-history clearance — `[AUTHOR VERIFY]` retained on the William Masters entry.
- June 1924 Moreau article — flag retained; template only.
- Cognigenics.txt — still missing; **not cited anywhere** in Draft 2 (Teresa Morales entry deliberately cites none of it).
- Specchi 1843 mission ID — optional; entry asks via footnote-style flag.
- Collector slipcase — "prototypes pending" noted in Rev. 2 plan.
