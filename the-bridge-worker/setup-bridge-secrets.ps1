# One-time setup for The Bridge cloud backend secrets.
# Usage (recommended — pulls key from groundswell-monitor GitHub secrets):
#   .\setup-bridge-secrets.ps1
#
# Or provide a key directly:
#   .\setup-bridge-secrets.ps1 -AnthropicKey "sk-ant-..."

param(
    [string]$AnthropicKey = $env:ANTHROPIC_API_KEY
)

$ErrorActionPreference = "Stop"
$WorkerName = "the-bridge"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location $Root
try {
    Remove-Item Env:CLOUDFLARE_API_TOKEN -ErrorAction SilentlyContinue
    Remove-Item Env:CF_API_TOKEN -ErrorAction SilentlyContinue

    if (-not $AnthropicKey) {
        Write-Host "No local key provided — pulling from groundswell-monitor GitHub Actions secrets..."
        python "$Root\apply_anthropic_from_artifact.py"
        if ($LASTEXITCODE -ne 0) { throw "Failed to download Anthropic key from GitHub artifact" }
        $AnthropicKey = Get-Content -Raw "$Root\.anthropic.key.tmp"
        Remove-Item "$Root\.anthropic.key.tmp" -Force -ErrorAction SilentlyContinue
    }

    if (-not $AnthropicKey.StartsWith("sk-ant-")) {
        Write-Warning "Key does not look like an Anthropic API key (expected sk-ant-...). Continuing anyway."
    }

    $AnthropicKey | npx wrangler secret put ANTHROPIC_API_KEY --name $WorkerName
    Write-Host "Done. ANTHROPIC_API_KEY is set on worker '$WorkerName'."
    Write-Host "Refresh https://the-bridge.zh5779485.workers.dev/ and try Counselor again."
}
finally {
    Pop-Location
}
