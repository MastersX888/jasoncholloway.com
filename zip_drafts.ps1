$files = @(
  "E:\Mastersx_Trilogy\MASTERS_X.docx",
  "E:\Mastersx_Trilogy\MASTERS_FREQUENCY_ANNOTATED.docx",
  "E:\Mastersx_Trilogy\MASTERS_TRILOGY_COMPLETE.docx",
  "E:\Mastersx_Trilogy\archive\backups\MASTERS_TRILOGY_COMPLETE_V2.docx",
  "E:\Mastersx_Trilogy\THE_MASTERS_FREQUENCY_ILLUSTRATED.docx",
  "E:\Masters_X_Trilogy_Archive\Final_Manuscripts\MASTERS_X_TRILOGY_READTHROUGH.docx",
  "E:\Mastersx_Trilogy\archive\old_drafts\MASTERS_TRILOGY_REVISED_DRAFT.md"
)
$dest = "C:\Users\zh577\Downloads\masters_drafts_with_italics.zip"

Compress-Archive -Path $files -DestinationPath $dest -Force
Write-Host "Zipped files successfully to $dest"
