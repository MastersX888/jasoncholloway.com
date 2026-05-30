import re
import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

app_dir = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\app"
for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts"):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            if "$" in content or "price" in content.lower():
                print(f"File: {path}")
                # print lines containing $ or price
                lines = content.split('\n')
                for i, l in enumerate(lines):
                    if "$" in l or "price" in l.lower():
                        print(f"  Line {i+1}: {l.strip()}")
                print()
