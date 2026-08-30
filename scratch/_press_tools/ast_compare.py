"""Prove a comment-only edit: AST, non-comment token stream, and bytecode.

Compares production_staging/_scripts_from_windows/generate_omnibus_interior_HC_CURRENT.py
against its PRE_PRESSKIT backup. The script is never executed or imported.
"""

from __future__ import annotations

import ast
import hashlib
import io
import marshal
import tokenize
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
NEW = (
    ROOT
    / "production_staging"
    / "_scripts_from_windows"
    / "generate_omnibus_interior_HC_CURRENT.py"
)
OLD = NEW.with_name(f"{NEW.stem}.PRE_PRESSKIT_2026-08-29{NEW.suffix}.bak")


def read(path: Path) -> tuple[bytes, str]:
    raw = path.read_bytes()
    return raw, raw.decode("utf-8")


def ast_digest(src: str, name: str) -> str:
    dumped = ast.dump(ast.parse(src, filename=name), annotate_fields=True)
    return hashlib.sha256(dumped.encode("utf-8")).hexdigest()


def code_tokens(src: str) -> list[tuple[str, str]]:
    """Every token that is not a comment or pure layout."""
    out = []
    for tok in tokenize.generate_tokens(io.StringIO(src).readline):
        if tok.type in (tokenize.COMMENT, tokenize.NL, tokenize.ENCODING):
            continue
        out.append((tokenize.tok_name[tok.type], tok.string))
    return out


def bytecode_digest(src: str) -> str:
    code = compile(src, "<interior>", "exec", dont_inherit=True)
    return hashlib.sha256(marshal.dumps(code)).hexdigest()


old_raw, old_src = read(OLD)
new_raw, new_src = read(NEW)

print(f"before : {OLD.name}")
print(f"         bytes={len(old_raw)}  lines={old_src.count(chr(10))}  sha={hashlib.sha256(old_raw).hexdigest()[:16]}")
print(f"after  : {NEW.name}")
print(f"         bytes={len(new_raw)}  lines={new_src.count(chr(10))}  sha={hashlib.sha256(new_raw).hexdigest()[:16]}")

old_ast, new_ast = ast_digest(old_src, "old"), ast_digest(new_src, "new")
print(f"\nAST      sha256 before = {old_ast}")
print(f"AST      sha256 after  = {new_ast}")
print(f"AST identical: {old_ast == new_ast}")

old_tok, new_tok = code_tokens(old_src), code_tokens(new_src)
print(f"\nnon-comment tokens: before={len(old_tok)} after={len(new_tok)} identical={old_tok == new_tok}")
if old_tok != new_tok:
    for i, (a, b) in enumerate(zip(old_tok, new_tok)):
        if a != b:
            print(f"  first divergence at token {i}: {a} -> {b}")
            break

old_bc, new_bc = bytecode_digest(old_src), bytecode_digest(new_src)
print(f"\nbytecode sha256 before = {old_bc}")
print(f"bytecode sha256 after  = {new_bc}")
print(f"bytecode identical: {old_bc == new_bc}")

changed = [
    (i + 1, a, b)
    for i, (a, b) in enumerate(zip(old_src.split("\n"), new_src.split("\n")))
    if a != b
]
print(f"\nchanged lines: {len(changed)}")
for line, a, b in changed:
    is_comment = a.lstrip().startswith("#") and b.lstrip().startswith("#")
    print(f"  L{line}  comment-only={is_comment}")
    print(f"    - {a}")
    print(f"    + {b}")

for token in ["\u00e2\u0080", "\u00c3\u0083", "\u00c2\u00a0", "\ufffd", "â€"]:
    if token in new_src:
        print(f"  MOJIBAKE {token!r} present")
print("mojibake scan: clean" if not any(t in new_src for t in ["â€", "Ã", "Â", "\ufffd"]) else "")
