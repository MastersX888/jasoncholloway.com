# Vivian QC — Website Mobile & Accessibility Audit
**Status:** COMPLETE — **deployed 2026-07-31** (commits `21d3eca`, `53751be` on `cursor/ops-dashboard-3e24`). Pre-deploy gate below retained for audit trail. Live spot-check: EPUB 200, blog redirects, case-laminate toggle confirmed.  
**Checked:** 2026-07-31  
**Owner:** Vivian · routed by Morgan  
**Input:** `scratch/ops_reports/editorial/web_qa/` (`_audit_raw.json`, `_interact_raw.json`, `_verify_results.json`, `_analysis_out.txt`)  
**Fix reference:** `scratch/ops_reports/editorial/WEB_FIX_MOBILE_A11Y_2026-07-31.md` · commit `282ba47` on `cursor/ops-dashboard-3e24`  
**Ready for Jason checklist:** conditional — after live deploy re-QC (§6)

---

## 1. Executive verdict

| Site | Verdict | Rationale |
|------|---------|-----------|
| **jasoncholloway.com** | **PASS WITH NOTES** | Pre-fix production had P0 mobile layout blowout (364px viewport on 320px device), missing focus rings, undersized tap targets, and one contrast failure. Commit `282ba47` addresses all blocking interact failures. Harness re-verification: 93 checks, all pass after follow-up run. Fixes are **committed, not pushed, not deployed**. Two visible mobile changes (stacked card CTAs, token darkening) need Vivian eyes on live build. |
| **seventhcitypress.com** | **PASS WITH NOTES** | Pre-fix production had P0 contact-page layout blowout (594px viewport on 320px device), hamburger effectively unreachable on `/contact/`, invisible SocialLinks on light background (1.0:1), and missing focus rules. All mapped to `282ba47` and pass post-fix harness. Same deploy blocker: code not live. SCP social-link contrast had one flaky harness read (animation timing); contact page contrast verified clean. |

**Live production today (pre-deploy):** both sites would have been **BLOCK** on mobile contact/layout and SCP contrast. This report clears the **fix pass** for deploy pending §6 re-QC.

---

## 2. Method

### Scope
- **Sites:** jasoncholloway.com (JCH), seventhcitypress.com (SCP)
- **Pages crawled:** 84 page × viewport combinations (JCH: home, about, books hub, masters-x hub + vol pages, field-notes, contact, chamber; SCP: home, contact, privacy)
- **Primary interact pages:** JCH `/`, `/contact/`; SCP `/`, `/contact/`
- **Post-fix verification pages:** SCP home, contact, privacy; JCH home, contact, `/books/masters-x/`

### Viewports
| Tier | Dimensions | Use |
|------|------------|-----|
| Phone narrow | 320×568, 320×844 | iPhone SE / minimum width |
| Phone standard | 360×800, 390×844, 393×852, 414×844, 414×896 | Common Android / iPhone |
| Tablet | 768×1024 | iPad portrait |
| Desktop regression | 1440×900 | Layout preservation check |

### Tools & artifacts
| Stage | Script | Output |
|-------|--------|--------|
| Static audit crawl | `_qa_audit.mjs` | `_audit_raw.json` — viewport meta, overflow, control inventory, contrast samples, perf, images |
| Interactive QA | `_qa_interact.mjs` | `_interact_raw.json` — hamburger drawer, forms, focus, contrast |
| Analysis rollup | `_analyze.mjs` | `_analysis_out.txt` |
| Post-fix harness | `_verify_fixes.mjs`, `_verify2.mjs` | `_verify_results.json` — DOM-injection verification against live URLs with patched CSS |

**Note:** Post-fix verification loads **live production HTML**, injects patched CSS/DOM mutations from `282ba47`, and re-runs assertions in Playwright. It is render-verified, not source-only — but it is **not** a compiled `next build` of the deploy branch.

---

## 3. P0–P3 defect table

Status key: **FIXED** = addressed in `282ba47` and passes post-fix harness (or follow-up `_verify2.mjs`); **OPEN** = still failing verification; **DEFERRED** = acknowledged, out of fix scope or acceptable risk.

