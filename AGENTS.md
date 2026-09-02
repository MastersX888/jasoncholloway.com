<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Primary product is the **author website** (`jasoncholloway`), a Next.js 16 app at the repo root. Standard scripts are in `package.json`: `npm run dev` (port 3000), `npm run lint`, `npm run build`. It is a static export (`output: 'export'` in `next.config.ts`); `npm run build` writes to `./out`. There is no backend and no database.
- `.nvmrc` pins Node 20, but only Node 22 (LTS) is available in this environment. Node 22 satisfies Next.js 16's requirement (>= 20.9) and dev/build/lint all work under it, so don't block on installing Node 20.
- `npm run lint` runs ESLint across the **entire** repo, including archived `*_handoff/`, `redesign_A_package/`, `author_patches/`, etc. Those folders have many pre-existing lint errors that are unrelated to the primary product. To lint just the shipped site, scope it: `npx eslint app components lib content`. (The primary app also has some pre-existing lint errors; `next build` does not fail on them.)
- No test framework or `test` script is configured for any product.
- Contact/newsletter forms POST to external Web3Forms (`api.web3forms.com`); actual submission won't work offline, but the forms are otherwise fully interactive. Google Analytics (`gtag`) is also external and optional.
- Secondary product `seventhcitypress/` is a separate Next.js 16 static site with its own `package.json`/lockfile — run `npm install` there and serve on a different port (it also defaults to 3000). Other top-level folders (`website_edits_handoff/`, `website_elevation_handoff/`, `debt_consolidation_handoff/peg-board/`, etc.) are archives/one-off tools, not the shipped product.
- `groundswell-monitor/` is an uninitialized git submodule (empty); it is not needed for local dev.
