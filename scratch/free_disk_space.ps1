# Reclaim disk space in the jasoncholloway repo (safe — all regenerable).
# Does NOT touch E: drive archives, public/folios, or source files.
#
# Usage:
#   cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
#   powershell -File scratch/free_disk_space.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$targets = @(
    ".next",
    "out",
    "tsconfig.tsbuildinfo",
    "seventhcitypress\.next",
    "seventhcitypress\out",
    "debt_consolidation_handoff\peg-board\node_modules",
    "debt_consolidation_handoff\peg-board\dist",
    "scratch\folio_verify\__pycache__"
)

$freed = 0
foreach ($rel in $targets) {
    $path = Join-Path $Root $rel
    if (-not (Test-Path $path)) { continue }
    $size = (Get-ChildItem $path -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
    if (-not $size) { $size = 0 }
    Remove-Item $path -Recurse -Force -ErrorAction SilentlyContinue
    $freed += $size
    Write-Host ("Removed {0} ({1:N1} MB)" -f $rel, ($size / 1MB))
}

Write-Host ""
Write-Host ("Reclaimed approximately {0:N1} MB" -f ($freed / 1MB))
Write-Host "Rebuild when ready: npm run build"
Write-Host "Deploy when ready:  npx wrangler pages deploy out --project-name=jasoncholloway --branch=main"
