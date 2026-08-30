"""
Message-in-image overlays for X / Facebook / Pinterest hero assets.

Same typographic system as Instagram carousels (EB Garamond + Cinzel, soft veil).
See content/social/REDESIGN_BRIEF.md
"""

from __future__ import annotations

import os
import sys

# Reuse IG overlay primitives
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from overlay_carousel import (  # noqa: E402
    BASE,
    CREAM,
    CREAM_SOFT,
    OCHRE,
    fit_headline_font,
    load_font,
    make_gradient_veil,
    wrap_text,
)
from PIL import Image, ImageDraw, ImageFilter

SRC_DIR = os.path.join(BASE, "public", "social", "imagen")
PIN_DIR = os.path.join(BASE, "public", "social", "pinterest")
DST_DIR = os.path.join(BASE, "public", "social", "platform-overlaid")

# (slot, relative source under imagen or absolute-ish path key, out name, headline, body, label)
HEROES = [
    {
        "slot": 1,
        "src": os.path.join(SRC_DIR, "slot1", "slot1-frequency-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot1", "slot1-frequency-stamp-x.png"),
        "out": "slot1-frequency-xfb.png",
        "label": "FIELD NOTE · FREQUENCY",
        "headline": "f = 111.2 Hz",
        "body": "110 is measured. The extra decimal is the fiction signing its own work.",
    },
    {
        "slot": 1,
        "src": os.path.join(SRC_DIR, "slot1", "pinterest-slot1-frequency.png"),
        "alt_src": os.path.join(PIN_DIR, "pinterest-slot1-frequency.png"),
        "out": "pinterest-slot1-frequency.png",
        "label": "FIELD NOTE · FREQUENCY",
        "headline": "f = 111.2 Hz",
        "body": "The stones were measured near 110. The novels use 111.2.",
        "portrait": True,
    },
    {
        "slot": 2,
        "src": os.path.join(SRC_DIR, "slot2", "slot2-cymatics-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot2", "slot2-cymatics-x.png"),
        "out": "slot2-cymatics-xfb.png",
        "label": "FIELD NOTE · CYMATICS",
        "headline": "Sound has shapes.",
        "body": "That part is 1787. That the geometry remakes the observer is invention.",
    },
    {
        "slot": 2,
        "src": os.path.join(SRC_DIR, "slot2", "pinterest-slot2-cymatics.png"),
        "alt_src": os.path.join(PIN_DIR, "pinterest-slot2-cymatics.png"),
        "out": "pinterest-slot2-cymatics.png",
        "label": "FIELD NOTE · CYMATICS",
        "headline": "1787.",
        "body": "A plate, a bow, a spoonful of sand.",
        "portrait": True,
    },
    {
        "slot": 3,
        "src": os.path.join(SRC_DIR, "slot3", "slot3-kansas-city-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot3", "slot3-kc-x.png"),
        "out": "slot3-kansas-city-xfb.png",
        "label": "FIELD NOTE · KANSAS CITY",
        "headline": "Why Kansas City?",
        "body": "Four traditions looked at the same riverbank and decided this ground matters.",
    },
    {
        "slot": 3,
        "src": os.path.join(SRC_DIR, "slot3", "pinterest-slot3-kansas-city.png"),
        "alt_src": os.path.join(PIN_DIR, "pinterest-slot3-kansas-city.png"),
        "out": "pinterest-slot3-kansas-city.png",
        "label": "FIELD NOTE · KANSAS CITY",
        "headline": "Why Kansas City?",
        "body": "Sited here. Not sourced here. The gap is named.",
        "portrait": True,
    },
    {
        "slot": 4,
        "src": os.path.join(SRC_DIR, "slot4", "slot4-grimoire-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot4", "slot4-grimoire-x.png"),
        "out": "slot4-grimoire-xfb.png",
        "label": "FIELD NOTE · ARS NOTORIA",
        "headline": "Condemned as cheating.",
        "body": "Not devil-worship. What I invented is narrower: that it works.",
    },
    {
        "slot": 4,
        "src": os.path.join(SRC_DIR, "slot4", "pinterest-slot4-ars-notoria.png"),
        "alt_src": os.path.join(PIN_DIR, "pinterest-slot4-ars-notoria.png"),
        "out": "pinterest-slot4-ars-notoria.png",
        "label": "FIELD NOTE · ARS NOTORIA",
        "headline": "The Ars Notoria.",
        "body": "Real manuscript. Invented: that it works.",
        "portrait": True,
    },
    {
        "slot": 5,
        "src": os.path.join(SRC_DIR, "slot5", "slot5-stone-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot5", "slot5-stone-x.png"),
        "out": "slot5-stone-xfb.png",
        "label": "FIELD NOTE · STONE",
        "headline": "The stone remembers.",
        "body": "Written before the fire was found. The research pass kept the line honest.",
    },
    {
        "slot": 5,
        "src": os.path.join(SRC_DIR, "slot5", "pinterest-slot5-stone-remembers.png"),
        "alt_src": None,
        "out": "pinterest-slot5-stone-remembers.png",
        "label": "FIELD NOTE · STONE",
        "headline": "What stood.",
        "body": "The 1904 limestone walls. Contents erased; the fact was mineral.",
        "portrait": True,
    },
    {
        "slot": 6,
        "src": os.path.join(SRC_DIR, "slot6", "slot6-three-factions-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot6", "slot6-factions-x.png"),
        "out": "slot6-factions-xfb.png",
        "label": "FIELD NOTE · FACTIONS",
        "headline": "Suppress. Verify. Attend.",
        "body": "A reading of a declassified file, labeled as a reading.",
    },
    {
        "slot": 6,
        "src": os.path.join(SRC_DIR, "slot6", "pinterest-slot6-three-factions.png"),
        "alt_src": None,
        "out": "pinterest-slot6-three-factions.png",
        "label": "FIELD NOTE · FACTIONS",
        "headline": "1984.",
        "body": "A translation, not an assessment.",
        "portrait": True,
    },
    {
        "slot": 7,
        "src": os.path.join(SRC_DIR, "slot7", "slot7-unreleased-hero.png"),
        "alt_src": os.path.join(SRC_DIR, "slot7", "slot7-unreleased-x.png"),
        "out": "slot7-unreleased-xfb.png",
        "label": "FIELD NOTE · THE FILE",
        "headline": "247 pages. Midnight. CC0.",
        "body": "The file is fiction. Public domain is not.",
    },
    {
        "slot": 7,
        "src": os.path.join(SRC_DIR, "slot7", "pinterest-slot7-unreleased.png"),
        "alt_src": None,
        "out": "pinterest-slot7-unreleased.png",
        "label": "FIELD NOTE · THE FILE",
        "headline": "Cannot be un-released.",
        "body": "Invented, and labeled.",
        "portrait": True,
    },
]


