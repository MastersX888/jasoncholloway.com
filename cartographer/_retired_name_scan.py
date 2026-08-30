#!/usr/bin/env python3
"""Scan cartographer artifacts (+ QUOTE_HARVEST) for retired character names.

Read-only. Backups (*.bak) and the frozen pre-geo-fix snapshot are skipped:
they are history by ruling and are expected to carry the old names.
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
ART = ROOT / "cartographer/artifacts"

RETIRED = [
    "Sarah Chen", "Marcus Chen", "Margaret Chen", "Laura Chen", "Lin Chen",
    "Michael Chen", "Andrew Tanaka", "Marcus Jr.", "Kofi Mensah",
    "Margaret Masters", "Senator Margaret", "Margaret Holt",
    "shared by marriage", "grandfather died in 2010", "would never meet",
]

targets = sorted(
    [p for p in ART.iterdir() if p.is_file() and not p.name.endswith(".bak")]
    + [ROOT / "scratch/editorial/QUOTE_HARVEST_v1.json"]
)

print(f"{'artifact':40} {'bytes':>10}  retired-name hits")
print("-" * 96)
total = 0
dirty = []
for p in targets:
    if not p.is_file():
        print(f"{p.name:40} {'MISSING':>10}")
        continue
    txt = p.read_text(encoding="utf-8", errors="replace")
    hits = {n: txt.count(n) for n in RETIRED if n in txt}
    total += sum(hits.values())
    if hits:
        dirty.append(p.name)
    label = ", ".join(f"{k}={v}" for k, v in hits.items()) or "clean"
    print(f"{p.name:40} {p.stat().st_size:>10,}  {label}")

print()
print(f"TOTAL retired-name occurrences: {total}")
print(f"DIRTY artifacts ({len(dirty)}): {dirty}")
sys.exit(0)
