# Debt Consolidation Handoff Package
**Prepared:** July 16, 2026  
**Last audit:** July 16, 2026 (Cursor live verification + build)

---

## What this is

Single source of truth for the Trilogy + Seventh City Press online presence.  
**Ops status lives in `../FOUNDATION_STATUS.md`** — update that after every deploy.

---

## Start here

### 1. Operations peg board (primary UI)
```powershell
cd debt_consolidation_handoff\peg-board
npm run dev
```
Opens http://localhost:5174 — **Board · Priorities · Assessment · Covers**

Source: `scp-peg-board.jsx` (same as your Downloads file, now in repo)

### 2. Cursor canvas (secondary)
[platform-presence-map.canvas.tsx](C:\Users\zh577\.cursor\projects\c-Users-zh577-gemini-antigravity-scratch-jasoncholloway-out\canvases\platform-presence-map.canvas.tsx)

### 3. Audit results
Read **`AUDIT_REPORT.md`** — live URL matrix, build result, closed items.

### 4. Claude session
Paste **`CLAUDE_MASTER_PROMPT.md`** + attach files listed below.

---

## Package contents

| File | Description |
|------|-------------|
| `README.md` | This index |
| `AUDIT_REPORT.md` | **NEW** — Live verification Jul 16, 2026 |
| `DEPLOY_RUNBOOK.md` | Build, deploy, www redirect |
| **`BATCH_SPRINT.md`** | **Batch upload sprint — blocks A–H, ~2–3 hr** |
| **`scp-peg-board.jsx`** | **Interactive ops peg board (Board / Priorities / Assessment / Covers)** |
| **`ISNI_AUTHORITY_BATCH.md`** | ISNI wired in code + remaining dashboard steps |
| `CLAUDE_MASTER_PROMPT.md` | Structured prompt for Claude |
| `PLATFORM_INVENTORY.md` | Full inventory |
| `LOOSE_ENDS_REGISTER.md` | Debt register (post-audit) |
| `CONNECTIONS_DIAGRAM.md` | Mermaid yarn-map |

**Repo-level (outside this folder):**
| File | Description |
|------|-------------|
| `../FOUNDATION_STATUS.md` | **Canonical ops status** — single source of truth |
| `../CANON.md` | Bibliographic law |
| `../ELEVATION_III_STATUS.md` | Historical elevation pass detail |

---

## Health snapshot (post-audit)

| Layer | Status |
|-------|--------|
| Both sites live | Verified 200 |
| Imprint redirects | `/press` and `/press-kit/*` working |
| Website P0 bugs from July | **Closed on live** |
| Build | Succeeded Jul 16 · 48 routes in `out/` |
| Deploy | **Pending** — needs local wrangler |
| www → apex | **Broken on live** — dashboard fix needed |
| Authority (ISNI, Wikidata, GBP) | Still open |

**Bottom line:** Foundation is ~90% closed. Three actions finish Layer 1: deploy, www redirect, commit diff.

---

## Claude attach list

**Required:** `CLAUDE_MASTER_PROMPT.md`, `AUDIT_REPORT.md`, `LOOSE_ENDS_REGISTER.md`, `../FOUNDATION_STATUS.md`  
**Recommended:** `PLATFORM_INVENTORY.md`, `DEPLOY_RUNBOOK.md`, `../CANON.md`  
**Mode:** Start with `ARCHITECTURE` — audit is already done.
