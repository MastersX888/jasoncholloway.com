# E: Drive Asset Search — 13-JUL-2026

Search performed with E: mounted. Repo `public/` currently has ~20 non-image files; most site binaries live on E:.

---

## Homepage artifact strip (Task A)

### Voynich → `public/field-notes/voynich-folio-thumb.jpg`

| Priority | Source path | Size | Dimensions | Notes |
|----------|-------------|------|------------|-------|
| **VERIFIED (f68r3)** | `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\next_export_folios\voynich\Vol 3\vol3-052.jpg` | 665 KB | foldout | Pleiades rosette foldout — **Beinecke f68r3**. Copied to `public/field-notes/voynich-folio-thumb.jpg` |
| **WRONG for f68r3** | `...\Vol 1\voynich-009.jpg` | 524 KB | 1455×2000 | Actually **folio 2v** (herbal) — do NOT use for f68r3 caption |
| Alt | `E:\Archive\Masters_Trilogy_2026\Photo_Assets\real_photos\voynich_folio_1.jpg` | 260 KB | 1108×1536 | Curated photo asset |
| Alt | `E:\Archive\Masters_Trilogy_2026\Photo_Assets\real_photos\voynich_biological_1.jpg` | 484 KB | — | Biological section folio |

**Not found on E:** `f68r3` as a filename — but **vol3-052.jpg** is the correct image (visual-verified 13-JUL-2026). Yale IIIF download timed out; local E: export is authoritative.

**Folio vault (full set):**
- `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\next_export_folios\voynich\` (Vol 1–3)
- Mirror: `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\website_unzipped\site\out\folios\voynich\`

---

### SubTropolis → `public/field-notes/subtropolis-entrance.jpg`

| Priority | Source path | Size | Dimensions | Notes |
|----------|-------------|------|------------|-------|
| **RECOMMENDED** | `E:\Archives\workspace\Mastersx_Trilogy\Masters-Chamber\chamber_images\KC_Churches\SubTropolis\1207_subtropolis01.jpg` | 152 KB | 1700×1133 | Exterior/entrance photo |
| Alt | `...\SubTropolis\entrance-to-SubTropolis-Storage-in-Kansas-City-MO-e1724185584420.webp` | 751 KB | — | WebP; convert to JPG for thumb |
| Alt | `...\SubTropolis\SubTropolis-Building-Hero.jpg` | 852 KB | 2250×1500 | Hero-scale exterior |
| Tunnel (not entrance) | `E:\Archive\Masters_Trilogy_2026\Photo_Assets\unique_photos\subtropolis_tunnel.jpg` | 57 KB | 500×806 | Interior tunnel — wrong motif for “entrance” caption |

**SubTropolis folder:** 170+ reference images at  
`E:\Archives\workspace\Mastersx_Trilogy\Masters-Chamber\chamber_images\KC_Churches\SubTropolis\`

**Not found on E:** `subtropolis-entrance.jpg`, `kansas-city-locations.png` (current homepage fallback path — may only exist in live deploy / C: `out/` merge)

---

## Broader asset vaults (Elevation III-1)

| Vault | Path | Contents |
|-------|------|----------|
| Photo library | `E:\Archive\Masters_Trilogy_2026\Photo_Assets\` | 150+ curated photos (real_photos, unique_photos, wave2–4) |
| Site export | `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\website_unzipped\site\out\` | 19 top-level dirs: covers, folios, books, chamber, etc. |
| Covers (archive) | `...\site\out\covers\` | 14 files (book1–3, hawkes, omnibus — v2 webp names, not current v3 PNGs) |
| Folio export | `...\next_export_folios\` | Full Voynich folio JPEG set |
| Production | `E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\Production_Assets\` | Location photos, B1 extracts |
| Build stub | `E:\Masters_X_Trilogy_Archive\disk_cleanup_2026-07-10\scratch\jasoncholloway-build\public\covers\` | **Empty** (0 files) |

---

## Recommended copy actions (Task A)

```powershell
# From repo root — create target dir
New-Item -ItemType Directory -Force -Path public\field-notes

# Voynich thumb — MUST be f68r3 (vol3-052), NOT voynich-009 (folio 2v)
Copy-Item "E:\Masters_X_Trilogy_Archive\antigravity_workspace_2026-07-07\next_export_folios\voynich\Vol 3\vol3-052.jpg" `
  public\field-notes\voynich-folio-thumb.jpg

# SubTropolis entrance
Copy-Item "E:\Archives\workspace\Mastersx_Trilogy\Masters-Chamber\chamber_images\KC_Churches\SubTropolis\1207_subtropolis01.jpg" `
  public\field-notes\subtropolis-entrance.jpg
```

Then update `app/page.tsx` to use `/field-notes/voynich-folio-thumb.jpg` and `/field-notes/subtropolis-entrance.jpg`; remove fallback comments.

**Also consider restoring to repo `public/`:**
- `out/covers/` from live deploy or E: archive (site references `/covers/book*-hardcover-v3.png` etc.)
- `out/folios/` tree for chamber visualizer
- `out/og/field-notes/` if found on C: `out/` after build_export merge

---

## Caption decision (LOCKED 13-JUL-2026)

**Author:** Exact folio ↔ image ↔ caption matching site-wide (SEO + E-E-A-T).

Megaprompt caption: **"Voynich MS · Folio f68r3 · Beinecke MS 408"**  
Correct asset: **`vol3-052.jpg`** → copied to `public/field-notes/voynich-folio-thumb.jpg`.

Site-wide folio audit remains open — see `ELEVATION_III_PROMPT.md` Task A + `lib/folio-display.ts`.
