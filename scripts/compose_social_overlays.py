#!/usr/bin/env python3
"""
DEPRECATED alternate composer.

Canonical pipeline (panel redesign):
  python scripts/overlay_carousel.py
  python scripts/overlay_platform_heroes.py

See content/social/REDESIGN_BRIEF.md
"""

import sys

print(
    "Use scripts/overlay_carousel.py and scripts/overlay_platform_heroes.py "
    "(see content/social/REDESIGN_BRIEF.md).",
    file=sys.stderr,
)
sys.exit(2)
