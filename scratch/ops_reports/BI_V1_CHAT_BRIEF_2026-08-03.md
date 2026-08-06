# SCP Business BI — Chat Brief (v1)

**Snapshot:** 2026-08-02 · CT  
**Primary deliverable:** This brief in chat (no file hunt required).  
**Optional visual:** Cursor canvas `scp-bi-v1` — see fallback at bottom.

---

## Headline

**49% presence live (22/45 channels).** All **5 free-claim packets are ready** but **0 closed** — bottleneck is **Jason click** (~59 min est.). **Catalog lock holds** (3 Kindle ASINs only; omnibus Ingram-only). **QA: 0 PASS** — Vivian needed on 29 items before Phase 4 deploy.

---

## A. Presence coverage

| Bucket | Count | Meaning |
|--------|------:|---------|
| **Live / claimed** | **22** | Verified; no claim action needed |
| Partial | 4 | Exists; polish or click remains |
| **Open / unclaimed** | **9** | Free or low-friction claims still needed (includes Top-5) |
| Hold / pending | 3 | NetGalley (~$575), Edelweiss, VIAF sent |
| Verify / other | 7 | BookBub verify, trade terms, deferred YouTube, etc. |
| **Total channels** | **45** | |

**By platform bucket**

| Bucket | Live | Partial | Open | Other |
|--------|-----:|--------:|-----:|------:|
| Retail | 6 | 3 | 0 | 1 |
| Authority | 9 | 1 | 7 | 4 |
| Social | 7 | 0 | 1 | 0 |
| Trade | 0 | 0 | 1 | 5 |

**RED gates (do not violate)**

- **Omnibus ≠ Amazon** — catalog lock; never list omnibus on Amazon
- **NetGalley PAID HOLD** — no auto-pay (~$575)
- **Trade 55%/returnable** — unverified until PUB-11; do not assert publicly

**Already closed:** StoryGraph catalog = COMPLETE (do not reopen)

---

## B. Free-pipeline Top-5 status

**Funnel:** Packet ready **5** → Jason click **0** → Verified live **0** → Metrics flowing **0**  
**Bottleneck:** `jason_click`  
**Week goal:** ≥3 of Top-5 closed by **Fri 2026-08-09**

| # | Claim | Stage | URL | Est. |
|---|-------|-------|-----|-----:|
| 1 | **Google Books Partner** | packet_ready | books.google.com/partner | 12 min |
| 2 | **Apple Books ASC** | packet_ready | appstoreconnect.apple.com | 10 min |
| 3 | **Google Business Profile** | packet_ready | business.google.com | 15 min |
| 4 | **SCP Search Console** | packet_ready | search.google.com/search-console | 12 min |
| 5 | **Goodreads shelves + website** | packet_ready | goodreads.com/author/…20924993 | 10 min |

---

## C. Catalog SKU lock

**Amazon:** Kindle Vol I–III only

| Vol | Kindle ASIN | PB | HC | EPUB | Ingram status |
|-----|-------------|----|----|------|---------------|
| I Inheritance | B0H4KYMSM1 | 9798256008048 | 9798295800801 | 9798256008819 | PB **awaiting approval** · HC **revise files** |
| II Grimoire | B0H4KQ4YQJ | 9798256009953 | 9798295812675 | 9798256009625 | PB **awaiting approval** · HC **revise files** |
| III Kingdom | B0H4L36X21 | 9798256010072 | 9798295812705 | 9798256009809 | PB **awaiting approval** · HC **revise files** |
| Omnibus | **n/a** | 9798256072704 | 9798295884412 | — | Ingram only · links live |
| Hawkes monograph | **n/a** | 9798295778247 | 9798349308444 | 9798295778926 | Play + Ingram live · 17 novels |

- **3 Kindle ASINs** on Amazon; **0 omnibus** on Amazon (hard lock)
- **Sales CSV:** KDP awaiting upload; Ingram awaiting approval gate — **no units shown / not invented**

---

## D. QA gates (Vivian)

**45 items total · PASS = 0** (not invented)

| Primary gate | Count |
|--------------|------:|
| **vivian_needed** | **29** |
| pending | 13 |
| agent_auto_ok only | 2 |
| n/a | 1 |
| PASS | **0** |

**Vivian-first order (suggested):** Q-01→Q-04 buy + omnibus · Q-11 registry · Q-08/09/10 press + feed · Q-12 home · Q-06 series · Q-07 Hawkes seventeen

**Blockers:** PUB-11 Ingram 55%/returnable screenshots (Jason) · deploy hold until Vivian PASS · live press CDN lags repo (Q-09)  
**Cleared ~2026-08-03 afternoon CT:** Ingram PUB-09 / PUB-10 — all titles LIVE/APPROVED (Jason report)

---

## E. What Jason should do next (exact clicks)

### Tonight / this week — Top-5 free claims (~59 min total)

Do these in order; each has a step packet in ops if you want detail:

1. **Google Books Partner** → books.google.com/partner → Apply as **Seventh City Press**; link EPUB ISBNs **9798256008819 / 9798256009625 / 9798256009809** + Hawkes **9798295778926** (~12 min)

2. **Apple ASC** → appstoreconnect.apple.com → Books dashboard → confirm Ingram titles linked to publisher account (~10 min)

3. **Google Business Profile** → business.google.com → Import CSV from seventhcitypress/google_business/; start verify (service area KC MO) (~15 min)

4. **SCP Search Console** → search.google.com/search-console → Add **Domain** property **seventhcitypress.com** → Cloudflare DNS TXT → submit sitemap.xml (~12 min)

5. **Goodreads** → goodreads.com/author/show/20924993.Jason_Carroll_Holloway → Website = **https://jasoncholloway.com/**; add shelves: **foucaults-pendulum-readers**, **literary-conspiracy-thriller**, **prague-thriller-fiction** (~10 min)

**Success bar:** Close **≥3 of 5** by Fri Aug 9.

### Publishing blockers (when ready)

- ~~**IngramSpark PUB-09:** Approve paperback Vol I–III~~ → **DONE LIVE** ~2026-08-03 afternoon CT
- ~~**IngramSpark PUB-10:** Revise hardcover files Vol I–III~~ → **DONE LIVE** ~2026-08-03 afternoon CT
- **PUB-11:** Screenshot returnability / wholesale % (do not assert in press)
- After Ingram approval → upload KDP + Ingram sales CSV to Groundswell Intake

### Do NOT auto

- NetGalley pay (~$575)
- Public chart / site deploy until **Vivian PASS** + Phase 4 evening checklist

---

## How to open the canvas (optional)

If the canvas didn’t open automatically: **Cursor → Open File → `canvases/scp-bi-v1.canvas.tsx`**

**Going forward:** Treat **this chat brief** as the primary deliverable; canvas is supplementary.

---

*Morgan · BI v1 chat brief · 2026-08-03 · Sources: scratch/ops_reports/bi/*.json · VISUALIZATION_PHASE_KICKOFF_2026-08-02*
