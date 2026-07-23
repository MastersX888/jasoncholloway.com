# Channel Banner — Layout Spec (2560 × 1440 px)

Build in Figma or Canva at exact dimensions. Export PNG under 6 MB.

---

## Safe zones (critical)

| Zone | Dimensions | Rule |
|------|------------|------|
| Full canvas | 2560 × 1440 | Background only — assume cropped everywhere |
| TV-visible | center 1546 × 423 | All meaningful content inside this |
| **Mobile/desktop text zone** | **center 1235 × 338** | ALL TEXT must live here — this is what everyone sees |

---

## Layer stack (bottom to top)

1. **Background:** K-black `#0a0a0a`, full canvas. No texture, no gradient, no AI art.
2. **Optional watermark:** heptagram `{7/3}` mark at 15% opacity, offset right of center, large — reads as texture, not logo.
3. **Gold rule:** 2px horizontal line, `#C9A227`, spanning ~70% of the text zone width, positioned between the name line and the series line.

## Text layout (inside center 1235 × 338)

| Line | Content | Type spec |
|------|---------|-----------|
| 1 | `JASON CARROLL HOLLOWAY` | Cinzel Regular, all caps, +80 tracking, white `#F5F2EA` |
| — | gold rule | `#C9A227` |
| 2 | `THE FACTS BEHIND THE FICTION` | Cinzel Bold, all caps, +60 tracking, gold `#C9A227` — the visually dominant line |
| 3 | `Research behind the Masters X Trilogy` | EB Garamond Italic, sentence case, cream `#E8E2D0` |
| 4 | `jasoncholloway.com` | Cinzel Regular, small, +100 tracking, white at 70% |

Hierarchy check: line 2 largest, line 1 second, lines 3–4 clearly subordinate. Left-aligned block or centered — centered recommended for symmetry with the heptagram.

---

## QA before upload

- [ ] View at phone-banner crop simulation — all four lines legible
- [ ] Nothing meaningful outside center 1235 × 338
- [ ] No compression banding in the black field (export PNG, not JPG)
- [ ] Gold matches graphics gold `#C9A227` used in episode OST cards
