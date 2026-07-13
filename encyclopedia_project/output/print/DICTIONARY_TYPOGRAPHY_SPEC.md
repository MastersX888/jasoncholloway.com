# DICTIONARY TYPOGRAPHY SPECIFICATION
## The Resonant Frequency Dictionary · 8.5 × 11 two-column · Pass 2

## 1. Entry anatomy (as built)

```
headword  (N)  123.45 Hz  PH·ON·EM·ES
    Gamma · MF·Schumann Fundamental · Sol·MI
```

| Element | Face | Size/leading | Notes |
|---|---|---|---|
| Headword + (syllables) | EB Garamond SemiBold | 9 / 10.6 | lowercase per source |
| Hz value | EB Garamond Regular | 9 | same baseline, 6 pt after headword |
| Phoneme string | Courier Prime | 7.2 | same line where it fits; drops to its own indented line otherwise |
| Band tags | EB Garamond Regular | 7.6 / 9.2 | indented 10 pt; compact key (below); wraps to 2 lines max in practice |
| Inter-entry space | — | 2.6 pt | |

**Compact tag key** (printed in every volume): brainwave band unprefixed (Gamma/Beta/Alpha/
Theta/Delta) · `Sol·` Solfeggio tone · `MF·` Masters Frequency band · `QHC·` quantum healing
code with sequence in brackets · `Lloyd·` healing-code center · `Chakra·` correspondence.
Compression is lossless relabeling only; no data altered.

## 2. Density (measured)

**56.8 entries/page** on pure entry pages (Letter A: 6,132 entries → 108 pages including the
opener). Set average incl. openers and front/back matter: 56.0. Exceeds the Rev. 3 gate
(≥35/page at readable size) by 62%; verified readable in 85-dpi proof renders.

## 3. Page furniture

- **Columns:** two, 3.225 in each, 0.3 in gutter; column-fill top-to-bottom then across.
- **Running head:** 0.5 pt rule; verso `RESONANT FREQUENCY DICTIONARY` (Cinzel 7.0,
  letterspaced) with folio outer-left and **guide words** (`first — last` headword, EB Garamond
  SB 8.6) outer-right; recto mirrors with `VOL. n · RANGE`.
- **Letter openers:** in-flow divider — Cinzel Bold 64 pt initial, centered rule, italic
  `n,nnn entries` line; entries resume in column immediately (dictionary convention; no page
  waste × 26 letters × 3 volumes).
- **Folios:** arabic per volume, running-head corners; front matter blind.

## 4. Front/back matter typography

Title pages in the tracked-Cinzel house stack with heptagram; preface EB Garamond 10.2/14.2 on
an inset measure; the seam note set as an italic inset closing the preface; How to Read an
Entry uses a live specimen line plus a two-column key table. Vol. 3 back matter runs
two-column with Cinzel SB section heads; prayers set with SemiBold titles, tradition/citation
line, text, and their composite-CRF lines in the compact tag style.

## 5. Faces and licensing

EB Garamond, Cinzel, Courier Prime — SIL OFL, subset-embedded, commercial use cleared. Cinzel
and Courier Prime carry no typographic-space glyphs (U+2002/2004/2009): all tracking is
plain-space; do not introduce those characters in display lines.

## 6. Rebuild

`pipeline/dict_engine.py` + `pipeline/dict_main.py`. Deterministic; full 3-volume set builds
in ~16 s from the extracted print master. Volume breakpoints are a single list (`VOLS`) —
re-splitting is a one-line change plus rebuild.
