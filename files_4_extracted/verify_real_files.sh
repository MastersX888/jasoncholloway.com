#!/usr/bin/env bash
# Fails loudly if a file is NOT a real PDF/EPUB (e.g. a renamed text draft).
for f in "$@"; do
  case "$f" in
    *.pdf)  head -c5 "$f" | grep -q '%PDF' && echo "OK  real PDF : $f" || echo "FAIL not a PDF: $f" ;;
    *.epub) head -c2 "$f" | grep -q 'PK'  && echo "OK  real EPUB: $f" || echo "FAIL not EPUB: $f" ;;
    *) echo "skip $f" ;;
  esac
done
