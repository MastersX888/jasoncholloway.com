"""Prove check-page-counts.mjs actually catches this generator's shape.

Writes a throwaway copy of the real generator into scripts/ with one stale
page count injected in the positional-table form, runs the gate, and deletes
the copy again in a finally block. The real generator is never modified.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
REAL = ROOT / "scripts" / "generate_press_kit.py"
PROBE = ROOT / "scripts" / "_gate_livefire_probe.py"

src = REAL.read_text(encoding="utf-8")
# 189 is the correct Vol I PB count; 178 is one of the eight stale figures.
needle = '("Paperback", "9798256008048", "$16.99"),'
assert needle in src, "generator shape changed; update the probe"
poisoned = src.replace(needle, '("Paperback", "9798256008048", "178", "$16.99"),')
assert poisoned != src

print("baseline: gate against the real tree")
r = subprocess.run(["node", "scripts/check-page-counts.mjs"], cwd=ROOT,
                   capture_output=True, text=True, encoding="utf-8", shell=True)
print(f"  exit={r.returncode}  {r.stdout.strip()}")

try:
    PROBE.write_text(poisoned, encoding="utf-8", newline="\n")
    print(f"\nwrote {PROBE.relative_to(ROOT).as_posix()} with stale count 178 next to ISBN 9798256008048")
    r = subprocess.run(["node", "scripts/check-page-counts.mjs"], cwd=ROOT,
                       capture_output=True, text=True, encoding="utf-8", shell=True)
    print(f"  exit={r.returncode}  (expected non-zero)")
    out = (r.stdout + r.stderr).strip()
    for line in out.splitlines():
        if line.strip():
            print(f"    {line}")
    caught = r.returncode != 0 and "_gate_livefire_probe.py" in out
    print(f"\n  gate caught the poisoned generator: {caught}")
finally:
    if PROBE.exists():
        PROBE.unlink()
    print(f"  removed probe: {not PROBE.exists()}")

r = subprocess.run(["node", "scripts/check-page-counts.mjs"], cwd=ROOT,
                   capture_output=True, text=True, encoding="utf-8", shell=True)
print(f"\nafter cleanup: exit={r.returncode}  {r.stdout.strip()}")
print(f"real generator untouched: {REAL.read_text(encoding='utf-8') == src}")
