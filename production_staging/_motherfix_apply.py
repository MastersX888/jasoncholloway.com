import os, re, shutil, docx

SUF = ".PRE_MOTHERFIX_2026-08-29.bak"

BOOK1_TXT = [
    r"cartographer\corpus\MASTERS_X_BOOK1_DEMY_9798256008048.txt",
    r"production_staging\_sources\MASTERS_X_BOOK1_DEMY_9798256008048.txt",
    r"cartographer\corpus_raw\BOOK1_from_docx.txt",
]
BOOK2_TXT = [
    r"cartographer\corpus\MASTERS_X_BOOK2_DEMY_9798256009953.txt",
    r"production_staging\_sources\MASTERS_X_BOOK2_DEMY_9798256009953.txt",
    r"cartographer\corpus_raw\BOOK2_from_docx.txt",
]
OMNI_TXT = [
    r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt",
    r"cartographer\corpus_raw\omnibus_v8_fulltext.txt",
]
BOOK1_DOCX = [
    r"production_staging\_sources\build_docx\MASTERS_X_BOOK1_BUILD.docx",
    r"production_staging\_sources\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx",
    r"cartographer\corpus_raw\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx",
    r"scratch\ops\_book1_sources\MASTERS_X_BOOK1_BUILD.docx",
]
BOOK2_DOCX = [
    r"production_staging\_sources\build_docx\MASTERS_X_BOOK2_BUILD.docx",
    r"production_staging\_sources\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx",
    r"cartographer\corpus_raw\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx",
]


def backup(p):
    b = p + SUF
    if not os.path.exists(b):
        shutil.copy2(p, b)
    return b


def read(p):
    with open(p, encoding="utf-8", newline="") as fh:
        return fh.read()


def write(p, t):
    with open(p, "w", encoding="utf-8", newline="") as fh:
        fh.write(t)


report = []

# --- Book 1 text: every Margaret is the mother -------------------------------
for p in BOOK1_TXT:
    backup(p)
    t = read(p)
    before = t.count("Margaret")
    assert "Ferrand" not in t and "Holt" not in t, p
    t2 = t.replace("Margaret", "Lorraine")
    write(p, t2)
    report.append((p, before, t2.count("Margaret"), t2.count("Lorraine"), t2.count("Deborah")))

# --- Book 2 text: line 3561 mother, line 4894 senator ------------------------
for p in BOOK2_TXT:
    backup(p)
    t = read(p)
    before = t.count("Margaret")
    holt_before = t.count("Holt")
    assert t.count("Margaret Masters") == 1 and t.count("Margaret Holt") == 1, p
    t2 = t.replace("Margaret Masters", "Lorraine Masters").replace("Margaret Holt", "Deborah Holt")
    assert t2.count("Holt") == holt_before, p
    write(p, t2)
    report.append((p, before, t2.count("Margaret"), t2.count("Lorraine"), t2.count("Deborah")))

# --- Omnibus: split at the first line naming Ferrand (start of Book 3) -------
for p in OMNI_TXT:
    backup(p)
    t = read(p)
    before = t.count("Margaret")
    holt_before = t.count("Holt")
    ferr_before = t.count("Margaret Ferrand")
    lines = t.split("\n")
    boundary = next(i for i, l in enumerate(lines) if "Ferrand" in l)
    head = "\n".join(lines[:boundary])
    tail = "\n".join(lines[boundary:])
    assert "Ferrand" not in head
    head = head.replace("Margaret Holt", "Deborah Holt").replace("Margaret", "Lorraine")
    t2 = head + "\n" + tail
    assert t2.count("Holt") == holt_before, p
    assert t2.count("Margaret Ferrand") == ferr_before, p
    write(p, t2)
    report.append((p, before, t2.count("Margaret"), t2.count("Lorraine"), t2.count("Deborah")))


def docx_stats(p):
    d = docx.Document(p)
    txt = "\n".join(x.text for x in d.paragraphs)
    return len(d.paragraphs), txt.count("Margaret"), txt.count("Lorraine"), txt.count("Deborah"), txt.count("Holt")


# --- Book 1 DOCX -------------------------------------------------------------
for p in BOOK1_DOCX:
    paras_b, marg_b, _, _, holt_b = docx_stats(p)
    backup(p)
    d = docx.Document(p)
    changed = 0
    for par in d.paragraphs:
        if "Margaret" not in par.text:
            continue
        for r in par.runs:
            if "Margaret" in r.text:
                changed += r.text.count("Margaret")
                r.text = r.text.replace("Margaret", "Lorraine")
    d.save(p)
    paras_a, marg_a, lor_a, deb_a, holt_a = docx_stats(p)
    assert paras_a == paras_b and marg_a == 0 and lor_a == marg_b and holt_a == holt_b, p
    report.append((p, marg_b, marg_a, lor_a, deb_a))

# --- Book 2 DOCX: per-paragraph, so a split surname run cannot fool us -------
for p in BOOK2_DOCX:
    paras_b, marg_b, _, _, holt_b = docx_stats(p)
    backup(p)
    d = docx.Document(p)
    for par in d.paragraphs:
        if "Margaret" not in par.text:
            continue
        if "Margaret Masters" in par.text:
            new = "Lorraine"
        elif "Margaret Holt" in par.text:
            new = "Deborah"
        else:
            raise SystemExit("unclassified Margaret paragraph in %s: %r" % (p, par.text[:120]))
        for r in par.runs:
            if "Margaret" in r.text:
                r.text = r.text.replace("Margaret", new)
    d.save(p)
    paras_a, marg_a, lor_a, deb_a, holt_a = docx_stats(p)
    assert paras_a == paras_b and marg_a == 0 and lor_a == 1 and deb_a == 1 and holt_a == holt_b, p
    report.append((p, marg_b, marg_a, lor_a, deb_a))

print("%-78s %7s %7s %8s %8s" % ("FILE", "Marg_B", "Marg_A", "Lorraine", "Deborah"))
for row in report:
    print("%-78s %7d %7d %8d %8d" % row)
print("\nAll assertions passed.")
