"""
Elevated Instagram carousel text overlays for Jason C. Holloway.

Photographic Imagen grounds stay as atmosphere. Typography is the message layer:
soft gradient veil, EB Garamond + Cinzel, editorial slide index, warm cream type.

See content/social/REDESIGN_BRIEF.md
"""

from __future__ import annotations

import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(BASE, "public", "social", "imagen")
DST_DIR = os.path.join(BASE, "public", "social", "imagen-overlaid")
FONT_DIR = os.path.join(BASE, "fonts")

# Warm manuscript palette
CREAM = (243, 237, 226, 255)
CREAM_SOFT = (243, 237, 226, 210)
OCHRE = (196, 168, 120, 220)
VEIL_TOP_ALPHA = 0
VEIL_BOTTOM_ALPHA = 210

# Minimum horizontal inset at 1080px — prevents left-edge glyph clipping in preview/IG
MIN_MARGIN_AT_1080 = 64

# v2 brand layer (see content/social/REDESIGN_BRIEF.md)
SCP_MARK_PATH = os.path.join(
    BASE, "seventhcitypress", "google_business", "assets", "scp-heptagram-mark-1024.png"
)
COVER_VOL1_PATH = os.path.join(BASE, "public", "covers", "book1-hardcover-v3.png")
BRAND_AUTHOR = "JASON C. HOLLOWAY"
BRAND_IMPRINT = "SEVENTH CITY PRESS"
EXIT_LINE = "jasoncholloway.com"

SLOT_LABELS = {
    1: "FIELD NOTE · FREQUENCY",
    2: "FIELD NOTE · CYMATICS",
    3: "FIELD NOTE · KANSAS CITY",
    4: "FIELD NOTE · ARS NOTORIA",
    5: "FIELD NOTE · STONE",
    6: "FIELD NOTE · FACTIONS",
    7: "FIELD NOTE · THE FILE",
}

CAROUSEL_DATA = {
    1: [
        ("f = 111.2 Hz", "110 is measured. The extra decimal is the fiction signing its own work."),
        ("Malta, 3600 BCE.", "Hypogeum, 80 visitors a day, resonance documented near 110 Hz"),
        ("Britain and Ireland.", "Neolithic chambers, peaks in the 95 to 120 Hz band"),
        ("Lascaux.", "Paintings cluster where the resonance is strongest"),
        ("The caveat.", "One small-sample study is not a finding. The literature is real and thin."),
        ("The decimal is the fiction.", "110 is theirs. 111.2 is mine. Full essay in bio."),
    ],
    2: [
        ("1787.", "A plate, a bow, a spoonful of sand"),
        ("Nodal lines.", "The figure is a map of where the plate is still"),
        ("Jenny, 1967.", "Oscillators replace bows; Kymatik published"),
        ("800 to 865 cps.", "The pattern does not adjust. It transforms."),
        ("Turn the tone off.", "The pattern collapses. Order is maintained, not built."),
        ("Where the record ends.", "Sound makes form: measured. Form remakes the observer: invented."),
    ],
    3: [
        ("Why Kansas City?", "Four traditions, one riverbank"),
        ("c. 100 BCE to 700 CE.", "Hopewell mounds with stone-vault chambers inside"),
        ("Wah-kon-tah.", "The Osage name for the connecting mystery"),
        ("August 3, 1831.", "Sixty-three acres dedicated in Independence. Temple never built. Lot still mowed."),
        ("Bethany Falls limestone.", "Quarried out; 55M sq ft of excavated footprint below the city"),
        ("The gap.", "No published acoustics study of the KC underground. Sited, not sourced."),
        ("Full essay in bio.", "The reader's map is in the Field Notes"),
    ],
    4: [
        ("Condemned as cheating.", "Not devil-worship"),
        ("The Ars Notoria.", "13th century, Solomonic tradition, MS Sloane 1712"),
        ("What it promises.", "The seven liberal arts, accelerated"),
        ("The notae.", "Geometric figures meant to be gazed at, not read"),
        ("How a banned book survives.", "It goes expensive: good vellum, careful scribes, centuries"),
        ("What I invented.", "That it works. Full essay in bio."),
    ],
    5: [
        ("2011.", "Westport Presbyterian burns"),
        ("What the fire took.", "Roof, sanctuary, woodwork, 107 years of interior"),
        ("What stood.", "The 1904 limestone walls"),
        ("They rebuilt inside them.", "The contents were erased; the fact was mineral"),
        ("The correction.", "The cathedral I called limestone is red brick. The research pass caught me."),
        ('"The stone remembers."', "Written before the fire was found. Full essay in bio."),
    ],
    6: [
        ("1984.", "A translation, not an assessment"),
        ("The asymmetry.", "One state published. The other classified its reading."),
        ("Suppress.", "Stop the work, discredit the workers"),
        ("Verify.", "Publish the methods, replicate, let it die in daylight"),
        ("Attend.", "Military interest follows any applicable capacity"),
        ("The caveat.", "The three-way sort is my reading of the file, not a heading in it"),
    ],
    7: [
        ("247 pages. Midnight. CC0.", "A conspiracy trilogy that ends with a file format"),
        ("Not a confrontation.", "The work is offered, not weaponized"),
        ("Why leaking fails.", "It preserves scarcity and relocates the power"),
        ("Make the work boring.", "Documented, reproducible, free"),
        ("Public domain is a one-way door.", "The file cannot be un-released"),
        ("Invented, and labeled.", "The file is fiction. CC0 and open science are not."),
    ],
}


