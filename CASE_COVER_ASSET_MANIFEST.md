# Case Cover Asset Manifest

**Recovered:** July 21, 2026  
**Source:** Git commit `876d358` (removed from repo in `3795ac2` Jul 20 consolidation)

## Original folder (all in same tree)

```
design_memory/press_art/trilogy/
├── trilogy_B1_case_candlelight_vellum_3456.png   → Vol I case cover
├── trilogy_B2_case_midnight_sealed_3456.png      → Vol II case cover
└── trilogy_B3_case_two_gospels_3456.png          → Vol III case cover

design_memory/press_art/
└── CASE_D_cathedral_within_3400.png              → Omnibus case cover (front)

redesign_A_package/
└── CASE_OMNIBUS_HC_9798295884412_CONCEPT_D_v2_preview.jpg  → Full wrap template (not used on site)
```

## Site paths (installed)

| Book | Site path | Source file |
|------|-----------|-------------|
| Vol I | `public/covers/book1-case.png` | `trilogy_B1_case_candlelight_vellum_3456.png` |
| Vol II | `public/covers/book2-case.png` | `trilogy_B2_case_midnight_sealed_3456.png` |
| Vol III | `public/covers/book3-case.png` | `trilogy_B3_case_two_gospels_3456.png` |
| Omnibus | `public/covers/omnibus-case.png` | `CASE_D_cathedral_within_3400.png` |

## Notes

- Vol I–III case art: vellum/parchment aesthetic with geometric notae (2304×3456 source).
- Omnibus case art: gold cathedral-within-figure on black (Concept D, 2266×3400 source).
- The full omnibus **wrap template** (front+spine+back) lives in `redesign_A_package/CASE_OMNIBUS_HC_*` — useful for print/Pinterest carousel, not the website hero.
- Jacket counterparts in the same folder use `*_jacket_*` in the filename.

## If you need the originals on E: drive

These were in the repo under `design_memory/` — not found referenced on E: in existing asset docs. If you have a local copy outside git, search for:

```
*case*
```

Likely same folder as jacket files (`trilogy_B*_jacket_*`).
