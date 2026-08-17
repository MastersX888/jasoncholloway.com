# Purchase Path QA — run this before every deploy

The defect that prompted this checklist: two readers who wanted to buy the book
could not find a purchase link on the homepage. Nothing on the homepage sold a
book — the omnibus was a mid-page navigation card, and the only prices lived on
pages further in. Pass/fail below is written from the buyer's point of view, not
the developer's, so a non-technical tester can run it.

Run every item on a desktop browser **and** a phone. Clear site data first
(Chrome: DevTools → Application → Storage → Clear site data) — several checks
only happen on a first visit.

## A · The buyer who arrived to buy

| # | Check | Pass |
|---|-------|------|
| A1 | Load `jasoncholloway.com`. Without scrolling and without clicking anything, a price for the omnibus hardcover is visible on screen | ☐ |
| A2 | Without scrolling, a button that starts a purchase of the omnibus hardcover is visible | ☐ |
| A3 | On a first visit, the buy box opens by itself within ~2 seconds (desktop) or a purchase bar appears at the bottom of the screen (phone) | ☐ |
| A4 | The buy box lists, in this order: omnibus, hardcover set, Book I, Book II, Book III, Hawkes monograph | ☐ |
| A5 | Every row shows a format, a price, and a button. No row has a button without a price | ☐ |
| A6 | Reload the page: the buy box does **not** reopen by itself | ☐ |
| A7 | "Buy the Books" in the site header opens the buy box on every page, including the Chamber and Field Notes | ☐ |
| A8 | `jasoncholloway.com/?buy=1` opens the buy box immediately, on desktop and phone | ☐ |

## B · The links actually sell the right book

Click through every buy button. For each, confirm the destination page names the
same title, the same format, and the same price.

| # | Check | Pass |
|---|-------|------|
| B1 | Omnibus hardcover → IngramSpark page for ISBN 9798295884412 at $44.99 | ☐ |
| B2 | Omnibus paperback → IngramSpark page for ISBN 9798256072704 at $32.99 | ☐ |
| B3 | Book I / II / III hardcover → correct Ingram page, $29.99 each | ☐ |
| B4 | Book I / II / III paperback → correct Ingram page, $16.99 each | ☐ |
| B5 | Book I / II / III Kindle → correct Amazon listing, $6.99 each | ☐ |
| B6 | Hawkes hardcover $24.99, paperback $12.99, ebook $9.99 | ☐ |
| B7 | No print edition anywhere on the site links to Amazon (Amazon carries Kindle only — see `lib/data/buyLinks.ts`) | ☐ |
| B8 | Prices shown on the site match the prices Ingram shows after the click. If they differ, Ingram is the source of truth and the site is wrong | ☐ |

## C · The three hardcovers as a set

| # | Check | Pass |
|---|-------|------|
| C1 | The homepage shows the three hardcovers together on a shelf | ☐ |
| C2 | Each of the three has its own buy button with its own price | ☐ |
| C3 | The set total ($89.97) is stated, and it is stated that this is three separate orders | ☐ |
| C4 | The omnibus is shown as the cheaper way to get all three novels | ☐ |

## D · Reader who came to explore, not buy

| # | Check | Pass |
|---|-------|------|
| D1 | The buy box can be dismissed with the × button, the "Continue to the site" button, the Escape key, and a click outside it | ☐ |
| D2 | After dismissing, the page underneath scrolls normally | ☐ |
| D3 | "Take me down the rabbit hole" starts the guided tour from the hero and from the buy box | ☐ |
| D4 | The tour walks books → premise → SubTropolis → Voynich → 111 Hz → Chamber → buy, keeps its panel on screen across those page changes, and ends on "Finish" or "End tour" | ☐ |
| D5 | Nothing about the tour blocks reading the page — it can be ended at any step | ☐ |

## E · Phone specifics

| # | Check | Pass |
|---|-------|------|
| E1 | No dialog opens over the content on a first load — the bottom bar is used instead | ☐ |
| E2 | A "Buy" button is visible in the header without opening the menu | ☐ |
| E3 | In the buy box, every price and every button is reachable without horizontal scrolling | ☐ |
| E4 | The bottom bar can be dismissed and does not cover the page footer afterwards | ☐ |

## F · Accessibility and analytics

| # | Check | Pass |
|---|-------|------|
| F1 | Tab key alone can open the buy box, move through every row, and close it | ☐ |
| F2 | Focus returns to the button that opened the buy box after it closes | ☐ |
| F3 | GA4 realtime shows `buy_box_open` when it opens and `begin_checkout` when a buy button is clicked | ☐ |
| F4 | GA4 `begin_checkout` carries the ISBN or ASIN of the edition clicked, not a generic value | ☐ |

## Known open items

- **Omnibus price of record.** `CANON.md` §2A lists the omnibus direct price as
  HC $29.99 / PB $19.99. `lib/data/books.ts` — what the live site and every buy
  button use — has HC $44.99 / PB $32.99. The site is internally consistent, but one
  of the two documents is wrong and only the author can say which. Until that is
  settled, check B8 against Ingram, not against CANON.
- **No bundled set SKU.** Buying all three hardcovers is three orders and three
  shipping charges. A true set would need either an Ingram bundle SKU or the Stripe
  path in `CHECKOUT_ROADMAP.md`.
- **No shelf photograph.** The shelf on the homepage is rendered from cover art;
  see `ASSET_GAP_REPORT.md`.
- **No wallet checkout on print.** Ingram's checkout takes cards only; see
  `CHECKOUT_ROADMAP.md`.
