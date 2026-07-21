# Generate 1000x1500 Pinterest pin JPGs (center crop 2:3) from manifest
# Usage: .\scripts\generate_pinterest_pin_images.ps1
# Output: debt_consolidation_handoff/global_penetration_wave1/pinterest-assets/crops/

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$manifestPath = Join-Path $root 'debt_consolidation_handoff\global_penetration_wave1\pinterest-media-manifest.json'
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$outDir = Join-Path $root 'debt_consolidation_handoff\global_penetration_wave1\pinterest-assets\crops'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$targetW = $manifest.pinSize.width
$targetH = $manifest.pinSize.height
$cream = [System.Drawing.Color]::FromArgb(245, 240, 232)

function Import-BitmapViaWpf {
  param([string]$Path, [int]$DecodePixelWidth = 2400)

  Add-Type -AssemblyName PresentationCore
  $uri = New-Object Uri((Resolve-Path $Path).Path)
  $bi = New-Object System.Windows.Media.Imaging.BitmapImage
  $bi.BeginInit()
  $bi.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
  $bi.UriSource = $uri
  $bi.DecodePixelWidth = $DecodePixelWidth
  $bi.EndInit()
  $bi.Freeze()

  $tmpJpg = Join-Path $env:TEMP ("pin-wpf-" + [guid]::NewGuid().ToString() + ".jpg")
  $enc = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
  $enc.QualityLevel = 90
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bi))
  $fs = [System.IO.File]::OpenWrite($tmpJpg)
  try { $enc.Save($fs) } finally { $fs.Close() }
  return [System.Drawing.Bitmap]::FromFile($tmpJpg)
}

function Load-ScaledBitmap {
  param([string]$path, [int]$maxDim = 2400)

  try {
    $img = [System.Drawing.Image]::FromFile($path)
    try {
      if ($img.Width -le $maxDim -and $img.Height -le $maxDim) {
        return New-Object System.Drawing.Bitmap($img)
      }
      $ratio = [Math]::Min($maxDim / $img.Width, $maxDim / $img.Height)
      $nw = [Math]::Max(1, [int]($img.Width * $ratio))
      $nh = [Math]::Max(1, [int]($img.Height * $ratio))
      $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.DrawImage($img, 0, 0, $nw, $nh)
      $g.Dispose()
      return $bmp
    } finally {
      $img.Dispose()
    }
  } catch {
    Write-Host "  (WPF fallback for large image)"
    return Import-BitmapViaWpf -Path $path -DecodePixelWidth $maxDim
  }
}

function Save-PinterestCrop {
  param([System.Drawing.Bitmap]$bmp, [string]$destPath)

  $dest = New-Object System.Drawing.Bitmap($targetW, $targetH)
  $g = [System.Drawing.Graphics]::FromImage($dest)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.Clear($cream)

  $srcW = $bmp.Width
  $srcH = $bmp.Height
  $targetRatio = $targetW / $targetH
  $srcRatio = $srcW / $srcH

  if ($srcRatio -gt $targetRatio) {
    $cropH = $srcH
    $cropW = [int]($srcH * $targetRatio)
    $x = [int](($srcW - $cropW) / 2)
    $y = 0
  } else {
    $cropW = $srcW
    $cropH = [int]($srcW / $targetRatio)
    $x = 0
    $y = [int](($srcH - $cropH) / 2)
  }

  $srcRect = New-Object System.Drawing.Rectangle($x, $y, $cropW, $cropH)
  $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
  $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $dest.Dispose()
}

$generated = @()

foreach ($source in $manifest.sources) {
  $destPath = Join-Path $outDir ($source.id + '.jpg')
  if ((Test-Path $destPath) -and -not $env:PINTEREST_FORCE_REGEN) {
    Write-Host "[$($source.id)] skip (exists)"
    $generated += [pscustomobject]@{
      id = $source.id
      url = $source.url
      output = $destPath
      pins = $source.pins
    }
    continue
  }
  Write-Host "[$($source.id)] $($source.url)"
  $tmp = Join-Path $env:TEMP ("pin-src-" + [guid]::NewGuid().ToString())
  try {
    Invoke-WebRequest -Uri $source.url -OutFile $tmp -UseBasicParsing
    $ext = [System.IO.Path]::GetExtension($source.url)
    if ($ext -and -not [System.IO.Path]::GetExtension($tmp)) {
      $tmpWithExt = $tmp + $ext
      Move-Item $tmp $tmpWithExt -Force
      $tmp = $tmpWithExt
    }
    $bmp = Load-ScaledBitmap -path $tmp
    Save-PinterestCrop -bmp $bmp -destPath $destPath
    $bmp.Dispose()
    Write-Host "  -> $destPath"
    $generated += [pscustomobject]@{
      id = $source.id
      url = $source.url
      output = $destPath
      pins = $source.pins
    }
  } catch {
    Write-Warning "  FAILED $($source.id): $_"
  } finally {
    if (Test-Path $tmp) { Remove-Item $tmp -Force -ErrorAction SilentlyContinue }
  }
}

$indexPath = Join-Path (Split-Path $outDir -Parent) 'crops-index.json'
$generated | ConvertTo-Json -Depth 4 | Set-Content $indexPath -Encoding UTF8
Write-Host "Done. $($generated.Count) crops in $outDir"
Write-Host "Index: $indexPath"
