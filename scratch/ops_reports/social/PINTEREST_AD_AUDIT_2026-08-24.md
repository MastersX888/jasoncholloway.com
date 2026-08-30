# Pinterest Paid Campaign Audit + Rebuild

**Date:** 2026-08-24
**Routed by:** Morgan
**Requested by:** Jason ("pintrest ad ... hasn't done anything ... doesn't have any preset keywords ... audited to max sure i'm getting the most bang for my buck")
**Tier:** 3 (ad spend) — **awaiting Jason to click Publish; agent will not auto-publish**
**Status:** New campaign built as a **draft**, fully configured, ready for review

---

## What was wrong with the live campaign

**"2026 Q3 | Masters X Omnibus — $20 / 5d traffic test"** (Campaign ID `626759653931`)

| Issue | Detail |
|---|---|
| Campaign type | **Automated Campaign** (Pinterest Performance+) — no manual keyword control, Pinterest's AI picks targeting |
| Keywords | **None** — confirmed no preset/manual keywords existed |
| Budget | $20 total over 5 days (~$4/day) — thin for a new, unindexed Pin with no engagement history |
| Result | Effectively no delivery — new automated campaigns need budget + signal to exit the learning phase; $4/day rarely clears the auction |

**Action:** Old campaign **paused** (confirmed via Campaign manager — status: Paused, $0.00 spend). No double-spend risk.

---

## Rebuild: new manual campaign (draft, not yet published)

**Campaign name:** `2026 Q3 | Masters X Omnibus - $7/day manual keywords v2`
**Campaign ID:** `626759664171` (saved as draft in Ads Manager)
**Objective:** Consideration · Pinterest Performance+ **off** (manual control)
**Budget:** $7.00/day
**Schedule:** 08/25/2026 – 08/28/2026 (3-day test window)

### Targeting
| Field | Value |
|---|---|
| Ages | 18 – 65+ (specific range, not "all ages") |
| Location | U.S. |
| Gender | All genders |
| Interests/Keywords expansion (Performance+) | **Off** — manual keywords only, no auto-expansion |

### Keywords (25, manual — meets Pinterest's minimum for keyword targeting)
```
book club, mystery thriller books, conspiracy thriller novels, literary fiction books,
book lovers, hardcover collector books, book gift ideas, dark academia books,
book recommendations, author signed books, thriller books to read, suspense novels,
book series recommendations, dark academia aesthetic, mystery box set books,
hardcover book collection, bookstagram, reading recommendations, best thriller books,
gothic thriller books, psychological thriller books, book club picks, indie author books,
signed first edition books, trilogy book set
```

### Ad / creative
- **Pin:** "Masters X: The Complete Trilogy — Hardcover Omnibus | A Conspiracy Thriller in One Volume" (same asset QC'd in `OMNIBUS_FB_PINTEREST_QC_2026-08-23.md`)
- **Destination:** `https://jasoncholloway.com/books/masters-x/?utm_source=pinterest&utm_medium=social&utm_campaign=omnibus-launch` — verified live, correct omnibus-first hub, UTM intact
- **Call to action:** Visit site

---

## Fixes made during build (things that didn't save on first pass)

1. Campaign name field had reverted to the auto-generated default — re-entered.
2. Daily budget field was empty — re-entered $7.00.
3. Ad group's own "Enable Pinterest Performance+ targeting" toggle (separate from the campaign-level Performance+ switch) was re-checked by the UI — unchecked it so targeting stays keyword-only.
4. No Pin/ad had been attached yet — selected and added the omnibus hardcover Pin.

All four confirmed fixed and verified via a final pass before stopping.

---

## Still open — Jason

- [ ] **Review draft campaign** in Pinterest Ads Manager and click **Publish** (or ask Morgan to publish on your go-ahead — ad spend is Tier 3, agent will not auto-publish)
- [ ] Optional: extend the 3-day schedule if the first test window looks promising

---

*Morgan · SVP Oversight Committee · 2026-08-24*
