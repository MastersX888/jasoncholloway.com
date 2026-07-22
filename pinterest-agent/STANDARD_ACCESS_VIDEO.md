# Standard Access — Video Demo Script

**App:** Seventh City Press Pin Publisher · App ID **1593046**  
**Length target:** 2–3 minutes · **Format:** MP4, under 2 GB  
**Audience:** Pinterest app review team

Pinterest requires all three in one video:

1. **OAuth authentication flow** (Pinterest consent screen — not typing password into your app)
2. **Main API features** your app uses (read boards/pins + create a pin)
3. *(Optional)* Voiceover explaining purpose

---

## Before you record

- [ ] Redirect URI registered: `http://127.0.0.1:8085/callback`
- [ ] `.env` filled in (`PINTEREST_APP_ID`, `PINTEREST_APP_SECRET`)
- [ ] Pull latest repo → `pinterest-agent/` folder present
- [ ] `pip install -r requirements.txt` in venv
- [ ] Close unrelated tabs; zoom terminal to 125–150%
- [ ] Use **Win + G** (Xbox Game Bar) or OBS to record screen

**Do not show** App Secret on screen. Blur if it appears in terminal.

---

## Shot list (record as one continuous take or edit together)

### Scene 1 — App identity (15 sec)

Show in browser:

- https://developers.pinterest.com/apps/ → your app **1593046**
- App name: **Seventh City Press Pin Publisher**
- Website: `https://seventhcitypress.com`
- Privacy policy: `https://seventhcitypress.com/privacy/` (open it — must load 200)

**Say (optional):**

> This is a single-user publisher tool for Seventh City Press. It connects our business Pinterest account via official OAuth to audit pins and publish book marketing content linking to jasoncholloway.com.

---

### Scene 2 — OAuth flow (45–60 sec) **REQUIRED**

In terminal:

```powershell
cd pinterest-agent
.venv\Scripts\activate
python pinboard.py auth
```

**Must capture on screen:**

1. Terminal prints the Pinterest authorization URL
2. Browser opens **pinterest.com/oauth** (official Pinterest login/consent)
3. You click **Allow** / **Give access** on Pinterest’s page (not a custom login form)
4. Redirect to `http://127.0.0.1:8085/callback` → “Authorization complete”
5. Terminal shows **Token exchange OK** and path to `.pinterest_token.json`

**Say (optional):**

> Users authenticate through Pinterest’s OAuth consent screen. We never collect Pinterest passwords. The access token is stored locally in a gitignored file.

**Do not use** `--manual` code paste for the video unless the browser flow fails — reviewers want to see the consent screen.

---

### Scene 3 — Read account data via API (30–45 sec)

Same terminal:

```powershell
python pinboard.py audit
```

**Must capture:**

- “Found N boards”
- Audit summary: pin count, warnings
- Briefly open `output/audit_report.html` in browser (shows boards/pins read via API)

**Say (optional):**

> The agent reads our boards and pins through the v5 API to audit links, ISBNs, and SEO quality against our brand canon.

---

### Scene 4 — Create a pin via API (45–60 sec) **REQUIRED**

```powershell
python pinboard.py generate
python pinboard.py publish
```

Show dry-run output: `[DRY RUN] Would publish: ...`

Then edit **one** pin in `output/staged_pins.json`:

- Set `"approved": true`
- Set `"requires_review": false`

```powershell
python pinboard.py publish --live
```

**Must capture:**

- Terminal: `[PUBLISHED] ... -> {pin_id}`
- Open Pinterest → your business account → relevant board → show the new pin (Trial: sandbox — visible to you; that is OK for the demo)

**Say (optional):**

> Publishing uses POST /v5/pins with image URL, title, description, and link to our author site. Every link is validated against our canonical URL list before upload.

---

### Scene 5 — Close (10 sec)

Show pin on Pinterest with correct link to `jasoncholloway.com`.

**Say (optional):**

> Seventh City Press Pin Publisher — single-user literary publisher marketing tool. Thank you.

---

## Voiceover script (full, ~90 sec)

Read this over the recording if you prefer narration:

> This demo is for Seventh City Press Pin Publisher, app ID 1593046. We are an independent literary imprint using Pinterest to promote the Masters X Trilogy and Field Notes on jasoncholloway.com.
>
> First, OAuth: the user runs our local agent, which opens Pinterest’s official authorization page. After the user grants access, we exchange the authorization code for a bearer token. We never ask for Pinterest passwords.
>
> Second, the agent reads our business account through the Pinterest API — listing boards and pins, validating links and ISBNs against our brand canon, and producing an audit report.
>
> Third, the agent creates pins through the API with title, description, alt text, image URL, and a verified link to our author site. This pin was created via POST pins endpoint after passing our validation checks.
>
> The app serves only Seventh City Press internal marketing. No third-party users. Privacy policy is at seventhcitypress.com/privacy.

---

## Common rejection reasons — avoid these

| Rejection | Fix |
|-----------|-----|
| “Demo did not show OAuth flow” | Include Pinterest consent screen in browser, not just terminal |
| “Demo did not show Pinterest integration” | Show `publish --live` creating a pin + pin visible on Pinterest |
| “Collected credentials insecurely” | Never type Pinterest password into your app; only OAuth |
| “Generic demo / wireframes” | Use real Operation Pinboard terminal + real API responses |

---

## Upload

1. Export as **MP4** (< 2 GB)
2. Pinterest Developers → app **1593046** → **Upgrade to Standard**
3. Upload video in the drag-and-drop area
4. Confirm privacy URL: `https://seventhcitypress.com/privacy/`
5. Submit

Review typically takes a few business days.

---

## Fallback: Postman demo

If local OAuth is flaky on recording day, Pinterest accepts terminal/Postman demos:

1. Postman OAuth 2.0 → Get New Access Token → Pinterest auth URL
2. POST `https://api.pinterest.com/v5/pins` with bearer token
3. Show created pin on Pinterest

Operation Pinboard is preferred because it matches your app description.
