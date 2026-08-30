#!/usr/bin/env python3
"""Upload images to Outstand and create posts for all 7 slots across 4 platforms."""

import json
import os
import sys
import time
import requests

from dotenv import load_dotenv

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(REPO_ROOT, ".env"))
API_KEY = os.environ.get("OUTSTAND_API_KEY", "").strip()
if not API_KEY:
    print(
        "ERROR: OUTSTAND_API_KEY is not set.\n"
        "Set it in the environment or in the repo-root .env before running:\n"
        '  PowerShell:  $env:OUTSTAND_API_KEY = "<key>"\n'
        "  bash:        export OUTSTAND_API_KEY='<key>'",
        file=sys.stderr,
    )
    sys.exit(1)

BASE_URL = "https://api.outstand.so/v1"
IMG_DIR = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\social\imagen"

ACCOUNTS = {
    "instagram": "1vWPG",
    "fb_author": "7BvrW",
    "fb_scp": "IwQhX",
    "pinterest": "pxPfM",
}

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

SLOTS = {
    1: {
        "title": "The Frequency That Was Already There",
        "blog_url": "https://jasoncholloway.com/blog/the-frequency-that-was-already-there/",
        "field_notes": "https://jasoncholloway.com/field-notes/111-hz/",
        "ig_slides": [f"ig-slot1-slide0{i}.png" for i in range(1, 7)],
        "hero": "slot1-frequency-hero.png",
        "pinterest_img": "pinterest-slot1-frequency.png",
        "subdir": "slot1",
        "pinterest_subdir": "slot1",
    },
    2: {
        "title": "Sound Into Form: Hans Jenny and Cymatics",
        "blog_url": "https://jasoncholloway.com/blog/sound-into-form-hans-jenny/",
        "field_notes": "https://jasoncholloway.com/field-notes/cymatics/",
        "ig_slides": [f"ig-slot2-slide0{i}.png" for i in range(1, 7)],
        "hero": "slot2-cymatics-hero.png",
        "pinterest_img": "pinterest-slot2-cymatics.png",
        "subdir": "slot2",
        "pinterest_subdir": "slot2",
    },
    3: {
        "title": "Why Kansas City?",
        "blog_url": "https://jasoncholloway.com/blog/why-kansas-city/",
        "field_notes": "https://jasoncholloway.com/field-notes/kansas-city-locations/",
        "ig_slides": [f"ig-slot3-slide0{i}.png" for i in range(1, 8)],
        "hero": "slot3-kansas-city-hero.png",
        "pinterest_img": "pinterest-slot3-kansas-city.png",
        "subdir": "slot3",
        "pinterest_subdir": "slot3",
    },
    4: {
        "title": "The Grimoire That Was a Study Aid",
        "blog_url": "https://jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/",
        "field_notes": "https://jasoncholloway.com/field-notes/ars-notoria/",
        "ig_slides": [f"ig-slot4-slide0{i}.png" for i in range(1, 7)],
        "hero": "slot4-ars-notoria-hero.png",
        "pinterest_img": "pinterest-slot4-ars-notoria.png",
        "subdir": "slot4",
        "pinterest_subdir": "slot4",
    },
    5: {
        "title": "The Stone Remembers",
        "blog_url": "https://jasoncholloway.com/blog/the-stone-remembers/",
        "field_notes": "https://jasoncholloway.com/field-notes/kansas-city-locations/",
        "ig_slides": [f"ig-slot5-slide0{i}.png" for i in range(1, 7)],
        "hero": "slot5-stone-remembers-hero.png",
        "pinterest_img": "pinterest-slot5-stone-remembers.png",
        "subdir": "slot5",
        "pinterest_subdir": "slot5",
    },
    6: {
        "title": "Three Factions, One Declassified Document",
        "blog_url": "https://jasoncholloway.com/blog/three-factions-one-declassified-document/",
        "field_notes": None,
        "ig_slides": [f"ig-slot6-slide0{i}.png" for i in range(1, 7)],
        "hero": "slot6-three-factions-hero.png",
        "pinterest_img": "pinterest-slot6-three-factions.png",
        "subdir": "slot6",
        "pinterest_subdir": "slot6",
    },
    7: {
        "title": "A Document That Cannot Be Un-Released",
        "blog_url": "https://jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/",
        "field_notes": "https://jasoncholloway.com/field-notes/subtropolis/",
        "ig_slides": [f"ig-slot7-slide0{i}.png" for i in range(1, 7)],
        "hero": "slot7-unreleased-hero.png",
        "pinterest_img": "pinterest-slot7-unreleased.png",
        "subdir": "slot7",
        "pinterest_subdir": "slot7",
    },
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

FB_SCP_POSTS = {
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

PINTEREST_TEXTS = {
    1: "The Frequency That Was Already There - Archaeoacousticians documented a resonance near 110 Hz in Neolithic chambers from Malta to Scotland. The Masters X Trilogy uses 111.2 Hz instead. The extra decimal is the fiction signing its own work. jasoncholloway.com/blog/the-frequency-that-was-already-there/",
    2: "Sound Into Form: Hans Jenny and Cymatics - A metal plate, a violin bow, a spoonful of sand. Chladni demonstrated it in 1787. Hans Jenny made it a discipline. The Masters X Trilogy asks: what if the geometry remakes the observer? jasoncholloway.com/blog/sound-into-form-hans-jenny/",
    3: "Why Kansas City? - Four traditions looked at the same thirty miles of Missouri river bluff and decided this ground matters. Hopewell stone-vault tombs, the Osage concept of Wah-kon-tah, a temple lot never built but still mowed, and limestone quarried into SubTropolis. jasoncholloway.com/blog/why-kansas-city/",
    4: "The Grimoire That Was a Study Aid - The Ars Notoria, a medieval manuscript condemned not for devil-worship but for cheating. It promised the seven liberal arts through contemplation of geometric figures. British Library, MS Sloane 1712. jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/",
    5: "The Stone Remembers - In 2011 a Kansas City church burned. The fire took everything except the 1904 limestone walls. The congregation rebuilt inside them. The fact of the church was mineral. jasoncholloway.com/blog/the-stone-remembers/",
    6: "Three Factions, One Declassified Document - In 1984 American intelligence translated a Chinese journal on paranormal research. Two governments, one subject, opposite policies. That asymmetry drives the Masters X Trilogy. jasoncholloway.com/blog/three-factions-one-declassified-document/",
    7: "A Document That Cannot Be Un-Released - A conspiracy trilogy that ends not with a confrontation but a license. 247 pages, midnight, CC0. The opposite of classification is not leaking. It is boredom. jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/",
}

media_cache = {}
results = []


def upload_media(filepath, filename):
    """Upload a single image to Outstand. Returns the confirmed media URL."""
    if filepath in media_cache:
        return media_cache[filepath]

    file_size = os.path.getsize(filepath)

    r = requests.post(
        f"{BASE_URL}/media/upload",
        headers=HEADERS,
        json={"filename": filename, "content_type": "image/png"},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    media_id = data["id"]
    upload_url = data["upload_url"]

    with open(filepath, "rb") as f:
        raw = f.read()
    r2 = requests.put(
        upload_url,
        data=raw,
        headers={"Content-Type": "image/png"},
        timeout=120,
    )
    r2.raise_for_status()

    r3 = requests.post(
        f"{BASE_URL}/media/{media_id}/confirm",
        headers=HEADERS,
        json={"size": file_size},
        timeout=60,
    )
    r3.raise_for_status()
    media_url = r3.json()["data"]["url"]

    media_cache[filepath] = {"url": media_url, "filename": filename}
    return media_cache[filepath]


def create_post(content, media_list, account_id, label):
    """Create a post on Outstand."""
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": m["url"], "filename": m["filename"]} for m in media_list],
            }
        ],
        "accounts": [account_id],
    }
    r = requests.post(
        f"{BASE_URL}/posts",
        headers=HEADERS,
        json=body,
        timeout=60,
    )
    resp = r.json()
    success = r.status_code in (200, 201) and resp.get("success", False)
    post_id = resp.get("data", {}).get("id", "unknown") if success else None
    return {
        "label": label,
        "success": success,
        "status_code": r.status_code,
        "post_id": post_id,
        "response": resp if not success else None,
    }


