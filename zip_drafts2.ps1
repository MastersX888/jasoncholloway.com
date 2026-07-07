$files = @(
  "E:\Mastersx_Trilogy\MASTERS_X.docx",
  "E:\Mastersx_Trilogy\MASTERS_FREQUENCY_ANNOTATED.docx",
  "E:\Mastersx_Trilogy\MASTERS_TRILOGY_COMPLETE.docx",
  "E:\Mastersx_Trilogy\archive\backups\MASTERS_TRILOGY_COMPLETE_V2.docx",
  "E:\Mastersx_Trilogy\THE_MASTERS_FREQUENCY_ILLUSTRATED.docx",
  "E:\Masters_X_Trilogy_Archive\Final_Manuscripts\MASTERS_X_TRILOGY_READTHROUGH.docx",
  "E:\Mastersx_Trilogy\archive\old_drafts\MASTERS_TRILOGY_REVISED_DRAFT.md"
)
$tempDir = "C:\Users\zh577\Downloads\masters_drafts_temp"
New-Item -ItemType Directory -Force -Path $tempDir

foreach ($f in $files) {
    if (Test-Path -LiteralPath $f) {
        Copy-Item -LiteralPath $f -Destination $tempDir -Force
        Write-Host "Copied $f"
    } else {
        Write-Host "File not found: $f"
    }
}

$dest = "C:\Users\zh577\Downloads\masters_drafts_with_italics.zip"
if (Test-Path $dest) { Remove-Item $dest -Force }
Compress-Archive -Path "$tempDir\*" -DestinationPath $dest -Force
Remove-Item -Recurse -Force $tempDir
Write-Host "Zipped files successfully to $dest"
