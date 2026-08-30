#!/usr/bin/env python3
"""Stage all 14 post-name-change upload artifacts to the Desktop handoff folder.

Supersedes stage_upload_folder.py + stage_ebook_upload_folders.py for the
2026-08-29 round. Differences that matter:

  * Stages all 8 print interiors, including Book 2 HC/PB. The old script excluded
    Book 2 on the assertion that no Book 2 source was touched; the 4:47pm name
    pass rewrote 4 references in Book 2, so that assertion no longer holds.
  * Flat destination: one file per upload, no channel subfolders, so a retail
    EPUB can never be confused with its Kindle sibling.
  * Anything already in the destination is quarantined outside the folder first,
    so a stale file from an earlier run cannot survive.
  * Refuses to copy unless the source sha256 matches the pre-flight baseline.

Read-only with respect to production_staging/: sources are opened 'rb' only.
"""

from __future__ import annotations

import hashlib
import shutil
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"
DEST = Path(r"C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER_2026-08-29")
QUAR = Path(r"C:\Users\zh577\Desktop\_STALE_PRE_NAMEFIX_2026-08-29")
BASELINE = STAGE / "_SOURCE_BASELINE_BEFORE.txt"

# dest filename, source relpath, portal, pages ("-" for epub), label
JOBS = [
    ("9798295800801_HC_interior.pdf",
     "b1_inheritance/9798295800801_HC/interior.pdf", "Ingram", 163,
     "Vol I The Inheritance of Frequency - hardcover"),
    ("9798256008048_PB_interior.pdf",
     "b1_inheritance/9798256008048_PB/interior.pdf", "Ingram", 189,
     "Vol I The Inheritance of Frequency - paperback"),
    ("9798295812675_HC_interior.pdf",
     "b2_grimoire/9798295812675_HC/interior.pdf", "Ingram", 225,
     "Vol II The Grimoire - hardcover"),
    ("9798256009953_PB_interior.pdf",
     "b2_grimoire/9798256009953_PB/interior.pdf", "Ingram", 271,
     "Vol II The Grimoire - paperback"),
    ("9798295812705_HC_interior.pdf",
     "b3_kingdom/9798295812705_HC/interior.pdf", "Ingram", 177,
     "Vol III The Kingdom - hardcover"),
    ("9798256010072_PB_interior.pdf",
     "b3_kingdom/9798256010072_PB/interior.pdf", "Ingram", 205,
     "Vol III The Kingdom - paperback"),
    ("9798295884412_HC_interior.pdf",
     "omnibus/9798295884412_HC/interior.pdf", "Ingram", 684,
     "Masters X omnibus - hardcover (680 generated + 4 padded blanks)"),
    ("9798256072704_PB_interior.pdf",
     "omnibus/9798256072704_PB/interior.pdf", "Ingram", 732,
     "Masters X omnibus - paperback"),
    ("9798256008819_RETAIL.epub",
     "b1_inheritance/9798256008819_EPUB/9798256008819.epub", "Google Play", "-",
     "Vol I retail EPUB - dc:identifier = print ISBN"),
    ("9798256009625_RETAIL.epub",
     "b2_grimoire/9798256009625_EPUB/9798256009625.epub", "Google Play", "-",
     "Vol II retail EPUB - dc:identifier = print ISBN"),
    ("9798256009809_RETAIL.epub",
     "b3_kingdom/9798256009809_EPUB/9798256009809.epub", "Google Play", "-",
     "Vol III retail EPUB - dc:identifier = print ISBN"),
    ("9798256008819_KINDLE.epub",
     "b1_inheritance/9798256008819_KINDLE/9798256008819_KINDLE.epub", "KDP", "-",
     "Vol I Kindle EPUB - dc:identifier = urn:uuid, ISBN in dc:source"),
    ("9798256009625_KINDLE.epub",
     "b2_grimoire/9798256009625_KINDLE/9798256009625_KINDLE.epub", "KDP", "-",
     "Vol II Kindle EPUB - dc:identifier = urn:uuid, ISBN in dc:source"),
    ("9798256009809_KINDLE.epub",
     "b3_kingdom/9798256009809_KINDLE/9798256009809_KINDLE.epub", "KDP", "-",
     "Vol III Kindle EPUB - dc:identifier = urn:uuid, ISBN in dc:source"),
]

READMES = {"README_UPLOAD_2026-08-29.md", "README_EBOOKS_2026-08-29.md"}


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for c in iter(lambda: f.read(1 << 20), b""):
            h.update(c)
    return h.hexdigest()


