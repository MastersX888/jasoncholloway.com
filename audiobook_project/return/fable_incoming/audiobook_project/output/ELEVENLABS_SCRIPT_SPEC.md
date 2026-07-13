# ElevenLabs Audiobook Script Specification
## Masters X Omnibus · Seventh City Press LLC

**Target platform:** [ElevenLabs](https://elevenlabs.io) — author **Professional Voice Clone (PVC)**  
**Recommended models for long-form fiction:**
- **Primary:** **Multilingual v2** — stable for ~15-hour full-book runs, fewer artifacts across chapters
- **Test also:** Author's cloned voice on **Eleven v3** for emotional scenes; v3 uses **Audio Tags** (`[pause]`, `[whispers]`) — **not** SSML `<break>`
- **Do not mix** SSML break tags with v3 — they are silently ignored

---

## 1. Deliverable file format

### Primary: one plain-text file per narration unit

```
audiobook_project/output/elevenlabs_scripts/masters-x-omnibus/
  V01_00_PROLOGUE.txt
  V01_01_CHAPTER_ONE.txt
  ...
  V03_27_CHAPTER_TWENTY-SEVEN.txt
```

| Rule | Detail |
|------|--------|
| Encoding | UTF-8, Unix line endings (LF) |
| Extension | `.txt` only in script folders (no markdown in TTS paste files) |
| Spoken content only | No `===== PAGE =====` markers, no running headers, no standalone page numbers |
| Max file size | **≤ 10,000 words** per file (ElevenLabs project chunk comfort); **chapters may be split** at scene breaks if longer |
| Filename | `V{vol}_{ch#}_{SLUG}.txt` — zero-padded chapter index |

### Secondary: machine-readable manifest

`chapter_manifest.csv` columns:

```
file_id,volume,unit_type,unit_number,title,frequency_key,word_count,source_pdf_pages,est_minutes_150wpm,notes
```

### Tertiary: pronunciation dictionary

`pronunciation_dictionary.csv` for ElevenLabs **Pronunciation Dictionary** import:

```
grapheme,alias,notes
Mýrdalsjökull,MEER-dals-YO-kut,Icelandic glacier — author preferred
Černá,CHER-nah,Czech surname Eva Černá
```

Plus inline respellings in scripts only where the dictionary is insufficient.

---

## 2. Text normalization rules

Apply in order:

1. **Strip print artifacts** from PDF extraction:
   - Lines matching `^===== PAGE \d+ =====$`
   - Running headers: `^MASTERS X$`, standalone page numbers (`^173$`), repeated title pages
   - Footer/header page numbers mid-paragraph
2. **Merge hard wraps** — PDF line breaks inside paragraphs → single flowing paragraph
3. **Preserve intentional breaks** — blank line between paragraphs; double blank before section shifts
4. **Expand for speech:**
   - `Dr.` → `Doctor` (first occurrence per chapter; thereafter optional)
   - `St.` → `Saint` (St. Louis, St. Paul) or `Street` (context)
   - Numbers in prose → words where ambiguous (`23` candidates → `twenty-three`)
   - Dates → spoken (`June 1924` → `June nineteen twenty-four`)
5. **Do not expand:**
   - ISBNs, copyright blocks (omit from narration — see §4)
   - `@`, URLs, email — omit or narrator aside
6. **Em dash / ellipsis** — keep `—` and `...` for natural pauses; prefer punctuation over tags
7. **Quotes** — curly quotes normalized to straight `"` or left as Unicode; consistent per file

---

## 3. Chapter headers & frequency keys (spoken)

Each chapter opens with a **frequency key line** in the source, e.g.:

```
109 Hz · Kansas City
111.2 Hz · Prague
3.915 Hz · Iceland
```

**Read as narration** (not metadata). Standardize pronunciation:

| Print | Spoken |
|-------|--------|
| `109 Hz` | `one hundred nine hertz` |
| `111.2 Hz` | `one eleven point two hertz` *(series keystone — consistent every time)* |
| `110.4 Hz` | `one ten point four hertz` |
| `3.915 Hz` | `three point nine one five hertz` |
| `222.4 Hz` | `two twenty-two point four hertz` |
| `333.6 Hz` | `three thirty-three point six hertz` |
| Middle dot `·` | brief pause (newline after key line, not the word "dot") |

Then speak chapter title: `Chapter One` (not `CHAPTER ONE` shouted).

**Volume openers:** `Volume One: The Inheritance of Frequency` — single line, then pause, then Prologue/Chapter.

---

## 4. Front matter — what to narrate

| Section | Action |
|---------|--------|
| Title page | **Skip** (or optional 10-line publisher intro — author deferred) |
| Copyright / ISBN | **Skip** |
| Epigraphs (John 1:1, Planck, William, Blake, Luke, James) | **Include** — each quote separated by `[short pause]` or blank line; attribute after em dash |
| Volume divider pages | **Include** volume title only |
| Blank pages | Skip |

---

## 5. ElevenLabs tags (sparse use)

**If author uses Eleven v3:**

```
[short pause]   — beat between epigraph and body
[pause]         — scene break / time jump
[whispers]      — only where text signals whispered dialogue (rare)
```

**If author uses Multilingual v2 / Turbo v2:**

```xml
<break time="500ms"/>
```

Use tags on **< 3% of characters**. Prefer paragraph breaks and punctuation.

**Never tag:** every paragraph, frequency keys, or ordinary dialogue.

---

## 6. Dialogue & voice direction

- **Narrator:** third-person limited (Blake-forward); no character voice switching unless dialogue is clearly attributed
- **Dialogue:** new paragraph per speaker; no `"he said"` removal
- **Blake's reconstructed passages** (1267, epigraphs from Moleskines): slightly more measured pacing — optional `[pause]` before opening
- **Latin / Czech / Icelandic fragments:** pronunciation dictionary entry required; slow first occurrence

---

## 7. Quality gates

- [ ] **77 narration units** minimum (Vol I: 23 · Vol II: 26 · Vol III: 28) per structure doc
- [ ] Zero page markers remain (grep `PAGE \d+` → 0 hits)
- [ ] Zero standalone integers on their own line (page numbers)
- [ ] `111.2 Hz` spoken form consistent (grep audit)
- [ ] Total word count within **±2%** of source prose (~139,000 words)
- [ ] `chapter_manifest.csv` row count matches file count
- [ ] Test paste: first 500 words of V01_01 into ElevenLabs → no garbage tokens, no header bleed

---

## 8. Source authority

| Priority | Source |
|----------|--------|
| 1 | `INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf` (print truth) |
| 2 | `omnibus_v8_fulltext.txt` (pre-extracted — verify against PDF when ambiguous) |
| 3 | `CANON.md` (names, spelling, 111.2 Hz, Moleskine IX, seven notebooks) |
| 4 | `PRONUNCIATION_AND_NARRATION_GUIDE.md` |

When PDF and txt disagree, **PDF wins**.

---

## 9. Addendum — Conventions settled during the July 11, 2026 Fable pass

**Spec confirmed as-is**; the following ambiguities were resolved without changing §1–8:

1. **Decimal frequency style (general rule):** decimals use pair style + digit-read fraction — `107.3 Hz` → `one oh seven point three hertz`, `444.8 Hz` → `four forty-four point eight hertz`. Printed trailing `.0` is read (`556.0 Hz` → `five fifty-six point zero hertz`) to convey instrument precision. Integers use hundred style (`340 Hz` → `three hundred forty hertz`); comma-thousands expanded (`4,000 Hz` → `four thousand hertz`).
2. **Bare keystone:** standalone `111.2` (no "Hz", ~70 prose occurrences) is also expanded to `one eleven point two` so the keystone lock holds book-wide.
3. **Honorifics:** `Dr.` → `Doctor` everywhere (all occurrences, not just first per chapter). `Mr.` / `Mrs.` / `Ms.` left as printed — ElevenLabs reads these reliably and expansion ("Missus") alters the page unnecessarily.
4. **Clock times / AM-PM:** left as printed (`6 AM`, `5:12 AM`) — TTS-safe.
5. **Degrees:** `°F`/`°C`/`°N`/`°W` expanded to words, including the Iceland coordinates.
6. **`Rudolf II`** → `Rudolf the Second`; **`Moleskine IX`** → `Moleskine Nine`; **`G4S`** → `G four S`; **`&`** → `and` (Morgan and Pierce); **`St. Francis`** → `Saint Francis` (only `St.` in book).
7. **Scene breaks:** double blank line in plain scripts; `[pause]` in the `elevenlabs_scripts_v3_tagged/` variant. Mid-epilogue section headers (`SIX MONTHS LATER`) narrated as their own beat.
8. **Volume titles:** read once, at the head of each volume's first unit (V01_00, V02_01, V03_00) — deferred author decision resolved toward "read aloud" per prompt Phase 2; trivial to delete if reversed.
9. **Epigraph page (p. 5):** delivered as standalone optional `00_EPIGRAPHS_ONLY.txt` (not merged into V01_00); scripture attributions spoken as chapter-and-verse (`John, chapter one, verse one`).
10. **Back matter:** About the Author (p. 683) delivered as optional `99_ABOUT_THE_AUTHOR_OPTIONAL.txt` with the URL rendered speakably; not counted in the 77.
11. **Epilogue key:** `— · Coda` / `— · Kansas City` — the em-dash placeholder is silent; only the place/coda word is spoken.
