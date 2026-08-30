#!/usr/bin/env python3
"""Post to X/Twitter with images using OAuth 1.0a (v1.1 media upload + v2 tweets)."""

import hashlib
import hmac
import json
import os
import sys
import time
import urllib.parse
import uuid

import requests

ENV_PATH = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\.env"
IMG_DIR = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\public\social\platform-overlaid"


def load_env():
    env = {}
    with open(ENV_PATH, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            eq = line.index("=")
            key = line[:eq].strip()
            val = line[eq + 1:].strip()
            env[key] = val
    return env


def percent_encode(s):
    return urllib.parse.quote(str(s), safe="")


def generate_oauth_header(method, url, env, extra_params=None):
    oauth_params = {
        "oauth_consumer_key": env["TWITTER_CONSUMER_KEY"],
        "oauth_nonce": uuid.uuid4().hex,
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": str(int(time.time())),
        "oauth_token": env["TWITTER_ACCESS_TOKEN"],
        "oauth_version": "1.0",
    }
    all_params = dict(oauth_params)
    if extra_params:
        all_params.update(extra_params)

    sorted_params = "&".join(
        f"{percent_encode(k)}={percent_encode(v)}"
        for k, v in sorted(all_params.items())
    )
    base_string = f"{method.upper()}&{percent_encode(url)}&{percent_encode(sorted_params)}"
    signing_key = f"{percent_encode(env['TWITTER_CONSUMER_SECRET'])}&{percent_encode(env['TWITTER_ACCESS_TOKEN_SECRET'])}"

    signature = hmac.new(
        signing_key.encode(), base_string.encode(), hashlib.sha1
    ).digest()
    import base64
    oauth_params["oauth_signature"] = base64.b64encode(signature).decode()

    header = ", ".join(
        f'{percent_encode(k)}="{percent_encode(v)}"'
        for k, v in sorted(oauth_params.items())
    )
    return f"OAuth {header}"


def upload_media(filepath, env):
    """Upload image to Twitter via v1.1 media/upload (simple upload for < 5MB)."""
    url = "https://upload.twitter.com/1.1/media/upload.json"
    auth_header = generate_oauth_header("POST", url, env)

    with open(filepath, "rb") as f:
        files = {"media_data": (None, __import__("base64").b64encode(f.read()).decode())}

    r = requests.post(
        url,
        headers={"Authorization": auth_header},
        data={"media_data": __import__("base64").b64encode(open(filepath, "rb").read()).decode()},
        timeout=120,
    )
    if r.status_code != 200:
        raise Exception(f"Media upload failed ({r.status_code}): {r.text[:300]}")
    return r.json()["media_id_string"]


def post_tweet(text, media_ids, env):
    """Post tweet with media via v2 API."""
    url = "https://api.twitter.com/2/tweets"
    auth_header = generate_oauth_header("POST", url, env)

    body = {"text": text}
    if media_ids:
        body["media"] = {"media_ids": media_ids}

    r = requests.post(
        url,
        headers={
            "Authorization": auth_header,
            "Content-Type": "application/json",
        },
        json=body,
        timeout=60,
    )
    return r.status_code, r.json()


SLOTS = {
    1: {
        "text": "Every page of the Distribution File in my trilogy carries the same footer: f = 111.2 Hz.\n\nThe number is fiction. The stone under it isn't.\n\nArchaeoacousticians have documented a resonance near 110 Hz in Neolithic chambers from Malta to Scotland. The extra decimal is the fiction signing its own work.\n\njasoncholloway.com/blog/the-frequency-that-was-already-there/",
        "hero": "slot1-frequency-xfb.jpg",
    },
    2: {
        "text": "The oldest special effect in my trilogy needs no computer.\n\nA metal plate. A violin bow. A spoonful of sand.\n\nDraw the bow and the sand jumps into a geometric figure. Chladni demonstrated it in 1787. You can do it on your kitchen table tonight.\n\njasoncholloway.com/blog/sound-into-form-hans-jenny/",
        "hero": "slot2-cymatics-xfb.jpg",
    },
    3: {
        "text": "I set a conspiracy trilogy in Kansas City, and I expected it would read as hometown convenience.\n\nThen the research started. Around the second century, people on these river bluffs were building stone-vault tombs: rooms with doorways, sealed inside burial mounds.\n\nChamber-building here predates Rome's fall.\n\njasoncholloway.com/blog/why-kansas-city/",
        "hero": "slot3-kansas-city-xfb.jpg",
    },
    4: {
        "text": "The medieval Church condemned the Ars Notoria. Not for devil-worship, but for cheating.\n\nThe manuscript promised the seven liberal arts through contemplation of geometric figures and scheduled prayer. Knowledge without the sanctioned labor of study.\n\nIt is real. British Library, MS Sloane 1712.\n\njasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/",
        "hero": "slot4-grimoire-xfb.jpg",
    },
    5: {
        "text": 'In 2011 a Kansas City church burned. The fire took the roof, the sanctuary, the woodwork, everything a hundred and seven years had accumulated inside.\n\nThe 1904 limestone walls stood.\n\n"The stone remembers" was in my manuscript before I found the fire. The fire was already on the public record.\n\njasoncholloway.com/blog/the-stone-remembers/',
        "hero": "slot5-stone-xfb.jpg",
    },
    6: {
        "text": "In 1984, American intelligence translated a Chinese government journal on paranormal research and filed the translation.\n\nTwo governments, one subject, opposite policies. One published. The other classified the act of reading.\n\nThat asymmetry is the politics of my entire trilogy.\n\njasoncholloway.com/blog/three-factions-one-declassified-document/",
        "hero": "slot6-factions-xfb.jpg",
    },
    7: {
        "text": "My conspiracy trilogy ends with a license.\n\nNot a chamber stormed, not a patriarch unmasked. A 247-page file goes onto the open internet at midnight under CC0, and an eight-hundred-year war loses its object.\n\njasoncholloway.com/blog/a-document-that-cannot-be-unreleased/",
        "hero": "slot7-unreleased-xfb.jpg",
    },
}


def main():
    env = load_env()
    results = []

    for slot_num in range(1, 8):
        slot = SLOTS[slot_num]
        hero_path = os.path.join(IMG_DIR, slot["hero"])
        label = f"Slot {slot_num} - X/Twitter"

        print(f"\n{label}")
        print(f"  Image: {slot['hero']}")
        print(f"  Text: {slot['text'][:80]}...")

        try:
            print("  Uploading media...")
            media_id = upload_media(hero_path, env)
            print(f"  Media ID: {media_id}")

            print("  Posting tweet...")
            status, resp = post_tweet(slot["text"], [media_id], env)
            tweet_id = resp.get("data", {}).get("id")
            tweet_url = f"https://x.com/jasonhollowaykc/status/{tweet_id}" if tweet_id else None

            if status in (200, 201) and tweet_id:
                print(f"  OK: {tweet_url}")
                results.append({"label": label, "success": True, "url": tweet_url, "id": tweet_id})
            else:
                print(f"  FAILED ({status}): {json.dumps(resp)[:300]}")
                results.append({"label": label, "success": False, "status": status, "response": resp})
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"label": label, "success": False, "error": str(e)})

        time.sleep(2)

    print(f"\n{'='*60}")
    print("X/TWITTER RESULTS")
    print(f"{'='*60}")
    successes = [r for r in results if r.get("success")]
    failures = [r for r in results if not r.get("success")]
    print(f"Successes: {len(successes)}/7")
    print(f"Failures: {len(failures)}/7")
    for r in results:
        status = "OK" if r.get("success") else "FAIL"
        detail = r.get("url") or r.get("error") or str(r.get("response", ""))[:200]
        print(f"  [{status}] {r['label']}: {detail}")

    results_path = r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\.x-post-results.json"
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\nResults saved to: {results_path}")


if __name__ == "__main__":
    main()
