"""Shared source for back-matter preview text.

The preview teaser in each volume shows Chapter One of the next volume. Text is
extracted from the canonical build DOCX with italic runs intact so the teaser
matches the volume it advertises instead of being retyped or left empty.
"""

from __future__ import annotations

import re
from pathlib import Path

import docx

BUILD_DOCX = Path(
    r"c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
    r"\production_staging\_sources\build_docx"
)

# Volume -> (docx, chapter-one title as it appears in the DOCX, Hz subtitle)
NEXT_VOLUME = {
    1: ("MASTERS_X_BOOK2_BUILD.docx", "THE STONE COTTAGE", "3.915 Hz \u00b7 Iceland"),
    2: ("MASTERS_X_BOOK3_BUILD.docx", "THE RETURN", "109 Hz \u00b7 Kansas City"),
}


def _escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _rich(par) -> str:
    parts = []
    for run in par.runs:
        rt = run.text
        if not rt:
            continue
        rt = _escape(rt)
        if run.italic and run.bold:
            rt = f"<b><i>{rt}</i></b>"
        elif run.italic:
            rt = f"<i>{rt}</i>"
        elif run.bold:
            rt = f"<b>{rt}</b>"
        parts.append(rt)
    return "".join(parts) if parts else _escape(par.text.strip())


_SECTBREAK_RE = re.compile(r"^\u2726\s+\u2295\s+\u2726$")
_CHBREAK_RE = re.compile(r"^\u25c7\s+\u25c6\s+\u25c7$")


def chapter_one(volume: int, max_words: int | None = None) -> list[dict]:
    """Body paragraphs of Chapter One of the volume that follows `volume`.

    Runs to the end of the chapter by default, matching the teaser length the
    catalog already established. Pass `max_words` to trim to a paragraph
    boundary at or under that budget.
    """
    name, title, _hz = NEXT_VOLUME[volume]
    doc = docx.Document(str(BUILD_DOCX / name))
    paras = [p for p in doc.paragraphs if p.text.strip()]

    start = None
    for i, p in enumerate(paras):
        if p.text.strip().upper() == title:
            start = i
            break
    if start is None:
        raise RuntimeError(f"Chapter One title {title!r} not found in {name}")

    out: list[dict] = []
    words = 0
    for p in paras[start + 1:]:
        t = p.text.strip()
        if t.startswith("CHAPTER ") or t.upper().startswith("END OF BOOK"):
            break
        if re.match(r"^\d+(?:\.\d+)? Hz \u00b7 .+$", t) or t == "MASTERS X":
            continue
        if _CHBREAK_RE.match(t):
            break
        if _SECTBREAK_RE.match(t):
            out.append({"t": t, "c": "sectbreak", "rich": _escape(t)})
            continue
        n = len(t.split())
        if max_words is not None and words + n > max_words and out:
            break
        words += n
        out.append({"t": t, "c": "body", "rich": _rich(p)})

    while out and out[-1]["c"] == "sectbreak":
        out.pop()
    return out


if __name__ == "__main__":
    for vol in (1, 2):
        name, title, hz = NEXT_VOLUME[vol]
        paras = chapter_one(vol)
        words = sum(len(p["t"].split()) for p in paras)
        ital = sum(1 for p in paras if "<i>" in p["rich"])
        print(f"Vol {vol} teaser <- {name} :: CHAPTER ONE {title} ({hz})")
        print(f"  paragraphs={len(paras)}  words={words}  with-italics={ital}")
        print(f"  opens: {paras[0]['t'][:110]}")
        print(f"  ends:  {paras[-1]['t'][:110]}")
        print()
