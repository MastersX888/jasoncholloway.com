# Bookshop.org affiliate list upload

**Affiliate ID:** `126177`

## CSV file

**Upload:** `bookshop_masters_x_list.csv` or `bookshop_masters_x_list.txt`

Bookshop expects **ISBNs only — no header row**. One EAN-13 per line (max 50). Do not include a `SKU` column title.

| Row | ISBN-13 | Title · format |
|-----|---------|----------------|
| 1 | 9798256008048 | Masters X: The Inheritance of Frequency · Paperback |
| 2 | 9798256009953 | Masters X: The Grimoire · Paperback |
| 3 | 9798256010072 | Masters X: The Kingdom · Paperback |
| 4 | 9798295800801 | Masters X: The Inheritance of Frequency · Hardcover |
| 5 | 9798295812675 | Masters X: The Grimoire · Hardcover |
| 6 | 9798295812705 | Masters X: The Kingdom · Hardcover |
| 7 | 9798256072704 | Masters X Omnibus · Paperback |
| 8 | 9798295884412 | Masters X Omnibus · Hardcover |
| 9 | 9798295778247 | Innocence, Desire, and the Architecture of the Fall · Paperback |
| 10 | 9798349308444 | Innocence, Desire, and the Architecture of the Fall · Hardcover |

## Banner image (1024 × 800)

**Recommended upload:** `scratch/bookshop_list_banner.png`  
Rebuilt from `public/og-image.png` at **1024×800** with content shifted up and **264px bottom safe zone** so Bookshop’s crop doesn’t clip the tagline.

**If the tagline still clips:** use `scratch/bookshop_list_banner_safe.png` — same art, ends at “The Masters X Trilogy” (no footer line).

Bookshop often crops list banners to a wide strip; avoid placing critical text in the bottom 15–20% of the file.

**Masters X Trilogy & Seventh City Press**

## After upload

Direct affiliate links use your ID, e.g.:

`https://bookshop.org/p/books/...?affiliate=126177`

Update `lib/data/books.ts` once Bookshop product URLs are live on each title.
