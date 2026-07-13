# Script Proof Spec — YouTube Series

**Series:** The Facts Behind the Fiction  
**Voice:** Jason Carroll Holloway, first person, measured, literary-documentary

---

## Proofing goals

1. **Speakable** — reads naturally aloud at ~130–150 wpm without stumble words
2. **Honest** — every factual claim traceable or graded; fiction always labeled
3. **Stable** — names, numbers, dates match `CANON.md` and encyclopedia essays
4. **Shootable** — narration aligns with shot lists; OST cues timed to beats
5. **SEO-aligned** — substance matches `EPISODE_METADATA.md` (don't contradict title/description)

---

## Edit rules

### Do

- Fix awkward written syntax → spoken syntax
- Split sentences longer than 35 words
- Standardize: `111.2 Hz` spoken as "one eleven point two hertz"; OST keeps `f = 111.2 Hz`
- Keep series close verbatim: *"The facts are in the files. The fiction is in the books. The encyclopedia holds the seam."*
- Preserve `[VISUAL: …]` director notes for the author
- Add `[PROOF: author confirm]` when sourcing is thin
- Log every change in `SCRIPT_PROOF_LOG.md` with before/after

### Do not

- Add hype ("mind-blowing," "you won't believe")
- Weaken seam labels to sound more authoritative than sources allow
- Invent citations not in essay sources or CANON
- Change Temple Lot honesty line (EP05): no Temple Lot scene in trilogy — verified
- Change 7 notebooks (not 17) · Hawkes 17 novels N/A here
- Remove anti-slop notes (live Chladni, no AI B-roll)

---

## Factual grade tags (use in proof log per claim)

| Grade | Meaning |
|-------|---------|
| `measured` | Reproducible or peer-reviewed (Chladni, Schumann, chamber Hz literature with caveats) |
| `scholarly` | Real texts/scholars; mechanism not proven (Ars Notoria, Fanger/Véronèse) |
| `documented` | Public record, declassified file, land record |
| `contested` | Single study, small n, disputed (state explicitly) |
| `invented` | Novel mechanism, decimal, faction names, DF stats as fiction |

---

## Per-episode proof checklist

- [ ] Hook ≤ 50 sec spoken
- [ ] Every beat has OST text listed
- [ ] CTA includes jasoncholloway.com + series close
- [ ] Billings segments: "public record / reporting" language (EP02, EP05)
- [ ] CIA doc ID correct: `CIA-RDP96-00792R` (EP03)
- [ ] No "sixteen novels" Hawkes error
- [ ] Runtime estimate 8–12 min after proof
- [ ] Shot list timestamps updated if narration length shifted >15 sec

---

## Output format — `EP##_PROOFED.md`

```markdown
# EP## — [Title] · PROOFED

| Runtime (est.) | … |
| Proofed by | Fable · [date] |
| Sources | Essay ##, Field Notes, CANON |

## Proof flags
- [list [PROOF: …] items]

## Proofed narration

### HOOK (0:00–…)
[full spoken text]

### BEAT 1 …
…

## OST cards (export list)
- `string` — beat N

## Shot list
[carry forward / adjusted]

## Metadata alignment
- Title: [from EPISODE_METADATA]
- Chapters: [adjusted timestamps if needed]
```

---

## Priority order

1. EP04 (pilot)
2. EP01 (pairs with EP04)
3. EP05
4. EP03
5. EP02
