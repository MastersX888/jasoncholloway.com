# Visualization Phase Kickoff — 2026-08-02

**Desk:** Morgan · **Week arc:** Consolidation → QA (auto largely complete) → **Visualization next**  
**Plan:** `SCP_BUSINESS_PLAN_REFINED.md` phase 3 (Fri–Sun): Groundswell refresh · presence BI · Chamber/folio leverage  
**Scope this doc:** Safe scaffolding only — no publish, no credential harvest, no Jason-facing dashboard deploy without Vivian when public-facing.

---

## 1. Data sources available

| Source | Path / URL | What’s in it | Freshness / gap |
|--------|------------|--------------|-----------------|
| **Presence audit map** | `scratch/ops_reports/PRESENCE_AUDIT_MAP_2026-08-02.md` | Retail, authority, social, trade status + BI field keys | 2026-08-02 — primary coverage matrix |
| **Groundswell monitor** | `groundswell-monitor/` (present; `START_HERE.md`, `DEPLOY.md`, `public/mock_snapshot_single.json`) | CF visitors/requests, intel/dork wire, intake for sales, social ingest UI | Live: https://groundswell-monitor.zh5779485.workers.dev/ · weekly `scratch/ops_reports/groundswell/weekly/2026-W31.md` (GSC/signups often null) |
| **Social daily reports** | `scratch/ops_reports/social/` (`2026-08-01.md`, etc.) | Platform rollups, Outstand queue notes, X/IG/FB/Pinterest/Bluesky | Daily skill output; wire into Groundswell weekly |
| **Email daily reports** | `scratch/email_reports/` | Open cases, approvals, WAITING threads | Daily skill; markdown link into weekly until API |
| **Catalog / SKUs** | `lib/data/books.ts`, `lib/data/ingram-catalog.json`, `content/catalog.ts`, `public/feeds/google-shopping.csv` | ISBN/ASIN/price matrix; Kindle Vol I–III only on Amazon | Feed vs Ingram `usList` intentional flat-tier note (Vivian) |
| **Ops internal board** | `/ops/` (robots disallow) | Sweep / task board scaffolding | Not public BI |
| **Sales CSVs** | Groundswell Intake tab (KDP / Ingram) | Unit/revenue if Jason uploads | **No new KDP CSV** in W31; Ingram still approval-gated |
| **QA / Vivian queue** | `VIVIAN_QA_QUEUE_2026-08-02.md`, hourly STATUS | Site QA status, agent_auto_ok vs vivian_needed | Auto batch largely done; human QC open |
| **Free-claim packets** | Consolidation kickoff + Jason exact asks in hourly STATUS | Partner / ASC / GBP / GSC / GR shelves | Funnel = claim status from presence map |

**Skill:** `~/.cursor/skills/groundswell-weekly-agent/SKILL.md`  
**Master plan:** `scratch/SCP_AUTOMATION_MASTER_PLAN.md` Phase 3

---

## 2. Dashboard candidates (business-plan aligned)

Build toward four BI views (can be Groundswell tabs, static ops markdown → later UI, or `/ops` internal):

### A. Presence coverage
- Inputs: `PRESENCE_AUDIT_MAP` BI fields (`amazon_kindle`, `ingram_pb`, `gsc_scp`, `sg_catalog`, social `*=live`, etc.)
- Output: % claimed/live vs open/hold; RED gates (omnibus≠Amazon, NetGalley HOLD)
- Owner path: Agent maintain map → Groundswell or ops chart

### B. Free-pipeline funnel
- Stages: Packet ready → Jason click → Verified live → Metrics flowing
- Surfaces: Google Books Partner · Apple ASC · GBP · SCP GSC · Goodreads shelves · (ORCID/LoC later)
- Output: bottleneck count; “Jason minutes” remaining

### C. Catalog SKUs
- Matrix: 3 Kindle ASINs · Ingram print/EPUB/omnibus · Hawkes 3 formats · shopping feed rows
- Flags: price tier (Buy Direct flat vs Ingram list) · Amazon omnibus = n/a · Hawkes novel count = seventeen
- Output: single SKU health table for Phase 4 deploy confidence

