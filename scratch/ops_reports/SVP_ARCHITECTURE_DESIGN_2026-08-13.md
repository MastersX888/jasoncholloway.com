# SVP Oversight, Consultant & Growth Architecture
## Seventh City Press LLC · Design only · not live until Jason approves

**Architecture Agent session:** 2026-08-13  
**Source:** Morgan briefing `CLAUDE_MEGAPROMPT_BRIEFING_SVP_OVERSIGHT_2026-08-13.md` + Jason megaprompt  
**Status:** **APPROVED** by Jason 2026-08-13 ~21:00 CT (blanket `I approve` = ARCH-1–4, ARCH-6 packet G1, ARCH-7 hire order, ARCH-8 canonical truth).  
**ARCH-5 CPA trigger (default until Jason names a dollar):** first SCP tax season with any ingested royalty income.  
**Kraken addendum:** Personal approved Kraken account (Jason Holloway). Gameplan = official Cursor **Kraken** plugin / `kraken-cli` MCP at `market,account,paper` only. Live `trade` stays off. See `scratch/ops_reports/treasury/KRAKEN_MCP_SETUP_2026-08-13.md`.

---

## 0. Decision: hybrid committee (option B)

**Keep the AI committee. Harden it. Add named human seats that stay empty until triggers fire.**

| Option | Verdict |
|--------|---------|
| A — AI-only, harden | Insufficient for tax, IP, licensed advice, and growth spend. Keep as the *daily* layer. |
| **B — Hybrid AI + human retainers** | **Chosen.** AI runs cadence; humans take licensed/liability seats. |
| C — Replace committee with consultants | Rejected. Jason’s evening-only model needs agents; consultants cannot assemble a daily card. |

**Growth ambition does not move the never-auto law.** Profitability, reinvestment, and treasury are **Tier-1 recommendations**. Trade execution, fund movement, ad spend, vendor contracts, and account opening remain **Tier-3 Jason-only**.

Seventh City Press LLC does **not** hold a broker-dealer, investment-adviser, or money-transmitter license. No artifact may imply that an agent or persona does.

---

## 1. Org chart

### 1.1 Authority

```
JASON — CEO / Publisher / Author
        │  Tier-3: pay, sign, publish, hire, trade, open accounts
        ▼
MORGAN — Chair (AI) · one evening card · one weekly roll-up
        │
        ├── VIVIAN — QC gate (AI) · PASS before any public asset
        │
        ├── STANDING OPERATORS (skills that write files)
        │     Email · Social · Groundswell · KC Events
        │     + Growth Ledger (weekly) · Profitability (monthly) · Treasury Advisory (monthly)
        │
        ├── DOMAIN PERSONAS (AI; called when their track is live)
        │     Standing: ALEX · REED · SAMUEL · DIANA · NINA · HAL · CLAIRE
        │     Call-in: ELEANOR · RIVER · VICTOR · JORDAN · MARCUS · QUINN
        │
        └── HUMAN SEATS (empty until trigger)
              CPA / bookkeeper · IP/business attorney
              Licensed financial/tax advisor · Publicist (hours)
              Tech contractor (hours, not retainer)
```

### 1.2 Roster (full)

