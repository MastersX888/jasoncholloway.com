"""Scan the refreshed extracts for stale figures and encoding damage."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TXT = ROOT / "scratch" / "press_extract"

CORRECT = [189, 163, 271, 225, 205, 177, 732, 684]
STALE = [156, 178, 218, 260, 170, 200, 686, 734]
EPUB = [267, 385, 291]
MOJI = ["\u00e2\u0080", "\u00c3\u0083", "\u00c2\u00a0", "\ufffd"]

for path in sorted(TXT.glob("*.txt")):
    if ".PRE_" in path.name:
        continue
    text = path.read_text(encoding="utf-8")
    hit = lambda v: re.search(rf"(?<![\d.,]){v}(?![\d.,])", text) is not None
    print(f"{path.name}")
    print(f"   correct : {[v for v in CORRECT if hit(v)]}")
    print(f"   stale   : {[v for v in STALE if hit(v)] or 'NONE'}")
    print(f"   epub    : {[v for v in EPUB if hit(v)] or 'none'}")
    print(f"   moji    : {[m for m in MOJI if m in text] or 'none'}")
    print(f"   brand   : {text.splitlines()[0]!r}")
