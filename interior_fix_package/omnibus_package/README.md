# MASTERS X OMNIBUS — INTERIOR ITALIC FIX PACKAGE
# Generated: June 30, 2026

## WHAT'S IN THIS PACKAGE

    generate_omnibus_interior_HC_6x9_v8.py   ← run this for the hardcover interior
    generate_omnibus_interior_PB_5x8_v8.py   ← run this for the paperback interior
    verify_omnibus_interiors_v8.py            ← run this to confirm everything worked
    ITALIC_FIX_AGENT_PROMPT.md                ← full briefing document with diagnostics

    COVER_OMNIBUS_PB_9798256072704_CORRECTED_v5.pdf   ← PB cover — READY TO SUBMIT
    COVER_OMNIBUS_HC_9798295884412_CORRECTED_v5.pdf   ← HC cover — K/barcode fixed,
                                                          centering needs compositor fix
    COVER_OMNIBUS_HC_9798295884412_FINAL_v2.pdf        ← HC cover original v2 source
    9798256072704-Perfect.pdf                           ← IngramSpark PB template
    9798295884412-Jacket.pdf                            ← IngramSpark HC template

---

## THE BUG (one line, confirmed)

`generate_omnibus_interior_v6.py` registered three Garamond font variants but never
called `addMapping()` to tell ReportLab which variant to use for <i> and <b> tags.
Without that mapping, ReportLab silently ignores italic/bold markup in body text.

The fix is 5 lines added to the font registration block. Both v8 scripts already
have the fix applied — you do NOT need to modify them.

---

## HOW TO RUN

### Prerequisites (same as before — nothing new required)
- Python with: docx, reportlab, Pillow, pikepdf (for verification)
- Font files: C:\Windows\Fonts\GARA.TTF, GARABD.TTF, GARAIT.TTF
- Source DOCX: MASTERS_X_TRILOGY_READTHROUGH_FINAL.docx (in your workspace)

The scripts still point to:
    C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy\

If this path has moved, update TRILOGY_DIR near line 43 of each script.

### Step 1 — Hardcover interior
    python generate_omnibus_interior_HC_6x9_v8.py

    Output: ...\Omnibus_BW_Hardcover\INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf
    Expected pages: ~536 (same as v7 — italic text reflowing won't change page count)
    Trim: 6.14" x 9.21"

### Step 2 — Paperback interior
    python generate_omnibus_interior_PB_5x8_v8.py

    Output: ...\Omnibus_BW_Paperback\INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf
    Expected pages: ~630 (same as v7)
    Trim: 5.5" x 8.5"

### Step 3 — Verify
    python verify_omnibus_interiors_v8.py \
        INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf \
        INTERIOR_MASTERS_X_OMNIBUS_PB_5x8_v8.pdf

    All checks must pass before submitting to IngramSpark.

---

## WHAT CHANGED IN v8 vs v7

    HC script (generate_omnibus_interior_HC_6x9_v8.py):
      + from reportlab.lib.fonts import addMapping          (line 42)
      + addMapping("Garamond", 0, 0, "Garamond")           (line 72)
      + addMapping("Garamond", 0, 1, "GaramondIt")         (line 73)
      + addMapping("Garamond", 1, 0, "GaramondBd")         (line 74)
      + addMapping("Garamond", 1, 1, "GaramondIt")         (line 75)

    PB script (generate_omnibus_interior_PB_5x8_v8.py):
      Same italic fix PLUS:
      - TRIM_W = 5.5 * inch  (was 6.14)
      - TRIM_H = 8.5 * inch  (was 9.21)
      - M_GUTTER = 0.875"    (was 1.1")
      - M_OUTSIDE = 0.5"     (was 0.95")
      - M_TOP = 0.75"        (was 1.0")
      - M_BOTTOM = 0.75"     (was 1.2")
      - OUTPUT_DIR: Omnibus_BW_Paperback (not Hardcover)
      - ISBN env var: MASTERSX_OMNIBUS_PB_ISBN = 979-8-2560-7270-4

    Nothing else changed. The DOCX extraction, paragraph classification,
    chapter opening logic, ornament drawing, and all other pipeline code
    is identical to v6/v7.

---

## COVER STATUS

    PB cover:  READY — use COVER_OMNIBUS_PB_9798256072704_CORRECTED_v5.pdf
               K-corrected, correct barcode, correct positioning. Submit as-is.

    HC cover:  NOT READY — centering is off by 0.83" (front cover composition
               shifted right in the compositor). The v5 HC file has the correct
               K correction and barcode but needs the compositor fix.
               See HC_COVER_COMPOSITOR_FIX_PROMPT.md (in prior session output)
               for the specific line to change in compose_omnibus_pb.py.
               Do NOT try to fix the HC cover by pixel-shifting the rasterized PDF.
