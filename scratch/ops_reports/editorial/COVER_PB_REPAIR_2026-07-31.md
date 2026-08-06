# Paperback cover repair - 2026-07-31

**Status:** Repaired, pending independent Vivian re-QC. Upload gate remains closed.

## Cause and correction

Both July 30 Ingram PDFs are 15 x 12-inch instruction sheets; their
MediaBox, CropBox, TrimBox, and BleedBox do not encode the upload size.
The printed bleed-panel guides provide the production geometry:

| ISBN | Template bleed page | Spine | Rejected file | Excess |
|---|---:|---:|---:|---:|
| 9798256008048 | 11.686 x 8.750 in | 0.436 in | 11.710 x 8.750 in / 0.460 in | +0.024 in |
| 9798256009953 | 11.864 x 8.750 in | 0.614 in | 11.890 x 8.750 in / 0.640 in | +0.026 in |

`remap_pb_spines.py` had hard-coded 0.460/0.640-inch manual spine values,
so its formula `5.625 + spine + 5.625` necessarily produced the two
overwide wraps. The script now reads both bleed panels and the spine gap
from the current template, always rebuilds from the immutable
`cover_wrap_PRE_2026-07-30.pdf`, and fails on inconsistent guide geometry.

Back and front remain separate 5.625 x 8.750-inch panels at approximately
300 dpi; they were not full-wrap-scaled or cropped. Pixel dimensions remain
1687 x 2625 (back) and 1688 x 2625 (front). The barcode placeholder areas
and surrounding back-cover art are unchanged in position and proportion.

Both old, already-lettered spines were discarded. Fresh spines use the
template widths, source CMYK black, and auto-fitted title/author lettering.
The visible text is centered within 0.0033 inch of each spine center.
Measured head/foot clearance is 1.647/1.003 inches on Vol I and
1.647/0.907 inches on Vol II; neither title is clipped or near a page edge.

## Focused verification

- All output MediaBox, CropBox, TrimBox, and BleedBox values exactly match
  the dimensions above.
- Panel boundaries are 0/5.625/6.061/11.686 inches for Vol I and
  0/5.625/6.239/11.864 inches for Vol II.
- All three panels are DeviceCMYK and 299.7-300.5 dpi.
- MASTER and staging copies are byte-identical.
- Low-resolution full-wrap inspection found complete front/back art,
  unchanged aspect ratios, no edge crop or seam, centered/contained spine
  text on both volumes, and intact white ISBN barcode areas.
- Existing `_PRE_2026-07-30` backups were read only and retained.

## Outputs

| ISBN | MASTER/staging bytes | MASTER SHA-256 |
|---|---:|---|
| 9798256008048 | 10,246,243 | `566c5f04925afa9d452a223b4b252586c9e022bcf4ea718455f1f5272d0c9fad` |
| 9798256009953 | 10,794,891 | `57a8844c502c17a0725e79c6fc5eea7c5638c5cb4e33a5cda40597680a8e1ede` |

No upload, publication, commit, or push was performed.