def load_baseline() -> dict[str, str]:
    """relpath -> sha256, from the pre-flight baseline (PowerShell may emit UTF-16)."""
    raw = BASELINE.read_bytes()
    for enc in ("utf-16", "utf-8-sig", "utf-8"):
        try:
            txt = raw.decode(enc)
            if "\x00" not in txt:
                break
        except UnicodeDecodeError:
            continue
    else:
        raise SystemExit("cannot decode baseline")
    out = {}
    for line in txt.splitlines():
        parts = line.strip().split(None, 2)
        if len(parts) == 3 and len(parts[0]) == 64:
            out[parts[2].replace("\\", "/")] = parts[0].lower()
    return out


def main() -> int:
    base = load_baseline()
    print(f"baseline entries: {len(base)}")

    # 1. Pre-flight: source integrity against the baseline taken before any work.
    drift = []
    for _, rel, *_ in JOBS:
        src = STAGE / rel
        if not src.is_file():
            drift.append(f"{rel}: MISSING")
            continue
        want = base.get(rel)
        got = sha256(src)
        if want is None:
            drift.append(f"{rel}: not in baseline")
        elif want != got:
            drift.append(f"{rel}: sha drift {want[:16]} -> {got[:16]}")
    if drift:
        print("REFUSING TO STAGE - source drift detected:")
        for d in drift:
            print("  " + d)
        return 1
    print("pre-flight: all 14 sources match baseline\n")

    # 2. Quarantine whatever is already in the destination.
    DEST.mkdir(parents=True, exist_ok=True)
    moved = []
    if any(DEST.iterdir()):
        QUAR.mkdir(parents=True, exist_ok=True)
        for p in sorted(DEST.rglob("*")):
            if p.is_file():
                tgt = QUAR / p.relative_to(DEST)
                tgt.parent.mkdir(parents=True, exist_ok=True)
                shutil.move(str(p), str(tgt))
                moved.append(str(p.relative_to(DEST)))
        for d in sorted((p for p in DEST.rglob("*") if p.is_dir()), reverse=True):
            d.rmdir()
    print(f"quarantined {len(moved)} pre-existing file(s) -> {QUAR}")
    for m in moved:
        print("  " + m)
    print()

    # 3. Copy.
    rows = []
    for name, rel, portal, pages, label in JOBS:
        src, dst = STAGE / rel, DEST / name
        shutil.copy2(src, dst)
        rows.append((name, portal, pages, dst.stat().st_size,
                     sha256(src), sha256(dst), label))

    # 4. Verify the destination independently of the copy.
    problems = []
    for name, portal, pages, size, ssha, dsha, label in rows:
        if ssha != dsha:
            problems.append(f"{name}: sha mismatch src/dst")
        if size == 0:
            problems.append(f"{name}: zero bytes")
    present = {p.name for p in DEST.iterdir() if p.is_file()}
    expected = {j[0] for j in JOBS}
    extra = present - expected - READMES
    if extra:
        problems.append("unexpected files in destination: " + ", ".join(sorted(extra)))
    if present - READMES != expected:
        problems.append("destination artifact set != expected 14")
    subdirs = [p.name for p in DEST.iterdir() if p.is_dir()]
    if subdirs:
        problems.append("unexpected subdirectories: " + ", ".join(subdirs))

    print(f"{'file':<34} {'portal':<12} {'pages':>5} {'bytes':>10}  sha256[:16]")
    print("-" * 92)
    for name, portal, pages, size, ssha, dsha, label in rows:
        print(f"{name:<34} {portal:<12} {str(pages):>5} {size:>10,}  {dsha[:16]}")
    print("-" * 92)
    print(f"{len(rows)} artifacts staged, {sum(r[3] for r in rows):,} bytes total\n")

    # 5. Source artifacts must be untouched by all of the above.
    post_drift = [rel for _, rel, *_ in JOBS
                  if sha256(STAGE / rel) != base[rel]]
    print("post-copy source check: " +
          ("all 14 sources unchanged" if not post_drift
           else "DRIFT: " + ", ".join(post_drift)))
    if post_drift:
        problems.append("source drift after copy")

    print()
    if problems:
        print("STAGING FAILED")
        for p in problems:
            print("  " + p)
        return 1
    print("STAGING OK - 14/14 verified byte-identical, no stale files, no subfolders")
    return 0


if __name__ == "__main__":
    sys.exit(main())