def process_slot(slot_num):
    slot = SLOTS[slot_num]
    slot_results = []
    subdir = slot["subdir"]

    print(f"\n{'='*60}")
    print(f"SLOT {slot_num}: {slot['title']}")
    print(f"{'='*60}")

    # Upload hero image (shared by FB Author, FB SCP, X)
    hero_path = os.path.join(IMG_DIR, subdir, slot["hero"])
    print(f"  Uploading hero: {slot['hero']}...")
    try:
        hero_media = upload_media(hero_path, slot["hero"])
        print(f"    OK: {hero_media['url'][:80]}...")
    except Exception as e:
        print(f"    FAILED: {e}")
        hero_media = None

    # Upload pinterest image
    pin_path = os.path.join(IMG_DIR, subdir, slot["pinterest_img"])
    print(f"  Uploading pinterest: {slot['pinterest_img']}...")
    try:
        pin_media = upload_media(pin_path, slot["pinterest_img"])
        print(f"    OK: {pin_media['url'][:80]}...")
    except Exception as e:
        print(f"    FAILED: {e}")
        pin_media = None

    # Upload IG carousel slides
    ig_medias = []
    for slide_fn in slot["ig_slides"]:
        slide_path = os.path.join(IMG_DIR, subdir, slide_fn)
        print(f"  Uploading IG slide: {slide_fn}...")
        try:
            m = upload_media(slide_path, slide_fn)
            ig_medias.append(m)
            print(f"    OK: {m['url'][:80]}...")
        except Exception as e:
            print(f"    FAILED: {e}")

    # Create posts
    # 1. Instagram carousel
    if ig_medias:
        label = f"Slot {slot_num} - Instagram"
        print(f"  Posting: {label}...")
        try:
            r = create_post(IG_CAPTIONS[slot_num], ig_medias, ACCOUNTS["instagram"], label)
            slot_results.append(r)
            print(f"    {'OK' if r['success'] else 'FAILED'}: {r.get('post_id') or r.get('response')}")
        except Exception as e:
            slot_results.append({"label": label, "success": False, "error": str(e)})
            print(f"    ERROR: {e}")
    else:
        slot_results.append({"label": f"Slot {slot_num} - Instagram", "success": False, "error": "No IG slides uploaded"})

    # 2. Facebook Author (hero image, IG caption text)
    if hero_media:
        label = f"Slot {slot_num} - FB Author"
        print(f"  Posting: {label}...")
        try:
            r = create_post(IG_CAPTIONS[slot_num], [hero_media], ACCOUNTS["fb_author"], label)
            slot_results.append(r)
            print(f"    {'OK' if r['success'] else 'FAILED'}: {r.get('post_id') or r.get('response')}")
        except Exception as e:
            slot_results.append({"label": label, "success": False, "error": str(e)})
            print(f"    ERROR: {e}")
    else:
        slot_results.append({"label": f"Slot {slot_num} - FB Author", "success": False, "error": "No hero image"})

    # 3. Facebook SCP (hero image, publisher voice)
    if hero_media:
        label = f"Slot {slot_num} - FB SCP"
        print(f"  Posting: {label}...")
        try:
            r = create_post(FB_SCP_POSTS[slot_num], [hero_media], ACCOUNTS["fb_scp"], label)
            slot_results.append(r)
            print(f"    {'OK' if r['success'] else 'FAILED'}: {r.get('post_id') or r.get('response')}")
        except Exception as e:
            slot_results.append({"label": label, "success": False, "error": str(e)})
            print(f"    ERROR: {e}")
    else:
        slot_results.append({"label": f"Slot {slot_num} - FB SCP", "success": False, "error": "No hero image"})

    # 4. Pinterest (pinterest image, short text)
    if pin_media:
        label = f"Slot {slot_num} - Pinterest"
        print(f"  Posting: {label}...")
        try:
            r = create_post(PINTEREST_TEXTS[slot_num], [pin_media], ACCOUNTS["pinterest"], label)
            slot_results.append(r)
            print(f"    {'OK' if r['success'] else 'FAILED'}: {r.get('post_id') or r.get('response')}")
        except Exception as e:
            slot_results.append({"label": label, "success": False, "error": str(e)})
            print(f"    ERROR: {e}")
    else:
        slot_results.append({"label": f"Slot {slot_num} - Pinterest", "success": False, "error": "No pinterest image"})

    return slot_results