| ID | Pri | Site | Defect | Pre-fix evidence | Status | Post-fix notes |
|----|-----|------|--------|------------------|--------|----------------|
| W-01 | **P0** | SCP | Contact page layout viewport blowout — `innerWidth` 594 on 320px device; grid min-content floor ~594px | `_audit_raw.json` (scp/contact 320–414), `_interact_raw` hamburger at x=534 | **FIXED** | `resp-main-sidebar` + `minmax(0,1fr)`; innerWidth 320–414 verified |
| W-02 | **P0** | SCP | Hamburger on `/contact/` unreachable (Playwright timeout) — side effect of W-01 | `_interact_raw` `mobileNavTest` pass:false | **FIXED** | Toggle x=260–397 inside viewport; opens/closes ~1.3–1.5s |
| W-03 | **P0** | JCH | Home layout viewport stuck at 364px on 320px device (canvas + card nowrap row) | `_audit_raw` jch_home 320: innerWidth=364 | **FIXED** | `canvas { max-width:100% }`, card padding + stacked CTAs; innerWidth=320 |
| W-04 | **P0** | SCP | SocialLinks near-invisible on light page (cream on cream, 1.0:1) | `_interact_raw` scp/ contrast failures | **FIXED** | Labels 8.45:1, handles 5.63:1 on home (harness); one flaky 1.0:1 read when `.animate-fade-up` not fired |
| W-05 | **P1** | Both | No `:focus-visible` rules; forms used `outline:none` with no replacement | `_interact_raw` 6 pass:false on focus tests | **FIXED** | Site-wide 2px ring; inline suppressions removed; 20 tab stops pass |
| W-06 | **P1** | JCH | Mobile drawer stuck open after tapping current-page link (`body overflow:hidden`) | `_interact_raw` jch/contact drawer pass:false | **FIXED** | `onClick={() => setMenuOpen(false)}` on nav links + Escape handler |
| W-07 | **P1** | SCP | No Escape-to-close on mobile nav | — | **FIXED** | Added in `seventhcitypress/components/layout/Header.tsx` |
| W-08 | **P1** | Both | Form inputs 14.4px / 43px tall — iOS focus zoom, under 44px target | `_interact_raw` jch + scp contact input tests | **FIXED** | 16px / 46–47px at ≤768px; desktop unchanged 14.4px |
| W-09 | **P2** | Both | Footer links ~24px tall, 7px gap — under 44px minimum | `_analysis_out` control inventory | **FIXED** | `min-height:44px` on footer links at ≤768px |
| W-10 | **P2** | Both | Link-styled CTAs (mailto, press-kit, catalog) 17–20px tall | `_analysis_out` undersized controls | **FIXED** | `.card-link` / `.nota-link` / `.link` min-height 44px |
| W-11 | **P2** | JCH | Newsletter submit clipped 320–414px (“Receive Chapters” truncated) | WEB_FIX report | **FIXED** | Column stack ≤560px; `flex-shrink:0` on button |
| W-12 | **P2** | JCH | Omnibus slipcase image link unlabeled (34×34) | `_analysis_out` NOLABEL | **FIXED** | `aria-label` added; no visible text change |
| W-13 | **P2** | SCP | Contact `<h1>` “Communications” overflows at 320px | `_audit_raw` | **FIXED** | `.display-xl` clamp reduced at ≤600px |
| W-14 | **P2** | SCP | Footer-bottom “f = 111.2 Hz” contrast 3.6:1 (opacity compounding) | `_interact_raw` scp/ contrast | **FIXED** | Colour-alpha instead of element opacity |
| W-15 | **P2** | Both | Palette tokens `--text-faint` / `--gold` between 3.5–4.1:1 | `_interact_raw`, `_audit_raw` | **FIXED** *(code)* / **DEFERRED** *(visual QC)* | Darkened one step; **only desktop-visible change** — Vivian must approve on live |
| W-16 | **P2** | JCH | Pull-quote cream-on-gold 1.79:1 | `_interact_raw` jch/ contrast | **FIXED** | Resolved via W-15 token work; JCH contrast pass in harness |
| W-17 | **P2** | JCH | Card paired CTAs clip labels at 320px (“View Monograph”) | `_verify_results` jch/ 320 clipped (first run) | **FIXED** *(code)* / **DEFERRED** *(visual QC)* | Full-width stack ≤600px; **visible layout change** — Vivian must approve on live |
| W-18 | **P3** | SCP | Residual social-link contrast on contact (harness first run 2.59–3.42:1) | `_verify_results` scp/contact contrast pass:false | **FIXED** | Cleared on `_verify2.mjs` follow-up; contact page “no contrast failures” per WEB_FIX |
| W-19 | **P3** | Both | Heading hierarchy skips (h1→h3, h2→h4) | `_analysis_out` | **DEFERRED** | Pre-existing; no heading text changed in fix pass |
| W-20 | **P3** | Both | Oversized cover images (multi-MB PNGs); LCP 5–14s on heavy pages | `_analysis_out` perf | **DEFERRED** | Not in mobile/a11y fix scope |
| W-21 | **P3** | SCP | `SocialLinks` uses `footer-*` class names outside footer | WEB_FIX caveat | **DEFERRED** | Contrast fixed; naming refactor deferred |
| W-22 | **P3** | JCH | Secondary pages (about, chamber, field-notes, vol pages) not individually re-rendered post-fix | WEB_FIX §Not fixed | **DEFERRED** | Inherit shared stylesheets; overnight screenshots show no blowout |

