# Batch-fix Google Merchant Center product data for all 10 print SKUs.
# Run from repo root:  .\scripts\batch-google-merchant-fix.ps1
#
# What this automates:
#   - Regenerates google-shopping.csv (prices, shipping, USD, all 10 ISBNs)
#   - Copies upload-ready CSV to Downloads
#   - Syncs to out/feeds if out/ exists (for deploy)
#
# What still needs ONE Merchant Center account change (not per-product):
#   - Target countries → United States only
#   See scratch/GOOGLE_MERCHANT_CENTER_BATCH_FIX.md

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "`n=== Batch Google Merchant fix (10 print SKUs) ===" -ForegroundColor Cyan

# 1. Regenerate feed from Ingram report.csv
$Report = Join-Path $env:USERPROFILE "Downloads\report.csv"
if (-not (Test-Path $Report)) {
    Write-Warning "Ingram report.csv not found at $Report"
    Write-Warning "Export from IngramSpark and re-run, or pass path:"
    Write-Warning "  python scripts/sync-ingram-metadata.py C:\path\to\report.csv"
} else {
    python (Join-Path $Root "scripts\sync-ingram-metadata.py") $Report
    if ($LASTEXITCODE -ne 0) { throw "sync-ingram-metadata.py failed" }
}

$Feed = Join-Path $Root "public\feeds\google-shopping.csv"
if (-not (Test-Path $Feed)) { throw "Feed not generated: $Feed" }

# 2. Copy to Downloads for manual MC upload (optional path)
$Upload = Join-Path $env:USERPROFILE "Downloads\google-shopping-merchant-upload.csv"
Copy-Item $Feed $Upload -Force
Write-Host "Upload copy: $Upload" -ForegroundColor Green

# 3. Sync to out/ for deploy
$OutFeed = Join-Path $Root "out\feeds\google-shopping.csv"
if (Test-Path (Join-Path $Root "out")) {
    $OutDir = Split-Path $OutFeed
    if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }
    Copy-Item $Feed $OutFeed -Force
    Write-Host "Synced to: $OutFeed" -ForegroundColor Green
}

# 4. Summary
$Lines = (Get-Content $Feed | Measure-Object -Line).Lines - 1
Write-Host "`nFeed ready: $Lines products" -ForegroundColor Green
Write-Host "Live URL:   https://jasoncholloway.com/feeds/google-shopping.csv"
Write-Host ""
Write-Host "Merchant Center - 2 batch actions (not 10):" -ForegroundColor Yellow
Write-Host '  A) Tools - Business information - Countries -> US ONLY'
Write-Host ('  B) Products - Feeds - Fetch now  (or upload ' + $Upload + ')')
Write-Host ""
