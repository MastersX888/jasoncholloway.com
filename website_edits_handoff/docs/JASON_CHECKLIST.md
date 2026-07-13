# Jason's Checklist — Site Reconciliation + Email Integration
**Date:** July 12, 2026
**Based on:** live audit of both sites

---

## The one-line summary

Your imprint site is solid. The **author-site migration didn't fully deploy** — `jasoncholloway.com/press` still serves the old page (with an outdated legal entity and a wrong ISBN), and the `/press` redirect never went live. The fix is mostly redeploy + a handful of edits. Everything below is batched.

---

## BATCH 1 — Cursor agent does this (one session)

Hand your Cursor agent the file **`CURSOR_VERIFICATION_PROMPT.md`**. It runs a diagnostic first (to confirm *why* the last deploy didn't take), then applies all fixes, then verifies against the live site. It reports back to you at three checkpoints. This keeps you and Cursor on the same page.

What that one prompt covers:
- [ ] Diagnose stale-deploy vs uncommitted-fixes (root cause)
- [ ] `/press` → 301 redirect to imprint (+ delete `app/press/` route)
- [ ] Purge "Omniscript LLC" → "Seventh City Press LLC" everywhere
- [ ] Fix "aerospace research" → "acoustic research" on homepage (standardize logline)
- [ ] Remove `/press` from author sitemap
- [ ] `llms.txt` publisher URL → imprint
- [ ] Regenerate press-kit PDFs with imprint footer URLs
- [ ] Confirm the bad Hawkes ISBN `9798295777622` isn't referenced anywhere
- [ ] Wire the three emails into the author `/contact/` and `/about/` (role-based)
- [ ] Run the 7 verification `curl` checks and paste results

---

## BATCH 2 — You do this in Cloudflare dashboard (~10 min, no code)

- [ ] **Confirm Email Address Obfuscation is ON for `jasoncholloway.com`**
      Cloudflare → `jasoncholloway.com` → Scrape Shield → Email Address Obfuscation → **On**
      (It's already working on the imprint — this makes plain `mailto:` links auto-protected on the author site too, so Cursor doesn't have to hand-encode anything.)
- [ ] **Verify the three mailboxes actually receive mail** — send a test to each:
      - `jason@seventhcitypress.com`
      - `info@seventhcitypress.com`
      - `press@seventhcitypress.com`
      (You set these up in Google Workspace; just confirm delivery before they go public on the site.)

---

## BATCH 3 — External metadata (~30 min, do in one sitting)

I couldn't fully verify these from here (Wikidata is cache-only to me; your Goodreads/BookBub profiles were buried under other authors in search). **Check each yourself** and fix if needed:

- [ ] **Wikidata Q140275300** — add/confirm:
      - `official website` (P856) = `https://seventhcitypress.com/` (imprint) — and confirm `https://jasoncholloway.com/` is also present as author site
      - If there's a separate item for the imprint, link them (publisher ↔ founder)
- [ ] **Goodreads** (author ID 20924993) — confirm:
      - Publisher listed as "Seventh City Press" (not Omniscript, not blank)
      - Hawkes monograph ISBNs match the matrix (PB `9798295778247`, HC `9798349308444`)
      - Website link points to `jasoncholloway.com`
- [ ] **BookBub** — confirm author profile website = `jasoncholloway.com`, publisher = Seventh City Press
- [ ] **Amazon Author Central** — confirm bio + publisher consistent; no "Omniscript" anywhere
- [ ] **Google Search Console** — add `seventhcitypress.com` property, submit `https://seventhcitypress.com/sitemap.xml` (if not already)
- [ ] **Google Merchant Center** — after Cursor redeploys, confirm feed still valid (no product-URL changes were made, so it should be untouched — just verify no disapprovals)

---

## Email placement (the decision you made → what it means)

**Role-based split:**

| Address | Lives on | Purpose |
|---------|----------|---------|
| `press@seventhcitypress.com` | Imprint site (already live) | Media, reviewers, interviews |
| `info@seventhcitypress.com` | Author site `/contact/` | General public inquiries (the default) |
| `jason@seventhcitypress.com` | Author site `/contact/` + `/about/` | Direct-to-you line |

Rationale: press stays on the imprint where journalists land; general + personal live on the author site where readers land. No address is duplicated across both sites, so each has a clear "home."

---

## What's already good (no action)

- ✅ Imprint site: canonicals, JSON-LD, OG tags, all book links, PDF downloads, `press@` obfuscation
- ✅ Homepage + monograph page nav already point Press → imprint
- ✅ Monograph page has correct ISBNs
- ✅ Cross-site linking structure
- ✅ Google feed untouched (safe)

---

## Order of operations

1. **You:** Batch 2 (confirm mailboxes + obfuscation) — so emails are safe to publish
2. **Cursor:** Batch 1 (the verification prompt) — diagnose, fix, deploy, verify
3. **You:** Batch 3 (external metadata) — once the site is the clean source of truth
4. **You:** spot-check the 7 verification results Cursor pastes back
