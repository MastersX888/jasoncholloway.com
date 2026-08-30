#!/usr/bin/env python3
"""
Slot 1 v2 — full carousel + platform heroes (Jason approved 2026-07-29).

Uses chamber-only ground on slide 01 (no mics/laptop). Does not touch Outstand or live posts.
See content/social/SLOT1_V2_MOCK_NOTES.md
"""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from overlay_carousel import (  # noqa: E402
    BASE,
    CAROUSEL_DATA,
    CREAM,
    CREAM_SOFT,
    OCHRE,
    add_text_overlay,
    apply_brand_footer,
    apply_product_whisper,
    fit_headline_font,
    load_font,
    make_gradient_veil,
    slide_role,
    wrap_text,
)
from overlay_platform_heroes import HEROES, resolve_src  # noqa: E402
from PIL import Image, ImageDraw, ImageFilter

SRC = os.path.join(BASE, "public", "social", "imagen", "slot1")
IG_OUT = os.path.join(BASE, "public", "social", "imagen-overlaid", "slot1", "v2")
PLATFORM_OUT = os.path.join(BASE, "public", "social", "platform-overlaid")
COVERS = os.path.join(BASE, "public", "covers")
COVER_VOL1 = os.path.join(COVERS, "book1-hardcover-v3.png")

# Chamber + light only — alternate to ig-slot1-slide01.png (recording gear)
CHAMBER_GROUND = os.path.join(SRC, "slot1-frequency-stamp-x.png")


def overlay_platform_hero_v2(
    src: str,
    out_path: str,
    label: str,
    headline: str,
    body: str,
    cover_path: str | None = None,
    portrait: bool = False,
):
    """Square or portrait hero with v2 brand + cover whisper."""
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

    label_font = load_font("Cinzel_01.ttf", max(15, int(w * 0.022)))
    body_font = load_font("EBGaramond_02.ttf", max(24, int(w * 0.030)))

    y = bar_top + int(h * 0.04)
    draw.text((margin, y), label, fill=OCHRE, font=label_font)
    lb = draw.textbbox((margin, y), label, font=label_font)
    y = lb[3] + int(h * 0.014)
    draw.line([(margin, y), (margin + int(w * 0.16), y)], fill=OCHRE, width=max(1, w // 500))
    y += int(h * 0.024)

    head_font, _ = fit_headline_font(
        draw, headline, max_text_w, int(w * 0.06), int(w * 0.036), "EBGaramond_03.ttf"
    )
    for line in wrap_text(draw, headline, head_font, max_text_w):
        draw.text((margin, y), line, fill=CREAM, font=head_font)
        y += int(head_font.size * 1.15)

    if body:
        y += int(h * 0.014)
        bottom_limit = h - int(h * 0.12)
        for line in wrap_text(draw, body, body_font, max_text_w):
            if y > bottom_limit:
                break
            draw.text((margin, y), line, fill=CREAM_SOFT, font=body_font)
            y += int(body_font.size * 1.28)

    composed = apply_product_whisper(composed, cover_path=cover_path)
    composed = apply_brand_footer(composed, include_exit=True)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    rgb = composed.convert("RGB")
    if out_path.lower().endswith((".jpg", ".jpeg")):
        rgb.save(out_path, "JPEG", quality=90, optimize=True)
    else:
        jpg = os.path.splitext(out_path)[0] + ".jpg"
        rgb.save(jpg, "JPEG", quality=90, optimize=True)


def process_ig_carousel() -> tuple[int, list[str]]:
    slides = CAROUSEL_DATA[1]
    os.makedirs(IG_OUT, exist_ok=True)
    total = len(slides)
    ok = 0
    issues: list[str] = []

    for idx, (headline, body) in enumerate(slides, start=1):
        if idx == 1:
            src_path = CHAMBER_GROUND
        else:
            src_path = os.path.join(SRC, f"ig-slot1-slide{idx:02d}.png")

        dst_path = os.path.join(IG_OUT, f"ig-slot1-slide{idx:02d}-v2.jpg")
        if not os.path.isfile(src_path):
            issues.append(f"MISSING IG ground: {src_path}")
            continue
        role = slide_role(idx, total)
        try:
            add_text_overlay(
                src_path,
                headline,
                body,
                dst_path,
                idx,
                total,
                1,
                role,
                v2=True,
                product_whisper=(idx == 1),
                cover_path=COVER_VOL1,
            )
            ok += 1
            print(f"  [OK] slot1/v2/slide{idx:02d}: {headline}")
        except Exception as e:
            issues.append(f"ERROR slot1/slide{idx:02d}: {e}")

    return ok, issues


def process_platform_heroes() -> tuple[int, list[str]]:
    ok = 0
    issues: list[str] = []
    for item in HEROES:
        if item["slot"] != 1:
            continue
        src = resolve_src(item)
        if not src:
            issues.append(f"MISSING platform ground for {item['out']}")
            continue
        root, ext = os.path.splitext(item["out"])
        out_name = f"{root}-v2.jpg" if not root.endswith("-v2") else item["out"]
        out_path = os.path.join(PLATFORM_OUT, out_name)
        try:
            overlay_platform_hero_v2(
                src,
                out_path,
                item["label"],
                item["headline"],
                item["body"],
                cover_path=COVER_VOL1,
                portrait=bool(item.get("portrait")),
            )
            ok += 1
            print(f"  [OK] platform v2: {out_name}")
        except Exception as e:
            issues.append(f"ERROR platform {item['out']}: {e}")
    return ok, issues


def main():
    if not os.path.isfile(CHAMBER_GROUND):
        print(f"MISSING ground: {CHAMBER_GROUND}")
        sys.exit(1)

    os.makedirs(PLATFORM_OUT, exist_ok=True)
    all_issues: list[str] = []

    print("=== Slot 1 v2 — IG carousel ===")
    ig_ok, ig_issues = process_ig_carousel()
    all_issues.extend(ig_issues)

    print("\n=== Slot 1 v2 — platform heroes ===")
    plat_ok, plat_issues = process_platform_heroes()
    all_issues.extend(plat_issues)

    print(f"\n=== Done: {ig_ok} IG slides, {plat_ok} platform assets ===")
    if all_issues:
        print("Issues:")
        for iss in all_issues:
            print(f"  - {iss}")
        sys.exit(1)


if __name__ == "__main__":
    main()
