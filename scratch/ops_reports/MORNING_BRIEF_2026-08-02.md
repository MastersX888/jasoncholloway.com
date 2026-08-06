# Morning Brief — Sunday, Aug 2, 2026

**Morgan · overnight autonomous pass · ~02:00–03:00 CT**  
**Prior context:** Phase 4 deploy live · VIAF sent · Vivian QC cleared outbound class

---

## DONE overnight (agent)

| Item | Result |
|------|--------|
| **Indie emails (Draft 16)** | **SENT ×3** from `scp-jason` — Rainy Day, Prospero's, Raven (Vivian PASS) |
| **VIAF** | Already sent Phase 4 — no duplicate |
| **NetGalley** | Skipped — budget hold (~$575) |
| **Hawkes/academic** | NOT sent — personalization gate (Drafts 14/15 untouched) |
| **Shelf Awareness** | NOT sent — HOLD |
| **Entity graph** | Phase 4 live verify stands: OL16482975A on both homepages; shopping feed seventeen; press PDFs clean |
| **Ops rollups** | Updated `groundswell-monitor/public/data/ops_rollups.json` + `lib/data/ops-sweep.ts` |
| **StoryGraph / Goodreads / Books Partner / GBP / GSC** | Browser MCP **blocked** — zero tabs (same as prior run) |
| **C: drive cleanup** | Subagent 2026-08-01 — **~0.16 GB free CRITICAL** (OneDrive ~77 GB hog). Report: `scratch/ops_reports/C_DRIVE_CLEANUP_2026-08-01.md` |

### Indie send confirmations (scp-jason Sent)

| Store | To | Message-ID |
|-------|-----|--------------|
| Rainy Day Books | mailbox@rainydaybooks.com | `3c6a0b17-25e1-a011-ab35-cc791b338c79@seventhcitypress.com` |
| Prospero's Books | info@prosperosbookstore.com | `f56deb6d-3cdb-b514-c718-6ec1ab63297a@seventhcitypress.com` |
| The Raven Book Store | raven@ravenbookstore.com | `c39fbdd8-aeec-305e-0d82-87e76d687b1b@seventhcitypress.com` |

---

## JASON morning clicks (≤5)

Do these in order — **P0 C: drive first (~5 min)**, then ~45 min.

0. **C: drive — OneDrive "Free up space" (P0, ~5 min)** — **~0.16 GB free CRITICAL**; OneDrive ~77 GB hog. Right-click largest Desktop/Documents folders → Free up space. Full diagnostic: `scratch/ops_reports/C_DRIVE_CLEANUP_2026-08-01.md`. Do before browser-heavy work or deletes may stall.

1. **StoryGraph profile + trilogy tags (~15 min)** — No formal author claim on platform; set public profile, add 3 vols by ISBN, tag moods. Full steps: `scratch/ops_reports/STORYGRAPH_CLAIM_RUN_2026-08-01.md` §A–C. Username: `jason_carroll_holloway` · bio from goodreads-comp-shelves.md · site `https://jasoncholloway.com/`

2. **Goodreads shelves + About (~10 min)** — Author 20924993 claimed; finalize comp shelves per `debt_consolidation_handoff/global_penetration_wave1/goodreads-comp-shelves.md`. In Goodreads settings, connect/link StoryGraph if offered.

3. **Ingram PB×3 approve (~10 min)** — PUB-09 · Vol I–III paperbacks Awaiting Your Approval · no cost · unlocks direct-sale links

4. **Google Books Partner apply (~20 min, optional today)** — `books.google.com/partner` · free apply · ≠ Play (Play live). Packet: `scratch/ops_reports/packets/GOOGLE_BOOKS_PARTNER_VS_PLAY_2026-08-01.md`

5. **Affirm payment (P1 money)** — Due ~3 days per Jul 31 proton-personal notice

> **Browser tip:** Ask Morgan to "open StoryGraph in browser" first if you want agent help — MCP couldn't see Jason's logged-in tab overnight.

---

## BLOCKED (needs you or budget)

| Item | Why |
|------|-----|
| **Ingram HC×3 Revise Files** | PUB-10 · upload from MASTER_UPLOAD_FOLDER |
| **Ingram returnability/55%** | PUB-11 · dashboard screenshots — trade terms unverified |
| **NetGalley** | ~$575 budget hold · fill-in ready when funded |
| **Edelweiss** | Paid trade catalog |
| **GBP import + verify** | AUTH-04 · needs Google login |
| **SCP GSC DNS verify** | AUTH-01 · Cloudflare TXT |
| **Apple ASC author link** | PUB-03 · optional |
| **Hawkes Draft 14/15** | Awaiting your recipient pick + personalization |
| **Commit working tree** | OPS-01 · large uncommitted diff |
| **Email opt-in wiring** | WEB-04 · MailerLite/ConvertKit/Beehiiv |

---

## Entity graph status (no gaps on live deploy)

| Node | Status |
|------|--------|
| Wikidata Q140275300 + trilogy Q140276114 | Live |
| ISNI 0000 0005 3044 7935 | Live (JSON-LD + Wikidata P213) |
| Open Library OL16482975A | Live on Person.sameAs (both sites) |
| Goodreads 20924993 | Live · shelves still open |
| VIAF | Sent 2026-08-01 · waiting 2–8 weeks |
| ORCID | Not registered — Jason action |
| StoryGraph | **Not done** |

**Residual:** Confirm 4 works by ISBN on Open Library (agent polish). Series Wikidata correctly on BookSeries only (Vivian edit deployed).

---

## Waiting on vendors

| Vendor | Item | Since |
|--------|------|-------|
| OCLC | VIAF cluster | 2026-08-01 |
| PhysicalAddress | Form 1583 / mail forwarding | 2026-07-29 |
| Author Central | #50898755 optional cover refresh | 2026-07-29 |
| NetGalley | Account activation email in scp-jason inbox | 2026-08-01 |

---

## Suggested focus

**StoryGraph + Goodreads** first — free discovery, 25 min, closes MKT-02/MKT-03. Then **Ingram PB approve** — zero cost, highest print leverage.

---

## Reports

- Evening checklist: `scratch/ops_reports/ZERO_COST_EVENING_CHECKLIST_2026-08-01.md`
- StoryGraph run log: `scratch/ops_reports/STORYGRAPH_CLAIM_RUN_2026-08-01.md`
- Phase 4: `scratch/ops_reports/PHASE4_EXECUTION_2026-08-01.md`
- Terminal rollup: `groundswell-monitor/public/data/ops_rollups.json`

*Morgan — overnight pass complete.*
