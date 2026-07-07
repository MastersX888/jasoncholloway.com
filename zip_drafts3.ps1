$basenames = @(
  'MASTERS_X.docx',
  'MASTERS_FREQUENCY_ANNOTATED.docx',
  'MASTERS_TRILOGY_COMPLETE.docx',
  'MASTERS_TRILOGY_COMPLETE_V2.docx',
  'THE_MASTERS_FREQUENCY_ILLUSTRATED.docx',
  'MASTERS_X_TRILOGY_READTHROUGH.docx',
  'MASTERS_TRILOGY_REVISED_DRAFT.md'
)

$tempDir = "C:\Users\zh577\Downloads\masters_drafts_temp"
New-Item -ItemType Directory -Force -Path $tempDir

$files = Get-ChildItem -Path E:\ -Recurse -Include $basenames -ErrorAction SilentlyContinue

foreach ($f in $files) {
    Copy-Item -LiteralPath $f.FullName -Destination $tempDir -Force
    Write-Host "Copied $($f.FullName)"
}

$dest = "C:\Users\zh577\Downloads\masters_drafts_with_italics.zip"
if (Test-Path $dest) { Remove-Item $dest -Force }
Compress-Archive -Path "$tempDir\*" -DestinationPath $dest -Force
Remove-Item -Recurse -Force $tempDir
Write-Host "Zipped files successfully to $dest"
