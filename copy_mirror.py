import os
import shutil
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

out_dir = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\out"
dest_dir = r"C:\Users\zh577\.gemini\antigravity\brain\233dc631-015a-49c9-8709-61783ecd9ac0\mirrored_html"

if not os.path.exists(out_dir):
    print(f"Error: Build output directory {out_dir} not found.")
    sys.exit(1)

# Ensure dest_dir exists and is clean
if os.path.exists(dest_dir):
    shutil.rmtree(dest_dir)
os.makedirs(dest_dir)

copied_count = 0
for root, dirs, files in os.walk(out_dir):
    for file in files:
        if file.endswith(".html"):
            src_path = os.path.join(root, file)
            # Determine relative path from out_dir
            rel_path = os.path.relpath(src_path, out_dir)
            dest_path = os.path.join(dest_dir, rel_path)
            
            # Create subdirectories if needed
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            shutil.copy2(src_path, dest_path)
            print(f"Copied: {rel_path}")
            copied_count += 1

print(f"\nSuccessfully mirrored {copied_count} HTML pages to {dest_dir}")

# Restore next.config.ts
config_path = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\next.config.ts"
original_config = """import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local images in /public are served directly — no remote domains needed
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
"""

try:
    with open(config_path, 'w', encoding='utf-8') as f:
        f.write(original_config)
    print("next.config.ts successfully restored to original configuration.")
except Exception as e:
    print(f"Error restoring next.config.ts: {e}")
