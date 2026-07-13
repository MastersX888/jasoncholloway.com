# ElevenLabs — First-Time Workflow (Masters X Omnibus)

**For:** Jason Carroll Holloway · PVC narration · ~15 hours finished audio

---

## 1. Where the files live (on your PC)

**Main folder (use this one):**

```
C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\audiobook_project\output\elevenlabs_scripts\masters-x-omnibus\
```

**77 chapter files** — `V01_00_PROLOGUE.txt` through `V03_27_CHAPTER_TWENTY-SEVEN.txt`

**Helper files (same `output\` folder):**

| File | Purpose |
|------|---------|
| `TEST_PASTE_V01_01.txt` | **Start here** — ~800 words to test your clone |
| `pronunciation_dictionary.csv` | Import into ElevenLabs (Černá, Mýrdalsjökull, etc.) |
| `chapter_manifest.csv` | Chapter list, word counts, ~minutes per file |
| `00_EPIGRAPHS_ONLY.txt` | Optional opening (in scripts folder) |

**Optional tagged version** (only if using **Eleven v3** model):

```
...\output\elevenlabs_scripts_v3_tagged\masters-x-omnibus\
```

**Tip:** Pin or copy the `masters-x-omnibus` folder to Desktop for easy drag-and-drop in ElevenLabs.

---

## 2. Yes — you can batch it

Use **ElevenLabs Studio → Projects** (not the short “Speech Synthesis” box).

1. Go to [elevenlabs.io](https://elevenlabs.io) → sign in
2. Left sidebar → **Studio** (or **Projects**)
3. **Create new project** → choose **Audiobook** template
4. Name it e.g. `Masters X Omnibus`
5. Select your **Professional Voice Clone** (create PVC first if you haven’t — see §4)

### Import all chapters at once

- Drag the **entire** `masters-x-omnibus` folder onto the project chapter list, **or**
- Use bulk import / upload multiple `.txt` files

Files sort alphabetically — names are prefixed `V01_`, `V02_`, `V03_` so order is correct.

**Optional:** Import `00_EPIGRAPHS_ONLY.txt` as the first chapter (or paste before Prologue).

### Generate in batch

- Click **Generate all** (or convert entire project)
- Processing runs in the cloud — you can close the tab; ElevenLabs emails when done
- **Export** → download chapter MP3s (or one combined file)

**Do not** paste all 135k words into one text box — Projects keeps one chapter per file (~15 hours total, 77 chunks).

---

## 3. Recommended first-time order

### Step A — Clone your voice (one-time)

1. **Voice Lab** → **Professional Voice Clone**
2. Upload **30+ minutes** of clear speech (no music, minimal reverb)
3. Wait for training to finish

### Step B — Test before the full book

1. Open `TEST_PASTE_V01_01.txt`
2. **Delete the lines starting with `#`** at the top
3. Paste into a single Studio chapter (or Speech Synthesis for a quick test)
4. Model: start with **Multilingual v2** (stable for long books)
5. Listen for:
   - `one hundred nine hertz` (chapter key)
   - Foucault, Breitling, Navitimer
   - Pacing at paragraph breaks

Fix pronunciation in **Pronunciation Dictionary** before batching the whole book.

### Step C — Import pronunciation dictionary

1. In your Project → **Pronunciation** / **Dictionary** (wording varies by UI)
2. Import `pronunciation_dictionary.csv`
3. Or add entries manually from that file

### Step D — Batch the full omnibus

1. Create Audiobook project
2. Import all 77 `V*.txt` files (skip `99_ABOUT_THE_AUTHOR_OPTIONAL.txt` unless you want it)
3. Voice settings (starting point for literary fiction):
   - **Stability:** ~55–65%
   - **Similarity:** ~75–85%
   - **Style:** low (~0–10%) for steady narration
4. **Generate all chapters**
5. Download exports when complete

### Step E — After export (later)

- Normalize loudness (ACX target ~-20 dB) in Audacity or FFmpeg
- Concatenate chapters if you want one M4B with markers
- Distribution: Findaway, Google Play, etc. (separate step)

---

## 4. Plans & credits (rough)

- **Creator plan** (~$22/mo) — typical minimum for PVC + commercial license
- Full book ≈ **135,600 words** → check ElevenLabs credit calculator before “Generate all”
- Generate **Vol. 1 only** first (23 files) if you want to cap spend while learning the UI

| Volume | Files | ~Words | ~Hours @ 150 wpm |
|--------|------:|-------:|-----------------:|
| Vol. I | 23 | ~35k | ~4 hr |
| Vol. II | 26 | ~55k | ~6 hr |
| Vol. III | 28 | ~45k | ~5 hr |

---

## 5. Which script folder?

| Your voice model | Use folder |
|------------------|------------|
| **Multilingual v2** (recommended first) | `elevenlabs_scripts\masters-x-omnibus\` |
| **Eleven v3** (more expressive) | `elevenlabs_scripts_v3_tagged\masters-x-omnibus\` |

Plain text = fewer surprises. Tagged folder adds sparse `[pause]` at scene breaks.

---

## 6. Quick open (Windows)

Paste into File Explorer address bar:

```
C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\audiobook_project\output\elevenlabs_scripts\masters-x-omnibus
```

Or run from PowerShell:

```powershell
explorer "C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\audiobook_project\output\elevenlabs_scripts\masters-x-omnibus"
```

---

## 7. Troubleshooting

| Problem | Fix |
|---------|-----|
| Chapters out of order | Rename must keep `V01_`, `V02_`, `V03_` prefixes |
| Weird names/places | Add row to `pronunciation_dictionary.csv`, re-import |
| Voice drifts over long chapter | Already split — longest file ~4,300 words |
| “Point zero” on frequencies | Fixed July 11 — use current scripts (`five fifty-six hertz`) |
| Credits run out mid-batch | Generate one volume at a time |

---

**Next step:** Open `TEST_PASTE_V01_01.txt`, test your clone, then drag the whole `masters-x-omnibus` folder into a new ElevenLabs Audiobook project.
