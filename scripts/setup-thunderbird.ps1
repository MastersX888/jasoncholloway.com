# DEPRECATED — automated Thunderbird prefs do not work reliably with Gmail + AVG.
# Use the master script instead:
#
#   powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -Thunderbird
#
# That walks you through OAuth (which works). For agent-only setup:
#
#   powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -Mcp

param(
    [switch]$ShowHelp
)

Write-Host "This script is deprecated."
Write-Host ""
Write-Host "Use: powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -All"
Write-Host ""
Write-Host "  -Audit        Show what you have vs what you need"
Write-Host "  -Mcp          Configure Cursor email agent automatically"
Write-Host "  -Thunderbird  Guided OAuth setup (works; prefs automation does not)"
Write-Host "  -All          All of the above"
if ($ShowHelp) { exit 0 }
exit 1
