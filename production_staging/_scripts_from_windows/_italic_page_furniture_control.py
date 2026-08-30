#!/usr/bin/env python3
"""Negative control for the page-furniture exclusion in audit_body_italics.

THE DEFECT THIS PINS
--------------------
PyMuPDF emits the running head and the folio before the body of each page, so
the pre-2026-08-29 extractor -- which concatenated every block -- interleaved
page furniture with prose. A probe whose sentence straddles a page break was
split by it:

    ...historical marker HOLLOWAY 69 removed 1967.

and `str.find` missed the phrase. Vol I PB reported the probe 'Cave entrance
(sealed), historical marker removed 1967' as not_found, and the Omnibus PB
scored 'the gap is where I work' roman because the only *contiguous* occurrence
left was unrelated roman dialogue on p184. Neither was an italic collapse; both
were set in Garamond-Italic throughout.

These controls fail against the pre-fix extractor and pass against the current
one. Controls A and B pin the defect itself. Controls C, D and E pin the far
more dangerous failure in the other direction: a furniture band that is too
aggressive would delete narrative text, and text that never reaches the scorer
can never be caught scoring roman. That is the same blind spot the CAP=12
removal was meant to close, so the band is held to "running heads and folios,
nothing else" on every shipping interior.

Read-only. Opens the eight print interiors and writes nothing.
"""
from __future__ import annotations

import re
from collections import Counter

import fitz

import audit_body_italics as bia

FAILED: list[str] = []

# Probes that provably straddle a page break. The straddle is asserted, not
# assumed: control A checks the matched glyphs really do land on two pages.
STRADDLERS = [
    ("Vol I PB", "9798256008048", (1,),
     "Cave entrance (sealed), historical marker removed 1967"),
    ("Omnibus PB", "9798256072704", (1, 2, 3),
     "the gap is where I work"),
]

KNOWN_HEADS = {"HOLLOWAY", "MASTERS X"}
BARE_FOLIO = re.compile(r"^\d{1,4}$")
PDFS = [(isbn, label) for isbn, (label, _b, kind) in bia.CATALOG.items() if kind == "pdf"]


def check(name: str, got, want) -> None:
    ok = got == want
    print(f"  {'ok ' if ok else 'XX '} {name}: got {got!r}, want {want!r}")
    if not ok:
        FAILED.append(name)


def check_true(name: str, ok: bool, detail: str = "") -> None:
    print(f"  {'ok ' if ok else 'XX '} {name}{(': ' + detail) if detail else ''}")
    if not ok:
        FAILED.append(name)


def paged_stream(path, drop_furniture=True):
    """(text, [(is_italic, font, page)]) for one PDF, aligned to `text`.

    Mirrors bia.pdf_pairs + bia._normalize_pairs, carrying the font face and
    page number so a claim of "italic" can be shown at glyph level.
    """
    doc = fitz.open(path)
    bands = bia._furniture_bands(doc) if drop_furniture else (0.0, float("inf"))
    raw = []
    for pno in range(doc.page_count):
        for block in doc[pno].get_text("dict").get("blocks", []):
            if drop_furniture and bia._is_page_furniture(block, *bands):
                continue
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    face = span.get("font") or ""
                    ital = ("italic" in face.lower()) or ("oblique" in face.lower()) \
                        or bool(span.get("flags", 0) & 2)
                    for ch in (span.get("text") or ""):
                        raw.append((ch, ital, face, pno + 1))
                raw.append((" ", False, "", pno + 1))
    doc.close()
    out = []
    for ch, ital, face, pg in raw:
        for c in bia._TRANS.get(ord(ch), ch):
            if c.isspace():
                if out and out[-1][0] == " ":
                    continue
                out.append((" ", False, "", pg))
            else:
                out.append((c, ital, face, pg))
    while out and out[0][0] == " ":
        out.pop(0)
    return "".join(c for c, *_ in out), out


