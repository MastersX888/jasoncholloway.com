"""Final evidence pass for the U+2166 brand-glyph fix."""

from __future__ import annotations

import datetime as dt
import hashlib
import re
import subprocess
import sys
from pathlib import Path

import fitz

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[2]
CANON = ROOT / "public" / "press-kit"
TREES = [
    ("public/press-kit", CANON),
    ("out/press-kit", ROOT / "out" / "press-kit"),
    ("seventhcitypress/public/press-kit", ROOT / "seventhcitypress" / "public" / "press-kit"),
]
DL = Path.home() / "Downloads"
NAMES = [
    "Masters_X_Press_Release.pdf",
    "Masters_X_Fact_Sheet.pdf",
    "Holloway_Author_Bios.pdf",
    "Masters_X_Synopses.pdf",
    "Masters_X_Press_Kit.pdf",
]
COMPONENTS = NAMES[:4]
MERGED = NAMES[4]


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def ts(p: Path) -> str:
    return dt.datetime.fromtimestamp(p.stat().st_mtime).isoformat(timespec="seconds")


print("== THREE-TREE HASH TABLE ==")
print(f"  {'file':<32} {'sha256':<64} {'bytes':>7}  identical")
for n in NAMES:
    digests = [sha(d / n) for _, d in TREES]
    same = len(set(digests)) == 1
    print(f"  {n:<32} {digests[0]:<64} {(CANON / n).stat().st_size:>7}  {same}")
print()
for label, d in TREES:
    print(f"  {label:<38} " + "  ".join(f"{sha(d / n)[:12]}" for n in NAMES))

print("\n== RUN TIMESTAMPS / MERGE ORDER ==")
for label, d in TREES:
    print(f"  {label}")
    for n in NAMES:
        print(f"    {n:<32} {ts(d / n)}")
comp_max = max((CANON / n).stat().st_mtime for n in COMPONENTS)
merged_t = (CANON / MERGED).stat().st_mtime
spread = max((CANON / n).stat().st_mtime for n in NAMES) - min(
    (CANON / n).stat().st_mtime for n in NAMES
)
print(f"\n  merged written after every component : {merged_t >= comp_max}"
      f"  (+{merged_t - comp_max:.3f}s)")
print(f"  spread across all five               : {spread:.3f}s -> one run: {spread < 120}")

print("\n== MERGED KIT PAGE COUNT ==")
for n in NAMES:
    doc = fitz.open(CANON / n)
    print(f"  {n:<32} {doc.page_count} pp")
    doc.close()
doc = fitz.open(CANON / MERGED)
print(f"  merged kit is 8 pages (homepage says '8 pages · PDF'): {doc.page_count == 8}")
doc.close()

print("\n== HOMEPAGE LINK TEXT (read-only, not edited) ==")
for rel in ["app/page.tsx", "seventhcitypress/app/page.tsx"]:
    p = ROOT / rel
    if not p.exists():
        continue
    for i, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
        if "pages" in line and "PDF" in line:
            print(f"  {rel}:{i}  {line.strip()}")

print("\n== PAGE-COUNT REGRESSION ==")
CORRECT = {
    "Vol I PB": 189, "Vol I HC": 163, "Vol II PB": 271, "Vol II HC": 225,
    "Vol III PB": 205, "Vol III HC": 177, "Omnibus PB": 732, "Omnibus HC": 684,
}
STALE = [156, 178, 218, 260, 170, 200, 686, 734]
EPUB = [267, 385, 291]


def found(text: str, v: int) -> bool:
    return re.search(rf"(?<![\d.,]){v}(?![\d.,])", text) is not None


texts = {}
for n in NAMES:
    doc = fitz.open(CANON / n)
    texts[n] = "\n".join(p.get_text() for p in doc)
    doc.close()
allt = "\n".join(texts.values())
print("  correct counts, per file:")
for n in NAMES:
    hits = [f"{lab}={v}" for lab, v in CORRECT.items() if found(texts[n], v)]
    print(f"    {n:<32} {len(hits)}/8")
print(f"  all 8 present somewhere : "
      f"{all(found(allt, v) for v in CORRECT.values())}  "
      f"{[v for v in CORRECT.values() if found(allt, v)]}")
print(f"  stale counts anywhere   : {[v for v in STALE if found(allt, v)] or 'NONE'}")
print(f"  EPUB 267/385/291        : {[v for v in EPUB if found(allt, v)]}  "
      f"all three present: {all(found(allt, v) for v in EPUB)}")

print("\n== ~/Downloads AFTER (overwritten by build_pdf) ==")
for n in NAMES:
    p = DL / n
    canon_match = sha(p) == sha(CANON / n)
    print(f"  {n:<32} {p.stat().st_size:>6}B  {ts(p)}  sha={sha(p)[:16]}  "
          f"matches public/: {canon_match}")

print("\n== NO BACKUPS UNDER public/ ==")
for tree in [ROOT / "public", ROOT / "seventhcitypress" / "public"]:
    baks = [q for q in tree.rglob("*") if q.is_file() and (".bak" in q.name or ".PRE_" in q.name)]
    print(f"  {tree.relative_to(ROOT).as_posix():<34} backup files: {baks or 'none'}")
bk = ROOT / "scratch" / "press_kit_backups_2026-08-29"
print(f"  backups live in {bk.relative_to(ROOT).as_posix()}:")
for q in sorted(bk.glob("*PRE_GLYPH*")):
    print(f"    {q.name:<52} {q.stat().st_size:>6}B  sha={sha(q)[:16]}")

print("\n== GIT INDEX UNTOUCHED ==")
r = subprocess.run(["git", "diff", "--cached", "--name-status"], cwd=ROOT,
                   capture_output=True, text=True, encoding="utf-8", shell=True)
print(f"  staged entries: {r.stdout.strip() or '(none)'}")
