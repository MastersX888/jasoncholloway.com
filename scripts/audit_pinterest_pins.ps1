# Wave 1 + Wave 2 pin audit — 18 canonical pins after URL dedup (Jul 2026)
# Policy: one pin per destination URL per board
$ids = @(
  # Voynich (2 — one per unique link)
  '1110700326880453135','1110700326880453757',
  # Prague (4)
  '1110700326880448119','1110700326880448374','1110700326880454182','1110700326880464325',
  # Literary (8)
  '1110700326880448173','1110700326880448186','1110700326880448412','1110700326880448451','1110700326880448473','1110700326880448479',
  '1110700326880462578','1110700326880464249',
  # Frequency & Esoteric History (4)
  '1110700326880460730','1110700326880461337','1110700326880461590','1110700326880461948'
)
$rows = @()
foreach ($id in $ids) {
  try {
    $html = (Invoke-WebRequest -Uri "https://www.pinterest.com/pin/$id/" -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0' }).Content
    $link = if ($html -match '"link":\s*"(https://jasoncholloway[^"\\]+)"') { $Matches[1] -replace '\\u0026','&' } else { 'NO_LINK' }
    $title = if ($html -match '"title":\s*"([^"]{1,200})"') { $Matches[1] } else { '' }
    $desc = if ($html -match '"description":\s*"([^"]{1,200})"') { $Matches[1] } else { '' }
    $rows += [PSCustomObject]@{ id = $id; title = $title; description = $desc; link = $link }
    Write-Output "$id`t$title`t$desc"
  } catch {
    Write-Output "$id`tERROR`t$($_.Exception.Message)"
  }
  Start-Sleep -Milliseconds 300
}
Write-Output '---DUPLICATES---'
$groups = $rows | Where-Object { $_.link -ne 'NO_LINK' } | Group-Object { ($_.link -split '\?')[0] }
foreach ($g in $groups) {
  if ($g.Count -gt 1) {
    $keep = ($g.Group | Sort-Object id | Select-Object -First 1).id
    $delete = ($g.Group | Where-Object { $_.id -ne $keep } | ForEach-Object { $_.id }) -join ','
    Write-Output "$($g.Name) => keep $keep ; delete $delete"
  }
}
Write-Output "---MISSING METADATA---"
foreach ($r in $rows) {
  if (-not $r.title -or -not $r.description) {
    Write-Output "$($r.id) missing: title=$([bool]$r.title) desc=$([bool]$r.description)"
  }
}