def font_path(name: str) -> str:
    return os.path.join(FONT_DIR, name)


def load_font(filename: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    path = font_path(filename)
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        fallbacks = [
            r"C:\Windows\Fonts\georgia.ttf",
            r"C:\Windows\Fonts\constan.ttf",
            r"C:\Windows\Fonts\arial.ttf",
        ]
        for fb in fallbacks:
            if os.path.isfile(fb):
                return ImageFont.truetype(fb, size)
        return ImageFont.load_default()


def horizontal_margin(w: int) -> int:
    """Left/right text margin — scales with canvas, never below MIN_MARGIN_AT_1080 at 1080w."""
    pct = int(w * 0.06)
    floor = int(MIN_MARGIN_AT_1080 * w / 1080)
    return max(pct, floor)


def safe_text_x(draw: ImageDraw.ImageDraw, margin: int, line: str, font) -> int:
    """X anchor so glyph left edge stays at or right of margin (font bearing safe)."""
    bbox = draw.textbbox((0, 0), line, font=font)
    if bbox[0] < 0:
        return margin - bbox[0]
    return margin


def draw_text_line(
    draw: ImageDraw.ImageDraw,
    margin: int,
    y: int,
    line: str,
    font,
    fill,
) -> None:
    x = safe_text_x(draw, margin, line, font)
    draw.text((x, y), line, fill=fill, font=font)


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font, max_width: int) -> list[str]:
    if not text:
        return []
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = f"{current} {word}" if current else word
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] > max_width and current:
            lines.append(current)
            current = word
        else:
            current = test
    if current:
        lines.append(current)
    return lines


def make_gradient_veil(w: int, h: int, bar_top: int) -> Image.Image:
    """Soft bottom veil: transparent at bar_top, deep at bottom (column gradient, fast)."""
    span = max(h - bar_top, 1)
    # Build a 1px-wide alpha column, then resize — O(h) not O(w*h)
    column = Image.new("L", (1, h), 0)
    col_px = column.load()
    for y in range(bar_top, h):
        t = (y - bar_top) / span
        eased = t * t * (3 - 2 * t)
        col_px[0, y] = int(VEIL_TOP_ALPHA + (VEIL_BOTTOM_ALPHA - VEIL_TOP_ALPHA) * eased)
    alpha = column.resize((w, h), Image.Resampling.BILINEAR)
    rgb = Image.new("RGB", (w, h), (12, 10, 8))
    veil = Image.merge("RGBA", (*rgb.split(), alpha))
    return veil

def fit_headline_font(draw, text: str, max_w: int, start: int, minimum: int, bold_file: str):
    for size in range(start, minimum - 1, -2):
        font = load_font(bold_file, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if bbox[2] - bbox[0] <= max_w:
            return font, size
    return load_font(bold_file, minimum), minimum


def draw_imprint_mark(
    draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float, color, lw: int = 2
) -> None:
    """{7/2} heptagram in circle — book-spine imprint geometry."""
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
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=lw)


