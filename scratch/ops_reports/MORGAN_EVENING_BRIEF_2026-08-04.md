# Morgan Evening Brief — 2026-08-04

**Desk:** Morgan → Jason · **Tone:** honest logistics · **Catalog lock:** Amazon = Kindle Vol I–III only · print/omnibus = Ingram LIVE  
**Companion files:** `email_reports/2026-08-04-evening.md` · `ops_reports/social/2026-08-05.md` (UTC date) · this brief

---

## The honest answer to “why don’t I know what’s going on?”

You are right. **The dashboards are not yet one brain.**

| Surface | What it is | Wired to live email/social/sales? | Fresh? |
|---------|------------|-----------------------------------|--------|
| `/ops` (Next.js OpsClient) | Task board + team grades | **No** — hardcoded `lib/data/ops-sweep.ts` | **Stale** (many “open” items already done Aug 1–3) |
| BI canvas `scp-bi-v1.canvas.tsx` | Presence / claims / QA rollup | Offline JSON packs only | Canvas **stale**; JSON mixed (presence Aug 3 · QA Aug 2) |
| Groundswell Workers app | Site + intel + sales intake | Partial; social/email not fed | Snapshot **behind** (master plan: last good auto ~Jul 23) |
| Markdown briefs (`ops_reports/`, `email_reports/`) | Real team output | Manual / agent-written | **Freshest** — but not one UI |
| Phase 4 `CHECKLIST_YYYY-MM-DD.md` | Target evening gate | **Never shipped as habit** | Gap |

So: agents *are* producing work, but Jason’s “open dashboard → know everything” loop is **not closed**. Tonight’s files are the temporary single pane. Building the unified UI is a real project (not a 10-minute fix).

---

## Where you actually are (one screen)

**Publishing pipe is live.** Free-claim week bar closed. Field Notes SEO cleared. Returns policy now matches IngramSpark (site + Merchant Center). You are past “make books buyable” and into **QC + myth + audiobook + dashboard consolidation**.

| Lane | State tonight |
|------|----------------|
| Ingram PB + HC + omnibus | **LIVE** |
| Free claims week bar | **3/3 CLOSED** · Apple ASC **SIDELINED** · GBP bonus done |
| Field Notes SEO | **PASS WITH NOTES + DEPLOYED** · Vivian ack recorded |
| GMC Store Quality | Shipping policy saved · Returns = **defective only / Verified** · scorecard still **Fair** (lags) |
| Site `/returns/` | **Aligned to IngramSpark** in repo — **deploy still owed** if not pushed |
| Vivian full QA (45) | **~0 full PASS** · ~34 still open · do not invent PASS |
| Presence rollup | ~**27/45 live** (Aug 3 JSON) |
| Audiobook | **77 scripts regenerated** (geo pass Aug 4) · ElevenLabs next · receipts in Gmail |
| Social (Outstand) | 8 Pinterest HC front pins published tonight · X metrics token **expired** · queue empty |
| Guerrilla | Field Notes only · myth doctrine **DRAFT** awaiting `approve myth doctrine` |
| NetGalley / paid trade | **DENIED / HOLD** |

---

## Must deal before bed (≤10 min)

| # | Item | Why |
|---|------|-----|
| 1 | **Cash App Borrow** due (proton) | Money P0 — confirm paid or note due date |
| 2 | **Affirm A6** one-liner | Still open since week card — `due / paid / open` |
| 3 | Optional: Credit Karma CCB/ROSS confirm + Chase “new address” | Personal hygiene only |

**Nothing else is on fire for SCP tonight.** No press/reader replies waiting. No Ingram rejection. No unpaid NetGalley trap.

---

## Done today (team — do not re-open)

- GMC: US shipping service **US Standard POD** ($5.99 · 6–12 days)
- GMC: return policy → **defective only** · Verified · matches Ingram Share & Sell
- Site returns copy rewritten to IngramSpark Terms (repo)
- Pinterest: 8 hardcover/case-laminate **front-panel** pins via Outstand
- Social daily sweep written
- Email evening sweep written
- Audiobook geo script regen already on desk (earlier today)

---

## Loose ends by owner (not all equal)

### Jason only (money / portal / approve)
1. Cash App Borrow + Affirm status  
2. **PUB-11** Ingram screenshots (55% / returnable) — 5 min  
3. `approve myth doctrine` or revise  
4. Deploy returns page (+ any other uncommitted site work) when ready  
5. Apple ASC — later (sidelined)  
6. Reconnect **X in Outstand** when you want analytics again  

### Vivian → Jason (public QC)
- Resume queue: **`resume vivian qa`** — start Q-01→Q-04 buy/omnibus  
- Until PASS: **no site-wide deploy** (A5 still DENY) except scoped items you already approved  

### Morgan / ops (dashboard debt — this is the “I don’t know what’s going on” fix)
1. **Ship Phase 4 evening checklist as habit** (tonight stub below)  
2. Refresh `ops-sweep.ts` statuses to match Aug 3–4 reality (or stop showing fake Top 5)  
3. Re-sync BI canvas constants from JSON  
4. Wire Groundswell weekly + email/social summaries into one rollup  
5. Physical availability panel (ISBN live / PUB-11 unverified)  

### Marketing (held unless you expand guerrilla)
- A8 outbound + new campaigns **DENIED this week**  
- Pinterest HC pins **done** — MKT-01B can close when you verify live board  

### Creative
- Audiobook: PVC test paste → generate units (your creative block)  
- YouTube / encyclopedia publish — deferred capacity  

---

## Dashboard roadmap (so opening one place works)

**Near-term (this week, agent-buildable):**
1. Nightly write `scratch/ops_reports/CHECKLIST_YYYY-MM-DD.md` from email + social + open P0/P1  
2. Fix `/ops` data freshness OR gate it behind “last synced” timestamp so it never lies  
3. One command phrase: `evening sweep` → files + chat brief (what we just did)

**Mid-term:**
4. Groundswell Intake: drop KDP/Ingram CSVs → sales panel  
5. BI canvas auto-regen from `scratch/ops_reports/bi/*.json`  
6. Ops Daily Sweep reads report markdown / JSON instead of hand-edited TS  

Until (1)–(3) exist, **trust this evening brief + CHECKLIST file**, not `/ops` grades.

---

## Exact phrases for tomorrow

- `status` — force radar refresh  
- `resume vivian qa` — weekend visual queue  
- `approve myth doctrine` — greenlight myth lane  
- `open bi dashboard` — BI canvas (know it’s stale)  
- `start mo w2s` — personal finance W-2s  
- `evening sweep` — repeat tonight’s merge  

---

*Morgan — evening brief 2026-08-04 · publishing live · dashboard not yet one pane · money: Cash App + Affirm · sleep is allowed*
