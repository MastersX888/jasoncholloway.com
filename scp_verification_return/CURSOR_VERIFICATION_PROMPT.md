# VERIFICATION PROMPT — Seventh City Press Migration Reconciliation
**For:** Cursor agent working in the `jasoncholloway` repo
**From:** Claude (audit performed against LIVE sites July 12, 2026)
**Goal:** Reconcile what is *deployed* with what is *in the repo*, then ship the remaining migration patches + integrate three new email addresses.

---

## 0. Why this exists (read first)

An audit of the two **live** sites turned up a discrepancy that points to a deploy problem, not just a code problem:

- The repo snapshot handed to Claude had `"acoustic research"` everywhere and **zero** occurrences of `"Omniscript"`.
- But **live** `jasoncholloway.com` shows:
  - Homepage: `"thirty years of classified aerospace research"` ← different word than repo
  - `/press` and `/contact/` footers: `"Seventh City Press, an imprint of Omniscript LLC"` ← string not in repo snapshot at all
  - `/press` returns **HTTP 200** (old page), not a 301 redirect
  - `/press` lists Hawkes monograph ISBN `9798295777622` (wrong — see §4)

**Interpretation:** the live deploy is running *older* code than the working tree, OR the last deploy built from a stale branch/output directory. Before applying any patches, confirm which. Section 1 is the diagnostic. Do it first and report results.

---

## 1. DIAGNOSTIC — run before changing anything

Report the output of each. Do not fix yet — just gather.

### 1a. What entity string is in the repo right now?
```bash
grep -rn "Omniscript" . --include="*.tsx" --include="*.ts" --include="*.py" --include="*.md" 2>/dev/null
grep -rn "Seventh City Press LLC" . --include="*.tsx" 2>/dev/null
grep -rn "an imprint of" . --include="*.tsx" 2>/dev/null
```
**Expected finding:** if `Omniscript` returns **nothing** but the live site shows it, the live deploy is stale. If it returns hits, those are live edits that never got standardized.

### 1b. What research word is in the homepage?
```bash
grep -rn "aerospace\|classified acoustic\|classified research" app/ 2>/dev/null
```
Note which file (`app/page.tsx` most likely) says `aerospace` vs `acoustic`.

### 1c. Does the /press route still exist as a buildable page?
```bash
ls -la app/press/ 2>/dev/null
cat public/_redirects 2>/dev/null
```
If `app/press/page.tsx` exists AND `_redirects` has no `/press` rule, that's why `/press` serves 200.

### 1d. What does the deploy actually build and push?
```bash
cat scratch/build_export.ps1 2>/dev/null
cat wrangler.toml 2>/dev/null
git log --oneline -10
git status
git branch -a
```
**Key questions to answer in your report:**
- Is the deployed Cloudflare Pages project building from `git` (auto-deploy on push) or from manual `wrangler pages deploy out`?
- If manual: is `out/` being regenerated before each deploy, or is a stale `out/` being pushed?
- Is there an uncommitted or unpushed commit that contains the "acoustic"/"Seventh City Press LLC" fixes that never reached production?

### 1e. Confirm the live vs local delta
```bash
# Fetch live and compare the footer entity string
curl -s https://jasoncholloway.com/press | grep -o "an imprint of[^<]*" | head -1
curl -s https://jasoncholloway.com/contact | grep -o "an imprint of[^<]*" | head -1
curl -sI https://jasoncholloway.com/press | grep -i "^HTTP\|^location"
```
Expected today: footer shows `Omniscript LLC`, `/press` returns `200`. After your fix + deploy, `/press` must return `301` → `https://seventhcitypress.com/`.

**→ Report all of §1 back before proceeding. If the diagnosis is "stale deploy," the fix may be as simple as rebuild + redeploy from a clean tree — in which case many §2 items may already be resolved in the repo and just need to ship.**

---

## 2. FIXES — apply after diagnostic

Apply every item. Each has a verification check in §5.

### 2a. `/press` → 301 redirect (kills the duplicate imprint page)

**`public/_redirects`** — ensure these lines exist (keep the existing www rule):
```
https://www.jasoncholloway.com/* https://jasoncholloway.com/:splat 301
/press    https://seventhcitypress.com/    301
/press/   https://seventhcitypress.com/    301
```

