"""Unified diff of a file against its PRE_PRESSKIT backup (all .py are gitignored here)."""

from __future__ import annotations

import difflib
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TAG = "PRE_PRESSKIT_2026-08-29"

rel = sys.argv[1]
new = ROOT / rel
old = new.with_name(f"{new.stem}.{TAG}{new.suffix}.bak")

diff = difflib.unified_diff(
    old.read_text(encoding="utf-8").splitlines(),
    new.read_text(encoding="utf-8").splitlines(),
    fromfile=f"a/{rel}  (backup)",
    tofile=f"b/{rel}",
    lineterm="",
    n=int(sys.argv[2]) if len(sys.argv) > 2 else 3,
)
for line in diff:
    print(line)
