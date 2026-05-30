import fitz
from pathlib import Path

dir_path = Path(r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy\IngramSpark_Upload\Omnibus_BW_Hardcover")

for file_path in dir_path.glob("*.pdf"):
    print(f"\nFile: {file_path.name}")
    try:
        doc = fitz.open(str(file_path))
        print(f"  Pages: {doc.page_count}")
        if doc.page_count > 0:
            page = doc[0]
            print(f"  Dimensions: {page.rect.width / 72:.4f} x {page.rect.height / 72:.4f} in")
            # Extract text
            text = page.get_text()
            print(f"  Text length: {len(text)}")
            if text:
                print("  Text snippets:")
                for line in text.split("\n")[:10]:
                    if line.strip():
                        print(f"    - {line.strip()}")
            else:
                print("  No text (scanned/rasterized)")
    except Exception as e:
        print(f"  Error: {e}")
