# Blog Editorial Audit — The Facts Behind the Fiction

**Series:** 8 essays · **Publishable now:** 7 (Essay 05 Roger Billings on HOLD)  
**Passes:** (1) AI decontamination · (2) Source/credibility · (3) Jason Carroll Holloway voice  
**Status:** All 7 publishable essays revised in `content/blog/*.md` · Social derived in `SOCIAL_FROM_BLOG.md`

---

## Summary

| # | Post | Pass 1 — fingerprints fixed | Pass 2 — flags | Pass 3 | Ready |
|---|------|------------------------------|----------------|--------|-------|
| 01 | Frequency Already There | meta trimmed; single deliberate *ungraded* retained (Eco) | none | A- | **Y** |
| 02 | Grimoire Study Aid | "connects this essay to the next" → forward link | none | A- | **Y** |
| 03 | Sound Into Form | "This essay separates…" opener cut | none | A- | **Y** |
| 04 | Why Kansas City | "The honest answer" opener, *apparatus*, *stated plainly*, "which is exactly", encyclopedia CTA | Fibonacci reading softened; Bethany Falls age ⚠ | A- | **Y** |
| 05 | Man Under Zion | — | Billings sourcing unverified | — | **HOLD** |
| 06 | Three Factions | three-phase motor/torque, "Sit with that sentence", *grade card* header, *load-bearing*, encyclopedia CTA | CIA three-camp sort now labeled as author's reading | A- | **Y** |
| 07 | Stone Remembers | *grade card* meta, "this series has rules", encyclopedia bibliography ref + CTA | none | A | **Y** |
| 08 | Cannot Be Un-Released | encyclopedia making-of section cut, "Eight essays, one method" recap cut, cross-ref by title | DF statistics labeled invented | A- | **Y** |

Automated rescan (`grep` over the removal table) returns clean on all seven publishable posts. The single remaining hit is *ungraded patterns* in 01, kept deliberately: it sits in the Umberto Eco passage and is the one place the word carries argument rather than scaffolding.

---

## Voice reference (pass 3 benchmark)

**Sounds like Jason / Masters X:**
- Opens on a concrete detail from the trilogy or a document on the desk
- First person when it matters; otherwise lets the record speak
- Labels fiction without performing honesty (*in the world* / *in the novels*)
- Links to Field Notes as the public research layer
- Closes: *The facts are in the files. The fiction is in the books.*

**Does not sound like Jason:**
- Meta-commentary about what "this essay" is doing
- Repeated scaffolding: *the honest answer*, *stated plainly*, *the grade card*, *the seam*, *load-bearing*
- Essay-series throat-clearing (*Essay three walks*, *the sixth essay in this series*)
- Encyclopedia / apparatus CTAs (not announced yet)
- Balanced triplets and thesis sentences that read like LLM polish

---

## AI fingerprint hits (pass 1) — patterns removed

| Pattern | Count (draft) | Action | Remaining |
|---------|---------------|--------|-----------|
| "The honest answer" | 12+ across series | Cut or use once max per post | 0 |
| "stated plainly" / "plainly" (self-referential) | 18+ | Remove | 0 |
| "grade" / "graded" / "grade card" | 40+ | Replace with *measured / documented / invented* | 1 (Eco, intentional) |
| "the seam" | 25+ | Keep ≤2 per post; prefer *where the record ends* | 0 |
| "load-bearing" | 8 | Remove | 0 |
| "this essay" / "this series" | 35+ | Cut meta; cross-link by title only | 0 |
| "apparatus" | 15+ | Remove or → *Field Notes* | 0 |
| Encyclopedia CTAs | 8 closings | → Field Notes + books only | 0 |
| "which is exactly why" | 6 | Cut | 0 |
| Motor/torque metaphors, "sit with that sentence" | 4 | Cut | 0 |

**Code follow-up:** `siteReadyMarkdown()` in `lib/markdown.ts` previously carried a dozen brittle string-match scrubbers for the encyclopedia CTAs. Now that the source markdown is clean, it was replaced with a sentence-level guard that drops any sentence naming the unannounced encyclopedia.

---

## Source validation (pass 2) — by post

