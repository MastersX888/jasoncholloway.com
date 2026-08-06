# Case-Cover Visibility — Masters X Hardcovers

**Date:** 2026-07-31  
**Branch:** `cursor/ops-dashboard-3e24`  
**Status:** Implemented — pending deploy

---

## Problem

Hardcover editions ship with dust jackets over concealed case-laminate board art. Website showed only jacket faces (`coverImageHC`). Reviewers and collectors cannot see the board art that retailers never display.

---

## Solution

New client component `components/ui/HardcoverCaseReveal.tsx`:

- Default view: dust jacket (`coverImageHC`)
- Toggle button: **Reveal case laminate** / **Show dust jacket**
- `aria-pressed` + descriptive alt text per state
- 44px min-height tap target (`.hc-case-reveal-toggle`)
- Fallback hint when no case asset exists

---

## Data

`lib/data/books.ts` — new optional field `coverImageCase`:

| Volume | Case asset |
|---|---|
| Vol I | `/covers/book1-hc-case.png` |
| Vol II | `/covers/book2-hc-case.png` |
| Vol III | `/covers/book3-hc-case.png` |
| Omnibus | `/covers/omnibus-hc-case.png` |

Source: `Desktop/MASTER_UPLOAD_FOLDER/_cover_preview/*_case.jpg` → promoted to `public/covers/`.

---

## Pages wired

- `/books/masters-x/` — HC column in edition grid
- `/books/masters-x/[slug]/` — volume hero HC slot
- `/books/masters-x/omnibus/` — single HC display

Paperback columns unchanged.

---

## CSS

`app/responsive.css` — toggle button styles, focus ring, hint text.

---

## Post-deploy verify

1. Open Vol I page → tap **Reveal case laminate** → confirm image swap
2. Repeat on omnibus
3. Keyboard: Tab to toggle, Enter/Space activates, focus ring visible

---

## Vivian note

Visual QC on live deploy recommended — confirm case JPG quality at web resolution and that toggle label is clear for non-industry readers ("case laminate" is correct print terminology).
