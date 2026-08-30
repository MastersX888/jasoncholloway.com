#!/usr/bin/env python3
"""
Overlay carousel text onto Instagram slide images, delete old IG posts,
upload overlaid images, and re-post all 7 Instagram carousels via Outstand.
"""

import json
import os
import ssl
import sys
import textwrap
import time
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
IMG_DIR = ROOT / "public" / "social" / "imagen"
OUT_DIR = ROOT / "public" / "social" / "imagen-overlaid"
BASE_URL = "https://api.outstand.so/v1"
IG_ACCOUNT = "1vWPG"
# Elevated typography: scripts/overlay_carousel.py (see content/social/REDESIGN_BRIEF.md).
# Do not reintroduce the old Arial caption-bar overlay in this file.

ENV = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

API_KEY = ENV["OUTSTAND_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}


class TLSAdapter(HTTPAdapter):
    """Force TLS 1.2+; Outstand previously failed with SSLEOFError on default stack."""

    def init_poolmanager(self, *args, **kwargs):
        ctx = ssl.create_default_context()
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        kwargs["ssl_context"] = ctx
        return super().init_poolmanager(*args, **kwargs)


SESSION = requests.Session()
SESSION.mount(
    "https://",
    TLSAdapter(max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])),
)

# ── Carousel slide text per slot ──────────────────────────────────────────────

CAROUSEL_TEXT = {
    1: [
        ("", "f = 111.2 Hz — a footer stamp on a manuscript page"),
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
        ("247 pages. Midnight. CC0.", ""),
        ("Not a confrontation.", "A conspiracy trilogy that ends with a file format"),
        ("Why leaking fails.", "It preserves scarcity and relocates the power"),
        ("Make the work boring.", "Documented, reproducible, free"),
        ("Public domain is a one-way door.", "The file cannot be un-released"),
        ("Invented, and labeled.", "The file is fiction. CC0 and open science are not."),
    ],
}

