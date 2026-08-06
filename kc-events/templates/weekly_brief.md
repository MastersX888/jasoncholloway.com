# KC Events Weekly Brief — {{WEEK_ID}}

_Generated {{GENERATED_AT}} · Author: {{AUTHOR_DISPLAY_NAME}} · Cadence: weekly_

> Discernment output — not a firehose. Tier 1 = act. Tier 2 = skim. Tier 3 stays in DB only.

---

## Tier 1 — Do Not Miss

{{#TIER1}}
### {{event_title}}
- **When:** {{date_start}}{{#date_end}} – {{date_end}}{{/date_end}}
- **Where:** {{venue_name}}{{#venue_address}} · {{venue_address}}{{/venue_address}}
- **Why:** {{justification}}
- **RSVP:** {{rsvp_or_ticket_url}}
- **Source:** {{source_post_url}}
{{/TIER1}}

{{^TIER1}}
_No Tier 1 events in the next {{LOOKAHEAD_WEEKS}} weeks._
{{/TIER1}}

---

## Tier 2 — Worth Considering

{{#TIER2_BY_CATEGORY}}
### {{category}}
{{#events}}
- **{{event_title}}** — {{date_start}} · {{venue_name}} · {{justification}}
{{/events}}
{{/TIER2_BY_CATEGORY}}

{{^TIER2_BY_CATEGORY}}
_No Tier 2 events this week._
{{/TIER2_BY_CATEGORY}}

---

## Housekeeping

### New accounts followed this week
{{#NEW_FOLLOWS}}
- {{display_name}} ({{platform}}) — rubric {{rubric_total}}/15 · {{rubric_recommendation}} · source={{nomination_source}}
{{/NEW_FOLLOWS}}
{{^NEW_FOLLOWS}}
_None (auto-follow disabled until Morgan enables)._
{{/NEW_FOLLOWS}}

### Unfollow review flags (90-day zero signal)
{{#UNFOLLOW_FLAGS}}
- {{display_name}} ({{platform}}) — last signal {{last_signal_at}}
{{/UNFOLLOW_FLAGS}}
{{^UNFOLLOW_FLAGS}}
_None yet (needs 90 days of ingest history)._
{{/UNFOLLOW_FLAGS}}

### Low-confidence extractions (manual review)
{{#LOW_CONFIDENCE}}
- {{event_title}} — confidence {{extraction_confidence}} · {{source_post_url}}
{{/LOW_CONFIDENCE}}
{{^LOW_CONFIDENCE}}
_Queue empty._
{{/LOW_CONFIDENCE}}

---

## Metrics (this week)

| Metric | Value |
|--------|-------|
| Raw extractions | {{RAW_EXTRACTIONS}} |
| Surfaced T1 | {{SURFACED_T1}} |
| Surfaced T2 | {{SURFACED_T2}} |
| Noise ratio (raw / surfaced) | {{NOISE_RATIO}} |

_Jason actions: mark attended/worth-it on Tier 1s; approve/reject any hold follows in housekeeping._
