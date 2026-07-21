# Search Indexing Wave 4 — Multi-Engine Submission
**Prepared:** July 20, 2026 · Jason Carroll Holloway / Seventh City Press  
**Scope:** Everything beyond Google Search Console + Bing Webmaster Tools

---

## Done automatically (Jul 20, 2026 — Cursor session)

| Action | Author | Imprint | Result |
|--------|--------|---------|--------|
| IndexNow bulk POST (full sitemap) | 34 URLs | 3 URLs | **200 OK** |
| IndexNow partner GET pings (Bing, Yandex, Seznam, Naver, Yep) | homepage + sitemap | homepage + sitemap | **200/202** |
| Yandex legacy sitemap ping | sitemap.xml | sitemap.xml | **200** |
| Brave Search manual submit | `/`, Voynich Field Note | `/` | **Submitted** |
| Internet Archive Save Page Now | 5 priority pages | homepage | **200** (contact page failed — retry manually) |
| Live endpoint verification | sitemap, robots, llms, IndexNow keys | same | **all 200** |

### Internet Archive captures (verify in Wayback)

- https://web.archive.org/web/*/https://jasoncholloway.com/
- https://web.archive.org/web/*/https://jasoncholloway.com/field-notes/voynich-manuscript/
- https://web.archive.org/web/*/https://jasoncholloway.com/field-notes/strahov-monastery/
- https://web.archive.org/web/*/https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/
- https://web.archive.org/web/*/https://seventhcitypress.com/

**Manual retry:** https://web.archive.org/save/https://seventhcitypress.com/contact/

---

## Engines covered without login

| Engine | How | Status |
|--------|-----|--------|
| **Bing** | BWT + IndexNow | ✓ |
| **Yandex** | IndexNow + sitemap ping | ✓ (dashboard optional) |
| **Seznam.cz** | IndexNow + robots.txt sitemap | ✓ (dashboard optional — high value for Prague content) |
| **Naver** | IndexNow | ✓ |
| **Yep** | IndexNow | ✓ |
| **DuckDuckGo / Ecosia / Qwant** | Inherit Bing index | ✓ via Bing |
| **Brave Search** | Manual URL submit | ✓ partial (3 URLs) |
| **Internet Archive** | Save Page Now | ✓ 5/6 pages |

**No webmaster login required** for the above — already executed.

---

## Post-deploy one-liner (both sites)

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway

powershell -File scripts\indexnow.ps1 -Action submit-all `
  -Key "dff6cb7e1f214700af8acbfc5ccff807" -Domain "jasoncholloway.com"

powershell -File scripts\indexnow.ps1 -Action submit-all `
  -Key "f4f7974a23924d2b84710b47590280b5" -Domain "seventhcitypress.com" -SiteRoot ".\seventhcitypress"
```

`submit-all` = full sitemap POST + partner GET pings + Yandex sitemap ping.

**Brave** (no API): re-submit homepage after major deploys → https://search.brave.com/submit-url

---

## Requires your login (~45 min total)

### Tier A — Search dashboards (monitoring + crawl stats)

| Platform | URL | Time | Why |
|----------|-----|------|-----|
| **Yandex Webmaster** | https://webmaster.yandex.com/ | ✓ Jul 20 | Both properties verified; sitemaps queued |
| **Seznam Webmaster** | https://reporter.seznam.cz/wm | **Deferred** | IndexNow already pings Seznam; dashboard optional. Google OAuth returns blank/500 — retry with Microsoft or email signup later. |

Verification: HTML meta tag or file upload (same pattern as GSC/Bing).

### Tier B — Book/author metadata graphs (not URL crawlers)

Prepped in this folder — paste/upload manually:

| Platform | File | Time |
|----------|------|------|
| **Wikidata** | `wikidata-quickstatements.txt` | 10 min |
| **Open Library** | `open-library-records.json` | 30 min |
| **Google Books Partner** | `google-books-partner-wave1_utf16.csv` | 15 min |
| **Goodreads + StoryGraph** | `goodreads-comp-shelves.md` | 30 min |
| **Apple + Kobo** | `apple-kobo-claim-checklist.md` | 45 min |

### Tier C — Visual/social discovery

| Platform | File | Time |
|----------|------|------|
| **Pinterest** | `pinterest-p1-admin-checklist.md` | 15 min |
| **YouTube** | `youtube-video-01-voynich-prague.md` etc. | when filmed |

---

## Skip (low ROI or no submission API)

| Platform | Reason |
|----------|--------|
| **Baidu** | China-only; English literary thriller |
| **Mojeek** | No free submit — crawler discovers via links |
| **DuckDuckGo / Ecosia** | No webmaster tools |
| **Apple Search (Spotlight)** | Applebot allowed in robots; no site submit portal |

---

## Recommended order tonight

1. ~~IndexNow all engines~~ ✓ done  
2. ~~Brave submit~~ ✓ done (add more URLs anytime)  
3. ~~Internet Archive~~ ✓ done (retry SCP contact manually)  
4. **Yandex Webmaster** — verify + confirm sitemap  
5. **Seznam Webmaster** — verify + confirm sitemap  
6. **Wikidata** — 10 min, highest metadata leverage  
7. **Open Library + Goodreads** — reader discovery  

---

## Success criteria (30 days)

- [ ] Yandex + Seznam dashboards show verified properties
- [ ] Brave Search returns `site:jasoncholloway.com` with Field Notes indexed
- [ ] Wayback Machine shows Jul 2026 captures for priority pages
- [ ] Wikidata QID live for Jason Carroll Holloway + Masters X works
- [ ] Goodreads author page linked to jasoncholloway.com
