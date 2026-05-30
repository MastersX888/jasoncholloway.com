import os
import re

files_to_find = [
    "DUSTJACKET_BOOK3.pdf",
    "DUSTJACKET_BOOK2.pdf",
    "DUSTJACKET_BOOK1_FLATTENED.pdf",
    "COVER_PREVIEW_BOOK1_PB.png",
    "COVER_MASTERS_X_BOOK2_PB.pdf",
    "COVER_MASTERS_X_BOOK3_PB.pdf",
    "COVER_PREVIEW_OMNIBUS_PB.png",
    "FRONT_PANEL_OMNIBUS.png",
    "MASTERS_X_JACKET_PDFX1a.pdf",
    "EBOOK_COVER_BOOK1.jpg",
    "EBOOK_COVER_BOOK2.jpg",
    "EBOOK_COVER_BOOK3.jpg",
    "INTERIOR_MASTERS_X_BOOK1.pdf",
    "INTERIOR_MASTERS_X_BOOK1_PB.pdf",
    "INTERIOR_MASTERS_X_BOOK2.pdf",
    "INTERIOR_MASTERS_X_BOOK2_PB.pdf",
    "INTERIOR_MASTERS_X_BOOK3_PB.pdf",
    "INTERIOR_MASTERS_X_BOOK3_PB_6x9.pdf",
    "INTERIOR_MASTERS_X_OMNIBUS_v7.pdf",
    "INTERIOR_MASTERS_X_OMNIBUS_v7_updated.pdf",
    "MASTERS_X_BOOK1_EPUB_v1.epub",
    "MASTERS_X_BOOK2_EPUB_v1.epub",
    "MASTERS_X_BOOK3_EPUB_v1.epub",
]

trilogy_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"

matches = {f: [] for f in files_to_find}

for root, dirs, files in os.walk(trilogy_dir):
    for filename in files:
        if filename.endswith('.py'):
            filepath = os.path.join(root, filename)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                for target in files_to_find:
                    # Look for the filename or variants of it (e.g. without extension, or case insensitive)
                    base_target = os.path.splitext(target)[0]
                    if re.search(re.escape(base_target), content, re.IGNORECASE):
                        matches[target].append(os.path.relpath(filepath, trilogy_dir))
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

print("=== File to Generator Mapping ===")
for target, generators in sorted(matches.items()):
    print(f"\n{target}:")
    for gen in sorted(set(generators)):
        print(f"  - {gen}")
