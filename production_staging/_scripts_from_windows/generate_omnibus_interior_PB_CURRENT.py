import os
BUILD_ISBN = os.environ.get('BUILD_ISBN', 'ISBN-NOT-SET')
BUILD_IMPRINT = os.environ.get('BUILD_IMPRINT', 'Seventh City Press')
BUILD_AUTHOR = os.environ.get('BUILD_AUTHOR', 'Jason Carroll Holloway')
BUILD_TITLE = os.environ.get('BUILD_TITLE', '')
BUILD_EDITION_KEY = os.environ.get('BUILD_EDITION_KEY', '')
BUILD_OUTPUT = os.environ.get('BUILD_OUTPUT', None)
_w = os.environ.get('BUILD_WIDTH_PT')
_h = os.environ.get('BUILD_HEIGHT_PT')
BUILD_WIDTH_PT = float(_w) if _w else None
BUILD_HEIGHT_PT = float(_h) if _h else None
def format_isbn(raw):
    d = raw.replace('-','').replace(' ','')
    if len(d) == 13: return f"{d[0:3]}-{d[3]}-{d[4:9]}-{d[9:12]}-{d[12]}"
    return raw

"""
Masters X Omnibus Interior PDF Generator v6
Garamond Typography · IngramSpark B&W Hardcover Upload

Changes from v5:
- DOCX_PATH now points to MASTERS_X_TRILOGY_READTHROUGH_FINAL.docx (5/11 11:15)
  rather than the stale MASTERS_X_TRILOGY_READTHROUGH.docx (5/11 10:29). This
  picks up all Section 1/2/3 continuity revisions (Thomas/Marcus, Prague,
  SubTropolis, tremor drift coda, Yuki coda, Crane disambiguation, etc.).
- BOOK_RANGES updated to match the FINAL docx paragraph indices:
    Book 1: (2, 1775)    Book 2: (1775, 3689)    Book 3: (3689, 5164)
- "MASTERS X — Trilogy Readthrough (Final)" meta header at index 0 is skipped
  by starting Book 1 at index 2.

Architecture (unchanged from v5):
- Registered Garamond TTF fonts (not ReportLab built-ins)
- Canvas-drawn section-break ornaments (no Unicode squares)
- DOCX source with italic/bold run extraction
- Running headers and page numbers
- Recto-start chapter openings
- 11pt body / 18pt leading for ~750 page target
- Book divisor pages between volumes
- Combined epigraphs on single page
- Omnibus-specific front matter
"""

import sys, os, re
import docx
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    Paragraph, Spacer, PageBreak, BaseDocTemplate, Frame, PageTemplate,
    NextPageTemplate
)
from reportlab.platypus.flowables import Flowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
from reportlab.lib.colors import Color
from pathlib import Path

