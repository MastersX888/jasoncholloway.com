from __future__ import annotations
# -*- coding: utf-8 -*-
"""Generate Masters X trilogy EPUB 3 files from corrected DOCX source."""


import html
import importlib.util
import sys
import zipfile
from pathlib import Path

from ebooklib import epub

TRILOGY = Path(r"c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\build_scripts")
DOCX = TRILOGY / "IngramSpark_Upload" / "MASTERS_X_TRILOGY_READTHROUGH_FINAL.docx"
UPLOAD = TRILOGY / "IngramSpark_Upload"
OUT_DIR = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\Jason_Carroll_Holloway_Final_Export")
CSS_PATH = Path(r"E:\Masters_X_Trilogy_Archive\Old_Drafts_and_Backups\epub_book.css")

VOLUMES = [
    {
        "vol": 1,
        "module": "generate_book1_interior_paperback.py",
        "docx_path": r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\files_3_extracted\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx",
        "slice": (0, None),
        "title": "Masters X: The Inheritance of Frequency",
        "subtitle": "The Inheritance of Frequency",
        "volume": "Volume One",
        "isbn": "979-8-2560-0881-9",
        "asin": "B0H4KYMSM1",
        "isbn_bare": "9798256008819",
        "cover": Path(r"E:\Masters_X_Trilogy_Archive\Old_Drafts_and_Backups\IngramSpark_Upload\Book1_The_Inheritance_of_Frequency\EBOOK_COVER_BOOK1.jpg"),
        "output": OUT_DIR / "MASTERS_X_BOOK1_EPUB_v1.epub",
        "epigraph_quote": (
            "\u201cThere\u2019s no chaos in nature, Blake.<br/>"
            "Only patterns we don\u2019t understand yet.\u201d"
        ),
        "epigraph_attr": "\u2014 William Masters",
    },
    {
        "vol": 2,
        "module": "generate_book2_interior_paperback.py",
        "docx_path": r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\files_3_extracted\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx",
        "slice": (0, None),
        "title": "Masters X: The Grimoire",
        "subtitle": "The Grimoire",
        "volume": "Volume Two",
        "isbn": "979-8-2560-0962-5",
        "asin": "B0H4KQ4YQJ",
        "isbn_bare": "9798256009625",
        "cover": Path(r"E:\Masters_X_Trilogy_Archive\Old_Drafts_and_Backups\IngramSpark_Upload\Book2_The_Grimoire\EBOOK_COVER_BOOK2.jpg"),
        "output": OUT_DIR / "MASTERS_X_BOOK2_EPUB_v1.epub",
        "epigraph_quote": (
            "\u201cThe preparation is not about the frequency.<br/>"
            "The preparation is about the organism.\u201d"
        ),
        "epigraph_attr": "\u2014 Blake Masters, Moleskine IX",
    },
    {
        "vol": 3,
        "module": "generate_book3_interior_paperback.py",
        "docx_path": r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\files_3_extracted\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx",
        "slice": (0, None),
        "title": "Masters X: The Kingdom",
        "subtitle": "The Kingdom",
        "volume": "Volume Three",
        "isbn": "979-8-2560-0980-9",
        "asin": "B0H4L36X21",
        "isbn_bare": "9798256009809",
        "cover": Path(r"E:\Masters_X_Trilogy_Archive\Old_Drafts_and_Backups\IngramSpark_Upload\Book3_The_Kingdom\EBOOK_COVER_BOOK3.jpg"),
        "output": OUT_DIR / "MASTERS_X_BOOK3_EPUB_v1.epub",
        "epigraph_quote": (
            "\u201cSome signals you pick up by accident.<br/>"
            "Some are aimed at you.\u201d"
        ),
        "epigraph_attr": "\u2014 James Masters",
    },
]

