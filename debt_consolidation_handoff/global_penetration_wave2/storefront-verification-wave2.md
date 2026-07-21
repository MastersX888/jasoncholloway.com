# Storefront verification — Wave 2 (2026-07-18)

Agent spot-check without login. Verified via HTTP fetch + Apple iTunes Search API ([Storefront verify subagent](4a76f0de-dc54-466e-a1a6-0484b7f42090), 2026-07-18).

| Store | URL tested | Result | Price | Notes |
|-------|------------|--------|-------|-------|
| **Amazon AU** | https://www.amazon.com.au/dp/B0H4KYMSM1 | **PASS** | **$10.11 AUD** | Vol I live. Book 1 of 3. Pub 9 Jun 2026. KU eligible. |
| **Kobo CA** | https://www.kobo.com/ca/en/search?query=Jason%20Carroll%20Holloway | **PASS** | **$8.99 CAD** | Vols I–III listed. Author: Jason Carroll Holloway. Ingram feed live. |
| **Apple Books UK** | https://books.apple.com/gb/book/masters-x/id6770156203 | **PASS** | **£5.49 GBP** | ISBN 9798256008819 · trackId 6770156203 · release 2026-06-01. iTunes API returns 4 titles (3× Masters X + Hawkes). |

**Vol I verdict:** All three Wave 2 storefront checks **PASS**.

---

## Amazon AU

- **ASIN:** B0H4KYMSM1  
- **Title:** Masters X: The Inheritance of Frequency : Volume One  
- **Author:** Jason Carroll Holloway  
- **Series:** Vol I–III visible ($10.11 / $9.99 / $9.99 AUD)  
- **Action:** None required.

---

## Kobo CA

| Title | Status | Price (CAD) |
|-------|--------|-------------|
| The Inheritance of Frequency | Listed | $8.99 |
| The Grimoire | Listed | — |
| The Kingdom | Listed | $8.99 |

Per `wave1/kobo-status.md`: Kobo Writing Life **not required** for discoverability — Ingram distribution confirmed.

**Optional:** Claim author profile at https://www.kwritinglife.com/ for bio/photo control.

**Note:** Search also returns unrelated “Holloway” authors; filter by **Jason Carroll Holloway** or series **Masters X**.

---

## Apple Books UK

- **Direct page:** https://books.apple.com/gb/book/masters-x/id6770156203  
- **ISBN lookup (iTunes API):** `https://itunes.apple.com/search?term=9798256008819&entity=ebook&country=gb` → 1 result, £5.49  
- **Author lookup (iTunes API):** `https://itunes.apple.com/search?term=Jason+Carroll+Holloway&entity=ebook&country=gb` → 4 ebooks  

**Web search caveat:** `books.apple.com/gb/search?term=…` alone may redirect to apple.com marketing in plain HTTP/browser automation. Use direct book URL or iTunes API for reliable no-login checks.

**Remaining human step:** Claim author profile at https://authors.apple.com/ (bio in `wave1/apple-kobo-claim-checklist.md`) — catalog is live; profile claim is metadata/branding only.

---

## Wave 2 implication

- **AU + Kobo + Apple UK:** Passive global ebook reach confirmed for Vol I.  
- **Next human steps:** VIAF email · CZ/DE press PDFs · Apple author profile claim (optional Kobo profile).
