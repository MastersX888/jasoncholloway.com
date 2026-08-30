#!/usr/bin/env python3
"""Post all 7 X slots with hero images via Outstand API."""

import json
import os
import sys
import time

import requests

ROOT = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
ENV_PATH = os.path.join(ROOT, ".env")
IMG_DIR = os.path.join(ROOT, "public", "social", "imagen")
STATUS_FILE = os.path.join(ROOT, ".social-post-status.json")
RESULTS_FILE = os.path.join(ROOT, ".x-post-results.json")
BASE_URL = "https://api.outstand.so/v1"
X_ACCOUNT_ID = "oPCuc"

SLOTS = {
    1: {
        "text": """Every page of the Distribution File in my trilogy carries the same footer: f = 111.2 Hz.

The number is fiction. The stone under it isn't.

Archaeoacousticians have documented a resonance near 110 Hz in Neolithic chambers from Malta to Scotland. The extra decimal is the fiction signing its own work.

jasoncholloway.com/blog/the-frequency-that-was-already-there/""",
        "hero": ("slot1", "slot1-frequency-hero.png"),
    },
    2: {
        "text": """The oldest special effect in my trilogy needs no computer.

A metal plate. A violin bow. A spoonful of sand.

Draw the bow and the sand jumps into a geometric figure. Chladni demonstrated it in 1787. You can do it on your kitchen table tonight.

jasoncholloway.com/blog/sound-into-form-hans-jenny/""",
        "hero": ("slot2", "slot2-cymatics-hero.png"),
    },
    3: {
        "text": """I set a conspiracy trilogy in Kansas City, and I expected it would read as hometown convenience.

Then the research started. Around the second century, people on these river bluffs were building stone-vault tombs: rooms with doorways, sealed inside burial mounds.

Chamber-building here predates Rome's fall.

jasoncholloway.com/blog/why-kansas-city/""",
        "hero": ("slot3", "slot3-kansas-city-hero.png"),
    },
    4: {
        "text": """The medieval Church condemned the Ars Notoria. Not for devil-worship, but for cheating.

The manuscript promised the seven liberal arts through contemplation of geometric figures and scheduled prayer. Knowledge without the sanctioned labor of study.

It is real. British Library, MS Sloane 1712.

jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/""",
        "hero": ("slot4", "slot4-ars-notoria-hero.png"),
    },
    5: {
        "text": """In 2011 a Kansas City church burned. The fire took the roof, the sanctuary, the woodwork, everything a hundred and seven years had accumulated inside.

The 1904 limestone walls stood.

"The stone remembers" was in my manuscript before I found the fire. The fire was already on the public record.

jasoncholloway.com/blog/the-stone-remembers/""",
        "hero": ("slot5", "slot5-stone-remembers-hero.png"),
    },
    6: {
        "text": """In 1984, American intelligence translated a Chinese government journal on paranormal research and filed the translation.

Two governments, one subject, opposite policies. One published. The other classified the act of reading.

That asymmetry is the politics of my entire trilogy.

jasoncholloway.com/blog/three-factions-one-declassified-document/""",
        "hero": ("slot6", "slot6-three-factions-hero.png"),
    },
    7: {
        "text": """My conspiracy trilogy ends with a license.

Not a chamber stormed, not a patriarch unmasked. A 247-page file goes onto the open internet at midnight under CC0, and an eight-hundred-year war loses its object.

jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/""",
        "hero": ("slot7", "slot7-unreleased-hero.png"),
    },
}

media_cache = {}


def load_env():
    env = {}
    with open(ENV_PATH, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, val = line.split("=", 1)
            env[key.strip()] = val.strip()
    return env


def upload_media(filepath, filename, headers):
    if filepath in media_cache:
        return media_cache[filepath]

    file_size = os.path.getsize(filepath)
    r = requests.post(
        f"{BASE_URL}/media/upload",
        headers=headers,
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
        headers=headers,
        json={"size": file_size},
        timeout=60,
    )
    r3.raise_for_status()
    media_url = r3.json()["data"]["url"]
    media_cache[filepath] = {"url": media_url, "filename": filename}
    return media_cache[filepath]


def create_x_post(content, media, headers):
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": media["url"], "filename": media["filename"]}],
            }
        ],
        "accounts": [X_ACCOUNT_ID],
    }
    r = requests.post(
        f"{BASE_URL}/posts/",
        headers=headers,
        json=body,
        timeout=60,
    )
    return r.status_code, r.json()


