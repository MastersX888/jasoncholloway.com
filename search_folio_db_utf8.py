import re
import sys

# Force UTF-8 output on Windows terminal
sys.stdout.reconfigure(encoding='utf-8')

html_path = r"E:\Masters-Chamber-v2\analysis-chamber.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract FOLIOS array content
match = re.search(r'const\s+FOLIOS\s*=\s*\[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find FOLIOS array in HTML file.")
    exit(1)

folios_text = match.group(1)
objects = re.findall(r'\{\s*(.*?)\s*\}', folios_text, re.DOTALL)

print(f"Searching {len(objects)} database objects...")
keywords = ["seated", "face", "figure", "concentric", "pool", "tube", "ring"]

for obj in objects:
    cleaned = obj.replace('\n', ' ').strip()
    if any(k in cleaned.lower() for k in keywords):
        # Extract title and description
        f_folio = re.search(r'folio:\s*["\'](.*?)["\']', cleaned)
        f_title = re.search(r'title:\s*["\'](.*?)["\']', cleaned)
        f_desc = re.search(r'description:\s*["\'](.*?)["\']', cleaned)
        f_notes = re.search(r'storyNotes:\s*["\'](.*?)["\']', cleaned)
        
        val_folio = f_folio.group(1) if f_folio else ""
        val_title = f_title.group(1) if f_title else ""
        val_desc = f_desc.group(1) if f_desc else ""
        val_notes = f_notes.group(1) if f_notes else ""
        
        print(f"Folio: {val_folio} | Title: {val_title}")
        print(f"  Desc: {val_desc}")
        print(f"  Notes: {val_notes}")
        print("-" * 50)
