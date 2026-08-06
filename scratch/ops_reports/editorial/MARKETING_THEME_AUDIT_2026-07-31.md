# Marketing & Theme Audit — Dual-Site Platform

**Date:** 2026-07-31  
**Sites:** jasoncholloway.com (author) · seventhcitypress.com (imprint)  
**Context:** Overnight godmode QA + SEO/mobile fix pass on deploy branch `cursor/ops-dashboard-3e24`

---

## Brand coherence

Both sites share the Seventh City Press visual language: dark author register on JCH, light criticism/imprint register on SCP, gold accent (`--gold`), display serif headings, wave dividers, and cover-artifact presentation. Cross-domain linking (JCH → SCP press, SCP → JCH author) is consistent. GA4 cross-domain linker added on SCP in SEO pass.

**Strength:** Catalog and chamber content feel like one imprint, not two unrelated sites.  
**Gap:** SCP footer social handles use muted tones that fail WCAG AA on cream — undermines polish for press/reviewer audience.

---

## Conversion paths

| Funnel | JCH | SCP |
|---|---|---|
| Trilogy discovery | Homepage cards → `/books/masters-x/` | Catalog grid → volume pages |
| Purchase | IngramSpark + Kindle + Bookshop links | Same + press-kit CTA |
| Lead magnet | `/chapters-sent/` → EPUB | N/A (author site) |
| Press | Redirect `/press` → SCP | `/press-kit/` PDF bundle |

Omnibus flagged as flagship on series hub with slipcase link — good upsell. Hawkes monograph secondary card present but CTA row was clipping at 320px; stacked-button fix applied.

---

## SEO & social readiness

- Per-page `buildMetadata()` unified OG/Twitter across ~40 routes
- Book schema with per-edition dates and ReadAction targets
- Volume OG images generated at 1200×630 (fixes letterboxed tall covers)
- Eight `/blog/` redirects preserve Bluesky/X inbound links
- Press-kit PDFs and EPUB tracked for deploy (were 404 live)

**Still open:** GSC verification tokens, field-note OG rename (.png → .jpeg), PSI/CWV baseline.

---

## Content theme alignment

Field Notes bridge real research (111 Hz, Ars Notoria, Kansas City locations) to fiction — supports "conspiracy fiction grounded in research" positioning. Chamber tools (folio visualizer, harmonic stack) differentiate from typical author sites. Masters X case-laminate reveal adds collector/print-edition story without changing jacket retail face.

---

## Recommendations (priority)

1. **Deploy today's branch** — binaries, redirects, metadata, mobile fixes blocked on wrangler deploy only.
2. **SCP footer contrast** — one token tweak for press-facing polish.
3. **Ingram link QA** — re-run when pending titles approve (EOD).
4. **Post-deploy social** — re-share one field-note URL to confirm blog redirect analytics.

---

## Verdict

Theme and marketing architecture are **production-ready** pending deploy. No copy or positioning changes required before launch; remaining items are technical delivery and Ingram catalog timing.
