import os

target = "MASTERS_X_JACKET_PDFX1a"
trilogy_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"

matches = []
for root, dirs, files in os.walk(trilogy_dir):
    for filename in files:
        filepath = os.path.join(root, filename)
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if target in content:
                matches.append(os.path.relpath(filepath, trilogy_dir))
        except Exception as e:
            pass

print(f"Found matches for {target}:")
for match in matches:
    print(f"  - {match}")
