#!/usr/bin/env python3
"""Stage and zip Seventh City Press imprint site handoff for Claude (full assets)."""

from __future__ import annotations

import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "seventhcitypress_handoff"
STAGING = HANDOFF / "package"
ZIP_PATH = HANDOFF / "masters-x-seventhcitypress-handoff.zip"
DOWNLOADS_ZIP = Path.home() / "Downloads" / "masters-x-seventhcitypress-handoff.zip"

HANDOFF_DOCS = [
    "CLAUDE_START_HERE.md",
    "CLAUDE_SCP_SITE_PROMPT.md",
    "CONTEXT_UPDATE.md",
    "SETUP_GUIDE.md",
    "ARCHITECTURE.md",
    "AUTHOR_SITE_MIGRATION.md",
    "KNOWN_ISSUES.md",
    "HANDOFF_STATUS.md",
    "ZIP_FILE_MANIFEST.md",
]

REF_COPY = [
    ("app/press/page.tsx", "reference/author_site/app/press/page.tsx"),
    ("app/press/press-page.module.css", "reference/author_site/app/press/press-page.module.css"),
    ("app/layout.tsx", "reference/author_site/app/layout.tsx"),
    ("app/globals.css", "reference/author_site/app/globals.css"),
    ("app/responsive.css", "reference/author_site/app/responsive.css"),
    ("components/layout/Header.tsx", "reference/author_site/components/layout/Header.tsx"),
    ("components/layout/Footer.tsx", "reference/author_site/components/layout/Footer.tsx"),
    ("components/layout/ContactForm.tsx", "reference/author_site/components/layout/ContactForm.tsx"),
    ("components/layout/NewsletterForm.tsx", "reference/author_site/components/layout/NewsletterForm.tsx"),
    ("app/contact/page.tsx", "reference/author_site/app/contact/page.tsx"),
    ("public/_redirects", "reference/author_site/public/_redirects"),
    ("public/llms.txt", "reference/author_site/public/llms.txt"),
    ("app/sitemap.ts", "reference/author_site/app/sitemap.ts"),
    ("scripts/generate_press_kit.py", "reference/author_site/scripts/generate_press_kit.py"),
    ("next.config.ts", "reference/author_site/next.config.ts"),
    ("package.json", "reference/author_site/package.json"),
    ("package-lock.json", "reference/author_site/package-lock.json"),
    ("wrangler.toml", "reference/author_site/wrangler.toml"),
    ("scratch/build_export.ps1", "reference/author_site/scratch/build_export.ps1"),
    ("tsconfig.json", "reference/author_site/tsconfig.json"),
]

CONTEXT_COPY = [
    "CANON.md",
    "design_memory/BRAND_SOURCE.md",
    "website_elevation_handoff/SITE_CONTEXT.md",
    "scripts/package_seventhcitypress_handoff.py",
]

COVER_FILES = [
    "book1-paperback.png",
    "book1-hardcover-v3.png",
    "book2-paperback.png",
    "book2-hardcover-v3.png",
    "book3-paperback.png",
    "book3-hardcover-v3.png",
    "omnibus-hardcover-v3.png",
]


def stage_file(src: Path, dest: Path) -> bool:
    if not src.exists():
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    return True


def main() -> None:
    if STAGING.exists():
        shutil.rmtree(STAGING)
    STAGING.mkdir(parents=True, exist_ok=True)

    count = 0
    dest_handoff = STAGING / "seventhcitypress_handoff"
    dest_handoff.mkdir(parents=True, exist_ok=True)
    for doc in HANDOFF_DOCS:
        if stage_file(HANDOFF / doc, dest_handoff / doc):
            count += 1

    for src_rel, dest_rel in REF_COPY:
        if stage_file(ROOT / src_rel, STAGING / dest_rel):
            count += 1

    for rel in CONTEXT_COPY:
        if stage_file(ROOT / rel, STAGING / rel):
            count += 1

    # Press-kit PDFs — full binaries
    press_kit_src = ROOT / "public" / "press-kit"
    press_kit_dest = STAGING / "assets" / "press-kit"
    if press_kit_src.is_dir():
        for pdf in sorted(press_kit_src.glob("*.pdf")):
            if stage_file(pdf, press_kit_dest / pdf.name):
                count += 1

    # Cover images — full binaries
    covers_src = ROOT / "public" / "covers"
    covers_dest = STAGING / "assets" / "covers"
    for name in COVER_FILES:
        if stage_file(covers_src / name, covers_dest / name):
            count += 1

    for og_name in ("og-image.png", "bg-rose-window.png"):
        if stage_file(ROOT / "public" / og_name, STAGING / "assets" / og_name):
            count += 1

    # Flat aliases at zip root for Claude discoverability
    aliases = [
        (STAGING / "reference/author_site/app/press/page.tsx", STAGING / "SOURCE_press_page.tsx"),
        (STAGING / "reference/author_site/app/press/press-page.module.css", STAGING / "SOURCE_press_page.module.css"),
        (STAGING / "seventhcitypress_handoff/AUTHOR_SITE_MIGRATION.md", STAGING / "SOURCE_AUTHOR_SITE_MIGRATION.md"),
        (STAGING / "seventhcitypress_handoff/CLAUDE_START_HERE.md", STAGING / "CLAUDE_START_HERE.md"),
    ]
    for src, dest in aliases:
        if src.exists():
            shutil.copy2(src, dest)
            count += 1

    # Write tree manifest
    lines = []
    for f in sorted(STAGING.rglob("*")):
        if f.is_file():
            rel = f.relative_to(STAGING).as_posix()
            size = f.stat().st_size
            lines.append(f"{rel}\t{size}")
    (STAGING / "FILE_TREE.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    count += 1

    readme = """# Seventh City Press — FULL Handoff Package (Claude)

**IMPORTANT: Extract this entire zip. All source files are included.**

## Read first
0. `CLAUDE_START_HERE.md` — answers "missing files" feedback; confirms full package
1. `ZIP_FILE_MANIFEST.md` (in seventhcitypress_handoff/) — complete file index
2. `FILE_TREE.txt` — every file in this zip with byte sizes
3. `seventhcitypress_handoff/CLAUDE_SCP_SITE_PROMPT.md` — mission
4. `seventhcitypress_handoff/CONTEXT_UPDATE.md` — DNS/Gmail already done

## Quick paths (aliases at zip root)
- `SOURCE_press_page.tsx` — press homepage to port
- `SOURCE_press_page.module.css` — press styles
- `SOURCE_AUTHOR_SITE_MIGRATION.md` — author site patches

## Press page source
- `reference/author_site/app/press/page.tsx`
- `reference/author_site/app/press/press-page.module.css`

## Binary assets (included — not manifests only)
- `assets/press-kit/*.pdf` (5 files)
- `assets/covers/*.png` (7 files)

## Canon & brand
- `CANON.md`
- `design_memory/BRAND_SOURCE.md`

## Return zip name
`seventhcitypress-site-RETURN.zip`
"""
    (STAGING / "README.md").write_text(readme, encoding="utf-8")

    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(STAGING.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(STAGING).as_posix())

    size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    file_count = sum(1 for _ in STAGING.rglob("*") if _.is_file())
    print(f"Staged {count} copy operations, {file_count} files total")
    print(f"Wrote {ZIP_PATH} ({size_mb:.2f} MB)")
    try:
        shutil.copy2(ZIP_PATH, DOWNLOADS_ZIP)
        print(f"Copied to {DOWNLOADS_ZIP}")
    except OSError as e:
        print(f"WARNING: Could not copy to Downloads ({e}). Use {ZIP_PATH}")


if __name__ == "__main__":
    main()
