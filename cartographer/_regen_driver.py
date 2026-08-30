#!/usr/bin/env python3
"""Regenerate cartographer artifacts from the CORRECT corpus source.

TRAP 2 (cartographer/REGEN_2026-08-29.md, cartographer/README.md)
----------------------------------------------------------------
phase1_normalize.mjs hardcodes its input to

    corpus_raw/omnibus_v8_fulltext.txt

which is the PRE-GEO-FIX omnibus. The geo fixes were applied by phase8 directly
to corpus/ and never written back into the raw file, so running phase1 against
the default input REVERTS 39 geographic corrections (Picture Cave flips from
Warren County back to Washington County, and 38 more).

There is no environment override for that input path, so this driver does what
the previous regeneration did: it builds a SANDBOX cartographer root whose
corpus_raw/omnibus_v8_fulltext.txt is the geo-fixed omnibus, runs phase1 there,
and promotes ONLY the artifacts. The live corpus/ is never written to.

The sandbox is a sibling of cartographer/ because phase1 resolves
REPO = ROOT/.. to locate the audiobook slug directory.

WHAT RUNS WHERE
    phase1  sandbox   -> corpus_clean.jsonl, line_mapping.jsonl, scene_manifest.csv
    phase2  in place  -> entities.csv, entity_frequency.csv, gate2_report.json
    phase3  in place  -> entity_classified_seed.json, phase3_packs.json, phase3_chunk_*.json

phase2 reads the live corpus, which is already geo-, canon-, SUB-BOOK- and
name-correct, and writes nothing into corpus/.
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
CARTO = REPO / "cartographer"
SANDBOX = REPO / "_cartographer_regen"
GEO_FIXED = REPO / "production_staging/_sources/OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt"
STAMP = "PRE_REGEN_2026-08-29b"

PROMOTE = ["corpus_clean.jsonl", "line_mapping.jsonl", "scene_manifest.csv"]


def run(script: Path, root: Path, label: str) -> None:
    print(f"\n{'-' * 76}\n{label}\n{'-' * 76}")
    env = {k: v for k, v in os.environ.items() if not k.startswith("BUILD_")}
    env["CARTOGRAPHER_ROOT"] = str(root)
    r = subprocess.run(
        ["node", str(script)], env=env, cwd=str(REPO),
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    print((r.stdout or "").strip()[:3000])
    if r.returncode != 0:
        print("*** STDERR ***")
        print((r.stderr or "")[-3000:])
        raise SystemExit(f"{label} failed rc={r.returncode}")


def backup(p: Path) -> None:
    if p.is_file():
        b = p.with_suffix(p.suffix + f".{STAMP}.bak")
        if not b.exists():
            shutil.copy2(p, b)


# --------------------------------------------------------------------- phase 1
print("=" * 76)
print("PHASE 1  (sandbox, input = OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt)")
print("=" * 76)

if SANDBOX.exists():
    shutil.rmtree(SANDBOX)
(SANDBOX / "corpus_raw").mkdir(parents=True)
(SANDBOX / "corpus").mkdir()
(SANDBOX / "artifacts").mkdir()
shutil.copytree(CARTO / "scripts", SANDBOX / "scripts")
shutil.copy2(GEO_FIXED, SANDBOX / "corpus_raw/omnibus_v8_fulltext.txt")

geo_txt = GEO_FIXED.read_text(encoding="utf-8", errors="replace")
print(f"sandbox input: {GEO_FIXED.name}  {GEO_FIXED.stat().st_size:,} B")
print(f"  geo-fix probe 'Warren County' present: {'Warren County' in geo_txt}")
print(f"  trap check - this is NOT corpus_raw/omnibus_v8_fulltext.txt")

run(SANDBOX / "scripts/phase1_normalize.mjs", SANDBOX, "phase1_normalize.mjs (sandbox)")

# Promote only the three artifacts. corpus/, seed_xref.json and gate1_report.json
# are deliberately NOT promoted (REGEN_2026-08-29.md "Deliberately NOT regenerated":
# regenerating the seed crosswalk resolves only 14 of 25 seeds because the Section 4
# seed citations anchor to prose the geo fixes rewrote).
print("\npromoting phase1 artifacts:")
for name in PROMOTE:
    src = SANDBOX / "artifacts" / name
    dst = CARTO / "artifacts" / name
    backup(dst)
    shutil.copy2(src, dst)
    print(f"  {name:24} {dst.stat().st_size:>12,} B")
print("  NOT promoted: corpus/ (live corpus untouched), seed_xref.json, gate1_report.json")

# --------------------------------------------------------------------- phase 2
print("\n" + "=" * 76)
print("PHASE 2  (in place, reads live corpus/)")
print("=" * 76)
for name in ["entities.csv", "entity_frequency.csv", "gate2_report.json"]:
    backup(CARTO / "artifacts" / name)
run(CARTO / "scripts/phase2_concordance.mjs", CARTO, "phase2_concordance.mjs")

# --------------------------------------------------------------------- phase 3
print("\n" + "=" * 76)
print("PHASE 3 PREPARE  (deterministic, code-only)")
print("=" * 76)
for p in (CARTO / "artifacts").glob("phase3_chunk_*.json"):
    backup(p)
for name in ["entity_classified_seed.json", "phase3_packs.json"]:
    backup(CARTO / "artifacts" / name)
run(CARTO / "scripts/phase3_prepare.mjs", CARTO, "phase3_prepare.mjs")

print("\nDONE")
