# SVP Oversight Committee — Operating Charter
## Seventh City Press LLC | Jason Carroll Holloway
**Effective:** 2026-08-09  
**Owner:** Morgan (Chief Business Manager)  
**North star:** Jason opens **one evening card**; agents + committee catch every gap.

---

## 1. Mission

Jason cannot hold all SCP operations in his head. The **SVP Oversight Committee** is the formal layer that ensures nothing falls through the cracks while Jason's daily involvement stays **evening-only**.

| Principle | Rule |
|-----------|------|
| **Jason's job** | Review Phase 4 approval card → approve / deny / edit → done |
| **Committee's job** | Run standing agents, route work to domain owners, enforce Vivian QC, roll up weekly health |
| **Agents' job** | Execute sweeps on schedule, auto-handle safe items, write reports to fixed paths |
| **Never auto** | Money, legal, press/reader replies, social publish, vendor commitments |

**Catalog lock (all committee members):**
- **Amazon:** Kindle Vol I–III only — ASINs `B0H4KYMSM1`, `B0H4KQ4YQJ`, `B0H4L36X21`. No omnibus on Amazon.
- **Print / omnibus:** IngramSpark only.
- **Email registry:** `scripts/email-accounts.registry.json`

**Related docs:** `scratch/SCP_AUTOMATION_MASTER_PLAN.md` · `scratch/MORGAN_OPERATING_MEMORY.md` · `scratch/EDITORIAL_QC_PROTOCOL.md`

---

## 2. Committee Roster

Morgan chairs the committee and **routes** — domain owners **own**, Vivian **clears**, Jason **approves**.

### Chair & Orchestration

| Persona | Oversight role | Mandate |
|---------|----------------|---------|
| **MORGAN** | **Chair · Chief Business Manager** | Morning brief, evening card assembly, cross-track routing, gap detection, escalation to Jason. Owns committee calendar and report paths. Never publishes without Vivian + Jason. |

### Quality & Editorial Gates

| Persona | Oversight role | Mandate |
|---------|----------------|---------|
| **VIVIAN** | **QC Gate · Pre-Publication Control** | Final pass on every publish/send/public-facing asset. Issues PASS / PASS WITH NOTES / BLOCK. Nothing reaches Phase 4 without Vivian clearance. Protocol: `scratch/EDITORIAL_QC_PROTOCOL.md`. Reports: `scratch/ops_reports/editorial/`. |
| **ELEANOR** | **Literary Desk · Upstream Development** | Manuscript craft, genre positioning, comp titles, editorial direction on WIP. **Not** pre-publish QC — does not block Phase 4. Engages on audiobook scripts, screenplay, Field Notes drafts before Vivian. |

### Domain Oversight Leads

| Persona | Oversight role | Mandate | Weekly roll-up line |
|---------|----------------|---------|---------------------|
| **ALEX** | **Finance & Compliance** | Royalties, expenses, LLC taxes, overdue payments, vendor invoices. Flags money items for Jason — never pays or commits. | "Money radar: N open · N overdue" |
| **SAMUEL** | **Legal & IP** | Contracts, notarization, USPS/mail, trademark, LLC filings, PhysicalAddress 1583. All items → Jason. | "Legal: N open cases" |
| **DIANA** | **Marketing & Campaigns** | Social strategy, ad copy, campaign timing, Outstand queue intent. Coordinates with River/Vivian on publish calendar. | "Campaigns: N held · N queued for Vivian" |
| **RIVER** | **Brand & Visual Assets** | Covers, business cards, social overlays, video thumbnails. Visual QC upstream of Vivian. | "Design: N assets in QC pipeline" |
| **CLAIRE** | **Press & Public Relations** | Press releases, media outreach, speaking, reader-facing comms drafts. All outbound → Vivian → Jason. | "Press: N drafts awaiting approval" |
| **NINA** | **Digital & SEO** | GSC, sitemap, structured data, metadata, site performance, Groundswell SEO tab health. | "SEO/GSC: freshness · indexing · N fixes pending" |
| **VICTOR** | **Audio Production** | Audiobook pipeline, ACX specs, ElevenLabs workflow. Long-horizon; reports in pipeline board. | "Audiobook: [status] · next step" |
| **JORDAN** | **Video & Content** | YouTube, scripting, channel growth. Queued work; no publish without Vivian. | "Video: [status]" |
| **MARCUS** | **Literary Agency** | Query strategy, submissions, contract navigation. Jason-facing on deals only. | "Submissions: N active" |

