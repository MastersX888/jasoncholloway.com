# AUDIOBOOK_STATUS.md — Masters X Omnibus · ElevenLabs Script Pass
**Session:** August 4, 2026 · Morgan (geo-update regen)
**Source authority (MASTER):** `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\9798295884412_HC\9798295884412_HC_interior.pdf` (684 pp; Jul 28 2026)
**Prior authority:** `INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf` (scripts backed up under `output/_backup_pre_geo_2026-08-04/`)

---

## What changed this pass

Last-minute **geo-updates** in the HC master interior required a full script regen so ElevenLabs matches print.

| Item | Result |
|------|--------|
| Chapter map | Vol I unchanged; Vol II/III start pages shifted ~−2 from V02 Ch.8 onward (V03 prologue **465**) |
| Volume ends | Vol II → p.462 · Vol III prose → p.681 (About the Author pp.683–684, not narrated) |
| Scripts rebuilt | **77/77** plain + v3-tagged |
| Total words | **135,666** |
| vs prior scripts | **30 changed** · **47 identical** · **28** of the changed files hit geo keywords |
| Pipeline flags | **0** |
| Raw `Hz` / bare `111.2` / page artifacts | **0** |
| Longest unit | V02_08 still ~4,307 words (under 10k) |

Largest word-count deltas vs pre-geo backup: `V01_07` (+24) · `V03_20` (+11) · `V01_05` (+7) · `V03_17` (+7).

## Deliverables (live)

| Path | Status |
|------|--------|
| `output/elevenlabs_scripts/masters-x-omnibus/` | ✅ refreshed |
| `output/elevenlabs_scripts_v3_tagged/masters-x-omnibus/` | ✅ refreshed |
| `output/chapter_manifest.csv` | ✅ refreshed |
| `output/pronunciation_dictionary.csv` | unchanged (still valid) |
| `output/TEST_PASTE_V01_01.txt` | prior (re-copy from V01_01 if desired) |
| `pipeline/omnibus_audiobook/build_scripts.py` | ✅ page map updated for master PDF |

## Rebuild command

```powershell
python audiobook_project\pipeline\omnibus_audiobook\build_scripts.py `
  "C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\9798295884412_HC\9798295884412_HC_interior.pdf" `
  "audiobook_project\output"
```

## ElevenLabs next

1. Re-import / replace chapter `.txt` files in the Studio project (do not keep pre-geo versions).
2. Pronunciation dictionary can stay.
3. Re-run `TEST_PASTE_V01_01.txt` (or paste fresh from updated `V01_01`) before full generate.
4. Prefer Multilingual v2 for the full ~15h run.

## Canon note

TTS normalization only (Hz spoken forms, Dr.→Doctor, etc.). No intentional prose rewrites beyond what is in the master PDF.
