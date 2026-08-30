#!/usr/bin/env python3
"""Negative control for the reconstructed audit_body_italics harness.

A gate that cannot fail is worthless. This proves the harness distinguishes
italic from roman on both code paths: stripping every italic tag must flip the
whole probe list from italic to roman, reproducing the pre-fix signature of
ITALICS_FIX_VERIFICATION_2026-07-30.md.

The expected counts are read from the probe list rather than hard-coded. The
2026-08-29 hardening removed the fitted CAP=12, so Book 1 now yields 43 probes
instead of 12; the invariant under test is "all of them flip", not "12 of them".

Read-only with respect to shipping artifacts: the de-italicized EPUB is written
to a temp file and deleted.
"""
from __future__ import annotations

import re
import shutil
import tempfile
import zipfile
from pathlib import Path

import audit_body_italics as bia

STAGING = bia.STAGING
FAILED = []


def check(name: str, got, want) -> None:
    ok = got == want
    print(f"  {'ok ' if ok else 'XX '} {name}: got {got}, want {want}")
    if not ok:
        FAILED.append(name)


src = STAGING / "b1_inheritance/9798256008819_EPUB/9798256008819.epub"
probes = bia.collect_probes(1)
N = len(probes)

print("=" * 74)
print(f"CONTROL 1  EPUB with all <em>/<i> stripped must report 0 italic / {N} roman")
print("=" * 74)
tmp = Path(tempfile.mkdtemp()) / "deitalicized.epub"
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, "w") as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename.endswith((".xhtml", ".html", ".htm")):
            txt = data.decode("utf-8", "replace")
            txt = re.sub(r"</?(em|i|cite)\b[^>]*>", "", txt)
            data = txt.encode("utf-8")
        zout.writestr(item, data)

res = bia.Result(isbn="control", label="B1 EPUB de-italicized", kind="epub")
bia.audit_epub(tmp, probes, res)
print(f"  italic={res.italic_probes} roman={res.roman_probes} not_found={res.not_found} passed={res.passed}")
check("de-italicized EPUB italic count", res.italic_probes, 0)
check("de-italicized EPUB roman count", res.roman_probes, N)
check("de-italicized EPUB verdict", res.passed, False)
shutil.rmtree(tmp.parent, ignore_errors=True)

print()
print("=" * 74)
print(f"CONTROL 2  unmodified EPUB must report {N} italic / 0 roman")
print("=" * 74)
res2 = bia.Result(isbn="control", label="B1 EPUB pristine", kind="epub")
bia.audit_epub(src, probes, res2)
print(f"  italic={res2.italic_probes} roman={res2.roman_probes} not_found={res2.not_found} passed={res2.passed}")
check("pristine EPUB italic count", res2.italic_probes, N)
check("pristine EPUB verdict", res2.passed, True)

print()
print("=" * 74)
print("CONTROL 3  PDF path: roman body prose must score roman, not italic")
print("=" * 74)
pdf = STAGING / "b1_inheritance/9798295800801_HC/interior.pdf"
# A plain narrative sentence set in roman, plus a known-italic probe, in one run.
roman_needle = "the cedar soap he used because Lorraine said"
italic_needle = "Always know your exits."
res3 = bia.Result(isbn="control", label="B1 HC mixed probes", kind="pdf")
bia.audit_pdf(pdf, [roman_needle, italic_needle], res3)
print(f"  italic={res3.italic_probes} roman={res3.roman_probes} not_found={res3.not_found}")
print(f"  scored roman: {res3.failures}")
print(f"  scored italic: {res3.italic_samples}")
check("PDF roman prose scored roman", res3.roman_probes, 1)
check("PDF italic prose scored italic", res3.italic_probes, 1)
check("PDF nothing lost", res3.not_found, 0)
check("PDF mixed verdict is FAIL", res3.passed, False)

print()
print("=" * 74)
print("CONTROL 4  a probe absent from the artifact must count as not_found (never a pass)")
print("=" * 74)
res4 = bia.Result(isbn="control", label="B1 HC bogus probe", kind="pdf")
bia.audit_pdf(pdf, ["Kofi Mensah handed over the equipment"], res4)
check("absent probe -> not_found", res4.not_found, 1)
check("absent probe -> verdict FAIL", res4.passed, False)

print()
print("=" * 74)
print("NEGATIVE CONTROL RESULT:", "ALL CONTROLS PASS" if not FAILED else f"FAILURES {FAILED}")
print("=" * 74)
raise SystemExit(0 if not FAILED else 1)
