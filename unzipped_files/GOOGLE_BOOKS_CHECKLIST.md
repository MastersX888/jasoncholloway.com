# Google Books Upload Checklist
## Content & Cover Files You'll Need

---

## Your 14 ISBNs Mapped to Files

### Monograph: Innocence, Desire, and the Architecture of the Fall
**Preview**: FULL (academic — maximize discoverability)

| ISBN | Format | Files You Have | File to Upload | Status |
|------|--------|---|---|---|
| 9798295778247 | Paperback | PDF (interior + covers) | `9798295778247_interior.pdf` | ✓ Ready |
| | | | `9798295778247_frontcover.jpg` | ✓ Ready |
| 9798295778926 | EPUB | EPUB + cover image | `9798295778926.epub` | ✓ Ready |
| | | | `9798295778926.jpg` | ✓ (Optional) |
| 9798349308444 | Hardcover | PDF (interior + covers) | `9798349308444_interior.pdf` | ✓ Ready |
| | | | `9798349308444_frontcover.jpg` | ✓ Ready |

### Masters X Trilogy
**Preview**: LIMITED (fiction — protect revenue)

#### Book 1: The Inheritance of Frequency
| ISBN | Format | Files You Have | File to Upload | Status |
|------|--------|---|---|---|
| 9798256008048 | Paperback | PDF (interior + covers) | `9798256008048_interior.pdf` | ✓ Ready |
| | | | `9798256008048_frontcover.jpg` | ✓ Ready |
| 9798295800801 | Hardcover | PDF (interior + covers) | `9798295800801_interior.pdf` | ✓ Ready |
| | | | `9798295800801_frontcover.jpg` | ✓ Ready |
| 9798256008819 | EPUB | EPUB + cover image | `9798256008819.epub` | ✓ Ready |
| | | | `9798256008819.jpg` | ✓ (Optional) |

#### Book 2: The Grimoire
| ISBN | Format | Files You Have | File to Upload | Status |
|------|--------|---|---|---|
| 9798256009953 | Paperback | PDF (interior + covers) | `9798256009953_interior.pdf` | ✓ Ready |
| | | | `9798256009953_frontcover.jpg` | ✓ Ready |
| 9798295812675 | Hardcover | PDF (interior + covers) | `9798295812675_interior.pdf` | ✓ Ready |
| | | | `9798295812675_frontcover.jpg` | ✓ Ready |
| 9798256009625 | EPUB | EPUB + cover image | `9798256009625.epub` | ✓ Ready |
| | | | `9798256009625.jpg` | ✓ (Optional) |

#### Book 3: The Kingdom
| ISBN | Format | Files You Have | File to Upload | Status |
|------|--------|---|---|---|
| 9798256010072 | Paperback | PDF (interior + covers) | `9798256010072_interior.pdf` | ✓ Ready |
| | | | `9798256010072_frontcover.jpg` | ✓ Ready |
| 9798295812705 | Hardcover | PDF (interior + covers) | `9798295812705_interior.pdf` | ✓ Ready |
| | | | `9798295812705_frontcover.jpg` | ✓ Ready |
| 9798256009809 | EPUB | EPUB + cover image | `9798256009809.epub` | ✓ Ready |
| | | | `9798256009809.jpg` | ✓ (Optional) |

#### Book 4: The Complete Trilogy (Omnibus)
| ISBN | Format | Files You Have | File to Upload | Status |
|------|--------|---|---|---|
| 9798256072704 | Paperback | PDF (interior + covers) | `9798256072704_interior.pdf` | ✓ Ready |
| | | | `9798256072704_frontcover.jpg` | ✓ Ready |
| 9798295884412 | Hardcover | PDF (interior + covers) | `9798295884412_interior.pdf` | ✓ Ready |
| | | | `9798295884412_frontcover.jpg` | ✓ Ready |

---

## File Gathering Checklist

### Phase 1: Locate Your Source Files
- [ ] All EPUB files from IngramSpark / Seventh City Press production
  - [ ] `9798295778926.epub` (Monograph)
  - [ ] `9798256008819.epub` (Inheritance)
  - [ ] `9798256009625.epub` (Grimoire)
  - [ ] `9798256009809.epub` (Kingdom)

