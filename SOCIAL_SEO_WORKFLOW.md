# Social Media & SEO Workflow

This document explains the workflows for posting blog content to social media and submitting URLs to Google Search Console.

## Social Media Posting

**Platforms:** X (Twitter), Bluesky, Instagram  
**Excluded:** LinkedIn (per author request)  
**Content source:** `content/blog/SOCIAL_FROM_BLOG.md`

### Posting Schedule

7 slots corresponding to essays 01-04 and 06-08. Suggested cadence:
- X and Bluesky on publish day
- Instagram carousel 2 days later
- No LinkedIn posts

### Usage

```bash
# View posting schedule
node scripts/post-to-social.mjs list

# Check posting status
node scripts/post-to-social.mjs status

# Post to specific platform
node scripts/post-to-social.mjs post 1 x          # Slot 1 to X
node scripts/post-to-social.mjs post 1 bluesky    # Slot 1 to Bluesky
node scripts/post-to-social.mjs post 1 instagram  # Slot 1 to Instagram
```

The script extracts the pre-written content from `SOCIAL_FROM_BLOG.md`, displays it, and tracks what's been posted in `.social-post-status.json`.

Currently configured for **manual posting** (copy/paste to platforms). Automated posting would require platform API credentials.

## Google Search Console

**Sitemap:** Updated to include all 7 blog posts at `https://jasoncholloway.com/sitemap.xml`

### Sitemap Submission

```bash
# Get sitemap submission instructions
node scripts/submit-to-gsc.mjs sitemap
```

Manual steps:
1. Go to https://search.google.com/search-console
2. Select `jasoncholloway.com` property
3. Navigate to "Sitemaps" in left sidebar
4. Enter `/sitemap.xml`
5. Click "Submit"

### Individual URL Submission

```bash
# List all blog URLs for indexing
node scripts/submit-to-gsc.mjs urls

# Show both sitemap and URL instructions
node scripts/submit-to-gsc.mjs all
```

**Option 1: URL Inspection Tool** (recommended for immediate indexing)
1. Go to GSC
2. Use URL inspection tool (search bar at top)
3. Paste each blog URL
4. Click "Request Indexing"

**Option 2: Wait for crawl** (1-3 days after sitemap submission)

## Files Changed

- `app/sitemap.ts` — added blog posts to sitemap
- `scripts/post-to-social.mjs` — social media posting workflow
- `scripts/submit-to-gsc.mjs` — GSC submission helper
- `.social-post-status.json` — tracks posted content (gitignored)

## Next Steps

1. Deploy updated sitemap (includes blog posts)
2. Submit sitemap to GSC
3. Begin social posting workflow (slot 1, then 2, etc.)
4. Monitor GSC Coverage report for indexing status
