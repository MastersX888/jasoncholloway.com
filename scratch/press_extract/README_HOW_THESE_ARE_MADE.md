# scratch/press_extract

Plain-text extractions of the five PDFs in `public/press-kit/`, kept so the
figures the press kit prints can be diffed and grepped without opening a PDF.

They are **derived files**. Do not hand-edit them: correct the generator
(`scripts/generate_press_kit.py`), rerun it, and regenerate these.

## Regenerate

```
python scripts/generate_press_kit.py
python scratch/_press_tools/refresh_extracts.py
```

## Notes

- Extraction is PyMuPDF (`page.get_text()`), one blank-line-joined block per page.
- The extracts are now a verbatim copy of `get_text()`. No glyph normalisation
  is applied, and the refresh script asserts that no span is drawn in a fallback
  font (ZapfDingbats or Symbol) rather than repairing the text after the fact.
- **Superseded caveat, kept for context.** The brand line used to read `■ Seventh
  City Press`. Its mark was `Ⅶ` (U+2166 ROMAN NUMERAL SEVEN), which
  Helvetica/WinAnsi cannot encode, so ReportLab silently substituted a
  ZapfDingbats filled square; PyMuPDF misread that glyph as `I` and the script
  rewrote it to `■` so the record matched the printed page. On 2026-08-29 the
  mark was changed to the ASCII letters `VII`, which Helvetica-Bold encodes
  directly. The brand line now reads `VII  Seventh City Press` (two spaces, from
  the `&nbsp;&nbsp;` that separates the mark from the wordmark) and needs no
  normalisation. If `■` or a stray leading `I` ever reappears here, the glyph
  fallback has returned and the generator is at fault.
- Page counts here must match `lib/data/ingram-catalog.json`. The prebuild gate
  (`scripts/check-page-counts.mjs`) does not scan `scratch/`, so these files are
  a record, never a source.
