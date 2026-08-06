# KC Event Discernment Agent

Autonomous discernment (not aggregation) for Jason Holloway / Seventh City Press public presence in Kansas City.

**Charter:** operating requirements from architecture approval 2026-08-04 (Morgan).

## Phases

| Phase | Status | Purpose |
|-------|--------|---------|
| 1 Feed curation | Done — approved seeds; `discover` proposes only | Who we listen to |
| 2 Extraction | Live — web + Bluesky + IG harvest | What counts as an event |
| 3 Scoring | Provisional — feedback loop ready | Which events matter |
| 4 Calendar | ICS → `SCP — KC Events` | Google Calendar (T1/T2) |
| 5 Briefing | Live — `scratch/ops_reports/kc-events/` | Weekly brief for Jason |

## Hard rules

- No auto-follow until rubric validated + Morgan enables it.
- Outstand is **outbound posting only** — never coupled to ingest.
- Kill switch: `KC_EVENTS_PAUSED=1` or `python -m src.cli pause`.
- `author_id` is first-class on every relevance calculation.

## Quick start

```bash
cd kc-events
python -m src.cli init-db
python -m src.cli status
python -m src.cli ingest          # brief + ICS after fetch
python scripts/run_weekly.py      # ingest + brief + ICS + discover + prune + retune
```

## Paths

| Path | Role |
|------|------|
| `config/` | Authors, weights, thresholds, seeds, adapters |
| `data/events.db` | SQLite source of truth |
| `data/raw_ig/` | Browser-harvested Instagram captions |
| `data/scp_kc_events_t1_t2.ics` | Calendar import file |
| `src/` | Pipeline + CLI |
| `../scratch/ops_reports/kc-events/` | Weekly briefs |
