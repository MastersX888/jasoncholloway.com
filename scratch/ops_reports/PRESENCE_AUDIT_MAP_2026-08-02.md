# Presence Audit Map — 2026-08-02

**Desk:** Morgan · **Evidence:** BACKCHANNEL + ops-sweep + authorAuthority + socialProfiles + gr_gate_state  
**Refresh note:** Cursor restart disrupted prior agents; Phone Link **unlinked** by Jason; GR→StoryGraph catalog **COMPLETE**

---

## Legend

| Status | Meaning |
|--------|---------|
| **CLAIMED / LIVE** | Verified presence; no Jason claim action |
| **PARTIAL** | Exists; polish/click remains |
| **UNCLAIMED / OPEN** | Free or low-friction claim still needed |
| **PAID HOLD** | Packet ready; budget gate |
| **DEFERRED** | Explicitly later |

---

## A. Retail & distribution

| Surface | Status | URL / account | BI fields |
|---------|--------|---------------|-----------|
| Amazon KDP Kindle Vol I–III | **LIVE** | ASINs B0H4KYMSM1 / B0H4KQ4YQJ / B0H4L36X21 | `amazon_kindle=live` · omnibus=`n/a` |
| Amazon Author Central | **PARTIAL** | https://www.amazon.com/stores/Jason-Holloway/author/B08P54N4XZ | `ac_us=live` · optional ticket #50898755 |
| IngramSpark print + EPUB | **LIVE** | IngramSpark dashboard | `ingram_pb=live` · `ingram_hc=live` · Jason report ~2026-08-03 afternoon CT · PUB-09/10 done · PUB-11 terms still unverified |
| Google Play Books ×4 | **LIVE** | Play Partner Center | `gplay=live` · ≠ Books Partner |
| Apple Books titles | **LIVE** (via Ingram) | Store listings only | `apple_titles=live` · `apple_asc=deferred_sidelined` |
| Kobo titles | **LIVE** (via Ingram) | Store listings | `kobo_titles=live` · author profile N/A |
| Bookshop.org | **LIVE** | Affiliate + list | `bookshop=live` |
| Google Merchant 10/10 | **LIVE** | Merchant Center | `merchant=live` |

---

## B. Discovery / authority graph

| Surface | Status | URL / account | BI fields |
|---------|--------|---------------|-----------|
| jasoncholloway.com | **LIVE** | https://jasoncholloway.com/ | `site_author=live` |
| seventhcitypress.com | **LIVE** | https://seventhcitypress.com/ | `site_imprint=live` |
| GSC author domain | **LIVE** | `sc-domain:jasoncholloway.com` | `gsc_author=live` · metrics pipeline gap |
| GSC imprint | **LIVE (Claim 4 COMPLETE)** | https://search.google.com/search-console → Domain `sc-domain:seventhcitypress.com` | `gsc_scp=live` · AUTH-01 **CLOSED** ~03:54 CT · sitemap Success · discovered pages=3 hygiene only |
| Wikidata author | **LIVE** | https://www.wikidata.org/wiki/Q140275300 | `wd_author=live` |
| Wikidata trilogy | **LIVE** | https://www.wikidata.org/wiki/Q140276114 | `wd_series=live` |
| ISNI | **LIVE** | https://isni.org/isni/0000000530447935 | `isni=live` |
| Open Library author | **LIVE** | https://openlibrary.org/authors/OL16482975A | `ol_author=live` · works polish optional |
| Goodreads author | **CLAIMED / LIVE** | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway | `gr_author=claimed` · `gr_shelves=live` · website=`https://jasoncholloway.com/` · MKT-02 **closed 2026-08-03** |
| StoryGraph catalog | **CLAIMED / COMPLETE** | https://app.thestorygraph.com/profile/jason_carroll_holloway · import done | `sg_catalog=complete` · series=`optional_librarian` |
| StoryGraph series link | **OPTIONAL** | Ticket draft: `STORYGRAPH_SERIES_TICKET_DRAFT.md` | `sg_series=ticket_optional` |
| Google Books Partner | **LIVE (Claim 3 COMPLETE)** | https://books.google.com/partner → Play Books Partner Center | `gbp_partner=live` · AUTH-06 **CLOSED** · `/a/18360388366044352902` · 4/4 Live · packet CLOSED |
| Google Business Profile | **LIVE (Claim 5 COMPLETE)** | https://business.google.com/locations | `gbp=live` · AUTH-04 **CLOSED** ~04:09 CT · Verified (1) · Seventh City Press · Kansas City, MO, USA · Search KP live · website seventhcitypress.com · **bonus** beyond week bar 3/3 · residual: Complete Info + photos/phone/hours/posts draft-only |
| Apple ASC author link | **DEFERRED / SIDELINED** | https://appstoreconnect.apple.com (Books) · author toolbox https://toolbox.marketingtools.apple.com/en-us/apple-books/us/author/6769561663 | `apple_asc=deferred_sidelined` · PUB-03 · Apple ID create rejected: "Your account cannot be created at this time" for `jason@seventhcitypress.com` · resume later · keep ID **6769561663** · note `APPLE_ID_SETUP_2026-08-03.md` |
| VIAF | **SENT / WAIT** | OCLC — sent 2026-08-01 | `viaf=pending` |
| LoC PCN | **OPEN** | https://www.loc.gov/publish/pcn/ | `loc_pcn=open` · AUTH-08 |
| ORCID | **UNCLAIMED** | https://orcid.org/register | `orcid=open` |
| BookBub author | **VERIFY** | BookBub partner / author | `bookbub=verify` · AUTH-09 |
| Everand | **PARTIAL** | https://www.everand.com/author/988394129/Jason-Carroll-Holloway | `everand=live` · duplicate merge pending |
| Wikipedia / Knowledge Panel | **PARTIAL** | Business Search KP live via GBP | `wp=partial` · business KP live (Claim 5); Wikipedia article still none |

