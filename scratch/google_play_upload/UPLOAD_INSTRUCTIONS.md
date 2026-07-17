# Google Play Books — batch upload package

**Prepared:** 15-JUL-2026  
**Publisher:** Seventh City Press

## Package location

```
scratch/google_play_upload/
├── content/                          ← batch content upload (8 files)
│   ├── 9798256008819.epub            Masters X Vol I
│   ├── 9798256008819.jpg
│   ├── 9798256009625.epub            Masters X Vol II
│   ├── 9798256009625.jpg
│   ├── 9798256009809.epub            Masters X Vol III
│   ├── 9798256009809.jpg
│   ├── 9798295778926.epub            Hawkes monograph
│   └── 9798295778926.jpg
├── GoogleBooksTemplate_filled_v5_utf16.csv   ← upload this for metadata/prices
├── GoogleBooksTemplate_filled_v5.tsv           ← editable source (UTF-8)
└── UPLOAD_INSTRUCTIONS.md
```

Mirror copy also synced to: `C:\Users\zh577\Desktop\google_books_upload\`

## Before you upload

1. **Payment center → + Add a Territory** (e.g. United States) — currently none set
2. Wait for **Pending account review** to clear (or upload anyway; content attaches but won’t sell until approved)

## Step 1 — Metadata & prices (spreadsheet)

1. [play.google.com/books/publish](https://play.google.com/books/publish) → **Book catalog**
2. **Advanced options → Upload book list**
3. Choose **`GoogleBooksTemplate_filled_v5_utf16.csv`**
4. Check **Advanced options → View uploaded lists** for errors

### v5 fixes vs v4

| ISBN | Change |
|------|--------|
| 9798256009809 | Price **5.99 → 6.99** (matches Kindle / `books.ts`) |
| 9798295778926 | Description **sixteen → seventeen** novels (site canon) |
| Default row | Trimmed trailing space on publisher name |

## Step 2 — Content files (batch)

1. **Book catalog → Advanced options → Upload content files (PDF, JPG…)**
2. Format: **Ebook**
3. Select **all 8 files** in `content/` (4 EPUB + 4 JPG)
4. Filenames must stay **ISBN.epub** / **ISBN.jpg** — already correct

## Catalog summary

| Ebook ISBN | Title | Play price |
|------------|-------|------------|
| 9798256008819 | Masters X: The Inheritance of Frequency | $6.99 |
| 9798256009625 | Masters X: The Grimoire | $6.99 |
| 9798256009809 | Masters X: The Kingdom | $6.99 |
| 9798295778926 | Innocence, Desire, and the Architecture of the Fall | $9.99 |

## Notes

- EPUBs sourced from `Desktop\google_books_upload` (Jul 2026 builds)
- Cover JPGs are marketing thumbnails (optional but recommended)
- PDF `_interior.pdf` files in Desktop folder are **not** needed for EPUB upload — skip them
- Hawkes EPUB back-matter may still say “sixteen novels” inside the file — fix separately in IngramSpark/source EPUB when ready
