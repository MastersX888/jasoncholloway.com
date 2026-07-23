# Instagram & Meta Business Suite — Setup Guide
**For:** Seventh City Press / Jason Carroll Holloway  
**Status:** Website metadata is fully ready. This guide covers every step to activate Instagram and Meta Business Suite.

---

## What "turning on the Meta feature" means

Instagram's **Meta features** (Settings → Accounts Centre → Meta features) connect your Instagram account to Meta's full ecosystem:
- **Meta Business Suite** — manage Instagram + Facebook from one dashboard, schedule posts, view unified analytics
- **Instagram Shopping / Product Tags** — tag books in posts (useful once you have the catalog connected)
- **Cross-app messaging** — unified inbox
- **Meta Pixel / Conversions API** — website traffic attribution for ads

The website metadata (OG tags, Twitter Cards, sitelinks) is now fully configured on both `jasoncholloway.com` and `seventhcitypress.com`. Your link previews will look correct when shared.

---

## Step 1 — Confirm your Instagram account type

Go to **Instagram → Settings → Account → Account type** and confirm you are on a **Creator** or **Business** account (not Personal).

For an author/publisher, **Creator** is usually the better fit:
- Designed for public figures, authors, artists
- Shows "Author" category under your name
- Access to professional dashboard + analytics
- Can tag products in posts
- Link in bio with direct clickable URL

**If you're on Personal:** Settings → Account → Switch to professional account → Creator → Author

---

## Step 2 — Connect to a Facebook Page (required for Meta Business Suite)

Meta Business Suite requires a Facebook Page linked to your Instagram account.

**If you don't have a Facebook Page yet:**
1. Go to facebook.com/pages/create
2. Page name: **Seventh City Press** (or **Jason Carroll Holloway - Author**)
3. Category: Author or Publisher
4. About: Use your author bio from `jasoncholloway.com/about/`
5. Website: `https://jasoncholloway.com`
6. Profile photo: your author photo (same as Instagram)
7. Cover photo: Masters X Trilogy omnibus or Vol I cover

**Connect Instagram to the Facebook Page:**
1. Instagram → Settings → Accounts Centre
2. **"Add accounts"** → select your Facebook Page
3. Or go to Facebook Page → Settings → Instagram → Connect account

---

## Step 3 — Enable Meta Business Suite

Once Instagram is connected to a Facebook Page:

1. Go to **business.facebook.com** (Meta Business Suite)
2. Sign in with your Facebook account
3. Your Instagram account + Facebook Page should appear together
4. From here you can:
   - Schedule posts across both platforms
   - View unified analytics
   - Manage your inbox
   - Create/manage ads

**Business Portfolio setup (optional but recommended):**
1. business.facebook.com → Settings → Business info
2. Add your business: **Seventh City Press LLC**
3. Website: `https://seventhcitypress.com`
4. Time zone: Central (Kansas City)

---

## Step 4 — Meta Domain Verification (for website attribution + ads)

This proves to Meta that you own `jasoncholloway.com` and `seventhcitypress.com`, enabling:
- Accurate link attribution in ads
- Open Graph cache control (you can force-refresh link previews)
- Eligibility for "Verified website" badge on your Facebook Page

**Steps:**
1. Meta Business Suite → Settings → Brand safety & suitability → **Domains**
2. Click **"Add"** → enter `jasoncholloway.com`
3. Choose **DNS TXT record** verification (easiest with Cloudflare)
4. Copy the TXT record value Meta gives you
5. In Cloudflare DNS for `jasoncholloway.com`, add:
   - Type: TXT
   - Name: `@`
   - Content: `facebook-domain-verification=<value Meta gave you>`
6. Back in Meta → **Verify**
7. Repeat for `seventhcitypress.com`

> **Note:** Meta may also give you an HTML tag option. We can add `<meta name="facebook-domain-verification" content="..." />` to both site layouts if you prefer that approach — just paste the verification code and we'll add it.

