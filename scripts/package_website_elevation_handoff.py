#!/usr/bin/env python3
"""Stage and zip jasoncholloway.com for Claude final elevation pass."""

from __future__ import annotations

import os
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "website_elevation_handoff"
STAGING = HANDOFF / "package"
ZIP_PATH = HANDOFF / "jasoncholloway-website-final-pass.zip"
DOWNLOADS_ZIP = Path.home() / "Downloads" / "jasoncholloway-website-final-pass.zip"

# Top-level handoff docs to include (not old pass artifacts)
HANDOFF_DOCS = [
    "CLAUDE_FINAL_PASS_PROMPT.md",
    "KNOWN_ISSUES_AND_FIXES.md",
    "PREVIOUS_PASS_SUMMARY.md",
    "HANDOFF_STATUS.md",
    "SITE_CONTEXT.md",
]

# (source relative to ROOT, dest relative to STAGING)
COPY_DIRS = [
    "app",
    "components",
    "content",
    "design_memory",
    "lib",
]

COPY_FILES = [
    "CANON.md",
    "AGENTS.md",
    "next.config.ts",
    "package.json",
    "tsconfig.json",
    "public/llms.txt",
    "public/feeds/google-shopping.csv",
    "public/_redirects",
    "scripts/sync-ingram-metadata.py",
    "scripts/package_website_elevation_handoff.py",
]

SKIP_UNDER = {
    "node_modules",
    ".next",
    "out",
    ".git",
    "__pycache__",
    "package",
    "return",
    "output",
}

SKIP_PATH_PARTS = [
    str(Path("public") / "folios"),
    str(Path("public") / "covers"),
    str(Path("public") / "media"),
    str(Path("public") / "press-kit"),
    str(Path("public") / "downloads"),
    str(Path("encyclopedia_project")),
    str(Path("groundswell-monitor")),
    str(Path("website_elevation_handoff") / "package"),
    str(Path("website_elevation_handoff") / "return"),
    str(Path("website_elevation_handoff") / "output"),
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
            d = dst / rel / name
            d.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(s, d)
            count += 1
    return count


def write_asset_manifest(staging: Path) -> None:
    lines = ["# Asset Manifest (paths only — binaries excluded from zip)\n"]
    for sub in ["public/covers", "public/media", "design_memory/press_art", "design_memory/concepts"]:
        p = ROOT / sub
        if p.is_file():
            lines.append(f"- `{sub}`")
        elif p.is_dir():
            lines.append(f"\n## `{sub}/`\n")
            for f in sorted(p.rglob("*")):
                if f.is_file():
                    lines.append(f"- `{f.relative_to(ROOT).as_posix()}`")
    (staging / "ASSET_MANIFEST.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def cleanup_old_artifacts() -> None:
    """Remove prior pass staging/return/output and old zips."""
    for sub in ("package", "return", "output"):
        p = HANDOFF / sub
        if p.exists():
            shutil.rmtree(p)
            print(f"Removed {p}")

    for pattern in (
        "jasoncholloway-website-elevation-pass.zip",
        "jasoncholloway-website-final-pass.zip",
        "CLAUDE_ELEVATION_PASS_PROMPT.md",
    ):
        p = HANDOFF / pattern
        if p.exists():
            p.unlink()
            print(f"Removed {p}")

    downloads = Path.home() / "Downloads"
    for name in (
        "jasoncholloway-website-elevation-pass.zip",
        "jasoncholloway-elevation-pass-RETURN.zip",
    ):
        p = downloads / name
        if p.exists():
            p.unlink()
            print(f"Removed {p}")


def main() -> None:
    cleanup_old_artifacts()

    STAGING.mkdir(parents=True, exist_ok=True)

    total = 0
    for d in COPY_DIRS:
        md_only = d == "design_memory"
        total += copy_tree(ROOT / d, STAGING / d, md_only=md_only)

    for rel in COPY_FILES:
        src = ROOT / rel
        if src.exists():
            dest = STAGING / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            total += 1

    # Handoff docs at package root
    handoff_dest = STAGING / "website_elevation_handoff"
    handoff_dest.mkdir(parents=True, exist_ok=True)
    for doc in HANDOFF_DOCS:
        src = HANDOFF / doc
        if src.exists():
            shutil.copy2(src, handoff_dest / doc)
            total += 1

    write_asset_manifest(STAGING)

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
