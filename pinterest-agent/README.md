# Operation Pinboard — Seventh City Press Pinterest Agent

A complete Pinterest API v5 workflow for auditing, deduplicating, analyzing, and managing the Seventh City Press Pinterest presence.

## Setup

### 1. Install Dependencies

```bash
cd pinterest-agent
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file:

```env
PINTEREST_APP_ID=your_app_id
PINTEREST_APP_SECRET=your_app_secret
PINTEREST_ACCESS_TOKEN=your_access_token
```

### 3. Obtain Access Token

If you don't have an access token yet:

```bash
python pinterest_auth.py
```

This will guide you through the OAuth2 flow.

## Execution Pipeline

Run phases in order. Each phase depends on output from the previous one.

### Phase 1: Audit

```bash
python phase1_audit.py
```

Crawls all boards, sections, and pins. Validates against brand canon. Outputs `output/audit_report.json`.

### Phase 2: Deduplication

```bash
python phase2_dedup.py
# Skip slow image hashing:
python phase2_dedup.py --skip-images
```

Detects title, link, and image duplicates. Outputs `output/removal_plan.json`. **Never auto-deletes.**

### Phase 3: Content Gap Analysis

```bash
python phase3_analyze.py
```

Compares current state against `config/board_taxonomy.json`. Outputs `output/content_plan.json`.

### Phase 4: Content Generation

```bash
python phase4_generate.py
```

Generates pin specs from templates. Validates against brand canon. Outputs `output/staged_pins.json` for human review.

### Phase 5: Publishing

```bash
# Dry run (default — shows what would happen):
python phase5_publish.py

# Live publish (requires typing 'PUBLISH' to confirm):
python phase5_publish.py --live
```

Creates missing boards and publishes pins. **Always dry-run first.**

## Configuration

- `config/brand_canon.json` — Source of truth for all brand data
- `config/board_taxonomy.json` — Ideal board structure blueprint
- `config/pin_templates.json` — SEO-optimized pin description templates

## Safety Rules

1. `dry_run=True` is **always** the default
2. Destructive operations require explicit confirmation
3. All operations are logged to `logs/agent.log`
4. Rollback snapshots are created before batch operations
5. ISBNs and links are validated against brand canon before publishing
6. No content is auto-published without human review

## Account Details

- Business Account ID: `1110700464259220749`
- Account: `0j0tfx8vg245k2857342ychwu8m2b8`

## Brand Canon

All content must adhere to the brand canon in `config/brand_canon.json`. Key facts:

- **Author**: Jason Carroll Holloway
- **Imprint**: Seventh City Press LLC, Kansas City, Missouri
- **Voynich Manuscript**: Yale Beinecke Library, MS 408
- **SubTropolis**: Real underground complex, Kansas City MO
- **Schumann Resonance**: 7.83 Hz
- **Ernst Chladni**: 1756–1827
- **Hans Jenny**: 1904–1972
- **Codex Gigas**: National Library of Sweden, Stockholm
