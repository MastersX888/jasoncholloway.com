# Morning Handoff — Friday, Jul 31, 2026

**From:** Evening closeout Jul 30 + **italics e-proof alert ~5:46 PM CT**  
**Full state:** `EVENING_CLOSEOUT_2026-07-30.md` · **Publishing blocker:** `ITALICS_STRIP_INVESTIGATION_2026-07-30.md`

---

## Do tomorrow (5 items max)

| # | Item | Est. |
|---|------|------|
| 1 | **Ingram replace — 6 interiors** (italics + preview both fixed; **Vivian PASS on all six**). Update page counts: Vol I PB **189**, Vol I HC **163**, Vol II PB **271**, Vol II HC 225, Vol III PB 205, Vol III HC 177. **Cover templates requested Jul 30 ~11 PM** → zh5779485@gmail.com (CSS5343306–309); **await email → remap 4 covers** before upload. | 30–45 min |
| 2 | **Cash App borrow** — due Jul 31 | 2 min |
| 3 | **Free C: disk space** (~2 GB free after temp clear — still tight) | 15–30 min |
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

**⚠ Page counts changed — update Ingram, and have River confirm the cover wraps fit:** Vol I PB 185→**189**, Vol I HC 159→**163**, Vol II PB 265→**271**, Vol II HC 225 (unchanged), Vol III PB 205 (unchanged), Vol III HC 179→**177**. Largest spine shift +0.015 in.

**Vivian final verdict: PASS on all six** — `editorial/VIVIAN_QC_INTERIORS_2026-07-30_SPLIT_VERDICT.md`.

---

## Waiting (no action unless they email)

- PhysicalAddress — mail activation after 1583
- Author Central — metadata refresh in progress

---

## Backlog (not tomorrow)

Omnibus HC pin · Blog INFJ brief · Social branding audit · Groundswell sync Aug 1 · Git push `db7ed1c` · Legacy IG cleanup · Harden `pre_upload_audit.py` body-italic gate

---

**Hear the brief:** `python scripts/speak_morning_brief.py` or double-click `Desktop\Morgan Morning Brief.bat`
