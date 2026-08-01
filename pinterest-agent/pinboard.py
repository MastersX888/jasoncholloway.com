#!/usr/bin/env python3
"""Operation Pinboard — Seventh City Press Pinterest agent CLI."""

from __future__ import annotations

import argparse
import sys

from agent_utils import ensure_dirs, setup_logging

logger = setup_logging()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Operation Pinboard — Seventh City Press Pinterest audit & content agent"
    )
    sub = parser.add_subparsers(dest="command", required=True)

    auth_p = sub.add_parser("auth", help="Run OAuth flow and save token")
    auth_p.add_argument("--manual", action="store_true", help="Paste auth code manually")

    sub.add_parser("audit", help="Phase 1 — full account audit")
    audit_p = sub.add_parser("audit-full", help="Phase 1 with pin analytics (may require Standard access)")
    audit_p.add_argument("--analytics", action="store_true")

    sub.add_parser("dedup", help="Phase 2 — detect duplicates")
    dedup_p = sub.add_parser("dedup-execute", help="Phase 2b — execute approved removals")
    dedup_p.add_argument("--approve-all", action="store_true", help="Approve all removals (dangerous)")

    sub.add_parser("analyze", help="Phase 3 — content gap analysis")
    sub.add_parser("generate", help="Phase 4 — generate staged_pins.json")
    pub_p = sub.add_parser("publish", help="Phase 5 — publish staged pins")
    pub_p.add_argument("--live", action="store_true", help="Publish for real (not dry-run)")

    sub.add_parser("all", help="Run audit -> dedup -> analyze -> generate (no publish)")

    args = parser.parse_args()
    ensure_dirs()

    if args.command == "auth":
        from pinterest_auth import run_oauth_flow

        run_oauth_flow(manual=args.manual)
        return 0

    if args.command == "audit":
        from phase1_audit import audit

        audit(include_analytics=False)
        return 0

    if args.command == "audit-full":
        from phase1_audit import audit

        audit(include_analytics=True)
        return 0

    if args.command == "dedup":
        from phase2_dedup import detect_duplicates

        detect_duplicates()
        return 0

    if args.command == "dedup-execute":
        from phase2_dedup import detect_duplicates, execute_removals
        from agent_utils import load_json, save_json, OUTPUT_DIR

        detect_duplicates()
        if args.approve_all:
            d = load_json(OUTPUT_DIR / "duplicates.json")
            for item in d["removal_plan"]:
                item["approved"] = True
            save_json(OUTPUT_DIR / "duplicates.json", d)
        execute_removals(dry_run=False)
        return 0

    if args.command == "analyze":
        from phase3_analyze import analyze_gaps

        analyze_gaps()
        return 0

    if args.command == "generate":
        from phase4_generate import generate_staged_pins

        generate_staged_pins()
        return 0

    if args.command == "publish":
        from phase5_publish import publish

        publish(dry_run=not args.live)
        return 0

    if args.command == "all":
        from phase1_audit import audit
        from phase2_dedup import detect_duplicates
        from phase3_analyze import analyze_gaps
        from phase4_generate import generate_staged_pins

        audit()
        detect_duplicates()
        analyze_gaps()
        generate_staged_pins()
        print("\nPipeline complete through Phase 4. Review output/ then: python pinboard.py publish")
        return 0

    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
