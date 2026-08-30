import os, re, sys, zipfile
sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {"audiobook_project", "node_modules", ".git", ".next"}
OLD = ["Sarah Chen", "Marcus Chen", "Margaret Chen", "Laura Chen",
       "Lin Chen", "Michael Chen", "Andrew Tanaka", "the other Andrew"]
NEW = ["Sarah Ashworth", "Rosalind Lindgren", "Marcus Whitaker",
       "Margaret Ferrand", "Laura Okada", "Lin Zhao", "Michael Halloran",
       "Nolan Eriksen"]

TOOLING = {"_namefix_inspect.py", "_namefix_apply.py", "_namefix_verify.py",
           "screen.py", "inventory.py"}


def is_backup(name):
    return ".bak" in name or ".PRE_" in name


def texts():
    for dp, dn, fns in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        for fn in fns:
            p = os.path.join(dp, fn)
            rel = os.path.relpath(p, ROOT)
            if is_backup(fn):
                continue
            ext = os.path.splitext(fn)[1].lower()
            if ext == ".docx":
                try:
                    with zipfile.ZipFile(p) as z:
                        xml = z.read("word/document.xml").decode("utf-8")
                    yield rel, re.sub(r"<[^>]+>", "", xml)
                except Exception:
                    pass
            elif ext in {".txt", ".md", ".ts", ".tsx", ".json", ".jsonl",
                         ".csv", ".tsv", ".html", ".xhtml", ".py"}:
                try:
                    yield rel, open(p, encoding="utf-8", errors="replace").read()
                except Exception:
                    pass


print("=" * 78)
print("A. RESIDUAL OLD NAMES (excluding backups, audiobook_project)")
print("=" * 78)
clean = True
for rel, s in texts():
    hits = {o: s.count(o) for o in OLD}
    hits = {k: v for k, v in hits.items() if v}
    if not hits:
        continue
    tag = ""
    if os.path.basename(rel) in TOOLING:
        tag = "   [namefix tooling / audit script]"
    elif "NAME_CONFUSION_AUDIT" in rel or "NAME_FIX" in rel:
        tag = "   [audit / report doc — records the old names by design]"
    elif rel.startswith("cartographer" + os.sep + "artifacts"):
        tag = "   [DERIVED cartographer artifact — regenerate, do not hand-edit]"
    elif "FIX_CHANGELOG" in rel or "ops_reports" in rel:
        tag = "   [historical changelog / report — records past state]"
    elif "PRE_GEO_FIX" in rel:
        tag = "   [historical pre-geo-fix snapshot — deliberately frozen]"
    elif "_scripts_from_windows" in rel:
        tag = "   [historical one-shot fix script]"
    else:
        clean = False
        tag = "   *** UNEXPECTED ***"
    print(f"{rel}{tag}")
    for k, v in hits.items():
        print(f"      {k!r:20} {v}")

print(f"\nNo unexpected residual old names: {clean}")

print()
print("=" * 78)
print("B. 'Chen' CENSUS IN THE PATCHED SOURCES OF RECORD")
print("=" * 78)
SOR = [
    r"production_staging\_sources\build_docx\MASTERS_X_BOOK1_BUILD.docx",
    r"production_staging\_sources\build_docx\MASTERS_X_BOOK2_BUILD.docx",
    r"production_staging\_sources\build_docx\MASTERS_X_BOOK3_BUILD.docx",
    r"production_staging\_sources\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx",
    r"production_staging\_sources\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx",
    r"production_staging\_sources\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx",
    r"cartographer\corpus_raw\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx",
    r"cartographer\corpus_raw\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx",
    r"cartographer\corpus_raw\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx",
    r"scratch\ops\_book1_sources\MASTERS_X_BOOK1_BUILD.docx",
    r"production_staging\_sources\MASTERS_X_BOOK1_DEMY_9798256008048.txt",
    r"production_staging\_sources\MASTERS_X_BOOK2_DEMY_9798256009953.txt",
    r"production_staging\_sources\MASTERS_X_BOOK3_DEMY_9798256010072.txt",
    r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt",
    r"cartographer\corpus\MASTERS_X_BOOK1_DEMY_9798256008048.txt",
    r"cartographer\corpus\MASTERS_X_BOOK2_DEMY_9798256009953.txt",
    r"cartographer\corpus\MASTERS_X_BOOK3_DEMY_9798256010072.txt",
    r"cartographer\corpus_raw\BOOK1_from_docx.txt",
    r"cartographer\corpus_raw\BOOK2_from_docx.txt",
    r"cartographer\corpus_raw\BOOK3_from_docx.txt",
    r"cartographer\corpus_raw\omnibus_v8_fulltext.txt",
]
allok = True
for rel in SOR:
    p = os.path.join(ROOT, rel)
    if rel.endswith(".docx"):
        with zipfile.ZipFile(p) as z:
            s = re.sub(r"<[^>]+>", "", z.read("word/document.xml").decode("utf-8"))
    else:
        s = open(p, encoding="utf-8").read()
    total = s.count("Chen")
    andrew = len(re.findall(r"Andrew\s+Chen", s))
    ok = total == andrew
    allok &= ok
    print(f"  {'OK ' if ok else 'BAD'}  Chen={total:3}  AndrewChen={andrew:3}   {rel}")
print(f"\nEvery 'Chen' in every patched source of record is Andrew Chen: {allok}")

print()
print("=" * 78)
print("C. NEW NAMES PRESENT (omnibus manuscript of record)")
print("=" * 78)
s = open(os.path.join(ROOT, r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt"),
         encoding="utf-8").read()
for n in NEW + ["Ashworth", "Lindgren", "Whitaker", "Ferrand", "Okada", "Zhao", "Halloran", "Eriksen"]:
    print(f"  {n!r:22} {s.count(n)}")
print(f"  {'Andrew Chen'!r:22} {s.count('Andrew Chen')}")
print(f"  {'Chen (total)'!r:22} {s.count('Chen')}")

print()
print("=" * 78)
print("D. THE TWO REWRITTEN PASSAGES (post-edit, omnibus)")
print("=" * 78)
lines = s.split("\n")
for i, l in enumerate(lines):
    if "Nolan" in l or "had been born with" in l:
        for j in range(i - 2, i + 4):
            if 0 <= j < len(lines):
                print(f"{j+1:6} [{len(lines[j]):3}] {lines[j]}")
        print("   ---")

print()
print("=" * 78)
print("E. LONGEST LINES TOUCHED (wrap sanity, Book 3 DEMY corpus)")
print("=" * 78)
b3 = open(os.path.join(ROOT, r"production_staging\_sources\MASTERS_X_BOOK3_DEMY_9798256010072.txt"),
          encoding="utf-8").read().split("\n")
for i, l in enumerate(b3):
    if any(n in l for n in ["Whitaker", "Ferrand", "Okada", "Zhao", "Halloran", "Eriksen"]):
        print(f"{i+1:6} [{len(l):3}] {l}")
