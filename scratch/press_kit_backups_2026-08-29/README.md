# press kit backups — 2026-08-29

The five press-kit PDFs as they stood before the stale page counts were
corrected in `scripts/generate_press_kit.py`. Every figure in these files is
wrong except the three EPUB counts (267 / 385 / 291).

They live here rather than beside the PDFs they replace because
`scripts/check-public-backups.mjs` fails the build on any backup under a
`public/` tree: everything there is copied verbatim into the static export, so
a backup dropped there republishes itself at a second URL.

`public/press-kit/`, `out/press-kit/` and `seventhcitypress/public/press-kit/`
held byte-identical copies, so one set is kept here.
