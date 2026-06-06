import os
from PIL import Image

dirs = [
    r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\covers",
    r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\covers\wraps_backup"
]

for d in dirs:
    if not os.path.exists(d):
        continue
    print(f"\nDirectory: {d}")
    for f in os.listdir(d):
        if f.endswith(('.png', '.jpg', '.jpeg')):
            p = os.path.join(d, f)
            img = Image.open(p)
            print(f"  {f}: {img.size[0]}x{img.size[1]} ({img.format})")

