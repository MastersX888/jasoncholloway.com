# Vivian QA Resume — 2026-08-03 (evening)

**Desk:** Vivian (Editorial Quality & Pre-Publication Control) · routed by Morgan  
**Trigger:** Jason — `resume vivian qa`  
**Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md`  
**Queue:** `scratch/ops_reports/VIVIAN_QA_QUEUE_2026-08-02.md`  
**Catalog lock:** Amazon = Kindle Vol I–III only (`B0H4KYMSM1` · `B0H4KQ4YQJ` · `B0H4L36X21`) · Print/omnibus = IngramSpark · **No Amazon omnibus**  
**Scope this session:** Thorough P0 buy/omnibus visual path + adjacent P0/P1 hubs · **no deploy** · no NetGalley · no myth · no social · no money  
**Method:** Live HTML fetch (all P0 buy surfaces 200) + repo registry/cover audit. Subagent browser MCP unavailable (empty tab list) — pixel case-toggle / mobile layout needs **parent Cursor browser** if Jason wants formal §4 screenshot pass.

**Prior separate lane (do not redo):** Field Notes SEO — `PASS WITH NOTES` → **DEPLOYED** (`VIVIAN_QA_FIELD_NOTES_SEO_2026-08-03.md`).

---

## Scoreboard (weekend queue)

| Metric | Count |
|--------|------:|
| Queue size | **45** |
| Cleared this session (**PASS** / **PASS WITH NOTES**) | **10** |
| **BLOCK** this session | **1** (Q-10 live CDN feed) |
| Field Notes SEO (prior lane, not in 0/45) | 1 PASS WITH NOTES · DEPLOYED |
| Still open / not re-verdicted tonight | **34** |
| Prior invent-PASS status | Held — no invented clean PASS |

| Band | Cleared tonight | Still open |
|------|----------------:|-----------:|
| P0 | 8 of 11 | Q-08 regen hold · Q-09 live press PDFs · Q-10 BLOCK until feed deploy |
| P1 site | 2 (Q-12, Q-13) | Q-14–Q-22 |
| P1 SCP | 0 | Q-23–Q-25 |
| P2 | 0 | Q-26–Q-36 |
| P3 | 0 | Q-37–Q-45 |

---

## Verdicts issued tonight

### P0 — Buy / omnibus / registry

| ID | Surface | Verdict | Ready for checklist |
|----|---------|---------|---------------------|
| **Q-01** | Vol I buy | **PASS WITH NOTES** | yes |
| **Q-02** | Vol II buy | **PASS WITH NOTES** | yes |
| **Q-03** | Vol III buy | **PASS WITH NOTES** | yes |
| **Q-04** | Omnibus | **PASS WITH NOTES** | yes |
| **Q-05** | Books hub | **PASS WITH NOTES** | yes |
| **Q-06** | Series hub | **PASS WITH NOTES** | yes |
| **Q-07** | Hawkes monograph | **PASS WITH NOTES** | yes |
| **Q-10** | Google Shopping feed (live CDN) | **BLOCK** | no — deploy corrected feed first |
| **Q-11** | Buy-link registry | **PASS** | yes (registry only) |

### P1 — Home / about

| ID | Surface | Verdict | Ready for checklist |
|----|---------|---------|---------------------|
| **Q-12** | Home | **PASS WITH NOTES** | yes |
| **Q-13** | About | **PASS WITH NOTES** | yes |

---

## Evidence (live 2026-08-03 ~18:00 CT)

All pages HTTP **200**. Snapshots under `scratch/ops/_vivian_live/*.html`.

| Surface | Amazon `dp/` ASINs | Ingram CTAs | Covers (live HTML) | Notes |
|---------|--------------------|-------------|--------------------|-------|
| Vol I | `B0H4KYMSM1` only | PB+HC present | PB · HC jacket · **case 200** | ISBN PB `9798256008048` · HC `9798295800801` · EPUB `9798256008819` · $16.99 / $29.99 / Kindle $6.99 |
| Vol II | `B0H4KQ4YQJ` only | PB+HC | PB · HC · case | Word “seventeen” = fiction (“seventeen meetings”), not Hawkes corpus |
| Vol III | `B0H4L36X21` only | PB+HC | PB · HC · case | Clean |
| Omnibus | **none** | PB+HC only | HC · case 200 | Copy **“No Amazon edition”** · $32.99 PB / $44.99 HC · ISBN PB `9798256072704` · HC `9798295884412` |
| Series hub | Vol I–III only | Omnibus + volume Ingram | Full jacket/case set | Kindle gated on `asin_ebook` |
| Books hub | none | (internal CTAs) | PB + omnibus HC | Omnibus → `/books/masters-x/omnibus/` |
| Home | none | none (internal) | Trilogy + omnibus + Hawkes | CTAs → masters-x / volumes / omnibus / Hawkes |
| Hawkes | none | Ingram + Play | PB/HC/ebook assets | **seventeen** present · sixteen absent |

**Cover HEAD:** `book1-hc-case.png` · `omnibus-hc-case.png` · paperback/HC jackets → **200** on CDN.

**Registry (`buyLinks.ts` / `books.ts`):** Omnibus `asin_ebook: null` · only three Kindle ASINs · print = IngramSpark URLs. Matches live.

---

## Q-10 BLOCK detail (easy fix already in repo)

Live `https://jasoncholloway.com/feeds/google-shopping.csv` still serves **pre–Buy-Direct-flat** prices:

| SKU | Live CDN | Repo / site Buy Direct |
|-----|----------|------------------------|
| hawkes-pb | 14.98 | **12.99** |
| mx2-pb / mx2-hc | 22.99 / 33.99 | **16.99 / 29.99** |
| mx3-pb / mx3-hc | 19.99 / 32.99 | **16.99 / 29.99** |
| mx-omnibus-pb / hc | 36.99 / 49.99 | **32.99 / 44.99** |

Live feed: no Amazon DP · no “sixteen” · seventeen present — channel lock OK; **prices wrong**.  
Repo `public/feeds/google-shopping.csv` already corrected (weekend T23). **No further code fix** — needs Jason Phase 4 **feed-only (or site) deploy**.

---

## Yellow notes (travel with PASS WITH NOTES)

1. **§4 visual:** Case-toggle / mobile CTA stack not re-screenshot'd this session (browser MCP empty in subagent). July 31 mobile/a11y pass still stands; optional parent-browser toggle spot on one volume + omnibus.
2. **Omnibus PB face:** `coverImagePB` uses HC jacket art (`omnibus-hardcover-v3.png`) — intentional until separate PB wrap; not a channel RED.
3. **Kindle CTAs:** Volume pages use raw `<a href=amazon/dp/…>` (not `TrackedBuyLink`) — analytics gap only; identifiers correct.
4. **Case binaries:** Live CDN serves `*-hc-case.png` (HEAD 200 ×4). `git ls-files` shows **no** `*-hc-case.png` tracked — jackets/omnibus HC are tracked; case files are CDN-only / untracked. Include in next scoped deploy commit so they cannot vanish.
5. **Ingram usList vs site flat tier:** Site/feed intentionally flat Buy Direct; Ingram catalog may still show differentiated list — document for trade/PUB-11, do not re-assert returns/55%.

---

## Not touched tonight (remain queue status)

- Q-08 press PDF regen · Q-09 live press CDN  
- Q-14–Q-22 (contact, chapters-sent, Field Notes body, Chamber, robots/sitemap deep, OG render, schema/sameAs, returns)  
- Q-23–Q-25 SCP sibling  
- Q-26–Q-36 Chamber tools / secondary  
- Q-37–Q-45 social/profile checklist (inspect only; no posts)  
- Outbound drafts / NetGalley — out of scope  

---

## Chat-ready summary for Jason

**Scoreboard:** **10 cleared** (1 PASS · 9 PASS WITH NOTES) · **1 BLOCK** (live shopping feed prices) · **34 remaining** · Field Notes SEO already shipped.

**P0 buy path is clear:** Kindle ASINs correct; omnibus has **zero** Amazon product links and states “No Amazon edition”; print CTAs are Ingram; case covers live **200**.

**Approve next:**  
`approve vivian fixes deploy` — **scoped:** ship corrected `public/feeds/google-shopping.csv` (and optionally commit/track case covers if not already in deploy tree). **Not** a full-site A5 reopen.

**Then continue:** `resume vivian qa` → Q-09 live press · Q-14/15 · Q-21 schema · Chamber §1 batch.

**No** full production deploy of unrelated lanes without Phase 4.

---

*Vivian — 2026-08-03 evening · “Nothing goes out the door with the wrong ISBN on it.”*
