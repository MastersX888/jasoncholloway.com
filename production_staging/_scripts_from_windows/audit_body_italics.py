#!/usr/bin/env python3
"""Body-italic probe harness for Section 5 of pre_upload_audit.py.

RECONSTRUCTED 2026-08-29. The original module was referenced by
`pre_upload_audit.py`, documented in
`scratch/ops_reports/ITALICS_FIX_VERIFICATION_2026-07-30.md` section 5, and its
results were committed as `BODY_ITALIC_AUDIT.json` -- but the .py itself is not
present anywhere in the repository, so the audit's Section 5 was raising
ModuleNotFoundError and failing the whole verdict regardless of file content.

Nothing in pre_upload_audit.py was modified. This file restores the missing
dependency and implements the method exactly as documented:

  1. Sample italic runs from the BUILD DOCX (ground truth), excluding front
     matter, headings, titles, and Hz/display strings.
  2. Locate each probe in the rendered artifact.
  3. Require every covering glyph to carry an italic face. A phrase that also
     occurs in roman prose passes if ANY occurrence is italic.

THE HISTORICAL 12 / 12 / 11 PROBE COUNTS ARE NO LONGER EXPECTED
--------------------------------------------------------------
HARDENED 2026-08-29. Do not "restore" the old counts.

The reconstruction originally carried a CAP=12 truncation of the probe list,
chosen because it reproduced the probe counts recorded in BODY_ITALIC_AUDIT.json
(Book 1 = 12, Book 2 = 12, Book 3 = 11, omnibus = 35). That cap was fitted to the
target, not recovered from it: since the counts were the fitting objective,
matching them carried no independent information -- and the cap made the gate
dangerously front-loaded. Book 1 has 104 italic runs, 43 of which qualify under
the filter, yet only the first 12 were probed, all within the opening 19.6% of
the book. An italic collapse anywhere in the last 80% of Vol I would have PASSED.

The cap is gone. Every qualifying italic run is now probed, so the counts are
higher (roughly Book 1 = 43, Book 2 = 17, Book 3 = 11, omnibus = the sum) and
they will drift as the build DOCX is edited. Higher numbers in Section 5 of
pre_upload_audit.py are the intended outcome, not a regression. If a future
reader sees counts above 12 and reinstates a cap to get 12/12/11 back, they will
silently restore the blind spot.

SKIP_FRONT / MIN_LEN / MAX_LEN and the heading, Hz-key and all-caps exclusions
are kept: those are substantive filters that keep display styling (Hz keys,
subtitles, epigraphs, part titles) out of a check that is specifically about
narrative emphasis.

Counting is deliberately conservative: a probe that cannot be located at all is
a FAILURE (not_found), never a silent pass.

PAGE FURNITURE IS NOT PROSE
---------------------------
HEADER FIX 2026-08-29. Do not put running heads and folios back in the stream.

The widened coverage above immediately exposed a defect in this extractor. It
concatenated every block PyMuPDF returned, in PyMuPDF's order -- and PyMuPDF
emits the running head and the folio FIRST, before the body of the page. So a
probe whose prose straddles a page break was interrupted by page furniture:

  Vol I PB    ...historical marker HOLLOWAY 69 removed 1967.
  Omnibus PB  ...saying I'm here, saying the MASTERS X 186 gap is where I work.

The phrase was no longer contiguous, so `str.find` missed it. Symptoms were
'Cave entrance (sealed), historical marker removed 1967' -> not_found in Vol I
PB, and 'the gap is where I work' -> roman in the Omnibus PB (the only locatable
occurrence being unrelated roman dialogue on p184). Neither was an italic
collapse: glyph inspection showed 11/11 and 15/15 Garamond-Italic respectively.
This was a defect in what the harness counted as prose, not in the italic test.

The fix drops running-head and folio blocks before the character stream is
built, so the two halves of a page-spanning phrase are adjacent. The bands are
derived per document (`_furniture_bands`) rather than hard-coded, because the
four layouts put their furniture in four different places: the running head
baseline sits at 2.7% of trim height on the paperback singles, 2.5% on the
hardcover singles, 6.3% on the omnibus paperback and 4.2% on the omnibus
hardcover, while body text starts at 5.8% / 5.4% / 9.3% / 7.0%. No single
fraction of page height separates furniture from prose in all four -- the
omnibus paperback running head hangs BELOW where the single-volume hardcover
body text begins -- so a fixed band would either miss furniture or eat prose.

The derivation is geometric and content-blind: page furniture is the topmost
(or bottom-most) block on its page, repeated at the *same* y on a majority of
pages, inside the outer FURNITURE_ZONE of the trim, and short. Nothing keys off
the strings "HOLLOWAY" or "MASTERS X", so renaming the running head cannot
silently break it -- and the same strings legitimately appear mid-page on the
half-title and "Also by" pages, where they must NOT be dropped. Content is used
only as an independent assertion in _italic_page_furniture_control.py.

The band is deliberately narrow. It must never swallow prose: dropping real
narrative text would make a genuine italic collapse unobservable, which is the
same blind spot the CAP=12 removal was meant to close. `furniture_report()`
exists so that claim can be re-checked against any future build.
"""

