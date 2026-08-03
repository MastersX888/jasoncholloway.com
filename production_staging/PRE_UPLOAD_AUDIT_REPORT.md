# PRE-UPLOAD AUDIT REPORT
**Date:** 2026-07-28
**Scope:** Editorial fixes · italics · cross-format consistency
**Authority:** `FIX_CHANGELOG.md` + apartment/balcony pass + dwelling follow-ups

## 1. Editorial corrections (required present / banned absent)

### BUILD_DOCX_1 — **PASS**
- All 8 required present; all 6 banned absent.

### BUILD_DOCX_2 — **PASS**
- All 8 required present; all 8 banned absent.

### BUILD_DOCX_3 — **PASS**
- All 10 required present; all 10 banned absent.

### OMNI_HC — **PASS**
- All 26 required present; all 24 banned absent.

### OMNI_PB — **PASS**
- All 26 required present; all 24 banned absent.

### B1_HC — **PASS**
- All 8 required present; all 6 banned absent.

### B1_PB — **PASS**
- All 8 required present; all 6 banned absent.

### B2_HC — **PASS**
- All 8 required present; all 8 banned absent.

### B2_PB — **PASS**
- All 8 required present; all 8 banned absent.

### B3_HC — **PASS**
- All 10 required present; all 10 banned absent.

### B3_PB — **PASS**
- All 10 required present; all 10 banned absent.

### B1_EPUB — **PASS**
- All 8 required present; all 6 banned absent.

### B2_EPUB — **PASS**
- All 8 required present; all 8 banned absent.

### B3_EPUB — **PASS**
- All 10 required present; all 10 banned absent.

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
| OMNI_HC | 41 | 16 | 353 |
| OMNI_PB | 41 | 44 | 1638 |
| B1_HC | 53 | 10 | 204 |
| B1_PB | 47 | 21 | 442 |
| B2_HC | 45 | 9 | 167 |
| B2_PB | 45 | 14 | 227 |
| B3_HC | 45 | 14 | 290 |
| B3_PB | 41 | 8 | 170 |

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

## 4. Typography / trim smoke

| Format | Pages | Trim (in) | ISBN digits on early pages |
|---|---:|---|---|
| OMNI_HC | 684 | 6.14×9.21 | Y |
| OMNI_PB | 732 | 5.50×8.50 | Y |
| B1_HC | 159 | 6.14×9.21 | Y |
| B1_PB | 185 | 5.50×8.50 | Y |
| B2_HC | 225 | 6.14×9.21 | Y |
| B2_PB | 265 | 5.50×8.50 | Y |
| B3_HC | 179 | 6.14×9.21 | Y |
| B3_PB | 205 | 5.50×8.50 | Y |

## Verdict

**UPLOAD AUDIT: PASS** — editorial fixes present, banned strings absent, italics detected, formats consistent.

*Seventh City Press · PRE-UPLOAD AUDIT · f = 111.2 Hz*