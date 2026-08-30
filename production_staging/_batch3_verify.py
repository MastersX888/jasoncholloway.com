import re, os, docx

TXT = [
 ("B1 corpus",    r"cartographer\corpus\MASTERS_X_BOOK1_DEMY_9798256008048.txt"),
 ("B1 staging",   r"production_staging\_sources\MASTERS_X_BOOK1_DEMY_9798256008048.txt"),
 ("B1 raw",       r"cartographer\corpus_raw\BOOK1_from_docx.txt"),
 ("B2 corpus",    r"cartographer\corpus\MASTERS_X_BOOK2_DEMY_9798256009953.txt"),
 ("B2 staging",   r"production_staging\_sources\MASTERS_X_BOOK2_DEMY_9798256009953.txt"),
 ("B2 raw",       r"cartographer\corpus_raw\BOOK2_from_docx.txt"),
 ("B3 corpus",    r"cartographer\corpus\MASTERS_X_BOOK3_DEMY_9798256010072.txt"),
 ("B3 staging",   r"production_staging\_sources\MASTERS_X_BOOK3_DEMY_9798256010072.txt"),
 ("B3 raw",       r"cartographer\corpus_raw\BOOK3_from_docx.txt"),
 ("OMNI staging", r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt"),
 ("OMNI raw",     r"cartographer\corpus_raw\omnibus_v8_fulltext.txt"),
]
DOCX = [
 ("B3 build",    r"production_staging\_sources\build_docx\MASTERS_X_BOOK3_BUILD.docx"),
 ("B3 ital stg", r"production_staging\_sources\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx"),
 ("B3 ital raw", r"cartographer\corpus_raw\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx"),
 ("B2 build",    r"production_staging\_sources\build_docx\MASTERS_X_BOOK2_BUILD.docx"),
 ("B1 build",    r"production_staging\_sources\build_docx\MASTERS_X_BOOK1_BUILD.docx"),
]
P = ["Marcus Jr.", "Idris Broussard", "Kofi Mensah", "Kofi Asante", "Marcus",
     "Marcus Whitaker", "Kofi", "Margaret", "Lorraine", "Deborah"]
H = "%-14s" + " %8s" * len(P)
R = "%-14s" + " %8d" * len(P)
print("VERIFICATION 1-6")
print(H % tuple(["FILE"] + P))
for lab, p in TXT:
    t = open(p, encoding="utf-8").read()
    print(R % tuple([lab] + [len(re.findall(re.escape(x), t)) for x in P]))
print()
for lab, p in DOCX:
    d = docx.Document(p)
    t = "\n".join(x.text for x in d.paragraphs)
    print(R % tuple([lab] + [len(re.findall(re.escape(x), t)) for x in P]) + "  paras=%d" % len(d.paragraphs))

print("\nVERIFICATION 7 — contamination scan (should be empty)")
bad = ["Idris Jr.", "Marcus Broussard", "Kofi Kofi", "Idris Idris", "Broussard Broussard",
       "Idris Marcus", "Marcus Idris", "Asante Mensah", "Mensah Asante", "Kofi Mensah",
       "Marcus Jr", "Idris Broussard Jr", "Asante Asante", "Broussard Jr.", "Kofi Idris"]
found = False
for lab, p in TXT:
    t = open(p, encoding="utf-8").read()
    for b in bad:
        if b in t:
            print("  HIT", lab, repr(b)); found = True
for lab, p in DOCX:
    t = "\n".join(x.text for x in docx.Document(p).paragraphs)
    for b in bad:
        if b in t:
            print("  HIT", lab, repr(b)); found = True
print("  (none)" if not found else "  *** CONTAMINATION ***")

print("\nWRAP CHECK — every line touched in Batch 3, all TXT copies")
for lab, p in TXT:
    before = p + ".PRE_BATCH3_2026-08-29.bak"
    if not os.path.exists(before):
        continue
    bl = open(before, encoding="utf-8").read().split("\n")
    al = open(p, encoding="utf-8").read().split("\n")
    assert len(bl) == len(al), (p, "line count changed")
    for i in range(len(bl)):
        if bl[i] != al[i]:
            print("  %-14s line %5d  %2d -> %2d cols" % (lab, i + 1, len(bl[i]), len(al[i])))

print("\nBUILD-GATE SATISFACTION (source-side, whitespace-normalised as the audit does)")
def norm(s):
    return re.sub(r"\s+", " ", s)
BANNED3 = ["Marcus Jr.", "Kofi Mensah"]
REQ3 = ["Idris Broussard", "Kofi Asante", "Marcus Whitaker", "Margaret Ferrand"]
for lab, p in [t for t in TXT if t[0].startswith(("B3", "OMNI"))]:
    t = norm(open(p, encoding="utf-8").read())
    ban = [s for s in BANNED3 if norm(s) in t]
    miss = [s for s in REQ3 if norm(s) not in t]
    print("  %-14s banned_present=%s required_missing=%s  %s" %
          (lab, ban or "none", miss or "none", "PASS" if not ban and not miss else "FAIL"))
for lab, p in [d for d in DOCX if d[0].startswith("B3")]:
    t = norm("\n".join(x.text for x in docx.Document(p).paragraphs))
    ban = [s for s in BANNED3 if norm(s) in t]
    miss = [s for s in REQ3 if norm(s) not in t]
    print("  %-14s banned_present=%s required_missing=%s  %s" %
          (lab, ban or "none", miss or "none", "PASS" if not ban and not miss else "FAIL"))