### 01 · The Frequency That Was Already There
| Claim | Status | Source |
|-------|--------|--------|
| Hypogeum 110–111 Hz, 80 visitors/day | ✓ | Field Note 111-hz; UNESCO |
| Cook, Pajot, Leuchter 2008 — small sample | ✓ | Field Note; caveat retained |
| Devereux et al., 95–120 Hz band | ✓ | JASA / *Stone Age Soundtracks* — link in Field Note |
| Watson & Keating, Camster Round | ✓ | Field Note |
| Reznikoff & Dauvois 1988, Lascaux | ✓ | Field Note |
| Schumann 7.83 Hz | ✓ | Textbook geophysics |
| 111.2 Hz tremor, Blake | ✓ | CANON.md line 68 |
| 136.6 Hz / Monroe / Gateway | ⚠ contested | Documented practice; claims not science — labeled |
| KC underground acoustics — no published study | ✓ | Honest gap retained |

### 02 · The Grimoire That Was a Study Aid
| Claim | Status | Source |
|-------|--------|--------|
| Ars Notoria real, Sloane 1712, Turner 1657 | ✓ | Field Note ars-notoria |
| Fanger / Véronèse scholarship | ✓ | Standard; Field Note aligned |
| Albertus Magnus condemnation | ✓ | Scholarly record |
| Notae as cognitive technology (Nadia) | ✗ fiction | Labeled |
| Frozen sound / cymatics (notae) | ✗ fiction | Labeled; → Essay 03 |

### 03 · Sound Into Form
| Claim | Status | Source |
|-------|--------|--------|
| Chladni 1787, nodal lines | ✓ | Field Note cymatics |
| Jenny *Kymatik* 1967/72, 800→865 cps | ✓ | Field Note |
| No evidence viewing patterns alters consciousness | ✓ | Honest gap |
| Kofi Asante Ghana — fiction label | ✓ | Field Note |
| Yuki Tanaka methodology — fiction | ✓ | Labeled |

### 04 · Why Kansas City?
| Claim | Status | Source |
|-------|--------|--------|
| Hopewell, ~30 sites, stone-vault tombs | ✓ | Archaeological record; **not** in the KC-locations Field Note — link now points to the Field Note only for the trilogy's location map |
| Diaz-Granados & Duncan, Missouri rock art | ✓ | Published scholarship |
| Osage *Wah-kon-tah* | ✓ | Credited upstream; rendering-varies caveat added |
| D&C 57, Temple Lot Aug 3 1831, 63 acres | ✓ | Public record |
| No Temple Lot scene in trilogy | ✓ | Verified in research audit |
| Community of Christ temple 1994, Obata, 195 ft nautilus spire | ✓ | Public record |
| "Fibonacci as architectural DNA" | ⚠ softened | Interpretive reading, not the architect's stated program — revised to describe the nautilus form and attribute the Fibonacci reading to readers |
| SubTropolis 55M sq ft, ~1,700 workers, 65°F, 160 ft | ✓ | Field Note subtropolis |
| Bethany Falls "270 million years / Pennsylvanian-age" | ⚠ | Field Note says both; Pennsylvanian is ~323–299 Ma, so the 270 Ma figure reads Permian. Essay now says "when the middle of North America was a shallow sea" without a number. **Author to reconcile the Field Note.** |
| No KC underground acoustics study | ✓ | Honest gap retained |
| Fifth seeker (Billings) | ⚠ | Essay 05 HOLD — unnamed teaser only; "180-acre" figure removed from the teaser |

### 05 · The Man Who Built a City Under Zion — **HOLD**
| Claim | Status | Notes |
|-------|--------|-------|
| Roger Billings biography | ⚠ | Author must verify `ROGER_BILLINGS_MASTERS_X_ANALYSIS.md` before any publish. File not present in repo (removed with `encyclopedia_project` in `3795ac2`; recoverable at `876d358`). |

### 06 · Three Factions
| Claim | Status | Source |
|-------|--------|--------|
| CIA-RDP96-00792R, 1984 translation of Chinese journal | ⚠ | Real CREST designation family; **essay now describes it as sitting "under the RDP96-00792R designation, alongside similar material"** rather than asserting a single exact document. Verify the specific record before any print prop. |
| Three camps: suppress / verify / weaponize | ⚠ → resolved editorially | No independent research file in repo; only Fable-generated content. Essay now states explicitly that the three-way sort is the author's reading, not a heading in the file. |
| "Feudal sorcery" phrasing | ✓ | Recurs in the era's polemics; hedged as such |
| Gateway Process assessment, US Army 1983 | ✓ | Declassified; date added |
| Distribution File CC0 ending | ✗ fiction | Labeled |
| Download statistics | ✗ fiction | Figure removed from 06; retained only in 08 as in-universe front matter |

