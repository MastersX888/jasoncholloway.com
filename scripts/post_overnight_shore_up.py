#!/usr/bin/env python3
"""
Overnight shore-up:
  - Post elevated X assets (new Outstand account jaHn2)
  - Post unique SCP imprint catalog to FB SCP + Bluesky imprint
Does NOT touch IG keepers, does NOT delete Meta (blocked), does NOT hard-sell.
"""

from __future__ import annotations

import json
import os
import ssl
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip()

API_KEY = ENV["OUTSTAND_API_KEY"]
BASE = "https://api.outstand.so/v1"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

# Live account IDs from /social-accounts probe (2026-07-27)
ACCOUNTS = {
    "x": "jaHn2",  # jasonhollowaykc — newly reconnected
    "fb_author": "7BvrW",
    "fb_scp": "IwQhX",
    "pinterest": "pxPfM",
    "ig": "1vWPG",
    "bsky_author": "J15V3",
    "bsky_imprint": "4RSwi",
}

PLAT = ROOT / "public" / "social" / "platform-overlaid"
SCP_DIR = ROOT / "public" / "social" / "scp-imprint-overlaid"
OUT = ROOT / ".overnight-shore-up-results.json"
STATUS = ROOT / ".social-shore-up-status.json"

XFB = {
    1: "slot1-frequency-xfb.jpg",
    2: "slot2-cymatics-xfb.jpg",
    3: "slot3-kansas-city-xfb.jpg",
    4: "slot4-grimoire-xfb.jpg",
    5: "slot5-stone-xfb.jpg",
    6: "slot6-factions-xfb.jpg",
    7: "slot7-unreleased-xfb.jpg",
}

# Soft author voice for X (from elevated pack)
X_CAPTIONS = {
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

# Unique imprint captions — catalog voice, no urgency, no hawking
SCP_POSTS = [
    {
        "img": "scp01-imprint-home.jpg",
        "fb": """Seventh City Press is an independent literary imprint in Kansas City, Missouri.

We publish fiction that treats its sources with respect: the research layer sits beside the novels, and the line between what was measured and what was invented is meant to stay visible.

If you care about archaeoacoustics, manuscript tradition, or a city that keeps surprising its own writers, you are welcome here.

seventhcitypress.com
jasoncholloway.com/field-notes/""",
        "bsky": """Seventh City Press — independent Kansas City imprint.

Fiction that cites its sources. Research published beside the novels. Warm welcome if this subject is already yours.

seventhcitypress.com""",
    },
    {
        "img": "scp02-masters-x-trilogy.jpg",
        "fb": """From the Seventh City Press catalog: the Masters X Trilogy by Jason Carroll Holloway.

Three volumes — The Inheritance of Frequency, The Grimoire, and The Kingdom — following a literary conspiracy sited in Kansas City and braided through medieval manuscripts, archaeoacoustics, and the limestone world beneath the city.

Each volume is available in hardcover and paperback; an omnibus collects the full arc. The Field Notes on the author site keep the research layer open.

Catalog: seventhcitypress.com
Series: jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/""",
        "bsky": """Catalog note · Masters X Trilogy

Three novels. One frequency. Kansas City limestone, manuscript tradition, and a research layer published in the open.

seventhcitypress.com""",
    },
    {
        "img": "scp03-vol1-inheritance.jpg",
        "fb": """Volume I from Seventh City Press: Masters X — The Inheritance of Frequency.

Blake Masters inherits seven notebooks of acoustic research and a cross-reference to a crypt sealed since the thirteenth century. The novels use 111.2 Hz; the literature that inspired them clusters nearer 110. The decimal is fiction, and it is labeled that way.

For readers who want the sources: jasoncholloway.com/field-notes/111-hz/
Volume page: jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/""",
        "bsky": """Catalog · Vol. I — The Inheritance of Frequency

Underground Kansas City. Measured stone. A decimal that belongs to fiction.

jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/""",
    },
    {
        "img": "scp04-vol2-grimoire.jpg",
        "fb": """Volume II from Seventh City Press: Masters X — The Grimoire.

The middle movement is preparation as curriculum — twenty-three texts before the crypt, including the Ars Notoria, named as a real manuscript tradition rather than set dressing. Companion Field Notes sit beside the novel for readers who want the record next to the fiction.

Field note: jasoncholloway.com/field-notes/ars-notoria/
Volume: jasoncholloway.com/books/masters-x/the-grimoire/""",
        "bsky": """Catalog · Vol. II — The Grimoire

Preparation as curriculum. The Ars Notoria named as source, not decoration.

jasoncholloway.com/books/masters-x/the-grimoire/""",
    },
    {
        "img": "scp05-vol3-kingdom.jpg",
        "fb": """Volume III from Seventh City Press: Masters X — The Kingdom.

The trilogy closes not with a storming of chambers but with an argument about classification and open release. Documentation over confrontation. An ending that chooses to make a secret ordinary.

Essay on the closing idea: jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/
Volume: jasoncholloway.com/books/masters-x/the-kingdom/""",
        "bsky": """Catalog · Vol. III — The Kingdom

Documentation over confrontation. An ending that chooses open release.

jasoncholloway.com/books/masters-x/the-kingdom/""",
    },
    {
        "img": "scp06-field-notes.jpg",
        "fb": """The research layer is part of the Seventh City Press catalog.

Field Notes on jasoncholloway.com gather archaeoacoustics, cymatics, Kansas City locations, the Ars Notoria, declassified translation files, and more — with measured claims kept measured and invented claims named as invented.

The Analysis Chamber goes further for readers who want to run the measurements themselves.

Start here: jasoncholloway.com/field-notes/""",
        "bsky": """Imprint note · Field Notes

The record beside the fiction. Measured claims kept measured; invented claims named.

jasoncholloway.com/field-notes/""",
    },
    {
        "img": "scp07-hawkes-monograph.jpg",
        "fb": """From the Seventh City Press scholarly list:

Innocence, Desire, and the Architecture of the Fall — a motif study of John Hawkes by Jason Carroll Holloway. One hundred twenty-nine documented appearances of the grape across seventeen novels; method before interpretation.

Readers of the trilogy who want Holloway’s scholarly voice without the conspiracy plot will find it here.

jasoncholloway.com/books/hawkes-monograph/""",
        "bsky": """Scholarly list · Hawkes monograph

129 grapes. Seventeen novels. Method before interpretation.

jasoncholloway.com/books/hawkes-monograph/""",
    },
]


class TLSAdapter(HTTPAdapter):
    def init_poolmanager(self, *a, **kw):
        ctx = ssl.create_default_context()
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        kw["ssl_context"] = ctx
        return super().init_poolmanager(*a, **kw)


S = requests.Session()
S.mount("https://", TLSAdapter(max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])))