from __future__ import annotations

import html
import json
import re
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

import fitz
from docx import Document

ROOT = Path(__file__).resolve().parents[2]
STAGING = ROOT / "production_staging"

# pre_upload_audit.py calls artifact_path(isbn, kind, bia.MASTER). The artifacts
# under review are the staged ones, so MASTER is the staging tree.
MASTER = STAGING

BOOK_DOCX = {
    1: STAGING / "_sources/build_docx/MASTERS_X_BOOK1_BUILD.docx",
    2: STAGING / "_sources/build_docx/MASTERS_X_BOOK2_BUILD.docx",
    3: STAGING / "_sources/build_docx/MASTERS_X_BOOK3_BUILD.docx",
}

# isbn -> (label, books covered, artifact kind). Order matches the original report.
CATALOG = {
    "9798256008048": ("Vol I PB", (1,), "pdf"),
    "9798256009953": ("Vol II PB", (2,), "pdf"),
    "9798256010072": ("Vol III PB", (3,), "pdf"),
    "9798295800801": ("Vol I HC", (1,), "pdf"),
    "9798295812675": ("Vol II HC", (2,), "pdf"),
    "9798295812705": ("Vol III HC", (3,), "pdf"),
    "9798256072704": ("Omnibus PB", (1, 2, 3), "pdf"),
    "9798295884412": ("Omnibus HC", (1, 2, 3), "pdf"),
    "9798256008819": ("Vol I EPUB", (1,), "epub"),
    "9798256009625": ("Vol II EPUB", (2,), "epub"),
    "9798256009809": ("Vol III EPUB", (3,), "epub"),
}

REL = {
    "9798256008048": "b1_inheritance/9798256008048_PB/interior.pdf",
    "9798256009953": "b2_grimoire/9798256009953_PB/interior.pdf",
    "9798256010072": "b3_kingdom/9798256010072_PB/interior.pdf",
    "9798295800801": "b1_inheritance/9798295800801_HC/interior.pdf",
    "9798295812675": "b2_grimoire/9798295812675_HC/interior.pdf",
    "9798295812705": "b3_kingdom/9798295812705_HC/interior.pdf",
    "9798256072704": "omnibus/9798256072704_PB/interior.pdf",
    "9798295884412": "omnibus/9798295884412_HC/interior.pdf",
    "9798256008819": "b1_inheritance/9798256008819_EPUB/9798256008819.epub",
    "9798256009625": "b2_grimoire/9798256009625_EPUB/9798256009625.epub",
    "9798256009809": "b3_kingdom/9798256009809_EPUB/9798256009809.epub",
}

SKIP_FRONT = 40      # paragraphs of front matter / epigraph apparatus
MIN_LEN = 14
MAX_LEN = 60
# No cap: every qualifying italic run is probed, so coverage reaches the end of
# the book instead of stopping in the opening pages. See module docstring.

HEADING = re.compile(r"^(PROLOGUE|EPILOGUE|CHAPTER|PART|VOLUME|SUB-BOOK|APPENDIX)", re.I)
HZ = re.compile(r"\d+(\.\d+)?\s*Hz", re.I)

_TRANS = {
    0x2018: "'", 0x2019: "'", 0x201C: '"', 0x201D: '"',
    0x2013: "-", 0x2014: "-", 0x00A0: " ", 0xFB01: "fi", 0xFB02: "fl",
}


def normalize(s: str) -> str:
    return re.sub(r"\s+", " ", s.translate(_TRANS)).strip()


def artifact_path(isbn: str, kind: str, master: Path) -> Path | None:
    rel = REL.get(isbn)
    return (master / rel) if rel else None


# --------------------------------------------------------------------------
# Probe collection
# --------------------------------------------------------------------------