### Standing Agent Operators (automated / scheduled)

These are not personas but **scheduled operators** Morgan supervises:

| Operator | Skill | Report path |
|----------|-------|-------------|
| Email Agent | `~/.cursor/skills/email-daily-sweep/SKILL.md` | `scratch/email_reports/YYYY-MM-DD.md` |
| Social Agent | `~/.cursor/skills/social-daily-sweep/SKILL.md` | `scratch/ops_reports/social/YYYY-MM-DD.md` |
| Groundswell Agent | `~/.cursor/skills/groundswell-weekly-agent/SKILL.md` | `scratch/ops_reports/groundswell/weekly/YYYY-Www.md` |
| KC Events Agent | `~/.cursor/skills/kc-events-weekly/SKILL.md` | `scratch/ops_reports/kc-events/YYYY-Www.md` |

---

## 3. Standing Agents & Cadence

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DAILY (automated target ~8:00 CT)               │
├──────────────────────────────┬──────────────────────────────────────────┤
│ Email sweep                  │ gmail-personal · scp-jason · proton-*    │
│ Social sweep                 │ Outstand hub → all platforms             │
│ Morgan morning brief         │ On session open OR scheduled             │
└──────────────────────────────┴──────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         WEEKLY                                          │
├──────────────────────────────┬──────────────────────────────────────────┤
│ Mon AM    Groundswell agent  │ Submodule sync · pipeline · snapshot     │
│ Mon AM    Committee roll-up  │ SVP_WEEKLY_YYYY-Www.md                   │
│ Mon/Tue   KC Events agent    │ Tier 1–3 brief + ICS export              │
│ Fri PM    Week approval card │ WEEK_APPROVAL_CARD_YYYY-MM-DD.md         │
└──────────────────────────────┴──────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         EVENING (Jason)                                 │
│ CHECKLIST_YYYY-MM-DD.md  ←  Morgan assembles from daily + Vivian queue  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Schedule table

| What | When | Who runs | Output |
|------|------|----------|--------|
| Email sweep | Daily ~8:00 CT | Email Agent | `scratch/email_reports/YYYY-MM-DD.md` |
| Social sweep | Daily ~8:15 CT | Social Agent | `scratch/ops_reports/social/YYYY-MM-DD.md` |
| Morning brief | Daily (session or script) | Morgan | `scratch/ops_reports/MORNING_BRIEF_YYYY-MM-DD.md` |
| Groundswell maintenance | Weekly Mon | Groundswell Agent | `scratch/ops_reports/groundswell/weekly/YYYY-Www.md` |
| KC Events brief | Weekly Mon/Tue | KC Events Agent | `scratch/ops_reports/kc-events/YYYY-Www.md` |
| SVP weekly roll-up | Weekly Mon | Morgan | `scratch/ops_reports/SVP_WEEKLY_YYYY-Www.md` |
| Vivian QC log | As assets complete | Vivian | `scratch/ops_reports/editorial/VIVIAN_QC_*.md` |
| Evening checklist | Daily ~evening | Morgan | `scratch/ops_reports/CHECKLIST_YYYY-MM-DD.md` |
| Week approval card | Weekly (kickoff/decisions) | Morgan | `scratch/ops_reports/WEEK_APPROVAL_CARD_YYYY-MM-DD.md` |

