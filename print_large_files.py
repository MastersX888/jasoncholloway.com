import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

filepath = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\large_files.txt"
if os.path.exists(filepath):
    with open(filepath, 'r', encoding='utf-16') as f:
        print(f.read())
else:
    print("File not found.")
