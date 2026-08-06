# Morgan Evening Brief — 2026-08-03

**Desk:** Morgan → Jason · **Primary deliverable:** this brief (chat + file)  
**Catalog lock:** Amazon = Kindle Vol I–III only · print/omnibus = Ingram LIVE (Jason confirmed Aug 3)  
**Reply phrases:** `approve myth doctrine` · `resume vivian qa` · `open bi dashboard` · `wrap logistics checklist`

---

## Where you are (one screen)

**Logistics wrap is mostly done.** Print path closed. Free-claim week bar closed early. Field Notes SEO shipped. You are past “fix the pipes” and into “QC the public face + build myth foundation,” then evening = checklist → approve → **audiobook**.

| Lane | State |
|------|--------|
| Ingram PB + HC (Masters X + omnibus) | **LIVE / APPROVED** (your report afternoon CT) |
| Top-5 free claims | **4 closed** (GR, Books Partner, GSC, GBP) · Apple **SIDELINED** · week bar **3/3 CLOSED** |
| Field Notes SEO | **DEPLOYED** (Vivian PASS WITH NOTES → you approved) |
| Presence | **~27/45 live** (~60%) — JSON `presence_snapshot` updated Aug 3 ~16:40 CT |
| Full-site Vivian QA (45-item weekend queue) | **0 PASS** — agent prep ~67% · eyes still owed |
| PUB-11 (55%/returnable) | **OPEN** — do not assert in press |
| Affirm (A6) | Check **approved**; your due/paid/open report **still owed** |
| Guerrilla full plan | You **denied** cliché lane → myth doctrine **DRAFT** below |
| Audiobook | **Unlocked capacity this week** once logistics checklist wraps |

---

## Stuck / blocked

| Item | Owner | Unblock |
|------|-------|---------|
| **Vivian full QA queue** — 0/45 PASS; 29 `vivian_needed` | Vivian → you | Reply **`resume vivian qa`** — start P0 buy/omnibus §6 (Q-01→Q-04). Stalled because Mon claims + Ingram ate the weekend visual pass. |
| **PUB-11** trade screenshots | You | 5 min Ingram portal → wholesale % + returnable; screenshot only; no agent edit |
| **Affirm A6** | You | One line: due / paid / open (money P0) |
| **Apple ASC** | You (later) | SIDELINED — Apple ID create rejected for `jason@seventhcitypress.com`. Resume free ID → ASC Books when ready; keep marketing ID `6769561663`; no Developer Program |
| **GSC discovered = 3** | Nina / ops | Hygiene only — does not block week bar; Field Notes deploy should help indexing |
| **BI canvas stale** | Morgan | Canvas still shows Ingram **partial** (last write ~Aug 2 23:40). JSON packs newer. Re-sync canvas constants next pass |
| **Physical presence viz gap** | Morgan | BI has retail status rows; **no dedicated “bookstore/library orderable via Ingram ISBN” panel** yet — GAP noted |
| **Groundswell week refresh** | Agent | Fri–Sun phase — pull submodule + sales CSV when you export |
| **Cliché guerrilla** | — | **Retired as north star.** Field Notes SEO remains only greenlit adjacent lane until you **`approve myth doctrine`** |

---

## Weekend QA audit — honest status

**Verdict:** Agents stress-tested the repo. Vivian did **not** clear the full public surface. One lane (Field Notes SEO) got a real PASS WITH NOTES and shipped. Everything else is still pre-PASS.

| Metric | Number |
|--------|--------|
| Queue size | **45** |
| Agent auto-check cleared (prep) | **~30** (`agent_auto_ok` flags) ≈ **67%** machine-ready |
| Vivian **PASS** on full queue | **0** (**0%**) |
| Vivian **PASS WITH NOTES** (separate lane) | **1** — Field Notes SEO → **DEPLOYED** |
| Still `vivian_needed` | **29** |
| Still `pending` | **13** (live CDN, schema, SCP sibling, social bios…) |

**What the weekend actually did**

- Consolidation accepted → QA phase **started** (`QA_PHASE_KICKOFF_2026-08-02.md`)
- Safe auto-checks: Kindle ASINs lock, zero Amazon omnibus DP, shopping feed “seventeen,” sitemap/chamber fixes, Jason C 15/23 chamber canon locked
- Landmines fixed in repo (catalog.ts, feed prices, HTML sitemap gaps)
- **Did not invent PASS** — protocol held

**Why it stalled**

1. Mon early hours = claims marathon (GR → Apple block → Partner → GSC → GBP)  
2. Afternoon = Ingram LIVE confirmation  
3. Field Notes SEO consumed the one Vivian slot that got a real verdict  
4. Full visual §6 on buy pages / home / covers **never started**  
5. A5 still DENY site-wide deploy until Vivian PASS (FN was the scoped exception you approved)

**What’s left for Vivian (order):** Q-01→Q-04 buy+omnibus → Q-11 registry → press/feed live → home/series visual → Hawkes → schema → Field Notes body/Chamber batch → SCP sibling → social bios (inspect only).

---

## BI Dashboard

