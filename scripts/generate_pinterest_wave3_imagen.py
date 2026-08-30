#!/usr/bin/env python3
"""
Generate Pinterest Wave 3 pins D-06..D-15 via Google Gemini Image API (GOOGLE_API_KEY).

Outputs PNGs to scratch/pinterest-wave3/pending/ for Jason approval.
Does NOT upload to Pinterest.

Usage:
  python scripts/generate_pinterest_wave3_imagen.py
  python scripts/generate_pinterest_wave3_imagen.py --only D-06,D-07
  python scripts/generate_pinterest_wave3_imagen.py --force
"""

from __future__ import annotations

import argparse
import base64
import json
import re
import sys
import time
import urllib3
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path

import requests

urllib3.disable_warnings()

ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".env"
OUT_DIR = ROOT / "scratch" / "pinterest-wave3" / "pending"
PREVIEW_DIR = ROOT / "scratch" / "pinterest-wave3"
MANIFEST_PATH = PREVIEW_DIR / "manifest.json"
APPROVAL_HTML = PREVIEW_DIR / "APPROVAL.html"
WAVE3_DOC = ROOT / "debt_consolidation_handoff" / "global_penetration_wave1" / "pinterest-wave3-design-batch-d06-d15.md"

API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions"
MODEL = "gemini-2.5-flash-image"

STYLE = (
    "Seventh City Press Pinterest pin. Dark academia scholarly publisher aesthetic. "
    "Palette: cream #F5F0E8, charcoal #1A1A1A, gold accent #C4A35A. "
    "Elegant serif headline typography readable at mobile thumbnail size. "
    "Footer: jasoncholloway.com in small gold sans-serif. "
    "Vertical 2:3 composition. Authoritative, not salesy. No stock-photo clichés."
)

