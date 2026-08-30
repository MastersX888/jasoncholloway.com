# P0 — Amazon Omnibus PB Cover Stuck (Wrong Art)

> **UPDATE 2026-08-08 (Jason):** Ingram cover is **already correct** (2+ weeks). Problem is **Amazon catalog stale**, not missing Ingram upload. See **`AMAZON_OMNIBUS_COVER_REFRESH_2026-08-08.md`** for ticket copy.

**Date:** 2026-08-08 · **Priority:** P0 publishing blocker  
**Owner:** Morgan → **Jason** (Ingram login required)  
**QC:** Vivian visual pass on wrap PDF before upload (if file rebuilt)

---

## What Amazon is showing (WRONG)

| Field | Live Amazon listing |
|-------|---------------------|
| **Title** | Masters X: The Complete Trilogy |
| **Format** | Paperback |
| **ISBN** | 9798256072704 |
| **Amazon ASIN** | **B0H3FRMLJD** |
| **URL** | https://www.amazon.com/dp/B0H3FRMLJD |
| **Cover art** | Pre-v3 **dome interior** (launch comp) |
| **Subtitle typo** | **"The Gemonon"** (should be *The Grimoire*) |
| **Price** | $34.34 list $36.99 ✓ |

**Correct cover (v3):** Black field + golden mandala + 111.2 Hz — same jacket face as site/HC.  
**Reference:** https://jasoncholloway.com/covers/omnibus-hardcover-v3.png

---

## Root cause

The **Jul 31 Ingram cover-revision run updated Vol I–III only.** Omnibus PB was **explicitly out of scope**:

> `INGRAM_UPLOAD_RUN_2026-07-31.md` — "Do not upload: omnibus (`9798256072704_PB`, `9798295884412_HC`)"

Jason's Aug 3 "all titles live" statement covered approval status — **not** a cover swap on omnibus PB. Amazon ingests print cover from **IngramSpark ONIX**, not KDP or Author Central.

Author Central (Fabian, Jul 30): *"Print / omnibus (IngramSpark): metadata and cover updates go through IngramSpark, not Author Central."*

---

## Fix path (tonight — ~15 min)

### Step 1 — Locate upload PDF

Expected file (Jul 29 restage):

```
9798256072704_PB/9798256072704_PB_wrap.pdf
```

**Last known location:** `Desktop\MASTER_UPLOAD_FOLDER\` (may be on **E:\jasoncholloway-archive** if offloaded Aug 7 — E: not mounted on this machine).

If missing: regenerate PB wrap from current v3 jacket + **fresh Ingram cover template** (734 pp, 5.5×8.5 Demy 8vo). Do **not** reuse dome-era `compose_omnibus_covers_FINAL.py` hero.

### Step 2 — IngramSpark Revise Files

1. Log in → https://myaccount.ingramspark.com/Portal/Titles  
2. Search **9798256072704**  
3. Open title → **Revise Files** (cover only — interior unchanged)  
4. Upload `9798256072704_PB_wrap.pdf`  
5. Submit → **Approve** when prompted  
6. Screenshot status = *Processing* or *Awaiting Approval*

### Step 3 — Amazon propagation (after Ingram approves)

- Typical lag: **3–14 days** for Amazon catalog image refresh from Ingram feed  
- **Expedite (optional):** Seller Central / **Report incorrect product information** on https://www.amazon.com/dp/B0H3FRMLJD — cite ISBN 9798256072704, attach v3 cover URL, note typo fix on spine/subtitle list  
- **Do not** use KDP — no KDP omnibus edition exists

### Step 4 — Verify downstream (48h–2wk)

| Surface | Check |
|---------|--------|
| Amazon search | Cover + subtitle list |
| Goodreads 252797588 / 252929307 | Still blocked for author ACE — librarian path deferred |
| Bookshop / Ingram iPage | Thumbnail refresh |

---

## Jason evening checklist

- [ ] **Locate or rebuild** `9798256072704_PB_wrap.pdf` (v3 art, correct trilogy subtitles)
- [ ] **Ingram Revise Files** — cover upload + approve
- [ ] **Screenshot** Ingram status → drop in `scratch/ops_reports/covers/`
- [ ] **Optional:** Amazon catalog correction on B0H3FRMLJD

**Money / legal:** No spend. Cover-only revision.

---

## Also check (same session if logged into Ingram)

| ISBN | Format | Risk |
|------|--------|------|
| 9798295884412 | Omnibus HC | May still be dome-era jacket if never revised |
| 9798256072704 | Omnibus PB | **Confirmed wrong on Amazon today** |

---

## Evidence

- User screenshot 2026-08-08 (Amazon search — dome cover, Gemonon typo)
- Amazon ASIN confirmed via live search: **B0H3FRMLJD**
- `scratch/ops_reports/INGRAM_UPLOAD_RUN_2026-07-31.md` — omnibus excluded
- `scratch/ops_reports/GOODREADS_FULL_AUDIT_2026-08-01.md` — same dome art on GR/Amazon CDN
