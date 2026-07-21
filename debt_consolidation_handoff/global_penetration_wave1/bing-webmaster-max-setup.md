# Bing Webmaster Tools — Maximum Setup Checklist
**Prepared:** July 20, 2026 · Jason Carroll Holloway / Seventh City Press  
**No Bing MCP plugin exists** — use Bing dashboard + Copilot (in-account) + repo scripts below.

---

## Already done (verified Jul 20, 2026)

| Item | Author site | Imprint site |
|------|-------------|--------------|
| Property verified in Bing | ✓ (Jul 16) | ✓ (Jul 16) |
| Sitemap submitted | `https://jasoncholloway.com/sitemap.xml` | `https://seventhcitypress.com/sitemap.xml` |
| Sitemap in robots.txt | ✓ | ✓ (Jul 20 deploy) |
| IndexNow key live | ✓ 200 | ✓ 200 |
| IndexNow bulk submit | ✓ 202 Accepted Jul 20 | ✓ 202 Accepted Jul 20 |

IndexNow keys in repo: `public/dff6cb7e1f214700af8acbfc5ccff807.txt` (author) · `seventhcitypress/public/f4f7974a23924d2b84710b47590280b5.txt` (imprint)

**Canonical host:** apex only — `jasoncholloway.com` / `seventhcitypress.com` (www 301s via Cloudflare Worker).

---

## Do in Bing Webmaster Tools (both properties)

### A. Confirm foundation (5 min each property)

1. **Dashboard → Settings → Users** — confirm your Microsoft account owns both sites.
2. **Configure My Site → Settings** — preferred domain = **apex** (no www).
3. **Sitemaps** — confirm status **Success** for:
   - `https://jasoncholloway.com/sitemap.xml`
   - `https://seventhcitypress.com/sitemap.xml`
   - If errors: click **Resubmit** after tonight's deploy (sitemap now has trailing slashes + 34 URLs).
4. **IndexNow** (Settings or dedicated section) — paste API key if prompted:
   - Author: `dff6cb7e1f214700af8acbfc5ccff807`
   - Imprint: `f4f7974a23924d2b84710b47590280b5`
   - Key URLs must return 200: `https://{domain}/{key}.txt`

### B. URL Inspection — priority pages (10 min)

Inspect each URL → **Request indexing** if not indexed:

**jasoncholloway.com**
- `/`
- `/books/masters-x/the-inheritance-of-frequency/`
- `/field-notes/voynich-manuscript/`
- `/field-notes/strahov-monastery/`
- `/chamber/folio-visualizer/`
- `/books/hawkes-monograph/`

**seventhcitypress.com**
- `/`
- `/contact/`

### C. Site Scan — free SEO audit (10 min each)

1. **Site Scan** → Run full crawl on both domains.
2. Fix any **Critical** issues in code; **Warning** items — triage.
3. Re-run scan after deploy if canonical or redirect issues appear.

### D. Reports to baseline (15 min)

| Report | Action |
|--------|--------|
| **Search Performance** | Note impressions/clicks baseline for 30-day comparison |
| **Index Explorer** | Confirm ~48 author URLs + imprint URLs indexed |
| **Crawl Information** | Check for 404s, redirect chains, blocked resources |
| **Backlinks** | Export once — compare monthly |
| **Keyword Research** | Query: `voynich manuscript`, `literary conspiracy thriller`, `strahov library`, `masters x trilogy` |
| **SEO / GEO Report** | Fix any flagged meta description or H1 issues |
| **IndexNow Insights** | After Jul 20 submit — confirm URLs received |

### E. Copilot / AI search (Bing + Microsoft ecosystem)

1. **AI Performance** (if visible in dashboard) — baseline citation count.
2. Ensure **`public/llms.txt`** stays current (feeds AI crawlers; Bing/Copilot adjacent).
3. **Bing Places** (separate product) — only if you want local KC imprint listing; optional for pure web publisher.

### F. Connect adjacent Microsoft surfaces

| Product | URL | Worth doing? |
|---------|-----|--------------|
| **Import from Google Search Console** | Already done if sites imported | Keep GSC + BWT in sync |
| **Microsoft Clarity** | clarity.microsoft.com | Optional — free heatmaps on author site |
| **Microsoft Advertising** | ads.microsoft.com | Only if running paid search later |

---

## Repo commands (after each deploy)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway

