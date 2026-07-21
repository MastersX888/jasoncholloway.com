# Generate designed 1000x1500 Pinterest pins (Wave 3 D-01..D-15)
# Usage: .\scripts\generate_pinterest_designed_pins.ps1
# Output: debt_consolidation_handoff/global_penetration_wave1/pinterest-assets/designed/
# Set $env:PINTEREST_FORCE_REGEN = '1' to overwrite existing JPGs

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$cropDir = Join-Path $root 'debt_consolidation_handoff\global_penetration_wave1\pinterest-assets\crops'
$outDir = Join-Path $root 'debt_consolidation_handoff\global_penetration_wave1\pinterest-assets\designed'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$W = 1000
$H = 1500
$cream = [System.Drawing.Color]::FromArgb(245, 240, 232)
$charcoal = [System.Drawing.Color]::FromArgb(26, 26, 26)
$gold = [System.Drawing.Color]::FromArgb(196, 163, 90)
$white = [System.Drawing.Color]::White

$fontSerif = New-Object System.Drawing.Font('Georgia', 52, [System.Drawing.FontStyle]::Regular)
$fontSerifBold = New-Object System.Drawing.Font('Georgia', 48, [System.Drawing.FontStyle]::Bold)
$fontSerifLarge = New-Object System.Drawing.Font('Georgia', 64, [System.Drawing.FontStyle]::Bold)
$fontSans = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Regular)
$fontSansSmall = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)
$fontFooter = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Regular)

function Get-CenteredRect {
  param([System.Drawing.Graphics]$g, [string]$text, [System.Drawing.Font]$font, [int]$y, [int]$maxWidth)
  $size = $g.MeasureString($text, $font, $maxWidth)
  $x = [int](($maxWidth - $size.Width) / 2)
  return New-Object System.Drawing.RectangleF($x, $y, $maxWidth, $size.Height)
}

function Draw-WrappedCentered {
  param(
    [System.Drawing.Graphics]$g,
    [string]$text,
    [System.Drawing.Font]$font,
    [System.Drawing.Brush]$brush,
    [int]$y,
    [int]$maxWidth
  )
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Near
  $rect = New-Object System.Drawing.RectangleF(40, $y, ($maxWidth - 80), 400)
  $g.DrawString($text, $font, $brush, $rect, $format)
  return $g.MeasureString($text, $font, ($maxWidth - 80), $format).Height
}

function Load-BitmapFromUrlOrCrop {
  param([string]$cropId, [string]$url)

  $cropPath = Join-Path $cropDir ($cropId + '.jpg')
  if (Test-Path $cropPath) {
    return [System.Drawing.Bitmap]::FromFile($cropPath)
  }

  $tmp = Join-Path $env:TEMP ("pin-design-" + [guid]::NewGuid().ToString() + '.jpg')
  try {
    Invoke-WebRequest -Uri $url -OutFile $tmp -UseBasicParsing
    $img = [System.Drawing.Image]::FromFile($tmp)
    $maxDim = 2400
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
    $img.Dispose()
    return $bmp
  } finally {
    if (Test-Path $tmp) { Remove-Item $tmp -Force -ErrorAction SilentlyContinue }
  }
}

function Save-DesignedPin {
  param([System.Drawing.Bitmap]$bmp, [string]$id)
  $path = Join-Path $outDir ($id + '.jpg')
  if ((Test-Path $path) -and -not $env:PINTEREST_FORCE_REGEN) {
    Write-Host "  skip $id (exists)"
    $bmp.Dispose()
    return $path
  }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()
  Write-Host "  -> $path"
  return $path
}

function New-TemplateA {
  param(
    [string]$id,
    [string]$cropId,
    [string]$url,
    [string]$headline,
    [string]$subline
  )

  $src = Load-BitmapFromUrlOrCrop -cropId $cropId -url $url
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($src, 0, 0, $W, $H)
  $src.Dispose()

  $overlayH = [int]($H * 0.28)
  $overlayY = $H - $overlayH - 120
  $overlay = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, $overlayY)),
    (New-Object System.Drawing.Point(0, ($overlayY + $overlayH))),
    [System.Drawing.Color]::FromArgb(200, 0, 0, 0),
    [System.Drawing.Color]::FromArgb(230, 0, 0, 0)
  )
  $g.FillRectangle($overlay, 0, $overlayY, $W, $overlayH)
  $overlay.Dispose()

  $brushWhite = New-Object System.Drawing.SolidBrush($white)
  $brushGold = New-Object System.Drawing.SolidBrush($gold)
  $y = $overlayY + 40
  $h1 = Draw-WrappedCentered -g $g -text $headline -font $fontSerifBold -brush $brushWhite -y $y -maxWidth $W
  $sfCenter = New-Object System.Drawing.StringFormat
  $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($subline, $fontSans, $brushGold, (New-Object System.Drawing.RectangleF(0, ($y + $h1 + 16), $W, 40)), $sfCenter)
  $g.DrawString('jasoncholloway.com', $fontFooter, $brushGold, (New-Object System.Drawing.RectangleF(0, ($H - 100), $W, 30)), $sfCenter)
  $sfCenter.Dispose()

  $brushWhite.Dispose()
  $brushGold.Dispose()
  $g.Dispose()
  Save-DesignedPin -bmp $bmp -id $id
}