**Delete the route** so Next.js stops emitting a competing static page:
```bash
git rm -r app/press/
```
> On Cloudflare Pages, `_redirects` is evaluated before static assets, but a lingering `app/press/index.html` in `out/` can still win in some edge cases. Deleting the route removes all ambiguity. The redirect is the single source of truth for `/press`.

### 2b. Purge "Omniscript LLC" everywhere → "Seventh City Press LLC"

The legal entity is **Seventh City Press LLC**. If §1a found `Omniscript` in the repo, replace all occurrences. If §1a found nothing, the string lives only in the stale deploy and will vanish once you rebuild+redeploy — but grep the built `out/` after building to be certain:
```bash
grep -rn "Omniscript" . 2>/dev/null    # repo
npm run build && grep -rn "Omniscript" out/ 2>/dev/null    # built output must be empty
```
Canonical footer string (both sites already use this form on current pages):
```
© 2026 Jason Carroll Holloway · Seventh City Press · All rights reserved
```
Do **not** reintroduce any "imprint of [other entity]" line.

### 2c. Standardize the logline: "acoustic" not "aerospace"

The canonical wording (matches llms.txt, the press kit, and the imprint site) is:
> "...thirty years of classified **acoustic** research..."

The live homepage currently says **aerospace**. Find and fix:
```bash
grep -rn "aerospace" app/ components/ 2>/dev/null
```
Change `aerospace research` → `acoustic research` in the homepage hero/featured copy. (The grandfather being a U-2 pilot is aerospace *context*, but the inherited notebooks are consistently described as *acoustic research* everywhere else. One word, standardized.)

### 2d. Author-site nav/footer Press link → external imprint (if not already live)

Per §1, the homepage already points Press → `seventhcitypress.com` live, but confirm the **shared** Header/Footer components are patched so every page inherits it:

**`components/layout/Header.tsx`** — Press nav item:
```
{ href: "https://seventhcitypress.com/", label: "Press", external: true }
```
and render external items as plain `<a href>` (same-tab).

**`components/layout/Footer.tsx`** — Publisher column:
```
<a href="https://seventhcitypress.com/">Seventh City Press</a>
```

### 2e. Author `/contact/` page — wire up emails + fix dead press kit

The live `/contact/` still shows "Download Press Kit (Coming Soon)" and no email. Update `app/contact/page.tsx`:
- Replace "Coming Soon" with a working link OR point press-kit users to the imprint: `https://seventhcitypress.com/`
- Add the email addresses per §3 (role-based split)
- Sidebar press link → `https://seventhcitypress.com/` with text "Press & media kit at Seventh City Press →"

### 2f. `app/sitemap.ts` — remove `/press` entry
The imprint owns the press URL now. Remove:
```
{ url: `${baseUrl}/press`, ... }
```

### 2g. `public/llms.txt` — Publisher URL
```
Publisher section: https://seventhcitypress.com/
Key URLs: add "- Seventh City Press (imprint): https://seventhcitypress.com/"
```

### 2h. `scripts/generate_press_kit.py` — footer URLs
Replace `jasoncholloway.com/press` → `seventhcitypress.com` (3 occurrences: header_block url, headshots line, press-materials contact line). Then regenerate PDFs and redeploy both sites' `press-kit/` folders.

---

## 3. EMAIL INTEGRATION — role-based split

Three addresses now exist:
| Address | Role | Where it goes |
|---------|------|---------------|
| `jason@seventhcitypress.com` | Primary (personal) | Author site `/about/` and `/contact/` as the direct-to-author line |
| `info@seventhcitypress.com` | General inquiries | Author site `/contact/` as the public default |
| `press@seventhcitypress.com` | Media (already live on imprint) | Imprint site only — leave as-is |

### Placement spec

**Imprint site (`seventhcitypress` repo) — NO CHANGES to email.**
`press@seventhcitypress.com` is already correctly placed on the imprint contact page and footer. Leave it.

**Author site (`jasoncholloway` repo):**

1. **`app/contact/page.tsx`** — add an email block in the sidebar or under "Media & Press Inquiries":
   - General: `info@seventhcitypress.com` (label: "General inquiries")
   - Direct to author: `jason@seventhcitypress.com` (label: "Jason directly")
   - For media specifically, link out: "Media & review copies → [seventhcitypress.com](https://seventhcitypress.com/)" (routes to press@)

2. **`app/about/page.tsx`** (if it has a contact line) — `jason@seventhcitypress.com` as the personal contact.

