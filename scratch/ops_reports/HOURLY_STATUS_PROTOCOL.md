# Hourly Status Protocol — Seventh City Press

**Owner:** Morgan · **Cadence:** On the hour during active ops sessions (or when Jason asks “status”)  
**Output dir:** `scratch/ops_reports/hourly/`  
**Filename:** `STATUS_YYYY-MM-DD_THH.md` (CT, 24h, e.g. `STATUS_2026-08-02_T22.md`)

---

## When to write

| Trigger | Action |
|---------|--------|
| Active consolidation / claim / upload session | New file each hour |
| Quiet evening / Jason AFK | Skip or one end-of-session note |
| Cursor restart / agent disruption | Immediate catch-up STATUS |
| Week kickoff / closeout | STATUS + pointer to week plan |

---

## Template (keep ≤40 lines)

```markdown
# Hourly Status — YYYY-MM-DD THH:00 CT

**Morgan** · machine health · blockers · next hour

## Snapshot
- C: free / Phone Link / Cursor notes
- Catalog / Ingram / Amazon lock reminder if relevant

## Done last hour
- …

## In progress
- …

## Blocked
- … (owner + exact unblock)

## Next hour (ranked ≤5)
1. …

## Jason exact asks (if any)
- …

## Pointers
- Week: WEEK_KICKOFF_PLAN_…
- Presence: PRESENCE_AUDIT_MAP_…
```

---

## Rules

1. **Facts over narrative** — cite report paths or gate JSON; no “probably done.”
2. **Exact asks** — if Jason must click, include URL/account.
3. **Browser MCP** — note parent-only; never claim subagent closed a login flow.
4. **No publish without Vivian** — status may list drafts; never mark “sent/live” without evidence.
5. **Catalog lock** — Amazon Kindle Vol I–III only; print/omnibus Ingram; GR→SG complete until gate says otherwise.
6. Do not spam: merge quiet hours into one STATUS if nothing moved.

---

## Related

- Week plan: `WEEK_KICKOFF_PLAN_2026-08-03.md`
- Presence: `PRESENCE_AUDIT_MAP_2026-08-02.md`
- Routing: `MODEL_ASSIGNMENT_MATRIX_2026-08-02.md`
- Gate: `scratch/ops/gr_gate_state.json`

*Protocol established 2026-08-02*
