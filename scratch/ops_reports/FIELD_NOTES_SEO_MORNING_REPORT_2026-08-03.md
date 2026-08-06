# Field Notes SEO — Morning Shift Report (2026-08-03)

**Desk:** Content ops (morning execution of overnight brief)  
**Parent approval:** `GUERRILLA_ORGANIC_GROUNDSWELL_Q3.md` — **PARTIAL APPROVE** (Field Notes SEO only)  
**Source brief:** `scratch/ops_reports/FIELD_NOTES_SEO_OVERNIGHT_BRIEF_2026-08-03.md`  
**Stamp:** 2026-08-03 ~08:25 CT  
**Deploy:** **DEPLOYED** — prod `720424a` on `origin/main`; staging `aee3383` pushed `cursor/upload-staging-f9e1` ~2026-08-03 16:48 CT
**Catalog locks:** Amazon Kindle Vol I–III only · print/omnibus Ingram · no omnibus Amazon — **respected** (zero Amazon/omnibus links on Field Notes surfaces).

---

## Status

| Lane | Status |
|------|--------|
| Field Notes SEO (FN-01…FN-07) | **EXECUTED (morning)** |
| Other guerrilla lanes | **HELD** (unchanged) |
| Vivian QC | **PASS WITH NOTES** — `VIVIAN_QA_FIELD_NOTES_SEO_2026-08-03.md` (~08:55 CT) |
| Jason public ship | Cleared for Phase 4 — reply **`approve field notes deploy`** (still no auto-deploy) |

---

## What changed (summary)

1. **Meta titles/descriptions** tightened to ~50–60 / ~150–160 across hub + all 12 notes (weakest titles/descs were the priority: cymatics, u2, ars, codex, gospel, strahov, oscar, meramec, voynich, hub).
2. **Volume bridges** filled for notes that previously had none (kansas-city-locations, meramec, oscar-01, u2, codex-gigas, gospel-of-thomas); ars/strahov bridges expanded where fiction spans volumes.
3. **Internal links** refreshed on several notes (cross-theme: frequency ↔ sites ↔ manuscripts; subterranean ↔ Meramec/111 Hz).
4. **Soft CTA consistency:** `FieldNoteLayout` — one soft ask (free Vol I chapters via newsletter → `/chapters-sent/`); quiet series-bridge line; hub gained matching newsletter block before trilogy CTA.
5. **Sitemap parity:** `app/sitemap.ts` now **derives** Field Notes URLs from `lib/data/fieldNotes.ts` (hub + 12 essays). Live sitemap reconfirmed **13** Field Notes URL hits (hub + 12).
6. **RSS parity:** `app/field-notes/rss.xml/route.ts` derives items from `fieldNotes.ts` (trailing-slash links).

**Not done (out of scope):** deploy, social, NetGalley, ARC, Chamber lane, new essays, GSC console edits.

---

## File list (public-facing diffs for Vivian)

| File | Change type |
|------|-------------|
| `components/field-notes/FieldNoteLayout.tsx` | Soft CTA copy + series bridge line |
| `app/field-notes/page.tsx` | Hub meta trim + newsletter soft CTA section |
| `lib/data/fieldNotes.ts` | Titles/descs sync; volume bridges; hub card titles |
| `app/sitemap.ts` | Derive FN slugs from `fieldNotes.ts` |
| `app/field-notes/rss.xml/route.ts` | Derive feed from `fieldNotes.ts` |
| `app/field-notes/subtropolis/page.tsx` | Meta + related links |
| `app/field-notes/111-hz/page.tsx` | Meta description |
| `app/field-notes/cymatics/page.tsx` | Meta + related + titleTag |
| `app/field-notes/u2-test-pilots/page.tsx` | Meta + H1/titleTag |
| `app/field-notes/oscar-01/page.tsx` | Meta + related + titleTag |
| `app/field-notes/meramec-caverns/page.tsx` | Meta + related |
| `app/field-notes/kansas-city-locations/page.tsx` | Meta description |
| `app/field-notes/voynich-manuscript/page.tsx` | Meta + titleTag |
| `app/field-notes/ars-notoria/page.tsx` | Meta + related + titleTag |
| `app/field-notes/codex-gigas/page.tsx` | Meta + titleTag |
| `app/field-notes/gospel-of-thomas/page.tsx` | Meta + related + titleTag |
| `app/field-notes/strahov-monastery/page.tsx` | Meta + related + titleTag |

---

## Meta audit (post-change)

| Slug | Title ~chars | Desc ~chars | Notes |
|------|--------------|-------------|-------|
| *(hub)* | 48 | 155 | Trimmed from 234 |
| subtropolis | 53 | ~160 | Tightened |
| kansas-city-locations | 49 | 160 | Tightened |
| meramec-caverns | 49 | ~155 | Was 332 |
| oscar-01 | 51 | ~155 | Was 305 / long title |
| 111-hz | 52 | 142 | Tightened |
| cymatics | 46 | 146 | Was 27 / 310 |
| u2-test-pilots | 47 | 152 | Was 37 / 296 |
| voynich-manuscript | ~52 | 158 | Shortened title |
| ars-notoria | 53 | 161 | Was 74 / 316 |
| codex-gigas | 46 | 151 | Was 78 / 268 |
| gospel-of-thomas | 52 | 145 | Was 76 / 274 |
| strahov-monastery | 55 | 163 | Was 75 / 291 |

