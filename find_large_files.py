import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

dirs_to_check = [
    r"C:\Users\zh577\.gemini\antigravity\scratch",
    r"C:\Users\zh577\IndiePress"
]

all_files = []
for d in dirs_to_check:
    if os.path.exists(d):
        for root, dirs, files in os.walk(d):
            # Ignore node_modules, .next, and .git to speed up search
            if 'node_modules' in root or '.next' in root or '.git' in root:
                continue
            for file in files:
                path = os.path.join(root, file)
                try:
                    size = os.path.getsize(path)
                    all_files.append((size, path))
                except:
                    pass

all_files.sort(reverse=True)
print("=== Top 30 Largest Files ===")
for size, path in all_files[:30]:
    print(f"  {size / 1024 / 1024:.2f} MB - {path}")
