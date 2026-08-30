# Space Force Job Search — 2026-08-09

**Requested by:** Jason  
**Prepared via:** PSLF Job Dashboard inventory + live USAJOBS API (Jason’s `usajobs_search.py` credentials) + ClearanceJobs public search + STARCOM careers page + AFCS Space Force portal  
**Browser MCP:** unavailable this run (tab create/navigate failed) — public WebFetch + USAJOBS API used instead  
**Raw USAJOBS dump:** `scratch/ops_reports/_space_force_usajobs_raw.json` (59 Space Force–matched listings)

---

## 1. Which “job dashboards” Jason has

| Dashboard / tool | Location | Role in this search |
|---|---|---|
| **PSLF Job Dashboard** | `Desktop\Job Search\job search dashboard\` (`dashboard.html`, `jobs.json`) | Primary inbox — Idealist + USAJOBS + Adzuna crawl. **No Space Force hits** in current `jobs.json` (last crawl 2026-07-30; PSLF/nonprofit-oriented queries). |
| **USAJOBS API script** | `Desktop\Job Search\usajobs_search.py` | Reused same API key/email; ran Space Force / USSF / SSC keyword passes. **Primary live source** (~98 API hits → 59 deduped matches). |
| **Manual board links (dashboard footer)** | Idealist, USAJOBS (healthcare remote), HigherEdJobs, LinkedIn Nonprofit, Indeed Nonprofit | Not Space Force–tuned; LinkedIn nonprofit link is wrong filter for USSF. |
| **Morgan Career Consultant pack** | `Desktop\Job Search\Morgan_Career_Consultant\` | Context only: $80k+ remote/hybrid **PSLF** track (501(c)(3) preferred; federal government also qualifies). |
| **ClearanceJobs** | Public search | Contractor support to USSF/SSC — live listings pulled. |
| **AFCS Space Force** | https://afciviliancareers.com/space-force/ | Recruiting portal / alerts (not a full open board). |
| **STARCOM careers** | https://www.starcom.spaceforce.mil/STARCOM-Careers/ | Weekly resume-email list (page stamped **Current as of 24 April 2026** — treat as possibly stale; still useful pipeline). |

**Not used successfully:** LinkedIn Jobs (login wall / no dedicated Space Force saved search in setup). ClearanceJobs may require account for full apply UX; titles/locations/clearance were visible publicly.

---

## 2. Fit notes for Jason (from workspace docs — not invented)

From `MORGAN_OPERATING_MEMORY.md` and `Morgan_Career_Consultant/`:

- Target: **~$80k+**, **remote or hybrid**, **PSLF-qualifying** employer.
- Preferred path: **501(c)(3) / KC health-nonprofit data roles** (Children’s Mercy, Health Forward, etc.).
- Skills emphasis: senior data analyst / data manager / program evaluation — **not** pure aerospace engineering.
- **Federal civilian USSF employment counts toward PSLF** (government). **ClearanceJobs contractor roles usually do not** (for-profit employers).
- Reality check from this search: **0 remote Space Force USAJOBS hits**; hubs are **Colorado Springs / Buckley / Schriever / Peterson**, plus CA/FL/TX/DC. Most strong GS/NH roles want **Secret–TS/SCI** and/or DoD financial (PPBE) experience Jason’s nonprofit pack does not claim.

**Interpretation:** Space Force is a viable **parallel federal track** if Jason will relocate (or commute to a USSF hub) and pursue clearance eligibility — not a drop-in for the KC remote 501(c)(3) plan.

---

## 3. Ranked shortlist (live as of 2026-08-09)

### A. Best USAJOBS civilian matches (act this week if interested)

| Rank | Title | Org | Location | Pay (API) | Close | Clearance | Link | Why ranked |
|---|---|---|---|---|---|---|---|---|
| 1 | **Orbital Warfare Program Analyst** | USSF Forces | Peterson AFB, CO | $91,870–$142,022 | **2026-08-11** | Top Secret | https://www.usajobs.gov/job/879089300 | Closest “program analyst” title; pay in range; **closes in ~2 days**; telework flag true (still on-site hub). Direct-hire style posting. |
| 2 | **Senior Financial Quality Assurance Specialist, ETM** | Office of Chief of Space Operations | San Antonio, TX (JBSA) | $90,823–$140,403 | **2026-08-12** | Secret | https://www.usajobs.gov/job/879451000 | Analyst/QA lane; Secret not TS/SCI; closes soon. Stretch if no DoD FM background. |
| 3 | **Cost Analysis Branch Chief, SSDP** | USSF Forces | Colorado Springs, CO | $91,870–$142,022 | **2026-08-14** | SCI | https://www.usajobs.gov/job/871411800 | Strong pay; leadership/cost analysis. Likely needs deeper FM/DoD cost experience + SCI. |
| 4 | **Program analyst (Cyber Operations)** | United States Space Force | Peterson / Schriever AFB, CO | $51,279–$118,254 | 2026-09-28 | Top Secret | https://www.usajobs.gov/job/846782200 | Longer window; developmental/public path; cyber ops focus may be a stretch vs healthcare data resume. |
| 5 | **PREVENTION ANALYST — Direct Hire** | AFMC (Air/Space Force installation) | Wright-Patterson AFB, OH | $92,841–$143,523 | 2026-08-19 | Other | https://www.usajobs.gov/job/866082700 | Analyst title + pay; prevention/workforce lane — closer to org/people analytics than space engineering. |
| 6 | **Human Resources Specialist** | United States Space Force | Patrick AFB, FL | $50,835–$97,809 | 2027-01-13 | Secret | https://www.usajobs.gov/job/854458300 | Long open window; lower ceiling vs $80k floor unless high end of band; not data role. |
| 7 | **Digital Content Specialist** (NAF) | United States Space Force | Peterson SFB, CO | ~$19/hr | 2026-08-18 | Not required | https://www.usajobs.gov/job/879144500 | Marketing/comms adjacent to author brand — **below pay floor**; NAF, not career GS. Listed only as low-barrier entry to base ecosystem. |

**API snapshot:** Keyword `Space Force` returned **98** USAJOBS results; after Space Force–relevance filter, **59** unique. Many are NAF (childcare, food service, lodging) or engineering — excluded from shortlist.

**Stale web hits (not in live API today — do not apply from old links):** Management and Program Analyst Schriever (`869458000`), several POM/budget analyst IDs from search snippets (`866325900`, `867766100`, `864469000`). Re-search USAJOBS if those titles reappear.

### B. ClearanceJobs — USSF-supporting contractor roles (public results)

| Title | Employer (as listed) | Location | Clearance | Notes | Link / search |
|---|---|---|---|---|---|
| **SDA Systems Financial Planner/Analyst** | Odyssey Systems | Peterson SFB, CO (1–2 days telework possible) | (listed on board; Secret typical for SDA) | PPBE / budget data — closer to analyst work than engineering | https://www.clearancejobs.com/jobs/9032636/sda-systems-financial-planneranalyst |
| **Senior Space Force Financial Analyst (TS/SCI)** | (ClearanceJobs listing) | Colorado Springs, CO | **TS/SCI required** | $115k–$140k stated; 8+ yrs PPBE — stretch without DoD FM | https://www.clearancejobs.com/jobs/8512349/senior-space-force-financial-analyst-tssci-required |
| **Cybersecurity Analyst** (USSF MILSATCOM / SSC) | BTAS | Colorado Springs / Peterson SFB | Active Secret (TS/SCI preferred) | $80k–$90k; RMF/eMASS — cyber cert path, not Jason’s primary resume | https://www.clearancejobs.com/jobs/8794376/cybersecurity-analyst |
| **SDA Manpower and Financial Analyst** | Odyssey Systems | Colorado Springs, CO | Secret | Posted ~2 days ago on ClearanceJobs search | Search: https://www.clearancejobs.com/jobs?keywords=SDA+Manpower+and+Financial+Analyst |

**Caveat:** Contractor roles generally **do not** count for PSLF.

### C. STARCOM email pipeline (not USAJOBS apply)

- Page: https://www.starcom.spaceforce.mil/STARCOM-Careers/  
- Apply method: resume only (≤2 pages) → `hq.starcom.s1jobs@spaceforce.mil` with subject including position, pay plan, grade, location.  
- Analyst-adjacent titles on the page (verify still open — stamp **24 Apr 2026**):  
  - **Data Analysis** — JBSA Randolph, TX — NH-03 / 0343  
  - Multiple **Management and Program Analyst** — Andrews AFB, Patrick AFB, Maxwell AFB  
  - **Operations Research** — Buckley / Patrick  
- Also: AFCS register at https://afciviliancareers.com/space-force/ for future USSF civilian alerts.

---

## 4. Next 2–3 apply actions

1. **If pursuing Space Force this week:** Apply on USAJOBS to **#1 Orbital Warfare Program Analyst** (closes **2026-08-11**) and **#2 Senior Financial QA Specialist** (closes **2026-08-12**) before the windows end. Use Direct Hire / AFCS resume upload path noted on those announcements.  
2. **Set standing alerts:** USAJOBS saved search `Space Force` OR `USSF` + keywords `program analyst` / `management analyst` / `data`; AFCS Space Force registration; optional ClearanceJobs alert `Space Force` + `analyst` (Colorado Springs).  
3. **Decide track explicitly:** Keep primary PSLF dashboard on Idealist/KC nonprofits **or** accept CO/TX/FL relocation + clearance path. Do not expect Space Force remote roles from today’s API (0 remote). Optional: email STARCOM for **Data Analysis (JBSA Randolph NH-03)** if willing to TX.

---

## 5. Sources checklist

- [x] Local PSLF dashboard / crawl / career docs  
- [x] USAJOBS API live search (Space Force, USSF, Space Systems Command, analyst variants, MO/KS, remote)  
- [x] ClearanceJobs public keyword search  
- [x] AFCS Space Force page  
- [x] STARCOM careers page  
- [ ] LinkedIn Jobs (no logged-in access this run)  
- [ ] Browser MCP walkthrough (tool failed)  
