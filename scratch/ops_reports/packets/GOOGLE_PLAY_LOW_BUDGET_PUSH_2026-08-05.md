# Google Play low-budget push — APPROVED

**Date:** 2026-08-05  
**Owner:** Morgan → Jason (Phase 4)  
**QC:** Vivian pass required on ad copy before ads go live  
**Status:** Jason approved plan with **incremental spend cap $25** (Google Ads test only)  
**Execution (2026-08-05 night CT):** Phase 0 PASS · Phase 1 PROMO CREATED · Phase 2 BLOCKED (ad blocker on Ads UI)

### Execution log

| Step | Result |
|---|---|
| Partner Center login | `zh5779485@gmail.com` / account `18360388366044352902` |
| Catalog | 4/4 Live — MX I–III $6.99 · Hawkes $9.99 |
| Series | **Masters X** Live · 3 titles · store `https://play.google.com/store/books/series?id=Ucm1HAAAABDl1M` |
| Vol I Play URL | `https://play.google.com/store/books/details?id=3zr1EQAAQBAJ` |
| Promo | **`MX1-Play-199-2026-08`** · ID `48915727` · **Status: Ended** (Jason 2026-08-12 AM CT) · Aug 6–12, 2026 · US · was **$1.99** · ISBN `9798256008819` · **1 unit / $1.39** · store back to list **$6.99** (up to ~24h) |
| Google Ads | Account `ocid=8427080802`. Campaign `#2` id `24114368389` · **Performance Max** · budget **$4.00/day** · geo **US**. **ENABLED 2026-08-06 ~13:40 CT**. Primary **Purchase** goal attached 2026-08-06 ~14:15 CT (conversion ID `18344196783` / label `1wBzCMqEqd0cEK_1mKtE`). Site tag **LIVE** on jasoncholloway.com (`0b44ec2`). Variety **text** added (6 lines). River **images** + **website/social sitelinks** still pending Jason (~7 min). Diagnostics Aug 6 PM: asset group **No ads** · $0 spend · not serving yet. Closeout: `GOOGLE_ADS_CLOSEOUT_MX1_2026-08-06.md`. Hard stop: `$4/day` + `MX1-HardCap-25-Pause`. Strip $1.99 after **2026-08-12**. |

## Hard caps (do not exceed)

| Item | Cap |
|---|---|
| Google Ads test spend | **$25.00 total** (account/campaign budget + hard stop) |
| Daily average if spread | ~$3–5/day over 5–7 days, **or** $25 campaign total budget with end date |
| Campaign type | Search only |
| Landing | Google Play / Google Books Vol I EPUB only |
| Do not run | Performance Max, Display, Demand Gen, YouTube, Shopping |

Money / vendor / public ads: no spend beyond $25 without new Jason approval.

## Catalog targets

| Vol | Title | EPUB ISBN | List | Test role |
|---|---|---|---|---|
| I | Masters X: The Inheritance of Frequency | `9798256008819` | $6.99 | **Promo + ad landing** |
| II | Masters X: The Grimoire | `9798256009625` | $6.99 | Hold list; series pull |
| III | Masters X: The Kingdom | `9798256009809` | $6.99 | Hold list; series pull |

**Landing URL (final):** open Partner Center → copy the live Play Books store URL for ISBN `9798256008819`. Prefer the permanent `play.google.com/store/books/details?...` link over the site search resolver. Fallback if needed: `https://books.google.com/books?vid=ISBN9798256008819`

**Author (public copy):** Jason Carroll Holloway  
**Imprint:** Seventh City Press

---

## Phase 0 — Preflight (Partner Center, $0)

Do before any promo or ads:

1. [ ] Confirm **70% revenue split TOS** accepted (Partner Center banner / settings).
2. [ ] Confirm Vol I–III are **Live** and priced **$6.99** (US + territories as intended).
3. [ ] Confirm **Masters X series** linkage (I → II → III) so bundles / series UX work.
4. [ ] Optional: enable **Play Books Affiliate** from Partner Center homepage (tracking +7% on referred buys).
5. [ ] Copy the exact **Play store details URL** for Vol I into this packet / Ads final URL field.

**Kill if:** Vol I not Live, or series not linked and you planned a bundle.

---

## Phase 1 — Partner Center promo ($0 media)

**Recommended:** Vol I promotional pricing only (II/III stay $6.99).

| Field | Value |
|---|---|
| Type | Promotional pricing |
| Book | `9798256008819` only |
| Promo price (US) | **$1.99** (preferred for $25 ads math) |
| Alt | $0.99 if you want max conversion / weaker royalty |
| Duration | **7 days** overlapping the ad window |
| Countries | Start **US** only for the $25 test (expand later) |
| Name | `MX1-Play-199-2026-08` |