---

## C. Social (Outstand hub)

| Platform | Status | Handle / URL | Outstand ID | BI fields |
|----------|--------|--------------|-------------|-----------|
| Instagram | **LIVE** | https://www.instagram.com/jasonhollowaykc/ | `1vWPG` | `ig=live` |
| X | **LIVE** | https://x.com/jasonhollowaykc | `jaHn2` | `x=live` · metrics token watch |
| Facebook Author | **PARTIAL** | https://www.facebook.com/profile.php?id=61588710027163 | `7BvrW` | `fb_author=live` · username=`open` MKT-00 |
| Facebook SCP | **LIVE** | Seventh City Press | `IwQhX` | `fb_scp=live` |
| Pinterest | **LIVE** | https://www.pinterest.com/seventhcitypress/ | `pxPfM` | `pin=live` · case pins backlog |
| Bluesky imprint | **LIVE** | seventhcitypress | `4RSwi` | `bsky_scp=live` |
| Bluesky author | **LIVE** | jasonhollowaykc | `J15V3` | `bsky_author=live` |
| YouTube | **UNCLAIMED** | — (`SOCIAL_YOUTUBE_URL` empty) | — | `yt=open` |

---

## D. Trade / library (back-channel)

| Surface | Status | Notes | BI fields |
|---------|--------|-------|-----------|
| Edelweiss | **PAID HOLD** | Prep packet exists | `edelweiss=hold` |
| NetGalley | **PAID HOLD** | ~$575 · fill-in ready | `netgalley=hold` |
| LibraryThing Early Reviewers | **UNCLAIMED** | Free-ish review path | `lt_er=open` |
| IndieBound / ABA / MIBA | **DRAFT READY** | Draft 18 · not sent | `aba=draft` |
| OverDrive / Hoopla / etc. | **PASSIVE** | Needs Ingram library flags + reviews | `lib_ebook=passive` |
| Ingram returnability 55% | **UNVERIFIED** | Do not claim in public | `trade_terms=unverified` |

---

## E. Top 5 free-pipeline claims needing Jason

Exact asks only — do these next (StoryGraph catalog already done).