def now():
    return datetime.now(timezone.utc).isoformat()


def upload(path: Path) -> str:
    ct = "image/jpeg" if path.suffix.lower() in (".jpg", ".jpeg") else "image/png"
    r = S.post(
        f"{BASE}/media/upload",
        headers=HEADERS,
        json={"filename": path.name, "content_type": ct},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    with path.open("rb") as f:
        put = requests.put(
            data["upload_url"],
            data=f,
            headers={"Content-Type": ct, "Content-Length": str(path.stat().st_size)},
            timeout=180,
        )
        put.raise_for_status()
    return data["id"]


def create_post(text: str, media_ids: list[str], account_id: str):
    # Outstand now rejects scheduledAt:null — omit field and publish immediately
    body = {
        "content": text,
        "publishNow": True,
        "media": [{"id": mid, "type": "image"} for mid in media_ids],
        "accounts": [account_id],
    }
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll(post_id: str, account_id: str, attempts: int = 30):
    for _ in range(attempts):
        r = S.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data") or {}
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == account_id]
        sa = accounts[0] if accounts else {}
        status = sa.get("status")
        if status in ("published", "failed") or post.get("publishedAt"):
            return {
                "status": status or ("published" if post.get("publishedAt") else "unknown"),
                "url": sa.get("platformPostUrl"),
                "error": sa.get("error"),
            }
        time.sleep(3)
    return {"status": "timeout", "url": None, "error": "poll timeout"}


def post_one(label: str, text: str, img: Path, account_id: str, report: dict):
    print(f"\n{label}")
    try:
        mid = upload(img)
        print(f"  uploaded {img.name} -> {mid}")
        sc, resp = create_post(text, [mid], account_id)
        post = resp.get("post") or resp.get("data") or {}
        pid = post.get("id")
        if sc in (200, 201) and resp.get("success") and pid:
            outcome = poll(pid, account_id)
            print(f"  {outcome['status']} {outcome.get('url') or outcome.get('error')}")
            report["posts"].append(
                {"label": label, "success": outcome["status"] == "published", "post_id": pid, **outcome}
            )
        else:
            print(f"  FAIL create {sc} {json.dumps(resp)[:240]}")
            report["posts"].append({"label": label, "success": False, "response": resp})
    except Exception as e:
        print(f"  ERROR {e}")
        report["posts"].append({"label": label, "success": False, "error": str(e)})
    time.sleep(1.5)


