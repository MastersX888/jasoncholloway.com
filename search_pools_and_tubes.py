import os
from docx import Document
import re

base_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"
docx_files = [
    "MASTERS_X_BOOK1_MANUSCRIPT.docx",
    "MASTERS_X_BOOK2_MANUSCRIPT.docx",
    "MASTERS_X_BOOK3_MANUSCRIPT.docx"
]

print("=== SEARCHING MANUSCRIPTS FOR POOLS, TUBES & GEOMETRY ===")
for fname in docx_files:
    p = os.path.join(base_dir, fname)
    if not os.path.exists(p):
        continue
    
    doc = Document(p)
    for idx, paragraph in enumerate(doc.paragraphs):
        text = paragraph.text
        lower_text = text.lower()
        if any(term in lower_text for term in ["pool", "tube", "rosette", "biological section", "geometric", "overlay", "tesselat", "tesselate"]):
            print(f"\n[{fname} L{idx}]")
            print(text.strip())
            print("-" * 35)
