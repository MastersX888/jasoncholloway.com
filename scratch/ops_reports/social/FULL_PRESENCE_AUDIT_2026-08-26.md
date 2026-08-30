# Full Presence Audit — Website + All Public Profiles
**Date:** 2026-08-26 · **Trigger:** Pre-flight check before finalizing the Sales-objective FB ad campaign (per Handoff Brief + Deep Perceptual Analysis docs)

---

## 🔴 URGENT — not part of the audit scope, but found mid-check

**C: drive hit 0.5 MB free again** during this session. Root cause confirmed: `C:\Users\zh577\AppData\Roaming\Cursor\User\globalStorage\state.vscdb` is back up to **9.81 GB** (it was 9.66 GB last cleanup). This file is locked while Cursor is running, so I can't touch it. I reclaimed ~48 MB by clearing Temp + Brave cache again, which is enough to keep working, but the drive is one big operation away from erroring out again.

**You need to do this manually:** fully close Cursor (all windows), then either delete `state.vscdb` (you'll lose local chat/extension-state history, not your files/code) or use a SQLite vacuum tool on it. This is the same ask from last time — nothing else meaningfully touches this number.

---

## The one finding that matters most

**Every single public-facing asset — website meta tags, Instagram bio, X bio, Facebook About, Pinterest bio, Pinterest pin titles — is written in pure "conspiracy thriller" language.** None of them mention meditation, mindfulness, consciousness, or the "Dan Brown meets Eckhart Tolle" hybrid-truthful angle that the two docs you gave me identified as the highest-converting positioning (+59% satisfied readers) and that the new Sales-campaign ad creative is built around.

Right now the ad promises something ("a meditation on listening," "Dan Brown meets Eckhart Tolle") that **nothing else in your presence backs up**. A cold click-through from the ad lands on a homepage `<title>` that says "A Kansas City Conspiracy of Frequency & Medieval Manuscripts" — thriller, full stop. That's the exact expectation-mismatch the Handoff Brief warned against, just running in the other direction (ad sets up hybrid expectation, landing surfaces don't deliver on it).

**Fix:** this doesn't require touching every page. The omnibus page copy already has some hybrid language buried in it ("bridges acoustic science, medieval cryptography, and the absolute frontiers of human consciousness"). The fastest fix is:
1. Add one sentence with the meditative/consciousness angle to the homepage `<title>`/meta description and OG tags (currently 100% thriller).
2. Add a line to each social bio (IG, X, Pinterest, both Bluesky accounts) — even just appending "· Dan Brown meets Eckhart Tolle" would tie every profile to the ad's promise.

---

## Website — jasoncholloway.com

| Check | Result |
|---|---|
| Homepage load, images, links | ✅ Clean — 0 broken images, all footer/nav links resolve |
| Meta Pixel (`fbq`) | ✅ Firing — confirmed live |
| Google Analytics (`gtag`) | ✅ Firing |
| **`InitiateCheckout` on Buy Direct click** | ✅ **Verified end-to-end** — clicked the hardcover Buy Direct link on `/books/masters-x/omnibus/`, captured the actual pixel call: `track InitiateCheckout {currency: USD, value: 44.99, content_ids: ["9798295884412"]}`. The pixel work from earlier today is confirmed live and correct. |
| Homepage title/meta description | 🔴 Pure thriller framing, zero hybrid-truthful language (see above) |
| Omnibus page copy | 🟡 Partial — has "frontiers of human consciousness" language but meta description is purely logistical |
| 3 unpublished routes found | 🟡 `/ops`, `/books/masters-x/moments`, `/books/literary-conspiracy-fiction` exist as files on your local `cursor/upload-staging-f9e1` branch but return 404 live (never merged to `main`). **Not a live bug** — confirmed nothing on the deployed site links to them, and the sitemap doesn't reference them either. Just flagging as WIP that's sitting unshipped. |

---

## Social profiles

### Facebook — "Jason Carroll Holloway" (author page)
`facebook.com/profile.php?id=61588710027163`

- Cover photo + avatar: ✅ clean, on-brand (gold radial diagram + author headshot)
- Category: Author · Location: Kansas City, MO · Email: jason@seventhcitypress.com
- Links listed: jasoncholloway.com, seventhcitypress.com, x.com/jasonhollowaykc, pinterest.com/SeventhCityPress, instagram.com/jasonhollowaykc, **bsky.app/profile/jasonhollowaykc.bsky.social**
- 🔴 **5 followers, 9 following** — critically low, and no separate "Seventh City Press" Facebook Page exists (only this personal author page)
- No long-form bio/description text on the About tab — just contact info and links

### Instagram — @jasonhollowaykc
`instagram.com/jasonhollowaykc`