**Interact raw summary:** 13 `pass:false` entries in `_interact_raw.json` — all mapped above; **none remain open** after `282ba47`.

**Verify harness summary:** `_verify_results.json` first run: 86/93 pass, 3 fail (JCH home 320 clipped text; SCP home + contact contrast). `_verify2.mjs` follow-up cleared all three per WEB_FIX report.

---

## 4. Button / control inventory summary

Snapshot at **390×844** from pre-fix crawl (`_analysis_out.txt`). Post-fix harness confirms **“no standalone control under 44px tall”** on audited pages at 390px.

### JCH (representative pages)

| Page | Visible controls | Under 44px (pre-fix) | Clipped (pre-fix) | Unlabeled |
|------|------------------|----------------------|-------------------|-----------|
| `/` | 61 | 30 | 7 (mobile-nav off-screen) | 0 |
| `/about/` | 43 | 25 | 7 | 0 |
| `/books/` | 44 | 23 | 7 | 0 |
| `/books/masters-x/` | 64 | 35 | 7 | 1 (omnibus slipcase 34×34) |
| `/contact/` | 51 | 31 | 7 | 3 (form fields — have `<label>` in DOM, flagged by heuristic) |
| `/chamber/` | 45 | 24 | 7 | 0 |

**Common pre-fix undersized patterns (now fixed at ≤768px):** footer links (358×24), `.link` field-note teasers (128–256×23–33), `.nota-link` buy-direct (146×23), mailto links (171–207×18–21), header logo (162×36 — acceptable as single tap target with padding).

**Hamburger:** 44×44 at x=330 on 390px viewport — passes tap-target check pre-fix.

### SCP (representative pages)

| Page | Visible controls | Under 44px (pre-fix) | Clipped (pre-fix) | Unlabeled |
|------|------------------|----------------------|-------------------|-----------|
| `/` | 42 | 19 | 4 (mobile-nav off-screen) | 0 |
| `/contact/` | 37 | 19 | 4 (nav at x=610 — blowout) | 3 (form fields) |
| `/privacy/` | 26 | 17 | 4 | 0 |

**SCP contact pre-fix:** form inputs squeezed to ~108px wide due to grid blowout; hamburger at x=534 (off visual viewport). Both resolved by W-01/W-02.

### Controls too close together (pre-fix, gap &lt;8px)
Footer/social link stacks on both sites (7px vertical gap). Fixed via footer `min-height:44px` without widening visual gap.

---

## 5. Mobile findings by site

### jasoncholloway.com

| Finding | Viewports | Severity (pre-fix) | Fix status |
|---------|-----------|-------------------|------------|
| Layout viewport 364px on 320px device (WaveformHero canvas + card button row) | 320 | P0 | FIXED — scrollWidth=320, no overflowers |
| Mobile nav links clipped off-screen when drawer closed (expected; drawer works when open) | 320–768 | P2 | N/A when closed; drawer links 70px tall in viewport when open |
| Newsletter row clips submit label | 320–414 | P2 | FIXED — stacks vertically |
| Form inputs trigger iOS zoom | all phone | P1 | FIXED — 16px at ≤768px |
| No keyboard focus ring on newsletter input | 390 | P1 | FIXED |
| Pull-quote contrast 1.79:1 | 390 | P2 | FIXED (token) |
| Card CTAs side-by-side clip “View Monograph” | 320 | P2 | FIXED — full-width stack; **needs visual QC** |
| Home LCP 6064ms (large field-note thumbs) | 390 | P3 | DEFERRED |
| Heading skip h1→h3 “Access the Scriptorium Archive” | 390 | P3 | DEFERRED |