def collect_probes(book: int) -> list[str]:
    """Narrative italic runs from the BUILD DOCX, in document order."""
    doc = Document(str(BOOK_DOCX[book]))
    probes: list[str] = []
    seen: set[str] = set()
    for pi, para in enumerate(doc.paragraphs):
        if pi < SKIP_FRONT:
            continue
        ptext = (para.text or "").strip()
        for run in para.runs:
            t = (run.text or "").strip()
            if not run.italic or not t:
                continue
            if not (MIN_LEN <= len(t) <= MAX_LEN):
                continue
            if HEADING.match(t) or HEADING.match(ptext) or HZ.search(t) or t.isupper():
                continue
            if t in seen:
                continue
            seen.add(t)
            probes.append(t)
    return probes


# --------------------------------------------------------------------------
# Result
# --------------------------------------------------------------------------

@dataclass
class Result:
    isbn: str
    label: str
    kind: str
    italic_probes: int = 0
    roman_probes: int = 0
    not_found: int = 0
    pages: int = 0
    failures: list[str] = field(default_factory=list)
    missing: list[str] = field(default_factory=list)
    italic_samples: list[str] = field(default_factory=list)

    @property
    def passed(self) -> bool:
        return self.roman_probes == 0 and self.not_found == 0 and self.italic_probes > 0


def _score(pairs: list[tuple[str, bool]], probes: list[str], result: Result) -> None:
    """pairs = [(char, is_italic)] for the whole artifact, already normalized."""
    text = "".join(c for c, _ in pairs)
    for probe in probes:
        needle = normalize(probe)
        start = 0
        found = False
        any_italic = False
        while True:
            i = text.find(needle, start)
            if i < 0:
                break
            found = True
            covering = [ital for c, ital in pairs[i:i + len(needle)] if not c.isspace()]
            if covering and all(covering):
                any_italic = True
                break
            start = i + 1
        if not found:
            result.not_found += 1
            result.missing.append(probe)
        elif any_italic:
            result.italic_probes += 1
            if len(result.italic_samples) < 2:
                result.italic_samples.append(probe)
        else:
            result.roman_probes += 1
            result.failures.append(probe)


def _normalize_pairs(pairs: list[tuple[str, bool]]) -> list[tuple[str, bool]]:
    out: list[tuple[str, bool]] = []
    for ch, ital in pairs:
        mapped = _TRANS.get(ord(ch), ch)
        for c in mapped:
            if c.isspace():
                if out and out[-1][0] == " ":
                    continue
                out.append((" ", False))
            else:
                out.append((c, ital))
    while out and out[0][0] == " ":
        out.pop(0)
    return out


# --------------------------------------------------------------------------
# PDF
# --------------------------------------------------------------------------

# Page furniture -- the running head and the folio -- is not body prose, and
# PyMuPDF emits it before the body of each page. Left in the stream it lands
# between the two halves of any phrase that straddles a page break. See the
# "PAGE FURNITURE IS NOT PROSE" section of the module docstring.
#
# These are shape constraints, not string matches. A running head is: the
# extreme block on its page, within the outer FURNITURE_ZONE of the trim,
# sitting on a y repeated across at least FURNITURE_MIN_SHARE of pages, and no
# longer than FURNITURE_MAX_CHARS. A line of narrative prose satisfies none of
# them, which is what keeps the band from eating body text.
FURNITURE_ZONE = 0.15        # fraction of trim height searched for furniture
FURNITURE_MIN_SHARE = 0.50   # a furniture row must recur on this share of pages
FURNITURE_MAX_CHARS = 48     # a running head is a label; a prose line is longer
_ROW_TOL = 0.5               # pt; tolerance for "the same y" across pages


def _block_text(block: dict) -> str:
    return "".join(
        span.get("text") or ""
        for line in block.get("lines", [])
        for span in line.get("spans", [])
    )


