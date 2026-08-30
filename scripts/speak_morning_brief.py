#!/usr/bin/env python3
"""Speak Morgan's morning brief (or evening closeout) on Windows.

Uses Windows SAPI via PowerShell (zero-install) for playback.
Optionally saves MP3 via edge-tts when available.
"""

from __future__ import annotations

import argparse
import asyncio
import glob
import os
import re
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OPS_DIR = REPO_ROOT / "scratch" / "ops_reports"
AUDIO_DIR = OPS_DIR / "audio"

# Prefer a natural US voice when using edge-tts
EDGE_VOICE = "en-US-JennyNeural"


def find_latest_brief(evening: bool = False) -> Path | None:
    if evening:
        today = date.today().strftime("%Y-%m-%d")
        closeout = OPS_DIR / f"EVENING_CLOSEOUT_{today}.md"
        if closeout.exists():
            return closeout
        matches = sorted(glob.glob(str(OPS_DIR / "EVENING_CLOSEOUT_*.md")), reverse=True)
        return Path(matches[0]) if matches else None

    today = date.today().strftime("%Y-%m-%d")
    today_brief = OPS_DIR / f"MORNING_BRIEF_{today}.md"
    if today_brief.exists():
        return today_brief

    matches = sorted(glob.glob(str(OPS_DIR / "MORNING_BRIEF_*.md")), reverse=True)
    return Path(matches[0]) if matches else None


def extract_spoken_section(text: str, evening: bool) -> str:
    """Prefer dedicated spoken section; else build from full doc."""
    marker = r"## Spoken evening summary \(for TTS\)"
    if evening:
        m = re.search(marker + r"\s*\n(.*?)(?:\n---|\n## |\Z)", text, re.DOTALL | re.IGNORECASE)
        if m:
            return m.group(1).strip()

    opener = r"## Spoken opener.*?\n(.*?)(?:\n---|\n## 1\.)"
    closer = r"## Spoken closer.*?\n(.*?)(?:\n---|\n## Reports|\Z)"
    parts: list[str] = []

    om = re.search(opener, text, re.DOTALL | re.IGNORECASE)
    if om:
        parts.append(om.group(1).strip())

    cm = re.search(closer, text, re.DOTALL | re.IGNORECASE)
    if cm:
        parts.append(cm.group(1).strip())

    if parts:
        return "\n\n".join(parts)

    return markdown_to_speech(text)


def markdown_to_speech(md: str) -> str:
    """Convert markdown to plain speakable text."""
    text = md

    # Remove HTML comments
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)

    # Code blocks
    text = re.sub(r"```[\s\S]*?```", "", text)

    # Images
    text = re.sub(r"!\[([^\]]*)\]\([^)]+\)", r"\1", text)

    # Links: keep label
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)

    # Bare URLs — skip reading long URLs aloud
    text = re.sub(r"https?://\S+", "link in the report", text)

    # Headers → plain lines with slight pause
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)

    # Bold/italic
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)

    # Tables: keep cell text, drop pipes
    lines = []
    for line in text.splitlines():
        if re.match(r"^\|", line.strip()):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if all(re.match(r"^[-:\s]+$", c) for c in cells if c):
                continue
            line = ". ".join(c for c in cells if c and c != "---")
        lines.append(line)
    text = "\n".join(lines)

    # List markers
    text = re.sub(r"^[\s]*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^[\s]*\d+\.\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^[\s]*- \[[ xX]\]\s+", "", text, flags=re.MULTILINE)

    # Emoji / status markers — verbalize common ones
    replacements = {
        "✅": "done.",
        "❌": "not done.",
        "🟡": "",
        "🔴": "priority.",
        "🟢": "",
        "⚪": "",
        "⏳": "waiting.",
        "📅": "",
        "🔵": "",
        "⚠️": "note.",
        "⚠": "note.",
        "🌅": "",
    }
    for k, v in replacements.items():
        text = text.replace(k, v)

    # Horizontal rules
    text = re.sub(r"^---+$", "", text, flags=re.MULTILINE)

    # Collapse whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n ", "\n", text)

    # Trim boilerplate lines that don't speak well
    skip_patterns = [
        r"^\*Morgan —.*",
        r"^\*Part of SCP.*",
        r"^Reports?:.*",
        r"^Delivered:.*",
        r"^\*\*Morgan.*",
        r"^From:.*",
        r"^Full state:.*",
    ]
    out_lines = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            out_lines.append("")
            continue
        if any(re.match(p, stripped, re.I) for p in skip_patterns):
            continue
        out_lines.append(stripped)

    text = "\n".join(out_lines).strip()
    return text


def fallback_message() -> str:
    today = date.today().strftime("%A, %B %d")
    checklist = OPS_DIR / f"CHECKLIST_{date.today().strftime('%Y-%m-%d')}.md"
    if checklist.exists():
        return (
            f"Good morning, Jason. Morgan here. I couldn't find a morning brief file for today, "
            f"{today}, but your checklist is ready in scratch ops reports. "
            f"Open Cursor or read CHECKLIST_{date.today().strftime('%Y-%m-%d')}.md when you're ready."
        )
    return (
        f"Good morning, Jason. Morgan here. No brief file for {today} yet. "
        f"Ask Morgan in Cursor for today's briefing."
    )


