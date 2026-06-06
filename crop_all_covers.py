import os
import shutil
from PIL import Image

covers_dir = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\covers"
backup_dir = os.path.join(covers_dir, "wraps_backup")

if not os.path.exists(backup_dir):
    os.makedirs(backup_dir)

# List of files to crop
files_to_crop = [
    "book1-pb.png",
    "book2-pb.png",
    "book3-pb.png",
    "hawkes-pb.png",
    "hawkes-hc.png",
    "omnibus-pb.png",
    "omnibus-pb-v2.png",
    "omnibus-hc.png",
    "omnibus-hc-v2.png",
]

for filename in files_to_crop:
    src_path = os.path.join(covers_dir, filename)
    if not os.path.exists(src_path):
        print(f"Skipping {filename}: Not found in covers dir")
        continue

    # Backup original wrap
    backup_path = os.path.join(backup_dir, filename)
    if not os.path.exists(backup_path):
        shutil.copy2(src_path, backup_path)
        print(f"Backed up original wrap to {backup_path}")
    else:
        # Load from backup if we rerun, to avoid cropping already cropped files
        src_path = backup_path
        print(f"Loading original wrap from backup: {src_path}")

    # Crop front cover from right edge
    img = Image.open(src_path)
    w, h = img.size
    
    # Calculate a standard 2:3 aspect ratio crop width based on height
    crop_w = int(h * (2.0 / 3.0))
    if crop_w > w:
        crop_w = w
        
    left = w - crop_w
    top = 0
    right = w
    bottom = h

    cropped = img.crop((left, top, right, bottom))
    output_path = os.path.join(covers_dir, filename)
    cropped.save(output_path, format="PNG")
    print(f"Cropped {filename} to {crop_w}x{h} (saved to {output_path})")

print("Cropping process completed!")
