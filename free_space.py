import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

files_to_delete = [
    r"C:\Users\zh577\IndiePress\INDIEPRESS_VIRTUAL_CATALOG_SINGLEFILE.html",
    r"C:\Users\zh577\IndiePress\mythology-compendium-vol2\compendium_vol2_paperback_interior.pre_stockfix_backup.docx",
    r"C:\Users\zh577\IndiePress\mythology-compendium-vol2\compendium_vol2_paperback_interior.pre_kdpfix_backup.docx",
    r"C:\Users\zh577\IndiePress\mythology-compendium-vol2\compendium_vol2_paperback_interior_signature_clean_v2.docx"
]

freed_space = 0
for f in files_to_delete:
    if os.path.exists(f):
        try:
            size = os.path.getsize(f)
            os.remove(f)
            print(f"Deleted: {f} ({size / 1024 / 1024:.2f} MB)")
            freed_space += size
        except Exception as e:
            print(f"Error deleting {f}: {e}")
    else:
        print(f"File not found: {f}")

print(f"\nTotal freed space: {freed_space / 1024 / 1024:.2f} MB")
