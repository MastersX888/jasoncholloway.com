# P0 Fix — Web-Deliverable Binaries Were Ignored by Git and 404ing in Production

**Date:** 2026-07-31 · **Scope:** `.gitignore` / asset tracking only · **Routing:** Morgan → Jason
**Status:** Fixed and committed **locally**. **Not pushed. Not deployed.** Nothing is live yet.
**Source finding:** `scratch/ops_reports/seo/SEO_AUDIT_2026-07-31.md` §P0-1 (Nina)

---

## 1. Summary

A blanket `*.pdf` (line 48) and `*.epub` (line 49) in the root `.gitignore` kept six
web-deliverable files out of git. Cloudflare Pages builds from the git repository, so
untracked files never reach the build and never reach production. Confirmed by live HTTP:
every one of them returns **404**.

Six files, 62.4 KB total, are now tracked and committed locally. The `.gitignore` change is
scoped to two directories; every print-production binary remains ignored, verified
explicitly below.

One additional defect was found during the fix and is also repaired: git was treating the
press-kit PDFs as **text** files and would have corrupted them on a future Windows checkout.
See §6.

---

## 2. Verified before-state

### 2.1 Live HTTP evidence

`HEAD` requests, no redirect following, browser UA, TLS verification disabled (the
workstation has an intercepting root CA — a local condition, not a site defect). Probe
script retained at `scratch/_probe_p0_binaries.py`.

```
404  text/html   https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf
404  text/html   https://seventhcitypress.com/press-kit/Masters_X_Press_Release.pdf
404  text/html   https://seventhcitypress.com/press-kit/Masters_X_Fact_Sheet.pdf
404  text/html   https://seventhcitypress.com/press-kit/Holloway_Author_Bios.pdf
404  text/html   https://seventhcitypress.com/press-kit/Masters_X_Synopses.pdf
404  text/html   https://seventhcitypress.com/press-kit/PressKit_Agent_Prompt.pdf
404  -           https://jasoncholloway.com/downloads/masters-x-opening-chapters.epub
```

**Control requests proving the root cause is tracking, not the build config.** These are
tracked files in the very same `public/` trees, and they serve correctly:

```
200  image/png         73,023 B      https://seventhcitypress.com/og-image.png
200  image/png        655,721 B      https://seventhcitypress.com/covers/book1-paperback.png
200  application/pdf 1,048,734 B     https://jasoncholloway.com/downloads/The_Distribution_File.pdf
```

That last one is decisive: a **1 MB PDF in `public/downloads/` returns 200** because it was
previously force-added to git. The neighbouring EPUB in the same directory 404s solely
because it is untracked. Nothing about PDFs, EPUBs, or the Next.js static export is broken —
the only variable is git tracking.

### 2.2 Files exist locally

```
seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf         17.1 KB
seventhcitypress/public/press-kit/Masters_X_Press_Release.pdf      5.7 KB
seventhcitypress/public/press-kit/Masters_X_Fact_Sheet.pdf         4.7 KB
seventhcitypress/public/press-kit/Holloway_Author_Bios.pdf         4.2 KB
seventhcitypress/public/press-kit/Masters_X_Synopses.pdf           5.2 KB
seventhcitypress/public/press-kit/PressKit_Agent_Prompt.pdf      501.4 KB   (see §5)
public/downloads/masters-x-opening-chapters.epub                  25.5 KB
```

### 2.3 Ignore rule confirmed as the cause

```
$ git check-ignore -v seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf
.gitignore:48:*.pdf   seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf

$ git check-ignore -v public/downloads/masters-x-opening-chapters.epub
.gitignore:49:*.epub  public/downloads/masters-x-opening-chapters.epub

$ git ls-files seventhcitypress/public/press-kit
(no output — zero files tracked)
```

### 2.4 Broken links this produced

| Surface | Reference |
|---|---|
| Imprint hero CTA "Download Complete Press Kit" | `seventhcitypress/app/page.tsx:430` |
| Imprint five-tile press-kit grid | `seventhcitypress/app/page.tsx:443` (4 files) |
| Imprint homepage secondary CTA | `seventhcitypress/app/page.tsx:209` |
| **Site-wide footer "Download Press Kit"** — every page | `seventhcitypress/components/layout/Footer.tsx:38` |
| Imprint contact page | `seventhcitypress/app/contact/page.tsx:86` |
| Imprint **XML sitemap** — Google actively pointed at a 404 | `seventhcitypress/app/sitemap.ts:11` |
| Author-site contact page | `app/contact/page.tsx:80` |
| **Lead-magnet delivery page** — the free-chapters EPUB | `app/chapters-sent/page.tsx:29` |

