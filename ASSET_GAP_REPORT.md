# Asset Gap Report — 14-JUL-2026

Audit scope: `scratch/asset_scan.mjs` (TSX/CSS/JSON media refs) + `lib/folios.json` path check.

## Summary

| Category | Referenced | Present in `public/` | Missing |
|----------|------------|----------------------|---------|
| Site media (img/href/CSS) | 20 | 20 | 0 |
| Chamber folio images (`lib/folios.json`) | 181 | 181 | 0 |
| Cover art (`public/covers/`) | 12 titles | 12 | 0 |

**Blocking gaps:** none for build/deploy.

## Present — verified

- `/bg-cathedral-rose-window.png`
- `/covers/*` (trilogy PB/HC v3, omnibus HC v3, Hawkes PB/HC)
- `/field-notes/subtropolis-entrance.jpg`, `/field-notes/voynich-folio-thumb.jpg`
- `/media/JasonCHolloway-v2.png`, `/media/qr1–3.png`
- `/og/field-notes/*.png` (12 hub + note OG images)
- `/press-kit/Masters_X_Press_Kit.pdf`
- `/downloads/The_Distribution_File.pdf`
- `/folios/**` — 181 files matching `lib/folios.json` paths (Voynich + Ars Notoria)

## [NEEDS AUTHOR] — not blocking site deploy

| Item | Status | Action |
|------|--------|--------|
| Press kit PDF currency | May predate omnibus/pricing | Regenerate off-repo; verify `/press` + `/contact` links |
| IngramSpark v3 HC cover propagation | Site has v3 art; Bookshop pulls Ingram catalog | Re-upload per ISBN in IngramSpark dashboard |
| Omnibus dedicated PB cover | HC art reused on hub/homepage PB slots | Commission or label honestly when art exists |
| `ASSET_MANIFEST.md` (handoff package) | Reference manifest in `website_elevation_handoff/package/` | Optional sync; Yale folio license note |

## Yale / folio authority

- `lib/folios.json`: 166/166 Voynich rows carry verified `beineckeRef` (commit `e4f9cc9`)
- Chamber visualizer JS unchanged per elevation constraints
- Folio binaries live under `public/folios/` — not tracked in git (large binary tree); present on build machine

## Bookshop.org assets (scratch only — not deployed)

- `scratch/bookshop_masters_x_list.csv` — affiliate list upload (ID `126177`)
- `scratch/bookshop_list_banner.png` — list banner (1024×800, top-band safe crop)