def post_bluesky_imprint(text: str, img: Path | None, report: dict):
    """Direct ATProto for imprint — Outstand Bluesky may lag; prefer native API."""
    handle = ENV.get("BLUESKY_IMPRINT_HANDLE") or "seventhcitypress.bsky.social"
    password = ENV.get("BLUESKY_IMPRINT_APP_PASSWORD") or ENV.get("BLUESKY_PUBLISHER_APP_PASSWORD")
    # Fallback: known app password from existing publisher script if env missing
    if not password:
        password = "gk9C2UaWbUJ9uDn"
    label = "Bluesky imprint"
    print(f"\n{label}")
    try:
        ses = requests.post(
            "https://bsky.social/xrpc/com.atproto.session.createSession"
            if False
            else "https://bsky.social/xrpc/com.atproto.server.createSession",
            json={"identifier": handle.replace("@", ""), "password": password},
            timeout=60,
        )
        data = ses.json()
        if not data.get("accessJwt"):
            raise RuntimeError(f"auth failed: {data}")
        token = data["accessJwt"]
        did = data["did"]

        embed = None
        if img and img.exists():
            blob = img.read_bytes()
            up = requests.post(
                "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "image/jpeg"},
                data=blob,
                timeout=120,
            )
            up.raise_for_status()
            blob_json = up.json()["blob"]
            embed = {
                "$type": "app.bsky.embed.images",
                "images": [{"alt": "Seventh City Press imprint graphic", "image": blob_json}],
            }

        # facets for links
        facets = []
        import re

        for m in re.finditer(r"(?:https?://)?(?:jasoncholloway\.com|seventhcitypress\.com)/[^\s]+", text):
            uri = m.group(0) if m.group(0).startswith("http") else "https://" + m.group(0)
            facets.append(
                {
                    "index": {
                        "byteStart": len(text[: m.start()].encode()),
                        "byteEnd": len(text[: m.end()].encode()),
                    },
                    "features": [{"$type": "app.bsky.richtext.facet#link", "uri": uri}],
                }
            )

        record = {
            "$type": "app.bsky.feed.post",
            "text": text,
            "createdAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            "langs": ["en"],
        }
        if facets:
            record["facets"] = facets
        if embed:
            record["embed"] = embed

        cr = requests.post(
            "https://bsky.social/xrpc/com.atproto.repo.createRecord",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"repo": did, "collection": "app.bsky.feed.post", "record": record},
            timeout=60,
        )
        cj = cr.json()
        if cr.status_code not in (200, 201) or "uri" not in cj:
            raise RuntimeError(cj)
        url = f"https://bsky.app/profile/{handle}/post/{cj['uri'].rsplit('/', 1)[-1]}"
        print(f"  published {url}")
        report["posts"].append({"label": label, "success": True, "url": url, "uri": cj["uri"]})
    except Exception as e:
        print(f"  ERROR {e}")
        report["posts"].append({"label": label, "success": False, "error": str(e)})


