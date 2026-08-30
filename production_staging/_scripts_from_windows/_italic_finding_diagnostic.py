#!/usr/bin/env python3
"""Evidence for the two Section 5 findings surfaced by the 2026-08-29 hardening.

Read-only. Removing the fitted CAP=12 raised Book 1 coverage from 12 probes to
43, and two of the newly-probed strings fail:

  Vol I PB    'Cave entrance (sealed), historical marker removed 1967'  not_found
  Omnibus PB  'the gap is where I work'                                 roman

Neither is an italic collapse. In both cases the probe straddles a page break
and PyMuPDF emits the running head and folio between the two halves, so the
phrase is not contiguous in the extracted stream. This script prints the
extracted character stream around every occurrence with its per-glyph italic
coverage, which shows the running head sitting inside the phrase and the prose
itself still set in Garamond-Italic.

Run this before deciding whether to exclude running heads from extraction.
"""
from __future__ import annotations

import fitz

import audit_body_italics as bia

CASES = [
    ("Vol I PB", "9798256008048", (1,), "Vol I HC", "9798295800801"),
    ("Omnibus PB", "9798256072704", (1, 2, 3), "Omnibus HC", "9798295884412"),
]


def pdf_pairs(path):
    """[(char, is_italic, font, page)], normalized the same way bia normalizes."""
    doc = fitz.open(path)
    raw = []
    for pno in range(doc.page_count):
        d = doc[pno].get_text("dict")
        for block in d.get("blocks", []):
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    font = span.get("font") or ""
                    ital = ("italic" in font.lower()) or ("oblique" in font.lower()) \
                        or bool(span.get("flags", 0) & 2)
                    for ch in (span.get("text") or ""):
                        raw.append((ch, ital, font, pno + 1))
                raw.append((" ", False, "", pno + 1))
    doc.close()
    out = []
    for ch, ital, font, pg in raw:
        for c in bia._TRANS.get(ord(ch), ch):
            if c.isspace():
                if out and out[-1][0] == " ":
                    continue
                out.append((" ", False, "", pg))
            else:
                out.append((c, ital, font, pg))
    while out and out[0][0] == " ":
        out.pop(0)
    return out


def italic_tail(text, pairs, n):
    """Report the longest suffix of n that IS locatable and fully italic.

    When a running head splits the phrase, the surviving tail is still set in
    the italic face -- which is how we know the prose did not collapse.
    """
    words = n.split()
    for k in range(1, len(words)):
        tail = " ".join(words[k:])
        if len(tail) <= 8:
            break
        start = 0
        while True:
            j = text.find(tail, start)
            if j < 0:
                break
            seg = pairs[j:j + len(tail)]
            cov = [it for c, it, _, _ in seg if not c.isspace()]
            if cov and all(cov):
                faces = sorted({f for c, _, f, _ in seg if not c.isspace() and f})
                lo = max(0, j - 120)
                print(f"      italic tail {tail!r} on page {seg[0][3]}: "
                      f"{sum(cov)}/{len(cov)} glyphs italic, fonts={faces}")
                print(f"        ...{text[lo:j + len(tail) + 20]}...")
                return True
            start = j + 1
    return False


def show(label, path, needles):
    pairs = pdf_pairs(path)
    text = "".join(c for c, *_ in pairs)
    for needle in needles:
        n = bia.normalize(needle)
        print(f"\n  [{label}] {needle!r}")
        hits = []
        start = 0
        while True:
            i = text.find(n, start)
            if i < 0:
                break
            hits.append(i)
            start = i + 1
        if not hits:
            print("      NOT FOUND as a contiguous normalized string.")
            for cut in range(len(n) - 1, 6, -1):
                j = text.find(n[:cut])
                if j >= 0:
                    print(f"      longest matching prefix ({cut} chars): {n[:cut]!r}")
                    print(f"      page {pairs[j][3]}, extracted stream there:")
                    print(f"        {text[j:j + len(n) + 30]!r}")
                    break
            italic_tail(text, pairs, n)
            continue
        any_all_italic = False
        for i in hits:
            seg = pairs[i:i + len(n)]
            faces = sorted({f for c, _, f, _ in seg if not c.isspace() and f})
            cov = [it for c, it, _, _ in seg if not c.isspace()]
            all_italic = bool(cov) and all(cov)
            any_all_italic = any_all_italic or all_italic
            lo = max(0, i - 120)
            print(f"      page {seg[0][3]}: {'ALL ITALIC' if all_italic else 'NOT all italic'}  "
                  f"({sum(cov)}/{len(cov)} glyphs italic)  fonts={faces}")
            print(f"        ...{text[lo:i + len(n) + 30]}...")
        if not any_all_italic:
            # Every contiguous occurrence was roman. If an italic occurrence
            # exists but was split by a running head, its tail still shows up.
            if not italic_tail(text, pairs, n):
                print("      no italic occurrence of any suffix -- "
                      "this would be a genuine collapse")


for flabel, fisbn, books, plabel, pisbn in CASES:
    print("=" * 78)
    print(f"{flabel}  ({fisbn})")
    print("=" * 78)
    probes = [p for b in books for p in bia.collect_probes(b)]
    fpath = bia.artifact_path(fisbn, "pdf", bia.MASTER)
    res = bia.Result(isbn=fisbn, label=flabel, kind="pdf")
    bia.audit_pdf(fpath, probes, res)
    print(f"  probes={len(probes)} italic={res.italic_probes} roman={res.roman_probes} "
          f"not_found={res.not_found} pages={res.pages}")
    print(f"  scored roman : {res.failures}")
    print(f"  not found    : {res.missing}")
    bad = res.failures + res.missing
    if bad:
        show(flabel, fpath, bad)
        print()
        show(plabel + " (passing sibling)", bia.artifact_path(pisbn, "pdf", bia.MASTER), bad)
    print()
