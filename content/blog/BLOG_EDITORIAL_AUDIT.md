# Blog Editorial Audit: The Facts Behind the Fiction

**Series:** 7 essays · **Live:** 4 (essays 01 through 04) · **Awaiting approval:** 3 (essays 06, 07, 08)
**Passes:** (1) AI decontamination · (2) Source and credibility · (3) Jason Carroll Holloway voice · (4) Em-dash removal
**Status:** all seven essays revised in `content/blog/` · social derived in `SOCIAL_FROM_BLOG.md`

---

## Series change: the Billings essay is cut

Essay 05, "The Man Who Built a City Under Zion," is removed from the series at the author's direction.

- Its draft is parked at `content/blog/held/05_man_under_zion.md`, unrevised, so nothing is lost.
- It has no entry in `lib/data/blogPosts.ts` and no route on the site.
- No social was drafted from it.
- Essay 04 previously counted "four traditions and one living man" and closed on a section teasing essay 05. That section is rewritten. Essay 04 now stands on four documented traditions, with William Masters named as the invented addition rather than as a fictional sixth in a sequence of five.
- The research file it cited, `ROGER_BILLINGS_MASTERS_X_ANALYSIS.md`, was never committed to this repository. A scan of all 134 commits found no trace of it. It appears in `01_RESEARCH_CATALOG.md` as a 12 KB entry in the author's local archive.

Series numbering is unchanged, so the published essays run 01, 02, 03, 04, 06, 07, 08. Renumbering would break the slugs and the internal cross-links, and the gap is invisible to readers who arrive from search.

---

## Em-dash removal

The author does not use em-dashes and reads them as a machine tell. Every one is gone from reader-facing copy.

| File group | Before | After |
|------------|--------|-------|
| Essay 01 | 21 | 0 |
| Essay 02 | 15 | 0 |
| Essay 03 | 17 | 0 |
| Essay 04 | 17 | 0 |
| Essay 06 | 15 | 0 |
| Essay 07 | 10 | 0 |
| Essay 08 | 10 | 0 |
| `SOCIAL_FROM_BLOG.md` | 88 | 0 |
| `lib/data/blogPosts.ts` (titles, deks, meta descriptions) | 8 | 0 |
| `app/blog/page.tsx` (hub metadata) | 5 | 0 |

Sentences were restructured rather than repunctuated. An em-dash usually does one of four jobs, and each got a different fix:

- **Parenthetical aside.** Recast with commas, or split into its own sentence.
- **Appositive or definition.** Replaced with a comma or a colon.
- **Dramatic pause before a final clause.** Replaced with a period. This is the most common fix and it shortens the prose.
- **List introduction.** Replaced with a colon.

En-dashes survive only in numeric ranges, which is standard typography and not a stylistic tell: `3600–2500 BCE`, `110–111 Hz`, `95–120 Hz`. Everywhere a range appeared in running prose it was spelled out instead, as in "800 to 865 cycles per second."

Two side effects worth knowing. The essays got slightly shorter, since replacing a dramatic dash with a period tends to cut the trailing clause's throat-clearing. And a few sentences now use colons where they previously used dashes, so if colons start to feel like their own tic, that is the next thing to thin.

---

## Summary

| # | Post | Pass 1: fingerprints fixed | Pass 2: flags | Voice | Em-dashes | State |
|---|------|----------------------------|---------------|-------|-----------|-------|
| 01 | Frequency Already There | meta trimmed; *ungraded* replaced with *unlabeled* | none | A- | 0 | **Live** |
| 02 | Grimoire Study Aid | forward-link meta cut | none | A- | 0 | **Live** |
| 03 | Sound Into Form | "This essay separates" opener cut | none | A- | 0 | **Live** |
| 04 | Why Kansas City | "The honest answer" opener, *apparatus*, *stated plainly*, encyclopedia CTA, Billings teaser | Fibonacci reading softened; limestone age dropped | A- | 0 | **Live** |
| 06 | Three Factions | motor and torque metaphor, "Sit with that sentence", *grade card* header, *load-bearing* | CIA three-camp sort labeled as author's reading | A- | 0 | Awaiting approval |
| 07 | Stone Remembers | *grade card* meta, "this series has rules", encyclopedia CTA | none | A | 0 | Awaiting approval |
| 08 | Cannot Be Un-Released | encyclopedia making-of cut, series recap cut | Distribution File statistics labeled invented | A- | 0 | Awaiting approval |

A grep rescan over the pass-1 removal table returns clean on all seven essays, with no exceptions remaining. The single deliberate holdout from the previous round, *ungraded patterns* in the Umberto Eco passage of essay 01, is now *unlabeled patterns*, which loses nothing.

