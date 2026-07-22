# Operation Pinboard

Seventh City Press Pinterest audit & content agent.

**App ID:** 1593046 (Trial access)  
**Privacy policy:** https://seventhcitypress.com/privacy/

## Quick start

```bash
cd pinterest-agent
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # add APP_SECRET from Pinterest developer portal
```

### 1. Register redirect URI in Pinterest app

Add to your app at https://developers.pinterest.com/apps/:

```text
http://127.0.0.1:8085/callback
```

### 2. Authenticate

```bash
python pinboard.py auth
# or: python pinboard.py auth --manual
```

Copy `PINTEREST_ACCESS_TOKEN` into `.env`.

### 3. Run pipeline

```bash
python pinboard.py all          # audit → dedup → gap analysis → generate
python pinboard.py publish      # dry-run publish preview
```

## Phases

| Command | Phase | Output |
|---------|-------|--------|
| `auth` | 0 | `.pinterest_token.json` |
| `audit` | 1 | `output/audit_report.json`, `.html` |
| `dedup` | 2 | `output/duplicates.json` |
| `analyze` | 3 | `output/content_plan.json` |
| `generate` | 4 | `output/staged_pins.json` |
| `publish` | 5 | `output/publish_results.json` |

## Safety rules

- **Dedup deletes** require approval in `duplicates.json` (`approved: true`) or `--approve-all`
- **Publish** is dry-run unless `--live`
- **Staged pins** require `"approved": true` in `staged_pins.json` before live publish
- All API calls logged to `logs/agent.log`

## Trial vs Standard

Trial access creates **sandbox pins** (visible only to you). For public pin automation, upgrade to Standard access with an OAuth demo video.

Manual pinning + Rich Pins do not require Standard access.

## Config

- `config/brand_canon.json` — ISBNs, links, pillars
- `config/board_taxonomy.json` — target board structure
- `config/pin_templates.json` — SEO templates + seed pins

## Approve staged pins for publish

Edit `output/staged_pins.json` — set `"approved": true` and `"requires_review": false` on pins you want live, then:

```bash
python pinboard.py publish --live
```
