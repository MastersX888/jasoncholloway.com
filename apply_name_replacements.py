import re
import os
import shutil

trilogy_dir = r"C:\Users\zh577\.openclaw\workspace\Corpus_Final_Export\The_Masters_Trilogy"

files_to_modify = [
    "compose_dustjackets.py",
    "generate_dustjacket_covers.py",
    "generate_ingram_omnibus_cover.py",
    "fix_omnibus_jacket_v3.py",
    "fix_omnibus_jacket_proper.py",
    "generate_epubs_v1.py",
    "generate_book1_interior.py",
    "generate_book1_interior_paperback.py",
    "generate_book2_interior.py",
    "generate_book2_interior_paperback.py",
    "generate_book3_interior.py",
    "generate_book3_interior_paperback.py",
    "generate_book3_interior_6x9.py",
    "generate_omnibus_interior_v6.py",
    "generate_omnibus_interior_paperback.py"
]

print("Applying name replacements across python files...")

for fname in files_to_modify:
    fpath = os.path.join(trilogy_dir, fname)
    if not os.path.isfile(fpath):
        print(f"File not found, skipping: {fname}")
        continue
    
    # 1. Create backup (if it doesn't already exist from previous run)
    backup_path = fpath + ".bak_name_update"
    if not os.path.exists(backup_path):
        shutil.copy2(fpath, backup_path)
        print(f"Backup created: {fname}.bak_name_update")
    else:
        print(f"Backup already exists for {fname}")
    
    # 2. Read content
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    
    # 3. Apply standard replacements
    content = content.replace("Jason C. Holloway", "Jason Carroll Holloway")
    content = content.replace("JASON C. HOLLOWAY", "JASON CARROLL HOLLOWAY")
    content = content.replace("ALSO BY JASON HOLLOWAY", "ALSO BY JASON CARROLL HOLLOWAY")
    
    # Special spaced author names (in omnibus covers)
    content = content.replace("J A S O N   C .   H O L L O W A Y", "J A S O N   C A R R O L L   H O L L O W A Y")
    content = content.replace("J A S O N   C.   H O L L O W A Y", "J A S O N   C A R R O L L   H O L L O W A Y")
    
    # Check if anything changed
    if content != original_content:
        # Write back
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  [OK] Modified: {fname}")
    else:
        print(f"  No changes needed/made for: {fname}")

print("\nFinished applying replacements.")
