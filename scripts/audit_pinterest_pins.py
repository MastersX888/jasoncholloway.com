#!/usr/bin/env python3
"""Fetch Pinterest pin outbound links and report duplicates."""

from __future__ import annotations

import re
import time
import urllib.request
from collections import defaultdict

PIN_IDS = [
    "1110700326880448479",
    "1110700326880448473",
    "1110700326880448451",
    "1110700326880448437",
    "1110700326880448412",
    "1110700326880448392",
    "1110700326880448374",
    "1110700326880448364",
    "1110700326880448352",
    "1110700326880448322",
    "1110700326880448186",
    "1110700326880448173",
]


def fetch_pin(pid: str) -> tuple[str, str, str]:
    req = urllib.request.Request(
        f"https://www.pinterest.com/pin/{pid}/",
        headers={"User-Agent": "Mozilla/5.0"},
    )
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
    link_m = re.search(r'"link":\s*"(https://jasoncholloway[^"\\]+)"', html)
    title_m = re.search(r'"title":\s*"([^"]{1,200})"', html)
    desc_m = re.search(r'"description":\s*"([^"]{1,200})"', html)
    link = link_m.group(1) if link_m else "NO_LINK"
    title = (title_m.group(1) if title_m else "") or (desc_m.group(1) if desc_m else "")
    return pid, link, title.replace("\\u0026", "&")


def main() -> None:
    rows: list[tuple[str, str, str]] = []
    for pid in PIN_IDS:
        try:
            row = fetch_pin(pid)
            rows.append(row)
            print(f"{row[0]}\t{row[1]}\t{row[2][:70]}")
        except Exception as exc:
            print(f"{pid}\tERROR\t{exc}")
        time.sleep(0.35)

    by_link: dict[str, list[str]] = defaultdict(list)
    for pid, link, _ in rows:
        if link != "NO_LINK":
            by_link[link.split("?")[0]].append(pid)

    print("\n--- DUPLICATES (same destination, keep lowest ID) ---")
    delete: list[str] = []
    for link, pids in sorted(by_link.items()):
        if len(pids) > 1:
            keep = min(pids)
            dupes = [p for p in pids if p != keep]
            delete.extend(dupes)
            print(f"{link}\n  keep: {keep}\n  delete: {', '.join(dupes)}")

    if delete:
        print("\nDELETE_IDS=" + ",".join(delete))


if __name__ == "__main__":
    main()
