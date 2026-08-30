# PRE-UPLOAD AUDIT REPORT
**Date:** 2026-08-29 — ~~2026-07-28~~
**Scope:** Editorial fixes · italics · cross-format consistency
**Authority:** `FIX_CHANGELOG.md` + apartment/balcony pass + dwelling follow-ups

> **Date corrected 2026-08-29 (evening).** The header read `2026-07-28`, which was
> false: this report audits the artifacts rebuilt **2026-08-29 17:22–17:24** and its
> tables cite strings that did not exist until the 16:47 character-name pass
> (`Lorraine Masters`, `Sarah Ashworth`, `Rosalind Lindgren`,
> `Senator Deborah Holt`, `Marcus Whitaker`, `Idris Broussard`, `Kofi Asante`,
> `grandfather died in 2003`) and page counts that only the post-rebuild interiors
> produce. A reader taking the July date at face value would have assumed the audit
> predated tonight's files. It does not — the results below are current.

## 1. Editorial corrections (required present / banned absent)

### BUILD_DOCX_1 — **PASS**
- All 12 required present; all 11 banned absent.

### BUILD_DOCX_2 — **PASS**
- All 12 required present; all 12 banned absent.

### BUILD_DOCX_3 — **PASS**
- All 18 required present; all 18 banned absent.

### OMNI_HC — **PASS**
- All 42 required present; all 41 banned absent.

### OMNI_PB — **PASS**
- All 42 required present; all 41 banned absent.

### B1_HC — **PASS**
- All 12 required present; all 11 banned absent.

### B1_PB — **PASS**
- All 12 required present; all 11 banned absent.

### B2_HC — **PASS**
- All 12 required present; all 12 banned absent.

### B2_PB — **PASS**
- All 12 required present; all 12 banned absent.

### B3_HC — **PASS**
- All 18 required present; all 18 banned absent.

### B3_PB — **PASS**
- All 18 required present; all 18 banned absent.

### B1_EPUB — **PASS**
- All 12 required present; all 11 banned absent.

### B2_EPUB — **PASS**
- All 12 required present; all 12 banned absent.

### B3_EPUB — **PASS**
- All 18 required present; all 18 banned absent.

## 2. Italic preservation

### DOCX (BUILD vs ITALICIZED source)

| Book | Source italic runs | BUILD italic runs | Source italic chars | BUILD italic chars | Ratio chars |
|---|---:|---:|---:|---:|---:|
| 1 | 104 | 104 | 6454 | 6454 | 100.00% |
| 2 | 36 | 36 | 2039 | 2039 | 100.00% |
| 3 | 48 | 48 | 5033 | 5033 | 100.00% |

### PDF italic spans (sampled)

| Format | Pages sampled | Italic spans | Italic chars |
|---|---:|---:|---:|
| OMNI_HC | 41 | 12 | 192 |
| OMNI_PB | 41 | 44 | 1638 |
| B1_HC | 41 | 41 | 1432 |
| B1_PB | 48 | 71 | 2411 |
| B2_HC | 45 | 23 | 738 |
| B2_PB | 46 | 27 | 742 |
| B3_HC | 45 | 53 | 3002 |
| B3_PB | 41 | 37 | 1807 |

### EPUB italic tags

| Format | `<em>` | `<i>` | Total |
|---|---:|---:|---:|
| B1_EPUB | 103 | 0 | 103 |
| B2_EPUB | 36 | 0 | 36 |
| B3_EPUB | 48 | 0 | 48 |

## 3. Cross-format consistency

For each book, required strings must appear in BUILD + HC + PB + EPUB (+ Omnibus).

### Book 1

| Needle | BUILD_DOCX_1 | B1_HC | B1_PB | B1_EPUB | OMNI_HC | OMNI_PB |
|---|---|---|---|---|---|---|
| 1647 Genessee | Y | Y | Y | Y | Y | Y |
| Warren County | Y | Y | Y | Y | Y | Y |
| Osage ancestral | Y | Y | Y | Y | Y | Y |
| Midwest Precote | Y | Y | Y | Y | Y | Y |
| Hunt Midwest | Y | Y | Y | Y | Y | Y |
| RIVERWARDS | Y | Y | Y | Y | Y | Y |
| hundred and fifty feet | Y | Y | Y | Y | Y | Y |
| bottomed out at a hundred and sixty | Y | Y | Y | Y | Y | Y |
| grandfather died in 2003 | Y | Y | Y | Y | Y | Y |
| Lorraine Masters | Y | Y | Y | Y | Y | Y |
| Lorraine's | Y | Y | Y | Y | Y | Y |
| Sarah Ashworth | Y | Y | Y | Y | Y | Y |