| Question | Answer |
|----------|--------|
| **Where** | Cursor canvas: `C:\Users\zh577\.cursor\projects\c-Users-zh577-gemini-antigravity-scratch-jasoncholloway\canvases\scp-bi-v1.canvas.tsx` · Open File / reply **`open bi dashboard`** |
| **Chat brief** | `scratch/ops_reports/BI_V1_CHAT_BRIEF_2026-08-03.md` (treat chat as primary) |
| **Data packs** | `scratch/ops_reports/bi/` — presence, free pipeline, catalog SKU, QA rollup |
| **Wired?** | **Yes** — offline JSON → canvas constants (canvas cannot fetch). No live API / no invented sales |
| **Freshness** | `presence_snapshot` + `catalog_sku_map` **2026-08-03 ~16:40** (Ingram LIVE) · `free_pipeline_funnel` **~04:09** (claims) · `qa_status_snapshot` **still 2026-08-02** (0 PASS) · **canvas file itself STALE** (Ingram rows still “partial”) |
| **Online presence viz** | Coverage rollup + channel rows — functional for claimed/open/hold |
| **Physical book availability viz** | **GAP** — Ingram flipped live in JSON, but no panel for “orderable at bookstores/libraries by ISBN,” returnability (PUB-11), or international Ingram path. **Next add (don’t overbuild tonight):** Physical Availability strip — PB/HC/omnibus ISBN matrix · status LIVE · PUB-11 unverified badge · Amazon omnibus = n/a |
| **Sales** | Not loaded — export KDP + Ingram CSV → Groundswell when ready |

---

## Weekly layout (evening rhythm)

Goal: **checklist → approve → audiobook.** Team owns pipelines by day.

| When | Jason (≤30–45 min) | Team (day) |
|------|--------------------|------------|
| **Mon (tonight)** | Affirm one-liner · PUB-11 screenshots optional · **`approve myth doctrine`** or revise · skim this brief | Morgan: myth draft + BI gap note · Vivian: queue ready |
| **Tue** | Phase 4 any Vivian-cleared items only | **`resume vivian qa`** P0 buy pages |
| **Wed–Thu** | Approve Vivian PASSes; no inventing sends | Vivian P0→P1 · Nina GSC hygiene · no new social campaigns (A8 DENY) |
| **Fri** | Approve BI/Groundswell refresh notes | Visualization: Groundswell pull · re-sync BI canvas · physical panel stub |
| **Weekend** | Audiobook block protected | Maintain Outstand schedule only; myth research packets if approved |

**Evening stack (every night you touch SCP)**

1. Open week card / checklist  
2. Money/legal first (Affirm until closed)  
3. Approve only Vivian-cleared public items  
4. One logistics residual max (PUB-11 or Apple later)  
5. Close laptop → **audiobook / writing / 501(c)(3)**

---

## Foundation vs cliché guerrilla → KC Myth / Intrigue Doctrine

**You denied guerrilla** as Bookstagram cliché. Correct call for this brand.

**Still ACTIVE (only):** Field Notes SEO — industry-adjacent, fact-grounded, already deployed. Not expanded.

**Proposed replacement lane (DRAFT):** `KC_MYTH_INTRIGUE_DOCTRINE_DRAFT_2026-08-03.md`

**Doctrine in one line:** Build *“hey… did you hear about…?”* curiosity and a Kansas City literary landmark myth — conspiracy fiction on a bed of facts — while the team keeps international retail/authority foundation and unbroken audits ready for ad dollars later. Sales secondary. No indie hustle voice.

**Draft principles:** intrigue over ask · facts under fiction · myth ≠ hustle · foundation first · whisper don’t blast · local→international · always approval-gated.

**Draft tactics (7):** SERP co-occurrence (Famous KC Author / KC Novelist) · Holloway’s spicy dish research · local filming/guest TV scout · literary-scholar landmark framing · whisper fact cards → Field Notes · industry-grade audit cadence · international Ingram shelf readiness.

Reply: **`approve myth doctrine`** · `deny myth doctrine` · `revise myth: …`

---

## Forward motion this week — Top 5

1. **`wrap logistics checklist`** — Affirm status line + PUB-11 screenshots (money + trade truth). Clears the last print/admin drag.  
2. **`resume vivian qa`** — P0 buy + omnibus visual PASS (industry-grade public audit). Unblocks honest Phase 4 site hygiene.  
3. **`approve myth doctrine`** (or revise) — locks creative north star; Field Notes SEO stays sole greenlit lane until you expand.  
4. **Re-sync BI + physical availability panel** — Morgan: flip canvas Ingram→LIVE; add ISBN orderability strip (online + physical presence viz you asked for).  
5. **Groundswell + sales CSV path** — export when ready; pipelines unbroken before any ad spend.

Then: **audiobook.** Everything above is foundation so you leave the desk.

---

## Claims you already closed (do not reopen)

1. Goodreads website + shelves — DONE  
2. Apple ASC — SIDELINED (not fail)  
3. Google Books Partner — DONE (4/4 Live)  
4. SCP GSC — DONE (discovered=3 residual)  
5. GBP — DONE (bonus)  
+ Ingram all titles LIVE · Field Notes SEO DEPLOYED

*Morgan — evening brief 2026-08-03 · straighten the head, not the file tree*
