# PSLF Job Crawl Report - 2026-07-30

**Run:** ~2:41-2:44 PM CT  
**Command:** Equivalent to Run_PSLF_Job_Crawl.bat (python crawl_pslf_jobs.py, JOB_CRAWL_SSL_VERIFY=0). Dashboard not auto-opened.

## Result

| Field | Value |
|-------|-------|
| Status | Success (exit code 0) |
| New this crawl | 10 |
| Total jobs in feed | 77 (73 before this run) |
| New since yesterday (crawler) | 77 |

## Output files

- C:/Users/zh577/Desktop/Job Search/job search dashboard/jobs.json
- C:/Users/zh577/Desktop/Job Search/job search dashboard/job_state.json
- scratch/ops_reports/_pslf_crawl_run.log
- Dashboard: **Desktop → PSLF Job Dashboard.lnk** (or `Open_PSLF_Dashboard.bat`)

## Sources

Idealist 20, USAJOBS 56, Adzuna 1. Tiers: qualifying 76, verify 1.

## Unseen only

Use dashboard checkbox Unseen only after opening Open_PSLF_Dashboard.bat. This crawl flagged 10 is_new listings (NEW badge).

## Warnings

SSL verify off; Greenhouse/Lever 404 on several boards; HigherEdJobs RSS bot-blocked.

## Next step

Open dashboard, Unseen only, triage 10 new listings.