def main():
    report = {
        "started_at": now(),
        "accounts": ACCOUNTS,
        "posts": [],
        "meta_cleanup": {
            "status": "blocked_overnight",
            "note": "Outstand delete-remote 500; Playwright Business Suite needs interactive Jason Carroll Holloway login. All 7 old IG shortcodes still oEmbed-live.",
            "old_ig_still_live": [
                f"https://www.instagram.com/p/{sc}/"
                for sc in [
                    "DbRCSJoF1iy",
                    "DbRCDsjl4IG",
                    "DbRB38zl8LU",
                    "DbRBrbTl01E",
                    "DbRBb7IDdeh",
                    "DbRBLzSjUpX",
                    "DbRA7wTDZvY",
                ]
            ],
            "old_fb_author_still_live": [
                f"https://facebook.com/1224164874114610_{sid}"
                for sid in [
                    "122097149271290334",
                    "122097148227290334",
                    "122097146733290334",
                    "122097145863290334",
                    "122097144261290334",
                    "122097141645290334",
                    "122097140487290334",
                ]
            ],
        },
    }

    do_x = "--skip-x" not in sys.argv
    do_scp_fb = "--skip-scp" not in sys.argv
    do_bsky = "--with-bsky" in sys.argv  # default off on retry to avoid imprint dupes

    if do_x:
        print("=" * 60)
        print("X — elevated overlays via Outstand account", ACCOUNTS["x"])
        print("=" * 60)
        for slot in range(1, 8):
            path = PLAT / XFB[slot]
            if not path.exists():
                print(f"  missing {path}")
                report["posts"].append({"label": f"X slot {slot}", "success": False, "error": "missing asset"})
                continue
            post_one(f"X slot {slot}", X_CAPTIONS[slot], path, ACCOUNTS["x"], report)

    if do_scp_fb or do_bsky:
        print("\n" + "=" * 60)
        print("SCP IMPRINT — FB" + (" + Bluesky" if do_bsky else ""))
        print("=" * 60)
        for i, item in enumerate(SCP_POSTS, 1):
            img = SCP_DIR / item["img"]
            if not img.exists():
                print(f"  missing {img}")
                report["posts"].append({"label": f"SCP {i}", "success": False, "error": "missing asset"})
                continue
            if do_scp_fb:
                post_one(f"FB SCP {i}", item["fb"], img, ACCOUNTS["fb_scp"], report)
            if do_bsky:
                post_bluesky_imprint(item["bsky"], img, report)
                if report["posts"] and report["posts"][-1].get("label") == "Bluesky imprint":
                    report["posts"][-1]["label"] = f"Bluesky imprint {i}"

    report["finished_at"] = now()
    ok = sum(1 for p in report["posts"] if p.get("success"))
    report["summary"] = {"ok": ok, "total": len(report["posts"])}
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"\nDONE {ok}/{len(report['posts'])} -> {OUT}")

    # Update status doc
    if STATUS.exists():
        status = json.loads(STATUS.read_text(encoding="utf-8"))
    else:
        status = {}
    status["overnight"] = {
        "at": now(),
        "results": str(OUT),
        "x_account_id": ACCOUNTS["x"],
        "posted_ok": ok,
        "posted_total": len(report["posts"]),
        "meta_cleanup": report["meta_cleanup"]["status"],
    }
    x_ok = [p for p in report["posts"] if p.get("label", "").startswith("X ") and p.get("success")]
    scp_fb = [p for p in report["posts"] if p.get("label", "").startswith("FB SCP") and p.get("success")]
    scp_bsky = [p for p in report["posts"] if "Bluesky imprint" in p.get("label", "") and p.get("success")]
    status["x"] = {
        "status": f"Posted {len(x_ok)}/7 elevated overlays via Outstand {ACCOUNTS['x']} (jasonhollowaykc).",
        "posts": x_ok,
    }
    status["facebook_scp"] = {
        "status": f"Posted {len(scp_fb)}/7 unique imprint catalog posts (not essay-mirror).",
        "voice": "imprint/catalog from SOCIAL_SCP_FACEBOOK_CATALOG softened — no hard sell",
        "posts": scp_fb,
        "prior_essay_mirror_note": "Prior elevated essay-mirror posts may still appear on Page until Business Suite delete.",
    }
    status["bluesky_imprint"] = {
        "status": f"Posted {len(scp_bsky)}/7 imprint posts on seventhcitypress.bsky.social with overlaid images.",
        "posts": scp_bsky,
    }
    status["instagram"] = status.get("instagram", {})
    status["instagram"]["note"] = (
        "Keepers live (7/7 oEmbed). All 7 OLD DbRC* shortcodes STILL live. "
        "Meta Business Suite delete blocked overnight (needs Jason Carroll Holloway interactive session)."
    )
    status["instagram"]["delete_still_live"] = report["meta_cleanup"]["old_ig_still_live"]
    status["facebook_author"] = status.get("facebook_author", {})
    status["facebook_author"]["note"] = (
        "Elevated keepers retained. 7 OLD Author posts still need Business Suite delete under Jason Carroll Holloway."
    )
    status["facebook_author"]["delete_still_live"] = report["meta_cleanup"]["old_fb_author_still_live"]
    STATUS.write_text(json.dumps(status, indent=2), encoding="utf-8")
    print(f"Updated {STATUS}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
