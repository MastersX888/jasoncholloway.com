# Name-confusion audit — Masters X trilogy
**Date:** 2026-08-29
**Source:** live per-volume corpus (`cartographer/corpus/MASTERS_X_BOOK*_DEMY_*.txt`),
geo-fixed, canon-fixed, SUB-BOOK-free.
**Status:** findings only. No prose changed. Every rename below needs an author ruling.

> **Superseded in part — see §8.** Two rename passes have since been applied
> (`production_staging/NAME_FIX_2026-08-29.md`). The Chen collision is closed,
> and so is the Margaret collision. This audit also **undercounted the
> Margarets**: it found two, and there are three — Senator **Margaret Holt**
> (Book 2) was missed. All three are now resolved. §4 and §7 are corrected
> below; the rest of the document stands as the original findings.

---

## Headline

You flagged one extra Chen. There are **seven**.

`CANON.md` line 75 currently records the collision as deliberate:

> *Marcus Chen* — unrelated character; shared surname with Andrew Chen is intentional

That entry accounts for two Chens. It does not account for the other five.

The good news: because the collisions are almost all in the **surname**, the fix is
tiny. Andrew Chen is named "Andrew" 383 times but "Andrew Chen" only 12. Changing a
surname touches a handful of lines, not hundreds. Clearing six of the seven Chens is
roughly **15 edits**.

---

## 1. The Chen census

| Name | Full-name mentions | Books | Role |
|---|---|---|---|
| **Andrew Chen** | 12 | B1, B2, B3 | Distribution File compiler; principal. "Andrew" appears **383** times |
| **Margaret Chen** | 5 | B3 | Foundation board chair, former dean |
| **Marcus Chen** | 3 | B3 | Director of Instruction |
| **Sarah Chen** | 3 | B1, B2 | Academic. Cambridge in B1, Stanford department chair in B2 |
| **Laura Chen** | 1 | B3 | Candidate, thermal perception |
| **Lin Chen** | 1 | B3 | Chamber participant |
| **Michael Chen** | 1 | B3 | Maryland subject who regained speech |

**Six of the seven are in Book 3.** That is why re-reading hit you there.

### The specific landmine: bare "Chen"

"Chen" appears alone, with no given name, **8 times**. In Book 1 it consistently means
**Sarah**:

> "**Chen** looked between them. 'If this holds up, this rewrites five hundred years of scholarship.'"
> "**Professor Chen** had agreed to lead independent verification."
> "**Chen's** Cambridge verification paper publishes in March."

So the bare surname points at the *minor* Chen while the *major* Chen is also a Chen.
A reader who has met Andrew Chen 380-odd times reasonably reads "Chen" as Andrew. That
is a genuine misdirection, not just clutter.

### A compounding wrinkle

Sarah Chen's work is cited by Andrew Chen:

> "Dr. **Sarah Chen**, whose work on neural oscillation **Andrew** had cited in fourteen of his own papers, had written personally."

Two academics named Chen citing each other.

### RESOLVED: "Sarah Chen" is two different people

Investigated 2026-08-29 at Jason's request. The Book 1 and Book 2 Sarah Chens are not
one character who changed institutions. They are two unrelated scholars in two
unrelated fields who happen to share a name.

**Book 1 — Cambridge manuscript scholar.** Speaking at a medieval-codex presentation
about Rudolf II's court records and geometric sequences in manuscripts:

> "Professor Sarah Chen from Cambridge stood. 'The proportional system. May I see it
> again?' She studied the geometric relationships. '**We documented every
> measurement.** But we never connected it to the seven-fold structure because—'"

She "agreed to lead independent verification"; "Chen's **Cambridge** verification paper
publishes in March." This is codicology — measuring proportions in physical manuscripts.

**Book 2 — Stanford neuroscientist.** Department chair of Neuroscience and Behavioral
Sciences, offering Andrew the Pellegrini Chair in Computational Neuroscience:

> "The department chair. Dr. **Sarah Chen**, whose work on **neural oscillation**
> Andrew had cited in **fourteen** of his own papers, had written personally."

**Why it cannot be one person:** a Cambridge manuscript scholar does not become a
Stanford neuroscience department chair in the gap between volumes, and the fourteen
prior citations establish the Book 2 Sarah as a long-established neuroscientist rather
than a recent arrival from medieval studies.

**Consequence:** the trilogy contains **eight people** across **seven** Chen
name-strings. Splitting them requires two names, and because both are currently "Sarah"
the Book 2 character needs a new given name too, or a surname collision is merely traded
for a first-name one.