function New-TemplateB {
  param(
    [string]$id,
    [string]$cropId,
    [string]$url,
    [string]$compLine,
    [string]$titleLine
  )

  $src = Load-BitmapFromUrlOrCrop -cropId $cropId -url $url
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.Clear($charcoal)

  $brushWhite = New-Object System.Drawing.SolidBrush($white)
  $brushGold = New-Object System.Drawing.SolidBrush($gold)
  $sfCenter = New-Object System.Drawing.StringFormat
  $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center

  $g.DrawString($compLine, $fontSans, $brushGold, (New-Object System.Drawing.RectangleF(40, 120, ($W - 80), 60)), $sfCenter)

  $coverMaxH = [int]($H * 0.55)
  $coverMaxW = [int]($W * 0.72)
  $ratio = [Math]::Min($coverMaxW / $src.Width, $coverMaxH / $src.Height)
  $cw = [Math]::Max(1, [int]($src.Width * $ratio))
  $ch = [Math]::Max(1, [int]($src.Height * $ratio))
  $cx = [int](($W - $cw) / 2)
  $cy = 220
  $g.DrawImage($src, $cx, $cy, $cw, $ch)
  $src.Dispose()

  $titleY = $cy + $ch + 48
  Draw-WrappedCentered -g $g -text $titleLine -font $fontSerifBold -brush $brushWhite -y $titleY -maxWidth $W | Out-Null
  $g.DrawString('Available now · Kindle · Paperback · Hardcover', $fontSansSmall, $brushGold, (New-Object System.Drawing.RectangleF(0, ($H - 140), $W, 30)), $sfCenter)
  $g.DrawString('jasoncholloway.com', $fontFooter, $brushGold, (New-Object System.Drawing.RectangleF(0, ($H - 100), $W, 30)), $sfCenter)
  $sfCenter.Dispose()

  $brushWhite.Dispose()
  $brushGold.Dispose()
  $g.Dispose()
  Save-DesignedPin -bmp $bmp -id $id
}

function New-TemplateC {
  param(
    [string]$id,
    [string]$headline,
    [string]$subline
  )

  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear($cream)

  $pen = New-Object System.Drawing.Pen($gold, 2)
  $brushDark = New-Object System.Drawing.SolidBrush($charcoal)
  $brushGold = New-Object System.Drawing.SolidBrush($gold)

  $y = 520
  $h1 = Draw-WrappedCentered -g $g -text $headline -font $fontSerifLarge -brush $brushDark -y $y -maxWidth $W
  $ruleY = [int]($y + $h1 + 40)
  $g.DrawLine($pen, 300, $ruleY, 700, $ruleY)
  Draw-WrappedCentered -g $g -text $subline -font $fontSans -brush $brushGold -y ($ruleY + 30) -maxWidth $W | Out-Null
  $sfCenter = New-Object System.Drawing.StringFormat
  $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString('jasoncholloway.com', $fontFooter, $brushGold, (New-Object System.Drawing.RectangleF(0, ($H - 100), $W, 30)), $sfCenter)
  $sfCenter.Dispose()

  $pen.Dispose()
  $brushDark.Dispose()
  $brushGold.Dispose()
  $g.Dispose()
  Save-DesignedPin -bmp $bmp -id $id
}