| Seat | Kind | Reports to | Mandate | Daily noise? |
|------|------|------------|---------|--------------|
| **Jason** | Human | — | Authority. One evening file. | — |
| **Morgan** | AI chair | Jason | Route, assemble checklist + weekly, gap-detect. Never publish. | Yes (assembly only) |
| **Vivian** | AI gate | Morgan | PASS / NOTES / BLOCK on publish/send/public. | Per asset |
| **Eleanor** | AI call-in | Morgan | Manuscript/craft. Not Phase 4. | No |
| **Alex** | AI | Morgan | Royalties, expenses, ledger owner, money radar. Never pays. | Weekly + flags |
| **Reed** *(new)* | AI monthly | Alex → Morgan | Catalog P&L / unit economics. Never re-prices or re-lists. | Monthly |
| **Quinn** *(new)* | AI monthly | Morgan | Treasury *research* only. Never trades, never holds keys. | Monthly |
| **Samuel** | AI | Morgan | Contracts/IP/1583 flags. Never signs. Escalates to attorney on trigger. | Flags |
| **Diana** | AI | Morgan | Campaign intent, freeze/unfreeze *recommendations*. | Weekly |
| **River** | AI call-in | Morgan | Visual assets upstream of Vivian. | Per asset |
| **Claire** | AI | Morgan | Press/outreach *drafts*. SCP only — no PSLF/DHSS bleed. | Per draft |
| **Nina** | AI | Morgan | SEO/GSC/dashboard SLA. | Weekly |
| **Hal** *(new)* | AI event | Morgan | Site/Worker/deploy reliability, wrangler lock, tooling roadmap. | On incident |
| **Victor** | AI call-in | Morgan | Audiobook/ACX/ElevenLabs. | Pipeline line |
| **Jordan** | AI bench | Morgan | YouTube — dormant until week card unfreezes video. | No |
| **Marcus** | AI bench | Morgan | Queries/submissions — dormant until Jason opens that lane. | No |
| **Email agent** | Skill | Morgan | Daily sweep. | Daily file |
| **Social agent** | Skill | Morgan | Daily metrics. No auto-post. | Daily file |
| **Groundswell agent** | Skill | Morgan | Weekly Terminal + snapshot SLA. | Weekly |
| **KC Events agent** | Skill | Morgan | Tier 1–3 brief. No auto-follow. | Weekly |
| **CPA / bookkeeper** | Human empty | Jason (Alex prepares) | Books, 1065/1040-sch-C as applicable, royalty recon. | — |
| **IP / business attorney** | Human empty | Jason (Samuel prepares) | Trademark, third-party contracts, disputes, securities/trading compliance. | — |
| **Licensed advisor** | Human empty | Jason (Quinn prepares) | Surplus allocation beyond “options to consider.” | — |
| **Publicist (hours)** | Human empty | Jason (Claire/Diana prepare) | Paid outreach after growth gate. | — |
| **Tech contractor (hours)** | Human empty | Jason (Hal prepares) | If Worker/Pages reliability fails after wrangler lock. | — |

**Span cut (explicit):** Jordan and Marcus leave the *standing* weekly table. They remain named so they can be called in. Eleanor, River, Victor stay call-in. Quinn never appears on the daily checklist except a one-line “Treasury memo ready” on memo week.

### 1.3 Three offices (hard walls)

| Office | In SVP weekly / evening card? | Default read by new seats? |
|--------|-------------------------------|----------------------------|
| **SCP** (this architecture) | Yes | Yes |
| **Career** (PSLF / 501(c)(3)) | One optional line only if Jason asked that week | **No** |
| **Privacy Desk** (personal OSINT vault) | Never | **No** |
| **DHSS day job** | Never | **No** |

Bridge = Jason sentence in chat or `approve bridge [office] → [seat]`. No other path.

---

## 2. RACI

R = Responsible (does the work) · A = Accountable (Jason unless noted) · C = Consulted · I = Informed

