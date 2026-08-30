"""Scan every text file this task wrote for mojibake and replacement chars."""

from __future__ import annotations

import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]

SENTINELS = {
    "\u00e2\u0080": "UTF-8-as-cp1252 em/en dash (a-circumflex + U+0080)",
    "\u00e2\u0082": "UTF-8-as-cp1252 (a-circumflex + U+0082)",
    "\u00c3": "A-tilde",
    "\u00c2": "A-circumflex",
    "\ufffd": "U+FFFD REPLACEMENT CHARACTER",
}

TARGETS = [
    ROOT / "scripts" / "generate_press_kit.py",
    ROOT / "scripts" / "generate_press_kit.PRE_GLYPH_2026-08-29.py.bak",
    *sorted((ROOT / "scratch" / "press_extract").glob("*.txt")),
    ROOT / "scratch" / "press_extract" / "README_HOW_THESE_ARE_MADE.md",
    *sorted((ROOT / "scratch" / "_press_tools").glob("*.py")),
]

print("== ENCODING AUDIT ==")
clean = True
for p in TARGETS:
    if not p.exists():
        print(f"  MISSING  {p.relative_to(ROOT).as_posix()}")
        clean = False
        continue
    raw = p.read_bytes()
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        print(f"  NOT-UTF8 {p.relative_to(ROOT).as_posix()}  {exc}")
        clean = False
        continue
    hits = [name for s, name in SENTINELS.items() if s in text]
    bom = raw.startswith(b"\xef\xbb\xbf")
    crlf = b"\r\n" in raw
    status = "CLEAN" if not hits and not bom else "PROBLEM"
    if hits or bom:
        clean = False
    print(f"  {status:<8} {p.relative_to(ROOT).as_posix():<62} bom={bom} crlf={crlf}"
          + (f"  hits={hits}" if hits else ""))

print(f"\n  all files valid UTF-8, no BOM, no mojibake sentinels: {clean}")

print("\n== BRAND LINE AS RECORDED IN EACH EXTRACT ==")
for p in sorted((ROOT / "scratch" / "press_extract").glob("*.txt")):
    for line in p.read_text(encoding="utf-8").splitlines():
        if "Seventh City Press" in line and line.startswith("VII"):
            print(f"  {p.name:<32} {line!r}")
            print(f"  {'':<32} codepoints[:6]={[f'U+{ord(c):04X}' for c in line[:6]]}")
            break

print("\n== ANY U+2166 / U+25A0 LEFT ANYWHERE IN THE PRESS-KIT SURFACE ==")
for p in TARGETS:
    if not p.exists():
        continue
    text = p.read_text(encoding="utf-8")
    for ch in ("\u2166", "\u25a0"):
        n = text.count(ch)
        if n:
            print(f"  U+{ord(ch):04X} x{n}  {p.relative_to(ROOT).as_posix()}")
print("  (occurrences inside README prose describing the superseded caveat are expected)")