def _furniture_bands(doc: "fitz.Document") -> tuple[float, float]:
    """Derive (head_band_bottom, folio_band_top) in points for one document.

    Returned as absolute points, but every threshold that produces them is a
    fraction of this document's own trim height, so the 5.50x8.50 paperback and
    the 6.14x9.21 hardcover each calibrate themselves. Returns (0.0, height) --
    i.e. drop nothing -- when no repeated furniture row can be established, so
    an unrecognised layout degrades to the old behaviour rather than to a band
    that guesses.
    """
    if doc.page_count == 0:
        return 0.0, float("inf")
    height = doc[0].rect.height
    top_zone = height * FURNITURE_ZONE
    bot_zone = height * (1.0 - FURNITURE_ZONE)

    head_rows: dict[float, float] = {}   # y0 -> max y1 seen at that row
    head_hits: dict[float, int] = {}
    folio_hits: dict[float, int] = {}
    for pno in range(doc.page_count):
        # "blocks" is far cheaper than "dict" and carries the bbox and text we
        # need to calibrate; the scoring pass below still uses "dict" for fonts.
        blocks = [b for b in doc[pno].get_text("blocks") if b[6] == 0 and (b[4] or "").strip()]
        if not blocks:
            continue
        top = min(blocks, key=lambda b: b[1])
        if top[3] <= top_zone and len((top[4] or "").strip()) <= FURNITURE_MAX_CHARS:
            row = round(top[1], 1)
            head_hits[row] = head_hits.get(row, 0) + 1
            head_rows[row] = max(head_rows.get(row, 0.0), top[3])
        bot = max(blocks, key=lambda b: b[3])
        if bot[1] >= bot_zone and len((bot[4] or "").strip()) <= FURNITURE_MAX_CHARS:
            row = round(bot[1], 1)
            folio_hits[row] = folio_hits.get(row, 0) + 1

    quorum = doc.page_count * FURNITURE_MIN_SHARE
    head_bottom = 0.0
    if head_hits:
        row, hits = max(head_hits.items(), key=lambda kv: kv[1])
        if hits >= quorum:
            head_bottom = head_rows[row] + _ROW_TOL
    folio_top = height
    if folio_hits:
        row, hits = max(folio_hits.items(), key=lambda kv: kv[1])
        if hits >= quorum:
            folio_top = row - _ROW_TOL
    if folio_top <= head_bottom:            # degenerate; trust neither band
        return 0.0, height
    return head_bottom, folio_top


def _is_page_furniture(block: dict, head_bottom: float, folio_top: float) -> bool:
    """True for a block that lies wholly inside a furniture band and is short.

    Both conditions are required. The band alone would be enough for these eight
    interiors, but the length guard means a band that is somehow mis-derived
    still cannot silently delete a line of narrative prose.
    """
    _, y0, _, y1 = block.get("bbox", (0, 0, 0, 0))
    if not (y1 <= head_bottom or y0 >= folio_top):
        return False
    return len(_block_text(block).strip()) <= FURNITURE_MAX_CHARS


def pdf_pairs(path: Path, drop_furniture: bool = True) -> list[tuple[str, bool]]:
    """[(char, is_italic)] for the body prose of a PDF, page furniture removed.

    drop_furniture=False reproduces the pre-fix stream. It exists so the control
    scripts can show the defect and the fix side by side against the same file;
    the audit itself always drops furniture.
    """
    doc = fitz.open(path)
    head_bottom, folio_top = _furniture_bands(doc) if drop_furniture else (0.0, float("inf"))
    pairs: list[tuple[str, bool]] = []
    for pno in range(doc.page_count):
        d = doc[pno].get_text("dict")
        for block in d.get("blocks", []):
            if drop_furniture and _is_page_furniture(block, head_bottom, folio_top):
                continue
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    font = (span.get("font") or "").lower()
                    ital = ("italic" in font) or ("oblique" in font) or bool(span.get("flags", 0) & 2)
                    for ch in (span.get("text") or ""):
                        pairs.append((ch, ital))
                pairs.append((" ", False))
    doc.close()
    return pairs


def furniture_report(path: Path) -> dict:
    """What the furniture bands remove from one PDF, for auditing the bands.

    Read-only. Used by _italic_page_furniture_control.py to assert that the
    dropped set is running heads and folios and nothing else.
    """
    doc = fitz.open(path)
    pages = doc.page_count
    height = doc[0].rect.height if pages else 0.0
    head_bottom, folio_top = _furniture_bands(doc)
    dropped: list[tuple[int, str]] = []
    kept_chars = 0
    for pno in range(pages):
        for block in doc[pno].get_text("dict").get("blocks", []):
            text = _block_text(block)
            if _is_page_furniture(block, head_bottom, folio_top):
                dropped.append((pno + 1, text.strip()))
            else:
                kept_chars += len(text)
    doc.close()
    return {
        "pages": pages,
        "height": height,
        "head_bottom": head_bottom,
        "folio_top": folio_top,
        "head_bottom_pct": (head_bottom / height * 100) if height else 0.0,
        "folio_top_pct": (folio_top / height * 100) if height else 0.0,
        "dropped": dropped,
        "dropped_chars": sum(len(t) for _, t in dropped),
        "kept_chars": kept_chars,
    }


def audit_pdf(path: Path, probes: list[str], result: Result) -> Result:
    with fitz.open(path) as doc:
        result.pages = doc.page_count
    _score(_normalize_pairs(pdf_pairs(path)), probes, result)
    return result


# --------------------------------------------------------------------------
# EPUB
# --------------------------------------------------------------------------

