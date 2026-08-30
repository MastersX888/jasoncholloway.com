#!/usr/bin/env python3
"""
Delete prior X / Facebook / Pinterest essay posts and re-publish with
elevated platform-overlaid heroes (public/social/platform-overlaid/*.jpg).
"""

from __future__ import annotations

import json
import os
import ssl
import sys
import time
from pathlib import Path

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
PLAT_DIR = ROOT / "public" / "social" / "platform-overlaid"
BASE_URL = "https://api.outstand.so/v1"
RESULTS_PATH = ROOT / ".platform-overlaid-post-results.json"

ACCOUNTS = {
    "x": "oPCuc",
    "fb_author": "7BvrW",
    "fb_scp": "IwQhX",
    "pinterest": "pxPfM",
}

# Known Seventh City Press board from pinterest-agent (fallback if list fails)
DEFAULT_PINTEREST_BOARD = "1110700395541688804"

ENV = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

API_KEY = ENV["OUTSTAND_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}


class TLSAdapter(HTTPAdapter):
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

X_POSTS = {
    1: """Every page of the Distribution File in my trilogy carries the same footer: f = 111.2 Hz.

The number is fiction. The stone under it isn't.

Archaeoacousticians have documented a resonance near 110 Hz in Neolithic chambers from Malta to Scotland. The extra decimal is the fiction signing its own work.

jasoncholloway.com/blog/the-frequency-that-was-already-there/""",
    2: """The oldest special effect in my trilogy needs no computer.

A metal plate. A violin bow. A spoonful of sand.

Draw the bow and the sand jumps into a geometric figure. Chladni demonstrated it in 1787. You can do it on your kitchen table tonight.

jasoncholloway.com/blog/sound-into-form-hans-jenny/""",
    3: """I set a conspiracy trilogy in Kansas City, and I expected it would read as hometown convenience.

Then the research started. Around the second century, people on these river bluffs were building stone-vault tombs: rooms with doorways, sealed inside burial mounds.

Chamber-building here predates Rome's fall.

jasoncholloway.com/blog/why-kansas-city/""",
    4: """The medieval Church condemned the Ars Notoria. Not for devil-worship, but for cheating.

The manuscript promised the seven liberal arts through contemplation of geometric figures and scheduled prayer. Knowledge without the sanctioned labor of study.

It is real. British Library, MS Sloane 1712.

jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/""",
    5: """In 2011 a Kansas City church burned. The fire took the roof, the sanctuary, the woodwork, everything a hundred and seven years had accumulated inside.

The 1904 limestone walls stood.

"The stone remembers" was in my manuscript before I found the fire. The fire was already on the public record.

jasoncholloway.com/blog/the-stone-remembers/""",
    6: """In 1984, American intelligence translated a Chinese government journal on paranormal research and filed the translation.

Two governments, one subject, opposite policies. One published. The other classified the act of reading.

That asymmetry is the politics of my entire trilogy.

jasoncholloway.com/blog/three-factions-one-declassified-document/""",
    7: """My conspiracy trilogy ends with a license.

Not a chamber stormed, not a patriarch unmasked. A 247-page file goes onto the open internet at midnight under CC0, and an eight-hundred-year war loses its object.

jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/""",
}

FB_AUTHOR = {
    1: """110 Hz is measured. 111.2 Hz is mine.

The Hal-Saflieni Hypogeum is an underground temple complex in Malta, carved from limestone somewhere between 3600 and 2500 BCE. Eighty visitors a day are allowed inside. In the Oracle Chamber, researchers have documented a pronounced resonance around 110 to 111 Hz.

Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band at Neolithic chambers across Britain and Ireland. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.

That is the documented part, caveats included. The neurological study often cited had a small sample, and one study is one study.

The trilogy runs on 111.2 Hz instead. The extra decimal is the fiction signing its own work: close enough to honor the research, far enough that nobody mistakes my invention for their measurement.

Full essay: jasoncholloway.com/blog/the-frequency-that-was-already-there/
Research: jasoncholloway.com/field-notes/111-hz/""",
    2: """Sound has shapes. That part is not mystical. It is 1787.

Ernst Chladni drew a violin bow along a sand-covered metal plate and showed that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it.

Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern rather than nudging it, and how patterns collapse when the tone stops and return identically when it resumes.

That is the real floor under everything strange in my trilogy. Here is the ceiling: nothing in the research says that looking at one of these patterns changes the person looking. The novels claim it does. That claim is mine, and I would rather name it than let it pass as physics.

Essay: jasoncholloway.com/blog/sound-into-form-hans-jenny/
Research: jasoncholloway.com/field-notes/cymatics/""",
    3: """Four traditions looked at the same thirty miles of Missouri river bluff and decided, in vocabularies that never borrowed from each other, that this ground matters.

The Hopewell built rooms inside their burial mounds here: stone-vault tombs with doorways, roughly thirty documented sites at the westernmost edge of the tradition.

The Osage, whose historic corridor runs through western Missouri, carry the concept of Wah-kon-tah, the sacred mystery that connects everything. Practiced, not notated. My trilogy is about people building machinery to reach something one of this continent's older traditions simply did.

In 1831 Independence was declared the center place of Zion, and a sixty-three-acre parcel was dedicated for a temple that was never built. The lot is still mowed.

Underneath all of it: Bethany Falls limestone, quarried until the hollowed chambers became SubTropolis, where about seventeen hundred people go to work underground every day.

And the gap I will not paper over: no one has published an acoustics study of the Kansas City underground. The novel is sited here. It is not sourced here.

Essay: jasoncholloway.com/blog/why-kansas-city/
Research: jasoncholloway.com/field-notes/kansas-city-locations/""",
    4: """A medieval grimoire condemned as cheating.

The Ars Notoria belongs to the Solomonic tradition, with surviving manuscripts from the mid-thirteenth century, institutional copies including British Library MS Sloane 1712, and an English translation by Robert Turner in 1657. Claire Fanger and Julien Veronese have spent careers on it.

Its promise: the seven liberal arts, meaning grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy, acquired through structured contemplation of dense geometric figures paired with scheduled prayer.

The condemnation was not about demons. It was about shortcuts: knowledge obtained without the sanctioned labor of study.

And condemned books in the manuscript era did not vanish. They went expensive, copied on good vellum for centuries by patrons who privately decided the text was worth the risk.

Everything above is on the record. What my trilogy adds is one claim: that the method works, and here is how. No historian claims that. No cognitive scientist claims that. It is the one experiment the lab has never run, and that gap is where the fiction lives.

Essay: jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/
Research: jasoncholloway.com/field-notes/ars-notoria/""",
    5: """The fire took everything except the walls.

Westport Presbyterian Church was built in 1904, in the neighborhood that was once the last outfitting stop for wagon trains heading west. In 2011 it burned. Roof, sanctuary, woodwork, a century of accumulated interior, all gone. Photographs from the next morning show the 1904 limestone standing at full height around a burned-out shell, smoke-darkened and roofless.

The congregation rebuilt inside the standing walls. The fire could erase the contents but not the fact of the church, because the fact was mineral.

"The stone remembers" was in my manuscript before I found the fire. It had been sitting there, a metaphor waiting on a warrant. Too round, too quotable, the kind of line a novelist should distrust. Then a research pass turned up this fire four miles from my desk, and the warrant had been on the public record the whole time.

Nothing was predicted. Church fires are not rare. What changed was the line's standing: a metaphor that earned its keep.

Essay: jasoncholloway.com/blog/the-stone-remembers/
Research: jasoncholloway.com/field-notes/kansas-city-locations/""",
    6: """One government published. The other classified the act of reading.

In 1984 American intelligence took a Chinese government journal on paranormal research, translated it for internal circulation, and filed it. On one side: a state research establishment studying claims of extraordinary human capacities in the open, with a commission, conferences, funded experiments, and a journal you could subscribe to. On the other: an agency that reads the journal and stamps the translation.

Two governments, one subject, opposite policies. That asymmetry is the political physics of my whole trilogy, and it came from the record rather than from me.

Inside the translated material the debate sorts into three postures: suppress the work, verify it in daylight, or attend to what it might be used for. Those became the Custodians, the Keepers, and the Completion Sect.

One caveat: the three-way sort is my reading, not a heading in the document. The file is public. Anyone who reads it differently has something worth hearing.

Essay: jasoncholloway.com/blog/three-factions-one-declassified-document/""",
    7: """The trilogy ends with a license.

Two hundred forty-seven pages go onto the open internet at midnight under CC0, the license that reserves nothing, not even attribution. An eight-hundred-year war over a secret simply loses its object.

The argument inside the fiction: the intuitive opposite of classification is leaking, and that intuition is wrong. A leak preserves the scarcity that gives a secret its power and merely relocates that power to whoever leaked. The mystery survives its own exposure. Often it grows.

The actual opposite of classification is to make the work boring. Documented to the point of tedium, reproducible by strangers, free to the point of worthlessness as property. Nothing left to guard, nobody left to guard it from.

The file is fiction. The pages, the downloads, the replications, invented down to the digit. CC0 is real, and so is the tradition the ending argues from: open science, public archives, methods sections detailed enough that a stranger can check you.

Essay: jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/""",
}

# Publisher voice (Seventh City Press) — keep existing catalog copy, not hard-sell
FB_SCP = {
    1: """Every page of the Distribution File in the Masters X Trilogy carries the same footer: f = 111.2 Hz.

The number is fiction. The science underneath is not.

Archaeoacousticians have documented a recurring resonance near 110 Hz in ancient stone chambers, from the Hal-Saflieni Hypogeum in Malta to Neolithic cairns across Britain and Ireland. Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.

Our author Jason Carroll Holloway built the trilogy on that research, then moved one decimal past it. The extra tenth of a hertz is the fiction signing its own work: close enough to honor what has been measured, far enough that nobody mistakes his invention for their data.

This is the first in a series of essays where Holloway opens the research layer behind the novels, one source at a time, with the caveats left in.

Read the full essay: jasoncholloway.com/blog/the-frequency-that-was-already-there/
Research notes: jasoncholloway.com/field-notes/111-hz/""",
    2: """A metal plate. A violin bow. A spoonful of sand.

In 1787 Ernst Chladni drew a bow along a sand-covered plate and demonstrated that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it on a kitchen table.

Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern categorically, and how patterns collapse when the tone stops and return identically when it resumes.

That is the real floor under everything strange in the Masters X Trilogy. Jason Carroll Holloway built three novels on what happens in the gap between the demonstrated and the imagined. Sound organizes matter: measured. The resulting geometry reorganizes the observer: invented. Holloway names the distinction, because a novel that borrows the authority of physics for claims physics has not made is a novel that has lost its footing.

Read the full essay: jasoncholloway.com/blog/sound-into-form-hans-jenny/
Research notes: jasoncholloway.com/field-notes/cymatics/""",
    3: """Four traditions looked at the same thirty miles of Missouri river bluff and decided, in vocabularies that never borrowed from each other, that this ground matters.

The Hopewell built stone-vault tombs inside their burial mounds here, roughly thirty documented sites at the westernmost edge of the tradition. The Osage, whose historic corridor runs through western Missouri, carry the concept of Wah-kon-tah, the sacred mystery that connects everything. In 1831 Independence was declared the center place of Zion, and a sixty-three-acre temple parcel was dedicated for a building that was never constructed. The lot is still mowed. And underneath all of it sits Bethany Falls limestone, quarried so thoroughly that the hollowed chambers became SubTropolis, where about seventeen hundred people go to work underground every day.

Jason Carroll Holloway set the Masters X Trilogy here because he lives here, and then the research complicated that convenience. He is also careful to name the gap: no one has published an acoustics study of the Kansas City underground. The fiction is sited here, not sourced here, and Holloway would rather say so than let the reader assume otherwise.

Read the full essay: jasoncholloway.com/blog/why-kansas-city/
Research notes: jasoncholloway.com/field-notes/kansas-city-locations/""",
    4: """The medieval Church condemned the Ars Notoria. Not for devil-worship, but for cheating.

The manuscript belongs to the Solomonic tradition, with surviving copies from the mid-thirteenth century and institutional holdings including British Library MS Sloane 1712. Its promise: the seven liberal arts, acquired through structured contemplation of dense geometric figures paired with scheduled prayer. Knowledge without the sanctioned labor of study. That was the offense.

Condemned books in the manuscript era did not vanish. They went expensive, copied on good vellum for centuries by patrons who privately decided the text was worth the risk.

Jason Carroll Holloway uses the Ars Notoria as source material in the Masters X Trilogy, and he is precise about where the record ends and his invention begins. The manuscript is real. The scholarly literature from Claire Fanger and Julien Veronese is real. What Holloway added is one narrow claim: that the method works, and here is how. No historian claims that. No cognitive scientist claims that. It is the one experiment the lab has never run, and that gap is where the fiction lives.

Read the full essay: jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/
Research notes: jasoncholloway.com/field-notes/ars-notoria/""",
    5: """In 2011 Westport Presbyterian Church burned. The fire took the roof, the sanctuary, the woodwork, everything a hundred and seven years had accumulated inside. The 1904 limestone walls stood.

The congregation rebuilt inside the standing walls. The fire could erase the contents but not the fact of the church, because the fact was mineral.

"The stone remembers" was in Jason Carroll Holloway's manuscript before his research turned up the fire four miles from his desk. The phrase had been sitting there, a metaphor waiting on a warrant. Then a research pass found the warrant on the public record, and the line earned its keep.

Holloway also caught himself in the same essay: an early draft described the Cathedral of the Immaculate Conception as limestone. It is red brick, 1882 to 1912, with the gold dome added in 1960. Getting the physical city right matters to Holloway more than almost anything else in this project, and the correction stayed in the essay because honesty about the process is part of what Seventh City Press publishes.

Read the full essay: jasoncholloway.com/blog/the-stone-remembers/
Research notes: jasoncholloway.com/field-notes/kansas-city-locations/""",
    6: """In 1984 American intelligence took a Chinese government journal on paranormal research, translated it for internal circulation, and filed the translation. On one side: a state research establishment studying claims of extraordinary human capacities in the open. On the other: an agency that reads the journal and stamps the translation.

Two governments, one subject, opposite policies. That asymmetry is the political physics of the entire Masters X Trilogy.

Jason Carroll Holloway found that the debate inside the translated material sorts into three postures: suppress the work, verify it in daylight, or attend to what it might be used for. Those became the trilogy's three factions, the Custodians, the Keepers, and the Completion Sect. The positions were already in the record, already arguing. Holloway organized them.

He includes a caveat we think is worth highlighting: the three-way sort is his reading of the translated material, not a heading inside it. The file is public. Anyone who reads it differently has something worth hearing.

Read the full essay: jasoncholloway.com/blog/three-factions-one-declassified-document/""",
    7: """The Masters X Trilogy ends with a license.

Not a chamber stormed, not a patriarch unmasked. A 247-page file goes onto the open internet at midnight under CC0, the license that reserves nothing, not even attribution, and an eight-hundred-year war over a secret simply loses its object.

Jason Carroll Holloway's argument inside the fiction: the intuitive opposite of classification is leaking, and that intuition is wrong. A leak preserves the scarcity that gives a secret its power and merely relocates that power to whoever leaked. The mystery survives its own exposure. Often it grows.

The actual opposite of classification, Holloway argues, is to make the work boring. Documented to the point of tedium, reproducible by strangers, free to the point of worthlessness as property. Nothing left to guard, nobody left to guard it from.

The file is fiction. The pages, the downloads, the replications, invented down to the digit. But CC0 is real. Open science is real. And the tradition the ending argues from, public archives, methods sections detailed enough that a stranger can check you, is the tradition this press was built to support.

Read the full essay: jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/""",
}

PINTEREST = {
    1: {
        "title": "The Frequency That Was Already There",
        "text": "Archaeoacousticians documented a resonance near 110 Hz in Neolithic chambers from Malta to Scotland. The Masters X Trilogy uses 111.2 Hz instead. The extra decimal is the fiction signing its own work.",
        "link": "https://jasoncholloway.com/blog/the-frequency-that-was-already-there/",
        "img": "pinterest-slot1-frequency.jpg",
    },
    2: {
        "title": "Sound Into Form: Hans Jenny and Cymatics",
        "text": "A metal plate, a violin bow, a spoonful of sand. Chladni demonstrated it in 1787. Hans Jenny made it a discipline. The Masters X Trilogy asks: what if the geometry remakes the observer?",
        "link": "https://jasoncholloway.com/blog/sound-into-form-hans-jenny/",
        "img": "pinterest-slot2-cymatics.jpg",
    },
    3: {
        "title": "Why Kansas City?",
        "text": "Four traditions looked at the same thirty miles of Missouri river bluff and decided this ground matters. Hopewell stone-vault tombs, Wah-kon-tah, a temple lot still mowed, and limestone quarried into SubTropolis.",
        "link": "https://jasoncholloway.com/blog/why-kansas-city/",
        "img": "pinterest-slot3-kansas-city.jpg",
    },
    4: {
        "title": "The Grimoire That Was a Study Aid",
        "text": "The Ars Notoria, a medieval manuscript condemned not for devil-worship but for cheating. It promised the seven liberal arts through contemplation of geometric figures. British Library, MS Sloane 1712.",
        "link": "https://jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/",
        "img": "pinterest-slot4-ars-notoria.jpg",
    },
    5: {
        "title": "The Stone Remembers",
        "text": "In 2011 a Kansas City church burned. The fire took everything except the 1904 limestone walls. The congregation rebuilt inside them. The fact of the church was mineral.",
        "link": "https://jasoncholloway.com/blog/the-stone-remembers/",
        "img": "pinterest-slot5-stone-remembers.jpg",
    },
    6: {
        "title": "Three Factions, One Declassified Document",
        "text": "In 1984 American intelligence translated a Chinese journal on paranormal research. Two governments, one subject, opposite policies. That asymmetry drives the Masters X Trilogy.",
        "link": "https://jasoncholloway.com/blog/three-factions-one-declassified-document/",
        "img": "pinterest-slot6-three-factions.jpg",
    },
    7: {
        "title": "A Document That Cannot Be Un-Released",
        "text": "A conspiracy trilogy that ends not with a confrontation but a license. 247 pages, midnight, CC0. The opposite of classification is not leaking. It is boredom.",
        "link": "https://jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/",
        "img": "pinterest-slot7-unreleased.jpg",
    },
}

XFB_IMAGES = {
    1: "slot1-frequency-xfb.jpg",
    2: "slot2-cymatics-xfb.jpg",
    3: "slot3-kansas-city-xfb.jpg",
    4: "slot4-grimoire-xfb.jpg",
    5: "slot5-stone-xfb.jpg",
    6: "slot6-factions-xfb.jpg",
    7: "slot7-unreleased-xfb.jpg",
}

media_cache = {}


def upload_media(filepath: Path):
    key = str(filepath)
    if key in media_cache:
        return media_cache[key]
    filename = filepath.name
    ctype = "image/jpeg" if filename.lower().endswith((".jpg", ".jpeg")) else "image/png"
    file_size = filepath.stat().st_size
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
    media = {"url": r3.json()["data"]["url"], "filename": filename}
    media_cache[key] = media
    return media


def list_posts_for(account_id: str):
    r = SESSION.get(f"{BASE_URL}/posts?limit=100", headers=HEADERS, timeout=60)
    r.raise_for_status()
    posts = r.json().get("posts") or r.json().get("data") or []
    out = []
    for p in posts:
        for sa in p.get("socialAccounts", []):
            if sa.get("id") == account_id:
                out.append(p)
                break
    return out


def delete_posts(account_id: str, label: str):
    posts = list_posts_for(account_id)
    print(f"  {label}: found {len(posts)} posts to delete")
    deleted = []
    for p in posts:
        pid = p["id"]
        try:
            r = SESSION.delete(f"{BASE_URL}/posts/{pid}", headers=HEADERS, timeout=60)
            print(f"    delete {pid}: HTTP {r.status_code}")
            deleted.append({"id": pid, "status": r.status_code})
        except Exception as e:
            print(f"    delete {pid}: FAIL {e}")
            deleted.append({"id": pid, "error": str(e)})
        time.sleep(0.5)
    return deleted


def create_post(content, media_list, account_id, extra=None):
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": m["url"], "filename": m["filename"]} for m in media_list],
            }
        ],
        "accounts": [account_id],
    }
    if extra:
        body.update(extra)
    r = SESSION.post(f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll_post(post_id, account_id, attempts=24):
    for _ in range(attempts):
        r = SESSION.get(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data") or {}
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == account_id]
        sa = accounts[0] if accounts else {}
        status = sa.get("status")
        if status in ("published", "failed") or post.get("publishedAt"):
            if status is None and post.get("publishedAt"):
                status = "published"
            return {
                "status": status or "unknown",
                "url": sa.get("platformPostUrl"),
                "error": sa.get("error"),
                "publishedAt": post.get("publishedAt"),
            }
        time.sleep(3)
    return {"status": "timeout", "url": None, "error": "poll timeout"}


def resolve_pinterest_board():
    board = ENV.get("PINTEREST_BOARD_ID") or DEFAULT_PINTEREST_BOARD
    # Prefer listing boards if an endpoint works
    for path in (
        f"/social-accounts/{ACCOUNTS['pinterest']}/boards",
        f"/pinterest/{ACCOUNTS['pinterest']}/boards",
        "/boards",
    ):
        try:
            r = SESSION.get(f"{BASE_URL}{path}", headers=HEADERS, timeout=20)
            if r.status_code == 200:
                data = r.json().get("data") or r.json().get("boards") or r.json()
                if isinstance(data, list) and data:
                    print(f"  Boards via {path}:")
                    for b in data[:12]:
                        print(f"    {b.get('id')} {b.get('name')}")
                    # Prefer a Masters / essay / books board if present
                    for b in data:
                        name = (b.get("name") or "").lower()
                        if any(k in name for k in ("masters", "essay", "field", "book", "holloway")):
                            return str(b["id"])
                    return str(data[0]["id"])
        except Exception:
            pass
    print(f"  Using board_id={board}")
    return board


def main():
    skip_delete = "--no-delete" in sys.argv
    platforms = []
    if "--x-only" in sys.argv:
        platforms = ["x"]
    elif "--fb-only" in sys.argv:
        platforms = ["fb_author", "fb_scp"]
    elif "--pinterest-only" in sys.argv:
        platforms = ["pinterest"]
    else:
        platforms = ["x", "fb_author", "fb_scp", "pinterest"]

    report = {"deleted": {}, "posts": [], "platforms": platforms}

    print("=" * 60)
    print("PLATFORM-OVERLAID REPOST")
    print("=" * 60)

    if not skip_delete:
        print("\nPHASE 1: Delete existing posts on target accounts")
        for key in platforms:
            report["deleted"][key] = delete_posts(ACCOUNTS[key], key)
        time.sleep(2)

    board_id = resolve_pinterest_board() if "pinterest" in platforms else None

    print("\nPHASE 2: Upload overlaid heroes and publish")
    for slot in range(1, 8):
        xfb_path = PLAT_DIR / XFB_IMAGES[slot]
        print(f"\n--- Slot {slot} ---")
        try:
            xfb_media = upload_media(xfb_path)
            print(f"  Uploaded X/FB: {xfb_path.name}")
        except Exception as e:
            print(f"  FAIL upload X/FB: {e}")
            xfb_media = None

        if "x" in platforms and xfb_media:
            label = f"Slot {slot} - X"
            try:
                sc, resp = create_post(X_POSTS[slot], [xfb_media], ACCOUNTS["x"])
                post = resp.get("post") or resp.get("data") or {}
                pid = post.get("id")
                if sc in (200, 201) and resp.get("success") and pid:
                    outcome = poll_post(pid, ACCOUNTS["x"])
                    print(f"  {label}: {outcome['status']} {outcome.get('url') or outcome.get('error')}")
                    report["posts"].append({"label": label, "success": outcome["status"] == "published", **outcome, "post_id": pid})
                else:
                    print(f"  {label}: FAIL create {sc} {json.dumps(resp)[:200]}")
                    report["posts"].append({"label": label, "success": False, "response": resp})
            except Exception as e:
                print(f"  {label}: ERROR {e}")
                report["posts"].append({"label": label, "success": False, "error": str(e)})

        if "fb_author" in platforms and xfb_media:
            label = f"Slot {slot} - FB Author"
            try:
                sc, resp = create_post(FB_AUTHOR[slot], [xfb_media], ACCOUNTS["fb_author"])
                post = resp.get("post") or resp.get("data") or {}
                pid = post.get("id")
                if sc in (200, 201) and resp.get("success") and pid:
                    outcome = poll_post(pid, ACCOUNTS["fb_author"])
                    print(f"  {label}: {outcome['status']} {outcome.get('url') or outcome.get('error')}")
                    report["posts"].append({"label": label, "success": outcome["status"] == "published", **outcome, "post_id": pid})
                else:
                    print(f"  {label}: FAIL create {sc} {json.dumps(resp)[:200]}")
                    report["posts"].append({"label": label, "success": False, "response": resp})
            except Exception as e:
                print(f"  {label}: ERROR {e}")
                report["posts"].append({"label": label, "success": False, "error": str(e)})

        if "fb_scp" in platforms and xfb_media:
            label = f"Slot {slot} - FB SCP"
            try:
                sc, resp = create_post(FB_SCP[slot], [xfb_media], ACCOUNTS["fb_scp"])
                post = resp.get("post") or resp.get("data") or {}
                pid = post.get("id")
                if sc in (200, 201) and resp.get("success") and pid:
                    outcome = poll_post(pid, ACCOUNTS["fb_scp"])
                    print(f"  {label}: {outcome['status']} {outcome.get('url') or outcome.get('error')}")
                    report["posts"].append({"label": label, "success": outcome["status"] == "published", **outcome, "post_id": pid})
                else:
                    print(f"  {label}: FAIL create {sc} {json.dumps(resp)[:200]}")
                    report["posts"].append({"label": label, "success": False, "response": resp})
            except Exception as e:
                print(f"  {label}: ERROR {e}")
                report["posts"].append({"label": label, "success": False, "error": str(e)})

        if "pinterest" in platforms:
            pin = PINTEREST[slot]
            pin_path = PLAT_DIR / pin["img"]
            label = f"Slot {slot} - Pinterest"
            try:
                pin_media = upload_media(pin_path)
                print(f"  Uploaded Pinterest: {pin_path.name}")
                content = f"{pin['title']} - {pin['text']} {pin['link']}"
                extra = {
                    "pinterest": {
                        "board_id": board_id,
                        "link": pin["link"],
                        "title": pin["title"],
                    },
                    # Some Outstand builds expect this nested form
                    "pinterestConfiguration": {"board_id": board_id},
                    "networkOverrideConfiguration": {
                        ACCOUNTS["pinterest"]: {"board_id": board_id}
                    },
                }
                sc, resp = create_post(content, [pin_media], ACCOUNTS["pinterest"], extra=extra)
                post = resp.get("post") or resp.get("data") or {}
                pid = post.get("id")
                if sc in (200, 201) and resp.get("success") and pid:
                    outcome = poll_post(pid, ACCOUNTS["pinterest"])
                    print(f"  {label}: {outcome['status']} {outcome.get('url') or outcome.get('error')}")
                    report["posts"].append({"label": label, "success": outcome["status"] == "published", **outcome, "post_id": pid})
                else:
                    print(f"  {label}: FAIL create {sc} {json.dumps(resp)[:300]}")
                    report["posts"].append({"label": label, "success": False, "response": resp})
            except Exception as e:
                print(f"  {label}: ERROR {e}")
                report["posts"].append({"label": label, "success": False, "error": str(e)})

        time.sleep(1)

    ok = [p for p in report["posts"] if p.get("success")]
    print("\n" + "=" * 60)
    print(f"DONE: {len(ok)}/{len(report['posts'])} published")
    for p in report["posts"]:
        mark = "OK" if p.get("success") else "FAIL"
        detail = p.get("url") or p.get("error") or p.get("status") or ""
        print(f"  [{mark}] {p['label']}: {detail}")

    RESULTS_PATH.write_text(json.dumps(report, indent=2, default=str), encoding="utf-8")
    print(f"\nResults: {RESULTS_PATH}")
    return len(ok) == len(report["posts"])


if __name__ == "__main__":
    sys.exit(0 if main() else 1)
