import json
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "content" / "social" / "PREVIEW_MANIFEST.json"
d = json.loads(p.read_text(encoding="utf-8"))
bsky = {
    "1": {"bluesky_author": "MZWMk", "bluesky_imprint": "5cb5j"},
    "2": {"bluesky_author": "n9SnW", "bluesky_imprint": "FEPFo"},
    "3": {"bluesky_author": "ilji7", "bluesky_imprint": "gIig7"},
    "4": {"bluesky_author": "zqOzc", "bluesky_imprint": "OxrOA"},
    "5": {"bluesky_author": "9jk9f", "bluesky_imprint": "ySUye"},
    "6": {"bluesky_author": "X4KX7", "bluesky_imprint": "gIigP"},
    "7": {"bluesky_author": "23s28", "bluesky_imprint": "TpuTD"},
}
xfb = {
    "1": "slot1-frequency-xfb-v2.jpg",
    "2": "slot2-cymatics-xfb-v2.jpg",
    "3": "slot3-kansas-city-xfb-v2.jpg",
    "4": "slot4-grimoire-xfb-v2.jpg",
    "5": "slot5-stone-xfb-v2.jpg",
    "6": "slot6-factions-xfb-v2.jpg",
    "7": "slot7-unreleased-xfb-v2.jpg",
}
for slot, ids in bsky.items():
    d["slots"][slot]["outstand"].update(ids)
    d["slots"][slot]["images"]["bluesky"] = f"public/social/platform-overlaid/{xfb[slot]}"
d["sources"]["bluesky_captions"] = "content/social/BLUESKY_LIVE_CAPTIONS.json"
p.write_text(json.dumps(d, indent=2) + "\n", encoding="utf-8")
print("updated", len(bsky), "slots")