---

## Voice reference (pass 3 benchmark)

**Sounds like Jason:**
- Opens on a concrete detail from the trilogy or a document on the desk
- First person when it matters; otherwise lets the record speak
- Labels fiction without performing honesty, using *in the world* and *in the novels*
- Links to Field Notes as the public research layer
- Closes: *The facts are in the files. The fiction is in the books.*
- Plain punctuation: periods, commas, occasional colons. No em-dashes.

**Does not sound like Jason:**
- Meta-commentary about what "this essay" is doing
- Repeated scaffolding: *the honest answer*, *stated plainly*, *the grade card*, *the seam*, *load-bearing*
- Essay-series throat-clearing
- Encyclopedia or apparatus CTAs, since the encyclopedia is unannounced
- Balanced triplets and thesis sentences that read like machine polish
- Em-dashes anywhere

---

## AI fingerprint hits (pass 1)

| Pattern | Count in draft | Action | Remaining |
|---------|----------------|--------|-----------|
| "The honest answer" | 12+ across series | Cut | 0 |
| "stated plainly" and self-referential "plainly" | 18+ | Remove | 0 |
| "grade", "graded", "grade card" | 40+ | Replace with *measured*, *documented*, *invented* | 0 |
| "the seam" | 25+ | Prefer *where the record ends* | 0 |
| "load-bearing" | 8 | Remove | 0 |
| "this essay", "this series" | 35+ | Cut meta; cross-link by title | 0 |
| "apparatus" | 15+ | Remove or point to Field Notes | 0 |
| Encyclopedia CTAs | 8 closings | Field Notes and books only | 0 |
| "which is exactly why" | 6 | Cut | 0 |
| Motor and torque metaphors, "sit with that sentence" | 4 | Cut | 0 |
| Em-dashes | 105 in essays, 88 in social | Restructure sentences | 0 |

**Code follow-up:** `siteReadyMarkdown()` in `lib/markdown.ts` previously carried a dozen brittle string-match scrubbers for the encyclopedia CTAs. Now that the source markdown is clean, it uses a sentence-level guard that drops any sentence naming the unannounced encyclopedia.

---

## Source validation (pass 2)

### 01 · The Frequency That Was Already There
| Claim | Status | Source |
|-------|--------|--------|
| Hypogeum 110–111 Hz, 80 visitors per day | Verified | Field Note 111-hz; UNESCO |
| Cook, Pajot, Leuchter 2008, small sample | Verified | Field Note; caveat retained in prose |
| Devereux et al., 95–120 Hz band | Verified | Field Note |
| Watson and Keating, Camster Round | Verified | Field Note |
| Reznikoff and Dauvois 1988, Lascaux | Verified | Field Note |
| Schumann resonance 7.83 Hz | Verified | Textbook geophysics |
| 111.2 Hz tremor | Verified as canon | `CANON.md` |
| 136.6 Hz, Monroe, Gateway | Contested | Documented practice, not scientific findings; labeled |
| No KC underground acoustics study | Verified gap | Retained |

### 02 · The Grimoire That Was a Study Aid
| Claim | Status | Source |
|-------|--------|--------|
| Ars Notoria real, MS Sloane 1712, Turner 1657 | Verified | Field Note ars-notoria |
| Fanger and Véronèse scholarship | Verified | Standard reference |
| Albertus Magnus condemnation | Verified | Scholarly record |
| Notae as cognitive technology | Fiction | Labeled |
| Notae as frozen sound | Fiction | Labeled; points to essay 03 |

### 03 · Sound Into Form
| Claim | Status | Source |
|-------|--------|--------|
| Chladni 1787, nodal lines | Verified | Field Note cymatics |
| Jenny *Kymatik* 1967 and 1972, 800 to 865 cps | Verified | Field Note |
| No evidence that viewing patterns alters consciousness | Verified gap | Stated in prose |
| Kofi Asante, Ghana | Fiction | Labeled in Field Notes |
| Yuki Tanaka methodology | Fiction | Labeled |

### 04 · Why Kansas City?
| Claim | Status | Source |
|-------|--------|--------|
| Hopewell, roughly 30 sites, stone-vault tombs | Verified | Archaeological record. Not in the KC-locations Field Note, so the link now points there only for the trilogy's location map. |
| Diaz-Granados and Duncan, Missouri rock art | Verified | Published scholarship |
| Osage *Wah-kon-tah* | Verified | Credited upstream; rendering-varies caveat in prose |
| D&C 57, Temple Lot dedicated August 3 1831, 63 acres | Verified | Public record |
| No Temple Lot scene in the trilogy | Verified | Research audit |
| Community of Christ temple 1994, Obata, 195-foot nautilus spire | Verified | Public record |
| Fibonacci as architectural DNA | Softened | Interpretive reading, not the architect's stated program. Revised to describe the nautilus form and attribute the Fibonacci reading to readers. |
| SubTropolis 55M sq ft, ~1,700 workers, 65°F, 160 feet | Verified | Field Note subtropolis |
| Bethany Falls age | Open | The Field Note says both "Pennsylvanian-age" and "270 million years." Pennsylvanian ends near 299 Ma, so 270 Ma reads Permian. Blog copy now avoids the number. **The Field Note still needs a decision.** |
| No KC underground acoustics study | Verified gap | Retained |
| Fifth seeker | Removed | Billings cut from the series |

