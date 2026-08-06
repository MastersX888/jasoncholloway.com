# Web Fix Pass — Mobile Layout & Accessibility

**Date:** 2026-07-31
**Sites:** jasoncholloway.com (JCH, repo root) · seventhcitypress.com (SCP, `seventhcitypress/`)
**Input:** `scratch/ops_reports/editorial/web_qa/` (`_audit_raw.json`, `_interact_raw.json`, `_analysis_out.txt`, `_diag_scp.mjs`, viewport screenshots). No re-crawl performed.
**Status:** code fixes committed on deploy branch. **Not pushed, not deployed.**

---

## Where the edits live

The branch currently checked out in the main repo (`cursor/upload-staging-f9e1`) is **not** the source of the deployed sites. Comparing `git log` and the live HTML confirmed the deploy branch is **`cursor/ops-dashboard-3e24`**.

Changes were made in a **sparse worktree** (1.3 MB, source files only, no `node_modules`) and are now **committed** there:

```
C:\Users\zh577\.gemini\antigravity\scratch\_webfix_wt   (branch cursor/ops-dashboard-3e24)
```

Commit `282ba47`. See Integration section at bottom for full branch state.

```
 app/books/masters-x/page.tsx                       |   2 +-
 app/contact/page.tsx                               |   8 +-
 app/responsive.css                                 |  80 +++++++++
 components/layout/ContactForm.tsx                  |   3 -
 components/layout/Header.tsx                       |  12 +++
 components/layout/NewsletterForm.tsx               |  10 +-
 seventhcitypress/app/contact/page.tsx              |   3 +-
 seventhcitypress/app/globals.css                   | 109 +++++++++++---
 seventhcitypress/app/page.tsx                      |   3 +-
 seventhcitypress/components/layout/ContactForm.tsx |   1 -
 seventhcitypress/components/layout/Footer.tsx      |   4 +-
 seventhcitypress/components/layout/Header.tsx      |   9 ++
 12 files changed, 209 insertions(+), 35 deletions(-)
```

No metadata, JSON-LD, Open Graph, or heading text was touched. Only heading *styling* (a font-size clamp) changed.

---

## Verification method

Browser MCP was unavailable for this run, so verification used a Playwright harness,
`scratch/ops_reports/editorial/web_qa/_verify_fixes.mjs` (plus a focused follow-up, `_verify2.mjs`).
It loads the **live production pages**, applies the exact patched CSS and the template
changes as DOM mutations, then re-runs the audit assertions. Every check below is
**render-verified against a real browser at a real viewport**, not source-reasoned —
with the one caveat noted in "Harness caveat" at the end.

**Result: 93 checks — 86 pass, 3 fail on the first run, all 3 resolved on the follow-up run.**

Viewports exercised: **320, 360, 390, 393, 414** (phone), **1440** (desktop regression).

---

## Defect 1 — SCP contact page layout blowout on phones

