# YouTube Channel Setup — FINAL CHECKLIST (all copy paste-ready)

Complete in order. Every paste block in this file is final copy — no editing needed at setup time.

---

## 1. Account

- [ ] Use a Google account you will keep for the life of the imprint (not a throwaway)
- [ ] YouTube Studio → **Create channel**
- [ ] Channel name: **Jason Carroll Holloway**
- [ ] Handle: `@jasoncarrollholloway` (or closest available — record final URL below)
- [ ] Category: **Education**

**Record final channel URL here:** `https://youtube.com/@_______________`

---

## 2. Branding assets

- [ ] Profile photo: `public/media/JasonCHolloway-v2.png` — square crop, face centered (800×800)
- [ ] Banner: build per `BANNER_LAYOUT_SPEC.md` in this folder (2560×1440, safe zones marked)
- [ ] Watermark: heptagram `{7/3}` or SCP wordmark — lower right, 80% opacity, last 20 seconds only, never on hook shots

---

## 3. About tab (paste verbatim)

```
Jason Carroll Holloway is a writer and researcher based in Kansas City, Missouri. He publishes the Masters X Trilogy and literary criticism under Seventh City Press.

This channel is the video layer of that work: real documents, measured frequencies, and places behind the fiction — with the seam between fact and invention stated plainly.

Series on this channel:
• The Facts Behind the Fiction — research explainers for the trilogy
• Masters X Trilogy — books, readings, and publisher updates

The interactive research archive (Field Notes, Analysis Chamber) lives at jasoncholloway.com.

The facts are in the files. The fiction is in the books.
```

### Links (add in About, in this order)

| Label | URL |
|-------|-----|
| Website | https://jasoncholloway.com |
| Masters X Trilogy | https://jasoncholloway.com/books/masters-x/ |
| Field Notes | https://jasoncholloway.com/field-notes/ |
| Omnibus Edition | https://jasoncholloway.com/books/masters-x/omnibus/ |

- [ ] Contact email: an author inbox you monitor

---

## 4. Studio defaults (Settings → Channel → Upload defaults)

- [ ] Category: Education
- [ ] Title: leave blank (per-episode from `METADATA/`)
- [ ] Description: paste **default footer** below (episode block added above it per upload)
- [ ] Tags: leave empty — per-episode tags in metadata files
- [ ] Language: English
- [ ] **Altered content:** No (disclose only if AI used for captions and YouTube asks)
- [ ] **Made for kids:** No
- [ ] License: Standard YouTube license
- [ ] Comments: Hold potentially inappropriate for review (optional)

### Default description footer (paste into Upload defaults)

```
──────────────────────────
Jason Carroll Holloway · Seventh City Press · Kansas City
https://jasoncholloway.com

Masters X Trilogy (print & ebook): https://jasoncholloway.com/books/masters-x/
Field Notes research archive: https://jasoncholloway.com/field-notes/

The Facts Behind the Fiction — full playlist:
[ADD PLAYLIST URL AFTER CREATION]

#MastersX #LiteraryFiction #Research #KansasCity
```

> **One manual step remains by design:** replace `[ADD PLAYLIST URL AFTER CREATION]` after step 5 creates the playlist. Then update the saved default.

---

## 5. Playlists (create shells before first upload)

| Playlist | Visibility | First video |
|----------|------------|-------------|
| The Facts Behind the Fiction | Public | EP04 at launch |
| Masters X Trilogy | Public | Add when a trailer or reading exists |
| Field Notes (video) | Unlisted until 2+ videos | Future — stretch scripts in `FIELD_NOTES_VIDEO_SCRIPTS/` |

### Playlist description — The Facts Behind the Fiction (paste verbatim)

```
Research explainers for the Masters X Trilogy. Each episode traces one real document, measurement, or place behind the fiction — with the seam labeled. Jason Carroll Holloway · Seventh City Press · jasoncholloway.com
```

### Playlist description — Field Notes (video) (paste verbatim, when created)

```
Short companion videos to the Field Notes research archive at jasoncholloway.com/field-notes/ — one document, site, or measurement per video, with the record and the fiction kept separate.
```

---

## 6. Channel trailer (optional, 60–90 sec — script final)

```
I'm Jason Carroll Holloway. I write the Masters X Trilogy — literary fiction built on real research: archaeoacoustics, medieval manuscripts, Kansas City limestone, declassified files.

This series, The Facts Behind the Fiction, walks each seam — what was measured, what was documented, what the novel invented. No hype. Documents on the desk.

Start with the cymatics demonstration if you're new here. The books and the full research trail are at jasoncholloway.com.
```

---

## 7. Verification

- [ ] Phone verify (required for custom thumbnails — do this BEFORE EP04 upload)
- [ ] Partner Program: defer until eligible; not needed at launch

---

## 8. Link out (when channel URL is final)

- [ ] Add YouTube to jasoncholloway.com footer / About *(site change — Jason/Cursor, not this pass)*
- [ ] Add to `public/llms.txt` under contact/distribution *(site change)*
- [ ] Update `lib/data/socialProfiles.ts` + Wikidata `sameAs` *(site change, per Groundswell playbook)*

---

## 9. Pre-upload sanity (day of EP04)

- [ ] Custom thumbnails enabled (phone verified)
- [ ] *The Facts Behind the Fiction* playlist exists
- [ ] Default footer saved with real playlist URL
- [ ] EP04 exported: 1080p, H.264, −16 LUFS, SRT captions ready
- [ ] Publish window: Tuesday or Wednesday, 10:00 AM Central
