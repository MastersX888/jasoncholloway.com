-- KC Event Discernment — SQLite schema
-- author_id is first-class from day one (multi-author scale)

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS authors (
  author_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  geo_anchor TEXT NOT NULL DEFAULT 'kansas-city-metro',
  theme_tags TEXT NOT NULL DEFAULT '[]',  -- JSON array
  audience_tags TEXT NOT NULL DEFAULT '[]',
  scoring_weight_overrides TEXT,          -- JSON object or NULL = use global
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS accounts (
  account_id TEXT PRIMARY KEY,            -- e.g. bluesky:kclibrary.bsky.social
  platform TEXT NOT NULL,                 -- bluesky | instagram | x | facebook | web_calendar | other
  handle TEXT NOT NULL,
  display_name TEXT NOT NULL,
  profile_url TEXT,
  calendar_url TEXT,                      -- public calendar when available
  category TEXT NOT NULL,
  follow_status TEXT NOT NULL DEFAULT 'candidate',
  -- candidate | approved | rejected | hold | followed | unfollowed
  nomination_source TEXT NOT NULL DEFAULT 'seed',
  -- seed | co-follow | hashtag | cross-mention | manual
  rubric_geo INTEGER NOT NULL DEFAULT 0 CHECK (rubric_geo BETWEEN 0 AND 3),
  rubric_audience INTEGER NOT NULL DEFAULT 0 CHECK (rubric_audience BETWEEN 0 AND 3),
  rubric_event_density INTEGER NOT NULL DEFAULT 0 CHECK (rubric_event_density BETWEEN 0 AND 3),
  rubric_credibility INTEGER NOT NULL DEFAULT 0 CHECK (rubric_credibility BETWEEN 0 AND 3),
  rubric_thematic INTEGER NOT NULL DEFAULT 0 CHECK (rubric_thematic BETWEEN 0 AND 3),
  rubric_total INTEGER NOT NULL DEFAULT 0,
  rubric_recommendation TEXT NOT NULL DEFAULT 'reject',
  -- recommend_follow | hold | reject
  notes TEXT,
  approved_at TEXT,
  followed_at TEXT,
  last_signal_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS follow_audit (
  audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id TEXT NOT NULL REFERENCES accounts(account_id),
  action TEXT NOT NULL,                   -- propose | approve | reject | follow | unfollow | flag_prune
  actor TEXT NOT NULL,                    -- morgan | jason | agent
  rubric_snapshot TEXT,                   -- JSON breakdown
  nomination_source TEXT,
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS raw_posts (
  post_id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(account_id),
  platform TEXT NOT NULL,
  source_post_url TEXT,
  fetched_at TEXT NOT NULL DEFAULT (datetime('now')),
  content_hash TEXT,
  has_media INTEGER NOT NULL DEFAULT 0,
  media_refs TEXT,                        -- JSON array of local/refs paths
  raw_snapshot_ref TEXT,                  -- pointer, not full scraped dump
  UNIQUE (account_id, source_post_url)
);

CREATE TABLE IF NOT EXISTS events (
  event_id TEXT PRIMARY KEY,
  event_title TEXT NOT NULL,
  event_description TEXT,
  venue_name TEXT,
  venue_address TEXT,
  date_start TEXT,                        -- ISO-8601
  date_end TEXT,
  is_recurring INTEGER NOT NULL DEFAULT 0,
  event_category TEXT,                    -- literary | historical | civic | academic | arts | networking | other
  cost TEXT,                              -- free | paid | unknown
  rsvp_or_ticket_url TEXT,
  extraction_confidence REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS event_sources (
  event_id TEXT NOT NULL REFERENCES events(event_id),
  account_id TEXT NOT NULL REFERENCES accounts(account_id),
  source_platform TEXT NOT NULL,
  source_post_url TEXT,
  raw_post_id TEXT REFERENCES raw_posts(post_id),
  first_seen_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (event_id, account_id)
);

CREATE TABLE IF NOT EXISTS event_scores (
  score_id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL REFERENCES events(event_id),
  author_id TEXT NOT NULL REFERENCES authors(author_id),
  thematic_fit REAL NOT NULL DEFAULT 0,
  audience_match REAL NOT NULL DEFAULT 0,
  visibility_value REAL NOT NULL DEFAULT 0,
  networking_value REAL NOT NULL DEFAULT 0,
  feasibility REAL NOT NULL DEFAULT 0,
  recurrence_strategic REAL NOT NULL DEFAULT 0,
  total_score REAL NOT NULL DEFAULT 0,
  tier INTEGER NOT NULL DEFAULT 3 CHECK (tier BETWEEN 1 AND 3),
  justification TEXT,
  weights_version TEXT NOT NULL,
  scored_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (event_id, author_id, weights_version)
);

CREATE TABLE IF NOT EXISTS feedback (
  feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL REFERENCES events(event_id),
  author_id TEXT NOT NULL REFERENCES authors(author_id),
  rating TEXT NOT NULL,
  -- attended_worth_it | attended_not_worth_it | skipped_shouldnt_have
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS review_queue (
  queue_id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  -- low_confidence_extraction | follow_candidate_hold | unfollow_flag | manual
  payload_ref TEXT NOT NULL,              -- event_id or account_id
  status TEXT NOT NULL DEFAULT 'open',    -- open | resolved | dismissed
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);

CREATE TABLE IF NOT EXISTS agent_state (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS metrics_weekly (
  week_id TEXT PRIMARY KEY,               -- YYYY-Www
  raw_extractions INTEGER NOT NULL DEFAULT 0,
  surfaced_t1 INTEGER NOT NULL DEFAULT 0,
  surfaced_t2 INTEGER NOT NULL DEFAULT 0,
  t1_attended INTEGER,
  t1_worth_it INTEGER,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(follow_status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date_start);
CREATE INDEX IF NOT EXISTS idx_scores_author_tier ON event_scores(author_id, tier);
CREATE INDEX IF NOT EXISTS idx_review_open ON review_queue(status, kind);
