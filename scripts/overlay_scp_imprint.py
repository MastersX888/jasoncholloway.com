#!/usr/bin/env python3
"""
Seventh City Press imprint overlays — unique catalog/imprint voice.
"""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from overlay_platform_heroes import overlay_hero  # noqa: E402
from overlay_carousel import BASE  # noqa: E402

SRC = os.path.join(BASE, "public", "social", "imagen")
DST = os.path.join(BASE, "public", "social", "scp-imprint-overlaid")

ITEMS = [
    {
        "src": os.path.join(SRC, "slot1", "slot1-frequency-hero.png"),
        "out": "scp01-imprint-home.jpg",
        "label": "SEVENTH CITY PRESS · IMPRINT",
        "headline": "An independent Kansas City imprint.",
        "body": "Fiction that cites its sources. Research published beside the novels.",
    },
    {
        "src": os.path.join(SRC, "slot7", "slot7-unreleased-hero.png"),
        "out": "scp02-masters-x-trilogy.jpg",
        "label": "CATALOG · MASTERS X",
        "headline": "Three novels. One frequency.",
        "body": "The Inheritance of Frequency · The Grimoire · The Kingdom.",
    },
    {
        "src": os.path.join(SRC, "slot1", "slot1-frequency-hero.png"),
        "out": "scp03-vol1-inheritance.jpg",
        "label": "CATALOG · VOLUME I",
        "headline": "The Inheritance of Frequency",
        "body": "Underground Kansas City. Measured stone. A decimal that belongs to fiction.",
    },
    {
        "src": os.path.join(SRC, "slot4", "slot4-ars-notoria-hero.png"),
        "out": "scp04-vol2-grimoire.jpg",
        "label": "CATALOG · VOLUME II",
        "headline": "The Grimoire",
        "body": "Preparation as curriculum. The Ars Notoria named as source, not decoration.",
    },
    {
        "src": os.path.join(SRC, "slot7", "slot7-unreleased-hero.png"),
        "out": "scp05-vol3-kingdom.jpg",
        "label": "CATALOG · VOLUME III",
        "headline": "The Kingdom",
        "body": "Documentation over confrontation. An ending that chooses open release.",
    },
    {
        "src": os.path.join(SRC, "slot2", "slot2-cymatics-hero.png"),
        "out": "scp06-field-notes.jpg",
        "label": "RESEARCH LAYER · FIELD NOTES",
        "headline": "The record beside the fiction.",
        "body": "Measured claims kept measured. Invented claims named as invented.",
    },
    {
        "src": os.path.join(SRC, "slot5", "slot5-stone-remembers-hero.png"),
        "out": "scp07-hawkes-monograph.jpg",
        "label": "SCHOLARLY LIST · MONOGRAPH",
        "headline": "129 grapes. Seventeen novels.",
        "body": "A motif study of John Hawkes — method before interpretation.",
    },
]


def main():
    os.makedirs(DST, exist_ok=True)
    ok = 0
    for item in ITEMS:
        if not os.path.isfile(item["src"]):
            print(f"  MISSING {item['src']}")
            continue
        out = os.path.join(DST, item["out"])
        overlay_hero(item["src"], out, item["label"], item["headline"], item["body"])
        print(f"  [OK] {item['out']} ({os.path.getsize(out)} bytes)")
        ok += 1
    print(f"Done {ok}/{len(ITEMS)} -> {DST}")


if __name__ == "__main__":
    main()
