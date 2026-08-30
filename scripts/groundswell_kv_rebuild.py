#!/usr/bin/env python3
"""
Rebuild Groundswell KV dashboard-state from committed static assets + Outstand.

Use when KV was wiped (sales-only push) or /api/refresh could not merge snapshot
(CF Access blocked Worker self-fetch before ASSETS binding fix).
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GROUNDSWELL = ROOT / "groundswell-monitor"
DEFAULT_KV_NS = "6f0e96702c3d4da4ad652abd51b5d82e"
KV_KEY = "dashboard-state"

sys.path.insert(0, str(GROUNDSWELL / "pipeline"))

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
    load_dotenv(GROUNDSWELL / "pipeline" / ".env")
except ImportError:
    pass

from social_ingest import build_morning_brief, fetch_social_block  # noqa: E402


def _run_wrangler(*args: str) -> subprocess.CompletedProcess[str]:
    import shutil

    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        raise RuntimeError("npx not found on PATH")
    return subprocess.run(
        [npx, "wrangler", *args],
        cwd=GROUNDSWELL,
        capture_output=True,
        text=True,
        check=False,
    )


def kv_get(namespace_id: str) -> dict:
    proc = _run_wrangler("kv", "key", "get", f"--namespace-id={namespace_id}", KV_KEY)
    out = (proc.stdout or "").strip()
    if not out or out == "Value not found" or proc.returncode != 0:
        return {}
    return json.loads(out)


def kv_put(namespace_id: str, state: dict) -> None:
    payload = json.dumps(state, separators=(",", ":"))
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".json", delete=False) as tmp:
        tmp.write(payload)
        tmp_path = tmp.name
    try:
        proc = _run_wrangler(
            "kv", "key", "put", f"--namespace-id={namespace_id}", KV_KEY, f"--path={tmp_path}"
        )
        if proc.returncode != 0:
            raise RuntimeError((proc.stderr or proc.stdout or "kv put failed").strip())
    finally:
        Path(tmp_path).unlink(missing_ok=True)


def merge_snapshot(state: dict, snapshot: dict) -> None:
    if not snapshot or not snapshot.get("date"):
        return
    snaps = state.setdefault("snapshots", [])
    idx = next((i for i, s in enumerate(snaps) if s.get("date") == snapshot["date"]), None)
    if idx is not None:
        snaps[idx] = {**snaps[idx], **snapshot}
    else:
        snaps.append(snapshot)
    snaps.sort(key=lambda s: s.get("date") or "")


def apply_terms(state: dict, terms_doc: dict) -> None:
    terms = [t for t in terms_doc.get("terms", []) if t.get("enabled", True) is not False]
    state["terms"] = [{"t": t["t"], "anchor": bool(t.get("anchor")), "tier": t.get("tier", 2)} for t in terms]
    pool = terms_doc.get("context_pool") or []
    tier1 = [t["t"] for t in terms if t.get("tier") == 1]
    state["profile"] = list(dict.fromkeys([*tier1, *pool]))[:24]


def merge_import_sales(state: dict) -> bool:
    imports = (state.get("imports") or {}).get("sales") or []
    if not imports:
        return False
    by_title: dict[str, int] = {}
    for row in imports:
        key = row.get("id") or row.get("title")
        if not key:
            continue
        by_title[key] = by_title.get(key, 0) + int(row.get("units") or 0)
    if not by_title:
        return False
    today = datetime.now(timezone.utc).date().isoformat()
    snaps = state.setdefault("snapshots", [])
    snap = next((s for s in snaps if s.get("date") == today), None)
    if not snap:
        snap = {"date": today}
        snaps.append(snap)
    snap["sales"] = {**(snap.get("sales") or {}), **by_title}
    snaps.sort(key=lambda s: s.get("date") or "")
    return True


def main() -> int:
    ns = os.environ.get("GROUND_SWELL_KV_NS", DEFAULT_KV_NS)
    state = kv_get(ns)

    snap_path = GROUNDSWELL / "public" / "mock_snapshot_single.json"
    terms_path = GROUNDSWELL / "public" / "data" / "terms.json"
    rollups_path = GROUNDSWELL / "public" / "data" / "ops_rollups.json"

    notes = []
    if snap_path.is_file():
        snapshot = json.loads(snap_path.read_text(encoding="utf-8"))
        merge_snapshot(state, snapshot)
        notes.append(f"snapshot {snapshot.get('date')}")
    else:
        notes.append("snapshot missing")

    if terms_path.is_file():
        apply_terms(state, json.loads(terms_path.read_text(encoding="utf-8")))
        notes.append("terms")

    if rollups_path.is_file():
        state["ops_rollups"] = json.loads(rollups_path.read_text(encoding="utf-8"))
        notes.append("ops_rollups")

    if merge_import_sales(state):
        notes.append("sales merged")

    api_key = os.environ.get("OUTSTAND_API_KEY", "").strip()
    social_ok = False
    if api_key:
        prev = state.get("social_followers") or {}
        social = fetch_social_block(prev)
        social_ok = bool(social.get("ok"))
        if social.get("followers_state"):
            state["social_followers"] = social["followers_state"]
        state["social"] = {k: v for k, v in social.items() if k != "followers_state"}
        snap_date = snapshot.get("date") if snap_path.is_file() else None
        state["morning_brief"] = build_morning_brief(social, snap_date)
        notes.append(f"outstand {social.get('summary', {}).get('metrics_ok', 0)}/7")
    else:
        notes.append("outstand skipped (no key)")

    if not state.get("econ"):
        state["econ"] = {
            "inheritance": {"rpu": 8},
            "grimoire": {"rpu": 8},
            "kingdom": {"rpu": 8},
            "omnibus": {"rpu": 25},
            "hawkes": {"rpu": 12},
        }

    state["refreshed_at"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    kv_put(ns, state)

    print(
        json.dumps(
            {
                "ok": True,
                "notes": notes,
                "snapshots": len(state.get("snapshots") or []),
                "social_ok": social_ok,
                "has_terms": bool(state.get("terms")),
                "sales_rows": len((state.get("imports") or {}).get("sales") or []),
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