# ─── Paths ───
TRILOGY_DIR = Path(r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy")
_REPO = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
_BUILD = _REPO / "production_staging" / "_sources" / "build_docx"
DOCX_PATH1 = _BUILD / "MASTERS_X_BOOK1_BUILD.docx"
DOCX_PATH2 = _BUILD / "MASTERS_X_BOOK2_BUILD.docx"
DOCX_PATH3 = _BUILD / "MASTERS_X_BOOK3_BUILD.docx"
OUTPUT_DIR = _REPO / "production_staging" / "omnibus" / "9798256072704_PB"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
# Write new build to a versioned filename so the original (stale) PDF stays
# untouched until the rebuild is verified.
OUTPUT_PDF = Path(BUILD_OUTPUT) if BUILD_OUTPUT else (OUTPUT_DIR / "interior.pdf")

# ─── Trim (IngramSpark US Trade 5.5 x 8.5 Demy) ───
# Env overrides BUILD_WIDTH_PT / BUILD_HEIGHT_PT allow HC clone to reuse this script.
TRIM_W = BUILD_WIDTH_PT if BUILD_WIDTH_PT else (5.5 * inch)
TRIM_H = BUILD_HEIGHT_PT if BUILD_HEIGHT_PT else (8.5 * inch)
M_GUTTER  = 0.875 * inch    # generous gutter for ~630pp thick spine
M_OUTSIDE = 0.5 * inch      # outside margin
M_TOP     = 0.75 * inch
M_BOTTOM  = 0.75 * inch
TEXT_W = TRIM_W - M_GUTTER - M_OUTSIDE   # 4.125"
TEXT_H = TRIM_H - M_TOP - M_BOTTOM       # 7.0"

# ─── Fonts ───
pdfmetrics.registerFont(TTFont("Garamond", "C:/Windows/Fonts/GARA.TTF"))
pdfmetrics.registerFont(TTFont("GaramondBd", "C:/Windows/Fonts/GARABD.TTF"))
pdfmetrics.registerFont(TTFont("GaramondIt", "C:/Windows/Fonts/GARAIT.TTF"))

# Tell ReportLab's <i>/<b> mini-HTML parser which physical font to use
# for each style combination within the "Garamond" family. Without this,
# <i> and <b> tags in Paragraph markup are silently ignored and everything
# renders in the plain "Garamond" face — this was the entire bug.
addMapping("Garamond", 0, 0, "Garamond")     # normal
addMapping("Garamond", 0, 1, "GaramondIt")   # italic
addMapping("Garamond", 1, 0, "GaramondBd")   # bold
addMapping("Garamond", 1, 1, "GaramondIt")   # bold+italic — no separate BI
                                               # face exists, so this falls
                                               # back to italic, which is the
                                               # correct choice over plain.

# ─── Colors ───
MED = Color(0.4, 0.4, 0.4)
LT = Color(0.55, 0.55, 0.55)

# ─── Styles (11pt body for ~750pp omnibus) ───
S_BODY = ParagraphStyle("Body", fontName="Garamond", fontSize=11, leading=18,
                         alignment=TA_JUSTIFY, firstLineIndent=20, spaceAfter=3.5, spaceBefore=0)
S_BODY1 = ParagraphStyle("Body1", parent=S_BODY, firstLineIndent=0)
S_CHNUM = ParagraphStyle("ChNum", fontName="Garamond", fontSize=10, leading=13,
                          alignment=TA_CENTER, textColor=MED, spaceAfter=7)
S_CHTITLE = ParagraphStyle("ChTitle", fontName="GaramondBd", fontSize=14, leading=18,
                            alignment=TA_CENTER, spaceAfter=5)
S_CHSUB = ParagraphStyle("ChSub", fontName="GaramondIt", fontSize=10, leading=13,
                          alignment=TA_CENTER, textColor=MED, spaceAfter=4)
S_HZ = ParagraphStyle("Hz", fontName="GaramondIt", fontSize=8.5, leading=11,
                       alignment=TA_CENTER, textColor=LT, spaceAfter=28)
S_HALF = ParagraphStyle("Half", fontName="Garamond", fontSize=18, leading=24, alignment=TA_CENTER)
S_TITLE = ParagraphStyle("Title", fontName="GaramondBd", fontSize=22, leading=28, alignment=TA_CENTER)
S_SUB = ParagraphStyle("Sub", fontName="GaramondIt", fontSize=13, leading=17,
                        alignment=TA_CENTER, textColor=MED)
S_AUTH = ParagraphStyle("Auth", fontName="Garamond", fontSize=13, leading=17, alignment=TA_CENTER)
S_COPY = ParagraphStyle("Copy", fontName="Garamond", fontSize=8, leading=11,
                         alignment=TA_CENTER, textColor=MED)
S_EPIG = ParagraphStyle("Epig", fontName="GaramondIt", fontSize=10, leading=14,
                         alignment=TA_CENTER, textColor=MED, leftIndent=36, rightIndent=36)
S_BOOKLABEL = ParagraphStyle("BookLabel", fontName="Garamond", fontSize=14, leading=18,
                              alignment=TA_CENTER, textColor=MED, spaceAfter=12)

# ─── Book boundaries (paragraph indices in the FINAL readthrough DOCX) ───
# Verified by scanning the FINAL docx for "MASTERS X: THE GRIMOIRE" and
# "MASTERS X: THE KINGDOM" title paragraphs. Para 0 holds the meta header
# "MASTERS X — Trilogy Readthrough (Final)" so Book 1 starts at index 2.
BOOK_RANGES = {
    1: (2, 1775),
    2: (1775, 3689),
    3: (3689, 5164),
}

BOOK_SUBTITLES = {
    1: "The Inheritance of Frequency",
    2: "The Grimoire",
    3: "The Kingdom",
}

BOOK_LABELS = {
    1: "VOLUME ONE",
    2: "VOLUME TWO",
    3: "VOLUME THREE",
}

# ─── Epigraphs ───
EPIGRAPHS = [
    ('\u201cIn the beginning was the Word, and the Word was with God,<br/>and the Word was God.\u201d',
     '\u2014 John 1:1'),
    ('\u201cWhat we call matter is in fact a form of vibration.\u201d',
     '\u2014 Max Planck, 1944'),
    ('\u201cThere\u2019s no chaos in nature, Blake.<br/>Only patterns we don\u2019t understand yet.\u201d',
     '\u2014 William Masters'),
    ('\u201cThe preparation is not about the frequency.<br/>The preparation is about the organism.\u201d',
     '\u2014 Blake Masters, Moleskine IX'),
    ('\u201cThe kingdom of God is within you.\u201d',
     '\u2014 Luke 17:21'),
    ('\u201cSome signals you pick up by accident.<br/>Some are aimed at you.\u201d',
     '\u2014 James Masters'),
]


# ═══════════════════════════════════════════════════════════
# FLOWABLES
# ═══════════════════════════════════════════════════════════

class OrnRule(Flowable):
    """Thin centered horizontal rule."""
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 8

    def draw(self):
        c = self.canv
        c.setStrokeColor(LT)
        c.setLineWidth(0.4)
        rw = self.width * 0.25
        x0 = (self.width - rw) / 2
        c.line(x0, 4, x0 + rw, 4)


class SectionOrnament(Flowable):
    """Decorative section break: thin rules flanking a central diamond cluster.
    Draws: ———— ◇ ◆ ◇ ————  (as canvas graphics, not Unicode)
    """
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 24

    def draw(self):
        c = self.canv
        mid_x = self.width / 2
        mid_y = self.height / 2

        c.setStrokeColor(MED)
        c.setFillColor(MED)

        # Center diamond (filled)
        diamond_size = 3.5
        c.saveState()
        p = c.beginPath()
        p.moveTo(mid_x, mid_y + diamond_size)
        p.lineTo(mid_x + diamond_size, mid_y)
        p.lineTo(mid_x, mid_y - diamond_size)
        p.lineTo(mid_x - diamond_size, mid_y)
        p.close()
        c.drawPath(p, fill=1, stroke=0)
        c.restoreState()

        # Flanking small diamonds (outline only)
        sm = 2.2
        gap = 12
        for offset in [-gap, gap]:
            cx = mid_x + offset
            c.saveState()
            c.setLineWidth(0.5)
            p = c.beginPath()
            p.moveTo(cx, mid_y + sm)
            p.lineTo(cx + sm, mid_y)
            p.lineTo(cx, mid_y - sm)
            p.lineTo(cx - sm, mid_y)
            p.close()
            c.drawPath(p, fill=0, stroke=1)
            c.restoreState()

        # Flanking thin rules
        rule_len = self.width * 0.1
        inner_edge = gap + sm + 8
        c.setLineWidth(0.3)
        c.line(mid_x - inner_edge - rule_len, mid_y, mid_x - inner_edge, mid_y)
        c.line(mid_x + inner_edge, mid_y, mid_x + inner_edge + rule_len, mid_y)


class ChapterMarker(Flowable):
    """Invisible marker for recto alignment + chapter-opener page tracking."""
    def __init__(self, chapter_name=""):
        Flowable.__init__(self)
        self.width = 0
        self.height = 0
        self.chapter_name = chapter_name

    def draw(self):
        pass

    def wrap(self, aW, aH):
        return (0, 0)


class NoChromeMarker(Flowable):
    """Invisible marker. The page on which this lands gets no head or folio.

    Used for book-divisor pages and their blank versos.
    """
    def __init__(self, label=""):
        Flowable.__init__(self)
        self.width = 0
        self.height = 0
        self.label = label

    def draw(self):
        pass

    def wrap(self, aW, aH):
        return (0, 0)


# ═══════════════════════════════════════════════════════════
# DOCUMENT TEMPLATE
# ═══════════════════════════════════════════════════════════

class OmnibusDoc(BaseDocTemplate):
    """Two-pass-friendly omnibus template.

    See generate_book3_interior.py InteriorDoc for the rationale: a first
    build pass discovers chapter-opener and no-chrome pages; the second pass
    suppresses chrome on display pages and uses drop folios on chapter
    openers.
    """

    FRONT_MATTER_PAGES = set(range(1, 9))  # P1..P8 of the omnibus

    def __init__(
        self,
        filename,
        chapter_opener_pages=None,
        no_chrome_pages=None,
        **kw,
    ):
        self.chapter_name = ""
        self.total_pages = 0
        self.chapter_opener_pages = set(chapter_opener_pages or ())
        self.no_chrome_pages = set(no_chrome_pages or ()) | self.FRONT_MATTER_PAGES
        self.discovered_chapter_opener_pages = set()
        self.discovered_no_chrome_pages = set()
        BaseDocTemplate.__init__(self, filename, **kw)

        frame = Frame(
            M_GUTTER, M_BOTTOM, TEXT_W, TEXT_H,
            id="main",
            leftPadding=0, rightPadding=0,
            topPadding=0, bottomPadding=0,
        )
        self.addPageTemplates([
            PageTemplate("normal", frames=[frame], onPage=self._on_page),
        ])

    def handle_pageBegin(self):
        """Switch frame x-position based on page parity for mirrored margins."""
        super().handle_pageBegin()
        page_num = self.page  # 1-based
        frame = self.frame
        if page_num % 2 == 1:
            # Recto (odd) page: gutter on LEFT
            frame._x1 = M_GUTTER
        else:
            # Verso (even) page: gutter on RIGHT -> left offset = M_OUTSIDE
            frame._x1 = M_OUTSIDE
        frame._x2 = frame._x1 + TEXT_W
        frame._x1p = frame._x1
        frame._atTop = True

    def _on_page(self, canvas, doc):
        pg = canvas.getPageNumber()
        self.total_pages = pg

        if pg in self.no_chrome_pages:
            return

        canvas.saveState()
        if pg in self.chapter_opener_pages:
            # Drop folio only: page number at the bottom, no running head.
            canvas.setFont("Garamond", 9)
            canvas.setFillColor(MED)
            canvas.drawCentredString(TRIM_W / 2, M_BOTTOM - 24, str(pg))
            canvas.restoreState()
            return

        hy = TRIM_H - M_TOP + 18
        canvas.setStrokeColor(LT)
        canvas.setLineWidth(0.3)
        canvas.setFont("Garamond", 8)
        canvas.setFillColor(LT)
        
        if pg % 2 == 1:
            # Recto: gutter on left
            canvas.line(M_GUTTER, hy - 4, TRIM_W - M_OUTSIDE, hy - 4)
            canvas.drawRightString(TRIM_W - M_OUTSIDE, hy, "HOLLOWAY")
        else:
            # Verso: margin on left
            canvas.line(M_OUTSIDE, hy - 4, TRIM_W - M_GUTTER, hy - 4)
            canvas.drawString(M_OUTSIDE, hy, "MASTERS X")
            
        canvas.setFont("Garamond", 9)
        canvas.setFillColor(MED)
        canvas.drawCentredString(TRIM_W / 2, M_BOTTOM - 24, str(pg))
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, ChapterMarker):
            self.chapter_name = flowable.chapter_name
            pg = self.canv.getPageNumber()
            if pg % 2 == 0:
                # Force-skipped verso should also have no head/folio.
                self.discovered_no_chrome_pages.add(pg)
                self.handle_pageBreak()
                pg = self.canv.getPageNumber()
            self.discovered_chapter_opener_pages.add(pg)
        elif isinstance(flowable, NoChromeMarker):
            pg = self.canv.getPageNumber()
            self.discovered_no_chrome_pages.add(pg)


