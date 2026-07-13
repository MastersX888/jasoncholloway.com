# Omnibus Audiobook — Known Issues & Fixes

**For:** Fable ElevenLabs script pass  
**Updated:** July 11, 2026

---

## P0 — Blocks usable scripts

| # | Issue | Fix |
|---|-------|-----|
| P0-1 | **PDF page markers** in `omnibus_v8_fulltext.txt` | Strip all `===== PAGE n =====` |
| P0-2 | **Running headers** mid-chapter (`MASTERS X`, folio alone on line) | Remove; merge paragraphs |
| P0-3 | **Hard line wraps** from PDF extraction | Reflow to prose paragraphs |
| P0-4 | **Raw `111.2 Hz` in TTS** | Expand per pronunciation guide — grep audit |
| P0-5 | **Chapter boundaries wrong** | 77 units per `OMNIBUS_NARRATION_STRUCTURE.md` |
| P0-6 | **Copyright block narrated** | Skip pages 3–4 legal text |

---

## P1 — TTS failure modes

| # | Issue | Fix |
|---|-------|-----|
| P1-1 | **Černá, Mýrdalsjökull, Chartres** mispronounced | pronunciation_dictionary.csv |
| P1-2 | **G4S, Hz, St.** read as gibberish | Expand / dictionary |
| P1-3 | **Dates** (`June 1924`) read wrong | Normalize to spoken |
| P1-4 | **Chapter keys** (`109 Hz · Kansas City`) | Speak key + place; pause after |
| P1-5 | **Vol. II frequency keys change per chapter** | Do not batch-assume Iceland |
| P1-6 | **Long chapters >10k words** | Split at scene break with `_PART_B` suffix |

---

## P2 — Polish

| # | Issue | Fix |
|---|-------|-----|
| P2-1 | Epigraph page (p. 5) — six quotes | Pause between; attribute names |
| P2-2 | Blake Iceland sign-off lines | Keep "Mýrdalsjökull" consistent |
| P2-3 | Moleskine Roman numerals | `IX` → `Nine` |
| P2-4 | Temperature / depth figures in dive scenes | Expand numbers for clarity |
| P2-5 | Latin phrases in Grimoire sections | Dictionary entries |

---

## Pre-extracted text stats

| Metric | Value |
|--------|-------|
| Source PDF | `INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf` |
| Extracted pages | 684 |
| Characters | ~846k |
| Words | ~139,261 |
| Extraction script | `scratch/extract_omnibus_text.py` |

---

## Out of scope

- Voice clone training
- Audio export / mastering
- ACX metadata
