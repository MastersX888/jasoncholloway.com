with open(r"E:\Masters-Chamber-v2\analysis-chamber.html", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = re.findall(r'\{[^{}]*(?:seated|face|figure|concentric|pool|tube|ring)[^{}]*\}', text, re.IGNORECASE)

print(f"Found {len(matches)} matching folios:")
for m in matches[:15]:
    print(m.strip())
    print("-" * 20)
