# FABLE — Masters X Omnibus Audiobook · ElevenLabs Script Pass

**Date:** July 11, 2026  
**Publisher:** Seventh City Press LLC  
**Author / narrator voice:** Jason Carroll Holloway (ElevenLabs **Professional Voice Clone**)  
**Scope:** Convert the **omnibus edition PDF** into **ElevenLabs-ready narration scripts** — **not** print, **not** website, **not** encyclopedia.

---

## Your role

You are the **audiobook script producer** for *Masters X: The Complete Trilogy* (omnibus HC). The author will paste your scripts into **ElevenLabs** (Projects or API) using his cloned voice. **Your job is to deliver clean, correctly chunked, correctly pronounced plain text that reads aloud without PDF garbage.**

**You deliver:**

1. **77 chapter-level script files** (`.txt`, UTF-8) per `OMNIBUS_NARRATION_STRUCTURE.md`
2. **`chapter_manifest.csv`** — metadata for every file
3. **`pronunciation_dictionary.csv`** — ElevenLabs import sheet
4. **`ELEVENLABS_SCRIPT_SPEC.md`** — updated if you change conventions (otherwise confirm as-is)
5. **`AUDIOBOOK_STATUS.md`** — session log, word counts, open flags

**Cursor integrates** your return zip. **Do not** modify jasoncholloway.com or encyclopedia print files.

---

## Read first (in order)

1. `FABLE_AUDIOBOOK_PROMPT.md` — this file
2. `ELEVENLABS_SCRIPT_SPEC.md` — format law
3. `PRONUNCIATION_AND_NARRATION_GUIDE.md` — locked terms (especially **111.2 Hz**)
4. `OMNIBUS_NARRATION_STRUCTURE.md` — 77-unit map
5. `KNOWN_ISSUES_AUDIOBOOK.md` — PDF defect punch list
6. `CANON.md` — names, spelling, story locks
7. `sources/omnibus_v8_fulltext.txt` — pre-extracted text (**verify against PDF**)
8. `sources/INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf` — print authority

---

## Source text

| Asset | Role |
|-------|------|
| **`INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf`** | **Authority** — 686 pp HC omnibus interior |
| `omnibus_v8_fulltext.txt` | Pre-extracted (684 pages, `===== PAGE n =====` markers) — accelerates work; **reconcile to PDF** |
| `scratch/extract_omnibus_text.py` | Reference extractor (pypdf) if you need re-run |

**Use the HC PDF**, not paperback, not individual volumes.

---

## Mission — ordered phases

### Phase 1 — Extract & reconcile (Priority A)

1. Parse PDF to raw text per page (or clean from `omnibus_v8_fulltext.txt`)
2. **Strip all print artifacts:**
   - Page markers, running headers (`MASTERS X`), standalone folios
   - Copyright / ISBN block (skip — not narrated)
   - Blank pages
3. **Merge line wraps** into proper paragraphs
4. **Segment** into 77 units per structure doc (volume boundaries, prologues, epilogue)
5. Log per-unit **source PDF page range** in manifest

**Quality check:** No line should end mid-sentence because of PDF width unless intentional (poetry/epigraph).

---

### Phase 2 — Normalize for speech (Priority A)

Per `ELEVENLABS_SCRIPT_SPEC.md` §2–3:

- Expand numbers, dates, honorifics where TTS will stumble
- Standardize **frequency keys** to spoken form (`111.2 Hz` → `one eleven point two hertz`)
- Normalize quotes and em dashes
- Keep **epigraphs** (page 5 block) — attributed quotes with pauses
- Read **volume titles** and **chapter titles** aloud
- **Do not** read: copyright, ISBN, "First Omnibus Edition", reproduction notice

**Dialogue:** preserve attribution; paragraph break per speaker turn.

---

### Phase 3 — Chunk for ElevenLabs (Priority A)

Output one `.txt` per narration unit:

```
audiobook_project/output/elevenlabs_scripts/masters-x-omnibus/
  V01_00_PROLOGUE.txt
  V01_01_CHAPTER_ONE.txt
  ...
  V03_27_CHAPTER_TWENTY-SEVEN.txt
```