| Action | R | A | C | I |
|--------|---|---|---|---|
| Assemble evening checklist | Morgan | Jason | Vivian, agents | — |
| Publish social / site copy / press | Domain owner → Vivian | **Jason** | Diana/Claire/Nina/River | Morgan |
| Send reader/press reply | Claire draft → Vivian | **Jason** | Morgan | — |
| Portal upload (Ingram/KDP post-live) | — | **Jason** | Vivian, Morgan | Alex |
| Pay invoice / royalty dispute settle | — | **Jason** | Alex | Samuel |
| Sign contract / notarize / LLC filing | — | **Jason** | Samuel → attorney on trigger | Morgan |
| Marketing spend / NetGalley / ads | Diana *recommends* | **Jason** | Alex, Reed, Vivian (copy) | Morgan |
| Growth allocation (ledger split) | Alex *recommends* | **Jason** | Reed, Diana | Quinn (I, monthly) |
| Unfreeze guerrilla / paid trade | Diana + Reed *recommend* | **Jason** | Claire | Morgan |
| Hire CPA / attorney / advisor / publicist / tech | Morgan packs trigger evidence | **Jason** | relevant persona | — |
| Catalog P&L memo | Reed | Jason (read) | Alex | Diana, Nina |
| Treasury research memo | Quinn | Jason (read) | Samuel (compliance flag) | Alex |
| Open brokerage / exchange / bank | — | **Jason** | Licensed advisor + attorney | Quinn **must not** |
| Execute trade / move funds / live bot | **Forbidden for all AI** | **Jason or licensed party** | Attorney + advisor | — |
| Deploy public site | Hal/Nina prep | **Jason** after Vivian | — | Morgan |
| Follow social (KC Events) | — | **Jason** | KC agent (propose only) | Morgan |

**Accountable is always Jason for money, legal, publish, hire, trade.** Morgan is accountable only for *whether the card was assembled*.

---

## 3. Escalation tiers (final)

| Tier | Meaning | Who acts | New report types |
|------|---------|----------|------------------|
| **0 auto** | Safe archive, metrics log, morning brief, ledger *numbers from already-ingested CSVs* | Agents | — |
| **1 report** | Money, legal, publishing blockers, stale dashboard (>7d), token expiry, **P&L / growth-ledger allocation, growth-gate unfreeze rec, treasury research, hire-trigger fired** | Evening checklist (and weekly overlay) | Reed monthly · Growth ledger weekly line · Quinn monthly · Hal incident |
| **2 Vivian → Jason** | Press, social publish, public copy, public deploys | Vivian PASS then Jason | Unchanged |
| **3 Jason only** | Pay, sign, reply, publish, ad spend, portal uploads, **hire, trade execution, fund transfers, opening any brokerage/exchange/bank account** | Jason personally | Unchanged |

Treasury, growth, and profitability **never skip to execution**. They are labeled **RECOMMENDATION** in the card.

---

## 4. Cadence calendar

### Daily (target ~8:00–8:15 CT agents; evening card ~18:00 CT)

| When | Who | Output |
|------|-----|--------|
| ~8:00 CT | Email agent | `scratch/email_reports/YYYY-MM-DD.md` |
| ~8:15 CT | Social agent | `scratch/ops_reports/social/YYYY-MM-DD.md` |
| Session open or ~18:00 | Morgan | `CHECKLIST_YYYY-MM-DD.md` + optional `MORGAN_EVENING_BRIEF_YYYY-MM-DD.md` |

Checklist sections (extended, still **one file**):

1. Money / legal (Jason only)  
2. Approve to send (Vivian PASS)  
3. Approve to publish (Vivian PASS)  
4. Done today  
5. Waiting on vendors  
6. Dashboard truth  
7. **Growth / P&L (if any this day)** — max 3 bullets, labeled RECOMMENDATION  
8. Tomorrow if energy (max 3)

Quinn/Reed do **not** dump monthly memos into the daily card. Morgan puts: `Treasury memo ready → scratch/ops_reports/treasury/YYYY-MM.md` (one line) on memo day only.

### Weekly (Monday)

| Who | Output |
|-----|--------|
| Groundswell agent | `scratch/ops_reports/groundswell/weekly/YYYY-Www.md` |
| KC Events | `scratch/ops_reports/kc-events/YYYY-Www.md` |
| Alex + Growth Ledger skill | `scratch/ops_reports/GROWTH_LEDGER_YYYY-Www.md` |
| Morgan | `SVP_WEEKLY_YYYY-Www.md` (includes one Growth Ledger line + hire-trigger watch) |
| Friday or week-open | `WEEK_APPROVAL_CARD_YYYY-MM-DD.md` when strategic decisions exist |

