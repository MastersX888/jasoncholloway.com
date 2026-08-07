# Vivian QC — Omnibus case cover on homepages (2026-08-07)

**Routed by:** Morgan (Jason concern: case cover only visible after clicking into Omnibus HC)  
**Asset class:** Public-facing homepage / press homepage  
**Status:** Implemented — awaiting Vivian pass + Jason evening approval before treat-as-shipped

## Intent

Advertise the Omnibus hardcover **case laminate** on both homepages (not only on `/books/masters-x/omnibus`). Hero stays brand-first; case art sits below the first viewport.

## Changes

### Author — jasoncholloway.com (`app/page.tsx`)
1. Featured Publications omnibus row: **dust jacket + case** side-by-side; case larger (148px) and gold-labeled.
2. New below-fold section: `CaseCoverShowcase` (full) for Omnibus — jacket → “Remove jacket” → case, CTA to omnibus page.
3. `CaseCoverShowcase` gained optional `href` / `ctaLabel`.

### Series hub — `/books/masters-x`
- Omnibus flagship cover uses `HardcoverCaseReveal` (jacket/case toggle) instead of jacket-only `CoverArtifact`.

### Imprint — seventhcitypress.com (`seventhcitypress/app/page.tsx`)
1. Copied `omnibus-hc-case.png` → `seventhcitypress/public/covers/`.
2. Omnibus gallery: Dust Jacket + Case Cover; case featured (160px, gold border).

## Copy notes
- Showcase subtitle scoped to Omnibus hardcover (homepage use).
- Alt text corrected (was calling jacket “case”).

## Check when reviewing
- [ ] Case art sharp at showcase size; no wrong file (not rose-window / Vol cases)
- [ ] Labels Dust Jacket vs Case Cover unambiguous
- [ ] Hero still brand-first (no cover takeover of first viewport)
- [ ] Mobile: dual thumbs + showcase stack cleanly
- [ ] Imprint gallery loads case from SCP CDN path after deploy

## Deploy
Not deployed in this pass. After Vivian + Jason: author `build_export` + wrangler pages; imprint seventhcitypress build + deploy.
