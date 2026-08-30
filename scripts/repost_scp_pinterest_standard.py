#!/usr/bin/env python3
"""
Align Seventh City Press Bluesky + Facebook with the Pinterest elevated standard:
same platform-overlaid pinterest-slot*.jpg field-note graphics + imprint essay voice.

Does NOT touch author IG, author FB, X, or Pinterest itself.
"""

from __future__ import annotations

import json
import os
import re
import ssl
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(__file__).resolve().parents[1]
PLAT = ROOT / "public" / "social" / "platform-overlaid"
OUT = ROOT / ".scp-pinterest-standard-results.json"
STATUS = ROOT / ".social-shore-up-status.json"

ENV: dict[str, str] = {}
for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, v = line.split("=", 1)
        ENV[k.strip()] = v.strip().strip('"').strip("'")

API_KEY = ENV["OUTSTAND_API_KEY"]
BASE = "https://api.outstand.so/v1"
HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
FB_SCP = "IwQhX"

# Same elevated Pinterest assets the user approved
SLOTS = {
    1: {
        "img": "pinterest-slot1-frequency.jpg",
        "alt": "Field note · Frequency — f = 111.2 Hz",
        "title": "The Frequency That Was Already There",
        "bsky": (
            "Field note · Frequency\n\n"
            "Archaeoacousticians documented a resonance near 110 Hz in Neolithic chambers. "
            "The Masters X Trilogy uses 111.2 Hz — the extra decimal is the fiction signing its own work.\n\n"
            "jasoncholloway.com/blog/the-frequency-that-was-already-there/"
        ),
        "fb": """Every page of the Distribution File in the Masters X Trilogy carries the same footer: f = 111.2 Hz.

The number is fiction. The science underneath is not.

Archaeoacousticians have documented a recurring resonance near 110 Hz in ancient stone chambers, from the Hal-Saflieni Hypogeum in Malta to Neolithic cairns across Britain and Ireland. Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.

Our author Jason Carroll Holloway built the trilogy on that research, then moved one decimal past it. The extra tenth of a hertz is the fiction signing its own work: close enough to honor what has been measured, far enough that nobody mistakes his invention for their data.

This is research published beside the novels — caveats left in.

Read the full essay: jasoncholloway.com/blog/the-frequency-that-was-already-there/
Research notes: jasoncholloway.com/field-notes/111-hz/""",
    },
    2: {
        "img": "pinterest-slot2-cymatics.jpg",
        "alt": "Field note · Cymatics — sound into form",
        "title": "Sound Into Form: Hans Jenny and Cymatics",
        "bsky": (
            "Field note · Cymatics\n\n"
            "A metal plate, a violin bow, a spoonful of sand. Chladni, 1787. Hans Jenny made it a discipline. "
            "The novels ask what happens if the geometry remakes the observer.\n\n"
            "jasoncholloway.com/blog/sound-into-form-hans-jenny/"
        ),
        "fb": """A metal plate. A violin bow. A spoonful of sand.

In 1787 Ernst Chladni drew a bow along a sand-covered plate and demonstrated that the sand migrates to the nodal lines. Change the frequency, change the figure. Anyone can reproduce it on a kitchen table.

Hans Jenny spent the 1960s turning that demonstration into cymatics. That is the real floor under everything strange in the Masters X Trilogy. Sound organizes matter: measured. The resulting geometry reorganizes the observer: invented — and named as invented.

Read the full essay: jasoncholloway.com/blog/sound-into-form-hans-jenny/
Research notes: jasoncholloway.com/field-notes/cymatics/""",
    },
    3: {
        "img": "pinterest-slot3-kansas-city.jpg",
        "alt": "Field note · Kansas City ground",
        "title": "Why Kansas City?",
        "bsky": (
            "Field note · Kansas City\n\n"
            "Four traditions looked at the same Missouri river bluffs and decided this ground matters. "
            "Hopewell tombs, Wah-kon-tah, a temple lot still mowed, limestone quarried into SubTropolis.\n\n"
            "jasoncholloway.com/blog/why-kansas-city/"
        ),
        "fb": """Four traditions looked at the same thirty miles of Missouri river bluff and decided this ground matters.

Hopewell stone-vault tombs. Wah-kon-tah. A temple lot still mowed in Independence. Bethany Falls limestone hollowed into SubTropolis.

Jason Carroll Holloway set the Masters X Trilogy here — and named the gap: no published acoustics study of the Kansas City underground. Fiction sited here, not sourced here.

Read the full essay: jasoncholloway.com/blog/why-kansas-city/
Research notes: jasoncholloway.com/field-notes/kansas-city-locations/""",
    },
    4: {
        "img": "pinterest-slot4-ars-notoria.jpg",
        "alt": "Field note · Ars Notoria",
        "title": "The Grimoire That Was a Study Aid",
        "bsky": (
            "Field note · Ars Notoria\n\n"
            "A medieval manuscript condemned not for devil-worship but for cheating — "
            "the liberal arts via geometric figures. British Library, MS Sloane 1712.\n\n"
            "jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/"
        ),
        "fb": """The medieval Church condemned the Ars Notoria. Not for devil-worship, but for cheating.

The manuscript promised the seven liberal arts through contemplation of geometric figures and scheduled prayer. British Library MS Sloane 1712. Claire Fanger and Julien Veronese have spent careers on it.

In the Masters X Trilogy the record ends where the fiction begins: one narrow claim that the method works. No historian claims that. That gap is where the novel lives.

Read the full essay: jasoncholloway.com/blog/the-grimoire-that-was-a-study-aid/
Research notes: jasoncholloway.com/field-notes/ars-notoria/""",
    },
    5: {
        "img": "pinterest-slot5-stone-remembers.jpg",
        "alt": "Field note · The stone remembers",
        "title": "The Stone Remembers",
        "bsky": (
            "Field note · Stone\n\n"
            "In 2011 a Kansas City church burned. The fire took everything except the 1904 limestone walls. "
            "The congregation rebuilt inside them. The fact of the church was mineral.\n\n"
            "jasoncholloway.com/blog/the-stone-remembers/"
        ),
        "fb": """In 2011 Westport Presbyterian Church burned. The fire took the roof, the sanctuary, the woodwork. The 1904 limestone walls stood.

The congregation rebuilt inside the standing walls. The fire could erase the contents but not the fact of the church, because the fact was mineral.

"The stone remembers" was in the manuscript before the research pass found the fire on the public record four miles from the desk.

Read the full essay: jasoncholloway.com/blog/the-stone-remembers/
Research notes: jasoncholloway.com/field-notes/kansas-city-locations/""",
    },
    6: {
        "img": "pinterest-slot6-three-factions.jpg",
        "alt": "Field note · Three factions",
        "title": "Three Factions, One Declassified Document",
        "bsky": (
            "Field note · Factions\n\n"
            "In 1984 American intelligence translated a Chinese journal on paranormal research. "
            "Two governments, one subject, opposite policies. That asymmetry drives the trilogy.\n\n"
            "jasoncholloway.com/blog/three-factions-one-declassified-document/"
        ),
        "fb": """In 1984 American intelligence translated a Chinese government journal on paranormal research and filed the translation.

Two governments, one subject, opposite policies. That asymmetry is the political physics of the Masters X Trilogy. The debate inside the material sorts into suppress, verify, or attend to use — postures that became the Custodians, the Keepers, and the Completion Sect.

The three-way sort is a reading of the file, not a heading inside it. The file is public.

Read the full essay: jasoncholloway.com/blog/three-factions-one-declassified-document/""",
    },
    7: {
        "img": "pinterest-slot7-unreleased.jpg",
        "alt": "Field note · A document that cannot be un-released",
        "title": "A Document That Cannot Be Un-Released",
        "bsky": (
            "Field note · Release\n\n"
            "A conspiracy trilogy that ends not with a confrontation but a license. "
            "247 pages, midnight, CC0. The opposite of classification is not leaking. It is boredom.\n\n"
            "jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/"
        ),
        "fb": """The Masters X Trilogy ends with a license.

Not a chamber stormed. A 247-page file goes onto the open internet at midnight under CC0, and an eight-hundred-year war over a secret loses its object.

The argument: the opposite of classification is not leaking. It is making the work ordinary — documented, reproducible, free. CC0 is real. Open science is real. That is the tradition this press was built to support.

Read the full essay: jasoncholloway.com/blog/a-document-that-cannot-be-unreleased/""",
    },
}


