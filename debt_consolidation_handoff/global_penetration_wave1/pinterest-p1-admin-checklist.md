# Pinterest P1 Admin — Full Proceed Checklist

**Updated:** July 22, 2026  
**Privacy policy (required for API):** https://seventhcitypress.com/privacy/

---

## Phase 0 — Site prerequisites (dev/deploy)

- [x] Privacy policy live at `https://seventhcitypress.com/privacy/`
- [x] Privacy link in Seventh City Press footer
- [x] Privacy link on jasoncholloway.com footer → seventhcitypress.com
- [x] Vol I book page OG image → book cover (`/covers/book1-paperback.png`)
- [x] Folio Visualizer OG tags (title, description, folio image)
- [x] Field Notes layout → `og:type: article`

**Deploy:** push branch → GitHub Actions deploys both sites (or run `bash scripts/deploy.sh` + seventhcitypress wrangler manually).

---

## Phase 1 — Rich Pins validation (~10 min)

URL debugger: https://developers.pinterest.com/tools/url-debugger/

Paste each URL → confirm **Rich Pin data found** (title, description, image):

- [ ] https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/
- [ ] https://jasoncholloway.com/books/masters-x/the-grimoire/
- [ ] https://jasoncholloway.com/books/masters-x/the-kingdom/
- [ ] https://jasoncholloway.com/books/masters-x/omnibus/
- [ ] https://jasoncholloway.com/field-notes/voynich-manuscript/
- [ ] https://jasoncholloway.com/field-notes/strahov-monastery/
- [ ] https://jasoncholloway.com/field-notes/cymatics/
- [ ] https://jasoncholloway.com/chamber/folio-visualizer/

Then: Pinterest → **Settings → Claimed accounts** → **Apply for Rich Pins** (jasoncholloway.com).

---

## Phase 2 — Pinterest profile & boards (~15 min)

### Display name (Settings → Profile)

Choose one:
- `Seventh City Press · Literary Thriller & Manuscript History`
- `Jason Carroll Holloway · Conspiracy Thriller Author`

### Board SEO descriptions (Edit each board → Description)

**Voynich Manuscript & Codices**
```
Undeciphered medieval manuscripts, Beinecke MS 408 folios, codex history. Real research from Jason Carroll Holloway — Field Notes + Analysis Chamber. Global English.
```

**Prague & Strahov Library**
```
Baroque libraries, Rudolf II, Central Europe history. Strahov Monastery, Codex Gigas, Prague thriller settings. CZ · DE · UK · US discovery.
```

**Literary Conspiracy Thrillers**
```
Readalikes for Foucault's Pendulum, The Historian, Dan Brown. Masters X trilogy — literary conspiracy fiction with real history engines.
```

**Frequency & Esoteric History**
```
Cymatics, archaeoacoustics, Nag Hammadi, acoustic science. Field Notes bridging curiosity → Masters X trilogy. Global alt-history readers.
```

### Board cover images (600×600)

| Board | Local file |
|-------|------------|
| Voynich | `pinterest-assets/crops/voynich-f1r.jpg` |
| Prague | `pinterest-assets/crops/strahov-og.jpg` |
| Literary | `pinterest-assets/crops/omnibus-hc.jpg` |
| Frequency | `pinterest-assets/crops/cymatics-og.jpg` |

### Fix Pin 18 duplicate image

Pin **1110700326880461590** (Analysis Chamber) — replace image with `pinterest-assets/crops/field-notes-hub-og.jpg` (not cymatics.png).

---

## Phase 3 — Manual pin upload (no API required)

Designed assets: `debt_consolidation_handoff/global_penetration_wave1/pinterest-assets/designed/`

**Wave 3 — upload D-01 through D-05 first** (see `pinterest-wave3-design-batch.md` for copy + boards).

**Case cover reveal pins (6 pins)** — see `pinterest-case-cover-pins.md`  
Hook: **"Two Covers. One Book."** · link to omnibus + volume pages.

**Minimum this week:** 5 pins (Voynich + Strahov boards) + 2 case-cover pins if photos ready.

---

## Phase 4 — Pinterest API reapply (after privacy is live)

**Old app (denied):** Seventh City Press Operations · App ID **1592987** — do not reuse.

## Phase 4 — Pinterest API agent (Operation Pinboard)

Python agent at repo root: **`pinterest-agent/`**

```bash
cd pinterest-agent
pip install -r requirements.txt
cp .env.example .env   # App ID 1593046 + secret
python pinboard.py auth
python pinboard.py all
```

See `pinterest-agent/README.md` for full pipeline.

### Create a new app

1. https://developers.pinterest.com/apps/ → **Create app**
2. **App name:** `Seventh City Press Pin Publisher` (not "Operations")
3. **App website:** `https://seventhcitypress.com`
4. **Privacy policy:** `https://seventhcitypress.com/privacy/` ← must return 200 before submit
5. **Description (paste):**

   > Seventh City Press is an independent literary publisher. This app connects our Pinterest business account via OAuth to create and manage marketing pins for book pages and Field Notes on jasoncholloway.com. Single-user, publisher-owned account. No third-party user data. We do not collect Pinterest passwords.

6. **Redirect URI:** only what your tool uses (e.g. `https://seventhcitypress.com/` or OAuth callback from Make/n8n)
7. Submit for **Trial access**

### If denied again

- Help Center: https://help.pinterest.com/en/contact → **Developer Support** → App review issue
- Mention new app ID + confirm privacy URL loads

### Standard access (automation later)

Requires video showing:
1. Full OAuth flow (Pinterest consent screen)
2. Creating one pin via API (image, link, board)
3. No password collection in your app

Trial pins are sandbox-only until Standard is approved — **manual upload covers Phase 3**.

---

## Phase 5 — Optional appeal (old app 1592987)

Only if you want that app ID restored instead of creating new:

> Privacy policy is now live at https://seventhcitypress.com/privacy/. App ID 1592987 — please re-review Trial access.

---

## Quick verification commands

```bash
curl -sI https://seventhcitypress.com/privacy/ | head -1
curl -s https://jasoncholloway.com/books/masters-x/the-inheritance-of-frequency/ | rg -o 'property="og:image" content="[^"]+"'
curl -s https://jasoncholloway.com/chamber/folio-visualizer/ | rg -o 'property="og:title" content="[^"]+"'
```

Expected: privacy **200**, Vol I og:image contains `book1-paperback`, folio og:title contains "Folio Visualizer".
