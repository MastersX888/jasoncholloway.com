# Metadata Monitoring Pipeline v2

Production-grade metadata audit, diff, and review system. Scrapes book metadata from multiple sources (OpenLibrary, Google Books, and more via plugins), compares against a baseline CSV, routes discrepancies to a human review queue or automated patch handler, and serves a live dashboard.

---

## Architecture

```
run_sweep.py                    ← CLI entry point / orchestrator
├── scrapers/                   ← Plugin-based scraper registry
│   ├── base.py                 ← BaseScraper + ScraperRegistry + ScrapedRecord
│   ├── openlibrary.py          ← OpenLibrary Books API
│   ├── google_books.py         ← Google Books API
│   └── html_meta.py            ← Local HTML OG/Twitter meta tags
├── auditors/
│   └── isbn_auditor.py         ← Diff engine: ScrapedRecord × BaselineRecord → AuditResult
├── handlers/
│   ├── review_queue.py         ← Async SQLAlchemy queue operations
│   └── patch_handler.py        ← Auto-patch dispatcher (strategy pattern)
├── core/
│   ├── models.py               ← ORM: AuditRun, ReviewItem (SQLAlchemy 2.x)
│   ├── database.py             ← Async engine, session factory, init_db()
│   └── normalizers.py          ← Centralized text/date normalization
├── api/
│   ├── main.py                 ← FastAPI app (dashboard + REST + SSE)
│   └── templates/dashboard.html ← Live Jinja2 dashboard
├── scheduler/
│   └── cron.py                 ← APScheduler in-process cron
├── config/
│   └── settings.toml           ← All configuration (no hardcoded paths)
├── tests/
│   └── test_auditors.py        ← Pytest unit tests
├── .github/workflows/
│   └── audit_sweep.yml         ← GitHub Actions nightly cron
├── Dockerfile
└── docker-compose.yml
```

---

## Quick Start

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Run a sweep (CLI)

```bash
# Sweep from a baseline CSV
python run_sweep.py --csv path/to/baseline.csv

# Sweep specific ISBNs
python run_sweep.py --isbn 9798295884412 9798256072704

# Sweep with specific sources only
python run_sweep.py --csv baseline.csv --sources openlibrary

# Limit concurrency
python run_sweep.py --csv baseline.csv --concurrency 5
```

### 3. Launch the dashboard

```bash
uvicorn api.main:app --reload --port 8000
# Open http://localhost:8000
```

### 4. Run with Docker

```bash
docker-compose up --build
# Dashboard at http://localhost:8000
```

---

## Configuration

All settings live in `config/settings.toml`. Override the database at runtime via environment variable:

```bash
export DATABASE_URL="postgresql+asyncpg://user:pass@localhost/metadata"
python run_sweep.py --csv baseline.csv
```

Key settings:

| Setting | Default | Description |
|---|---|---|
| `database.url` | `sqlite+aiosqlite:///./metadata_pipeline.db` | DB connection string |
| `scraping.max_concurrent_requests` | `10` | Semaphore for concurrent ISBN sweeps |
| `scraping.retry_attempts` | `3` | HTTP retry count per ISBN per scraper |
| `scheduler.sweep_cron` | `0 2 * * *` | Nightly cron (UTC) |
| `scheduler.enabled` | `false` | Enable in-process APScheduler |

---

## Adding a New Scraper

1. Create `scrapers/your_source.py`
2. Subclass `BaseScraper` and set `SOURCE_NAME`
3. Implement `async def fetch(self, isbn, client) -> ScrapedRecord`
4. Add the import to `scrapers/__init__.py`

That's it. The `ScraperRegistry` auto-discovers it; the sweep pipeline includes it automatically.

```python
# scrapers/worldcat.py
from scrapers.base import BaseScraper, ScrapedRecord
import httpx

class WorldCatScraper(BaseScraper):
    SOURCE_NAME = "worldcat"

    async def fetch(self, isbn: str, client: httpx.AsyncClient) -> ScrapedRecord:
        record = ScrapedRecord(isbn=isbn, source_name=self.SOURCE_NAME, source_url="...")
        # ... fetch and parse
        return record
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Live dashboard |
| `GET` | `/api/queue` | Pending review items (JSON) |
| `GET` | `/api/queue/summary` | Aggregate counts |
| `PATCH` | `/api/queue/{id}` | Resolve a queue item |
| `GET` | `/api/runs` | Audit run history |
| `POST` | `/api/runs` | Trigger a sweep |
| `GET` | `/api/runs/stream` | SSE: live sweep progress |
| `GET` | `/docs` | Swagger UI |

---

## GitHub Actions

The workflow at `.github/workflows/audit_sweep.yml` runs nightly at 2 AM UTC.

**Required secrets** (set in repo Settings → Secrets):
- `GOOGLE_BOOKS_API_KEY` (optional, increases rate limit)
- `OPENLIBRARY_USERNAME` / `OPENLIBRARY_PASSWORD` (for auto-patch)
- `SLACK_WEBHOOK_URL` (optional, for failure notifications)

**Manual trigger**: Actions → Nightly Metadata Sweep → Run workflow → enter ISBNs

---

## Running Tests

```bash
pytest tests/ -v
pytest tests/ -v --cov=. --cov-report=term-missing
```

---

## Migration from v1

| v1 | v2 |
|---|---|
| `scrape_metadata.py` | `scrapers/html_meta.py` (`HtmlMetaScraper`) |
| `metadata_audit_all.py` | `auditors/isbn_auditor.py` + `run_sweep.py` |
| `metadata_audit_script.py` | `run_sweep.py` (full orchestration) |
| `metadata_diff.py` | `auditors/isbn_auditor.py` (`ISBNAuditor.audit()`) |
| `metadata_sweep.py` | `run_sweep.py --isbn ...` |
| `human_review_queue` (stub) | `handlers/review_queue.py` |
| `automated_patch_handler` (stub) | `handlers/patch_handler.py` |
| Hardcoded CSV paths | `--csv` CLI arg or `DATABASE_URL` env var |
| Static `metadata_report.html` | Live dashboard at `http://localhost:8000` |
| `review_queue.db` (sync sqlite3) | SQLAlchemy async ORM (SQLite → PostgreSQL) |
