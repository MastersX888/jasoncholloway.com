# Kraken MCP setup — Jason (sign-in)

**Date:** 2026-08-13  
**Account:** Jason Holloway — **approved Kraken** (personal unless you later confirm LLC)  
**Goal:** Quinn can see markets, balances, and **paper** trades. Live orders stay off.  
**Plugin:** Official Cursor Marketplace **Kraken** (`kraken-cli`) — https://cursor.com/marketplace/mcp/kraken  
**Docs:** https://docs.kraken.com/home/mcp

This is the ideal gameplan. There is a first-party Kraken plugin for Cursor. You sign in / create a Query-only key. Agents do not get withdraw or live-trade.

---

## What we will enable

| MCP service | On? | Why |
|-------------|-----|-----|
| `market` | Yes | Public prices (no login) |
| `account` | Yes | Read balances / history (your Query-only key) |
| `paper` | Yes | Practice trades, no real capital |
| `trade` | **No** | Live spot orders |
| `funding` | **No** | Withdrawals / transfers |
| `earn` | **No** | Staking moves |
| `all` | **No** | Unlocks dangerous groups |

Default Kraken MCP is already `market,account,paper` — read-only for live funds.

---

## You do these (numbered)

### 1. Install the Cursor plugin

In Cursor: **Customize → Marketplace → Kraken** → install  
or Command Palette: `/add-plugin kraken-cli`

Reload the window when Cursor asks.

If Marketplace is awkward on Windows, install the CLI then we can point MCP at it: https://docs.kraken.com/home/cli (Windows often via the plugin or WSL).

### 2. Create a Query-only API key on Kraken (do not paste it in chat)

1. Log in at https://www.kraken.com/u/security/api  
2. **Create API key**  
3. Enable **only**: Query Funds, Query Open Orders, Query Closed Orders (and Query Ledger if listed).  
4. **Disable:** Create & Modify Orders, Cancel/Close Orders, Withdraw Funds, any Earn/Funding.  
5. Optional: IP allowlist = this PC.  
6. Copy key + secret into a password manager. **Never** into Slack, email, or this repo.

### 3. Sign the CLI in locally

In a terminal on this PC (after the plugin/CLI is installed):

```powershell
kraken setup
```

Paste the Query-only key there. The CLI stores it in its local config (`kraken setup` / `~/.config/kraken/config.toml`) — not in git.

Confirm MCP args are **exactly**:

```json
"args": ["mcp", "-s", "market,account,paper"]
```

If you see `trade`, `funding`, or `all` in Cursor MCP settings, change them back before using the agent.

### 4. Reload Cursor and tell Morgan

Reply in chat: `Kraken MCP connected`

Quinn will then treat balances as **Personal Kraken (Jason Holloway)** — not Seventh City Press royalty — until you and a CPA say the account is LLC.

---

## What agents still must not do

- Place live orders  
- Withdraw or transfer  
- Put `KRAKEN_API_KEY` in `.env`, `mcp.json` `env`, or chat  
- Book Kraken P&L as imprint revenue on the Growth Ledger  

Paper trades (`paper` service) are allowed as research. They do not move your real Kraken balance.

---

## Later (separate week-card only)

If you ever want the agent to **place live orders**, that is a new decision (`approve KRAKEN-LIVE-TRADE`). It is not part of tonight’s approval. Samuel + licensed tax advice first; personal vs LLC still matters.

---

*Morgan · Quinn desk · 2026-08-13*