### Book 2

| Needle | BUILD_DOCX_2 | B2_HC | B2_PB | B2_EPUB | OMNI_HC | OMNI_PB |
|---|---|---|---|---|---|---|
| Washington Street office | Y | Y | Y | Y | Y | Y |
| Pennsylvania Avenue | Y | Y | Y | Y | Y | Y |
| Washington Street entrance | Y | Y | Y | Y | Y | Y |
| mailbox. Washington Street | Y | Y | Y | Y | Y | Y |
| mailbox on Washington Street | Y | Y | Y | Y | Y | Y |
| 11 PM. Washington Street | Y | Y | Y | Y | Y | Y |
| apartment hummed its limestone | Y | Y | Y | Y | Y | Y |
| bathroom sink in an apartment in Kansas  | Y | Y | Y | Y | Y | Y |
| Lorraine Masters | Y | Y | Y | Y | Y | Y |
| Senator Deborah Holt | Y | Y | Y | Y | Y | Y |
| Rosalind Lindgren | Y | Y | Y | Y | Y | Y |
| had been born with | Y | Y | Y | Y | Y | Y |

### Book 3

| Needle | BUILD_DOCX_3 | B3_HC | B3_PB | B3_EPUB | OMNI_HC | OMNI_PB |
|---|---|---|---|---|---|---|
| Iceland basalt chamber | Y | Y | Y | Y | Y | Y |
| Across town, 160 feet below the Northlan | Y | Y | Y | Y | Y | Y |
| streets of Quality Hill empty | Y | Y | Y | Y | Y | Y |
| across the river at SubTropolis | Y | Y | Y | Y | Y | Y |
| She drove the long way | Y | Y | Y | Y | Y | Y |
| third floor of the Washington Street bui | Y | Y | Y | Y | Y | Y |
| Quality Hill balcony | Y | Y | Y | Y | Y | Y |
| The apartment hummed at 55 Hz | Y | Y | Y | Y | Y | Y |
| apartment was clean. The apartment was e | Y | Y | Y | Y | Y | Y |
| hallway outside his door | Y | Y | Y | Y | Y | Y |
| Marcus Whitaker | Y | Y | Y | Y | Y | Y |
| Margaret Ferrand | Y | Y | Y | Y | Y | Y |
| Laura Okada | Y | Y | Y | Y | Y | Y |
| Lin Zhao | Y | Y | Y | Y | Y | Y |
| Michael Halloran | Y | Y | Y | Y | Y | Y |
| Nolan Eriksen | Y | Y | Y | Y | Y | Y |
| Idris Broussard | Y | Y | Y | Y | Y | Y |
| Kofi Asante | Y | Y | Y | Y | Y | Y |

## 4. Typography / trim smoke

| Format | Pages | Trim (in) | ISBN digits on early pages |
|---|---:|---|---|
| OMNI_HC | 684 | 6.14×9.21 | Y |
| OMNI_PB | 732 | 5.50×8.50 | Y |
| B1_HC | 163 | 6.14×9.21 | Y |
| B1_PB | 189 | 5.50×8.50 | Y |
| B2_HC | 225 | 6.14×9.21 | Y |
| B2_PB | 271 | 5.50×8.50 | Y |
| B3_HC | 177 | 6.14×9.21 | Y |
| B3_PB | 205 | 5.50×8.50 | Y |

## 5. Body-italic probes (narrative emphasis)

| ISBN | Format | Italic | Roman | Not found | Verdict |
|---|---|---:|---:|---:|---|
| 9798256008048 | Vol I PB | 43 | 0 | 0 | PASS |
| 9798256009953 | Vol II PB | 17 | 0 | 0 | PASS |
| 9798256010072 | Vol III PB | 11 | 0 | 0 | PASS |
| 9798295800801 | Vol I HC | 43 | 0 | 0 | PASS |
| 9798295812675 | Vol II HC | 17 | 0 | 0 | PASS |
| 9798295812705 | Vol III HC | 11 | 0 | 0 | PASS |
| 9798256072704 | Omnibus PB | 71 | 0 | 0 | PASS |
| 9798295884412 | Omnibus HC | 71 | 0 | 0 | PASS |
| 9798256008819 | Vol I EPUB | 43 | 0 | 0 | PASS |
| 9798256009625 | Vol II EPUB | 17 | 0 | 0 | PASS |
| 9798256009809 | Vol III EPUB | 11 | 0 | 0 | PASS |

## Verdict

**UPLOAD AUDIT: PASS** — editorial fixes present, banned strings absent, body italics verified, formats consistent.

*Seventh City Press · PRE-UPLOAD AUDIT · f = 111.2 Hz*