# ═══════════════════════════════════════════════════════════
# DOCX EXTRACTION WITH FORMATTING
# ═══════════════════════════════════════════════════════════

_ORN_WS = re.compile(r"[\s\u00a0\u200b]+")


def classify(text):
    """Classify a paragraph by its structural role."""
    if text.startswith("END OF BOOK") or text.startswith("END OF VOLUME"): return "skip"
    t = _ORN_WS.sub(" ", text.strip())
    if re.match(r"^\u25c7 \u25c6 \u25c7$", t): return "chbreak"
    if re.match(r"^\u2726 \u2295 \u2726$", t): return "sectbreak"
    if text.startswith("CHAPTER "): return "chnum"
    if text in ("PROLOGUE", "EPILOGUE"): return "chnum"
    if text == "ONE YEAR LATER": return "episub"
    # Catch the em-dash subtitle placeholders ("\u2014 \u00b7 <X>"); routed
    # through "coda" so they at least render in the correct style. The DOCX
    # was patched on 2026-05-11 to fill these in for Book Three.
    if re.match(r"^\u2014\s*\u00b7\s*.+$", text): return "coda"
    if text in ("SIX MONTHS LATER", "THREE WEEKS LATER"): return "timemark"
    # Accept decimal Hz values as well (e.g. "107.3 Hz \u00b7 ...").
    if re.match(r"^\d+(?:\.\d+)? Hz \u00b7 .+$", text): return "hz"
    if text == "MASTERS X": return "skip"
    if text.startswith("MASTERS X "): return "skip"        # e.g. "MASTERS X — Trilogy Readthrough..."
    if text.startswith("The Inheritance of Frequency"): return "skip"
    if text.startswith("The Grimoire"): return "skip"
    if text.startswith("The Kingdom"): return "skip"
    if text == BUILD_AUTHOR: return "skip"
    if text.startswith("MASTERS X:"): return "skip"
    if text.isupper() and len(text) < 60 and not text.startswith("CHAPTER"): return "chtitle"
    return "body"


