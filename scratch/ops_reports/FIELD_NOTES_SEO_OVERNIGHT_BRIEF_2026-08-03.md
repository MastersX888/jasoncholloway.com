# Field Notes SEO — Overnight Ops Brief (2026-08-03)

**Desk:** Morgan (Business Manager) → Content ops / Nina  
**Parent approval:** `GUERRILLA_ORGANIC_GROUNDSWELL_Q3.md` — **PARTIAL APPROVE** (Field Notes lane only)  
**Stamp:** 2026-08-03 ~04:17 CT  
**Status:** **EXECUTED (morning)** — 2026-08-03 ~08:25 CT · **Vivian PASS WITH NOTES** ~08:55 CT  
**Execution report:** `scratch/ops_reports/FIELD_NOTES_SEO_MORNING_REPORT_2026-08-03.md`  
**Vivian QC:** `scratch/ops_reports/VIVIAN_QA_FIELD_NOTES_SEO_2026-08-03.md` — cleared for Jason Phase 4 deploy approval (no auto-deploy)  
**Jason rationale (paraphrased):** SEO refinement / invisible backend work the team can do while he sleeps — **not** a greenlight for the rest of the guerrilla plan. Morning shift ran same scope after Jason woke.

**Canonical path:** `scratch/ops_reports/FIELD_NOTES_SEO_OVERNIGHT_BRIEF_2026-08-03.md`

---

## 1. Scope (ACTIVE)

| In | Out |
|----|-----|
| Existing Field Notes pages (hub + 12 essays) | New long essays / inventing unpublished notes |
| Meta titles & descriptions refinement | NetGalley / Edelweiss / paid ads |
| Internal linking (note ↔ note, note ↔ volume, note ↔ Chamber) | Social posting (IG/X/Bluesky/BookTok/etc.) |
| Soft CTAs → free chapter + newsletter | Personal ARC outreach · review-ask blasts |
| Sitemap / indexing hygiene investigation (GSC Claim 4 residual) | Bookstore / Reddit / library outbound |
| Schema / structured data **if already in codebase** | Chamber lane (not approved tonight) |
| Draft improvements in repo (no deploy without Vivian) | Money / legal / press replies |

**Goal:** Make existing Field Notes discoverable and conversion-soft — series world hooks that point curious readers to free chapters and the newsletter — without spammy sales language.

---

## 2. Catalog locks (do not violate)

- **Amazon:** Kindle Vol I–III only — ASINs `B0H4KYMSM1` · `B0H4KQ4YQJ` · `B0H4L36X21`
- **Print / omnibus:** IngramSpark only
- **No omnibus on Amazon** — never link or imply Amazon carries omnibus
- Buy-path language: site / Bookshop / Ingram for print; Amazon only for Kindle volumes

---

## 3. Vivian gate

| Work | Overnight OK? | Gate |
|------|---------------|------|
| Draft meta title/description diffs in repo | **YES** | Vivian before merge/deploy if public-facing |
| Sitemap audit notes (code vs live vs GSC) | **YES** | Report only — no Jason wake |
| Internal-link / CTA block drafts on existing notes | **YES** | Vivian PASS before deploy |
| Soft CTA copy variants (newsletter / chapters-sent) | **YES** draft | Vivian PASS → Jason only if money/legal/press (N/A for SEO meta) |
| Deploy / Phase 4 site ship | **NO** | Vivian PASS + Jason evening checklist (A5 still DENY until Vivian) |
| New public essay pages | **NO** unless already queued | Vivian if new public |

**Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md` · Morgan routes · Vivian clears · Jason approves public ship.

**Morning queue:** proposed public diffs listed in morning report — ready for `vivian pass field notes`.

---

## 4. What Morgan / content can do overnight vs wake Jason

### Do without waking Jason
- Audit all 12 notes + hub for meta length, keyword clarity, duplicate titles
- Draft improved `buildMetadata({ title, description, … })` copy per slug
- Map internal links: volume bridges from `lib/data/fieldNotes.ts` · cross-note links · Chamber where relevant
- Soft CTA consistency check against `FieldNoteLayout` (already has newsletter + “Read the Novel”)
- Sitemap coverage audit: `app/sitemap.ts` vs `lib/data/fieldNotes.ts` vs live `/sitemap.xml`
- Note GSC Claim 4 residual (discovered pages = 3) hypotheses + recommended next GSC hygiene steps
- Queue Vivian packet: proposed diffs + PASS checklist

### Needs Vivian PASS (before any public deploy)
- Any changed page metadata that ships live
- Any new/changed on-page CTA copy
- Fiction/research boundary language if touched
- Schema/OG changes that affect public HTML

### Needs Jason (do not overnight-escalate)
- Money / legal / notarization
- Press or reader replies
- Expanding greenlight beyond Field Notes SEO
- Deploy approval after Vivian PASS (evening checklist)

---

## 5. Field Notes URL / slug checklist

Source of truth: `lib/data/fieldNotes.ts` · routes under `app/field-notes/` · sitemap slugs derived from `fieldNotes` in `app/sitemap.ts`.

| # | Slug | Path | Theme |
|---|------|------|-------|
| 0 | *(hub)* | `/field-notes/` | Index |
| 1 | `subtropolis` | `/field-notes/subtropolis/` | Beneath Kansas City |
| 2 | `kansas-city-locations` | `/field-notes/kansas-city-locations/` | Beneath Kansas City |
| 3 | `meramec-caverns` | `/field-notes/meramec-caverns/` | Beneath Kansas City |
| 4 | `oscar-01` | `/field-notes/oscar-01/` | Beneath Kansas City |
| 5 | `111-hz` | `/field-notes/111-hz/` | The Frequency |
| 6 | `cymatics` | `/field-notes/cymatics/` | The Frequency |
| 7 | `u2-test-pilots` | `/field-notes/u2-test-pilots/` | The Frequency |
| 8 | `voynich-manuscript` | `/field-notes/voynich-manuscript/` | The Manuscripts |
| 9 | `ars-notoria` | `/field-notes/ars-notoria/` | The Manuscripts |
| 10 | `codex-gigas` | `/field-notes/codex-gigas/` | The Manuscripts |
| 11 | `gospel-of-thomas` | `/field-notes/gospel-of-thomas/` | The Manuscripts |
| 12 | `strahov-monastery` | `/field-notes/strahov-monastery/` | The Sites |

**Canonical host for public URLs:** `https://jasoncholloway.com` (trailing slash).

**Code note:** `app/sitemap.ts` derives all 12 slugs from `fieldNotes.ts` + hub static entry. Live sitemap morning recheck: **13** Field Notes hits. GSC “discovered = 3” = indexing lag hygiene — not invent missing pages.

---

## 6. Soft CTA copy guidelines (brand voice)

Existing layout already includes:
- Primary: “Read the Novel →” → volume bridge
- Secondary: “View the Trilogy”
- Newsletter block: free Volume I chapters (soft ask)

**Keep:**
- Quiet, documentary tone — research first, fiction as bridge
- One soft ask per note footer (newsletter **or** chapters-sent), not stacked hard sells
- Honest boundary: documented history vs what the novel invents
- Kindle ASIN only when linking Amazon; print → site / Ingram / Bookshop

**Avoid:**
- Urgency spam (“limited time”, “don’t miss”, emoji blasts)
- Review-ask language on Field Notes (not in this greenlight)
- “Buy now” as primary CTA on research essays
- Omnibus-on-Amazon implications
- Inventing new essays to farm keywords

**Draft tone examples (for Vivian, not live):**
- “Opening chapters of Volume I are free — same research thread, fictional form.”
- “If this place stuck with you, the trilogy starts where the maps go quiet.”
- Prefer linking `/chapters-sent/` and newsletter form over hard Amazon pushes on Field Notes.

---

## 7. Success metrics (tie to Claim 4 residual)

