"""Closing checks: production_staging binaries untouched, outputs in place."""

from __future__ import annotations

import datetime as dt
import hashlib
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASELINE = ROOT / "scratch" / "_baseline_binaries.json"

print("== production_staging binary integrity (23 files: SHA256 + size + mtime) ==")
baseline = {r["path"]: r for r in json.load(BASELINE.open(encoding="utf-8"))}

current = {}
for dirpath, _dirs, files in os.walk(ROOT / "production_staging"):
    for name in files:
        if name.lower().endswith((".docx", ".pdf", ".epub")):
            p = Path(dirpath) / name
            st = p.stat()
            rel = p.relative_to(ROOT).as_posix()
            current[rel.replace("/", "\\")] = {
                "sha256": hashlib.sha256(p.read_bytes()).hexdigest(),
                "size": st.st_size,
                "mtime": st.st_mtime,
            }

drift = []
for path, base in baseline.items():
    now = current.get(path)
    if now is None:
        drift.append(f"MISSING  {path}")
        continue
    for field in ("sha256", "size", "mtime"):
        if now[field] != base[field]:
            drift.append(f"{field.upper()} CHANGED  {path}: {base[field]} -> {now[field]}")
added = set(current) - set(baseline)
for path in sorted(added):
    drift.append(f"ADDED    {path}")

print(f"  baseline files : {len(baseline)}")
print(f"  current files  : {len(current)}")
print(f"  drift          : {len(drift)}")
for line in drift:
    print(f"    {line}")
print(f"  RESULT: {'all 23 unchanged in sha256, size and mtime' if not drift else 'DRIFT DETECTED'}")

print("\n== press-kit outputs, all three trees ==")
NAMES = [
    "Masters_X_Press_Release.pdf",
    "Masters_X_Fact_Sheet.pdf",
    "Holloway_Author_Bios.pdf",
    "Masters_X_Synopses.pdf",
    "Masters_X_Press_Kit.pdf",
]
DIRS = ["public/press-kit", "out/press-kit", "seventhcitypress/public/press-kit"]
for name in NAMES:
    row = []
    for d in DIRS:
        p = ROOT / d / name
        row.append(hashlib.sha256(p.read_bytes()).hexdigest()[:12] if p.exists() else "ABSENT")
    p = ROOT / DIRS[0] / name
    mtime = dt.datetime.fromtimestamp(p.stat().st_mtime).strftime("%Y-%m-%d %H:%M:%S")
    print(f"  {name:<32} {row[0]}  identical={len(set(row)) == 1}  {mtime}")

print("\n== no backup files under any published tree ==")
for tree in ["public", "out", "seventhcitypress/public"]:
    bad = [
        p.relative_to(ROOT).as_posix()
        for p in (ROOT / tree).rglob("*")
        if p.is_file() and (".PRE_" in p.name or p.name.endswith(".bak"))
    ]
    print(f"  {tree:<24} {len(bad)} backup file(s) {bad}")

print("\n== backups retained ==")
for pattern in ["scripts/*.PRE_PRESSKIT*", "production_staging/_scripts_from_windows/*.PRE_PRESSKIT*",
                "scratch/press_extract/*.PRE_PRESSKIT*", "scratch/press_kit_backups_2026-08-29/*"]:
    for p in sorted(ROOT.glob(pattern)):
        print(f"  {p.relative_to(ROOT).as_posix()}")
