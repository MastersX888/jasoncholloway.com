# Vivian QC — Website Mobile & Accessibility Pass

**Date:** 2026-07-31  
**Sites:** jasoncholloway.com · seventhcitypress.com  
**Input:** `scratch/ops_reports/editorial/web_qa/` (84-page crawl, 80+ screenshots, Playwright harness `_verify_fixes.mjs`)  
**Fix branch:** `cursor/ops-dashboard-3e24` (`_webfix_wt`)  
**Verdict:** **PASS WITH NOTES** — ship after build + deploy; two contrast notes on SCP footer only.

---

## Scope

Pre-deploy QC on the mobile/a11y fix pass (`282ba47`), SEO integration (`f12290c`), P0 binaries (`d3e2935`), blog redirects (`ac84659`), and today's case-cover + EPUB alias commits. Harness re-ran **93 checks** across viewports 320–1440 on live HTML with patched CSS applied in-browser.

---

## Pass (blocking issues resolved)

| Area | Before | After |
|---|---|---|
| SCP contact layout blowout | 594px layout viewport at 320px | 320px — grid single column |
| SCP hamburger off-screen | x=534 at 320px | x=260, opens/closes on tap |
| Contact inputs (both sites) | 14.4px font, 43px tall | 16px / 47px — no iOS zoom |
| JCH homepage card overflow | 364px min-content width | Cards wrap; CTAs stack ≤600px |
| Focus indicators | None on keyboard tab | Gold 2px outline on links, buttons, fields |
| Tap targets (nav, footer, CTAs) | Many &lt;44px | ≥44px on mobile breakpoints |
| Blog dead links | 8 live `/blog/` URLs | 301 → `/field-notes/` tree |

---

## Open notes (non-blocking)

1. **SCP footer contrast** — footer social labels and `@handle` text on cream background measure 2.6–3.4:1 (needs 4.5:1 for AA). Token darkening in `globals.css` improved body copy; footer `--text-muted` on `--bg-surface` still fails automated check. *Recommendation:* darken footer link color one step in a follow-up; does not block catalog or purchase flows.

2. **JCH "View Monograph" clip at 320px** — harness flagged 107px scroll width vs 75px client width on homepage Hawkes card. Fix applied: `.resp-btn-row` stacks paired CTAs full-width ≤600px. Re-verify post-deploy.

3. **Ingram direct-sale links** — Vol I/II PB still show "Purchase through this link is currently not available" pending Ingram approval (Jason expects EOD). Omnibus PB/HC live and price-match site.

4. **EPUB lead magnet** — correct path `/downloads/masters-x-opening-chapters.epub`; alias `/downloads/masters-x-free-chapters.epub` added. File tracked in git; requires wrangler deploy (push alone does not publish static binaries per runbook).

---

## Case-cover discoverability

Hardcover case-laminate art now exposed via `HardcoverCaseReveal` toggle on Masters X series hub, volume pages, and omnibus. Assets sourced from `MASTER_UPLOAD_FOLDER/_cover_preview/*_case.jpg`. Vivian visual pass on live deploy recommended for jacket ↔ case swap clarity.

---

## Press kit fact sheet

`scripts/generate_press_kit.py` CATALOG prices corrected to match `lib/data/books.ts` (IngramSpark direct prices). PDFs regenerated 2026-07-31.

---

## Jason evening checklist

- [ ] Approve deploy (build + wrangler + cache purge)
- [ ] Spot-check EPUB download from `/chapters-sent/`
- [ ] Toggle case laminate on one HC cover
- [ ] Re-test Ingram PB links when approval email lands
- [ ] Optional: SCP footer contrast follow-up

**Signed:** Vivian (editorial QC gate) · routed by Morgan
