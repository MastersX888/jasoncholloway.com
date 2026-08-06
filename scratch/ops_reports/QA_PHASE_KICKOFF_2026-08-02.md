# QA Phase Kickoff — 2026-08-02 (~22:40 CT)

**Desk:** Morgan · **Phase:** 2 of 3 (Consolidation → **QA** → Visualization)  
**Trigger:** Jason — consolidation plan **accepted**  
**Canonical plan:** `scratch/ops_reports/SCP_BUSINESS_PLAN_REFINED.md`  
**Queue:** `scratch/ops_reports/VIVIAN_QA_QUEUE_2026-08-02.md` (45 items)  
**Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md`

---

## Phase status

| Item | State |
|------|-------|
| Consolidation plan | **ACCEPTED** (Jason) |
| Consolidation execution (Ingram PB/HC, Top-5 claims) | Still open for Jason/parent Browser MCP — runs **in parallel** with QA prep |
| QA phase | **STARTED** (prep + safe auto-checks; Vivian full pass Wed–Thu target) |
| Visualization | Not started |
| Publish / send / deploy | **HOLD** — Vivian PASS + Jason Phase 4 required |

---

## What agents may auto-check (safe — no publish)

- Repo ASIN/ISBN registry vs `MORGAN_OPERATING_MEMORY` / `buyLinks.ts` / `books.ts`
- Scan for Amazon `dp/` beyond Kindle Vol I–III; omnibus × Amazon product links
- Internal route hrefs vs `app/**/page.tsx`; robots disallow `/ops`
- Shopping feed text (“sixteen” / “seventeen”); press PDF extract for 55%/returns (repo)
- Sitemap completeness notes; OG path inventory
- Dead/legacy catalog mirrors (`content/catalog.ts`) landmine cleanup
- Groundswell / presence BI prep notes (no public ship)

**Do not:** push, wrangler deploy, Outstand assign/publish, email send, money/legal, NetGalley pay, assert trade 55%/returns without PUB-11.

---

## What needs Vivian PASS + Jason approve

| Class | Examples |
|-------|----------|
| Live site visual §6 | Mobile/desktop buy CTAs, cover jacket↔case, press kit download UX |
| Identifier-facing copy | Any public metadata, schema `sameAs`, shopping feed live CDN, press PDF live |
| Catalog after Ingram land | Post–PUB-09/10 interiors/covers/metadata re-QC |
| Outbound | Hawkes academic, ABA, Shelf Awareness, reader/press replies |
| Social | Any post/caption/carousel — checklist bios OK to *inspect*, not to auto-edit/post |
| Deploy batch | Schema OL, feeds, press PDFs, site HTML — Phase 4 only |

Verdict codes: PASS · PASS WITH NOTES · BLOCK → checklist or return to owner.

---

## Auto-check results already in (this kickoff)

1. **Kindle ASINs correct** in live buy wiring (`B0H4KYMSM1` / `B0H4KQ4YQJ` / `B0H4L36X21` only).  
2. **No Amazon omnibus** product DP in app/lib/components/SCP sources.  
3. **Internal href scan:** 0 broken local routes among sampled `href="/…"`.  
4. **Shopping feed repo:** seventeen OK; sixteen absent.  
5. **Fixed landmine:** `content/catalog.ts` (unused import) had stale print ASINs + wrong omnibus prices + Hawkes “16 novels” → aligned to catalog lock / `books.ts`.  
6. **Note for Vivian/Nina:** `/chapters-sent/` not listed in `app/sitemap.ts` (may be intentional).

Full itemization: `VIVIAN_QA_QUEUE_2026-08-02.md` § Agent auto-check log.

---

## Parallel consolidation (still Jason)

Does **not** block starting Vivian queue work on repo/live already-shipped surfaces:

1. IngramSpark → approve Vol I–III PB (PUB-09)  
2. IngramSpark → HC Revise Files ×3 (PUB-10)  
3. Top-5 free claims (Books Partner · Apple ASC · GBP · SCP GSC · Goodreads)  
4. PUB-11 terms screenshots before any trade-language reinsert  

After Ingram PB/HC land → add **post-Ingram catalog re-QC** packet under `scratch/ops_reports/editorial/` (queue extension, not a new fork).

---

## T23 Top-5 SAFE QA continuation (~22:50 CT)

1. **Passed (agent_auto_ok):** Q-01–Q-07, Q-10 (repo), Q-11, Q-12, Q-19, Q-20 wiring — Kindle ASINs lock; omnibus Ingram-only; Hawkes seventeen; home/series/books CTAs clean.  
2. **Fixed:** `public/feeds/google-shopping.csv` — 7 prices aligned to Buy Direct (`books.ts` flat tier: Vol I–III $16.99/$29.99; omnibus $32.99/$44.99; Hawkes PB $12.99).  
3. **Fixed:** `content/catalog.ts` Vol II/III edition prices → same flat tier (unused import landmine).  
4. **Still vivian_needed:** live §6 visual on buy/omnibus/home/covers; live CDN feed+press after deploy; Q-08 regen; Q-21 schema; no PASS invented.  
5. **Jason parallel unchanged:** Ingram PB/HC + Top-5 free claims.

---

## T23 post–Top-5 SAFE QA (~22:55 CT)

1. **Passed (agent_auto_ok):** Q-13–Q-18, Q-22, Q-26–Q-35 (route/asset/omnibus/social parity) — still **vivian_needed** for §1/§2/§6 eyes; no PASS invented.  
2. **Fixed:** HTML `/sitemap/` missing chamber tools + `/returns`; chamber hub five→six layers; reading-sequence intro 15/23 contradiction; harmonic-derivations “Twenty-Three Text” link label.  
3. **Vivian flag:** reading-sequence page lists **15** texts; novels + research-archive + Strahov FN claim **23** — editorial decision required.  
4. **Verified OK (no code change):** FN ×12 pages+OG; chapters-sent downloads; contact press PDF; `_redirects`/`_headers`; SocialLinks ≡ `socialProfiles.ts` ≡ `authorAuthority` social URLs; zero Amazon omnibus DP.  
5. **Still pending agent/Vivian:** Q-09 live CDN; Q-21 schema/sameAs; Q-23–Q-25 SCP; Q-37–Q-44 social checklist (inspect only).

---

## Next 3 agent tasks

1. Vivian runs P0 visual §6 on Q-01–Q-04 + Q-12 (eyes) — emit PASS/BLOCK; no deploy.  
2. Vivian: Q-30 15-vs-23 reading-list decision + Field Notes / Chamber §1 framing batch.  
3. Hold Visualization (Groundswell) until mid/late week; live CDN feed/press only after Phase 4 deploy.

---

## Routing reminder

- Browser MCP logged-in claims = **parent chat only**  
- Catalog: Amazon Kindle Vol I–III · print/omnibus Ingram  
- Never auto money / legal / press / social send  

*Morgan — QA phase STARTED 2026-08-02 ~22:40 CT*
