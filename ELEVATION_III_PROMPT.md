# ELEVATION III — jasoncholloway.com + seventhcitypress.com

**Follow-up to Elevation II (13-JUL-2026) · Level 3 pass**

---

## CONTEXT — WHAT ELEVATION II ALREADY SHIPPED (do not redo)

Commits on `main` (were ahead of origin by 6 — **push first**):

| Commit   | Summary |
|----------|---------|
| `794b85a` | fix(field-notes): DOI 10.1121/1.414642 |
| `087d96b` | data(books): interior/laminate fields (prices already flat tier) |
| `2b715db` | feat([slug]): spec from data, inline two-price edition cards, JSON-LD MSRP, eyebrow subtitle fix |
| `9e82361` | feat(monograph): inline two-price + JSON-LD MSRP |
| `d602a35` | feat(homepage): artifact-strip markup + CSS (eyebrow already correct) |
| `f40a134` | feat(imprint): v1.1 structured daylight |

**Prior register work (Phases 1–4, already in repo):**

- Phase 1: imprint daylight, hero evidence strip, contrast audit
- Phase 2: CoverArtifact, monograph cream criticism register
- Phase 3: NotaIcon, WaveDivider, fiction/research registers, rubrication, 18px fiction body
- Phase 4: per-volume header textures, omnibus flagship on `/books/masters-x/`

**Deployed previews (verify after cache purge):**

- Author: https://2f913b5a.jasoncholloway.pages.dev
- Imprint: https://e6f5d56d.seventhcitypress.pages.dev

**Repo root (actual paths — not `author_site/` alias):**

- Author: `./`
- Imprint: `./seventhcitypress/`
- Build: `powershell -ExecutionPolicy Bypass -File scratch/build_export.ps1`
- Deploy: `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`

**NEVER CHANGE:** IngramSpark `?params=` strings · `google-shopping.csv` · `metadataBase` · `/books/*` canonicals · Chamber component internals

---

## P0 — FINISH ELEVATION II LOOSE ENDS

### TASK A · Homepage artifact strip + folio authority (PARTIALLY DONE — commit + finish audit)

**Author decision (locked):** Exact folio ↔ image ↔ caption matching site-wide for SEO. **Never** label `voynich-009` as f68r3 — that file is **folio 2v** (herbal). Authentic f68r3 is **`Vol 3/vol3-052.jpg`** (Pleiades rosette foldout).

**Already done locally (uncommitted as of 13-JUL-2026):**

| File | Change |
|------|--------|
| `public/field-notes/voynich-folio-thumb.jpg` | Copied from E: `Vol 3/vol3-052.jpg` |
| `public/field-notes/subtropolis-entrance.jpg` | Copied from E: SubTropolis archive |
| `app/page.tsx` | Canonical `/field-notes/*` paths; fallback comments removed |
| `lib/folio-display.ts` | **New** — caption / alt / Beinecke ref helpers |
| `lib/folios.json` | `beineckeRef` on `v1-009` (f2v) and `v3-052` (f68r3); corrected titles/categories |
| `app/chamber/folio-visualizer/page.tsx` | Uses `folio-display.ts` for alt text + sidebar refs |

**Still to do (Task A remainder + site-wide):**

- Commit Task A work (see commit message below)
- Add `beineckeRef` to **all remaining** Voynich rows in `lib/folios.json` (~164 left)
- Visual-verify each export JPEG against printed folio numbers (corner OCR failed — see `scratch/voynich_ocr_probe.json`)
- Fix mis-tagged categories (Vol 2 labeled "astronomical" but many images are herbal)
- Vol 4: normalize `folio` field → explicit `beineckeRef` where missing
- Create/update `ASSET_MANIFEST.md` with source paths + Yale open-access license note
- Restore full `public/folios/` tree from E: for chamber visualizer (not in git)

**E: sources (verified):**

