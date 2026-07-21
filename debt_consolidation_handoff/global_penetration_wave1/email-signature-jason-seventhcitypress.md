# Gmail signature — jason@seventhcitypress.com

**Banner asset (local — use any of these):**

| Copy | Path |
|------|------|
| **Handoff (easiest)** | `debt_consolidation_handoff/global_penetration_wave1/scp-email-signature-banner-light.png` |
| **Site source** | `seventhcitypress/public/email/scp-email-signature-banner-light.png` |
| **Build output (deploy this folder)** | `seventhcitypress/out/email/scp-email-signature-banner-light.png` |

**Live URL (after deploy):** `https://seventhcitypress.com/email/scp-email-signature-banner-light.png`

### Deploy (one command after login)

Build is already done. From an interactive terminal:

```powershell
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\seventhcitypress
npx wrangler login
npx wrangler pages deploy out --project-name=seventhcitypress --branch=main
```

If `wrangler login` is already valid on your machine, skip straight to the deploy line.

---

## Signature layout

```
Jason Carroll Holloway
Author · Seventh City Press LLC
Kansas City, Missouri

[ banner — heptagram + Seventh City Press + gold rules ]

jason@seventhcitypress.com
seventhcitypress.com  ·  jasoncholloway.com
Author of the Masters X trilogy
```

The banner replaces the plain `--` dividers. Gold rules are built into the artwork.

---

## Gmail setup (5 minutes)

1. Open Gmail → **Settings** (gear) → **See all settings** → **General**
2. Under **Signature**, select **jason@seventhcitypress.com** from the dropdown (if using Send mail as)
3. Type the text block above and below the banner
4. Place the cursor on the blank line between Kansas City and your email
5. Click the **Insert image** icon in the toolbar → **Upload** → choose `scp-email-signature-banner-light.png`
6. Click the inserted image → set width to **480 px** (height scales automatically)
7. Link the image to `https://seventhcitypress.com/` (optional: select image → link icon)
8. Bold **Jason Carroll Holloway**; link the two URLs
9. **Save Changes**

**Defaults:** New emails → this signature · Replies → same (or create a short variant without the banner)

---

## HTML paste (advanced)

If you paste HTML into the signature box (or use a HTML-signature extension), use hosted URL after deploy:

```html
<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 14px; color: #1C1A17; line-height: 1.5;">
  <strong>Jason Carroll Holloway</strong><br>
  Author · Seventh City Press LLC<br>
  Kansas City, Missouri<br><br>
  <a href="https://seventhcitypress.com/" style="text-decoration: none;">
    <img src="https://seventhcitypress.com/email/scp-email-signature-banner-light.png"
         alt="Seventh City Press — Literary Imprint · Kansas City"
         width="480" height="auto" style="display: block; border: 0; max-width: 480px;">
  </a><br><br>
  <a href="mailto:jason@seventhcitypress.com" style="color: #1F3A5F; text-decoration: none;">jason@seventhcitypress.com</a><br>
  <a href="https://seventhcitypress.com/" style="color: #1F3A5F; text-decoration: none;">seventhcitypress.com</a>
  &nbsp;·&nbsp;
  <a href="https://jasoncholloway.com/" style="color: #1F3A5F; text-decoration: none;">jasoncholloway.com</a><br>
  <span style="color: #4A4740; font-size: 13px;">Author of the Masters X trilogy</span>
</div>
```

---

## Deploy banner (optional, for HTML / multi-device)

From `seventhcitypress/`:

```bash
npm run build
# deploy out/ to Cloudflare Pages (existing pipeline)
```

File must be reachable at `/email/scp-email-signature-banner-light.png`.

**Fast path:** skip deploy — upload the PNG directly in Gmail (step 5 above). Works on this account immediately.

---

## Short reply signature (optional second signature)

```
Jason Carroll Holloway · Seventh City Press
jason@seventhcitypress.com · seventhcitypress.com
```

No banner — keeps reply threads compact.
