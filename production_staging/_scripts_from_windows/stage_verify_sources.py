#!/usr/bin/env python3
"""Read-only verification gate for the 2026-08-29 post-name-change artifacts.

Confirms every print interior and EPUB in production_staging/ is the build that
followed the character-name pass (Lorraine Masters / Deborah Holt / Idris
Broussard / Kofi Asante) and the 2003 canon fix, before any of them are copied
to the Desktop handoff folder.

Opens nothing for writing. Emits JSON on stdout for the staging step to consume.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import zipfile
from pathlib import Path

import fitz

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
STAGE = ROOT / "production_staging"

# isbn, fmt, relpath, expected pages, trim (w,h) inches, volume key
PRINT_JOBS = [
    ("9798295800801", "HC", "b1_inheritance/9798295800801_HC/interior.pdf", 163, (6.14, 9.21), "v1"),
    ("9798256008048", "PB", "b1_inheritance/9798256008048_PB/interior.pdf", 189, (5.50, 8.50), "v1"),
    ("9798295812675", "HC", "b2_grimoire/9798295812675_HC/interior.pdf", 225, (6.14, 9.21), "v2"),
    ("9798256009953", "PB", "b2_grimoire/9798256009953_PB/interior.pdf", 271, (5.50, 8.50), "v2"),
    ("9798295812705", "HC", "b3_kingdom/9798295812705_HC/interior.pdf", 177, (6.14, 9.21), "v3"),
    ("9798256010072", "PB", "b3_kingdom/9798256010072_PB/interior.pdf", 205, (5.50, 8.50), "v3"),
    ("9798295884412", "HC", "omnibus/9798295884412_HC/interior.pdf", 684, (6.14, 9.21), "omni"),
    ("9798256072704", "PB", "omnibus/9798256072704_PB/interior.pdf", 732, (5.50, 8.50), "omni"),
]

# isbn, variant, relpath, volume key
EPUB_JOBS = [
    ("9798256008819", "retail", "b1_inheritance/9798256008819_EPUB/9798256008819.epub", "v1"),
    ("9798256009625", "retail", "b2_grimoire/9798256009625_EPUB/9798256009625.epub", "v2"),
    ("9798256009809", "retail", "b3_kingdom/9798256009809_EPUB/9798256009809.epub", "v3"),
    ("9798256008819", "kindle", "b1_inheritance/9798256008819_KINDLE/9798256008819_KINDLE.epub", "v1"),
    ("9798256009625", "kindle", "b2_grimoire/9798256009625_KINDLE/9798256009625_KINDLE.epub", "v2"),
    ("9798256009809", "kindle", "b3_kingdom/9798256009809_KINDLE/9798256009809_KINDLE.epub", "v3"),
]

# Names that must be present, by volume. Omnibus must contain all of them.
REQUIRED = {
    "v1": ["Lorraine Masters"],
    "v2": ["Lorraine Masters", "Senator Deborah Holt", "Rosalind Lindgren"],
    "v3": ["Idris Broussard", "Kofi Asante"],
}
REQUIRED["omni"] = sorted({n for v in REQUIRED.values() for n in v})

# Must appear nowhere. "Andrew Chen" and "Yuki Tanaka" are RETAINED characters
# and are deliberately not in this list.
FORBIDDEN = [
    "Margaret Masters", "Sarah Chen", "Marcus Chen", "Margaret Chen",
    "Laura Chen", "Lin Chen", "Michael Chen", "Andrew Tanaka",
    "Marcus Jr.", "Kofi Mensah", "Senator Margaret",
]

CANON_PRESENT = "grandfather died in 2003"
CANON_ABSENT = "would never meet"
# The 2003 sentence lives in Vol I Chapter One, so only Vol I and the omnibus
# carry it; Vol II / Vol III are not expected to.
CANON_VOLS = {"v1", "omni"}


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for c in iter(lambda: f.read(1 << 20), b""):
            h.update(c)
    return h.hexdigest()


def variants(raw: str) -> list[str]:
    """Whitespace-normalised text, plus a de-hyphenated copy.

    A name can be split by a line break ("Lorraine\\nMasters") or by hyphenation
    ("Lor-\\nraine"). Searching both forms avoids a false 'name absent' result.
    """
    flat = re.sub(r"\s+", " ", raw.replace("\u00ad", ""))
    dehyph = re.sub(r"\s+", " ", re.sub(r"-\s*\n\s*", "", raw.replace("\u00ad", "")))
    return [flat, dehyph]


def scan(texts: list[str], vol: str) -> dict:
    def has(needle: str) -> bool:
        return any(needle in t for t in texts)

    missing = [n for n in REQUIRED[vol] if not has(n)]
    present_bad = [n for n in FORBIDDEN if has(n)]
    res = {
        "names_required_missing": missing,
        "names_forbidden_present": present_bad,
        "canon_2003": has(CANON_PRESENT) if vol in CANON_VOLS else None,
        "canon_stale_would_never_meet": has(CANON_ABSENT),
        "subbook_hits": sum(len(re.findall(r"SUB.?BOOK", t, re.I)) for t in texts[:1]),
    }
    return res


def check_pdf(isbn, fmt, rel, pages, trim, vol) -> dict:
    src = STAGE / rel
    r: dict = {"isbn": isbn, "fmt": fmt, "rel": rel, "vol": vol,
               "exists": src.is_file()}
    if not src.is_file():
        r["problems"] = ["missing source"]
        return r
    r["bytes"] = src.stat().st_size
    r["sha256"] = sha256(src)
    r["magic_ok"] = src.read_bytes()[:4] == b"%PDF"
    d = fitz.open(src)
    r["pages"] = d.page_count
    r["pages_expected"] = pages
    rect = d[0].rect
    tw, th = rect.width / 72, rect.height / 72
    r["trim"] = f"{tw:.2f}x{th:.2f}"
    r["trim_ok"] = abs(tw - trim[0]) < 0.02 and abs(th - trim[1]) < 0.02
    raw = "\n".join(d[i].get_text() for i in range(d.page_count))
    # Confirm the whole document is renderable, not just parseable.
    render_err = None
    try:
        for i in range(d.page_count):
            d[i].get_pixmap(dpi=18)
    except Exception as e:  # noqa: BLE001
        render_err = f"{type(e).__name__}: {e}"
    d.close()
    r["renders_clean"] = render_err is None
    if render_err:
        r["render_error"] = render_err
    r.update(scan(variants(raw), vol))

    p = []
    if r["pages"] != pages:
        p.append(f"pages {r['pages']} != {pages}")
    if not r["magic_ok"]:
        p.append("not a PDF")
    if not r["trim_ok"]:
        p.append(f"trim {r['trim']}")
    if not r["renders_clean"]:
        p.append("render error")
    if r["names_required_missing"]:
        p.append("missing names: " + ", ".join(r["names_required_missing"]))
    if r["names_forbidden_present"]:
        p.append("OLD NAMES: " + ", ".join(r["names_forbidden_present"]))
    if vol in CANON_VOLS and not r["canon_2003"]:
        p.append("canon 2003 missing")
    if r["canon_stale_would_never_meet"]:
        p.append("stale 'would never meet'")
    if r["subbook_hits"]:
        p.append(f"SUB-BOOK x{r['subbook_hits']}")
    r["problems"] = p
    return r


def check_epub(isbn, variant, rel, vol) -> dict:
    src = STAGE / rel
    r: dict = {"isbn": isbn, "variant": variant, "rel": rel, "vol": vol,
               "exists": src.is_file()}
    if not src.is_file():
        r["problems"] = ["missing source"]
        return r
    r["bytes"] = src.stat().st_size
    r["sha256"] = sha256(src)
    with zipfile.ZipFile(src) as z:
        bad_zip = z.testzip()
        names = z.namelist()
        opf_name = next(n for n in names if n.endswith(".opf"))
        opf = z.read(opf_name).decode("utf-8", "replace")
        pages = [n for n in names if n.endswith(".xhtml")]
        raw = " ".join(z.read(n).decode("utf-8", "replace") for n in pages)
    r["zip_ok"] = bad_zip is None
    text = re.sub(r"<[^>]+>", " ", raw)
    r.update(scan(variants(text), vol))

    ids = re.findall(r"<dc:identifier[^>]*>(.*?)</dc:identifier>", opf, re.S)
    srcs = re.findall(r"<dc:source[^>]*>(.*?)</dc:source>", opf, re.S)
    r["dc_identifier"] = [i.strip() for i in ids]
    r["dc_source"] = [s.strip() for s in srcs]
    idjoined = " ".join(r["dc_identifier"])
    srcjoined = " ".join(r["dc_source"])

    p = list(r["problems"]) if "problems" in r else []
    if not r["zip_ok"]:
        p.append("corrupt zip entry")
    if r["names_required_missing"]:
        p.append("missing names: " + ", ".join(r["names_required_missing"]))
    if r["names_forbidden_present"]:
        p.append("OLD NAMES: " + ", ".join(r["names_forbidden_present"]))
    if vol in CANON_VOLS and not r["canon_2003"]:
        p.append("canon 2003 missing")
    if r["canon_stale_would_never_meet"]:
        p.append("stale 'would never meet'")
    if r["subbook_hits"]:
        p.append(f"SUB-BOOK x{r['subbook_hits']}")

    if variant == "kindle":
        if "urn:uuid:" not in idjoined:
            p.append(f"kindle dc:identifier not a uuid: {idjoined!r}")
        if isbn in idjoined:
            p.append("kindle dc:identifier carries the print ISBN")
        if isbn not in re.sub(r"[-\u2011\u2013\s]", "", srcjoined):
            p.append(f"kindle dc:source missing print ISBN: {srcjoined!r}")
    else:
        if isbn not in re.sub(r"[-\u2011\u2013\s]", "", idjoined):
            p.append(f"retail dc:identifier missing ISBN: {idjoined!r}")
    r["problems"] = p
    return r


def epubcheck(p: Path) -> dict:
    """Run the bundled EPUBCheck jar and count fatals/errors/warnings."""
    from epubcheck.const import EPUBCHECK, JAVA  # type: ignore

    cp = subprocess.run(
        [JAVA, "-Duser.language=en", "-jar", EPUBCHECK, str(p), "--quiet"],
        capture_output=True, text=True,
    )
    out = (cp.stdout or "") + (cp.stderr or "")
    return {
        "returncode": cp.returncode,
        "fatal": len(re.findall(r"^FATAL", out, re.M)),
        "error": len(re.findall(r"^ERROR", out, re.M)),
        "warning": len(re.findall(r"^WARNING", out, re.M)),
        "tail": out.strip()[-1200:],
    }


def main() -> int:
    report = {"print": [], "epub": []}
    for job in PRINT_JOBS:
        report["print"].append(check_pdf(*job))
    for job in EPUB_JOBS:
        r = check_epub(*job)
        if r.get("exists"):
            ec = epubcheck(STAGE / r["rel"])
            r["epubcheck"] = ec
            if ec["fatal"] or ec["error"]:
                r["problems"].append(
                    f"epubcheck {ec['fatal']} fatal / {ec['error']} error")
        report["epub"].append(r)

    # Retail and Kindle must be genuinely different files, not duplicates.
    dup = []
    by = {(e["isbn"], e["variant"]): e.get("sha256") for e in report["epub"]}
    for isbn in ("9798256008819", "9798256009625", "9798256009809"):
        a, b = by.get((isbn, "retail")), by.get((isbn, "kindle"))
        if a and b and a == b:
            dup.append(isbn)
    report["retail_kindle_identical"] = dup

    report["all_clear"] = (
        not dup
        and all(not x["problems"] for x in report["print"])
        and all(not x["problems"] for x in report["epub"])
    )
    print(json.dumps(report, indent=1))
    return 0 if report["all_clear"] else 1


if __name__ == "__main__":
    sys.exit(main())
