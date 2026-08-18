# Stripe checkout on jasoncholloway.com

Stripe Checkout gives you **card, Google Pay, and Apple Pay** on your own site — one cart,
one shipping charge. Ingram Share & Sell cannot do this; Stripe makes you the merchant of
record, so you fulfill orders yourself (Ingram author copies, Lulu Direct, or hand-ship).

**Flip live:** set Cloudflare env vars → set `NEXT_PUBLIC_STRIPE_CHECKOUT=true` on the
Pages project → redeploy.

---

## 1 · Stripe Dashboard (use your existing account)

1. [dashboard.stripe.com](https://dashboard.stripe.com) → ensure **Seventh City Press LLC**
   is the business profile (or create a separate Stripe account for the imprint if you
   prefer clean books).
2. **Settings → Payment methods** → enable **Google Pay** and **Apple Pay** (usually on
   by default with Checkout).
3. **Settings → Domains** → add `jasoncholloway.com` (required for wallet buttons in
   production).
4. [Google Pay Business Console](https://pay.google.com/business/console) → merchant
   profile with site URL `https://jasoncholloway.com` (Stripe registers with Google when
   wallets are enabled — this step satisfies Google’s merchant listing).

---

## 2 · Create Products and Prices

For each print edition, create a **Product** and a **Price** (one-time, USD). Match site
prices in `lib/data/books.ts` (Ingram direct prices).

| Site SKU (offer key) | Suggested product name | Price (USD) | Env var for Price ID |
|----------------------|------------------------|-------------|----------------------|
| `omnibus-hardcover` | Masters X Omnibus HC | 44.99 | `STRIPE_PRICE_OMNIBUS_HC` |
| `omnibus-paperback` | Masters X Omnibus PB | 32.99 | `STRIPE_PRICE_OMNIBUS_PB` |
| `the-inheritance-of-frequency-hardcover` | Masters X Book I HC | 29.99 | `STRIPE_PRICE_MX1_HC` |
| `the-inheritance-of-frequency-paperback` | Masters X Book I PB | 16.99 | `STRIPE_PRICE_MX1_PB` |
| `the-grimoire-hardcover` | Masters X Book II HC | 29.99 | `STRIPE_PRICE_MX2_HC` |
| `the-grimoire-paperback` | Masters X Book II PB | 16.99 | `STRIPE_PRICE_MX2_PB` |
| `the-kingdom-hardcover` | Masters X Book III HC | 29.99 | `STRIPE_PRICE_MX3_HC` |
| `the-kingdom-paperback` | Masters X Book III PB | 16.99 | `STRIPE_PRICE_MX3_PB` |
| `hawkes-monograph-hardcover` | Hawkes monograph HC | (your price) | `STRIPE_PRICE_HAWKES_HC` |
| `hawkes-monograph-paperback` | Hawkes monograph PB | (your price) | `STRIPE_PRICE_HAWKES_PB` |

Copy each **`price_…`** ID into Cloudflare (step 3).

**Three-hardcover set:** no separate product needed. SKU `hardcover-set` adds all three HC
prices in one Checkout session (one order, one shipping line). Wire a buy button to
`/api/checkout?sku=hardcover-set` when you are ready to promote the set on Stripe.

---

## 3 · Cloudflare Pages secrets

Project **jasoncholloway** → Settings → Environment variables (Production):

| Variable | Example | Notes |
|----------|---------|--------|
| `STRIPE_SECRET_KEY` | `sk_live_…` | **Secret.** Never commit. Use test key `sk_test_…` first. |
| `STRIPE_PRICE_OMNIBUS_HC` | `price_…` | One var per row in the table above |
| `STRIPE_PRICE_OMNIBUS_PB` | `price_…` | |
| `STRIPE_PRICE_MX1_HC` | `price_…` | |
| … | | All ten single-edition vars |
| `STRIPE_SHIPPING_USD` | `5.99` | Optional flat US shipping at checkout |
| `SITE_ORIGIN` | `https://jasoncholloway.com` | Success/cancel URLs |
| `NEXT_PUBLIC_STRIPE_CHECKOUT` | `true` | **Build** variable — switches buy buttons from Ingram to Stripe |

Redeploy after saving variables.

---

## 4 · Test before going live

1. Use **test mode** keys and test Price IDs.
2. Set `NEXT_PUBLIC_STRIPE_CHECKOUT=true` on a **preview** branch first if you prefer.
3. Open `https://jasoncholloway.com/api/checkout?sku=omnibus-hardcover` — should redirect
   to Stripe Checkout.
4. Test card: `4242 4242 4242 4242`, any future expiry, any CVC.
5. Google Pay in test: use a real Google account with a test card in [Stripe test wallets](https://docs.stripe.com/google-pay).

Success URL: `/order-confirmed/`. Cancel returns to `/#buy`.

---

## 5 · Fulfillment (your responsibility)

Stripe captures payment; **Ingram does not auto-ship** from these orders. Options:

| Method | When to use |
|--------|-------------|
| **IngramSpark publisher order** | Place a manual order per sale at print cost + ship to customer |
| **Author copies on hand** | Sign and ship — best margin for signed sets |
| **Lulu Direct / Shopify** (later) | Automate POD when volume justifies setup |

Until automation exists, Stripe Dashboard → **Payments** is your order queue. Consider
**Stripe → Developers → Webhooks** → `checkout.session.completed` to email yourself
(not implemented in repo yet).

---

## 6 · What the site code does

- `functions/api/checkout.ts` — Cloudflare Pages Function; creates Checkout Session, redirects.
- `lib/data/stripeCatalog.ts` — SKU ↔ env var map; `NEXT_PUBLIC_STRIPE_CHECKOUT` flag.
- `lib/data/storefront.ts` — print offers use `/api/checkout?sku=…` when flag is on.
- `app/order-confirmed/page.tsx` — post-payment thank-you page.

Ingram links remain in `books.ts` as fallback when `NEXT_PUBLIC_STRIPE_CHECKOUT` is not `true`.

---

## 7 · If Ingram Express Checkout says yes

You can keep Stripe for wallet checkout **or** switch direct buttons to Ingram’s cart if their
solution includes Google Pay. Until then, Stripe is the path that works with your existing
site and personal Stripe account.