- Bio: *"Author · Masters X Trilogy KC fiction rooted in real history · Voynich MS · SubTropolis · 111 Hz · Seventh City Press · Also on X @jasonhollowaykc"* — thriller-only, no hybrid language
- 7 posts, well-produced Field Notes-style grid (church ruins, illuminated manuscript, KC skyline, Voynich page, workshop table) — good visual consistency with the site's dark/gold aesthetic
- 🟡 **12 followers, 111 following** — heavily lopsided ratio, can read as bot-like/spammy to platform trust & safety and to human visitors
- The "wrong cover graphic" 1×1 issue from earlier appears resolved — no mis-cropped covers visible in the current grid

### X (Twitter) — @jasonhollowaykc
`x.com/jasonhollowaykc`

- Header: clean "Seventh City Press · Literary Imprint · Kansas City" banner with compass-star mark
- Bio: *"Author · Masters X Trilogy · Kansas City fiction rooted in real history. Voynich MS 408 · SubTropolis · 111 Hz. Seventh City Press."* — thriller-only again
- 🔴 **45 posts, 1 follower, 30 following** — the biggest follower/output mismatch of any platform. Joined March 2025, 45 posts, essentially no audience.

### Bluesky — TWO active accounts (important)
The site links to `@seventhcitypress.bsky.social`, but Facebook's About tab separately lists `@jasonhollowaykc.bsky.social`. Both are live:

| Account | Followers | Following | Posts | Banner | Notes |
|---|---|---|---|---|---|
| `@jasonhollowaykc.bsky.social` (author) | 0 | 11 | 8 | ❌ none | Bio is genuinely good: *"I write the histories that libraries misfile. Masters X trilogy — occult inheritance, forbidden manuscripts, a kingdom that never stopped listening."* Pinned post reads well. **This account was permanently suspended 2026-07-31 for "Account Authenticity" (looked like coordinated/bot behavior — 14 posts across both accounts published in ~2 minutes via script) and evidently got reinstated via appeal.** Given that history, avoid any future bulk/simultaneous scripted posting across both Bluesky accounts — that's what triggered the ban last time. |
| `@seventhcitypress.bsky.social` (imprint, linked from site) | 2 | 27 | 13 | ❌ none | Bio: *"Independent literary imprint · Kansas City, MO · Masters X Trilogy"* — thriller-only. Avatar is the compass logo (appropriate for the imprint identity). |
| **Both accounts** | | | | 🔴 **No banner image on either**, despite the `bluesky_banner_v2.jpg` crop fix done earlier this session — that asset appears to have never actually been uploaded to either account. |

### Pinterest — @SeventhCityPress
`pinterest.com/seventhcitypress`

- Bio: *"Independent literary imprint · Kansas City, MO. Masters X trilogy & scholarly fiction. Prague, manuscripts, real history."* — thriller/scholarly framing, no hybrid language
- **This is actually your best-performing channel**: 22.6k monthly views, top pin ("Masters X: The Complete Trilogy — Hardcover Omnibus | A Conspiracy Thriller in One Volume") has 1.7k saves, second pin has 7.3k saves. Worth leaning into.
- 🟡 Pin titles use "A Conspiracy Thriller in One Volume" explicitly — the one channel where thriller-only framing is actually working, so I'd leave Pinterest as-is rather than retrofitting hybrid language here.

### Goodreads / StoryGraph
Linked from the site footer but not deep-audited this pass (lower marketing priority, more like reference listings). Links resolve from the homepage; recommend a quick manual glance next time you're doing catalog upkeep.

---

## Priority fix list

| Priority | Item | Why |
|---|---|---|
| 🔴 P0 | Close Cursor, deal with `state.vscdb` (9.81 GB) | Drive is at ~0 bytes free; everything else stops working if this isn't addressed |
| 🔴 P1 | Add hybrid-truthful language to homepage title/meta + at least IG/X bios | Ad campaign now promises "Dan Brown meets Eckhart Tolle" — nothing else backs that up yet |
| 🟡 P2 | Decide: is `@jasonhollowaykc.bsky.social` staying active alongside `@seventhcitypress.bsky.social`, and if so, update the website's Follow link (currently only points to the imprint account) | Two live handles, only one is discoverable from the site |
| 🟡 P2 | Upload the banner crop (`bluesky_banner_v2.jpg`) to at least the `@seventhcitypress` Bluesky account | Fix was made locally but never shipped |
| 🟡 P3 | X: 1 follower / 45 posts, IG: 12/111 ratio — both need real follower growth, not more posting | Output isn't the bottleneck on either platform |
| 🟢 P4 | No Facebook Page for Seventh City Press (imprint) exists separately from the personal author page | Optional — only matters if you want a press-voice channel distinct from author-voice |
| 🟢 P4 | 3 unpublished pages on a side branch (`/ops`, `/books/masters-x/moments`, `/books/literary-conspiracy-fiction`) | Not live, not linked, no rush — just noting it's sitting there |

---

## What's already working and doesn't need touching

- Meta Pixel + `InitiateCheckout` tracking — confirmed firing correctly on the live omnibus page
- Google Analytics — confirmed firing
- Website has zero broken images/links across ~35 pages checked
- Instagram grid content quality and brand consistency
- Pinterest reach (22.6k monthly views) and top-pin performance
- Facebook Page cover/avatar visual branding
