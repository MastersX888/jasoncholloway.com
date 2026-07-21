# Master email setup — one registry, one secrets file, two clients (Thunderbird + Cursor MCP).
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -Audit
#   powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -Mcp
#   powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -Thunderbird
#   powershell -ExecutionPolicy Bypass -File scripts/setup-email.ps1 -All
#
# Files:
#   scripts/email-accounts.registry.json   — which accounts exist (no passwords)
#   scripts/email-mcp-secrets.local.txt    — passwords (never commit)
#   ~/.config/email-mcp/config.toml        — agent config (generated)
#   Thunderbird profile jason-email        — add accounts via OAuth (guided)

param(
    [switch]$Audit,
    [switch]$Mcp,
    [switch]$Thunderbird,
    [switch]$All,
    [string]$SecretsFile = "",
    [string]$RegistryFile = ""
)

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot
. (Join-Path $ScriptDir "EmailCommon.ps1")

if (-not $SecretsFile) { $SecretsFile = Join-Path $ScriptDir "email-mcp-secrets.local.txt" }
if (-not $RegistryFile) { $RegistryFile = Join-Path $ScriptDir "email-accounts.registry.json" }
$TbExe = "C:\Program Files\Mozilla Thunderbird\thunderbird.exe"

if (-not ($Audit -or $Mcp -or $Thunderbird -or $All)) {
    $Audit = $true
}

function Invoke-EmailAudit {
    $registry = Get-EmailRegistry -Path $RegistryFile
    $secrets = @()
    if (Test-Path $SecretsFile) {
        $secrets = Parse-EmailSecretsFile -Path $SecretsFile
    }

    Write-EmailBanner "EMAIL AUDIT"

    Write-Host ""
    Write-Host "YOU ONLY NEED $($registry.logins.Count) CLIENT LOGINS (not one per address):"
    Write-Host ""
    foreach ($login in $registry.logins) {
        $secret = $secrets | Where-Object { $_.id -eq $login.id -or $_.email -eq $login.email }
        $secretOk = [bool]$secret
        $bridgeNote = ""
        if ($login.provider -eq "proton-bridge") {
            $up = Test-ProtonBridgeUp
            $bridgeNote = if ($up) { "Bridge: running" } else { "Bridge: NOT RUNNING" }
        }
        Write-Host ("  [{0}] {1}" -f $(if ($secretOk) { "OK" } else { "MISSING SECRET" }), $login.display_name)
        Write-Host ("       {0}  ({1})" -f $login.email, $login.auth)
        if ($bridgeNote) { Write-Host "       $bridgeNote" }
    }

    Write-Host ""
    Write-Host "ALIASES (no separate setup - mail arrives in parent inbox):"
    foreach ($alias in $registry.aliases) {
        Write-Host ("  {0} -> {1}" -f $alias.email, $alias.delivers_to)
    }

    Write-Host ""
    Write-Host "WEBSITE / CONTACT ADDRESSES (forwards only - no Thunderbird account):"
    foreach ($w in $registry.website_only) {
        Write-Host ("  {0} - {1}" -f $w.email, $w.note)
    }

    $profile = Get-ThunderbirdProfilePath
    Write-Host ""
    Write-Host "THUNDERBIRD ($profile):"
    if (-not $profile) {
        Write-Host "  Profile not found. Open Thunderbird once, then run -Thunderbird."
    } else {
        $configured = Get-ThunderbirdConfiguredEmails -ProfilePath $profile
        foreach ($login in $registry.logins) {
            $found = $configured -contains $login.email
            Write-Host ("  [{0}] {1} ({2})" -f $(if ($found) { "configured" } else { "missing" }), $login.display_name, $login.email)
        }
    }

    $mcpConfig = Join-Path $env:USERPROFILE ".config\email-mcp\config.toml"
    Write-Host ""
    Write-Host "CURSOR EMAIL MCP ($mcpConfig):"
    if (-not (Test-Path $mcpConfig)) {
        Write-Host "  Not configured. Run: setup-email.ps1 -Mcp"
    } else {
        foreach ($login in $registry.logins) {
            $inFile = Select-String -Path $mcpConfig -Pattern $login.email -Quiet
            Write-Host ("  [{0}] {1}" -f $(if ($inFile) { "in config" } else { "missing" }), $login.email)
        }
    }

    if (-not (Test-Path $SecretsFile)) {
        Write-Host ""
        Write-Host "WARNING: Secrets file missing. Copy email-mcp-secrets.example.txt -> email-mcp-secrets.local.txt"
    }

    Write-Host ""
    Write-Host "NEXT: setup-email.ps1 -Mcp          # configure agent"
    Write-Host "       setup-email.ps1 -Thunderbird  # guided Thunderbird OAuth setup"
    Write-Host ""
}

