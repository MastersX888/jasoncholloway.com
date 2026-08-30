"""
Delete existing Instagram posts and repost with text-overlaid carousel images.
Uses the Outstand API for media upload + post creation.
"""

import os
import sys
import json
import time
import ssl
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OVERLAID_DIR = os.path.join(BASE, "public", "social", "imagen-overlaid")
SOCIAL_MD = os.path.join(BASE, "content", "blog", "SOCIAL_FROM_BLOG.md")

API_BASE = "https://api.outstand.so/v1"
ACCOUNT_ID = "1vWPG"

from dotenv import load_dotenv
load_dotenv(os.path.join(BASE, ".env"))
API_KEY = os.environ.get("OUTSTAND_API_KEY")
if not API_KEY:
    print("ERROR: OUTSTAND_API_KEY not found in .env")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}


class TLSAdapter(HTTPAdapter):
    """Force TLS 1.2 for compatibility with the Outstand API."""
    def init_poolmanager(self, *args, **kwargs):
        ctx = ssl.create_default_context()
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        ctx.maximum_version = ssl.TLSVersion.TLSv1_3
        kwargs["ssl_context"] = ctx
        return super().init_poolmanager(*args, **kwargs)


session = requests.Session()
retry = Retry(total=3, backoff_factor=2, status_forcelist=[502, 503, 504])
adapter = TLSAdapter(max_retries=retry)
session.mount("https://", adapter)

