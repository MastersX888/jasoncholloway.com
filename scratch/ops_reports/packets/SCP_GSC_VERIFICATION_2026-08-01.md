# SCP Google Search Console — Verification (AUTH-01)
**Prepared:** 2026-08-01 · **Status:** Claim 4 VERIFIED COMPLETE ~03:54 CT · AUTH-01 **CLOSED**

**Kickoff:** Jason said `start claim 4` 2026-08-03 ~03:50 CT.  
**Close:** Parent Cursor browser verified as Jason Holloway (`zh5779485@gmail.com`) ~03:54 CT.

---

## Evidence (parent browser)

| Check | Result |
|-------|--------|
| Account | Jason Holloway · `zh5779485@gmail.com` |
| Property | Domain `sc-domain:seventhcitypress.com` — Overview loads (verified ownership) |
| Sitemap | `https://seventhcitypress.com/sitemap.xml` |
| Sitemap submitted | Jul 22, 2026 |
| Sitemap last read | Jul 31, 2026 |
| Sitemap status | **Success** |

**Residual (NOT a claim fail):** Discovered pages = **3** only — post-claim hygiene (sitemap coverage / indexing follow-up). Does **not** block AUTH-01 close.

---

## Split status

| Property | Status | Evidence |
|----------|--------|----------|
| `sc-domain:jasoncholloway.com` (author) | **DONE** | PLATFORM_INVENTORY + Groundswell `GSC_SITE_URL` |
| `sc-domain:seventhcitypress.com` (imprint) | **DONE** | Claim 4 ~03:54 CT · Overview + sitemap Success |

---

## Exact steps (archive — completed)

### Preferred: Domain property (DNS TXT)
1. https://search.google.com/search-console → **Add property** → **Domain** → `seventhcitypress.com`.  
2. Google shows a TXT record (e.g. `google-site-verification=…`).  
3. Cloudflare DNS for seventhcitypress.com → Add TXT → paste **exactly** what Google shows.  
4. Wait for DNS → **Verify** in GSC.  
5. Submit sitemap: `https://seventhcitypress.com/sitemap.xml`.  
6. No code deploy required for DNS method.

### Alternate: HTML tag / GA
Documented for recovery only — Domain path used for this close.

---

## Agent will not
- Invent or guess a verification token  
- Treat discovered-pages=3 as claim failure (hygiene only)

**After verify:** wire service-account metrics later (separate SA gap; metrics may stay null until SA access).  
**Hygiene follow-up:** expand sitemap coverage / request indexing so discovered page count grows beyond 3.

**Week bar:** Claim 1+3+4 = **3/3** — Fri Aug 9 Top-5 bar **CLOSED** (Apple sidelined does not count). Claim 5 GBP = **bonus COMPLETE** ~04:09 CT. Next: `approve guerrilla plan` · draft review-ask · GSC 3-page hygiene.