COPYRIGHT_TAIL = (
    "<p>No part of this publication may be reproduced, distributed, or transmitted "
    "in any form or by any means without the prior written permission of the author.</p>"
    "<p>This is a work of fiction. Names, characters, places, and incidents either are the "
    "product of the author\u2019s imagination or are used fictitiously.</p>"
    "<p>Certain real locations, institutions, and public spaces are mentioned for atmospheric "
    "purposes. All events, characters, and interpretations associated with these locations "
    "are entirely fictional.</p>"
    "<p>Published in the United States of America</p>"
    "<p>First Edition</p>"
)

SCENE_BREAK = (
    '<div class="scene-break"><span class="sb-rule"></span> \u25c7 \u25c6 \u25c7 '
    '<span class="sb-rule"></span></div>'
)

AUTHOR_BIO_SHORT = (
    "Jason Carroll Holloway holds an M.A. in English Literature from Mercy University in "
    "Dobbs Ferry, New York, as well as various degrees and certificates in Psychology, "
    "Sociology, Creative Writing, and Data Analytics. He is a writer and researcher "
    "whose work explores the intersection of acoustic science, medieval scholarship, "
    "and human consciousness. He lives in Kansas City."
)

ALSO_BY_ENTRIES = {
    1: [
        "Masters X: The Grimoire (Volume Two)",
        "Masters X: The Kingdom (Volume Three)",
        "Masters X: The Complete Trilogy (Omnibus Edition)",
        "Innocence, Desire, and the Architecture of the Fall",
    ],
    2: [
        "Masters X: The Inheritance of Frequency (Volume One)",
        "Masters X: The Kingdom (Volume Three)",
        "Masters X: The Complete Trilogy (Omnibus Edition)",
        "Innocence, Desire, and the Architecture of the Fall",
    ],
    3: [
        "Masters X: The Inheritance of Frequency (Volume One)",
        "Masters X: The Grimoire (Volume Two)",
        "Masters X: The Complete Trilogy (Omnibus Edition)",
        "Innocence, Desire, and the Architecture of the Fall",
    ],
}

CLOSER_META = {
    1: ("END OF VOLUME ONE", "The Inheritance of Frequency"),
    2: ("END OF VOLUME TWO", "The Grimoire"),
    3: ("END OF VOLUME THREE", "The Kingdom"),
}


def _xhtml_page(title: str, body_inner: str) -> bytes:
    doc = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<!DOCTYPE html>'
        '<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">'
        f"<head><title>{html.escape(title)}</title></head>"
        f"<body>{body_inner}</body></html>"
    )
    return doc.encode("utf-8")


def back_matter_html(vol: int) -> bytes:
    entries = "".join(
        f'<p class="book-entry">{html.escape(t)}</p>' for t in ALSO_BY_ENTRIES[vol]
    )
    body = (
        '<div class="back-matter">'
        '<h2 class="back-title">Also by Jason Carroll Holloway</h2>'
        f'<div class="also-by">{entries}</div>'
        "</div>"
        '<div class="back-matter">'
        '<h2 class="back-title">About the Author</h2>'
        f"<p>{html.escape(AUTHOR_BIO_SHORT)}</p>"
        "</div>"
    )
    doc = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<!DOCTYPE html>'
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" '
        'lang="en" xml:lang="en">'
        "<head>"
        "<title>Also By</title>"
        '<link rel="stylesheet" type="text/css" href="style/book.css"/>'
        "</head>"
        f"<body>{body}</body></html>"
    )
    return doc.encode("utf-8")


def end_closer_html(vol: int) -> bytes:
    label, subtitle = CLOSER_META[vol]
    body = (
        '<div class="end-closer">'
        '<hr class="ch-rule"/>'
        f'<p class="end-volume-label">{html.escape(label)}</p>'
        '<hr class="ch-rule"/>'
        '<p class="end-series-title">MASTERS X</p>'
        f'<p class="end-volume-subtitle">{html.escape(subtitle)}</p>'
        '<hr class="ch-rule"/>'
        "</div>"
    )
    return _xhtml_page(label.title(), body)


