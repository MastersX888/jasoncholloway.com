# Agent Task: Generate Final Masters X Omnibus Covers + Visual Confirmation Pass

## Context
You are generating the final print-ready cover files for the Masters X Trilogy omnibus
edition (Seventh City Press). The Python compositor `compose_omnibus_covers_FINAL.py`
encodes every layout decision as a named constant. Your job is to (1) run it with the
real fonts and the raw dome image, (2) visually inspect the output, and (3) make a small
number of value adjustments if the real render reveals issues that the developer could
not see when testing with substitute fonts on a synthetic dome.

## Prerequisites
- Python 3 with `Pillow`, `reportlab`, and `numpy` installed:
  `pip install Pillow reportlab numpy`
- Fonts present at `C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\fonts\`:
  Cinzel_0.ttf, Cinzel_2.ttf, EBGaramond_00.ttf, EBGaramond_01.ttf, EBGaramond_02.ttf
- Author photo at the same path: `JasonCHolloway.png`

## ⚠ CRITICAL: HERO IMAGE RESOLUTION — THE #1 QUALITY ISSUE
The single biggest cause of a degraded-looking front cover is a **low-resolution raw
dome image**. The compositor crops the dome to fill a tall portrait cover face. The
front face must be **at least 2838px tall** (HC trim 9.21in + bleed at 300 DPI). If the
raw dome is shorter than that, it gets UPSCALED to fill the cover — which softens the
coffering detail and produces the muddy/degraded look.

**Before running the compositor:**
1. Locate the RAW dome photograph (the clean Midjourney/Flux dome with NO text — NOT a
   previously composited cover).
2. Check its height. If under ~3000px tall, **upscale it first** with Topaz Gigapixel 8
   (or comparable AI upscaler) to at least **3200px tall**. Do this on the raw dome only.
3. Feed the upscaled dome to the compositor as `--hero`.

The script prints a RESOLUTION WARNING on startup if the hero is too small. If you see
that warning, STOP, upscale the dome, and re-run. The compositor applies a mild unsharp
mask to recover crispness, but it cannot add detail that is not in the input image.

The script now also outputs a separate `COVER_OMNIBUS_FRONTFACE_WEB_2500.png` (2500px,
for Amazon/Kindle) alongside the full-resolution standalone.

## ✓ PRODUCTION GEOMETRY — now matched to the official templates
The HC and PB layouts were rebuilt to place every panel at the EXACT coordinates from
the IngramSpark template PDFs (9798256072704-Perfect.pdf and 9798295884412-Jacket.pdf):
- PB spine folds at x=7.4806" and 8.8750"; cover artwork spans 1.8556"–14.5".
- HC spine folds at x=12.1250" and 13.4375"; flap folds at 5.2972" and 20.2653";
  cover wrap height 9.71" (trim 9.21 + 0.25 wrap top & bottom).
- The dome (front cover) bleeds to the correct edges; back/spine/flaps are solid-bg
  and the document background fills their bleed seamlessly.
This fixes the earlier bug where panels stacked from the left edge, misplacing the spine
and leaving a black gap. If you ever change page count (which changes spine width), the
spine fold coordinates in build_pb/build_hc must be updated from a fresh IS template.



## ✓ COLOUR MANAGEMENT — fixes the "PDF looks worse than the JPG" issue
Earlier PDFs were bare **DeviceCMYK** converted with a crude maximum-black formula, which
PDF viewers render dark/muddy (and would print slightly off). The script now:
- Converts RGB→CMYK through the **FOGRA39 coated ICC profile** (perceptual intent), which
  preserves the dome's warm luminosity, then limits total ink to **240%** (IngramSpark cap).
- Embeds the image as **ICCBased CMYK with the profile inside the PDF**, so colour-managed
  viewers (Acrobat) display it correctly and IngramSpark gets the right colour interpretation.

**REQUIREMENT:** keep `FOGRA39L_coated.icc` in the SAME FOLDER as the script. The script
finds it automatically. To use a different profile (e.g. a US SWOP profile), pass
`--icc-profile "C:\path\to\USWebCoatedSWOP.icc"`. If no profile is found, the script
falls back to an improved UCR conversion (better than the old method, but the ICC profile
is strongly preferred — ship the .icc file).

Run line with the profile present:
```
python compose_omnibus_covers_FINAL.py --hero "C:\path\to\upscaled_dome.png" --output "C:\...\output"
```
Expected console line per PDF: `PDF: ICCBased CMYK (FOGRA39 embedded) — colour-accurate`.
If you instead see `improved UCR conversion`, the .icc file isn't beside the script — fix that.

## Step 1 — Run the compositor
```
python compose_omnibus_covers_FINAL.py --hero "C:\path\to\raw_dome.png" --output "C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\output"
```
The script prints a font verification table on startup. If any font shows `✗ MISSING`,
stop and fix the path before continuing.

Outputs:
- `COVER_OMNIBUS_PB_9798256072704_FINAL_v2.pdf` (15×12 in, CMYK)
- `COVER_OMNIBUS_HC_9798295884412_FINAL_v2.pdf` (24×12.5 in, CMYK)
- `COVER_OMNIBUS_FRONTFACE_STANDALONE.png` (1800×2700)
- `pb_preview.jpg`, `hc_preview.jpg` (human-readable proofs)

## Step 2 — Visual inspection checklist
Open `pb_preview.jpg` and `hc_preview.jpg` and the standalone PNG. Verify each item.
The developer tested with substitute fonts on a synthetic dome, so the items most likely
to need real-render adjustment are marked **[VERIFY]**.

FRONT FACE
- [ ] Title `THE COMPLETE TRILOGY` sits on the dome, not fighting the bright oculus zone.
- [ ] **[VERIFY]** Volume listing line ("The Inheritance of Frequency · The Grimoire ·
      The Kingdom") is legible via its soft drop shadow, with NO visible rectangular
      band behind it. If a band appears, the shadow blur radius is too tight — see
      Adjustment A below.
- [ ] **[VERIFY]** Title block has a dark enough gradient bed. If the title's lower
      edge fights bright travertine, deepen the gradient — see Adjustment B.
- [ ] Candle visible at the bottom, author name + rules clear of it.
- [ ] Latin epigraph faint/subliminal in the lower rotunda wall, not semi-legible.

SPINE
- [ ] **[VERIFY]** Dome strip is BARELY perceptible — the spine should read as mostly
      dark with only a whisper of dome texture. If the dome is a bright/busy band that
      competes with the gold type, increase the veil — see Adjustment C.
- [ ] Spine text "MASTERS X · THE COMPLETE TRILOGY · JASON CARROLL HOLLOWAY" reads
      cleanly and is fully visible (not clipped).
- [ ] Imprint mark (heptagram) at the spine foot, clear of the candle wrap zone.

BACK PANEL
- [ ] Body copy readable, no collision with the closing quote.
- [ ] Closing quote "Only love lets you survive it." centered with rules.
- [ ] Epigraph ("In the beginning was the Word. / But before the Word, there was the
      listening.") reads in FULL, both lines, clear of the barcode box.
- [ ] Barcode reserve zone (white box, bottom-right) clear of all text.
- [ ] Seventh City Press + heptagram bottom-left.

HC FLAPS
- [ ] Front flap copy reads cleanly (roman, not italic).
- [ ] Back flap: author photo (square, ~62% flap width) above the bio, gold rule under
      the photo, bio in italic below. No overlap.

## Step 3 — Adjustments (only if a [VERIFY] item fails)
All constants are at the top of the script. Change the value, re-run, re-inspect.

**Adjustment A — volume-listing band visible**
In `front_face()`, the drop shadow blur is `radius=px(0.02)`. If a hard band shows,
increase to `radius=px(0.035)`. If the shadow is too weak to aid legibility, lower the
fill alpha from `200` toward `160` and increase blur.

**Adjustment B — front-face gradient not dark enough**
Near the top, increase `UP_GRAD_OP` (currently 215) toward 230, and/or `UP_GRAD_H`
(currently 0.34) toward 0.38. Re-run. The title should sit on a clean dark bed.

**Adjustment C — spine dome strip too bright/busy**
In `spine()`, the veil alpha is `224`. Increase toward `235` or `240` to make the dome
nearly invisible. If you'd rather remove the dome strip entirely, pass `hero_img=None`
is not exposed — instead set the veil to `255` (fully dark) which removes the dome and
leaves a clean black spine.

**Adjustment D — title size**
If the title reads too large for your taste, reduce `S["title"]` from `0.044` toward
`0.040` or `0.038`. (The developer and art director judged 0.044 acceptable for an
omnibus that needs shelf presence, but this is a taste call.)

## Step 4 — CMYK / PDF-X1a confirmation
The script outputs DeviceCMYK PDFs (verified: 4 channels, controlled rich black at 240%
max ink). This satisfies IngramSpark's color-space requirement.

For STRICT PDF/X-1a:2001 compliance (output-intent metadata), if you have Ghostscript
installed, run this pass on each PDF after generation:
```
gs -dPDFX -dBATCH -dNOPAUSE -sColorConversionStrategy=CMYK -sDEVICE=pdfwrite ^
   -dPDFXSETBLEEDBOXTOMEDIABOX -sOutputFile=COVER_X1a.pdf PDFX_def.ps COVER.pdf
```
If you do not have Ghostscript, upload the CMYK PDFs as-is to IngramSpark and let their
preflight report whether the output-intent declaration is required. The color-space
requirement (the #1 rejection cause) is already satisfied.

## Step 5 — Final preflight before upload
- [ ] Author name reads "Jason Carroll Holloway" on front, back, spine — never "Jason
      C. Holloway".
- [ ] Imprint reads "Seventh City Press" — never "Sacred Books LLC".
- [ ] PB document: 15.0 × 12.0 in, spine 1.395"; HC document: 24.0 × 12.5 in, spine 1.313".
- [ ] No spoiler in any cover copy (no mention of Iceland, no "report you are about to
      read", no statement that Blake authored the account — that is the closing reveal).
- [ ] Thumbnail test: scale the standalone PNG to 150px wide; oculus and title still
      readable.

## Step 6 — Deliver
Report back with the two preview JPGs and confirm which (if any) adjustments you made.
Then the author will order a physical proof copy from IngramSpark before going wide.
