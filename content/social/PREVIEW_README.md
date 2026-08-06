# Social Preview — v2 Outstand Drafts

Local preview of all 7 social slots: v2 images + platform captions + Outstand post IDs. No Outstand login or API required.

## Quick start

From the **repo root**:

```bash
cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
python -m http.server 8080
```

Open in browser:

**http://localhost:8080/content/social/preview/index.html**

Or double-click `scripts/Open_Social_Preview.bat` (starts server and opens the page).

## Phone spot-check (same Wi‑Fi)

1. Find your PC's local IP: `ipconfig` → IPv4 (e.g. `192.168.1.42`)
2. On phone: `http://192.168.1.42:8080/content/social/preview/index.html`
3. Allow Windows Firewall if prompted

## What you see per slot

| Section | Source |
|---------|--------|
| IG carousel slides (numbered) | `public/social/imagen-overlaid/slotN/v2/` |
| X + Facebook square | `public/social/platform-overlaid/slotN-*-xfb-v2.jpg` |
| Pinterest tall pin | `public/social/platform-overlaid/pinterest-slotN-*-v2.jpg` |
| Captions (IG, X, FB, Bluesky) | `content/social/CAPTION_MANIFEST.json` |
| Outstand post IDs | `content/social/PREVIEW_MANIFEST.json` (from assignment report) |

## Files

- `content/social/preview/index.html` — preview UI
- `content/social/PREVIEW_MANIFEST.json` — image paths + Outstand IDs
- `content/social/CAPTION_MANIFEST.json` — caption text (loaded live)
- `scripts/Open_Social_Preview.bat` — one-click launcher (Windows)

## Updating

- **Captions changed?** Refresh the page — captions load from `CAPTION_MANIFEST.json` automatically.
- **New v2 images or Outstand IDs?** Edit `PREVIEW_MANIFEST.json` (or regenerate from assignment report).
- **New slot added?** Add entry to both manifest files and extend tab count in HTML if needed.

## Limitations

- Preview only — does not publish or sync with Outstand.
- Bluesky captions shown for review; Bluesky was **not** assigned in the v2 Outstand pass.
- X and Facebook share one image and nearly identical captions; Outstand uses one post ID for both.
- Must serve via HTTP (`python -m http.server`); opening `index.html` as a `file://` URL will block JSON fetches.

## Gate reminder

Vivian QC → Jason Phase 4 approval → publish/schedule in Outstand. This tool is for spot-check only.
