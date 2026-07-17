# MASTER PROMPT — Platform Debt Consolidation & Foundation Architecture
**For:** Claude (extended reasoning / project mode)  
**Author:** Jason Carroll Holloway  
**Date prepared:** July 16, 2026  
**Audit completed:** July 16, 2026 (Cursor — live URL verification + build)  
**Repo:** `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\`

---

## PRE-COMPLETED WORK (do not re-audit from scratch)

Cursor already ran **AUDIT mode** on Jul 16, 2026. Read these before you start:

| File | Contents |
|------|----------|
| `debt_consolidation_handoff/AUDIT_REPORT.md` | Live URL matrix, build result, closed items |
| `FOUNDATION_STATUS.md` | Canonical ops status — **single source of truth** |
| `debt_consolidation_handoff/LOOSE_ENDS_REGISTER.md` | Post-audit debt (18 open, 7 closed) |
| `debt_consolidation_handoff/DEPLOY_RUNBOOK.md` | Build/deploy/www-redirect procedures |

### Audit findings (ground truth — accept these)

**Verified live and working:**
- Both sites 200 · `/books/` 200 · omnibus 200 · folio visualizer 200 · Merchant feed 200
- `/press` → 301 SCP · `/press-kit/*` → 301 SCP PDFs
- Folio Vol 2/3 images load (lowercase / vol3-* naming)
- GA4 + Bookshop affiliate on production
- JSON-LD Offers on book pages
- Groundswell `seventhcitypress.com` term enabled in source

**Verified broken / pending:**
- `www.jasoncholloway.com` and `www.seventhcitypress.com` return **200** (should 301 → apex)
- Build succeeded Jul 16 · `out/` ready · **deploy not run** (needs local wrangler + API token)
- Uncommitted local diff includes regenerated press kit PDFs + copy tweaks
- Authority layer open: ISNI, Wikidata P856, GSC imprint, GBP

**Your job is NOT to re-verify URLs.** Your job is **ARCHITECTURE + EXECUTION planning** on top of this audit.

**Default mode for this session:** `EXECUTION` — produce a **Batch Sprint checklist** aligned with `BATCH_SPRINT.md` (audit + packages already prepared).

### Batch packages ready (Jul 16)

| Block | What | Location |
|-------|------|----------|
| Deploy | Built `out/` + merchant feed synced | `DEPLOY_RUNBOOK.md` |
| Google Play | CSV + 8 EPUB/JPG files | `scratch/google_play_upload/` |
| Merchant Center | 10-SKU CSV regenerated | `Downloads/google-shopping-merchant-upload.csv` |
| Google Business | CSV import row | `seventhcitypress/google_business/` |
| Desktop staging | All packages in one folder | Run `scratch/stage_batch_uploads.ps1` |

---

## Your mission

I am Jason Carroll Holloway, author of the **Masters X Trilogy** and publisher via **Seventh City Press LLC** (Kansas City, MO). Over 18+ months I have built a substantial online presence — two websites, a research companion (Analysis Chamber), 12 Field Notes articles, distribution across Amazon/IngramSpark/Bookshop/Google Play, plus parallel creative pipelines (encyclopedia, audiobook, YouTube, reach monitoring).

**The problem:** Everything is scattered. I no longer have a single mental model of what exists, where it lives, what's live vs. stale, what's code vs. dashboard vs. creative WIP. I need you to help me **consolidate cognitive debt** and design a **solid foundation** before I expand reach.

Think of this like connecting dots on a wall with thumbtacks and yarn — except the dots are domains, accounts, repos, PDFs, ISBNs, and half-finished projects.

---

## What I need from you (deliverables)

Produce a **Foundation Consolidation Report** with these sections:

### 1. Presence Map (verified where possible)
A hierarchical map of my entire online world:
- **Owned properties** (domains, sites, feeds, email)
- **Rented properties** (Amazon, Goodreads, IngramSpark storefront, Bookshop, Google Play, Wikidata, etc.)
- **WIP pipelines** (encyclopedia, audiobook, YouTube, Groundswell)
- **Local-only assets** (repo folders, E: drive media, handoff zips)

For each node: URL/account, purpose, status (`live` / `stale` / `WIP` / `unknown`), and **who maintains it** (me, Cursor agent, manual dashboard).

### 2. Connection Matrix
Show how nodes link to each other:
- Author site ↔ imprint site (redirects, JSON-LD, press kit)
- Books ↔ retailers (ISBN → buy link → Merchant feed)
- Field Notes ↔ Chamber ↔ Trilogy volumes
- Email addresses ↔ Web3Forms ↔ Google Workspace
- Creative pipelines ↔ future public presence

Use a table or diagram. Flag **broken or redundant** connections.

### 3. Debt Register (prioritized)
Merge all loose ends into one register with:
- **P0** — Broken, misleading, or blocking foundation
- **P1** — Should fix before expansion
- **P2** — Nice to have
- **Deferred** — Requires my decision or external party

Tag each item: `[JASON manual]`, `[CURSOR code]`, `[CLAUDE creative]`, `[EXTERNAL]`.

### 4. Foundation Architecture Proposal
Before I "elevate and expand," propose what **Phase 1 Foundation** should include:
- Minimum viable presence (what must be true before any new channel)
- What to **retire or merge** (duplicate docs, dead routes, stale handoffs)
- What to **automate** (deploy, feed regen, press kit regen)
- What to **defer intentionally** (encyclopedia print, audiobook, YouTube until foundation is solid)

Be opinionated. I want recommendations, not a buffet.

### 5. Single Operating Model
Propose one page I can pin to my wall:
- Deploy checklist (both Cloudflare projects)
- "When I change X, also update Y" rules
- Canonical file list (which doc is truth for ISBNs, prices, copy)
- Monthly maintenance rhythm (15-minute version)

### 6. Open Questions for Jason
List decisions only I can make — with your recommendation for each.

---

## Ground truth (do not contradict)

Read **`CANON.md`** and **`public/llms.txt`** as locked bibliographic and brand facts.

Key locked facts:
- Author name of record: **Jason Carroll Holloway** (not "Jason C. Holloway" on covers/headers)
- Imprint: **Seventh City Press LLC**
- Trilogy + Hawkes monograph: **Available now** (launched June 2026)
- Omnibus prices: HC **$29.99** / PB **$19.99**
- Hawkes corpus: **17 novels**, **129 grapes**
- Hosting: **Cloudflare Pages only** (not Vercel)
- Deploy: **manual** `wrangler pages deploy` — git push does NOT auto-deploy

---

## What already exists (summary — see PLATFORM_INVENTORY.md for detail)

### Live websites
| Property | URL | Stack |
|----------|-----|-------|
| Author site | https://jasoncholloway.com | Next.js 16 static export → Cloudflare Pages |
| Imprint site | https://seventhcitypress.com | Separate Next.js project, same stack |

### Key author-site routes (~48 pages)
- `/books/masters-x/` — trilogy hub + 3 volumes + omnibus
- `/books/hawkes-monograph/`
- `/chamber/` — Analysis Chamber (folio visualizer, harmonic tools, research archive, etc.)
- `/field-notes/` — 12 real-history articles
- `/feeds/google-shopping.csv` — Google Merchant Center feed (10 print SKUs)
- `/chapters-sent/` — post-form download page
- `/contact/`, `/about/`

### Redirects (author → imprint)
- `/press` → `seventhcitypress.com`
- `/press-kit/*` → `seventhcitypress.com/press-kit/:splat`

### Email
- `jason@seventhcitypress.com`, `info@`, `press@` (Google Workspace)
- Forms: Web3Forms (shared key; distinguished by subject line)

### Distribution
- **Amazon KDP:** 3 Kindle editions only ($6.99 each)
- **IngramSpark:** Print + direct buy links + library/retail distribution
- **Bookshop.org:** Affiliate ID `126177`, curated list
- **Google Play Books:** Hawkes + trilogy EPUBs (upload package in `scratch/google_play_upload/`)

### Analytics & monitoring
- GA4: `G-79RDL3BDEH`
- Google Search Console: author domain; imprint property pending
- Groundswell Monitor: Cloudflare Worker for Reddit/Bluesky/GSC reach

### Authority / discovery (partial)
- Goodreads author ID: 20924993
- Wikidata: Q140275300 (needs P856 → seventhcitypress.com)
- ISNI, LoC PCN, Google Books Partner: **not done** (see Groundswell Playbook Tier 1)

### Parallel pipelines (NOT live public presence yet)
| Pipeline | Location | Status |
|----------|----------|--------|
| Encyclopedia | `encyclopedia_project/` | 67 entries; Pass 2 creative done; print via BookVault planned |
| Audiobook | `audiobook_project/` | 77 ElevenLabs scripts ready; not on Audible |
| YouTube | `encyclopedia_project/output/marketing/youtube/` | Scripts + setup checklist; channel not confirmed |
| Universe memory | `universe_memory/` | Canon reference layer |
| Design memory | `design_memory/` | Cover briefs |

### Repo structure (high level)
```
jasoncholloway/                 ← author site source + main repo
seventhcitypress/               ← imprint site
groundswell-monitor/            ← reach Worker
encyclopedia_project/           ← print encyclopedia WIP
audiobook_project/              ← narration scripts
website_edits_handoff/          ← Jul 2026 migration handoff
website_elevation_handoff/      ← elevation pass docs
debt_consolidation_handoff/     ← THIS package
scratch/                        ← ops (Google Play, Merchant, banners)
author_patches/                 ← SCP migration patches (may be merged)
```

---

## Known pain points (starting debt list — UPDATED post-audit)

Use **`LOOSE_ENDS_REGISTER.md`** — only **18 active open items** remain.

Critical themes (revised Jul 16):
1. **Deploy queue** — build done; one wrangler deploy + cache purge publishes press kit + copy fixes
2. **www hostnames** — Cloudflare Redirect Rules needed (dashboard, not code)
3. **Authority debt** — Wikidata, ISNI, GSC imprint, GBP (2-hour dashboard sprint)
4. **Pipeline vs. presence** — encyclopedia/audiobook/YouTube are WIP folders, not blocking web foundation
5. ~~Deploy drift / website P0 bugs~~ — **mostly closed on live**; old punch lists are historical

---

## Constraints

- Do **not** invent ISBNs, URLs, or biographical claims
- Do **not** recommend Vercel or a CMS unless I explicitly ask — static Next.js export is intentional
- Do **not** expand to new social platforms until foundation report is done
- Prefer **consolidation over creation**
- When unsure if something is live, say **"verify live"** and give me the exact URL/check

---

## Suggested workflow for this session

1. Read this prompt + attached inventory + loose ends register
2. Ask me **at most 5 clarifying questions** if blocked (otherwise proceed with assumptions labeled)
3. Produce the Foundation Consolidation Report (sections 1–6 above)
4. End with a **30-day foundation sprint** — ordered task list, max 20 items, each ≤1 hour

---

## Mode selector (Jason: pick one when you paste this)

> **I want you in EXECUTION mode.** (Audit pre-completed Jul 16 by Cursor.)

- **AUDIT** — Skip unless Jason asks to re-verify live state
- **ARCHITECTURE** — Foundation design + retirement plan
- **EXECUTION** — 30-day sprint with ordered tasks and copy-paste commands *(recommended)*

Default if unspecified: **EXECUTION**.

---

## Files to attach or read

| File | Path |
|------|------|
| **Audit report (read first)** | `debt_consolidation_handoff/AUDIT_REPORT.md` |
| **Ops status (canonical)** | `FOUNDATION_STATUS.md` |
| Deploy runbook | `debt_consolidation_handoff/DEPLOY_RUNBOOK.md` |
| This prompt | `debt_consolidation_handoff/CLAUDE_MASTER_PROMPT.md` |
| Inventory | `debt_consolidation_handoff/PLATFORM_INVENTORY.md` |
| Loose ends | `debt_consolidation_handoff/LOOSE_ENDS_REGISTER.md` |
| Diagrams | `debt_consolidation_handoff/CONNECTIONS_DIAGRAM.md` |
| Canon | `CANON.md` |
| LLM summary | `public/llms.txt` |
| Historical elevation detail | `ELEVATION_III_STATUS.md` |
| Reach playbook | `groundswell-monitor/Author_Platform_Playbook.md` |

---

*End of master prompt. Attach the files above and specify your mode.*