---

## Step 5 — Optimize your Instagram profile

**Profile photo:** Same as author headshot used on `jasoncholloway.com/about/`

**Username:** Consider `@jasoncarrollholloway` or `@seventhcitypress` or `@mastersxtrilogy`

**Name:** Jason Carroll Holloway (or Seventh City Press)

**Bio (160 characters max):**
```
Author · Masters X Trilogy · Kansas City fiction rooted in real history
Voynich Manuscript. SubTropolis. 111 Hz. Fiction built on documented research.
```

**Website link:** `https://jasoncholloway.com`

**Category:** Author (or Book & Magazine Distributor for the press account)

**Action buttons:**
- Email: `jason@seventhcitypress.com`
- Link in Bio pointing to `/books/`

---

## Step 6 — Set up Instagram Link in Bio

Your `/books/` page at `jasoncholloway.com/books/` is the ideal link-in-bio destination. When someone taps the link, they land on the full catalog.

For deeper funnel access, consider a dedicated landing page at `/instagram/` that shows:
- Direct buy links for Vol I (lowest barrier to entry)
- Quick trilogy summary
- Link to Field Notes
- Email capture

We can build this page if you want.

---

## Step 7 — Connect to Meta Pixel (optional, for ad tracking)

If you plan to run Instagram or Facebook ads to your website, you'll want the Meta Pixel to track conversions (book purchase page visits, email signups).

**Steps:**
1. Meta Business Suite → Ads Manager → Events Manager → **Pixels**
2. Create a pixel named "jasoncholloway.com"
3. Meta will give you a Pixel ID (a number like `1234567890123456`)
4. **Tell the agent the Pixel ID** and we'll add it to `app/layout.tsx`

The site already has Google Analytics (G-79RDL3BDEH). Adding Meta Pixel is a separate script — not a conflict.

---

## Step 8 — Verify link preview quality

Before posting for the first time, check how your link previews look:

1. Go to **developers.facebook.com/tools/debug/**
2. Enter `https://jasoncholloway.com` → click **Debug**
3. Check:
   - `og:title` ✓
   - `og:description` ✓
   - `og:image` ✓ (should show the branded 1200×630 image)
   - No errors or warnings
4. Repeat for `https://jasoncholloway.com/books/masters-x/`
5. Repeat for `https://seventhcitypress.com/`

If previews look stale (from a cached earlier crawl), click **"Scrape Again"** on the debugger.

---

## After setup — tell the agent your handles

Once your Instagram handle is confirmed, provide it here so we can:
- Add it to `lib/data/authorAuthority.ts` → `SOCIAL_INSTAGRAM_URL`
- Add it to `authorSameAs` (JSON-LD Person schema)
- Add it to both site footers (will appear automatically)
- Add it to `twitter:site` and `twitter:creator` in metadata

Same for Facebook page URL, X/Twitter handle, and YouTube.

**File to update:** `lib/data/authorAuthority.ts` (root) and `seventhcitypress/lib/data/social.ts`

---

## What's already done (website side)

| Item | Status |
|------|--------|
| `og:image` with 1200×630 dimensions on root layout | ✅ Done |
| `og:image` with 1200×630 dimensions on SCP layout | ✅ Done |
| Complete `twitter:card` + title + description + image on root | ✅ Done |
| Complete `twitter:card` + title + description + image on SCP | ✅ Done |
| Twitter cards on all 12 Field Notes pages | ✅ Done |
| Social constants file ready for handles (`authorAuthority.ts`) | ✅ Ready |
| Social links in both footers (appear when handles are set) | ✅ Ready |
| Meta domain verification HTML tag (pending your Meta verification code) | ⏳ Needs your code |
| Meta Pixel ID (pending if you want ad tracking) | ⏳ Optional |
| Instagram handle in JSON-LD sameAs | ⏳ Needs your handle |
| X/Twitter handle in twitter:site/creator | ⏳ Needs your handle |