3. **Obfuscation:** Cloudflare Email Address Obfuscation is already active (the imprint's `press@` renders as `/cdn-cgi/l/email-protection`). Confirm it's ON for `jasoncholloway.com` too (Cloudflare dash → Scrape Shield → Email Address Obfuscation). Then plain `mailto:` links in the source get auto-obfuscated at the edge — no manual encoding needed.

4. **JSON-LD contactPoint** (optional but good for schema): in `app/layout.tsx` Organization block, add:
   ```json
   "contactPoint": {
     "@type": "ContactPoint",
     "contactType": "General",
     "email": "info@seventhcitypress.com"
   }
   ```

---

## 4. DATA CORRECTION — Hawkes monograph ISBN

The live `/press` page lists the monograph as ISBN `9798295777622`. This is **wrong**. The correct, verified ISBNs (confirmed on the live `/books/hawkes-monograph/` page and in the master matrix) are:
- Paperback: `9798295778247`
- Hardcover: `9798349308444`
- Ebook: `9798295778926`

Deleting `app/press/` (§2a) removes the page carrying the bad number. **Also** grep to be sure the bad ISBN isn't referenced elsewhere:
```bash
grep -rn "9798295777622" . 2>/dev/null
```
If it appears anywhere else (data files, JSON-LD, press kit), correct it to `9798295778247` (PB) / `9798349308444` (HC).

---

## 5. VERIFICATION CHECKS — run after deploy, paste results back

```bash
# 5a. /press now redirects (expect: 301 + Location: https://seventhcitypress.com/)
curl -sI https://jasoncholloway.com/press | grep -iE "^HTTP|^location"
curl -sI https://jasoncholloway.com/press/ | grep -iE "^HTTP|^location"

# 5b. Product + feed URLs must NOT redirect (expect: 200)
curl -sI https://jasoncholloway.com/books/masters-x/omnibus/ | grep -i "^HTTP"
curl -sI https://jasoncholloway.com/feeds/google-shopping.csv | grep -i "^HTTP"
curl -sI https://jasoncholloway.com/chamber/research-archive/ | grep -i "^HTTP"

# 5c. Omniscript is gone from live (expect: empty)
curl -s https://jasoncholloway.com/contact | grep -o "Omniscript"
curl -s https://jasoncholloway.com/ | grep -o "Omniscript"

# 5d. Logline standardized (expect: "acoustic", not "aerospace")
curl -s https://jasoncholloway.com/ | grep -o "classified [a-z]* research"

# 5e. Bad ISBN gone from live (expect: empty)
curl -s https://jasoncholloway.com/press | grep -o "9798295777622"

# 5f. Emails present on author contact (expect: cdn-cgi/l/email-protection obfuscated links)
curl -s https://jasoncholloway.com/contact | grep -o "email-protection" | head -1

# 5g. Imprint still healthy (expect: 200 + press@ obfuscated)
curl -sI https://seventhcitypress.com/ | grep -i "^HTTP"
curl -s https://seventhcitypress.com/contact/ | grep -o "email-protection" | head -1
```

### Pass criteria
- [ ] 5a → both return `301` → `https://seventhcitypress.com/`
- [ ] 5b → all three return `200` (no accidental redirect of product/feed/chamber)
- [ ] 5c → empty (Omniscript purged)
- [ ] 5d → `classified acoustic research`
- [ ] 5e → empty (bad ISBN gone)
- [ ] 5f → obfuscated email link present on author contact
- [ ] 5g → imprint 200, press@ still obfuscated

---

## 6. DO NOT TOUCH

| Area | Reason |
|------|--------|
| `metadataBase` on author site | Stays `https://jasoncholloway.com` |
| `app/books/**` product canonicals | Live commerce |
| `public/feeds/google-shopping.csv` | Google Merchant Center — any URL change risks feed disapproval |
| `lib/data/books.ts` buy links | Commerce |
| `app/chamber/**`, `app/field-notes/**` | Author research content |
| Imprint site email (`press@`) | Already correct |

---

## 7. Report format

Reply with:
1. **§1 diagnostic output** + your one-line diagnosis (stale deploy vs uncommitted fixes vs both)
2. Which §2/§3 items were **already done in the repo** vs which you **newly applied**
3. **§5 verification output** after deploy
4. Any item you could not complete and why