### 06 · Three Factions
| Claim | Status | Source |
|-------|--------|--------|
| 1984 translation of a Chinese journal, RDP96-00792R designation | Open | A real CREST designation family. The essay describes the material as sitting under that designation alongside similar records, rather than asserting one exact document. Locate the specific record before citing it more firmly or using it as a print prop. |
| Three camps: suppress, verify, weaponize | Resolved editorially | No independent research file exists in the repo, only Fable-generated content. The essay now states that the three-way sort is the author's reading, not a heading in the file. |
| "Feudal sorcery" phrasing | Verified | Recurs in the era's polemics; hedged as such |
| Gateway Process assessment, U.S. Army 1983 | Verified | Declassified |
| Distribution File and its CC0 release | Fiction | Labeled |
| Download statistics | Fiction | Removed from essay 06; retained only in 08 as in-universe front matter |

### 07 · The Stone Remembers
| Claim | Status | Source |
|-------|--------|--------|
| Cathedral is red brick, 1882 to 1912, gold dome 1960 | Verified | KC churches research |
| Westport Presbyterian 1904, fire 2011, walls stood, rebuilt within | Verified | Public record |
| St. Francis Xavier 1925 fire, 21,000 lb Bedford limestone sculpture | Verified | Research file |
| Quarrying boom 1880 to 1920 | Verified | Municipal history |
| "The stone remembers" | Fiction | The fire is the documentary anchor; the relationship is stated plainly |

### 08 · A Document That Cannot Be Un-Released
| Claim | Status | Source |
|-------|--------|--------|
| 247 pages, five parts, f=111.2 footer | Verified in-universe | `CANON.md` and the omnibus |
| Andrew Chen as compiler | Verified | `CANON.md`, not "Blackwood" and not "Vance" |
| CC0 as a real license | Verified | Creative Commons |
| 1,204,881 downloads, 47 countries, 3 replications | Fiction | Labeled "invented down to the digit" |
| Encyclopedia making-of section | Cut | Removed from the site version; the editorial problem is discussed without a product CTA |

---

## Publish order and internal links

| Slot | Essay | Links out to | State |
|------|-------|--------------|-------|
| 1 | 01 Frequency | 111-hz, cymatics, subtropolis | Live |
| 2 | 03 Cymatics | cymatics | Live |
| 3 | 04 Kansas City | kansas-city-locations, subtropolis, essay 07 | Live |
| 4 | 02 Ars Notoria | ars-notoria, cymatics, essay 03 | Live |
| 5 | 07 Stone Remembers | kansas-city-locations, subtropolis | Awaiting approval |
| 6 | 06 Three Factions | essay 01 | Awaiting approval |
| 7 | 08 Cannot Be Un-Released | essay 06, omnibus | Awaiting approval |

Essay 04 links forward to essay 07, and essay 08 links back to essay 06. Both of those targets are currently unpublished, so the links resolve to 404 until essays 06 through 08 are cleared. Approving the remaining three closes the loop. If they are going to sit unapproved for a while, say so and the two forward links can be removed from the live essays.

---

## Open items for the author

1. **Essays 06, 07, and 08.** Revised and ready. One status change each in `lib/data/blogPosts.ts` publishes them.
2. **The CIA record.** Locate the specific reading-room document if the designation is ever to be cited more firmly or reproduced as a print prop. Essay 06 is publishable as written without it.
3. **Bethany Falls age.** The SubTropolis Field Note contradicts itself. Blog copy sidesteps the number; the Field Note needs a decision.
4. **The Fibonacci spire.** Confirm whether the growth-ratio reading is Obata's stated program before stating it more firmly than the current phrasing.

---

## Social derivation

See `SOCIAL_FROM_BLOG.md` for X, Bluesky, Instagram, and LinkedIn posts written from the revised essays rather than the Fable social pack. Slots 1 through 4 correspond to the live essays and are cleared to schedule. Slots 5 through 7 wait on essays 07, 06, and 08. The encyclopedia announcement stays out of every channel.
