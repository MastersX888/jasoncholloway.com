# Builds a self-contained TheBridge.html for offline/local use (inlines cycles engine)
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$public = Join-Path $root "public"
$html = Get-Content (Join-Path $public "index.html") -Raw -Encoding UTF8
$cycles = Get-Content (Join-Path $public "cycles-engine.js") -Raw -Encoding UTF8
$pattern = '(?s)<script src="cycles-engine\.js"></script>\s*<script src="cycles-engine-fallback\.js"></script>'
$replacement = "<script>`n$cycles`n</script>"
$standalone = [regex]::Replace($html, $pattern, $replacement)
$out = Join-Path $env:USERPROFILE "Downloads\TheBridge.html"
Set-Content $out $standalone -Encoding UTF8 -NoNewline
Write-Host "Wrote standalone: $out"
