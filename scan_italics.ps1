$outputFile = "c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway\italics_report.txt"
Add-Type -AssemblyName System.IO.Compression.FileSystem

$files = Get-ChildItem -Path "E:\Masters_X_Trilogy_Archive", "E:\Mastersx_Trilogy" -Recurse -Include *.docx, *.md -ErrorAction SilentlyContinue

$results = @()

foreach ($f in $files) {
    if ($f.Extension -eq '.docx') {
        try {
            $zip = [System.IO.Compression.ZipFile]::OpenRead($f.FullName)
            $docXmlEntry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
            if ($docXmlEntry) {
                $stream = $docXmlEntry.Open()
                $reader = New-Object System.IO.StreamReader($stream)
                $content = $reader.ReadToEnd()
                $count = ([regex]::Matches($content, '<w:i/>|<w:i\b')).Count
                if ($count -gt 0) {
                    $results += [PSCustomObject]@{ File = $f.FullName; ItalicsCount = $count }
                }
                $reader.Close()
                $stream.Close()
            }
            $zip.Dispose()
        } catch {}
    } elseif ($f.Extension -eq '.md') {
        try {
            $content = Get-Content $f.FullName -Raw
            $count = ([regex]::Matches($content, '(?<!\\)_[^_]+_(?<!\\)|\*[^\*]+\*')).Count
            if ($count -gt 0) {
                $results += [PSCustomObject]@{ File = $f.FullName; ItalicsCount = $count }
            }
        } catch {}
    }
}

$results | Sort-Object ItalicsCount -Descending | Select-Object -First 40 | Format-Table -AutoSize | Out-File -FilePath $outputFile -Encoding utf8
Write-Host "Scan completed."
