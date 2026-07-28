#!/usr/bin/env python3
"""PORTER: page count + trim + PDF header check for harvested interiors."""
from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except ImportError:
    os.system(f"{sys.executable} -m pip install pypdf -q")
    from pypdf import PdfReader


def inspect(path: str) -> None:
    p = Path(path)
    if not p.is_file():
        print(f"MISSING\t-\t-\t-\t{path}")
        return
    raw = p.read_bytes()[:8]
    magic = raw[:5].decode("latin-1", errors="replace")
    try:
        reader = PdfReader(str(p))
        n = len(reader.pages)
        box = reader.pages[0].mediabox
        w_pt = float(box.width)
        h_pt = float(box.height)
        w_in = round(w_pt / 72, 2)
        h_in = round(h_pt / 72, 2)
        meta = reader.metadata or {}
        title = (meta.get("/Title") or "")[:60]
        print(
            f"{n}\t{w_in}x{h_in}in\t{p.stat().st_size}\t{magic}\t{title}\t{path}"
        )
    except Exception as e:
        print(f"ERR\t-\t{p.stat().st_size}\t{magic}\t{e}\t{path}")


def main() -> None:
    paths = sys.argv[1:]
    if not paths:
        print("usage: porter_verify_pdfs.py <pdf>...")
        sys.exit(2)
    print("pages\ttrim\tsize\tmagic\ttitle\tpath")
    for path in paths:
        inspect(path)


if __name__ == "__main__":
    main()
