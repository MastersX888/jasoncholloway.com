# Late-Night Scrum — 2026-08-01

**Desk:** Morgan · **Priority:** Foundation → organic reach · **Audiobook:** deferred  
**Terminal:** `groundswell-monitor/public/data/ops_rollups.json` · **Ops board:** `lib/data/ops-sweep.ts`

---

## Status snapshot

Web foundation largely **live** (press kit 200s, case-reveal, Play buy links, Hawkes “seventeen” on Play + Ingram 3/3). Print path still open: **3 PB Awaiting Approval**, **3 HC Revise Files not submitted**. Discovery claims (Apple author, Books Partner, GBP, SCP GSC, StoryGraph) still open. Social v2 live, audience tiny — next leverage is **claim + entity**, not more posts.

---

## A. Foundation gap audit (ranked)

### P0 — Blockers
| # | Item | Owner | Evidence |
|---|------|-------|----------|
| 1 | Ingram Vol I–III **PB — Approve** pending revisions | JASON | `INGRAM_UPLOAD_RUN_2026-07-31.md` |
| 2 | Ingram Vol I–III **HC — Revise Files** (interior + jacket + case) | JASON | Same; Vivian covers/interiors PASS |
| 3 | Wire **email opt-in** (WEB-04) | JASON | Forms exist; no provider |
| 4 | **Commit** dirty working tree (OPS-01) | JASON | Risk of lost press/SEO/ops work |
| 5 | Vivian **§6 live website re-QC** → Jason Phase 4 | VIVIAN→JASON | `VIVIAN_QC_WEBSITE_2026-07-31.md` |
| 6 | **Google Books Partner** apply/link | JASON | AUTH-06 |
| 7 | **SCP → GSC** verify + sitemap | JASON | AUTH-01 |
| 8 | Confirm Hawkes Play preview shows **seventeen** | AGENT | `HAWKES_SIXTEEN_FIX` open checkbox |

### P1 — Polish
Apple Books author claim · GBP CSV import · OL/`sameAs` schema wire · FB username · Pinterest pins · Author Central Kindle refresh (optional) · HC proof order (PUB-06)

### P2 — Nice-to-have
Ingram keywords · KDP intl keywords · StoryGraph/Goodreads shelves · VIAF/LoC · CWV/PSI · CZ/DE press · YouTube channel

### Distribution matrix (truth)
| Channel | Status |
|---------|--------|
| Amazon KDP | 3 Kindle ASINs live · **no omnibus** |
| Ingram print | PB ×3 awaiting approval · HC ×3 revise pending · omnibus purchase links live |
| Ingram Hawkes meta | **Done** Aug 1 (CSS9242199 / CSS9340081 / CSS9242402) |
| Google Play | 4 ebooks live (trilogy v3 + Hawkes) |
| Bookshop / Merchant | Live · 10/10 SKUs approved |
| Apple / Kobo | Titles via Ingram · **author profiles unclaimed** |
| Open Library | Author OL16482975A · merge #1584949 **resolved** |
| Wikidata | Author + trilogy P856/P973/P213 present · AUTH-02/03 closed |
| Wikipedia / KP | No article · GBP + entity polish still needed |
| Press kit | Live 200s (Jul 31 P0 fixed) |

### Vivian must QC before “foundation complete”
1. Live website §6 visual re-QC (PASS WITH NOTES → sign-off)
2. Any new catalog/metadata after Ingram PB/HC approvals
3. Schema/`sameAs` changes before deploy
4. Outbound press/pitch copy (Claire) before send

---

## B. Organic reach (no paid ads) — leverage ÷ effort

**In motion:** Sites + Field Notes + Chamber · Social v2 (IG/X/FB/Pin/Bluesky) · Wikidata author/trilogy · OL merge · Merchant 10/10 · IndexNow/Brave

**Orthodox claims (do first):** StoryGraph · Apple author · Google Books Partner · Goodreads shelves/About · VIAF email · LoC PCN · GBP · SCP GSC · BookBub verify

**Unorthodox / high leverage:**
- Pitch **Voynich folio visualizer** to manuscript communities (best free backlink asset)
- **KC local** — SubTropolis / Westport / Meramec Field Notes → local press & libraries
- **111 Hz / archaeoacoustics** citation farming from Field Notes
- **Hawkes academic** — Mercy MA → monograph; novel QS refs queued (not executed)
- Entity chain: Wikidata → OL → Books Partner → `sameAs` → Knowledge Panel
- Defer Wikipedia until independent RS; Commons portrait needs VRT if restoring

**Top 5 organic next:** StoryGraph · Apple claim · Books Partner · Goodreads shelves · Folio visualizer pitch

---

## C. Terminal updates (this scrum)

- `ops_rollups.json` — Ingram blockers, Hawkes done, OL waiting cleared, unassigned→0 (evening cleanup), foundation checklist
- `ops-sweep.ts` — AUTH-02/03 done; AUTH-05 reframed; PUB-09/10 Ingram P0; authority brief refreshed

**Money reminder:** Affirm due ~3 days (proton). Not a foundation item — still Jason P1.

---

## Jason vs agent — top 5 next

| # | Action | Who |
|---|--------|-----|
| 1 | Approve 3 Ingram PB revisions | **Jason** |
| 2 | Upload 3 HC Revise Files from `MASTER_UPLOAD_FOLDER` | **Jason** (+ agent assist) |
| 3 | Vivian §6 live site sign-off | **Vivian** → Jason Phase 4 |
| 4 | Claim Apple + StoryGraph + start Books Partner | **Jason** (~45 min batch) |
| 5 | Wire OL/`sameAs`; verify Hawkes Play “seventeen” | **Agent** (+ Vivian on schema) |

*Morgan — late-night scrum closed. Terminal is source of truth.*
