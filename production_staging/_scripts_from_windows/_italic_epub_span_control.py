#!/usr/bin/env python3
"""Negative control for the XHTML italic tracker in audit_body_italics.

The Vol I EPUB currently uses balanced <em>/</em> only, so the tag-name path
happens to be correct. The moment generate_epubs_v1.py emits span-and-class or
inline-style italics, a tracker that re-derives italic-ness from a closing tag's
attributes latches on: </span> carries no class, so it never decrements, and
every subsequent character scores italic -- a false PASS.

These controls synthesise such markup and assert that plainly roman body text
after the italic span is scored ROMAN. They fail against the pre-hardening
tracker and pass against the element-stack tracker.
"""
from __future__ import annotations

import audit_body_italics as bia

FAILED: list[str] = []

ITALIC_NEEDLE = "the sound beneath the sound"
ROMAN_NEEDLE = "plainly roman body text that follows"


def check(name: str, got, want) -> None:
    ok = got == want
    print(f"  {'ok ' if ok else 'XX '} {name}: got {got!r}, want {want!r}")
    if not ok:
        FAILED.append(name)


def classify(fragment: str, needle: str) -> str:
    """Return 'italic', 'roman' or 'not_found' for needle inside fragment."""
    res = bia.Result(isbn="control", label="synthetic xhtml", kind="epub")
    bia._score(bia._normalize_pairs(bia._xhtml_pairs(fragment)), [needle], res)
    if res.not_found:
        return "not_found"
    return "italic" if res.italic_probes else "roman"


def frag(open_tag: str, close_tag: str = "</span>") -> str:
    return (
        "<html><body>"
        f"<p>He heard {open_tag}{ITALIC_NEEDLE}{close_tag} and went still.</p>"
        f"<p>The {ROMAN_NEEDLE} must never be scored italic.</p>"
        "</body></html>"
    )


print("=" * 74)
print("CONTROL A  <span class=\"i\"> italics must not latch on to following prose")
print("=" * 74)
f = frag('<span class="i">')
check("span-class italic text scored italic", classify(f, ITALIC_NEEDLE), "italic")
check("prose after </span> scored roman", classify(f, ROMAN_NEEDLE), "roman")

print()
print("=" * 74)
print("CONTROL B  style=\"font-style: italic\" must not latch on either")
print("=" * 74)
f = frag('<span style="font-style: italic">')
check("inline-style italic text scored italic", classify(f, ITALIC_NEEDLE), "italic")
check("prose after </span> scored roman", classify(f, ROMAN_NEEDLE), "roman")

print()
print("=" * 74)
print("CONTROL C  regression: balanced <em> must still work")
print("=" * 74)
f = frag("<em>", "</em>")
check("em italic text scored italic", classify(f, ITALIC_NEEDLE), "italic")
check("prose after </em> scored roman", classify(f, ROMAN_NEEDLE), "roman")

print()
print("=" * 74)
print("CONTROL D  malformed / unbalanced markup must not latch or go negative")
print("=" * 74)
# Stray close tags, an unclosed italic span closed by its ancestor, a self-closing
# italic-attributed element, and a void <br> inside the italic run.
messy = (
    "<html><body>"
    "</em></span>"                                    # stray closes, no opens
    '<p><span class="i">short bit</span></p>'
    '<div><span class="i">' + ITALIC_NEEDLE + "</div>"  # unclosed span, ancestor closes
    '<p><span class="i" /></p>'                        # self-closing italic element
    f"<p>The {ROMAN_NEEDLE} must never be scored italic.</p>"
    "</body></html>"
)
check("unclosed span italic text still scored italic", classify(messy, ITALIC_NEEDLE), "italic")
check("prose after malformed markup scored roman", classify(messy, ROMAN_NEEDLE), "roman")

# <br/> inside an italic run must not close the run.
withbr = (
    "<html><body>"
    '<p><span class="i">the sound beneath<br/> the sound</span></p>'
    f"<p>The {ROMAN_NEEDLE} must never be scored italic.</p>"
    "</body></html>"
)
check("italic run spanning <br/> scored italic", classify(withbr, ITALIC_NEEDLE), "italic")
check("prose after <br/> run scored roman", classify(withbr, ROMAN_NEEDLE), "roman")

print()
print("=" * 74)
print("EPUB SPAN CONTROL RESULT:", "ALL CONTROLS PASS" if not FAILED else f"FAILURES {FAILED}")
print("=" * 74)
raise SystemExit(0 if not FAILED else 1)
