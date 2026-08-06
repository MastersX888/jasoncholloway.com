# Seventh City Press — Automation Master Plan

**Owner:** Jason Carroll Holloway  
**Last updated:** 2026-07-29  
**North star:** Books published, imprint running like a well-oiled machine, promotional campaigns ready — with Jason’s only daily task being an **evening approval checklist**.

---

## Jason’s priorities (context for all agents)

1. **Wrap SCP project:** print books live, covers/metadata clean, imprint operational
2. **Promotional campaigns:** social, email, discovery — automated where safe
3. **Free capacity for:** audiobook + screenplay production, new writing, 501(c)(3) career in KC, student loan payoff

---

## Target operating model

```
┌─────────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│  Email Agent    │  │  Social Agent    │  │  Groundswell Agent  │
│  (daily sweep)  │  │  (daily report)  │  │  (weekly + data)    │
└────────┬────────┘  └────────┬─────────┘  └──────────┬──────────┘
         │                    │                        │
         └────────────────────┼────────────────────────┘
                              ▼
                 scratch/ops_reports/YYYY-MM-DD.md
                 scratch/ops_reports/weekly/YYYY-Www.md
                              ▼
                 Jason: evening checklist → approve / reject / edit
```

**Jason never logs into:** individual social accounts (goal), email triage (except approvals), or manual dashboard data entry (goal).

---

## Phase 1 — Email monitoring ✅ (in progress)

| Item | Status |
|------|--------|
| MCP accounts: gmail-personal, scp-jason, proton-personal | ✅ Connected |
| Daily sweep skill | ✅ `~/.cursor/skills/email-daily-sweep/SKILL.md` |
| Report output | ✅ `scratch/email_reports/YYYY-MM-DD.md` |
| Workspace alias consolidation on jason@ | ⏳ Jason — Google Admin |
| Cursor Automation (daily ~8am trigger) | ⏳ Optional — needs local machine + Proton Bridge |
| Proton Bridge must run for Amazon/KDP threads | ⚠️ Runtime requirement |

**Daily focus:** Seventh City Press, Ingram, KDP, Author Central, Open Library, PhysicalAddress, Web3Forms chapter requests, Merchant Center, press/partner inquiries.

---

## Phase 2 — Social media unified daily report ✅ (active)

### Confirmed config (2026-07-29)

| Item | Status |
|------|--------|
| Meta Business logged in | ✅ |
| Instagram linked to Meta | ✅ |
| Outstand API | ✅ `OUTSTAND_API_KEY` |
| X | ✅ Via **Outstand bridge** (not direct X API) |
| Daily sweep script | ✅ `scripts/social_daily_sweep.py` |
| First report | ✅ `scratch/ops_reports/social/2026-07-29.md` |

### Accounts (Outstand hub)

| Platform | Handle / asset | Outstand ID |
|----------|----------------|-------------|
| X | @jasonhollowaykc | `jaHn2` |
| Instagram | jasonhollowaykc | `1vWPG` |
| Facebook SCP | Seventh City Press | `IwQhX` |
| Facebook Author | Jason Carroll Holloway | `7BvrW` |
| Bluesky imprint | seventhcitypress | `4RSwi` |
| Bluesky author | jasonhollowaykc | `J15V3` |
| Pinterest | SeventhCityPress | `pxPfM` |

**Publishing reference:** `content/social/CAPTION_MANIFEST.json`, `.caption-fix-audit.json`

### Daily social report includes

- Follower/following deltas per platform
- Post reach, impressions, engagement (likes, comments, shares, saves)
- Published posts (24h) + unassigned queue
- Anomalies (failed posts, caption mismatches, token expiry)

**Output:** `scratch/ops_reports/social/YYYY-MM-DD.md`  
**Skill:** `~/.cursor/skills/social-daily-sweep/SKILL.md`

### Remaining (optional / Jason action)

1. **Reconnect X in Outstand** — metrics token expired; posting works, analytics don't
2. **Review 20 unassigned posts** in Outstand queue
3. Meta Graph API direct (Page ID + long-lived token) — optional enhancement

---

## Phase 3 — Groundswell dashboard agent ⏳

**Repo:** `groundswell-monitor/` (submodule → MastersX888/groundswell-monitor)  
**Live:** https://groundswell-monitor.zh5779485.workers.dev/

### Already integrated (daily pipeline)

- Cloudflare Analytics, Google Search Console, Web3Forms signups
- Bluesky + Reddit mention monitoring
- Manual KDP/Ingram sales via Intake tab

### Gaps (agent must fix)

1. **Pull submodule** — local copy ~11 commits behind origin (intel_engine, dork_engine, tabbed UI)
2. **Refresh stale snapshot** — last good automated fetch ~2026-07-23
3. **Wire social channels** — X, IG, Facebook not in pipeline yet
4. **Wire email summary** — link daily email sweep into dashboard or weekly rollup
5. **Weekly deliverable generator** — Markdown report (not built yet)

**Output:** `scratch/ops_reports/groundswell/weekly/YYYY-Www.md`  
**Skill (draft):** `~/.cursor/skills/groundswell-weekly-agent/SKILL.md`

---

## Phase 4 — Evening approval checklist (future)

Single file Jason opens each evening:

`scratch/ops_reports/CHECKLIST_YYYY-MM-DD.md`

Sections:

1. **Vivian cleared** — assets that passed QC (`scratch/ops_reports/editorial/`)
2. **Approve to send** — draft replies, social responses, vendor follow-ups
3. **Approve to publish** — scheduled posts flagged for review
4. **Money / legal** — always Jason (never auto)
5. **Done today** — what agents handled without asking
6. **Waiting on vendors** — no action needed

**Gate:** Nothing appears in sections 2–3 without Vivian PASS. Protocol: `scratch/EDITORIAL_QC_PROTOCOL.md`.

---

## Agent roster

| Agent | Cadence | Skill | Report path |
|-------|---------|-------|-------------|
| Email | Daily | email-daily-sweep | scratch/email_reports/ |
| Social | Daily | social-daily-sweep | scratch/ops_reports/social/ |
| Groundswell | Weekly + data refresh | groundswell-weekly-agent | scratch/ops_reports/groundswell/ |
| Orchestrator | Daily merge | (this doc + CHECKLIST) | scratch/ops_reports/ |

---

## What agents must NEVER auto-do

- Send money, sign contracts, notarize/legal submissions
- Reply to press, readers, or business partners without template + approval
- Delete financial or legal email records
- Post social content without explicit approval workflow (Phase 4)

---

## Immediate next actions

1. [ ] Jason: consolidate SCP aliases onto jason@ in Google Admin
2. [x] Jason: reconnect X in Outstand — confirmed 2026-07-29 evening
3. [~] Unassigned Outstand posts (20) — **frozen**; River redesign (`content/social/REDESIGN_BRIEF.md`); no assign/publish until v2 approved
4. [ ] Agent: set up Cursor Automation for daily email + social sweeps
5. [ ] Agent: pull groundswell-monitor submodule + verify GitHub Actions green
6. [ ] Agent: first combined evening checklist template
7. [x] Loan payment overdue — Jason confirmed paid 2026-07-29
8. [x] press@ security alert — Jason confirmed it was him
9. [~] PhysicalAddress Form 1583 — waiting on customer service reply

---

## Related files

- `scripts/email-accounts.registry.json` — MCP email config
- `debt_consolidation_handoff/PLATFORM_INVENTORY.md` — platform ASINs/URLs
- `groundswell-monitor/Author_Platform_Playbook.md` — discovery strategy
- `content/social/CAPTION_MANIFEST.json` — social slot captions
