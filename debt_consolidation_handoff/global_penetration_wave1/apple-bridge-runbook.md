# Apple Books Bridge — Agent Runbook (Wave 1)

**Good news:** All 4 EPUBs are **already live on Apple Books** (Ingram distribution). iTunes Search API confirmed 2026-07-18.

**Bridge browser:** Cursor IDE browser tab.  
**Login URL:** https://appstoreconnect.apple.com/login  
**Catalog check (no login):** iTunes Search API + links below.

---

## Pre-flight (Jason — manual, ~2 min)

1. Open **App Store Connect** in the Cursor browser tab (agent navigated there).
2. Sign in with your **Apple ID** (publisher / iTunes Connect account tied to Seventh City Press or personal).
3. Complete 2FA on your device if prompted.
4. Confirm you see **Apps** or **Books** / **My Books** (Apple Books publisher dashboard).
5. Reply **"Apple logged in"** — agent continues metadata + territories pass.

**If you don't have iTunes Connect yet:**  
https://authors.apple.com/support/5183-create-an-itunes-connect-account  
(Est. 15 min — tax/banking for royalties if direct; Ingram titles may already be live without your account.)

**Bridge blocker:** Apple login often fails in embedded browser popups — use **Take Control** or finish login in Safari/Chrome then return to App Store Connect tab.

---

## Live titles (verify / claim)

| Vol | Apple ID | Store link |
|-----|----------|------------|
| Vol I | 6770156203 | https://books.apple.com/us/book/masters-x/id6770156203 |
| Vol II | 6770155775 | https://books.apple.com/us/book/masters-x/id6770155775 |
| Vol III | 6770156974 | https://books.apple.com/us/book/masters-x/id6770156974 |
| Hawkes | 6769561655 | https://books.apple.com/us/book/innocence-desire-and-the-architecture-of-the-fall/id6769561655 |

**Release date:** 2026-06-01 (trilogy) · 2026-04-02 (Hawkes)  
**Author on store:** Jason Carroll Holloway ✓

---

## What “claim” means on Apple (not like Amazon Author Central)

Apple has **no public author profile page** to claim. Your books cluster by **consistent author name** in metadata (already correct).

Your job in App Store Connect (if you have publisher access):

1. **Find titles** in My Books (may appear under Ingram / aggregator if not direct-uploaded).
2. **Rights & Pricing** → enable **all territories** (Worldwide).
3. **Metadata** → verify title, subtitle, series, categories, description, keywords.
4. **Price** → $6.99 trilogy vols · $9.99 Hawkes (match KDP).

If titles **don't appear** in your dashboard (common with Ingram-only), you still win on discoverability — store listings are live. Optional: contact Apple Books Partner Support to link your iTunes Connect account to Ingram-delivered titles.

---

## Copy-paste metadata (if edit access)

**Author name (exact):** Jason Carroll Holloway  
**Publisher:** Seventh City Press  
**Series:** Masters X  

| Vol | Title | Subtitle | Series # | EPUB ISBN |
|-----|-------|----------|----------|-----------|
| I | Masters X | The Inheritance of Frequency | 1 | 9798256008819 |
| II | Masters X | The Grimoire | 2 | 9798256009625 |
| III | Masters X | The Kingdom | 3 | 9798256009809 |

**Categories:** Fiction → Literary · Fiction → Thrillers & Suspense  

**Keywords (50 chars each):** Voynich · Prague · Strahov · Foucault's Pendulum · Dan Brown · literary thriller · medieval manuscripts · conspiracy  

**Short bio (280 chars):**

Jason Carroll Holloway is the author of the Masters X trilogy — a literary conspiracy thriller linking Prague's Strahov Library, medieval manuscripts, and acoustic science. Seventh City Press. For readers of Eco, Brown, and Kostova.

**Long bio:**

Jason Carroll Holloway holds an M.A. in English Literature from Mercy University. He is the author of the Masters X trilogy (Seventh City Press) — a literary conspiracy thriller for readers of Umberto Eco's Foucault's Pendulum, Dan Brown, and Elizabeth Kostova's The Historian. His work bridges real medieval history (Prague, Voynich-adjacent themes, Strahov Monastery) with fiction. He lives in Kansas City. https://jasoncholloway.com/

---

## Agent steps after login

1. Navigate My Books → list all titles by Jason Carroll Holloway
2. For each title: Rights & Pricing → all territories → save
3. Metadata pass: subtitle + series number + categories
4. Spot-check UK store: change country on books.apple.com → search "Jason Carroll Holloway"
5. Report: which titles editable vs Ingram-locked

---

## Success criteria

- [ ] 4 EPUBs discoverable on Apple Books US **(already ✓)**
- [ ] UK storefront search returns Masters X Vol I
- [ ] Worldwide territories enabled (if dashboard access)
- [ ] Metadata matches table above (if editable)

**Est. time:** 20 min if Ingram-only verify · 45 min if full iTunes Connect edit access
