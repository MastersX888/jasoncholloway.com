"""Shared utilities for Operation Pinboard."""

from __future__ import annotations

import json
import logging
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
CONFIG_DIR = ROOT / "config"
OUTPUT_DIR = ROOT / "output"
LOG_DIR = ROOT / "logs"
TOKEN_FILE = ROOT / ".pinterest_token.json"


def ensure_dirs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "images").mkdir(parents=True, exist_ok=True)


def setup_logging(name: str = "pinterest_agent") -> logging.Logger:
    ensure_dirs()
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    file_handler = logging.FileHandler(LOG_DIR / "agent.log")
    file_handler.setFormatter(formatter)
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    logger.addHandler(stream_handler)
    return logger


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def load_canon() -> dict:
    return load_json(CONFIG_DIR / "brand_canon.json")


def canonical_link_prefixes(canon: dict) -> list[str]:
    prefixes: list[str] = []
    for value in canon.get("primary_links", {}).values():
        if isinstance(value, str):
            prefixes.append(value.rstrip("/"))
    retailer = canon.get("retailer_links", {})
    if isinstance(retailer.get("amazon_author_page"), str):
        prefixes.append(retailer["amazon_author_page"].rstrip("/"))
    prefixes.append("https://www.amazon.com/dp/")
    prefixes.append("https://bookshop.org/")
    prefixes.append("https://shop.ingramspark.com/")
    return prefixes


def is_valid_link(link: str, prefixes: list[str]) -> bool:
    if not link:
        return False
    normalized = link.rstrip("/")
    for prefix in prefixes:
        if normalized.startswith(prefix.rstrip("/")):
            return True
    if "amazon.com/dp/" in link or "amazon.com/stores/" in link:
        return True
    if "ingramspark" in link.lower():
        return True
    return False


ISBN_RE = re.compile(r"97[89]\d{10}")


def extract_isbns(text: str) -> list[str]:
    return ISBN_RE.findall(text or "")


def isbn_lookup(canon: dict) -> dict[str, dict]:
    lookup: dict[str, dict] = {}
    for item in canon.get("isbn_matrix", []):
        if "isbn" in item:
            lookup[item["isbn"]] = item
        if "asin" in item:
            lookup[item["asin"]] = item
    return lookup


def rollback_snapshot(label: str, data: Any) -> Path:
    ensure_dirs()
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = OUTPUT_DIR / f"rollback_snapshot_{label}_{stamp}.json"
    save_json(path, data)
    return path
