$logPath = "C:\Users\zh577\.gemini\antigravity\brain\ca8ee1ef-36dc-4e75-80a4-3f7d85bcb345\.system_generated\tasks\task-12.log"
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

$lines = Get-Content $logPath
foreach ($line in $lines) {
    $line = $line.Trim()
    foreach ($basename in $basenames) {
        if ($line.EndsWith($basename) -and (Test-Path -LiteralPath $line)) {
            Write-Host "Copying $line"
            Copy-Item -LiteralPath $line -Destination $tempDir -Force
        }
    }
}

$dest = "C:\Users\zh577\Downloads\masters_drafts_with_italics.zip"
if (Test-Path $dest) { Remove-Item $dest -Force }
Compress-Archive -Path "$tempDir\*" -DestinationPath $dest -Force
Remove-Item -Recurse -Force $tempDir
Write-Host "Zipped files successfully to $dest"
