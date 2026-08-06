# Vivian QC — Press Kit Indie Follow-up Deploy
**Desk:** Vivian · 2026-08-02 (~16:00 CT)  
**Trigger:** Draft 16 indie emails sent (Rainy Day, Prospero's, Raven)

## Verdict: **PASS — live production safe for bookstore follow-up**

| Check | Result |
|-------|--------|
| No 55% / returns / wholesale discount | **PASS** (all 5 PDFs, repo + live) |
| Omnibus $44.99 HC / $32.99 PB | **PASS** |
| ISBN matrix vs `ingram-catalog.json` | **PASS** |
| Kindle Vol I–III only; omnibus not on Amazon | **PASS** |
| Hawkes "seventeen novels" (site) | **PASS** live |
| Shopping feed seventeen | **PASS** live (sixteen=0, seventeen=6) |
| Email body trade terms | **PASS** — no unverified claims in Draft 16 |

## Live URLs verified
- https://jasoncholloway.com/press → 301 → seventhcitypress.com
- https://jasoncholloway.com/press-kit/Masters_X_Press_Kit.pdf → 301 → SCP PDF 200
- https://seventhcitypress.com/press-kit/Masters_X_Fact_Sheet.pdf → 200, clean
- https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf → 200, clean

## Session actions
- Regenerated `public/press-kit/*.pdf` via `scripts/generate_press_kit.py`
- Synced to `seventhcitypress/public/press-kit/`
- Commit `f3ef59e` on `cursor/upload-staging-f9e1`
- **Wrangler redeploy blocked** — C: drive ~0.16 GB free; build/shell IO failures

## Note
Live PDFs already matched Vivian-cleared content from Phase 4 deploy (`8775ac5`). Regen refreshed August 2026 date stamp; content equivalent. Redeploy optional once disk space restored.

**PUB-11 still open** — do not re-insert trade terms without Ingram screenshots.

*VIVIAN — Editorial Quality & Pre-Publication Control*
