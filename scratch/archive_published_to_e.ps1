# Move published / regenerable repo content off C: to E: archive.
# Safe to re-run: skips items already archived.
#
# Usage (from repo root on Windows):
#   powershell -ExecutionPolicy Bypass -File scratch\archive_published_to_e.ps1
#
# Dry run:
#   powershell -ExecutionPolicy Bypass -File scratch\archive_published_to_e.ps1 -WhatIf
#
# Also delete local copies after copy (default):
#   powershell -ExecutionPolicy Bypass -File scratch\archive_published_to_e.ps1 -RemoveSource

param(
    [string]$ArchiveRoot = "E:\Masters_X_Trilogy_Archive\repo_archives",
    [switch]$WhatIf,
    [switch]$RemoveSource
)

$ErrorActionPreference = "Continue"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not (Test-Path "E:\")) {
    Write-Error "E: drive not found. Plug in or map the archive drive and retry."
    exit 1
}

$stamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$dest = Join-Path $ArchiveRoot $stamp
New-Item -ItemType Directory -Force -Path $dest | Out-Null

function Get-FolderSizeBytes {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return 0 }
    try {
        $sum = (Get-ChildItem $Path -Recurse -Force -ErrorAction SilentlyContinue |
            Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum
        if ($null -eq $sum) { return 0 }
        return [int64]$sum
    } catch { return 0 }
}

function Archive-Item {
    param(
        [string]$RelPath,
        [ref]$MovedBytes,
        [ref]$MovedCount
    )
    $src = Join-Path $Root $RelPath
    if (-not (Test-Path $src)) { return }

    $target = Join-Path $dest $RelPath
    $parent = Split-Path $target -Parent
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }

    $size = Get-FolderSizeBytes $src
    Write-Host ("Archive {0} ({1:N1} MB)" -f $RelPath, ($size / 1MB))

    if ($WhatIf) {
        $MovedBytes.Value += $size
        $MovedCount.Value++
        return
    }

    robocopy $src $target /E /COPY:DAT /R:1 /W:1 /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
    if ($LASTEXITCODE -ge 8) {
        Write-Warning "Robocopy failed for $RelPath (exit $LASTEXITCODE)"
        return
    }

    if ($RemoveSource) {
        Remove-Item $src -Recurse -Force -ErrorAction SilentlyContinue
    }

    $MovedBytes.Value += $size
    $MovedCount.Value++
}

$drive = (Get-Location).Drive.Name
$before = (Get-PSDrive $drive).Free
Write-Host ("Free space before: {0:N1} GB on {1}:" -f ($before / 1GB), $drive)
Write-Host ("Archive destination: {0}" -f $dest)
Write-Host ""

$moved = 0
$count = 0
$movedRef = [ref]$moved
$countRef = [ref]$count

# Regenerable build output (largest wins first)
$targets = @(
    "node_modules",
    "out",
    ".next",
    "seventhcitypress\node_modules",
    "seventhcitypress\.next",
    "seventhcitypress\out",
    "debt_consolidation_handoff\peg-board\node_modules",
    "debt_consolidation_handoff\peg-board\dist",
    "the-bridge-worker\node_modules",
    "the-bridge-worker\.wrangler",
    "pinterest-agent\.venv",
    "pinterest-agent\output",
    "pinterest-agent\logs",
    "pinterest-agent\__pycache__"
)

# Published editorial / handoff packs (source lives on site or in git history)
$published = @(
    "content_fable_handoff",
    "debt_consolidation_handoff",
    "encyclopedia_project",
    "encyclopedia_fable_handoff",
    "public\publish-review.html"
)

foreach ($rel in ($targets + $published)) {
    Archive-Item $rel $movedRef $countRef
}

# Manifest for restore
$manifest = @{
    archivedAt = (Get-Date).ToString("o")
    repoRoot   = $Root
    destination = $dest
    items      = @($targets + $published)
    removeSource = [bool]$RemoveSource
}
$manifest | ConvertTo-Json -Depth 4 | Set-Content (Join-Path $dest "ARCHIVE_MANIFEST.json") -Encoding UTF8

$after = (Get-PSDrive $drive).Free
Write-Host ""
Write-Host ("Archived {0} items, approximately {1:N1} GB" -f $count, ($moved / 1GB))
Write-Host ("Free space now:   {0:N1} GB on {1}:" -f ($after / 1GB), $drive)
Write-Host ""
Write-Host "Manifest: $dest\ARCHIVE_MANIFEST.json"
Write-Host ""
Write-Host "Restore build artifacts when needed:"
Write-Host "  npm ci"
Write-Host "  powershell -File scratch\build_export.ps1"
Write-Host ""
Write-Host "Optional extra reclaim on C:"
Write-Host "  powershell -ExecutionPolicy Bypass -File scratch\free_disk_space.ps1 -Deep"
