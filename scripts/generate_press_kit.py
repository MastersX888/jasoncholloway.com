#!/usr/bin/env python3
"""Regenerate Seventh City Press PDF press kit from CANON-aligned metadata."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "press-kit"
DOWNLOADS = Path.home() / "Downloads"

GOLD = colors.HexColor("#B8922E")
INK = colors.HexColor("#1A1A1A")
MUTED = colors.HexColor("#555555")

CATALOG_PATH = ROOT / "lib" / "data" / "ingram-catalog.json"

# Editions whose page count is quoted in prose as well as in the ISBN matrix.
OMNIBUS_PB_ISBN = "9798256072704"
OMNIBUS_HC_ISBN = "9798295884412"


def fmt_isbn(raw: str) -> str:
    d = re.sub(r"\D", "", raw)
    if len(d) != 13:
        return raw
    return f"{d[0:3]}-{d[3]}-{d[4:8]}-{d[8:12]}-{d[12]}"


def load_page_counts() -> dict[str, int]:
    """Page counts by ISBN, read from the repo's single source of truth.

    There is deliberately no fallback constant. Seven files each holding their
    own copy of this table is how a stale page count reached live retail
    metadata; a press kit that quietly prints a hard-coded number when the
    catalog is unreadable would reintroduce exactly that failure.
    """
    try:
        raw = CATALOG_PATH.read_text(encoding="utf-8")
    except OSError as exc:
        sys.exit(f"press kit: cannot read page counts from {CATALOG_PATH}: {exc}")
    try:
        catalog = json.loads(raw)
    except json.JSONDecodeError as exc:
        sys.exit(f"press kit: {CATALOG_PATH} is not valid JSON: {exc}")

    editions = catalog.get("editions")
    if not isinstance(editions, list) or not editions:
        sys.exit(f"press kit: {CATALOG_PATH} has no `editions` array.")

    counts: dict[str, int] = {}
    for edition in editions:
        if not isinstance(edition, dict):
            continue
        isbn = edition.get("isbn")
        count = edition.get("pageCount")
        if isinstance(isbn, str) and isinstance(count, int) and not isinstance(count, bool):
            counts[isbn] = count
    if not counts:
        sys.exit(f"press kit: {CATALOG_PATH} has no usable isbn/pageCount pairs.")
    return counts


PAGE_COUNTS = load_page_counts()


def page_count(isbn: str) -> int:
    """The catalog's page count for `isbn`, or a hard stop."""
    try:
        return PAGE_COUNTS[isbn]
    except KeyError:
        sys.exit(
            f"press kit: ISBN {isbn} is absent from {CATALOG_PATH.name}. "
            "Add the edition to the catalog — do not write a page count into this script."
        )


OMNIBUS_PB_PAGES = page_count(OMNIBUS_PB_ISBN)
OMNIBUS_HC_PAGES = page_count(OMNIBUS_HC_ISBN)

