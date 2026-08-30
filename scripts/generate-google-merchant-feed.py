#!/usr/bin/env python3
"""Generate Google Merchant Center feed from IngramSpark report.csv.

Deprecated wrapper — prefer:
  python scripts/sync-ingram-metadata.py [path/to/report.csv]
which also refreshes lib/data/ingram-catalog.json and Google Books CSV.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def main() -> None:
    script = Path(__file__).resolve().parent / "sync-ingram-metadata.py"
    report = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Downloads" / "report.csv"
    subprocess.run([sys.executable, str(script), str(report)], check=True)


if __name__ == "__main__":
    main()