IG_CAPTIONS = {
    1: """110 Hz is measured. 111.2 Hz is mine.

The Hal-Saflieni Hypogeum is an underground temple complex in Malta, carved from limestone somewhere between 3600 and 2500 BCE. Eighty visitors a day are allowed inside. In the Oracle Chamber, researchers have documented a pronounced resonance around 110 to 111 Hz.

Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band at Neolithic chambers across Britain and Ireland. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.

That is the documented part, caveats included. The neurological study often cited had a small sample, and one study is one study.

The trilogy runs on 111.2 Hz instead. The extra decimal is the fiction signing its own work: close enough to honor the research, far enough that nobody mistakes my invention for their measurement.

Full essay linked in bio. Research layer at jasoncholloway.com/field-notes/111-hz/""",

    2: """Sound has shapes. That part is not mystical. It is 1787.

Ernst Chladni drew a violin bow along a sand-covered metal plate and showed that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it.

Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern rather than nudging it, and how patterns collapse when the tone stops and return identically when it resumes.

That is the real floor under everything strange in my trilogy. Here is the ceiling: nothing in the research says that looking at one of these patterns changes the person looking. The novels claim it does. That claim is mine, and I would rather name it than let it pass as physics.

Essay linked in bio. Research at jasoncholloway.com/field-notes/cymatics/""",

    3: """Four traditions looked at the same thirty miles of Missouri river bluff and decided, in vocabularies that never borrowed from each other, that this ground matters.

The Hopewell built rooms inside their burial mounds here: stone-vault tombs with doorways, roughly thirty documented sites at the westernmost edge of the tradition.

The Osage, whose historic corridor runs through western Missouri, carry the concept of Wah-kon-tah, the sacred mystery that connects everything. Practiced, not notated. My trilogy is about people building machinery to reach something one of this continent's older traditions simply did.

In 1831 Independence was declared the center place of Zion, and a sixty-three-acre parcel was dedicated for a temple that was never built. The lot is still mowed.

Underneath all of it: Bethany Falls limestone, quarried until the hollowed chambers became SubTropolis, where about seventeen hundred people go to work underground every day.

And the gap I will not paper over: no one has published an acoustics study of the Kansas City underground. The novel is sited here. It is not sourced here.

Essay in bio. jasoncholloway.com/field-notes/kansas-city-locations/""",

    4: """A medieval grimoire condemned as cheating.

The Ars Notoria belongs to the Solomonic tradition, with surviving manuscripts from the mid-thirteenth century, institutional copies including British Library MS Sloane 1712, and an English translation by Robert Turner in 1657. Claire Fanger and Julien Veronese have spent careers on it.

Its promise: the seven liberal arts, meaning grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy, acquired through structured contemplation of dense geometric figures paired with scheduled prayer.

The condemnation was not about demons. It was about shortcuts: knowledge obtained without the sanctioned labor of study.

And condemned books in the manuscript era did not vanish. They went expensive, copied on good vellum for centuries by patrons who privately decided the text was worth the risk.

Everything above is on the record. What my trilogy adds is one claim: that the method works, and here is how. No historian claims that. No cognitive scientist claims that. It is the one experiment the lab has never run, and that gap is where the fiction lives.

Essay in bio. jasoncholloway.com/field-notes/ars-notoria/""",

    5: """The fire took everything except the walls.

Westport Presbyterian Church was built in 1904, in the neighborhood that was once the last outfitting stop for wagon trains heading west. In 2011 it burned. Roof, sanctuary, woodwork, a century of accumulated interior, all gone. Photographs from the next morning show the 1904 limestone standing at full height around a burned-out shell, smoke-darkened and roofless.

The congregation rebuilt inside the standing walls. The fire could erase the contents but not the fact of the church, because the fact was mineral.

"The stone remembers" was in my manuscript before I found the fire. It had been sitting there, a metaphor waiting on a warrant. Too round, too quotable, the kind of line a novelist should distrust. Then a research pass turned up this fire four miles from my desk, and the warrant had been on the public record the whole time.

Nothing was predicted. Church fires are not rare. What changed was the line's standing: a metaphor that earned its keep.

Essay in bio. jasoncholloway.com/field-notes/kansas-city-locations/""",

    6: """One government published. The other classified the act of reading.

In 1984 American intelligence took a Chinese government journal on paranormal research, translated it for internal circulation, and filed it. On one side: a state research establishment studying claims of extraordinary human capacities in the open, with a commission, conferences, funded experiments, and a journal you could subscribe to. On the other: an agency that reads the journal and stamps the translation.

Two governments, one subject, opposite policies. That asymmetry is the political physics of my whole trilogy, and it came from the record rather than from me.

Inside the translated material the debate sorts into three postures: suppress the work, verify it in daylight, or attend to what it might be used for. Those became the Custodians, the Keepers, and the Completion Sect.

One caveat: the three-way sort is my reading, not a heading in the document. The file is public. Anyone who reads it differently has something worth hearing.

Essay linked in bio.""",

    7: """The trilogy ends with a license.

Two hundred forty-seven pages go onto the open internet at midnight under CC0, the license that reserves nothing, not even attribution. An eight-hundred-year war over a secret simply loses its object.

The argument inside the fiction: the intuitive opposite of classification is leaking, and that intuition is wrong. A leak preserves the scarcity that gives a secret its power and merely relocates that power to whoever leaked. The mystery survives its own exposure. Often it grows.

The actual opposite of classification is to make the work boring. Documented to the point of tedium, reproducible by strangers, free to the point of worthlessness as property. Nothing left to guard, nobody left to guard it from.

The file is fiction. The pages, the downloads, the replications, invented down to the digit. CC0 is real, and so is the tradition the ending argues from: open science, public archives, methods sections detailed enough that a stranger can check you.

Essay linked in bio.""",
}

SLIDE_FILENAMES = {
    1: [f"ig-slot1-slide0{i}.jpg" for i in range(1, 7)],
    2: [f"ig-slot2-slide0{i}.jpg" for i in range(1, 7)],
    3: [f"ig-slot3-slide0{i}.jpg" for i in range(1, 8)],
    4: [f"ig-slot4-slide0{i}.jpg" for i in range(1, 7)],
    5: [f"ig-slot5-slide0{i}.jpg" for i in range(1, 7)],
    6: [f"ig-slot6-slide0{i}.jpg" for i in range(1, 7)],
    7: [f"ig-slot7-slide0{i}.jpg" for i in range(1, 7)],
}

