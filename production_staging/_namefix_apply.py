"""Apply approved Masters X character renames to source-of-record files.

Ruling 2026-08-29: Andrew Chen is the only Chen. Asserts every expected match
count before writing anything; aborts the whole run on any mismatch.
"""
import os
import re
import shutil
import sys
import zipfile

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = ".PRE_NAMEFIX_2026-08-29.bak"
DRY = "--write" not in sys.argv

# (rule id, description, pattern, replacement)
# (\s+) captures are preserved so hard-wrapped corpora keep their line breaks
# in the same place. Rules are context-specific so the same set can be applied
# to per-volume files and to the omnibus without ambiguity.
B1 = [
    ("R1", "Professor Sarah Chen from Cambridge -> Sarah Ashworth",
     r"Professor(\s+)Sarah(\s+)Chen(\s+)from(\s+)Cambridge",
     r"Professor\1Sarah\2Ashworth\3from\4Cambridge"),
    ("R2", "Chen looked between them -> Ashworth",
     r"Chen(\s+)looked(\s+)between(\s+)them",
     r"Ashworth\1looked\2between\3them"),
    ("R3", "Professor Chen had agreed -> Professor Ashworth",
     r"Professor(\s+)Chen(\s+)had(\s+)agreed",
     r"Professor\1Ashworth\2had\3agreed"),
    ("R4", "Chen's Cambridge verification -> Ashworth's",
     r"Chen's(\s+)Cambridge",
     r"Ashworth's\1Cambridge"),
]

B2 = [
    ("R5", "Dr. Sarah Chen -> Dr. Rosalind Lindgren",
     r"Dr\.(\s+)Sarah(\s+)Chen,",
     r"Dr.\1Rosalind\2Lindgren,"),
    ("R6", "Sarah Chen offered it personally -> Rosalind Lindgren",
     r"Sarah(\s+)Chen(\s+)offered(\s+)it(\s+)personally",
     r"Rosalind\1Lindgren\2offered\3it\4personally"),
    ("R13", "Sabrina: shared by marriage -> had been born with",
     r"whose(\s+)last(\s+)name(\s+)Nadia(\s+)shared\s+by\s+marriage",
     r"whose\1last\2name\3Nadia\4had been born with"),
]

B3 = [
    ("R7", "Marcus Chen -> Marcus Whitaker",
     r"Marcus(\s+)Chen", r"Marcus\1Whitaker"),
    ("R8", "Margaret Chen -> Margaret Ferrand",
     r"Margaret(\s+)Chen", r"Margaret\1Ferrand"),
    ("R9", "Laura Chen -> Laura Okada",
     r"Laura(\s+)Chen", r"Laura\1Okada"),
    ("R10", "Lin Chen -> Lin Zhao",
     r"Lin(\s+)Chen", r"Lin\1Zhao"),
    ("R11", "Michael Chen -> Michael Halloran",
     r"Michael(\s+)Chen", r"Michael\1Halloran"),
    ("R12", "Andrew, the other Andrew, Tanaka, confirmed -> Nolan Eriksen confirmed",
     r"Andrew,(\s+)the\s+other\s+Andrew,\s+Tanaka,\s+confirmed",
     r"Nolan\1Eriksen confirmed"),
]

EXPECT = {
    "R1": 1, "R2": 1, "R3": 1, "R4": 1,
    "R5": 1, "R6": 1, "R13": 1,
    "R7": 3, "R8": 5, "R9": 1, "R10": 1, "R11": 1, "R12": 1,
}

