# Email client + agent access setup

**Your accounts:**

| Address | Provider | How to connect |
|---------|----------|----------------|
| `lgh333@protonmail.com` | ProtonMail | Proton Bridge (desktop app) → then IMAP localhost |
| `zh5779485@gmail.com` | Gmail personal | Google App Password |
| `jason@seventhcitypress.com` | Google Workspace | Google App Password (for this login) |
| `info@seventhcitypress.com` | Google Workspace | Same login if alias; **separate** app password if separate user |
| `social@seventhcitypress.com` | Google Workspace | Same as above |
| `media@seventhcitypress.com` | Google Workspace | Same as above |

**Also on your websites (may be aliases/forwards):**
- `press@seventhcitypress.com` — imprint site, press kits
- `jason@jasoncholloway.com` — press materials
- `dispatch@jasoncholloway.com` — chapters-sent page
- `info@seventhcitypress.com` — author site contact

---

## App passwords — read this first

**No, you do NOT change the password on all your email accounts to one app password.**

Google’s wording is confusing. Here’s what it actually means:

| What | Reality |
|------|---------|
| Your normal password | **Stays the same.** Still used for gmail.com login, phone, browser. |
| App password | A **second, extra key** for one specific Google account, used only by apps that can’t do “Sign in with Google” (Thunderbird, Cursor email MCP, etc.) |
| One app password | Works for **one Google login only** — whichever account you were signed into when you created it |

**Example:** If you created the app password while logged into `zh5779485@gmail.com`, it works **only** for that Gmail account — not for ProtonMail, not for `jason@seventhcitypress.com`, not for `info@`.

For each **separate Google login** (personal Gmail vs each Workspace user), create a **separate** app password while signed into that account.

**ProtonMail never uses a Google app password.** Proton requires [Proton Mail Bridge](https://proton.me/mail/bridge) running on your PC.

---

## How many logins do you actually have?

This is the key question for Workspace:

**Scenario A — Aliases (common):**  
`info@`, `social@`, `media@` all deliver to `jason@`’s inbox.  
→ **One** MCP account (`jason@seventhcitypress.com` + one app password). Agent sees all mail; configure “Send mail as” in Gmail for each address.

**Scenario B — Separate users:**  
Each address has its own password when you log in at mail.google.com.  
→ **One MCP account per address**, each with its own app password.

Check: try logging into Gmail as `info@seventhcitypress.com` with jason’s password. If it works → aliases (Scenario A). If not → separate users (Scenario B).

---

## Step-by-step setup

### 1. Google accounts (Gmail + Workspace)

For **each separate Google login**:

1. Sign in to [myaccount.google.com](https://myaccount.google.com) as that account
2. Enable 2-Step Verification (required)
3. [App Passwords](https://myaccount.google.com/apppasswords) → create one named e.g. `Cursor Email MCP`
4. In Cursor terminal, run once per login:

```powershell
npx @codefuturist/email-mcp account add
```

When prompted:
- **Email:** the full address (e.g. `zh5779485@gmail.com` or `jason@seventhcitypress.com`)
- **Password:** paste the **16-character app password** (not your normal password)
- Server auto-detects `imap.gmail.com` / `smtp.gmail.com`

Use the app password **only in the email MCP config** — nowhere else, and never share it in chat.

### 2. ProtonMail (`lgh333@protonmail.com`)

1. Install [Proton Mail Bridge](https://proton.me/mail/bridge) and sign in
2. Bridge exposes local IMAP/SMTP (usually `127.0.0.1:1143` IMAP, `127.0.0.1:1025` SMTP)
3. Run `npx @codefuturist/email-mcp account add` with Bridge credentials (Bridge gives you a Bridge-specific password)

Proton Bridge must stay running for the agent to read Proton mail.

### 3. Verify

```powershell
npx @codefuturist/email-mcp account list
npx @codefuturist/email-mcp test
```

Restart Cursor → Settings → Tools & MCP → confirm **email** server is connected.

---

## Agent access (already wired)

- MCP entry: `C:\Users\zh577\.cursor\mcp.json` → `"email"`
- Config file: `C:\Users\zh577\.config\email-mcp\config.toml` (populated by `account add`)

Example prompts after setup:
- “List unread across all accounts”
- “Send VIAF email from media@”
- “Draft reply to latest Gmail personal”

---

## Security

- App passwords are revocable anytime at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Revoking one does **not** change your main Google password
- Never commit `config.toml` to git
