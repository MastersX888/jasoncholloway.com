# Seed Follow Candidates — Approval Packet

**Date:** 2026-08-04  
**Author:** jason-holloway  
**Status:** APPROVED — all recommend_follow seeds (Morgan, 2026-08-04). Holds still pending.  
**Source file:** `kc-events/config/seed_candidates.yaml`  
**DB:** `follow_status=approved` for recommend list; no platform follows executed yet  

Rubric: geo / audience / event density / credibility / thematic (0–3 each, max 15).  
**≥9 recommend follow · 6–8 hold · &lt;6 reject.**

---

## Action requested

~~Reply with approval~~ **Done: approve all recommend_follow.**

Next gate: Phase 2 extraction against approved accounts (web calendars + Bluesky first).

**Note (corrected):** Jason finished Mercy University in 2019 — not currently enrolled. No student-calendar follow. Academic seeds = public series only (Rockhurst / UMKC).

**Suggested v1 core (web calendars + KCPL Bluesky first — lowest API friction):**

| Account | Score | Why first |
|---------|------:|-----------|
| KCPL Events Calendar | 14 | Highest event signal |
| KCPL Bluesky | 14 | Primary social listen |
| Rainy Day Books (web) | 14 | Indie author events |
| The Writers Place | 15 | Literary network hub |
| Rockhurst Midwest Poets | 14 | Public literary series |
| Unbound Book Festival (web) | 13 | Annual flagship (Columbia) |
| Nelson-Atkins events | 13 | Prestige / visibility |
| Midwest Genealogy Center | 13 | Genealogy thematic |
| ArtsKCGo | 12 | Dense calendar (noisy — filter hard) |
| Prospero's Books | 13 | Midtown literary culture |

IG/X accounts can wait until adapters exist; approving them now only means “listen when ready.”

---

## HOLD (2) — need confirmation before follow

| Account | Score | Blocker |
|---------|------:|---------|
| Heartland Fiction Writers / KC novelist groups | 12* | Verify active chapter URL |
| Jackson County Genealogical Society | 12* | Verify active org + calendar |

\*force_hold regardless of numeric score

---

## RECOMMEND FOLLOW (26 after enrollment placeholder removed)

### Libraries
| Score | Account | Platform |
|------:|---------|----------|
| 14 | Kansas City Public Library (Events Calendar) | web_calendar |
| 14 | Kansas City Public Library | bluesky `@kclibrary.bsky.social` |
| 14 | Kansas City Public Library | instagram `@kclibrary` |
| 13 | Midwest Genealogy Center (MCPL) | web_calendar |

### Indie bookstores
| Score | Account | Platform |
|------:|---------|----------|
| 14 | Rainy Day Books | web_calendar |
| 14 | Rainy Day Books | instagram `@rainydaybooks` |
| 13 | Prospero's Books & Media | web_calendar |
| 12 | Skylark Bookshop (Columbia / Unbound) | web_calendar |

### Literary festivals / programming
| Score | Account | Platform |
|------:|---------|----------|
| 15 | The Writers Place — KC Literary Arts Calendar | web_calendar |
| 13 | Unbound Book Festival | web_calendar |
| 13 | Unbound Book Festival | instagram `@unboundbookfestival` |

### Historical societies
| Score | Account | Platform |
|------:|---------|----------|
| 13 | Jackson County Historical Society | web_calendar |
| 13 | Museum of Kansas City | web_calendar |
| 13 | Missouri Valley Special Collections (KCPL) | web_calendar |

### Museums
| Score | Account | Platform |
|------:|---------|----------|
| 13 | Nelson-Atkins Museum of Art | web_calendar |
| 13 | Nelson-Atkins | instagram `@nelsonatkins` |
| 12 | National WWI Museum and Memorial | web_calendar |
| 12 | National WWI Museum | instagram `@nationalwwimuseum` |

### Universities
| Score | Account | Platform |
|------:|---------|----------|
| 14 | Rockhurst — Midwest Poets Series | web_calendar |
| 13 | UMKC Cockefair / public lectures | web_calendar |

### Writers guilds
| Score | Account | Platform |
|------:|---------|----------|
| 15 | The Writers Place | web_calendar |

### Arts / tourism
| Score | Account | Platform |
|------:|---------|----------|
| 12 | ArtsKCGo | web_calendar |
| 11 | ArtsKC | web_calendar |
| 11 | Visit KC | web_calendar |

### Local media
| Score | Account | Platform |
|------:|---------|----------|
| 11 | KCUR | web_calendar |
| 11 | Flatland KC | web_calendar |

### Genealogy
| Score | Account | Platform |
|------:|---------|----------|
| 13 | Midwest Genealogy Center events | web_calendar |

---

## Explicit exclusions (not in candidate list)

- National generic “things to do” aggregators  
- Majority advertising accounts  
- Non-arts/letters/history/civic locals  
- High-volume Meetup aggregators (manual override only)

---

## Scaffold standing (done this session)

- `kc-events/` schema + SQLite (`init-db` OK)  
- Author config `jason-holloway`  
- Rubric scorer + FeedSource abstraction (Outstand excluded)  
- Kill switch CLI (`pause` / `resume`)  
- Weekly brief template + stub `scratch/ops_reports/kc-events/2026-W32.md`  
- Skill: `~/.cursor/skills/kc-events-weekly/SKILL.md`  
- Auto-follow: **OFF** · Ingest: **not started**
