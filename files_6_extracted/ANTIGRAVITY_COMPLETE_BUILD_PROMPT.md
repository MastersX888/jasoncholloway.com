# MASTERS X — COMPLETE PRODUCTION BUILD
## For: Antigravity Agent / Gemini 3.1
## Classification: L99 / GODMODE
## Author: Jason Carroll Holloway | Publisher: Seventh City Press LLC
## Date issued: June 24, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## BEFORE YOU DO ANYTHING — READ AND OBEY THESE SIX RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RULE 1 · LOAD THE REGISTRY FIRST
  Load `edition_registry.json`. Every build parameter — trim, ISBN,
  page count, imprint — comes from that file. You do not hardcode
  anything. You do not guess. You look it up.

RULE 2 · MASTERS X IS NOT 6×9. NEVER.
  The trilogy ships in TWO trims. Neither is 6×9.
    Royal 8vo  = 6.14 × 9.21 in = 442.08 × 663.12 pt
    Demy 8vo   = 5.5  × 8.5  in = 396.0  × 612.0  pt
  6×9 (432×648 pt) is valid ONLY for the Hawkes monograph (two editions).
  If you produce a 6×9 Masters X file, that is a critical failure. Stop.

RULE 3 · ONE EDITION = ONE ISBN. NEVER REUSE OR BLEED.
  Royal, Demy, and EPUB editions of the same volume have three DIFFERENT
  ISBNs. The ISBN printed in a file must be the ISBN registered to THAT
  edition in the registry. If a second 13-digit number starting with 978
  or 979 appears anywhere in the body of a generated file, remove it.

RULE 4 · BUILD ONLY build=true ROWS
  The registry has 18 rows. 14 have build=true. Build those 14, in the
  order listed in SECTION 3. The 4 with build=false are HOLD — do not
  touch them. The note field explains why.

RULE 5 · VERIFY EVERY FILE BEFORE MARKING IT DONE
  Run `verify_trim_isbn.py` on every generated file. A file that does not
  pass the gate is NOT done and must NOT be reported as shippable. If it
  fails, fix the specific failure and re-run. Do not proceed to the next
  edition until the current one passes.

RULE 6 · WHEN IN DOUBT, HALT AND REPORT TO JASON
  This prompt answers every decision you need to make. If something
  is not covered here and you would otherwise guess — stop, write
  "NEEDS JASON: <question>", and move on to the next edition.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 1 · CONTEXT (what happened before this prompt)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Masters X Trilogy (The Inheritance of Frequency / The Grimoire /
The Kingdom) and the Hawkes monograph have undergone a full italic
remediation pass. The source of truth is the `_FIXED.docx` files.
The following was already applied to those files — do not redo it:

  ✓ Defect 4A: Dialogue-tag swallow fixed in Book 1 (Para 374) and
    Book 3 (Para 1600). Attribution verbs are now roman.
  ✓ Defect 4B: All 10 long italic spans kept as italic. No block quotes.
    This was a deliberate authorial decision. Do not convert them.
  ✓ Defect 4C: `nadia*volkov*session_001.eeg` corrected to plain roman
    `nadia_volkov_session_001.eeg` in Book 3.
  ✓ Author name normalized: "Jason C. Holloway" → "Jason Carroll Holloway"
    throughout all docx sources.
  ✓ Italic storage: Real <w:i> runs in docx. 105/36/48 italic runs in
    Books 1/2/3 respectively. No asterisks remain in source text.

Earlier build sessions produced 6×9 proof-of-concept PDFs and EPUBs.
THOSE FILES ARE WRONG TRIM. Do not use them as references for Masters X.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 2 · YOUR TOOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PDF interiors    → generate_book1_interior.py / book2 / book3
                   generate_omnibus_interior_v6.py (Omnibus)
                   Source: _FIXED.docx per volume
                   Engine: ReportLab
                   Trim: set via ReportLab pagesize=(width_pt, height_pt)

EPUB             → generate_epubs_v1.py
                   Source: _FIXED.docx per volume
                   Engine: ebooklib
                   ISBN: set dc:identifier in OPF

Verification     → verify_trim_isbn.py  (provided, pipeline-agnostic)
                   verify_deliverables.py (broader format check)
                   flag_long_spans.py (italic review — already run, do not re-run)