class TLSAdapter(HTTPAdapter):
    def init_poolmanager(self, *a, **kw):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        kw["ssl_context"] = ctx
        return super().init_poolmanager(*a, **kw)


S = requests.Session()
S.verify = False  # local AV TLS intercept breaks CA chain on this machine
requests.packages.urllib3.disable_warnings()  # type: ignore[attr-defined]
S.mount(
    "https://",
    TLSAdapter(max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])),
)


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def bsky_session():
    handle = (
        ENV.get("BLUESKY_IMPRINT_HANDLE")
        or ENV.get("BLUESKY_PUBLISHER_HANDLE")
        or "seventhcitypress.bsky.social"
    )
    password = (
        ENV.get("BLUESKY_IMPRINT_APP_PASSWORD")
        or ENV.get("BLUESKY_PUBLISHER_APP_PASSWORD")
        or ENV.get("BLUESKY_APP_PASSWORD")
    )
    if not password:
        # last-resort: parse from existing publisher script without printing it
        pub = (ROOT / "scripts" / "post-bluesky-publisher.mjs").read_text(encoding="utf-8")
        m = re.search(r'APP_PASSWORD\s*=\s*"([^"]+)"', pub)
        if m:
            password = m.group(1)
    if not password:
        raise RuntimeError("No Bluesky imprint app password in .env")
    r = S.post(
        "https://bsky.social/xrpc/com.atproto.server.createSession",
        json={"identifier": handle.replace("@", ""), "password": password},
        timeout=60,
    )
    data = r.json()
    if not data.get("accessJwt"):
        raise RuntimeError(f"Bluesky auth failed: {data}")
    return data


