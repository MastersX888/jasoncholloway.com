# Setup Guide — Seventh City Press Domain (Two Cloudflare Projects)

**For:** Jason Carroll Holloway  
**Domain registrar:** IONOS (`seventhcitypress.com`)  
**Hosting:** Cloudflare Pages (two projects)  
**Implementation:** Claude/Fable via handoff zip · you run DNS steps below

---

## Overview (30,000 ft)

```
[IONOS] seventhcitypress.com
    ↓ nameservers
[Cloudflare DNS]
    ↓
[Cloudflare Pages project: seventhcitypress]  →  imprint site (press home)
[Cloudflare Pages project: jasoncholloway]    →  author site (unchanged + /press redirect)
```

**Time:** ~2 hours spread over 2 days (DNS propagation + Claude build + deploy).

---

## Part A — Cloudflare: add the domain (you, ~20 min)

### A1. Add site to Cloudflare (if not already)

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Add a site** → enter `seventhcitypress.com`
3. Select **Free** plan
4. Cloudflare scans existing DNS — OK to continue
5. Copy the **two nameservers** shown (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)

### A2. Point IONOS to Cloudflare

1. Log in to **IONOS** → Domains → `seventhcitypress.com`
2. **Nameserver settings** (not DNS records) → **Custom nameservers**
3. Replace IONOS nameservers with Cloudflare’s two
4. Save — propagation takes **15 min – 48 hrs** (usually < 2 hrs)

### A3. Confirm in Cloudflare

1. Cloudflare dashboard → `seventhcitypress.com` → should show **Active**
2. **DNS** → Records:
   - Delete any conflicting A/CNAME IONOS parked page records if present
   - You will add Pages records in Part C — **wait until imprint site is deployed**

---

## Part B — Claude builds the imprint site (handoff zip)

1. Upload **`masters-x-seventhcitypress-handoff.zip`** from Downloads to Claude
2. Prompt: *Start with `seventhcitypress_handoff/CLAUDE_SCP_SITE_PROMPT.md`*
3. Claude returns **`seventhcitypress-site-RETURN.zip`** (or commits to repo)
4. You (or Cursor) merge into repo at `seventhcitypress/`

**Do not proceed to Part C until** `npm run build` succeeds locally in `seventhcitypress/`.

---

## Part C — Create Cloudflare Pages project: `seventhcitypress` (~15 min)

### C1. Create project

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**  
   **OR** **Direct Upload** if not using Git for imprint yet
2. Project name: **`seventhcitypress`** (exact — matches wrangler)
3. If Git: connect `jasoncholloway` repo, root directory `/seventhcitypress`, build `npm run build`, output `out`

### C2. First deploy (manual)

From repo root on your machine:

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\seventhcitypress
npm install
npm run build
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

Note the `*.pages.dev` preview URL — open it and verify press content at `/`.

### C3. Attach custom domain

1. Pages → **seventhcitypress** → **Custom domains** → **Set up a domain**
2. Add `seventhcitypress.com`
3. Add `www.seventhcitypress.com` → configure **Redirect** `www` → apex (match author site pattern)
4. Cloudflare auto-creates DNS records when domain is on same account

### C4. SSL

Wait for **SSL/TLS → Edge Certificates** to show **Active** for both hostnames.

### C5. Verify imprint site

- [ ] `https://seventhcitypress.com/` loads press homepage
- [ ] `https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf` downloads
- [ ] Book links go to `jasoncholloway.com/books/...`
- [ ] No mixed-content warnings

---

## Part D — Update author site + redirect (~15 min)

**Only after Part C passes.**

Claude/Cursor applies patches in `AUTHOR_SITE_MIGRATION.md`, then you deploy author site:

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
powershell -File scratch/build_export.ps1
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main
```

### D1. Redirects (`public/_redirects`)

Must include (Cloudflare Pages format):

```
https://www.jasoncholloway.com/* https://jasoncholloway.com/:splat 301
/press    https://seventhcitypress.com/    301
/press/   https://seventhcitypress.com/    301
```

Optional (if press-kit moves to imprint only):

```
/press-kit/*    https://seventhcitypress.com/press-kit/:splat    301
```

### D2. Verify redirects

- [ ] `https://jasoncholloway.com/press` → `https://seventhcitypress.com/` (301)
- [ ] `https://jasoncholloway.com/books/masters-x/` still loads (no redirect)
- [ ] `https://jasoncholloway.com/feeds/google-shopping.csv` still loads

---

## Part E — External metadata (~30 min, same week)

| Task | Where | Action |
|------|-------|--------|
| Search Console | Google | Add `seventhcitypress.com` property; submit sitemap |
| Wikidata | Q140275300 | Add imprint `official website` = SCP URL |
| `llms.txt` | Author repo | Publisher URL → `https://seventhcitypress.com/` |
| Press kit PDFs | Regenerate | Run `scripts/generate_press_kit.py` after URL patch |
| Merchant Center | Google | **No change** to feed URL or product links |
| Groundswell | `terms.json` | Enable `seventhcitypress.com` tier-3 term |

---

## Part F — Troubleshooting

| Symptom | Fix |
|---------|-----|
| SCP domain shows IONOS parking | Nameservers not propagated — wait or recheck IONOS |
| SSL pending | Wait 15 min; ensure orange-cloud proxy on DNS |
| `/press` redirect loop | SCP must not redirect back to author `/press` |
| Broken cover images on SCP | Copy `public/covers/` into imprint `public/covers/` |
| PDF 404 on SCP | Copy `public/press-kit/` into imprint project |
| Merchant errors | Unrelated if feed URL unchanged — check US-only countries |

---

## Checklist summary

```
[ ] A  IONOS NS → Cloudflare
[ ] B  Claude imprint site built (`seventhcitypress/`)
[ ] C  Pages project `seventhcitypress` deployed + custom domain
[ ] D  Author site patched + `/press` 301 deployed
[ ] E  Search Console + llms.txt + press kit regen
[ ] F  Full verification (books, feed, redirect, PDFs)
```

---

## Who does what

| Step | You | Claude/Cursor |
|------|-----|----------------|
| IONOS nameservers | ✓ | — |
| Build imprint Next.js site | — | ✓ |
| Author site patches | Review | ✓ |
| `wrangler pages deploy` both | ✓ | Can script |
| Search Console / Wikidata | ✓ | — |

---

## Handoff files

| File | Purpose |
|------|---------|
| `CLAUDE_SCP_SITE_PROMPT.md` | Claude implementation mission |
| `ARCHITECTURE.md` | Two-project map |
| `AUTHOR_SITE_MIGRATION.md` | Exact author-repo changes |
| `SETUP_GUIDE.md` | This document |

**Zip:** `Downloads/masters-x-seventhcitypress-handoff.zip`
