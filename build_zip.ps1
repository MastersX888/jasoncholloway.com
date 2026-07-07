$sourceDir = "c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\handoff_package"
$scratchDir = "c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
$downloads = "C:\Users\zh577\Downloads"

# Copy the requested files into the handoff package directory
Copy-Item "$scratchDir\fonts\JasonCHolloway.png" -Destination "$sourceDir\JasonCHolloway.png" -Force
Copy-Item "$scratchDir\scratch\FOGRA39L_coated.icc" -Destination "$sourceDir\FOGRA39L_coated.icc" -Force
Copy-Item "$downloads\9798295884412-Jacket (1).pdf" -Destination "$sourceDir\9798295884412-Jacket.pdf" -Force
Copy-Item "$scratchDir\RealESRGAN_x4plus.pth" -Destination "$sourceDir\RealESRGAN_x4plus.pth" -Force
Copy-Item "$scratchDir\MASTERS_X_INGRAM_SLICED.pdf" -Destination "$sourceDir\MASTERS_X_INGRAM_FINAL_PRINT.pdf" -Force

# Re-zip the package
$newZip = "$downloads\MASTERS_X_COVER_HANDOFF_PACKAGE_v2.zip"
if (Test-Path $newZip) { Remove-Item $newZip }
Compress-Archive -Path "$sourceDir\*" -DestinationPath $newZip -Force
Write-Host "Zip assembly complete: $newZip"
