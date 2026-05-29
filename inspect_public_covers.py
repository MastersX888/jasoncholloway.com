import os
from PIL import Image

covers_dir = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\covers"

for f in os.listdir(covers_dir):
    if f.endswith(('.png', '.jpg', '.jpeg')):
        p = os.path.join(covers_dir, f)
        img = Image.open(p)
        print(f"{f}: {img.size[0]}x{img.size[1]} ({img.format})")