### Runtime requirements

- **Proton Bridge** must run on Jason's PC for KDP/Amazon email threads (`proton-personal`).
- **Outstand API:** `OUTSTAND_API_KEY` in `.env`.
- **Groundswell:** GitHub Actions secrets for daily fetch; submodule must stay synced.

---

## 4. Oversight Checklist — Weekly Roll-Up Template

Morgan writes this every **Monday** (or first business day of the week):

**Path:** `scratch/ops_reports/SVP_WEEKLY_YYYY-Www.md`

```markdown
# SVP Weekly Oversight — YYYY-Www

**Committee chair:** Morgan  
**Week of:** YYYY-MM-DD  
**Jason evening load estimate:** [Low / Medium / High]

---

## 1. Money / Legal (ALEX + SAMUEL → Jason always)

| ID | Item | Owner | Status | Jason action |
|----|------|-------|--------|--------------|
| M1 | [payment / overdue / tax] | ALEX | OPEN / PAID / WAITING | Y/N |
| L1 | [contract / notarization / mail] | SAMUEL | OPEN / WAITING | Y/N |

**Rule:** Zero auto-pay. Zero auto-sign. Report only.

---

## 2. Publishing & Catalog (Morgan + Vivian)

| Track | Status | Blocker | Next |
|-------|--------|---------|------|
| Ingram print (PB/HC) | LIVE / PENDING | | |
| KDP Kindle Vol I–III | LIVE | No omnibus on Amazon | |
| Author Central | | | |
| PhysicalAddress / mail | | | |
| PUB-11 wholesale verify | OPEN / DONE | | |

**Catalog audit:** Any public copy listing omnibus on Amazon? [PASS / FLAG]

---

## 3. Dashboard & Analytics Health (Nina + Groundswell Agent)

| Source | Last good data | SLA (<7d) | Alert |
|--------|----------------|-----------|-------|
| Groundswell snapshot | YYYY-MM-DD | ✅ / 🔴 | |
| GSC sitemap | Last read | | |
| Cloudflare analytics | | | |
| Web3Forms signups | | | |
| Social metrics (Outstand) | | | |
| KDP/Ingram sales intake | Manual CSV date | | |

**Dashboard URL:** https://groundswell-monitor.zh5779485.workers.dev/

---

## 4. Social (DIANA + Social Agent)

- Follower deltas (7d rollup): [platform summary]
- Published last 7d: N posts
- Failed / unassigned / token expired: N items
- Caption manifest mismatches: N (see `.caption-fix-audit.json`)
- Queued for Vivian: N
- Queued for Jason (approve/publish): N

**Latest daily:** `scratch/ops_reports/social/YYYY-MM-DD.md`

---

## 5. Email (Email Agent)

- Accounts scanned: gmail-personal · scp-jason · proton-personal
- Needs Jason: N items
- Waiting on vendor: N items
- Auto-cleaned this week: N

**Latest daily:** `scratch/email_reports/YYYY-MM-DD.md`

---

## 6. SEO / GSC (NINA)

- GSC discovered/indexed pages trend
- Sitemap status
- Field Notes / blog indexing
- Structured data / metadata drift
- Open fixes: [list or "none"]

**Latest SEO report:** `scratch/ops_reports/seo/` (most recent)

---

## 7. Approvals Queue (VIVIAN → Phase 4)

| Asset | Domain owner | Vivian verdict | On evening checklist? |
|-------|--------------|----------------|----------------------|
| [ID] | River/Diana/Claire | PASS / NOTES / BLOCK | Y/N |

**Blocked items stay OFF Jason's checklist until re-QC.**

---

## 8. KC Events & Career (optional lanes)

- **KC Events:** Tier 1 count · ICS exported? → `scratch/ops_reports/kc-events/YYYY-Www.md`
- **PSLF / 501(c)(3):** Job crawl date · applications in flight

---

## 9. Committee Actions This Week

- [ ] Agent maintenance completed (Groundswell submodule, Actions green)
- [ ] Stale dashboard escalated if >7d
- [ ] Week approval card updated
- [ ] Evening checklists written daily

---

## 10. Jason — Top 5 This Week Only

1.
2.
3.
4.
5.

*Everything else is agent-handled or waiting on vendors.*
```