# (format label, ISBN or ASIN, US list price). Page counts are not written here:
# `isbn_table` looks each one up by ISBN so the matrix cannot drift.
CATALOG = [
    {
        "group": "VOLUME I · THE INHERITANCE OF FREQUENCY",
        "title": "The Inheritance of Frequency",
        "rows": [
            ("Paperback", "9798256008048", "$16.99"),
            ("Hardcover", "9798295800801", "$29.99"),
            ("Ebook (EPUB)", "9798256008819", "$6.99"),
            ("Kindle", "B0H4KYMSM1", "$6.99"),
        ],
    },
    {
        "group": "VOLUME II · THE GRIMOIRE",
        "title": "The Grimoire",
        "rows": [
            ("Paperback", "9798256009953", "$16.99"),
            ("Hardcover", "9798295812675", "$29.99"),
            ("Ebook (EPUB)", "9798256009625", "$6.99"),
            ("Kindle", "B0H4KQ4YQJ", "$6.99"),
        ],
    },
    {
        "group": "VOLUME III · THE KINGDOM",
        "title": "The Kingdom",
        "rows": [
            ("Paperback", "9798256010072", "$16.99"),
            ("Hardcover", "9798295812705", "$29.99"),
            ("Ebook (EPUB)", "9798256009809", "$6.99"),
            ("Kindle", "B0H4L36X21", "$6.99"),
        ],
    },
    {
        "group": "MASTERS X: THE COMPLETE TRILOGY · OMNIBUS",
        "title": "Masters X: The Complete Trilogy",
        "rows": [
            ("Paperback", OMNIBUS_PB_ISBN, "$32.99"),
            ("Hardcover", OMNIBUS_HC_ISBN, "$44.99"),
        ],
    },
]


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "brand": ParagraphStyle(
            "brand",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            textColor=GOLD,
            leading=11,
            spaceAfter=2,
        ),
        "subbrand": ParagraphStyle(
            "subbrand",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            textColor=MUTED,
            leading=9,
            spaceAfter=10,
        ),
        "doctitle": ParagraphStyle(
            "doctitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            textColor=INK,
            leading=24,
            spaceAfter=4,
        ),
        "url": ParagraphStyle(
            "url",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            leading=10,
            spaceAfter=14,
        ),
        "kicker": ParagraphStyle(
            "kicker",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            textColor=GOLD,
            leading=10,
            spaceBefore=8,
            spaceAfter=6,
            letterSpacing=0.8,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=INK,
            leading=14,
            spaceAfter=8,
        ),
        "bodyBold": ParagraphStyle(
            "bodyBold",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=INK,
            leading=14,
            spaceAfter=8,
        ),
        "small": ParagraphStyle(
            "small",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            textColor=MUTED,
            leading=12,
            spaceAfter=6,
        ),
        "quote": ParagraphStyle(
            "quote",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=10,
            textColor=INK,
            leading=14,
            leftIndent=18,
            rightIndent=18,
            spaceAfter=4,
        ),
        "cite": ParagraphStyle(
            "cite",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            textColor=MUTED,
            leading=10,
            leftIndent=18,
            spaceAfter=10,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            textColor=MUTED,
            leading=9,
            alignment=TA_CENTER,
        ),
    }


def header_block(st: dict[str, ParagraphStyle], doc_label: str) -> list:
    return [
        # The mark is ASCII "VII", not U+2166: Helvetica-Bold is WinAnsi-encoded
        # and ReportLab answers an unencodable codepoint by silently switching to
        # ZapfDingbats, which drew a filled square here. The two non-breaking
        # spaces separate the mark from the wordmark and keep them on one line.
        Paragraph("VII&nbsp;&nbsp;Seventh City Press", st["brand"]),
        Paragraph("SEVENTH CITY PRESS · KANSAS CITY, MISSOURI", st["subbrand"]),
        Paragraph(doc_label, st["doctitle"]),
        Paragraph("seventhcitypress.com", st["url"]),
    ]


def footer_block(st: dict[str, ParagraphStyle], extra: str = "") -> list:
    line = "Review copies &amp; interviews on request · jasoncholloway.com/contact"
    if extra:
        line = f"{extra} · {line}"
    return [
        Spacer(1, 0.15 * inch),
        Paragraph(line, st["footer"]),
        Paragraph("Seventh City Press · Kansas City, MO", st["footer"]),
    ]


def build_pdf(filename: str, story: list) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / filename
    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.65 * inch,
        title=filename,
        author="Seventh City Press",
    )
    doc.build(story)
    downloads_copy = DOWNLOADS / filename
    downloads_copy.write_bytes(path.read_bytes())
    return path


