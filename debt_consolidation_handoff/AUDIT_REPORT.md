# Live Audit Report — July 16, 2026
**Performed by:** Cursor (automated HEAD/GET checks + source verification + build)

---

## Summary

The web foundation is **substantially solid**. Both sites respond 200, imprint split redirects work, folio images load, Elevation IV features (GA4, Bookshop) are on production, and old P0 website bugs from July punch lists are resolved on live.

**Three gaps remain before calling foundation "closed":**
1. Deploy pending (build succeeded; wrangler blocked on missing API token)
2. www hostnames serve 200 instead of redirecting to apex
3. Dashboard authority tasks (GSC imprint, Wikidata P856, ISNI, GBP)

---

## URL verification matrix

| URL | HTTP | Notes |
|-----|------|-------|
| jasoncholloway.com/ | 200 | OK |
| seventhcitypress.com/ | 200 | OK |
| jasoncholloway.com/books/ | 200 | Former P0 404 — fixed |
| jasoncholloway.com/books/masters-x/omnibus/ | 200 | OK |
| jasoncholloway.com/chamber/folio-visualizer/ | 200 | OK |
| jasoncholloway.com/feeds/google-shopping.csv | 200 | OK |
| jasoncholloway.com/press | 301 | → seventhcitypress.com |
| jasoncholloway.com/press-kit/Masters_X_Press_Kit.pdf | 301→200 | → SCP press-kit PDF |
| seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf | 200 | OK |
| www.jasoncholloway.com/ | **200** | **FAIL** — duplicate hostname, no redirect |
| www.seventhcitypress.com/ | **200** | **FAIL** — duplicate hostname, no redirect |
| folios/.../voynich2-009.jpg | 200 | Case fix deployed |
| folios/.../Voynich2-009.jpg | 404 | Correct (wrong case) |
| folios/.../vol3-001.jpg | 200 | Vol 3 naming is vol3-* not voynich3-* |

---

## Source vs live

| Item | Source | Live | Gap |
|------|--------|------|-----|
| Press kit PDFs (regenerated) | Modified locally | Older version until deploy | Deploy needed |
| llms.txt updates | Modified locally | Unknown until deploy | Deploy needed |
| GA4 + Bookshop | In git (a4c5eba+) | Present on live | None |
| JSON-LD Offers | In source | Present on live | None |
| Groundswell seventhcitypress.com term | enabled: true | Worker deploy unverified | Low priority |

---

## Build result (Jul 16, 2026)

```
powershell -File scratch/build_export.ps1 → BUILD OK
48 static routes generated
Merged into out/
```

Deploy attempt failed: `CLOUDFLARE_API_TOKEN` not available in non-interactive environment.

---

## Items removed from debt register (verified closed)

- P0-02 Folio visualizer case fix — **live**
- P1-30 `/books/` 404 — **live 200**
- P1-31 Footer IngramSpark link — **not present in Footer.tsx**
- P1-32 Omnibus in footer — **present**
- P1-33 JSON-LD Offers — **live**
- GS-02 Groundswell seventhcitypress.com term — **enabled in terms.json**
- SCP dead `app/press/` route — **already deleted from source**

---

## Recommended immediate actions (Jason, ~30 min)

1. Review `git diff` (press kit + copy changes)
2. Deploy: `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`
3. Purge cache on both Cloudflare Pages projects
4. Add Cloudflare Redirect Rules (see DEPLOY_RUNBOOK.md § www→apex)
5. GSC: add seventhcitypress.com property