---

## 5. Escalation Matrix

### Tier 0 — Auto-run (no Jason)

| Action | Agent | Guardrails |
|--------|-------|------------|
| Archive marketing noise email | Email | Not financial/legal; not open case |
| Mark-read superseded vendor notifications | Email | Sent-folder cross-check confirms resolved |
| Log social metrics | Social | Report-only |
| Submodule pull + pipeline verify | Groundswell | No deploy without approval |
| Morning brief generation | Morgan | Informational |
| KC Events ingest (no follow, no send) | KC Events | `KC_EVENTS_PAUSED=0` |

### Tier 1 — Report to Jason (evening checklist, no Vivian required)

| Action | Escalation |
|--------|------------|
| Money overdue / payment failure | CHECKLIST § Money/Legal — Jason always |
| Legal / notarization / government | CHECKLIST § Money/Legal |
| Publishing portal blocker (KDP reject, Ingram error) | CHECKLIST § critical path |
| Vendor waiting (Jason already replied) | CHECKLIST § Waiting on vendors |
| Dashboard stale >7 days | CHECKLIST § Dashboard truth |
| X/Outstand token expired | CHECKLIST § anomalies |
| PSLF job alerts | Morning brief / weekly roll-up |

### Tier 2 — Vivian QC gate (then Jason Phase 4)

| Action | Flow |
|--------|------|
| Social post / Outstand assignment | Domain owner → **Vivian** → CHECKLIST § Approve/publish |
| Press release / reader reply draft | Claire → **Vivian** → CHECKLIST § Approve/send |
| Blog / Field Notes publish | Eleanor upstream → **Vivian** → Jason |
| Metadata / SEO copy change | Nina → **Vivian** → Jason |
| Email newsletter / custom reply | Draft → **Vivian** → Jason |
| Site deploy with public copy | **Vivian PASS** → Jason `approve deploy` |

**Hard rule:** No Tier 2 item executes without **Vivian PASS (or PASS WITH NOTES) + Jason approval**.

### Tier 3 — Jason only, never agent

| Action | Why |
|--------|-----|
| Send money / pay invoices | Financial authority |
| Sign contracts / notarize / legal submit | Legal authority |
| Reply to press / readers / partners | Voice + liability |
| Publish social content | Brand authority |
| Follow social accounts (KC Events) | Morgan gate disabled until rubric validated |
| NetGalley / paid trade / ad spend | Budget authority |
| Ingram/KDP portal uploads (post-live revisions) | Publishing authority |

### Priority order (when Jason has limited time)

1. Money / overdue / legal / notarization  
2. Publishing blockers (Ingram, KDP, Author Central, covers, mail forwarding)  
3. Business inquiries (press, readers, Web3Forms chapter requests)  
4. Social engagement needing human voice  
5. Admin/setup noise — agents auto-clean when safe  

---

## 6. Dashboard Health SLA

**Owner:** Nina (SEO) + Groundswell Agent  
**Reviewed:** Every weekly roll-up; flagged daily on evening checklist if breached.