def escape(text):
    """Escape XML special characters for ReportLab."""
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text


def extract_with_formatting(docx_path, start=0, end=None):
    """Extract paragraphs with run-level italic/bold formatting.
    Returns list of dicts with 'i', 't' (plain text), 'c' (classification),
    and 'rich' (ReportLab XML with <i>/<b> tags from docx runs)."""
    doc = docx.Document(str(docx_path))
    out = []
    for i, p in enumerate(doc.paragraphs[start:end], start=start):
        plain = p.text.strip()
        if not plain:
            continue
        if "\ufffd" in plain:
            plain = plain.replace("\ufffd", "\u2014")

        cls = classify(plain)

        # Coda deduplication (prevents double-rendering)
        if cls == "coda" and out and out[-1]["c"] == "coda" and out[-1]["t"] == plain:
            continue

        # Structural elements: no formatting needed
        if cls in ("chbreak", "sectbreak", "chnum", "chtitle", "hz",
                    "episub", "coda", "timemark", "skip"):
            out.append({"i": i, "t": plain, "c": cls, "rich": escape(plain)})
            continue

        # For body text, preserve italic/bold from docx runs
        rich_parts = []
        for run in p.runs:
            rt = run.text
            if not rt:
                continue
            rt = escape(rt)
            if run.italic and run.bold:
                rt = f"<b><i>{rt}</i></b>"
            elif run.italic:
                rt = f"<i>{rt}</i>"
            elif run.bold:
                rt = f"<b>{rt}</b>"
            rich_parts.append(rt)

        rich = "".join(rich_parts) if rich_parts else escape(plain)
        out.append({"i": i, "t": plain, "c": cls, "rich": rich})

    return out


