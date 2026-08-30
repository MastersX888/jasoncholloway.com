# Proposed Cursor rule diffs — apply only after `approve ARCH-1`

**Do not apply until Jason approves.** These are patches against 2026-08-13 live rules.

---

## A. `.cursor/rules/svp-oversight-committee.mdc`

After the KC Events standing-agent row, add:

```
| Growth Ledger | Weekly Mon | `~/.cursor/skills/growth-ledger-weekly/SKILL.md` | `scratch/ops_reports/GROWTH_LEDGER_YYYY-Www.md` |
| Profitability | Monthly | `~/.cursor/skills/profitability-review-monthly/SKILL.md` | `scratch/ops_reports/profitability/YYYY-MM.md` |
| Treasury Advisory | Monthly | `~/.cursor/skills/treasury-advisory-monthly/SKILL.md` | `scratch/ops_reports/treasury/YYYY-MM.md` |
```

Replace **Escalation tiers** with:

```
- **Tier 0 auto:** Safe email archive, metrics logging, morning brief, ledger figures from already-ingested CSVs (no money/legal/publish/trade)
- **Tier 1 report:** Money, legal, publishing blockers, stale dashboard (>7d), token expiry, P&L/growth-ledger allocation, growth-gate unfreeze rec, treasury research, hire-trigger → evening checklist
- **Tier 2 Vivian → Jason:** Press, social publish, public copy, deploys with public-facing changes
- **Tier 3 Jason only:** Pay, sign, reply to press/readers, publish, ad spend, portal uploads, hire, trade execution, fund transfers, opening any brokerage/exchange/bank account
```

After catalog lock, add:

```
## Growth & treasury (report only)

- Alex owns the weekly Growth Ledger. Reed owns monthly catalog P&L. Quinn owns monthly Treasury Advisory.
- All three are labeled RECOMMENDATION. No agent spends, trades, or opens accounts.
- New personas: HAL (tech/reliability, incident), REED (P&L), QUINN (treasury research). Jordan and Marcus are bench until a week card opens those lanes.
- Compartments: SCP ops only. No DHSS, PSLF, or Privacy Desk in SVP files unless Jason `approve bridge`.
```

---

## B. `.cursor/rules/scp-business-ops.mdc`

After “Three parallel agents,” add a fourth block:

```
4. **Growth (weekly ledger + monthly P&L + monthly treasury research)** — report-only. Skills: growth-ledger-weekly, profitability-review-monthly, treasury-advisory-monthly. Never spend or trade.
```

Replace **Never auto without approval** with:

```
Money, legal, press/reader replies, social posts, vendor commitments, NetGalley/Edelweiss payment, portal uploads after go-live, following social accounts, asserting unverified trade terms, **trade execution, fund transfers, opening brokerage/exchange/bank accounts**. No publish without Vivian pass + Jason approval. No artifact may imply the LLC or an agent holds a trading or investment-adviser license.
```

Add under catalog facts:

```
- Canonical business plan: `scratch/ops_reports/SCP_BUSINESS_PLAN_REFINED.md`
- Architecture (after Jason approve): `scratch/ops_reports/SVP_ARCHITECTURE_DESIGN_2026-08-13.md`
```

---

## C. Skill install (Jason or agent after ARCH-2)

Copy directories to personal skills (do not invent extra scripts):

```
scratch/ops_reports/proposed_skills/growth-ledger-weekly  → ~/.cursor/skills/growth-ledger-weekly
scratch/ops_reports/proposed_skills/profitability-review-monthly → ~/.cursor/skills/profitability-review-monthly
scratch/ops_reports/proposed_skills/treasury-advisory-monthly → ~/.cursor/skills/treasury-advisory-monthly
```

Windows: `C:\Users\zh577\.cursor\skills\`