Cost: 4 references in Book 1, 2 references in Book 2.

---

## 2. Marcus is ambiguous independently of the surname

Book 3 has **Marcus Chen** (Director of Instruction, staff) *and* **Marcus Jr.**
(candidate, rhythmic pattern recognition), listed here:

> "Eight others, each with their own modality: Laura Chen (thermal perception), **Marcus Jr.** (rhythmic pattern recognition), Tomás Garcia..."

Bare **"Marcus" appears 47 times in Book 3**. At least one is structurally unclear:

> "**Marcus** two meters to her left, within the second-harmonic zone."

That passage is positioning *candidates*, which suggests Marcus Jr., but Marcus Chen is
the better-established Marcus. Renaming Marcus Chen's surname does **not** fix this;
one of the two needs a different given name.

("Marcus Blake" also appears once but is a false positive — "the Marcus [that] Blake
had known during the demonstration.")

---

## 3. Andrew Tanaka — the worst offender per appearance

One mention, colliding on **both** names:

> "**Andrew, the other Andrew, Tanaka**, confirmed the satellite uplink from Reykjavik."

He collides with **Andrew Chen** on the given name and with **Yuki Tanaka** — a major
Book 2/3 character — on the surname. The prose is already doing visible repair work with
that "the other Andrew" appositive. Fixing this costs **one edit**.

---

## 4. Given-name collisions

| Given name | Characters | Note |
|---|---|---|
| **Andrew** | Andrew Chen (principal), Andrew Tanaka | See §3 |
| **Margaret** | Margaret **Masters** (Blake's mother, 63) · Margaret **Chen** (board chair) · **CORRECTION:** Senator Margaret **Holt** (B2) — missed by this audit, see §8 | Triple collision, not double. Chen also shared a surname with Andrew. **All three resolved — see §8** |
| **James** | James **Masters** (Blake's father) · James **Okafor** (candidate, musician) | Father is load-bearing; the candidate is not |
| **Sarah** | Sarah **Chen** · Sarah **Washington** (candidate, vocal frequency) | Low severity |
| **Marcus** | Marcus Chen · Marcus Jr. | See §2 |

## 5. Surname collisions that are fine

| Surname | Characters | Verdict |
|---|---|---|
| **Masters** | Blake, William, James, Margaret, Nadia (married) | **Correct** — the central family |
| **Crane** | Emmanuel Sr., Father Emmanuel Jr., Thomas (brother) | **Correct** — explicitly established family |
| **Carroll** | William Carroll Masters, Jason Carroll Holloway | Not a collision — middle name and author |
| **Okafor** | Adunni (grandmother, Lagos), James (candidate) | Unrelated but both Nigerian; plausible. Resolves itself if James Okafor is renamed for §4 |

---

## 6. Separate finding: a factual contradiction about Sabrina

Not a naming problem — a continuity conflict that needs your ruling.

**Book 2:**
> "Recipient: Sabrina Volkov, M.D., the clinical director **whose last name Nadia shared by marriage**"

**Book 3, twice:**
> "Dr. Volkov, Sabrina, **Nadia's sister**, the trauma psychologist"
> "Sabrina, **her sister**, the trauma psychologist"

Sisters share a surname by birth, not by marriage. The conflict is sharpened by two
other facts: Nadia is established as orphaned in Lviv and raised by Keeper nuns, and in
Book 1 she is practising the signature "Nadia Masters" — so Volkov is her *pre-marriage*
name, which the Book 2 phrasing contradicts directly.

Whichever way you rule, the **Nadia Volkov / Sabrina Volkov** shared surname is fine and
needs no rename. If they are sisters, it is simply correct.

---

## 7. Recommended fix, cheapest first

Ranked by reader impact per edit. Nothing here is applied.

Jason's rulings, 2026-08-29: Andrew Chen becomes the only Chen (all six others
renamed); Andrew Tanaka renamed in full; Sabrina is Nadia's **sister** and the Book 2
"by marriage" phrasing is what gets fixed; East Asian presence preserved in the
replacements; Marcus Jr., Margaret's given name and James Okafor left alone for now.
Names still being finalised — Jason is swapping some of the proposals below.

| # | Change | Proposed | Edits | Why |
|---|---|---|---|---|
| 1 | **Andrew Tanaka** → new first *and* last name | Nolan Eriksen | 1 | Double collision (Andrew Chen + Yuki Tanaka), one mention, removes an awkward in-line disambiguation |
| 2 | **Michael Chen** → new surname | Michael Halloran | 1 | One mention |
| 3 | **Lin Chen** → new surname | Lin Zhao | 1 | Stays Chinese, per the texture ruling |
| 4 | **Laura Chen** → new surname | Laura Okada | 1 | Keeps East Asian presence in the cohort |
| 5 | **Marcus Chen** → new surname | Marcus Whitaker | 3 | The original complaint. "Marcus" untouched, so only 3 lines change |
| 6a | **Sarah Chen** (B1 Cambridge) → new surname | Sarah Ashworth | 4 | Frees bare "Chen" to mean Andrew unambiguously |
| 6b | **Sarah Chen** (B2 Stanford) → new given *and* surname | Rosalind Lindgren | 2 | Separates the two people sharing this name |
| 7 | **Margaret Chen** → new surname | Margaret Ferrand | 5 | Clears the Chen clash. Given name kept per ruling, so the Margaret/mother clash remains |
| 8 | **Sabrina** Book 2 phrasing | — | 1 | Change "shared by marriage" to reflect that they are sisters |

**Total: roughly 18 edits leaves Andrew Chen as the only Chen.**

Deferred by ruling: Marcus Jr. (47 bare "Marcus" stay ambiguous), Margaret's given name
(still clashes with Blake's mother), James Okafor (still clashes with Blake's father).

Residual after this pass: **Sarah** Ashworth still shares a given name with **Sarah**
Washington, a Book 3 candidate. Low severity — they share no scene.

### Downstream reach

These names appear beyond the novels. Anything changed must also be checked in:

- `CANON.md` — line 75 explicitly blesses the Chen collision and would need rewriting
- the Distribution File PDF (`public/downloads/The_Distribution_File.pdf`), which is
  compiled in-universe **by Andrew Chen**
- the website field notes and `lib/data/moments.ts` scene pages
- press kit synopses, if any name them
- the audiobook scripts (currently parked)

A name change is a full-pipeline change: source DOCX, omnibus, all three EPUBs, Kindle,
Google Play, six print interiors, and the website — the same route the canon fix took.

---

## 8. Outcome — both passes applied, 2026-08-29

Everything in this section post-dates the findings above.

### 8a. A third Margaret was found after this audit

This audit's §4 listed **two** Margarets. There are **three**. The one missed:

> **Senator Margaret Holt.** Chair of the Commerce Committee's Subcommittee on
> Science, Oceans, Fisheries, and Weather. Seventy-one years old. Methodist.
> Former prosecutor.

Book 2, one full-name mention, plus roughly seventeen bare-surname "Holt"
references in the hearing sequence. She was missed because the census in §1 was
built around the **Chen** surname and the given-name table in §4 was assembled
from the characters that census had already surfaced — a senator who is never a
Chen never entered the sample. Surfaced afterwards by
`scratch/nameaudit/BLAKES_MOTHER_NAME_OPTIONS.md` during the name-option screen.

The practical consequence was real, not cosmetic: it meant Book 2 contained
**two Margarets who are different people**, so the second pass could not be a
blanket given-name swap.

### 8b. Both remaining Margaret collisions are now resolved

| Character | Was | Now | Refs | Pass |
|---|---|---|---|---|
| Foundation board chair (B3) | Margaret **Chen** | **Margaret Ferrand** | 10 | Batch 1 |
| Blake's mother (B1–B2) | **Margaret** Masters | **Lorraine Masters** | 24 | Batch 2 |
| Senator (B2) | Senator **Margaret** Holt | Senator **Deborah Holt** | 1 | Batch 2 |

**`Margaret Ferrand` is now the trilogy's only Margaret.** Book 3 retains
exactly ten `Margaret` tokens; Books 1 and 2 contain zero. Any `Margaret`
appearing outside Book 3 is a regression.

Only the senator's *given* name changed — the surname **Holt** and all
seventeen bare-surname references are unaltered, verified identical before and
after.

The deferral recorded in §7 ("Margaret's given name … still clashes with Blake's
mother") is therefore **closed**. Of the deferrals in that list, **Marcus Jr.**
and **James Okafor** remain open and untouched, as does the low-severity
**Sarah** Ashworth / Washington residual noted in §7.

Applied 2026-08-29. Full rule set, per-file counts, diffs and the parked
downstream work are in `production_staging/NAME_FIX_2026-08-29.md` (Batch 1 in
§1–§6, Batch 2 in the *BATCH 2* section). Canon is recorded in `CANON.md`, which
now also carries the **Lorraine Masters** character entry that never existed
before. **No builds were run in either pass** — the print interiors, sampler
EPUBs, cartographer artifacts and audiobook scripts are still behind the source.