---

## 3. The exact `.gitignore` change

The blanket rules were **kept**. Only anchored, directory-scoped negations were added.
Patterns containing a slash are anchored to the `.gitignore`'s own directory, so these
exceptions cannot reach `production_staging/`, `_covers/`, or anything on the Desktop.

```diff
 # Large Exports
 Jason_Carroll_Holloway_Final_Export/
 website_unzipped/
 business_cards/
 *.pdf
 *.epub
 *.zip
 *_out.txt
 *.py
+
+# Web-deliverable public assets — these MUST be tracked or they 404 in production.
+# Cloudflare Pages builds from git, so anything untracked never reaches the deploy.
+# Scoped to the two sites' `public/` download directories only; print-production
+# binaries (production_staging/, _covers/, MASTER_UPLOAD_FOLDER) stay ignored.
+!public/press-kit/*.pdf
+!public/downloads/*.pdf
+!public/downloads/*.epub
+!seventhcitypress/public/press-kit/*.pdf
+
+# Not linked from any page and byte-identical to the tracked author-site copy;
+# needs an explicit publish decision before it ships.
+seventhcitypress/public/press-kit/PressKit_Agent_Prompt.pdf
```

`!public/press-kit/*.pdf` and `!public/downloads/*.pdf` are no-ops today — those files were
already force-added at some point — but they make the intent explicit so the next file
dropped into a web-download directory does not silently fall into the same trap.

---

## 4. Proof that print-production binaries are still ignored

```
$ git check-ignore -v --no-index <paths>
.gitignore:48:*.pdf    production_staging/b1_inheritance/9798256008048_PB/interior.pdf
.gitignore:48:*.pdf    production_staging/_covers/print_recoverable/DUSTJACKET_BOOK2.pdf
.gitignore:48:*.pdf    production_staging/b2_grimoire/9798256009953_PB/cover_wrap.pdf
.gitignore:49:*.epub   production_staging/_epub_build/9798256008819.epub
.gitignore:49:*.epub   scratch/google_play_upload/content/9798256008819.epub
.gitignore:48:*.pdf    some/random/file.pdf          (arbitrary path — still ignored)
.gitignore:50:*.zip    archive.zip                    (arbitrary path — still ignored)
```

Whole-tree count, unchanged by this edit:

```
$ git ls-files --others --ignored --exclude-standard -- production_staging | wc -l
152
```

And the complete set of files git now sees in the two `public/` trees — exactly the six
intended, nothing more:

```
$ git ls-files --others --exclude-standard -- public seventhcitypress/public
public/downloads/masters-x-opening-chapters.epub
seventhcitypress/public/press-kit/Holloway_Author_Bios.pdf
seventhcitypress/public/press-kit/Masters_X_Fact_Sheet.pdf
seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf
seventhcitypress/public/press-kit/Masters_X_Press_Release.pdf
seventhcitypress/public/press-kit/Masters_X_Synopses.pdf

$ git ls-files --others --ignored --exclude-standard -- public seventhcitypress/public
seventhcitypress/public/press-kit/PressKit_Agent_Prompt.pdf
```

Nothing under `production_staging/` or `C:\Users\zh577\Desktop\MASTER_UPLOAD_FOLDER` was
read, written, moved, or copied.

---

## 5. Newly tracked files and sizes

| File | Bytes | Size | Site |
|---|---:|---:|---|
| `seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf` | 17,505 | 17.1 KB | imprint |
| `seventhcitypress/public/press-kit/Masters_X_Press_Release.pdf` | 5,806 | 5.7 KB | imprint |
| `seventhcitypress/public/press-kit/Masters_X_Fact_Sheet.pdf` | 4,797 | 4.7 KB | imprint |
| `seventhcitypress/public/press-kit/Holloway_Author_Bios.pdf` | 4,280 | 4.2 KB | imprint |
| `seventhcitypress/public/press-kit/Masters_X_Synopses.pdf` | 5,324 | 5.2 KB | imprint |
| `public/downloads/masters-x-opening-chapters.epub` | 26,157 | 25.5 KB | author |
| **Total** | **63,869** | **62.4 KB** | |

