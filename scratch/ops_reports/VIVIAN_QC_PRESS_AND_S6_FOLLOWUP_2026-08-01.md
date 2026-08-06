# Vivian QC — Press PDF Regen + Website §6 Follow-up
**Desk:** Vivian · Editorial Quality & Pre-Publication Control  
**Checked:** 2026-08-01 (~01:45 CT) · Follow-up from `VIVIAN_QC_WAIT_WINDOW_2026-08-01.md`  
**Rule:** Clear ≠ send/deploy. Jason Phase 4 still required. **No push/deploy this session.**

---

## Scoreboard

| Item | Verdict | Notes |
|------|---------|-------|
| Press kit PDF regen (repo `public/press-kit/`) | **PASS** | 55%/returns stripped; catalog prices aligned to `books.ts` |
| Live press PDFs (production CDN) | **FAIL → deploy-blocked** | Still serve old “Wholesale discount 55%, returns accepted” |
| Website §6 content (buy links, Hawkes seventeen) | **PASS** | Live HTTP 2026-08-01 |
| Shopping feed seventeen (repo) | **PASS** | `public/feeds/google-shopping.csv` = seventeen |
| Shopping feed seventeen (live) | **FAIL → deploy-blocked** | Live CSV still has sixteen ×2 + sixteen-novel ×2 |
| Schema `authorSameAs` OL (repo) | **PASS WITH EDITS** (prior) | OL on Person; series QID not on Person |
| Schema OL live | **HOLD → deploy-blocked** | Live Person.sameAs still lacks Open Library |
| Website §6 visual (mobile/desktop eyes) | **HOLD** | cursor-ide-browser could not retain a tab this session |

**VIV-WW-07 overall:** still **HOLD** for foundation close — content partial PASS; press/feed/schema need Jason deploy; visual not signed.

---

## 1. Press kit regeneration

**Script:** `scripts/generate_press_kit.py`  
**Output:** `public/press-kit/` (site-served paths)

| File | Regen |
|------|-------|
| `Masters_X_Fact_Sheet.pdf` | Yes |
| `Masters_X_Press_Release.pdf` | Yes |
| `Masters_X_Synopses.pdf` | Yes |
| `Holloway_Author_Bios.pdf` | Yes |
| `Masters_X_Press_Kit.pdf` | Yes (merged) |

### Edits applied in generator
1. **Removed** unverified “Wholesale discount 55%, returns accepted” from Fact Sheet CHANNELS block (heading → CHANNELS only).
2. **Omnibus prices** in release/synopses corrected to match `lib/data/books.ts` / Fact Sheet matrix: **$44.99 HC / $32.99 PB** (was $29.99 / $19.99).
3. **Blake framing** aligned to site canon: graduate student who lost security clearance / SubTropolis guard job (not “fired security guard” compression).
4. Clarified Kindle = Vol I–III only; omnibus not on Amazon.

### Text extract verification (repo PDFs)
`pypdf` extract on all regenerated PDFs: **zero** hits for `55%`, `returns accepted`, `Wholesale discount`, `sixteen novels` / `sixteen-novel`.  
Extracts refreshed under `scratch/press_extract/*.txt`.

**PUB-11:** still open. Do **not** re-insert returnability/wholesale claims without Ingram screenshots.

---

## 2. Website §6 live re-QC (HTTP 2026-08-01)

| Surface | Result |
|---------|--------|
| `/books/hawkes-monograph/` | **PASS** — seventeen novels present; sixteen absent |
| Masters X Vol I–III buy links | **PASS** — Kindle ASINs only (`B0H4KYMSM1`, `B0H4KQ4YQJ`, `B0H4L36X21`) |
| Omnibus page | **PASS** — no Amazon product DP; author-store link only |
| Contact press-kit download href | **PASS** — `/press-kit/Masters_X_Press_Kit.pdf` |
| Live Fact Sheet / Press Kit PDFs | **FAIL** — still assert 55%/returns (pre-regen bytes) |
| `feeds/google-shopping.csv` live | **FAIL** — sixteen still present |
| Person.sameAs live | **HOLD** — Wikidata/ISNI/etc. OK; **OL missing** until deploy of VIV-WW-06 |
| Mobile/desktop visual §6 | **HOLD** — browser MCP: tabs created then immediately unavailable; no screenshot pass |

---

## 3. Deploy batch (Jason Phase 4 — not executed)

Do **not** push/deploy until Jason approves. When approved, one web deploy should include:

1. Regenerated `public/press-kit/*.pdf`
2. `public/feeds/google-shopping.csv` seventeen fix
3. `authorSameAs` OL (+ series off Person) on **both** jasoncholloway.com and seventhcitypress.com

**Post-deploy Vivian spot-check:**
- Live Fact Sheet / Press Kit: no 55%/returns
- Live shopping CSV: seventeen only
- Person.sameAs includes Open Library; BookSeries keeps Q140276114; Person does not list series QID
- Optional: visual §6 when browser MCP is healthy

---

## Jason Phase 4 checklist (remaining)

### Approve to send (unchanged — cleared earlier)
1. [ ] VIAF email  
2. [ ] Hawkes academic A/B  
3. [ ] IndieBound/ABA ≤3 personalized  
4. [ ] Optional trade galley PW/Booklist/LJ (Shelf HOLD)

### Approve to spend
5. [ ] NetGalley Vol I path

### Approve to deploy
6. [ ] Schema OL Person.sameAs (both sites)  
7. [ ] Shopping feed seventeen  
8. [ ] **Regenerated press PDFs** (this follow-up — repo ready)

### Do NOT approve yet
- Shelf Awareness  
- Any 55%/returns language (await PUB-11)  
- Website §6 full visual sign-off  
- Foundation complete declaration  

---

## Handoff → Morgan → Jason

```markdown
### Vivian QC — PRESS + §6 FOLLOW-UP 2026-08-01
- **Verdict:** Press PDFs regen PASS in repo; live §6 still HOLD (old PDFs + shopping sixteen + schema OL undeployed + visual MCP down)
- **Checked:** 2026-08-01
- **Notes:** Generator stripped trade terms; omnibus $44.99/$32.99; Blake canon language; no deploy
- **Visual pass:** NOT completed (browser MCP tab failure)
- **Ready for checklist:** yes — Approve to deploy press PDFs + shopping + schema; sends still as prior wait-window
```

*VIVIAN — Editorial Quality & Pre-Publication Control*  
*"Nothing goes out the door with the wrong ISBN on it."*
