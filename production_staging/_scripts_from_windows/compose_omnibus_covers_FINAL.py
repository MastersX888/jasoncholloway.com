#!/usr/bin/env python3
"""
compose_omnibus_covers.py
Masters X · Omnibus Cover Compositor v3
Seventh City Press LLC — Jason Carroll Holloway

IMPORTANT: --hero must be the RAW DOME PHOTOGRAPH — no text on it.

Usage:
    python3 compose_omnibus_covers.py --hero /path/to/raw_dome.png [--output ./output]

Dependencies:
    pip install Pillow reportlab
"""

import argparse
import math
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.units import inch


# ─────────────────────────────────────────────────────────────────────────────
# FONT PATHS — Cinzel + EB Garamond on Jason's machine
# ─────────────────────────────────────────────────────────────────────────────
FONTS_DIR = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\fonts"

FONT_CINZEL_REG    = os.path.join(FONTS_DIR, "Cinzel_0.ttf")   # Regular 400
FONT_CINZEL_BOLD   = os.path.join(FONTS_DIR, "Cinzel_2.ttf")   # Bold 700+
FONT_GARAMOND_REG  = os.path.join(FONTS_DIR, "EBGaramond_00.ttf")
FONT_GARAMOND_ITAL = os.path.join(FONTS_DIR, "EBGaramond_01.ttf")
FONT_GARAMOND_BOLD = os.path.join(FONTS_DIR, "EBGaramond_02.ttf")

# ── Fallback verification ────────────────────────────────────────────────────
# If Cinzel_2 doesn't exist, fall back to Cinzel_1, then Cinzel_0
def _resolve_font(primary, *fallbacks):
    for path in (primary, *fallbacks):
        if os.path.exists(path):
            return path
    raise FileNotFoundError(f"No font found. Tried: {primary}, {fallbacks}")

FONT_CINZEL_BOLD = _resolve_font(
    os.path.join(FONTS_DIR, "Cinzel_2.ttf"),
    os.path.join(FONTS_DIR, "Cinzel_02.ttf"),
    os.path.join(FONTS_DIR, "Cinzel_1.ttf"),
    os.path.join(FONTS_DIR, "Cinzel_01.ttf"),
    os.path.join(FONTS_DIR, "Cinzel_0.ttf"),
)
FONT_CINZEL_REG = _resolve_font(
    os.path.join(FONTS_DIR, "Cinzel_0.ttf"),
    os.path.join(FONTS_DIR, "Cinzel_00.ttf"),
    FONT_CINZEL_BOLD,
)
FONT_GARAMOND_REG = _resolve_font(
    os.path.join(FONTS_DIR, "EBGaramond_00.ttf"),
    os.path.join(FONTS_DIR, "EBGaramond_0.ttf"),
)
FONT_GARAMOND_ITAL = _resolve_font(
    os.path.join(FONTS_DIR, "EBGaramond_01.ttf"),
    os.path.join(FONTS_DIR, "EBGaramond_1.ttf"),
    FONT_GARAMOND_REG,
)
FONT_GARAMOND_BOLD = _resolve_font(
    os.path.join(FONTS_DIR, "EBGaramond_02.ttf"),
    os.path.join(FONTS_DIR, "EBGaramond_2.ttf"),
    FONT_GARAMOND_REG,
)

# Optional author photo — placed small on the HC back flap below the bio.
# Set to a file path to enable; leave as None to omit.
AUTHOR_PHOTO = os.path.join(FONTS_DIR, "JasonCHolloway.png")
if not os.path.exists(AUTHOR_PHOTO):
    AUTHOR_PHOTO = None



# ─────────────────────────────────────────────────────────────────────────────
# CMYK CONVERSION — IngramSpark requires CMYK, max 240% ink, controlled rich black
# ─────────────────────────────────────────────────────────────────────────────
import numpy as np

RICH_BLACK = (60, 40, 40, 100)   # IngramSpark recommended rich black (sums to 240%)
MAX_INK    = 240                 # max total ink coverage %

def _cmyk_tile(arr, max_ink, rich_black):
    """Process one RGB tile (float 0-1) to CMYK uint8. Memory-bounded."""
    R, G, B = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    K = 1.0 - np.maximum.reduce([R, G, B])
    denom = np.where(K < 1.0, 1.0 - K, 1.0)
    C = np.clip((1.0 - R - K) / denom, 0, 1)
    M = np.clip((1.0 - G - K) / denom, 0, 1)
    Y = np.clip((1.0 - B - K) / denom, 0, 1)
    Cp, Mp, Yp, Kp = C*100, M*100, Y*100, K*100
    rb_C, rb_M, rb_Y, rb_K = rich_black
    dark = Kp > 80
    Cp = np.where(dark, rb_C, Cp); Mp = np.where(dark, rb_M, Mp)
    Yp = np.where(dark, rb_Y, Yp); Kp = np.where(dark, rb_K, Kp)
    total = Cp + Mp + Yp + Kp
    over = total > max_ink
    excess = np.where(over, total - max_ink, 0)
    cmy_sum = Cp + Mp + Yp
    cmy_safe = np.where(cmy_sum > 0, cmy_sum, 1)
    scale = np.where(over & (cmy_sum > 0), np.clip(1 - excess/cmy_safe, 0, 1), 1)
    Cp *= scale; Mp *= scale; Yp *= scale
    out = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
    out[:,:,0] = (Cp/100*255).astype(np.uint8)
    out[:,:,1] = (Mp/100*255).astype(np.uint8)
    out[:,:,2] = (Yp/100*255).astype(np.uint8)
    out[:,:,3] = (Kp/100*255).astype(np.uint8)
    return out