# ═══════════════════════════════════════════════════════════
# BUILD ELEMENTS
# ═══════════════════════════════════════════════════════════

def frontmatter():
    """Omnibus-specific front matter."""
    el = []
    # P1 recto: half-title
    el.append(Spacer(1, TEXT_H * 0.38))
    el.append(Paragraph("MASTERS X", S_HALF))
    el.append(Spacer(1, 10))
    el.append(Paragraph("The Complete Trilogy",
              ParagraphStyle("HTS", parent=S_SUB, fontSize=11, textColor=LT)))
    el.append(PageBreak())

    # P2 verso: blank
    el.append(Spacer(1, 12))
    el.append(PageBreak())

    # P3 recto: full title
    el.append(Spacer(1, TEXT_H * 0.22))
    el.append(Paragraph("MASTERS X", S_TITLE))
    el.append(Spacer(1, 14))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 10))
    el.append(Paragraph("The Complete Trilogy", S_SUB))
    el.append(Spacer(1, 20))
    # List all three volumes
    vol_style = ParagraphStyle("VS", parent=S_SUB, fontSize=10, leading=14, textColor=LT)
    for sub in ["The Inheritance of Frequency", "The Grimoire", "The Kingdom"]:
        el.append(Paragraph(f"<i>{sub}</i>", vol_style))
    el.append(Spacer(1, TEXT_H * 0.14))
    el.append(Paragraph(BUILD_AUTHOR, S_AUTH))
    el.append(PageBreak())

    # P4 verso: copyright
    el.append(Spacer(1, TEXT_H * 0.62))
    omnibus_isbn = os.environ.get("MASTERSX_OMNIBUS_HC_ISBN", "979-8-2958-8441-2").strip()
    isbn_line = "ISBN " + format_isbn(BUILD_ISBN) if BUILD_ISBN and BUILD_ISBN != "ISBN-NOT-SET" else f"ISBN {omnibus_isbn}"
    el.append(Paragraph(
        "Copyright \u00a9 2026 Jason Carroll Holloway. All rights reserved.<br/><br/>"
        "No part of this publication may be reproduced, distributed, or transmitted "
        "in any form or by any means without the prior written permission of the author.<br/><br/>"
        "This is a work of fiction. Names, characters, places, and incidents either are the "
        "product of the author\u2019s imagination or are used fictitiously.<br/><br/>"
        "Certain real locations, institutions, and public spaces are mentioned for atmospheric "
        "purposes. All events, characters, and interpretations associated with these locations "
        "are entirely fictional.<br/><br/>"
        "Published in the United States of America<br/><br/>"
        "First Omnibus Edition<br/><br/>"
        + isbn_line,
        S_COPY))
    el.append(PageBreak())

    # P5 recto: combined epigraphs
    el.append(Spacer(1, TEXT_H * 0.12))
    attr_style = ParagraphStyle("EA", parent=S_EPIG, fontSize=8.5)
    for i, (quote, attr) in enumerate(EPIGRAPHS):
        el.append(Paragraph(quote, S_EPIG))
        if attr:
            el.append(Spacer(1, 4))
            el.append(Paragraph(attr, attr_style))
        if i < len(EPIGRAPHS) - 1:
            el.append(Spacer(1, 14))
    el.append(PageBreak())

    # P6 verso: blank. Note: no trailing PageBreak -- the first book_divisor
    # supplies its own PageBreak and the ChapterMarker recto-enforcement lands
    # Volume One on P7.
    el.append(NoChromeMarker("front_blank_p6"))
    el.append(Spacer(1, 12))

    return el


