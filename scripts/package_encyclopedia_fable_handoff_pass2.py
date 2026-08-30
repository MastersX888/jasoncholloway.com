#!/usr/bin/env python3
"""Stage and zip Masters X Encyclopedia Fable Pass 2 handoff (Rev. 3 two-product)."""

from __future__ import annotations

import os
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "encyclopedia_fable_handoff"
STAGING = HANDOFF / "package_pass2"
ZIP_PATH = HANDOFF / "masters-x-encyclopedia-fable-pass2-handoff.zip"
DOWNLOADS_ZIP = Path.home() / "Downloads" / "masters-x-encyclopedia-fable-pass2-handoff.zip"

PASS2_DOCS = [
    "FABLE_PASS2_PROMPT.md",
    "KNOWN_ISSUES_PASS2.md",
    "PASS1_RETURN_REFERENCE.md",
    "HANDOFF_STATUS_PASS2.md",
]

COPY_DIRS = [
    ("encyclopedia_project", "encyclopedia_project"),
    ("universe_memory", "universe_memory"),
    ("design_memory", "design_memory"),
]

COPY_FILES = [
    "CANON.md",
    "encyclopedia_project/scripts/analyze_dictionary.py",
    "encyclopedia_project/scripts/typeset_letter_a_sample.py",
    "scripts/package_encyclopedia_fable_handoff_pass2.py",
]

# Explicit includes under encyclopedia_project
EXTRA_INCLUDES = [
    "encyclopedia_project/02_PUBLICATION_ARCHITECTURE_REV3.md",
    "encyclopedia_project/03_TWO_PRODUCT_TOC.md",
    "encyclopedia_project/sources/frequency_data/frequency_bands.json",
    "encyclopedia_project/sources/frequency_data/phoneme_formants.json",
    "encyclopedia_project/sources/frequency_data/names_db.json",
    "encyclopedia_project/sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx",
    "encyclopedia_project/output/print/LETTER_A_PAGINATION_REPORT.md",
    "encyclopedia_project/output/print/dictionary_letter_a_sample_8.5x11.pdf",
    "encyclopedia_project/output/print/DESIGN_TEAM_RECOMMENDATIONS.md",
    "encyclopedia_project/output/print/EDITION_B_COLLECTOR_SPEC.md",
    "encyclopedia_project/output/print/COVER_PHASE_HANDOFF.md",
]

EXCLUDED_SOURCES = {
    "encyclopedia_project/sources/resonant_frequency_dictionary.txt",
    "encyclopedia_project/sources/omnibus_v8_fulltext.txt",
    "encyclopedia_project/sources/annotated_v3_fulltext.txt",
}

EXCLUDED_PRINT = {
    "interior_7x10_EDITION_A.pdf",
    "interior_7x10_EDITION_B_COLLECTOR.pdf",
}

SKIP_UNDER = {
    "node_modules",
    ".next",
    "out",
    ".git",
    "__pycache__",
    "package",
    "package_pass2",
    "return",
}

SKIP_PATH_PARTS = [
    str(Path("encyclopedia_fable_handoff") / "package"),
    str(Path("encyclopedia_fable_handoff") / "package_pass2"),
    str(Path("website_elevation_handoff")),
    str(Path("app")),
    str(Path("public") / "folios"),
    str(Path("public") / "media"),
    str(Path("public") / "press-kit"),
    str(Path("output") / "marketing"),
]


def should_skip(path: Path) -> bool:
    parts = path.parts
    for skip in SKIP_PATH_PARTS:
        if skip in parts:
            return True
    if path.name in EXCLUDED_PRINT:
        return True
    return False


def copy_tree(src: Path, dst: Path, *, md_only: bool = False) -> int:
    count = 0
    if not src.exists():
        return 0
    for dirpath, dirnames, filenames in os.walk(src):
        dirnames[:] = [d for d in dirnames if d not in SKIP_UNDER]
        rel = Path(dirpath).relative_to(src)
        if should_skip(src / rel):
            dirnames.clear()
            continue
        for name in filenames:
            if md_only and not name.lower().endswith(".md"):
                continue
            s = Path(dirpath) / name
            if should_skip(s):
                continue
            rel_s = s.relative_to(src).as_posix()
            if rel_s in EXCLUDED_SOURCES:
                continue
            if name == "resonant_frequency_dictionary.txt":
                continue
            d = dst / rel / name
            d.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(s, d)
            count += 1
    return count


