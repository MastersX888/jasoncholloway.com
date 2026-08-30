"""Sync the regenerated press kit to all three copies, then verify every figure.

Writes fresh text extractions to scratch/press_extract/ as a side effect only
when --refresh-extracts is passed.
"""

from __future__ import annotations

import datetime as dt
import hashlib
import re
import shutil
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[2]
CANON = ROOT / "public" / "press-kit"
MIRRORS = [ROOT / "out" / "press-kit", ROOT / "seventhcitypress" / "public" / "press-kit"]

COMPONENTS = [
    "Masters_X_Press_Release.pdf",
    "Masters_X_Fact_Sheet.pdf",
    "Holloway_Author_Bios.pdf",
    "Masters_X_Synopses.pdf",
]
NAMES = COMPONENTS + ["Masters_X_Press_Kit.pdf"]

CORRECT = {
    "9798256008048": ("Vol I PB", 189),
    "9798295800801": ("Vol I HC", 163),
    "9798256009953": ("Vol II PB", 271),
    "9798295812675": ("Vol II HC", 225),
    "9798256010072": ("Vol III PB", 205),
    "9798295812705": ("Vol III HC", 177),
    "9798256072704": ("Omnibus PB", 732),
    "9798295884412": ("Omnibus HC", 684),
}
STALE = [156, 178, 218, 260, 170, 200, 686, 734]
EPUB = [267, 385, 291]


def sha(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def stamp(p: Path) -> str:
    return dt.datetime.fromtimestamp(p.stat().st_mtime).isoformat(timespec="seconds")


def found(text: str, value: int) -> bool:
    return re.search(rf"(?<![\d.,]){value}(?![\d.,])", text) is not None


# ── Sync ─────────────────────────────────────────────────────────────────────
print("== SYNC ==")
for mirror in MIRRORS:
    for name in NAMES:
        src, dst = CANON / name, mirror / name
        shutil.copy2(src, dst)
        ok = sha(src.read_bytes()) == sha(dst.read_bytes())
        print(f"  {'OK  ' if ok else 'FAIL'} {dst.relative_to(ROOT).as_posix()}")

print("\n== IDENTICAL ACROSS ALL THREE LOCATIONS ==")
for name in NAMES:
    digests = {sha((d / name).read_bytes()) for d in [CANON, *MIRRORS]}
    stamps = [stamp(d / name) for d in [CANON, *MIRRORS]]
    print(f"  {name:<32} 1 hash={len(digests) == 1}  {sorted(digests)[0][:16]}  mtimes={stamps}")

# ── Timestamps: components and the merged kit must share this run ────────────
print("\n== RUN TIMESTAMPS (public/press-kit) ==")
times = {}
for name in NAMES:
    p = CANON / name
    times[name] = p.stat().st_mtime
    print(f"  {name:<32} {stamp(p)}  {p.stat().st_size:>6} bytes")
spread = max(times.values()) - min(times.values())
print(f"  spread across all five: {spread:.3f} s  -> same run: {spread < 120}")

# ── Verification ─────────────────────────────────────────────────────────────
print("\n== PER-PDF VERIFICATION ==")
texts: dict[str, str] = {}
for name in NAMES:
    doc = fitz.open(CANON / name)
    texts[name] = "\n".join(page.get_text() for page in doc)
    pages = doc.page_count
    text = texts[name]
    correct_hits = [f"{v}" for _, (label, v) in CORRECT.items() if found(text, v)]
    stale_hits = [str(v) for v in STALE if found(text, v)]
    epub_hits = [str(v) for v in EPUB if found(text, v)]
    print(f"\n  {name}  ({pages} pp)")
    print(f"    correct counts present : {len(correct_hits)}/8  {correct_hits}")
    print(f"    stale counts present   : {len(stale_hits)}      {stale_hits or 'none'}")
    print(f"    EPUB 267/385/291       : {epub_hits or 'none'}")
    doc.close()

print("\n== AGGREGATE ==")
all_text = "\n".join(texts.values())
missing = [f"{label} {v}" for _, (label, v) in CORRECT.items() if not found(all_text, v)]
print(f"  all 8 correct counts appear somewhere: {not missing}  missing={missing or 'none'}")
print(f"  any stale count anywhere: {[v for v in STALE if found(all_text, v)] or 'NONE'}")

# ── Brand glyph ──────────────────────────────────────────────────────────────
print("\n== BRAND LINE (U+2166) ==")
for name in NAMES:
    for line in texts[name].splitlines():
        if "Seventh City Press" in line and "SEVENTH" not in line:
            print(f"  {name:<32} {line!r}  codepoints={[hex(ord(c)) for c in line[:2]]}")
            break

# ── Extract refresh ──────────────────────────────────────────────────────────
if "--refresh-extracts" in sys.argv:
    print("\n== REFRESH scratch/press_extract ==")
    for name in NAMES:
        out = ROOT / "scratch" / "press_extract" / (Path(name).stem + ".txt")
        out.write_text(texts[name], encoding="utf-8", newline="\n")
        print(f"  wrote {out.relative_to(ROOT).as_posix()}  {len(texts[name])} chars")
