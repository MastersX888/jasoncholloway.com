# CHANGELOG: Pre-Publication Remediation (2026-07-02)

## 1. Paperback ISBN Fix
**Issue:** The paperback interior copyright page incorrectly displayed the hardcover ISBN (`979-8-2958-8441-2`).
**Resolution:** 
- Traced the bug to a fallback environment variable in `generate_omnibus_interior_PB_5x8_v8.py` that hardcoded the HC ISBN as the default.
- Modified the script to use the correct PB ISBN (`979-8-2560-7270-4`) as the default.
- Re-generated the `MASTERS_X_OMNIBUS_DEMY_9798256072704_INTERIOR.pdf`.
- **Status:** FIXED.

## 2. Cover Ink Limiting and Color Space
**Issue:** The HC and PB covers exceeded the 240% Total Area Coverage (TAC) limit required by IngramSpark, and the PB cover was in RGB color space.
**Resolution:**
- Wrote a custom Pikepdf/PIL script (`limit_ink_and_inject.py`) to surgically target the raw image streams inside the final cover PDFs.
- Converted all RGB images to CMYK using the `FOGRA39L_coated.icc` profile.
- Downscaled the C, M, and Y channels for any pixels exceeding a 230% TAC limit (providing a 10% safety buffer against JPEG compression artifacts).
- Injected the corrected raster images back into the PDF without altering the vector typography, spine alignment, or barcode box.
- **Status:** FIXED.

## Optional Polish Recommendations
1. **Copyright Page Layout:** In the `frontmatter()` function, the copyright notice could be visually improved by using a slightly smaller leading or a hairline rule to separate the publisher URL from the copyright text.
2. **Author Bio Check:** The `backmatter()` paragraph references "Mercy University" and "various degrees and certificates in Psychology". You might consider keeping the bio slightly shorter for the Omnibus to balance the page visually.
3. **Build System Documentation:** Consider writing a short `README` or updating the repository map, as future editors may assume a `pandoc + XeLaTeX` stack instead of the current `ReportLab + Python` stack, which could lead to confusion.
