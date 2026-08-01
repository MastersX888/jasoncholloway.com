# Reclaim disk space in the jasoncholloway repo (safe — all regenerable).
# Does NOT touch E: drive archives, public/folios, or committed source files.
#
# Usage (from repo root):
#   cd C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway
#   powershell -ExecutionPolicy Bypass -File scratch\free_disk_space.ps1
#
# Move published / handoff content to E: (larger reclaim):
#   powershell -ExecutionPolicy Bypass -File scratch\archive_published_to_e.ps1 -RemoveSource
#
# Optional: also clear npm + wrangler caches (~500MB–2GB+)
#   powershell -ExecutionPolicy Bypass -File scratch\free_disk_space.ps1 -Deep

param(
    [switch]$Deep
)

$ErrorActionPreference = "Continue"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

function Get-FolderSizeBytes {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return 0 }
    try {
        $sum = (Get-ChildItem $Path -Recurse -Force -ErrorAction SilentlyContinue |
            Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
        if ($null -eq $sum) { return 0 }
        return [int64]$sum
    } catch {
        return 0
    }
}

function Remove-Target {
    param([string]$RelPath, [ref]$FreedBytes)
    $path = if ([System.IO.Path]::IsPathRooted($RelPath)) { $RelPath } else { Join-Path $Root $RelPath }
    if (-not (Test-Path $path)) { return }
    $size = Get-FolderSizeBytes $path
    Remove-Item $path -Recurse -Force -ErrorAction SilentlyContinue
    $FreedBytes.Value += $size
    Write-Host ("Removed {0} ({1:N1} MB)" -f $RelPath, ($size / 1MB))
}

$drive = (Get-Location).Drive.Name
$before = (Get-PSDrive $drive).Free
Write-Host ("Free space before: {0:N1} GB on {1}:" -f ($before / 1GB), $drive)
Write-Host ""

$freed = 0
$freedRef = [ref]$freed

# Largest regenerable targets first (helps when disk is nearly full).
$repoTargets = @(
    "node_modules",
    "out",
    ".next",
    "tsconfig.tsbuildinfo",
    "seventhcitypress\node_modules",
    "seventhcitypress\.next",
    "seventhcitypress\out",
    "debt_consolidation_handoff\peg-board\node_modules",
    "debt_consolidation_handoff\peg-board\dist",
    "scratch\folio_verify\__pycache__",
    "the-bridge-worker\node_modules",
    "the-bridge-worker\.wrangler"
)

foreach ($rel in $repoTargets) {
    Remove-Target $rel $freedRef
}

# Temp build dir used by scratch/build_export.ps1
$tempBuild = Join-Path $env:TEMP "jch-site-build"
Remove-Target $tempBuild $freedRef

if ($Deep) {
    Write-Host ""
    Write-Host "Deep clean: npm + wrangler caches..."
    try { npm cache clean --force 2>$null } catch {}

    $cacheTargets = @(
        (Join-Path $env:LOCALAPPDATA "npm-cache"),
        (Join-Path $env:APPDATA "npm-cache"),
        (Join-Path $env:USERPROFILE ".wrangler"),
        (Join-Path $env:LOCALAPPDATA ".wrangler")
    )
    foreach ($cache in $cacheTargets) {
        Remove-Target $cache $freedRef
    }
}

$after = (Get-PSDrive $drive).Free
Write-Host ""
Write-Host ("Reclaimed approximately {0:N1} MB" -f ($freed / 1MB))
Write-Host ("Free space now:   {0:N1} GB on {1}:" -f ($after / 1GB), $drive)
Write-Host ""
Write-Host "When ready:"
Write-Host "  npm ci"
Write-Host "  powershell -File scratch\build_export.ps1"
Write-Host "  Remove-Item -Recurse -Force out\ops -ErrorAction SilentlyContinue"
Write-Host "  npx wrangler pages deploy out --project-name=jasoncholloway --branch=main"
