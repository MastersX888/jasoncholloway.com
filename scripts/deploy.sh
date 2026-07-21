#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Building static export..."
npm run build

echo "Deploying to Cloudflare Pages (jasoncholloway)..."
npx wrangler pages deploy out --project-name=jasoncholloway --branch=main

echo ""
echo "Done. Purge cache in Cloudflare dashboard (both jasoncholloway + seventhcitypress)."
echo "Check:"
echo "  https://jasoncholloway.com/books/masters-x/omnibus/"
echo "  https://jasoncholloway.com/ops/"