# kind: docx | txt   rules: list of rule groups
FILES = [
    # ---- DOCX: primary build sources ----
    ("docx", r"production_staging\_sources\build_docx\MASTERS_X_BOOK1_BUILD.docx", B1),
    ("docx", r"production_staging\_sources\build_docx\MASTERS_X_BOOK2_BUILD.docx", B2),
    ("docx", r"production_staging\_sources\build_docx\MASTERS_X_BOOK3_BUILD.docx", B3),
    # ---- DOCX: legacy generator inputs ----
    ("docx", r"production_staging\_sources\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx", B1),
    ("docx", r"production_staging\_sources\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx", B2),
    ("docx", r"production_staging\_sources\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx", B3),
    # ---- DOCX: cartographer raw inputs ----
    ("docx", r"cartographer\corpus_raw\MASTERS_X_BOOK1_ITALICIZED_FIXED.docx", B1),
    ("docx", r"cartographer\corpus_raw\MASTERS_X_BOOK2_ITALICIZED_FIXED.docx", B2),
    ("docx", r"cartographer\corpus_raw\MASTERS_X_BOOK3_ITALICIZED_FIXED.docx", B3),
    # ---- DOCX: website sampler copy ----
    ("docx", r"scratch\ops\_book1_sources\MASTERS_X_BOOK1_BUILD.docx", B1),
    # ---- TXT: DEMY fix corpora ----
    ("txt", r"production_staging\_sources\MASTERS_X_BOOK1_DEMY_9798256008048.txt", B1),
    ("txt", r"production_staging\_sources\MASTERS_X_BOOK2_DEMY_9798256009953.txt", B2),
    ("txt", r"production_staging\_sources\MASTERS_X_BOOK3_DEMY_9798256010072.txt", B3),
    # ---- TXT: omnibus manuscript of record ----
    ("txt", r"production_staging\_sources\OMNIBUS_CURRENT_DRAFT_GEO_FIXED.txt", B1 + B2 + B3),
    # ---- TXT: cartographer audit corpora ----
    ("txt", r"cartographer\corpus\MASTERS_X_BOOK1_DEMY_9798256008048.txt", B1),
    ("txt", r"cartographer\corpus\MASTERS_X_BOOK2_DEMY_9798256009953.txt", B2),
    ("txt", r"cartographer\corpus\MASTERS_X_BOOK3_DEMY_9798256010072.txt", B3),
    ("txt", r"cartographer\corpus_raw\BOOK1_from_docx.txt", B1),
    ("txt", r"cartographer\corpus_raw\BOOK2_from_docx.txt", B2),
    ("txt", r"cartographer\corpus_raw\BOOK3_from_docx.txt", B3),
    ("txt", r"cartographer\corpus_raw\omnibus_v8_fulltext.txt", B1 + B2 + B3),
]


def read(kind, path):
    if kind == "docx":
        with zipfile.ZipFile(path) as z:
            return z.read("word/document.xml").decode("utf-8")
    with open(path, encoding="utf-8", newline="") as f:
        return f.read()


def write(kind, path, new):
    if kind == "docx":
        tmp = path + ".tmp"
        with zipfile.ZipFile(path) as zin, \
                zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                data = zin.read(item.filename)
                if item.filename == "word/document.xml":
                    data = new.encode("utf-8")
                zout.writestr(item, data)
        os.replace(tmp, path)
    else:
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(new)


errors = []
plan = []

for kind, rel, rules in FILES:
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        errors.append(f"MISSING FILE: {rel}")
        continue
    text = read(kind, path)
    new = text
    counts = []
    for rid, desc, pat, rep in rules:
        matches = list(re.finditer(pat, new))
        n = len(matches)
        want = EXPECT[rid]
        if n != want:
            errors.append(f"{rel}: {rid} matched {n}, expected {want}  ({desc})")
        if kind == "docx":
            for m in matches:
                if "<" in m.group(0) or ">" in m.group(0):
                    errors.append(f"{rel}: {rid} match spans XML markup: {m.group(0)!r}")
        new = re.sub(pat, rep, new)
        counts.append((rid, n, desc))
    # nothing but Andrew Chen may survive
    leftover = [m.start() for m in re.finditer(r"Chen", new)]
    andrew = len(re.findall(r"Andrew(\s+)Chen", new)) + len(re.findall(r"A\. CHEN", new))
    if len(leftover) != andrew:
        errors.append(f"{rel}: {len(leftover)} 'Chen' remain but only {andrew} are Andrew Chen")
    plan.append((kind, rel, path, text, new, counts, len(leftover)))

print(f"{'DRY RUN' if DRY else 'WRITING'}  —  {len(plan)} files planned\n")
for kind, rel, path, old, new, counts, remaining in plan:
    total = sum(c for _, c, _ in counts)
    print(f"[{kind}] {rel}")
    print(f"    substitutions={total}  Chen remaining (all Andrew)={remaining}  "
          f"delta={len(new) - len(old):+d} chars")
    for rid, n, desc in counts:
        print(f"      {rid:4} x{n}  {desc}")

if errors:
    print("\n!!! ABORTED — assertion failures:")
    for e in errors:
        print("   ", e)
    sys.exit(1)

print("\nAll assertions passed.")

if DRY:
    print("Dry run only. Re-run with --write to apply.")
    sys.exit(0)

for kind, rel, path, old, new, counts, remaining in plan:
    bak = path + BAK
    if not os.path.exists(bak):
        shutil.copy2(path, bak)
    write(kind, path, new)
    print(f"patched {rel}")

print("\nDone.")
