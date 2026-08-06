# Spoken Morning Brief — How Jason Runs It

Morgan's daily briefing can be read aloud on Windows without opening Cursor.

---

## Quick start (tomorrow morning)

**Option A — double-click (Desktop)**  
`Desktop\Morgan Morning Brief.bat`

**Option B — terminal**

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
python scripts/speak_morning_brief.py
```

**Option C — evening wrap-up (tonight's closeout)**

```powershell
python scripts/speak_morning_brief.py --evening
```

---

## What it does

1. Finds the latest `scratch/ops_reports/MORNING_BRIEF_*.md` (or evening closeout with `--evening`)
2. Strips markdown to plain speakable text (~2–3 min read)
3. Speaks via **Windows SAPI** (built-in — no pip install required)
4. Saves audio to `scratch/ops_reports/audio/` — MP3 via **edge-tts** when online; **WAV via SAPI** as fallback

---

## Voice engine priority

| Engine | Install | Use |
|--------|---------|-----|
| PowerShell System.Speech | Built into Windows | Default — speaks immediately |
| edge-tts | `pip install edge-tts` (already on this machine) | Saves MP3; optional `--mp3-only` |
| pyttsx3 | `pip install pyttsx3` | Fallback if PowerShell fails |

---

## Flags

```text
python scripts/speak_morning_brief.py              # Latest morning brief, speak + MP3
python scripts/speak_morning_brief.py --evening    # Tonight's closeout summary
python scripts/speak_morning_brief.py --no-speak   # MP3 only
python scripts/speak_morning_brief.py --no-save    # Speak only, no file
python scripts/speak_morning_brief.py --source path/to/brief.md
```

---

## Audio files

Saved to: `scratch/ops_reports/audio/`

- `morning_brief_2026-07-31.mp3` or `.wav` — morning run
- `evening_closeout_2026-07-30.wav` — tonight's wrap-up

Replay anytime in any media player.

---

## Creating tomorrow's brief

1. Morgan (or you) writes `scratch/ops_reports/MORNING_BRIEF_2026-07-31.md` using `MORNING_BRIEF_TEMPLATE.md`
2. Run the bat or script
3. Listen while coffee brews

If no brief file exists for today, the script speaks a short fallback reminder to check the checklist.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No sound | Check Windows volume; try `--source` with a small test file |
| Python not found | Use full path or install Python 3 |
| MP3 not created | edge-tts missing — run `pip install edge-tts` or use `--no-save` |
| Wrong date brief | Pass `--source scratch/ops_reports/MORNING_BRIEF_YYYY-MM-DD.md` |

---

*Part of SCP evening-only ops — Morgan speaks, Jason listens.*
