# Deploy imprint site (seventhcitypress.com)
# Run from repo root or seventhcitypress/

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Join-Path $here "..")

npm install
npm run build

Write-Host ""
Write-Host "Build complete. Deploy with:"
Write-Host "  npx wrangler pages deploy out --project-name=seventhcitypress --branch=main"
