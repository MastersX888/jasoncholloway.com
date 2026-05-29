import os
from docx import Document
import re

base_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"
docx_files = [
    "MASTERS_X_BOOK1_MANUSCRIPT.docx",
    "MASTERS_X_BOOK2_MANUSCRIPT.docx",
    "MASTERS_X_BOOK3_MANUSCRIPT.docx"
]

print("=== SEARCHING FOR SPECIFIC FOLIO PATTERNS ===")
# Regex to match f.75v, f. 75v, f. 85v-86r, folio 68, etc.
pattern = re.compile(r'\b(?:folio|f\.)\s*\d+[a-z]?(?:-[a-z0-9]+)?\b', re.IGNORECASE)

for fname in docx_files:
    p = os.path.join(base_dir, fname)
    if not os.path.exists(p):
        continue
    
    print(f"\nScanning {fname}...")
    doc = Document(p)
    for idx, paragraph in enumerate(doc.paragraphs):
        text = paragraph.text
        matches = pattern.findall(text)
        if matches:
            # Skip common false positives like "f. He" or "f. The" if any
            clean_matches = [m for m in matches if not re.match(r'f\.\s*[A-Z]', m)]
            if clean_matches:
                print(f"Line {idx} (Matches {clean_matches}):")
                print(f"  {text.strip()}")