**Root cause.** `seventhcitypress/app/contact/page.tsx` set the main/sidebar split as an inline
style with no media query:

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>
```

Two compounding problems. It never collapses, and a plain `1fr` track is floored at its
*min-content* width (~190px here, set by the longest unbreakable form label). So the grid's
minimum was 190 + 64 (4rem gap) + 340 = **~594px**. Mobile Safari/Chrome respond by widening
the layout viewport to fit, so a 320px phone got `window.innerWidth === 594` and rendered the
whole page zoomed out to ~54%.

**Fix.** Replaced the inline style with a class and defined it in `seventhcitypress/app/globals.css`:

```jsx
<div className="resp-main-sidebar">
```

```css
.resp-main-sidebar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 900px) {
  .resp-main-sidebar {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
  }
}
```

`minmax(0, 1fr)` removes the min-content floor even on desktop, so the failure mode cannot
recur at intermediate widths; the media query does the actual collapse.

**Before / after (measured):**

| viewport | before `innerWidth` | after `innerWidth` | grid columns after |
|---|---|---|---|
| 320 | 594 | **320** | `288px` (single) |
| 360 | 594 | **360** | `328px` (single) |
| 390 | 594 | **390** | `358px` (single) |
| 393 | 594 | **393** | `361px` (single) |
| 414 | 595 | **414** | `381px` (single) |

Screenshot: `web_qa/FIXED_scp_contact_390x844.jpg`.

---

## Defect 2 — SCP hamburger / nav toggle timeout

**Root cause: a side effect of Defect 1, not a broken control.** With the layout viewport at
594px, the toggle button sat at x = 534–578. The *visual* viewport was still only 320–414px
wide, so the button was rendered off-screen to the right. Playwright's actionability check
waited for it to be in view and timed out. The React handler itself was fine.

**Fix.** Resolved by Defect 1 — the toggle now lands inside the visual viewport at every phone
width (e.g. 320px: x = 260–304). Verified with a real tap, not a synthetic click.

Two accessibility hardening changes were added on top, one per site:

- `seventhcitypress/components/layout/Header.tsx` — added an Escape-to-close handler (SCP had none).
- `components/layout/Header.tsx` (JCH) — added an Escape handler, and `onClick={() => setMenuOpen(false)}`
  on every mobile nav link. Previously the drawer only closed via a `useEffect` on `pathname`,
  so tapping the link for the page you were already on left the drawer stuck open with
  `body { overflow: hidden }` — the page appeared frozen.

**Verified at 320 / 360 / 390 / 393 / 414 on both sites:** drawer opens in ~1.3–1.5 s, all 4 links
inside the viewport, minimum link height 72px, and it closes cleanly with `body.style.overflow`
restored to `''`.

---

## Defect 3 — No `:focus` / `:focus-visible` rules

**Root cause.** Two separate problems.

1. SCP's `globals.css` contained zero focus rules; JCH's stylesheet had exactly one
   (`.mobile-nav-link:focus-visible`).
2. Three form components actively suppressed the browser default with an inline
   `outline: "none"` and replaced it with nothing but a border-colour transition —
   invisible to anyone not looking for it.

**Fix.** Removed the inline suppressions (JCH `ContactForm.tsx` ×3 fields, JCH
`NewsletterForm.tsx`, SCP `ContactForm.tsx`) and added a site-wide rule to each stylesheet.
No `outline: none` remains anywhere.

SCP (`seventhcitypress/app/globals.css`), with a token so the dark header/footer can opt into a cream ring:

```css
:root { --focus-ring: var(--gold); }

a:focus-visible, button:focus-visible, input:focus-visible,
textarea:focus-visible, select:focus-visible, summary:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}
.header a:focus-visible, .header button:focus-visible,
.footer a:focus-visible, .footer button:focus-visible {
  --focus-ring: var(--header-text);
}
```

JCH (`app/responsive.css`) uses the same shape with `var(--gold)`, which clears 3:1 against
every surface on the dark page and against the light criticism register (where `--gold`
resolves to `#6B2C2C`).

`:focus-visible` means mouse users see no change — this is invisible to everyone except
keyboard users, per the "invisible corrections" constraint.

**Verified:** first 20 tab stops on SCP home, SCP contact, JCH home, JCH contact all show a ring;
every form field reports `outline: solid 2px`.

---

## Defect 4 — Tap targets and button usability

Five distinct causes, all fixed at the source.

**(a) Footer link lists.** Rendered ~24px tall with a 7px gap — under the 44px minimum and
too tightly spaced to hit reliably. Both stylesheets, `@media (max-width: 768px)`:

```css
.footer-links { gap: 0.25rem; }
.footer-links a {
  display: flex; flex-direction: column; justify-content: center;
  min-height: 44px;
}
```

Growing the box rather than the gap keeps the visual rhythm identical while giving each row a
44px hit area.