Registry         → edition_registry.json (18 rows, ground truth for all parameters)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 3 · BUILD ORDER AND SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Process in this exact order. For every item:
  (a) load the registry row by ISBN
  (b) set trim from row.trim_pt (print) or skip trim (EPUB)
  (c) stamp ISBN from row.isbn onto copyright page / OPF
  (d) set imprint from row.imprint (exact string, do not alter)
  (e) generate the file
  (f) run verify_trim_isbn.py — pass before proceeding

────────────────────────────────────────
GROUP A · MASTERS X INDIVIDUAL VOLUMES
  Build 9 files: 3 volumes × (Royal + Demy + EPUB)
────────────────────────────────────────

A1. BOOK 1 — THE INHERITANCE OF FREQUENCY
    Royal 8vo PDF
      ISBN      : 9798295800801
      Trim (pt) : 442.08 × 663.12
      Pages exp : 268
      Imprint   : Seventh City Press
      Generator : generate_book1_interior.py
      Verify    : python3 verify_trim_isbn.py <file> 9798295800801 442.08 663.12

    Demy 8vo PDF
      ISBN      : 9798256008048
      Trim (pt) : 396.0 × 612.0
      Pages exp : 322
      Imprint   : Seventh City Press
      Generator : generate_book1_interior.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256008048 396.0 612.0

    EPUB
      ISBN      : 9798256008819
      Imprint   : Seventh City Press
      Pages exp : 267
      Generator : generate_epubs_v1.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256008819

A2. BOOK 2 — THE GRIMOIRE
    Royal 8vo PDF
      ISBN      : 9798295812675
      Trim (pt) : 442.08 × 663.12
      Pages exp : 386
      Imprint   : Seventh City Press
      Generator : generate_book2_interior.py
      Verify    : python3 verify_trim_isbn.py <file> 9798295812675 442.08 663.12

    Demy 8vo PDF
      ISBN      : 9798256009953
      Trim (pt) : 396.0 × 612.0
      Pages exp : 490
      Imprint   : Seventh City Press
      Generator : generate_book2_interior.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256009953 396.0 612.0

    EPUB
      ISBN      : 9798256009625
      Imprint   : Seventh City Press
      Pages exp : 385
      Generator : generate_epubs_v1.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256009625

A3. BOOK 3 — THE KINGDOM
    Royal 8vo PDF
      ISBN      : 9798295812705
      Trim (pt) : 442.08 × 663.12
      Pages exp : 362
      Imprint   : Sacred Books          ← NOTE: Sacred Books, not Seventh City Press
      Generator : generate_book3_interior.py
      Verify    : python3 verify_trim_isbn.py <file> 9798295812705 442.08 663.12

    Demy 8vo PDF
      ISBN      : 9798256010072
      Trim (pt) : 396.0 × 612.0
      Pages exp : 362
      Imprint   : Seventh City Press
      Generator : generate_book3_interior.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256010072 396.0 612.0

    EPUB
      ISBN      : 9798256009809
      Imprint   : Seventh City Press
      Pages exp : 291
      Generator : generate_epubs_v1.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256009809

────────────────────────────────────────
GROUP B · MASTERS X OMNIBUS
  "The Complete Trilogy"
  Build 2 files: Royal + Demy (NO EPUB — no ISBN exists for it)
────────────────────────────────────────

B1. OMNIBUS — ROYAL 8vo PDF
      ISBN      : 9798295884412
      Trim (pt) : 442.08 × 663.12
      Pages exp : 732
      Imprint   : Seventh City Press
      Generator : generate_omnibus_interior_v6.py
      Verify    : python3 verify_trim_isbn.py <file> 9798295884412 442.08 663.12

    Assembly spec for the Omnibus generator:
      1. Unified front matter (once):
           Title page  : MASTERS X: THE COMPLETE TRILOGY
           Author      : Jason Carroll Holloway
           Publisher   : Seventh City Press LLC
           Copyright   : composite of all three volumes
           ISBN        : 9798295884412 (Royal) or 9798256072704 (Demy) per build
      2. Volume separator page before each volume body:
           VOLUME ONE   / THE INHERITANCE OF FREQUENCY
           VOLUME TWO   / THE GRIMOIRE
           VOLUME THREE / THE KINGDOM
      3. Volume bodies in order: Book 1 → Book 2 → Book 3
         Carry all italics, scene breaks (◇ ◆ ◇), chapter heads from each volume.
      4. Back matter (once, at the end): "Also by" + "About the Author"
      Page-count check: derive expected total as
        (book1_royal_pages + book2_royal_pages + book3_royal_pages + 6 separator pages)
      Registered count is 732pp. Acceptable range: 732 ± 37 (±5%).
      If outside range, WARN and report — do not silently pass or silently fail.

