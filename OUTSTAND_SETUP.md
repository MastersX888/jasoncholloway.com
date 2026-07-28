# Outstand Unified Social Media Dashboard — Setup Guide

## What It Does

Outstand gives you **one dashboard and one API** for all 11 social platforms. Once connected, I (your agent) can post, schedule, and check analytics across all your accounts through MCP — no manual copy/paste.

## Step 1: Sign Up (2 minutes)

1. Go to **https://www.outstand.so/**
2. Click **"Get your API key"**
3. Create your account ($19/month, includes 3,000 posts)

## Step 2: Connect Your Social Accounts (5 minutes)

In the Outstand dashboard, connect each account:

| Platform | Account | What to connect |
|----------|---------|----------------|
| **Instagram** | `@jasonhollowaykc` | Connect via Meta Business Suite |
| **X (Twitter)** | `@jasonhollowaykc` | OAuth login |
| **Facebook** | Jason Carroll Holloway Author Page | Connect via Meta (page ID: 61588710027163) |
| **Bluesky** | `jasonhollowaykc.bsky.social` | App password login |
| **Pinterest** | `SeventhCityPress` | OAuth login |

Optional (future):
- Bluesky imprint: `seventhcitypress.bsky.social`
- YouTube (when ready)
- Threads (when ready)

## Step 3: Get Your API Key

1. In Outstand dashboard → Settings → API Keys
2. Copy the API key
3. Add to your `.env` file:

```
OUTSTAND_API_KEY=your_key_here
```

## Step 4: Wire Up the MCP Server (Agent Access)

Add to your Cursor MCP config so I can post directly:

```json
{
  "mcpServers": {
    "outstand": {
      "command": "npx",
      "args": ["-y", "@outstand/mcp-server"],
      "env": {
        "OUTSTAND_API_KEY": "your_key_here"
      }
    }
  }
}
```

Or if Outstand provides a remote MCP URL, use that instead.

## Step 5: Test

Once connected, tell me to "post a test to X" and I'll use the Outstand MCP tools to do it.

## What This Enables

- **One place** to see all scheduled/published posts
- **Agent-driven posting** — I schedule and publish through MCP
- **Analytics** — engagement metrics across all platforms in one view
- **Scheduling** — queue weeks of content in advance
- **Media upload** — upload images once, Outstand handles platform formatting

## Cost

- $19/month flat
- 3,000 posts included
- Unlimited connected accounts
- No per-seat pricing
