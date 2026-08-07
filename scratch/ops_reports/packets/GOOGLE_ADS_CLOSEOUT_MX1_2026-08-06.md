# Google Ads MX1 Play — closeout (finished 2026-08-06 evening)

**Campaign:** `#2` / `24114368389` · Performance Max · **Enabled** · $4/day  
**Asset group:** `6737647919` · **Pending / under review** (normal after creative + signal edits)  
**Hard cap:** `MX1-HardCap-25-Pause` (ID `61290357`) — Pause when Cost > $24  
**Promo:** `MX1-Play-199-2026-08` · $1.99 through **2026-08-12**  
**Final URL:** Play Vol I `https://play.google.com/store/books/details?id=3zr1EQAAQBAJ`  
**Verified finish pass:** 2026-08-06 ~19:45 CT

---

## Verdict

**$25 test is finished for our scope.** Campaign is enabled with River creatives, SCP logo, search themes, audience signal, purchase goal + site tag, and hard $25 pause rule. Google still has the asset group **under review**; expect **Eligible (Limited)** / learning / Ad Strength Poor–Average until review clears and conversion traffic exists. Do **not** chase Excellent for this test.

Spend at closeout: **$0**.

---

## Confirmed live (agent-finished)

| Item | Status |
|---|---|
| Final URL | Play Vol I ✅ |
| Images | River landscape `1200x630` + square `1200x1200` in asset group ✅ |
| Logo | `scp-logo-1200x1200` (not rose-window) ✅ |
| Copy | Masters X / Holloway / $1.99 variety; optional **A Literary Thriller** ✅ |
| Search themes | literary thriller · jason holloway · inheritance of frequency · jason carroll holloway · +2 ✅ |
| Audience signal | **MX1 Literary Readers** — Book Clubs, Literary Fiction, Fiction Books, Books (in-market), Book Lovers (affinity) · **Eligible** ✅ |
| Purchase goal + site tag | Attached · `AW-18344196783` / `1wBzCMqEqd0cEK_1mKtE` live on jasoncholloway.com ✅ |
| Hard $25 rule | `MX1-HardCap-25-Pause` ✅ |
| Sitelinks | Author Website · Vol I · Imprint · IG · X · Facebook · Pinterest ✅ |
| Wrong French AI book | Ask Advisor hallucination only — **not** in assets ✅ |

---

## Expected limitations (not Jason blockers)

| Item | Notes |
|---|---|
| Asset group under review | Temporary after edits; re-check for Enabled / Eligible |
| Ad Strength Poor / Average | No video / no 4:5 lifestyle — intentional for $25 / Vivian |
| Conversion tracking incomplete warning | Tag is live; needs a real Purchase fire to clear |
| New bid strategy learning | Normal for fresh PMax |
| Impressions / spend | 0 until review + delivery |

---

## Out of scope (do not chase)

- Excellent via video, Generated images, monastery/tablet lifestyle stock  
- Ask Advisor French title (“L’influence de l’IA…”)  
- First-party customer lists / new segments for this $25 test  

---

## Calendar

- **Through Aug 12:** $1.99 promo copy is correct  
- **Aug 13+:** strip every $1.99 headline / description / sitelink claim  
- Monitor Cost vs **$25** hard-cap rule  

---

## Upload path note (resolved)

Cursor browser cannot use OS file picker / CDP file injection. Working path used: local CORS static server → localtunnel HTTPS → Ads-page `fetch` → `DataTransfer` into upload inputs → Asset library → asset group. Overlay false-positive (“Turn off ad blockers”) killed via `scratch/ops/_ads_overlay_killer.js`.

**No further Jason upload step required** for MX1 creatives.
