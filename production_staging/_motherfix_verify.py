import re, os, docx

TXT = [
 ("B1 corpus",      r"cartographer\corpus\MASTERS_X_BOOK1_DEMY_9798256008048.txt"),
 ("B1 staging",     r"production_staging\_sources\MASTERS_X_BOOK1_DEMY_9798256008048.txt"),
 ("B1 raw",         r"cartographer\corpus_raw\BOOK1_from_docx.txt"),
 ("B2 corpus",      r"cartographer\corpus\MASTERS_X_BOOK2_DEMY_9798256009953.txt"),
 ("B2 staging",     r"production_staging\_sources\MASTERS_X_BOOK2_DEMY_9798256009953.txt"),
 ("B2 raw",         r"cartographer\corpus_raw\BOOK2_from_docx.txt"),
 ("B3 corpus",      r"cartographer\corpus\MASTERS_X_BOOK3_DEMY_9798256010072.txt"),
 ("B3 staging",     r"production_staging\_sources\MASTERS_X_BOOK3_DEMY_9798256010072.txt"),
 ("B3 raw",         r"cartographer\corpus_raw\BOOK3_from_docx.txt"),
 ("OMNI staging",   r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt"),
 ("OMNI raw",       r"cartographer\corpus_raw\omnibus_v8_fulltext.txt"),
]
DOCX = [
 ("B1 build",       r"production_staging\_sources\build_docx\MASTERS_X_BOOK1_BUILD.docx"),
 ("B1 ital stg",    r"production_staging\_sources\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx"),
 ("B1 ital raw",    r"cartographer\corpus_raw\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx"),
 ("B1 ops",         r"scratch\ops\_book1_sources\MASTERS_X_BOOK1_BUILD.docx"),
 ("B2 build",       r"production_staging\_sources\build_docx\MASTERS_X_BOOK2_BUILD.docx"),
 ("B2 ital stg",    r"production_staging\_sources\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx"),
 ("B2 ital raw",    r"cartographer\corpus_raw\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx"),
 ("B3 build (untouched)", r"production_staging\_sources\build_docx\MASTERS_X_BOOK3_BUILD.docx"),
 ("B3 ital stg (untouched)", r"production_staging\_sources\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx"),
 ("B3 ital raw (untouched)", r"cartographer\corpus_raw\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx"),
]

PATS = ["Margaret", "Lorraine", "Deborah", "Holt", "Margaret Ferrand", "Lorraine's", "Lorraine Masters", "Deborah Holt"]
HDR = "%-24s %8s %8s %8s %6s %9s %10s %8s %8s"
ROW = "%-24s %8d %8d %8d %6d %9d %10d %8d %8d"
print(HDR % ("FILE", "Margaret", "Lorraine", "Deborah", "Holt", "M.Ferrand", "Lorraine's", "L.Masters", "D.Holt"))
for label, p in TXT:
    t = open(p, encoding="utf-8").read()
    print(ROW % tuple([label] + [len(re.findall(re.escape(x), t)) for x in PATS]))
print()
for label, p in DOCX:
    d = docx.Document(p)
    t = "\n".join(x.text for x in d.paragraphs)
    print(ROW % tuple([label] + [len(re.findall(re.escape(x), t)) for x in PATS]) + "   paras=%d" % len(d.paragraphs))

print("\n---- contamination scan (should be empty) ----")
bad = ["Lorraine Chen", "Margaret Lorraine", "Lorraine Ferrand", "Lorraine Holt", "Margaret Deborah",
       "Deborah Masters", "Lorraine Lorraine", "Deborah Deborah", "Margaret Masters", "Margaret Holt",
       "LorraineLorraine", "Lorraine Margaret", "Deborah Ferrand"]
found = False
for label, p in TXT:
    t = open(p, encoding="utf-8").read()
    for b in bad:
        if b in t:
            print("  HIT", label, b); found = True
for label, p in DOCX:
    t = "\n".join(x.text for x in docx.Document(p).paragraphs)
    for b in bad:
        if b in t:
            print("  HIT", label, b); found = True
print("  (none)" if not found else "  *** CONTAMINATION ***")

print("\n---- Lorraine's possessives, Book 1 corpus ----")
t = open(r"cartographer\corpus\MASTERS_X_BOOK1_DEMY_9798256008048.txt", encoding="utf-8").read()
for i, l in enumerate(t.split("\n")):
    if "Lorraine's" in l:
        print("  %5d | %s" % (i + 1, l.strip()[:100]))
