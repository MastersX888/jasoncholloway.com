"""Record the state of the five press-kit filenames in ~/Downloads."""

from __future__ import annotations

import datetime as dt
import hashlib
import sys
from pathlib import Path

DOWNLOADS = Path.home() / "Downloads"
NAMES = [
    "Masters_X_Press_Release.pdf",
    "Masters_X_Fact_Sheet.pdf",
    "Holloway_Author_Bios.pdf",
    "Masters_X_Synopses.pdf",
    "Masters_X_Press_Kit.pdf",
]

print(f"[{sys.argv[1] if len(sys.argv) > 1 else 'probe'}] {DOWNLOADS}")
for name in NAMES:
    p = DOWNLOADS / name
    if not p.exists():
        print(f"  ABSENT   {name}")
        continue
    b = p.read_bytes()
    mtime = dt.datetime.fromtimestamp(p.stat().st_mtime).isoformat(timespec="seconds")
    print(f"  present  {name}  {len(b):>7} bytes  sha={hashlib.sha256(b).hexdigest()[:16]}  mtime={mtime}")
