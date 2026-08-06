# Vivian QC — Wait-Window Queue
**Desk:** Vivian · Editorial Quality & Pre-Publication Control  
**Checked:** 2026-08-01 · Protocol `scratch/EDITORIAL_QC_PROTOCOL.md`  
**Queue:** `scratch/ops_reports/packets/VIVIAN_QC_QUEUE_2026-08-01.md`  
**Rule:** Clear ≠ send. Jason Phase 4 still required.

---

## Scoreboard

| ID | Asset | Verdict | Ready for Jason checklist |
|----|-------|---------|---------------------------|
| VIV-WW-01 | IndieBound / ABA pitch + emails | **PASS WITH NOTES** | Yes — Approve to send (personalized ≤3) |
| VIV-WW-02 | Trade galley (PW / Booklist / LJ) | **PASS WITH NOTES** | Yes — low odds; BookLife fee = money decision |
| VIV-WW-02b | Shelf Awareness | **HOLD** | No — POD exclusion |
| VIV-WW-03 | NetGalley pitch / Vol I copy | **PASS WITH NOTES** | Yes — Approve to pay/list |
| VIV-WW-04 | Hawkes academic A/B | **PASS** | Yes — Approve to send |
| VIV-WW-05 | VIAF email | **PASS** | Yes — Approve to send |
| VIV-WW-06 | `authorSameAs` OL (+ series) | **PASS WITH EDITS** | Yes — Approve to deploy (after edit) |
| VIV-WW-07 | Website §6 live re-QC | **HOLD** (live deploy + visual still open; repo press regen done) | Partial — see follow-up |

---

## Per-asset notes

### VIV-WW-01 — IndieBound / ABA — PASS WITH NOTES
**Checked:** one-pager ISBN matrix vs `MORGAN_OPERATING_MEMORY` ISBN Master Registry — all PB/HC/omnibus ISBNs match. Omnibus not framed as Amazon. Tone literate. Internal trade-terms caveat present; outbound emails do **not** assert 55%/returns.

**Edit applied:** Email A now includes Vol I–III PB ISBNs inline (was “ISBNs above” with no table in the email body).

**Yellow:** Jason picks ≤3 stores with prior relationship; personalize; no mass-blast.

### VIV-WW-02 — Trade galleys — PASS WITH NOTES (+ Shelf HOLD)
**Checked:** Vol I PB 9798256008048 / EPUB 9798256008819 / 178 pp / $16.99 / $6.99 match catalog. Shared pitch has no Amazon omnibus and no trade-term claims. Timing honesty section correct (post-pub low odds).

**Edit applied:** PW / BookLife cover note now discloses post-publication submission and BookLife alternative. Shelf Awareness marked **HOLD — do not send** (IngramSpark POD exclusion).

**Yellow:** BookLife $25 (or other fees) = Jason money gate. LJ/Booklist same lateness caveat.

### VIV-WW-03 — NetGalley — PASS WITH NOTES
**Checked:** Title, author, imprint, EPUB ISBN, pub date, page count, prices match registry / `books.ts`. Categories reasonable. No omnibus. No 55%/returns.

**Edit applied:** Pitch tightened (removed “fired security guard” hype compression — Blake is a graduate student who lost the SubTropolis job; site canon preferred). Short synopsis aligned to site `shortDesc`. Full listing body instructed to paste from `books.ts` description only.

**Yellow:** $575 (or IBPA path) before live listing — Jason Phase 4 only.

### VIV-WW-04 — Hawkes academic — PASS
**Checked:** “seventeen novels” / seventeen-novel corpus throughout; zero “sixteen.” ISBNs PB/HC/EPUB match registry. No Amazon Kindle claim. No returnability claims. Tone appropriate for library/scholar courtesy.

**No copy edits required.** Personalize names at send.

### VIV-WW-05 — VIAF — PASS
**Checked:** ISNI, Wikidata Q140275300, OL OL16482975A, Goodreads, Amazon Author Central URL match locked `authorAuthority.ts`. Name form correct. Light factual pass only.

### VIV-WW-06 — Schema `sameAs` — PASS WITH EDITS
**Checked:** Both `lib/data/authorAuthority.ts` and `seventhcitypress/lib/authorAuthority.ts`.

| Identifier | Verdict |
|------------|---------|
| Wikidata author Q140275300 | OK on Person.sameAs |
| ISNI URL | OK |
| Open Library OL16482975A | OK — keep |
| Series Wikidata Q140276114 | **REMOVED from Person.sameAs** — series ≠ person; already on `BookSeries.sameAs` in `lib/seo/bookSchema.ts` (Nina SEO audit §6.3 intent) |
| Goodreads / Amazon / Everand / imprint / socials | OK (Everand duplicate note retained) |

**Deploy steps (Jason/Morgan — do not force-push):**
1. Confirm Vivian edit present on deploy branch (often `cursor/ops-dashboard-3e24` for Terminal/ops; current local branch may differ — verify before push).
2. Deploy **both** jasoncholloway.com and seventhcitypress.com so Person.sameAs stays identical.
3. After deploy, View Source / Rich Results: Person.sameAs includes OL; BookSeries.sameAs includes Q140276114; Person does **not** list series QID.
4. Mark AUTH-05 residual: confirm 4 works by ISBN on Open Library (separate from deploy).

