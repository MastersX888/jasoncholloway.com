"""Sanity-check scripts/generate_press_kit.py after editing: encoding + no stale literals."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "scripts" / "generate_press_kit.py"

raw = SRC.read_bytes()
text = raw.decode("utf-8")

print(f"file: {SRC.relative_to(ROOT).as_posix()}  bytes={len(raw)}  utf8=OK")

MOJIBAKE = ["\u00e2\u0080", "\u00c3", "\u00c2", "\ufffd", "â€", "Ã", "Â"]
for token in MOJIBAKE:
    hits = [
        (text[: m.start()].count("\n") + 1, text[m.start() - 20 : m.start() + 20])
        for m in re.finditer(re.escape(token), text)
    ]
    print(f"mojibake {token!r}: {len(hits)} hit(s)" + ("" if not hits else f" {hits}"))

STALE = ["156", "178", "218", "260", "170", "200", "686", "734"]
for value in STALE:
    for m in re.finditer(rf"(?<![\d.])({value})(?![\d.])", text):
        line = text[: m.start()].count("\n") + 1
        print(f"  STALE? {value} at line {line}: {text.splitlines()[line - 1].strip()[:110]}")

for token in ["TODAY", "datetime", "date.today"]:
    print(f"{token!r} occurrences: {text.count(token)}")

print("compiles:", bool(compile(text, str(SRC), "exec")))
