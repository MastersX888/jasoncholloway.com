#!/usr/bin/env python3
"""Read-only inventory of every shippable artifact: type, size, page count, sha256.

Reports each print interior against the LIVE IngramSpark page count (the
authoritative figure recorded in the corrected STATUS.md files), not the stale
"canon" numbers still embedded in batch_rebuild_books.py.
"""
from __future__ import annotations

import hashlib
import sys
import zipfile
from pathlib import Path

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"

# rel path, label, expected pages (None for EPUB)
ITEMS = [
    ("omnibus/9798295884412_HC/interior.pdf", "omnibus HC 9798295884412", 684),
    ("omnibus/9798256072704_PB/interior.pdf", "omnibus PB 9798256072704", 732),
    ("b1_inheritance/9798295800801_HC/interior.pdf", "B1 HC 9798295800801", 163),
    ("b1_inheritance/9798256008048_PB/interior.pdf", "B1 PB 9798256008048", 189),
    ("b2_grimoire/9798295812675_HC/interior.pdf", "B2 HC 9798295812675", 225),
    ("b2_grimoire/9798256009953_PB/interior.pdf", "B2 PB 9798256009953", 271),
    ("b3_kingdom/9798295812705_HC/interior.pdf", "B3 HC 9798295812705", 177),
    ("b3_kingdom/9798256010072_PB/interior.pdf", "B3 PB 9798256010072", 205),
    ("b1_inheritance/9798256008819_EPUB/9798256008819.epub", "B1 retail EPUB", None),
    ("b2_grimoire/9798256009625_EPUB/9798256009625.epub", "B2 retail EPUB", None),
    ("b3_kingdom/9798256009809_EPUB/9798256009809.epub", "B3 retail EPUB", None),
    ("b1_inheritance/9798256008819_KINDLE/9798256008819_KINDLE.epub", "B1 Kindle EPUB", None),
    ("b2_grimoire/9798256009625_KINDLE/9798256009625_KINDLE.epub", "B2 Kindle EPUB", None),
    ("b3_kingdom/9798256009809_KINDLE/9798256009809_KINDLE.epub", "B3 Kindle EPUB", None),
]

EXTRA = [
    (ROOT / "public/downloads/masters-x-free-chapters.epub", "sampler free-chapters", None),
    (ROOT / "public/downloads/masters-x-opening-chapters.epub", "sampler opening-chapters", None),
]


def sha(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for c in iter(lambda: f.read(1 << 20), b""):
            h.update(c)
    return h.hexdigest()


def magic(p: Path) -> str:
    head = p.read_bytes()[:4]
    if head == b"%PDF":
        return "PDF"
    if head[:2] == b"PK":
        return "ZIP"
    return f"?? {head!r}"


def pages(p: Path) -> object:
    try:
        import fitz
        d = fitz.open(p)
        n, r = d.page_count, d[0].rect
        d.close()
        return n, f"{r.width/72:.2f}x{r.height/72:.2f}"
    except Exception as e:  # noqa: BLE001
        return None, f"ERR {e}"


print(f"{'artifact':32} {'type':4} {'bytes':>10} {'pages':>6} {'exp':>5} {'verdict':8} trim/zip")
print("-" * 108)

rows = [(STAGE / r, lbl, exp) for r, lbl, exp in ITEMS] + EXTRA
bad = 0
for p, lbl, exp in rows:
    if not p.is_file():
        print(f"{lbl:32} {'--':4} {'MISSING':>10}")
        bad += 1
        continue
    t = magic(p)
    size = p.stat().st_size
    if t == "PDF":
        n, trim = pages(p)
        verdict = "n/a" if exp is None else ("PASS" if n == exp else "DRIFT")
        if verdict == "DRIFT":
            bad += 1
        print(f"{lbl:32} {t:4} {size:>10,} {str(n):>6} {str(exp):>5} {verdict:8} {trim}  {sha(p)[:12]}")
    else:
        try:
            with zipfile.ZipFile(p) as z:
                nb = z.testzip()
                info = f"{len(z.namelist())} entries, testzip={nb or 'OK'}"
                mt = z.read("mimetype").decode() if "mimetype" in z.namelist() else "<none>"
                info += f", mimetype={mt}"
        except Exception as e:  # noqa: BLE001
            info = f"ZIP ERROR {e}"
            bad += 1
        print(f"{lbl:32} {t:4} {size:>10,} {'':>6} {'':>5} {'':8} {info}  {sha(p)[:12]}")

print()
print(f"problems: {bad}")
sys.exit(0)
