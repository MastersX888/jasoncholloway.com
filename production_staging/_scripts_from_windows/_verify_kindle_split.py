"""Confirm each Kindle EPUB is ASIN-stamped and that the retail EPUB beside it
was not overwritten by the Kindle build (trap 1 regression check)."""
import re
import zipfile
from pathlib import Path

PAIRS = [
    ("B1", "production_staging/b1_inheritance/9798256008819_KINDLE/9798256008819_KINDLE.epub",
           "production_staging/b1_inheritance/9798256008819_EPUB/9798256008819.epub"),
    ("B2", "production_staging/b2_grimoire/9798256009625_KINDLE/9798256009625_KINDLE.epub",
           "production_staging/b2_grimoire/9798256009625_EPUB/9798256009625.epub"),
    ("B3", "production_staging/b3_kingdom/9798256009809_KINDLE/9798256009809_KINDLE.epub",
           "production_staging/b3_kingdom/9798256009809_EPUB/9798256009809.epub"),
]

ID_RE = re.compile(r'<dc:identifier id="id">([^<]+)')
ROOT = Path(__file__).resolve().parents[2]

failures = 0
for label, kindle, retail in PAIRS:
    zk = zipfile.ZipFile(ROOT / kindle)
    zr = zipfile.ZipFile(ROOT / retail)
    k_copy = zk.read("EPUB/copyright.xhtml").decode()
    r_copy = zr.read("EPUB/copyright.xhtml").decode()
    k_opf = zk.read("EPUB/content.opf").decode()
    r_opf = zr.read("EPUB/content.opf").decode()

    asin = re.search(r"ASIN (B0[A-Z0-9]{8})", k_copy)
    r_isbn = re.search(r"ISBN ([\d\-]+)", r_copy)
    k_id = ID_RE.search(k_opf).group(1)
    r_id = ID_RE.search(r_opf).group(1)

    # Amazon rejects an ISBN identifier on a KDP upload; retail must keep its ISBN.
    ok = (
        asin is not None
        and k_id.startswith("urn:uuid:")
        and r_isbn is not None
        and not r_id.startswith("urn:uuid:")
        and "ASIN" not in r_copy
    )
    failures += 0 if ok else 1
    print(f"{label}  {'PASS' if ok else 'FAIL'}")
    print(f"     kindle: {asin.group(1) if asin else 'NO ASIN'}   id={k_id}")
    print(f"     retail: ISBN {r_isbn.group(1) if r_isbn else 'MISSING'}   id={r_id}")

print()
print("VERDICT:", "PASS - kindle and retail are distinct and correctly stamped" if not failures
      else f"FAIL - {failures} pair(s) wrong")
raise SystemExit(1 if failures else 0)
