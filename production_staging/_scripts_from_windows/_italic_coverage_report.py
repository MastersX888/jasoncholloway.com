#!/usr/bin/env python3
"""Coverage measurement for the audit_body_italics probe selector.

A probe list that stops early gates only the opening pages: an italic collapse
past the last probe passes unnoticed. This reports, per book, how many italic
runs exist, how many qualify under the filter, how many are actually probed, and
how far into the document the last probe sits.
"""
from __future__ import annotations

from docx import Document

import audit_body_italics as bia


def stats(book: int) -> dict:
    doc = Document(str(bia.BOOK_DOCX[book]))
    paras = doc.paragraphs
    total = len(paras)
    italic_runs = 0
    qualifying: list[tuple[int, str]] = []
    seen: set[str] = set()
    for pi, para in enumerate(paras):
        ptext = (para.text or "").strip()
        for run in para.runs:
            t = (run.text or "").strip()
            if not run.italic or not t:
                continue
            italic_runs += 1
            if pi < bia.SKIP_FRONT:
                continue
            if not (bia.MIN_LEN <= len(t) <= bia.MAX_LEN):
                continue
            if bia.HEADING.match(t) or bia.HEADING.match(ptext) or bia.HZ.search(t) or t.isupper():
                continue
            if t in seen:
                continue
            seen.add(t)
            qualifying.append((pi, t))

    probes = bia.collect_probes(book)
    probe_set = set(probes)
    used = [(pi, t) for pi, t in qualifying if t in probe_set]
    last_pi = used[-1][0] if used else 0
    return {
        "book": book,
        "paragraphs": total,
        "italic_runs": italic_runs,
        "qualifying": len(qualifying),
        "probes": len(probes),
        "last_para": last_pi,
        "pct": 100.0 * last_pi / total if total else 0.0,
    }


print(f"{'Book':<5} {'italic runs':>12} {'qualify':>8} {'probes':>7} {'last probe para':>16} {'% into doc':>11}")
print("-" * 66)
rows = [stats(b) for b in sorted(bia.BOOK_DOCX)]
for r in rows:
    print(f"{r['book']:<5} {r['italic_runs']:>12} {r['qualifying']:>8} {r['probes']:>7} "
          f"{str(r['last_para']) + '/' + str(r['paragraphs']):>16} {r['pct']:>10.1f}%")
print("-" * 66)
print(f"omnibus probe total: {sum(r['probes'] for r in rows)}")