**(b) Link-styled CTAs.** Inline `<a>` elements acting as buttons (mailto addresses on both
contact pages, the SCP press-kit download, the cross-site catalog links, JCH `.nota-link` /
`.link`) measured 17–20px tall. Introduced a `.card-link` utility and applied it in the templates:

```css
@media (max-width: 768px) {
  .nota-link, .link, .card-link {
    min-height: 44px; display: inline-flex; align-items: center;
  }
}
```

Applied to: `app/contact/page.tsx` (3 links + the press-kit link), `seventhcitypress/app/contact/page.tsx`
(press email), `seventhcitypress/app/page.tsx` (press-kit download).

**(c) Form inputs.** Inputs were 43px tall at `0.9rem` (14.4px). Anything under 16px makes iOS
Safari zoom the page on focus, which is what produced the "page jumps when I tap the form"
behaviour. The size is set inline, so the override needs `!important`:

```css
input, textarea, select { font-size: 16px !important; }
input:not([type="checkbox"]):not([type="radio"]), select { min-height: 44px; }
```

Scoped to `max-width: 768px`, so desktop still renders at 14.4px — confirmed unchanged in the
1440px regression.

**(d) Newsletter submit clipped.** `NewsletterForm.tsx` built its row as an inline flex
container. The submit button has a `nowrap` label and no `flex-shrink` guard, so between 320
and 414px it was squeezed to ~50px and "Receive Chapters" was cut to a few characters.
Replaced the inline style with a class:

```css
.newsletter-row { display: flex; flex-direction: row; gap: 0.5rem; width: 100%; }
.newsletter-row-compact { flex-direction: column; }
.newsletter-row > .btn { flex-shrink: 0; }
.newsletter-row > .newsletter-input { min-width: 0; }
@media (max-width: 560px) {
  .newsletter-row { flex-direction: column; }
  .newsletter-row > .btn { width: 100%; justify-content: center; }
}
```

**(e) Unlabelled link.** The omnibus slipcase link on `app/books/masters-x/page.tsx` wrapped an
image with no accessible name. Added `aria-label` only — no visible text changed.

**Verified at 390px on all four audited pages:** "no standalone control under 44px tall" passes;
contact and newsletter inputs measure 46–47px at 16px.

---

## Defect 5 — Colour contrast

