# Google Merchant Center — Batch Fix (10 print SKUs)

**Updated:** July 10, 2026  
**Feed URL:** https://jasoncholloway.com/feeds/google-shopping.csv  
**Regenerate feed:** `.\scripts\batch-google-merchant-fix.ps1`

---

## Yes — batch fix (3 actions total, not 10)

| # | Action | Batch scope | Automated? |
|---|--------|-------------|------------|
| 1 | Regenerate product feed | All 10 SKUs | **Yes** — run script below |
| 2 | Target countries → **US only** | All products | One MC setting (~30 sec) |
| 3 | Fetch feed or upload CSV | All 10 SKUs | One click in MC |

```powershell
.\scripts\batch-google-merchant-fix.ps1
```

Output: `%USERPROFILE%\Downloads\google-shopping-merchant-upload.csv`  
Live feed: `https://jasoncholloway.com/feeds/google-shopping.csv`

**You cannot fix Russia/Korea/28-country errors from the CSV alone** while those countries remain enabled in Merchant Center. The feed is US-only; the account must match.

---

## What the three errors actually mean (from your diagnostics)

Your Merchant Center account is trying to show books in **many countries**, but the feed only has **US prices (USD)** and **US shipping**. Each error hits a different country group:

| Error in MC | What it blocks | Real cause |
|-------------|----------------|------------|
| **Local Requirements** | **Russia** | Content/policy block for that market (not fixable in the feed — remove Russia as a target country) |
| **Missing shipping information** | **28 countries** | Google requires shipping in AU, CA, DE, FR, GB, JP, KR, etc. You only ship US via IngramSpark |
| **Unsupported currency** | **South Korea** (and others) | Feed says `29.99 USD`; Korea expects **KRW** unless you only target the US |

**Bottom line:** You do not have 10 broken products. You have **1 feed** being evaluated against **~30 countries** you are not set up to sell into.

---

## Recommended batch fix — US only (5 minutes in Merchant Center)

Seventh City Press sells print via **IngramSpark (USD, US shipping)**. Restrict Merchant Center to **United States only**. That clears all three issue types for all 10 SKUs at once.

### Step 1 — Remove extra target countries

1. Open [merchants.google.com](https://merchants.google.com)
2. **Tools & settings → Business information → Countries** (or **Data sources → your feed → Target countries**)
3. **Remove every country except United States**
   - This removes Russia (Local Requirements)
   - This removes the 28 countries needing local shipping
   - This removes Korea and others needing local currency
4. Save

> If you later want UK or Canada, add them back **one at a time** with matching currency + shipping — not as a bulk global rollout.

### Step 2 — US shipping policy (one policy, all products)

**Tools & settings → Shipping and returns → Add shipping policy**

| Field | Value |
|-------|-------|
| Type | Shipping for online products |
| Country | **United States** |
| Service | Standard |
| Rate | **$5.99** flat (verify at IngramSpark checkout; edit `SHIPPING_PRICE_USD` in sync script if different) |
| Handling | 1–2 business days |
| Transit | 5–10 business days |

### Step 3 — Return policy (US)

Same page → **Return policy** for United States  
URL: `https://jasoncholloway.com/returns/`

### Step 4 — Re-fetch the feed

**Products → Feeds** (or **Data sources**)  
URL: `https://jasoncholloway.com/feeds/google-shopping.csv`  
Click **Fetch now**

The feed already includes (all 10 SKUs):

- `price` = `NN.NN USD`
- `shipping` = `US::Standard:5.99 USD`
- `availability` = `in_stock`

### Step 5 — Wait and verify

- Allow **24–72 hours**
- **Products → Needs attention** — issue counts should drop to zero for US
- “Available soon” should change to approved once US-only targeting is active

---

## Feed side (already done — batch via script)

```powershell
python scripts/sync-ingram-metadata.py
```

Regenerates `public/feeds/google-shopping.csv` for all 10 print ISBNs.  
Deploy if you changed prices:

```powershell
.\scratch\build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
```

Manual copy for MC upload: `%USERPROFILE%\Downloads\google-shopping-fixed.csv`

---

## If you want international listings later

Do **not** enable 30 countries at once. For each country you add:

1. Add target country in Merchant Center
2. Add `shipping` row for that country in the feed (e.g. `GB::Standard:12.99 GBP`)
3. Add `price` in that country's currency **or** a separate country-specific feed
4. Confirm IngramSpark actually ships there at that rate

For a POD publisher, **US-only free listings** is the normal setup.

---

## Quick checklist

- [ ] Target countries = **United States only** (remove Russia, Korea, EU, etc.)
- [ ] US shipping policy configured ($5.99 Standard)
- [ ] US return policy linked
- [ ] Feed re-fetched (`/feeds/google-shopping.csv`)
- [ ] Wait 24–72 h; recheck Needs attention

---

## Do not try to fix these individually per product

Removing countries in Step 1 is the batch fix. Adding KRW prices or Russia compliance per SKU is unnecessary if you only sell in the US.