function Invoke-McpSetup {
    if (-not (Test-Path $SecretsFile)) {
        throw "Secrets file not found: $SecretsFile`nCopy email-mcp-secrets.example.txt and fill in app passwords."
    }
    Write-EmailBanner "CONFIGURE EMAIL MCP (Cursor agent)"
    & (Join-Path $ScriptDir "batch_email_mcp_setup.ps1") -SecretsFile $SecretsFile
}

function Invoke-ThunderbirdGuide {
    $registry = Get-EmailRegistry -Path $RegistryFile
    $profile = Get-ThunderbirdProfilePath

    Write-EmailBanner "THUNDERBIRD GUIDED SETUP"
    Write-Host ""
    Write-Host "Thunderbird must use Google OAuth (Sign in with Google) for Gmail/Workspace."
    Write-Host "Do NOT use the old automated prefs script - it breaks silently."
    Write-Host ""
    Write-Host "Prerequisites:"
    Write-Host "  - AVG Email Shield OFF and Web Shield HTTPS scanning OFF"
    Write-Host "  - Thunderbird profile: jason-email"
    Write-Host ""

    if (Test-Path $TbExe) {
        if ($profile) {
            Start-Process $TbExe -ArgumentList '-profile', $profile
        } else {
            Start-Process $TbExe
        }
        Start-Sleep -Seconds 2
    }

    $i = 0
    foreach ($login in $registry.logins) {
        $i++
        Write-Host ""
        Write-Host ("--- Account {0}/{1}: {2} ---" -f $i, $registry.logins.Count, $login.display_name)
        Write-Host "Email: $($login.email)"
        Write-Host ""

        if ($login.provider -eq "proton-bridge") {
            if (-not (Test-ProtonBridgeUp)) {
                Write-Host "SKIP: Start Proton Mail Bridge first, then re-run this step."
                continue
            }
            Write-Host "1. Menu -> Account Settings -> Account Actions -> Add Mail Account"
            Write-Host "2. Configure manually:"
            Write-Host "   IMAP  $($login.imap_host):$($login.imap_port)  (STARTTLS/none)"
            Write-Host "   SMTP  $($login.smtp_host):$($login.smtp_port)"
            Write-Host "3. Use Bridge username + Bridge password from the Bridge app"
        } else {
            Write-Host "1. Menu -> Account Settings -> Account Actions -> Add Mail Account"
            Write-Host "2. Enter: $($login.email) -> Continue"
            Write-Host "3. Choose Sign in with Google / OAuth2 (recommended)"
            Write-Host "4. Complete browser sign-in -> Allow -> Finish"
            Write-Host ""
            Write-Host "   Manual fallback (app password): IMAP imap.gmail.com:993 SSL, SMTP smtp.gmail.com:465 SSL"
        }

        Write-Host ""
        $resp = Read-Host "Press Enter when $($login.display_name) Inbox shows mail (or type skip)"
        if ($resp -eq "skip") { continue }
    }

    Write-Host ""
    Write-Host "Optional: View -> Folders -> Unified (combined inbox)"
    Write-Host "Aliases (info@, social@, media@): use Gmail Send mail as on jason@ - no extra accounts."
    Write-Host ""
    Invoke-EmailAudit
}

if ($All) { $Audit = $true; $Mcp = $true; $Thunderbird = $true }
if ($Audit) { Invoke-EmailAudit }
if ($Mcp) { Invoke-McpSetup }
if ($Thunderbird) { Invoke-ThunderbirdGuide }
