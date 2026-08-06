# Morning Handoff — Friday, Jul 31, 2026

**From:** Evening closeout Jul 30 + **italics e-proof alert ~5:46 PM CT**  
**Full state:** `EVENING_CLOSEOUT_2026-07-30.md` · **Publishing blocker:** `ITALICS_STRIP_INVESTIGATION_2026-07-30.md`

---

## Do tomorrow (5 items max)

| # | Item | Est. |
|---|------|------|
| 1 | **✅ JASON APPROVED — Ingram upload folder cleaned (Jul 31).** `Desktop\MASTER_UPLOAD_FOLDER` standardized to `{ISBN}_{format}_{type}.pdf`; 24 stale files deleted, 38 renamed. Open `COVER_PREVIEW.html` then pull per folder. Update page counts on upload: Vol I PB **189**, Vol I HC **163**, Vol II PB **271**, Vol II HC 225, Vol III PB 205, Vol III HC 177. Log: `MASTER_UPLOAD_CLEANUP_2026-07-31.md`. | Ready to upload |
| 2 | **Cash App borrow** — due Jul 31 | 2 min |
| 3 | **Free C: disk space** — 🔴 **~33 MB free** (critical). Free space before any further promotions or packaging. | 15–30 min |
| 4 | **Idealist saved search + email alerts** | 5 min |
| 5 | **Google Books partner update** | 10 min |

---

## Italics — FIXED AND VERIFIED (Jul 30 ~7:10 PM CT)

- **11 of 11 formats now pass** body-italic verification — `ITALICS_FIX_VERIFICATION_2026-07-30.md`
- **Six** products were broken, not three: all PB **and all HC**. Omnibus + EPUB were always clean.
- **Cause:** ReportLab `registerFontFamily` missing → `<i>` markup silently dropped. Not Ingram.
- **Also fixed:** Book 3 HC generator defaulted to wrong trim (6.0×9.0 vs 6.14×9.21).
- **Promoted** into `MASTER_UPLOAD_FOLDER`; prior files kept as `interior_PRE_ITALIC_FIX_2026-07-30.pdf`.
- **Regression-checked:** text, trim, and ISBNs identical to shipped — only italics and pagination changed.
- **Permanent guard** added to `pre_upload_audit.py` (fails on body-italic collapse).
- **Page counts:** Vol I PB 185→183, Vol III HC 179→177. Spine shift ≈0.005 in — inside tolerance; update Ingram page-count field only.
- **Vivian QC done (Jul 30 ~7:50 PM):** italic remediation **PASS** — emphasis verified by eye on before/after page crops, zero word-count drift in all six, chapter openers still recto, no margin intrusions, ISBNs correct.

## Preview back matter — FIXED (Jul 30 ~9:45 PM CT)

Vivian caught two defects that were **already live in market**, neither caused by the italics work.

1. **Empty teaser.** Vol I PB p179, Vol I HC p155, Vol II PB p261 printed a chapter opener — "CHAPTER ONE / THE STONE COTTAGE / *3.915 Hz · Iceland*" — then "*End of Preview*" with **no chapter text between them**. Same silent-no-op class as the italics bug: generators passed `[]` for "no preview," but `preview_section()` emitted its half-title, blank verso, and chapter opener regardless.
2. **Stale draft.** Vol II HC's preview was a hardcoded old draft of Vol III Ch.1 that **contradicted the published book** — "the **house** was clean" vs canon "the **apartment** was clean," and "Marcus Chen **on his front porch**" vs "**in the hallway outside his door**."

**Fixed:** new `preview_source.py` pulls Chapter One of the next volume from the canonical build DOCX with italics intact — one source of truth, no retyped literals, no dependency on the unmounted `E:` archive. `preview_section()` now returns nothing on an empty list in all six generators, so the empty shell cannot recur.

**Verified:** every word outside the preview is identical to the shipped file in all four rebuilds; PB and HC previews are now word-for-word identical within each volume; chapter openers still recto; `pre_upload_audit.py` passes editorial + italics + cross-format consistency. Backups saved as `interior_PRE_PREVIEW_FIX_2026-07-30.pdf`.

**⚠ Page counts changed — update Ingram metadata field on upload:** Vol I PB 185→**189**, Vol I HC 159→**163**, Vol II PB 265→**271**, Vol II HC 225 (unchanged), Vol III PB 205 (unchanged), Vol III HC 179→**177**.

**Paperback covers repaired and independently cleared (Jul 31 02:34 CT):** Vol I PB is 11.686 × 8.750″ with a 0.436″ spine; Vol II PB is 11.864 × 8.750″ with a 0.614″ spine. Fresh Vivian rendering against the actual Jul 30 guides found centered/contained spine copy, no clipping, no panel crop or distortion, compliant safe areas/bleed/barcode areas, and exact page-box geometry. Vol I HC + Vol III HC jackets/cases remain unchanged and retained PASS.

**Vivian interior verdict: PASS on all six interiors** — `editorial/VIVIAN_QC_INTERIORS_2026-07-30_SPLIT_VERDICT.md`.

**Vivian cover gate CLEARED — PASS 6/6 (Jul 31 02:34 CT).** Final record: `editorial/VIVIAN_QC_COVERS_2026-07-31.md`. **Jason approved visually Jul 31; upload folder cleaned and renamed — no Ingram upload yet.**

---

## Waiting (no action unless they email)

- PhysicalAddress — mail activation after 1583
- Author Central — metadata refresh in progress

---

## Backlog (not tomorrow)

Omnibus HC pin · Blog INFJ brief · Social branding audit · Groundswell sync Aug 1 · Git push `db7ed1c` · Legacy IG cleanup · Harden `pre_upload_audit.py` body-italic gate

---

**Hear the brief:** `python scripts/speak_morning_brief.py` or double-click `Desktop\Morgan Morning Brief.bat`