function New-TemplateD {
  param(
    [string]$id,
    [string]$cropId,
    [string]$url,
    [string]$location,
    [string]$headline
  )

  $src = Load-BitmapFromUrlOrCrop -cropId $cropId -url $url
  $bmp = New-Object System.Drawing.Bitmap($W, $H)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  $imageH = [int]($H * 0.65)
  $g.DrawImage($src, 0, 0, $W, $imageH)
  $src.Dispose()

  $panelY = $imageH
  $panelH = $H - $imageH
  $g.FillRectangle((New-Object System.Drawing.SolidBrush($cream)), 0, $panelY, $W, $panelH)

  $brushDark = New-Object System.Drawing.SolidBrush($charcoal)
  $brushGold = New-Object System.Drawing.SolidBrush($gold)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center

  $g.DrawString($location.ToUpper(), $fontSansSmall, $brushGold, (New-Object System.Drawing.RectangleF(0, ($panelY + 36), $W, 30)), $sf)
  Draw-WrappedCentered -g $g -text $headline -font $fontSerif -brush $brushDark -y ($panelY + 80) -maxWidth $W | Out-Null
  $g.DrawString('jasoncholloway.com', $fontFooter, $brushGold, (New-Object System.Drawing.RectangleF(0, ($H - 80), $W, 30)), $sf)

  $brushDark.Dispose()
  $brushGold.Dispose()
  $sf.Dispose()
  $g.Dispose()
  Save-DesignedPin -bmp $bmp -id $id
}

Write-Host 'Generating Wave 3 designed pins D-01..D-15 ...'

New-TemplateA -id 'D-01' -cropId 'voynich-f1r' -url 'https://jasoncholloway.com/folios/voynich/Vol%201/voynich-004.jpg' `
  -headline '600 Years. Still Undeciphered.' -subline 'Beinecke MS 408 · folio f1r'

New-TemplateA -id 'D-02' -cropId 'voynich-rosette' -url 'https://jasoncholloway.com/folios/voynich/Vol%204/f85v-86r.jpg' `
  -headline 'The Great Rosette Foldout' -subline 'Beinecke MS 408 · f85v-86r'

New-TemplateC -id 'D-03' -headline 'Rudolf II Paid 600 Gold Ducats' -subline 'Voynich Manuscript · Real History Field Note'

New-TemplateD -id 'D-04' -cropId 'strahov-og' -url 'https://jasoncholloway.com/og/field-notes/strahov-monastery.png' `
  -location 'Strahov Monastery · Prague' -headline 'Europe''s Most Beautiful Baroque Library'

New-TemplateD -id 'D-05' -cropId 'strahov-og' -url 'https://jasoncholloway.com/og/field-notes/strahov-monastery.png' `
  -location 'Prague · Central Europe' -headline 'Hidden Prague: Beyond the Tourist Trail'

New-TemplateA -id 'D-06' -cropId 'ars-notoria-3' -url 'https://jasoncholloway.com/folios/arsnotoria/Ars_Notoria_Screenshot_3.png' `
  -headline 'Medieval Cognitive Technology' -subline 'Ars Notoria · Field Note'

New-TemplateB -id 'D-07' -cropId 'omnibus-hc' -url 'https://jasoncholloway.com/covers/omnibus-hardcover-v3.png' `
  -compLine 'For readers of Eco, Kostova, and Crouch' -titleLine 'Three Manuscripts. Seven Cities. One System.'

New-TemplateB -id 'D-08' -cropId 'book1-pb' -url 'https://jasoncholloway.com/covers/book1-paperback.png' `
  -compLine 'For readers of Foucault''s Pendulum' -titleLine 'Kansas City to Prague. One Frequency.'

New-TemplateC -id 'D-09' -headline 'Books Like Foucault''s Pendulum' -subline 'Literary Conspiracy Thrillers · Free Readalike List'

New-TemplateC -id 'D-10' -headline 'Get the Opening Chapters Free' -subline 'Masters X Vol I · Delivered by Email'

New-TemplateC -id 'D-11' -headline 'What Happens at 111 Hz?' -subline 'Ancient Stone Chambers · Real Archaeoacoustics'

New-TemplateA -id 'D-12' -cropId 'cymatics-og' -url 'https://jasoncholloway.com/og/field-notes/cymatics.png' `
  -headline 'Sound You Can See. Real Physics.' -subline 'Cymatics · Chladni Figures Since 1787'

New-TemplateA -id 'D-13' -cropId 'voynich-f27r' -url 'https://jasoncholloway.com/folios/voynich/Vol%202/voynich2-000.jpg' `
  -headline 'Voynich Astronomical Section' -subline 'Beinecke MS 408 · folio f27r'

New-TemplateD -id 'D-14' -cropId 'codex-gigas-og' -url 'https://jasoncholloway.com/og/field-notes/codex-gigas.png' `
  -location 'Medieval Bohemia · Codex Gigas' -headline 'The Devil''s Bible - Codex Gigas'

New-TemplateA -id 'D-15' -cropId 'ars-notoria-5' -url 'https://jasoncholloway.com/folios/arsnotoria/Ars_Notoria_Screenshot_5.png' `
  -headline 'Hexagonal Geometry in a Grimoire' -subline 'Harmonic Stack · Analysis Chamber'

Write-Host ('Done. Designed pins in ' + $outDir)
