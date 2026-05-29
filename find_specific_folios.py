import os
from docx import Document
import re

base_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"
docx_files = [
    "MASTERS_X_BOOK1_MANUSCRIPT.docx",
    "MASTERS_X_BOOK2_MANUSCRIPT.docx",
    "MASTERS_X_BOOK3_MANUSCRIPT.docx"
]

print("=== SEARCHING SPECIFIC FOLIOS AND NOTAE ===")
for fname in docx_files:
    p = os.path.join(base_dir, fname)
    if not os.path.exists(p):
        continue
    
    doc = Document(p)
    text_list = [p.text for p in doc.paragraphs]
    
    for idx, text in enumerate(text_list):
        # Look for folio patterns like f. 57v, f. 68r, folio 82, etc.
        matches_f = re.findall(r'(?:folio|f\.)\s*[a-z0-9v\.\s-]+', text, re.IGNORECASE)
        matches_nota = re.findall(r'(?:nota|notae)\s*[a-z0-9v\.\s-]+', text, re.IGNORECASE)
        matches_voynich = re.findall(r'voynich\s*[a-z0-9v\.\s-]+', text, re.IGNORECASE)
        
        if matches_f or matches_nota or matches_voynich:
            print(f"\n[{fname} L{idx}]")
            print(f"  TEXT: {text.strip()[:200]}...")
            if matches_f: print(f"  FOLIO MATCHES: {matches_f}")
            if matches_nota: print(f"  NOTA MATCHES: {matches_nota}")
            if matches_voynich: print(f"  VOYNICH MATCHES: {matches_voynich}")
