import os
import re

name_patterns = [
    re.compile(r"Jason\s+C\.\s+Holloway", re.IGNORECASE),
    re.compile(r"Jason\s+Carroll\s+Holloway", re.IGNORECASE),
    re.compile(r"Jason\s+Holloway", re.IGNORECASE),
    re.compile(r"J\s*A\s*S\s*O\s*N\s+C\s*\.\s+H\s*O\s*L\s*L\s*O\s*W\s*A\s*Y", re.IGNORECASE),
]

trilogy_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"

occurrences = []

for root, dirs, files in os.walk(trilogy_dir):
    # Skip temporary files or output pdf/epub folders if we only want code/text files
    if "_COVERS_REDESIGN" in root or "IngramSpark_Upload" in root or ".git" in root or "__pycache__" in root:
        continue
    for filename in files:
        if filename.endswith(('.py', '.txt', '.md', '.html', '.css')):
            filepath = os.path.join(root, filename)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                for line_idx, line in enumerate(lines, 1):
                    matched = False
                    for pat in name_patterns:
                        if pat.search(line):
                            matched = True
                    # Let's also check for general "Holloway" to make sure we don't miss running headers
                    if "Holloway" in line or "HOLLOWAY" in line:
                        matched = True
                    if matched:
                        occurrences.append({
                            "file": os.path.relpath(filepath, trilogy_dir),
                            "line": line_idx,
                            "content": line.strip()
                        })
            except Exception as e:
                pass

print(f"Total occurrences found: {len(occurrences)}")
current_file = ""
for occ in occurrences:
    if occ["file"] != current_file:
        print(f"\n[{occ['file']}]")
        current_file = occ["file"]
    print(f"  Line {occ['line']}: {occ['content']}")
