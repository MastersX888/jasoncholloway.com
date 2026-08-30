#!/usr/bin/env python3
"""SUPERSEDED 2026-08-29 - DO NOT RUN. Use stage_all_14.py instead.

This script stages only 11 of the 14 required artifacts. It excludes the Book 2
print interiors on the assertion that no Book 2 source was touched by the canon
fix or the SUB-BOOK removal. That assertion was true when written and is false
now: the 4:47 pm character-name pass rewrote four character references in
_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx (Margaret Masters -> Lorraine
Masters; Senator Margaret Holt -> Senator Deborah Holt; Sarah Chen x2 ->
Rosalind Lindgren). Book 2 hardcover, paperback, retail EPUB and Kindle EPUB are
all required uploads this round.

Running this script would also overwrite the destination README with one
repeating the false exclusion, so it is guarded below.

Stage the 2026-08-29 revision round into a single drag-and-drop upload folder.

Uses the filename convention from the July 31 run (see
scratch/ops_reports/INGRAM_UPLOAD_RUN_2026-07-31.md):

    {ISBN}_{HC|PB}_interior.pdf
    {isbn}.epub

Verifies every artifact before copying and refuses to stage anything that fails.
No cover files are staged: no cover PDF exists anywhere on this machine.
"""

from __future__ import annotations

import hashlib
import re
import shutil
import sys
import zipfile
from pathlib import Path

import fitz

sys.exit(
    "SUPERSEDED 2026-08-29 - refusing to run.\n"
    "This script omits the Book 2 print interiors on a claim that is now false:\n"
    "the character-name pass changed 4 references in MASTERS_X_BOOK2_BUILD.docx.\n"
    "Use stage_all_14.py, which stages all 14 required artifacts."
)

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"
DEST = Path(r"C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER_2026-08-29")

# isbn, fmt, source, live/target pages, trim, why it is in this round
PRINT_JOBS = [
    ("9798295884412", "HC", "omnibus/9798295884412_HC/interior.pdf", 684, (6.14, 9.21),
     "canon fix + SUB-BOOK removal"),
    ("9798256072704", "PB", "omnibus/9798256072704_PB/interior.pdf", 732, (5.50, 8.50),
     "canon fix + SUB-BOOK removal"),
    ("9798295800801", "HC", "b1_inheritance/9798295800801_HC/interior.pdf", 163, (6.14, 9.21),
     "Chapter One canon fix"),
    ("9798256008048", "PB", "b1_inheritance/9798256008048_PB/interior.pdf", 189, (5.50, 8.50),
     "Chapter One canon fix"),
    ("9798295812705", "HC", "b3_kingdom/9798295812705_HC/interior.pdf", 177, (6.14, 9.21),
     "SUB-BOOK removal"),
    ("9798256010072", "PB", "b3_kingdom/9798256010072_PB/interior.pdf", 205, (5.50, 8.50),
     "SUB-BOOK removal"),
]

EPUB_JOBS = [
    ("9798256008819", "b1_inheritance/9798256008819_EPUB/9798256008819.epub",
     "scene-break centering + Chapter One canon fix"),
    ("9798256009625", "b2_grimoire/9798256009625_EPUB/9798256009625.epub",
     "scene-break centering"),
    ("9798256009809", "b3_kingdom/9798256009809_EPUB/9798256009809.epub",
     "scene-break centering + SUB-BOOK removal"),
]

# RETRACTED 2026-08-29. This exclusion was wrong and is why the script is superseded.
# The original rationale is kept verbatim below only so the error stays legible:
#
#   "Deliberately excluded: Book 2 print (9798295812675 HC / 9798256009953 PB).
#    No Book 2 source was touched by either fix, so those interiors are textually
#    identical to what is already live; revising them would cost a fee and a
#    re-approval cycle for zero change."
#
# Four character references changed in MASTERS_X_BOOK2_BUILD.docx. Nothing is
# excluded from the 2026-08-29 round; stage_all_14.py stages all 14 artifacts.
EXCLUDED = [
    ("9798295812675", "HC", 225,
     "RETRACTED - Book 2 print IS required; 4 character references changed"),
    ("9798256009953", "PB", 271,
     "RETRACTED - Book 2 print IS required; 4 character references changed"),
]


