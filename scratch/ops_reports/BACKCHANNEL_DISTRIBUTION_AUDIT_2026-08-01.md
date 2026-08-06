# Back-Channel Distribution Audit — 2026-08-01

**Desk:** Morgan (verify pass) · **Rule:** evidence over scrum narrative · **No sends/publish**

---

## Part A — Five claims (Jason vs evidence)

| # | Claim | Verdict | Evidence | Date |
|---|-------|---------|----------|------|
| 1 | Apple Books author claim | **NOT DONE** (titles ≠ claim) | Titles **live** via Ingram (`apple-bridge-runbook.md`, iTunes API 2026-07-18). Apple has **no** public author page; App Store Connect link still unchecked. `ops-sweep` PUB-03 open; `ops_rollups` apple_books open; wave1 tracker `[ ] Apple Books author claim`. **Zero** Apple/StoryGraph confirmation emails in gmail/scp/proton. | Titles: 2026-07-18 · Claim: none |
| 2 | StoryGraph author/book claims | **NOT DONE** | MKT-03 open; platform `sg` open; wave1 `[ ] StoryGraph claim`; goodreads-comp-shelves §7 still a to-do. No StoryGraph email. | — |
| 3 | Google Books Partner | **NOT DONE** | AUTH-06 open; platform `gbk` open; ISNI_AUTHORITY_BATCH §4 + wave1 `[ ] Google Books Partner upload`. **Do not conflate with Google Play** (PUB-01 done Jul 31 — 4 ebooks). No “Google Books” partner emails. Jul 30 checklist “Books partner update” = ambiguous / never logged complete. | — |
| 4 | Google Search Console | **SPLIT** | **Author DONE:** `sc-domain:jasoncholloway.com` in PLATFORM_INVENTORY + Groundswell `GSC_SITE_URL` default; platform `gsc` live. **Imprint NOT DONE:** AUTH-01 open; `gsc2` open; layout.tsx google verification still commented. Metrics still **null** (SA/pipeline gap — W31 weekly). | Author property: pre-Jul 16 inventory · SCP: open |
| 5 | Google Business Profile | **NOT DONE** | AUTH-04 open; platform `gbp` open; package only (`seventhcitypress/google_business/IMPORT_INSTRUCTIONS.md` “Before you import”, Jul 12). Inbox: GBP marketing noise Jul 30; **no** import/verify confirmation. | Package: 2026-07-12 |

**Reconcile with scrum:** `LATE_NIGHT_SCRUM_2026-08-01.md` correctly kept these open. Jason’s “already done” batch is **not** supported by ops logs, email, or completion trackers. Likely conflations: Apple **listings** → “claim”; Google **Play** → Books Partner; GSC **author** → both domains.

---

## Part B — Trade / back-channel inventory

### LIVE (retail upload surface — deprioritize)

| Surface | Status |
|---------|--------|
| Amazon KDP Kindle Vol I–III | Live ASINs |
| IngramSpark print+EPUB (omnibus purchase links) | Partial — PB×3 Awaiting Approval; HC×3 Revise Files open |
| Google Play Books ×4 | Live Jul 31 |
| Google Merchant 10/10 | Live |
| Bookshop.org affiliate + list | Live (US indie surface) |
| Apple / Kobo store listings | Live via Ingram (Jul 18) |
| Sites + Field Notes + Chamber | Live |
| Wikidata author+trilogy, ISNI, Goodreads author, OL author | Live / mostly live |
| Social v2 | Live (tiny audience) |

### MISSING / UNVERIFIED (leverage for bookstore & library)

