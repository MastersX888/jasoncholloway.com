# Italics Fix — Full Catalog Verification — 2026-07-30

**Reported by:** Jason ~5:46 PM CT (Ingram paperback e-proofs)
**Directive:** "Fixed tonight… all formats accurate and consistent everywhere"
**Completed:** ~7:10 PM CT
**Result:** **11 of 11 delivery formats verified — body italics restored catalog-wide**

---

## 1. Scope correction

The complaint was three paperbacks. The audit found **six** broken products —
all three paperbacks **and all three hardcovers**. The hardcovers were never
part of the original report and would have shipped with the same defect.

| # | ISBN | Format | Before | After |
|---|---|---|---|---|
| 1 | 9798256008048 | Vol I PB | FAIL 0/12 | **PASS 12/12** |
| 2 | 9798256009953 | Vol II PB | FAIL 0/12 | **PASS 12/12** |
| 3 | 9798256010072 | Vol III PB | FAIL 0/11 | **PASS 11/11** |
| 4 | 9798295800801 | Vol I HC | FAIL 0/12 | **PASS 12/12** |
| 5 | 9798295812675 | Vol II HC | FAIL 0/12 | **PASS 12/12** |
| 6 | 9798295812705 | Vol III HC | FAIL 0/11 | **PASS 11/11** |
| 7 | 9798256072704 | Omnibus PB | PASS | PASS 35/35 |
| 8 | 9798295884412 | Omnibus HC | PASS | PASS 35/35 |
| 9 | 9798256008819 | Vol I EPUB | PASS | PASS 12/12 |
| 10 | 9798256009625 | Vol II EPUB | PASS | PASS 12/12 |
| 11 | 9798256009809 | Vol III EPUB | PASS | PASS 11/11 |

Jason's instinct was right: **omnibus and EPUB were never affected.**

---

## 2. Root cause

Not Ingram. The uploaded PDFs never contained italics.

The six individual-volume generators registered three Garamond faces but never
declared the family relationship between them:

```python
pdfmetrics.registerFont(TTFont("Garamond",   "GARA.TTF"))
pdfmetrics.registerFont(TTFont("GaramondBd", "GARABD.TTF"))
pdfmetrics.registerFont(TTFont("GaramondIt", "GARAIT.TTF"))
# missing: registerFontFamily(...)
```

Without `registerFontFamily`, ReportLab **silently discards** `<i>` markup
inside a `Paragraph` and paints roman. The DOCX extraction was always correct
(Book 1 alone had 96 paragraphs carrying italic runs) — the loss happened at
render time, with no error.

Display italics still appeared because chapter frequency keys, subtitles, and
epigraphs set `fontName="GaramondIt"` directly rather than going through `<i>`
markup. That is precisely what made the bug invisible.

**Why omnibus and EPUB escaped:** the omnibus was composed through a path with
a working italic mapping; EPUB uses HTML `<em>` and never touches ReportLab.

---

## 3. Why the previous audit missed it

`pre_upload_audit.py` counted *any* italic span per file. Every broken book
still had 30-38 structural italic spans from Hz keys and subtitles, so the
check passed with zero narrative emphasis present. It measured the wrong thing
and produced false confidence.

---

## 4. Second defect found during the rebuild

`generate_book3_interior.py` defaulted to a **6.0 × 9.0 in** trim while the
shipped Vol III hardcover — and its sibling generators — use **6.14 × 9.21 in**.
The first HC rebuild silently produced an out-of-spec 183-page interior at the
wrong trim.

Caught by the regression comparison, rebuilt at the correct trim (177 pages),
and the generator default corrected so it cannot recur.

---

## 5. Verification method

Span counting is not sufficient, so verification is probe-based:

1. Sample italic runs from the BUILD DOCX (ground truth), excluding front
   matter, headings, titles, and Hz/display strings.
2. Locate each probe in the rendered artifact.
3. Require every covering glyph span to carry an italic face. A phrase that
   also occurs in roman prose passes if **any** occurrence is italic.

Harness: `production_staging/_scripts_from_windows/audit_body_italics.py`
Results: `production_staging/_scripts_from_windows/BODY_ITALIC_AUDIT.json`

**Final run against `MASTER_UPLOAD_FOLDER`: 11/11 PASS, zero roman, zero missing.**

### Regression control

`compare_rebuild.py` diffed every rebuilt interior against the shipped file:

| Check | Result |
|---|---|
| Body text (normalized, folios stripped) | **identical** on all six |
| Trim geometry | **identical** on all six |
| Copyright-page ISBNs | **identical** on all six |

Only glyph faces and pagination changed. No content drift.

---

## 6. Page counts

| Edition | Was | Now | Δ |
|---|---:|---:|---:|
| Vol I PB | 185 | **183** | −2 |
| Vol II PB | 265 | 265 | 0 |
| Vol III PB | 205 | 205 | 0 |
| Vol I HC | 159 | 159 | 0 |
| Vol II HC | 225 | 225 | 0 |
| Vol III HC | 179 | **177** | −2 |

Real italic metrics reflow the text slightly, so two editions lost two pages.

**Cover impact: none expected.** Measured from your own three paperback wraps,
spine runs ≈0.00227–0.00231 in per page, so two pages ≈ **0.005 in** — an order
of magnitude inside Ingram's ~1/16 in spine tolerance. Existing cover files
remain valid; only the **page-count field** in Ingram metadata needs updating
for Vol I PB and Vol III HC.

*(Note: all interiors — before and after — carry odd page counts, unchanged
from what Ingram already accepted.)*

---

## 7. Files

**Promoted to `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER`** with the previous
version preserved next to each as `interior_PRE_ITALIC_FIX_2026-07-30.pdf`:

```
9798256008048_PB\interior.pdf
9798256009953_PB\interior.pdf
9798256010072_PB\interior.pdf
9798295800801_HC\interior.pdf
9798295812675_HC\interior.pdf
9798295812705_HC\interior.pdf
```

Staging copies: `production_staging/_italic_fix_2026-07-30/`

---

## 8. Permanent guard

`pre_upload_audit.py` gained **Section 5 — Body-italic probes**, wired into the
overall verdict. It fails the audit when narrative emphasis collapses to roman
even if structural italics are present.

Confirmed working: run against a pre-fix backup, it returns **FAIL (0 italic /
12 roman)** and a non-zero exit code. Run against the current catalog, the full
audit returns **UPLOAD AUDIT: PASS**.

Also fixed: Book 3 HC generator trim default (§4).

---

## 9. Remaining steps (require Jason / Vivian)

1. **Vivian QC** — visual pass on the six corrected interiors.
2. **Jason approval.**
3. **IngramSpark** — replace interiors for all six ISBNs; update page count for
   9798256008048 (183) and 9798295812705 (177).
4. **New e-proofs** — re-verify before approving print. Spot-check
   *"Always know your exits."* (Vol I) and *"The Moleskine. The tenth."* (Vol III).
5. **EPUB / omnibus** — no action; verified clean.

**Not done tonight:** nothing uploaded or transmitted to any vendor.

---

*Morgan · Seventh City Press LLC · verification harness committed with the fix*
