# Amazon Catalog Refresh — Omnibus PB Cover (Ingram already correct)

**Date:** 2026-08-08 · **Status:** Ingram ✓ · Amazon stale ✗  
**Listing:** https://www.amazon.com/dp/B0H3FRMLJD  
**ASIN:** B0H3FRMLJD · **ISBN:** 9798256072704  

Jason confirmed: **cover is current in IngramSpark for 2+ weeks.** Amazon still serves old dome art (`71oB4yWAAKL` CDN). This is a **catalog sync** problem, not an upload problem.

---

## Correct cover reference (attach in tickets)

| Asset | URL |
|-------|-----|
| Front jacket (v3) | https://jasoncholloway.com/covers/omnibus-hardcover-v3.png |
| Case laminate (HC ref) | https://jasoncholloway.com/covers/omnibus-hc-case-front.png |

Publisher: **Seventh City Press** · Imprint matches Ingram ONIX.

---

## Do these in order (tonight — ~10 min total)

### 1. Author Central — Contact Us (**primary — usually works in ~24–48h**)

1. https://authorcentral.amazon.com/ → **Help** → **Contact Us**
2. Topic: **Books / Title detail page** or **Other account issue**
3. Paste message below (Case #50898755 thread if replying to Daniel/Fabian is faster)

```
Subject: Stale cover image — please refresh from Ingram metadata

ASIN: B0H3FRMLJD
ISBN-13: 9798256072704
Title: Masters X: The Complete Trilogy (paperback)
Publisher: Seventh City Press (IngramSpark/Lightning Source distribution)

The product detail page is still showing an outdated cover image (pre-redesign dome art). The correct cover has been live in IngramSpark for several weeks and matches our publisher site.

Please refresh the catalog image for this ASIN from the current Ingram/Lightning Source metadata feed, or update manually from this front-cover JPG:

https://jasoncholloway.com/covers/omnibus-hardcover-v3.png

This is an Ingram-distributed print edition (not KDP). Prior Author Central case #50898755 — print identifiers were supplied Jul 29.

Thank you,
Jason Carroll Holloway
Seventh City Press LLC
jason@seventhcitypress.com
```

### 2. IngramSpark — metadata re-push ticket (**parallel — often triggers Amazon ONIX refresh**)

1. https://myaccount.ingramspark.com/ → **Help / Contact Support**
2. Subject: **Amazon cover image not updating — request metadata re-transmission**

```
ISBN: 9798256072704 (Masters X: The Complete Trilogy, paperback)
Amazon ASIN: B0H3FRMLJD

Cover file was revised and approved in IngramSpark [DATE YOU APPROVED]. Amazon.com product page still displays the previous cover image after 2+ weeks.

Please re-transmit cover/metadata to Amazon (ONIX/image feed) for this title, or confirm whether Amazon has rejected the new image file.

Amazon URL: https://www.amazon.com/dp/B0H3FRMLJD
```

Fill in approval date if you remember it (~late July).

### 3. Product page report (**paper trail — low success alone**)

On https://www.amazon.com/dp/B0H3FRMLJD → **Report an issue with this product or seller** → wrong image / product information. Attach v3 cover URL. Do **not** rely on this alone.

### 4. Bowker My Identifiers (**optional 5 min — helps some retailers**)

If ISBN 9798256072704 is registered under your Bowker account:

1. https://www.myidentifiers.com/ → edit title → upload **front cover JPG** (export from v3 PNG, ≥1400px height)
2. Save — can take days to propagate but supports Amazon/librarian feeds

---

## Do NOT use

| Path | Why |
|------|-----|
| KDP Bookshelf | No KDP edition — omnibus is Ingram-only |
| Re-upload Ingram cover | Already done per Jason |
| New ASIN / new edition | Same ISBN — would split reviews and confuse catalog |

---

## Verify refresh

- Hard refresh / incognito: https://www.amazon.com/dp/B0H3FRMLJD
- CDN filename should change from `71oB4yWAAKL` when updated
- Check Amazon search results thumbnail (often last to update)

---

## Jason checklist

- [x] **Amazon product report submitted 2026-08-08 ~3:34 PM CT** — Images / product information inaccurate; comments include ASIN, ISBN, v3 cover URL
- [ ] Author Central ticket submitted (optional parallel — stronger for Ingram titles)
- [ ] IngramSpark re-push ticket submitted (optional parallel)
- [ ] Note ticket IDs in this file when replies arrive

**Prior case:** Author Central #50898755 (Jul 29 identifiers sent; cover refresh never completed for B0H3FRMLJD).