H1s kept human-curiosity phrasing where useful; `titleTag` / `buildMetadata.title` align for JSON-LD + SERP.

---

## Soft CTA (FN-06)

| Surface | Before | After |
|---------|--------|-------|
| Note layout | “Get the opening chapters free.” + form; Read Novel / View Trilogy | Soft bridge line + “Opening chapters of Volume I are free.” + form (one soft ask) |
| Hub | Trilogy + Chamber only | Newsletter soft ask **then** trilogy/Chamber |
| Amazon push | None | None |
| chapters-sent | Form redirect only (correct; thank-you is noindex) | Unchanged pattern |

---

## Sitemap / GSC (FN-03 / FN-04)

- **Code:** hub + 12 essays via `fieldNotes.ts` → `sitemap.ts`.
- **Live (morning recheck):** `https://jasoncholloway.com/sitemap.xml` → **13** Field Notes URL matches. **Not a missing-from-sitemap problem.**
- **GSC residual (discovered pages ≈ 3):** hygiene only. Pages are sitemapped; indexing lag / thin crawl / property catch-up. Do **not** spam URL Inspection without Jason. After Vivian PASS + deploy, selective Inspection of a sample (hub + 2–3 notes) is optional Jason/GSC work.

---

## Vivian QC — cleared

**Verdict:** PASS WITH NOTES · 2026-08-03 ~08:55 CT · report: `VIVIAN_QA_FIELD_NOTES_SEO_2026-08-03.md`

### Voice & boundary
- [x] Soft CTA copy is documentary, not urgency/spam
- [x] Fiction vs record boundary language untouched / still clear in layout disclaimer
- [x] No review-ask language on Field Notes

### Catalog
- [x] No Amazon omnibus implication
- [x] Volume sidebar links only Masters X volume routes (site), not Amazon hard-sell

### SEO / structure
- [x] Meta titles unique across 12 + hub
- [x] Descriptions unique; no duplicate paste
- [x] Related notes still thematic (not keyword-stuffed)
- [x] Sitemap still hub + exactly 12 essays
- [x] Schema (Article/FAQ/Breadcrumb) still coherent with new titleTags

### Ship gate
- [x] PASS WITH NOTES → Morgan routes to Jason Phase 4 checklist (deploy still DENY until Jason)
- [x] Easy fix applied in QC: hub/RSS titles synced for ars-notoria + oscar-01

**Residual notes (Jason optional):** “Cognitive Tech” phrasing; SubTropolis desc ~165 chars; intentional H1≠titleTag on ars/oscar; CTA stack density.

---

## Remaining TODOs (not this shift)

1. ~~Vivian PASS on packet above.~~ **DONE — PASS WITH NOTES.**  
2. Jason approve deploy (Phase 4) — reply **`approve field notes deploy`**.  
3. Post-deploy: optional GSC URL Inspection sample (Jason only).  
4. Other guerrilla lanes remain **HELD** until explicit expand greenlight.

---

## Reply commands

- ~~`vivian pass field notes`~~ — **DONE** (PASS WITH NOTES)  
- `approve field notes deploy` — Jason Phase 4 greenlight to commit/deploy (agents do not auto-ship)  
- `stop field notes` — halt this lane  
- Expand guerrilla greenlight — Jason must explicitly approve

---

*Morning shift · 2026-08-03 ~08:25 CT · $0 · no social · no NetGalley · no deploy · no commit.*

---

## DEPLOYED

**Status:** **DEPLOYED** (live smoke 200s)  
**Marked:** 2026-08-03 16:48 CT  
**Production (Cloudflare Pages / origin main):** `720424a` (`720424aee67b42802b7cc583af32ba4e16e1432f`) — committer 2026-08-03 13:11:46 -0500 — already on `origin/main` before this ship closeout  
**Staging branch push (this session):** `cursor/upload-staging-f9e1` `aee3383`..`aee33830c817ba0311c869740521dab0638decdd` pushed 83bedb3..aee3383 at ~2026-08-03 16:48 CT — **no force**  
**Deploy path:** Cloudflare Pages project `jasoncholloway` (`wrangler.toml` `pages_build_output_dir = out`) — production tracks **main**; staging branch push does not replace prod  
**Live smoke (2026-08-03 ~16:48 CT):**
- 200 https://jasoncholloway.com/field-notes/
- 200 https://jasoncholloway.com/field-notes/subtropolis/
- 200 https://jasoncholloway.com/sitemap.xml (13 field-notes hits)
- 200 https://jasoncholloway.com/field-notes/rss.xml
- Live titles match SEO meta (hub + SubTropolis); soft CTA / chapters-sent / masters-x present