### Monthly (first Monday)

| Who | Output |
|-----|--------|
| Reed | `scratch/ops_reports/profitability/YYYY-MM.md` |
| Quinn | `scratch/ops_reports/treasury/YYYY-MM.md` |

### Fallback if PC / Proton Bridge / Cursor Automations are down

| Failure | Fallback |
|---------|----------|
| Proton Bridge off | Email sweep runs gmail + scp-jason only; checklist flags `proton-dark` — KDP/Amazon threads unread |
| Cursor Automations not firing | Morgan runs sweeps on first session open that day; card still authoritative |
| Terminal / KV stale or 404 | Checklist Dashboard truth = 🔴; **do not wait for UI**; use last email/social files + ledger |
| Jason traveling, no evening session | Agents still write files; next session opens **one** card covering missed days (Morgan dedupes) |

Jason still never needs a second daily surface. Missed days collapse into the next checklist.

---

## 5. Artifact list

| Artifact | Path | Owner | Cadence |
|----------|------|-------|---------|
| Evening checklist | `scratch/ops_reports/CHECKLIST_YYYY-MM-DD.md` | Morgan | Daily |
| Evening brief | `scratch/ops_reports/MORGAN_EVENING_BRIEF_YYYY-MM-DD.md` | Morgan | Daily as needed |
| Week approval card | `scratch/ops_reports/WEEK_APPROVAL_CARD_YYYY-MM-DD.md` | Morgan | Weekly / as needed |
| SVP weekly | `scratch/ops_reports/SVP_WEEKLY_YYYY-Www.md` | Morgan | Mon |
| Email daily | `scratch/email_reports/YYYY-MM-DD.md` | Email agent | Daily |
| Social daily | `scratch/ops_reports/social/YYYY-MM-DD.md` | Social agent | Daily |
| Groundswell weekly | `scratch/ops_reports/groundswell/weekly/YYYY-Www.md` | Groundswell | Mon |
| KC Events weekly | `scratch/ops_reports/kc-events/YYYY-Www.md` | KC Events | Mon/Tue |
| Vivian QC | `scratch/ops_reports/editorial/VIVIAN_QC_*.md` | Vivian | Per asset |
| **Growth Ledger** | `scratch/ops_reports/GROWTH_LEDGER_YYYY-Www.md` | Alex | Weekly |
| **Profitability review** | `scratch/ops_reports/profitability/YYYY-MM.md` | Reed | Monthly |
| **Treasury Advisory Memo** | `scratch/ops_reports/treasury/YYYY-MM.md` | Quinn | Monthly |
| Hal incident | `scratch/ops_reports/tech/INCIDENT_YYYY-MM-DD.md` | Hal | On failure |
| Charter | `scratch/ops_reports/SVP_OVERSIGHT_COMMITTEE_2026-08-09.md` | Morgan | Amend after Jason approve |
| This design | `scratch/ops_reports/SVP_ARCHITECTURE_DESIGN_2026-08-13.md` | Architecture Agent | Until superseded |

**Canonical truth (lock after ARCH-8):**

| Domain | Canonical file |
|--------|----------------|
| Bibliographic / ISBN | `CANON.md` |
| Committee operating law | Charter + `.cursor/rules/svp-oversight-committee.mdc` |
| Business north star | `scratch/ops_reports/SCP_BUSINESS_PLAN_REFINED.md` |
| Jason’s evening interface | `CHECKLIST_YYYY-MM-DD.md` |
| Archive (do not treat as current) | `FOUNDATION_STATUS.md`, `PLATFORM_INVENTORY.md`, Jul-era master plan gaps |

---

## 6. The five growth threads (how they actually run)

### 6.1 Reed — profitability of the product

**Job:** Is the *Masters X* catalog + Hawkes monograph profitable, and what would make it more so?

Distinct from Diana (campaigns). Reed does unit economics:

