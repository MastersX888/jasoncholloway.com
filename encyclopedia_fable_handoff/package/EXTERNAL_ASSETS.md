# External Assets (not bundled — paths on author machine)

These files are referenced by the encyclopedia manuscript but excluded from the zip to keep package size manageable.

## Required for print pass

| Asset | Path | Role |
|-------|------|------|
| Frequency bands JSON | `E:\frequency_data\frequency_bands.json` | Frequency Tables Appendix; digested in `universe_memory/03_FREQUENCY_SYSTEM.md` |
| Resonant Frequency Dictionary | `encyclopedia_project/sources/resonant_frequency_dictionary.txt` (~13.7M chars) | Excerpt for appendix; grep/curate locally |
| Research library | `E:\Research\` (188 files) | Catalog in `universe_memory/01_RESEARCH_CATALOG.md` |

## Reference (cover / brand)

| Asset | Path | Role |
|-------|------|------|
| Trilogy cover archive | `E:\Masters_X_Trilogy_Archive\` | Visual lineage; see `design_memory/TRILOGY_COVER_BRIEF.md` |
| Live cover PNGs | `public/covers/` (repo) | Listed in `ASSET_MANIFEST.md` |
| Omnibus print PDF | `C:\Users\zh577\Desktop\OMNIBUS_FINAL_FILES\` | Typography reference for interior spec |

## If frequency_bands.json is needed inside the package

Copy manually before upload:
```
copy E:\frequency_data\frequency_bands.json encyclopedia_project\sources\
```