def rgb_to_cmyk_controlled(img_rgb, max_ink=MAX_INK, rich_black=RICH_BLACK, tile_rows=512):
    """Convert RGB to DeviceCMYK with controlled ink + rich black, tiled for memory.
    Returns a CMYK PIL image (no embedded profile, suitable for PDF/X-1a)."""
    img_rgb = img_rgb.convert('RGB')
    w, h = img_rgb.size
    full = np.asarray(img_rgb)  # uint8, HxWx3
    out = np.zeros((h, w, 4), dtype=np.uint8)
    for y0 in range(0, h, tile_rows):
        y1 = min(h, y0 + tile_rows)
        tile = full[y0:y1].astype(np.float64) / 255.0
        out[y0:y1] = _cmyk_tile(tile, max_ink, rich_black)
        del tile
    return Image.fromarray(out, mode='CMYK')

# ─────────────────────────────────────────────────────────────────────────────
# PALETTE
# ─────────────────────────────────────────────────────────────────────────────
BG_COLOR     = (10, 8, 6)        # #0A0806
GOLD_PRIMARY = (232, 198, 124)   # #E8C67C
CREAM        = (232, 220, 196)   # #E8DCC4


# ─────────────────────────────────────────────────────────────────────────────
# COPY — locked, do not edit
# ─────────────────────────────────────────────────────────────────────────────
COLLECTOR_LINE = "THE COMPLETE TRILOGY IN A SINGLE VOLUME"
SERIES_MARK    = "MASTERS X"
TITLE          = "THE COMPLETE TRILOGY"
VOLUME_LISTING = "The Inheritance of Frequency  \u00b7  The Grimoire  \u00b7  The Kingdom"
LATIN_DATE     = "MCCLXVII"
LATIN_EPIGRAPH = "Verbum erat in principio. Verbum erat ad Deum. Verbum erat Deus."
AUTHOR         = "JASON CARROLL HOLLOWAY"
SPINE_TEXT     = "MASTERS X  \u00b7  THE COMPLETE TRILOGY  \u00b7  JASON CARROLL HOLLOWAY"

BACK_COPY = (
    "In 1267, a Premonstratensian monk is given a manuscript his order has guarded for "
    "a generation. He has been told it was not made by human hands, and that it must "
    "never be destroyed. So he copies it seven times, burns the original, and scatters "
    "the seven copies across seven cities \u2014 far enough apart that no single act of "
    "suppression can ever find them all. Then he waits for the century that will be "
    "ready to read it.\n\n"
    "Seven hundred years later, Blake Masters is fired from a job guarding an underground "
    "vault in Kansas City for photographing carvings that appear on no map \u2014 carvings "
    "cut into bedrock older than the stone around it. Days later, he inherits a "
    "safe-deposit box his grandfather paid to keep sealed for fifty-seven years, opened "
    "to the exact week Blake would be ready for it. Inside are seven notebooks, and the "
    "record of a gift that has run in his blood for three generations: the ability to "
    "see the pattern beneath everything \u2014 in cathedrals, in cave walls, in the "
    "resonance of a human voice.\n\n"
    "It is the most beautiful thing he will ever perceive. It is also the thing that "
    "killed his father, unmade his grandfather, and the same gift that lets "
    "Blake perceive the woman he loves more completely than anyone ever has is the "
    "gift that is carrying him beyond her reach.\n\n"
    "Spanning Bohemia in 1267, the edge of the atmosphere in 1961, and a Kansas City "
    "winter in the present day, The Masters X Trilogy is a thriller built on a question "
    "that has no safe answer: what does it cost a person to see what no one else can \u2014 "
    "and to love someone they can never quite reach?"
)

CLOSING_QUOTE = "\u201cOnly love lets you survive it.\u201d"
BACK_EPI_L1   = "In the beginning was the Word."
BACK_EPI_L2   = "But before the Word, there was the listening."
IMPRINT_NAME  = "SEVENTH CITY PRESS"
WEBSITE       = "www.jasoncholloway.com"

FLAP_FRONT = (
    "His grandfather paid to keep a safe-deposit box sealed for fifty-seven years \u2014 "
    "timed to open the year his grandson would finally be ready for what was inside. "
    "The man who sealed it never met the boy who would inherit it.\n\n"
    "Blake Masters is twenty-seven, and he has just lost everything ordinary: his "
    "security clearance, his job beneath the limestone of Kansas City, and the last "
    "person who tried to love him. He lost it all for the same reason every Masters "
    "man before him lost something \u2014 because he cannot stop seeing the pattern "
    "underneath the world. In cave carvings older than history. In the proportions of "
    "cathedrals. In a frequency his grandfather chased from the cockpit of a spy plane "
    "at seventy thousand feet, and went to his grave unable to explain.\n\n"
    "Then a woman appears at his door. She has been waiting eight years for this knock. "
    "She knows what is in the notebooks. She knows what his gift will do to him. And "
    "she knows he is going to open the box anyway."
)

FLAP_BACK = (
    "The Masters X Trilogy \u2014 three novels spanning seven hundred and fifty-four years "
    "and four continents \u2014 is a meditation, in the form of a thriller, on the price of "
    "perception: what it costs to see what others cannot, and what it costs to love "
    "someone whose mind you can never fully enter.\n\n"
    "It is a book about a manuscript that should not exist. About cathedrals built as "
    "instruments. About a frequency that has been waiting in stone since before the "
    "cities above it were built. About three generations of one family, each given the "
    "same impossible gift, each paying the same impossible price.\n\n"
    "It is, finally, a book about the listening that comes before the Word."
)

