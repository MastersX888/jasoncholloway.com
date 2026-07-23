# YouTube Channel Roadmap — Operation Groundswell
## "The Facts Behind the Fiction" · Seventh City Press · July 2026

**Scope:** YouTube only. Blog and Instagram deferred.

---

## Channel model (recommended)

| Decision | Choice | Why |
|----------|--------|-----|
| Channel name | **Jason Carroll Holloway** | Author entity for SEO + knowledge graph; series lives in playlists |
| Handle | `@jasoncarrollholloway` or nearest available | Match site + Groundswell identity terms |
| Flagship playlist | **The Facts Behind the Fiction** | 5 episodes at launch; room to grow |
| Second playlist | **Masters X Trilogy** | Book trailers, readings, future omnibus clips |
| Register | Literary-documentary desk | See `shoot_package/SERIES_BIBLE.md` |

Do **not** create a separate "Seventh City Press" channel yet — one author hub is easier to grow. Imprint credit in descriptions and channel About.

---

## Folder map (this project)

```
marketing/youtube/
├── CHANNEL_ROADMAP.md          ← you are here
├── YOUTUBE_SCRIPTS.md          ← master script archive
├── shoot_package/              ← production (shoot + edit)
│   ├── SERIES_BIBLE.md
│   ├── GEAR_CHECKLIST.md
│   └── EP01–EP05_*.md
└── channel/                    ← platform setup + publish
    ├── SETUP_CHECKLIST.md
    ├── BRANDING.md
    ├── EPISODE_METADATA.md     ← copy-paste titles, descriptions, tags, chapters
    ├── THUMBNAILS.md
    └── UPLOAD_WORKFLOW.md
```

---

## Phase 0 — Channel exists (before first upload)

**Goal:** A visitor who lands on the channel understands who you are in 10 seconds.

- [ ] Create or claim channel under Google account you control long-term
- [ ] Apply branding per `channel/BRANDING.md`
- [ ] Paste About text + links
- [ ] Create playlist shell: *The Facts Behind the Fiction*
- [ ] Upload **channel trailer** (optional, 60–90 sec) — script below
- [ ] Link channel from jasoncholloway.com footer / About (site update when ready)

**Channel trailer script (optional):**

> I'm Jason Carroll Holloway. I write the Masters X Trilogy — literary fiction built on real research: archaeoacoustics, medieval manuscripts, Kansas City limestone, declassified files.
>
> This series, *The Facts Behind the Fiction*, walks each seam — what was measured, what was documented, what the novel invented. No hype. Documents on the desk.
>
> Start with the cymatics demonstration if you're new here. The books and the full research trail are at jasoncholloway.com.

---

## Phase 1 — Pilot publish (week 1)

**Goal:** One world-class episode live; channel looks intentional, not empty.

| Step | Action |
|------|--------|
| Shoot | `shoot_package/EP04_TABLE_TOP_MIRACLE.md` |
| Edit | DaVinci Resolve; −16 LUFS; SRT captions |
| Metadata | `channel/EPISODE_METADATA.md` → EP04 block |
| Thumbnail | `channel/THUMBNAILS.md` → EP04 spec |
| Upload | `channel/UPLOAD_WORKFLOW.md` checklist |
| Pin | Pinned comment on EP04 (text in metadata file) |
| Playlist | Add EP04 as episode 1 of *The Facts Behind the Fiction* |

**Publish order for remaining episodes** (biweekly after pilot):

1. EP04 — Table-Top Miracle *(pilot)*
2. EP01 — Frequency in the Stone *(pairs with EP04)*
3. EP05 — Five Traditions, One Riverbank
4. EP03 — Three Factions, One Declassified File
5. EP02 — Prophet's Underground City *(KC B-roll; can slip if field day delayed)*

---

## Phase 2 — Discoverability (weeks 2–8)

- [ ] End screens on every video → next episode + jasoncholloway.com
- [ ] Cards at CTA timestamp → Field Notes URL for that topic
- [ ] Enable tier-2 Groundswell terms when pushing each video (`cymatics`, `111 Hz`, etc. in `groundswell-monitor/public/data/terms.json`)
- [ ] Add `sameAs` YouTube URL to site JSON-LD when channel URL is final
- [ ] Request indexing in Google Search Console for channel / video URLs

---

## Phase 3 — Compounding (month 3+)

- [ ] Episodes 6+ from encyclopedia essays 3–7 (not scripted yet)
- [ ] Shorts **only** if cut from real desk footage (Chladni hook, map pins) — never AI slop
- [ ] Community tab: research photo stills, no engagement bait
- [ ] Cross-link from Field Notes pages → relevant episode (site change when ready)

---

## Quality bar (non-negotiable)

From `SERIES_BIBLE.md`:

- Your voice, your desk, your documents
- No AI presenter, no AI B-roll
- Static camera, long holds, labeled seams (`measured` / `invented`)
- Thumbnails: one object, three words, black + gold

---

## Groundswell loop

```
Publish episode → enable matching tier-2 term in terms.json
                → watch groundswell-monitor snapshot for thematic lift
                → next episode topic follows what moved
```

---

## Deferred (explicitly out of scope now)

- Blog posts from `marketing/blog_newsletter/`
- Instagram carousels / reels from `marketing/social/`
- Site `/facts-behind-the-fiction/` hub page

Revisit when YouTube has 3+ episodes live.

---

## Your immediate next actions

1. Open `channel/SETUP_CHECKLIST.md` — create the channel this week
2. Procure Chladni kit from `GEAR_CHECKLIST.md`
3. Shoot EP04
4. Copy EP04 block from `EPISODE_METADATA.md` at upload
