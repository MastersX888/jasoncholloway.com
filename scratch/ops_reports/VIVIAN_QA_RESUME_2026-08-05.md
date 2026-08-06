# Vivian QA Resume — 2026-08-05 (early AM CT)

**Desk:** Vivian (Editorial Quality & Pre-Publication Control) · routed by Morgan  
**Trigger:** Jason — `resume vivian qa`  
**Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md`  
**Queue:** `scratch/ops_reports/VIVIAN_QA_QUEUE_2026-08-02.md`  
**Prior:** `VIVIAN_QA_RESUME_2026-08-03.md` (10 cleared · Q-10 BLOCK)  
**Catalog lock:** Amazon = Kindle Vol I–III only · Print/omnibus = IngramSpark · **No Amazon omnibus**  
**Scope:** Next band after P0 buy path — Q-09 · Q-14/15 · Q-18 · Q-21 · Q-22 · Q-30 · recheck Q-10 · **no deploy** · no social · no money  
**Evidence:** `scratch/ops/_vivian_live_2026-08-05/` (live HTML/CSV · 2026-08-05 ~01:00 CT)

---

## Scoreboard (weekend queue)

| Metric | Count |
|--------|------:|
| Queue size | **45** |
| Cleared cumulative (PASS / PASS WITH NOTES) | **19** (+6 evening · +3 post-deploy AM) |
| **BLOCK** open | **0** |
| Still open / not re-verdicted | **26** |
| Invent-PASS | Held |

| Band | Cleared cumulative | Still open / BLOCK |
|------|-------------------:|--------------------|
| P0 | 8 PASS* + Q-09 notes · **Q-10 cleared AM** | Q-08 regen hold |
| P1 site | Q-12/13 prior · **+Q-14 · Q-15 · Q-18 · Q-21 · Q-22 cleared AM** | Q-16/17 FN body · Q-19/20 deep |
| P1 SCP | 0 | Q-23–Q-25 |
| P2 | **Q-30 cleared AM** | Q-26–Q-29 · Q-31–Q-36 |
| P3 | 0 | Q-37–Q-45 |

\*P0 buy path cleared 2026-08-03 (Q-01–Q-07, Q-11).

---

## Verdicts this session

| ID | Surface | Verdict | Ready for checklist |
|----|---------|---------|---------------------|
| **Q-09** | Press kit PDFs (live CDN) | **PASS WITH NOTES** | yes — JA + SCP both **200**, identical size (17635). Image/compressed PDF (no extractable text tonight); no broken CDN. |
| **Q-10** | Google Shopping feed (live) | **PASS WITH NOTES** (post-deploy AM) | yes — Buy Direct flat live on CDN (`a2477e0d`) |
| **Q-14** | Contact + press download | **PASS WITH NOTES** | yes — press-kit href live; Jason Carroll Holloway / Seventh City Press; emails correct |
| **Q-15** | Chapters-sent | **PASS WITH NOTES** | yes — EPUB + Distribution File paths; Send-to-Kindle copy accurate; omnibus CTA site-only |
| **Q-18** | Chamber hub | **PASS WITH NOTES** | yes — Research Note + “literary speculation” disclaimer present; no Amazon DP |
| **Q-21** | JSON-LD / sameAs | **PASS WITH NOTES** | yes — OL author in live HTML; StoryGraph **not** prematurely in sameAs; series QID not on Person |
| **Q-22** | Returns (live) | **PASS WITH NOTES** (post-deploy AM) | yes — Ingram Share & Sell live; old 30-day gone; matches GMC defective-only |
| **Q-30** | Reading sequence (live) | **PASS WITH NOTES** (post-deploy AM) | yes — Jason C fifteen / twenty-three framing live |

---

## Q-10 — cleared post-deploy (was BLOCK)

Live CDN now matches Buy Direct flat: hawkes-pb **12.99** · mx1–3 **16.99/29.99** · hawkes-hc **24.99**. Channel OK.

---

## Q-22 — cleared post-deploy (was BLOCK)

Live CDN now Ingram Share & Sell (non-refundable/non-returnable · Report an Issue). Aligns with Merchant Center defective-only.

---

## Yellow notes

1. Q-09 PDF content not re-OCR’d — rely on prior 2026-08-02 press PASS for facts; CDN reachability cleared.
2. Q-14 review-copy “available to accredited reviewers” — Claire-ok; not a money commitment.
3. Q-15 still absent from `sitemap.ts` (Nina hygiene; intentional thank-you page OK).
4. Q-21 StoryGraph URL exists in `authorAuthority.ts` as comment-gated — keep out of `authorSameAs` until Jason confirms public profile.
5. Vol I live still shows Kindle ASIN `B0H4KYMSM1` (expected AMZ_DP on volume pages only).

---

## Not touched tonight

- Q-08 press PDF regen · Q-16/17 Field Notes body §1/§2  
- Q-19/20 robots/sitemap deep · OG render  
- Q-23–Q-25 SCP sibling  
- Q-26–Q-29 · Q-31–Q-36 Chamber tools / secondary  
- Q-37–Q-45 social/profile checklist  

---

## Jason — next

Scoped deploy **done** (`a2477e0d` / `1a86e90`). Say **`resume vivian qa`** for Field Notes body (Q-16/17) · SCP sibling (Q-23–25) · remaining Chamber §1.

---

## Post-deploy clearance — 2026-08-05 AM CT

**Deploy:** wrangler Pages `jasoncholloway` → `https://a2477e0d.jasoncholloway.pages.dev` (commit `1a86e90`, production alias).  
**Live spot-check:** `/feeds/google-shopping.csv` Buy Direct flat · `/returns/` Ingram copy · `/chamber/reading-sequence/` 15/23 framing.

| ID | Post-deploy |
|----|-------------|
| Q-10 | **PASS WITH NOTES** |
| Q-22 | **PASS WITH NOTES** |
| Q-30 | **PASS WITH NOTES** |

**Next:** `resume vivian qa` → Field Notes body (Q-16/17) · SCP sibling (Q-23–25) · remaining Chamber §1.

---

## Chat-ready summary

**+6 cleared** evening (Q-09, Q-14, Q-15, Q-18, Q-21). **+3 cleared** AM after scoped deploy (Q-10, Q-22, Q-30). **0 BLOCKs** open. Buy path from Aug 3 still clear.

*Vivian — 2026-08-05 · “Nothing goes out the door with the wrong ISBN on it.”*
