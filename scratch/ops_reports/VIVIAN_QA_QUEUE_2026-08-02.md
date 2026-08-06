# Vivian QA Queue — Week of 2026-08-03
**Desk:** Morgan → Vivian · **Opened:** 2026-08-02 ~22:40 CT (T22/T23)  
**Trigger:** Jason — consolidation plan **accepted** → QA phase prep  
**Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md`  
**Catalog lock:** Amazon = Kindle Vol I–III only (`B0H4KYMSM1` · `B0H4KQ4YQJ` · `B0H4L36X21`) · Print/omnibus = IngramSpark · **No Amazon omnibus**  
**Rule:** No publish/send/deploy without Vivian PASS + Jason Phase 4. This queue is QC only.

**Prior QC refs:**  
- `editorial/VIVIAN_QA_WEBSITE_2026-07-31.md`  
- `VIVIAN_QC_PRESS_AND_S6_FOLLOWUP_2026-08-01.md`  
- `VIVIAN_QC_WAIT_WINDOW_2026-08-01.md`  
- `press_extract/VIVIAN_QC_PRESS_DEPLOY_2026-08-02.md`  
- `editorial/MARKETING_THEME_AUDIT_2026-07-31.md`

---

## Priority bands

| Band | Meaning |
|------|---------|
| **P0** | Money/reputation risk if wrong (buy links, ASIN/ISBN, omnibus channel, press facts) |
| **P1** | High-traffic / discovery surfaces (home, series hub, Field Notes index, schema/feeds) |
| **P2** | Supporting pages + Chamber tools |
| **P3** | Social bio / claim checklist only (no auto-post) |

**Status values:** `pending` · `agent_auto_ok` · `vivian_needed` · `PASS` · `PASS WITH NOTES` · `BLOCK`

---

## P0 — Catalog / commerce / press (do first)

| ID | Surface | Path / URL | Risk | Vivian checklist refs | Status |
|----|---------|------------|------|----------------------|--------|
| Q-01 | Masters X Vol I buy page | `/books/masters-x/the-inheritance-of-frequency/` → https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/ | Wrong Kindle ASIN; print routed to Amazon; cover mismatch HC/PB/case | §5 ISBN/ASIN/link · §4 visual covers · RED: wrong ASIN / channel | **PASS WITH NOTES** 2026-08-03 — live ASIN `B0H4KYMSM1` + Ingram PB/HC; case cover CDN 200; §4 screenshot optional (parent browser) · see `VIVIAN_QA_RESUME_2026-08-03.md` |
| Q-02 | Masters X Vol II buy page | `/books/masters-x/the-grimoire/` | Same as Q-01 · ASIN `B0H4KQ4YQJ` | §5 · §4 · RED channel | **PASS WITH NOTES** 2026-08-03 — live ASIN `B0H4KQ4YQJ` + Ingram; case 200 |
| Q-03 | Masters X Vol III buy page | `/books/masters-x/the-kingdom/` | Same · ASIN `B0H4L36X21` | §5 · §4 · RED channel | **PASS WITH NOTES** 2026-08-03 — live ASIN `B0H4L36X21` + Ingram; case 200 |
| Q-04 | Omnibus page | `/books/masters-x/omnibus/` | **Amazon omnibus claim** (BLOCK if present); wrong PB/HC ISBN; price drift vs $32.99 PB / $44.99 HC | §5 · RED: omnibus on Amazon | **PASS WITH NOTES** 2026-08-03 — zero Amazon DP; “No Amazon edition”; $32.99/$44.99; ISBNs lock; PB face = HC art (yellow) |
| Q-05 | Books hub | `/books/` | Aggregate wrong CTAs; Hawkes “sixteen”; omnibus Amazon | §1 fact · §5 · §2 brand | **PASS WITH NOTES** 2026-08-03 — omnibus → site path only; no Amazon DP |
| Q-06 | Series hub | `/books/masters-x/` | Kindle CTAs for all volumes; cover showcase mismatch | §5 · §4 | **PASS WITH NOTES** 2026-08-03 — Kindle Vol I–III only; omnibus Ingram BuyDirect; jackets+cases wired |
| Q-07 | Hawkes monograph | `/books/hawkes-monograph/` | “sixteen” vs **seventeen** novels; any Amazon ASIN (none allowed) | §1 · §5 · RED wrong identifier | **PASS WITH NOTES** 2026-08-03 — seventeen; no Amazon; Ingram+Play ISBNs live |
| Q-08 | Press kit PDFs (repo) | `public/press-kit/*.pdf` + `seventhcitypress/public/press-kit/*.pdf` | 55%/returns language; omnibus price; ISBN matrix | §1 · §5 · PUB-11 hold | **agent_auto_ok** repo (2026-08-02 Vivian PASS) — **vivian_needed** if regenerating |
| Q-09 | Press kit PDFs (live CDN) | https://jasoncholloway.com/press-kit/… · https://seventhcitypress.com/press-kit/… | Live bytes lag repo; trade-term reintroduction | §5 · RED broken/staging | **PASS WITH NOTES** 2026-08-05 — JA+SCP PDF both 200 · identical bytes; OCR not re-run · see `VIVIAN_QA_RESUME_2026-08-05.md` |
| Q-10 | Google Shopping feed | `public/feeds/google-shopping.csv` → https://jasoncholloway.com/feeds/google-shopping.csv | Hawkes sixteen; wrong ISBN/price; Amazon omnibus SKU | §5 · §1 | **PASS WITH NOTES** 2026-08-05 AM — live after scoped deploy `a2477e0d` / commit `1a86e90`: Buy Direct flat (hawkes-pb 12.99 · mx1–3 16.99/29.99 · hawkes-hc 24.99). Channel OK. |
| Q-11 | Buy-link registry | `lib/data/buyLinks.ts` + `lib/data/books.ts` | Extra Kindle ASINs; omnibus ASIN non-null; print ASINs | §5 · RED | **PASS** 2026-08-03 — Vol I–III ASINs only; omnibus `asin_ebook: null`; matches live buy pages |

---

## P1 — Core site + SEO surfaces

| ID | Surface | Path / URL | Risk | Vivian checklist refs | Status |
|----|---------|------------|------|----------------------|--------|
| Q-12 | Home | `/` → https://jasoncholloway.com/ | Brand/CTA drift; false channel claims | §2 · §5 · §4 visual | **PASS WITH NOTES** 2026-08-03 — CTAs internal only (masters-x / volumes / omnibus / Hawkes); seventeen; no Amazon; §4 pixel optional |
| Q-13 | About | `/about/` | Bio/name; imprint wording; social handles | §2 · §5 | **PASS WITH NOTES** 2026-08-03 — Jason Carroll Holloway · Seventh City Press · seventeen; no Amazon CTAs; SocialLinks via `socialProfiles.ts` |
| Q-14 | Contact + press download | `/contact/` | Press-kit href; form copy commitments | §5 · §2 · Claire flag | **PASS WITH NOTES** 2026-08-05 — live press href + names/emails OK · Claire: review-copy language OK |
| Q-15 | Chapters-sent / lead magnet | `/chapters-sent/` | EPUB path broken; Kindle send copy wrong | §5 · §1 | **PASS WITH NOTES** 2026-08-05 — EPUB + Distribution File; Send-to-Kindle accurate; omnibus site-only; still absent from `sitemap.ts` |
| Q-16 | Field Notes index | `/field-notes/` | Fiction/research boundary; internal link rot | §1 · §2 FIELD NOTE framing | **agent_auto_ok** routes + hub OG exist; CTAs → masters-x/chamber — **vivian_needed** §2 framing |
| Q-17 | Field Notes ×12 essays | `/field-notes/{slug}/` (see § Routes) | Unsourced claims; boundary language; broken refs | §1 · §2 | **agent_auto_ok** all 12 `page.tsx` + `/og/field-notes/{slug}.png` present; zero Amazon/sixteen — **vivian_needed** §1/§2 content |
| Q-18 | Chamber hub | `/chamber/` | Overclaim scientific certainty; link rot | §1 · §2 | **PASS WITH NOTES** 2026-08-05 — live Research Note + literary speculation disclaimer; no Amazon DP |
| Q-19 | robots + sitemap | `app/robots.ts` · `app/sitemap.ts` · `/sitemap/` · `/sitemap.xml` | `/ops` leakage; missing/extra public routes; trailing-slash drift | §5 · Nina | **agent_auto_ok** `/ops` disallowed; HTML `/sitemap/` chamber+returns filled — **vivian_needed** completeness (chapters-sent absent from xml) |
| Q-20 | OG images | `app/opengraph-image.tsx` · `app/books/masters-x/**/opengraph-image.tsx` · Hawkes OG | Wrong cover; wrong title/volume | §4 · §5 | **agent_auto_ok** wiring + assets (home/series/[slug]/Hawkes generators; FN ×12+hub PNG; omnibus metadata cover) — **vivian_needed** rendered visual |
| Q-21 | JSON-LD / sameAs | `lib/seo/*` · `lib/data/authorAuthority.ts` · SCP home schema | Person.sameAs OL; series QID on Person; Amazon omnibus Offer | §5 · Nina cross-flag | **PASS WITH NOTES** 2026-08-05 — OL in live HTML; StoryGraph not in sameAs; series QID not on Person |
| Q-22 | Returns | `/returns/` | Policy vs Ingram reality; money language | §1 · money never auto | **PASS WITH NOTES** 2026-08-05 AM — live Ingram Share & Sell (non-refundable/non-returnable · Report an Issue); old 30-day copy gone. Aligns with GMC defective-only. |

---

## P1 — Imprint site (sibling)

| ID | Surface | Path / URL | Risk | Vivian checklist refs | Status |
|----|---------|------------|------|----------------------|--------|
| Q-23 | SCP home | `seventhcitypress/app/page.tsx` → https://seventhcitypress.com/ | ASIN table drift; omnibus Amazon; footer contrast (prior note) | §5 · §2 · §4 | **pending** (ASINs match Vol I–III in source) |
| Q-24 | SCP contact | `seventhcitypress/app/contact/` | Press kit paths; layout blowout regression | §4 · §5 | **pending** |
| Q-25 | SCP press kit + redirects | `/press` → SCP; PDF 301 chain | Live PDF stale; broken redirect | §5 | **pending** |

---

## P2 — Chamber tools + secondary

| ID | Surface | Path / URL | Risk | Vivian checklist refs | Status |
|----|---------|------------|------|----------------------|--------|
| Q-26 | Folio visualizer | `/chamber/folio-visualizer/` | Misleading “research” framing | §1 | **agent_auto_ok** route + FN links resolve — **vivian_needed** §1 framing |
| Q-27 | Global map | `/chamber/global-map/` | Same | §1 | **agent_auto_ok** route + FN links resolve — **vivian_needed** §1 |
| Q-28 | Harmonic stack | `/chamber/harmonic-stack/` | Same | §1 | **agent_auto_ok** route + ars-notoria link — **vivian_needed** §1 |
| Q-29 | Harmonic derivations | `/chamber/harmonic-derivations/` | Same | §1 | **agent_auto_ok** route; link label “Reading Sequence” (match dest) — **vivian_needed** §1 |
| Q-30 | Reading sequence | `/chamber/reading-sequence/` | Count framing | §1 · §5 | **PASS WITH NOTES** 2026-08-05 AM — live Jason C framing present (fifteen / twenty-three). |
| Q-31 | Research archive | `/chamber/research-archive/` | Lead magnet redirect to chapters-sent | §5 | **agent_auto_ok** redirect; Part I keeps **23**; link → “Core Reading Sequence (15)” — **vivian_needed** spot vs Q-30 (aligned to Jason C; no PASS) |
| Q-32 | Schumann baseline | `/chamber/schumann-baseline/` | Scientific overclaim | §1 | **agent_auto_ok** route exists — **vivian_needed** §1 |
| Q-33 | Tremor analysis | `/chamber/tremor-analysis/` | Same | §1 | **agent_auto_ok** route exists — **vivian_needed** §1 |
| Q-34 | Comp / SEO landing | `/books/books-like-foucaults-pendulum/` | Comp-title policy; Amazon keyword bleed | §2 · §1 | **agent_auto_ok** no amazon.com/dp / sixteen — **vivian_needed** §2 comp policy |
| Q-35 | HTML sitemap page | `/sitemap/` | Orphan / stale links | §5 | **agent_auto_ok** FIXED missing chamber tools + `/returns` — **vivian_needed** spot |
| Q-36 | Ops dashboard (not public) | `/ops/` (robots disallow) | Must stay noindex / disallowed | Nina · robots | **agent_auto_ok** disallowed — do not market |

---

## P3 — Social bios / profile claims (checklist only — no auto-post)

| ID | Surface | URL / action | Risk | Vivian checklist refs | Status |
|----|---------|--------------|------|----------------------|--------|
| Q-37 | Instagram bio | https://www.instagram.com/jasonhollowaykc/ | Wrong site URL; Amazon omnibus | §5 · §2 | **pending** checklist |
| Q-38 | X bio | https://x.com/jasonhollowaykc | Same | §5 | **pending** checklist |
| Q-39 | Facebook author page | https://www.facebook.com/profile.php?id=61588710027163 | Same; username claim open | §5 | **pending** checklist |
| Q-40 | Pinterest | https://www.pinterest.com/seventhcitypress/ | Imprint vs author confusion | §2 · §5 | **pending** checklist |
| Q-41 | Bluesky (Outstand) | via Outstand hub | Bio link drift | §5 | **pending** checklist |
| Q-42 | Goodreads author | https://www.goodreads.com/author/show/20924993.Jason_Carroll_Holloway | Website field; shelves; wrong edition Amazon | §5 · free-claim packet | **pending** (Jason click) |
| Q-43 | Amazon Author Central | https://www.amazon.com/stores/Jason-Holloway/author/B08P54N4XZ | Extra formats; omnibus listing | §5 · RED omnibus | **pending** checklist |
| Q-44 | Bookshop list | Bookshop Masters X list (affiliate 126177) | ISBN/price mismatch | §5 | **pending** |
| Q-45 | YouTube | UNCLAIMED | Do not invent channel this week | defer | **n/a** |

---

## Field Notes slug list (Q-17)

`subtropolis` · `111-hz` · `voynich-manuscript` · `ars-notoria` · `strahov-monastery` · `codex-gigas` · `kansas-city-locations` · `oscar-01` · `u2-test-pilots` · `cymatics` · `gospel-of-thomas` · `meramec-caverns`

---

## Agent auto-check log (2026-08-02 ~22:40 CT) — no publish

| Check | Result |
|-------|--------|
| Kindle ASINs in `buyLinks.ts` / live buy wiring | **OK** — only `B0H4KYMSM1` · `B0H4KQ4YQJ` · `B0H4L36X21` |
| Amazon `dp/` URLs in app/lib/components/SCP | **OK** — Vol I–III only + Author Central store |
| Omnibus × Amazon product DP | **OK** — zero matches |
| Internal `<a href="/…">` vs local `page.tsx` routes | **OK** — 0 possible broken |
| Shopping feed “sixteen” | **OK** — zero; “seventeen” present |
| Legacy `content/catalog.ts` | **FIXED** — removed stale print ASINs; Kindle ASINs on ebook rows; omnibus $32.99/$44.99; Hawkes “seventeen”; (unused by app imports — landmine cleared) |
| `/chapters-sent/` in sitemap.xml generator | **NOTE** — absent; log for Nina/Vivian (may be intentional thank-you) |

### Agent auto-check log (2026-08-02 ~22:50 CT) — Top-5 SAFE QA — no publish

| Check | Result |
|-------|--------|
| Q-01–Q-03 buy pages / `books.ts` Kindle wiring | **OK** — ASINs only Vol I–III; print = IngramSpark; Kindle CTA gated on `asin_ebook` |
| Q-04 omnibus | **OK** — zero `amazon.com/dp`; copy “No Amazon edition”; Buy Direct $32.99 PB / $44.99 HC |
| Q-05 / Q-06 / Q-12 hubs + home | **OK** — CTAs internal; covers present under `public/covers/*`; no omnibus Amazon |
| Q-07 Hawkes | **OK** — “seventeen” / “17 novels”; `asin_ebook: null`; Ingram + Google Play only |
| Q-10 shopping feed prices | **FIXED** — 7 SKUs were Ingram `usList` (Vol II/III + omnibus MSRP + Hawkes 14.98) vs site Buy Direct flat tier; now match `books.ts` IS prices |
| `content/catalog.ts` Vol II/III prices | **FIXED** — $22.99/$33.99 and $19.99/$32.99 → flat $16.99/$29.99 (same class as prior landmine) |
| Spot: `robots.ts` | **OK** — `/ops` disallowed |
| Spot: `sitemap.ts` | **OK** — trailing slash; chapters-sent still absent (Nina note) |
| Spot: OG + TrackedBuyLink / BuyDirectButton | **OK** — wired; Kindle raw `<a>` on volume pages (analytics gap only — not identifier bug) |
| Note for Vivian | Ingram catalog `usList` still differentiated (Vol II PB 22.99 etc.); site/feed intentionally flat-tier Buy Direct — confirm before Phase 4 deploy |

### Agent auto-check log (2026-08-02 ~22:55 CT) — Post–Top-5 SAFE QA — no publish

| Check | Result |
|-------|--------|
| Q-16/Q-17 Field Notes | **OK** — all 12 slugs have `page.tsx`; all 12 + hub OG PNGs under `public/og/field-notes/`; zero Amazon DP / “sixteen”; internal chamber/masters-x links resolve |
| Q-18 + Q-26–Q-33 Chamber | **OK** — hub + 8 tools present; no omnibus Amazon; research-archive lead magnet → `chapters-sent` |
| Q-13 About | **OK** — “seventeen novels”; no Amazon CTAs; portrait `JasonCHolloway-v2.png` exists |
| Q-14 Contact | **OK** — press kit PDF path exists in `public/press-kit/`; `_redirects` also 301s `/press-kit/*` → SCP when no built asset |
| Q-15 Chapters-sent | **OK** — EPUB + `The_Distribution_File.pdf` present; Kindle Send-to-Kindle copy factual; omnibus → site path only |
| Q-22 Returns | **OK** — page+MerchantReturnPolicy JSON-LD; money language left for Vivian |
| Q-35 HTML sitemap | **FIXED** — added missing chamber tools (derivations, tremor, reading-sequence, research-archive) + `/returns` |
| Q-20 OG existence | **OK** — home/series/[slug]/Hawkes `opengraph-image.tsx`; omnibus uses metadata cover image; FN assets complete |
| Redirects / `_headers` | **OK** — blog→FN targets exist; epub alias; HSTS + og/field-notes JPEG Content-Type note intact |
| SocialLinks vs `socialProfiles.ts` | **OK** — Footer uses `SocialLinks` → `getActiveSocialLinks()`; parity with `authorAuthority.ts` IG/FB/X/Pinterest URLs |
| Amazon omnibus DP (app/components/lib) | **OK** — still zero product DP for omnibus; Kindle DP only via `asin_ebook` on volume pages |
| **FIXED** Chamber hub | “five interactive layers” → **six** (matches Layer I–VI panels); metadata aligned |
| **FIXED** Reading sequence intro | Removed contradictory “Ars first/last + twenty-one texts” (23-math leftover) vs 15-item list |
| **FIXED** Harmonic derivations footer | “Twenty-Three Text Reading Sequence” → “The Reading Sequence” (match destination) |
| Note for Vivian | **Jason C (2026-08-02 ~23:12 CT):** chamber = core **15**; novels/archive/Strahov = full **23**. Implemented + CANON locked. Spot-check new framing copy; **do not invent PASS** |
| Note for Vivian | **Canon fix (2026-08-02 ~23:15 CT):** Strahov Field Note — `Andrew Vance` → **Andrew Chen** (`app/field-notes/strahov-monastery/page.tsx`); CANON §Distribution File compiler. No publish. |

---

## Suggested Vivian order this week

1. Q-01 → Q-04 (buy + omnibus) + Q-11 registry spot-check  
2. Q-08/Q-09/Q-10 press + feed live  
3. Q-12 home + Q-06 series hub visual  
4. Q-07 Hawkes seventeen  
5. Q-21 schema/sameAs after any presence-claim URL changes  
6. Q-17 Field Notes batch + Q-18 Chamber  
7. Q-23–Q-25 SCP  
8. Q-37–Q-44 social/profile checklist (no posts)

**Outbound drafts held for separate Vivian pass (not site surfaces):** Hawkes academic 14/15 · ABA 18 · Shelf Awareness — send only after Jason picks recipients/budget. NetGalley **budget HOLD**.

---

## Queue size

| Band | Items |
|------|------:|
| P0 | 11 |
| P1 site+SEO | 11 |
| P1 SCP | 3 |
| P2 | 11 |
| P3 social/claims | 9 |
| **Total** | **45** |

### Vivian progress (2026-08-03 evening)

| Status | Count |
|--------|------:|
| **PASS** | 1 (Q-11) |
| **PASS WITH NOTES** | 9 (Q-01–Q-07, Q-12, Q-13) |
| **BLOCK** | 1 (Q-10 live feed) |
| Cleared this resume | **10** |
| Remaining open | **34** (+ Q-10 blocked pending deploy) |

Full write-up: `VIVIAN_QA_RESUME_2026-08-03.md`

---

## Vivian resume log (2026-08-03 evening) — no publish

| Check | Result |
|-------|--------|
| Q-01–Q-04 live buy/omnibus HTML | **PASS WITH NOTES** — ASINs lock; omnibus zero Amazon DP + “No Amazon edition”; Ingram print; prices $16.99/$29.99 volumes · $32.99/$44.99 omnibus |
| Case cover CDN | **OK** — `book1-hc-case.png` / `omnibus-hc-case.png` HEAD 200 |
| Q-05 / Q-06 / Q-12 hubs + home | **PASS WITH NOTES** — internal CTAs; Kindle only on volumes/series |
| Q-07 Hawkes | **PASS WITH NOTES** — seventeen; no Amazon |
| Q-11 registry | **PASS** |
| Q-13 About | **PASS WITH NOTES** |
| Q-10 live shopping feed | **BLOCK** — stale prices on CDN vs repo Buy Direct flat (fix already in `public/feeds/google-shopping.csv`) |
| Browser §4 screenshots | **Deferred** — subagent browser MCP empty; parent Cursor browser optional |
| Full report | `scratch/ops_reports/VIVIAN_QA_RESUME_2026-08-03.md` |

---

## Vivian resume log (2026-08-05 AM) — scoped deploy cleared BLOCKs

| Check | Result |
|-------|--------|
| Deploy | Pages `a2477e0d` · commit `1a86e90` · production |
| Q-10 live shopping feed | **PASS WITH NOTES** — Buy Direct flat live |
| Q-22 returns | **PASS WITH NOTES** — Ingram Share & Sell live |
| Q-30 reading sequence | **PASS WITH NOTES** — Jason C 15/23 framing live |
| Full report | `scratch/ops_reports/VIVIAN_QA_RESUME_2026-08-05.md` |

*Morgan — QA queue opened 2026-08-02 · Vivian resume 2026-08-03 · post-deploy clear 2026-08-05 AM · update statuses in place; do not fork.*