| Metric | SLA | Alert condition | Action |
|--------|-----|-----------------|--------|
| Groundswell snapshot (`mock_snapshot_single.json`) | **< 7 days old** | ≥ 7 days → 🔴 STALE | Groundswell agent re-runs pipeline; Morgan notes on CHECKLIST |
| GitHub Actions (Daily Fetch, Intel, Dork) | Last run < 48h | Failed or skipped | Agent checks logs; fix secrets or re-trigger |
| GSC sitemap last read | < 14 days | Error or not read | Nina flags; hygiene packet if needed |
| Social metrics (Outstand) | < 2 days | Token expired / API fail | Social agent reports; Jason reconnect when convenient |
| Email sweep | Same calendar day | Missing report | Morgan runs sweep manually |
| KDP/Ingram sales intake | < 30 days | No CSV uploaded | Prompt Jason on Intake tab; do not fabricate sales |
| Submodule drift | 0 commits behind at weekly run | > 5 commits behind | `git pull` in `groundswell-monitor/` first |

**Evening checklist rule (from Phase 4 stub):** If dashboard is stale, Jason trusts **CHECKLIST + evening brief**, not `/ops` UI alone.

**Live dashboard:** https://groundswell-monitor.zh5779485.workers.dev/

---

## 7. Implementation — Concrete Next Steps

### A. Cursor rules (add or extend)

| File | Purpose |
|------|---------|
| `.cursor/rules/scp-business-ops.mdc` | ✅ Exists — add SVP committee pointer to this charter |
| `.cursor/rules/svp-oversight-committee.mdc` | **Create** — always-apply: chair=Morgan, Vivian gate, report paths, never-auto list |
| `.cursor/rules/morgan-operating-memory.mdc` | **Optional** — `@scratch/MORGAN_OPERATING_MEMORY.md` on business sessions |

**Suggested `svp-oversight-committee.mdc` front matter:**
```yaml
---
description: SVP Oversight Committee — Morgan chairs; Vivian gates; evening-only Jason
alwaysApply: true
---
```

### B. Cursor Automations (daily agents)

| Automation | Trigger | Skill / script |
|------------|---------|----------------|
| Email daily sweep | Weekdays 8:00 CT | `email-daily-sweep` skill |
| Social daily sweep | Weekdays 8:15 CT | `social-daily-sweep` → `scripts/social_daily_sweep.py` |
| Evening checklist stub | Weekdays 6:00 PM CT | Morgan merges daily reports → `CHECKLIST_YYYY-MM-DD.md` |

**Blocker:** Proton Bridge must be running locally for full email sweep.

### C. Weekly packet naming (fixed conventions)

| Artifact | Path pattern |
|----------|--------------|
| SVP weekly roll-up | `scratch/ops_reports/SVP_WEEKLY_YYYY-Www.md` |
| Groundswell weekly | `scratch/ops_reports/groundswell/weekly/YYYY-Www.md` |
| KC Events weekly | `scratch/ops_reports/kc-events/YYYY-Www.md` |
| Week approval card | `scratch/ops_reports/WEEK_APPROVAL_CARD_YYYY-MM-DD.md` |
| Evening checklist | `scratch/ops_reports/CHECKLIST_YYYY-MM-DD.md` |
| Evening brief (detail) | `scratch/ops_reports/MORGAN_EVENING_BRIEF_YYYY-MM-DD.md` |
| Vivian QC | `scratch/ops_reports/editorial/VIVIAN_QC_*.md` |
| Email daily | `scratch/email_reports/YYYY-MM-DD.md` |
| Social daily | `scratch/ops_reports/social/YYYY-MM-DD.md` |
| SEO | `scratch/ops_reports/seo/SEO_AUDIT_YYYY-MM-DD.md` |

### D. Groundswell gaps (committee backlog)