Local commit: **`d0f11e5`** on branch `cursor/upload-staging-f9e1`.

### The one file deliberately left out

`PressKit_Agent_Prompt.pdf` (501.4 KB) sits in the same directory but is **not linked from
any page on either site**, and it is byte-identical (SHA-256 match) to the copy already
tracked at `public/press-kit/PressKit_Agent_Prompt.pdf`. Tracking it would ship a duplicate
half-megabyte blob that no visitor can reach through the UI. Given the name, it also looks
like an internal working document rather than press collateral, and the operating rules
require approval before anything public-facing ships. It is explicitly re-ignored with a
comment. **Say the word and it takes ten seconds to include.**

---

## 6. Second defect found while fixing the first — binary files treated as text

`git add` emitted this on all five PDFs:

```
warning: in the working copy of 'seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf',
LF will be replaced by CRLF the next time Git touches it
```

Cause: `core.autocrlf=true` is set globally in `C:/Program Files/Git/etc/gitconfig`, the repo
had **no `.gitattributes` at all**, and git's content heuristic misclassified these generated
PDFs as text because they contain no NUL bytes early in the file. The EPUB and the PNGs were
correctly detected as binary; the PDFs were not.

Consequence had it been left alone: the next fresh clone or checkout on Windows would rewrite
every `0x0A` inside the PDFs to `0x0D 0x0A`, corrupting them in the working tree. A later
routine commit would then have published corrupted press-kit downloads — the same class of
silent failure, one step further downstream.

**Fixed** by adding a root `.gitattributes` marking `.pdf`, `.epub`, `.zip`, and the common
image/font/media extensions as `binary`.

Verified the committed blobs are byte-exact — filtered and unfiltered hashes agree, and both
match what is in the index:

```
IDENTICAL  seventhcitypress/public/press-kit/Masters_X_Press_Kit.pdf
IDENTICAL  seventhcitypress/public/press-kit/Masters_X_Press_Release.pdf
IDENTICAL  seventhcitypress/public/press-kit/Masters_X_Fact_Sheet.pdf
IDENTICAL  seventhcitypress/public/press-kit/Holloway_Author_Bios.pdf
IDENTICAL  seventhcitypress/public/press-kit/Masters_X_Synopses.pdf
IDENTICAL  public/downloads/masters-x-opening-chapters.epub
```

`git add --renormalize` across both `public/` trees produced no changes, confirming the
previously committed binaries (`og-image.png`, the cover PNGs, `The_Distribution_File.pdf`)
were never corrupted.

---

## 7. Audit for other silently-ignored web assets

A scanner (`scratch/_audit_public_assets.py`) walked every `.ts/.tsx/.js/.jsx/.css/.html/.json`
file in both sites' `app/`, `components/`, and `lib/` directories, extracted every static
asset reference, and cross-checked each one against the filesystem and `git ls-files`.

**Result: the six files above were the only ones. Nothing else is missing.**

- Every referenced image, favicon, OG image, RSS file, and verification file exists on disk
  **and** is tracked.
- No fonts are self-hosted, so there is no font exposure.
- All four `public/` directories in the repo (`public/`, `seventhcitypress/public/`,
  `groundswell-monitor/public/`, `the-bridge-worker/public/`) were checked for
  untracked-or-ignored content. Only the six listed files appeared.

### Non-blocking observations, no action taken

1. **The author site's own press-kit PDFs are unreachable and are dead weight.**
   `public/_redirects:6` sends `/press-kit/*` to `seventhcitypress.com/press-kit/:splat` with
   a 301, verified live. So the ~538 KB of tracked PDFs under `public/press-kit/` can never be
   served. Harmless, but they are duplicated storage and a maintenance trap — two copies that
   can drift apart. Worth consolidating on the imprint site later.
2. **`*.py` is globally ignored** (line 52). Several scripts are tracked only because they
   were force-added. Not a web-deliverable issue, so it was left alone, but it is the same
   pattern of trap and will bite again.
3. **The imprint site has no `_headers` file**, so PDFs are served with Cloudflare's default
   content type. Not a defect — `application/pdf` is inferred correctly — just noting it.

---

## 8. Repo and build sanity

