# Shared helpers for email setup scripts.

function Get-EmailRegistry {
    param([string]$Path = (Join-Path $PSScriptRoot "email-accounts.registry.json"))
    if (-not (Test-Path $Path)) { throw "Registry not found: $Path" }
    return Get-Content $Path -Raw | ConvertFrom-Json
}

function Parse-EmailSecretsFile {
    param([string]$Path)
    $accounts = @()
    $current = $null
    foreach ($line in Get-Content $Path) {
        $t = $line.Trim()
        if ($t -eq "" -or $t.StartsWith("#")) { continue }
        if ($t -eq "---") {
            if ($null -ne $current -and $current.id -and $current.email -and $current.password) {
                $accounts += [PSCustomObject]$current
            }
            $current = @{ id = ""; email = ""; password = ""; imap_host = ""; imap_port = 993; smtp_host = ""; smtp_port = 465; provider = "" }
            continue
        }
        if ($t -match "^([^=]+)=(.*)$") {
            $key = $Matches[1].Trim().ToLower()
            $val = $Matches[2].Trim()
            if ($null -eq $current) {
                $current = @{ id = ""; email = ""; password = ""; imap_host = ""; imap_port = 993; smtp_host = ""; smtp_port = 465; provider = "" }
            }
            switch ($key) {
                "name"       { $current.id = $val }
                "email"      { $current.email = $val }
                "password"   { $current.password = ($val -replace '\s', '') }
                "imap_host"  { $current.imap_host = $val }
                "imap_port"  { $current.imap_port = [int]$val }
                "smtp_host"  { $current.smtp_host = $val }
                "smtp_port"  { $current.smtp_port = [int]$val }
                "provider"   { $current.provider = $val }
            }
        }
    }
    if ($null -ne $current -and $current.id -and $current.email -and $current.password) {
        $accounts += [PSCustomObject]$current
    }
    return $accounts
}

function Get-ThunderbirdProfilePath {
    param([string]$PreferredName = "jason-email")
    $ini = Join-Path $env:APPDATA "Thunderbird\profiles.ini"
    if (-not (Test-Path $ini)) { return $null }

    $lines = Get-Content $ini
    $sections = @{}
    $current = $null
    foreach ($line in $lines) {
        if ($line -match '^\[(.+)\]$') {
            $current = $Matches[1]
            $sections[$current] = @{}
        } elseif ($null -ne $current -and $line -match '^([^=]+)=(.*)$') {
            $sections[$current][$Matches[1]] = $Matches[2]
        }
    }

    foreach ($section in $sections.Keys) {
        $pathRel = $sections[$section]["Path"]
        if ($pathRel -and $pathRel -like "*$PreferredName*") {
            return Join-Path (Join-Path $env:APPDATA "Thunderbird") $pathRel
        }
    }

    $latest = Get-ChildItem (Join-Path $env:APPDATA "Thunderbird\Profiles") -Directory -ErrorAction SilentlyContinue |
        Where-Object { Test-Path (Join-Path $_.FullName "prefs.js") } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1
    if ($latest) { return $latest.FullName }
    return $null
}

function Get-ThunderbirdConfiguredEmails {
    param([string]$ProfilePath)
    if (-not $ProfilePath) { return @() }
    $prefs = Join-Path $ProfilePath "prefs.js"
    if (-not (Test-Path $prefs)) { return @() }
    $emails = Select-String -Path $prefs -Pattern 'mail\.server\.server\d+\.username", "(.+)"' -AllMatches |
        ForEach-Object { $_.Matches } |
        ForEach-Object { $_.Groups[1].Value } |
        Where-Object { $_ -and $_ -ne "nobody" -and $_ -notlike "Local*" } |
        Select-Object -Unique
    return @($emails)
}

function Test-ProtonBridgeUp {
    try {
        return (Test-NetConnection -ComputerName 127.0.0.1 -Port 1143 -WarningAction SilentlyContinue).TcpTestSucceeded
    } catch { return $false }
}

function Write-EmailBanner {
    param([string]$Title)
    Write-Host ""
    Write-Host ("=" * 60)
    Write-Host $Title
    Write-Host ("=" * 60)
}