def book_divisor(book_num):
    """Volume divisor page: ornament + VOLUME ONE/TWO/THREE + subtitle.

    The divisor recto + its blank verso are both marked as no-chrome (no
    running head, no folio) so the volume break reads as a proper display
    page.
    """
    el = []
    el.append(PageBreak())
    el.append(ChapterMarker(f"VOLUME {book_num}"))
    el.append(NoChromeMarker(f"volume_{book_num}_divisor"))
    el.append(Spacer(1, TEXT_H * 0.35))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 18))
    el.append(Paragraph(BOOK_LABELS[book_num], S_BOOKLABEL))
    el.append(Spacer(1, 8))
    el.append(Paragraph(BOOK_SUBTITLES[book_num], S_SUB))
    el.append(Spacer(1, 18))
    el.append(OrnRule(TEXT_W))
    el.append(PageBreak())
    # Blank verso after divisor.
    el.append(NoChromeMarker(f"volume_{book_num}_divisor_verso"))
    el.append(Spacer(1, 12))
    return el


def chapter_open(num_text, title, hz=None, sub=None):
    """Chapter opening with ornamental rule and header."""
    el = []
    el.append(Spacer(1, TEXT_H * 0.38))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 12))
    el.append(Paragraph(num_text, S_CHNUM))
    if title:
        el.append(Paragraph(title, S_CHTITLE))
    if sub:
        el.append(Paragraph(sub, S_CHSUB))
    if hz:
        el.append(Spacer(1, 4))
        el.append(Paragraph(hz, S_HZ))
    el.append(Spacer(1, 8))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 16))
    return el