PINS = [
    {
        "id": "D-06",
        "board": "Prague & Strahov Library",
        "title": "Ars Notoria — The Medieval Book of Memory and Illumination",
        "link": "https://jasoncholloway.com/field-notes/ars-notoria/",
        "ref_url": "https://jasoncholloway.com/folios/arsnotoria/Ars_Notoria_Screenshot_3.png",
        "prompt": (
            f"{STYLE} Template: dramatic manuscript photo fills upper 70%, dark gradient overlay at bottom 30%. "
            "Headline in white serif: 'Medieval Cognitive Technology'. "
            "Gold subline: 'Ars Notoria · Field Note'. "
            "Use the reference manuscript page as the photographic ground — geometric notae, medieval illumination."
        ),
    },
    {
        "id": "D-07",
        "board": "Literary Conspiracy Thrillers",
        "title": "Masters X Trilogy — Literary Conspiracy Thriller, Complete Omnibus",
        "link": "https://jasoncholloway.com/books/masters-x/omnibus/",
        "ref_url": "https://jasoncholloway.com/covers/omnibus-hardcover-v3.png",
        "prompt": (
            f"{STYLE} Template: charcoal background, gold accent line. "
            "Gold label at top: 'For readers of Eco, Kostova, and Crouch'. "
            "Center: book cover from reference image, large and crisp. "
            "Below cover white serif headline: 'Three Manuscripts. Seven Cities. One System.' "
            "Small gold line: 'Available now · Kindle · Paperback · Hardcover'."
        ),
    },
    {
        "id": "D-08",
        "board": "Literary Conspiracy Thrillers",
        "title": "The Inheritance of Frequency — Masters X Vol I",
        "link": "https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/",
        "ref_url": "https://jasoncholloway.com/covers/book1-paperback.png",
        "prompt": (
            f"{STYLE} Template: charcoal background. "
            "Gold label: 'For readers of Foucault's Pendulum'. "
            "Center: paperback cover from reference. "
            "White serif headline below: 'Kansas City to Prague. One Frequency.'"
        ),
    },
    {
        "id": "D-09",
        "board": "Literary Conspiracy Thrillers",
        "title": "Literary Conspiracy Thrillers for Eco, Kostova, and Brown Readers",
        "link": "https://jasoncholloway.com/books/books-like-foucaults-pendulum/",
        "ref_url": None,
        "prompt": (
            f"{STYLE} Template: cream background, gold horizontal rule. "
            "Large charcoal serif headline centered: 'Books Like Foucault's Pendulum'. "
            "Gold subline: 'Literary Conspiracy Thrillers · Free Readalike List'. "
            "Minimal text-card design, no photo."
        ),
    },
    {
        "id": "D-10",
        "board": "Literary Conspiracy Thrillers",
        "title": "Masters X Vol I — Free Opening Chapters Delivered by Email",
        "link": "https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/",
        "ref_url": None,
        "prompt": (
            f"{STYLE} Template: cream background, gold rule. "
            "Headline: 'Get the Opening Chapters Free'. "
            "Subline in gold: 'Masters X Vol I · Delivered by Email'. "
            "Clean text-card, inviting not pushy."
        ),
    },
    {
        "id": "D-11",
        "board": "Frequency & Esoteric History",
        "title": "111 Hz — The Frequency in Ancient Stone Chambers Worldwide",
        "link": "https://jasoncholloway.com/field-notes/111-hz/",
        "ref_url": None,
        "prompt": (
            f"{STYLE} Template: cream background. "
            "Headline: 'What Happens at 111 Hz?'. "
            "Gold subline: 'Ancient Stone Chambers · Real Archaeoacoustics'. "
            "Subtle stone-chamber texture watermark at low opacity."
        ),
    },
    {
        "id": "D-12",
        "board": "Frequency & Esoteric History",
        "title": "Cymatics — Chladni Figures and Visible Sound Patterns Since 1787",
        "link": "https://jasoncholloway.com/field-notes/cymatics/",
        "ref_url": "https://jasoncholloway.com/og/field-notes/cymatics.png",
        "prompt": (
            f"{STYLE} Template: cymatics/Chladni pattern image as full-bleed background from reference. "
            "Dark gradient overlay bottom third. "
            "White headline: 'Sound You Can See. Real Physics.' "
            "Gold subline: 'Cymatics · Chladni Figures Since 1787'."
        ),
    },
    {
        "id": "D-13",
        "board": "Voynich Manuscript & Codices",
        "title": "Voynich Manuscript Astronomical Diagrams — Beinecke MS 408 f27r",
        "link": "https://jasoncholloway.com/chamber/folio-visualizer/",
        "ref_url": "https://jasoncholloway.com/folios/voynich/Vol%202/voynich2-000.jpg",
        "prompt": (
            f"{STYLE} Template: Voynich folio astronomical diagram from reference as hero image. "
            "Dark overlay band at bottom. "
            "White headline: 'Voynich Astronomical Section'. "
            "Gold subline: 'Beinecke MS 408 · folio f27r'."
        ),
    },
    {
        "id": "D-14",
        "board": "Prague & Strahov Library",
        "title": "Codex Gigas: Medieval Bohemia's Largest Manuscript, the Devil's Bible",
        "link": "https://jasoncholloway.com/field-notes/codex-gigas/",
        "ref_url": "https://jasoncholloway.com/og/field-notes/codex-gigas.png",
        "prompt": (
            f"{STYLE} Template: upper 65% image from reference (Codex Gigas / devil illustration). "
            "Cream panel lower 35%. "
            "Gold location label: 'MEDIEVAL BOHEMIA · CODEX GIGAS'. "
            "Charcoal serif headline: 'The Devil's Bible — Codex Gigas'."
        ),
    },
    {
        "id": "D-15",
        "board": "Frequency & Esoteric History",
        "title": "Harmonic Stack — Ars Notoria Notae as Acoustic Specifications",
        "link": "https://jasoncholloway.com/chamber/harmonic-stack/",
        "ref_url": "https://jasoncholloway.com/folios/arsnotoria/Ars_Notoria_Screenshot_5.png",
        "prompt": (
            f"{STYLE} Template: hexagonal geometric notae pattern from reference as hero. "
            "Dark gradient overlay. "
            "White headline: 'Hexagonal Geometry in a Grimoire'. "
            "Gold subline: 'Harmonic Stack · Analysis Chamber'."
        ),
    },
]

