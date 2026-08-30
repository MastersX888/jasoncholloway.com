"""Restore scripts/generate_press_kit.py to LF endings and its expected digest."""

from __future__ import annotations

import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GEN = ROOT / "scripts" / "generate_press_kit.py"
EXPECTED = "43bba31499261cd3be634fb94e0603e7706b2ac918408078d87511122235ce41"

raw = GEN.read_bytes()
print(f"before: sha={hashlib.sha256(raw).hexdigest()}  CRLF={raw.count(b'\\r\\n')}  LF={raw.count(b'\\n')}")

GEN.write_bytes(raw.replace(b"\r\n", b"\n"))

raw = GEN.read_bytes()
digest = hashlib.sha256(raw).hexdigest()
print(f"after : sha={digest}  CRLF={raw.count(b'\\r\\n')}  LF={raw.count(b'\\n')}")
print(f"matches pre-corruption baseline: {digest == EXPECTED}")
print(f"compiles: {bool(compile(raw.decode('utf-8'), str(GEN), 'exec'))}")
