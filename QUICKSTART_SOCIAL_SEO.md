# Quick Start: Social Media & SEO

## Google Search Console (GSC)

### 1. Submit the updated sitemap

The sitemap now includes all 7 blog posts. Submit it to GSC:

```bash
node scripts/submit-to-gsc.mjs sitemap
```

**Manual steps:**
1. Go to https://search.google.com/search-console
2. Select `jasoncholloway.com`
3. Sitemaps → Enter `/sitemap.xml` → Submit

### 2. Request indexing for blog URLs (optional, speeds up discovery)

```bash
node scripts/submit-to-gsc.mjs urls
```

Use the URL Inspection Tool in GSC to manually request indexing for each of the 7 blog URLs shown.

---

## Social Media Posting

### View the schedule

```bash
node scripts/post-to-social.mjs list
```

Shows all 7 slots with their essay titles and URLs.

### Post to platforms (X and Bluesky first, Instagram 2 days later)

**Examples:**
```bash
# Slot 1 to X
node scripts/post-to-social.mjs post 1 x

# Slot 1 to Bluesky  
node scripts/post-to-social.mjs post 1 bluesky

# Slot 1 to Instagram (2 days after X/Bluesky)
node scripts/post-to-social.mjs post 1 instagram
```

The script will:
1. Extract the pre-written content from `SOCIAL_FROM_BLOG.md`
2. Display it in your terminal
3. Give you instructions to copy/paste to the platform
4. Track that it's been posted in `.social-post-status.json`

### Check progress

```bash
node scripts/post-to-social.mjs status
```

Shows checkboxes for which platforms have been posted for each slot.

### Suggested workflow

1. **Week 1:** Post slot 1 to X and Bluesky on the same day
2. **Week 1 + 2 days:** Post slot 1 to Instagram
3. **Week 3:** Post slot 2 to X and Bluesky
4. Continue with 2-week cadence

---

## Files Reference

- `SOCIAL_SEO_WORKFLOW.md` — Full documentation
- `content/blog/SOCIAL_FROM_BLOG.md` — All social content (7 slots × 3 platforms)
- `.social-post-status.json` — Tracks what's been posted (auto-generated)
- `scripts/post-to-social.mjs` — Social posting helper
- `scripts/submit-to-gsc.mjs` — GSC submission helper
