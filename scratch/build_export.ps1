# Build static export in a temp dir (avoids EBUSY when workspace roots on /out).
$ErrorActionPreference = "Stop"
$src = "C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
$tmp = Join-Path $env:TEMP "jch-site-build"
$liveOut = Join-Path $src "out"

if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
New-Item -ItemType Directory -Path $tmp | Out-Null

$copy = @(
  "app", "components", "content", "lib", "public", "fonts",
  "package.json", "package-lock.json", "next.config.ts", "next-env.d.ts",
  "tsconfig.json", "eslint.config.mjs"
)
foreach ($item in $copy) {
  $from = Join-Path $src $item
  if (-not (Test-Path $from)) { continue }
  $to = Join-Path $tmp $item
  # Junction large/static trees instead of copying (saves ~200MB+ on low-disk systems).
  if ($item -in @('public', 'fonts', 'node_modules')) {
    New-Item -ItemType Junction -Path $to -Target $from | Out-Null
  } else {
    Copy-Item $from $to -Recurse -Force
  }
}
if (-not (Test-Path (Join-Path $tmp 'node_modules'))) {
  New-Item -ItemType Junction -Path (Join-Path $tmp 'node_modules') -Target (Join-Path $src 'node_modules') | Out-Null
}

Push-Location $tmp
try {
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "npm run build failed with exit $LASTEXITCODE" }

  $builtOut = Join-Path $tmp "out"
  if (-not (Test-Path $builtOut)) { throw "Build did not produce out/" }

  # Merge into live out without deleting the directory root.
  Get-ChildItem $builtOut -Force | ForEach-Object {
    $dest = Join-Path $liveOut $_.Name
    if ($_.PSIsContainer) {
      if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
      Copy-Item $_.FullName $dest -Recurse -Force
    } else {
      Copy-Item $_.FullName $dest -Force
    }
  }
  Write-Host "BUILD OK - merged into $liveOut"
} finally {
  Pop-Location
}