- Revenue by title × format (Kindle $6.99; Ingram PB/HC/EPUB; omnibus Ingram-only; Play; Bookshop affiliate; future audio).
- COGS: Ingram print, future ACX/Findaway, ads **if** Jason later spends.
- Channel mix vs catalog lock (never recommend Amazon omnibus).
- Recommendation memo only. **Never** autonomous re-pricing or re-listing.

Feed: Alex + monthly file + one weekly roll-up line. Evening card only if a **decision** is requested that week.

Honest starting point: sales intake is manual CSV; do not fabricate units. If intake is empty, Reed writes “insufficient data” and lists which export Jason should drop on Intake.

### 6.2 Reinvestment engine — Growth Ledger

Weekly file owned by Alex. Tracks royalties/affiliate **from ingested sources only**. Proposes an allocation **recommendation**:

| Mode | When | Suggested split (Jason may change) |
|------|------|-------------------------------------|
| **Pre-gate (current)** | Organic gates not met | **90% hold / 10% production (audiobook PVC) / 0% paid marketing** |
| **Post-gate** | Jason `approve G1` after gates | **50% hold / 30% production / 20% growth experiments** |

Actual spend = Tier-3. Ledger never moves money.

**Growth gate G1 (starting proposal — not locked until Jason `approve G1-definition`):**

Any **one** of: ~8 public reviews · ≥40 units trailing-60d · ≥$500 trailing-60d revenue.

When hit: Diana + Reed produce a **specific** unfreeze rec (e.g. “resume NetGalley at $X” or “do not — still hold”) with budget drawn from the ledger’s 20% growth bucket. No agent contracts a vendor.

### 6.3 Agent-to-agent “self-funding” loop (attribution, not commerce)

Nina (SEO) + Groundswell + Social + Reed attribute *what moved traffic/sales*. Alex posts that into the ledger. Diana may recommend spend **from attributed surplus**.

**Forbidden reading:** agents paying each other, agents buying ads, agents signing SaaS, agents running affiliate schemes in Jason’s name.

### 6.4 Quinn — Treasury Advisory (bounded)

**In scope:** paper research, strategy comparison, risk questionnaire for Jason, tax-treatment notes, monthly memo with options, **Kraken MCP read-only** (`market`, `account`, `paper`) after Jason installs the official Cursor plugin.

**Permanently out of scope:** opening accounts, API keys with *trade/withdraw* permission, executing live trades, moving funds, live bots, MCP services `trade` / `funding` / `earn` / `all`.

**Custodian of record (2026-08-13):** Jason Holloway — approved **personal** Kraken account. Not booked as SCP revenue until Jason + CPA confirm LLC. Setup: `scratch/ops_reports/treasury/KRAKEN_MCP_SETUP_2026-08-13.md`.

Default monthly recommendation until surplus exists **and** books are clean: **hold cash in the LLC operating account; do not enable live Kraken trading MCP.**

### 6.5 Consultant bench — Human vs AI (forced)

| Domain | Now | Upgrade trigger | First human shape |
|--------|-----|-----------------|-------------------|
| **Tech / innovation** | **HAL (AI)** + existing Cloudflare skills | Second production incident in 90 days (binding wipe, failed deploy, Access lockout) **or** Jason `approve hire tech` | Hours contractor (Workers/Pages), not a CTO retainer |
| **Outreach** | **Claire + Diana (AI)**; KC Events skill | G1 met **and** Jason unfreezes guerrilla **or** a speaking/press opportunity that needs a human relationship | Publicist **hours**, KC-literate, not a national retainer |
| **Accounting** | **Alex (AI)** drafts/flags | **First SCP tax season with any royalty income** OR trailing-12m ingested royalties exceed a number Jason sets | Bookkeeper monthly → CPA at filing |
| **Investment** | **Quinn (AI)** options-only | Ledger shows surplus **after** 3 months of hold-heavy split **and** Jason wants diversification | Licensed advisor / CPA tax counsel — **not** an AI “trader” |
| **Legal** | **Samuel (AI)** flags | Trademark filing, any third-party contract, any dispute, **anything touching securities/trading**, PhysicalAddress/government stuck | MO business/IP attorney (hours) |