1. Pull `groundswell-monitor/` submodule every weekly run  
2. Wire X/IG/Facebook from social agent into weekly rollup (markdown link until API)  
3. Wire email sweep highlights into weekly rollup  
4. Close Bluesky channel label bug in UI docs (don't misread `b` = blogs)

### E. First-week bootstrap checklist

- [ ] Create `.cursor/rules/svp-oversight-committee.mdc`  
- [ ] Schedule Cursor Automations for email + social sweeps  
- [ ] Run first `SVP_WEEKLY_2026-W32.md` from this template  
- [ ] Verify Groundswell snapshot freshness (<7d)  
- [ ] Confirm Vivian queue empty or logged in §7 of weekly roll-up  
- [ ] Publish `CHECKLIST_YYYY-MM-DD.md` stub each evening via Morgan  

---

## 8. Jason's Single Evening View

**One file:** `scratch/ops_reports/CHECKLIST_YYYY-MM-DD.md`  
**Detail backup:** `scratch/ops_reports/MORGAN_EVENING_BRIEF_YYYY-MM-DD.md`  
**Weekly decisions:** `scratch/ops_reports/WEEK_APPROVAL_CARD_YYYY-MM-DD.md`

### One-page approval card format

```markdown
# Evening Checklist — YYYY-MM-DD

**Open this first.** Detail: `MORGAN_EVENING_BRIEF_YYYY-MM-DD.md`  
**Reply format:** `approve [ID]` · `deny [ID]` · one line per item

---

## 🔴 Money / legal (Jason only — never auto)
- [ ] **[M1]** [one line]
- [ ] **[L1]** [one line]

## ✉️ Approve to send (Vivian PASS required)
- [ ] **[S1]** [draft summary] — Vivian PASS [date] · `scratch/ops_reports/editorial/...`

## 📣 Approve to publish (Vivian PASS required)
- [ ] **[P1]** [asset summary] — Vivian PASS [date]

## ✅ Done today (no action)
- [x] [agent-handled items — email cleaned, metrics logged, etc.]

## ⏳ Waiting on vendors
- [ ] [Vendor] — [subject] — since [date]

## 📊 Dashboard truth
- Groundswell snapshot: [date] — [FRESH ✅ | STALE 🔴 >7d]
- Trust this card if dashboard stale

## 🎯 Tomorrow if energy (max 3)
1.
2.
3.

---
*SVP Oversight Committee · Morgan · Phase 4*
```

### How the card gets assembled (Morgan, daily)

1. Pull latest **email sweep** → money/legal + waiting + needs-action  
2. Pull latest **social sweep** → anomalies + approval queue  
3. Pull **Vivian QC log** → only PASS/PASS WITH NOTES → Approve sections  
4. Check **dashboard SLA** → Dashboard truth line  
5. Dedupe against sent-folder / prior checklists (don't re-flag resolved)  
6. Cap **Tomorrow if energy** at 3 items ranked by priority order  

### Weekly overlay

On week open, Jason also gets **`WEEK_APPROVAL_CARD_YYYY-MM-DD.md`** with numbered decisions `[A1]…[An]` for budget, publishing, and campaign gates. Daily CHECKLIST handles tactical items; Week card handles strategic approvals.

---

## Appendix A — Persona Quick Reference

```
JASON (CEO/Author)
    ↑ approves
VIVIAN (QC gate)
    ↑ clears
MORGAN (chair) ──routes──→ ALEX · SAMUEL · DIANA · RIVER · CLAIRE · NINA · VICTOR · JORDAN · MARCUS · ELEANOR
    ↑ feeds
STANDING AGENTS: Email · Social · Groundswell · KC Events
```

## Appendix B — ISBN / ASIN Lock (Vivian enforces)

| Vol | Kindle (Amazon) | Print PB (Ingram) | HC (Ingram) |
|-----|-----------------|-------------------|-------------|
| I | B0H4KYMSM1 | 9798256008048 | 9798295800801 |
| II | B0H4KQ4YQJ | 9798256009953 | 9798295812675 |
| III | B0H4L36X21 | 9798256010072 | 9798295812705 |
| Omnibus | **Not on Amazon** | 9798256072704 | 9798295884412 |

---

*SVP Oversight Committee Charter v1.0 · 2026-08-09 · Morgan desk*  
*Next review: when agent roster, ISBN matrix, or Phase 4 checklist format changes.*
