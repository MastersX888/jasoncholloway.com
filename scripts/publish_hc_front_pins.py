"""Publish Masters X HC front-panel pins via Outstand → Pinterest."""

from __future__ import annotations

import json
import ssl
import sys
import time
from pathlib import Path

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(r"C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway")
PIN_DIR = Path(
    r"C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER\_cover_preview\pinterest_front_panels"
)
BASE_URL = "https://api.outstand.so/v1"
RESULTS = PIN_DIR / "outstand_publish_results.json"
PINTEREST_ACCOUNT = "pxPfM"
DEFAULT_BOARD = "1110700395541688804"

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
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        try:
            ctx.set_ciphers("DEFAULT@SECLEVEL=1")
        except Exception:
            pass
        ctx.minimum_version = ssl.TLSVersion.TLSv1_2
        kwargs["ssl_context"] = ctx
        return super().init_poolmanager(*args, **kwargs)


SESSION = requests.Session()
SESSION.verify = False
SESSION.mount(
    "https://",
    TLSAdapter(
        max_retries=Retry(total=4, backoff_factor=1.5, status_forcelist=[502, 503, 504])
    ),
)
try:
    import urllib3

    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
except Exception:
    pass

PINS = [
    {
        "file": "vol1_jacket_front_pin_2000x3000.jpg",
        "title": "Masters X Vol I — The Inheritance | Hardcover",
        "text": "Hardcover front cover — Masters X Volume I: The Inheritance of Frequency by Jason Carroll Holloway. Sacred-geometry design from Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/",
        "link": "https://jasoncholloway.com/books/masters-x/",
    },
    {
        "file": "vol1_case_front_pin_2000x3000.jpg",
        "title": "Masters X Vol I — Case Laminate Front | Hardcover",
        "text": "Case-laminate front panel — Masters X Volume I hardcover. Collector edition art by Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/",
        "link": "https://jasoncholloway.com/books/masters-x/",
    },
    {
        "file": "vol2_jacket_front_pin_2000x3000.jpg",
        "title": "Masters X Vol II — The Grimoire | Hardcover",
        "text": "Hardcover front cover — Masters X Volume II: The Grimoire by Jason Carroll Holloway. Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/",
        "link": "https://jasoncholloway.com/books/masters-x/",
    },
    {
        "file": "vol2_case_front_pin_2000x3000.jpg",
        "title": "Masters X Vol II — Case Laminate Front | Hardcover",
        "text": "Case-laminate front panel — Masters X Volume II hardcover. Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/",
        "link": "https://jasoncholloway.com/books/masters-x/",
    },
    {
        "file": "vol3_jacket_front_pin_2000x3000.jpg",
        "title": "Masters X Vol III — The Kingdom | Hardcover",
        "text": "Hardcover front cover — Masters X Volume III: The Kingdom by Jason Carroll Holloway. Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/",
        "link": "https://jasoncholloway.com/books/masters-x/",
    },
    {
        "file": "vol3_case_front_pin_2000x3000.jpg",
        "title": "Masters X Vol III — Case Laminate Front | Hardcover",
        "text": "Case-laminate front panel — Masters X Volume III hardcover. Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/",
        "link": "https://jasoncholloway.com/books/masters-x/",
    },
    {
        "file": "omnibus_jacket_front_pin_2000x3000.jpg",
        "title": "Masters X Omnibus — Complete Trilogy | Hardcover",
        "text": "Hardcover front cover — Masters X: The Complete Trilogy omnibus by Jason Carroll Holloway. Seventh City Press (IngramSpark print).\n\nhttps://jasoncholloway.com/books/masters-x/omnibus/",
        "link": "https://jasoncholloway.com/books/masters-x/omnibus/",
    },
    {
        "file": "omnibus_case_front_pin_2000x3000.jpg",
        "title": "Masters X Omnibus — Case Laminate Front | Hardcover",
        "text": "Case-laminate front panel — Masters X Complete Trilogy hardcover. Seventh City Press.\n\nhttps://jasoncholloway.com/books/masters-x/omnibus/",
        "link": "https://jasoncholloway.com/books/masters-x/omnibus/",
    },
]


def upload_media(filepath: Path) -> dict:
    ctype = "image/jpeg"
    r = SESSION.post(
        f"{BASE_URL}/media/upload",
        headers=HEADERS,
        json={"filename": filepath.name, "content_type": ctype},
        timeout=60,
    )
    r.raise_for_status()
    data = r.json()["data"]
    media_id = data["id"]
    upload_url = data["upload_url"]
    raw = filepath.read_bytes()
    r2 = SESSION.put(upload_url, data=raw, headers={"Content-Type": ctype}, timeout=180)
    r2.raise_for_status()
    r3 = SESSION.post(
        f"{BASE_URL}/media/{media_id}/confirm",
        headers=HEADERS,
        json={"size": len(raw)},
        timeout=60,
    )
    r3.raise_for_status()
    return {"url": r3.json()["data"]["url"], "filename": filepath.name}


