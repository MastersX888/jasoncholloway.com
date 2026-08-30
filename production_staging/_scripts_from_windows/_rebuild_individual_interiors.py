#!/usr/bin/env python3
"""Rebuild the six individual Book 1-3 print interiors in a BUILD_*-free environment.

clean_rebuild_shippable.py deliberately skips these: its docstring cites a
"+7 HC / +11 PB drift". That comparison was against the stale pre-geo-fix canon
numbers and has since been retracted in every STATUS.md. The authoritative
figures are the LIVE IngramSpark counts, used here.

batch_rebuild_books.py builds them, but it seeds each child from os.environ.copy()
and also still carries the stale canon constants in its summary line. This driver
strips every BUILD_* key from the child environment (trap 1) and grades against
the live counts instead.
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

import fitz

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
SCRIPTS = ROOT / "production_staging" / "_scripts_from_windows"
STAMP = "PRE_REBUILD_2026-08-29b"

# book, kind, script, isbn, folder_rel, width_in, height_in, LIVE pages
JOBS = [
    (1, "HC", "generate_book1_interior.py", "9798295800801",
     "b1_inheritance/9798295800801_HC", 6.14, 9.21, 163),
    (1, "PB", "generate_book1_interior_paperback.py", "9798256008048",
     "b1_inheritance/9798256008048_PB", 5.5, 8.5, 189),
    (2, "HC", "generate_book2_interior.py", "9798295812675",
     "b2_grimoire/9798295812675_HC", 6.14, 9.21, 225),
    (2, "PB", "generate_book2_interior_paperback.py", "9798256009953",
     "b2_grimoire/9798256009953_PB", 5.5, 8.5, 271),
    (3, "HC", "generate_book3_interior.py", "9798295812705",
     "b3_kingdom/9798295812705_HC", 6.14, 9.21, 177),
    (3, "PB", "generate_book3_interior_paperback.py", "9798256010072",
     "b3_kingdom/9798256010072_PB", 5.5, 8.5, 205),
]


def clean_env(**extra: str) -> dict[str, str]:
    env = {k: v for k, v in os.environ.items() if not k.startswith("BUILD_")}
    env["PYTHONIOENCODING"] = "utf-8"
    env.update(extra)
    return env


results = []
ok = True

for book, kind, script, isbn, folder, w, h, live in JOBS:
    out_dir = ROOT / "production_staging" / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    interior = out_dir / "interior.pdf"

    if interior.is_file():
        bak = interior.with_suffix(f".pdf.{STAMP}.bak")
        if not bak.exists():
            shutil.copy2(interior, bak)

    print(f"\n{'-' * 74}\nBOOK {book} {kind}  {isbn}  (live {live} pp)\n{'-' * 74}")
    env = clean_env(
        BUILD_ISBN=isbn,
        BUILD_IMPRINT="Seventh City Press",
        BUILD_AUTHOR="Jason Carroll Holloway",
        BUILD_OUTPUT=str(interior),
        BUILD_WIDTH_PT=str(w * 72),
        BUILD_HEIGHT_PT=str(h * 72),
    )
    r = subprocess.run(
        [sys.executable, "-u", str(SCRIPTS / script)],
        env=env, cwd=str(ROOT), capture_output=True,
        text=True, encoding="utf-8", errors="replace",
    )
    for ln in (r.stdout or "").splitlines():
        if any(k in ln for k in ("Pages:", "TOTAL PAGES", "Built", "Error", "Traceback")):
            print("   " + ln.strip())
    if r.returncode != 0:
        print(f"   *** FAILED rc={r.returncode}")
        print((r.stderr or "")[-2000:])
        ok = False
        results.append((book, kind, isbn, None, None, live, "FAIL"))
        continue

    d = fitz.open(interior)
    n, rect = d.page_count, d[0].rect
    d.close()
    trim = f"{rect.width/72:.2f}x{rect.height/72:.2f}"
    verdict = "PASS" if n == live else "DRIFT"
    if verdict == "DRIFT":
        ok = False
    print(f"   {verdict}  {n} pp (live {live})  trim {trim}  {interior.stat().st_size:,} B")
    results.append((book, kind, isbn, n, trim, live, verdict))

print(f"\n{'=' * 74}\nINDIVIDUAL INTERIOR SUMMARY  (graded vs LIVE IngramSpark counts)\n{'=' * 74}")
print(f"{'artifact':26} {'pages':>6} {'live':>6} {'trim':>10}  verdict")
for book, kind, isbn, n, trim, live, verdict in results:
    print(f"B{book} {kind} {isbn:16} {str(n):>6} {live:>6} {str(trim):>10}  {verdict}")
print()
print("ALL INTERIORS MATCH LIVE" if ok else "*** DRIFT OR FAILURE - STOP, DO NOT UPLOAD")
sys.exit(0 if ok else 1)