**Do not invent the CPA dollar trigger.** Week-card item **ARCH-5** asks Jason to pick. Suggested *band to choose from*, not a fake threshold: $0 (CPA this tax year regardless) · $5,000 TTM · $10,000 TTM.

---

## 7. Consultant hire list (growth-first order)

Given “focus on growth” **and** frozen paid marketing **and** a reinvestment engine that needs numbers:

| Order | Seat | Why this order | Do not hire yet if |
|-------|------|----------------|--------------------|
| **1** | **Bookkeeper / CPA** | Cannot reinvest or unfreeze spend without books. Growth without a ledger is improvisation. | Zero royalties and Jason defers tax-year help (still: calendar a reminder). |
| **2** | **Tech hours** | Terminal/sites dying is a silent growth killer. Prefer wrangler lock first; hire only on repeat incident. | Hal + lock hold for 90 days with no incident. |
| **3** | **Publicist hours** | Growth-facing human. Only after G1 or an inbound press need. | Still pre-gate and A8 hold. |
| **4** | **IP / business attorney** | Trigger-based, not calendar-based — unless trademark/contract is already queued. | No filing, no 3p contract, no trading. |
| **5** | **Licensed financial advisor** | Last. Surplus + explicit Jason want. Trading research does not create this seat early. | Ledger still pre-surplus; Quinn memos say hold. |

**Outreach vs PSLF:** Publicist is SCP catalog/press only. Career network stays in the Career office.

---

## 8. 30 / 60 / 90 (implementation — still no live spend)

### Days 1–30 (after Jason approves this design)

- Apply Cursor rule diffs (ARCH-1). Install three skills (ARCH-2) — they only *write markdown*.
- Wrangler lock already in repo; Hal documents “do not deploy from incomplete `wrangler.jsonc`.”
- First Growth Ledger: honest zeros/partials from Intake + known Play tally; no invented sales.
- First Reed memo: “data gaps” + which KDP/Ingram reports to upload.
- First Quinn memo: **do not open trading accounts**; questionnaire attached; compliance wall restated.
- Jason fills ARCH-5 (CPA trigger) and ARCH-6 (G1 definition).
- Schedule Automations for email/social if not running (manual setup §10).

### Days 31–60

- Weekly ledger consecutive. SVP weekly always includes Growth + dashboard SLA.
- Jordan/Marcus stay bench. Myth doctrine still needs `approve myth doctrine` before guerrilla expand.
- Shortlist (names later, no outreach until Jason): one KC-area bookkeeper/CPA; one MO business attorney “on call.”
- If Proton Bridge remains SPOF: written one-page for Jason (install on login).

### Days 61–90

- First G1 check against real intake. If unmet: stay Pre-gate split. If met: Diana unfreeze rec on week card — Jason still decides.
- CPA trigger check. If fired: checklist item **Hire pack** (what to bring to first meeting) — Jason books the human.
- No live trading. Quinn’s third memo still advisory. If Jason wants a broker, attorney + advisor first.

---

## 9. Acceptance tests (design-time)

| Test | How we know it passed |
|------|------------------------|
| One daily file | New seats only add a *section or one-liner* to `CHECKLIST_YYYY-MM-DD.md` |
| Never-auto holds for Reed/Quinn/Hal/ledger | RACI: none of them in A for pay/sign/publish/trade |
| Stale dashboard | Fallback table; checklist Dashboard truth required |
| Recommendations labeled | Templates use `**RECOMMENDATION — not a decision**` |
| No fake licenses | Quinn header: LLC is not an IA/BD; agent is not a trader |
| Manual setup explicit | §10 numbered; skills do not assume Automations exist |

---

## 10. Manual setup — numbered instructions for Jason

