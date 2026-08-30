"""Prove generate_press_kit.py refuses to run without a usable catalog.

The generator is copied into a temporary tree so the real
lib/data/ingram-catalog.json is never modified. All three failures happen at
import time, before any PDF is written or copied to ~/Downloads.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "scripts" / "generate_press_kit.py"
REAL = json.loads((ROOT / "lib" / "data" / "ingram-catalog.json").read_text(encoding="utf-8"))


def run_case(label: str, write_catalog) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        tree = Path(tmp)
        (tree / "scripts").mkdir()
        shutil.copy2(SRC, tree / "scripts" / "generate_press_kit.py")
        (tree / "lib" / "data").mkdir(parents=True)
        write_catalog(tree / "lib" / "data" / "ingram-catalog.json")
        proc = subprocess.run(
            [sys.executable, str(tree / "scripts" / "generate_press_kit.py")],
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
        out = (proc.stdout + proc.stderr).strip().replace(str(tree), "<TMP>")
        print(f"--- {label}")
        print(f"    exit={proc.returncode}")
        for line in out.splitlines():
            print(f"    {line}")
        made = list((tree / "public").rglob("*.pdf")) if (tree / "public").exists() else []
        print(f"    pdfs written: {len(made)}")
        print()


run_case("A: catalog missing", lambda p: None)

run_case(
    "B: catalog unparseable",
    lambda p: p.write_text('{"editions": [ trailing garbage', encoding="utf-8"),
)


def drop_omnibus(path: Path) -> None:
    trimmed = dict(REAL)
    trimmed["editions"] = [
        e for e in REAL["editions"] if e.get("isbn") != "9798295884412"
    ]
    path.write_text(json.dumps(trimmed), encoding="utf-8")


run_case("C: catalog missing the omnibus hardcover ISBN", drop_omnibus)

run_case("D: editions present but empty", lambda p: p.write_text('{"editions": []}', encoding="utf-8"))
