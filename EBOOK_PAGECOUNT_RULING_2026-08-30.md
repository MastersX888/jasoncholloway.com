# Ebook page-count ruling — `numberOfPages` stays omitted for EPUB — 2026-08-30

**Author ruling: the EPUB editions publish no `numberOfPages` at all. The
omission is deliberate and correct. Do not populate it.**

No code was changed to reach this ruling. No DOCX, PDF or EPUB was opened for
writing, no build or staging script was run, and neither website was redeployed.
**Both live sites remain exactly as verified.** This document exists only so that
a future SEO, schema-completeness or metadata-parity pass does not "fix" a field
that is already correct.

Companion to the `CANON.md` §2A entry *"Page counts demoted from canon to build
data (ruled 2026-08-29)"*, its mirror `production_staging/_docs/CANON.md`, and
`universe_memory/04_STORY_CANON_DIGEST.md` item **2b**. The failure this guards
against is the one recorded in that §2A entry and in digest items 1 and 2.

---

## 1. The finding

Deploy verification on the night of 2026-08-29 recorded that the JSON-LD served
by both domains emits `numberOfPages` for every paperback and hardcover edition
but **omits it entirely for the three trilogy ebooks**, rather than publishing
the figures the catalog holds — Vol. I 267 · Vol. II 385 · Vol. III 291.

It was reported as a gap. It is not a gap.

The asymmetry is real and lives in two places, one per site:

| File | Paperback | Hardcover | Ebook |
|---|---|---|---|
| `lib/seo/bookSchema.ts` | `numberOfPages` emitted | emitted | **absent** |
| `seventhcitypress/app/page.tsx` | emitted via `pageCountForIsbn()` | emitted | **absent** |

Nothing is blocking the field. `lib/data/ingram-catalog.json` carries a
`pageCount` for all four ebook ISBNs, and `scripts/check-page-counts.mjs`
requires it to, so the numbers are in reach of both generators. The field is
absent because it should be absent, not because it could not be filled.

---

## 2. The ruling

> **`numberOfPages` stays omitted for every EPUB edition, on both domains. If
> the field is ever to be populated, the EPUB page counts must be measured
> first — publishing the catalog's July estimates is not an option.**

---

## 3. Why, in order of weight

### 3.1 The three figures were never verified against anything

This is the decisive reason. The 2026-08-29 pass verified **all eight print
counts** against the live IngramSpark listings and the interior PDFs on disk, 6
of 6 print titles matching. It **explicitly did not verify the EPUB numbers**.
`CANON.md` §2A now says so in the line that carries them:

> *EPUB (reflowable — no fixed pagination; these are Ingram catalog estimates,
> July 2026, not re-verified): Vol. I 267 · Vol. II 385 · Vol. III 291*

267, 385 and 291 are July estimates of unknown provenance. They are exactly the
same *kind* of number as the print figures that were wrong, from exactly the
same table, and they have had none of the checking the print figures have since
had. Publishing them would assert a precision nobody has established.

### 3.2 A reflowable EPUB has no fixed page count

Even a correctly measured figure would be semantically dubious here. An EPUB
repaginates against the reader's device, font size and margins; there is no
page count to be right about, only a count produced by one particular rendering.
`numberOfPages` is an optional schema.org property, and omitting it for a format
that has no fixed pagination is a more truthful statement than any number.

This alone would not settle the matter — retailers do quote ebook page counts —
but it removes any obligation to publish one, which leaves §3.1 unopposed.

### 3.3 Publishing unverified numbers to retailers is the precise failure that
consumed 2026-08-29

On **2026-08-02** a stale table in `CANON.md` propagated wrong `numberOfPages`
values out of canon and into live reader-facing listings on **TheStoryGraph,
Goodreads, Open Library and Pinterest**, and into the JSON-LD served by
`jasoncholloway.com`. Those four listings **now require support tickets to
correct** — the repo cannot retract them, because the data has left the repo.

That is the whole reason page counts were demoted from canon to build data, the
reason `lib/data/ingram-catalog.json` became the single source of truth, and the
reason `scripts/check-page-counts.mjs` exists as a prebuild gate.

The cost asymmetry is the point:

| | Cost |
|---|---|
| Field omitted, later found to be wanted | one commit |
| Field published wrong | one support ticket per retailer, per title, indefinitely |