### VIV-WW-07 — Website §6 / foundation — HOLD + FAIL items
**Content live audit (HTTP 2026-08-01):**

| Surface | Result |
|---------|--------|
| `/books/hawkes-monograph/` | **PASS** — seventeen novels present; sixteen absent |
| Masters X buy links | **PASS** — Kindle ASINs Vol I–III only; omnibus Ingram-only (no Amazon hrefs) |
| Press kit PDFs live | **FAIL** — `Masters_X_Fact_Sheet.pdf` + `Masters_X_Press_Kit.pdf` assert “Wholesale discount 55%, returns accepted” with **no PUB-11 proof** |
| `feeds/google-shopping.csv` live | **FAIL** — Hawkes rows still said “sixteen novels” at audit time |
| Mobile visual §6 (token darkening, stacked CTAs, 320px, keyboard) | **HOLD** — browser MCP unavailable this session; prior Jul 31 checklist still open |

**Edits applied (repo — need deploy):**
- `public/feeds/google-shopping.csv` — sixteen → seventeen (and sixteen-novel → seventeen-novel)
- `scratch/press_extract/Masters_X_Fact_Sheet.txt` — stripped unverified 55%/returns language (source extract only)

**Press PDFs live CLEAN (Phase 4):** No 55%/returns language on CDN. Still **do not circulate as trade-terms proof** until PUB-11 screenshots confirm returnability/wholesale.

### Follow-up 2026-08-01 — press regen + §6 retry
**Report:** `scratch/ops_reports/VIVIAN_QC_PRESS_AND_S6_FOLLOWUP_2026-08-01.md`

| Action | Status |
|--------|--------|
| Regenerated `public/press-kit/*.pdf` without 55%/returns | **DONE (repo)** |
| Omnibus prices in release/synopses → $44.99 / $32.99 | **DONE** |
| Repo PDF text extract clean | **PASS** |
| Live PDF re-check | **PASS** (Phase 4 deploy `8775ac5` — CLEAN) |
| Live shopping feed | **PASS** (seventeen; sixteen=0) |
| Live Hawkes seventeen + buy links | **PASS** |
| Schema OL Person.sameAs | **PASS** (live both sites) |
| Visual §6 browser MCP | **HOLD** (tabs not usable) |
| Deploy | **DONE** — Jason Phase 4 · see `PHASE4_EXECUTION_2026-08-01.md` |

---

## Cross-team flags

| Owner | Status |
|-------|--------|
| Claire | Outbound pitches cleared; Shelf HOLD |
| Nina | Schema edit applied; BookSeries already correct |
| Diana | NetGalley listing copy cleared; spend = Jason |
| River | PDF regen + Phase 4 deploy **live** (`8775ac5`) — CLEAN verified |

---

## Jason Phase 4 checklist (approve / send / deploy only)

### Approve to send
1. [ ] VIAF email (`VIAF_LC_NAME_AUTHORITY` packet) — from jason@ or press@
2. [ ] Hawkes academic Draft A and/or B — personalized
3. [ ] IndieBound/ABA Email A to ≤3 KC/Heartland stores — personalized
4. [ ] Optional: PW BookLife / Booklist / LJ notes — accept low odds; pay fees only if intentional

### Approve to spend / list
5. [ ] NetGalley Vol I — pay path + upload after this QC (Vivian PASS WITH NOTES)

### Approve to deploy
6. [ ] Schema: OL on Person.sameAs (series QID only on BookSeries) — both sites
7. [ ] Shopping feed seventeen fix — so Merchant/Shopping stops serving “sixteen”
8. [ ] Deploy regenerated press PDFs (repo PASS 2026-08-01 — no 55%/returns) — still no trade-term claims until PUB-11

### Do NOT approve yet
- Shelf Awareness send
- Any “55% / returns accepted” language in new outbound
- Website §6 full visual sign-off (needs live mobile/desktop eyes post-deploy)
- Foundation complete declaration

---

## Still blocked (external / Jason)

| Blocker | Why |
|---------|-----|
| PUB-09 Ingram PB×3 Approve | Catalog dirty |
| PUB-10 Ingram HC×3 Revise Files | Catalog dirty |
| PUB-11 returnability + wholesale screenshots | Press kit FAIL until proof or PDF strip |
| Shelf Awareness POD policy | HOLD |
| Website §6 visual | HOLD — re-run on deployed build |
| OPS-01 commit | Jason authorizes dirty-tree commit |
| WEB-04 email opt-in | Separate |

---

## Handoff → Morgan → Jason

```markdown
### Vivian QC — WAIT WINDOW 2026-08-01
- **Verdict:** Mixed — outbound drafts cleared; website/press-kit trade claims HOLD/FAIL
- **Checked:** 2026-08-01
- **Notes:** Series Wikidata removed from Person.sameAs; shopping feed sixteen fixed in repo; live press PDFs still claim 55%/returns
- **Visual pass:** Website §6 mobile/desktop NOT completed (browser MCP down)
- **Ready for checklist:** yes for VIV-WW-01–06 (with notes/holds as above); no for full foundation close
```

*VIVIAN — Editorial Quality & Pre-Publication Control*  
*"Nothing goes out the door with the wrong ISBN on it."*