def sect_break():
    """Decorative section break with drawn diamond ornaments."""
    return [
        Spacer(1, 16),
        SectionOrnament(TEXT_W),
        Spacer(1, 16),
    ]


def build_body(paras, book_num):
    """Build flowable elements from extracted paragraphs."""
    el = []
    first = True
    i = 0
    while i < len(paras):
        p = paras[i]
        c = p["c"]

        if c in ("skip", "chbreak"):
            i += 1
            continue

        if c == "chnum":
            chnum = p["t"]
            chtitle = ""
            hz = None
            sub = None
            j = i + 1
            while j < len(paras):
                nc = paras[j]["c"]
                if nc == "chtitle":
                    chtitle = paras[j]["t"]
                    j += 1
                elif nc == "hz":
                    hz = paras[j]["t"]
                    j += 1
                elif nc == "episub":
                    sub = (sub + "  " + paras[j]["t"]) if sub else paras[j]["t"]
                    j += 1
                elif nc == "coda":
                    sub = (sub + "  " + paras[j]["t"]) if sub else paras[j]["t"]
                    j += 1
                else:
                    break

            # Suppress Hz tag on the Prologue (no frequency for Bohemia 1267)
            if chnum == "PROLOGUE":
                hz = None

            el.append(PageBreak())
            el.append(ChapterMarker(chtitle or chnum))
            el.extend(chapter_open(chnum, chtitle, hz, sub))
            first = True
            i = j
            continue

        if c == "sectbreak":
            # Suppress a sectbreak that is the last thing in its chapter.
            # The chapter break itself is the separator; an extra ornament at
            # the tail just overflows onto the next page and creates blank
            # chrome pages.
            k = i + 1
            while k < len(paras) and paras[k]["c"] in ("chbreak", "sectbreak", "skip"):
                k += 1
            if k >= len(paras) or paras[k]["c"] == "chnum":
                i += 1
                continue
            el.extend(sect_break())
            first = True
            i += 1
            continue

        if c == "timemark":
            el.append(PageBreak())
            el.append(ChapterMarker(p["t"]))
            el.extend(chapter_open(p["t"], ""))
            first = True
            i += 1
            continue

        # Body text — use rich text with italic/bold preserved
        rich = p["rich"]
        el.append(Paragraph(rich, S_BODY1 if first else S_BODY))
        first = False
        i += 1
    return el


def backmatter():
    """Omnibus back matter."""
    el = []
    el.append(PageBreak())
    el.append(ChapterMarker("ABOUT THE AUTHOR"))
    el.append(Spacer(1, TEXT_H * 0.20))
    el.append(Paragraph("ABOUT THE AUTHOR",
              ParagraphStyle("AH", parent=S_CHTITLE, fontSize=13)))
    el.append(Spacer(1, 14))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 20))
    el.append(Paragraph(
        "Jason Carroll Holloway holds an M.A. in English Literature from Mercy University "



        "in Dobbs Ferry, New York, as well as various degrees and certificates in Psychology, "
        "Sociology, Creative Writing, and Data Analytics. He is a writer and researcher whose "
        "work explores the intersection of acoustic science, medieval scholarship, and human "
        "consciousness. He lives in Kansas City.",
        ParagraphStyle("AB", parent=S_BODY1, alignment=TA_CENTER, fontSize=10, leading=14)))
    el.append(Spacer(1, 36))
    el.append(Paragraph("ALSO BY JASON CARROLL HOLLOWAY",
              ParagraphStyle("ABH", parent=S_CHTITLE, fontSize=11)))
    el.append(Spacer(1, 14))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 20))
    for t in [
        "Innocence, Desire, and the Architecture of the Fall",
    ]:
        el.append(Paragraph(f"<i>{escape(t)}</i>",
                  ParagraphStyle("AI", parent=S_BODY1, alignment=TA_CENTER,
                                  fontSize=10, leading=16, spaceAfter=4)))
    el.append(Spacer(1, 36))
    el.append(OrnRule(TEXT_W))
    el.append(Spacer(1, 14))
    el.append(Paragraph(BUILD_IMPRINT,
              ParagraphStyle("PUB", parent=S_COPY, fontSize=9)))
    el.append(Spacer(1, 4))
    el.append(Paragraph("www.jasoncholloway.com",
              ParagraphStyle("URL", parent=S_COPY, fontSize=8, fontName="GaramondIt")))
    # Force an even page count (adds blank page at the very end)
    el.append(PageBreak())
    el.append(PageBreak())
    return el