def resolve_board() -> str:
    board = ENV.get("PINTEREST_BOARD_ID") or DEFAULT_BOARD
    for path in (
        f"/social-accounts/{PINTEREST_ACCOUNT}/boards",
        f"/pinterest/{PINTEREST_ACCOUNT}/boards",
    ):
        try:
            r = SESSION.get(f"{BASE_URL}{path}", headers=HEADERS, timeout=20)
            if r.status_code != 200:
                continue
            data = r.json().get("data") or r.json().get("boards") or []
            if not isinstance(data, list):
                continue
            print("Boards:")
            for b in data[:20]:
                print(f"  {b.get('id')} {b.get('name')}")
            for b in data:
                name = (b.get("name") or "").lower()
                if any(k in name for k in ("masters", "literary", "book", "cover")):
                    return str(b["id"])
            if data:
                return str(data[0]["id"])
        except Exception as exc:
            print("board list fail:", path, exc)
    print("fallback board", board)
    return board


def create_pin(content: str, media: dict, board_id: str, title: str, link: str):
    body = {
        "containers": [
            {
                "content": content,
                "media": [{"url": media["url"], "filename": media["filename"]}],
            }
        ],
        "accounts": [PINTEREST_ACCOUNT],
        "pinterest": {
            "board_id": board_id,
            "link": link,
            "title": title,
        },
        "pinterestConfiguration": {"board_id": board_id},
        "networkOverrideConfiguration": {
            PINTEREST_ACCOUNT: {"board_id": board_id}
        },
    }
    r = SESSION.post(f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=60)
    return r.status_code, r.json()


def poll(post_id: str, attempts: int = 30):
    for _ in range(attempts):
        r = SESSION.get(f"{BASE_URL}/posts/{post_id}", headers=HEADERS, timeout=30)
        if r.status_code != 200:
            time.sleep(3)
            continue
        post = r.json().get("post") or r.json().get("data") or {}
        accounts = [
            a for a in post.get("socialAccounts", []) if a.get("id") == PINTEREST_ACCOUNT
        ]
        sa = accounts[0] if accounts else {}
        status = sa.get("status")
        if status in ("published", "failed") or post.get("publishedAt"):
            return {
                "status": status or "published",
                "url": sa.get("platformPostUrl"),
                "error": sa.get("error"),
            }
        time.sleep(3)
    return {"status": "timeout", "url": None, "error": "poll timeout"}


def main() -> int:
    board_id = resolve_board()
    print("Using board:", board_id)
    results = []
    for pin in PINS:
        path = PIN_DIR / pin["file"]
        if not path.exists():
            print("MISSING", path)
            results.append({"file": pin["file"], "success": False, "error": "missing"})
            continue
        print("\n===", pin["file"], "===")
        try:
            media = upload_media(path)
            print("uploaded", media["url"][:80])
            sc, resp = create_pin(pin["text"], media, board_id, pin["title"], pin["link"])
            post = resp.get("post") or resp.get("data") or {}
            pid = post.get("id")
            print("create", sc, "id", pid, "success", resp.get("success"))
            if sc in (200, 201) and pid:
                outcome = poll(pid)
                print("outcome", outcome)
                results.append(
                    {
                        "file": pin["file"],
                        "title": pin["title"],
                        "success": outcome.get("status") == "published",
                        "post_id": pid,
                        **outcome,
                    }
                )
            else:
                # retry simpler payload
                body = {
                    "containers": [
                        {
                            "content": f"{pin['title']}\n\n{pin['text']}",
                            "media": [
                                {"url": media["url"], "filename": media["filename"]}
                            ],
                        }
                    ],
                    "accounts": [PINTEREST_ACCOUNT],
                    "boardId": board_id,
                }
                r2 = SESSION.post(
                    f"{BASE_URL}/posts", headers=HEADERS, json=body, timeout=60
                )
                resp2 = r2.json()
                post2 = resp2.get("post") or resp2.get("data") or {}
                pid2 = post2.get("id")
                print("retry", r2.status_code, pid2, resp2.get("success"), str(resp2)[:300])
                if r2.status_code in (200, 201) and pid2:
                    outcome = poll(pid2)
                    results.append(
                        {
                            "file": pin["file"],
                            "title": pin["title"],
                            "success": outcome.get("status") == "published",
                            "post_id": pid2,
                            **outcome,
                        }
                    )
                else:
                    results.append(
                        {
                            "file": pin["file"],
                            "success": False,
                            "response": resp,
                            "retry": resp2,
                        }
                    )
        except Exception as exc:
            print("FAIL", exc)
            results.append({"file": pin["file"], "success": False, "error": str(exc)})
        time.sleep(1)

    RESULTS.write_text(json.dumps(results, indent=2), encoding="utf-8")
    ok = sum(1 for r in results if r.get("success"))
    print(f"\nDone: {ok}/{len(results)} published → {RESULTS}")
    return 0 if ok == len(results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
