# KDP Bridge Session — Agent Runbook

**Critical:** KDP uses **one global keyword set per ebook** across all Amazon marketplaces (US, UK, DE, AU, etc.). There are no separate UK/DE keyword fields. This runbook merges international terms into the 7 KDP keyword boxes.

**Bridge browser:** Cursor IDE browser tab (not external Chrome).  
**Login URL:** https://kdp.amazon.com/en_US/bookshelf → redirects to Amazon sign-in if needed.

---

## Pre-flight (Jason — manual, ~2 min)

1. In **Cursor**, open the browser tab showing **KDP Sign in** (agent navigated there).
2. Sign in with your Amazon/KDP account (same as Chrome).
3. Complete 2FA if prompted.
4. Confirm you land on **Bookshelf** with your 3 Kindle titles visible.
5. Reply **"KDP logged in"** — agent continues.

---

## Books to update

| Vol | ASIN | Edit path |
|-----|------|-----------|
| I | B0H4KYMSM1 | Bookshelf → ⋮ → Edit ebook content |
| II | B0H4KQ4YQJ | same |
| III | B0H4L36X21 | same |

**Per book:** Edit → Content → scroll to **Keywords** + **Description** → Save as draft → **Publish** (if required).

---

## Vol I — Keywords (7 boxes)

Copy exactly into keyword fields 1–7:

```
Foucault's Pendulum
literary thriller Prague
Voynich manuscript fiction
Strahov Library thriller
Dan Brown Elizabeth Kostova
medieval conspiracy novel
Umberto Eco thriller
```

## Vol I — Description tail (append before saving)

Add as final paragraph if not already present:

```
For readers who loved Foucault's Pendulum, The Da Vinci Code, and The Historian — a conspiracy thriller rooted in real manuscripts and Prague's Strahov Monastery. Start the Masters X trilogy here. English Edition available worldwide including UK and EU stores.
```

---

## Vol II — Keywords (7 boxes)

```
Ars Notoria fiction
Chartres cathedral thriller
Codex Gigas novel
Iceland literary thriller
medieval grimoire fiction
Foucault's Pendulum
preparation protocol thriller
```

## Vol II — Description tail

```
Volume Two of the Masters X trilogy — Strahov crypt, cathedral acoustics, and twenty-three esoteric texts. For readers of Umberto Eco and Elizabeth Kostova. English Edition — UK, DE, AU.
```

---

## Vol III — Keywords (7 boxes)

```
literary conspiracy thriller
consciousness fiction
open source thriller
theological thriller
Foucault's Pendulum
Elizabeth Kostova
frequency fiction
```

## Vol III — Description tail

```
Trilogy finale — listening groups in sixty-one countries, open-source release, and the gate between physics and prayer. For literary thriller readers worldwide. English Edition.
```

---

## Categories (verify, do not remove existing unless wrong)

**Vol I–III (all):**
- Fiction › Thrillers › Suspense (primary if allowed)
- Fiction › Literary
- Fiction › Historical › General

Agent: snapshot current categories before changing. Only add if slots available (KDP allows up to 3 categories).

---

## Series linkage (verify once on Vol I)

- **Series:** Masters X  
- **Volume:** 1 / 2 / 3 respectively  
- Ensure all 3 titles show on series page

---

## Agent automation steps (after login)

```
FOR each ASIN in [B0H4KYMSM1, B0H4KQ4YQJ, B0H4L36X21]:
  1. browser_navigate → kdp.amazon.com/en_US/bookshelf
  2. browser_snapshot → find book row by title
  3. browser_click → Edit / Edit ebook content
  4. browser_snapshot → find Keywords section
  5. browser_fill → each keyword field
  6. browser_fill → append description tail (Description field)
  7. browser_click → Save and Continue / Save draft
  8. browser_click → Publish changes (confirm modal)
  9. Screenshot → confirm success toast
```

---

## Blockers (stop and ask Jason)

- CAPTCHA / OTP — Jason completes manually, then says "continue"
- "Enable cookies" banner — Jason accepts in bridge tab
- KDP maintenance / re-auth
- Description character limit exceeded — agent trims tail, keeps comp line

---

## Author Central (separate from KDP — optional same session)

After KDP keywords:
- https://author.amazon.com/
- Claim UK store if separate
- Paste bio from `amazon-intl-keywords.md`

---

## Success criteria

- [ ] Vol I–III keywords updated (7 boxes each)
- [ ] Description tails appended (3 books)
- [ ] Published changes live (not left in draft)
- [ ] Screenshot of bookshelf showing "Live" / updated date
