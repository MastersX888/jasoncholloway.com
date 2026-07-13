# HANDOFF STATUS — Final Pass (OUTBOUND)

**Prepared:** July 10, 2026  
**Package:** `jasoncholloway-website-final-pass.zip`  
**Prompt:** `CLAUDE_FINAL_PASS_PROMPT.md`  
**Punch list:** `KNOWN_ISSUES_AND_FIXES.md`

## Status

- [x] Pass 1 integrated and deployed
- [x] Known issues documented with fix instructions
- [x] Final pass prompt written
- [x] Old pass artifacts removed to save disk space
- [ ] Claude final pass (awaiting)
- [ ] Cursor integration of RETURN package

## Send to Claude

1. Upload `jasoncholloway-website-final-pass.zip`
2. Paste contents of `CLAUDE_FINAL_PASS_PROMPT.md` as the task prompt
3. Request return zip with `output/` deliverables + `REVISED_FILES/`

## After Claude returns

1. Extract to `website_elevation_handoff/return/`
2. Copy `REVISED_FILES/*` → repo (use `-LiteralPath` for `[slug]` paths)
3. `powershell -File scratch/build_export.ps1`
4. `npx wrangler pages deploy out --project-name=jasoncholloway --branch=main`
