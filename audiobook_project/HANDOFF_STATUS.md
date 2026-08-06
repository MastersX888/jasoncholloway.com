# Audiobook Project — Handoff Status

## Geo-update regen — August 4, 2026

**Master PDF:** `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\9798295884412_HC\9798295884412_HC_interior.pdf`  
**Scripts:** regenerated 77/77 (30 files changed vs July 11 set).  
**Backup of prior scripts:** `output/_backup_pre_geo_2026-08-04/`  
**Status log:** `output/AUDIOBOOK_STATUS.md`

---

## Fable Pass 1 — RETURN INTEGRATED (July 11, 2026)

**Source:** `C:\Users\zh577\Downloads\masters-x-omnibus-audiobook-fable-RETURN.zip`  
**Archived:** `audiobook_project/return/masters-x-omnibus-audiobook-fable-RETURN.zip`

### Delivered (all quality gates green)

| Asset | Path |
|-------|------|
| **77 narration scripts** | `output/elevenlabs_scripts/masters-x-omnibus/V*.txt` |
| Epigraphs (optional open) | `output/elevenlabs_scripts/masters-x-omnibus/00_EPIGRAPHS_ONLY.txt` |
| About author (optional) | `output/elevenlabs_scripts/masters-x-omnibus/99_ABOUT_THE_AUTHOR_OPTIONAL.txt` |
| Eleven v3 tagged variant | `output/elevenlabs_scripts_v3_tagged/masters-x-omnibus/` |
| Chapter manifest | `output/chapter_manifest.csv` |
| Pronunciation dictionary (52 entries) | `output/pronunciation_dictionary.csv` |
| ElevenLabs test paste | `output/TEST_PASTE_V01_01.txt` |
| Updated spec | `output/ELEVENLABS_SCRIPT_SPEC.md` |
| Rebuild pipeline | `pipeline/omnibus_audiobook/build_scripts.py` |
| Session log | `output/AUDIOBOOK_STATUS.md` |

### Scale

| Metric | Value |
|--------|-------|
| Narration units | **77** (Vol I: 23 · II: 26 · III: 28) |
| Script words | **~135,612** (+0.66% vs source prose — Hz expansions + spoken headers) |
| Est. runtime | **~15 hours** @ 150 wpm (per manifest) |
| Longest unit | V02_08 (~4,307 words — no split needed) |

### Build method

Fable parsed **directly from PDF** (pdfplumber + layout geometry), not the flat txt extract. Running headers/folios removed by position. Reproducible via `pipeline/omnibus_audiobook/build_scripts.py`.

### Quality verified on integrate

- Zero `===== PAGE` / `MASTERS X` / raw `Hz` in scripts
- `111.2` → **one eleven point two hertz** throughout
- Chapter keys spoken (e.g. `One hundred nine hertz. Kansas City.`)

---

## Author next steps (ElevenLabs)

1. Import `output/pronunciation_dictionary.csv` into ElevenLabs project
2. Paste `output/TEST_PASTE_V01_01.txt` — test PVC on **Multilingual v2** first
3. Generate units in filename order from `elevenlabs_scripts/masters-x-omnibus/`
4. Optional: use `elevenlabs_scripts_v3_tagged/` if testing **Eleven v3** clone
5. Optional: paste `00_EPIGRAPHS_ONLY.txt` before V01_00

### Open flags (from Fable)

- Volume title lines read aloud at V01_00 / V02_01 / V03_00 — delete first line to skip
- ~~`556.0 Hz` reads "point zero"~~ — **resolved:** trailing `.0` dropped (`five fifty-six hertz`, `one twelve hertz`)
- Epigraphs standalone vs. in-book — author choice

---

## Handoff package (sent to Fable)

`audiobook_fable_handoff/masters-x-omnibus-audiobook-fable-handoff.zip`  
Rebuild: `python scripts/package_audiobook_fable_handoff.py`
