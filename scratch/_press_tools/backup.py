"""Create PRE_PRESSKIT_2026-08-29 backups for every file this task edits."""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TAG = "PRE_PRESSKIT_2026-08-29"

TARGETS = [
    "scripts/generate_press_kit.py",
    "scripts/check-page-counts.mjs",
    "production_staging/_scripts_from_windows/generate_omnibus_interior_HC_CURRENT.py",
]

PDFS = [
    "Masters_X_Press_Release.pdf",
    "Masters_X_Fact_Sheet.pdf",
    "Holloway_Author_Bios.pdf",
    "Masters_X_Synopses.pdf",
    "Masters_X_Press_Kit.pdf",
]
PDF_DIRS = ["public/press-kit", "out/press-kit", "seventhcitypress/public/press-kit"]

EXTRACTS = [
    "Holloway_Author_Bios.txt",
    "Masters_X_Fact_Sheet.txt",
    "Masters_X_Press_Kit.txt",
    "Masters_X_Press_Release.txt",
    "Masters_X_Synopses.txt",
]


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def back_up(rel: str) -> None:
    src = ROOT / rel
    if not src.exists():
        print(f"MISSING  {rel}")
        return
    dst = src.with_name(f"{src.stem}.{TAG}{src.suffix}.bak")
    if dst.exists():
        print(f"exists   {dst.relative_to(ROOT).as_posix()}")
        return
    shutil.copy2(src, dst)
    ok = sha(src) == sha(dst)
    print(f"{'OK  ' if ok else 'FAIL'}  {dst.relative_to(ROOT).as_posix()}  {sha(dst)[:16]}")


for rel in TARGETS:
    back_up(rel)
for d in PDF_DIRS:
    for name in PDFS:
        back_up(f"{d}/{name}")
for name in EXTRACTS:
    back_up(f"scratch/press_extract/{name}")