| Rule | Value |
|------|-------|
| Max words/file | 10,000 (split long chapters at scene break if needed — suffix `_PART_B`) |
| Encoding | UTF-8 LF |
| Content | Spoken words only — no markdown, no HTML, no `===== PAGE =====` |

Build `chapter_manifest.csv` with word counts and estimated minutes @ 150 wpm.

---

### Phase 4 — Pronunciation dictionary (Priority A)

`pronunciation_dictionary.csv` — all entries from `PRONUNCIATION_AND_NARRATION_GUIDE.md` plus any names discovered in pass.

**Audit grep** before delivery:

```bash
# must return 0 after normalization
grep -E '===== PAGE|MASTERS X' elevenlabs_scripts/**/*.txt
```

**Consistency audit:**

```bash
# all 111.2 Hz must be spoken form, not raw "111.2 Hz"
grep '111\.2 Hz' elevenlabs_scripts/**/*.txt  # → 0 hits
grep 'one eleven point two hertz' ...           # → matches every chapter key
```

---

### Phase 5 — ElevenLabs tags (Priority B — minimal)

Default: **plain text** with punctuation-driven pacing.

Optional folder `elevenlabs_scripts_v3_tagged/` — duplicate scripts with sparse `[short pause]` / `[pause]` at:
- Epigraph → body transitions
- Major scene breaks
- Epilogue coda

**Do not** produce heavy SSML unless author requests `elevenlabs_scripts_ssml/` variant for Multilingual v2.

---

### Phase 6 — Test paste sheet (Priority B)

`TEST_PASTE_V01_01.txt` — first ~800 words of Chapter One, ready for author to paste into ElevenLabs clone test. Include a 3-sentence **narrator note** at top (comment lines prefixed `# ` — author deletes before generate):

```
# TEST: Multilingual v2 or PVC · stability check · delete these lines before generate
```

---

## Return package structure

Zip name: **`masters-x-omnibus-audiobook-fable-RETURN.zip`**

```
audiobook_project/output/
  AUDIOBOOK_STATUS.md
  elevenlabs_scripts/masters-x-omnibus/     ← 77+ .txt files
  chapter_manifest.csv
  pronunciation_dictionary.csv
  TEST_PASTE_V01_01.txt
  ELEVENLABS_SCRIPT_SPEC.md               ← confirm or update
```

Optional: `pipeline/omnibus_audiobook/` — reproducible extract/normalize script (Python).

---

## Quality gates before calling done

- [ ] 77 narration units (Vol I: 23, II: 26, III: 28)
- [ ] Total words within ±2% of ~139,261 (excluding skipped front matter)
- [ ] Zero PDF page markers / running headers in script files
- [ ] `111.2 Hz` spoken form locked throughout
- [ ] Frequency keys preserved at chapter opens (spoken)
- [ ] `chapter_manifest.csv` complete
- [ ] `pronunciation_dictionary.csv` importable
- [ ] TEST_PASTE file included
- [ ] Zero website / encyclopedia files touched

---

## Non-negotiable canon (do not alter prose)

| Rule | Source |
|------|--------|
| Author name: **Jason Carroll Holloway** | CANON §1 |
| **111.2 Hz** is the keystone — spoken form per guide | CANON §3 |
| William = **seven** notebooks (not seventeen) | CANON §3 |
| Blake = Moleskine **IX**; ten volumes complete | CANON §3 |
| Do not "fix" Missouri wine dialogue, Andrew Chen name, etc. | CANON / verification |

**You normalize for TTS — you do not edit the novel.**

---

## Authority hierarchy

1. `INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf`
2. `CANON.md`
3. `omnibus_v8_fulltext.txt`
4. `PRONUNCIATION_AND_NARRATION_GUIDE.md`

Log ambiguities in `AUDIOBOOK_STATUS.md` — do not silently rewrite prose.

---

## Out of scope

- ElevenLabs account setup, voice cloning, or audio rendering
- ACX/Audible mastering, LUFS normalization, retail upload
- Encyclopedia, print, website, marketing
- Individual volume PDFs (omnibus only this pass)
