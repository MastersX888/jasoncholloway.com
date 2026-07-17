# Stage all batch-upload packages to one Desktop folder for a single sprint session.
# Run from repo root: powershell -File scratch/stage_batch_uploads.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Dest = Join-Path $env:USERPROFILE "Desktop\SCP_Batch_Upload_Jul2026"

if (Test-Path $Dest) { Remove-Item $Dest -Recurse -Force }
New-Item -ItemType Directory -Path $Dest | Out-Null

function Stage-Dir($Label, $Source, $Sub = "") {
  $target = Join-Path $Dest $Label
  New-Item -ItemType Directory -Path $target -Force | Out-Null
  $from = if ($Sub) { Join-Path $Source $Sub } else { $Source }
  if (Test-Path $from) {
    Copy-Item (Join-Path $from "*") $target -Recurse -Force
    Write-Host "  $Label" -ForegroundColor Green
  } else {
    Write-Host "  $Label (MISSING: $from)" -ForegroundColor Yellow
  }
}

Write-Host "`nStaging batch upload packages -> $Dest`n" -ForegroundColor Cyan

Stage-Dir "01_google_play_books" (Join-Path $Root "scratch\google_play_upload")

Stage-Dir "02_google_business" (Join-Path $Root "seventhcitypress\google_business")

New-Item -ItemType Directory -Path (Join-Path $Dest "03_merchant_center") -Force | Out-Null
$mcSrc = Join-Path $env:USERPROFILE "Downloads\google-shopping-merchant-upload.csv"
if (Test-Path $mcSrc) {
  Copy-Item $mcSrc (Join-Path $Dest "03_merchant_center\google-shopping-merchant-upload.csv") -Force
  Write-Host "  03_merchant_center" -ForegroundColor Green
} else {
  Write-Host "  03_merchant_center (run batch-google-merchant-fix.ps1 first)" -ForegroundColor Yellow
}

New-Item -ItemType Directory -Path (Join-Path $Dest "04_search_console") -Force | Out-Null
$gsc = @"
# Google Search Console — submit after adding properties

## Add properties
- sc-domain:jasoncholloway.com (likely exists)
- sc-domain:seventhcitypress.com (add new)

## Submit sitemaps
https://jasoncholloway.com/sitemap.xml
https://seventhcitypress.com/sitemap.xml

## Request indexing (priority URLs)
https://jasoncholloway.com/books/masters-x/
https://jasoncholloway.com/books/masters-x/omnibus/
https://seventhcitypress.com/
"@
Set-Content -Path (Join-Path $Dest "04_search_console\SITEMAP_URLS.txt") -Value $gsc -Encoding UTF8
Write-Host "  04_search_console" -ForegroundColor Green

# Wikidata quick-edit cheat sheet
$wiki = @"
Wikidata Q140275300 — add these statements (one edit session)

1. Open: https://www.wikidata.org/wiki/Q140275300
2. Add statement: **ISNI (P213)** = 0000 0005 3044 7935
3. Add statement: official website (P856) = https://seventhcitypress.com/
4. Add statement: employer / publisher link if missing

Author item (if separate): link works via P50 on edition items.
"@
New-Item -ItemType Directory -Path (Join-Path $Dest "05_wikidata") -Force | Out-Null
Set-Content -Path (Join-Path $Dest "05_wikidata\EDIT_CHECKLIST.txt") -Value $wiki -Encoding UTF8
Write-Host "  05_wikidata" -ForegroundColor Green

# Copy sprint doc
Copy-Item (Join-Path $Root "debt_consolidation_handoff\BATCH_SPRINT.md") (Join-Path $Dest "00_START_HERE_BATCH_SPRINT.md") -Force
Write-Host "  00_START_HERE_BATCH_SPRINT.md" -ForegroundColor Green

Write-Host "`nDone. Open folder:" -ForegroundColor Cyan
Write-Host $Dest
if (Get-Command explorer -ErrorAction SilentlyContinue) { explorer $Dest }
elseif (Get-Command Start-Process -ErrorAction SilentlyContinue) { Start-Process $Dest }