**(a) SCP `SocialLinks` rendered near-invisible outside the footer.** `SocialLinks.tsx` reuses
the footer-scoped classes `footer-col-title` and `footer-links`, but it is also placed on the
SCP home page and contact page — on the *light* cream background. Those classes hard-coded
`color: var(--header-text)` (cream #F7F4EF) plus `opacity: 0.65`, so cream text landed on a
cream page. Measured **1.0:1** in places, i.e. literally invisible; the `.social-link-handle`
rows measured 2.7:1.

Fixed by inverting the scoping — the base rules now target the light page, and `.footer`
re-applies the cream treatment:

```css
.footer-col-title { color: var(--text-faint); opacity: 1; }
.footer-links a   { color: var(--text-muted); opacity: 1; }

.footer .footer-col-title,
.footer .footer-links a { color: var(--header-text); opacity: 0.65; }
.footer .footer-links a:hover { color: var(--header-text); opacity: 1; }

.social-link-handle { opacity: 0.85; }   /* was 0.55 */
```

After: social labels **8.45:1**, handles **5.63:1** on the SCP home page (7.79 / 5.31 on contact,
which uses the slightly darker surface).

**(b) SCP footer-bottom text.** `.footer-bottom` dimmed itself with element `opacity: 0.65`,
which multiplies down into nested spans — the "f = 111.2 Hz" span inherited the parent opacity
*and* a faint colour and fell to 3.6:1. Switched to colour alpha, which does not compound:

```css
.footer-bottom { color: rgba(247, 244, 239, 0.72); opacity: 1; }
.footer-faint  { color: rgba(247, 244, 239, 0.62); }
```

`Footer.tsx` now uses `className="footer-faint"` instead of an inline
`color: var(--text-faint)` — that token is tuned for the light page and only reached 3.8:1 on
the dark footer.

**(c) SCP palette tokens.** Two variables sat between 3.5:1 and 4.1:1 against the page
surfaces, failing AA wherever they were used for body-size text:

```css
--text-faint: #7A766E  →  #66635C
--gold:       #8B7355  →  #745F44
```

Both stay within the existing warm-neutral / antique-gold family; the shift is roughly one
step darker and reads as the same colour. **This is the only change with a visible effect on
desktop, so treat it as a draft pending Vivian's QC gate and Jason's approval** — everything
else in this pass is either mobile-only or invisible to sighted mouse users.

**(d) JCH pull-quote** (cream on gold, 1.79:1) was resolved by the same token work on the JCH side.

**Verified:** JCH home and JCH contact report **no contrast failures**; SCP contact reports
**no contrast failures**.

---

## Defect 6 — Overflow, truncation, overlap

**(a) SCP contact `<h1>` overflow at 320px.** `.display-xl` uses a `clamp()` that bottoms out at
3.2rem, and the heading contains the unbreakable word "Communications", which at 3.2rem is
wider than a 320px screen. Styling-only fix, heading text untouched:

```css
@media (max-width: 600px) {
  .display-xl { font-size: clamp(2.2rem, 10vw, 3rem); }
}
```

**(b) JCH home layout viewport stuck at 364px on a 320px device.** This one took the longest to
find; it was bisected down with `_diag5.mjs` / `_diag6.mjs` (recursively hiding subtrees until
`innerWidth` snapped back to 320). Two contributors:

1. `WaveformHero.tsx` sets `canvas.width = window.innerWidth` imperatively. The canvas has an
   intrinsic width attribute and no CSS cap, so it can never shrink — and it re-widens itself
   from whatever `innerWidth` already got blown out to, which makes it self-reinforcing.
   Fixed with `canvas { max-width: 100%; }`.
2. A `.card` with 2.5rem padding containing a `nowrap` two-button flex row had a min-content
   width of ~344px, wider than the device.

```css
@media (max-width: 600px) {
  .card { padding: 1.25rem; }
  .resp-2col > *, .resp-main-sidebar > * { min-width: 0; }
  .card div:has(> .btn + .btn) { flex-wrap: wrap; }
  .card div:has(> .btn + .btn) > .btn {
    flex: 1 1 100% !important;   /* beats the inline `flex: 1` on these buttons */
    justify-content: center;
  }
}
```

Paired CTAs inside cards now stack full-width below 600px. That is a **visible layout change on
phones — draft pending Vivian's QC gate and Jason's approval** — but it is the only way to fit
labels like "View Monograph" and "About the Project" at 320px without truncating them.

**Before / after:** JCH home at 320px went from `innerWidth = 364` to `innerWidth = 320`,
`documentElement.scrollWidth = 320`, zero clipped elements. Card buttons went from 77px wide
with a 107px label (clipped) to 198px with a 196px label (fits).
Screenshot: `web_qa/FIXED_jch_home_320x568.jpg`.

**Verified — no horizontal overflow, layout viewport == device width, no clipped control or
label text — at 320px and 414px on:** SCP home, SCP contact, SCP privacy, JCH home, JCH contact,
JCH `/books/masters-x/`.

---

## Desktop regression — 1440×900

All pass. No horizontal overflow on any of the four audited pages. Nav stays in desktop mode
(inline nav present, hamburger hidden). The two-column sidebar layouts are byte-identical to
before: SCP contact `796px 340px` in a 1200px grid, JCH contact `780px 340px` in a 1184px grid.
Desktop input font is unchanged at 14.4px, and desktop footer link height is unchanged at
48–49px (all the touch-target rules are inside `max-width: 768px`).

The only intended desktop-visible delta is the `--text-faint` / `--gold` darkening in
Defect 5(c), flagged above for QC.

---

## Not fixed / caveats

**1. Committed on deploy branch, not pushed, not deployed.** See Integration section below.
Still needs a real `next build` before deploy — the harness verified rendered behaviour, but
nothing here has been through a compiler. `node_modules` was not installed (disk space), so no
build or lint ran.

**2. Harness caveat — CSS injection, not replacement.** The harness appends the patched
stylesheet rather than replacing the original, so an old declaration survives wherever the new
rule doesn't restate the same property. This produced three false failures on the first run
(all `opacity` inherited from superseded rules). Rather than special-case the harness, the
source rules now state `opacity: 1` explicitly where the fix replaced an opacity-based approach
with a colour-alpha one — which is the more robust CSS anyway. All three cleared on re-run.

**3. One flaky contrast reading.** On the final run, the SCP home page reported the social-link
block at 1.0:1 — the `.animate-fade-up` IntersectionObserver had not fired for that
below-the-fold section, so the elements were still at `opacity: 0` when measured. The identical
markup on SCP contact measured 7.79:1 in the same run, and SCP home measured 8.45:1 on the
previous run. Reading is a measurement race, not a defect.

**4. `SocialLinks` class naming.** The component still uses classes named `footer-*` in
non-footer contexts. The contrast bug is fixed, but the naming is a trap for the next person
editing footer styles. Renaming touches three files for zero user-visible benefit, so it was
left alone — worth folding into the next real refactor.

**5. Pages not audited.** Verification covered SCP home / contact / privacy and JCH home /
contact / books-masters-x. The remaining JCH pages (about, chamber, field-notes, books,
individual volume pages) inherit every fix through the shared stylesheets and were not
individually re-rendered. The overnight screenshot set shows no phone-viewport blowout on
those pages, so this is low risk, but it is unverified.

---

## Artifacts

- `web_qa/_verify_fixes.mjs` — full 93-check harness (~7 min)
- `web_qa/_verify2.mjs` — focused re-check of the three initial failures
- `web_qa/_verify_results.json` — machine-readable results
- `web_qa/_diag2.mjs` … `_diag6.mjs` — bisection scripts for the JCH 364px blowout
- `web_qa/FIXED_scp_contact_390x844.jpg`, `web_qa/FIXED_jch_home_320x568.jpg` — after shots (~20 KB each)

---

## Integration

**Date:** 2026-07-31  
**Branch:** `cursor/ops-dashboard-3e24` (deploy branch)  
**Worktree:** `C:\Users\zh577\.gemini\antigravity\scratch\_webfix_wt`

| Commit | SHA | Description |
|---|---|---|
| Mobile/a11y fixes | `282ba47` | Fix mobile layout blowout, focus states, and tap targets on both sites (12 files, +209/−35) |
| P0 binary fix | `d3e2935` | Cherry-pick of `d0f11e5` — track web-deliverable public binaries (.gitattributes + 6 PDF/EPUB files). `.gitignore` conflict resolved: kept pinterest-agent rules from deploy branch + added public download negations. |
| Blog redirects + HSTS | `ac84659` | Eight `/blog/` → `/field-notes/` 301s in `public/_redirects`; HSTS + OG content-type fixes in `public/_headers` and new `seventhcitypress/public/_headers`. |
| SEO metadata + schema | `f12290c` | `buildMetadata()` on ~40 pages, unified entity graph, Book schema builder, OG image params fix, SCP GA4 + press-kit tracking. Mobile/a11y preserved on 4 overlapping files. Report: `scratch/ops_reports/seo/SEO_FIXES_APPLIED_2026-07-31.md`. |

**Branch state:** ahead of `origin/cursor/ops-dashboard-3e24` by **15 commits**. Working tree clean in worktree. **Not pushed.**

**Blocked / pending:** Vivian QC on desktop-visible token darkening (Defect 5c) and stacked card CTAs (Defect 6b); Jason approval before deploy; `next build` (disk space + npm install).
