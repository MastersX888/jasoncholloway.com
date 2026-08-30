# SVP Weekly Oversight — 2026-W32

**Committee chair:** Morgan  
**Week of:** 2026-08-04  
**Jason evening load estimate:** Medium

---

## 1. Money / Legal (ALEX + SAMUEL → Jason always)

| ID | Item | Owner | Status | Jason action |
|----|------|-------|--------|--------------|
| — | No new money/legal items flagged this bootstrap | ALEX/SAMUEL | — | N |

---

## 2. Publishing & Catalog (Morgan + Vivian)

| Track | Status | Blocker | Next |
|-------|--------|---------|------|
| Ingram print (PB/HC + omnibus) | LIVE | | |
| KDP Kindle Vol I–III | LIVE | No omnibus on Amazon | |
| Amazon omnibus PB cover (B0H3FRMLJD) | WAITING | Amazon catalog stale | Report submitted 2026-08-08 |
| Phase 4 moment pages | LIVE | Jason proofread ☐ pending | `JASON_QUOTE_PROOFREAD_v1.md` |
| GSC indexing Phase 4 | DONE | | Monitor crawl |

**Catalog audit:** Any public copy listing omnibus on Amazon? **PASS** (site states Ingram-only)

---

## 3. Dashboard & Analytics Health (Nina + Groundswell Agent)

| Source | Last good data | SLA (<7d) | Alert |
|--------|----------------|-----------|-------|
| Groundswell snapshot | 2026-08-09 rebuilt (Aug 8 traffic 241 + social) | ✅ KV + worker deployed | Fix report: `groundswell/GROUNDSWELL_DASHBOARD_FIX_2026-08-09.md` |
| GSC sitemap | 2026-08-08 read | ✅ | 55 pages author property |
| Social metrics (Outstand) | 2026-08-08 | ✅ | X token expired |
| KDP/Ingram sales intake | 2026-08-08 | ✅ | 16 units Ingram YTD in KV |

**Dashboard URL:** https://groundswell-monitor.zh5779485.workers.dev/

---

## 4. Social (DIANA + Social Agent)

- Latest daily: `scratch/ops_reports/social/2026-08-08.md`
- Pinterest-led; X auth expired in Outstand
- Queued for Jason: reconnect X when convenient

---

## 5. Email (Email Agent)

- Latest sweep needed for W32 — run email-daily-sweep
- Accounts: gmail-personal · scp-jason · proton-personal

---

## 6. SEO / GSC (NINA)

- Phase 4 URLs indexing requested 2026-08-08
- Latest SEO audit: `scratch/ops_reports/seo/SEO_AUDIT_2026-08-06.md`

---

## 7. Approvals Queue (VIVIAN → Phase 4)

| Asset | Domain owner | Vivian verdict | On evening checklist? |
|-------|--------------|----------------|----------------------|
| Phase 4 moment quotes | Morgan | ☐ Jason proofread pending | N until PASS |

---

## 8. KC Events & Career

- KC Events agent: not run this week yet
- PSLF / 501(c)(3): background lane

---

## 9. Committee Actions This Week

- [x] SVP Oversight Committee charter published (`SVP_OVERSIGHT_COMMITTEE_2026-08-09.md`)
- [x] Cursor rule `.cursor/rules/svp-oversight-committee.mdc` created
- [x] Groundswell KV rebuilt (2026-08-09) — traffic + social restored
- [ ] Groundswell worker deploy (`src/refresh.js` ASSETS fix) — push to main
- [ ] Schedule Cursor Automations for email + social sweeps
- [ ] First full email + social sweeps for W32

---

## 10. Jason — Top 5 This Week Only

1. Groundswell dashboard truth — confirm fix restores traffic/social panels
2. Amazon omnibus cover refresh (report submitted; watch B0H3FRMLJD)
3. Phase 4 quote proofread when ready
4. Reconnect X in Outstand (optional, when convenient)
5. Evening checklist only — no daytime ops unless money/legal

*Everything else is agent-handled or waiting on vendors.*