CAPTIONS = {
    1: (
        "110 Hz is measured. 111.2 Hz is mine.\n\n"
        "The Ħal-Saflieni Hypogeum is an underground temple complex in Malta, carved from limestone somewhere between 3600 and 2500 BCE. Eighty visitors a day are allowed inside. In the Oracle Chamber, researchers have documented a pronounced resonance around 110 to 111 Hz.\n\n"
        "Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band at Neolithic chambers across Britain and Ireland. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.\n\n"
        "That is the documented part, caveats included. The neurological study often cited had a small sample, and one study is one study.\n\n"
        "The trilogy runs on 111.2 Hz instead. The extra decimal is the fiction signing its own work: close enough to honor the research, far enough that nobody mistakes my invention for their measurement.\n\n"
        "Full essay linked in bio. Research layer at jasoncholloway.com/field-notes/111-hz/"
    ),
    2: (
        "Sound has shapes. That part is not mystical. It is 1787.\n\n"
        "Ernst Chladni drew a violin bow along a sand-covered metal plate and showed that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it.\n\n"
        "Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern rather than nudging it, and how patterns collapse when the tone stops and return identically when it resumes.\n\n"
        "That is the real floor under everything strange in my trilogy. Here is the ceiling: nothing in the research says that looking at one of these patterns changes the person looking. The novels claim it does. That claim is mine, and I would rather name it than let it pass as physics.\n\n"
        "Essay linked in bio. Research at jasoncholloway.com/field-notes/cymatics/"
    ),
    3: (
        "Four traditions looked at the same thirty miles of Missouri river bluff and decided, in vocabularies that never borrowed from each other, that this ground matters.\n\n"
        "The Hopewell built rooms inside their burial mounds here: stone-vault tombs with doorways, roughly thirty documented sites at the westernmost edge of the tradition.\n\n"
        "The Osage, whose historic corridor runs through western Missouri, carry the concept of Wah-kon-tah, the sacred mystery that connects everything. Practiced, not notated. My trilogy is about people building machinery to reach something one of this continent's older traditions simply did.\n\n"
        "In 1831 Independence was declared the center place of Zion, and a sixty-three-acre parcel was dedicated for a temple that was never built. The lot is still mowed.\n\n"
        "Underneath all of it: Bethany Falls limestone, quarried until the hollowed chambers became SubTropolis, where about seventeen hundred people go to work underground every day.\n\n"
        "And the gap I will not paper over: no one has published an acoustics study of the Kansas City underground. The novel is sited here. It is not sourced here.\n\n"
        "Essay in bio \u00b7 jasoncholloway.com/field-notes/kansas-city-locations/"
    ),
    4: (
        "A medieval grimoire condemned as cheating.\n\n"
        "The Ars Notoria belongs to the Solomonic tradition, with surviving manuscripts from the mid-thirteenth century, institutional copies including British Library MS Sloane 1712, and an English translation by Robert Turner in 1657. Claire Fanger and Juli\u00e9n V\u00e9ron\u00e8se have spent careers on it.\n\n"
        "Its promise: the seven liberal arts, meaning grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy, acquired through structured contemplation of dense geometric figures paired with scheduled prayer.\n\n"
        "The condemnation was not about demons. It was about shortcuts: knowledge obtained without the sanctioned labor of study.\n\n"
        "And condemned books in the manuscript era did not vanish. They went expensive, copied on good vellum for centuries by patrons who privately decided the text was worth the risk.\n\n"
        "Everything above is on the record. What my trilogy adds is one claim: that the method works, and here is how. No historian claims that. No cognitive scientist claims that. It is the one experiment the lab has never run, and that gap is where the fiction lives.\n\n"
        "Essay in bio \u00b7 jasoncholloway.com/field-notes/ars-notoria/"
    ),
    5: (
        "The fire took everything except the walls.\n\n"
        "Westport Presbyterian Church was built in 1904, in the neighborhood that was once the last outfitting stop for wagon trains heading west. In 2011 it burned. Roof, sanctuary, woodwork, a century of accumulated interior, all gone. Photographs from the next morning show the 1904 limestone standing at full height around a burned-out shell, smoke-darkened and roofless.\n\n"
        "The congregation rebuilt inside the standing walls. The fire could erase the contents but not the fact of the church, because the fact was mineral.\n\n"
        "\"The stone remembers\" was in my manuscript before I found the fire. It had been sitting there, a metaphor waiting on a warrant. Too round, too quotable, the kind of line a novelist should distrust. Then a research pass turned up this fire four miles from my desk, and the warrant had been on the public record the whole time.\n\n"
        "Nothing was predicted. Church fires are not rare. What changed was the line's standing: a metaphor that earned its keep.\n\n"
        "Essay in bio \u00b7 jasoncholloway.com/field-notes/kansas-city-locations/"
    ),
    6: (
        "One government published. The other classified the act of reading.\n\n"
        "In 1984 American intelligence took a Chinese government journal on paranormal research, translated it for internal circulation, and filed it. On one side: a state research establishment studying claims of extraordinary human capacities in the open, with a commission, conferences, funded experiments, and a journal you could subscribe to. On the other: an agency that reads the journal and stamps the translation.\n\n"
        "Two governments, one subject, opposite policies. That asymmetry is the political physics of my whole trilogy, and it came from the record rather than from me.\n\n"
        "Inside the translated material the debate sorts into three postures: suppress the work, verify it in daylight, or attend to what it might be used for. Those became the Custodians, the Keepers, and the Completion Sect.\n\n"
        "One caveat: the three-way sort is my reading, not a heading in the document. The file is public. Anyone who reads it differently has something worth hearing.\n\n"
        "Essay linked in bio."
    ),
    7: (
        "The trilogy ends with a license.\n\n"
        "Two hundred forty-seven pages go onto the open internet at midnight under CC0, the license that reserves nothing, not even attribution. An eight-hundred-year war over a secret simply loses its object.\n\n"
        "The argument inside the fiction: the intuitive opposite of classification is leaking, and that intuition is wrong. A leak preserves the scarcity that gives a secret its power and merely relocates that power to whoever leaked. The mystery survives its own exposure. Often it grows.\n\n"
        "The actual opposite of classification is to make the work boring. Documented to the point of tedium, reproducible by strangers, free to the point of worthlessness as property. Nothing left to guard, nobody left to guard it from.\n\n"
        "The file is fiction. The pages, the downloads, the replications, invented down to the digit. CC0 is real, and so is the tradition the ending argues from: open science, public archives, methods sections detailed enough that a stranger can check you.\n\n"
        "Essay linked in bio."
    ),
}

SLIDE_COUNTS = {1: 6, 2: 6, 3: 7, 4: 6, 5: 6, 6: 6, 7: 6}


def api_get(path, params=None):
    r = session.get(f"{API_BASE}{path}", headers=HEADERS, params=params)
    r.raise_for_status()
    return r.json()


def api_post(path, data=None):
    r = session.post(f"{API_BASE}{path}", headers=HEADERS, json=data)
    r.raise_for_status()
    return r.json()


def api_delete(path):
    r = session.delete(f"{API_BASE}{path}", headers=HEADERS)
    r.raise_for_status()
    return r.status_code