### 07 · The Stone Remembers
| Claim | Status | Source |
|-------|--------|--------|
| Cathedral = red brick 1882–1912, gold dome 1960 | ✓ | KC churches research |
| Westport Presbyterian 1904, fire 2011, walls stood, rebuilt within | ✓ | Public record |
| St. Francis Xavier 1925 fire, 21,000 lb Bedford limestone sculpture | ✓ | Research file |
| Quarrying boom 1880–1920 | ✓ | Municipal history |
| Moreau line "stone remembers" | ✗ fiction | Fire = documentary anchor; relationship stated plainly in prose |

### 08 · A Document That Cannot Be Un-Released
| Claim | Status | Source |
|-------|--------|--------|
| DF 247 pp, five parts, f=111.2 footer | ✓ in-universe | CANON / omnibus |
| Andrew Chen compiler | ✓ | CANON.md line 74 (not "Blackwood", not "Vance") |
| CC0 as real license | ✓ | Creative Commons |
| 1,204,881 downloads / 47 countries / 3 replications | ✗ fiction | Labeled "invented down to the digit" |
| Gateway + 1984 translation cross-reference | ✓ | Cross-linked to Essay 06 by title |
| Encyclopedia making-of section | — | **Cut** from site version (unannounced); editorial-problem discussion retained without product CTA |

---

## Voice score (pass 3) — before → after

| # | Title | Before | After | Notes |
|---|-------|--------|-------|-------|
| 01 | Frequency Already There | B+ | A- | Less meta; Field Note as authority |
| 02 | Grimoire Study Aid | B | A- | Cut "middle register"; tighter Nadia transition |
| 03 | Sound Into Form | B+ | A- | Removed essay-self-reference in opener |
| 04 | Why Kansas City | B | A- | Opens on Hopewell stone-vault tombs; "five traditions" rhetoric replaced with four documented + one held |
| 05 | Man Under Zion | — | HOLD | Billings sourcing |
| 06 | Three Factions | C+ | A- | Motor metaphor gone; caveat now strengthens rather than weakens the piece |
| 07 | Stone Remembers | B+ | A | Strongest in the run; correction-first structure intact |
| 08 | Cannot Be Un-Released | B | A- | Encyclopedia coda cut; craft note on the file-format ending kept |

Word counts after revision: 845–1,175, consistent with the 01–03 benchmarks.

---

## Publish order (SEO + internal links)

1. **01** Frequency — pillar; links 111-hz, cymatics  
2. **03** Cymatics — pairs with 01; links ars-notoria  
3. **04** Kansas City — local SEO; links kansas-city-locations, subtropolis, 07  
4. **02** Ars Notoria — links ars-notoria, cymatics, 03  
5. **07** Stone Remembers — links kansas-city-locations, subtropolis  
6. **06** Three Factions — links 01  
7. **08** DF / CC0 — capstone; links 06, omnibus  

**After Essay 05 cleared:** insert between 04 and 07.

---

## Open items for the author

1. **Essay 05 / Roger Billings** — restore `ROGER_BILLINGS_MASTERS_X_ANALYSIS.md` (`git checkout 876d358 -- encyclopedia_project`) and verify before the post or its social leaves HOLD.
2. **CIA record** — pull the specific reading-room document and confirm the designation before it appears as a print prop or a firmer citation.
3. **Bethany Falls age** — the SubTropolis Field Note carries both "Pennsylvanian-age" and "270 million years," which do not agree. Blog copy now avoids the number; the Field Note still needs a decision.
4. **Community of Christ spire** — confirm whether the Fibonacci reading is the architect's stated program or a reader interpretation, if it is ever to be stated more firmly than the current phrasing.

---

## Social derivation

See `SOCIAL_FROM_BLOG.md` — X, Bluesky, Instagram, and LinkedIn posts drafted from the revised blog copy, not from the Fable social pack. Essay 05 and any encyclopedia announcement are excluded.