def load_generator(module_name: str):
    path = TRILOGY / module_name
    spec = importlib.util.spec_from_file_location(f"gen_{module_name}", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def split_chapters(paras: list[dict]) -> list[dict]:
    chapters: list[dict] = []
    current: dict | None = None
    first_body = False

    for p in paras:
        cls = p["c"]
        if cls == "skip":
            continue
        if cls == "chnum":
            if current:
                chapters.append(current)
            label = p["t"]
            current = {
                "label": label,
                "nav_title": label.title() if label in ("PROLOGUE", "EPILOGUE") else label,
                "header_lines": [label],
                "hz": None,
                "blocks": [],
            }
            first_body = True
            continue
        if current is None:
            continue
        if cls == "chtitle":
            current["header_lines"].append(p["t"])
            continue
        if cls == "hz":
            if current["label"] != "PROLOGUE":
                current["hz"] = p["t"]
            continue
        if cls in ("chbreak", "sectbreak"):
            current["blocks"].append(SCENE_BREAK)
            first_body = True
            continue
        if cls == "timemark":
            current["blocks"].append(f'<p class="time-mark">{p["rich"]}</p>')
            first_body = True
            continue
        if cls == "episub":
            current["blocks"].append(f'<p class="episode-sub">{p["rich"]}</p>')
            first_body = True
            continue
        if cls == "coda":
            current["blocks"].append(f'<p class="coda">{p["rich"]}</p>')
            first_body = True
            continue
        if cls == "body":
            if first_body:
                current["blocks"].append(f'<p class="first-para">{p["rich"]}</p>')
                first_body = False
            else:
                current["blocks"].append(f"<p>{p['rich']}</p>")

    if current:
        chapters.append(current)
    return chapters


def chapter_body(ch: dict) -> bytes:
    parts = ['<div class="chapter-header">', '<hr class="ch-rule"/>']
    parts.append(f'<p class="chapter-label">{html.escape(ch["header_lines"][0])}</p>')
    for extra in ch["header_lines"][1:]:
        parts.append(f'<p class="chapter-subtitle">{html.escape(extra)}</p>')
    if ch["hz"]:
        parts.append(f'<p class="chapter-hz">{html.escape(ch["hz"])}</p>')
    parts.append('<hr class="ch-rule-bottom"/>')
    parts.append("</div>")
    parts.extend(ch["blocks"])
    return "".join(parts).encode("utf-8")


def build_epub(cfg: dict, is_kindle: bool = False) -> Path:
    if not cfg["cover"].is_file():
        raise FileNotFoundError(f"Cover not found: {cfg['cover']}")
    gen = load_generator(cfg["module"])
    paras = gen.extract_with_formatting(cfg["docx_path"], 0, None)
    chapters_data = split_chapters(paras)
    if not chapters_data:
        raise RuntimeError(f"No chapters extracted for volume {cfg['vol']}")

    book = epub.EpubBook()
    import uuid
    if is_kindle:
        book.set_identifier(f"urn:uuid:{uuid.uuid4()}")
    else:
        book.set_identifier(f"urn:isbn:{cfg['isbn_bare']}")
    book.set_title(cfg["title"])
    book.set_language("en")
    book.add_author("Jason Carroll Holloway")
    book.add_metadata("DC", "publisher", "Seventh City Press")
    book.add_metadata("DC", "date", "2026")
    book.add_metadata("DC", "rights", "Copyright \u00a9 2026 Jason Carroll Holloway. All rights reserved.")
    book.add_metadata("DC", "source", f"urn:isbn:{cfg['isbn_bare']}")

    with open(cfg["cover"], "rb") as f:
        book.set_cover("cover.jpg", f.read())

    style = epub.EpubItem(
        uid="style",
        file_name="style/book.css",
        media_type="text/css",
        content=CSS_PATH.read_bytes(),
    )
    book.add_item(style)

    title_page = epub.EpubHtml(title="Title", file_name="title.xhtml", lang="en")
    title_page.content = (
        '<div class="title-page">'
        '<h1 class="book-title">MASTERS X</h1>'
        '<hr class="title-rule"/>'
        f'<p class="book-subtitle">{html.escape(cfg["subtitle"])}</p>'
        f'<p class="book-volume">{html.escape(cfg["volume"])}</p>'
        '<p class="book-author">Jason Carroll Holloway</p>'
        "</div>"
    ).encode("utf-8")
    book.add_item(title_page)

    copyright_page = epub.EpubHtml(title="Copyright", file_name="copyright.xhtml", lang="en")
    cr_text = f"<p>ASIN {cfg['asin']}</p>" if is_kindle else f"<p>ISBN {cfg['isbn']}</p>"
    copyright_page.content = (
        '<div class="copyright-page">'
        '<p class="copyright-line">Copyright \u00a9 2026 Jason Carroll Holloway. All rights reserved.</p>'
        + COPYRIGHT_TAIL
        + cr_text
        + "</div>"
    ).encode("utf-8")
    book.add_item(copyright_page)

    epigraph_page = epub.EpubHtml(title="Epigraph", file_name="epigraph.xhtml", lang="en")
    epigraph_page.content = (
        '<div class="epigraph-page">'
        f'<p class="epigraph-quote">{cfg["epigraph_quote"]}</p>'
        f'<p class="epigraph-attr">{html.escape(cfg["epigraph_attr"])}</p>'
        "</div>"
    ).encode("utf-8")
    book.add_item(epigraph_page)

    epub_chapters: list[epub.EpubHtml] = []
    for idx, ch in enumerate(chapters_data, start=1):
        item = epub.EpubHtml(
            title=ch["nav_title"],
            file_name=f"chapter_{idx:03d}.xhtml",
            lang="en",
        )
        item.content = chapter_body(ch)
        book.add_item(item)
        epub_chapters.append(item)

    back_page = epub.EpubHtml(title="Also By", file_name="back_matter.xhtml", lang="en")
    back_page.content = back_matter_html(cfg["vol"])
    book.add_item(back_page)

    closer_page = epub.EpubHtml(
        title=CLOSER_META[cfg["vol"]][0].title(),
        file_name="end_closer.xhtml",
        lang="en",
    )
    closer_page.content = end_closer_html(cfg["vol"])
    book.add_item(closer_page)

    back_pages = (back_page, closer_page)
    book.toc = (*epub_chapters, *back_pages)
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())
    book.spine = [
        "nav",
        title_page,
        copyright_page,
        epigraph_page,
        *epub_chapters,
        *back_pages,
    ]

    cfg["output"].parent.mkdir(parents=True, exist_ok=True)
    out_path = cfg["output"]
    if is_kindle:
        out_path = out_path.with_name(out_path.name.replace("_v1.epub", "_KINDLE_v1.epub"))
    epub.write_epub(str(out_path), book, {})
    return out_path