# ── Font helpers ──────────────────────────────────────────────────────────────

def _find_font(bold=False):
    """Try common sans-serif fonts on Windows, fall back to default."""
    candidates = (
        [
            r"C:\Windows\Fonts\arialbd.ttf",
            r"C:\Windows\Fonts\calibrib.ttf",
            r"C:\Windows\Fonts\segoeui.ttf",
        ]
        if bold
        else [
            r"C:\Windows\Fonts\arial.ttf",
            r"C:\Windows\Fonts\calibri.ttf",
            r"C:\Windows\Fonts\segoeui.ttf",
        ]
    )
    for path in candidates:
        if os.path.isfile(path):
            return path
    return None


def get_font(size, bold=False):
    path = _find_font(bold)
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


# ── Text overlay engine ───────────────────────────────────────────────────────

def overlay_text_on_image(img_path, out_path, headline, body):
    """
    Draw a semi-transparent dark bar on the bottom portion of the image
    and render the carousel text (bold headline + regular body) in white.
    """
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size

    bar_height = int(h * 0.28)
    bar_top = h - bar_height

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    draw_overlay.rectangle(
        [(0, bar_top), (w, h)],
        fill=(0, 0, 0, 175),
    )

    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    pad_x = int(w * 0.06)
    pad_y = int(bar_height * 0.12)
    text_area_w = w - 2 * pad_x

    full_text = headline + " " + body if headline and body else headline or body
    has_headline = bool(headline)

    head_size = _fit_headline_size(draw, headline, text_area_w) if has_headline else 0
    body_size = _fit_body_size(draw, body, text_area_w, bar_height, head_size, pad_y) if body else 0

    font_bold = get_font(head_size, bold=True) if has_headline else None
    font_reg = get_font(body_size, bold=False) if body else None

    y_cursor = bar_top + pad_y

    if has_headline and font_bold:
        wrapped_head = textwrap.fill(headline, width=_chars_per_line(draw, font_bold, text_area_w))
        draw.text((pad_x, y_cursor), wrapped_head, fill="white", font=font_bold)
        head_bbox = draw.multiline_textbbox((pad_x, y_cursor), wrapped_head, font=font_bold)
        y_cursor = head_bbox[3] + int(pad_y * 0.5)

    if body and font_reg:
        chars = _chars_per_line(draw, font_reg, text_area_w)
        wrapped_body = textwrap.fill(body, width=max(chars, 20))
        avail = h - pad_y - y_cursor
        body_bbox = draw.multiline_textbbox((0, 0), wrapped_body, font=font_reg)
        body_h = body_bbox[3] - body_bbox[1]
        if body_h > avail:
            body_size = max(int(body_size * avail / body_h) - 1, 18)
            font_reg = get_font(body_size, bold=False)
            chars = _chars_per_line(draw, font_reg, text_area_w)
            wrapped_body = textwrap.fill(body, width=max(chars, 20))
        draw.text((pad_x, y_cursor), wrapped_body, fill="white", font=font_reg)

    final = img.convert("RGB")
    final.save(out_path, "PNG")
    return True


def _fit_headline_size(draw, text, max_w, start=54, minimum=28):
    for size in range(start, minimum - 1, -1):
        font = get_font(size, bold=True)
        bbox = draw.textbbox((0, 0), text, font=font)
        if (bbox[2] - bbox[0]) <= max_w:
            return size
    return minimum


def _fit_body_size(draw, text, max_w, bar_h, head_size, pad_y):
    head_takes = int(head_size * 1.6) + pad_y if head_size else 0
    avail_h = bar_h - head_takes - pad_y * 2
    for size in range(38, 17, -1):
        font = get_font(size, bold=False)
        chars = _chars_per_line(draw, font, max_w)
        wrapped = textwrap.fill(text, width=max(chars, 20))
        bbox = draw.multiline_textbbox((0, 0), wrapped, font=font)
        text_h = bbox[3] - bbox[1]
        if text_h <= avail_h:
            return size
    return 18


def _chars_per_line(draw, font, max_w):
    avg_char_w = draw.textlength("abcdefghijklm", font=font) / 13
    if avg_char_w == 0:
        return 40
    return max(int(max_w / avg_char_w), 10)


