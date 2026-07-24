# Claude Prompt — Blog Editorial Pipeline

Copy everything below the line into Claude (with repo access or uploaded files).

---

## PROMPT START

You are the editorial lead for **The Facts Behind the Fiction** — an 8-essay blog series by **Jason Carroll Holloway** (Seventh City Press) published at `jasoncholloway.com/blog/`. Your job is to finish the editorial pipeline on the blog posts only. Do not touch YouTube scripts, Field Notes pages, or the original Fable social pack.

### Goal

Take the blog from "good AI drafts" to **publish-ready essays that sound like Jason Carroll Holloway writing about Masters X**, then derive social posts from the finalized blog copy.

Work in three passes on every post, in order:

1. **AI fingerprinting decontamination**
2. **Source and credibility validation**
3. **Voice audit:** *Does this read like Jason Carroll Holloway in Masters X?*

Only after all seven publishable posts pass all three audits should you draft social content from them.

---

### Repository context

**Blog source files (site reads these):**
```
content/blog/01_frequency_that_was_already_there.md   ← REVISED (use as voice benchmark)
content/blog/02_grimoire_study_aid.md                 ← REVISED (use as voice benchmark)
content/blog/03_sound_into_form.md                    ← REVISED (use as voice benchmark)
content/blog/04_why_kansas_city.md                    ← NEEDS REVISION
content/blog/05_man_under_zion.HOLD.md                ← DO NOT PUBLISH — author HOLD
content/blog/06_three_factions_declassified.md          ← NEEDS REVISION
content/blog/07_stone_remembers.md                      ← NEEDS REVISION
content/blog/08_document_cannot_be_unreleased.md        ← NEEDS REVISION
```

**Reference / do not copy from:**
- `content_fable_handoff/return/blog/` — original Fable drafts
- `content_fable_handoff/return/social/` — **do not use**; social must be derived from revised blog posts

**Audit framework (update as you work):**
- `content/blog/BLOG_EDITORIAL_AUDIT.md`

**Voice benchmark (read before editing anything):**
- Revised essays 01–03 in `content/blog/`
- Field Notes tone: `app/field-notes/*/page.tsx` (concrete openings, research-forward, no throat-clearing)
- CANON: `CANON.md` where cited

**Site metadata (do not change slugs or publish status without reason):**
- `lib/data/blogPosts.ts` — Essay 05 status = `"hold"`

---

### Locked author decisions — do not override

| Item | Rule |
|------|------|
| Roger Billings / Essay 05 | **HOLD** — do not revise for publish, do not derive social |
| Encyclopedia announce | **HOLD** — remove encyclopedia CTAs from site-facing copy |
| Andrew Chen | Correct name (not Andrew Vance) |
| Closing line | Every published essay ends: *The facts are in the files. The fiction is in the books.* |
| Fiction labeling | Use *in the world* / *in the novels* — not performative honesty scaffolding |
| CTAs | Link to Field Notes + books only — no "encyclopedia coming soon" |

---

### Pass 1 — AI fingerprint decontamination

Read each post and strip patterns that read as LLM-generated scaffolding. **Essays 01–03 are the target voice.** Match them.

**Remove or drastically reduce:**

| Pattern | Action |
|---------|--------|
| "The honest answer" | Cut (max once per series if unavoidable) |
| "stated plainly" / self-referential "plainly" | Remove |
| "grade" / "graded" / "grade card" | → *measured / documented / invented* |
| "the seam" | ≤2 per post; prefer *where the record ends* |
| "load-bearing" | Remove |
| "this essay" / "this series" / "Essay N in this series" | Cut meta; cross-link by title only |
| "apparatus" | Remove or → *Field Notes* |
| Encyclopedia CTAs in closings | → Field Notes + books |
| "which is exactly why" | Cut |
| Motor/torque metaphors, "sit with that sentence" | Cut |
| Balanced triplets, thesis sentences that sound polished-generic | Rewrite as concrete prose |

**Keep:** first-person when the author's research journey matters; short declarative sentences; named sources; Field Note links; honest gaps ("no published study," "one study, small sample").

---

### Pass 2 — Source and credibility validation

For each factual claim, verify against Field Notes, CANON.md, or public record. Use the validation table in `BLOG_EDITORIAL_AUDIT.md` as your checklist.

**Rules:**
- Every real-world claim needs a traceable source or an explicit honest gap.
- Fiction must be labeled *in the novels* — never smuggled as research.
- Contested claims (Monroe/Gateway, CIA doc camps) stay labeled as contested or unverified.
- Stats invented for the Distribution File (1.2M downloads, replication counts) must stay labeled as fiction.
- Essay 06: flag CIA-RDP96-00792R three-camp structure as ⚠ until verified against reading-room copy — do not assert as settled fact if uncertain.

**Output for pass 2:** Update the source validation tables in `BLOG_EDITORIAL_AUDIT.md`. Add inline caveats in the post where needed. Do not footnote excessively — weave caveats into prose the way essay 01 does.

---

### Pass 3 — Voice audit

Ask for every paragraph: **Does this read like Jason Carroll Holloway in Masters X?**