def apply_product_whisper(
    composed: Image.Image,
    cover_path: str | None = None,
    scale: float = 0.12,
    corner: str = "upper_right",
) -> Image.Image:
    """Quiet Vol I cover presence (~10–15% frame width)."""
    path = cover_path or COVER_VOL1_PATH
    if not os.path.isfile(path):
        return composed

    w, h = composed.size
    margin = int(w * 0.055)
    cover = Image.open(path).convert("RGBA")
    target_w = int(w * scale)
    ratio = target_w / cover.width
    target_h = int(cover.height * ratio)
    cover = cover.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Soft manuscript shadow
    shadow = Image.new("RGBA", (target_w + 8, target_h + 8), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rectangle([4, 4, target_w + 4, target_h + 4], fill=(0, 0, 0, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=3))

    if corner == "upper_right":
        x = w - margin - target_w
        y = margin + int(h * 0.02)
    else:
        x = margin
        y = margin + int(h * 0.02)

    layer = composed.copy()
    layer.alpha_composite(shadow, (x - 2, y + 2))
    # Slight quiet presence — not a promo sticker
    whisper = cover.copy()
    alpha = whisper.getchannel("A")
    alpha = alpha.point(lambda p: int(p * 0.92))
    whisper.putalpha(alpha)
    layer.alpha_composite(whisper, (x, y))
    return layer


def apply_brand_footer(
    composed: Image.Image,
    include_exit: bool = True,
    slide_index: tuple[int, int] | None = None,
) -> Image.Image:
    """Brand lockup + optional exit line; preserves slide index when provided."""
    w, h = composed.size
    margin = horizontal_margin(w)
    layer = composed.copy()
    draw = ImageDraw.Draw(layer)

    brand_font = load_font("Cinzel_0.ttf", max(11, int(w * 0.013)))
    exit_font = load_font("EBGaramond_02.ttf", max(13, int(w * 0.015)))
    index_font = load_font("Cinzel_0.ttf", max(14, int(w * 0.016)))

    mark_r = int(w * 0.014)
    mark_cx = margin + mark_r
    footer_y = h - int(h * 0.048)
    mark_cy = footer_y - int(h * 0.012)
    draw_imprint_mark(draw, mark_cx, mark_cy, mark_r, OCHRE, lw=max(1, w // 700))

    brand_text = f"{BRAND_AUTHOR} · {BRAND_IMPRINT}"
    text_x = margin + mark_r * 2 + int(w * 0.012)
    draw.text((text_x, footer_y - int(h * 0.018)), brand_text, fill=OCHRE, font=brand_font)

    if include_exit:
        draw.text(
            (text_x, footer_y + int(h * 0.008)),
            EXIT_LINE,
            fill=(243, 237, 226, 150),
            font=exit_font,
        )

    if slide_index:
        idx_text = f"{slide_index[0]:02d} / {slide_index[1]:02d}"
        ib = draw.textbbox((0, 0), idx_text, font=index_font)
        iw = ib[2] - ib[0]
        ix = w - margin - iw
        iy = footer_y - int(h * 0.006) - (ib[3] - ib[1])
        draw.text((ix, iy), idx_text, fill=(243, 237, 226, 160), font=index_font)

    return layer


def add_text_overlay(
    image_path: str,
    headline: str,
    body: str,
    output_path: str,
    slide_num: int,
    total_slides: int,
    slot: int,
    role: str,
    v2: bool = False,
    product_whisper: bool = True,
    cover_path: str | None = None,
):
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    margin = horizontal_margin(w)
    max_text_w = w - 2 * margin

    # Hook slides: slightly taller type area; teach/caveat standard
    veil_frac = 0.46 if role == "hook" else 0.40
    if role == "bridge":
        veil_frac = 0.42
    bar_top = int(h * (1 - veil_frac))

    veil = make_gradient_veil(w, h, bar_top)
    # Light edge soften only (full blur was too slow on this machine)
    if w <= 1200:
        veil = veil.filter(ImageFilter.GaussianBlur(radius=1))

    composed = Image.alpha_composite(img, veil)
    draw = ImageDraw.Draw(composed)

    label = SLOT_LABELS.get(slot, "FIELD NOTE")
    label_font = load_font("Cinzel_01.ttf", max(16, int(w * 0.018)))
    index_font = load_font("Cinzel_0.ttf", max(14, int(w * 0.016)))
    body_font = load_font("EBGaramond_02.ttf", max(26, int(w * 0.028)))

    # Micro-label
    y = bar_top + int(h * 0.035)
    draw_text_line(draw, margin, y, label, label_font, OCHRE)
    label_x = safe_text_x(draw, margin, label, label_font)
    label_bbox = draw.textbbox((label_x, y), label, font=label_font)
    y = label_bbox[3] + int(h * 0.012)

    # Hairline
    line_y = y
    draw.line([(margin, line_y), (margin + int(w * 0.14), line_y)], fill=OCHRE, width=max(1, w // 600))
    y = line_y + int(h * 0.022)

    # Headline
    head_start = int(w * (0.072 if role == "hook" else 0.052))
    head_min = int(w * 0.034)
    head_font, _ = fit_headline_font(
        draw, headline, max_text_w, head_start, head_min, "EBGaramond_03.ttf"
    )
    head_lines = wrap_text(draw, headline, head_font, max_text_w)
    head_leading = int(head_font.size * 1.15)
    for line in head_lines:
        draw_text_line(draw, margin, y, line, head_font, CREAM)
        y += head_leading

    # Body
    if body:
        y += int(h * 0.012)
        body_lines = wrap_text(draw, body, body_font, max_text_w)
        body_leading = int(body_font.size * 1.28)
        bottom_limit = h - int(h * (0.12 if v2 else 0.055))
        for line in body_lines:
            if y + body_leading > bottom_limit:
                break
            draw_text_line(draw, margin, y, line, body_font, CREAM_SOFT)
            y += body_leading

    # Editorial index, bottom-right (v1 only — v2 moves index into brand footer band)
    if not v2:
        index_text = f"{slide_num:02d} / {total_slides:02d}"
        ib = draw.textbbox((0, 0), index_text, font=index_font)
        iw = ib[2] - ib[0]
        ix = w - margin - iw
        iy = h - int(h * 0.035) - (ib[3] - ib[1])
        draw.text((ix, iy), index_text, fill=(243, 237, 226, 160), font=index_font)

    if v2:
        if product_whisper:
            composed = apply_product_whisper(composed, cover_path=cover_path)
        composed = apply_brand_footer(
            composed,
            include_exit=True,
            slide_index=(slide_num, total_slides),
        )

    result = composed.convert("RGB")
    # Standardize to 1080 for IG; JPEG keeps C: usable under chronic disk pressure
    if result.size != (1080, 1080):
        result = result.resize((1080, 1080), Image.Resampling.LANCZOS)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    if output_path.lower().endswith((".jpg", ".jpeg")):
        result.save(output_path, "JPEG", quality=90, optimize=True)
    else:
        # Prefer .jpg sibling for disk; still honor .png if caller insists
        jpg_path = os.path.splitext(output_path)[0] + ".jpg"
        result.save(jpg_path, "JPEG", quality=90, optimize=True)
        if jpg_path != output_path and os.path.isfile(output_path):
            try:
                os.remove(output_path)
            except OSError:
                pass


def slide_role(idx: int, total: int) -> str:
    if idx == 1:
        return "hook"
    if idx == total:
        return "bridge"
    if idx == total - 1:
        return "caveat"
    return "teach"


def process_all(slots: list[int] | None = None):
    total_processed = 0
    issues: list[str] = []
    target_slots = slots or sorted(CAROUSEL_DATA.keys())

    for slot in target_slots:
        slides = CAROUSEL_DATA[slot]
        slot_src = os.path.join(SRC_DIR, f"slot{slot}")
        slot_dst = os.path.join(DST_DIR, f"slot{slot}")
        os.makedirs(slot_dst, exist_ok=True)
        total_slides = len(slides)

        for idx, (headline, body) in enumerate(slides, start=1):
            src_file = f"ig-slot{slot}-slide{idx:02d}.png"
            src_path = os.path.join(slot_src, src_file)
            dst_path = os.path.join(slot_dst, f"ig-slot{slot}-slide{idx:02d}.jpg")
            if not os.path.exists(src_path):
                issues.append(f"MISSING: {src_path}")
                continue
            role = slide_role(idx, total_slides)
            try:
                add_text_overlay(
                    src_path, headline, body, dst_path, idx, total_slides, slot, role
                )
                total_processed += 1
                print(f"  [OK] slot{slot}/slide{idx:02d} ({role}): {headline}")
            except Exception as e:
                issues.append(f"ERROR slot{slot}/slide{idx:02d}: {e}")

    print(f"\nTotal slides processed: {total_processed}")
    if issues:
        print("Issues:")
        for iss in issues:
            print(f"  - {iss}")
    else:
        print("No issues.")


if __name__ == "__main__":
    import sys

    slots = None
    if len(sys.argv) > 1:
        slots = [int(a) for a in sys.argv[1:]]
    process_all(slots)
