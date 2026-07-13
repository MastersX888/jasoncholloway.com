# Image Design Brief — YouTube Channel Assets

**Brand authority:** `design_memory/BRAND_SOURCE.md`  
**Anti-slop:** No AI cathedral B-roll art · No synthetic author face · No neon YouTube gradient aesthetic

---

## Color & type (lock)

| Token | Value |
|-------|-------|
| Ground | `#0a0a0a` K-black |
| Gold | `#C9A227` (accent, foil-sim) |
| Cream | `#E8E0D0` body subcopy |
| White | `#F5F5F0` display caps |
| Display | **Cinzel** — tracked caps |
| Sub / quote | **EB Garamond Italic** |
| Motif | Heptagram `{7/3}` at ≤15% opacity watermark only |
| Footer | `f = 111.2 Hz` — small, every graphic |

---

## Asset 1 — Channel banner

| Spec | Value |
|------|-------|
| Size | **2560 × 1440 px** PNG |
| Safe (TV) | Center 1546 × 423 px — all text inside |
| Safe (mobile) | Center 1235 × 338 px — critical text inside |

**Layout:**

```
[JASON CARROLL HOLLOWAY]     [THE FACTS BEHIND THE FICTION]     [jasoncholloway.com]
        white Cinzel                    gold Cinzel                    small cream
              Research behind the Masters X Trilogy — EB Garamond Italic
              ─────────── gold hairline ───────────
              heptagram watermark 15% center
```

**Generation approach:** Vector/typography composite in Figma or high-res canvas — **not** Midjourney scene.

**Prompt template (if using image tool for texture only):**

```
Abstract black paper texture, subtle grain, no objects, no people, 
16:9, seamless, matte, #0a0a0a, minimal, for typography overlay
```

---

## Asset 2 — Thumbnails (5)

| Spec | Value |
|------|-------|
| Size | **1280 × 720 px** PNG each |
| Rule | One hero object + ≤3 words headline + optional series microline |
| Readable | Legible at 120px width (phone sidebar) |

### Per-episode direction

| Ep | Headline | Hero object | Notes |
|----|----------|-------------|-------|
| EP04 | `SOUND HAS SHAPES` or `1787` | Chladni nodal diagram (vector) | **No fake sand photo**; abstract geometry OK |
| EP01 | `111.2 Hz` | DF footer typographic crop | Sub: `measured · invented` |
| EP05 | `5 TRADITIONS` | Map silhouette + 5 gold dots | Sub: `one riverbank` |
| EP03 | `DECLASSIFIED` | Redacted document texture + ID string | `CIA-RDP96-00792R` partial |
| EP02 | `UNDERGROUND` | Limestone texture or cross-section diagram | Sub: `180 acres` |

**Thumbnail prompt template (typography-led):**

```
YouTube thumbnail, 1280x720, black background #0a0a0a, gold Cinzel serif 
headline "[HEADLINE]", small subtitle "[SUB]", minimal, literary, no faces, 
no neon, no arrows, no shocked expression, museum catalog aesthetic, 
single centered object: [OBJECT DESCRIPTION], high contrast, clean margins
```

**Reject prompts containing:** "hyperrealistic person," "cathedral interior AI," "conspiracy board red string," "bright yellow text."

---

## Asset 3 — OST cards (on-screen text)

| Spec | Value |
|------|-------|
| Size | **1920 × 1080 px** PNG, transparent or black full frame |
| Safe zone | Title safe: 10% margin all sides |
| Style | Gold Cinzel centered or lower-third; footer `f = 111.2 Hz` 48px from bottom |

**Export one PNG per unique OST string** across all proofed scripts. Examples:

- `f = 111.2 Hz`
- `110 Hz — measured` / `111.2 Hz — invented`
- `Chladni, 1787 — reproducible on your kitchen table`
- `frequency → figure`
- `measured / scholarly / invented`
- `CIA-RDP96-00792R · 1984`
- `5 traditions · 30 miles · 2,000 years`
- (full list from proofed scripts)

**Prompt template:**

```
Broadcast lower-third card, black background, gold serif text "[OST TEXT]", 
Cinzel font, tracked letterspacing, thin gold rule above footer text 
"f = 111.2 Hz", 1920x1080, minimal, documentary, no decoration
```

---

## Asset 4 — Lower third template

| Spec | Value |
|------|-------|
| Size | 1920 × 1080 transparent PNG |
| Content | Series title small + episode subject line + `f = 111.2 Hz` footer |
| Usage | Editor overlay lower-left, last 80% of runtime only |

Deliver `lower_third_safe_spec.md` with pixel margins.

---

## Asset 5 — Profile photo

**Do not generate.** Author asset: `public/media/JasonCHolloway-v2.png`  
If delivering crop spec only: 800×800, face centered, warm grade +10% warmth max.

---

## Deliverable — `IMAGE_GENERATION_PROMPTS.md`

Must include:

1. Every prompt used (copy-paste)
2. Model/tool note (Figma, DALL·E, etc.)
3. **Reject list** — prompts you refused and why
4. Swap notes — which thumbnails author may replace with on-set photos (EP04, EP05 map)

---

## Quality gate

Would this sit on a shelf with **Eco / Kostova** readers, not **crypto conspiracy** YouTube? If no → redo.
