import zipfile, sys, re
from pathlib import Path
for path in sys.argv[1:]:
    p = Path(path)
    try:
        with zipfile.ZipFile(p) as z:
            names = z.namelist()
            first = names[0] if names else None
            mime = z.read("mimetype").decode("utf-8", errors="replace") if "mimetype" in names else None
            opf = next((n for n in names if n.endswith(".opf")), None)
            ident = None
            if opf:
                text = z.read(opf).decode("utf-8", errors="replace")
                m = re.search(r"<dc:identifier[^>]*>([^<]+)</dc:identifier>", text)
                ident = m.group(1).strip() if m else None
            print(f"OK\tfirst={first}\tmime={mime}\tid={ident}\tsize={p.stat().st_size}\t{path}")
    except Exception as e:
        print(f"FAIL\t{e}\t{path}")
