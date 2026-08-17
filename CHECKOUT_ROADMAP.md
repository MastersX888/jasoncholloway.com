# Checkout Roadmap — one-click / Google Pay on jasoncholloway.com

Written 17-AUG-2026 in response to the author's request: *"if it's possible to link
Google Pay to the site so that people can buy the books from Ingram with one-click
Google Pay opposed to having to enter all of their information."*

Short answer: **not with the current fulfillment setup.** The reason is not the
website — it is who owns the checkout. This document records what was verified,
what a reader experiences today, and the two real paths to wallet checkout.

---

## 1 · What was verified

| Channel | Who takes the payment | Payment methods | Wallet / one-click |
|---------|----------------------|-----------------|--------------------|
| Print (HC/PB) — all Masters X and Hawkes editions | IngramSpark Share & Sell (Lightning Source LLC) | Credit card only: AMEX, Mastercard, Visa | **No.** Ingram's Share & Sell terms of sale list card payment only |
| Kindle (Books I–III) | Amazon | Whatever is on the reader's Amazon account | **Yes** — existing Amazon account, no card re-entry |
| Ebook via Google Play (Hawkes) | Google | Google account payment methods, including Google Pay | **Yes** |
| Bookshop.org (ISBN orders) | Bookshop.org | Card and wallet options at their checkout | Their checkout, not ours |

Sources: IngramSpark Share & Sell Terms of Sale and order FAQ
(`ingramspark.com/ecommerce-terms-of-sale`, `ingramspark.com/ecommerce-faq`);
Google Pay API "Publish your integration" and request-object reference
(`developers.google.com/pay/api/web`).

Google Pay on the web requires three things this site does not have: a Google Pay
& Wallet Console **merchant ID** issued after domain review, a **supported payment
gateway** (or a PCI DSS compliant environment), and a checkout **we control** so a
payment token can be exchanged for a charge. Every print buy button on this site
hands off to Ingram's hosted checkout, so there is no page of ours in which a
Google Pay sheet could appear.

## 2 · What is shipped instead

The buy box (`components/store/BuyBoxModal.tsx`) now states the payment reality
per channel, so nobody gets as far as checkout before discovering it:

- Print: *"Card checkout (Visa · Mastercard · Amex) — no account to create"*
- Kindle: *"Checkout with your existing Amazon account"*
- Google Play: *"Checkout with your Google account · Google Pay"*

For the reader who wants the fewest taps today — the case that prompted this, two
readers at a party who already shop on Amazon — the Kindle rows are one tap from
a completed purchase on an existing Amazon account, and they sit in the same list
as the print editions.

Copy lives in `PAYMENT_NOTES` in `lib/data/storefront.ts`.

## 3 · Path A — Stripe (or equivalent) checkout, Seventh City Press fulfills

Wallet checkout becomes possible the moment Seventh City Press takes the payment
itself:

1. Open a Stripe account for Seventh City Press LLC. Stripe Checkout and Payment
   Links surface Google Pay and Apple Pay automatically for eligible devices, with
   no PCI work and no backend — a Payment Link is a URL, which this static site can
   link exactly like the Ingram URLs it links today.
2. Create one Payment Link per edition (five titles × HC/PB), priced to cover print
   cost + shipping + fees.
3. Fulfillment has to be decided, and it is the real cost of this path: orders
   arrive in Stripe, and someone must place the matching print order (IngramSpark
   print-on-demand order, or ship from a held stock) and email tracking. There is no
   automatic hand-off from a Stripe payment to an Ingram print job without an
   integration built against Ingram's ordering API.
4. Site change is small: add the link URL per offer in `lib/data/storefront.ts` and
   render a second button in the offer row. Everything else — analytics, the buy
   box, the homepage band — already reads from that data.

Trade-off: fewest taps for the reader, most operational work for the author, and
Seventh City Press becomes the merchant of record for tax and refunds.

## 4 · Path B — Keep Ingram, reduce the typing

If fulfillment stays with Ingram, the improvement available is fewer fields rather
than a wallet:

- Ingram's checkout supports the browser's own autofill. Nothing to build.
- Deep-link straight to the edition. Already done: every button goes to a
  single-title Share & Sell page, not a catalog search.
- `?buy=1` on any site URL opens the buy box directly, so print inserts, QR codes,
  and ad traffic land on the format list instead of the homepage.
- Ask IngramSpark support whether wallet payment is on their roadmap for Share &
  Sell. This is their checkout; if they add Google Pay, this site gets it for free.

## 5 · Recommendation

Ship Path B now (done), and treat Path A as a business decision rather than a web
task: it is worth doing when print volume justifies the author or a helper
processing orders, and it should be tested on the omnibus hardcover alone before
being extended to all ten print SKUs.
