#!/usr/bin/env python3
"""Stage and zip Masters X Universe Encyclopedia for Fable print publication pass."""

from __future__ import annotations

import os
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "encyclopedia_fable_handoff"
STAGING = HANDOFF / "package"
ZIP_PATH = HANDOFF / "masters-x-encyclopedia-fable-handoff.zip"
DOWNLOADS_ZIP = Path.home() / "Downloads" / "masters-x-encyclopedia-fable-handoff.zip"

HANDOFF_DOCS = [
    "FABLE_ENCYCLOPEDIA_PROMPT.md",
    "KNOWN_ISSUES_AND_FIXES.md",
    "HANDOFF_STATUS.md",
]

# (source relative to ROOT, dest relative to STAGING)
COPY_DIRS = [
    ("encyclopedia_project", "encyclopedia_project"),
    ("universe_memory", "universe_memory"),
    ("design_memory", "design_memory"),
]

COPY_FILES = [
    "CANON.md",
    "encyclopedia_project/CLAUDE_PASS_2_PROMPT.md",
    "scripts/package_encyclopedia_fable_handoff.py",
]

# Sources included in zip (exclude huge resonant_frequency_dictionary.txt)
SOURCE_FILES = [
    "encyclopedia_project/sources/distribution_file_fulltext.txt",
    "encyclopedia_project/sources/annotated_v3_fulltext.txt",
    "encyclopedia_project/sources/omnibus_v8_fulltext.txt",
    "encyclopedia_project/sources/research_inventory.json",
]

EXCLUDED_SOURCES = [
    "encyclopedia_project/sources/resonant_frequency_dictionary.txt",
]

SKIP_UNDER = {
    "node_modules",
    ".next",
    "out",
    ".git",
    "__pycache__",
    "package",
    "return",
}

SKIP_PATH_PARTS = [
    str(Path("encyclopedia_fable_handoff") / "package"),
    str(Path("website_elevation_handoff")),
    str(Path("app")),
    str(Path("public") / "folios"),
    str(Path("public") / "media"),
    str(Path("public") / "press-kit"),
]


def should_skip(path: Path) -> bool:
    parts = path.parts
    for skip in SKIP_PATH_PARTS:
        if skip in parts:
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
            rel_s = s.relative_to(src)
            if rel_s.as_posix() in EXCLUDED_SOURCES:
                continue
            if (
                "sources" in rel_s.parts
                and name == "resonant_frequency_dictionary.txt"
            ):
                continue
            d = dst / rel / name
            d.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(s, d)
            count += 1
    return count


def write_external_assets(staging: Path) -> None:
    text = """# External Assets (not bundled — paths on author machine)

These files are referenced by the encyclopedia manuscript but excluded from the zip to keep package size manageable.

## Required for print pass

| Asset | Path | Role |
|-------|------|------|
| Frequency bands JSON | `E:\\frequency_data\\frequency_bands.json` | Frequency Tables Appendix; digested in `universe_memory/03_FREQUENCY_SYSTEM.md` |
| Resonant Frequency Dictionary | `encyclopedia_project/sources/resonant_frequency_dictionary.txt` (~13.7M chars) | Excerpt for appendix; grep/curate locally |
| Research library | `E:\\Research\\` (188 files) | Catalog in `universe_memory/01_RESEARCH_CATALOG.md` |

## Reference (cover / brand)

| Asset | Path | Role |
|-------|------|------|
| Trilogy cover archive | `E:\\Masters_X_Trilogy_Archive\\` | Visual lineage; see `design_memory/TRILOGY_COVER_BRIEF.md` |
| Live cover PNGs | `public/covers/` (repo) | Listed in `ASSET_MANIFEST.md` |
| Omnibus print PDF | `C:\\Users\\zh577\\Desktop\\OMNIBUS_FINAL_FILES\\` | Typography reference for interior spec |

## If frequency_bands.json is needed inside the package

Copy manually before upload:
```
copy E:\\frequency_data\\frequency_bands.json encyclopedia_project\\sources\\
```
"""
    (staging / "EXTERNAL_ASSETS.md").write_text(text, encoding="utf-8")


def write_asset_manifest(staging: Path) -> None:
    lines = [
        "# Asset Manifest (paths only — binaries excluded from zip)\n",
        "Trilogy cover PNGs and press art are listed for **visual reference** when designing the encyclopedia cover.\n",
    ]
    for sub in [
        "public/covers",
        "design_memory/trilogy_reference",
        "design_memory/press_art",
        "design_memory/concepts",
    ]:
        p = ROOT / sub
        if not p.exists():
            continue
        lines.append(f"\n## `{sub}/`\n")
        if p.is_file():
            lines.append(f"- `{sub}`")
        else:
            for f in sorted(p.rglob("*")):
                if f.is_file():
                    lines.append(f"- `{f.relative_to(ROOT).as_posix()}`")
    (staging / "ASSET_MANIFEST.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_excluded_sources_note(staging: Path) -> None:
    note = staging / "encyclopedia_project" / "sources" / "EXCLUDED_FROM_ZIP.txt"
    note.parent.mkdir(parents=True, exist_ok=True)
    note.write_text(
        "resonant_frequency_dictionary.txt (~13.7M chars) excluded from handoff zip.\n"
        "Full path: encyclopedia_project/sources/resonant_frequency_dictionary.txt (repo)\n"
        "See EXTERNAL_ASSETS.md at package root.\n",
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

    handoff_dest = STAGING / "encyclopedia_fable_handoff"
    handoff_dest.mkdir(parents=True, exist_ok=True)
    for doc in HANDOFF_DOCS:
        src = HANDOFF / doc
        if src.exists():
            shutil.copy2(src, handoff_dest / doc)
            total += 1

    write_external_assets(STAGING)
    write_asset_manifest(STAGING)
    write_excluded_sources_note(STAGING)

    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(STAGING.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(STAGING).as_posix())

    shutil.copy2(ZIP_PATH, DOWNLOADS_ZIP)

    size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    print(f"Staged {total} files")
    print(f"Wrote {ZIP_PATH} ({size_mb:.2f} MB)")
    print(f"Copied to {DOWNLOADS_ZIP}")


if __name__ == "__main__":
    main()
