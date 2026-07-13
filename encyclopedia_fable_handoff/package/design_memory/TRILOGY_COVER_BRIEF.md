# TRILOGY COVER BRIEF — Individual Hardcover Dual-Cover Redesign

**Date:** 2026-07-07  
**Scope:** Books 1–3, each as **Jacketed Case Laminate** (two designed surfaces per book)  
**Reference jackets (current lineage):** `design_memory/trilogy_reference/book{1,2,3}_jacket_ref.jpg`  
**Source PDFs:** `E:\Masters_X_Trilogy_Archive\Old_Drafts_and_Backups\IngramSpark_Upload\DustJacket_Edition\`

---

## 1. The dual-cover system (same as omnibus)

| Layer | Role | Reader experience |
|-------|------|-----------------|
| **Dust jacket** | Retail face — thumbnail, bookstore shelf, flap copy | What the world sees |
| **Printed case** | Hidden board under the jacket | Reward for the reader who removes the jacket |

Proven on the omnibus: Concept A (Master Figura) on jacket, Concept D (Cathedral Within) on case.

Each trilogy volume gets its **own** A-layer (jacket front) and **own** D-layer (case front), unified by black ground + gold Cinzel + EB Garamond + Seventh City Press heptagram.

---

## 2. Existing jacket dimensions (measured from archive PDFs)

| Book | Doc size (in) | Spine (derived) | Front art (current) |
|------|---------------|-----------------|---------------------|
| B1 — *The Inheritance of Frequency* | 21.28 × 9.71 | ~0.87" | Gold cymatics mandala on black |
| B2 — *The Grimoire* | 21.66 × 9.71 | ~1.26" | Gold labyrinth (Chartres-style) |
| B3 — *The Kingdom* | 21.36 × 9.71 | ~0.95" | Silver-grey astrolabe |

Layout (all three): `back flap | back cover | spine | front cover | front flap`  
Typography stack on front: MASTERS X eyebrow → title → VOLUME N → hero art → author.

**Note:** Spine widths must be re-derived from current interior page counts + Ingram template generator per ISBN before final PDF export. Do not reuse archive spine values blindly.

---

## 3. Per-book design directions (from manuscript analysis)

### Book 1 — *The Inheritance of Frequency*
**Story core:** Safe-deposit box, seven notebooks, Prague/Strahov, the gift awakens, "The higher I flew, the more I could see."

| Layer | Proposed concept | Manuscript anchor |
|-------|------------------|-------------------|
| **Jacket (A)** | **The Seven-Fold Nota** — compass-drawn rosette that reads as cymatics hexagons (Strahov chamber geometry). Evolves the existing mandala but sharper, more manuscript-authentic. | Aldric's First Figura; hexagons in Prague |
| **Case (D)** | **Candlelight Through Vellum** — translucent page with geometric figures glowing through, edges to black. | "Restless candlelight guttered"; 1267 scriptorium |

### Book 2 — *The Grimoire*
**Story core:** Scholar's odyssey, cathedrals as instruments, Ars Notoria as wavefront diagrams, Iceland writing, 52-week preparation.

| Layer | Proposed concept | Manuscript anchor |
|-------|------------------|-------------------|
| **Jacket (A)** | **The Wavefront Nota** — Ars Notoria figure re-read as acoustic schematic: outer circle = standing-wave boundary, inner node, perpendicular reflection paths. Gold on black. | "Michael was not an angel. Michael was a frequency designation." |
| **Case (D)** | **The Trembling Line** — single gold ruled line breaking into 111.2 Hz sine wobble across the board. Blake's tremor-script. | Ten Moleskines; permanent bilateral tremor |

### Book 3 — *The Kingdom*
**Story core:** Teaching, distribution, marriage crisis, renunciation, two notebooks on the kitchen table, "Teach me."

| Layer | Proposed concept | Manuscript anchor |
|-------|------------------|-------------------|
| **Jacket (A)** | **The Cathedral Within** — Gothic nave cross-section ghosted into human torso (engraved gold line art). Evolves the astrolabe toward the book's whiteboard image. | "Your chest is the nave. Your skull is the dome." |
| **Case (D)** | **Two Frequencies** — two overlapping waveforms producing an interference pattern (Blake + Nadia as composite wave). Minimal, literary. | "The place where two frequencies meet…" |

---

## 4. Shared production rules

- Black ground (K-100 print), gold/warm-amber accent, Cinzel display + EB Garamond body
- Body copy: **10.5 pt** minimum (learned from omnibus v2 — 9 pt was too small on flaps)
- Author bio: EB Garamond **Regular** at 10 pt (not italic — readability)
- Front art: fit into middle band; never overlap title stack (omnibus v2 fix)
- Ingram template marks preserved on all upload PDFs
- FOGRA39 ICC CMYK, 240% ink cap
- Heptagram imprint on spine foot + back cover
- Per-book ISBNs from `public/llms.txt` / Ingram portal

---

## 5. Workflow per book

1. Generate text-free hero art for jacket concept (A) and case concept (D)
2. Upscale to ≥ 2913 px tall
3. Compose jacket PDF to Ingram dust-jacket template (download per ISBN)
4. Compose case PDF to Ingram case-laminate template (download per ISBN)
5. Preview → Jason approves → upload

**Compositor base:** extend `scratch/compose_omnibus_covers_FINAL.py` into a parameterized `compose_trilogy_covers.py` that accepts per-book copy, spine width, hero paths, and template paths.

---

## 6. Next action

Begin with **Book 1** concept generation (Seven-Fold Nota jacket + Vellum case), present comps for approval, then Books 2 and 3 in sequence. Cymatic ring system across all three spines on shelf should still complete when placed together (existing trilogy spine motif from `compose_dustjackets.py`).
