# Facebook Paid Boost Audit — 2026-08-25

**Routed by:** Morgan
**Requested by:** Jason ("audit my Facebook Ad that is currently running. Can it be enhanced in any way?")
**Tier:** 3 (ad spend / live social ad) — **no changes made; audit only, awaiting Jason's go-ahead**
**Account:** Ad account `1029210490026605` · Page: Jason Carroll Holloway

---

## What's running

| Field | Value |
|---|---|
| Ad type | **Boosted existing organic post** (not a purpose-built link ad) |
| Post | "What if the most dangerous secret in the world is a frequency?" (omnibus hardcover post, 8/23 QC'd copy) |
| Campaign budget | **$5.00/day**, Campaign Budget Optimization (CBO) |
| Schedule | Aug 24 – Aug 31, 2026 (7 days) → ~$35 total planned spend |
| Status | Active, day 1–2 of run |
| Bid strategy | Highest volume (no cost cap) |
| Multi-advertiser ads | **On** — your creative can appear bundled with other advertisers' content, resized/cropped |

### Results so far (partial, early in run)
| Metric | Value |
|---|---|
| Reach | 154 |
| Post engagements | 28 |
| Link clicks | 24 |
| **Primary optimization result** | **37 "Facebook Page visits"** |

---

## The core problem

**The ad is optimizing for the wrong goal.**

- **Conversion location:** `Instagram or Facebook` (not Website)
- **Performance goal:** `Maximize number of Facebook Page visits` (this replaced a deprecated "Page likes" goal — the account was auto-migrated, likely without anyone choosing it deliberately)

This means Meta's delivery algorithm is actively showing your ad to people **most likely to visit/follow your Page** — not to people most likely to click through to `jasoncholloway.com` and buy the omnibus. The 24 link clicks you got were incidental, not what the algorithm is being paid to optimize for. For a campaign whose entire point is driving book sales, this is the single biggest lever to pull.

---

## Other findings

| Finding | Severity | Detail |
|---|---|---|
| **No audience targeting** | High | Estimated audience: **179.7M – 211.4M** (essentially the entire US 18+ population). Only constraint is "United States" + excluding people already engaged with your Page. No age range, no interests (book club, thriller readers, dark academia, etc. — the same categories used in your Pinterest rebuild). At $5/day this budget is spread across a near-infinite pool. |
| **Destination URL not updated to omnibus page** | Medium | Live post link: `jasoncholloway.com/books/masters-x/?utm_source=facebook&utm_medium=social&utm_campaign=omnibus-launch&utm_content=author-page` — points to the **trilogy hub**, not the canonical `/books/masters-x/omnibus/` landing page flagged in the 8/24 commerce audit. Because the omnibus-first CTA is now live on the hub, visitors still see the omnibus offer first — but it's one extra click vs. landing directly on the buy page. Also still tagged `utm_medium=social` (organic) rather than `paid_social`, so paid vs. organic traffic can't be split in analytics. |
| **Limited placements** | Low–Medium | Meta's own in-app recommendation: *"You could improve performance by including 6 or more placements for 1 ad set — using fewer than 6 placements may increase your cost per result."* |
| **Thin budget** | Medium | $5/day CBO — same pattern as the old Pinterest campaign (thin budget + broad/no targeting = weak signal, algorithm never gets enough data to optimize). |
| **Multi-advertiser ads on** | Low | Your creative can be shown resized/cropped alongside other brands' ads in the same unit — minor brand-control tradeoff for a bit more reach. |
| **No pixel / conversion event connected** | Low (not blocking) | "Website events: Set up" was still unconfigured — without it, even if you switch to a website-clicks goal, Meta can't yet optimize for on-site actions (e.g., reaching the buy button), only for the click itself. |

---

## Recommended enhancements (ranked by impact)

1. **Switch Conversion location → Website, Performance goal → Maximize link clicks (or Landing page views)**
   This alone re-points the entire delivery algorithm from "get Page visits" to "get people to your buy page" — the fix most likely to move the needle.
2. **Update the destination link** to `https://jasoncholloway.com/books/masters-x/omnibus/?utm_source=facebook&utm_medium=paid_social&utm_campaign=omnibus-ad-20260824` — lands paid traffic directly on the buy page and separates paid from organic in analytics.
3. **Add audience targeting**: age 25–65+, interests like book club, thriller/mystery readers, dark academia, literary fiction — same categories just built into the Pinterest rebuild. Narrows the 200M pool to people actually likely to buy.
4. **Raise budget** to something like $8–10/day for the remaining days, now that it's pointed at a real objective — thin budget only makes sense once the targeting/goal is fixed.
5. **Turn on more placements** (Advantage+ placements) per Meta's own recommendation, to lower cost per result.
6. Optional: turn off **Multi-advertiser ads** if you'd rather keep full creative control over how the Pin/post is displayed (small tradeoff either way).

---

## Still open — Jason

- [x] **Decide which fixes to apply.** Jason approved "all fixes including raising budget to $8-10/day" (Tier 3 sign-off received).

---

## Execution log — what actually happened

Jason approved all fixes. Attempted to apply them to the live ad set first; ran into a hard platform wall, so the campaign was rebuilt from scratch. Timeline:

1. Paused the original misconfigured ad set (`Instagram or Facebook` / Page-visits goal).
2. Tried to edit the conversion location on the live ad set → **blocked**: Meta locks conversion location/performance goal on a live ad set.
3. Duplicated the ad set to edit the duplicate instead → **blocked**: same conflict, plus the campaign already had one ad set optimizing for Page visits, so Meta wouldn't allow a second ad set in the same CBO campaign with a different goal.
4. Deleted the old ad set (Jason approved) to clear the conflict → **new problem**: deleting the last ad set in a campaign caused Meta to mark the entire campaign **deleted**, which is not recoverable through the UI.
5. Jason approved discarding the orphaned drafts and starting a **brand-new Traffic campaign** from scratch.
6. Built the new campaign end to end:
   - **Campaign:** "Omnibus Hardcover Website Traffic - Aug 2026" — objective Traffic, manual campaign setup.
   - **Ad set:** "Omnibus Website Traffic - Aug 2026" — conversion location **Website**, goal **Maximize landing page views**, budget **$9.00/day** (CBO), minimum age **25**. (Granular interest targeting — book club/thriller/dark academia — was attempted but the Ads Manager detailed-targeting UI was too flaky to complete reliably; left as age-25+ targeting only rather than risk a broken publish. Flagging as a follow-up if you want it added later.)
   - **Ad:** "Omnibus Website Clicks Ad - Aug 2026" — reused the same existing omnibus hardcover post (`122108665851290334`, "What if the most dangerous secret in the world is a frequency?"). Ads Manager initially auto-suggested the wrong post (an unrelated "Ars Notoria" grimoire post); corrected via Change post.
   - Since that post is a plain status update with no attached link, the paid **Call to action** button defaulted to "Visit Profile" pointing at the Facebook Page. Changed it to **"Shop now"** pointing at `https://jasoncholloway.com/books/masters-x/omnibus/?utm_source=facebook&utm_medium=paid_social&utm_campaign=omnibus-ad-20260825` — the canonical omnibus buy page, tagged `paid_social` so it's separable from the organic post's own `utm_medium=social` link in the post text.
   - Advantage+ placements left on (default for new ad sets) per Meta's own placement recommendation.
7. Published. Confirmed in the campaigns table: **"Omnibus Hardcover Website Traffic - Aug 2026" — status "In review"** (submitted to Meta ad review; will move to Active once approved, typically within a few hours).

### Net result vs. the original audit findings

| Finding | Status |
|---|---|
| Wrong optimization goal (Page visits) | **Fixed** — new ad set optimizes for Website / landing page views |
| No destination tracking separation | **Fixed** — paid CTA now points to omnibus page with `paid_social` UTM |
| No audience targeting | **Partially fixed** — age 25+ set; interest targeting not added (UI reliability issue) |
| Thin $5/day budget | **Fixed** — $9/day |
| Limited placements | **Fixed** — Advantage+ placements on by default |
| Multi-advertiser ads | Not carried over as a toggle on the new ad — new ads default to standard placement rules; no action needed |

### Open follow-up (optional, low priority)

- [x] ~~If you want book-club/thriller/dark-academia interest targeting added~~ — **attempted again 2026-08-25 AM, confirmed not automatable.** Campaign had cleared Meta review and gone **Active** (optimizing on Landing Page View) by the time of this second attempt. Reopened the ad set editor and tried five separate ways to reach the "Add demographics, interests or behaviors" detailed-targeting box: accessibility-tree click, direct JS `.click()`, pixel-coordinate click, synthetic keystroke dispatch, and the dedicated key-press tool. None registered — that specific widget is an older (pre-React) Meta component that appears to require a genuine, trusted mouse/keyboard event, which this automated browser session can't send. No suggestions list ever opened despite the search field accepting and holding typed text. Age (25+) targeting was confirmed correctly set in the process, then the whole edit was **discarded cleanly** (verified: campaign back to Active, zero pending "Review and publish" items) rather than publish a no-op change that would have also flipped the ad set into a harder-capped "limited audience" mode without the interest-targeting upside.
- [ ] Once the new campaign clears review, worth spot-checking after 24–48h that "Landing page views" (not just Page visits) is climbing as the primary result, confirming the goal fix is working as intended.
- [ ] **Interest targeting still open.** This needs to be done by hand in your own Ads Manager session (Audience → Detailed targeting → type "book club," "thriller," "dark academia," etc. and click the suggestions as they appear) — should take under two minutes for a real person clicking in a real browser. I can talk you through exactly where to click if useful.

---

## Live verification — 2026-08-25 PM (Jason request)

**Verdict: PASS — operating within approved budget and parameters.**

Verified in Ads Manager (`act=1029210490026605`), date range **Aug 25, 2026**:

| Check | Expected | Live |
|---|---|---|
| Campaign status | Active | **Active** (toggle ON, green delivery dot) |
| Optimization goal | Landing page views (not Page visits) | **Landing Page View** — primary result column |
| Daily budget | $8–10/day (Jason approved $9) | **$9.00 Daily, Shared** (CBO) |
| Spend vs cap (today) | ≤ $9/day | **$0.72 spent** on 49 impressions — well under cap |
| Cost efficiency | n/a (day 1) | **$0.36 per landing page view** (2 LPVs) |
| Ad creative | Omnibus hardcover post + Shop now CTA | **"Omnibus Website Clicks Ad - Aug 2026"** — Active |
| Wrong legacy campaign | Deleted / not spending | Only this campaign visible and delivering |

**Notes:**
- Early-day metrics only (~$0.72 / 2 LPVs / 49 impressions). Normal for a campaign that cleared review today.
- Ad set inline editor threw an HTTP 400 in the automated browser session; budget/goal confirmed from the **Ads** table row instead (shows $9.00 Daily, Shared + Landing Page Views).
- Interest targeting (book club / thriller / dark academia) remains **optional manual follow-up** — not a budget/compliance blocker.
- Spot-check again in 24–48h: LPVs should climb; daily spend should approach but not exceed $9 unless Meta pacing changes.

**Billing:** Payment settings page reachable; no payment-failure banner observed in-session.

---

*Morgan · SVP Oversight Committee · 2026-08-25 (live verification appended)*