_TAG = re.compile(r"<(/?)([a-zA-Z0-9]+)([^>]*)>")
_ITALIC_TAGS = {"em", "i", "cite"}
_VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}
_BREAKING_TAGS = ("p", "div", "br", "h1", "h2", "h3", "li")


def _opens_italic(name: str, attrs: str) -> bool:
    return (
        name in _ITALIC_TAGS
        or 'class="i"' in attrs
        or "font-style:italic" in attrs.replace(" ", "")
    )


def _xhtml_pairs(xhtml: str) -> list[tuple[str, bool]]:
    # Drop head/script/style outright so CSS text is never scored as prose.
    xhtml = re.sub(r"<head\b.*?</head>", " ", xhtml, flags=re.S | re.I)
    xhtml = re.sub(r"<(script|style)\b.*?</\1>", " ", xhtml, flags=re.S | re.I)
    pairs: list[tuple[str, bool]] = []
    # Italic-ness must be matched to the element that opened it. A closing tag
    # carries no attributes, so deriving it from `</span>` reads as non-italic
    # and the counter never comes back down -- every later character then scores
    # italic, which is a false PASS. Keep a stack of open elements instead.
    stack: list[tuple[str, bool]] = []
    depth = 0
    pos = 0
    for m in _TAG.finditer(xhtml):
        chunk = xhtml[pos:m.start()]
        if chunk:
            for ch in html.unescape(chunk):
                pairs.append((ch, depth > 0))
        closing, name, attrs = m.group(1), m.group(2).lower(), m.group(3)
        selfclose = attrs.rstrip().endswith("/")
        if closing:
            # Pop back to the nearest matching open, implicitly closing anything
            # left open above it. A close with no matching open is stray markup
            # and is ignored rather than driving the counter negative.
            for idx in range(len(stack) - 1, -1, -1):
                if stack[idx][0] == name:
                    depth -= sum(1 for _, ital in stack[idx:] if ital)
                    del stack[idx:]
                    break
        elif not selfclose and name not in _VOID_TAGS:
            italic = _opens_italic(name, attrs)
            stack.append((name, italic))
            if italic:
                depth += 1
        depth = max(depth, 0)
        if name in _BREAKING_TAGS:
            pairs.append((" ", False))
        pos = m.end()
    tail = xhtml[pos:]
    if tail:
        for ch in html.unescape(tail):
            pairs.append((ch, depth > 0))
    return pairs


def audit_epub(path: Path, probes: list[str], result: Result) -> Result:
    pairs: list[tuple[str, bool]] = []
    with zipfile.ZipFile(path) as z:
        names = [n for n in z.namelist() if n.endswith((".xhtml", ".html", ".htm"))]
        for n in sorted(names):
            pairs.extend(_xhtml_pairs(z.read(n).decode("utf-8", "replace")))
            pairs.append((" ", False))
    _score(_normalize_pairs(pairs), probes, result)
    return result


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

def main() -> int:
    probe_cache = {b: collect_probes(b) for b in BOOK_DOCX}
    for b, ps in probe_cache.items():
        print(f"book {b}: {len(ps)} probes")

    rows = []
    ok = True
    print(f"\n{'ISBN':16} {'format':12} {'ital':>5} {'roman':>6} {'nf':>4}  verdict")
    print("-" * 60)
    for isbn, (label, books, kind) in CATALOG.items():
        path = artifact_path(isbn, kind, MASTER)
        res = Result(isbn=isbn, label=label, kind=kind)
        if path is None or not path.exists():
            print(f"{isbn:16} {label:12} {'-':>5} {'-':>6} {'-':>4}  MISSING")
            ok = False
            continue
        probes = [p for b in books for p in probe_cache[b]]
        (audit_pdf if kind == "pdf" else audit_epub)(path, probes, res)
        if not res.passed:
            ok = False
        print(f"{isbn:16} {label:12} {res.italic_probes:>5} {res.roman_probes:>6} "
              f"{res.not_found:>4}  {'PASS' if res.passed else 'FAIL'}")
        for f in res.failures:
            print(f"      roman: {f!r}")
        for f in res.missing:
            print(f"      not found: {f!r}")
        rows.append({
            "isbn": isbn, "label": label, "kind": kind,
            "italic": res.italic_probes, "roman": res.roman_probes,
            "not_found": res.not_found, "pages": res.pages, "pass": res.passed,
            "roman_samples": res.failures[:4], "italic_samples": res.italic_samples,
        })

    out = Path(__file__).with_name("BODY_ITALIC_AUDIT.json")
    out.write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nWrote {out.name}")
    print("BODY ITALICS OK" if ok else "BODY ITALICS FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