def write_external_assets(staging: Path) -> None:
    text = """# External Assets (Pass 2)

## Bundled in this zip

| Asset | Path |
|-------|------|
| Dictionary print master | `encyclopedia_project/sources/frequency_data/THE_RESONANT_FREQUENCY_DICTIONARY.docx` |
| Frequency tables JSON | `encyclopedia_project/sources/frequency_data/frequency_bands.json` |
| Phoneme / names companions | `phoneme_formants.json`, `names_db.json` |
| Letter A pagination proof | `encyclopedia_project/output/print/dictionary_letter_a_sample_8.5x11.pdf` |

## Not bundled (reference only)

| Asset | Path | Role |
|-------|------|------|
| Dictionary txt extract | `encyclopedia_project/sources/resonant_frequency_dictionary.txt` (~14 MB) | Grep/pipeline; use `.docx` for typesetting |
| Research library | `E:\\Research\\` | `universe_memory/01_RESEARCH_CATALOG.md` |
| Trilogy cover archive | `E:\\Masters_X_Trilogy_Archive\\` | Visual lineage |
| Omnibus print PDF | Desktop `OMNIBUS_FINAL_FILES\\` | Typography reference |

## Superseded Pass 1 assets (in repo, excluded from zip)

- `interior_7x10_EDITION_A.pdf` / `_B_COLLECTOR.pdf` — wrong trim/architecture
- `FABLE_ENCYCLOPEDIA_PROMPT.md` — use `FABLE_PASS2_PROMPT.md`
"""
    (staging / "EXTERNAL_ASSETS.md").write_text(text, encoding="utf-8")


def write_readme(staging: Path) -> None:
    text = """# Masters X Encyclopedia — Fable Pass 2 Handoff

**Start here:** `encyclopedia_fable_handoff/FABLE_PASS2_PROMPT.md`

## Quick context

- **Two products:** Companion (~400–450 pp) + Dictionary box set (~3,156 pp)
- **Trim:** 8.5 × 11 in
- **Printer:** BookVault Bespoke (primary)
- **Pass 1 PDFs:** typography reference only — wrong trim and architecture

## Read order

1. FABLE_PASS2_PROMPT.md
2. KNOWN_ISSUES_PASS2.md
3. PASS1_RETURN_REFERENCE.md
4. encyclopedia_project/02_PUBLICATION_ARCHITECTURE_REV3.md
5. encyclopedia_project/03_TWO_PRODUCT_TOC.md

Return zip as: `masters-x-encyclopedia-fable-pass2-RETURN.zip`
"""
    (staging / "README.md").write_text(text, encoding="utf-8")


def write_excluded_note(staging: Path) -> None:
    note = staging / "encyclopedia_project" / "sources" / "EXCLUDED_FROM_ZIP.txt"
    note.parent.mkdir(parents=True, exist_ok=True)
    note.write_text(
        "Excluded from Pass 2 handoff zip (available in author repo):\n"
        "- resonant_frequency_dictionary.txt (~14 MB one-line extract)\n"
        "- omnibus_v8_fulltext.txt, annotated_v3_fulltext.txt (large)\n"
        "- interior_7x10_*.pdf (superseded)\n\n"
        "Use THE_RESONANT_FREQUENCY_DICTIONARY.docx for dictionary typesetting.\n",
        encoding="utf-8",
    )


def main() -> None:
    if STAGING.exists():
        shutil.rmtree(STAGING)
    STAGING.mkdir(parents=True, exist_ok=True)

    total = 0
    for src_rel, dst_rel in COPY_DIRS:
        md_only = dst_rel == "design_memory"
        total += copy_tree(ROOT / src_rel, STAGING / dst_rel, md_only=md_only)

    for rel in COPY_FILES:
        src = ROOT / rel
        if src.exists():
            dest = STAGING / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            total += 1

    for rel in EXTRA_INCLUDES:
        src = ROOT / rel
        if src.exists():
            dest = STAGING / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            if not dest.exists():
                shutil.copy2(src, dest)
                total += 1

    handoff_dest = STAGING / "encyclopedia_fable_handoff"
    handoff_dest.mkdir(parents=True, exist_ok=True)
    for doc in PASS2_DOCS:
        src = HANDOFF / doc
        if src.exists():
            shutil.copy2(src, handoff_dest / doc)
            total += 1

    write_external_assets(STAGING)
    write_readme(STAGING)
    write_excluded_note(STAGING)

    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(STAGING.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(STAGING).as_posix())

    shutil.copy2(ZIP_PATH, DOWNLOADS_ZIP)

    size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    print(f"Staged {total} copy operations")
    print(f"Wrote {ZIP_PATH} ({size_mb:.2f} MB)")
    print(f"Copied to {DOWNLOADS_ZIP}")


if __name__ == "__main__":
    main()
