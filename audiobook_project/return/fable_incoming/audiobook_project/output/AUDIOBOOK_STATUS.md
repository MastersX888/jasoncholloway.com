# AUDIOBOOK_STATUS.md — Masters X Omnibus · ElevenLabs Script Pass
**Session:** July 11, 2026 · Fable
**Source authority:** `INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf` (686 pp HC; 684 extractable)
**Deliverable:** `masters-x-omnibus-audiobook-fable-RETURN.zip`

---

## What was done

Scripts were built **directly from the PDF authority** using layout geometry (pdfplumber), not from the flat text extract. The ReportLab interior is metrically consistent, which allowed deterministic reconstruction:

- **Paragraphs** detected by first-line indent (+20 pt) — no guesswork merging.
- **Scene breaks** detected by vertical gap > 40 pt (normal pitch 18 pt), plus a page-top whitespace heuristic for breaks falling at page tops.
- **Running headers** (`MASTERS X` / `HOLLOWAY`, 8 pt, y≈41) and **folios** (9 pt, y≈608) removed by position + size, not text matching — immune to headers bleeding mid-paragraph.
- **Heading blocks** (10 pt label / 14 pt title / 8.5 pt italic frequency key) parsed structurally; titles that wrap (Vol. III Prologue) merged correctly.
- Mid-epilogue section headers (`SIX MONTHS LATER`, `THREE WEEKS LATER`) recognized as fresh-page 10 pt caps and narrated as their own beats.
- `omnibus_v8_fulltext.txt` was used as the **reconciliation control**, not the source (see audit below).

Pipeline is reproducible: `pipeline/omnibus_audiobook/build_scripts.py` (single script, PDF in → all 77 scripts + manifest out).

## Deliverables

| Item | Status |
|------|--------|
| `elevenlabs_scripts/masters-x-omnibus/` — 77 unit scripts | ✅ (V01: 23 · V02: 26 · V03: 28) |
| `00_EPIGRAPHS_ONLY.txt` (optional standalone open) | ✅ |
| `99_ABOUT_THE_AUTHOR_OPTIONAL.txt` (optional back matter) | ✅ (not counted in 77) |
| `elevenlabs_scripts_v3_tagged/` — sparse `[pause]` variant | ✅ (scene breaks + epigraph beats only, ≪3% of characters) |
| `chapter_manifest.csv` — 77 rows | ✅ |
| `pronunciation_dictionary.csv` — 52 entries | ✅ (guide terms + Czech/Icelandic/French/Catalan/Latin terms discovered in pass) |
| `TEST_PASTE_V01_01.txt` — ~800 words + narrator note | ✅ |
| `ELEVENLABS_SCRIPT_SPEC.md` | ✅ Confirmed; §9 addendum documents settled conventions |
| Splits (`_PART_B`) | Not needed — longest unit is V02_08 at 4,307 words (limit 10,000) |

## Quality gates

| Gate | Result |
|------|--------|
| 77 narration units (23/26/28) | ✅ |
| Zero `===== PAGE` / `MASTERS X` / `HOLLOWAY` in scripts | ✅ grep = 0 |
| Zero standalone page-number lines | ✅ grep = 0 |
| Zero raw `N Hz` remaining (all spoken) | ✅ grep = 0 |
| `111.2 Hz` keystone spoken form | ✅ `one eleven point two hertz` — includes ~70 bare `111.2` prose occurrences |
| Frequency keys spoken at chapter opens | ✅ all 71 keyed chapters (Vol. II keys read per-chapter from source, not batch-assumed) |
| Curly quotes normalized | ✅ 0 remaining |
| Word count | ✅ see reconciliation |
| Manifest rows = script files | ✅ 77 = 77 |
| Website / encyclopedia files touched | ✅ none |

## Word-count reconciliation

The handoff's ~139,261 figure counts the **raw extraction** — including `===== PAGE` markers (684 × 3 tokens), running headers, folios, title/copyright pages, and About the Author. Actual source **prose** (pp. 9–682, headers and folios stripped): **134,729 words**. Script total: **135,612 words** (**+0.66%**) — the surplus is spoken chapter headers, volume title lines, and Hz expansions (`109 Hz` = 2 words → `one hundred nine hertz` = 4). A per-unit reconciliation ran all 77 units against their source page ranges: **all within tolerance; no dropped or duplicated passages.**

## Conventions settled (details in spec §9 addendum)

Decimal-Hz pair style generalized; bare `111.2` expanded; `Dr.` → Doctor everywhere; `Mr./Mrs./Ms.` and clock times left as printed (TTS-safe); degrees expanded; `Rudolf II` → the Second; `G4S` → G four S; volume titles read at each volume's first unit; epigraphs and About the Author delivered as optional standalone files; `— ·` key placeholders silent.

## Open flags for the author

1. **Volume-title reading** (deferred decision) — resolved toward *read aloud*; delete the first line of V01_00 / V02_01 / V03_00 to reverse.
2. **Epigraphs placement** — delivered standalone (`00_EPIGRAPHS_ONLY.txt`); paste ahead of V01_00 in the ElevenLabs project if you want them inside the book proper.
3. **Publisher credit at open** (deferred) — not added; one sentence can be prepended to `00_EPIGRAPHS_ONLY.txt` if desired.
4. **`556.0 Hz` / `112.0 Hz`** — "point zero" is read aloud (instrument-precision register). Say the word and I'll drop it.
5. **Scene breaks at exact page tops** — detected via top-whitespace heuristic; if any beat sounds missing in a long chapter during proofing, flag the passage and it can be hand-checked against the PDF.
6. **Canon untouched** — Missouri wine dialogue, Andrew Chen, seven notebooks, Moleskine ten-volume arithmetic: no prose edits anywhere; TTS normalization only.

## Suggested ElevenLabs workflow

1. Import `pronunciation_dictionary.csv` into the project first.
2. Run `TEST_PASTE_V01_01.txt` on Multilingual v2 with the PVC; check the key line and Icelandic terms.
3. Load plain scripts in filename order. Switch to the `_v3_tagged` variants only if testing Eleven v3 (audio tags are ignored — silently — by v2).
