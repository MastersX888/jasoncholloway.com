# Google Books Batch Upload Guide
## For Jason Carroll Holloway / Seventh City Press

**Status**: Ready to upload  
**Total titles**: 14 (3 unique works across formats)  
**Preparation date**: July 3, 2026

---

## Quick Start

1. Sign in to **Google Play Books Partner Center**: https://play.google.com/books/publish/
2. Click **Book Catalog** → **Advanced options** → **Upload book list**
3. Upload the CSV file: `google_books_batch_upload.csv`
4. Google will validate and import within 24–48 hours
5. Once imported, upload content files (PDFs/EPUBs) using the file naming conventions below

---

## Your Books (14 ISBNs)

### Academic Monograph
**Innocence, Desire, and the Architecture of the Fall** (John Hawkes criticism)
- Paperback: `9798295778247`
- EPUB: `9798295778926`
- Hardcover: `9798349308444`
- **Preview setting**: FULL (maximizes academic/scholarly discoverability in citations)

### Fiction Trilogy (Masters X)
**Book 1: The Inheritance of Frequency**
- Paperback: `9798256008048`
- Hardcover: `9798295800801`
- EPUB: `9798256008819`

**Book 2: The Grimoire**
- Paperback: `9798256009953`
- Hardcover: `9798295812675`
- EPUB: `9798256009625`

**Book 3: The Kingdom**
- Paperback: `9798256010072`
- Hardcover: `9798295812705`
- EPUB: `9798256009809`

**Book 4: The Complete Trilogy (Omnibus)**
- Paperback: `9798256072704`
- Hardcover: `9798295884412`

- **Preview setting**: LIMITED (protects sale of full ebook/Amazon exclusivity)

---

## File Naming for Content Upload

Google Books requires specific naming for bulk file uploads. Use these conventions:

### For EPUBs
```
9798295778926.epub                  (EPUB with cover included)
9798295778926.jpg                   (Cover for marketing thumbnail, optional)
```

### For PDFs (if converting paperback to ebook)
```
9798256008048_interior.pdf          (PDF without covers)
9798256008048_frontcover.jpg        (Front cover separately)
9798256008048_backcover.jpg         (Back cover, optional)
```

### Example: Your Files
```
✓ 9798295778926.epub                (Monograph EPUB) — upload as-is
✓ 9798256008819.epub                (Inheritance EPUB)
✓ 9798256009625.epub                (Grimoire EPUB)
✓ 9798256009809.epub                (Kingdom EPUB)

(No Kindle files — Kindle files use ASIN, not ISBN, so they upload separately via KDP)
```

---

## Step-by-Step Upload Process

### Phase 1: Upload Metadata (CSV)
1. In Partner Center, click **Advanced options** → **Upload book list**
2. Select the file: `google_books_batch_upload.csv`
3. Wait for validation email (usually same day)
4. Check upload history to confirm all 14 ISBNs were accepted

### Phase 2: Upload Content Files (PDFs/EPUBs)
1. Gather your EPUB files (4 files for the trilogy)
2. Rename them using the conventions above:
   - `9798256008819.epub` (Inheritance)
   - `9798256009625.epub` (Grimoire)
   - `9798256009809.epub` (Kingdom)
   - `9798295778926.epub` (Monograph)
3. In Partner Center, click **Advanced options** → **Upload content files**
4. Select file format: **Ebook (EPUB/PDF)**
5. Choose your files and upload
6. Google processes within 24 hours; files appear on **Content** tab per ISBN

### Phase 3: Verify in Google Books
After 7–14 days, your books will be indexed and searchable:
- Search for your title on **books.google.com**
- Verify cover image, preview pages, and metadata appear correctly
- Check that author name, publication date, and description are accurate

---

## Important Notes

### Preview Settings
- **FULL preview**: Shows up to 20% of the book (good for academic works, builds authority)
- **LIMITED preview**: Shows 5–10% (protects commercial revenue for fiction)
- You can adjust these post-upload in your Book Catalog settings

### Metadata Consistency
Your metadata pipeline should catch any inconsistencies. Verify:
- ISBN matches across Google Books, IngramSpark, and Amazon
- Author name is consistent: "Jason Carroll Holloway" (not "Holloway, Jason Carroll")
- Publication date matches the version in this upload (2026 for all)
- Title matches exactly (no extra punctuation)

### Sync with Amazon/IngramSpark
- Google Books can take 2–4 weeks to index fully
- Your books already appear on Amazon (via KDP) and IngramSpark
- Google Books is the third major discovery channel; it indexes independently so there's no "one source of truth"
- Use your metadata pipeline to monitor discrepancies across all three

### Monograph (Hawkes) — Academic Strategy
The full-preview setting on the monograph will help:
- Google Scholar picks up full-text academic works
- University library systems index Google Books
- Scholars citing your work will find it more easily
- Consider DOI registration with CrossRef if you want formal academic citation tracking

### Fiction Series (Masters X)
Limited preview on the trilogy:
- Protects the ebook revenue on Amazon
- Still allows readers to see sample pages (builds confidence)
- Series context helps with discovery ("Masters X trilogy" searches)
- Consider uploading high-res covers for the marketing thumbnail

---

## What Happens After Upload

**Day 1–2**: Google validates CSV and processes file structure  
**Day 3–7**: Content files are indexed; covers are scanned  
**Week 2–4**: Full indexing in Google Books; appears in search results  
**Ongoing**: Your books appear in library catalogs, Google Scholar, and WorldCat

---

## Monitoring & Maintenance

After upload, use your metadata pipeline to:
1. Search Google Books monthly for your ISBNs
2. Compare title/author/date against this upload
3. Note any discrepancies in your review queue
4. Alert if metadata diverges between Google Books, IngramSpark, and Amazon

---

## Support & Troubleshooting

**CSV not accepted?**  
- Check that ISBN column has no spaces or special characters (e.g., remove `=` prefix)
- Verify title and author fields have no tabs or line breaks
- Ensure UTF-8 encoding (or use Google's template export directly)

**Files not processing?**  
- Check filenames follow the convention exactly: `[ISBN].epub`
- EPUB files must be valid (can be tested with `epubcheck` online)
- File size under 2 GB

**Metadata looks wrong after upload?**  
- Wait 7 days for full indexing
- Use your metadata audit tool to compare across sources
- If incorrect, update in Partner Center and re-upload (Google will re-index)

---

**Next action**: Download `google_books_batch_upload.csv` and upload to Partner Center.  
**Timeline**: 2–4 weeks for full indexing.  
**Questions?** Refer to Google Books Partner Center help: https://support.google.com/books/partner/