def poll_post(post_id, headers, attempts=10):
    for _ in range(attempts):
        r = requests.get(f"{BASE_URL}/posts/{post_id}", headers=headers, timeout=30)
        if r.status_code != 200:
            time.sleep(2)
            continue
        post = r.json().get("post") or r.json().get("data")
        if not post:
            time.sleep(2)
            continue
        accounts = post.get("socialAccounts", [])
        if not accounts:
            time.sleep(2)
            continue
        terminal = all(acc.get("status") in ("published", "failed") for acc in accounts)
        if terminal:
            return post
        time.sleep(2)
    return None


def mark_posted(slot):
    status = {}
    if os.path.exists(STATUS_FILE):
        with open(STATUS_FILE, "r", encoding="utf-8") as f:
            status = json.load(f)
    if str(slot) not in status:
        status[str(slot)] = {}
    status[str(slot)]["x"] = time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime())
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump(status, f, indent=2)
        f.write("\n")


def main():
    env = load_env()
    api_key = env.get("OUTSTAND_API_KEY")
    if not api_key:
        print("OUTSTAND_API_KEY missing from .env")
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    results = []
    for slot_num in range(1, 8):
        slot = SLOTS[slot_num]
        subdir, hero_fn = slot["hero"]
        hero_path = os.path.join(IMG_DIR, subdir, hero_fn)
        label = f"Slot {slot_num} - X/Twitter (Outstand)"

        print(f"\n{label}")
        print(f"  Image: {hero_path}")

        try:
            print("  Uploading hero to Outstand...")
            media = upload_media(hero_path, hero_fn, headers)
            print(f"  Media URL: {media['url'][:80]}...")

            print("  Creating post...")
            status_code, resp = create_x_post(slot["text"], media, headers)
            post = resp.get("post") or resp.get("data")
            post_id = post.get("id") if post else None

            if status_code not in (200, 201) or not resp.get("success"):
                print(f"  FAILED create ({status_code}): {json.dumps(resp)[:400]}")
                results.append(
                    {
                        "label": label,
                        "success": False,
                        "status_code": status_code,
                        "response": resp,
                    }
                )
                time.sleep(3)
                continue

            print(f"  Post ID: {post_id}, polling outcome...")
            outcome = poll_post(post_id, headers) if post_id else post
            x_accounts = [
                a
                for a in (outcome or post or {}).get("socialAccounts", [])
                if a.get("network") == "x"
            ]

            if not x_accounts:
                x_accounts = (outcome or post or {}).get("socialAccounts", [])

            if x_accounts and x_accounts[0].get("status") == "published":
                url = x_accounts[0].get("platformPostUrl")
                if not url and x_accounts[0].get("platformPostId"):
                    url = f"https://x.com/i/web/status/{x_accounts[0]['platformPostId']}"
                print(f"  OK: {url}")
                mark_posted(slot_num)
                results.append(
                    {
                        "label": label,
                        "success": True,
                        "post_id": post_id,
                        "url": url,
                        "platformPostId": x_accounts[0].get("platformPostId"),
                    }
                )
            else:
                err = (
                    x_accounts[0].get("error")
                    if x_accounts
                    else json.dumps(resp)[:300]
                )
                print(f"  FAILED publish: {err}")
                results.append(
                    {
                        "label": label,
                        "success": False,
                        "post_id": post_id,
                        "error": err,
                        "response": outcome or resp,
                    }
                )
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"label": label, "success": False, "error": str(e)})

        time.sleep(3)

    successes = [r for r in results if r.get("success")]
    print(f"\n{'=' * 60}")
    print(f"X OUTSTAND RESULTS: {len(successes)}/7 succeeded")
    print(f"{'=' * 60}")
    for r in results:
        status = "OK" if r.get("success") else "FAIL"
        detail = r.get("url") or r.get("error") or str(r.get("response", ""))[:200]
        print(f"  [{status}] {r['label']}: {detail}")

    with open(RESULTS_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)

    return len(successes)


if __name__ == "__main__":
    ok = main()
    sys.exit(0 if ok == 7 else 1)