def resolve_src(item: dict) -> str | None:
    if os.path.isfile(item["src"]):
        return item["src"]
    alt = item.get("alt_src")
    if alt and os.path.isfile(alt):
        return alt
    return None


def overlay_hero(src: str, out_path: str, label: str, headline: str, body: str, portrait: bool = False):
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    margin = int(w * 0.06)
    max_text_w = w - 2 * margin
    veil_frac = 0.42 if portrait else 0.40
    bar_top = int(h * (1 - veil_frac))

    veil = make_gradient_veil(w, h, bar_top)
    if w <= 1400:
        veil = veil.filter(ImageFilter.GaussianBlur(radius=1))
    composed = Image.alpha_composite(img, veil)
    draw = ImageDraw.Draw(composed)

    label_font = load_font("Cinzel_01.ttf", max(15, int(w * 0.028 if portrait else 0.022)))
    body_font = load_font("EBGaramond_02.ttf", max(24, int(w * 0.032 if portrait else 0.030)))

    y = bar_top + int(h * 0.04)
    draw.text((margin, y), label, fill=OCHRE, font=label_font)
    lb = draw.textbbox((margin, y), label, font=label_font)
    y = lb[3] + int(h * 0.014)
    draw.line([(margin, y), (margin + int(w * 0.16), y)], fill=OCHRE, width=max(1, w // 500))
    y += int(h * 0.024)

    head_start = int(w * (0.08 if portrait else 0.06))
    head_font, _ = fit_headline_font(
        draw, headline, max_text_w, head_start, int(w * 0.036), "EBGaramond_03.ttf"
    )
    for line in wrap_text(draw, headline, head_font, max_text_w):
        draw.text((margin, y), line, fill=CREAM, font=head_font)
        y += int(head_font.size * 1.15)

    if body:
        y += int(h * 0.014)
        for line in wrap_text(draw, body, body_font, max_text_w):
            if y > h - int(h * 0.05):
                break
            draw.text((margin, y), line, fill=CREAM_SOFT, font=body_font)
            y += int(body_font.size * 1.28)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb = composed.convert("RGB")
    if out_path.lower().endswith((".jpg", ".jpeg")):
        rgb.save(out_path, "JPEG", quality=90, optimize=True)
    else:
        jpg = os.path.splitext(out_path)[0] + ".jpg"
        rgb.save(jpg, "JPEG", quality=90, optimize=True)


def main():
    os.makedirs(DST_DIR, exist_ok=True)
    ok = 0
    missing = []
    for item in HEROES:
        src = resolve_src(item)
        if not src:
            missing.append(item["out"])
            continue
        out_path = os.path.join(DST_DIR, item["out"])
        overlay_hero(
            src,
            out_path,
            item["label"],
            item["headline"],
            item["body"],
            portrait=bool(item.get("portrait")),
        )
        ok += 1
        print(f"  [OK] {item['out']}")
    print(f"\nPlatform overlays: {ok}")
    if missing:
        print("Missing sources:")
        for m in missing:
            print(f"  - {m}")


if __name__ == "__main__":
    main()
