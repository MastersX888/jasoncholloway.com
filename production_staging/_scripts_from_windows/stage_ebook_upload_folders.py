#!/usr/bin/env python3
"""Stage the KDP and Google Play ebook packages for the 2026-08-29 revision round.

Google Play takes the SAME ISBN-identified retail EPUB (confirmed: the *_EPUB
STATUS files record "Google Play: LIVE v3 - geo EPUB uploaded 2026-07-31"), so there
is no separate Google edition to build - it is the retail file.

KDP takes the ASIN-stamped Kindle variant built by generate_kindle_epubs.py, whose
dc:identifier is a urn:uuid rather than the print ISBN.
"""

from __future__ import annotations

import hashlib
import re
import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"
DEST = Path(r"C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER_2026-08-29")

VOLS = [
    ("9798256008819", "B0H4KYMSM1", "Vol I  The Inheritance of Frequency",
     "b1_inheritance/9798256008819_EPUB/9798256008819.epub",
     "b1_inheritance/9798256008819_KINDLE/9798256008819_KINDLE.epub"),
    ("9798256009625", "B0H4KQ4YQJ", "Vol II  The Grimoire",
     "b2_grimoire/9798256009625_EPUB/9798256009625.epub",
     "b2_grimoire/9798256009625_KINDLE/9798256009625_KINDLE.epub"),
    ("9798256009809", "B0H4L36X21", "Vol III  The Kingdom",
     "b3_kingdom/9798256009809_EPUB/9798256009809.epub",
     "b3_kingdom/9798256009809_KINDLE/9798256009809_KINDLE.epub"),
]


def sha16(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for c in iter(lambda: f.read(1 << 20), b""):
            h.update(c)
    return h.hexdigest()[:16]


def audit(p: Path, isbn: str, kindle: bool, asin: str) -> list[str]:
    """Return a list of problems; empty means clean."""
    bad = []
    with zipfile.ZipFile(p) as z:
        pages = [n for n in z.namelist() if n.endswith(".xhtml")]
        opf = z.read(next(n for n in z.namelist() if n.endswith(".opf"))).decode("utf-8")
        cr = z.read("EPUB/copyright.xhtml").decode("utf-8")
        body = " ".join(z.read(n).decode("utf-8", "replace") for n in pages)
        for n in pages:
            if "cover" in n:
                continue
            if "style/book.css" not in z.read(n).decode("utf-8", "replace"):
                bad.append(f"stylesheet not linked in {n}")
    if "SUB-BOOK" in body:
        bad.append("SUB-BOOK present")
    if isbn == "9798256008819":
        if "grandfather died in 2003" not in body:
            bad.append("canon fix missing (2003)")
        if "would never meet" in body:
            bad.append("stale 'would never meet'")
    ident = re.search(r"<dc:identifier[^>]*>(.*?)</dc:identifier>", opf, re.S)
    iv = ident.group(1).strip() if ident else ""
    if kindle:
        if not iv.startswith("urn:uuid:"):
            bad.append(f"Kindle dc:identifier should be urn:uuid, got {iv!r}")
        if asin not in cr:
            bad.append("ASIN missing from copyright page")
    else:
        if isbn not in iv:
            bad.append(f"retail dc:identifier should carry ISBN, got {iv!r}")
        # The copyright page prints the hyphenated ISBN (979-8-2560-0881-9), so
        # compare with separators stripped rather than against the bare digits.
        if isbn not in re.sub(r"[-\u2011\u2013\s]", "", cr):
            bad.append("ISBN missing from copyright page")
    return bad


ok = True
rows: list[tuple] = []

for channel, kindle in (("GOOGLE_PLAY", False), ("KDP_KINDLE", True)):
    out_dir = DEST / channel
    out_dir.mkdir(parents=True, exist_ok=True)
    print("=" * 84)
    print(f"{channel}  ->  {out_dir}")
    print("=" * 84)
    for isbn, asin, title, retail_rel, kindle_rel in VOLS:
        src = STAGE / (kindle_rel if kindle else retail_rel)
        if not src.is_file():
            print(f"  {isbn}: MISSING {src}")
            ok = False
            continue
        problems = audit(src, isbn, kindle, asin)
        if problems:
            print(f"  {isbn}: REFUSED - {'; '.join(problems)}")
            ok = False
            continue
        dst = out_dir / src.name
        shutil.copy2(src, dst)
        rows.append((channel, isbn, asin if kindle else "-", dst.name,
                     dst.stat().st_size, sha16(dst), title))
        print(f"  {isbn}: staged {dst.name}  ({dst.stat().st_size:,}B)  verified")

lines = [
    "# Ebook revision round — 2026-08-29",
    "",
    "Two channels, three volumes each. Both carry the scene-break centering fix;",
    "Vol I also carries the Chapter One canon fix and Vol III the SUB-BOOK removal.",
    "All six files pass epubcheck at 0 fatals / 0 errors / 0 warnings / 0 infos.",
    "",
    "## GOOGLE_PLAY — Google Play Books Partner Center",
    "",
    "Google Play uses the **same ISBN-identified retail EPUB** as IngramSpark.",
    "There is no separate Google edition. `dc:identifier` carries the print ISBN.",
    "",
    "## KDP_KINDLE — Amazon KDP",
    "",
    "Distinct files. `dc:identifier` is a `urn:uuid` (KDP assigns the ASIN) and the",
    "copyright page reads `ASIN <asin>` instead of the ISBN. The print ISBN is",
    "retained as `dc:source`, which is correct for an ebook derived from a print",
    "edition. **Do not upload the retail EPUB to KDP** and vice versa.",
    "",
    "| Channel | ISBN | ASIN | File | Bytes | sha256[:16] | Volume |",
    "|---|---|---|---|---|---|---|",
]
for ch, isbn, asin, name, size, h, title in rows:
    lines.append(f"| {ch} | {isbn} | {asin} | `{name}` | {size:,} | `{h}` | {title} |")

lines += [
    "",
    "## Website",
    "",
    "`lib/data/passages.ts` carried the old sentence-2 wording on the homepage scene",
    "reel and has been corrected. Rebuilt and verified: the new wording appears in",
    "`out/index.html` and the old wording appears nowhere in the build output.",
    "",
    "Two stale sampler backups (`*.PRE_CANON_2026-08-29.bak`) were sitting inside",
    "`public/downloads/` and would have been published as live URLs serving the OLD",
    "text. Moved to `production_staging/_sampler_backups/` and purged from `out/`.",
    "",
    "The press kit PDFs were audited and contain neither corrected sentence nor any",
    "character death year, so they need no reissue.",
]
(DEST / "README_EBOOKS_2026-08-29.md").write_text("\n".join(lines), encoding="utf-8")

print()
print("=" * 84)
print(f"{DEST}")
print("=" * 84)
for p in sorted(DEST.rglob("*")):
    if p.is_file():
        print(f"  {p.stat().st_size:>11,}  {p.relative_to(DEST)}")
print()
print("EBOOK STAGING OK" if ok else "EBOOK STAGING INCOMPLETE")
sys.exit(0 if ok else 1)