# ═══════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════

def _collect_elements():
    """Extract all three volumes and assemble the flowable list.

    Returns (elements, paragraph_stats) where paragraph_stats is a per-volume
    list of (count, italic_count) tuples for logging.
    """
    elements = []
    elements.extend(frontmatter())
    stats = []
    for book_num in [1, 2, 3]:
        doc_path = {1: DOCX_PATH1, 2: DOCX_PATH2, 3: DOCX_PATH3}[book_num]
        paras = extract_with_formatting(doc_path, 0, None)
        italic_count = sum(1 for p in paras if "<i>" in p["rich"])
        stats.append((book_num, len(paras), italic_count))
        elements.extend(book_divisor(book_num))
        elements.extend(build_body(paras, book_num))
    elements.extend(backmatter())
    return elements, stats


def main():
    print("=" * 60)
    print("MASTERS X \u00b7 OMNIBUS \u00b7 INTERIOR PDF GENERATOR v6")
    print("Garamond 11pt \u00b7 Canvas Ornaments \u00b7 IngramSpark Upload")
    print("Source: Multiple")
    print("=" * 60)

    print("\n[1/5] Extracting all three volumes...")
    elements, stats = _collect_elements()
    for book_num, n, ic in stats:
        print(f"      Volume {book_num} ({BOOK_SUBTITLES[book_num]}): {n} paragraphs ({ic} with italic runs)")

    # Pass 1: discover chapter openers + display pages.
    print("[2/5] Pass 1: discovering layout...")
    scratch = OUTPUT_DIR / "_omnibus_pass1_scratch.pdf"
    doc1 = OmnibusDoc(
        str(scratch),
        pagesize=(TRIM_W, TRIM_H),
        title="Masters X: The Complete Trilogy",
        author=BUILD_AUTHOR,
    )
    doc1.build(elements)
    chapter_openers = set(doc1.discovered_chapter_opener_pages)
    no_chrome = set(doc1.discovered_no_chrome_pages)
    print(f"      chapter openers: {len(chapter_openers)} pages")
    print(f"      no-chrome pages: {len(no_chrome)} pages")
    try:
        scratch.unlink()
    except OSError:
        pass

    # Pass 2: real build.
    print("[3/5] Pass 2: rendering final PDF...")
    elements2, _ = _collect_elements()
    doc = OmnibusDoc(
        str(OUTPUT_PDF),
        pagesize=(TRIM_W, TRIM_H),
        title="Masters X: The Complete Trilogy",
        author=BUILD_AUTHOR,
        chapter_opener_pages=chapter_openers,
        no_chrome_pages=no_chrome,
    )
    doc.build(elements2)

    print(f"\n[4/5] COMPLETE!")
    print(f"      Output: {OUTPUT_PDF}")
    print(f"      Pages:  {doc.total_pages}")
    print(f"{'=' * 60}")

    # Spine width calculations per IngramSpark hardcover formula:
    #   spine = pages * paper_thickness + 0.06"  (board+wrap allowance)
    # Multiple paper stocks shown so the cover designer can match the IngramSpark
    # Cover Template Generator output for whichever paper is selected.
    print(f"[5/5] HARDCOVER SPINE WIDTH for {doc.total_pages} pages:")
    stocks = [
        ("50# White (BW default)", 0.002252),
        ("50# Cream            ", 0.002347),
        ("70# White            ", 0.002927),
        ("70# Cream            ", 0.003027),
    ]
    for label, t in stocks:
        sw = doc.total_pages * t + 0.06
        print(f"      {label}: {sw:.4f}\" ({doc.total_pages} \u00d7 {t} + 0.06)")
    print(f"      Source for formula: IngramSpark Cover Template Generator.")
    print(f"      Use IngramSpark's official template generator to get the exact")
    print(f"      jacket dimensions (incl. flap widths) for the final cover.")


if __name__ == "__main__":
    main()
