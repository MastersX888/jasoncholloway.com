# RETAIL_METADATA.MD — MASTERS X

Paste-ready retail metadata for Amazon/KDP, IngramSpark, Goodreads, and StoryGraph.
Derived from *Masters X — Cursor Agent Handoff Brief* (Ticket 3), with corrections
applied where the brief conflicted with platform policy, the BISAC standard, or the
live catalog.

**Nothing in this file has been submitted to any platform.** Every section is a draft
for Jason to paste. `CANON.md` wins any conflict.

Verification basis:

- Keyword policy — [KDP Metadata Guidelines](https://kdp.amazon.com/en_US/help/topic/G201097560)
- BISAC codes — [BISG Fiction subject list](https://www.bisg.org/fiction)
- Live catalog state — `lib/data/ingram-catalog.json` (IngramSpark report.csv, synced 2026-07-17)
- Prices / ISBNs / page counts — `lib/data/books.ts` and `CANON.md` §2A
- Quotes — `cartographer/corpus_raw/omnibus_v8_fulltext.txt` (v8 omnibus)

---

## 1 · KDP KEYWORD SLOTS (7 per title)

All strings are within the 50-character per-slot cap. **Three slots from the brief were
replaced** because KDP prohibits referencing "Other authors" and "Books by other
authors" in keyword fields; the stated penalties are metadata rejection, search
suppression, and account flags. Replacements preserve the comparative-reader signal
without naming anyone. Originals are recorded in §1.5 so the decision is auditable.

### Vol. I — The Inheritance of Frequency

1. `literary conspiracy thriller`
2. `monastery mystery scholar detective` ← **replaced**
3. `subtropolis kansas city mystery`
4. `secret society novel medieval manuscripts`
5. `schumann resonance fiction`
6. `slow burn literary thriller`
7. `novels about hidden history missouri`

### Vol. II — The Grimoire

1. `medieval grimoire novel`
2. `ars notoria sefer yetzirah fiction`
3. `archaeoacoustics cave resonance`
4. `iceland literary fiction`
5. `codex gigas novel`
6. `esoteric thriller literary`
7. `gospel of thomas novel`

### Vol. III — The Kingdom

1. `contemplative literary fiction`
2. `novels about listening and silence`
3. `visionary metaphysical fiction`
4. `sound healing novel`
5. `book club literary fiction trilogy conclusion`
6. `kansas city literary novel`
7. `mindfulness novel`

### Omnibus — The Complete Trilogy

1. `complete trilogy literary thriller`
2. `conspiracy thriller spiritual awakening` ← **replaced**
3. `literary conspiracy trilogy omnibus`
4. `scholarly historical mystery` ← **replaced**
5. `acoustic thriller`
6. `novels about frequency and resonance`
7. `visionary fiction trilogy hardcover`

### 1.5 · Replaced strings — DO NOT PASTE

| Title | Slot | Original (non-compliant) | Reason |
| --- | --- | --- | --- |
| Vol. I | 2 | `books like the da vinci code and name of the rose` | Names two books by other authors |
| Omnibus | 2 | `dan brown meets eckhart tolle` | Names two other authors |
| Omnibus | 4 | `umberto eco kostova readalike` | Names two other authors |

These phrasings remain usable in **paid advertising** (Ticket 4) and on
**jasoncholloway.com**, where Amazon's metadata rules do not apply. The restriction is
specific to KDP metadata fields.

### 1.6 · Optimisation note (not blocking)

KDP advises against spending slots on words already indexed from the title. Four
Omnibus slots repeat "trilogy," which is already in *Masters X: The Complete Trilogy*,
and Vol. III slot 5 repeats it again. Recovering those slots for un-indexed phrases is
a possible second pass; it is not a compliance issue.

---

## 2 · BISAC CATEGORIES

**Recommended for the omnibus and all three volumes, in priority order:**

1. `FIC019000` — FICTION / Literary
2. `FIC030000` — FICTION / Thrillers / Suspense
3. `FIC039000` — FICTION / Visionary & Metaphysical

### 2.1 · Correction to the brief

The brief specified `FIC031000` labelled "Thrillers/Suspense." That code is
**FICTION / Thrillers / General** in the BISG list. The code for Thrillers / Suspense is
`FIC030000`, which the catalog already carries. Submitting the brief's code as written
would have replaced a specific heading with a generic one — the opposite of BISG
guidance, which directs publishers to the most specific applicable heading.

### 2.2 · Live state and the actual delta

All eleven Masters X editions currently carry an identical trio:

- `FIC030000` FICTION / Thrillers / Suspense
- `FIC019000` FICTION / Literary
- `FIC014000` FICTION / Historical / General

So the real change is narrower than the brief implies: **promote Literary to primary,
and swap `FIC014000` (Historical / General) for `FIC039000` (Visionary & Metaphysical).**
Thrillers / Suspense stays, unchanged, in the middle slot.

Rationale for dropping Historical / General: the trilogy's present-day spine is
contemporary, and the historical material is backstory rather than setting. Visionary &
Metaphysical is where the Vol. III readership actually browses, and it is the category
the repositioning is aimed at. This is a live-catalog edit in IngramSpark, not a
fill-in-the-blank — **TODO(jason)**.

---

## 3 · AMAZON A+ CONTENT

### 3.1 · Module 1 — headline

> **Three generations. Seven sites. One frequency.**

### 3.2 · Module 2 — comparison chart (rebuilt price-free)

**The brief's version cannot be submitted as specified.** It calls for a comparison
module built on "omnibus value math," and A+ Content prohibits prices, discounts, and
promotional language anywhere in the submission, including inside comparison charts.
Amazon also allows only one comparison chart per submission (since 28-OCT-2024), and
charts may compare only your own products — which the omnibus-vs-volumes framing
satisfies.

Rebuilt on non-price attributes, which carries the same "best value" message while
staying compliant. Amazon renders the actual price beside the chart regardless.

| | Omnibus Hardcover | Omnibus Paperback | Individual Volumes |
| --- | --- | --- | --- |
| Novels included | All three | All three | One per book |
| Extent | 686 pages | 734 pages | 156–218 pp HC · 178–260 pp PB |
| Physical volumes | One | One | Three |
| Best for | Readers who want the whole arc in hand | Same, lighter binding | Sampling Book I first |

Per `CANON.md` §2A, always qualify the omnibus extent by format — never cite a single
unqualified page number.

For reference, the value math the brief wanted (usable on the site and in ads, **not**
in A+): three hardcovers at direct pricing total **$89.97** against **$44.99** for the
omnibus hardcover, a **$44.98** difference. `lib/data/storefront.ts` derives this from
`books.ts` at render time — do not hardcode it anywhere.

### 3.3 · Module 3 — quote card

> **"The chambers were training wheels, Dr. Masters. The ninth page is the bicycle."**
> — *Masters X: The Kingdom*

The brief's card dropped ", Dr. Masters," which contradicts its own instruction that the
canonical quotes are exact text and must not be paraphrased. The full form above is
verbatim from the corpus, and the attribution to *The Kingdom* is confirmed.

---

## 4 · STORYGRAPH & GOODREADS

**StoryGraph moods:** `atmospheric`, `reflective`, `mysterious`, `informative`,
`slow-paced`
**Pacing:** slow
**Plot- vs character-driven:** mixed (leave as-is)

**Goodreads:** seed the quote section with §5 below, using the per-volume attributions
rather than attributing everything to the omnibus. Create the Listopia list *"Literary
conspiracy novels that become something else"* and add the comp titles alongside
Masters X — Listopia is user-generated editorial space, so naming comps there is
normal practice and carries none of the KDP metadata restriction.

---

## 5 · CANONICAL QUOTES (VERIFIED VERBATIM)

All six were matched character-for-character against the v8 omnibus. Attributions below
are corrected where the source differs from assumption — use these, not the brief's.

1. "The kingdom of God is within you. It was not a metaphor. It was a technical
   description."
   — *Masters X: The Grimoire* (Vol. II)

2. "The chambers were training wheels, Dr. Masters. The ninth page is the bicycle."
   — *Masters X: The Kingdom* (Vol. III)

3. "There's no chaos in nature, Blake. Only patterns we don't understand yet."
   — William Masters, omnibus epigraph. Also spoken in *The Inheritance of Frequency*
   (Vol. I), where the line opens with "But." Quote it in the epigraph form above.

4. "Jesus was not speaking to sinners. He was speaking to instruments that had forgotten
   how to play."
   — *Masters X: The Grimoire* (Vol. II)

5. "The kingdom was a grandmother in a folding chair."
   — *Masters X: The Kingdom* (Vol. III)

6. "Redundancy defeats suppression."
   — *Masters X: The Inheritance of Frequency* (Vol. I), first spoken by Nadia; recurs
   across Vol. I and again in Vol. III.

---

## 6 · OPEN FLAGS

1. **TODO(jason) Omnibus cover state before A+ refresh.** ASIN B0H3FRMLJD had a
   stale-cover issue (Author Central case #51308891). Per Ticket 7 this must be
   confirmed before A+ content is refreshed; it needs Author Central access.

2. **TODO(jason) Comp-author keywords already live at Ingram.** The IngramSpark keyword
   fields for the Masters X editions already contain "Dan Brown" and "Umberto Eco"
   (44 occurrences across `ingram-catalog.json`). Ingram's rules are not Amazon's, but
   these fields feed retail partners including Amazon. Worth a deliberate decision on
   whether to strip them at the next Ingram metadata pass.

3. **TODO(jason) `books.ts` and the Ingram catalog disagree on per-volume prices.**
   `books.ts` prices all three volumes identically (HC $29.99 direct / $33.99 MSRP;
   PB $16.99 / $18.99), while the Ingram catalog lists them individually — HC $29.99 /
   $33.99 / $32.99 and PB $16.99 / $22.99 / $19.99 for Vols. I–III. Vol. II paperback is
   the widest gap, $22.99 at Ingram against an $18.99 MSRP on the site. Omnibus pricing
   is consistent and matches `CANON.md`. This is outside Ticket 3 but affects prices
   shown to customers.
