# Omnibus-First CTA Audit — 2026-08-24

**Scope:** Buy-button routing, trilogy hub UX, paid/social landing alignment  
**Trigger:** IngramSpark confirmed no multi-title Share & Sell cart; omnibus is the interim single-checkout product  
**Tier:** Site deploy = Tier 2 (Vivian QC + Jason approval)

---

## Executive summary

| Finding | Severity | Status |
|---|---|---|
| Trilogy hub buried omnibus below three volume blocks | High | **Fixed** — flagship hub moved above volume list |
| Volume pages/cards default to per-volume Share & Sell (3 carts, 3 shipping) | High | **Fixed** — `OmnibusVolumeNudge` on hub cards + volume heroes |
| Paid/social UTMs pointed at `/books/masters-x/` not omnibus | Medium | **Fixed** in QC doc; **live ads need URL update** |
| Savings copy understated HC value ($17.98 vs $44.98) | Medium | **Fixed** — dynamic PB/HC savings line |
| Google Shopping feed already uses omnibus URL | OK | No change needed |

---

## Catalog facts (print, IngramSpark Share & Sell)

| SKU | ISBN | Retail (IS) | 3× vol total | Savings |
|---|---|---|---|---|
| Omnibus PB | 9798256072704 | $32.99 | $50.97 | **$17.98** |
| Omnibus HC | 9798295884412 | $44.99 | $89.97 | **$44.98** |

Share & Sell: **one ISBN per checkout**. Reader shipping ~$5.99/SKU (GMC feed). Three separate HC orders add ~**$11.98** shipping vs one omnibus order.

**Reader total (HC trilogy, product + std shipping):**

- 3 volumes: $89.97 + $17.97 = **~$107.94**
- Omnibus: $44.99 + $5.99 = **~$50.98** → **~$57 reader savings**

---

## Pre-change audit (buy paths)

| Location | Before | Issue |
|---|---|---|
| `/books/masters-x/` | Omnibus section after newsletter + all volumes | Trilogy buyers saw 3 direct-buy buttons first |
| `/books/masters-x/[slug]/` | Hero buy buttons → volume Share & Sell only | No omnibus nudge above checkout |
| `/books/masters-x/omnibus/` | Correct destination | Under-linked from hub |
| `OMNIBUS_FB_PINTEREST_QC_2026-08-23.md` | UTMs → trilogy hub | Paid traffic missed omnibus landing |
| `public/feeds/google-shopping.csv` | Omnibus rows → `/omnibus/` | Already correct |
| Pinterest ad (prior session) | `utm_campaign=omnibus-ad-20260824` on hub URL | Update to `/omnibus/` if still running |

---

## Changes implemented (code)

| File | Change |
|---|---|
| `lib/data/trilogyCheckout.ts` | Paths, savings helpers, `omnibusCampaignUrl()` |
| `components/books/OmnibusFlagshipHub.tsx` | Reusable omnibus buy hub (PB + HC Share & Sell) |
| `components/books/OmnibusVolumeNudge.tsx` | “Complete trilogy — one order” link to omnibus |
| `app/books/masters-x/page.tsx` | Primary hub above volumes; volume nudges; relabeled cards |
| `app/books/masters-x/[slug]/page.tsx` | Nudge in volume hero before buy buttons |
| `app/books/masters-x/omnibus/page.tsx` | Savings line via `omnibusSavingsLine()` |
| `app/globals.css` | `.omnibus-flagship-hub--primary` emphasis |
| `scratch/ops_reports/social/OMNIBUS_FB_PINTEREST_QC_2026-08-23.md` | Campaign URLs → `/omnibus/` |

---

## Campaign URLs (canonical)

```
https://jasoncholloway.com/books/masters-x/omnibus/?utm_source=facebook&utm_medium=paid_social&utm_campaign=omnibus-ad-20260824
https://jasoncholloway.com/books/masters-x/omnibus/?utm_source=pinterest&utm_medium=paid_social&utm_campaign=omnibus-ad-20260824
```

Trilogy hub (`/books/masters-x/`) remains for SEO/browse; **not** primary paid landing.

---

## Deploy status

| Item | Status |
|---|---|
| Git | `1a0aa16` on `main` (cherry-pick of Part A onto production) |
| Cloudflare Pages | Production deploy `9f0f18e6` — **success** 2026-08-24 ~15:58 CT |
| Live verify | Hub: “Best way to buy the trilogy” + PB/HC savings line; volume cards + slug pages show omnibus nudge |

## Still open (Jason / ops)

1. ~~**Deploy** site changes to production (Tier 2)~~ **Done**
2. ~~**FB paid**~~ — Jason updated payment + published Facebook ad 2026-08-24 (~4:50 PM CT). Confirm destination is omnibus UTM if Ads Manager still editable.
3. **Update Pinterest ad** destination if campaign still active on old hub URL
4. ~~**Vivian pass**~~ — pre-publish QC note on file; live spot-check 2026-08-24 post-deploy

---

## Vivian QC checklist

- [x] Omnibus flagship hub renders above volume list on mobile + desktop
- [x] PB and HC buttons hit correct Share & Sell URLs (`lib/data/books.ts` omnibus `buyLinks`)
- [x] Volume nudge visible but does not hide per-volume buy for single-book buyers
- [x] Savings figures match catalog ($17.98 PB / $44.98 HC)
- [x] No Amazon omnibus links introduced (catalog lock)
- [ ] GA4 `begin_checkout` still fires on buy clicks *(manual click test — Jason or evening ops)*

---

*Morgan · commerce track · 2026-08-24 · deploy closed same day*
