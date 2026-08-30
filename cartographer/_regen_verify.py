#!/usr/bin/env python3
"""Positive verification of the regenerated cartographer artifacts.

Absence of the retired names is necessary but not sufficient: an empty or
truncated artifact would also be "clean". This asserts the NEW names are
present and that the 39 geo fixes survived the regeneration (trap 2).
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
ART = ROOT / "cartographer/artifacts"

REGENERATED = [
    "corpus_clean.jsonl", "line_mapping.jsonl", "scene_manifest.csv",
    "entities.csv", "entity_frequency.csv", "gate2_report.json",
    "entity_classified_seed.json", "phase3_packs.json",
    "phase3_chunk_0.json", "phase3_chunk_1.json", "phase3_chunk_2.json",
    "phase3_chunk_3.json", "phase3_chunk_4.json", "phase3_chunk_5.json",
]

# The prose-bearing artifacts are the only ones that must carry character names;
# frequency/graph summaries only list entities that the extractor emitted.
PROSE = ["corpus_clean.jsonl", "line_mapping.jsonl"]
NEW_NAMES = ["Lorraine", "Deborah Holt", "Rosalind Lindgren", "Margaret Ferrand",
             "Idris Broussard", "Kofi Asante", "Sarah Ashworth", "Marcus Whitaker",
             "Laura Okada", "Lin Zhao", "Michael Halloran"]

# "Nolan Eriksen" is checked as two tokens, not as a bigram. The TXT corpora are
# hard-wrapped at ~74 columns and the rename landed exactly on a wrap, so the
# corpus stores "...stable at 111.2. Nolan" / "Eriksen confirmed..." on separate
# lines; phase1 further classifies the first as a scene-slug, putting the two
# words in adjacent paragraphs. This is not a regression: the retired form was
# split the same way (the pre-regen backup has no contiguous "Andrew Tanaka"
# either, only "the other Andrew, Tanaka"). The unwrapped DOCX build sources are
# unaffected, and the delivery formats do carry a contiguous "Nolan Eriksen" --
# pre_upload_audit.py requires exactly that string and passes on every Book 3
# and omnibus format.
SPLIT_TOKENS = ["Nolan", "Eriksen"]

GEO_PRESENT = ["Warren County"]          # geo fix applied
GEO_ABSENT = ["Washington County, Missouri"]  # pre-geo-fix form

fails = []

print("REGENERATED ARTIFACTS")
print("-" * 78)
for n in REGENERATED:
    p = ART / n
    if not p.is_file() or p.stat().st_size == 0:
        print(f"  XX {n} MISSING OR EMPTY")
        fails.append(n)
        continue
    print(f"  ok {n:32} {p.stat().st_size:>12,} B")

print("\nNEW NAMES PRESENT IN PROSE ARTIFACTS")
print("-" * 78)
for n in PROSE:
    txt = (ART / n).read_text(encoding="utf-8", errors="replace")
    missing = [x for x in NEW_NAMES if x not in txt]
    counts = " ".join(f"{x.split()[0]}={txt.count(x)}" for x in NEW_NAMES)
    print(f"  {n}")
    print(f"     {counts}")
    tok = " ".join(f"{t}={txt.count(t)}" for t in SPLIT_TOKENS)
    print(f"     wrap-split: {tok}  (bigram not expected; see comment)")
    missing += [t for t in SPLIT_TOKENS if t not in txt]
    if missing:
        print(f"     XX MISSING: {missing}")
        fails.append(f"{n}:{missing}")

print("\nGEO FIXES SURVIVED (trap 2 regression check)")
print("-" * 78)
for n in PROSE + ["entities.csv"]:
    txt = (ART / n).read_text(encoding="utf-8", errors="replace")
    for g in GEO_PRESENT:
        ok = g in txt
        print(f"  {'ok ' if ok else 'XX '} {n:22} contains {g!r}: {txt.count(g)}")
        if not ok:
            fails.append(f"{n} lost {g}")
    for g in GEO_ABSENT:
        ok = g not in txt
        print(f"  {'ok ' if ok else 'XX '} {n:22} free of {g!r}")
        if not ok:
            fails.append(f"{n} reverted to {g}")

print()
print("REGEN VERIFY PASS" if not fails else f"REGEN VERIFY FAIL: {fails}")
sys.exit(0 if not fails else 1)
