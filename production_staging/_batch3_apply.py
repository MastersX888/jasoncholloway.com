"""BATCH 3 — Marcus Jr. -> Idris Broussard, Kofi Mensah -> Kofi Asante.

Book 3 and omnibus only. Two-phase: every file is validated before any file is
written, so a mismatch anywhere aborts the whole run with nothing modified.
"""
import os, re, shutil, docx

SUF = ".PRE_BATCH3_2026-08-29.bak"

TXT = [
    r"cartographer\corpus\MASTERS_X_BOOK3_DEMY_9798256010072.txt",
    r"production_staging\_sources\MASTERS_X_BOOK3_DEMY_9798256010072.txt",
    r"cartographer\corpus_raw\BOOK3_from_docx.txt",
    r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt",
    r"cartographer\corpus_raw\omnibus_v8_fulltext.txt",
]
DOCX = [
    r"production_staging\_sources\build_docx\MASTERS_X_BOOK3_BUILD.docx",
    r"production_staging\_sources\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx",
    r"cartographer\corpus_raw\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx",
]
SUBS = [("Marcus Jr.", "Idris Broussard"), ("Kofi Mensah", "Kofi Asante")]


def read(p):
    with open(p, encoding="utf-8", newline="") as fh:
        return fh.read()


def docx_text(d):
    return "\n".join(p.text for p in d.paragraphs)


# ---------------------------------------------------------------- phase 1
print("PHASE 1 — validating all 8 files before writing anything")
state = {}
for p in TXT + DOCX:
    if not os.path.exists(p):
        raise SystemExit("ABORT: missing %s" % p)
    t = docx_text(docx.Document(p)) if p.endswith(".docx") else read(p)
    s = {
        "marcus_jr": t.count("Marcus Jr."),
        "kofi_mensah": t.count("Kofi Mensah"),
        "marcus": t.count("Marcus"),
        "kofi": t.count("Kofi"),
        "kofi_asante": t.count("Kofi Asante"),
        "margaret": t.count("Margaret"),
        "lorraine": t.count("Lorraine"),
        "deborah": t.count("Deborah"),
        "whitaker": t.count("Marcus Whitaker"),
        "idris": t.count("Idris"),
        "broussard": t.count("Broussard"),
    }
    if p.endswith(".docx"):
        s["paras"] = len(docx.Document(p).paragraphs)
    problems = []
    if s["marcus_jr"] != 1:
        problems.append("expected 1 'Marcus Jr.', found %d" % s["marcus_jr"])
    if s["kofi_mensah"] != 1:
        problems.append("expected 1 'Kofi Mensah', found %d" % s["kofi_mensah"])
    if s["idris"] or s["broussard"]:
        problems.append("'Idris'/'Broussard' already present (%d/%d)" % (s["idris"], s["broussard"]))
    if problems:
        raise SystemExit("ABORT before any write — %s: %s" % (p, "; ".join(problems)))
    state[p] = s
    print("  ok  %-70s MarcusJr=1 KofiMensah=1 Marcus=%d" % (os.path.basename(p), s["marcus"]))

# ---------------------------------------------------------------- phase 2
print("\nPHASE 2 — writing")
rows = []
for p in TXT:
    b = state[p]
    shutil.copy2(p, p + SUF)
    t = read(p)
    for old, new in SUBS:
        t = t.replace(old, new)
    with open(p, "w", encoding="utf-8", newline="") as fh:
        fh.write(t)
    a = {k: t.count(v) for k, v in [("marcus_jr", "Marcus Jr."), ("kofi_mensah", "Kofi Mensah"),
                                    ("marcus", "Marcus"), ("kofi", "Kofi"),
                                    ("kofi_asante", "Kofi Asante"), ("margaret", "Margaret"),
                                    ("lorraine", "Lorraine"), ("deborah", "Deborah"),
                                    ("whitaker", "Marcus Whitaker")]}
    a["idris_broussard"] = t.count("Idris Broussard")
    assert a["marcus_jr"] == 0 and a["kofi_mensah"] == 0, p
    assert a["idris_broussard"] == 1, p
    assert a["marcus"] == b["marcus"] - 1, (p, "Marcus must drop by exactly 1", b["marcus"], a["marcus"])
    assert a["whitaker"] == b["whitaker"], (p, "Marcus Whitaker must be untouched")
    assert a["kofi"] == b["kofi"], (p, "Kofi count must be unchanged")
    assert a["kofi_asante"] == b["kofi_asante"] + 1, p
    assert a["margaret"] == b["margaret"], (p, "Margaret/Ferrand must be untouched")
    assert a["lorraine"] == b["lorraine"] and a["deborah"] == b["deborah"], (p, "Batch 2 must be intact")
    rows.append((p, b, a))
    print("  wrote %s" % p)

for p in DOCX:
    b = state[p]
    shutil.copy2(p, p + SUF)
    d = docx.Document(p)
    for par in d.paragraphs:
        for old, new in SUBS:
            if old in par.text:
                for r in par.runs:
                    if old in r.text:
                        r.text = r.text.replace(old, new)
    d.save(p)
    d2 = docx.Document(p)
    t = docx_text(d2)
    a = {"marcus_jr": t.count("Marcus Jr."), "kofi_mensah": t.count("Kofi Mensah"),
         "marcus": t.count("Marcus"), "kofi": t.count("Kofi"),
         "kofi_asante": t.count("Kofi Asante"), "margaret": t.count("Margaret"),
         "lorraine": t.count("Lorraine"), "deborah": t.count("Deborah"),
         "whitaker": t.count("Marcus Whitaker"), "idris_broussard": t.count("Idris Broussard")}
    assert len(d2.paragraphs) == b["paras"], (p, "paragraph count changed")
    assert a["marcus_jr"] == 0 and a["kofi_mensah"] == 0, p
    assert a["idris_broussard"] == 1, p
    assert a["marcus"] == b["marcus"] - 1, (p, b["marcus"], a["marcus"])
    assert a["whitaker"] == b["whitaker"], p
    assert a["kofi"] == b["kofi"] and a["kofi_asante"] == b["kofi_asante"] + 1, p
    assert a["margaret"] == b["margaret"], p
    rows.append((p, b, a))
    print("  wrote %s (paras %d unchanged)" % (p, b["paras"]))

print("\n%-70s %8s %8s %9s %8s" % ("FILE", "Marcus_B", "Marcus_A", "IdrisBrs", "KofiAsan"))
for p, b, a in rows:
    print("%-70s %8d %8d %9d %8d" % (os.path.basename(p), b["marcus"], a["marcus"],
                                     a["idris_broussard"], a["kofi_asante"]))
print("\nAll assertions passed. 8 files written.")
