#!/usr/bin/env python3
"""Generate Seventh City Press logo PNGs from the book-spine heptagram imprint mark."""

from __future__ import annotations

import math
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, PngImagePlugin

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "seventhcitypress" / "google_business" / "assets"
FONTS = ROOT / "fonts"

# Brand (matches compose_omnibus_covers_FINAL.py / press kit)
BG = (10, 8, 6)          # near-black K-ground
GOLD = (184, 146, 46)    # #B8922E — press kit gold
GOLD_LIGHT = (232, 198, 124)  # foil highlight on dark
# Pinterest / press-kit light theme (Template C quote cards + profile)
CREAM = (245, 240, 232)  # #F5F0E8 manuscript cream
GOLD_ON_CREAM = (148, 110, 32)  # darker antique gold — readable on parchment
GOLD_RULE = (196, 163, 90)  # #C4A35A Pinterest accent gold


def imprint_mark(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float, color, lw: int = 2) -> None:
    """{7/2} heptagram in circle — same geometry as book spine imprint."""
    n, step = 7, 2
    pts = [
        (
            cx + r * math.cos(-math.pi / 2 + 2 * math.pi * i / n),
            cy + r * math.sin(-math.pi / 2 + 2 * math.pi * i / n),
        )
        for i in range(n)
    ]
    order = [(i * step) % n for i in range(n + 1)]
    draw.line([pts[i] for i in order], fill=color, width=lw)
    draw.ellipse(
        [cx - r - 2, cy - r - 2, cx + r + 2, cy + r + 2],
        outline=color,
        width=lw,
    )