Do these only after `approve ARCH-1` and `approve ARCH-2`. Agents must not pretend they are done.

1. **Cursor Automations (optional but needed for true evening-only):** Weekdays 8:00 CT email-daily-sweep; 8:15 CT social-daily-sweep; 18:00 CT “Morgan assemble checklist.” If Automations are off, first chat of the day is the sweep.
2. **Proton Bridge:** Start on login so `proton-personal` (KDP/Amazon) is in the sweep. If off, expect `proton-dark` on the card.
3. **Sales intake:** When a KDP, Ingram, or Play report arrives, drop CSV/XLSX on Terminal **Intake** (or give the file in chat). Ledger/Reed will not guess.
4. **GitHub secrets (already used for Worker):** Do not paste tokens into chat. If `CF_API_TOKEN` / `INGEST_TOKEN` / `OUTSTAND_API_KEY` need rotation, Jason sets them in Cloudflare/GitHub UI.
5. **Calendar:** Optional: import KC Events ICS into `SCP — KC Events`. Optional: a monthly reminder “Treasury memo — read only.”
6. **CPA trigger number:** Reply `ARCH-5 $0` or `ARCH-5 $5000` or `ARCH-5 $10000` (TTM royalties).
7. **G1 lock:** Reply `approve G1-definition` to keep 8 reviews / 40 units / $500 T60 — or send three replacement numbers.
8. **Do not** create brokerage, exchange, or trading-bot accounts as part of this architecture.
9. **Do not** give any agent API keys with trade or withdraw permission.
10. **Hiring:** First human contact is Jason’s email/call. Morgan may draft a one-page “what we need from a bookkeeper.” Morgan may not retain anyone.

---

## 11. Cursor rule / skill diffs (PROPOSED — not applied)

Live files stay unchanged until ARCH-1 / ARCH-2.

**Proposed skills (stubs in repo, install to `~/.cursor/skills/` only after approve):**

- `scratch/ops_reports/proposed_skills/growth-ledger-weekly/SKILL.md`
- `scratch/ops_reports/proposed_skills/profitability-review-monthly/SKILL.md`
- `scratch/ops_reports/proposed_skills/treasury-advisory-monthly/SKILL.md`

**Proposed additions to `.cursor/rules/svp-oversight-committee.mdc`:** standing agents rows for the three skills; Tier-1 includes growth/treasury/hire-trigger; Tier-3 includes trade execution and opening brokerage accounts; roster note: Reed, Quinn, Hal; Jordan/Marcus bench; compartments.

**Proposed additions to `.cursor/rules/scp-business-ops.mdc`:** growth ledger + profitability + treasury as report-only; never-auto includes trades/fund transfers/account opening; canonical plan pointer stays `SCP_BUSINESS_PLAN_REFINED.md`.

Exact patch text: `scratch/ops_reports/proposed_skills/RULE_DIFFS_2026-08-13.md`

---

## 12. Jason approval card (architecture)

| ID | Decision | Recommend |
|----|----------|-----------|
| **ARCH-1** | Adopt hybrid org (option B) + never-auto including no autonomous trading | **APPROVE** |
| **ARCH-2** | Install three report-only skills (ledger, P&L, treasury) | **APPROVE** |
| **ARCH-3** | Pre-gate split 90/10/0 and post-gate 50/30/20 as *recommendations* | **APPROVE as starting policy** |
| **ARCH-4** | Jordan + Marcus to bench; Hal/Reed/Quinn added | **APPROVE** |
| **ARCH-5** | CPA trigger dollar/band | **Jason fills** |
| **ARCH-6** | Lock G1 definition | **APPROVE packet proposal or replace** |
| **ARCH-7** | Hire order: CPA → tech hours → publicist → attorney → advisor | **APPROVE** |
| **ARCH-8** | Canonical-truth table in §5 | **APPROVE** |

---

*Architecture Agent · 2026-08-13 · design only*  
*Does not authorize spend, trades, hires, or publishes.*
