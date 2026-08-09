# Seventh City Press — Google Business Profile Import Package

**Prepared:** July 12, 2026

---

## What's in this folder

| File | Purpose |
|------|---------|
| `GOOGLE_BUSINESS_IMPORT.csv` | Bulk import row for Business Profile Manager |
| `assets/scp-logo-profile-720.png` | **Profile photo / logo** (heptagram from book spine) |
| `assets/scp-logo-profile-250.png` | Minimum-size logo variant |
| `assets/scp-heptagram-mark-1024.png` | Mark only, no text |
| `assets/scp-logo-google-workspace-320x132.png` | **Google Workspace custom logo** (320×132 banner, dark) |
| `assets/scp-logo-google-workspace-320x132-light.png` | Workspace logo alternate (cream ground) |
| `seventhcitypress-google-business-assets.zip` | All assets + CSV for upload |

---

## Before you import

### 1. Address (pre-filled)

| Field | Value |
|-------|-------|
| Address line 1 | 9169 W State St #4418 |
| Locality | Garden City |
| State | ID |
| Postal code | 83714 |

This is your LLC registered mailing address. When Google asks, choose **service-area business** and set your public service area to **Kansas City, MO** — hide the street address from the public profile if offered.

### 2. Service-area vs storefront

Seventh City Press is a **publisher without a public retail storefront**. When Google asks:

- Choose **Yes, I deliver goods and services to my customers** (or equivalent)
- Set **service area** to Kansas City, MO metro (or Missouri)
- **Hide** your street address from the public profile if you use a home address

Bulk import may still need a real address for verification even if hidden on Maps.

### 3. Logo upload (manual — bulk CSV can't host local files)

Google's **Logo** column needs a **public URL**, not a local path. After import:

1. Business Profile Manager → **Seventh City Press** → **Edit profile**
2. **Add profile photo** → upload `assets/scp-logo-profile-720.png`
3. Or upload to `seventhcitypress.com` and paste URL in a later bulk update

**Now hosted:** `https://seventhcitypress.com/brand/scp-logo-profile-720.png` (included in `GOOGLE_BUSINESS_IMPORT.csv` Logo column).

---

## Import steps

1. Sign in to [Business Profile Manager](https://business.google.com)
2. **Add profile** → **Import profiles**
3. **Download the template** from Google first — compare column headers to `GOOGLE_BUSINESS_IMPORT.csv`
4. If headers differ, copy our row into **Google's template** (headers must match exactly)
5. Fix address + postal code
6. Upload CSV
7. Complete verification (postcard, phone, or email — Google decides)

---

## Field reference (pre-filled)

| Field | Value |
|-------|-------|
| Business code | `SCP-KC-001` (internal only; keep for future bulk updates) |
| Business name | Seventh City Press |
| Website | https://seventhcitypress.com/ |
| Primary category | Book publisher |
| Additional categories | Publisher, Book store |
| Opening date | 2026-06 |
| Email (manual) | press@seventhcitypress.com — add in profile UI (not in bulk CSV) |

**Phone:** left blank — website satisfies Google's requirement. Add a Google Voice number later if verification requires it.

---

## Manual-only fields (paste after import)

### Business description (already in CSV — max 750 chars)

> Seventh City Press is an independent literary imprint in Kansas City, Missouri. We publish literary fiction and scholarly work at the intersection of imaginative and intellectual ambition, including the Masters X Trilogy and the John Hawkes critical monograph Innocence, Desire, and the Architecture of the Fall. Founded by Jason Carroll Holloway. Review copies and media inquiries welcome via press@seventhcitypress.com.

*(No URLs in description per Google rules — contact is plain text.)*

### Social links (add in profile UI)

| Platform | URL |
|----------|-----|
| Website | https://seventhcitypress.com/ |
| Author site | https://jasoncholloway.com/ |

### Attributes to enable (if offered)

- Online appointments: No
- Online estimates: No
- Identifies as women-owned / LGBTQ: only if accurate
- **Small business** — yes, if offered

---

## Logo specs (Google)

| Requirement | Our file |
|-------------|----------|
| Square | 720×720 ✓ |
| Min 250×250 | `scp-logo-profile-250.png` ✓ |
| Format | PNG ✓ |
| Clear at small size | Heptagram + circle only (profile version) |

The mark matches the **book spine heptagram** (`{7/2}` star in circle) from `scratch/compose_omnibus_covers_FINAL.py`.

---

## If bulk import fails

Create the profile manually:

1. **Add business** → Seventh City Press
2. Category: **Book publisher**
3. Service area: Kansas City, MO
4. Website: seventhcitypress.com
5. Description: copy from above
6. Logo: `scp-logo-profile-720.png`
7. Verify ownership

---

## Related (not Google Business)

| Task | Where |
|------|-------|
| Search Console | Add `seventhcitypress.com` property |
| Wikidata | Q140275300 — add P856 `https://seventhcitypress.com/` |
| Merchant Center | **No change** — feed stays on jasoncholloway.com |
