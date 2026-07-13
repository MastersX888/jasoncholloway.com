# Upload Workflow — Per Episode

Use after edit is final. YouTube Studio → **Create → Upload video**.

---

## Pre-export checklist

- [ ] 1080p (1920×1080) or 4K downscaled; 24 or 30 fps
- [ ] H.264, high bitrate; audio −16 LUFS integrated
- [ ] SRT captions file exported (upload + YouTube auto-sync review)
- [ ] First 30 sec: no watermark; strong hook intact
- [ ] Last 20 sec: room for end screen elements (don't cover with text)

---

## Upload form

| Field | Source |
|-------|--------|
| Title | `EPISODE_METADATA.md` — recommended title |
| Description | Episode block + default footer from `BRANDING.md` |
| Thumbnail | Custom — `THUMBNAILS.md` |
| Playlist | Add to **The Facts Behind the Fiction** |
| Audience | Not made for kids |
| Altered content | No synthetic presenter; No (unless policy changes) |
| Tags | Episode tags from metadata file (paste comma-separated) |
| Language | English |
| Recording date | Actual shoot date |
| License | Standard |

---

## After processing

### Chapters

YouTube Studio → Video → **Description** → paste chapter block from `EPISODE_METADATA.md` (timestamps must match final cut — adjust if edit shifted).

### Cards (add 2)

| Timestamp | Type | Target |
|-----------|------|--------|
| CTA (~90% through) | Link | Relevant Field Note URL |
| Mid-episode hook end | Video | Prior episode in playlist (when exists) |

### End screen (last 15–20 sec)

- **Element 1:** Subscribe (small, corner)
- **Element 2:** Next episode in playlist OR best related video
- **Element 3:** External link → jasoncholloway.com (if available on your tier) OR best on-site URL in description

### Subtitles

- Upload SRT
- Review auto-generated for proper nouns: Chladni, Wah-kon-tah, SubTropolis, Cognigenics, Strahov

### Pinned comment

Paste from `EPISODE_METADATA.md` within 1 hour of publish.

---

## First-upload only (EP04)

- [ ] Set as **channel trailer** candidate? Optional — only if under 90 sec cut exists
- [ ] Announce on site when footer link added (manual)
- [ ] Enable `cymatics` in Groundswell `terms.json` tier-2 for monitoring week

---

## Publish timing

- **Recommended:** Tuesday or Wednesday, 10:00 AM Central (US literary / education audience)
- **Avoid:** Publishing all five in one week — biweekly preserves quality signal

---

## Post-publish (48 hours)

- [ ] Reply to any substantive comment (not spam)
- [ ] Note watch time / CTR in a simple log (spreadsheet or note)
- [ ] If CTR < 3% at 1k impressions, revisit thumbnail only — not title panic

---

## Quality gate before every publish

Ask once:

1. Would I send this to an Eco reader, not a Dan Brown tourist?
2. Is the hook physical (desk, plate, document) — not synthetic?
3. Does the description name the seam between fact and fiction?
4. Is the thumbnail readable on a phone?

If any no → hold upload.
