# Checkout Roadmap — one order, one shipping charge, and wallet payment

Written 17-AUG-2026, revised the same day after the author's follow-up:

> *"The only way I'm going to be able to truly profit from my book is if I sell it
> through my website… To have to pay three separate shipping charges. What's the point
> of the bundle? … The idea is to save them clicks, AND save them shipping cost if
> possible by having everything on ONE order."*

That is the right objection. The three-hardcover "set" as sold through IngramSpark is
not a set — it is three transactions wearing one heading, and the site now says so
instead of implying otherwise.

---

## 1 · Why Ingram cannot do it, confirmed

IngramSpark's Share & Sell links have **no cart at any level**. Their own publisher FAQ:
*"Can I sell more than one book through a link? No. You can only sell one book per
link."* One link is one title, one format, one order. Three hardcovers is three
checkouts, three shipping charges, and three $3.50 print-fulfillment fees. There is no
setting, no bundle SKU, and no workaround inside Share & Sell.

Related dead ends checked:

- **Aer.io**, Ingram's old white-label storefront that did have a cart, was shut down.
- **IndiePubs / Ingram Express Checkout** (June 2026) does put a real Ingram-fulfilled
  cart and buy buttons on a publisher's own website — but it is offered *exclusively to
  Ingram Publisher Services distribution clients*, not IngramSpark self-publishers. It
  costs one email to ask an Ingram rep whether Seventh City Press can be admitted. If
  the answer is yes, it is the best outcome available: a cart, Ingram fulfillment, no
  inventory, no new printer.
- **A physical boxed set SKU** is not possible in print-on-demand. Ingram prints single
  bound books; it does not shrink-wrap or slipcase multi-book sets.

Within Ingram, the omnibus **is** the single-order set: one book, one order, one
shipping charge, all three novels. That is now stated in those words on the homepage
and in the buy panel, because it is the actual argument for it — not two saved clicks.

## 2 · Wallet payment (Google Pay), same root cause

Google Pay on the web needs a Wallet Console merchant ID, a payment gateway, and a
checkout page that belongs to us. Ingram's hosted checkout takes AMEX, Mastercard, and
Visa only. So both of the asks — one order and one-tap payment — come down to the same
decision: **whose checkout is it.** Every option below is really an answer to that.

## 3 · What the money looks like

Ingram print cost, US, small trim, B&W crème, from their 2026 rate card
(hardcover $5.31 per cover + $0.0132 per page; paperback $1.33 + ~$0.0140):

| Edition | Pages | Print cost |
|---------|-------|-----------|
| Omnibus hardcover | 686 | ~$14.37 |
| Omnibus paperback | 734 | ~$11.61 |
| Book I hardcover | 156 | ~$7.37 |
| Book II hardcover | 218 | ~$8.19 |
| Book III hardcover | 170 | ~$7.55 |
| **Three hardcovers** | 544 | **~$23.11** |

What each route pays on a three-hardcover sale, and what the reader pays to ship it:

| Route | Author earns on 3 HC | Reader's shipping | Orders | Wallet checkout | Author's work |
|-------|---------------------|-------------------|--------|-----------------|---------------|
| **Ingram Share & Sell** (today) | ~$56 (3 × price − print − $3.50) | 3 charges | 3 | No | None |
| **Ingram, omnibus instead** | ~$27 | 1 charge | 1 | No | None |
| **Bookshop.org one cart** | publisher comp + 10% affiliate (≈$11–16/book at typical discounts) | 1 charge, $3.99 + $1.25 per extra book (their Mar-2025 rates) | 1 | Their checkout | None |
| **Own store, POD fulfilled** (Shopify + Lulu Direct) | set price − print − shipping − ~3% | 1 charge | 1 | Yes | Setup + pricing upkeep |
| **Own store, own stock** (author copies, signed) | highest — see below | 1 charge, or free and built into price | 1 | Yes | Packing and posting |

Two things stand out. First, Share & Sell actually pays *more* on three separate
hardcovers than on the omnibus ($56 versus $27) — the reader is the one being taxed,
three times over, which is exactly the backhandedness objected to. Second, no route
both maximizes profit and requires no work; the honest choice is between money and
labor.

## 4 · The options, in the order worth doing them

### A · Live today, zero work: point set-buyers at the Bookshop.org cart

