import os

brain_dir = r"C:\Users\zh577\.gemini\antigravity\brain\0d9904c0-5c94-4fe3-aa8a-e801fe9a28dc\scratch"
files = ["chamber_research.txt", "andrew_tech.txt"]

print("=== SEARCHING BRAIN RESEARCH FILES ===")
for fn in files:
    path = os.path.join(brain_dir, fn)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    
    print(f"\nSearching in {fn}...")
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if "voynich" in line.lower():
            # Print current line and surrounding 2 lines
            start = max(0, i-2)
            end = min(len(lines), i+3)
            ctx = "".join(lines[start:end])
            print(f"--- Line {i} ---")
            print(ctx)
            print("-" * 30)