**Tonight order (2026-08-03):** Claim 1 = **Goodreads** (map #5) — **VERIFIED COMPLETE**. Claim 2 = **Apple ASC** (map #2) — **DEFERRED / SIDELINED** (Apple ID create rejected; does not count toward week bar). Claim 3 = **Google Books Partner** (map #1) — **VERIFIED COMPLETE** ~02:57 CT. Claim 4 = **SCP GSC** — **VERIFIED COMPLETE** ~03:54 CT. Claim 5 = **GBP** — **VERIFIED COMPLETE** ~04:09 CT (**bonus**). Week bar: ≥3 of 5 by Fri Aug 9 · **3/3 CLOSED**. Top-5 free claims done except Apple SIDELINED.

| # | Claim | Account / URL | Exact ask |
|---|-------|---------------|-----------|
| 1 | **Google Books Partner** | https://books.google.com/partner → Play Books Partner Center | **COMPLETE (Claim 3 ~02:57 CT)** — AUTH-06 CLOSED. Account `/a/18360388366044352902`; Jason Holloway; catalog 4/4 Live: `9798256008819` / `9798256009625` / `9798256009809` / Hawkes `9798295778926`. Publisher Seventh City Press. Packet CLOSED. |
| 2 | **Apple Books ASC link** | https://appstoreconnect.apple.com → Books · author toolbox https://toolbox.marketingtools.apple.com/en-us/apple-books/us/author/6769561663 | **DEFERRED / SIDELINED (Claim 2)** — Apple ID create rejected: "Your account cannot be created at this time" for `jason@seventhcitypress.com`. Resume later: free Apple ID → ASC Books → My Books; search book Apple IDs 6770156203 / 6770155775 / 6770156974 / 6769561655. Author marketing ID **6769561663** kept. No Developer Program; no tickets tonight. Packet: `packets/APPLE_ASC_AUTHOR_CLAIM_2026-08-01.md` |
| 3 | **Google Business Profile** | https://business.google.com/locations | **COMPLETE (Claim 5 ~04:09 CT)** — AUTH-04 CLOSED · **bonus** beyond 3/3 bar. Verified (1); Seventh City Press · Kansas City, MO, USA; Search KP live; website seventhcitypress.com. NO CSV re-import. NO paid verify/ads. Residual (non-blocking): Complete Info + photos/phone/hours/posts draft-only. Packet CLOSED. |
| 4 | **SCP Search Console** | https://search.google.com/search-console | **COMPLETE (Claim 4 ~03:54 CT)** — AUTH-01 CLOSED. Domain `sc-domain:seventhcitypress.com` verified; sitemap Success (submitted Jul 22, last read Jul 31). Residual: discovered pages=3 (hygiene only). Packet CLOSED. |
| 5 | **Goodreads shelves + website** | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway | **COMPLETE (Claim 1 ~01:22 CT)** — parent browser verified. Website=`https://jasoncholloway.com/`; shelves `foucaults-pendulum-readers`, `literary-conspiracy-thriller`, `prague-thriller-fiction` (4 books each: Vol I–III + omnibus). Bonus: `medieval-manuscript-thriller`, `voynich-manuscript-fiction`. Doc: `GOODREADS_STORYGRAPH_LINK_2026-08-01.md` |

**Honorable (still free):** BookBub verify (AUTH-09) · FB username `jasonhollowaykc` (MKT-00) · ORCID register · LibraryThing Early Reviewers · StoryGraph series ticket (optional).

---

## F. BI field schema (for Groundswell / `/ops`)

```
presence.<channel>.status   ∈ live|partial|open|hold|deferred|pending|n/a
presence.<channel>.url
presence.<channel>.task_id  ∈ AUTH-*|PUB-*|MKT-*|WEB-*
presence.<channel>.owner    ∈ JASON|AGENT|EXT
presence.<channel>.updated  ISO date
```

Priority rollup keys for week dashboard:  
`gsc_scp` · `gbp_partner` · `apple_asc` · `gbp` · `gr_shelves` · `sg_catalog` · `ingram_pb` · `ingram_hc` · `trade_terms` · `netgalley`

---

## G. Catalog constraints (agents)

- **Amazon:** Kindle Vol I–III only — never omnibus on Amazon
- **Print / omnibus:** IngramSpark only
- **StoryGraph:** Catalog complete; series = librarian ticket optional only

*Morgan — presence map refreshed 2026-08-02 ~22:03 CT · Claim 1 (GR) VERIFIED COMPLETE 2026-08-03 ~01:22 CT · Claim 2 DEFERRED/SIDELINED ~02:37 CT · Claim 3 Google Books Partner VERIFIED COMPLETE ~02:57 CT · Claim 4 SCP GSC VERIFIED COMPLETE ~03:54 CT · week 3/3 CLOSED*