**Optional same window:** Series bundle (e.g. 10–20% off when buying 2–3 Masters X titles) — only if series is linked.

**Promo codes:** not required for this test; keep for social/email later.

After promo is scheduled and live in store (strikethrough visible), proceed to Phase 2.

---

## Phase 2 — Google Ads Search test ($25 hard cap)

### Account / budget setup

1. Google Ads → new or existing account under Seventh City Press / Jason.
2. Campaign: **Search** → Sales / Website traffic → final URL = Vol I Play details URL.
3. Budget: set **campaign total budget = $25** with end date **or** average daily $3–5 and **pause at $25 spent**.
4. Networks: **Search partners OFF**, Display OFF.
5. Location: **United States** (match promo countries).
6. Language: English.
7. Bidding: Maximize clicks with **max CPC cap $0.75** (keeps volume measurable at $25). Switch to Maximize conversions only if conversion tracking is wired.
8. Tracking (minimum): Google Ads conversion import is ideal; if not ready, judge by Partner Center sales during the window + Ads clicks/CTR.

### Keywords (exact + phrase only)

Exact:
- `[masters x the inheritance of frequency]`
- `[jason carroll holloway]`
- `[jason holloway masters x]`
- `[masters x trilogy]`

Phrase:
- `"masters x holloway"`
- `"inheritance of frequency"`
- `"literary thriller prague"`
- `"occult thriller kansas city"`
- `"frequency thriller ebook"`

**Negatives (add day 1):**
- free, pdf, torrent, summary, sparknotes, audiobook (unless targeting audio later), kindle unlimited, audible, textbook, used

Avoid broad match on this budget.

### Ad copy — DRAFT (Vivian must clear before go-live)

**RSA headlines (pick ≤15; keep brand strong):**
1. Masters X — Volume One
2. The Inheritance of Frequency
3. Jason Carroll Holloway
4. Literary Thriller on Google Play
5. Prague. Kansas City. Frequency.
6. EPUB — Google Play Books
7. Start the Masters X Trilogy
8. Seventh City Press
9. Now $1.99 on Google Play *(only while promo live)*
10. Book One of Three

**Descriptions:**
1. A graduate student’s inheritance unlocks classified acoustic research — and a medieval tradition that encoded it. Read Vol I on Google Play.
2. Literary conspiracy thriller by Jason Carroll Holloway. EPUB on Google Play Books. Start with The Inheritance of Frequency.

**Path fields (optional):** `Masters-X` / `Volume-1`

**Claims hygiene:** No Amazon omnibus. No “bestseller.” No unverifiable awards. Price claim must match live promo.

### Vivian QC checklist (ads)

- [ ] Title / author / imprint correct
- [ ] Promo price claim matches Partner Center dates
- [ ] No Kindle/Amazon CTA in this campaign
- [ ] Landing is Play Vol I, not jasoncholloway.com homepage

---

## Phase 3 — Run / stop rules

| Signal | Action |
|---|---|
| Spend hits **$25** | Pause campaign immediately |
| Promo ends | Pause ads same day (or update copy if staying full price — not recommended on this cap) |
| 0 clicks after ~$10 | Pause; check URL / policy / bidding |
| Clicks but 0 Play sales after full $25 | Stop; do not scale; review keywords + landing + price |
| ≥1 attributed Play sale + healthy CTR | Report to Jason; propose next cap (e.g. $50–100) — **do not auto-raise** |

**Success bar for this micro-test (honest):** learning, not profit. At $25 you may get roughly **15–60 clicks** depending on CPC. A single Vol I sale at $1.99 (~$1.39 royalty at 70%) does **not** need to “pay back” the $25; the test asks whether Play + promo + Search can produce a buy at all.

---

## Unit economics reminder

| Price | ~70% royalty | Notes |
|---|---|---|
| $6.99 | ~$4.89 | Full list |
| $1.99 promo | ~$1.39 | Preferred for this test |
| $0.99 promo | ~$0.69 | Max conversion |

Series LTV (II + III at $6.99) is the real upside if Vol I converts.

---

## Execution order (Jason evening checklist)

1. Partner Center Phase 0 checks  
2. Schedule Vol I **$1.99** promo (US, 7 days)  
3. Vivian clears ad RSA  
4. Build Search campaign with **$25** total / hard stop  
5. Go live **only after** promo price is visible on the Play listing  
6. Pause at $25 or promo end  
7. File result note: spend, clicks, CTR, Play sales in window, next-cap recommendation  

---

## Explicitly not approved

- Spend above $25  
- PMax / Display / YouTube / Demand Gen  
- Ads to Amazon Kindle or site homepage as primary landing  
- Permanent list-price cut without separate approval  
- Hawkes monograph in this test
