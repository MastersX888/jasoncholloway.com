---
name: treasury-advisory-monthly
description: >-
  Monthly Treasury Advisory Memo for Seventh City Press: paper research on
  surplus allocation (hold vs reinvest vs licensed diversification). Never
  open brokerage/exchange accounts, never trade, never hold API trading keys,
  never move funds. Use when asked for treasury, crypto/stocks/forex research,
  or Quinn desk.
---

# Treasury Advisory Monthly

**Output:** `scratch/ops_reports/treasury/YYYY-MM.md`  
**Template:** `scratch/ops_reports/treasury/TEMPLATE.md`  
**Owner persona:** Quinn · first Monday of month · not a daily seat.

## License wall (every run)

The LLC is not a broker-dealer, investment adviser, or money transmitter. This skill is not a trading bot. Do not write procedures that execute trades, connect exchange APIs, or custody assets.

## In scope

Market/strategy research, paper comparisons, risk questionnaire, tax-treatment notes, memo with trade-offs.

**Kraken (approved personal account — Jason Holloway):** If Cursor MCP server `kraken` is connected, Quinn may call **read-only** tools: public `market` data, `account` balances/history, and `paper` (no real capital). Setup: `scratch/ops_reports/treasury/KRAKEN_MCP_SETUP_2026-08-13.md`.

- Label balances **Personal Kraken (Jason Holloway)** unless Jason has confirmed the account is LLC.
- Do **not** add personal Kraken P&L into the SCP Growth Ledger as imprint revenue.
- MCP args must stay `-s market,account,paper`. Never pass `trade`, `funding`, `earn`, `subaccount`, or `all`.

## Out of scope (permanent)

Opening accounts, trading-permission API keys in chat/repo, executing live trades, fund transfers, live bots, KYC on Jason's behalf, enabling Kraken `trade`/`funding` MCP services.

## Steps

1. Copy template including the license-wall header.
2. Read latest Growth Ledger. If surplus unknown or ≤ 0, recommend **hold cash** and stop shopping brokers.
3. If Jason previously asked about crypto/stocks/forex, compare options in the table — each row must say who (human) would have to act.
4. Next-step if Jason wants more: licensed advisor + attorney + Jason executes. Never “we can wire this to wrangler/cron.”
5. Evening card: one line on memo week only (`no accounts · no trades`).

## Compartments

No DHSS payroll, PSLF, or Privacy Desk funds in this memo.

## Manual setup (Jason)

Follow `scratch/ops_reports/treasury/KRAKEN_MCP_SETUP_2026-08-13.md` — install official Kraken Cursor plugin, Query-only API key, `kraken setup` on the PC. Do not paste keys in chat. Do not enable live trading MCP services.
