#!/usr/bin/env python3
"""Push Outstand social + morning brief into Groundswell Worker KV via wrangler."""

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


def _wrangler_cmd(*args: str) -> list[str]:
    import shutil

    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        raise RuntimeError("npx not found on PATH")
    return [npx, "wrangler", *args]


def _run_wrangler(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        _wrangler_cmd(*args),
        cwd=GROUNDSWELL,
        capture_output=True,
        text=True,
        check=False,
    )


def kv_get(namespace_id: str) -> dict:
    proc = _run_wrangler("kv", "key", "get", f"--namespace-id={namespace_id}", KV_KEY)
    out = (proc.stdout or "").strip()
    err = (proc.stderr or "").strip()
    if proc.returncode != 0 and "Value not found" not in out and "Value not found" not in err:
        raise RuntimeError(err or out or "kv get failed")
    if not out or out == "Value not found":
        return {}
    return json.loads(out)


def kv_put(namespace_id: str, state: dict) -> None:
    payload = json.dumps(state, separators=(",", ":"))
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".json", delete=False) as tmp:
        tmp.write(payload)
        tmp_path = tmp.name
    try:
        proc = _run_wrangler(
            "kv",
            "key",
            "put",
            f"--namespace-id={namespace_id}",
            KV_KEY,
            f"--path={tmp_path}",
        )
        if proc.returncode != 0:
            raise RuntimeError((proc.stderr or proc.stdout or "kv put failed").strip())
    finally:
        Path(tmp_path).unlink(missing_ok=True)


def main() -> int:
    api_key = os.environ.get("OUTSTAND_API_KEY", "").strip()
    if not api_key:
        print("OUTSTAND_API_KEY not set (root .env or environment)", file=sys.stderr)
        return 1

    ns = os.environ.get("GROUND_SWELL_KV_NS", DEFAULT_KV_NS)
    prev_followers = {}
    state = kv_get(ns)
    prev_followers = state.get("social_followers") or {}

    social = fetch_social_block(prev_followers)
    if social.get("followers_state"):
        state["social_followers"] = social["followers_state"]
    state["social"] = {k: v for k, v in social.items() if k != "followers_state"}

    snap_date = None
    snaps = state.get("snapshots") or []
    if snaps:
        snap_date = snaps[-1].get("date")
    state["morning_brief"] = build_morning_brief(social, snap_date)
    state["refreshed_at"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

    kv_put(ns, state)
    summary = social.get("summary") or {}
    print(
        json.dumps(
            {
                "ok": True,
                "metrics_ok": summary.get("metrics_ok"),
                "platforms_checked": summary.get("platforms_checked"),
                "unassigned_queue": summary.get("unassigned_queue"),
                "failed_posts": summary.get("failed_posts"),
            }
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
