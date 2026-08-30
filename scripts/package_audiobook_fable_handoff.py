#!/usr/bin/env python3
"""Stage and zip Masters X Omnibus audiobook handoff for Fable."""

from __future__ import annotations

import os
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "audiobook_fable_handoff"
STAGING = HANDOFF / "package"
ZIP_PATH = HANDOFF / "masters-x-omnibus-audiobook-fable-handoff.zip"
DOWNLOADS_ZIP = Path.home() / "Downloads" / "masters-x-omnibus-audiobook-fable-handoff.zip"

OMNIBUS_PDF = Path(r"C:\Users\zh577\Desktop\OMNIBUS_FINAL_FILES\INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf")

HANDOFF_DOCS = [
    "FABLE_AUDIOBOOK_PROMPT.md",
    "ELEVENLABS_SCRIPT_SPEC.md",
    "PRONUNCIATION_AND_NARRATION_GUIDE.md",
    "OMNIBUS_NARRATION_STRUCTURE.md",
    "KNOWN_ISSUES_AUDIOBOOK.md",
]

COPY_FILES = [
    "CANON.md",
    "scratch/extract_omnibus_text.py",
    "scripts/package_audiobook_fable_handoff.py",
    "encyclopedia_project/sources/omnibus_v8_fulltext.txt",
]

SKIP_UNDER = {"package", "__pycache__", ".git"}


def main() -> None:
    if STAGING.exists():
        shutil.rmtree(STAGING)
    STAGING.mkdir(parents=True, exist_ok=True)

    count = 0
    dest_handoff = STAGING / "audiobook_fable_handoff"
    dest_handoff.mkdir(parents=True, exist_ok=True)
    for doc in HANDOFF_DOCS:
        src = HANDOFF / doc
        if src.exists():
            shutil.copy2(src, dest_handoff / doc)
            count += 1

    for rel in COPY_FILES:
        src = ROOT / rel
        if src.exists():
            dest = STAGING / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            count += 1

    # Omnibus PDF
    pdf_dest_dir = STAGING / "sources"
    pdf_dest_dir.mkdir(parents=True, exist_ok=True)
    if OMNIBUS_PDF.exists():
        shutil.copy2(OMNIBUS_PDF, pdf_dest_dir / OMNIBUS_PDF.name)
        count += 1
    else:
        (pdf_dest_dir / "PDF_NOT_FOUND.txt").write_text(
            f"Expected PDF at:\n{OMNIBUS_PDF}\n",
            encoding="utf-8",
        )

    readme = """# Masters X Omnibus — Audiobook Handoff (Fable)

**Start here:** `audiobook_fable_handoff/FABLE_AUDIOBOOK_PROMPT.md`

## Contents
- Omnibus HC PDF (`sources/INTERIOR_MASTERS_X_OMNIBUS_HC_6x9_v8.pdf`)
- Pre-extracted text (`encyclopedia_project/sources/omnibus_v8_fulltext.txt`)
- ElevenLabs script spec + pronunciation guide + 77-chapter structure map
- `CANON.md`

## Return zip name
`masters-x-omnibus-audiobook-fable-RETURN.zip`

## Goal
77 plain-text chapter scripts ready for ElevenLabs PVC narration.
"""
    (STAGING / "README.md").write_text(readme, encoding="utf-8")

    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(STAGING.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(STAGING).as_posix())

    shutil.copy2(ZIP_PATH, DOWNLOADS_ZIP)
    size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    print(f"Staged {count} files")
    print(f"Wrote {ZIP_PATH} ({size_mb:.2f} MB)")
    print(f"Copied to {DOWNLOADS_ZIP}")


if __name__ == "__main__":
    main()
