# AD_CREATIVE.MD — MASTERS X (Ticket 4)

Paste-ready Amazon Ads + Meta creative. Derived from *Masters X — Cursor Agent
Handoff Brief* (Ticket 4), with corrections where the brief conflicted with
`CANON.md`, quote canon, or the live Amazon catalog.

**Do not spend, launch, or schedule anything from this file.** Ticket 7:
prepare assets only; Jason approves and places.

`CANON.md` wins any conflict. Never invent ISBNs, prices, page counts, or
sales figures.

---

## 0 · Corrections to the brief

1. **There is no Kindle omnibus.** `lib/data/buyLinks.ts` locks Amazon to three
   Kindle ASINs only. Print is Ingram / ISBN. Do not point Amazon Ads at
   `B0H3FRMLJD` (Author Central stale-cover case #51308891) and do not invent
   an omnibus Kindle listing.
2. **Quote headlines must be verbatim.** Brief variant 3 dropped `, Dr. Masters,`
   from the *Kingdom* line. Restored below. Truncate by taking an exact
   substring; do not paraphrase a canonical quote to hit a character cap.
3. **Omnibus page count needs a format qualifier.** Brief variant 2 said
   "686 pages" with no HC/PB. `CANON.md` §2A: 686 HC / 734 PB. Fixed below.
4. **"The greatest sound is silence" is not a novel line.** It is the English
   of 大音希声 (Laozi), from the companion analysis. Usable as ad copy; do not
   attribute it to a Masters X character.
5. **Comp-author names are allowed here.** The three KDP-illegal keyword slots
   from Ticket 3 (`dan brown meets eckhart tolle`, `umberto eco kostova
   readalike`, `books like the da vinci code and name of the rose`) belong in
   ads and on jasoncholloway.com, not in Amazon metadata fields.

**Do not run thriller-only creative (Variant A) in any always-on channel.**

---

## 1 · Where each ad should land

| Channel | Destination | Why |
| --- | --- | --- |
| Meta (FB/IG) | `https://jasoncholloway.com/books/masters-x/omnibus/` | Print omnibus is the one-order, one-shipping offer. Pixel `InitiateCheckout` already fires here. |
| Amazon Sponsored Products / Brands | Vol. I Kindle `B0H4KYMSM1` as the default product. Vol. II `B0H4KQ4YQJ` and Vol. III `B0H4L36X21` as additional products in the same campaign if the UI allows a product group. | Only live Amazon SKUs. |
| Bookshop / site remarketing (if used later) | `https://bookshop.org/lists/masters-x-trilogy-seventh-city-press?affiliate=126177` | Print, one cart. Do not hardcode prices; the list renders live. |

CTA copy: **"Available now"** — never "Releasing" / "Forthcoming."

---

## 2 · Targeting (bids and stacks — do not launch)

### 2.1 Amazon Ads — keyword / product targeting

Paste as customer-search keywords and, where the UI allows, as product-page
targeting against the named titles. Exact-match the comps; phrase-match the
category stacks.

**Comp titles / authors (Tier 3 — purchase intent, not metadata):**

- `dan brown`
- `the da vinci code`
- `angels and demons`
- `elizabeth kostova`
- `the historian`
- `umberto eco`
- `the name of the rose`
- `foucault's pendulum`
- `the rule of four`
- `eckhart tolle`
- `the power of now`

**Crossover stack (the cell the brief says nobody else bids):**

- `literary fiction`
- `meditation`
- `mindfulness`
- `contemplative fiction`
- `visionary fiction`
- `sound healing`
- `schumann resonance`

**Own-brand (exact, to capture already-aware search):**

- `masters x`
- `jason carroll holloway`
- `the inheritance of frequency`
- `the grimoire holloway`
- `the kingdom holloway`

Negative-exact anything that is a *different* product you do not want to pay
for (generic "kindle unlimited romance", etc.) — Jason decides the negative
list at launch. Do not add negatives that swallow the crossover stack.

### 2.2 Meta — interest stacks

Detailed targeting, AND of:

1. **Literary / conspiracy readership:** Dan Brown, Umberto Eco, Elizabeth
   Kostova, literary fiction, historical mystery (interest), books.
2. **Contemplative crossover:** meditation, mindfulness, Eckhart Tolle,
   *The Power of Now*, yoga (interest, not "yoga pants"), spirituality.

Exclude: children's books; young-adult if the overlap is noisy (Jason call).

Geo: United States first. Kansas City DMA is a cheap test cell but is not
required for launch.

---

## 3 · Character caps (so the paste fits)

| Field | Cap | Notes |
| --- | --- | --- |
| Amazon Sponsored Brands headline | 50 | Hard cap. |
| Amazon custom / Sponsored Products text | 150 | Hard cap. |
| Meta headline (recommended) | 40 | UI allows more; 40 is the preview window. |
| Meta primary text | 125 before "See more" | Longer is fine; put the hook in the first 125. |
| Meta description / link description | 30 | Often unused; optional. |

Counts below treat spaces and punctuation as characters. Em dash `—` counts as 1.

---

## 4 · Creative set C — five variants

Primary text = Meta primary / Amazon custom text.
Headline = Meta headline / Amazon SB headline.

Where the brief's headline exceeds a cap, the **capped line is an exact
substring** of the full line, never a rewrite of a quote.

### C1 — expectation reset

**Headline (full, 57 chars — Meta primary-adjacent / uncapped placements):**
> It begins as a conspiracy thriller. It doesn't stay one.

**Headline (Amazon 50 / Meta 40):**
> It begins as a conspiracy thriller.

**Primary text (148 chars):**
> A safety-deposit box paid 57 years forward. Carvings beneath Kansas City. And an ending no thriller has attempted. Masters X: The Complete Trilogy.

**Link description (optional, 27):**
> Available now. All three.

### C2 — comp lockup

**Headline (30 — fits every cap):**
> Dan Brown meets Eckhart Tolle.

**Primary text (88 — format-qualified):**
> 686-page hardcover. Seven hidden sites. One frequency that was in your hands all along.

Do not use the brief's unqualified "686 pages." Paperback is 734 pages. If a
placement is specifically the paperback, swap to `734-page paperback` rather
than blending the two numbers.

### C3 — *The Kingdom* quote (verbatim)

**Headline (full, 78 — use as primary text on quote-led placements):**
> The chambers were training wheels, Dr. Masters. The ninth page is the bicycle.

**Headline (Amazon 50 / Meta 40) — exact substring:**
> The ninth page is the bicycle.

**Primary text (79):**
> The literary trilogy readers finish and immediately press on someone they love.

Attribution, if the placement has a small-print line:
> — *Masters X: The Kingdom*

### C4 — William Masters (epigraph form)

**Headline (full, 66):**
> There's no chaos in nature. Only patterns we don't understand yet.

**Headline (Amazon 50 / Meta 40) — exact first sentence:**
> There's no chaos in nature.

**Primary text (94):**
> Three generations of one family inherit the same impossible perception. The Masters X trilogy.

Do not add the Vol. I dialogue "But" — that is the spoken form inside the
scene. Ads use the epigraph form, same as `RETAIL_METADATA.md` §5.

### C5 — 大音希声 back-translation

**Headline (30 — fits every cap):**
> The greatest sound is silence.

**Primary text (100):**
> A conspiracy novel that becomes a meditation on listening. Masters X — omnibus edition available now.

Do **not** put quotation marks around the headline or attribute it to Blake,
Nadia, or William. If a reviewer asks, the source is Laozi, not the novel.

---

## 5 · Always-on rule

| Allowed | Not allowed |
| --- | --- |
| Set C (all five) | Thriller-only Variant A ("Kansas City conspiracy thriller", "Da Vinci Code for Kansas City", ending-as-twist) |
| Hybrid-truthful on every always-on ad set | Running C2/C5 on Meta while Amazon runs thriller-only |
| "Available now" | "Releasing June 2026", prices, discount language, invented sales figures |

If a placement requires a single always-on ad, use **C1** (expectation reset)
or **C2** (comp lockup). Do not default to a thriller hook.

---

## 6 · Suggested first test (Jason places)

Not a spend instruction — a sequence if/when Jason opens the accounts.

1. Meta: one Sales campaign, landing on the omnibus URL, C1 + C2 in one ad
   set with the crossover interest stack. Existing pixel stays.
2. Amazon: Sponsored Products on Vol. I Kindle, keywords from §2.1, custom
   text C1. Add C2 as a second creative.
3. Pause any leftover thriller-only creative before either campaign is set
   to always-on.

Hard stop and budgets are Jason's. This file does not contain a dollar amount.