- [ ] All PDF files (interior + covers)
  - Location: Check your IngramSpark print-on-demand files or production archives
  - Format: Should be `[ISBN]_interior.pdf` + separate cover JPGs

### Phase 2: Organize Files by ISBN
Create a folder structure:
```
google_books_upload/
├── 9798295778247_interior.pdf
├── 9798295778247_frontcover.jpg
├── 9798295778926.epub
├── 9798295778926.jpg
├── [etc. for all 14 ISBNs]
```

### Phase 3: QA Check Each File
- [ ] EPUB files are valid (can open in Apple Books, Calibre, or online EPUB checker)
- [ ] Cover JPGs are correct orientation (portrait, not landscape)
- [ ] Cover JPGs are at least 1200×1800 pixels (recommended for quality thumbnails)
- [ ] PDF interiors are searchable text (not image-based scans)
- [ ] Filenames match ISBN exactly (no extra dashes, no mixed format extensions)

---

## Upload Order (Recommended)

**Week 1:**
1. Upload metadata CSV (`google_books_batch_upload.csv`)
2. Wait for validation (24–48 hours)
3. Verify all 14 ISBNs are accepted in your Book Catalog

**Week 2:**
4. Organize your EPUB files + covers
5. Upload EPUB batch to Google Books
6. Monitor upload history for processing status

**Week 3 (optional):**
7. Convert PDF interiors to Google Books format (optional; many authors skip this)
8. Upload PDF files if you want print-on-demand preview in Google Books

**Week 4+:**
9. Search Google Books for your titles
10. Verify cover images, preview pages, and metadata appear
11. Add books to your jasoncholloway.com author platform (link to Google Books entry)

---

## File Format Details

### EPUBs
- Must be valid EPUB3 format
- Can include embedded fonts (your monograph likely has specialist typography)
- Cover image embedded in EPUB (optional separate JPG for thumbnail)
- Size limit: 2 GB (you're well under this)
- Test: Download and open in Calibre or Apple Books before uploading

### PDFs (Interior)
- Should NOT include front/back covers (upload separately)
- **Filename**: `[ISBN]_interior.pdf`
- Should be searchable text (OCR if scanned)
- Cover PDFs uploaded separately:
  - **Front**: `[ISBN]_frontcover.jpg`
  - **Back**: `[ISBN]_backcover.jpg` (optional)
- Google will combine interior + covers for display

### JPG Covers
- **Minimum**: 1200×1800 pixels (portrait orientation)
- **Recommended**: 3000×4500 pixels (for high-quality thumbnails in Google Books)
- **File size**: Keep under 5 MB
- **Color profile**: RGB (not CMYK)
- **Format**: JPG or PNG acceptable

---

## Expected Timeline

| When | What Happens |
|------|---|
| Day 1 | Upload CSV metadata |
| Day 2 | Google validates ISBN/title/author |
| Day 3–7 | EPUB/PDF files uploaded & processed |
| Week 2 | Covers indexed; preview pages extracted |
| Week 3–4 | Full indexing in Google Books search |
| Month 2+ | Appears in library catalogs, Google Scholar (monograph), WorldCat |

---

## Post-Upload Actions

### Link from Your Author Platform
Once indexed (2–4 weeks), add links on jasoncholloway.com:
```
**Read on Google Books**: https://books.google.com/books?isbn=[ISBN]
```

### Monitor Metadata
Use your metadata pipeline to search Google Books monthly:
```bash
python run_sweep.py --sources google_books --isbn 9798295884412 9798256072704
```

### Social Media / Press
- Tweet: "The Masters X Trilogy and my John Hawkes monograph are now on Google Books. Read previews and discover them in academic libraries worldwide."
- Link to your jasoncholloway.com press kit

---

## Questions?

- **Google Books Partner Help**: https://support.google.com/books/partner/
- **EPUB validation**: https://www.w3.org/publishing/epubcheck/
- **ISBN lookup**: https://www.isbnsearch.org/

Good luck! This gets your books into the permanent library infrastructure. 📚