def bsky_delete_catalog_posts(session: dict, report: dict):
    """Remove prior imprint catalog posts so the feed matches Pinterest standard."""
    token = session["accessJwt"]
    did = session["did"]
    handle = session.get("handle", "seventhcitypress.bsky.social")
    keep_rkeys = set()
    if STATUS.exists():
        st = json.loads(STATUS.read_text(encoding="utf-8"))
        keep_rkeys = set(st.get("bluesky_imprint", {}).get("keep_rkeys") or [])

    # Prefer deleting known overnight catalog rkeys; also wipe recent feed posts that aren't the new set
    feed = S.get(
        f"https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor={handle}&limit=30",
        headers={"Authorization": f"Bearer {token}"},
        timeout=60,
    )
    deleted = []
    if feed.status_code == 200:
        for item in feed.json().get("feed", []):
            uri = item["post"]["uri"]
            rkey = uri.rsplit("/", 1)[-1]
            # Delete everything currently on imprint feed before repost (user wants full visual swap)
            dr = S.post(
                "https://bsky.social/xrpc/com.atproto.repo.deleteRecord",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json={"repo": did, "collection": "app.bsky.feed.post", "rkey": rkey},
                timeout=60,
            )
            deleted.append({"rkey": rkey, "status": dr.status_code, "ok": dr.status_code in (200, 201)})
            time.sleep(0.3)
    report["bluesky_deleted"] = deleted
    print(f"Bluesky deleted {sum(1 for d in deleted if d['ok'])}/{len(deleted)} prior posts")


def bsky_post(session: dict, text: str, img: Path, alt: str) -> dict:
    token = session["accessJwt"]
    did = session["did"]
    handle = session.get("handle", "seventhcitypress.bsky.social")
    blob = img.read_bytes()
    up = S.post(
        "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "image/jpeg"},
        data=blob,
        timeout=120,
    )
    up.raise_for_status()
    blob_json = up.json()["blob"]

    facets = []
    for m in re.finditer(
        r"(?:https?://)?(?:jasoncholloway\.com|seventhcitypress\.com)/[^\s]+", text
    ):
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
        "embed": {
            "$type": "app.bsky.embed.images",
            "images": [{"alt": alt, "image": blob_json}],
        },
    }
    if facets:
        record["facets"] = facets

    cr = S.post(
        "https://bsky.social/xrpc/com.atproto.repo.createRecord",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"repo": did, "collection": "app.bsky.feed.post", "record": record},
        timeout=60,
    )
    cj = cr.json()
    if cr.status_code not in (200, 201) or "uri" not in cj:
        raise RuntimeError(cj)
    rkey = cj["uri"].rsplit("/", 1)[-1]
    return {
        "success": True,
        "url": f"https://bsky.app/profile/{handle}/post/{rkey}",
        "uri": cj["uri"],
        "rkey": rkey,
    }