# Metadata from wave3 doc (descriptions for upload after approval)
DESCRIPTIONS = {
    "D-06": "Solomonic grimoire tradition: geometric notae designed as cognitive exercises. Not magic — medieval information architecture. British Library copies documented. Real history Field Note with sourced research. Companion to Masters X Vol II.",
    "D-07": "686 pages. Kansas City → Prague → 61 countries. Where the Voynich Manuscript, the Ars Notoria, and a sealed 13th-century crypt converge. For readers of Eco, Kostova, and Crouch. Kindle, paperback, hardcover — all formats available now.",
    "D-08": "A fired security guard inherits classified acoustic research linking SubTropolis carvings to a Prague crypt sealed since 1267. Literary conspiracy thriller for readers of Foucault's Pendulum and The Historian. Kindle $6.99, paperback, hardcover.",
    "D-09": "Looking for fiction with real manuscripts, European settings, and intellectual depth? Readalike list featuring literary conspiracy novels plus the Masters X trilogy. Not Dan Brown pace — Umberto Eco patience. Free reading list article.",
    "D-10": "Start reading The Inheritance of Frequency. Opening chapters delivered free by email — no spam, unsubscribe anytime. Kansas City limestone, Voynich Manuscript, Prague crypt.",
    "D-11": "Hypogeum Malta, Newgrange, Hal Saflieni — ancient chambers that resonate at 111 Hz. Real archaeoacoustics research, documented and sourced. Free Field Note from the research archive behind the Masters X trilogy.",
    "D-12": "Sand on a metal plate. A violin bow at the edge. Resonant frequency. Geometric patterns emerge from nowhere. Ernst Chladni documented it in 1787. Hans Jenny coined cymatics in the 1960s. The physics is real. Free Field Note.",
    "D-13": "Circular astronomical diagrams from the Voynich Manuscript's second section. Beinecke MS 408, folio f27r. Undeciphered for 600 years. Explore all 181 folios interactively in the free Analysis Chamber folio visualizer.",
    "D-14": "From medieval Bohemia to the Swedish Royal Library. The largest extant medieval manuscript, with its famous full-page devil illustration. Emperor Rudolf II owned this AND the Voynich. Real history Field Note — free.",
    "D-15": "14 geometric notae from the Ars Notoria analyzed as frequency patterns. Hexagonal trefoil network. Layer I of the Analysis Chamber — free interactive tool. Companion to Masters X Vol II: The Grimoire.",
}