| Metric | Why |
|--------|-----|
| Sitemap lists hub + 12 notes | Coverage baseline (code already does) |
| Live sitemap matches code | Catch deploy drift |
| GSC: rise in discovered / indexed Field Notes URLs over days–weeks | Claim 4 residual was **discovered pages = 3** — hygiene only; Field Notes SEO may help if pages exist but aren’t indexed |
| Meta uniqueness | No duplicate title/description across 12 notes |
| Soft CTA present + consistent | Newsletter / free chapter path on every note |
| Vivian PASS packet ready | So Jason evening checklist can ship without re-briefing |

**Do not** treat draft work as “indexed” until post-deploy GSC recheck.

---

## 8. Explicit NOT in scope

- NetGalley / paid ARC platforms  
- Paid ads / boosts  
- Social posting or scheduling new campaigns  
- Personal ARC outreach / review-ask email blasts  
- Reddit / BookTok / bookstore outreach  
- Chamber experiential lane (held)  
- New long-form Field Notes essays (unless already queued elsewhere)

---

## 9. READY overnight agent tasks (zero-risk prep)

Mark **EXECUTED (morning)** — draft / audit done. **Do not deploy** without Vivian if public-facing.

| ID | Task | Owner | Deliverable | Morning status |
|----|------|-------|-------------|----------------|
| **FN-01** | Meta audit: current title/description vs SERP length (~50–60 / ~150–160) | Content | Spreadsheet or md table per slug | **DONE** — morning report table |
| **FN-02** | Draft meta improvements for weakest 4–6 notes | Content | PR-ready `page.tsx` diffs (uncommitted OK) | **DONE** — all 12 + hub refined |
| **FN-03** | Sitemap audit: `fieldNotes.ts` ↔ `app/sitemap.ts` ↔ live `sitemap.xml` | Nina / ops | Short note in this brief §10 or sibling report | **DONE** — derived sitemap + live 13 hits |
| **FN-04** | GSC hygiene note: why discovered=3; Field Notes URL sample to request indexing later (Jason/GSC only) | Morgan | Hypothesis + checklist — no console edits without Jason | **DONE** — hygiene note in morning report |
| **FN-05** | Internal link map: volume bridges + 2–3 cross-note links per theme | Content | Draft link list | **DONE** — volumes + related refresh |
| **FN-06** | Soft CTA consistency pass vs `FieldNoteLayout` | Content | Gap list (missing chapters-sent? hub CTA?) | **DONE** — layout + hub soft ask |
| **FN-07** | Vivian packet: proposed public diffs + QC checklist | Morgan → Vivian | Ready for `vivian pass field notes` | **DONE** — morning report § Vivian |

---

## 10. Sitemap / GSC note (investigate)

- **Code:** Hub + 12 Field Notes are in `app/sitemap.ts` (derived from `fieldNotes.ts` as of morning execution).
- **Live sitemap:** `https://jasoncholloway.com/sitemap.xml` — overnight ~04:22 CT and morning ~08:20 CT — **13** Field Notes URL hits = hub + all **12** essay slugs. **Not a missing-from-sitemap problem.**
- **Claim 4 residual:** SCP GSC showed ~3 discovered pages after verification — hygiene follow-up, not reopen claim. Likely indexing/discovery lag or thin crawl, not absent sitemap entries.
- **Hypothesis:** Pages exist and are sitemapped; Google discovery/indexing has not caught up. SEO meta + internal links help crawl paths; they do not replace wait time / selective URL Inspection.
- Overnight/morning agent (FN-03/FN-04): parity reconfirmed; GSC next steps logged. Do **not** spam URL Inspection without Jason.

---

## 11. Reply commands

- `run field notes seo overnight` — execute FN-01…FN-07 (draft/audit only) — **DONE (morning)**  
- `vivian pass field notes` — Vivian QC on proposed public diffs  
- `stop field notes` — halt this lane immediately  
- Expand guerrilla greenlight later — Jason must explicitly approve additional lanes (ARC, social, Reddit, etc.)

---

*Morgan — 2026-08-03 ~04:17 CT · executed morning ~08:25 CT · partial greenlight only · $0 · no social · no NetGalley · no deploy without Vivian.*
