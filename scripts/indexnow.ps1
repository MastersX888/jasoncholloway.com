# IndexNow setup and sitemap submission for static Cloudflare Pages sites.
#
# Usage:
#   .\scripts\indexnow.ps1 -Action install-key -Key "your-key" -SiteRoot .
#   .\scripts\indexnow.ps1 -Action submit-sitemap -Key "your-key" -Domain jasoncholloway.com
#   .\scripts\indexnow.ps1 -Action submit-all -Key "your-key" -Domain jasoncholloway.com

param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("install-key", "submit-sitemap", "submit-all")]
  [string]$Action,

  [Parameter(Mandatory = $true)]
  [string]$Key,

  [string]$SiteRoot = ".",
  [string]$Domain = "jasoncholloway.com"
)

$ErrorActionPreference = "Stop"

$IndexNowPartnerEndpoints = @(
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
  "https://search.seznam.cz/indexnow",
  "https://searchadvisor.naver.com/indexnow",
  "https://indexnow.yep.com/indexnow"
)

function Install-IndexNowKey {
  param([string]$Root, [string]$ApiKey, [string]$SiteDomain)

  if ($ApiKey -notmatch '^[a-zA-Z0-9-]{8,128}$') {
    throw "Key must be 8-128 alphanumeric or hyphen characters."
  }

  $publicDir = Join-Path $Root "public"
  if (-not (Test-Path $publicDir)) {
    throw "public/ not found under $Root"
  }

  $keyPath = Join-Path $publicDir "$ApiKey.txt"
  [System.IO.File]::WriteAllText($keyPath, $ApiKey, [System.Text.UTF8Encoding]::new($false))
  Write-Host "Wrote $keyPath"
  Write-Host "After deploy, verify: https://$SiteDomain/$ApiKey.txt"
}

function Submit-IndexNowSitemap {
  param([string]$ApiKey, [string]$SiteDomain)

  $sitemapUrl = "https://$SiteDomain/sitemap.xml"
  Write-Host "Fetching $sitemapUrl"

  $xml = Invoke-RestMethod -Uri $sitemapUrl -Method Get
  $ns = @{ sm = "http://www.sitemaps.org/schemas/sitemap/0.9" }
  $urlNodes = Select-Xml -Xml $xml -XPath "//sm:url/sm:loc" -Namespace $ns

  if (-not $urlNodes) {
    throw "No URLs found in sitemap."
  }

  $urlList = @($urlNodes | ForEach-Object { $_.Node.InnerText.Trim() })
  Write-Host "Submitting $($urlList.Count) URL(s) to IndexNow"

  $keyLocation = "https://$SiteDomain/$ApiKey.txt"
  $body = @{
    host        = $SiteDomain
    key         = $ApiKey
    keyLocation = $keyLocation
    urlList     = $urlList
  } | ConvertTo-Json -Depth 4

  try {
    $response = Invoke-WebRequest `
      -Uri "https://api.indexnow.org/IndexNow" `
      -Method Post `
      -ContentType "application/json; charset=utf-8" `
      -Body $body `
      -UseBasicParsing
    Write-Host "IndexNow response: $($response.StatusCode) $($response.StatusDescription)"
  } catch {
    if ($_.Exception.Response) {
      $status = [int]$_.Exception.Response.StatusCode
      Write-Host "IndexNow response: $status"
      if ($status -eq 202) {
        Write-Host "Accepted (202) - URLs queued for crawling."
        return
      }
    }
    throw
  }
}

function Ping-IndexNowPartners {
  param([string]$ApiKey, [string]$SiteDomain)

  $targets = @(
    "https://$SiteDomain/",
    "https://$SiteDomain/sitemap.xml"
  )

  foreach ($url in $targets) {
    foreach ($endpoint in $IndexNowPartnerEndpoints) {
      $ping = "$endpoint?url=$([uri]::EscapeDataString($url))&key=$ApiKey"
      try {
        $response = Invoke-WebRequest -Uri $ping -UseBasicParsing -Method Get
        Write-Host "Partner $($response.StatusCode) $endpoint -> $url"
      } catch {
        if ($_.Exception.Response) {
          $status = [int]$_.Exception.Response.StatusCode
          Write-Host "Partner $status $endpoint -> $url"
        } else {
          Write-Host "Partner ERR $endpoint -> $url"
        }
      }
      Start-Sleep -Milliseconds 250
    }
  }

  $sitemapUrl = "https://$SiteDomain/sitemap.xml"
  $yandexPing = "https://webmaster.yandex.com/ping?sitemap=$([uri]::EscapeDataString($sitemapUrl))"
  try {
    $response = Invoke-WebRequest -Uri $yandexPing -UseBasicParsing -Method Get
    Write-Host "Yandex sitemap ping: $($response.StatusCode)"
  } catch {
    if ($_.Exception.Response) {
      Write-Host "Yandex sitemap ping: $([int]$_.Exception.Response.StatusCode)"
    }
  }
}

function Submit-IndexNowAll {
  param([string]$ApiKey, [string]$SiteDomain)

  Submit-IndexNowSitemap -ApiKey $ApiKey -SiteDomain $SiteDomain
  Ping-IndexNowPartners -ApiKey $ApiKey -SiteDomain $SiteDomain
}

$resolvedRoot = Resolve-Path $SiteRoot

switch ($Action) {
  "install-key" {
    Install-IndexNowKey -Root $resolvedRoot -ApiKey $Key -SiteDomain $Domain
  }
  "submit-sitemap" {
    Submit-IndexNowSitemap -ApiKey $Key -SiteDomain $Domain
  }
  "submit-all" {
    Submit-IndexNowAll -ApiKey $Key -SiteDomain $Domain
  }
}