B2. OMNIBUS — DEMY 8vo PDF
      ISBN      : 9798256072704
      Trim (pt) : 396.0 × 612.0
      Pages exp : 736
      Imprint   : Seventh City Press
      Status    : Pending Publisher Approval
      Generator : generate_omnibus_interior_v6.py
      Verify    : python3 verify_trim_isbn.py <file> 9798256072704 396.0 612.0

      ⚠ HOLD UPLOAD: This file may be drafted but must NOT be uploaded to
        IngramSpark until Jason confirms the "Pending Publisher Approval"
        status has cleared. Mark the file DRAFT-HOLD in your run log.

B3. OMNIBUS — EPUB
      ⛔ DO NOT BUILD. No ISBN exists for this edition in IngramSpark.
      Building it without a registered ISBN would mean distributing a
      book with no valid identifier. Log: "OMNIBUS EPUB SKIPPED — no ISBN
      registered. Jason must create the IS listing and obtain an ISBN first."

────────────────────────────────────────
GROUP C · HAWKES MONOGRAPH
  "Innocence, Desire, and the Architecture of the Fall"
  Build 3 files. 6×9 IS valid here (and only here).
────────────────────────────────────────

C1. HAWKES — 6×9 PERFECT BOUND PDF
      ISBN      : 9798295778247
      Trim (pt) : 432.0 × 648.0       ← 6×9 is correct for Hawkes only
      Pages exp : 84
      Imprint   : Seventh City Press
      Verify    : python3 verify_trim_isbn.py <file> 9798295778247 432.0 648.0

C2. HAWKES — ROYAL 8vo PDF
      ISBN      : 9798349308444
      Trim (pt) : 442.08 × 663.12
      Pages exp : 84
      Imprint   : Seventh City Press
      Verify    : python3 verify_trim_isbn.py <file> 9798349308444 442.08 663.12

C3. HAWKES — EPUB
      ISBN      : 9798295778926
      Imprint   : Seventh City Press
      Pages exp : 90
      Verify    : python3 verify_trim_isbn.py <file> 9798295778926

    Note: Page counts differ across Hawkes editions (84pp print vs 90pp EPUB).
    This is normal — different layouts. Do not treat it as an error.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 4 · VERIFICATION GATE (mandatory on every file)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run BOTH verification scripts on every generated file:

  # Full format + name + italic check
  python3 verify_deliverables.py <file>

  # Trim + ISBN check (PDFs need w h; EPUBs do not)
  python3 verify_trim_isbn.py <file> <isbn> [<w_pt> <h_pt>]

A file PASSES only if both scripts exit 0.

What each check catches:
  ✓ File is a real PDF (%PDF header) or real EPUB (zip + mimetype)
  ✓ PDF trim is within ±1pt of registered dimensions
  ✓ Registered ISBN appears on copyright page
  ✓ No foreign ISBN anywhere in the body
  ✓ No "Jason C. Holloway" anywhere (must be "Jason Carroll Holloway")
  ✓ EPUB has true <em> italic tags (not asterisks)
  ✓ EPUB has nav/TOC
  ✓ Page count within ±5% of expected (WARN if outside; do not auto-fail)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 5 · PRE-ANSWERED DECISIONS (do not re-ask these)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: Should I convert long italic blocks to block quotes?
A: NO. All 10 flagged spans remain italic. Authorial decision, final.

Q: Should I build Kindle-specific EPUB variants?
A: NO. Upload standard EPUB3 to KDP. Validate via Kindle Previewer before upload.

Q: Should I normalize all imprints to "Seventh City Press"?
A: NO. Use the imprint in the registry row exactly. "Sacred Books" appears on
   The Kingdom Royal 8vo and is left as-is pending Jason's decision. Do not change it.

Q: The contributor name in IngramSpark has extra spaces ("Jason  Carroll").
   Should I fix it in the files?
A: The DOCX source and all generated interiors must read "Jason Carroll Holloway"
   (single spaces). The IS metadata spacing is a dashboard problem, not a file
   problem. Do not attempt to "fix" the IS metadata from this pipeline.

