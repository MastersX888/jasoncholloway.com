"""Prove the extended page-count gate both ways.

For each way a stale page count can be written into a Python generator, corrupt
the real file, run the real gate, restore, and confirm the restore is
byte-identical. Every gate invocation is the actual prebuild command.
"""

from __future__ import annotations

import hashlib
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GEN = ROOT / "scripts" / "generate_press_kit.py"
GATE = ROOT / "scripts" / "check-page-counts.mjs"
GATE_BAK = ROOT / "scripts" / "check-page-counts.PRE_PRESSKIT_2026-08-29.mjs.bak"
PROBE = ROOT / "scripts" / "_gate_probe_extension_only.mjs"


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def run(script: Path) -> tuple[int, str]:
    proc = subprocess.run(
        ["node", str(script)], capture_output=True, text=True, encoding="utf-8", cwd=ROOT
    )
    return proc.returncode, (proc.stdout + proc.stderr).rstrip()


def banner(text: str) -> None:
    print(f"\n{'=' * 78}\n{text}\n{'=' * 78}")


CASES = [
    (
        "SHAPE 1 - unlabelled column (the shape that shipped the incident)",
        '            ("Paperback", "9798256008048", "$16.99"),',
        '            ("Paperback", "9798256008048", "178", "$16.99"),',
    ),
    (
        "SHAPE 2 - prose page count far from any ISBN",
        'f"All three volumes collected in a single edition: {OMNIBUS_HC_PAGES} pages (hardcover)',
        '"All three volumes collected in a single edition: 686 pages (hardcover)',
    ),
    (
        "SHAPE 3 - prose page count with HTML-entity spacing",
        'f"Omnibus paperback {OMNIBUS_PB_PAGES}&nbsp;pp (5.5&nbsp;×&nbsp;8.5&nbsp;in); "',
        '"Omnibus paperback 734&nbsp;pp (5.5&nbsp;×&nbsp;8.5&nbsp;in); "',
    ),
]

ORIGINAL = GEN.read_text(encoding="utf-8")
ORIGINAL_SHA = sha(GEN)
print(f"generate_press_kit.py baseline sha256 = {ORIGINAL_SHA}")

banner("BASELINE: gate on the clean tree")
code, out = run(GATE)
print(out)
print(f"exit={code}")

for label, find, replace in CASES:
    banner(label)
    assert ORIGINAL.count(find) == 1, f"anchor not unique: {find!r}"
    GEN.write_text(ORIGINAL.replace(find, replace), encoding="utf-8", newline="\n")
    print(f"corrupted line -> {replace.strip()}\n")
    code, out = run(GATE)
    print(out)
    print(f"exit={code}")

    if label.startswith("SHAPE 1"):
        # Would adding .py to SCAN_EXTENSIONS alone have caught this? Run the
        # pre-existing gate with nothing changed but the extension list.
        probe_src = GATE_BAK.read_text(encoding="utf-8").replace(
            '  ".xml",\n]);', '  ".xml",\n  ".py",\n]);', 1
        )
        PROBE.write_text(probe_src, encoding="utf-8")
        print("\n-- same corruption, gate with ONLY .py added to SCAN_EXTENSIONS --")
        pcode, pout = run(PROBE)
        print(pout)
        print(f"exit={pcode}   <- {'MISSES the defect' if pcode == 0 else 'catches it'}")
        PROBE.unlink()

    GEN.write_text(ORIGINAL, encoding="utf-8", newline="\n")
    restored = sha(GEN)
    print(f"\nrestored: sha256={restored}  byte-identical={restored == ORIGINAL_SHA}")

banner("AFTER RESTORE: gate on the clean tree")
code, out = run(GATE)
print(out)
print(f"exit={code}")
print(f"\ngenerate_press_kit.py final sha256 = {sha(GEN)}  unchanged={sha(GEN) == ORIGINAL_SHA}")
print(f"probe file removed: {not PROBE.exists()}")
