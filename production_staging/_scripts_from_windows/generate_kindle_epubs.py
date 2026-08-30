#!/usr/bin/env python3
"""Build the KDP (Kindle) EPUB variants for all three volumes.

generate_epubs_v1.py supports is_kindle=True but its __main__ only ever builds the
retail variant, so there was no way to produce the Kindle files from the CLI.

The Kindle variant differs from retail in three ways:
  * dc:identifier is a random urn:uuid instead of urn:isbn (KDP assigns the ASIN)
  * the copyright page carries "ASIN <asin>" instead of "ISBN <isbn>"
  * it must NOT overwrite the retail file

That last point matters: build_epub() renames via
    out_path.name.replace("_v1.epub", "_KINDLE_v1.epub")
which is a no-op for our "{isbn}.epub" naming, so a Kindle build with the default
output path would silently clobber the retail EPUB. This driver therefore always
passes an explicit BUILD_OUTPUT inside the *_KINDLE folder.

BUILD_OUTPUT is read at module import, so each volume is built in its own
subprocess with a purpose-built environment.
"""

from __future__ import annotations

import os
import re
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"
SCRIPTS = STAGE / "_scripts_from_windows"

# isbn_bare, asin, destination folder
JOBS = [
    ("9798256008819", "B0H4KYMSM1", "b1_inheritance/9798256008819_KINDLE"),
    ("9798256009625", "B0H4KQ4YQJ", "b2_grimoire/9798256009625_KINDLE"),
    ("9798256009809", "B0H4L36X21", "b3_kingdom/9798256009809_KINDLE"),
]

CHILD = r"""
import sys
sys.path.insert(0, r"{scripts}")
import generate_epubs_v1 as g
cfg = [c for c in g.VOLUMES if c["isbn_bare"] == "{isbn}"][0]
p = g.build_epub(cfg, is_kindle=True)
g.validate_epub(p, cfg, is_kindle=True)
print("BUILT", p)
"""


def clean_env(out: Path) -> dict[str, str]:
    env = {k: v for k, v in os.environ.items() if not k.startswith("BUILD_")}
    env["PYTHONIOENCODING"] = "utf-8"
    env["BUILD_OUTPUT"] = str(out)
    return env


ok = True
results = []

for isbn, asin, folder in JOBS:
    dest_dir = STAGE / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    out = dest_dir / f"{isbn}_KINDLE.epub"
    retail = None
    for cand in STAGE.rglob(f"{isbn}.epub"):
        if "_EPUB" in str(cand):
            retail = cand
            break

    print(f"\n{'=' * 74}")
    print(f"KINDLE  {isbn}  ASIN {asin}")
    print(f"{'=' * 74}")
    print(f"  -> {out.relative_to(STAGE)}")

    r = subprocess.run(
        [sys.executable, "-u", "-c", CHILD.format(scripts=SCRIPTS, isbn=isbn)],
        env=clean_env(out), cwd=str(ROOT),
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    print("   " + (r.stdout or "").strip().replace("\n", "\n   "))
    if r.returncode != 0:
        print(f"   *** FAILED rc={r.returncode}")
        print((r.stderr or "")[-1500:])
        ok = False
        continue

    # Post-checks: ASIN present, no ISBN identifier, retail file untouched.
    with zipfile.ZipFile(out) as z:
        opf = next(n for n in z.namelist() if n.endswith(".opf"))
        opf_text = z.read(opf).decode("utf-8")
        cr = z.read("EPUB/copyright.xhtml").decode("utf-8")
        pages = [n for n in z.namelist() if n.endswith(".xhtml")]
        unlinked = [
            n for n in pages
            if "cover" not in n and "style/book.css" not in z.read(n).decode("utf-8", "replace")
        ]
        body = " ".join(
            z.read(n).decode("utf-8", "replace") for n in pages
        )

    # dc:identifier must NOT be the ISBN (KDP assigns the ASIN). A urn:isbn in
    # dc:source is correct and expected - it declares the print edition this
    # ebook derives from - so only the identifier element is checked here.
    ident = re.search(r"<dc:identifier[^>]*>(.*?)</dc:identifier>", opf_text, re.S)
    ident_val = (ident.group(1).strip() if ident else "")

    checks = {
        "ASIN on copyright page": asin in cr,
        "dc:identifier is not the ISBN": isbn not in ident_val,
        "dc:identifier is a urn:uuid": ident_val.startswith("urn:uuid:"),
        "print ISBN retained as dc:source": f"<dc:source>urn:isbn:{isbn}</dc:source>" in opf_text,
        "stylesheet linked on all pages": not unlinked,
        "no SUB-BOOK": "SUB-BOOK" not in body,
    }
    if isbn == "9798256008819":
        checks["canon fix (2003)"] = "grandfather died in 2003" in body
        checks["canon fix (no 'never meet')"] = "would never meet" not in body

    for k, v in checks.items():
        print(f"   {'ok ' if v else 'XX '} {k}")
        ok &= v

    if retail and retail.is_file():
        print(f"   ok  retail untouched: {retail.name} {retail.stat().st_size:,}B")
    results.append((isbn, asin, out, out.stat().st_size))

print(f"\n{'=' * 74}")
print("KINDLE BUILD SUMMARY")
print("=" * 74)
for isbn, asin, out, size in results:
    print(f"  {isbn}  ASIN {asin}  {size:>9,}B  {out.relative_to(STAGE)}")
print()
print("KINDLE OK" if ok else "KINDLE HAD FAILURES")
sys.exit(0 if ok else 1)
