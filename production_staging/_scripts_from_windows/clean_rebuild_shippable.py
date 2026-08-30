#!/usr/bin/env python3
"""Clean-room rebuild of the omnibus print interiors and the three retail EPUBs.

Scope (the five artifacts built here):
    omnibus HC  9798295884412  interior.pdf   canon 684 (680 from generator + 4 pad)
    omnibus PB  9798256072704  interior.pdf   canon 732
    Book 1 EPUB 9798256008819
    Book 2 EPUB 9798256009625
    Book 3 EPUB 9798256009809

NOTHING IS BLOCKED ON PAGE COUNT
--------------------------------
An earlier version of this docstring said the individual Books 1-3 print interiors were
"blocked on the pre-existing +7 HC / +11 PB page-count drift and are not cleared to
ship". That drift report was a comparison against the stale pre-geo-fix canon figures,
not a regression, and it was retracted on 2026-08-29. Graded against the LIVE
IngramSpark counts, all six individual interiors match exactly, 6 of 6:

    B1 HC 163 / PB 189    B2 HC 225 / PB 271    B3 HC 177 / PB 205

All eight print titles and all three EPUBs are cleared. No title needs spine or cover
rework. The individual Books 1-3 interiors are simply built by a different driver,
_rebuild_individual_interiors.py, which grades them against those live counts; this
script covers the omnibus pair and the EPUBs.

WHY A DRIVER RATHER THAN SHELL VARIABLES
----------------------------------------
generate_epubs_v1.py and the interior generators read BUILD_* from os.environ at
module import. On 2026-08-29 a leaked BUILD_OUTPUT caused an EPUB to be written over
the omnibus paperback interior.pdf. Every job below gets an environment built from
scratch with all BUILD_* keys stripped, so nothing can be inherited.
"""

from __future__ import annotations

import hashlib
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"
SCRIPTS = STAGE / "_scripts_from_windows"
EPUB_BUILD = STAGE / "_epub_build"
STAMP = "PRE_REBUILD_2026-08-29b"

OMNIBUS = [
    ("HC", "generate_omnibus_interior_HC_CURRENT.py", "9798295884412",
     "omnibus/9798295884412_HC/interior.pdf", 684, 680),
    ("PB", "generate_omnibus_interior_PB_CURRENT.py", "9798256072704",
     "omnibus/9798256072704_PB/interior.pdf", 732, 732),
]

RETAIL_EPUBS = [
    ("9798256008819", "b1_inheritance/9798256008819_EPUB/9798256008819.epub"),
    ("9798256009625", "b2_grimoire/9798256009625_EPUB/9798256009625.epub"),
    ("9798256009809", "b3_kingdom/9798256009809_EPUB/9798256009809.epub"),
]


def clean_env(**extra: str) -> dict[str, str]:
    env = {k: v for k, v in os.environ.items() if not k.startswith("BUILD_")}
    env["PYTHONIOENCODING"] = "utf-8"
    env.update(extra)
    return env


def run(script: Path, env: dict[str, str], label: str, argv: list[str] | None = None) -> bool:
    print(f"\n{'-' * 76}\n{label}\n{'-' * 76}")
    print(f"   BUILD_OUTPUT = {env.get('BUILD_OUTPUT', '<unset -> generator default>')}")
    r = subprocess.run(
        [sys.executable, "-u", str(script)] + (argv or []),
        env=env, cwd=str(ROOT), capture_output=True,
        text=True, encoding="utf-8", errors="replace",
    )
    for ln in (r.stdout or "").splitlines():
        if any(k in ln for k in ("TOTAL PAGES", "Pages:", "Built", "validate", "padded",
                                 "already at canon", "REFUSING", "Error", "Traceback")):
            print("   " + ln.strip())
    if r.returncode != 0:
        print(f"   *** FAILED rc={r.returncode}")
        print((r.stderr or "")[-1500:])
        return False
    return True


def backup(p: Path) -> None:
    if p.is_file():
        b = p.with_suffix(p.suffix + f".{STAMP}.bak")
        if not b.exists():
            shutil.copy2(p, b)


def sha(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def kind(p: Path) -> str:
    head = p.read_bytes()[:4]
    return "PDF" if head == b"%PDF" else "ZIP" if head[:2] == b"PK" else "???"


ok = True

print("=" * 76)
print("STEP 1 / 3  OMNIBUS PRINT INTERIORS")
print("=" * 76)
for label, script, isbn, rel, canon, expect_raw in OMNIBUS:
    out = STAGE / rel
    backup(out)
    ok &= run(
        SCRIPTS / script,
        clean_env(BUILD_ISBN=isbn, BUILD_IMPRINT="Seventh City Press",
                  BUILD_AUTHOR="Jason Carroll Holloway", BUILD_OUTPUT=str(out)),
        f"omnibus {label}  {isbn}  (generator should emit {expect_raw}; canon {canon})",
    )

print("\n" + "=" * 76)
print("STEP 2 / 3  MANDATORY HARDCOVER PADDING 680 -> 684")
print("=" * 76)
ok &= run(SCRIPTS / "pad_omnibus_hc_to_canon.py", clean_env(),
          "pad_omnibus_hc_to_canon.py")

print("\n" + "=" * 76)
print("STEP 3 / 3  RETAIL EPUBS (all three) + STAGING")
print("=" * 76)
ok &= run(SCRIPTS / "generate_epubs_v1.py", clean_env(),
          "generate_epubs_v1.py  (no ISBN arg -> builds and validates all three)")

for isbn, rel in RETAIL_EPUBS:
    src = EPUB_BUILD / f"{isbn}.epub"
    dst = STAGE / rel
    if not src.is_file():
        print(f"   *** missing build output {src}")
        ok = False
        continue
    backup(dst)
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    print(f"   staged {isbn}.epub -> {rel}")

print("\n" + "=" * 76)
print("UPLOAD MANIFEST")
print("=" * 76)
print(f"{'artifact':46} {'type':5} {'bytes':>11}  sha256[:16]")
print("-" * 76)
manifest = [(STAGE / rel, f"omnibus {lbl} interior.pdf") for lbl, _, _, rel, _, _ in OMNIBUS]
manifest += [(STAGE / rel, f"EPUB {isbn}") for isbn, rel in RETAIL_EPUBS]
for p, desc in manifest:
    if not p.is_file():
        print(f"{desc:46} MISSING")
        ok = False
        continue
    print(f"{desc:46} {kind(p):5} {p.stat().st_size:>11,}  {sha(p)[:16]}")

print()
print("REBUILD OK" if ok else "REBUILD HAD FAILURES - do not upload")
sys.exit(0 if ok else 1)
