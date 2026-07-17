# Loose Ends Register — Cognitive Debt
**Snapshot:** July 16, 2026 (post live audit)  
**Audit detail:** `AUDIT_REPORT.md` · **Ops truth:** `../FOUNDATION_STATUS.md`

**Status key:** `open` · `fixed-live` · `fixed-source` · `deferred` · `verify`

**Owner key:** `[JASON]` · `[CURSOR]` · `[CLAUDE]` · `[EXT]`

---

## P0 — Foundation blockers

| ID | Item | Status | Owner | Notes |
|----|------|--------|-------|-------|
| P0-01 | Deploy built `out/` to production | **fixed-live** | [CURSOR] | Jul 17 deploy — both Pages projects |
| P0-02 | Purge Cloudflare cache (both Pages projects) | verify | [JASON] | User purged Jul 16; redeployed Jul 17 |
| P0-03 | www → apex redirect (both domains) | **fixed-live** | [CURSOR] | Worker `www-to-apex`; www removed from Pages domains |
| P0-04 | Commit or discard uncommitted working tree | open | [JASON] | Press kit PDFs + copy changes in diff |
| P0-05 | Canonical status doc sprawl | **fixed-source** | [CURSOR] | `FOUNDATION_STATUS.md` is now ops truth |

---

## P1 — Should fix during foundation sprint

### Dashboard / manual

| ID | Item | Status | Owner |
|----|------|--------|-------|
| P1-10 | Add seventhcitypress.com to Google Search Console | open | [JASON] |
| P1-11 | Wikidata Q140275300 — P856 = seventhcitypress.com | open | [JASON] |
| P1-12 | Google Business Profile import | open | [JASON] |
| P1-13 | Verify Goodreads / BookBub / Amazon Author Central | open | [JASON] |
| P1-15 | ISNI on site JSON-LD + llms.txt | **fixed-source** | [CURSOR] | Jul 16 |
| P1-15b | Wikidata P213 + Open Library | open | [JASON] | ISNI_AUTHORITY_BATCH.md |
| P1-16 | LoC PCN / VIAF | open | [JASON] |
| P1-17 | Google Books Partner + Open Library | open | [JASON] |
| P1-20 | Hawkes EPUB "sixteen novels" in IngramSpark | open | [JASON][EXT] |

### Website (verified closed on live — removed from active debt)

| ID | Item | Status | Notes |
|----|------|--------|-------|
| ~~P1-30~~ | `/books/` 404 | **fixed-live** | 200 verified Jul 16 |
| ~~P1-31~~ | Footer bad IngramSpark link | **fixed-live** | Not in Footer.tsx |
| ~~P1-32~~ | Omnibus missing from footer | **fixed-live** | Link present |
| ~~P1-33~~ | JSON-LD Offers missing | **fixed-live** | On live book pages |
| ~~P0-02-old~~ | Folio case sensitivity | **fixed-live** | voynich2-009.jpg → 200 |
| ~~GS-02~~ | Groundswell seventhcitypress.com term | **fixed-source** | enabled: true in terms.json |
| ~~SCP-03~~ | Delete app/press/ dead route | **fixed-source** | Not in app/ |

### Still optional

| ID | Item | Status | Owner |
|----|------|--------|-------|
| P1-34 | Imprint-specific OG image | deferred | [JASON] |
| P1-35 | Separate Web3Forms key for imprint | deferred | [JASON] |

---

## P2 — Nice to have / post-foundation

| ID | Item | Status | Owner |
|----|------|--------|-------|
| P2-01 | Gold button discipline on mobile | documented | [JASON] |
| P2-02 | Inline style → CSS utilities | open | [CURSOR] |
| P2-03 | Omnibus PB dedicated cover art | deferred | [JASON] |
| P2-04 | Email provider (MailerLite etc.) | deferred | [JASON] |
| P2-08 | Device test matrix 412px | open | [CURSOR] |

---

## CREATIVE PIPELINE DEBT (not blocking web foundation)

| ID | Item | Status | Owner |
|----|------|--------|-------|
| ENC-05 | Encyclopedia print via BookVault | open | [JASON] |
| AUD-02 | Audible/ACX listing | open | [JASON] |
| YT-03 | YouTube channel creation | verify | [JASON] |
| C-06 | Encyclopedia page target (560–680 pp) | deferred | [JASON] |

---

## DEBT SUMMARY (post-audit)

| Category | Open | Fixed | Deferred |
|----------|------|-------|----------|
| P0 Foundation | 4 | 1 | 0 |
| P1 Dashboard | 8 | 0 | 2 |
| P1 Website (closed) | 0 | 6 | 0 |
| P2 Polish | 3 | 0 | 2 |
| Creative pipelines | 3 | 0 | 1 |
| **Active open items** | **18** | **7 closed this pass** | **5** |

---

## 30-minute foundation close (Jason)

1. `git diff` — review press kit + copy changes
2. `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`
3. Purge cache (both Pages projects)
4. Cloudflare Redirect Rules for www (see `DEPLOY_RUNBOOK.md`)
5. GSC: add seventhcitypress.com

After that, web Layer 1 is closed. Layer 2 = authority records (ISNI, Wikidata, GBP).