AUTHOR_BIO = (
    "Jason Carroll Holloway writes at the intersection of acoustic science, medieval "
    "scholarship, and the question of what human perception is actually for. The Masters X "
    "Trilogy is his first work of fiction \u2014 a project that began with a fascination "
    "for the geometry hidden in cathedrals, cave walls, and the resonance of a single "
    "human voice. He lives in Kansas City, above the same limestone his characters "
    "descend into."
)


# ─────────────────────────────────────────────────────────────────────────────
# INGRAMPSARK DIMENSIONS
# ─────────────────────────────────────────────────────────────────────────────
DPI    = 300
BLEED  = 0.125   # inches

PB_DOC_W  = 15.0;  PB_DOC_H  = 12.0
PB_SPINE  = 1.395; PB_TRIM_W = 5.5;  PB_TRIM_H = 8.5
PB_ISBN   = "ISBN 979-8-256-07270-4"

HC_DOC_W  = 24.0;  HC_DOC_H  = 12.5
HC_SPINE  = 1.313; HC_TRIM_W = 6.14; HC_TRIM_H = 9.21
HC_FLAP   = 3.25;  HC_WRAP   = 0.25
HC_ISBN   = "ISBN 979-8-295-88441-2"

SAFE = 0.375   # safe zone margin (inches)


# ─────────────────────────────────────────────────────────────────────────────
# LAYOUT — proportions of trim height (0 = top, 1 = bottom)
# ─────────────────────────────────────────────────────────────────────────────
# CINZEL reads optically larger than Lora at the same point size due to its
# open letterforms and high x-height. All sizes reduced ~22% from the Lora build.
L = {
    "collector_top": 0.052,
    "series_top":    0.086,
    "title_top":     0.120,   # title anchored — stays in darkened upper zone
    "epigraph_top":  0.760,   # dark rotunda wall zone, barely visible
    "author_bottom": 0.945,   # author name baseline from top (pulled up to clear arch)
    "rule_gap":      0.008,
}

# Type size fractions of trim height
# Cinzel at 0.052 produces same visual weight as Lora at 0.068
S = {
    "collector": 0.012,
    "series":    0.020,
    "title":     0.044,   # Cinzel Bold — primary display, NOT dominant
    "volume":    0.018,   # EB Garamond Italic
    "date":      0.014,
    "epigraph":  0.008,
    "author":    0.024,   # Cinzel Regular
    "imprint":   0.014,
    "back_quote":0.020,
    "back_epi":  0.017,
}

# Body copy — absolute pt size, not proportional (trade standard: 9pt)
BODY_PT = 9.0
BODY_PX = int(BODY_PT * DPI / 72)   # 37px at 300dpi

# Gradient parameters
UP_GRAD_H  = 0.30   # darkened zone covers top 28% of image
UP_GRAD_OP = 205    # peak opacity (0-255)
LO_GRAD_H  = 0.24
LO_GRAD_OP = 225


# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def px(inches):
    return int(round(inches * DPI))

def fnt(path, size):
    try:
        return ImageFont.truetype(path, max(8, int(size)))
    except Exception as e:
        print(f"  WARNING: font load failed ({path}): {e}")
        return ImageFont.load_default()

def tw(draw, text, font):
    b = draw.textbbox((0, 0), text, font=font)
    return b[2] - b[0]