def sha16(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for c in iter(lambda: f.read(1 << 20), b""):
            h.update(c)
    return h.hexdigest()[:16]


rows: list[tuple] = []
ok = True
DEST.mkdir(parents=True, exist_ok=True)

print("=" * 88)
print("PRINT INTERIORS")
print("=" * 88)
for isbn, fmt, rel, pages, trim, why in PRINT_JOBS:
    src = STAGE / rel
    if not src.is_file():
        print(f"  {isbn} {fmt}: MISSING {rel}")
        ok = False
        continue
    if src.read_bytes()[:4] != b"%PDF":
        print(f"  {isbn} {fmt}: NOT A PDF - refusing")
        ok = False
        continue
    d = fitz.open(src)
    got, r = d.page_count, d[0].rect
    full = " ".join(d[i].get_text() for i in range(got))
    d.close()
    sub = len(re.findall(r"SUB.?BOOK", full, re.I))
    tw, th = r.width / 72, r.height / 72
    trim_ok = abs(tw - trim[0]) < 0.02 and abs(th - trim[1]) < 0.02
    problems = []
    if got != pages:
        problems.append(f"pages {got} != expected {pages}")
    if not trim_ok:
        problems.append(f"trim {tw:.2f}x{th:.2f}")
    if sub:
        problems.append(f"SUB-BOOK x{sub}")
    if problems:
        print(f"  {isbn} {fmt}: REFUSED - {'; '.join(problems)}")
        ok = False
        continue
    dst = DEST / f"{isbn}_{fmt}_interior.pdf"
    shutil.copy2(src, dst)
    rows.append((isbn, fmt, dst.name, got, f"{tw:.2f}x{th:.2f}", sha16(dst), why))
    print(f"  {isbn} {fmt}: staged {got} pp, trim {tw:.2f}x{th:.2f}, SUB-BOOK 0")

print()
print("=" * 88)
print("RETAIL EPUBS")
print("=" * 88)
for isbn, rel, why in EPUB_JOBS:
    src = STAGE / rel
    if not src.is_file():
        print(f"  {isbn}: MISSING")
        ok = False
        continue
    with zipfile.ZipFile(src) as z:
        body = "".join(
            z.read(n).decode("utf-8", "replace") for n in z.namelist() if n.endswith(".xhtml")
        )
    text = re.sub(r"<[^>]+>", " ", body)
    sub = len(re.findall(r"SUB.?BOOK", text, re.I))
    linked = all(
        "style/book.css" in z.read(n).decode("utf-8", "replace")
        for z in [zipfile.ZipFile(src)]
        for n in z.namelist()
        if n.endswith(".xhtml") and "cover" not in n
    )
    if sub or not linked:
        print(f"  {isbn}: REFUSED - SUB-BOOK x{sub}, stylesheet linked={linked}")
        ok = False
        continue
    dst = DEST / f"{isbn}.epub"
    shutil.copy2(src, dst)
    rows.append((isbn, "EPUB", dst.name, "-", "-", sha16(dst), why))
    print(f"  {isbn}: staged, SUB-BOOK 0, stylesheet linked on all pages")

readme = DEST / "README_UPLOAD_2026-08-29.md"
lines = [
    "# IngramSpark revision round — 2026-08-29",
    "",
    "Nine titles. Interiors and EPUBs only — **no cover changes in this round**.",
    "Every page count below already matches what is live, so no cover or spine",
    "rework is required and the page-count metadata field should NOT need editing.",
    "",
    "For each title: Titles list -> search ISBN -> **Revise Files** -> replace the",
    "interior (or EPUB) -> submit. Do not start a new title setup.",
    "",
    "| ISBN | Fmt | File to upload | Pages | Trim | sha256[:16] | Why |",
    "|---|---|---|---|---|---|---|",
]
for isbn, fmt, name, pages, trim, h, why in rows:
    lines.append(f"| {isbn} | {fmt} | `{name}` | {pages} | {trim} | `{h}` | {why} |")

lines += [
    "",
    "## Do NOT upload",
    "",
    "| ISBN | Fmt | Pages | Reason |",
    "|---|---|---|---|",
]
for isbn, fmt, pages, why in EXCLUDED:
    lines.append(f"| {isbn} | {fmt} | {pages} | {why} |")

lines += [
    "",
    "## Notes",
    "",
    "- **Omnibus page counts.** Built at 684 HC / 732 PB per author ruling 2026-08-29.",
    "  `CANON.md` and the July 28 manifest claim the live interiors are 686 / 734.",
    "  If Ingram shows 686 / 734 for these titles, STOP and re-check before submitting —",
    "  the interior would be two pages short.",
    "- **Hardcover padding.** The omnibus HC generator emits 680 pages; the shipped file",
    "  is 684 via `pad_omnibus_hc_to_canon.py`. That step is mandatory after any rebuild.",
    "- **CORRECTED 2026-08-29: Book 2 print is NOT excluded.** The earlier claim that no",
    "  Book 2 source was touched by either fix is false — the character-name pass changed",
    "  four references in `MASTERS_X_BOOK2_BUILD.docx`. All 14 artifacts are required.",
    "- **No covers on disk.** No `cover_jacket.pdf`, `cover_wrap.pdf` or `cover_caselam.pdf`",
    "  exists anywhere on this machine. If Ingram demands a matching cover, it cannot be",
    "  produced locally and the source package will have to be recovered first.",
    "",
    "Full write-ups: `production_staging/CANON_FIX_2026-08-29.md`,",
    "`production_staging/SUBBOOK_REMOVAL_2026-08-29.md`,",
    "`production_staging/EPUB_REBUILD_2026-08-29.md`.",
]
readme.write_text("\n".join(lines), encoding="utf-8")

print()
print("=" * 88)
print(f"STAGED -> {DEST}")
print("=" * 88)
for f in sorted(DEST.iterdir()):
    print(f"  {f.stat().st_size:>11,}  {f.name}")
print()
print("STAGING OK" if ok else "STAGING INCOMPLETE - see refusals above")
sys.exit(0 if ok else 1)
