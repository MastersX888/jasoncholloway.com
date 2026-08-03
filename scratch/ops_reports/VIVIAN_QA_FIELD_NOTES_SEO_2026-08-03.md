# Vivian QC — Field Notes SEO (2026-08-03)

**Asset:** Field Notes SEO morning-shift public diffs (hub + 12 essays + layout CTA + sitemap/RSS derivation)  
**Protocol:** `scratch/EDITORIAL_QC_PROTOCOL.md`  
**Parent greenlight:** Guerrilla Q3 — **PARTIAL APPROVE** (Field Notes SEO only)  
**Source packet:** `FIELD_NOTES_SEO_MORNING_REPORT_2026-08-03.md` · overnight brief  
**Checked:** 2026-08-03 ~08:55 CT  
**Desk:** Vivian (Editorial Quality & Pre-Publication Control)  
**Deploy / commit:** **NO** — working tree only; Jason Phase 4 still required

---

## VERDICT: PASS WITH NOTES

Safe for Jason's Phase 4 checklist under **Approve to publish / deploy Field Notes SEO**. Residual notes are yellow (Jason decides); no red-flag blockers after easy sync fixes applied in-session.

**Ready for checklist:** yes  
**Visual pass:** N/A (copy/meta/structure; no new carousel/image assets)  
**Auto-deploy:** DENY until Jason explicitly approves

---

## Checklist (protocol order)

### 1. Fact-check layer
- [x] Fiction vs record boundary intact (`FieldNoteLayout` footer disclaimer unchanged; Record / Pattern / Fiction sections preserved)
- [x] Strahov **Andrew Chen** canon intact (prior Vance→Chen fix present; no regression)
- [x] No invented citations introduced in this shift (meta/CTA/link work only; body essays not rewritten)
- [x] Volume bridges filled for previously empty notes; volume slugs match live Masters X routes

### 2. Brand voice consistency
- [x] Soft CTA tone: documentary, research-first (“Opening chapters of Volume I are free.” / “same research thread, fictional form”)
- [x] No urgency spam, emoji blasts, NetGalley, or review-ask language
- [x] Author / imprint: Jason Carroll Holloway · Seventh City Press correct on hub + layout
- [x] Field Notes framing label preserved

### 3. Caption / manifest / slide alignment
- [x] N/A — not a social/carousel asset

### 4. Visual / layout QC
- [x] N/A for new creative — OG dimension metadata corrected to **1024×1024** matching actual `public/og/field-notes/*.png` files (was incorrectly declared 1200×630)

### 5. ISBN / ASIN / link accuracy
- [x] **Zero** Amazon / ASIN / omnibus-on-Amazon links on Field Notes surfaces
- [x] Volume CTAs → site routes only (`/books/masters-x/...`); trilogy overview → `/books/masters-x`
- [x] Newsletter → Web3Forms → `https://jasoncholloway.com/chapters-sent/` (correct; thank-you noindex pattern unchanged)
- [x] Related-note hrefs resolve to existing 12 slugs
- [x] Sitemap derives hub + **exactly 12** essays from `fieldNotes.ts`; RSS same source with trailing-slash links

### 6. Cross-team coordination
- [x] Nina (SEO): meta length / uniqueness / sitemap parity — cleared with notes below
- [x] Diana: soft CTA fits partial guerrilla greenlight (no social/NetGalley expand)
- [x] Eleanor: N/A (no manuscript craft re-litigation)

---

## Findings

### Cleared (green)
| Item | Result |
|------|--------|
| Meta uniqueness | 13 titles unique; 13 descriptions unique |
| Meta length | Titles ~46–55; descriptions ~142–165 (one mild over — see notes) |
| Soft CTA | One newsletter soft ask per note + quiet series bridge; hub newsletter before trilogy CTA |
| Catalog locks | Respected |
| Andrew Chen / Strahov | Correct |
| Sitemap / RSS derivation | Correct; 12 essays + hub |
| Schema | Article `headline` uses `titleTag`; FAQ/Breadcrumb structure unchanged |
| Related links | Thematic (frequency ↔ sites ↔ manuscripts; subterranean cluster) — not keyword-stuffed |

### Easy fixes applied this QC pass
| Fix | File |
|-----|------|
| Sync hub/RSS title → page `titleTag` for **ars-notoria** | `lib/data/fieldNotes.ts` |
| Sync hub/RSS title → page `titleTag` for **oscar-01** | `lib/data/fieldNotes.ts` |

Pre-fix drift: hub/RSS would have shipped shorter titles than SERP `title`/`titleTag` on those two notes.

### Residual notes (yellow — Jason decides; do not block)

1. **“Cognitive Tech” in Ars Notoria SERP title** — slightly SEO-clipped vs body voice (“cognitive technology”). Defensible; optional soften later to “Cognitive Technology” if Jason prefers brand over char budget.
2. **Intentional H1 ≠ titleTag** on `ars-notoria` and `oscar-01` (human H1 vs tighter SERP). Documented pattern in `FieldNoteLayout`; hub/RSS now follow SERP title after sync.
3. **SubTropolis meta description ~165 chars** — trivial overflow past ~160; fine to ship or trim one clause post-deploy.
4. **CTA stack density** — note footers keep “Read the Novel” + “View the Trilogy” *plus* soft newsletter ask. Overnight brief asked for one soft ask (newsletter) — series buttons are bridges, not hard-sell; acceptable. Jason may prefer collapsing outline button later.

---

## Red-flag scan (BLOCK criteria)

| Flag | Status |
|------|--------|
| Wrong ISBN/ASIN/volume | Clear |
| Omnibus on Amazon | Clear |
| Fiction presented as verified | Clear (boundary language intact) |
| Broken / staging URL | Clear |
| Off-brand / wrong author name | Clear |
| Review-ask / NetGalley / spam urgency | Clear |

---

## Ship gate

```
Vivian: PASS WITH NOTES (2026-08-03)
        ↓
Morgan → Jason Phase 4 checklist
        ↓
Jason: approve field notes deploy  (or equivalent)
        ↓
Agent executes deploy/commit only after explicit Jason approval
```

**Other guerrilla lanes:** remain **HELD**.

---

## Vivian → Morgan handoff

### Vivian QC — Field Notes SEO 2026-08-03
- **Verdict:** PASS WITH NOTES
- **Checked:** 2026-08-03 ~08:55 CT
- **Notes:** Cognitive Tech phrasing optional; SubTropolis desc +5 chars; H1/titleTag split on ars + oscar intentional; CTA stack density optional trim
- **Visual pass:** N/A (meta/CTA/structure)
- **Fixes applied in QC:** fieldNotes.ts title sync ars-notoria + oscar-01
- **Ready for checklist:** yes
- **Deploy:** DENY until Jason

---

*VIVIAN — Editorial Quality & Pre-Publication Control, Seventh City Press LLC*  
*"Nothing goes out the door with the wrong ISBN on it."*
