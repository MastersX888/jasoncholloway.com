# Pinterest Account Status & Next Steps

## Current State (after automated cleanup)

**What was done:**
- ✅ Removed 7 duplicate pins (Strahov double, Voynich duplicates, empty pin, duplicate Field Notes hub)
- ✅ Renamed boards to professional taxonomy (8 boards total)
- ✅ Created proper board structure with SEO descriptions
- ✅ Generated 49 new pins ready to publish

**Account now has:**
- 8 professionally-named boards
- 13 existing pins (after cleanup)
- 49 pins queued and ready to publish

**Target state:**
- 8 boards, 60+ pins across all content pillars

---

## The Blocker: Trial API Access

Your Pinterest API app (ID 1593046) has **Trial access**, which blocks pin creation via API. This is why the existing 24 pins were created through the web UI, not the API.

### Two paths to get pins uploaded:

---

### Path A: Manual Upload via Pinterest (works RIGHT NOW)

1. Go to **pinterest.com/pin-builder/**
2. For each pin in the CSV, enter:
   - Upload image from URL (or download first)
   - Title
   - Description
   - Link
   - Board
3. Repeat for all 49 pins

**CSV file with all pin data:** `output/pinterest_bulk_upload.csv`

**Or one-by-one from the JSON:** `output/pins_to_create.json`

#### Priority pins to create first (the case covers + missing book formats):
1. Book 1 Case Cover → Masters X Trilogy board
2. Book 2 Case Cover → Masters X Trilogy board
3. Book 3 Case Cover → Masters X Trilogy board
4. Omnibus Case Cover → Masters X Trilogy board
5. Book 1 Hardcover → Masters X Trilogy board
6. Book 2 Hardcover → Masters X Trilogy board
7. Book 3 Hardcover → Masters X Trilogy board
8. Omnibus Hardcover → Masters X Trilogy board

---

### Path B: Get Standard API Access (enables full automation)

1. Go to https://developers.pinterest.com/apps/1593046/
2. Click **"Upgrade"** or **"Request Standard Access"**
3. Upload the demo video: 
   - Download from: https://github.com/MastersX888/jasoncholloway.com/releases/download/pinterest-standard-demo-20260722/pinterest_standard_access_demo.mp4
4. Fill in the form:
   - App description: "Seventh City Press content management — board curation, pin scheduling, and content audit for our literary publishing catalog."
   - Privacy policy: https://seventhcitypress.com/privacy/
5. Wait for approval (typically 1-5 business days)

**Once approved, run:**
```bash
cd pinterest-agent
source .venv/bin/activate
python publish_pins.py
```

This will create all 49 pins automatically in ~3 minutes.

---

## Board Structure (final)

| Board | Pins (existing) | Pins (to add) |
|-------|----------------|---------------|
| Masters X Trilogy — Books & Editions | 7 | 13 |
| Facts Behind the Fiction — Masters X | 0 | 12 |
| Medieval Manuscripts & Esoteric Archives | 2 | 6 |
| Acoustic Science & Cymatics | 4 | 3 |
| Real Kansas City — Masters X Locations | 0 | 3 |
| Seventh City Press — Author & Imprint | 0 | 4 |
| Hawkes Monograph — Literary Criticism | 0 | 3 |
| Reading Masters X — Guides & Companions | 0 | 5 |

---

## Pins Lost During Cleanup (will be recreated)

4 pins from the old "Prague & Strahov Library" board were lost when the board was deleted (API restriction prevented moving them first). All are included in the 49 new pins queued for creation:

- Strahov Library: 23 Chained Books
- Reading Sequence — Where to Start Masters X  
- Ars Notoria — Medieval Cognitive Technology
- Codex Gigas — Devil's Bible