def draw_cx(draw, text, cx, y, font, color, tracking=0.0):
    if tracking == 0.0:
        w = tw(draw, text, font)
        draw.text((cx - w // 2, y), text, font=font, fill=color)
    else:
        chars = list(text)
        widths = [tw(draw, c, font) for c in chars]
        space = int(sum(widths) * tracking / max(len(chars) - 1, 1))
        total = sum(widths) + space * (len(chars) - 1)
        x = cx - total // 2
        for c, cw_ in zip(chars, widths):
            draw.text((x, y), c, font=font, fill=color)
            x += cw_ + space

def rule(draw, cx, y, w, color, t=2):
    x0, x1 = cx - w // 2, cx + w // 2
    for i in range(t):
        draw.line([(x0, y + i), (x1, y + i)], fill=color)

def wrap_text(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], []
    for word in words:
        test = ' '.join(cur + [word])
        if tw(draw, test, font) <= max_w:
            cur.append(word)
        else:
            if cur:
                lines.append(' '.join(cur))
            cur = [word]
    if cur:
        lines.append(' '.join(cur))
    return lines

def draw_block(draw, text, left, top, max_w, font, color,
               lh=1.5, ph=0.5, max_y=None):
    paras = [p.strip() for p in text.split('\n\n') if p.strip()]
    y = top
    fh = font.size
    for i, para in enumerate(paras):
        for line in wrap_text(draw, para, font, max_w):
            if max_y and y + fh > max_y:
                return y
            draw.text((left, y), line, font=font, fill=color)
            y += int(fh * lh)
        if i < len(paras) - 1:
            y += int(fh * ph)
    return y


# ─────────────────────────────────────────────────────────────────────────────
# GRADIENT OVERLAYS
# ─────────────────────────────────────────────────────────────────────────────

def add_gradients(img):
    img = img.convert('RGBA')
    w, h = img.size
    ov = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    # Upper — ease-in curve, peaks at top
    uh = int(h * UP_GRAD_H)
    for y in range(uh):
        t = (1.0 - y / uh) ** 1.3
        d.line([(0, y), (w, y)], fill=(*BG_COLOR, int(UP_GRAD_OP * t)))
    # Lower
    lh_ = int(h * LO_GRAD_H)
    ls = h - lh_
    for y in range(lh_):
        t = (y / lh_) ** 1.2
        d.line([(0, ls + y), (w, ls + y)], fill=(*BG_COLOR, int(LO_GRAD_OP * t)))
    return Image.alpha_composite(img, ov).convert('RGB')


# ─────────────────────────────────────────────────────────────────────────────
# IMPRINT MARK — {7/2} heptagram in circle
# ─────────────────────────────────────────────────────────────────────────────

def imprint_mark(draw, cx, cy, r, color, lw=2):
    n, step = 7, 2
    pts = [
        (cx + r * math.cos(-math.pi / 2 + 2 * math.pi * i / n),
         cy + r * math.sin(-math.pi / 2 + 2 * math.pi * i / n))
        for i in range(n)
    ]
    order = [(i * step) % n for i in range(n + 1)]
    draw.line([pts[i] for i in order], fill=color, width=max(1, lw))
    draw.ellipse([cx - r - 2, cy - r - 2, cx + r + 2, cy + r + 2],
                 outline=color, width=max(1, lw))


# ─────────────────────────────────────────────────────────────────────────────
# FRONT FACE
# ─────────────────────────────────────────────────────────────────────────────

def front_face(hero_img, trim_w, trim_h,
               bleed_l=0.0, bleed_r=0.0, bleed_t=0.0, bleed_b=0.0):
    # Full render size includes any bleed on each side; content is positioned
    # relative to the TRIM sub-region so type stays centered on the visible cover.
    TW, TH = px(trim_w), px(trim_h)
    ox, oy = px(bleed_l), px(bleed_t)
    W = TW + px(bleed_l) + px(bleed_r)
    H = TH + px(bleed_t) + px(bleed_b)
    safe = px(SAFE)
    cx = ox + TW // 2
    max_w = TW - 2 * safe

    # Scale and crop hero to fill the full (bleed-inclusive) face
    hr = hero_img.width / hero_img.height
    fr = W / H
    if hr > fr:
        nh, nw = H, int(H * hr)
    else:
        nw, nh = W, int(W / hr)
    hero = hero_img.copy().resize((nw, nh), Image.LANCZOS)
    left = (nw - W) // 2
    # Bias crop upward so candle stays in bottom third
    top = min(max(0, (nh - H) // 5), nh - H)
    hero = hero.crop((left, top, left + W, top + H))
    # Mild unsharp mask to recover crispness lost in resampling (helps modest-res heroes)
    hero = hero.filter(ImageFilter.UnsharpMask(radius=2, percent=80, threshold=2))

    face = add_gradients(hero)
    draw = ImageDraw.Draw(face)

    # Content metrics are relative to TRIM height; vertical positions offset by top bleed
    def sp(key): return int(TH * S[key])
    def yf(f):   return oy + int(TH * f)

    # ── Collector status line ────────────────────────────────────────────
    fc = fnt(FONT_CINZEL_REG, sp("collector"))
    draw_cx(draw, COLLECTOR_LINE, cx, yf(L["collector_top"]), fc,
            GOLD_PRIMARY, tracking=0.05)

    # ── Series mark ──────────────────────────────────────────────────────
    fs = fnt(FONT_CINZEL_REG, sp("series"))
    draw_cx(draw, SERIES_MARK, cx, yf(L["series_top"]), fs,
            GOLD_PRIMARY, tracking=0.18)

    # ── Title — auto-reduce if too wide ──────────────────────────────────
    title_sz = sp("title")
    while title_sz > sp("series") + 4:
        ft = fnt(FONT_CINZEL_BOLD, title_sz)
        if tw(draw, TITLE, ft) <= max_w:
            break
        title_sz -= 2
    ft = fnt(FONT_CINZEL_BOLD, title_sz)
    y_title = yf(L["title_top"])
    draw_cx(draw, TITLE, cx, y_title, ft, GOLD_PRIMARY, tracking=0.04)
    y_below = y_title + int(ft.size * 1.06)

    # ── Volume listing ────────────────────────────────────────────────────
    vol_sz = sp("volume")
    fv = fnt(FONT_GARAMOND_ITAL, vol_sz)
    while tw(draw, VOLUME_LISTING, fnt(FONT_GARAMOND_ITAL, vol_sz)) > max_w and vol_sz > 14:
        vol_sz -= 1
    fv = fnt(FONT_GARAMOND_ITAL, vol_sz)
    y_vol = y_below + yf(0.008)
    # Soft drop shadow on the volume listing for legibility (no visible band)
    vw_meas = tw(draw, VOLUME_LISTING, fv)
    shadow = Image.new('RGBA', face.size, (0, 0, 0, 0))
    shd = ImageDraw.Draw(shadow)
    # Draw the text in near-black, offset, then blur to a soft halo
    off = px(0.012)
    shd.text((cx - vw_meas//2 + off, y_vol + off), VOLUME_LISTING, font=fv, fill=(0, 0, 0, 200))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=px(0.02)))
    face_rgba = Image.alpha_composite(face.convert('RGBA'), shadow)
    face.paste(face_rgba.convert('RGB'), (0, 0))
    draw = ImageDraw.Draw(face)
    draw_cx(draw, VOLUME_LISTING, cx, y_vol, fv, CREAM)

    # ── Latin date ────────────────────────────────────────────────────────
    fd = fnt(FONT_CINZEL_REG, sp("date"))
    y_date = y_vol + int(fv.size * 1.1) + yf(0.005)
    draw_cx(draw, LATIN_DATE, cx, y_date, fd, GOLD_PRIMARY, tracking=0.14)

    # ── Latin epigraph — texture only, ~18% opacity ───────────────────────
    fe = fnt(FONT_GARAMOND_ITAL, sp("epigraph"))
    y_epi = yf(L["epigraph_top"])
    ew = tw(draw, LATIN_EPIGRAPH, fe)

    def blend(c, bg, a):
        return tuple(int(c[i] * a + bg[i] * (1 - a)) for i in range(3))

    epi_col = blend(CREAM, BG_COLOR, 0.13)
    draw.text((cx - ew // 2, y_epi), LATIN_EPIGRAPH, font=fe, fill=epi_col)

    # ── Author name with rules ─────────────────────────────────────────────
    fa = fnt(FONT_CINZEL_REG, sp("author"))
    aw = tw(draw, AUTHOR, fa)
    y_author = yf(L["author_bottom"]) - int(fa.size)
    rule_w = int(aw * 1.18)
    gap = yf(L["rule_gap"])
    rule(draw, cx, y_author - gap - 2, rule_w, GOLD_PRIMARY, t=max(1, px(0.004)))
    draw_cx(draw, AUTHOR, cx, y_author, fa, GOLD_PRIMARY, tracking=0.07)
    rule(draw, cx, y_author + int(fa.size) + gap, rule_w, GOLD_PRIMARY, t=max(1, px(0.004)))

    return face


# ─────────────────────────────────────────────────────────────────────────────
# BACK PANEL
# ─────────────────────────────────────────────────────────────────────────────

def back_panel(trim_w, trim_h, isbn):
    W, H = px(trim_w), px(trim_h)
    safe = px(SAFE)
    img = Image.new('RGB', (W, H), BG_COLOR)
    draw = ImageDraw.Draw(img)
    cx = W // 2
    max_w = W - 2 * safe

    def sp(key): return int(H * S[key])

    y = int(H * 0.036)

    # Collector line with rules
    rule(draw, cx, y, max_w, GOLD_PRIMARY, t=max(1, px(0.003)))
    y += int(H * 0.013)
    fc = fnt(FONT_CINZEL_REG, sp("collector"))
    draw_cx(draw, COLLECTOR_LINE, cx, y, fc, GOLD_PRIMARY, tracking=0.04)
    y += int(fc.size * 1.2)
    rule(draw, cx, y, max_w, GOLD_PRIMARY, t=max(1, px(0.003)))
    y += int(H * 0.028)

    # Body copy — clipped to 72% of height
    fb = fnt(FONT_GARAMOND_REG, BODY_PX)
    quote_zone = int(H * 0.72)
    draw_block(draw, BACK_COPY, safe, y, max_w, fb, CREAM,
               lh=1.50, ph=0.45, max_y=quote_zone)

    # Closing quote — anchored at 74%
    fq = fnt(FONT_GARAMOND_ITAL, sp("back_quote"))
    yq = int(H * 0.68)
    rule(draw, cx, yq, int(max_w * 0.50), GOLD_PRIMARY, t=max(1, px(0.003)))
    yq += int(H * 0.013)
    draw_cx(draw, CLOSING_QUOTE, cx, yq, fq, GOLD_PRIMARY)
    yq += int(fq.size * 1.3)
    rule(draw, cx, yq, int(max_w * 0.50), GOLD_PRIMARY, t=max(1, px(0.003)))

    # Back epigraph — quiet two-line coda, centered in the open gap between the
    # closing-quote rule (~72%) and the bottom barcode band (~85%). Auto-fit width.
    epi_sz = sp("back_epi")
    fe = fnt(FONT_GARAMOND_ITAL, epi_sz)
    while max(tw(draw, BACK_EPI_L1, fe), tw(draw, BACK_EPI_L2, fe)) > max_w and epi_sz > 12:
        epi_sz -= 1
        fe = fnt(FONT_GARAMOND_ITAL, epi_sz)
    band_top = H - safe - px(1.0)                 # top edge of barcode band
    quote_end = yq + px(0.10)                      # yq is bottom rule of the quote block
    block_h = int(fe.size * 1.35) + epi_sz
    ey = (quote_end + band_top) // 2 - block_h // 2   # vertically centered in the gap
    draw_cx(draw, BACK_EPI_L1, cx, ey, fe, CREAM)
    ey += int(fe.size * 1.35)
    draw_cx(draw, BACK_EPI_L2, cx, ey, fe, CREAM)


    # Barcode reserve zone — IngramSpark requires 1.75" x 1.0" clear white area.
    # Placed hard in the bottom-right corner inside the safe margin.
    bc_w, bc_h = px(1.75), px(1.0)
    bc_x = W - safe - bc_w
    bc_y = H - safe - bc_h
    draw.rectangle([bc_x, bc_y, bc_x + bc_w, bc_y + bc_h], fill=(255, 255, 255))
    flbl = fnt(FONT_GARAMOND_REG, max(7, int(sp("imprint") * 0.55)))
    lbl = "ISBN BARCODE"
    lw = tw(draw, lbl, flbl)
    draw.text((bc_x + (bc_w - lw)//2, bc_y + bc_h//2 - flbl.size//2), lbl, font=flbl, fill=(150, 150, 150))
    fisbn = fnt(FONT_GARAMOND_REG, max(7, int(sp("imprint") * 0.6)))
    iw = tw(draw, isbn, fisbn)
    draw.text((bc_x + (bc_w - iw)//2, bc_y + bc_h - fisbn.size - px(0.06)),
              isbn, font=fisbn, fill=(0, 0, 0))

    # Imprint mark + name — bottom-left, aligned with barcode baseline
    mr = max(8, px(0.11))
    mcx = safe + mr + px(0.04)
    mcy = bc_y + bc_h - mr - px(0.05)
    imprint_mark(draw, mcx, mcy, mr, GOLD_PRIMARY, lw=max(1, px(0.007)))
    fimp = fnt(FONT_CINZEL_BOLD, sp("imprint"))
    ix = mcx + mr + px(0.10)
    draw.text((ix, mcy - int(fimp.size * 1.05)), IMPRINT_NAME, font=fimp, fill=GOLD_PRIMARY)
    fweb = fnt(FONT_GARAMOND_REG, sp("imprint") - 2)
    draw.text((ix, mcy + px(0.02)), WEBSITE, font=fweb, fill=CREAM)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# SPINE
# ─────────────────────────────────────────────────────────────────────────────

def spine(spine_w, trim_h, hero_img=None):
    W, H = px(spine_w), px(trim_h)
    # Clean black spine — the literary-fiction standard (Knopf / FSG / Picador).
    # No dome image: a flat color field with gold type + colophon reads as premium.
    img = Image.new('RGB', (W, H), BG_COLOR)

    # Reserve foot space for the imprint mark so spine text never collides with it
    mark_zone = px(0.95)              # space reserved at foot for the mark
    top_pad   = px(0.4)              # space reserved at head
    avail_h   = H - mark_zone - top_pad   # vertical run available to the text

    # Cap font size to a fraction of spine width (prevents oversized type)
    max_sz = int(W * 0.42)
    sz = max(10, max_sz)
    tmp = Image.new('RGB', (10, 10))
    td = ImageDraw.Draw(tmp)
    while sz > 8 and tw(td, SPINE_TEXT, fnt(FONT_CINZEL_REG, sz)) > avail_h:
        sz -= 1
    fs = fnt(FONT_CINZEL_REG, sz)

    stw = tw(td, SPINE_TEXT, fs)
    tmp2 = Image.new('RGBA', (stw + 40, W), (0, 0, 0, 0))
    td2 = ImageDraw.Draw(tmp2)
    td2.text((20, (W - fs.size) // 2), SPINE_TEXT, font=fs, fill=(*GOLD_PRIMARY, 255))
    rot = tmp2.rotate(270, expand=True)

    rx, ry = rot.size
    px_off = (W - rx) // 2
    # Vertically center the text within the available zone (between top_pad and mark_zone)
    paste_y = top_pad + (avail_h - ry) // 2
    if paste_y < top_pad:
        paste_y = top_pad
    img.paste(rot.convert('RGB'), (px_off, paste_y), mask=rot.split()[3])

    # Imprint mark at foot, inside the reserved mark_zone
    mr = max(5, int(W * 0.18))
    sd = ImageDraw.Draw(img)
    mark_cy = H - mark_zone // 2
    imprint_mark(sd, W // 2, mark_cy, mr, GOLD_PRIMARY,
                 lw=max(1, int(W * 0.030)))

    return img


# ─────────────────────────────────────────────────────────────────────────────
# FLAP
# ─────────────────────────────────────────────────────────────────────────────

def flap(flap_w, trim_h, copy, is_front=True):
    W, H = px(flap_w), px(trim_h)
    safe = px(SAFE)
    img = Image.new('RGB', (W, H), BG_COLOR)
    draw = ImageDraw.Draw(img)
    max_w = W - 2 * safe

    fb = fnt(FONT_GARAMOND_REG, BODY_PX)
    y = px(0.45)
    draw_block(draw, copy, safe, y, max_w, fb, CREAM, lh=1.50, ph=0.50)

    if not is_front:
        # Author photo (small, restrained — literary convention) above the bio
        photo_h = 0
        if AUTHOR_PHOTO:
            try:
                ph = Image.open(AUTHOR_PHOTO).convert('RGB')
                # Square crop, sized to ~70% of flap width
                side = min(ph.size)
                ph = ph.crop(((ph.width-side)//2, (ph.height-side)//2,
                              (ph.width+side)//2, (ph.height+side)//2))
                target = int(max_w * 0.62)
                ph = ph.resize((target, target), Image.LANCZOS)
                px_x = safe + (max_w - target)//2
                px_y = H - px(3.6)
                img.paste(ph, (px_x, px_y))
                # Thin gold rule under the photo
                rule(draw, safe + max_w//2, px_y + target + px(0.08),
                     int(target * 0.9), GOLD_PRIMARY, t=max(1, px(0.004)))
                photo_h = target + px(0.25)
            except Exception as e:
                print(f"  WARNING: author photo failed: {e}")
        bio_y = H - px(3.6) + photo_h + px(0.15)
        fbi = fnt(FONT_GARAMOND_ITAL, BODY_PX - 2)
        draw_block(draw, AUTHOR_BIO, safe, bio_y, max_w, fbi, CREAM, lh=1.4)

    return img


# ─────────────────────────────────────────────────────────────────────────────
# PDF WRITER
# ─────────────────────────────────────────────────────────────────────────────

def save_pdf(img, path, doc_w, doc_h):
    """Save as CMYK PDF. Converts the RGB composite to controlled CMYK
    (rich black, <=240% ink). Embeds the image LOSSLESSLY (Flate/PNG) so the
    dome detail is preserved — no JPEG softening. Output is DeviceCMYK, the
    prerequisite for IngramSpark PDF/X-1a compliance."""
    cmyk_img = rgb_to_cmyk_controlled(img)
    # Embed losslessly. reportlab's drawImage accepts an ImageReader; using a
    # CMYK TIFF preserves the 4-channel data with no lossy compression.
    tmp = path.replace('.pdf', '_tmp.tiff')
    cmyk_img.save(tmp, 'TIFF', compression='tiff_lzw', dpi=(DPI, DPI))
    c = rl_canvas.Canvas(path, pagesize=(doc_w * inch, doc_h * inch))
    try:
        c.drawImage(tmp, 0, 0, width=doc_w * inch, height=doc_h * inch)
    except Exception:
        # Fallback: high-quality JPEG if TIFF embed is unsupported in this reportlab
        tmp_j = path.replace('.pdf', '_tmp.jpg')
        cmyk_img.save(tmp_j, 'JPEG', quality=100, subsampling=0, dpi=(DPI, DPI))
        c.drawImage(tmp_j, 0, 0, width=doc_w * inch, height=doc_h * inch)
        os.remove(tmp_j)
    c.save()
    if os.path.exists(tmp):
        os.remove(tmp)
    # Note: for strict PDF/X-1a:2001 compliance (output intent declaration),
    # run the resulting PDF through Ghostscript:
    #   gs -dPDFX -dBATCH -dNOPAUSE -sColorConversionStrategy=CMYK \
    #      -sDEVICE=pdfwrite -dPDFXSETBLEEDBOXTOMEDIABOX \
    #      -sOutputFile=out_X1a.pdf PDFX_def.ps in.pdf
    # The CMYK conversion above satisfies the color-space requirement;
    # the Ghostscript pass adds the output-intent metadata if IS requires it.


# ─────────────────────────────────────────────────────────────────────────────
# SPREAD ASSEMBLERS
# ─────────────────────────────────────────────────────────────────────────────

def build_pb(hero_img, out_dir):
    print("  Building PB spread...")
    dw, dh = px(PB_DOC_W), px(PB_DOC_H)
    spread = Image.new('RGB', (dw, dh), BG_COLOR)

    # ── EXACT IngramSpark template coordinates ───────────────────────────────
    # Verified against 9798256072704-Perfect.pdf (15.0 x 12.0 doc).
    # Cover artwork spans x=1.8556..14.5 with the spine at its center; the press
    # registers to these positions, so panels MUST land here (not at the left edge).
    SPINE_L = 7.4806     # spine left fold
    SPINE_R = 8.8750     # spine right fold
    COVER_TOP = 1.625    # bleed-area top  (trim top = 1.75)
    TRIM_TOP  = 1.75
    bl = BLEED

    # Front cover (dome): fills spine_r .. (trim + outer bleed), bleed top/bottom.
    front = front_face(hero_img, PB_TRIM_W, PB_TRIM_H,
                       bleed_l=0.0, bleed_r=bl, bleed_t=bl, bleed_b=bl)
    spread.paste(front, (px(SPINE_R), px(COVER_TOP)))

    # Back panel (solid-bg) positioned at its trim rectangle; surrounding black
    # bleed is filled by the spread background (identical colour → no seam).
    spread.paste(back_panel(PB_TRIM_W, PB_TRIM_H, PB_ISBN),
                 (px(SPINE_L - PB_TRIM_W), px(TRIM_TOP)))

    # Spine at exact template position.
    spread.paste(spine(PB_SPINE, PB_TRIM_H), (px(SPINE_L), px(TRIM_TOP)))

    prev = str(out_dir / "pb_preview.jpg")
    spread.save(prev, 'JPEG', quality=88)
    print(f"    Preview: {prev}")

    out = str(out_dir / "COVER_OMNIBUS_PB_9798256072704_FINAL_v2.pdf")
    save_pdf(spread, out, PB_DOC_W, PB_DOC_H)
    print(f"    PDF: {out}")


def build_hc(hero_img, out_dir):
    print("  Building HC dust jacket...")
    dw, dh = px(HC_DOC_W), px(HC_DOC_H)
    spread = Image.new('RGB', (dw, dh), BG_COLOR)

    # ── EXACT IngramSpark template coordinates ───────────────────────────────
    # Verified against 9798295884412-Jacket.pdf (24.0 x 12.5 doc).
    # Fold lines (inches from left): back-flap fold 5.2972, spine 12.1250/13.4375,
    # front-flap fold 20.2653. Cover bleed/wrap height 9.71 (trim 9.21 + 0.25 wrap
    # top & bottom). Flaps are 3.25 each. The press folds at these exact lines.
    BACK_FLAP_FOLD  = 5.2972
    SPINE_L         = 12.1250
    SPINE_R         = 13.4375
    FRONT_FLAP_FOLD = 20.2653
    WRAP            = HC_WRAP          # 0.25
    COVER_TOP = (HC_DOC_H - 9.71) / 2  # 1.395  (bleed/wrap area top)
    TRIM_TOP  = COVER_TOP + WRAP       # 1.645  (visible trim top)

    # Front cover (dome): fills spine_r .. front-flap fold (trim + wrap), wrap top/bottom.
    front_bleed_r = FRONT_FLAP_FOLD - SPINE_R - HC_TRIM_W   # 0.6878
    front = front_face(hero_img, HC_TRIM_W, HC_TRIM_H,
                       bleed_l=0.0, bleed_r=front_bleed_r,
                       bleed_t=WRAP, bleed_b=WRAP)
    spread.paste(front, (px(SPINE_R), px(COVER_TOP)))

    # Back panel (solid-bg) at its trim rectangle (trim right edge = spine left).
    spread.paste(back_panel(HC_TRIM_W, HC_TRIM_H, HC_ISBN),
                 (px(SPINE_L - HC_TRIM_W), px(TRIM_TOP)))

    # Spine at exact template position.
    spread.paste(spine(HC_SPINE, HC_TRIM_H), (px(SPINE_L), px(TRIM_TOP)))

    # Flaps (solid-bg), 3.25 wide, inner edge at the fold lines.
    spread.paste(flap(HC_FLAP, HC_TRIM_H, FLAP_BACK, is_front=False),
                 (px(BACK_FLAP_FOLD - HC_FLAP), px(TRIM_TOP)))
    spread.paste(flap(HC_FLAP, HC_TRIM_H, FLAP_FRONT, is_front=True),
                 (px(FRONT_FLAP_FOLD), px(TRIM_TOP)))

    prev = str(out_dir / "hc_preview.jpg")
    spread.save(prev, 'JPEG', quality=88)
    print(f"    Preview: {prev}")

    out = str(out_dir / "COVER_OMNIBUS_HC_9798295884412_FINAL_v2.pdf")
    save_pdf(spread, out, HC_DOC_W, HC_DOC_H)
    print(f"    PDF: {out}")


def build_standalone(hero_img, out_dir):
    print("  Building standalone PNG...")
    # Render at native HC trim resolution (no downscale) to preserve dome detail.
    face = front_face(hero_img, HC_TRIM_W, HC_TRIM_H)
    out = str(out_dir / "COVER_OMNIBUS_FRONTFACE_STANDALONE.png")
    face.save(out, 'PNG')
    print(f"    PNG (full res {face.size}): {out}")
    # Also save a 1600px web/Amazon version (Kindle wants >=2500px long edge)
    web = face.resize((1667, 2500), Image.LANCZOS)
    web_out = str(out_dir / "COVER_OMNIBUS_FRONTFACE_WEB_2500.png")
    web.save(web_out, 'PNG')
    print(f"    Web PNG (2500px): {web_out}")


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--hero', required=True,
        help='Path to RAW dome photograph — no text, no gradients')
    parser.add_argument('--output', default='./output')
    parser.add_argument('--force', action='store_true',
                        help='Proceed even if the hero image is below the resolution floor')
    args = parser.parse_args()

    hero_path = Path(args.hero)
    if not hero_path.exists():
        print(f"ERROR: {hero_path} not found")
        sys.exit(1)

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"\nMasters X · Omnibus Cover Compositor v3  (Cinzel + EB Garamond)")
    print(f"Hero:   {hero_path}")
    print(f"Output: {out_dir}")
    print(f"Fonts:  {FONTS_DIR}\n")

    # Verify fonts loaded
    print("Font verification:")
    for name, path in [
        ("Cinzel Regular",   FONT_CINZEL_REG),
        ("Cinzel Bold",      FONT_CINZEL_BOLD),
        ("Garamond Regular", FONT_GARAMOND_REG),
        ("Garamond Italic",  FONT_GARAMOND_ITAL),
        ("Garamond Bold",    FONT_GARAMOND_BOLD),
    ]:
        status = "✓" if os.path.exists(path) else "✗ MISSING"
        print(f"  {status}  {name}: {path}")
    print()

    hero = Image.open(hero_path).convert('RGB')
    print(f"Hero size: {hero.size}")
    needed = px(HC_TRIM_H + 2*BLEED)  # tallest dimension the face must fill (~2838px)
    ideal  = needed + 400              # comfortable margin for crop + crispness
    if hero.height < needed:
        print()
        print(f"  ============================================================")
        print(f"  *** HARD STOP: HERO IMAGE TOO SMALL ***")
        print(f"  ============================================================")
        print(f"  Hero is {hero.height}px tall. The HC front face needs {needed}px")
        print(f"  minimum, {ideal}px ideal.")
        print()
        print(f"  Upscaling a small dome is THE cause of the soft/degraded cover.")
        print(f"  The compositor CANNOT add detail that is not in the source image.")
        print()
        print(f"  REQUIRED FIX before re-running:")
        print(f"  1. Take the RAW dome (clean, no text).")
        print(f"  2. Upscale to at least {ideal}px tall with Topaz Gigapixel 8,")
        print(f"     Magnific, or 'gigapixel'-class AI upscaler (NOT a plain resize).")
        print(f"  3. Re-run this script with the upscaled dome.")
        print()
        print(f"  To override and proceed anyway (NOT recommended), pass --force.")
        print(f"  ============================================================")
        if not getattr(args, 'force', False):
            sys.exit(1)
        print(f"  --force given: proceeding with upscaling despite quality loss.\n")
    elif hero.height < ideal:
        print(f"  Hero acceptable ({hero.height}px) but {ideal}px would be crisper.\n")
    else:
        print(f"  Hero resolution EXCELLENT ({hero.height}px >= {ideal}px ideal).\n")

    build_pb(hero, out_dir)
    build_hc(hero, out_dir)
    build_standalone(hero, out_dir)

    print("\n✓ ALL OUTPUTS COMPLETE")
    print("\nPREFLIGHT CHECKLIST:")
    print("  [ ] Author: 'Jason Carroll Holloway' — front face, back panel, spine")
    print("  [ ] Imprint: 'Seventh City Press' — back panel, spine foot")
    print("  [ ] NOT 'Sacred Books LLC' / NOT 'Jason C. Holloway'")
    print(f"  [ ] PB PDF: {PB_DOC_W} × {PB_DOC_H} in | spine {PB_SPINE}\"")
    print(f"  [ ] HC PDF: {HC_DOC_W} × {HC_DOC_H} in | spine {HC_SPINE}\"")
    print("  [ ] Thumbnail test: scale standalone to 150px — oculus + title legible")
    print("  [ ] Review pb_preview.jpg and hc_preview.jpg before IS upload")


if __name__ == "__main__":
    main()
