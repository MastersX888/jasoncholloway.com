"""Move the pre-regeneration PDF backups out of the published trees.

scripts/check-public-backups.mjs exists because a `.bak` under `public/` gets
copied verbatim into the static export and served. Backing the old press kit up
there would have published the stale kit at a second URL. `out/` is the export
itself, so the same applies. The three copies were byte-identical, so one set is
kept, under scratch/, which is neither published nor scanned.
"""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / "scratch" / "press_kit_backups_2026-08-29"
DEST.mkdir(parents=True, exist_ok=True)

NAMES = [
    "Masters_X_Press_Release",
    "Masters_X_Fact_Sheet",
    "Holloway_Author_Bios",
    "Masters_X_Synopses",
    "Masters_X_Press_Kit",
]
DIRS = ["public/press-kit", "out/press-kit", "seventhcitypress/public/press-kit"]
SUFFIX = ".PRE_PRESSKIT_2026-08-29.pdf.bak"


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


for name in NAMES:
    sources = [ROOT / d / f"{name}{SUFFIX}" for d in DIRS]
    present = [p for p in sources if p.exists()]
    digests = {sha(p) for p in present}
    keeper = DEST / f"{name}{SUFFIX}"
    shutil.copy2(present[0], keeper)
    print(f"{name}{SUFFIX}")
    print(f"    {len(present)} copies, {len(digests)} distinct hash -> {sorted(digests)[0][:16]}")
    print(f"    kept   scratch/press_kit_backups_2026-08-29/  verified={sha(keeper) in digests}")
    for p in present:
        p.unlink()
    print(f"    removed from: {', '.join(DIRS)}")

(DEST / "README.md").write_text(
    "# press kit backups — 2026-08-29\n\n"
    "The five press-kit PDFs as they stood before the stale page counts were\n"
    "corrected in `scripts/generate_press_kit.py`. Every figure in these files is\n"
    "wrong except the three EPUB counts (267 / 385 / 291).\n\n"
    "They live here rather than beside the PDFs they replace because\n"
    "`scripts/check-public-backups.mjs` fails the build on any backup under a\n"
    "`public/` tree: everything there is copied verbatim into the static export, so\n"
    "a backup dropped there republishes itself at a second URL.\n\n"
    "`public/press-kit/`, `out/press-kit/` and `seventhcitypress/public/press-kit/`\n"
    "held byte-identical copies, so one set is kept here.\n",
    encoding="utf-8",
    newline="\n",
)
print(f"\nwrote {(DEST / 'README.md').relative_to(ROOT).as_posix()}")