- **Repo bloat:** 62.4 KB added against a 1,239.6 MB `.git`. That is 0.005%. Non-issue.
- **Build config untouched.** Both projects are Next.js `output: 'export'`, which copies
  `public/` verbatim into `out/`. Adding files to `public/` cannot affect the build. The live
  200s in §2.1 for tracked assets in these same directories are the empirical proof.
- **No build was run locally.** `node_modules` is absent from both projects and C: has only
  **0.64 GB free** — an `npm install` would have risked filling the disk. Given the control
  requests already demonstrate the mechanism, a local build would add nothing.
- **No large binaries were copied anywhere.** The only files written were this report, the
  two small analysis scripts, `.gitattributes`, and the `.gitignore` edit.
- **Nothing outside scope was touched.** No CSS, no page templates, no SEO metadata, no
  `production_staging/`, no `MASTER_UPLOAD_FOLDER`.

---

## 9. What Jason has to do to make this live

Everything is committed locally as `d0f11e5` on `cursor/upload-staging-f9e1`. **It has not
been pushed.** Nothing changes in production until you push.

### Read this before pushing — the branch carries more than this fix

`cursor/upload-staging-f9e1` is **19 commits ahead of `origin/main`**. Only the newest one is
this fix. The other 18 are the cartographer geo-audit pass, the interior/EPUB rebuilds, and
the 2026-07-30 ops pass. Merging the branch to `main` deploys **all of it**, and both
Cloudflare Pages projects (`jasoncholloway` and `seventhcitypress`) build from this one repo,
so a push to `main` rebuilds **both sites**.

### There is a landmine on the author-site build

Per SEO audit P1-1: eight `/blog/` URLs are live and declared in the production sitemap, but
`app/blog/` **does not exist in this branch's source** (`git ls-files app/blog` → empty). The
deployed author site predates the blog's removal. The moment the `jasoncholloway` project
rebuilds, those eight indexed URLs — roughly 6,500 words with real topical depth — become
hard 404s with no redirects.

This matters here because the EPUB lead-magnet fix **requires** an author-site rebuild. The
press-kit fix does not; it only needs the imprint project.

**Recommended order:**

1. **Add the eight `/blog/` 301s to `public/_redirects`** (mapping table in SEO audit P1-1)
   and commit them onto this branch *before* pushing. This is the one thing that turns a safe
   deploy into a risky one, and it is roughly an hour of work.
2. Push / merge to `main`.
3. Watch both Pages builds complete in the Cloudflare dashboard.
4. Verify — all seven should return `200`:

```
https://seventhcitypress.com/press-kit/Masters_X_Press_Kit.pdf        -> 200 application/pdf
https://seventhcitypress.com/press-kit/Masters_X_Press_Release.pdf    -> 200 application/pdf
https://seventhcitypress.com/press-kit/Masters_X_Fact_Sheet.pdf       -> 200 application/pdf
https://seventhcitypress.com/press-kit/Holloway_Author_Bios.pdf       -> 200 application/pdf
https://seventhcitypress.com/press-kit/Masters_X_Synopses.pdf         -> 200 application/pdf
https://jasoncholloway.com/downloads/masters-x-opening-chapters.epub  -> 200 application/epub+zip
https://jasoncholloway.com/downloads/The_Distribution_File.pdf        -> 200  (regression check)
```

Re-running `python scratch/_probe_p0_binaries.py` does all seven in one shot.

If you would rather ship the press-kit fix alone and defer the author site, say so — the
commit can be split so the imprint fix lands first and the EPUB waits for the blog redirects.

### What goes live when you push

- All five press-kit PDFs start serving on `seventhcitypress.com`. The hero CTA, the five-tile
  grid, the site-wide footer link, and the contact-page link all start working for the first
  time since launch.
- The XML sitemap stops pointing Google at a 404. This closes SEO audit **P0-3** for free.
- The free-chapters EPUB starts downloading from `/chapters-sent/`, so the newsletter lead
  magnet actually delivers.

### Still open, not addressed here (different owners)

- **P0-2** — imprint Book/Person schema never reaches crawlers (`next/script` hydration bug).
- **P0-3** — resolved automatically by this fix once deployed.
- **P1-1** — the `/blog/` redirect decision above. Time-sensitive.
- **P1-2** — `seventhcitypress.com` has no analytics, which is exactly why this two-month
  outage produced no alert. A `file_download` event on the press-kit links would make a repeat
  of this failure visible within a day.

---

*Morgan — Business Operations · Seventh City Press LLC · 2026-07-31*