Q: Should I build the Illustrated Editions?
A: NO. They have processing errors in IS and require an illustration program
   (artwork) that this text pipeline cannot supply. HOLD.

Q: Should I build the Hawkes Case Laminate (9798295777622)?
A: NO. Status is "Title in Revision" in IngramSpark. HOLD until status clears.

Q: Royal and Demy Omnibus have different page counts (732 vs 736). Is that right?
A: Yes. Different trims reflow to different page counts. Both are correct.

Q: Book 3 Royal (Sacred Books) vs Book 3 Demy (Seventh City Press) — different
   imprints on the same title. Is that intentional?
A: Use what the registry says. Jason is aware; final decision is pending.
   DO NOT harmonize them yourself.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 6 · RUN LOG FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After completing each file, append one row to run_log.json:

  {
    "isbn": "9798295800801",
    "edition_key": "PRINT_ROYAL_8vo",
    "title_short": "Book 1 Royal",
    "output_file": "MASTERS_X_BOOK1_ROYAL.pdf",
    "trim_pt_actual": [442.08, 663.12],
    "pages_actual": 268,
    "pages_expected": 268,
    "page_diff_pct": 0.0,
    "isbn_on_page_verified": true,
    "foreign_isbn_found": false,
    "author_name_clean": true,
    "gate_result": "PASS",
    "upload_status": "READY",
    "notes": ""
  }

For the Demy Omnibus: upload_status = "DRAFT-HOLD — pending IS approval"
For the Omnibus EPUB: upload_status = "SKIPPED — no ISBN registered"
For any FAIL: gate_result = "FAIL", notes = specific failure reason.

When all 14 rows are written, print the full run_log.json and a summary:
  PASS: N  |  FAIL: N  |  HOLD-UPLOAD: N  |  SKIPPED: N

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 7 · WHAT TO ESCALATE TO JASON WHEN DONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When the run is complete, surface the following to Jason regardless
of whether they caused failures — these require his action, not yours:

  ESCALATION 1 · Omnibus EPUB ISBN
    No EPUB ISBN exists for "Masters X: The Complete Trilogy" in IngramSpark.
    Jason must create the IS listing and assign an ISBN before an Omnibus EPUB
    can be built and distributed.

  ESCALATION 2 · Book 3 / Hawkes imprint decision
    The Kingdom Royal 8vo is registered under "Sacred Books."
    The Kingdom Demy and EPUB are registered under "Seventh City Press."
    This split may be intentional (Sacred Books as a sub-imprint for the HC)
    or an error. Jason must confirm before uploading The Kingdom Royal.

  ESCALATION 3 · Demy Omnibus upload hold
    9798256072704 is "Pending Publisher Approval" in IngramSpark.
    The file is built and ready. Jason must log into IS and approve
    the title before it can be distributed.

  ESCALATION 4 · IngramSpark contributor name spacing
    The IS dashboard shows "Jason  Carroll" (multiple spaces) on several titles.
    This is a metadata cleanup in the IS account, not fixable from this pipeline.
    Jason should log in and correct the contributor name to "Jason Carroll Holloway"
    on all 18 listings.

  ESCALATION 5 · Live Canadian copies / trim continuity
    15 copies (5 per volume, Perfect Bound) have already sold in Canada.
    Before uploading Demy 8vo revisions over those editions, Jason should download
    the currently accepted interior from IngramSpark and run:
      python3 verify_trim_isbn.py <downloaded_file> <isbn> 396.0 612.0
    If it passes, the revision matches the live spec and is safe to upload.
    If it fails, there is a trim or ISBN discrepancy in the live files —
    surface to Jason before overwriting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESCALATION RULE (supersedes everything)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If at any point a generated file:
  - Is not a real PDF or EPUB (renamed text file, markdown, etc.)
  - Has the wrong trim (even by more than 1pt)
  - Contains the wrong ISBN or a foreign ISBN
  - Contains "Jason C. Holloway"

HALT THAT FILE. Log: "CRITICAL FAILURE — <isbn> — <reason>."
Do not mark it shippable. Do not upload it. Report to Jason Carroll Holloway.
Proceed to the next edition in the build order.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Prompt issued by Claude, Lead Narrative Designer — June 24, 2026*
*Seventh City Press LLC · Masters X Trilogy production suite*
*Companion files: edition_registry.json · verify_trim_isbn.py ·*
*verify_deliverables.py · flag_long_spans.py*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