print("=" * 74)
print("CONTROL A  a probe straddling a page break must be located AND italic")
print("=" * 74)
for label, isbn, books, probe in STRADDLERS:
    path = bia.artifact_path(isbn, "pdf", bia.MASTER)
    text, glyphs = paged_stream(path)
    needle = bia.normalize(probe)

    straddles = False
    all_italic = False
    evidence = ""
    start = 0
    while True:
        i = text.find(needle, start)
        if i < 0:
            break
        seg = glyphs[i:i + len(needle)]
        cov = [it for c, it, _, _ in seg if not c.isspace()]
        pages = sorted({pg for _, _, _, pg in seg})
        if cov and all(cov):
            all_italic = True
            straddles = len(pages) > 1
            faces = sorted({f for c, _, f, _ in seg if not c.isspace() and f})
            evidence = f"pages {pages}, {sum(cov)}/{len(cov)} glyphs italic, fonts={faces}"
            break
        start = i + 1

    print(f"  -- {label}: {probe!r}")
    check_true(f"{label} straddling probe is located and fully italic", all_italic, evidence)
    check_true(f"{label} the located occurrence really spans a page break", straddles,
               evidence or "no italic occurrence found")

    # And the harness as a whole must score it italic, not roman or not_found.
    res = bia.Result(isbn=isbn, label=label, kind="pdf")
    bia.audit_pdf(path, [probe], res)
    check(f"{label} audit_pdf scores it italic", (res.italic_probes, res.roman_probes, res.not_found), (1, 0, 0))

print()
print("=" * 74)
print("CONTROL B  the running head is what used to break it, and is now gone")
print("=" * 74)
# Reproduces the pre-fix stream from the same file. This pins the mechanism, not
# just the outcome: the head and folio must be sitting *inside* the phrase in the
# old stream, and the phrase must be contiguous and italic in the new one.
#
# The two cases fail differently, which is why the shared invariant is stated as
# "no fully-italic occurrence before, one after" rather than "not_found before".
# Vol I PB's phrase vanished entirely. The Omnibus phrase survived as a
# contiguous ROMAN occurrence 400pt earlier in the book -- unrelated dialogue on
# p184 -- so the harness had something to score and scored it roman.
FURNITURE_RUN = re.compile(r"[A-Z][A-Z ]*\d+|\d+")


def italic_occurrence(text, glyphs, needle):
    """(index, page-split offset) of the first fully-italic occurrence."""
    start = 0
    while True:
        i = text.find(needle, start)
        if i < 0:
            return None, None
        seg = glyphs[i:i + len(needle)]
        cov = [it for c, it, _, _ in seg if not c.isspace()]
        if cov and all(cov):
            first = seg[0][3]
            k = next((n for n, g in enumerate(seg) if g[3] != first), None)
            return i, k
        start = i + 1


for label, isbn, _books, probe in STRADDLERS:
    path = bia.artifact_path(isbn, "pdf", bia.MASTER)
    before, before_g = paged_stream(path, drop_furniture=False)
    after, after_g = paged_stream(path, drop_furniture=True)
    needle = bia.normalize(probe)

    i, k = italic_occurrence(after, after_g, needle)
    # Anchor on left context, not on the phrase's own prefix: the Omnibus phrase
    # breaks after the word "the", which is not a locatable anchor by itself.
    anchor = next((after[max(0, i - w):i + k] for w in (60, 40, 24, 12)
                   if after[max(0, i - w):i + k] in before), None)
    j = before.find(anchor) if anchor else -1
    window = before[j + len(anchor):j + len(anchor) + 48] if j >= 0 else ""
    rest = needle[k:]
    q = window.find(rest[:12])
    interruption = window[:q].strip() if q > 0 else ""

    print(f"  -- {label}: page break falls {k} chars into the phrase")
    print(f"     pre-fix stream: ...{(anchor or '')[-34:]!r} + {interruption!r} + {rest[:24]!r}...")
    check_true(f"{label} pre-fix stream had no fully-italic occurrence",
               italic_occurrence(before, before_g, needle)[0] is None,
               f"phrase present at all in pre-fix stream: {needle in before}")
    check_true(f"{label} page furniture sits inside the phrase in the pre-fix stream",
               bool(interruption) and bool(FURNITURE_RUN.fullmatch(interruption)),
               repr(interruption))
    check_true(f"{label} post-fix stream has the phrase contiguous and italic", i is not None)

print()
print("=" * 74)
print("CONTROL C  the band must remove page furniture and NOTHING else")
print("=" * 74)
print(f"  {'artifact':13} {'blocks':>7} {'chars':>7} {'kept':>9} {'% removed':>10}  distinct non-numeric strings")
for isbn, label in PDFS:
    rep = bia.furniture_report(bia.artifact_path(isbn, "pdf", bia.MASTER))
    strings = {t for _, t in rep["dropped"]}
    nonnum = sorted(s for s in strings if not BARE_FOLIO.match(s))
    total = rep["dropped_chars"] + rep["kept_chars"]
    pct = rep["dropped_chars"] / total * 100 if total else 0.0
    print(f"  {label:13} {len(rep['dropped']):>7} {rep['dropped_chars']:>7} "
          f"{rep['kept_chars']:>9} {pct:>9.2f}%  {nonnum}")
    check_true(f"{label} removes only running heads and bare-integer folios",
               all(s in KNOWN_HEADS for s in nonnum), f"unexpected: {sorted(set(nonnum) - KNOWN_HEADS)}")
    check_true(f"{label} removes well under 2% of the page's characters", pct < 2.0, f"{pct:.2f}%")

