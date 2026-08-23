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
| Trilogy shelf photograph (three hardcovers, spines out) | No photo of the three physical books together exists. The homepage shelf is rendered from the HC cover art in `components/store/TrilogyShelf.tsx` | Photograph the three hardcovers on a shelf, save as `public/media/trilogy-shelf.jpg`, then pass `photo={{ src, alt }}` to `TrilogyShelf` in `components/store/BuyTheBooksSection.tsx` — no other code changes needed |
| ~~Omnibus + volume case cover photos (the design under the dust jacket)~~ RESOLVED | The site only ever showed the dust jacket for every hardcover — the case art stamped on the boards was never on the site at all. Pulled the four case-laminate panel pins (omnibus + Books I–III) from the `seventhcitypress` Pinterest board (`https://www.pinterest.com/seventhcitypress/masters-x-trilogy-books-editions/`, `originals/` resolution, 2000×3000) and saved them to `public/covers/{omnibus,book1,book2,book3}-case-cover.jpg`. `components/store/CaseCoverReveal.tsx` now renders a jacket ⇄ case toggle on the homepage buy section, the omnibus product page, and each volume's product page. | None — done. If higher-resolution source files turn up locally, they can simply overwrite the same four `public/covers/*-case-cover.jpg` paths; no code changes needed. |
| `ASSET_MANIFEST.md` (handoff package) | Reference manifest in `website_elevation_handoff/package/` | Optional sync; Yale folio license note |

## Yale / folio authority

- `lib/folios.json`: 166/166 Voynich rows carry verified `beineckeRef` (commit `e4f9cc9`)
- Chamber visualizer JS unchanged per elevation constraints
- Folio binaries live under `public/folios/` — not tracked in git (large binary tree); present on build machine

## Bookshop.org assets (scratch only — not deployed)

- `scratch/bookshop_masters_x_list.csv` — affiliate list upload (ID `126177`)
- `scratch/bookshop_list_banner.png` — list banner (1024×800, top-band safe crop)