### D. Site QA status
- Inputs: Vivian queue statuses (`agent_auto_ok` / `vivian_needed` / `pending` / PASS)
- Output: P0–P3 completion bars; blockers (15 vs 23, Ingram, deploy)
- Output: do **not** show fake PASS

---

## 3. Build without Jason vs needs credentials

### Can build without Jason (safe scaffolding)

- Presence → BI field schema / JSON snapshot from audit map  
- SKU matrix from repo catalogs + shopping feed  
- QA status rollup from Vivian queue markdown  
- Free-funnel checklist UI from known open claims (no login)  
- Groundswell submodule sync + weekly deliverable shell  
- Wire markdown links: latest email + social into weekly Groundswell note  
- Internal `/ops` panels (already noindex)

### Needs Jason / credentials / human login

| Need | Why |
|------|-----|
| IngramSpark approve / HC revise | Publishing blocker; sales reality |
| KDP / Ingram sales CSV upload | Intake tab empty without files |
| Google Books Partner, Apple ASC, GBP, SCP GSC, GR shelves | Free claims — click packets |
| Cloudflare Access / `CF_ACCESS_*` for KV dismiss | Outstand queue dismiss blocked in W31 |
| GSC / Web3Forms Actions secrets | Impressions/clicks/signups null in snapshot |
| Outstand / Meta / X tokens if metrics stale | Social agent gaps |
| Any **public** chart copy | Vivian PASS + Jason Phase 4 before publish |

---

## 4. Groundswell pointer

```
groundswell-monitor/          ← present in workspace
  START_HERE.md
  DEPLOY.md
  public/mock_snapshot_single.json
  pipeline/ · src/ · scripts/
Live: https://groundswell-monitor.zh5779485.workers.dev/
Weekly reports: scratch/ops_reports/groundswell/weekly/
```

**Next agent steps (no Jason required to start):** submodule freshness check · snapshot date · draft Presence Coverage + SKU tables from repo · stub funnel from presence OPEN rows · refresh weekly template for W32 when Viz phase starts mid-week.

**Hold:** Do not block Visualization prep on Ingram/claims — those stay Consolidation P0; Viz scaffolds offline of live sales.

---

## 5. Success criteria (end of Viz window)

- [x] Presence map + BI fields current → `scratch/ops_reports/bi/presence_snapshot.json`  
- [ ] Groundswell data refreshed this week (submodule present; live snapshot refresh still due)  
- [x] At least one coverage dashboard (internal OK) showing claim funnel + SKU lock → Cursor canvas `scp-bi-v1.canvas.tsx`  
- [x] QA status visible without inventing Vivian PASS → `bi/qa_status_snapshot.json` (PASS=0)  
- [x] Sales panel shows “awaiting CSV / Ingram” honestly if empty (canvas Callout + SKU sales block)

---

## 6. LIVE — Visualization v1 (2026-08-02 ~23:20 CT)

**Path chosen:** Cursor canvas + offline JSON (highest leverage without API keys). Groundswell stays for weekly live metrics later — not blocking v1.

| Deliverable | Path |
|-------------|------|
| **BI canvas (open beside chat)** | `C:\Users\zh577\.cursor\projects\c-Users-zh577-gemini-antigravity-scratch-jasoncholloway\canvases\scp-bi-v1.canvas.tsx` |
| Presence snapshot | `scratch/ops_reports/bi/presence_snapshot.json` |
| Free-pipeline funnel | `scratch/ops_reports/bi/free_pipeline_funnel.json` |
| Catalog SKU map | `scratch/ops_reports/bi/catalog_sku_map.json` |
| QA status snapshot | `scratch/ops_reports/bi/qa_status_snapshot.json` |
| Pack index | `scratch/ops_reports/bi/README.md` |

**Surfaces on canvas:** A Presence coverage · B Free-pipeline Top-5 funnel · C Catalog SKU matrix · D QA primary-gate (vivian_needed 29 / auto_ok-only 2 / pending 13 / PASS 0).

**Still needs Jason later:** KDP/Ingram sales CSV · Top-5 claim clicks · GSC/Web3Forms secrets · CF Access for Outstand dismiss · any public chart (Vivian PASS + Phase 4).

*Morgan — Viz v1 scaffolding LIVE 2026-08-02 ~23:20 CT · no publish*