def main():
    print("Outstand Social Media Posting - All 7 Slots x 4 Platforms")
    print(f"Accounts: {json.dumps(ACCOUNTS, indent=2)}")
    print(f"Image dir: {IMG_DIR}")
    print()

    all_results = []
    for slot_num in range(1, 8):
        try:
            slot_results = process_slot(slot_num)
            all_results.extend(slot_results)
        except Exception as e:
            print(f"  SLOT {slot_num} CRITICAL ERROR: {e}")
            all_results.append({"label": f"Slot {slot_num} - ALL", "success": False, "error": str(e)})
        time.sleep(1)

    # Summary
    print(f"\n{'='*60}")
    print("FINAL RESULTS")
    print(f"{'='*60}")
    successes = [r for r in all_results if r.get("success")]
    failures = [r for r in all_results if not r.get("success")]
    print(f"Successes: {len(successes)}/{len(all_results)}")
    print(f"Failures: {len(failures)}/{len(all_results)}")
    print()

    for r in all_results:
        status = "OK" if r.get("success") else "FAIL"
        detail = r.get("post_id") or r.get("error") or r.get("response", "")
        print(f"  [{status}] {r['label']}: {detail}")

    # Save results to file
    results_path = os.path.join(
        r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway",
        ".outstand-post-results.json",
    )
    with open(results_path, "w") as f:
        json.dump(all_results, f, indent=2, default=str)
    print(f"\nResults saved to: {results_path}")

    return len(failures) == 0


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
