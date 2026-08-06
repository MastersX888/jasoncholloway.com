# Wait-Window Execution — 2026-08-01
**Desk:** Morgan · Mandate: everything agent-doable while Ingram PB/HC wait  
**Terminal:** `groundswell-monitor/public/data/ops_rollups.json`  
**Packets:** `scratch/ops_reports/packets/`

---

## Scoreboard

### DONE (agent executed)
| Item | Evidence |
|------|----------|
| Edelweiss prep packet | `packets/EDELWEISS_PREP_PACKET_2026-08-01.md` |
| NetGalley ARC packet | `packets/NETGALLEY_ARC_PACKET_2026-08-01.md` |
| LoC PCN prep (w/ eligibility honesty) | `packets/LOC_PCN_PREP_PACKET_2026-08-01.md` |
| IndieBound/ABA pitch kit | `packets/INDIEBOUND_ABA_BOOKSELLER_PITCH_2026-08-01.md` |
| Trade galley drafts + URLs | `packets/TRADE_GALLEY_OUTREACH_2026-08-01.md` |
| Google Books Partner ≠ Play card | `packets/GOOGLE_BOOKS_PARTNER_VS_PLAY_2026-08-01.md` |
| GBP import refresh | `packets/GBP_IMPORT_PACKET_2026-08-01.md` + IMPORT_INSTRUCTIONS header |
| StoryGraph claim steps | `packets/STORYGRAPH_CLAIM_STEPS_2026-08-01.md` |
| Apple ASC claim steps | `packets/APPLE_ASC_AUTHOR_CLAIM_2026-08-01.md` |
| SCP GSC steps (no invented token) | `packets/SCP_GSC_VERIFICATION_2026-08-01.md` |
| VIAF email packet | `packets/VIAF_LC_NAME_AUTHORITY_2026-08-01.md` |
| Hawkes academic drafts | `packets/HAWKES_ACADEMIC_BACKCHANNEL_2026-08-01.md` |
| Entity graph status + ORCID checklist | `packets/ENTITY_GRAPH_STATUS_2026-08-01.md` |
| OLID + series Wikidata → `authorSameAs` | `lib/data/authorAuthority.ts` + imprint mirror |
| Hawkes “seventeen” live verify | books.google.com ISBN9798295778926 — FOUND_SEVENTEEN_NOVELS; no sixteen novels |
| ops-sweep AUTH-05 note | wired, awaiting Vivian + deploy |

### PREPPED FOR JASON (clicks / pay / send)
| Item | Packet |
|------|--------|
| Edelweiss signup + pay | EDELWEISS |
| NetGalley pay + list | NETGALLEY |
| LoC PPBL publisher account | LOC_PCN |
| Bookseller emails (after Vivian) | INDIEBOUND |
| Trade galley submits (after Vivian; low odds post-pub) | TRADE_GALLEY |
| Google Books Partner apply | GOOGLE_BOOKS_PARTNER |
| GBP CSV import + verify | GBP |
| StoryGraph claim | STORYGRAPH |
| Apple ASC link / support ticket | APPLE_ASC |
| SCP → GSC verify | SCP_GSC |
| VIAF email send | VIAF |
| Hawkes academic sends | HAWKES_ACADEMIC |
| ORCID register | ENTITY_GRAPH |
| Deploy sameAs after Vivian | ENTITY_GRAPH / AUTH-05 |

### BLOCKED
| Item | Blocker |
|------|---------|
| Ingram PB×3 Approve | JASON / Ingram processing (PUB-09) |
| Ingram HC×3 Revise Files | JASON upload (PUB-10) |
| Ingram returnable + 55% proof | JASON screenshots (PUB-11) — **do not assert in press** |
| Trade terms in outbound copy | PUB-11 |
| PCN LCCNs for current editions | Already published — account only |
| Shelf Awareness review | Likely POD exclusion |
| Vivian website §6 live re-QC | VIVIAN |
| Email opt-in provider | JASON (WEB-04) |
| Commit dirty tree | JASON (OPS-01) unless Jason authorizes |
| Sends / paid listings / social publish | Jason + Vivian gates |

---

## Vivian still must clear (before public/outbound)

| Asset | Verdict |
|-------|---------|
| IndieBound/ABA pitch + emails | PENDING — no send |
| Trade galley pitches | PENDING — no send |
| NetGalley reviewer pitch / description | PENDING — before paid listing |
| Hawkes academic outreach | PENDING — no send |
| VIAF email | Light pass OK — factual identifiers |
| Schema `sameAs` OL + series Wikidata | PENDING before deploy |
| Website §6 live visual re-QC | Still open from Jul 31 |
| Press kit 55%/returns claim | BLOCK for further press use until PUB-11 |

---

## Top 5 Jason clicks (excl. Ingram wait)

1. **StoryGraph + Apple ASC batch** (~30–45 min) — free discovery claims  
2. **Google Books Partner apply** (~20 min) — ≠ Play; AUTH-06  
3. **GBP import + verify** (~15 min + mail wait) — AUTH-04 / KP trigger with Wikidata  
4. **SCP → GSC DNS verify** (~10 min) — AUTH-01  
5. **VIAF email send** (~5 min) — AUTH-07; then ORCID register when convenient  

Honorable: NetGalley $575 when ready to spend; Edelweiss quote; PPBL publisher account for future PCN.

---

## Hawkes Play / Books note
Google Books page for ISBN 9798295778926 scraped 2026-08-01: **seventeen novels** present in description/og tags; **sixteen novels** absent. Play store HTML 404 on direct ISBN URL pattern; Books surface is the public preview evidence. Mark verify checkbox closable for description text; keep eye on Play consumer UI if it lags CDN.

*Morgan — wait-window execution closed.*