def upload_outstand(path: Path) -> str:
    ct = "image/jpeg"
    r = S.post(
        f"{BASE}/media/upload",
        headers=HEADERS,
        json={"filename": path.name, "content_type": ct},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    put = requests.put(
        data["upload_url"],
        data=path.read_bytes(),
        headers={"Content-Type": ct, "Content-Length": str(path.stat().st_size)},
        timeout=180,
        verify=False,
    )
    put.raise_for_status()
    return data["id"]


def create_fb_post(text: str, media_id: str) -> tuple[int, dict]:
    body = {
        "content": text,
        "publishNow": True,
        "media": [{"id": media_id, "type": "image"}],
        "accounts": [FB_SCP],
    }
    r = S.post(f"{BASE}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll_fb(post_id: str, attempts: int = 30) -> dict:
    for _ in range(attempts):
        r = S.get(f"{BASE}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data") or {}
        accounts = [a for a in post.get("socialAccounts", []) if a.get("id") == FB_SCP]
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


def try_delete_outstand_fb_scp(report: dict):
    """Best-effort: clear Outstand records for FB SCP (may not remove live Meta posts)."""
    r = S.get(f"{BASE}/posts?limit=100", headers=HEADERS, timeout=60)
    if r.status_code != 200:
        report["fb_outstand_delete"] = {"error": r.status_code, "body": r.text[:200]}
        return
    posts = r.json().get("posts") or r.json().get("data") or []
    deleted = []
    for p in posts:
        accts = [a for a in p.get("socialAccounts", []) if a.get("id") == FB_SCP]
        if not accts:
            continue
        pid = p["id"]
        # Prefer remote delete when platform id exists
        try:
            rd = S.post(
                f"{BASE}/posts/{pid}/delete-remote",
                headers=HEADERS,
                timeout=60,
            )
            deleted.append({"id": pid, "remote": rd.status_code, "body": rd.text[:120]})
        except Exception as e:
            deleted.append({"id": pid, "remote_error": str(e)})
        try:
            d = S.delete(f"{BASE}/posts/{pid}", headers=HEADERS, timeout=60)
            deleted[-1]["local"] = d.status_code
        except Exception as e:
            deleted[-1]["local_error"] = str(e)
        time.sleep(0.4)
    report["fb_outstand_delete"] = deleted
    print(f"Outstand FB SCP delete attempts: {len(deleted)}")


def main():
    dry = "--dry-run" in sys.argv
    report: dict = {"started_at": now(), "posts": [], "dry_run": dry}

    print("=" * 60)
    print("SCP Bluesky + FB -> Pinterest elevated standard")
    print("=" * 60)

    for slot, meta in SLOTS.items():
        path = PLAT / meta["img"]
        if not path.exists():
            raise SystemExit(f"Missing asset: {path}")
        print(f"  slot {slot}: {path.name} ({path.stat().st_size} bytes)")

    if dry:
        print("Dry run only.")
        OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
        return

    # Bluesky: wipe prior imprint posts, then post Pinterest graphics
    print("\n--- Bluesky imprint ---")
    session = bsky_session()
    print(f"Authenticated as @{session.get('handle')}")
    bsky_delete_catalog_posts(session, report)
    bsky_new = []
    for slot, meta in SLOTS.items():
        path = PLAT / meta["img"]
        print(f"\nBluesky slot {slot}")
        try:
            # Bluesky 300 grapheme limit — trim if needed
            text = meta["bsky"]
            if len(text) > 300:
                text = text[:297] + "..."
            res = bsky_post(session, text, path, meta["alt"])
            print(f"  {res['url']}")
            bsky_new.append({"slot": slot, **res})
            report["posts"].append({"label": f"Bluesky {slot}", **res})
        except Exception as e:
            print(f"  ERROR {e}")
            report["posts"].append({"label": f"Bluesky {slot}", "success": False, "error": str(e)})
        time.sleep(1.2)

    # Facebook SCP via Outstand
    print("\n--- Facebook SCP (Outstand) ---")
    try_delete_outstand_fb_scp(report)
    for slot, meta in SLOTS.items():
        path = PLAT / meta["img"]
        print(f"\nFB SCP slot {slot}")
        try:
            mid = upload_outstand(path)
            print(f"  uploaded {mid}")
            sc, resp = create_fb_post(meta["fb"], mid)
            post = resp.get("post") or resp.get("data") or {}
            pid = post.get("id")
            if sc in (200, 201) and resp.get("success") and pid:
                outcome = poll_fb(pid)
                print(f"  {outcome['status']} {outcome.get('url') or outcome.get('error')}")
                report["posts"].append(
                    {
                        "label": f"FB SCP {slot}",
                        "success": outcome["status"] == "published",
                        "post_id": pid,
                        **outcome,
                    }
                )
            else:
                print(f"  FAIL {sc} {json.dumps(resp)[:240]}")
                report["posts"].append(
                    {"label": f"FB SCP {slot}", "success": False, "response": resp}
                )
        except Exception as e:
            print(f"  ERROR {e}")
            report["posts"].append({"label": f"FB SCP {slot}", "success": False, "error": str(e)})
        time.sleep(1.5)

    report["finished_at"] = now()
    report["summary"] = {
        "ok": sum(1 for p in report["posts"] if p.get("success")),
        "total": len(report["posts"]),
    }
    OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"\nWrote {OUT}")
    print(json.dumps(report["summary"], indent=2))

    # Update shore-up status pointer
    if STATUS.exists():
        st = json.loads(STATUS.read_text(encoding="utf-8"))
    else:
        st = {}
    st["scp_pinterest_standard"] = {
        "at": now(),
        "results": str(OUT),
        "note": "FB SCP + Bluesky imprint aligned to elevated Pinterest field-note graphics",
        "bluesky_rkeys": [p.get("rkey") for p in bsky_new if p.get("rkey")],
    }
    STATUS.write_text(json.dumps(st, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