def load_api_key() -> str:
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("GOOGLE_API_KEY="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError("GOOGLE_API_KEY not found in .env")


def fetch_ref_b64(url: str) -> tuple[str, str]:
    r = requests.get(url, timeout=120, verify=False)
    r.raise_for_status()
    ct = r.headers.get("Content-Type", "image/jpeg").split(";")[0]
    if ct not in ("image/jpeg", "image/png", "image/webp"):
        ext = Path(url.split("?")[0]).suffix.lower()
        ct = "image/png" if ext == ".png" else "image/jpeg"
    return base64.b64encode(r.content).decode("ascii"), ct


def extract_image(data: dict) -> dict:
    if data.get("output_image", {}).get("data"):
        return data["output_image"]
    for step in data.get("steps") or []:
        for block in step.get("content") or []:
            if block.get("type") == "image" and block.get("data"):
                return block
    raise RuntimeError("No image in API response")


def generate_pin(api_key: str, pin: dict) -> bytes:
    headers = {"x-goog-api-key": api_key, "Content-Type": "application/json"}
    input_blocks: list[dict] = []
    if pin.get("ref_url"):
        b64, mime = fetch_ref_b64(pin["ref_url"])
        input_blocks.append({"type": "image", "mime_type": mime, "data": b64})
    input_blocks.append({"type": "text", "text": pin["prompt"]})
    body = {
        "model": MODEL,
        "input": input_blocks,
        "response_format": {"type": "image", "aspect_ratio": "2:3", "image_size": "1K"},
    }
    r = requests.post(API_URL, headers=headers, json=body, timeout=240, verify=False)
    if r.status_code != 200:
        raise RuntimeError(f"API {r.status_code}: {r.text[:500]}")
    img = extract_image(r.json())
    return base64.b64decode(img["data"])


def png_to_jpg(png_bytes: bytes, out_path: Path) -> None:
    try:
        from PIL import Image
    except ImportError:
        out_path.with_suffix(".png").write_bytes(png_bytes)
        return
    im = Image.open(BytesIO(png_bytes)).convert("RGB")
    im = im.resize((1000, 1500), Image.Resampling.LANCZOS)
    im.save(out_path, "JPEG", quality=92, optimize=True)


def write_approval_html(manifest: dict) -> None:
    rows = []
    for pin in manifest["pins"]:
        pid = pin["id"]
        img = pin.get("file", f"pending/{pid}.jpg")
        rel = Path(img).name
        rows.append(
            f"""
    <section class="pin">
      <img src="pending/{rel}" alt="{pin['title'][:80]}"/>
      <div class="meta">
        <h2>{pid} · {pin['board']}</h2>
        <p><strong>Title:</strong> {pin['title']}</p>
        <p><strong>Link:</strong> <a href="{pin['link']}">{pin['link']}</a></p>
        <p><strong>Description:</strong> {pin['description'][:300]}…</p>
        <p class="status">⏳ Pending your approval</p>
      </div>
    </section>"""
        )
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Pinterest Wave 3 — Approval Preview (D-06..D-15)</title>
  <style>
    body {{ font-family: Georgia, serif; background: #1a1a1a; color: #f5f0e8; margin: 0; padding: 2rem; }}
    h1 {{ color: #c4a35a; }}
    .pin {{ display: flex; gap: 2rem; margin-bottom: 3rem; border-bottom: 1px solid #333; padding-bottom: 2rem; flex-wrap: wrap; }}
    .pin img {{ width: 320px; border: 2px solid #c4a35a; }}
    .meta {{ flex: 1; min-width: 280px; }}
    .meta a {{ color: #c4a35a; }}
    .status {{ color: #c4a35a; font-weight: bold; }}
    .note {{ background: #2a2a2a; padding: 1rem; border-left: 4px solid #c4a35a; margin-bottom: 2rem; }}
  </style>
</head>
<body>
  <h1>Pinterest Wave 3 — D-06 through D-15</h1>
  <div class="note">
    Generated via Google Gemini Image API ({MODEL}). Review each pin below.
    Reply in Cursor: <strong>approve all</strong>, <strong>approve D-06,D-07,…</strong>, or <strong>regenerate D-XX</strong> with notes.
    Nothing uploads to Pinterest until you approve.
  </div>
  {''.join(rows)}
</body>
</html>"""
    APPROVAL_HTML.write_text(html, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Comma-separated pin IDs, e.g. D-06,D-07")
    parser.add_argument("--force", action="store_true", help="Regenerate even if file exists")
    args = parser.parse_args()

    only = set(args.only.split(",")) if args.only else None
    api_key = load_api_key()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "model": MODEL,
        "status": "pending_approval",
        "pins": [],
    }

    targets = [p for p in PINS if not only or p["id"] in only]
    print(f"Generating {len(targets)} pins via {MODEL}...")

    for pin in targets:
        pid = pin["id"]
        out_jpg = OUT_DIR / f"{pid}.jpg"
        print(f"\n{pid} — {pin['title'][:50]}…")
        if out_jpg.exists() and not args.force:
            print(f"  skip (exists) {out_jpg}")
        else:
            try:
                png_bytes = generate_pin(api_key, pin)
                png_to_jpg(png_bytes, out_jpg)
                print(f"  -> {out_jpg}")
            except Exception as e:
                print(f"  ERROR {e}")
                manifest["pins"].append({**pin, "error": str(e), "approved": False})
                time.sleep(2)
                continue
            time.sleep(3)

        manifest["pins"].append(
            {
                "id": pid,
                "board": pin["board"],
                "title": pin["title"],
                "link": pin["link"],
                "description": DESCRIPTIONS.get(pid, ""),
                "file": str(out_jpg.relative_to(PREVIEW_DIR)),
                "ref_url": pin.get("ref_url"),
                "approved": False,
            }
        )

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    write_approval_html(manifest)
    print(f"\nManifest: {MANIFEST_PATH}")
    print(f"Approval preview: {APPROVAL_HTML}")
    ok = sum(1 for p in manifest["pins"] if "error" not in p)
    return 0 if ok == len(targets) else 1


if __name__ == "__main__":
    raise SystemExit(main())
