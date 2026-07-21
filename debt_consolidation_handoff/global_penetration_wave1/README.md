# Wave 1 Global Penetration Batch — Paste Checklist

**Prepared:** July 17, 2026 · **Owner:** Jason Carroll Holloway  
**Source of truth:** `lib/data/books.ts`, `lib/data/ingram-catalog.json`, `CANON.md`

## Files in this folder

| File | Paste into | Est. time |
|------|------------|-----------|
| `ingram-metadata-wave1.csv` | IngramSpark → each title → Keywords / Series (or bulk if you export/import) | 45 min |
| `open-library-records.json` | openlibrary.org → Add book / author (manual) | 30 min |
| `wikidata-quickstatements.txt` | quickstatements.toolforge.org → V1 tab → Run | 10 min |
| `amazon-intl-keywords.md` | KDP → each Kindle title → marketplace keywords + description tail | 30 min |
| `youtube-video-01-voynich-prague.md` | YouTube Studio → upload | 20 min (+ filming) |
| `youtube-video-02-strahov-crypt.md` | YouTube Studio → upload | 20 min (+ filming) |
| `subtitle-stubs/` | YouTube → Subtitles → Upload (after auto-translate or human review) | optional |
| `apple-kobo-claim-checklist.md` | Apple Books for Authors + Kobo Writing Life | 45–60 min |
| `google-books-partner-wave1_utf16.csv` | Google Books Partner → Upload book list | 15 min |
| `goodreads-comp-shelves.md` | Goodreads + StoryGraph profiles | 30 min |
| `prague-axis-press-kit.md` | Export PDF → UK/CZ/DE bloggers, newsletters | 10 min |
| `pinterest-pin-batch.md` | Pinterest → 3 boards, 15 pins | 45 min |
| `wave1-completion-tracker.md` | Master checkbox list | — |

## Recommended order (one evening)

1. **Wikidata** (10 min) — highest global leverage, free
2. **Google Play** — check review status (not in this batch; already uploaded)
3. **Amazon UK Author Central** — use bio block from `amazon-intl-keywords.md`
4. **Ingram keywords** — paste from CSV per ISBN
5. **Open Library** — one author, 4 works (trilogy vols + omnibus; Hawkes separate)
6. **YouTube** — when video assets are ready

## Wave 1 remainder (this batch)

7. **Google Books Partner** — upload `google-books-partner-wave1_utf16.csv` (4 EPUBs, WORLD pricing)
8. **Apple + Kobo** — follow `apple-kobo-claim-checklist.md`
9. **Goodreads + StoryGraph** — `goodreads-comp-shelves.md`
10. **Prague Axis PDF** — copy `prague-axis-press-kit.md` → Docs → PDF
11. **Pinterest** — minimum 5 pins from `pinterest-pin-batch.md`

## Pinterest Wave 2 (Jul 18, 2026)

| File | Purpose |
|------|---------|
| `pinterest-wave2-batch.md` | +10 pins, new board, Rich Pins, board SEO |
| `pinterest-wave2-pin-map.json` | Machine-readable pin list |
| `scripts/generate_pinterest_pin_images.ps1` | OG → 1000×1500 JPG crop |

## Pinterest audit + Wave 3 (Jul 19, 2026)

| File | Purpose |
|------|---------|
| `pinterest-audit-strategy-handoff.md` | Claude Phase 1 audit (fix list, roadmap, design brief) |
| `pinterest-phase2-execution-qa.md` | Claude Phase 2 QA + D-06..D-15 specs |
| `pinterest-p1-admin-checklist.md` | Board SEO, Rich Pins, display name — your 15 min list |
| `pinterest-metadata-edit-batch.md` | Paste-ready copy for 12 existing pin edits |
| `pinterest-media-manifest.json` | All pin image sources for crop script |
| `pinterest-wave3-design-batch.md` | D-01..D-05 upload copy |
| `pinterest-wave3-design-batch-d06-d15.md` | D-06..D-15 upload copy |
| `pinterest-assets/crops/` | 1000×1500 stopgap crops (18 JPGs) |
| `pinterest-assets/designed/` | Template pins D-01..D-15 |
| `scripts/generate_pinterest_designed_pins.ps1` | Branded overlay templates (A/B/C/D) |

## Bing Webmaster (Jul 20, 2026)

| File | Purpose |
|------|---------|
| `bing-webmaster-max-setup.md` | Full BWT checklist + Copilot prompt |
| `search-indexing-wave4.md` | Multi-engine indexing (Yandex, Seznam, Brave, IA, IndexNow) |
| `scripts/indexnow.ps1` | IndexNow key install + bulk/partner sitemap submit |

**Post-deploy:** `.\scripts\indexnow.ps1 -Action submit-all -Key ... -Domain ...`

**Regenerate assets:** `.\scripts\generate_pinterest_pin_images.ps1` then `.\scripts\generate_pinterest_designed_pins.ps1`

## Wave 2 batch (Jul 18, 2026)

Folder: `../global_penetration_wave2/`

| File | Purpose |
|------|---------|
| `viaf-submission-email.txt` | Email → oclcviaf@oclc.org |
| `youtube-video-03-codex-gigas.md` | YouTube upload package |
| `youtube-video-04-foucault-comp.md` | YouTube upload package |
| `youtube-video-05-111-hz.md` | YouTube upload package |
| `press-summary-cz.md` | CZ 1-page press PDF source |
| `press-summary-de.md` | DE 1-page press PDF source |
| `storefront-verification-wave2.md` | Apple UK / Kobo CA / amazon.com.au spot-check |
| `wave2-completion-tracker.md` | Master checkbox list |
