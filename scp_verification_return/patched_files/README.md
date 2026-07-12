# patched_files/ — ready-to-merge author-site files

These are the author-site (`jasoncholloway` repo) files with all migration + email fixes applied.
Merge each into the corresponding path in your repo, then rebuild + redeploy.

> ⚠️ **Read the diagnostic first.** The live site appears to be running *older* code than
> your working tree (see `CURSOR_VERIFICATION_PROMPT.md` §1). If the diagnostic shows the
> repo already contains most of these fixes, the real fix is **rebuild from a clean tree +
> redeploy**, and these files just fill remaining gaps (emails, contactPoint). Don't blindly
> overwrite newer repo files with these without checking `git status` / `git diff` first.

| File | What changed |
|------|--------------|
| `public/_redirects` | Adds `/press` + `/press/` → `https://seventhcitypress.com/` 301 |
| `app/layout.tsx` | Org `url` → imprint; Person `sameAs` += imprint; **new** `contactPoint` with `info@seventhcitypress.com` |
| `app/contact/page.tsx` | Sidebar press link → imprint; **new** role-based email card (`info@`, `jason@`, media→imprint) |
| `components/layout/Header.tsx` | Press nav → external `<a>` to imprint |
| `components/layout/Footer.tsx` | Publisher link → imprint |
| `app/sitemap.ts` | `/press` entry removed |
| `public/llms.txt` | Publisher URL → imprint; imprint added to Key URLs |
| `scripts/generate_press_kit.py` | Footer URLs → `seventhcitypress.com` (3 spots) |

## Also required (not a file here — Cursor does these)

- `git rm -r app/press/` — delete the route so no competing static page is emitted
- Fix `aerospace research` → `acoustic research` in `app/page.tsx` (homepage). *This file
  wasn't in the reference bundle, so it's not pre-patched here — Cursor edits it in place.*
- Grep for the bad Hawkes ISBN `9798295777622` and correct any remaining reference to
  `9798295778247` (PB) / `9798349308444` (HC).
- Regenerate press-kit PDFs: `python scripts/generate_press_kit.py`, then redeploy the
  `press-kit/` folder to **both** sites.

## Cloudflare (Jason, dashboard)

- Turn ON Email Address Obfuscation for `jasoncholloway.com` (Scrape Shield) so the
  `mailto:` links in the patched contact page get auto-protected at the edge.