| Channel | Status | Why it matters |
|---------|--------|----------------|
| Ingram **returnability + 55% wholesale** | **UNVERIFIED** | Fact sheet asserts “55%, returns accepted” (`scratch/press_extract/Masters_X_Fact_Sheet.txt`) with **no** Ingram dashboard proof in repo. Non-returnable / shallow discount = **bookstores will not stock**. |
| Ingram PB approve + HC revise | **OPEN P0** | Catalog dirty → no clean ONIX to trade. |
| Ingram keywords / series completeness | Open | Discoverability inside Ingram iPage. |
| Edelweiss | Missing | Primary bookstore buyer catalog — big-box/indie buyers live here. |
| NetGalley | Prep only (paid) | Librarian/reviewer ARCs → reviews → acquisition. |
| LibraryThing Early Reviewers | Missing | Cheap review velocity. |
| Baker & Taylor / Follett | Passive claim only | Needs returnable Ingram + demand; no direct B&T account evidence. |
| OverDrive / Libby / Hoopla / Bibliotheca | Passive / unverified | Library ebook+print paths; need Ingram library flags + reviews. |
| IndieBound / ABA / regional associations | Missing | Beyond Bookshop affiliate — ABA membership, indie pitch. |
| Bowker / Books In Print / Nielsen / Circana | Unverified | Trade data visibility; ISBN agency consistency. |
| Espresso Book Machine / POD bookstore catalogs | Missing | In-store POD path. |
| LoC PCN / CIP / LCCN | Open (AUTH-08) | Library cataloging trust. |
| VIAF cluster | Open (AUTH-07) | Global authority graph. |
| ORCID on site sameAs | Wikidata note only | Academic Hawkes path. |
| Wikipedia / Knowledge Panel | No article; GBP missing | Entity surface for buyers/readers. |
| PW / Booklist / LJ / Shelf Awareness | Missing | Trade review → library/bookstore orders. |
| Foreign rights / agents | Missing | Territory expansion. |
| Audio Findaway / ACX | Deferred (scripts ready) | Library audio + Libro.fm. |
| Amazon A+ / categories / intl AC | Partial / verify | Conversion, not trade placement. |
| Hawkes → WorldCat / CHOICE / uni acquisitions | Missing | Academic monograph channel. |

### Bucketed

| Bucket | Reality |
|--------|---------|
| **Trade-ready prerequisites** | Print files in flight; **returnability/discount unproven**; reviews ~zero; no Edelweiss/NetGalley demand signal. |
| **Back-channel discovery** | NetGalley prep exists; Edelweiss/ABA/trade galleys **not started**. |
| **Entity/authority graph** | ISNI + Wikidata strong; VIAF/PCN/GBP/Books Partner/SCP GSC open. |
| **Retail upload surface** | Amazon/Play/Ingram/Bookshop largely covered — **not** the bookstore problem. |

---

## Part C — Top 10 holes (leverage → bookstore/library)

| Rank | Hole | Leverage | Jason vs agent |
|------|------|----------|----------------|
| 1 | **Verify/set Ingram returnable + ≥50–55% wholesale** on stocked ISBNs | Without this, B&N/indie/library vendors ignore you | **Jason** (dashboard) · agent: checklist + screenshot log |
| 2 | **Approve PB×3 + upload HC×3** (clean catalog) | Dirty Ingram = broken trade feed | **Jason** |
| 3 | **Edelweiss listing** (or Ingram→Edelweiss path) | Buyer discovery back-channel | Agent prep metadata · Jason account/pay |
| 4 | **NetGalley ARC** (Vol I + Hawkes) | Librarian/reviewer copies → reviews | Agent pack · Jason pay/approve |
| 5 | **LoC PCN** as Seventh City Press | LCCN → WorldCat librarian trust | **Jason** apply · agent form prep |
| 6 | **Google Books Partner** (≠ Play) | Preview/index surface for discovery | **Jason** |
| 7 | **Trade galley path** (PW / Booklist / LJ / Shelf Awareness) | Acquisition signal for libraries | Agent pitches · Jason approve send |
| 8 | **VIAF + ORCID wire + OL sameAs** | Authority graph for catalogs | Agent prep · Jason VIAF email |
| 9 | **IndieBound/ABA + regional bookseller pitch** (KC/Heartland) | Indie shelves before big-box | Agent kit · Jason local voice |
| 10 | **Findaway (not just ACX)** for library audio | Libby/Hoopla audio channel | Later · agent can stage |

---

## Pushback — “foundation almost closed” is wrong

Still incorrectly assumed if called complete:

1. **Trade terms** asserted in press kit without dashboard proof  
2. **Ingram print path** not closed (PB approve + HC revise)  
3. **Zero trade buyer surfaces** (Edelweiss / NetGalley / ABA)  
4. **Library authority** incomplete (PCN, VIAF; WorldCat passive only)  
5. **Discovery claims** Jason thinks done (StoryGraph, Books Partner, GBP, SCP GSC, Apple ASC) — **still open**  
6. **Email capture** unwired — every interested visitor lost  
7. **Review / demand signals** ~absent — big-box needs sell-through story  

**Correct frame:** Digital retail + web/entity foundation is **strong for an indie**. Trade / library / big-box **pipeline is not started**. Those are different games.

---

## Ops patches this pass

- `lib/data/ops-sweep.ts` — clarify Apple titles vs ASC; Play ≠ Books Partner; GSC split; GBP still open; add trade term + Edelweiss/NetGalley tasks  
- `groundswell-monitor/public/data/ops_rollups.json` — discovery claim verdicts + trade holes  
- This file = brief of record
