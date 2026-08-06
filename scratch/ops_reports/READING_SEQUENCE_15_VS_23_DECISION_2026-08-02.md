# Reading Sequence — 15 vs 23 Decision Packet

**Date:** 2026-08-02 · **Desk:** Morgan · **Blocker for:** Vivian Q-30 / Q-31  
**Status:** **JASON CHOSE C** · implemented in repo · **no publish** · **no Vivian PASS invented**

---

## Decision (Jason)

| Field | Value |
|-------|--------|
| **Choice** | **C** — Split: chamber = annotated **core 15**; novels / research-archive / Strahov / marketing keep full **23** |
| **Timestamp** | **2026-08-02 ~23:12 CT** (parent confirmed) |
| **Implemented** | 2026-08-02 ~23:12–23:15 CT |

### What changed

| File | Change |
|------|--------|
| `app/chamber/reading-sequence/page.tsx` | Kept **15** items; intro + footer + meta/JSON-LD state core **15** vs full corpus **23**; divider “Core Sequence · 15”; links to research-archive + Strahov FN |
| `app/chamber/research-archive/page.tsx` | Kept **23** in Part I summary; keyContent notes chamber annotates core 15; link label “Core Reading Sequence (15)” |
| `app/field-notes/strahov-monastery/page.tsx` | Kept **twenty-three** curriculum/desks; one clarifying parenthetical on chamber core 15 |
| `CANON.md` + `production_staging/_docs/CANON.md` | Locked core 15 / full corpus 23 |
| `lib/data/books.ts` Kingdom blurbs / Ingram catalog | **Unchanged** — still **twenty-three** (correct under C) |

### Still for Vivian (not PASS)

- §1 framing pass on new chamber intro/footer copy (Q-30)
- Spot-check archive + Strahov clarifiers (Q-31 / Q-17 strahov)
- Deploy remains Phase 4 after Vivian + Jason

---

## 1. What the chamber page shows now (post-C)

**Route:** `/chamber/reading-sequence/`  
**Source:** `app/chamber/reading-sequence/page.tsx`

| Signal | Value |
|--------|--------|
| Visible list | **15** annotated items (01–15) |
| Framing | Explicit **core 15** vs full corpus **23** |
| Metadata title | “The Reading Sequence — **15 Texts** Behind Masters X” |
| JSON-LD `ItemList.numberOfItems` | **15** |

**Listed 15 (unchanged):** Sirach · 2 Esdras · Gospel of Mary · Ars Notoria · Sefer Yetzirah · Cloud of Unknowing · De Harmonia Mundi · Zohar (Sifra di-Tzeniuta) · Harmonices Mundi III–IV · Chymical Wedding · Theologia Germanica · Emerald Tablet · Moreau’s Chamber Journals · Specchi Production Records · Andrew Chen — Reconstruction Notes.

---

## 2. Full-corpus **23** surfaces (kept)

| Surface | Claim |
|---------|--------|
| `lib/data/books.ts` — Kingdom / related blurbs | **twenty-three texts** |
| `app/chamber/research-archive/page.tsx` | Part I: reading list of **23 texts** |
| `app/field-notes/strahov-monastery/page.tsx` | Curriculum of **twenty-three texts** / desks |
| Marketing / KDP / StoryGraph packets | **twenty-three** where meaning full corpus |
| `lib/data/notae.ts` | “Twenty-three candidates…” (threshold motif — separate from chamber list) |

---

## 3. Recommended fix (historical)

**C chosen and implemented.** Options A/B retired unless Jason reopens.

---

## 4. Exact Jason one-line choice options (resolved)

- ~~**A)** Restore full **23** on chamber~~  
- ~~**B)** Keep **15** everywhere~~  
- **C) Split — CHOSEN** — chamber core **15**; novels/archive/Strahov full **23**

---

## 5. Vivian status

- **Q-30 / Q-31:** agent implemented Jason C framing · **`vivian_needed`** §1/§5 spot on new copy · **no PASS**

---

## Pointers

- Page: `app/chamber/reading-sequence/page.tsx`  
- Queue: `scratch/ops_reports/VIVIAN_QA_QUEUE_2026-08-02.md` (Q-30, Q-31)  
- Canon lock: `CANON.md` §3 Reading sequence counts  
- Strahov FN: `app/field-notes/strahov-monastery/page.tsx`  
- Archive: `app/chamber/research-archive/page.tsx`