# ── Outstand API helpers ──────────────────────────────────────────────────────

media_cache = {}


def upload_media(filepath, filename):
    key = str(filepath)
    if key in media_cache:
        return media_cache[key]

    file_size = os.path.getsize(filepath)

    ctype = "image/jpeg" if filename.lower().endswith((".jpg", ".jpeg")) else "image/png"
    r = SESSION.post(
        f"{BASE_URL}/media/upload",
        headers=HEADERS,
        json={"filename": filename, "content_type": ctype},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    media_id = data["id"]
    upload_url = data["upload_url"]

    with open(filepath, "rb") as f:
        raw = f.read()
    r2 = SESSION.put(upload_url, data=raw, headers={"Content-Type": ctype}, timeout=120)
    r2.raise_for_status()

    r3 = SESSION.post(
        f"{BASE_URL}/media/{media_id}/confirm",
        headers=HEADERS,
        json={"size": file_size},
        timeout=60,
    )
    r3.raise_for_status()
    media_url = r3.json()["data"]["url"]

    media_cache[key] = {"url": media_url, "filename": filename}
    return media_cache[key]


def list_ig_posts():
    """Return list of Outstand post objects targeting the IG account."""
    r = SESSION.get(f"{BASE_URL}/posts?limit=100", headers=HEADERS, timeout=60)
    r.raise_for_status()
    posts = r.json().get("posts") or r.json().get("data") or []
    ig_posts = []
    for p in posts:
        for sa in p.get("socialAccounts", []):
            if sa.get("id") == IG_ACCOUNT:
                ig_posts.append(p)
                break
    return ig_posts


def delete_post(post_id):
    r = SESSION.delete(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=60)
    return r.status_code, r.json() if r.content else {}


def create_post(content, media_list):
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": m["url"], "filename": m["filename"]} for m in media_list],
            }
        ],
        "accounts": [IG_ACCOUNT],
    }
    r = SESSION.post(f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll_post(post_id, attempts=24):
    for _ in range(attempts):
        r = SESSION.get(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data")
        if not post:
            time.sleep(3)
            continue
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == IG_ACCOUNT]
        sa = accounts[0] if accounts else {}
        if sa.get("status") in ("published", "failed") or post.get("publishedAt") or sa.get("platformPostUrl"):
            return post
        time.sleep(3)
    return None


# ── Main pipeline ─────────────────────────────────────────────────────────────

def main():
    post_only = "--post-only" in sys.argv
    slot_args = [int(a) for a in sys.argv[1:] if a.isdigit()]
    slots = slot_args or list(range(1, 8))

    report = {
        "slides_processed": 0,
        "text_fit_issues": [],
        "deleted_posts": [],
        "new_posts": [],
        "slots": slots,
        "post_only": post_only,
    }

    # ── PHASE 1: Elevated overlays (EB Garamond / Cinzel field-note system) ──
    print("=" * 60)
    print("PHASE 1: Elevated carousel overlays (overlay_carousel.py)")
    print("=" * 60)

    if post_only:
        report["slides_processed"] = sum(
            len(list((OUT_DIR / f"slot{s}").glob("*.jpg"))) for s in range(1, 8)
        )
        print(f"  --post-only: skipping regen; {report['slides_processed']} JPEGs already on disk")
    else:
        sys.path.insert(0, str(ROOT / "scripts"))
        from overlay_carousel import process_all

        process_all()
        report["slides_processed"] = sum(
            len(list((OUT_DIR / f"slot{s}").glob("*.jpg"))) for s in range(1, 8)
        )
        print(f"\n  Total overlaid JPEGs on disk: {report['slides_processed']}")

    # ── PHASE 2: Delete existing Instagram posts ─────────────────────────────
    print("\n" + "=" * 60)
    print("PHASE 2: Deleting existing Instagram posts")
    print("=" * 60)

    try:
        existing = list_ig_posts()
        print(f"  Found {len(existing)} existing IG posts")
        for p in existing:
            pid = p["id"]
            containers = p.get("containers", [{}])
            media_list = containers[0].get("media", []) if containers else []
            media_count = len(media_list)
            snippet = p.get("containers", [{}])[0].get("content", "")[:60]
            print(f"  Deleting {pid} ({media_count} media): {snippet}...")
            try:
                sc, resp = delete_post(pid)
                report["deleted_posts"].append({"id": pid, "status": sc})
                print(f"    {'OK' if sc in (200, 204) else 'WARN'} (HTTP {sc})")
            except Exception as e:
                print(f"    FAIL: {e}")
                report["deleted_posts"].append({"id": pid, "error": str(e)})
            time.sleep(1)
    except Exception as e:
        print(f"  Error listing posts: {e}")

    time.sleep(2)

    # ── PHASE 3: Upload overlaid images & re-post ────────────────────────────
    print("\n" + "=" * 60)
    print("PHASE 3: Uploading overlaid images and creating new IG posts")
    print("=" * 60)

    for slot in slots:
        filenames = SLIDE_FILENAMES[slot]
        slot_dir = OUT_DIR / f"slot{slot}"

        print(f"\n  Slot {slot}: uploading {len(filenames)} slides")

        slide_medias = []
        for fn in filenames:
            fpath = slot_dir / fn
            if not fpath.exists():
                print(f"    SKIP {fn}: overlaid file not found")
                continue
            try:
                m = upload_media(str(fpath), fn)
                slide_medias.append(m)
                print(f"    Uploaded {fn}")
            except Exception as e:
                print(f"    FAIL upload {fn}: {e}")

        if not slide_medias:
            print(f"    No slides uploaded for slot {slot}, skipping post")
            report["new_posts"].append({"slot": slot, "success": False, "error": "no slides"})
            continue

        caption = IG_CAPTIONS[slot]
        print(f"  Creating IG carousel post (slot {slot}, {len(slide_medias)} slides)...")
        try:
            sc, resp = create_post(caption, slide_medias)
            success = sc in (200, 201) and resp.get("success", False)
            post_data = resp.get("post") or resp.get("data") or {}
            post_id = post_data.get("id")

            if success and post_id:
                print(f"    Post created: {post_id}, polling...")
                outcome = poll_post(post_id)
                src = outcome or post_data
                ig_accts = [
                    a for a in src.get("socialAccounts", [])
                    if a.get("id") == IG_ACCOUNT
                ]
                status = ig_accts[0].get("status") if ig_accts else None
                url = ig_accts[0].get("platformPostUrl") if ig_accts else None
                err = ig_accts[0].get("error") if ig_accts else None
                if not status and src.get("publishedAt"):
                    status = "published"
                print(f"    Status: {status} | URL: {url or 'pending'}")
                if err:
                    print(f"    Error: {err}")
                report["new_posts"].append({
                    "slot": slot,
                    "success": status == "published",
                    "post_id": post_id,
                    "status": status,
                    "url": url,
                    "error": err,
                    "slides": len(slide_medias),
                })
            else:
                print(f"    FAILED ({sc}): {json.dumps(resp)[:300]}")
                report["new_posts"].append({"slot": slot, "success": False, "status_code": sc, "response": resp})

        except Exception as e:
            print(f"    ERROR: {e}")
            report["new_posts"].append({"slot": slot, "success": False, "error": str(e)})

        time.sleep(2)

    # ── Summary ──────────────────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("FINAL REPORT")
    print("=" * 60)
    print(f"  Slides processed: {report['slides_processed']}")
    print(f"  Posts deleted: {len(report['deleted_posts'])}")
    ok = [p for p in report["new_posts"] if p.get("success")]
    print(f"  New posts created: {len(ok)}/{len(report['new_posts'])}")
    if report["text_fit_issues"]:
        print(f"  Text fit issues: {len(report['text_fit_issues'])}")
        for issue in report["text_fit_issues"]:
            print(f"    - {issue}")
    print()
    for p in report["new_posts"]:
        s = "OK" if p.get("success") else "FAIL"
        detail = p.get("url") or p.get("post_id") or p.get("error") or p.get("status", "")
        print(f"  [{s}] Slot {p['slot']}: {detail}")

    results_path = ROOT / ".ig-carousel-overlay-results.json"
    results_path.write_text(json.dumps(report, indent=2, default=str), encoding="utf-8")
    print(f"\n  Results saved: {results_path}")

    return len(ok) == len(slots)


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
