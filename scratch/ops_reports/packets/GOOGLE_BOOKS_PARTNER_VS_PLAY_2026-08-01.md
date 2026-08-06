# AUTH-06 — Google Books Partner ≠ Google Play
**Prepared:** 2026-08-01 · **Status:** VERIFIED COMPLETE (Claim 3) — CLOSED 2026-08-03 ~02:57 CT

---

## Clarification card (memorize)

| Surface | What it is | SCP status |
|---------|------------|------------|
| **Google Play Books** | Retail storefront — sell EPUBs | **LIVE** Jul 31 — 4 titles (PUB-01). Partner Center for Play. |
| **Google Books Partner** | Books preview / indexing / “Look Inside” style discovery on books.google.com | **VERIFIED COMPLETE (Claim 3)** (AUTH-06 CLOSED). `books.google.com/partner` **redirects to Play Books Partner Center** — Google merged Partner Program into the same Partner Center (confirmed via Google Help). |

Conflating them was the #1 discovery claim error in late-night scrum audit — now resolved: one Partner Center covers both.

---

## Evidence (parent Cursor browser · 2026-08-03 ~02:57 CT)

1. `books.google.com/partner` → Play Books Partner Center (merged program).
2. Logged in: **Jason Holloway** (`zh5779485@gmail.com`), account `/a/18360388366044352902`.
3. Book catalog **4/4 Live** with correct EPUB ISBNs:
   - 9798256008819 · 9798256009625 · 9798256009809 · 9798295778926
4. Account settings: Country **US**; address starts with **Seventh City Press, Jason Holloway** (Garden City ID); phone present.

---

## Why Partner still matters after Play is live
- Preview snippets and search index beyond the Play buy button  
- Strengthens entity graph with Wikidata / OL / site `sameAs`  
- Library and academic discovery often hit books.google.com first

---

## Jason step-by-step (~20 min + review lag) — DONE

1. Open https://books.google.com/partner (or Partner Center → Books if Google redirects). ✅  
2. Sign in with the Google account that owns Play uploads. ✅  
3. **Apply / enable Books Partner** — publisher profile Seventh City Press. ✅ (merged into Play Partner Center)  
4. **Add books** by ISBN / catalog. ✅ 4/4 Live  
5. Upload EPUB or PDF for preview where required. ✅ (via Play catalog)  
6. Link / claim existing Google Books records. ✅  
7. Confirm Hawkes description shows **seventeen** (verified on books.google.com 2026-08-01 scrape — good).  
8. Dashboard live evidence → Morgan closes AUTH-06. ✅

### ISBN checklist
| Title | ISBN | Status |
|-------|------|--------|
| Vol I EPUB | 9798256008819 | **Live** |
| Vol II EPUB | 9798256009625 | **Live** |
| Vol III EPUB | 9798256009809 | **Live** |
| Hawkes EPUB | 9798295778926 | **Live** |
| Optional print | PB ISBNs if Partner accepts print records | n/a tonight |

### Reply phrases (Claim 3) — closed
- `claim 3 logged in` — done ~02:48 CT
- `claim 3 done` — done ~02:57 CT
- `next claim` / `start claim 4` — advance to SCP GSC (`seventhcitypress.com`)

---

## Evidence rule
CLOSED on parent-browser dashboard evidence (4/4 Live + publisher identity Seventh City Press). No further Jason action on AUTH-06.