def delete_existing_posts():
    """Find and delete all posts for the Instagram account."""
    print("=== Fetching existing posts ===")
    resp = api_get("/posts", params={"limit": 100})
    posts = resp if isinstance(resp, list) else resp.get("data", resp.get("posts", []))

    ig_posts = []
    for post in posts:
        accounts = post.get("accounts", [])
        account_ids = []
        for a in accounts:
            if isinstance(a, str):
                account_ids.append(a)
            elif isinstance(a, dict):
                account_ids.append(a.get("id", ""))
        if ACCOUNT_ID in account_ids:
            ig_posts.append(post)

    print(f"Found {len(ig_posts)} posts for account {ACCOUNT_ID}")

    deleted = 0
    for post in ig_posts:
        pid = post.get("id", post.get("_id", ""))
        try:
            api_delete(f"/posts/{pid}")
            print(f"  Deleted post {pid}")
            deleted += 1
            time.sleep(0.5)
        except Exception as e:
            print(f"  Failed to delete {pid}: {e}")

    print(f"Deleted {deleted} posts total")
    return deleted


def upload_media(filepath):
    """Upload a single image via the 3-step Outstand media flow."""
    filename = os.path.basename(filepath)
    file_size = os.path.getsize(filepath)

    step1 = api_post("/media/upload", {
        "filename": filename,
        "content_type": "image/png"
    })
    media_id = step1.get("id", step1.get("media_id", ""))
    upload_url = step1.get("upload_url", step1.get("url", ""))

    with open(filepath, "rb") as f:
        raw_bytes = f.read()
    put_resp = session.put(upload_url, data=raw_bytes, headers={
        "Content-Type": "image/png"
    })
    put_resp.raise_for_status()

    confirm = api_post(f"/media/{media_id}/confirm", {"size": file_size})

    media_url = confirm.get("url", confirm.get("media_url", step1.get("url", "")))
    return {"url": media_url, "filename": filename, "id": media_id}


def create_post(slot, media_items):
    """Create a carousel post with all slide media + caption."""
    caption = CAPTIONS[slot]
    media_payload = [{"url": m["url"], "filename": m["filename"]} for m in media_items]

    post_data = {
        "containers": [{
            "content": caption,
            "media": media_payload
        }],
        "accounts": [ACCOUNT_ID]
    }

    resp = api_post("/posts/", post_data)
    post_id = resp.get("id", resp.get("_id", "unknown"))
    return post_id


def main():
    print("=" * 60)
    print("Instagram Carousel Repost with Text Overlays")
    print("=" * 60)

    deleted = delete_existing_posts()
    print()

    if deleted > 0:
        print("Waiting 3 seconds before reposting...")
        time.sleep(3)

    new_post_ids = []
    total_slides_uploaded = 0

    for slot in range(1, 8):
        slide_count = SLIDE_COUNTS[slot]
        slot_dir = os.path.join(OVERLAID_DIR, f"slot{slot}")

        print(f"\n=== Slot {slot}: {slide_count} slides ===")

        media_items = []
        for slide_idx in range(1, slide_count + 1):
            fname = f"ig-slot{slot}-slide{slide_idx:02d}.png"
            fpath = os.path.join(slot_dir, fname)

            if not os.path.exists(fpath):
                print(f"  WARNING: {fpath} not found, skipping")
                continue

            print(f"  Uploading {fname}...", end=" ", flush=True)
            try:
                media = upload_media(fpath)
                media_items.append(media)
                total_slides_uploaded += 1
                print("OK")
            except Exception as e:
                print(f"FAILED: {e}")

            time.sleep(0.3)

        if media_items:
            print(f"  Creating carousel post for slot {slot}...", end=" ", flush=True)
            try:
                post_id = create_post(slot, media_items)
                new_post_ids.append({"slot": slot, "post_id": post_id})
                print(f"OK (id: {post_id})")
            except Exception as e:
                print(f"FAILED: {e}")
        else:
            print(f"  No media uploaded for slot {slot}, skipping post creation")

        time.sleep(1)

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Posts deleted: {deleted}")
    print(f"Total slides uploaded: {total_slides_uploaded}")
    print(f"New posts created: {len(new_post_ids)}")
    for p in new_post_ids:
        print(f"  Slot {p['slot']}: post ID {p['post_id']}")


if __name__ == "__main__":
    main()