# Author — re-ping all sitemap URLs to Bing/Yandex/etc.
powershell -File scripts\indexnow.ps1 -Action submit-sitemap `
  -Key "dff6cb7e1f214700af8acbfc5ccff807" -Domain "jasoncholloway.com"

# Imprint — after key file is live at seventhcitypress.com/{key}.txt
powershell -File scripts\indexnow.ps1 -Action submit-sitemap `
  -Key "f4f7974a23924d2b84710b47590280b5" -Domain "seventhcitypress.com" -SiteRoot ".\seventhcitypress"
```

---

## COPILOT PROMPT — paste inside Bing Webmaster Tools

Bing Copilot in the dashboard is limited to **~500 characters**. Use **Prompt 1** first, then follow-ups in new chats if needed.

Open **https://www.bing.com/webmasters** → **Copilot** → paste **one prompt at a time**:

### Prompt 1 — full audit (467 chars) ← start here

```
BWT consultant: Jason Carroll Holloway / Seventh City Press. Sites: jasoncholloway.com (~48 pages) + seventhcitypress.com. IndexNow live, apex canonical. Goal: Bing/Copilot for Voynich, Strahov, literary thrillers. Using MY account data: audit both sites (sitemap, index gaps, crawl errors, IndexNow, top 5 unindexed URLs each). Then P0 fixes in BWT, 10 keywords from Keyword Research, AI Performance/Copilot citations, 15-min/week checklist. Free tools only, no ads.
```

### Prompt 2 — author URL Inspection (226 chars)

```
For jasoncholloway.com: URL Inspection — top 5 priority pages not indexed (/, Voynich Field Note, folio visualizer, Inheritance of Frequency). Request indexing order. Any crawl errors or redirect issues from Site Scan?
```

### Prompt 3 — imprint + IndexNow (184 chars)

```
For seventhcitypress.com: sitemap status, index coverage, crawl errors. Keyword Research: 5 queries I could rank for. IndexNow Insights — did Jul 20 submissions arrive?
```

<details>
<summary>Long-form prompt (reference only — too long for BWT Copilot)</summary>

```
You are my Bing Webmaster Tools consultant. I am Jason Carroll Holloway, indie author/publisher (Seventh City Press). I have TWO verified properties:

1. https://jasoncholloway.com — literary conspiracy thriller site, ~48 pages (books, 12 Field Notes, Analysis Chamber tools). Apex canonical; www 301s to apex. Sitemap: https://jasoncholloway.com/sitemap.xml. IndexNow key live at https://jasoncholloway.com/dff6cb7e1f214700af8acbfc5ccff807.txt

2. https://seventhcitypress.com — imprint press kit site, 3 sitemap URLs. Sitemap: https://seventhcitypress.com/sitemap.xml. IndexNow key: f4f7974a23924d2b84710b47590280b5.txt

GOAL: Maximize Bing + Copilot search visibility for English-language readers interested in Voynich Manuscript, Prague/Strahov, literary thrillers (Eco/Kostova comps), and cymatics/archaeoacoustics. US + UK + EU discovery.

Using THIS account's data (not generic advice), give me:

1. AUDIT — For each property: sitemap health, index coverage gaps, crawl errors, IndexNow status, and top 5 URLs not indexed that should be.

2. FIX LIST — Prioritized P0/P1 actions I can do inside Bing Webmaster Tools today (URL inspection, sitemap resubmit, Site Scan, settings).

3. KEYWORD OPPORTUNITIES — From Keyword Research, list 10 queries where I could realistically rank with my existing Field Notes and book pages.

4. AI PERFORMANCE — If available, summarize how my site appears in Bing Copilot/AI answers and what to improve (structured data, llms.txt, FAQ content).

5. 30-DAY RHYTHM — What to check weekly in BWT for a solo publisher (15 min/week max).

Do not recommend paid Microsoft Advertising unless I ask. Focus on free Webmaster Tools features only.
```

</details>

---

## What Cursor cannot do for you

- **No Bing Webmaster MCP** — cannot log into your Microsoft account or click dashboard buttons.
- **Browser automation** stops at Sign In — you must be logged in for Copilot-in-dashboard.
- **Copilot connected to your account** (your note) is the right tool for account-specific audits — use the prompt above.

---

## Success criteria (30 days)

- [ ] Both sitemaps show **100% discovered URLs** indexed (or explain gaps)
- [ ] IndexNow Insights shows submissions from Jul 20, 2026
- [ ] Site Scan: zero critical errors on both domains
- [ ] Priority book + Field Note URLs show **Indexed** in URL Inspection
- [ ] Search Performance: measurable impressions on brand + Voynich queries
