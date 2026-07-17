# ISNI + Authority Batch — Remaining Manual Steps
**ISNI:** 0000 0005 3044 7935  
**URI:** https://isni.org/isni/0000000530447935

**Already wired in code (Jul 16):** `app/layout.tsx`, `app/about/page.tsx`, `seventhcitypress/app/page.tsx`, `public/llms.txt`, `CANON.md`, `lib/data/authorAuthority.ts`

After deploy, complete these dashboards in one session (~20 min):

---

## 1. Wikidata (highest priority)

Open: https://www.wikidata.org/wiki/Q140275300

| Action | Property | Value |
|--------|----------|-------|
| Add statement | **ISNI** (P213) | `0000 0005 3044 7935` |
| Add if missing | **official website** (P856) | `https://seventhcitypress.com/` |
| Add reference | stated in | `https://isni.org/isni/0000000530447935` |

Save. Wikidata will propagate to VIAF over time.

---

## 2. Open Library

https://openlibrary.org/authors/create or edit existing author

- Name: Jason Carroll Holloway
- ISNI: 0000 0005 3044 7935
- Add works by ISBN (4 ebook + print editions as listed in CANON.md)

---

## 3. Amazon Author Central — no ISNI field

https://authorcentral.amazon.com

Amazon does **not** expose ISNI or external authority IDs in Author Central. Your Amazon identity is the store URL:

`https://www.amazon.com/stores/Jason-Holloway/author/B08P54N4XZ`

**What to verify instead (Profile tab):**
- Bio mentions Seventh City Press + jasoncholloway.com
- All 3 Kindle titles claimed under your profile
- No stale "Omniscript" references

ISNI propagation to Amazon happens indirectly via Wikidata/VIAF and your site JSON-LD — not through a dashboard field.

---

## 4. Google Books Partner

https://books.google.com/partner

- Link author profile to Play Books catalog
- Reference ISNI in author metadata if available

---

## 5. Bookshop.org author page

Claim/optimize author page; add site link (affiliate 126177 already active)

---

## Deploy (required for site JSON-LD to go live)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
powershell -File scratch/build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
cd seventhcitypress
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
# Purge cache both Cloudflare Pages projects
```

---

## Verify after deploy

View source on https://jasoncholloway.com/ — search for `0000000530447935` in JSON-LD.

Rich Results Test: https://search.google.com/test/rich-results?url=https://jasoncholloway.com/about/