def validate_epub(path: Path, cfg: dict, is_kindle: bool = False) -> None:
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        if names[0] != "mimetype":
            raise RuntimeError(f"{path.name}: mimetype not first in archive")
        opf = next(n for n in names if n.endswith(".opf"))
        opf_text = z.read(opf).decode("utf-8")
        if not is_kindle and f"urn:isbn:{cfg['isbn_bare']}" not in opf_text:
            raise RuntimeError(f"{path.name}: identifier missing in OPF")
        if "Seventh City Press" not in opf_text:
            raise RuntimeError(f"{path.name}: publisher missing in OPF")
        cr = z.read("EPUB/copyright.xhtml").decode("utf-8")
        if is_kindle:
            if cfg["asin"] not in cr:
                raise RuntimeError(f"{path.name}: copyright ASIN missing")
        else:
            if cfg["isbn"] not in cr:
                raise RuntimeError(f"{path.name}: copyright ISBN missing")
        body = "".join(z.read(n).decode("utf-8", "replace") for n in names if n.endswith(".xhtml"))
        # if "Blackwood" in body:
        #     raise RuntimeError(f"{path.name}: Blackwood found in content")
        # if cfg["vol"] == 1:
        #     if "grandfather died in 2010" in body:
        #         raise RuntimeError(f"{path.name}: grandfather 2010 found")
        #     if "grandfather died in 2003" not in body:
        #         raise RuntimeError(f"{path.name}: grandfather 2003 missing")
        # if cfg["vol"] == 3 and "sphere was still down there" not in body:
        #     raise RuntimeError(f"{path.name}: sphere paragraph missing")
        # if "never entered a cave" in body:
        #     raise RuntimeError(f"{path.name}: Revision 1 cave contradiction still present")
        # if "skim milk" in body:
        #     raise RuntimeError(f"{path.name}: Revision 2 skim milk still present")
        # if cfg["vol"] == 2 and "never crossed the threshold" not in body:
        #     raise RuntimeError(f"{path.name}: Revision 1 threshold fix missing")
        # if cfg["vol"] == 3:
        #     if "sugar had settled and dried" not in body:
        #         raise RuntimeError(f"{path.name}: Revision 2 coffee fix missing")
        #     if "Miroslav had given her when she defended" not in body:
        #         raise RuntimeError(f"{path.name}: Revision 3 Montblanc fix missing")
        if "\u2726 \u2295 \u2726" in body or "? ? ?" in body:
            raise RuntimeError(f"{path.name}: alternate scene-break symbols found")
        if '<hr class="sb-rule"' in body:
            raise RuntimeError(f"{path.name}: scene break still uses hr.sb-rule")
        if cfg["vol"] == 1:
            ch1_path = next(n for n in names if n.endswith("chapter_001.xhtml"))
            ch1 = z.read(ch1_path).decode("utf-8")
            if "chapter-hz" in ch1 and "PROLOGUE" in ch1:
                raise RuntimeError(f"{path.name}: Prologue Hz marker present (Defect 6)")
        css = z.read("EPUB/style/book.css").decode("utf-8")
        if "p.chapter-subtitle" not in css:
            raise RuntimeError(f"{path.name}: chapter-subtitle CSS missing")
        if not any("back_matter.xhtml" in n for n in names):
            raise RuntimeError(f"{path.name}: back_matter.xhtml missing")
        if not any("end_closer.xhtml" in n for n in names):
            raise RuntimeError(f"{path.name}: end_closer.xhtml missing")
        bm = next(z.read(n).decode("utf-8") for n in names if n.endswith("back_matter.xhtml"))
        if "Also by Jason Carroll Holloway" not in bm or "About the Author" not in bm:
            raise RuntimeError(f"{path.name}: back matter sections missing")
        if "M.A. in English Literature from Mercy University" not in bm:
            raise RuntimeError(f"{path.name}: author bio missing")
        closer = next(z.read(n).decode("utf-8") for n in names if n.endswith("end_closer.xhtml"))
        if CLOSER_META[cfg["vol"]][0] not in closer:
            raise RuntimeError(f"{path.name}: end closer label missing")


def main() -> int:

    if not CSS_PATH.is_file():
        print(f"ERROR: CSS not found: {CSS_PATH}", file=sys.stderr)
        return 1

    for cfg in VOLUMES:
        out = build_epub(cfg, is_kindle=False)
        validate_epub(out, cfg, is_kindle=False)
        ch_count = len([n for n in zipfile.ZipFile(out).namelist() if "/chapter_" in n])
        print(f"Built {out.name} | ISBN {cfg['isbn']} | {ch_count} chapters")
        
        out_k = build_epub(cfg, is_kindle=True)
        validate_epub(out_k, cfg, is_kindle=True)
        print(f"Built {out_k.name} | ASIN {cfg['asin']} | {ch_count} chapters")
    return 0


if __name__ == "__main__":
    sys.exit(main())
