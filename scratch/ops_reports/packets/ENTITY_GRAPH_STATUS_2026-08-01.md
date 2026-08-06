# Entity Graph Status — OL / Wikidata / VIAF / ORCID / ISNI
**Prepared:** 2026-08-01 · AUTH-05 related

---

## Live

| Node | ID / URL | Notes |
|------|----------|-------|
| Wikidata author | Q140275300 | P856 + P213 done |
| Wikidata trilogy | Q140276114 | P856 + P973 done |
| ISNI | 0000 0005 3044 7935 | On site JSON-LD |
| Open Library author | OL16482975A | Merge #1584949 resolved |
| Goodreads author | 20924993 | Shelves still open (MKT-02) |
| Amazon Author | B08P54N4XZ | Live |

## Code change (Vivian schema QC 2026-08-01 — PASS WITH EDITS)
Wired into `authorSameAs` on **both** sites (`lib/data/authorAuthority.ts` + `seventhcitypress/lib/authorAuthority.ts`):
- `https://openlibrary.org/authors/OL16482975A/Jason_Carroll_Holloway` — **KEEP on Person.sameAs**

**Vivian edit:** Removed series Wikidata `Q140276114` from `Person.sameAs` (entity mismatch — series ≠ person). Series remains on `BookSeries.sameAs` via `SERIES_WIKIDATA_URL` in `lib/seo/bookSchema.ts` (already correct).

**Do not treat live until deploy.** Deploy both jasoncholloway.com + seventhcitypress.com after Jason Phase 4.

## Open

| Item | Owner | Action |
|------|-------|--------|
| VIAF cluster | JASON | Send VIAF packet email |
| ORCID | JASON | Register at https://orcid.org/register · add works by ISBN/DOI · then agent adds ORCID URL to sameAs |
| ISNI polish | — | Done; keep in sync |
| LCNAF | EXT | Usually after VIAF/national lib |
| Wikipedia / Knowledge Panel | — | No article yet; GBP + entity polish first |
| OL works polish | AGENT | Confirm 4 works by ISBN on OL (residual) |

## ORCID / ISNI checklist for Jason
1. ORCID register → employment Seventh City Press / education Mercy.  
2. Add works: Masters X vols + Hawkes (ISBN).  
3. Link Wikidata if offered.  
4. Reply with ORCID iD → agent wires `https://orcid.org/XXXX-XXXX-XXXX-XXXX` into `authorSameAs`.  
5. ISNI already live — do not create a duplicate person record.
