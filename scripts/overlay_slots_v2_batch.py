#!/usr/bin/env python3
"""
Batch v2 overlays for social slots 2–7 (Jason approved v2 system on slot 1).

Outputs:
  public/social/imagen-overlaid/slotN/v2/ig-slotN-slideNN-v2.jpg
  public/social/platform-overlaid/*-v2.jpg

Does not touch Outstand or live posts.
See content/social/SLOTS_V2_BATCH_REPORT.md
"""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from overlay_carousel import (  # noqa: E402
    BASE,
    CAROUSEL_DATA,
    add_text_overlay,
    slide_role,
)
from overlay_platform_heroes import HEROES, PIN_DIR, SRC_DIR, resolve_src  # noqa: E402
from overlay_slot1_v2 import overlay_platform_hero_v2  # noqa: E402

IG_OUT_BASE = os.path.join(BASE, "public", "social", "imagen-overlaid")
PLATFORM_OUT = os.path.join(BASE, "public", "social", "platform-overlaid")
COVERS = os.path.join(BASE, "public", "covers")

# Volume whisper per slot (Vol I default; omnibus on slot 7)
SLOT_COVER = {
    1: os.path.join(COVERS, "book1-hardcover-v3.png"),
    2: os.path.join(COVERS, "book1-hardcover-v3.png"),
    3: os.path.join(COVERS, "book1-hardcover-v3.png"),
    4: os.path.join(COVERS, "book2-hardcover-v3.png"),
    5: os.path.join(COVERS, "book1-hardcover-v3.png"),
    6: os.path.join(COVERS, "book3-hardcover-v3.png"),
    7: os.path.join(COVERS, "omnibus-hardcover-v3.png"),
}

# Optional IG slide-01 ground override (slot 1 uses chamber-only stamp; 2–7 use carousel slide01)
SLOT_IG_HOOK_GROUND: dict[int, str | None] = {
    1: os.path.join(SRC_DIR, "slot1", "slot1-frequency-stamp-x.png"),
}


def v2_out_name(base_out: str) -> str:
    """pinterest-slot2-cymatics.jpg -> pinterest-slot2-cymatics-v2.jpg"""
    root, ext = os.path.splitext(base_out)
    if root.endswith("-v2"):
        return base_out
    return f"{root}-v2{ext if ext else '.jpg'}"


def process_ig_carousel(slot: int) -> tuple[int, list[str]]:
    slides = CAROUSEL_DATA[slot]
    slot_src = os.path.join(SRC_DIR, f"slot{slot}")
    slot_dst = os.path.join(IG_OUT_BASE, f"slot{slot}", "v2")
    os.makedirs(slot_dst, exist_ok=True)
    cover = SLOT_COVER.get(slot)
    ok = 0
    issues: list[str] = []
    total = len(slides)

    for idx, (headline, body) in enumerate(slides, start=1):
        src_file = f"ig-slot{slot}-slide{idx:02d}.png"
        if idx == 1 and slot in SLOT_IG_HOOK_GROUND:
            hook = SLOT_IG_HOOK_GROUND[slot]
            if hook and os.path.isfile(hook):
                src_path = hook
            else:
                src_path = os.path.join(slot_src, src_file)
        else:
            src_path = os.path.join(slot_src, src_file)

        dst_path = os.path.join(slot_dst, f"ig-slot{slot}-slide{idx:02d}-v2.jpg")
        if not os.path.isfile(src_path):
            issues.append(f"MISSING IG ground: {src_path}")
            continue
        role = slide_role(idx, total)
        try:
            add_text_overlay(
                src_path,
                headline,
                body,
                dst_path,
                idx,
                total,
                slot,
                role,
                v2=True,
                product_whisper=(idx == 1),
                cover_path=cover,
            )
            ok += 1
            print(f"  [OK] slot{slot}/v2/slide{idx:02d}: {headline}")
        except Exception as e:
            issues.append(f"ERROR slot{slot}/slide{idx:02d}: {e}")

    return ok, issues


def process_platform_heroes(slots: list[int]) -> tuple[int, list[str]]:
    ok = 0
    issues: list[str] = []
    for item in HEROES:
        slot = item["slot"]
        if slot not in slots:
            continue
        src = resolve_src(item)
        if not src:
            issues.append(f"MISSING platform ground for {item['out']}")
            continue
        out_name = v2_out_name(
            os.path.splitext(item["out"])[0] + ".jpg"
            if not item["out"].lower().endswith((".jpg", ".jpeg"))
            else item["out"]
        )
        out_path = os.path.join(PLATFORM_OUT, out_name)
        cover = SLOT_COVER.get(slot)
        try:
            overlay_platform_hero_v2(
                src,
                out_path,
                item["label"],
                item["headline"],
                item["body"],
                cover_path=cover,
                portrait=bool(item.get("portrait")),
            )
            ok += 1
            print(f"  [OK] platform v2: {out_name}")
        except Exception as e:
            issues.append(f"ERROR platform {item['out']}: {e}")
    return ok, issues


def main():
    slots = list(range(2, 8))
    if len(sys.argv) > 1:
        slots = [int(a) for a in sys.argv[1:]]

    os.makedirs(PLATFORM_OUT, exist_ok=True)
    ig_total = 0
    plat_total = 0
    all_issues: list[str] = []

    print(f"=== v2 batch: slots {slots} ===\nIG carousels:")
    for slot in slots:
        ok, issues = process_ig_carousel(slot)
        ig_total += ok
        all_issues.extend(issues)

    print("\nPlatform heroes (X/FB + Pinterest):")
    ok, issues = process_platform_heroes(slots)
    plat_total += ok
    all_issues.extend(issues)

    print(f"\n=== Done: {ig_total} IG slides, {plat_total} platform assets ===")
    if all_issues:
        print("Issues:")
        for iss in all_issues:
            print(f"  - {iss}")
        sys.exit(1)


if __name__ == "__main__":
    main()
