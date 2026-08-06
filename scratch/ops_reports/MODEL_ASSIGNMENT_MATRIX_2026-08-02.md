# Model Assignment Matrix — 2026-08-02

**Desk:** Morgan · **Purpose:** Auto-route work to the right capability; avoid wasted subagent loops  
**Hard rule:** Browser MCP (`cursor-ide-browser`) = **parent chat only** — subagents cannot retain tabs

---

## Capability lanes

| Lane | Best for | Not for |
|------|----------|---------|
| **Parent chat (you + Morgan)** | Browser MCP login flows, StoryGraph/GR/Ingram clicks, Phase 4 approvals, money/legal | Long repo-wide refactors while browser locked |
| **Explore / research subagent** | Codebase maps, packet digests, “where is X” | Browser, email send, social publish |
| **Shell subagent** | Disk cleanup, git status, scripts, builds | Browser MCP, interactive dashboards |
| **General-purpose subagent** | Multi-file drafts, report writing, ops markdown packages | Anything needing Jason’s logged-in browser session |
| **Email skill** | Daily sweep across gmail-personal / scp-jason / proton-personal | Auto-replies needing human voice |
| **Social skill** | Outstand analytics + queue report | Auto-post without Vivian + Jason |
| **Groundswell skill** | Weekly refresh, pipeline verify | Claiming GBP/GSC (Jason login) |
| **Vivian (QC)** | Pre-publish fact/brand/layout/ISBN gate | Creative rewrite (that’s Eleanor) |
| **Cloud agent** | Isolated long jobs when Jason asks | Local browser / Phone Link / C: disk |

---

## Task → route map (week of 2026-08-03)

| Task class | Route | Notes |
|------------|-------|-------|
| Free discovery claims (Books Partner, Apple ASC, GBP, SCP GSC, GR shelves) | **Parent chat + Jason** | Packets ready; agent narrates steps, Jason/parent browser clicks |
| StoryGraph series librarian ticket | Parent chat (optional) | Draft ready; not required for catalog complete |
| Ingram PB approve / HC revise upload | **Jason** (parent can guide) | Vivian PASS assets only |
| Email triage / drafts | Email skill → Vivian → Phase 4 | Never auto-send press/reader/money |
| Social daily metrics | Social skill | Publish only after Vivian + Jason |
| Ops report writing / presence map / kickoff plans | General-purpose or parent | No browser required |
| Disk / system health | Shell | Phone Link already unlinked |
| Groundswell pull + weekly | Groundswell skill / shell | Submodule may be missing locally — clone/pull first |
| Site code / schema / SEO | Parent or web subagent + Vivian before deploy | Catalog ASINs locked |
| Interior/cover QC | Vivian harness scripts + Vivian verdict | No upload without Jason |
| Wikidata / QS batches | Parent if UI; shell for file prep | Browser MCP parent-only if UI |
| Audiobook / screenplay / PSLF | Deferred this week unless Jason pivots | Track only |

---

## Browser MCP protocol (mandatory)

1. **Only the parent chat** may call `cursor-ide-browser` tools.
2. Subagents that need browser work must **stop** and hand off: “Open parent chat → ask Morgan to run Browser MCP.”
3. Before a claim run: parent confirms `browser_tabs` list shows a **stable** tab; Jason logs in **inside that MCP tab**.
4. Do not assume Simple Browser / external Chrome tabs are MCP-visible.
5. After Cursor restart: re-establish tabs; prior viewIds are dead.

**Evidence:** `GR_STORYGRAPH_EXPORT_STATUS.md`, `STORYGRAPH_CLAIM_RUN_2026-08-01.md`, `SYSTEM_HEALTH_DIAGNOSIS_2026-08-02.md` — subagent browser repeatedly empty after tab create.

---

## Auto-routing heuristics

```
IF needs_logged_in_web_ui → parent_chat_browser_mcp
ELSE IF email_inbox → email_skill
ELSE IF social_metrics_or_queue → social_skill
ELSE IF groundswell_or_weekly_bi → groundswell_skill
ELSE IF publish_or_send_asset → vivian_then_jason_phase4
ELSE IF money_or_legal → jason_only
ELSE IF codebase_search → explore_subagent
ELSE IF disk_git_scripts → shell_subagent
ELSE → general_purpose_or_parent
```

---

## Never auto (any model)

- Money, contracts, notarization, Affirm/Cash App
- Press / reader / indie bookstore replies without Vivian PASS + Jason approve
- Social publish without Vivian + Jason
- NetGalley / Edelweiss payment
- Assert Ingram “55% / returns” without dashboard screenshots
- Amazon omnibus listing

---

## Restart recovery (this session)

Jason restarted Cursor → prior agent threads disrupted. Recovery order:

1. Load this matrix + `WEEK_KICKOFF_PLAN_2026-08-03.md`
2. Trust `gr_gate_state.json` (catalog complete) — do not re-import
3. Resume free claims via **parent** Browser MCP when Jason is ready
4. Resume hourly status under `scratch/ops_reports/hourly/`

*Morgan — routing matrix locked 2026-08-02 ~22:03 CT*