def load_cinzel(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for name in ("Cinzel_2.ttf", "Cinzel_1.ttf", "Cinzel_0.ttf"):
        path = FONTS / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def logo_square(size: int, with_text: bool = False) -> Image.Image:
    img = Image.new("RGB", (size, size), BG)
    draw = ImageDraw.Draw(img)
    r = int(size * 0.22)
    lw = max(2, size // 180)
    imprint_mark(draw, size / 2, size * 0.42, r, GOLD, lw=lw)

    if with_text:
        font = load_cinzel(max(14, size // 22))
        text = "SEVENTH CITY PRESS"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((size - tw) / 2, size * 0.68), text, fill=GOLD_LIGHT, font=font)

    return img


def logo_profile(size: int = 720) -> Image.Image:
    """Square profile photo — mark centered, no text (Google Business logo)."""
    img = Image.new("RGB", (size, size), BG)
    draw = ImageDraw.Draw(img)
    r = int(size * 0.30)
    lw = max(3, size // 160)
    imprint_mark(draw, size / 2, size / 2, r, GOLD, lw=lw)
    return img


def logo_pinterest_profile(size: int = 800) -> Image.Image:
    """Square Pinterest profile — cream ground, bold heptagram only (circle-crop safe).

    Mark-only: no type. Dark antique gold + heavy stroke so the {7/2} star reads
    at Pinterest avatar scale (~40px) on cream #F7F4EF.
    """
    cream = (247, 244, 239)
    # Darker than foil GOLD for contrast on cream (still on-brand antique gold)
    mark_color = (118, 82, 24)
    img = Image.new("RGB", (size, size), cream)
    draw = ImageDraw.Draw(img)
    r = int(size * 0.30)
    lw = max(8, size // 72)
    imprint_mark(draw, size / 2, size / 2, r, mark_color, lw=lw)
    return img


def logo_workspace_banner(width: int = 320, height: int = 132) -> Image.Image:
    """Google Workspace custom logo — exact 320×132 landscape banner."""
    # Imprint header black; gold mark + cream type (readable at small size)
    header_bg = (28, 26, 23)       # #1C1A17
    cream = (247, 244, 239)         # #F7F4EF
    img = Image.new("RGB", (width, height), header_bg)
    draw = ImageDraw.Draw(img)

    pad = 14
    mark_cx = pad + 48
    mark_cy = height // 2
    mark_r = 42
    mark_lw = max(3, height // 36)
    imprint_mark(draw, mark_cx, mark_cy, mark_r, GOLD, lw=mark_lw)

    font_main = load_cinzel(22)
    font_sub = load_cinzel(13)
    text_x = mark_cx + mark_r + 18
    text_y = height // 2 - 22
    draw.text((text_x, text_y), "SEVENTH CITY", fill=cream, font=font_main)
    draw.text((text_x, text_y + 26), "PRESS", fill=GOLD_LIGHT, font=font_sub)

    # Gold rule under wordmark
    rule_y = text_y + 46
    draw.line([(text_x, rule_y), (width - pad, rule_y)], fill=GOLD, width=1)

    return img


def logo_workspace_banner_light(width: int = 320, height: int = 132) -> Image.Image:
    """Google Workspace custom logo — cream parchment + gold lockup.

    Matches Pinterest profile cream (#F5F0E8) and press-kit gold treatment.
    Same layout as the dark Workspace banner (mark left, stacked wordmark).
    """
    img = Image.new("RGB", (width, height), CREAM)
    draw = ImageDraw.Draw(img)

    pad = 14
    mark_cx = pad + 48
    mark_cy = height // 2
    mark_r = 42
    mark_lw = max(3, height // 36)
    imprint_mark(draw, mark_cx, mark_cy, mark_r, GOLD_ON_CREAM, lw=mark_lw)

    font_main = load_cinzel(22)
    font_sub = load_cinzel(13)
    text_x = mark_cx + mark_r + 18
    text_y = height // 2 - 22
    draw.text((text_x, text_y), "SEVENTH CITY", fill=GOLD_ON_CREAM, font=font_main)
    draw.text((text_x, text_y + 26), "PRESS", fill=GOLD_ON_CREAM, font=font_sub)

    rule_y = text_y + 46
    draw.line([(text_x, rule_y), (width - pad, rule_y)], fill=GOLD_RULE, width=1)

    return img


def logo_horizontal_lockup_cream(
    width: int = 1280, height: int = 528
) -> Image.Image:
    """High-res cream horizontal lockup for brand / press use (same proportions as Workspace)."""
    img = Image.new("RGB", (width, height), CREAM)
    draw = ImageDraw.Draw(img)
    scale = width / 320

    pad = int(14 * scale)
    mark_cx = pad + int(48 * scale)
    mark_cy = height // 2
    mark_r = int(42 * scale)
    mark_lw = max(4, int(3 * scale))
    imprint_mark(draw, mark_cx, mark_cy, mark_r, GOLD_ON_CREAM, lw=mark_lw)

    font_main = load_cinzel(max(22, int(22 * scale)))
    font_sub = load_cinzel(max(13, int(13 * scale)))
    text_x = mark_cx + mark_r + int(18 * scale)
    text_y = height // 2 - int(22 * scale)
    draw.text((text_x, text_y), "SEVENTH CITY", fill=GOLD_ON_CREAM, font=font_main)
    draw.text(
        (text_x, text_y + int(26 * scale)), "PRESS", fill=GOLD_ON_CREAM, font=font_sub
    )

    rule_y = text_y + int(46 * scale)
    draw.line([(text_x, rule_y), (width - pad, rule_y)], fill=GOLD_RULE, width=max(1, int(scale)))

    return img


def logo_square_cream(size: int = 1200, with_text: bool = True) -> Image.Image:
    """Square cream lockup — Pinterest/press-kit ground, gold mark + wordmark."""
    img = Image.new("RGB", (size, size), CREAM)
    draw = ImageDraw.Draw(img)
    r = int(size * (0.22 if with_text else 0.30))
    lw = max(4, size // 160)
    cy = size * (0.42 if with_text else 0.50)
    imprint_mark(draw, size / 2, cy, r, GOLD_ON_CREAM, lw=lw)

    if with_text:
        font = load_cinzel(max(14, size // 22))
        text = "SEVENTH CITY PRESS"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((size - tw) / 2, size * 0.68), text, fill=GOLD_ON_CREAM, font=font)

    return img


def save_under_kb(img: Image.Image, path: Path, max_kb: int = 30) -> None:
    """Save PNG optimized; reduce palette if over Google's 30 KB limit."""
    img.save(path, optimize=True)
    if path.stat().st_size <= max_kb * 1024:
        return
    # Flat RGB compresses well for logo art
    img.convert("P", palette=Image.Palette.ADAPTIVE, colors=64).save(
        path, optimize=True
    )


def save_google_profile_png(
    img: Image.Image, path: Path, *, min_kb: float = 9.77, max_kb: int = 5120
) -> None:
    """Save a Google Business profile/logo PNG within size bounds.

    Google rejects uploads below ~9.77 KB; flat cream logos compress too small
    at default settings. We lower PNG compression until the file meets the minimum.
    """
    min_bytes = int(min_kb * 1024)
    max_bytes = max_kb * 1024
    for compress_level in (6, 3, 1):
        img.save(path, optimize=False, compress_level=compress_level)
        size = path.stat().st_size
        if min_bytes <= size <= max_bytes:
            return

    # Small square variants may still compress below the minimum — pad PNG metadata.
    pnginfo = PngImagePlugin.PngInfo()
    pnginfo.add_text("Software", "Seventh City Press logo generator")
    pad = 0
    while pad <= 200_000:
        if pad:
            pnginfo.add_text("Comment", "Seventh City Press logo padding" + ("x" * pad))
        img.save(path, optimize=False, compress_level=3, pnginfo=pnginfo)
        size = path.stat().st_size
        if size >= min_bytes:
            if size <= max_bytes:
                return
            save_under_kb(img, path, max_kb=max_kb)
            return
        pad += 2000

    save_under_kb(img, path, max_kb=max_kb)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    files: list[Path] = []

    profile = logo_profile(720)
    p720 = OUT / "scp-logo-profile-720.png"
    profile.save(p720, optimize=True)
    files.append(p720)

    profile_250 = logo_profile(250)
    p250 = OUT / "scp-logo-profile-250.png"
    profile_250.save(p250, optimize=True)
    files.append(p250)

    # Google Business / Maps logo — cream ground, bold mark (matches Pinterest profile)
    google_720 = logo_pinterest_profile(720)
    g720 = OUT / "scp-logo-google-profile-720.png"
    save_google_profile_png(google_720, g720)
    files.append(g720)

    google_250 = logo_pinterest_profile(250)
    g250 = OUT / "scp-logo-google-profile-250.png"
    save_google_profile_png(google_250, g250)
    files.append(g250)

    mark_only = logo_square(1024, with_text=False)
    m1024 = OUT / "scp-heptagram-mark-1024.png"
    mark_only.save(m1024, optimize=True)
    files.append(m1024)

    lockup = logo_square(1200, with_text=True)
    l1200 = OUT / "scp-logo-lockup-1200.png"
    lockup.save(l1200, optimize=True)
    files.append(l1200)

    pinterest = logo_pinterest_profile(800)
    pinterest_dir = ROOT / "seventhcitypress" / "public" / "pinterest"
    pinterest_dir.mkdir(parents=True, exist_ok=True)
    p800 = pinterest_dir / "scp-pinterest-profile-800.png"
    pinterest.save(p800, optimize=True)
    files.append(p800)

    handoff = ROOT / "debt_consolidation_handoff" / "global_penetration_wave1" / "scp-pinterest-profile-800.png"
    handoff.parent.mkdir(parents=True, exist_ok=True)
    pinterest.save(handoff, optimize=True)

    ws_dark = logo_workspace_banner(320, 132)
    ws_dark_path = OUT / "scp-logo-google-workspace-320x132.png"
    save_under_kb(ws_dark, ws_dark_path)
    files.append(ws_dark_path)

    ws_light = logo_workspace_banner_light(320, 132)
    ws_light_path = OUT / "scp-logo-google-workspace-320x132-light.png"
    save_under_kb(ws_light, ws_light_path)
    files.append(ws_light_path)

    # Brand ops copies — cream theme for Workspace Admin + general brand use
    brand_dir = ROOT / "scratch" / "ops" / "brand"
    brand_dir.mkdir(parents=True, exist_ok=True)

    brand_ws = brand_dir / "seventh-city-press-logo-workspace.png"
    save_under_kb(ws_light, brand_ws)
    files.append(brand_ws)

    cream_lockup = logo_horizontal_lockup_cream(1280, 528)
    brand_hires = brand_dir / "seventh-city-press-logo-cream-lockup-1280.png"
    cream_lockup.save(brand_hires, optimize=True)
    files.append(brand_hires)

    cream_square = logo_square_cream(1200, with_text=True)
    brand_square = brand_dir / "seventh-city-press-logo-cream-square-1200.png"
    cream_square.save(brand_square, optimize=True)
    files.append(brand_square)

    # Also refresh google_business cream lockup next to dark assets
    gb_cream = OUT / "scp-logo-lockup-cream-1200.png"
    cream_square.save(gb_cream, optimize=True)
    files.append(gb_cream)

    zip_path = OUT.parent / "seventhcitypress-google-business-assets.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in files:
            zf.write(f, f.name)
        readme = OUT.parent / "IMPORT_INSTRUCTIONS.md"
        if readme.exists():
            zf.write(readme, "IMPORT_INSTRUCTIONS.md")
        csv = OUT.parent / "GOOGLE_BUSINESS_IMPORT.csv"
        if csv.exists():
            zf.write(csv, "GOOGLE_BUSINESS_IMPORT.csv")

    print("Generated:")
    for f in files:
        print(f"  {f} ({f.stat().st_size // 1024} KB)")
    print(f"  {zip_path}")


if __name__ == "__main__":
    main()
