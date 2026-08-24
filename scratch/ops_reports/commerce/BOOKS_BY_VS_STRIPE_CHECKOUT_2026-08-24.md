# Books.by vs Custom Stripe Cart — 2026-08-24

**Context:** IngramSpark Support (Jeniel P, Aug 24) — Share & Sell is **one title per link**; multi-title cart **not on immediate roadmap**. IndiePubs / Express Checkout **not available** to IngramSpark accounts.

**Question:** For 10 print SKUs + trilogy HC bundle economics, migrate to Books.by or build custom Stripe on jasoncholloway.com?

**Tier:** Implementation = Tier 2–3 (public checkout + possible vendor spend). This doc is **recommendation only**.

---

## Current architecture

| Layer | Today |
|---|---|
| Site | jasoncholloway.com — buy buttons → IngramSpark Share & Sell (per ISBN) |
| Catalog | 10 print SKUs in `lib/data/books.ts` + `public/feeds/google-shopping.csv` |
| Ebook | Kindle (Vol I–III only) + Google Play EPUBs — unchanged |
| Omnibus | Single Share & Sell checkout — **correct interim fix** for trilogy buyers |
| Analytics | GA4 `begin_checkout` on direct buy clicks |
| Payout | Ingram compensation ~90 days after month-end |
| Customer data | **None** from Share & Sell (Ingram privacy policy) |

---

## Option A — Stay on Ingram Share & Sell + omnibus-first UX

**Best for:** Low volume, catalog already live, minimal engineering, Ingram wholesale/distribution unchanged.

| Pros | Cons |
|---|---|
| Zero migration; ISBNs/files stay put | One SKU per cart |
| No new annual fee | No buyer email/name |
| GMC feed already aligned | 90-day payout lag |
| Returns policy already matched | $3.50/order Share & Sell fulfillment fee |

**Trilogy HC bundle:** Already optimal as **one omnibus HC order** — not a “bundle discount engine,” a **single SKU**.

---

## Option B — Books.by (Core $99/yr or Pro $299/yr)

**Model:** Flat annual fee, **0% commission** on sales; print + ship at wholesale; Stripe **2.9% + $0.30** per transaction; daily payouts.

| Pros | Cons |
|---|---|
| **Multi-item cart** native | Re-upload / reconfigure **10 titles** |
| Customer email + order history | Second POD pipeline to maintain |
| Daily Stripe payouts | May duplicate Ingram wholesale distribution story |
| FB Pixel on Pro ($299) | Annual fee even at low volume |
| Can use **existing ISBNs** (per Books.by FAQ) | GMC feed + site buy URLs need full retarget |
| 100-day money-back on subscription | Print cost may differ from Ingram — re-quote every SKU |

**Migration effort:** ~2–4 days per title upload + pricing pass + URL swap + feed regen + returns policy rewrite. **Not a weekend toggle.**

---

## Option C — Custom Next.js + Stripe Checkout

**Model:** Stripe collects payment on jasoncholloway.com; fulfillment must happen elsewhere.

| Pros | Cons |
|---|---|
| Full UX control on your domain | **No Ingram API** for POD fulfillment |
| Multi-SKU cart trivial in Stripe | Would require manual fulfillment or a **different** print API |
| Customer data in Stripe | Duplicate inventory/title records |
| Works with existing site stack | Highest build + compliance burden |

**Critical blocker:** IngramSpark does not expose a publisher-facing order API for Share & Sell or wholesale POD triggered by external checkout. Custom Stripe **without** switching print vendor = pay on site, fulfill manually (non-starter at scale).

**Viable Stripe sub-variants:**

1. **Stripe + Books.by/Lulu/Print API** — essentially rebuilding what Books.by already ships.
2. **Stripe Payment Links per SKU** — same single-item limitation as Share & Sell.
3. **Stripe for non-print** (ebook bundles, signed extras) — orthogonal to print cart problem.

---

## Fee math — Omnibus HC ($44.99) worked example

*Print costs are **estimated** from page counts (686 HC). **Verify in IngramSpark title calculator** before any pricing decision.*

### Assumptions

| Input | Value |
|---|---|
| Omnibus HC retail | $44.99 |
| Vol HC retail (×3) | $29.99 × 3 = $89.97 |
| Share & Sell fulfillment fee | $3.50 / order (US) |
| Est. print cost — vol HC (~156 pp) | **$9.50** each (placeholder) |
| Est. print cost — omnibus HC (686 pp) | **$22.00** (placeholder) |
| Reader shipping (GMC std) | $5.99 / shipment |
| Books.by Stripe fee | 2.9% + $0.30 on book price (shipping often separate) |
| Books.by platform fee | $0 per sale; **$99/yr** amortized below |

### Publisher net — Ingram Share & Sell