Filling the field from the July estimates would re-run the 2026-08-02 incident
with the same source table, against the same retailers, three weeks after
paying for it.

---

## 4. What this ruling is **not**

It is not a claim that the ebooks have no length, and not an instruction to
delete the `pageCount` values from `lib/data/ingram-catalog.json`. The catalog
is the IngramSpark sync artifact and should keep mirroring what Ingram holds;
`scripts/check-page-counts.mjs` requires an integer `pageCount` on every
edition, so removing them would fail the gate.

The ruling governs one thing only: **what reaches a retailer or a search engine
as a published assertion.** Holding an unverified number internally is fine.
Publishing it is not.

---

## 5. Preconditions, if the field is ever to be populated

In order. Skipping any of them reproduces the 2026-08-02 failure.

1. **Measure** the three EPUBs, and record the rendering that produced each
   count — the reader, the device profile, the font size. A figure without its
   method is another estimate.
2. **Write the measured counts into `lib/data/ingram-catalog.json`** through
   `scripts/sync-ingram-metadata.py`, never by hand. A hand-edit is how the
   stale table shipped, and `editions` and `byIsbn` must not disagree.
3. **Derive, do not restate.** Read the count through
   `seventhcitypress/lib/pageCounts.ts` / `lib/data/pageCounts.ts` at the point
   of emission. Writing the number a second time anywhere is what
   `check-page-counts.mjs` exists to catch.
4. **Update `CANON.md` §2A and its mirror** so the "not re-verified" caveat no
   longer describes figures that have since been verified, and supersede this
   document by name.

---

## 6. Where this is recorded

| File | Where |
|---|---|
| `CANON.md` | §2A, bullet following the 2026-08-29 demotion entry |
| `production_staging/_docs/CANON.md` | same bullet, same position — CRLF mirror |
| `universe_memory/04_STORY_CANON_DIGEST.md` | item **2b**, beside the two page-count items it descends from |
| `lib/seo/bookSchema.ts` | comment at the ebook `workExample` branch, where the field would be added |
| `seventhcitypress/app/page.tsx` | same comment at the Seventh City Press ebook branch |
| `scripts/check-page-counts.mjs` | header note: the gate does not police omission |

The two source comments are the load-bearing ones. Anyone tempted to add the
field is standing in one of those two branches when the thought occurs, and will
not have read this file first.

---

## 7. Why this is a separate document, and why it is at the repository root

**Separate**, because it rules on neither canon nor typography. It changes no
story fact, so it does not belong in `CANON_FIX_2026-08-29.md`, whose subject is
Chapter One prose. It changes no formatting, so it does not belong in
`TYPOGRAPHY_RULING_2026-08-29.md`. It removes nothing, so it does not belong in
`SUBBOOK_REMOVAL_2026-08-29.md`. It is a **publishing-policy** ruling: it governs
what this repository is willing to assert to third parties as fact.

**At the root**, rather than in `production_staging/` where the other three dated
rulings live, because `production_staging/` is print production — DOCX sources,
interior PDFs, EPUB builds, upload reference. Every artifact this ruling touches
is outside it: `lib/seo/bookSchema.ts`, `seventhcitypress/app/page.tsx`,
`lib/data/ingram-catalog.json`, `scripts/check-page-counts.mjs`, and the JSON-LD
the two Next.js apps serve. Filing a website-metadata policy under print staging
would bury it from the only audience that needs it. Root-level dated documents
are already precedented here by `NAME_CONFUSION_AUDIT_2026-08-29.md`.

Dated 2026-08-30 because that is when it was ruled; it continues the 2026-08-29
session, which ran past midnight.

---

## 8. No rebuild, no artifact touched

- No print or EPUB build, staging script or generation script was run.
- All 23 DOCX/PDF/EPUB binaries under `production_staging/` were SHA256-and-size
  snapshotted before this pass and re-checked after. **Zero differences.**
- Neither website was redeployed. Both remain as deployed and verified on
  2026-08-29.
- `package.json` was not edited and no gate was added to `prebuild`. This ruling
  asserts the *absence* of a field, which `check-page-counts.mjs` cannot express:
  the gate compares claims against the catalog and has nothing to say about a
  claim that was never made. Enforcement here is documentary by necessity, which
  is why the two source comments matter more than this file does.
