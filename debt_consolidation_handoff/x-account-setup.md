# X (Twitter) Account Setup — Seventh City Press

**Recommended handle:** `@jasonhollowaykc` (matches Instagram)  
**Alternative:** `@seventhcitypress` if available

---

## Step 1 — Create the account

1. Go to **https://x.com/i/flow/signup**
2. Use **zh5779485@gmail.com** (or your preferred email)
3. Choose handle: **`jasonhollowaykc`**
4. Verify phone + email when prompted

---

## Step 2 — Switch to Professional account

1. X → **More** → **Settings & Support** → **Settings and privacy**
2. **Your account** → **Account information** → **Switch to professional**
3. Category: **Writer** or **Publisher**
4. This unlocks analytics and profile optimization

---

## Step 3 — Upload profile graphics

Assets are in the repo (also on the live site after deploy):

| Asset | File | Dimensions |
|-------|------|------------|
| Profile photo | `public/social/x-profile-400.png` | 400×400 (cream heptagram mark) |
| Header banner | `public/social/x-header-1500x500.png` | 1500×500 (SCP wordmark strip) |

Live URLs after deploy:
- https://jasoncholloway.com/social/x-profile-400.png
- https://jasoncholloway.com/social/x-header-1500x500.png

**Profile fields:**

| Field | Value |
|-------|-------|
| Name | Jason Carroll Holloway |
| Bio | Author · Masters X Trilogy · Kansas City fiction rooted in real history. Voynich MS 408. SubTropolis. 111 Hz. Seventh City Press. |
| Website | https://jasoncholloway.com |
| Location | Kansas City, Missouri |

---

## Step 4 — Wire into the website (one message to the agent)

Once the account is live, send:

```
X handle: jasonhollowaykc
```

The agent updates `lib/data/socialProfiles.ts` and `seventhcitypress/lib/data/social.ts`:
- Footer + About + Contact pages show X link
- JSON-LD `sameAs` includes X profile
- `twitter:site` and `twitter:creator` meta tags activate site-wide

---

## Step 5 — Verify link previews

After deploy, test at **https://cards-dev.twitter.com/validator**:
- `https://jasoncholloway.com`
- `https://jasoncholloway.com/books/masters-x/`
- `https://seventhcitypress.com`

You should see the branded OG image, title, and description.

---

## What's already wired on the website

| Location | Instagram | Facebook | X |
|----------|-----------|----------|---|
| Footer (both sites) | ✅ | ✅ | ⏳ handle pending |
| About page sidebar | ✅ | ✅ | ⏳ |
| Contact page sidebar | ✅ | ✅ | ⏳ |
| JSON-LD sameAs | ✅ | ✅ | ⏳ |
| twitter:site meta | — | — | ⏳ |

---

## Brand consistency checklist

- [ ] Profile = cream heptagram mark (same as Pinterest)
- [ ] Header = cream wordmark strip (same as email signature)
- [ ] Website link = jasoncholloway.com
- [ ] Bio mentions Seventh City Press + Masters X
- [ ] Pinned post (optional later): link to Vol I or Field Notes hub