| Path | Formula | Est. net |
|---|---|---|
| **1× Omnibus HC** | $44.99 − $22.00 − $3.50 | **$19.49** |
| **3× Vol HC (3 orders)** | 3 × ($29.99 − $9.50 − $3.50) | **$50.97** |
| **3× Vol HC − 1× Omnibus** | $50.97 − $19.49 | Publisher earns **+$31.48** selling 3 vols vs 1 omnibus |

**Important:** Omnibus is a **reader-value product**, not publisher-revenue-maximizing. Site should steer trilogy **buyers** to omnibus; do not optimize against it in copy.

### Reader all-in (product + one shipping each)

| Path | Total |
|---|---|
| 3× HC + 3× ship | $89.97 + $17.97 = **$107.94** |
| 1× Omnibus + ship | $44.99 + $5.99 = **$50.98** |

### Books.by — same omnibus HC sale

| Line | Amount |
|---|---|
| Reader pays (book) | $44.99 |
| Print (est.) | −$22.00 |
| Shipping (reader-paid, net ~$0 to author per Books.by model) | — |
| Stripe 2.9% + $0.30 on $44.99 | −$1.60 |
| **Author net** | **~$21.39** |
| vs Ingram omnibus above | **~+$1.90/sale** (if print parity) |

### Break-even — Books.by Core ($99/yr)

| Scenario | Extra net vs Ingram per omnibus HC | Sales to cover $99 |
|---|---|---|
| +$1.90/sale (optimistic print parity) | | **~52 omnibus HC** |
| +$0.50/sale (print higher on Books.by) | | **~198 sales/yr** |
| Multi-SKU cart lifts conversion 5% on 200 site print orders/yr | Depends on AOV | Recalculate when baseline exists |

At **current volume** (single-digit direct print orders/month per sales ingest), **Books.by subscription does not pay back on omnibus HC alone**.

---

## Full catalog snapshot (10 print SKUs)

| ID | Title | Format | ISBN | Retail |
|---|---|---|---|---|
| mx1-pb | Vol I | PB | 9798256008048 | $16.99 |
| mx1-hc | Vol I | HC | 9798295800801 | $29.99 |
| mx2-pb | Vol II | PB | 9798256009953 | $16.99 |
| mx2-hc | Vol II | HC | 9798295812675 | $29.99 |
| mx3-pb | Vol III | PB | 9798256010072 | $16.99 |
| mx3-hc | Vol III | HC | 9798295812705 | $29.99 |
| mx-omnibus-pb | Omnibus | PB | 9798256072704 | $32.99 |
| mx-omnibus-hc | Omnibus | HC | 9798295884412 | $44.99 |
| hawkes-pb | Hawkes monograph | PB | 9798295778247 | $12.99 |
| hawkes-hc | Hawkes monograph | HC | 9798349308444 | $24.99 |

**Multi-volume cart use case:** Reader wants Vol I PB + Vol II PB + Hawkes PB → **3 Share & Sell tabs today**; **1 Books.by cart** under Option B.

---

## Merchant Center / ads impact

| Path | GMC feed | Landing URLs |
|---|---|---|
| Stay Ingram | Keep `link` → jasoncholloway.com book pages → Share & Sell | Omnibus ad → `/omnibus/` (Part A) |
| Books.by | Must point `link` to Books.by store or intermediate redirect policy | Google may prefer consistent checkout domain |
| Custom Stripe | `link` stays on site; `checkout_link_template` if eligible | Needs live checkout + shipping/returns sync |

Any migration requires **feed resubmit + returns policy + shipping SLA** re-validation.

---

## Recommendation (Morgan · RECOMMENDATION)

| Priority | Action |
|---|---|
| **Now** | Ship **Part A** omnibus-first UX; keep Ingram Share & Sell |
| **Now** | Point **paid social** to `/books/masters-x/omnibus/` |
| **Defer** | Books.by until **≥30 direct print orders/quarter** OR a campaign explicitly needs **multi-SKU cart** |
| **Defer** | Custom Stripe until a **print API partner** is chosen; do not build Stripe-only without fulfillment |
| **Never** | Amazon omnibus (catalog lock) |

**If Jason wants multi-SKU cart later:** Run a **2-week spike** — upload **one** title (Hawkes PB) to Books.by trial, compare quoted print cost vs Ingram, test one live order, then decide on full migration vs hybrid (omnibus + selected singles on Books.by).

---

## Decision gates (week card)

- [ ] Jason: approve Part A deploy
- [ ] Jason: add FB payment method + publish $35 boost (Tier 3)
- [ ] Optional: request Ingram **exact print + compensation** export for all 10 SKUs (replaces placeholders above)
- [ ] Optional: Books.by trial upload — **only if** multi-SKU cart is Q4 marketing requirement

---

*Morgan · commerce track · 2026-08-24 · Not financial advice; verify print costs in IngramSpark dashboard.*
