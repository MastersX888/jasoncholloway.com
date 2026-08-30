#!/usr/bin/env python3
"""Stage and zip Masters X YouTube Fable handoff."""

from __future__ import annotations

import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HANDOFF = ROOT / "youtube_fable_handoff"
STAGING = HANDOFF / "package"
ZIP_PATH = HANDOFF / "masters-x-youtube-fable-handoff.zip"
DOWNLOADS_ZIP = Path.home() / "Downloads" / "masters-x-youtube-fable-handoff.zip"

HANDOFF_DOCS = [
    "FABLE_YOUTUBE_PROMPT.md",
    "SCRIPT_PROOF_SPEC.md",
    "IMAGE_DESIGN_BRIEF.md",
    "KNOWN_ISSUES_YOUTUBE.md",
    "SERIES_CONTEXT.md",
    "HANDOFF_STATUS.md",
]

# Copied into package/youtube_production/ and package/...
COPY_PATHS = [
    "CANON.md",
    "design_memory/BRAND_SOURCE.md",
    "scripts/package_youtube_fable_handoff.py",
    "encyclopedia_project/output/marketing/youtube/YOUTUBE_SCRIPTS.md",
    "encyclopedia_project/output/marketing/youtube/CHANNEL_ROADMAP.md",
    "encyclopedia_project/output/marketing/youtube/channel/SETUP_CHECKLIST.md",
    "encyclopedia_project/output/marketing/youtube/channel/BRANDING.md",
    "encyclopedia_project/output/marketing/youtube/channel/EPISODE_METADATA.md",
    "encyclopedia_project/output/marketing/youtube/channel/THUMBNAILS.md",
    "encyclopedia_project/output/marketing/youtube/channel/UPLOAD_WORKFLOW.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/README.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/SERIES_BIBLE.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/GEAR_CHECKLIST.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/EP01_FREQUENCY_IN_THE_STONE.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/EP02_PROPHETS_UNDERGROUND_CITY.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/EP03_THREE_FACTIONS.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/EP04_TABLE_TOP_MIRACLE.md",
    "encyclopedia_project/output/marketing/youtube/shoot_package/EP05_FIVE_TRADITIONS.md",
    "encyclopedia_project/output/encyclopedia/PART_THREE_ESSAYS/ESSAY_01_SOUND_INTO_FORM.md",
    "encyclopedia_project/output/encyclopedia/PART_THREE_ESSAYS/ESSAY_02_THE_GROUND_ITSELF.md",
    "public/llms.txt",
]

AUTHOR_PHOTO = ROOT / "public" / "media" / "JasonCHolloway-v2.png"


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
    dest_handoff = STAGING / "youtube_fable_handoff"
    dest_handoff.mkdir(parents=True, exist_ok=True)
    for doc in HANDOFF_DOCS:
        if stage_file(HANDOFF / doc, dest_handoff / doc):
            count += 1

    for rel in COPY_PATHS:
        src = ROOT / rel
        # youtube production tree under package/youtube_production/
        if "encyclopedia_project/output/marketing/youtube" in rel.replace("\\", "/"):
            sub = rel.split("marketing/youtube/", 1)[1]
            dest = STAGING / "youtube_production" / sub
        elif rel.startswith("encyclopedia_project/"):
            dest = STAGING / "encyclopedia_project" / rel.split("encyclopedia_project/", 1)[1]
        else:
            dest = STAGING / rel
        if stage_file(src, dest):
            count += 1

    assets = STAGING / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    if stage_file(AUTHOR_PHOTO, assets / "JasonCHolloway-v2.png"):
        count += 1
    else:
        (assets / "AUTHOR_PHOTO_NOT_FOUND.txt").write_text(
            f"Expected: {AUTHOR_PHOTO}\nUse site author photo for profile — do not AI-generate face.\n",
            encoding="utf-8",
        )

    readme = """# Masters X YouTube — Fable Handoff

**Start here:** `youtube_fable_handoff/FABLE_YOUTUBE_PROMPT.md`

## Your job
1. **Proof** all 5 episode scripts (`youtube_production/shoot_package/EP*.md`)
2. **Design** channel banner, thumbnails, OST cards, lower third (`IMAGE_DESIGN_BRIEF.md`)
3. Return `masters-x-youtube-fable-RETURN.zip` per prompt deliverable tree

## Key paths in this zip
- `youtube_fable_handoff/FABLE_YOUTUBE_PROMPT.md` — mission
- `youtube_production/shoot_package/` — scripts to proof
- `youtube_production/channel/` — metadata + thumbnail specs
- `encyclopedia_project/.../ESSAY_01–02` — fact-check sources
- `assets/JasonCHolloway-v2.png` — profile reference (do not AI-replace)
- `design_memory/BRAND_SOURCE.md` · `CANON.md`

## Return zip name
`masters-x-youtube-fable-RETURN.zip`

## Out of scope
Video shoot, edit, upload, website, blog, Instagram, encyclopedia print.
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