Already shipped in this branch. The three-hardcover block and the buy panel now link
the existing Seventh City Press list on Bookshop.org, where a reader adds all three to
one cart and pays one shipping charge ($3.99 for the first book plus $1.25 each
additional, their published Media Mail rate). Compensation is the Ingram publisher
payment plus the 10% affiliate commission on affiliate ID `126177`, which is already
in `lib/data/buyLinks.ts`.

It is not "buying from the author," and it pays less per book than Share & Sell. It is
here because it is the only single-order path that exists right now, and a reader who
wants all three books should not be handed three checkouts.

### B · One email: ask Ingram about IndiePubs / Express Checkout

Zero cost, possibly decisive. If Seventh City Press can be admitted to Ingram Express
Checkout, the site gets a real cart with Ingram fulfillment and no inventory, and the
whole problem closes without a second printer or a second set of files.

The letter is written and ready to send: `INGRAM_EXPRESS_CHECKOUT_EMAIL.md`.
To: `ingramsparksupport@ingramcontent.com` (or the account manager in the dashboard,
if one is assigned). Fill in the IngramSpark login email, then send.

### C · The real answer: an own store with a real cart

This is what "sell it from my website" means in practice — the author is the merchant,
the cart holds all three books, one shipping charge, and Google Pay / Apple Pay work
because the checkout is ours.

Two ways to fulfill it:

**C1 · Print-on-demand, automated (Shopify + Lulu Direct, or BookVault).** No
inventory, no packing. Lulu Direct supports bundle products — up to ten books sold as a
single product listing — so "Masters X: The Complete Hardcover Set" becomes one item in
the cart with one shipping charge, printed and shipped automatically when it sells,
under Seventh City Press branding, with the customer's email staying with the author.
Costs: a Shopify plan (~$39/month; live carrier rates need a higher tier, or set
weight-based rates manually), Lulu's print cost plus shipping per order, ~2.9% + 30¢ in
payment fees, and uploading the interiors and covers to a second printer. Ingram stays
in place for bookstores, libraries, and ISBN orderability — this only replaces the
website's direct sales.

**C2 · Author copies, hand-shipped (the signed set).** Order copies from IngramSpark at
print cost, with the publisher-direct volume discount (2% at 100 units, 5% at 300),
sell them through the same kind of store, sign them, and post them. On a signed
three-hardcover set at, say, $99 with shipping built in: roughly $99 − ~$23 print −
~$8 Media Mail − ~$3 fees ≈ **$65 a set**, against ~$56 through three Ingram orders
that cost the reader triple postage — and the signature is worth real money, which
Amazon can never offer. The cost is cash tied up in stock, and the author standing in
line at the post office.

The sensible shape is C1 for the standard editions and C2 for a signed, limited set:
automation for volume, hand-signed for margin and for the readers who want the author's
name in the book.

## 5 · Recommendation

1. **Now (done):** the site stops pretending three orders is a set, names the omnibus as
   the true one-order edition, and gives set-buyers the Bookshop one-cart link.
2. **This week, no cost:** email the Ingram rep about IndiePubs / Express Checkout
   eligibility. If yes, stop here — it solves cart and fulfillment together.
3. **If Ingram says no:** stand up Stripe Checkout on jasoncholloway.com (see
   `STRIPE_SETUP.md`) — Google Pay / Apple Pay via your existing Stripe account, with
   optional Shopify + Lulu Direct later for automated POD fulfillment.
4. **Alongside it:** a signed set at a premium price, fulfilled by hand, as the highest
   margin per sale and the one offer that is impossible to buy anywhere else.

Once a cart exists, the website side is small: add the store URLs per edition in
`lib/data/storefront.ts` and the buy panel, homepage band, analytics, and QA checklist
pick them up unchanged.

## 6 · Sources

- IngramSpark Share & Sell publisher FAQ and Terms of Sale (one book per link; card
  payment only; $3.50 US print fulfillment fee; 90-day compensation).
- IngramSpark 2026 rate card (print cost per cover and per page; publisher-direct
  volume discounts).
- Ingram Content Group press release, 15-JUN-2026: IndiePubs upgrade with in-house
  Ingram Express Checkout, exclusive to IPS distribution clients.
- Bookshop.org support centre shipping rates (March 2025) and affiliate commission
  terms.
- Lulu Direct documentation: Shopify integration and bundle projects (up to 10 books
  per bundle).
- Google Pay Web API: production access requirements (merchant ID, gateway, PCI).
