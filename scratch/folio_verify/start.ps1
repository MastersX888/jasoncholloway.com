# Clean restart for folio verification UI
$ErrorActionPreference = "SilentlyContinue"
$port = 8765

Get-NetTCPConnection -LocalPort $port | ForEach-Object {
    Stop-Process -Id $_.OwningProcess -Force
}

Start-Sleep -Seconds 1

Set-Location $PSScriptRoot

if (-not (Test-Path "cache\yale_thumbs\1006078.jpg")) {
    Write-Host "Yale cache missing — running prepare.py suggestions (one-time)..."
    python prepare.py suggestions
}

python serve.py $port