def generate_author_bios() -> Path:
    st = styles()
    s = header_block(st, "Author Biography")
    s += [
        Paragraph("PRESS BIOS · READY TO QUOTE", st["kicker"]),
        Paragraph("Jason Carroll Holloway", st["bodyBold"]),
        Paragraph(
            "Writer and researcher at the intersection of acoustic science, medieval scholarship, and human consciousness.",
            st["body"],
        ),
        Paragraph("ONE LINE", st["kicker"]),
        Paragraph(
            "Jason Carroll Holloway is a Kansas City writer and researcher and the founder of Seventh City Press, author of the Masters&nbsp;X&nbsp;Trilogy.",
            st["body"],
        ),
        Paragraph("SHORT — ~50 WORDS", st["kicker"]),
        Paragraph(
            "Jason Carroll Holloway is a writer and researcher based in Kansas City and the founder of Seventh City Press. "
            "His work explores the intersection of acoustic science, medieval scholarship, and human consciousness. "
            "He is the author of the Masters&nbsp;X&nbsp;Trilogy — <i>The Inheritance of Frequency</i>, <i>The Grimoire</i>, and <i>The Kingdom</i>.",
            st["body"],
        ),
        Paragraph("STANDARD — ~100 WORDS", st["kicker"]),
        Paragraph(
            "Jason Carroll Holloway is a writer and researcher based in Kansas City and the founder of Seventh City Press. "
            "His work explores the intersection of acoustic science, medieval scholarship, and human consciousness — a set of preoccupations "
            "that runs through the Masters&nbsp;X&nbsp;Trilogy, his three-volume work of literary conspiracy fiction. "
            "He holds an M.A. in English Literature from Mercy University in Dobbs Ferry, New York, along with degrees and certificates "
            "in psychology, sociology, creative writing, and data analytics. Alongside the novels he maintains the Analysis Chamber, "
            "an open research archive that publishes the same acoustic measurements his characters run in the books. He lives and writes in Kansas City.",
            st["body"],
        ),
        Paragraph("EXTENDED — ~180 WORDS", st["kicker"]),
        Paragraph(
            "Jason Carroll Holloway is a writer and researcher based in Kansas City and the founder of Seventh City Press, the independent imprint "
            "behind his Masters&nbsp;X&nbsp;Trilogy. His work refuses the usual border between imaginative and intellectual writing: novels built on real "
            "archaeoacoustics research, medieval manuscript scholarship, and the documented subterranean geography of his own city. "
            "The trilogy — <i>The Inheritance of Frequency</i>, <i>The Grimoire</i>, and <i>The Kingdom</i> — braids the undeciphered Voynich Manuscript, "
            "the medieval Ars Notoria, and a recurring 111.2&nbsp;Hz frequency into a conspiracy that begins beneath Kansas City and reaches a crypt sealed "
            "under Prague since 1267. Much of the science underpinning the fiction is published openly through the Analysis Chamber, a research archive on his website. "
            "Holloway holds an M.A. in English Literature from Mercy University in Dobbs Ferry, New York, along with degrees and certificates in psychology, "
            "sociology, creative writing, and data analytics. He has also written scholarly criticism, including a monograph on the novelist John Hawkes. "
            "He lives and writes in Kansas City.",
            st["body"],
        ),
        Paragraph("BOILERPLATE — SEVENTH CITY PRESS", st["kicker"]),
        Paragraph(
            "Seventh City Press is an independent literary imprint founded by Jason Carroll Holloway to publish work that refuses the division "
            "between imaginative and intellectual work — novels that think, and criticism that speaks. The name comes from the seven cities of the "
            "Aldric tradition in the Masters&nbsp;X&nbsp;Trilogy.",
            st["body"],
        ),
    ]
    s += footer_block(st, "Headshots available in the press kit · seventhcitypress.com")
    return build_pdf("Holloway_Author_Bios.pdf", s)