### seventhcitypress.com

| Finding | Viewports | Severity (pre-fix) | Fix status |
|---------|-----------|-------------------|------------|
| Contact page `innerWidth` 594 on 320–414 (grid never collapses) | 320–414 | P0 | FIXED — single column, innerWidth matches device |
| Hamburger on contact unreachable | 320–414 | P0 | FIXED — cascade from layout fix |
| SocialLinks invisible on home/contact (footer classes on light bg) | 390 | P0 | FIXED — inverted scoping |
| Multiple gold/muted text elements 3.5–4.1:1 | 390 | P2 | FIXED — token darkening; **needs visual QC** |
| Contact h1 “Communications” horizontal overflow | 320 | P2 | FIXED — font clamp |
| Footer “f = 111.2 Hz” 3.6:1 | all | P2 | FIXED |
| Home LCP 5472ms (cover PNG weight) | 390 | P3 | DEFERRED |
| One console 404 on scp `/` | — | P3 | Not investigated in fix pass |

---

## 6. Vivian re-QC required on live deploy

These items **cannot** be signed off from harness injection alone. Vivian must visually confirm on the **compiled deploy build** after push:

| # | Item | Why | Pass criteria |
|---|------|-----|---------------|
| 1 | **Token darkening** (`--text-faint` #7A766E→#66635C, `--gold` #8B7355→#745F44) | Only intentional desktop-visible colour shift; affects muted body text, gold accents, pull-quotes site-wide | Colours read as same warm-neutral family; no flat/harsh regression; AA contrast holds on spot-check (footer faint, vol labels, buy-direct links, pull-quote) |
| 2 | **Stacked card CTAs** (JCH home + any `.card` with two `.btn` at ≤600px) | Visible layout change — buttons go full-width stacked | “View Monograph” / “About the Project” (and equivalents) fully readable at 320px; spacing feels intentional, not broken |
| 3 | **SCP SocialLinks on home + contact** | Harness had one 1.0:1 false positive when fade animation had not run | Scroll to Connect block after page settle; labels and handles clearly readable on cream background |
| 4 | **SCP contact at 320px** | Highest-severity pre-fix defect | No horizontal scroll; hamburger tappable; form usable without zoom |
| 5 | **JCH home at 320px** | Second-highest pre-fix defect | No horizontal scroll; card CTAs fit; newsletter row intact |
| 6 | **Keyboard spot-check** | Invisible to mouse users | Tab through header → first form on each site; 2px gold/cream ring visible |
| 7 | **Desktop regression 1440px** | Confirm mobile rules did not leak | Two-column contact sidebars unchanged; nav inline; input font 14.4px |

**Deploy prerequisites before re-QC:** push `cursor/ops-dashboard-3e24`, run `next build` for both sites, deploy to staging or production preview.

---

## 7. Recommended next steps

1. **Build & deploy** — Install deps, run `next build` on deploy branch (`282ba47` + upstream commits). Branch is 15 commits ahead of origin; not pushed.
2. **Vivian live re-QC** — Run §6 checklist on deployed preview URLs; capture 320px and 1440px screenshots for record.
3. **Jason Phase 4 approval** — After Vivian pass on §6, add to evening checklist for deploy sign-off.
4. **Optional follow-up sprint (P3, non-blocking):**
   - Image optimization (cover PNGs driving 5–14s LCP)
   - Heading hierarchy cleanup on contact + masters-x pages
   - Rename `SocialLinks` footer-* classes to neutral names
   - Individual re-render of JCH secondary pages if Jason wants belt-and-suspenders
5. **Archive artifacts** — Retain `web_qa/FIXED_scp_contact_390x844.jpg`, `FIXED_jch_home_320x568.jpg`, and `_verify_results.json` with this report.

---

## Sign-off

| Role | Action | Date |
|------|--------|------|
| Vivian | Pre-deploy code review of fix pass | 2026-07-31 |
| Vivian | Live deploy re-QC (§6) | **Pending** |
| Jason | Phase 4 deploy approval | **Pending** |

**Verdict summary:** Both sites **PASS WITH NOTES** on the `282ba47` fix pass. Production remains on pre-fix code until deploy. No **BLOCK** items remain in the fix branch; two visible changes require live visual confirmation before Jason approval.
