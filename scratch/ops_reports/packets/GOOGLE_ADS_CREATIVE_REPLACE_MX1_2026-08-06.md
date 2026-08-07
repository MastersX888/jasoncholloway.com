# Google Ads creative replacement — MX1 Play $25 test

**Date:** 2026-08-06  
**Reason:** Expedient OG + rose-window assets are below imprint standard; rose window used as “logo” is incorrect.  
**Campaign:** `#2` / `24114368389` — **PAUSED** for creative rebuild  
**Owners:** River (art) → Vivian (visual QC) → Jason enable

## Remove from Ads (do not keep)

| Current slot | File | Why remove |
|---|---|---|
| Landscape | `public/og-image.png` | Trilogy site OG, not Vol I product |
| Square | `public/bg-cathedral-rose-window.png` | Atmosphere only; not book creative |
| Logo | same rose window | **Not a logo** |

## Build / upload these three

**Status 2026-08-06 ~11:50 CT:** Vivian **PASS** + Jason **approved**. Upload into Ads **pending Jason file-picker** (Cursor browser cannot attach local files). Campaign remains **Paused** · `$0` cost. Edit panel open: Asset Group 1 (`6737647919`).

| Slot | File | Size |
|---|---|---|
| Landscape | `scratch/ops_assets/google_ads_mx1/mx1-landscape-1200x630.png` | 1200×630 · Vol I cover + SCP panel · $1.99 badge |
| Square | `scratch/ops_assets/google_ads_mx1/mx1-square-1200x1200.png` | 1200×1200 · full Vol I cover |
| Logo | `scratch/ops_assets/google_ads_mx1/scp-logo-1200x1200.png` | 1200×1200 · **official** heptagram lockup (from `seventhcitypress/google_business/assets/scp-logo-lockup-1200.png`) |

Rebuild script: `scratch/ops_assets/google_ads_mx1/build_creatives.py`  
Source cover: `public/covers/book1-ebook.jpg`  
**Note:** No dedicated brand-kit logo existed in repo; logo is interim typographic mark for Ads only.
## Upload path in Ads (Jason — ~2 min; Cursor cannot attach local files)

**Panel open:** Campaign `#2` → Asset Group 1 → **Edit assets**  
**Folder open:** `scratch/ops_assets/google_ads_mx1/`

1. Scroll to **Images (2)** → remove OG / rose-window / Generated junk you don’t want  
2. **Add** → upload `mx1-landscape-1200x630.png` (landscape) + `mx1-square-1200x1200.png` (square)  
3. Scroll to **Logos (1)** → remove rose-window / URL scrapes  
4. **Add** → upload `scp-logo-1200x1200.png`  
5. **Save** · leave campaign **Paused** (do not Enable yet)  
6. Reply **“uploaded”** — I’ll verify assets + `$0` / Paused, then you can say **Enable**

Hard cap still live: `$4/day` + rule `MX1-HardCap-25-Pause`.

## Vivian visual gate (must pass before re-enable)

- [ ] Cover is recognizable as Vol I product  
- [ ] No rose window / generic cathedral as logo  
- [ ] Landscape not a stretched portrait crop  
- [ ] Text on graphics (if any) fully legible at phone width  
- [ ] $1.99 claim only if still inside Aug 6–12 promo window  

## Better long-term note

Approved plan was **Search only** (RSA text; no logo requirement). Prefer Expert Mode Search when rebuilding beyond this PMax creative fix.
