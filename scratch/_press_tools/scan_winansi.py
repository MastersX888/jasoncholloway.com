"""Report every character in the press-kit generator that WinAnsi cannot encode.

ReportLab's built-in Type1 fonts are WinAnsi; anything outside it takes the
silent ZapfDingbats fallback path that produced the filled-square brand mark.
cp1252 is the codec form of WinAnsiEncoding, so it is used as the test.
"""

from __future__ import annotations

import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
TARGET = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "scripts" / "generate_press_kit.py"

src = TARGET.read_text(encoding="utf-8")

# Mojibake / replacement sentinels that must never appear in a file we wrote.
for bad in ("\u00e2\u0080", "\u00c3", "\u00c2", "\ufffd"):
    if bad in src:
        print(f"!! MOJIBAKE SENTINEL {bad!r} present in {TARGET.name}")

hits: dict[str, list[int]] = defaultdict(list)
for lineno, line in enumerate(src.splitlines(), 1):
    for ch in line:
        try:
            ch.encode("cp1252")
        except UnicodeEncodeError:
            if lineno not in hits[ch]:
                hits[ch].append(lineno)

print(f"scanned {TARGET.relative_to(ROOT).as_posix()}  ({len(src)} chars)")
if not hits:
    print("  no characters outside WinAnsi / cp1252")
else:
    for ch, lines in sorted(hits.items(), key=lambda kv: ord(kv[0])):
        name = unicodedata.name(ch, "<unnamed>")
        total = sum(line.count(ch) for line in src.splitlines())
        print(f"  U+{ord(ch):04X}  {ch!r}  {name}  x{total}  lines={lines}")

# Also list the non-ASCII characters that ARE safe, so the report can say so.
print("\nnon-ASCII but WinAnsi-safe (no fallback):")
safe: dict[str, int] = defaultdict(int)
for ch in src:
    if ord(ch) < 128:
        continue
    try:
        ch.encode("cp1252")
    except UnicodeEncodeError:
        continue
    safe[ch] += 1
for ch, n in sorted(safe.items(), key=lambda kv: ord(kv[0])):
    print(f"  U+{ord(ch):04X}  {ch!r}  {unicodedata.name(ch, '<unnamed>')}  x{n}")