def isbn_table(st: dict[str, ParagraphStyle]) -> list:
    flow: list = []
    for block in CATALOG:
        flow.append(Paragraph(block["group"], st["kicker"]))
        data = [["Format", "ISBN / ASIN", "Pages", "US List"]]
        for fmt, code, price in block["rows"]:
            has_isbn = code.startswith("979")
            display = fmt_isbn(code) if has_isbn else code
            # Kindle editions are listed by ASIN; Amazon publishes no page count.
            pages = str(page_count(code)) if has_isbn else "—"
            data.append([fmt, display, pages, price])
        table = Table(data, colWidths=[1.15 * inch, 2.35 * inch, 0.65 * inch, 0.75 * inch])
        table.setStyle(
            TableStyle(
                [
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                    ("TEXTCOLOR", (0, 0), (-1, 0), GOLD),
                    ("TEXTCOLOR", (0, 1), (-1, -1), INK),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#F5F2EA")),
                    ("LINEBELOW", (0, 0), (-1, 0), 0.5, GOLD),
                    ("LINEBELOW", (0, 1), (-1, -1), 0.25, colors.HexColor("#DDDDDD")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 4),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            )
        )
        flow.append(table)
        flow.append(Spacer(1, 0.08 * inch))
    return flow


def generate_fact_sheet() -> Path:
    st = styles()
    s = header_block(st, "Fact Sheet")
    s += [
        Paragraph("PRESS FACT SHEET", st["kicker"]),
        Paragraph("The Masters&nbsp;X&nbsp;Trilogy", st["bodyBold"]),
        Paragraph("Literary conspiracy fiction · Jason Carroll Holloway · Seventh City Press · <b>Available now</b> (launched June 2026)", st["body"]),
        Paragraph("CATALOG &amp; ISBN MATRIX", st["kicker"]),
    ]
    s += isbn_table(st)
    s += [
        Paragraph(
            "All paperback, hardcover, ebook, and omnibus editions are live. "
            "Amazon carries Kindle editions only for the three individual volumes; print is sold direct via IngramSpark and orderable worldwide by ISBN.",
            st["small"],
        ),
        Paragraph("EDITIONS &amp; SPECIFICATIONS", st["kicker"]),
        Paragraph(
            "Individual volumes: trade paperback 5.5&nbsp;×&nbsp;8.5&nbsp;in; jacketed hardcover 6.14&nbsp;×&nbsp;9.21&nbsp;in. "
            f"Omnibus paperback {OMNIBUS_PB_PAGES}&nbsp;pp (5.5&nbsp;×&nbsp;8.5&nbsp;in); "
            f"omnibus hardcover {OMNIBUS_HC_PAGES}&nbsp;pp (6.14&nbsp;×&nbsp;9.21&nbsp;in, jacketed case laminate). "
            "Interior: standard cream paper (fiction). Publisher: Seventh City Press. Print &amp; distribution: IngramSpark (global). "
            "Ebook: $6.99 per trilogy volume — Kindle (Amazon KDP, Vol.&nbsp;I–III only; separate cover/ASIN) and EPUB (Google Play Books).",
            st["body"],
        ),
        Paragraph("BISAC SUBJECT CODES", st["kicker"]),
        Paragraph("1 · Fiction / Thrillers / Suspense — FIC030000", st["body"]),
        Paragraph("2 · Fiction / Literary — FIC019000", st["body"]),
        Paragraph("3 · Fiction / Historical / General — FIC014000", st["body"]),
        Paragraph("CHANNELS", st["kicker"]),
        Paragraph(
            "IngramSpark direct · Bookshop.org · Kindle (Amazon, Vol.&nbsp;I–III only) · Google Play Books (EPUB) · Ingram global catalog (40,000+ retail &amp; library accounts) · library systems via OverDrive and Baker&nbsp;&amp;&nbsp;Taylor. "
            "Research companion: the Analysis Chamber archive at jasoncholloway.com/chamber/. "
            "Omnibus product page: jasoncholloway.com/books/masters-x/omnibus/.",
            st["body"],
        ),
    ]
    s += footer_block(st)
    return build_pdf("Masters_X_Fact_Sheet.pdf", s)


def generate_press_release() -> Path:
    st = styles()
    s = header_block(st, "Press &amp; Rights")
    s += [
        Paragraph("jasoncholloway.com/contact", st["url"]),
        Paragraph("FOR IMMEDIATE RELEASE", st["kicker"]),
        Paragraph("Jason Carroll Holloway Launches the Masters&nbsp;X&nbsp;Trilogy", st["doctitle"]),
        Paragraph(
            "A conspiracy of frequency, medieval manuscripts, and the city beneath the city — three novels and a complete omnibus from Seventh City Press.",
            st["body"],
        ),
        Paragraph(
            "<b>KANSAS CITY, MO</b> — Author Jason Carroll Holloway and his independent imprint Seventh City Press have released the "
            "<b>Masters&nbsp;X&nbsp;Trilogy</b>, a three-volume work of literary conspiracy fiction. The trilogy — "
            "<i>The Inheritance of Frequency</i>, <i>The Grimoire</i>, and <i>The Kingdom</i> — is available now in hardcover, paperback, and Kindle, "
            "alongside a complete one-volume omnibus (hardcover $44.99 · paperback $32.99 via IngramSpark direct).",
            st["body"],
        ),
        Paragraph(
            "The story begins beneath Kansas City. Blake Masters — a graduate student who lost his security clearance and his job as a guard in the "
            "subterranean limestone vaults beneath the city — inherits a safety deposit box his grandfather paid for fifty-seven years in advance, "
            "timed to open at the exact moment Blake would be ready for it. Inside: seven notebooks, thirty years of classified acoustic research, "
            "and a cross-reference to a crypt that has been sealed beneath Prague since 1267. The trilogy is the account of what Blake does with that "
            "knowledge — and what it does to him.",
            st["body"],
        ),
        Paragraph(
            "The series braids documented history into fiction: the undeciphered Voynich Manuscript and the medieval Ars Notoria; the science of "
            "archaeoacoustics and a 111.2&nbsp;Hz frequency that recurs in caves and cathedrals across four continents; and the real, subterranean "
            "geography of Kansas City, from the SubTropolis cavern complex upward. Every location in the novels can be visited, looked up, or found in a "
            "scholarly bibliography — and much of the underlying data is published openly through the Analysis Chamber, a research archive on the author's website.",
            st["body"],
        ),
        Paragraph(
            '"What the medieval masters encoded in cathedral geometry and grimoire tradition wasn\'t mysticism — it was a technology we had simply forgotten how to read. '
            'The Masters&nbsp;X&nbsp;Trilogy is the account of learning to read it again."',
            st["quote"],
        ),
        Paragraph("— JASON CARROLL HOLLOWAY", st["cite"]),
        Paragraph(
            "For readers of Eco's <i>Foucault's Pendulum</i>, Brown's <i>The Da Vinci Code</i>, Kostova's <i>The Historian</i>, and Doerr's <i>Cloud Cuckoo Land</i>.",
            st["body"],
        ),
        Paragraph("THE BOOKS", st["kicker"]),
        Paragraph("<b>Vol.&nbsp;I · The Inheritance of Frequency</b> — Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague.", st["body"]),
        Paragraph("<b>Vol.&nbsp;II · The Grimoire</b> — The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting.", st["body"]),
        Paragraph("<b>Vol.&nbsp;III · The Kingdom</b> — The demonstration and the argument — and an open-source release that reaches 1.2&nbsp;million downloads.", st["body"]),
        Paragraph(
            "<b>Omnibus · Masters X: The Complete Trilogy</b> — All three novels in a single volume "
            f"({OMNIBUS_HC_PAGES}&nbsp;pp HC / {OMNIBUS_PB_PAGES}&nbsp;pp PB).",
            st["body"],
        ),
        Paragraph("AVAILABILITY", st["kicker"]),
        Paragraph(
            "Available now. Hardcover and paperback distributed globally through IngramSpark — orderable from any bookstore by ISBN and via Bookshop.org "
            "and library systems (OverDrive, Baker&nbsp;&amp;&nbsp;Taylor). Ebook editions at $6.99 per volume — Kindle on Amazon (Vol.&nbsp;I–III only) and EPUB on Google Play Books. "
            "Omnibus: $44.99 hardcover / $32.99 paperback (IngramSpark direct; not on Amazon). Full ISBNs, page counts, and BISAC subject codes appear on the accompanying Fact Sheet.",
            st["body"],
        ),
        Paragraph("ABOUT THE AUTHOR", st["kicker"]),
        Paragraph(
            "Jason Carroll Holloway is a writer and researcher based in Kansas City and the founder of Seventh City Press. His work explores the intersection "
            "of acoustic science, medieval scholarship, and human consciousness. He holds an M.A. in English Literature from Mercy University in Dobbs Ferry, "
            "New York, along with degrees and certificates in psychology, sociology, creative writing, and data analytics. He lives and writes in Kansas City.",
            st["body"],
        ),
        Paragraph("ABOUT SEVENTH CITY PRESS", st["kicker"]),
        Paragraph(
            "Seventh City Press is an independent literary imprint founded by Jason Carroll Holloway to publish work that refuses the division between "
            "imaginative and intellectual work — novels that think, and criticism that speaks. The name comes from the seven cities of the Aldric tradition in the Masters&nbsp;X&nbsp;Trilogy.",
            st["body"],
        ),
        Paragraph("# # #", st["bodyBold"]),
        Paragraph(
            "Review copies and interviews are available to accredited reviewers and journalists on request.<br/>"
            "Press materials &amp; contact: seventhcitypress.com · jasoncholloway.com/contact",
            st["small"],
        ),
    ]
    return build_pdf("Masters_X_Press_Release.pdf", s)


def generate_synopses() -> Path:
    st = styles()
    s = header_block(st, "Series &amp; Synopses")
    s += [
        Paragraph("SERIES OVERVIEW &amp; BOOK-BY-BOOK SYNOPSES", st["kicker"]),
        Paragraph("The Masters&nbsp;X&nbsp;Trilogy", st["bodyBold"]),
        Paragraph("THE PREMISE", st["kicker"]),
        Paragraph(
            "Beneath Kansas City, Blake Masters — a graduate student who lost his security clearance and his job as a guard in the subterranean limestone vaults — "
            "inherits a safety deposit box his grandfather paid for fifty-seven years in advance — timed to open at the exact moment Blake would be ready for it. "
            "Inside: seven notebooks, thirty years of classified acoustic research, and a cross-reference to a crypt sealed beneath Prague since 1267. "
            "The trilogy is the account of what Blake does with that knowledge, and what it does to him.",
            st["body"],
        ),
        Paragraph(
            "The series braids documented history into fiction — the undeciphered Voynich Manuscript, the medieval Ars Notoria, the science of archaeoacoustics, "
            "and a 111.2&nbsp;Hz frequency that recurs in caves and cathedrals across four continents — against the real subterranean geography of Kansas City, "
            "from the SubTropolis cavern complex upward. Every location can be visited or found in a scholarly bibliography.",
            st["body"],
        ),
        Paragraph("VOLUME I — THE INHERITANCE OF FREQUENCY", st["kicker"]),
        Paragraph(
            "Seven notebooks. Thirty years of classified acoustic research. A sealed crypt beneath Prague. Blake Masters opens the box that was left for him and finds "
            "a body of work that shouldn't exist — measurements taken in places no researcher should have reached, all circling one recurring signal. The first volume "
            "is the descent: how an ordinary man comes to believe the impossible thing his grandfather spent a lifetime documenting, and decides to follow it underground.",
            st["body"],
        ),
        Paragraph("VOLUME II — THE GRIMOIRE", st["kicker"]),
        Paragraph(
            "The Ars Notoria decoded. A preparation protocol for the frequency. Twenty-three candidates waiting. In the second volume, the research stops being a mystery "
            "to solve and becomes an instruction to carry out. What the medieval masters wrote down as ritual reveals itself as method — and Blake learns that a protocol "
            "is only as safe as the people willing to run it.",
            st["body"],
        ),
        Paragraph("VOLUME III — THE KINGDOM", st["kicker"]),
        Paragraph(
            "The demonstration. The argument. The open-source release. The final volume brings the work into the open — a proof staged for the world, an argument for what "
            "the frequency means, and, within the novel's own events, a release that reaches 1.2&nbsp;million downloads before anyone can decide whether it should have. "
            "<i>The Kingdom</i> is about what happens when a secret becomes a public fact.",
            st["body"],
        ),
        Paragraph("OMNIBUS — THE COMPLETE TRILOGY", st["kicker"]),
        Paragraph(
            f"All three volumes collected in a single edition: {OMNIBUS_HC_PAGES} pages (hardcover) / {OMNIBUS_PB_PAGES} pages (paperback). "
            "Available via IngramSpark direct ($44.99 HC / $32.99 PB; not on Amazon). "
            "Product page: jasoncholloway.com/books/masters-x/omnibus/.",
            st["body"],
        ),
        Paragraph("THE SEVEN CITIES", st["kicker"]),
        Paragraph(
            "The imprint takes its name from the seven cities of the Aldric tradition in the trilogy — Prague, Paris, Rome, Constantinople, Toledo, Uppsala, and the "
            "unnamed seventh: the city where the frequency was first heard. A press named for a threshold.",
            st["body"],
        ),
        Paragraph("COMPARABLE TITLES", st["kicker"]),
        Paragraph(
            "Umberto Eco, <i>Foucault's Pendulum</i> · Dan Brown, <i>The Da Vinci Code</i> · Elizabeth Kostova, <i>The Historian</i> · Anthony Doerr, <i>Cloud Cuckoo Land</i>",
            st["body"],
        ),
        Paragraph("THE RESEARCH LAYER", st["kicker"]),
        Paragraph(
            "Much of the science underpinning the fiction is published openly through the Analysis Chamber, a research archive on the author's website that runs the same "
            "acoustic measurements the characters run in the books — the trilogy's field notes, made available to any reader who wants to check the work.",
            st["body"],
        ),
    ]
    s += footer_block(st)
    return build_pdf("Masters_X_Synopses.pdf", s)


def merge_press_kit(paths: list[Path]) -> Path:
    from pypdf import PdfWriter

    kit = OUT / "Masters_X_Press_Kit.pdf"
    writer = PdfWriter()
    for p in paths:
        writer.append(str(p))
    with kit.open("wb") as f:
        writer.write(f)
    (DOWNLOADS / kit.name).write_bytes(kit.read_bytes())
    return kit


def main() -> None:
    paths = [
        generate_press_release(),
        generate_fact_sheet(),
        generate_author_bios(),
        generate_synopses(),
    ]
    kit = merge_press_kit(paths)
    print("Generated:")
    for p in paths + [kit]:
        print(f"  {p}")
        print(f"  -> {DOWNLOADS / p.name}")


if __name__ == "__main__":
    main()
