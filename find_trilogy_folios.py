import os
from docx import Document
import re

base_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"
docx_files = [
    "MASTERS_X_BOOK1_MANUSCRIPT.docx",
    "MASTERS_X_BOOK2_MANUSCRIPT.docx",
    "MASTERS_X_BOOK3_MANUSCRIPT.docx"
]

print("=== SEARCHING MANUSCRIPTS FOR FOLIOS ===")
for fname in docx_files:
    p = os.path.join(base_dir, fname)
    if not os.path.exists(p):
        print(f"File not found: {p}")
        continue
    
    print(f"\nScanning {fname}...")
    doc = Document(p)
    text_list = [p.text for p in doc.paragraphs]
    
    for idx, text in enumerate(text_list):
        lower_text = text.lower()
        if any(term in lower_text for term in ["voynich", "ars notoria", "notae", "nota", "folio", "f."]):
            # Print matching context (current paragraph)
            match = re.search(r'(?:voynich|ars notoria|notae|nota|folio|f\.\s*\d+)', lower_text)
            if match:
                print(f"Line {idx}: {text.strip()[:180]}...")
