# Wikidata QuickStatements Queue — Jason Review Only

**Created:** 2026-07-30 overnight  
**Status:** QUEUED — no live edits made  
**Tool:** https://quickstatements.toolforge.org/

---

## Q140275300 — Jason Carroll Holloway

**Verified 2026-07-30:** Item is substantially complete. The following are **already present** (do NOT re-add):

- P213 ISNI `0000000530447935`
- P856 `https://jasoncholloway.com/` and `https://seventhcitypress.com/`
- P648 Open Library `OL16482975A`
- P2963 Goodreads `20924993`
- P4862 Amazon author `B08P54N4XZ`
- P973 Amazon + ISNI reference URLs

### Optional safe additions (review before running)

```
# VIAF cluster link — after VIAF submission accepted
# Q140275300	P214	"<VIAF-ID>"

# ORCID if applicable (P496 already set: 0009-0009-0983-4523)

# Library of Congress authority — after LoC PCN received
# Q140275300	P244	"<LCCN>"

# IngramSpark publisher page (reference only)
Q140275300	P973	"https://www.ingramspark.com/"
```

**Peg board P1-11 / P1-15 are superseded** — P856 and P213 already on item as of Jul 24 revision.

---

## Q140276114 — Masters X Trilogy

**Verified 2026-07-30:** Core trilogy structure present (P50, P527 ×3, P123, P577, P136, P407).

### Safe reference additions (queued for Jason approval)

```
# Official series landing page
Q140276114	P856	"https://jasoncholloway.com/books/masters-x/"

# Publisher imprint reference
Q140276114	P973	"https://seventhcitypress.com/"

# Omnibus print ISBN reference (Ingram-only — verify before add)
# Q140276114	P212	"9798256072704"
```

### Cross-link check (manual verify)
- P800 on Q140275300 already links Q140276114 ✅
- Individual volume items Q140275593, Q140276057, Q140276237 linked via P527 ✅

---

## Hawkes novels (separate batch — bovlb reply context)

Pre-drafted refs at `production_staging/_wikidata/hawkes_novels_qs_v4_refs_only.txt` — for John Hawkes items Q140317283–Q140317286. **Not executed.** Review separately from SCP author items.

---

## Constraints

- No live edits without Jason approval
- Run QuickStatements one batch at a time; verify each line against current item state first
- Prefer reference URLs (P973) over bare external IDs when uncertain
