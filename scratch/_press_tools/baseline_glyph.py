"""Baseline / re-verify every DOCX, PDF and EPUB under production_staging/.

Writes a JSON manifest on `--write`; compares against it on `--check`.
The five press-kit PDFs live outside production_staging and are not covered.
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STAGING = ROOT / "production_staging"
MANIFEST = ROOT / "scratch" / "_press_tools" / "baseline_glyph_2026-08-29.json"
EXTS = {".docx", ".pdf", ".epub"}


def scan() -> dict[str, dict]:
    out: dict[str, dict] = {}
    for p in sorted(STAGING.rglob("*")):
        if not p.is_file() or p.suffix.lower() not in EXTS:
            continue
        st = p.stat()
        out[p.relative_to(ROOT).as_posix()] = {
            "sha256": hashlib.sha256(p.read_bytes()).hexdigest(),
            "size": st.st_size,
            "mtime": round(st.st_mtime, 3),
        }
    return out


now = scan()

if "--write" in sys.argv:
    MANIFEST.write_text(json.dumps(now, indent=2), encoding="utf-8", newline="\n")
    print(f"baselined {len(now)} files -> {MANIFEST.relative_to(ROOT).as_posix()}")
    for k, v in now.items():
        print(f"  {v['sha256'][:16]}  {v['size']:>9}  {v['mtime']}  {k}")
else:
    before = json.loads(MANIFEST.read_text(encoding="utf-8"))
    added = sorted(set(now) - set(before))
    removed = sorted(set(before) - set(now))
    changed = [
        k for k in sorted(set(before) & set(now))
        if before[k] != now[k]
    ]
    print(f"baseline files: {len(before)}   now: {len(now)}")
    print(f"  added   : {added or 'none'}")
    print(f"  removed : {removed or 'none'}")
    print(f"  changed : {changed or 'none'}")
    for k in sorted(set(before) & set(now)):
        b, n = before[k], now[k]
        same = "IDENTICAL" if b == n else "DIFFERS  "
        print(f"  {same}  sha={b['sha256'][:16]}  size={b['size']:>9}  mtime={b['mtime']}  {k}")
    print(
        "\nRESULT: "
        + ("all production_staging binaries unchanged" if not (added or removed or changed)
           else "CHANGE DETECTED")
    )