| Target | Source |
|--------|--------|
| `voynich-folio-thumb.jpg` | `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\next_export_folios\voynich\Vol 3\vol3-052.jpg` |
| `subtropolis-entrance.jpg` | `E:\Archives\workspace\Mastersx_Trilogy\Masters-Chamber\chamber_images\KC_Churches\SubTropolis\1207_subtropolis01.jpg` |
| Full folio vault | `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\next_export_folios\voynich\` |

**COMMIT (Task A):** `fix(home): canonical artifact-strip paths + folio authority scaffold`

**COMMIT (folio audit, when ready):** `fix(folios): beineckeRef site-wide caption accuracy`

---

### TASK B · Push + cache purge + production verification

1. `git push origin main` (unpushed Elevation II commits)
2. Rebuild + deploy author + imprint
3. Cloudflare Dashboard → Pages → jasoncholloway → Purge all
4. Run post-deploy checklist (hard refresh):
   - `/field-notes/111-hz/` → `10.1121` present, `10.2307` absent
   - `/` → artifact-strip 3 items, no "Official Digital Platform"
   - `/books/masters-x/the-grimoire/` → two-price cards, B&W interior, JSON-LD `18.99`
   - seventhcitypress.com → dark header/footer, press-blue CTAs

---

### TASK C · tsconfig hygiene

Commit `tsconfig.json` exclude for `website_elevation_handoff/` (build fails without it).

**COMMIT:** `chore(ts): exclude website_elevation_handoff from typecheck`

---

## ELEVATION III — LEVEL 3 CREATIVE / UX PASS

**Read before coding:**

- `website_elevation_handoff/KNOWN_ISSUES_AND_FIXES.md` (P0–P2 punch list)
- `website_elevation_handoff/CANON.md`
- `design_memory/BRAND_SOURCE.md` (if present)
- Current registers: `app/globals.css`, `seventhcitypress/app/globals.css`

### III-1 · ASSET INTEGRITY PASS

The repo references many binaries not present in git (covers, folios, `og/*`).

- Audit all `<img>`, `Image`, `CoverArtifact`, `og:image`, and CSS `url()` references
- Cross-check `website_elevation_handoff/package/ASSET_MANIFEST.md`
- Search **E: drive** for missing covers/folios/OG images
- Produce `ASSET_GAP_REPORT.md`: missing | found-on-E | substitute | needs-author
- Restore missing `public/` assets; do NOT break live URLs

### III-2 · CONVERSION LOOPS (from KNOWN_ISSUES P1)

- Chamber layout: quiet footer strip → `/books/masters-x/` ("Research companion…")
- Field Notes: per-note volume bridge (SubTropolis→Vol I, Strahov→Vol I, etc.) via `lib/data/fieldNotes.ts`
- Trilogy hub ↔ omnibus savings narrative consistency across `/books/`, `/masters-x/`, omnibus

### III-3 · TRUST + SEO POLISH

- Audit Bookshop.org links (direct product URL vs ISBN search)
- Audit all JSON-LD `sameAs` / phantom URLs
- Footer IngramSpark link → omnibus HC buy URL (not ingramspark.com homepage)
- Hawkes epub back-matter "16 novels" → flag for author; site stays 17
- Press kit PDF currency note in HANDOFF_STATUS (do not regenerate PDF in repo)

### III-4 · REGISTER DEPTH (author site)

Extend Phase 3 rubrication where still flat:

- Field Notes: distinct "research note" register (lighter than chamber cyan, warmer than imprint)
- `/about/`, `/contact/`: prose rhythm + single primary CTA discipline
- Omnibus page: unify to inline two-price pattern (match `[slug]` — currently BuyDirectButton)
- Inline style extraction: repeated card/button patterns → `globals.css` utilities (surgical)

### III-5 · IMPRINT v1.2 (seventhcitypress)

v1.1 shipped dark bookends + press-blue. Level 3 adds:

- Hero display scale pass
- Press kit download prominence on homepage
- Heptagram / imprint mark if asset exists in `design_memory/`
- Mobile nav on dark header: WCAG AA contrast
- `display-md` utility if missing (scaled +15% like xl/lg)

### III-6 · DEVICE + PERFORMANCE QA

P0 routes at 412×915 (Moto G class):

`/`, `/books/masters-x/`, `/books/masters-x/the-grimoire/`, `/books/masters-x/omnibus/`, `/books/hawkes-monograph/`, `/field-notes/111-hz/`, `/chamber/`, seventhcitypress.com/

No horizontal scroll; one gold CTA per viewport; reduced-motion respected.

---

## DELIVERABLES

1. Atomic commits per task group (A, C, then III-1…III-6 as sensible chunks)
2. `ELEVATION_III_STATUS.md` — completed, deferred `[NEEDS AUTHOR]`, asset sources
3. Build: 48 author routes + 5 imprint routes, zero TS errors
4. Deploy both sites + cache purge
5. Report: image paths finally used, E: search results, any assets still missing

## OUT OF SCOPE

New checkout, accounts, encyclopedia writing, cover art generation, `google-shopping.csv` edits, Chamber tool logic, Ingram URL params
