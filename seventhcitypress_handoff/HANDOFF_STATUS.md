# HANDOFF STATUS — Seventh City Press Domain Split

**Prepared:** July 12, 2026  
**Status:** Claude return integrated — imprint ready to deploy

---

## Goal

Two Cloudflare Pages projects:

| Project | Domain |
|---------|--------|
| `jasoncholloway` | jasoncholloway.com (author + bookstore) |
| `seventhcitypress` | seventhcitypress.com (imprint / press) |

---

## Integrated (Cursor, July 12)

| Item | Path |
|------|------|
| Imprint site | `seventhcitypress/` — **build passes** |
| Author patches | Applied to repo (Header, Footer, layout, sitemap, contact, llms.txt, generate_press_kit.py) |
| `/press` redirect | **Deferred** — commented in `public/_redirects` until imprint live |
| Ready redirect file | `author_patches/public/_redirects` — uncomment in live `_redirects` after verify |
| Deploy notes | `seventhcitypress_handoff/DEPLOY_NOTES.md` |
| Checklist | `seventhcitypress_handoff/SCP_MIGRATION_STATUS.md` |

---

## Handoff package (sent to Claude)

| Item | Path |
|------|------|
| **Claude prompt** | `seventhcitypress_handoff/CLAUDE_SCP_SITE_PROMPT.md` |
| **Your setup steps** | `seventhcitypress_handoff/SETUP_GUIDE.md` |
| Architecture | `ARCHITECTURE.md` |
| Author patches spec | `AUTHOR_SITE_MIGRATION.md` |
| Zip script | `scripts/package_seventhcitypress_handoff.py` |
| **Zip (primary)** | `seventhcitypress_handoff/masters-x-seventhcitypress-handoff.zip` (~15 MB, 52 files) |
| **Zip (copy)** | `Downloads/masters-x-seventhcitypress-handoff.zip` — only if disk space allows |
| **Claude entry** | `CLAUDE_START_HERE.md` at zip root |

---

## Why Claude (not Fable)

- Multi-file Next.js project extraction + new repo folder
- Coordinated author-site patch set
- CSS/module porting from existing App Router site
- Fable better for print/PDF/video — **Claude better for this web split**

---

## Return expected

`seventhcitypress-site-RETURN.zip` — see `CLAUDE_SCP_SITE_PROMPT.md` deliverable tree

---

## Jason's manual steps (cannot be automated)

1. IONOS → Cloudflare nameservers
2. Cloudflare Pages project creation
3. `wrangler pages deploy` × 2
4. Search Console + Wikidata
5. Deploy author redirect **after** imprint verified

---

## After return (Cursor)

1. Merge `seventhcitypress/` into repo
2. Apply `author_patches/`
3. Run builds both projects
4. Walk through `SETUP_GUIDE.md` Part C–D
