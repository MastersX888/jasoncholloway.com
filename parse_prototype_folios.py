import re

html_path = r"E:\Masters-Chamber-v2\analysis-chamber.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the FOLIOS array content
match = re.search(r'const\s+FOLIOS\s*=\s*\[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find FOLIOS array in HTML file.")
    exit(1)

folios_text = match.group(1)

# Extract individual object literals
# Objects are structured as: { id: "...", folio: "...", title: "...", ... }
objects = re.findall(r'\{\s*(.*?)\s*\}', folios_text, re.DOTALL)

print(f"Total folios found in database: {len(objects)}")
print("-" * 50)

for obj in objects:
    # Clean up single-line and extract key fields
    cleaned = obj.replace('\n', ' ').strip()
    
    # Extract fields using regex
    f_id = re.search(r'id:\s*["\'](.*?)["\']', cleaned)
    f_folio = re.search(r'folio:\s*["\'](.*?)["\']', cleaned)
    f_title = re.search(r'title:\s*["\'](.*?)["\']', cleaned)
    f_cat = re.search(r'category:\s*["\'](.*?)["\']', cleaned)
    f_coll = re.search(r'collection:\s*["\'](.*?)["\']', cleaned)
    f_notes = re.search(r'storyNotes:\s*["\'](.*?)["\']', cleaned)
    
    val_id = f_id.group(1) if f_id else ""
    val_folio = f_folio.group(1) if f_folio else ""
    val_title = f_title.group(1) if f_title else ""
    val_cat = f_cat.group(1) if f_cat else ""
    val_coll = f_coll.group(1) if f_coll else ""
    val_notes = f_notes.group(1) if f_notes else ""
    
    # Print the item if it has a non-empty story note or is otherwise interesting
    if val_notes or "rosette" in val_title.lower() or "notae" in val_title.lower():
        print(f"[{val_coll.upper()}] Folio: {val_folio} | ID: {val_id}")
        print(f"  Title: {val_title}")
        print(f"  Category: {val_cat}")
        print(f"  Notes: {val_notes}")
        print("-" * 30)