print()
print("=" * 74)
print("CONTROL D  bands are DERIVED per document and clear the body text")
print("=" * 74)
# The four layouts put furniture in four different places -- the omnibus
# paperback running head hangs below where the hardcover singles' body text
# begins -- so a band hard-coded as one fraction of page height would either
# miss furniture or eat prose. Assert each band is calibrated to its own file
# and leaves daylight between itself and the nearest body block.
seen_fractions = Counter()
print(f"  {'artifact':13} {'trim h':>8} {'head<=':>8} {'head%':>7} {'body top':>9} "
      f"{'clear':>7} | {'folio>=':>8} {'folio%':>7} {'body bot':>9} {'clear':>7}")
for isbn, label in PDFS:
    path = bia.artifact_path(isbn, "pdf", bia.MASTER)
    doc = fitz.open(path)
    height = doc[0].rect.height
    head_bottom, folio_top = bia._furniture_bands(doc)
    body_top, body_bot = height, 0.0
    for pno in range(doc.page_count):
        for b in doc[pno].get_text("blocks"):
            if b[6] != 0 or not (b[4] or "").strip():
                continue
            if b[3] <= head_bottom or b[1] >= folio_top:
                continue                       # furniture, by the band
            body_top = min(body_top, b[1])
            body_bot = max(body_bot, b[3])
    doc.close()
    top_clear = body_top - head_bottom
    bot_clear = folio_top - body_bot
    seen_fractions[(round(head_bottom / height, 4), round(folio_top / height, 4))] += 1
    print(f"  {label:13} {height:>8.2f} {head_bottom:>8.2f} {head_bottom/height*100:>6.2f}% "
          f"{body_top:>9.2f} {top_clear:>7.2f} | {folio_top:>8.2f} {folio_top/height*100:>6.2f}% "
          f"{body_bot:>9.2f} {bot_clear:>7.2f}")
    check_true(f"{label} head band ends above all body text", top_clear > 0, f"clearance {top_clear:.2f}pt")
    check_true(f"{label} folio band starts below all body text", bot_clear > 0, f"clearance {bot_clear:.2f}pt")

check_true("bands are not one hard-coded fraction (four layouts -> distinct bands)",
           len(seen_fractions) >= 4, f"{len(seen_fractions)} distinct band pairs across 8 interiors")

print()
print("=" * 74)
print("CONTROL E  the band alone cannot delete a line of prose")
print("=" * 74)
# The exclusion is geometric, so nothing keys off "HOLLOWAY" or "MASTERS X" --
# renaming the running head cannot silently reintroduce the defect. But a
# mis-derived band must still not be able to eat narrative text, so a block in
# the band is only dropped if it is short enough to be a label.
prose = ("She wanted to see what he saw. Had probably wanted it for years, and could not "
         "say so in a kitchen at midnight.")


def block(text: str, y0: float, y1: float) -> dict:
    return {"bbox": (50.0, y0, 350.0, y1),
            "lines": [{"spans": [{"text": text, "font": "Garamond", "flags": 0}]}]}


check("running head inside the band is dropped",
      bia._is_page_furniture(block("HOLLOWAY", 8.7, 16.7), 17.2, 593.1), True)
check("folio inside the band is dropped",
      bia._is_page_furniture(block("69", 593.58, 602.58), 17.2, 593.1), True)
check("a renamed running head is still dropped (geometry, not string match)",
      bia._is_page_furniture(block("SEVENTH CITY PRESS", 8.7, 16.7), 17.2, 593.1), True)
check("a full line of prose inside the band is KEPT",
      bia._is_page_furniture(block(prose, 8.7, 16.7), 17.2, 593.1), False)
check("body text outside the band is kept",
      bia._is_page_furniture(block("Not anymore.", 35.56, 46.56), 17.2, 593.1), False)
check("a block straddling the band edge is kept",
      bia._is_page_furniture(block("HOLLOWAY", 8.7, 40.0), 17.2, 593.1), False)

print()
print("=" * 74)
print("PAGE FURNITURE CONTROL RESULT:", "ALL CONTROLS PASS" if not FAILED else f"FAILURES {FAILED}")
print("=" * 74)
raise SystemExit(0 if not FAILED else 1)
