# Week Kickoff Plan — 2026-08-03 (Mon) → 2026-08-09 (Sun)

**Desk:** Morgan · **Theme:** Consolidation → QA → Visualization  
**North star:** Evening-only Jason; Vivian clears before Phase 4; no money/legal/press auto-send  
**Catalog lock:** Amazon = Kindle Vol I–III only · Print/omnibus = IngramSpark · GR→StoryGraph catalog = **COMPLETE** (series librarian ticket optional)

---

## Week arc

| Phase | Days | Goal |
|-------|------|------|
| **1. Consolidation** | Mon–Tue | Close dirty print path + free discovery claims; stabilize machine |
| **2. QA** | Wed–Thu | Vivian gates on catalog/metadata/site; no public drift |
| **3. Visualization** | Fri–Sun | Groundswell refresh, presence BI fields, Chamber/folio leverage |

---

## Phase 1 — Consolidation (Mon–Tue)

### Machine / ops (P0 if disk still tight)

| Item | Owner | Notes |
|------|-------|-------|
| Phone Link unlinked | Jason ✅ (2026-08-02 eve) | CrossDevice hog removed; C: ~7 GB free at kickoff write — still aim ≥15 GB |
| OneDrive Files On-Demand | Jason | Documents/Desktop “Free up space” if C: dips again |
| Cursor `state.vscdb` trim | Jason | Only after full Cursor quit (~7.9 GB) |
| OPS-01 commit working tree | Jason | Large uncommitted diff — risk of lost press/SEO |

### Print / catalog (P0 publishing)

| Item | ID | Owner | Exact ask |
|------|-----|-------|-----------|
| Approve Ingram PB ×3 | PUB-09 | Jason | **DONE LIVE** ~2026-08-03 afternoon CT |
| Upload HC Revise Files ×3 | PUB-10 | Jason | **DONE LIVE** ~2026-08-03 afternoon CT |
| Verify returnability / ≥50–55% wholesale | PUB-11 | Jason | Screenshot Ingram terms — **do not assert in press until proven** |

### Free discovery claims (batch ~45–60 min)

See `PRESENCE_AUDIT_MAP_2026-08-02.md` § Top 5. Do **not** re-run GR→StoryGraph catalog import (complete). Series ticket = optional.

### Already closed this weekend (do not reopen)

- GR export → StoryGraph CSV import + form-fill catalog (**COMPLETE**)
- Indie bookstore emails ×3 (Rainy Day, Prospero’s, Raven) — sent
- VIAF request — sent (wait 2–8 weeks)
- Social v2 publish 35/35
- Entity graph core: Wikidata author+trilogy, ISNI, OL author, Goodreads author

---

## Phase 2 — QA (Wed–Thu)

| Gate | Owner | Scope |
|------|-------|-------|
| Vivian re-QC after Ingram PB/HC land | Vivian → Jason | New interiors/covers/metadata vs ISBN registry |
| Live site §6 visual re-QC | Vivian | Press kit, buy links, omnibus routing (no Amazon omnibus) |
| Schema / `sameAs` | Nina + Vivian | Only after presence claims change live URLs |
| Outbound drafts (Hawkes 14/15, ABA 18, Shelf Awareness) | Vivian → Jason | Hold until Jason picks recipients / budget |
| NetGalley | Jason (budget) | **DENIED / DEFERRED** — A1 + strategy `deny` 2026-08-03; guerrilla **PARTIAL APPROVE** Field Notes SEO only (`GUERRILLA_ORGANIC_GROUNDSWELL_Q3.md`) |

**Rule:** Nothing publish/send without Vivian PASS + Jason Phase 4 checklist.

---

## Phase 3 — Visualization (Fri–Sun)

| Deliverable | Owner | Output |
|-------------|-------|--------|
| Groundswell submodule pull + snapshot refresh | Agent | `groundswell-monitor/` (was ~17 commits behind); weekly stub `scratch/ops_reports/groundswell/weekly/` |
| Presence BI fields wired | Agent | Claimed/unclaimed → ops rollups / `/ops` board |
| Folio visualizer pitch kit | Claire + Diana (prep) | Manuscript-community backlinks — Vivian before send |
| Field Notes SEO (ACTIVE partial greenlight) | Content ops / Nina | Overnight brief `FIELD_NOTES_SEO_OVERNIGHT_BRIEF_2026-08-03.md` — meta/links/soft CTAs; Vivian before deploy · Chamber still HELD |
| Hourly status cadence | Morgan | `HOURLY_STATUS_PROTOCOL.md` + `hourly/STATUS_*.md` |

**Social:** Maintain Outstand schedule; no new campaign inventing. Audience still tiny — claims > posts this week.

---

## Daily cadence (Jason evening only)

1. Open `CHECKLIST_YYYY-MM-DD.md` (or zero-cost stack if no checklist yet)
2. Approve Vivian-cleared items only
3. Money / legal / notarization always Jason
4. Skip NetGalley / Edelweiss until organic groundswell gates; Field Notes SEO only until Jason expands guerrilla greenlight

---

## Deferred (explicit)

| Item | Why |
|------|-----|
| Audiobook / ACX / Findaway | Career + capacity — after print path closed |
| Wikipedia article | Needs independent RS |
| Edelweiss / paid trade | Budget |
| StoryGraph series librarian ticket | Optional — draft at `STORYGRAPH_SERIES_TICKET_DRAFT.md` |

---

## Success criteria (Fri close)

- [x] Ingram PB×3 + HC×3 approved / LIVE — Jason report ~2026-08-03 afternoon CT (`INGRAM_ALL_TITLES_LIVE_2026-08-03.md`); PUB-11 still open
- [x] ≥3 of Top-5 free claims closed (Books Partner, Apple ASC, GBP, SCP GSC, GR shelves) — **3/3 met** via Claim 1 GR + Claim 3 Books Partner + Claim 4 SCP GSC (Apple sidelined does not count); Claim 5 GBP = **bonus COMPLETE** ~04:09 CT (Top-5 free claims done except Apple)
- [x] Presence map + BI fields current (Ingram flipped LIVE 2026-08-03)
- [ ] Groundswell data not older than this week
- [ ] C: ≥10 GB free sustained
- [ ] No public asset shipped without Vivian

---

## Source reports

- Presence: `PRESENCE_AUDIT_MAP_2026-08-02.md`
- Routing: `MODEL_ASSIGNMENT_MATRIX_2026-08-02.md`
- Health: `SYSTEM_HEALTH_DIAGNOSIS_2026-08-02.md`
- Trade: `BACKCHANNEL_DISTRIBUTION_AUDIT_2026-08-01.md`
- GR/SG: `scratch/ops/gr_gate_state.json` (gate_passed: true)

*Morgan — week kickoff locked 2026-08-02 ~22:03 CT*