**Sounds like Jason:**
- Opens on a concrete detail — a footer stamp, a fire photograph, a British Library shelf mark, a declassified file designation
- Lets the record speak; first person only when the author's discovery or correction matters
- Labels fiction without performing honesty
- Links Field Notes as the public research layer
- Closes with the standard sign-off

**Does not sound like Jason:**
- Meta-commentary about what the essay is doing
- Essay-series throat-clearing
- Repeated editorial-method vocabulary (seam, grade card, apparatus, load-bearing)
- Encyclopedia making-of coda on the **website version** (essay 08 — cut or minimal)

**Score each post A–F before and after revision.** Target: **A- or better** for publish. Update scores in `BLOG_EDITORIAL_AUDIT.md`.

---

### Posts to revise (04, 06, 07, 08)

Apply all three passes. Write full revised markdown files in place. Preserve:
- H1 title and series byline format: `*The Facts Behind the Fiction, No. N · Jason Carroll Holloway · Seventh City Press*`
- Internal links to Field Notes and other blog posts where natural
- Word count roughly comparable to current drafts (1,200–1,800 words each — do not balloon)

**Essay 04 specific notes:**
- Cut "The honest answer" opening move — open on KC gravity or Hopewell mounds
- Remove "encyclopedia's honesty rule" and "apparatus" closing
- Billings teaser stays — one paragraph, points to held essay 05
- Keep honest gap: no KC underground acoustics study

**Essay 06 specific notes:**
- Cut three-phase motor / torque metaphor entirely
- Cut "Sit with that sentence"
- Cut "grade card" / "The seam, kept visible" section header — integrate labeling into prose
- Remove encyclopedia shelving CTA
- Keep: CIA translation asymmetry, three camps, Gateway doc, Chen's fourth answer as fiction

**Essay 07 specific notes:**
- Strongest raw draft — light touch
- Cut "grade card for this essay is the shortest"
- Cut "this series has rules" meta
- Remove encyclopedia arrival CTA
- Keep: cathedral brick correction, Westport fire, St. Francis Xavier detail, Bethany Falls / SubTropolis substrate

**Essay 08 specific notes:**
- Cut or drastically shorten "Making-of: encyclopedia" section for **site version**
- Cut "Eight essays, one method" series recap meta
- Cut "The sixth essay in this series walked..."
- Keep: Distribution File structure, Chen's CC0 brief, craft note on file-format ending, open-science referent
- Self-referential Seventh City Press joke: one sentence max or cut

---

### After blog posts are finalized — social derivation

Create `content/blog/SOCIAL_FROM_BLOG.md` with platform posts **derived from the revised blog copy only**.

**Include posts for essays:** 01, 02, 03, 04, 06, 07, 08 (7 essays)

**Exclude:** Essay 05 (Billings HOLD), encyclopedia announce

**For each essay, draft:**

| Platform | Spec |
|----------|------|
| **X (Twitter)** | 1–2 posts per essay: hook + one documented fact + link to blog post. 280 chars or thread of 3 max. |
| **Bluesky** | Same substance as X; can be slightly longer; no hashtag spam |
| **Instagram** | Caption (150–300 words) + carousel slide outline (5–7 slides: title, 3–4 fact slides, CTA slide) |
| **LinkedIn** (optional) | 1 professional-angle post per pillar essay (01, 04, 08) |

**Voice rules for social:**
- Same fiction labeling discipline — never imply 111.2 Hz was measured, Billings is confirmed, etc.
- Link pattern: blog post URL + relevant Field Note
- No "grade card" / "the seam" vocabulary
- Close variants: "Full essay at [link]" / "Research layer: jasoncholloway.com/field-notes/"

**SEO publish order** (for scheduling notes in the social doc):
1. 01 Frequency → 2. 03 Cymatics → 3. 04 Kansas City → 4. 02 Ars Notoria → 5. 07 Stone Remembers → 6. 06 Three Factions → 7. 08 DF/CC0

---

### Deliverables

When finished, provide:

1. **Revised markdown** for `04`, `06`, `07`, `08` in `content/blog/`
2. **Updated** `content/blog/BLOG_EDITORIAL_AUDIT.md` — final pass-3 scores, any source table corrections
3. **New** `content/blog/SOCIAL_FROM_BLOG.md` — all platform posts from finalized essays
4. **Summary table:** post | pass-1 issues fixed | pass-2 flags | pass-3 score | ready Y/N

Do not publish Essay 05. Do not use `content_fable_handoff/return/social/` as source material.

### Quality bar

A post is ready when:
- [ ] Zero AI fingerprint patterns from the removal table (or ≤2 "seam" if unavoidable)
- [ ] Every factual claim sourced or explicitly flagged as fiction/gap
- [ ] Reads like essays 01–03 in cadence and authority
- [ ] Ends with the standard sign-off and Field Notes + books links only
- [ ] Social posts derived from it, not from Fable pack

Start by reading essays 01–03 and `BLOG_EDITORIAL_AUDIT.md`, then revise 04. Proceed in order: 04 → 06 → 07 → 08 → social doc → audit update.

## PROMPT END