def speak_sapi(text: str, rate: int = 0, wav_path: Path | None = None) -> bool:
    """Speak using Windows System.Speech via PowerShell script file."""
    script_dir = wav_path.parent if wav_path else Path(tempfile.gettempdir())
    script_dir.mkdir(parents=True, exist_ok=True)
    text_file = script_dir / "_tts_script.txt"
    text_file.write_text(text, encoding="utf-8")

    ps1 = script_dir / "_tts_run.ps1"
    wav_lines = ""
    if wav_path:
        wav_path.parent.mkdir(parents=True, exist_ok=True)
        wav_lines = f'$s.SetOutputToWaveFile("{wav_path.resolve()}")\n'

    ps1.write_text(
        f"""Add-Type -AssemblyName System.Speech
$text = [System.IO.File]::ReadAllText("{text_file.resolve()}", [System.Text.Encoding]::UTF8)
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.Rate = {rate}
{wav_lines}$s.Speak($text)
$s.Dispose()
""",
        encoding="utf-8",
    )

    try:
        result = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(ps1)],
            check=True,
            capture_output=True,
            text=True,
            timeout=max(300, len(text) // 3),
        )
        if result.stderr.strip():
            print(result.stderr.strip(), file=sys.stderr)
        if wav_path and not wav_path.exists():
            print("SAPI finished but WAV missing.", file=sys.stderr)
            return False
        return True
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError) as e:
        err = getattr(e, "stderr", "") or str(e)
        print(f"SAPI speak failed: {err}", file=sys.stderr)
        return False
    finally:
        for p in (text_file, ps1):
            try:
                p.unlink(missing_ok=True)
            except OSError:
                pass


def speak_pyttsx3(text: str, rate: int = 175) -> bool:
    try:
        import pyttsx3  # type: ignore

        engine = pyttsx3.init()
        engine.setProperty("rate", rate)
        engine.say(text)
        engine.runAndWait()
        return True
    except Exception as e:
        print(f"pyttsx3 speak failed: {e}", file=sys.stderr)
        return False


async def save_mp3_edge(text: str, out_path: Path) -> bool:
    try:
        import edge_tts  # type: ignore

        communicate = edge_tts.Communicate(text, EDGE_VOICE)
        await communicate.save(str(out_path))
        return out_path.exists() and out_path.stat().st_size > 0
    except Exception as e:
        print(f"edge-tts save failed: {e}", file=sys.stderr)
        if out_path.exists() and out_path.stat().st_size == 0:
            out_path.unlink(missing_ok=True)
        return False


def save_mp3(text: str, out_path: Path) -> bool:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        return asyncio.run(save_mp3_edge(text, out_path))
    except RuntimeError:
        # Already in event loop (unlikely in CLI)
        loop = asyncio.new_event_loop()
        try:
            return loop.run_until_complete(save_mp3_edge(text, out_path))
        finally:
            loop.close()


def main() -> int:
    parser = argparse.ArgumentParser(description="Speak Morgan's morning or evening brief.")
    parser.add_argument("--evening", action="store_true", help="Use evening closeout instead of morning brief")
    parser.add_argument("--source", type=Path, help="Explicit markdown file to read")
    parser.add_argument("--no-speak", action="store_true", help="Save MP3 only, do not speak")
    parser.add_argument("--no-save", action="store_true", help="Speak only, do not save MP3")
    parser.add_argument("--rate", type=int, default=0, help="SAPI rate (-10 to 10)")
    args = parser.parse_args()

    if args.source:
        brief_path = args.source
        if not brief_path.is_absolute():
            brief_path = REPO_ROOT / brief_path
    else:
        brief_path = find_latest_brief(evening=args.evening)

    evening = args.evening or (brief_path and "EVENING_CLOSEOUT" in brief_path.name)

    if brief_path and brief_path.exists():
        raw = brief_path.read_text(encoding="utf-8")
        speech = extract_spoken_section(raw, evening=bool(evening))
        print(f"Source: {brief_path}")
    else:
        speech = fallback_message()
        print("Source: (fallback — no brief file found)")

    if not speech.strip():
        speech = markdown_to_speech(raw) if brief_path and brief_path.exists() else fallback_message()

    # Cap extremely long output for TTS (~3 min ≈ 450 words)
    words = speech.split()
    if len(words) > 550:
        speech = " ".join(words[:550]) + " ... Full details are in the written report."

    print(f"Speaking {len(words)} words...")
    print("-" * 40)
    print(speech[:500] + ("..." if len(speech) > 500 else ""))
    print("-" * 40)

    today = date.today().strftime("%Y-%m-%d")
    prefix = "evening_closeout" if evening else "morning_brief"
    mp3_path = AUDIO_DIR / f"{prefix}_{today}.mp3"
    wav_path = AUDIO_DIR / f"{prefix}_{today}.wav"

    saved_audio: Path | None = None
    if not args.no_save:
        if save_mp3(speech, mp3_path):
            saved_audio = mp3_path
            print(f"Saved: {mp3_path}")
        else:
            print("MP3 save skipped (edge-tts unavailable); trying SAPI WAV...", file=sys.stderr)

    if not args.no_speak:
        # Play through speakers (no wav — wav would mute speaker output)
        if speak_sapi(speech, rate=args.rate):
            if not args.no_save and saved_audio is None:
                if speak_sapi(speech, rate=args.rate, wav_path=wav_path) and wav_path.exists():
                    print(f"Saved: {wav_path}")
        elif not speak_pyttsx3(speech):
            print("All speak engines failed.", file=sys.stderr)
            return 1
    elif not args.no_save and saved_audio is None:
        # MP3-only mode with edge-tts down — still produce WAV
        if speak_sapi(speech, rate=args.rate, wav_path=wav_path):
            if wav_path.exists():
                print(f"Saved: {wav_path}")
        else:
            print("Audio save failed.", file=sys.stderr)
            return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
