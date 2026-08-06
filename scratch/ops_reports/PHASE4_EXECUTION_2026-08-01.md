# Phase 4 Execution — 2026-08-01
**Trigger:** Jason **"I approve"** after Phase 4 checklist  
**Executor:** Morgan · ~01:45 CT  
**QC source:** `VIVIAN_QC_WAIT_WINDOW_2026-08-01.md` + press follow-up

---

## Scoreboard

| Bucket | Items |
|--------|--------|
| **DEPLOYED** | Press PDFs (no 55%/returns); shopping feed seventeen; Person.sameAs OL (series QID off Person) — both sites live |
| **SENT** | VIAF cluster request |
| **DRAFT** | Hawkes A/B; IndieBound A/B; Booklist (optional trade) |
| **BLOCKED / Jason click** | NetGalley pay (~$575); Hawkes/Indie recipients; Shelf Awareness HOLD; trade attachments optional |

---

## A. DEPLOY

| Ref | Detail |
|-----|--------|
| Branch pushes | `cursor/ops-dashboard-3e24` → `8f23620` (schema) + `8775ac5` (PDFs + shopping feed) |
| Also | `main` → `9c48a81` (same batch; native CF clone_repo **failed**; production already served `8775ac5` via prior successful production deploy) |
| Live production (canonical) | **jasoncholloway** + **seventhcitypress** @ `8775ac5` |
| Pages URLs | https://c71cc630.jasoncholloway.pages.dev · https://0389fa3b.seventhcitypress.pages.dev |
| Custom domains | https://jasoncholloway.com · https://seventhcitypress.com |

### Live verification (post-deploy)

| Check | Result |
|-------|--------|
| `Masters_X_Fact_Sheet.pdf` (both domains) | **CLEAN** — no 55% / returns accepted |
| `Masters_X_Press_Kit.pdf` (both domains) | **CLEAN** |
| `/feeds/google-shopping.csv` | **sixteen=0 · seventeen=6** |
| Homepage JSON-LD `OL16482975A` | **Present** on jasoncholloway.com + seventhcitypress.com |
| Series QID on Person.sameAs | **Absent** on homepage Person (correct) |

**Note:** Cloudflare Pages `production_branch` is configured as `main`, but successful production builds have historically tracked `cursor/ops-dashboard-3e24` commits (labeled `main` in deploy metadata). Preview clones of that branch fail at `clone_repo`. Do not force-push.

---

## B. SEND / DRAFT

### SENT
| Asset | Account | To | Message-ID / note |
|-------|---------|-----|-------------------|
| **VIAF** (VIV-WW-05) | `scp-jason` (jason@seventhcitypress.com) | oclcviaf@oclc.org · Cc info@isni.org | `<b72873c8-4031-a373-5977-cdd943ee1e98@seventhcitypress.com>` |

### DRAFT (scp-jason Drafts — no inventing recipients)
| Draft ID | Asset | Why not sent |
|----------|-------|----------------|
| 14 | Hawkes Draft A (library acquisitions) | Template only — Jason fills Mercy/Brown/etc. emails |
| 15 | Hawkes Draft B (scholar courtesy) | Needs professor name + email |
| 16 | IndieBound Email A (store pitch) | Needs ≤3 store buyer emails + personalization |
| 17 | Booklist optional trade | Real inbox `booklistadultbooks@ala.org` but needs finished PDF/EPUB attach; low odds; money/time optional |
| 18 | IndieBound/ABA intro Email B | Needs ABA/regional contact |

### HOLD (not sent)
| Asset | Reason |
|-------|--------|
| Shelf Awareness | VIV-WW-02b POD exclusion |
| PW GalleyTracker / BookLife | Optional; fee = Jason money; draft path only if he chooses |
| LJ | No send without attached finished book + Jason confirm |

### NetGalley (VIV-WW-03) — Jason paywall
- Packet cleared; listing copy ready (`books.ts` Vol I description).
- Opened system browser to https://www.netgalley.com/packages/order
- Cursor browser MCP tabs were empty / unusable this session — could not automate login or stop inside in-app paywall.
- **Jason next click:** choose pay-per-title (~$575 / 6 mo) or IBPA path → pay → upload EPUB `9798256008819` + cover + Vivian-cleared pitch/synopsis → forward confirmation for PUB-13 close.

---

## C. Vivian queue post-deploy

| ID | Post-Phase-4 status |
|----|---------------------|
| VIV-WW-01 | Cleared; **DRAFT** awaiting Jason personalization |
| VIV-WW-02 | Cleared; optional trade **DRAFT**; Shelf **HOLD** |
| VIV-WW-03 | Cleared; **BLOCKED on Jason pay** |
| VIV-WW-04 | Cleared; **DRAFT** awaiting scholar/library emails |
| VIV-WW-05 | Cleared; **SENT** → AUTH-07 waiting on VIAF/OCLC |
| VIV-WW-06 | Cleared; **DEPLOYED + live verified** |
| VIV-WW-07 | Press/feed/schema live **PASS**; visual §6 mobile/desktop still **HOLD** (browser MCP) |

---

## Remaining Jason clicks
1. NetGalley pay + list Vol I  
2. Fill Hawkes recipient emails → send drafts 14/15  
3. Pick ≤3 indie stores → personalize draft 16  
4. Optional: attach finished book → Booklist/PW/BookLife  
5. Visual §6 eyes on live site (or re-run Vivian when browser MCP works)  
6. PUB-09 / PUB-10 / PUB-11 still open (Ingram)

---

*Morgan · Phase 4 execution complete for approved deploy + Vivian-cleared sends where recipients existed.*
