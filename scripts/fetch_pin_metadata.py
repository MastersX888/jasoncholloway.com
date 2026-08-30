#!/usr/bin/env python3
"""Fetch Pinterest pin metadata for audit."""
import re
import sys
import urllib.request

PIN_IDS = sys.argv[1:] if len(sys.argv) > 1 else [
    # Voynich
    "1110700326880453757", "1110700326880453406", "1110700326880453135",
    # Prague
    "1110700326880448119", "1110700326880454440", "1110700326880454593",
    "1110700326880448374", "1110700326880454182",
]


def fetch(pid: str) -> dict:
    req = urllib.request.Request(
        f"https://www.pinterest.com/pin/{pid}/",
        headers={"User-Agent": "Mozilla/5.0"},
    )
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
    link = re.search(r'"link":\s*"(https://jasoncholloway[^"\\]+)"', html)
    title = re.search(r'"title":\s*"([^"]{0,200})"', html)
    desc = re.search(r'"description":\s*"([^"]{0,300})"', html)
    return {
        "id": pid,
        "title": title.group(1) if title else "",
        "description": desc.group(1) if desc else "",
        "link": link.group(1).replace("\\u0026", "&") if link else "",
    }


if __name__ == "__main__":
    for pid in PIN_IDS:
        try:
            d = fetch(pid)
            print(f"{d['id']}\t{d['title'][:60]}\t{d['description'][:80]}\t{d['link'][:70]}")
        except Exception as e:
            print(f"{pid}\tERROR\t{e}")
