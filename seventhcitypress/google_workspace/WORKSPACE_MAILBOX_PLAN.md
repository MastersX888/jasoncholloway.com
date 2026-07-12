# Seventh City Press — Google Workspace mailbox plan

**Domain:** seventhcitypress.com  
**Goal:** One primary user `jason@` + aliases `info@` and `press@` (replace `jasoncholloway@` and `sales@`)

---

## Recommended structure (saves licenses)

| Address | Type | Notes |
|---------|------|-------|
| `jason@seventhcitypress.com` | **Primary** | Your one licensed user |
| `info@seventhcitypress.com` | Alias | General inquiries |
| `press@seventhcitypress.com` | Alias | Media / press kit (site + PDFs) |
| `jasoncholloway@seventhcitypress.com` | Alias (temporary) | Keep 30–90 days, then remove |
| `sales@seventhcitypress.com` | Alias (temporary) | Forward or remove after transition |

**Do not** keep `jasoncholloway@` and `sales@` as separate licensed users unless you need separate inboxes.

---

## Can you batch this?

| Action | Batch? | How |
|--------|--------|-----|
| Create **new** users from scratch | Yes | Admin → Directory → Users → **Bulk upload users** (CSV) |
| **Rename** primary email | One user at a time | User profile → **Primary email** → change to `jason@` |
| **Add aliases** | Per user (fast) | User → **User information** → **Alternate email** |
| **Delete** extra users | One at a time | Remove `sales@` user after aliases exist |
| Exchange Online import | No — not needed | You are not on Microsoft 365 |

Google does **not** have a single “replace these two users with two aliases” batch button. The whole change takes about **10 minutes** manually.

---

## Step-by-step (replace jasoncholloway@ and sales@)

### 1. Pick the keeper account

Use **`jasoncholloway@seventhcitypress.com`** as the account to keep (it already has your mail and license).

### 2. Add new aliases (before renaming)

**admin.google.com** → **Directory** → **Users** → `jasoncholloway@` → **User information** → **Alternate email addresses** → Add:

- `info@seventhcitypress.com`
- `press@seventhcitypress.com`

Wait a few minutes. Send test emails to each alias.

### 3. Change primary email to `jason@`

Same user → **Account** → **Primary email** → change to:

`jason@seventhcitypress.com`

Google may keep `jasoncholloway@` as an alias automatically. If not, add it manually as a temporary alias.

### 4. Retire `sales@`

If **`sales@`** is a **separate user** (second license):

1. Confirm nothing important is only in that inbox
2. **Delete user** or **suspend** and transfer data to `jason@` if needed
3. Optionally add `sales@` as an alias on `jason@` for 90 days, then remove

If **`sales@`** is already an alias, remove it after `info@` is working.

### 5. Update the website / press kit

Site already uses `press@seventhcitypress.com` — no change needed once alias exists.

---

## Bulk CSV (only if starting fresh users)

Use `BULK_USERS_NEW.csv` **only** when creating accounts that do not exist yet.

**Do not** upload it if `jasoncholloway@` and `sales@` already exist — that creates duplicates.

---

## Final checklist

- [ ] `jason@seventhcitypress.com` receives mail (primary)
- [ ] `info@` and `press@` deliver to same inbox (aliases)
- [ ] DKIM **Authenticating** in Admin → Gmail → Authenticate email
- [ ] Extra `sales@` user deleted (license freed)
- [ ] Test send from Gmail as `press@` (Send mail as)
