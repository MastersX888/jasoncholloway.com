$ErrorActionPreference = "Stop"

$BASE = Split-Path -Parent $PSScriptRoot
if (-not $BASE) { $BASE = "c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway" }
$OVERLAID_DIR = Join-Path $BASE "public\social\imagen-overlaid"
$API_BASE = "https://api.outstand.so/v1"
$API_KEY = "ost_qdgGjKbdtXzizUZqaTIYfpQGmSpkCIFhLMcWbsdijtBdkKSanIHhrOuTexHXyQQD"
$ACCOUNT_ID = "1vWPG"
$AUTH_HEADER = @{ "Authorization" = "Bearer $API_KEY" }

$SLIDE_COUNTS = @{ 1=6; 2=6; 3=7; 4=6; 5=6; 6=6; 7=6 }

$CAPTIONS = @{}
$CAPTIONS[1] = @"
110 Hz is measured. 111.2 Hz is mine.

The Hal-Saflieni Hypogeum is an underground temple complex in Malta, carved from limestone somewhere between 3600 and 2500 BCE. Eighty visitors a day are allowed inside. In the Oracle Chamber, researchers have documented a pronounced resonance around 110 to 111 Hz.

Paul Devereux and colleagues found peak frequencies in the 95 to 120 Hz band at Neolithic chambers across Britain and Ireland. Reznikoff and Dauvois noticed that Palaeolithic paintings cluster in the most acoustically resonant zones of French caves.

That is the documented part, caveats included. The neurological study often cited had a small sample, and one study is one study.

The trilogy runs on 111.2 Hz instead. The extra decimal is the fiction signing its own work: close enough to honor the research, far enough that nobody mistakes my invention for their measurement.

Full essay linked in bio. Research layer at jasoncholloway.com/field-notes/111-hz/
"@

$CAPTIONS[2] = @"
Sound has shapes. That part is not mystical. It is 1787.

Ernst Chladni drew a violin bow along a sand-covered metal plate and showed that the sand migrates to the nodal lines, the regions where the plate is not moving. Change the frequency, change the figure. Anyone can reproduce it.

Hans Jenny, a Swiss physician, spent the 1960s turning that demonstration into a discipline he named cymatics. He documented how a shift from 800 to 865 cycles per second transforms a pattern rather than nudging it, and how patterns collapse when the tone stops and return identically when it resumes.

That is the real floor under everything strange in my trilogy. Here is the ceiling: nothing in the research says that looking at one of these patterns changes the person looking. The novels claim it does. That claim is mine, and I would rather name it than let it pass as physics.

Essay linked in bio. Research at jasoncholloway.com/field-notes/cymatics/
"@

$CAPTIONS[3] = @"
Four traditions looked at the same thirty miles of Missouri river bluff and decided, in vocabularies that never borrowed from each other, that this ground matters.

The Hopewell built rooms inside their burial mounds here: stone-vault tombs with doorways, roughly thirty documented sites at the westernmost edge of the tradition.

The Osage, whose historic corridor runs through western Missouri, carry the concept of Wah-kon-tah, the sacred mystery that connects everything. Practiced, not notated. My trilogy is about people building machinery to reach something one of this continent's older traditions simply did.

In 1831 Independence was declared the center place of Zion, and a sixty-three-acre parcel was dedicated for a temple that was never built. The lot is still mowed.

Underneath all of it: Bethany Falls limestone, quarried until the hollowed chambers became SubTropolis, where about seventeen hundred people go to work underground every day.

And the gap I will not paper over: no one has published an acoustics study of the Kansas City underground. The novel is sited here. It is not sourced here.

Essay in bio. jasoncholloway.com/field-notes/kansas-city-locations/
"@

$CAPTIONS[4] = @"
A medieval grimoire condemned as cheating.

The Ars Notoria belongs to the Solomonic tradition, with surviving manuscripts from the mid-thirteenth century, institutional copies including British Library MS Sloane 1712, and an English translation by Robert Turner in 1657. Claire Fanger and Julien Veronese have spent careers on it.

Its promise: the seven liberal arts, meaning grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy, acquired through structured contemplation of dense geometric figures paired with scheduled prayer.

The condemnation was not about demons. It was about shortcuts: knowledge obtained without the sanctioned labor of study.

And condemned books in the manuscript era did not vanish. They went expensive, copied on good vellum for centuries by patrons who privately decided the text was worth the risk.

Everything above is on the record. What my trilogy adds is one claim: that the method works, and here is how. No historian claims that. No cognitive scientist claims that. It is the one experiment the lab has never run, and that gap is where the fiction lives.

Essay in bio. jasoncholloway.com/field-notes/ars-notoria/
"@

$CAPTIONS[5] = @"
The fire took everything except the walls.

Westport Presbyterian Church was built in 1904, in the neighborhood that was once the last outfitting stop for wagon trains heading west. In 2011 it burned. Roof, sanctuary, woodwork, a century of accumulated interior, all gone. Photographs from the next morning show the 1904 limestone standing at full height around a burned-out shell, smoke-darkened and roofless.

The congregation rebuilt inside the standing walls. The fire could erase the contents but not the fact of the church, because the fact was mineral.

"The stone remembers" was in my manuscript before I found the fire. It had been sitting there, a metaphor waiting on a warrant. Too round, too quotable, the kind of line a novelist should distrust. Then a research pass turned up this fire four miles from my desk, and the warrant had been on the public record the whole time.

Nothing was predicted. Church fires are not rare. What changed was the line's standing: a metaphor that earned its keep.

Essay in bio. jasoncholloway.com/field-notes/kansas-city-locations/
"@

$CAPTIONS[6] = @"
One government published. The other classified the act of reading.

In 1984 American intelligence took a Chinese government journal on paranormal research, translated it for internal circulation, and filed it. On one side: a state research establishment studying claims of extraordinary human capacities in the open, with a commission, conferences, funded experiments, and a journal you could subscribe to. On the other: an agency that reads the journal and stamps the translation.

Two governments, one subject, opposite policies. That asymmetry is the political physics of my whole trilogy, and it came from the record rather than from me.

Inside the translated material the debate sorts into three postures: suppress the work, verify it in daylight, or attend to what it might be used for. Those became the Custodians, the Keepers, and the Completion Sect.

One caveat: the three-way sort is my reading, not a heading in the document. The file is public. Anyone who reads it differently has something worth hearing.

Essay linked in bio.
"@

$CAPTIONS[7] = @"
The trilogy ends with a license.

Two hundred forty-seven pages go onto the open internet at midnight under CC0, the license that reserves nothing, not even attribution. An eight-hundred-year war over a secret simply loses its object.

The argument inside the fiction: the intuitive opposite of classification is leaking, and that intuition is wrong. A leak preserves the scarcity that gives a secret its power and merely relocates that power to whoever leaked. The mystery survives its own exposure. Often it grows.

The actual opposite of classification is to make the work boring. Documented to the point of tedium, reproducible by strangers, free to the point of worthlessness as property. Nothing left to guard, nobody left to guard it from.

The file is fiction. The pages, the downloads, the replications, invented down to the digit. CC0 is real, and so is the tradition the ending argues from: open science, public archives, methods sections detailed enough that a stranger can check you.

Essay linked in bio.
"@

Write-Host "============================================================"
Write-Host "Instagram Carousel Repost with Text Overlays"
Write-Host "============================================================"

# Step 1: Get all posts and find Instagram ones
Write-Host "`n=== Fetching existing posts ==="
$resp = Invoke-RestMethod -Uri "$API_BASE/posts?limit=100" -Headers $AUTH_HEADER -Method Get
$allPosts = $resp.data
Write-Host "Total posts in account: $($resp.pagination.total)"

$igPosts = @()
foreach ($p in $allPosts) {
    foreach ($sa in $p.socialAccounts) {
        if ($sa.id -eq $ACCOUNT_ID) {
            $igPosts += $p
            break
        }
    }
}
Write-Host "Instagram posts found: $($igPosts.Count)"

# Step 2: Delete Instagram posts
$deleted = 0
foreach ($p in $igPosts) {
    try {
        Invoke-RestMethod -Uri "$API_BASE/posts/$($p.id)" -Headers $AUTH_HEADER -Method Delete | Out-Null
        Write-Host "  Deleted post $($p.id)"
        $deleted++
        Start-Sleep -Milliseconds 500
    } catch {
        Write-Host "  Failed to delete $($p.id): $_"
    }
}
Write-Host "Deleted $deleted Instagram posts"

if ($deleted -gt 0) {
    Write-Host "`nWaiting 3 seconds before reposting..."
    Start-Sleep -Seconds 3
}

# Step 3: Upload and create new posts
$newPostIds = @()
$totalSlidesUploaded = 0

for ($slot = 1; $slot -le 7; $slot++) {
    $slideCount = $SLIDE_COUNTS[$slot]
    $slotDir = Join-Path $OVERLAID_DIR "slot$slot"
    Write-Host "`n=== Slot $slot`: $slideCount slides ==="

    $mediaItems = @()
    for ($slideIdx = 1; $slideIdx -le $slideCount; $slideIdx++) {
        $fname = "ig-slot$slot-slide$($slideIdx.ToString('D2')).jpg"
        $fpath = Join-Path $slotDir $fname

        if (-not (Test-Path $fpath)) {
            Write-Host "  WARNING: $fpath not found, skipping"
            continue
        }

        Write-Host "  Uploading $fname..." -NoNewline

        try {
            # Step A: Request upload URL
            $uploadReqBody = @{ filename = $fname; content_type = "image/png" } | ConvertTo-Json
            $uploadResp = Invoke-RestMethod -Uri "$API_BASE/media/upload" -Headers ($AUTH_HEADER + @{ "Content-Type" = "application/json" }) -Method Post -Body $uploadReqBody
            $mediaId = $uploadResp.data.id
            if (-not $mediaId) { $mediaId = $uploadResp.id }
            $uploadUrl = $uploadResp.data.upload_url
            if (-not $uploadUrl) { $uploadUrl = $uploadResp.upload_url }

            # Step B: PUT raw bytes
            $fileBytes = [System.IO.File]::ReadAllBytes($fpath)
            $fileSize = $fileBytes.Length
            Invoke-RestMethod -Uri $uploadUrl -Method Put -Body $fileBytes -ContentType "image/png" | Out-Null

            # Step C: Confirm upload
            $confirmBody = @{ size = $fileSize } | ConvertTo-Json
            $confirmResp = Invoke-RestMethod -Uri "$API_BASE/media/$mediaId/confirm" -Headers ($AUTH_HEADER + @{ "Content-Type" = "application/json" }) -Method Post -Body $confirmBody

            $mediaUrl = $confirmResp.data.url
            if (-not $mediaUrl) { $mediaUrl = $confirmResp.url }
            if (-not $mediaUrl) { $mediaUrl = $confirmResp.data.media_url }

            $mediaItems += @{ url = $mediaUrl; filename = $fname }
            $totalSlidesUploaded++
            Write-Host " OK"
        } catch {
            Write-Host " FAILED: $_"
        }

        Start-Sleep -Milliseconds 300
    }

    if ($mediaItems.Count -gt 0) {
        Write-Host "  Creating carousel post for slot $slot..." -NoNewline

        try {
            $mediaPayload = @()
            foreach ($m in $mediaItems) {
                $mediaPayload += @{ url = $m.url; filename = $m.filename }
            }

            $postBody = @{
                containers = @(
                    @{
                        content = $CAPTIONS[$slot]
                        media = $mediaPayload
                    }
                )
                accounts = @($ACCOUNT_ID)
            } | ConvertTo-Json -Depth 5

            $postResp = Invoke-RestMethod -Uri "$API_BASE/posts/" -Headers ($AUTH_HEADER + @{ "Content-Type" = "application/json" }) -Method Post -Body $postBody
            $postId = $postResp.data.id
            if (-not $postId) { $postId = $postResp.id }
            if (-not $postId) { $postId = $postResp.data._id }
            $newPostIds += @{ slot = $slot; post_id = $postId }
            Write-Host " OK (id: $postId)"
        } catch {
            Write-Host " FAILED: $_"
        }
    } else {
        Write-Host "  No media uploaded for slot $slot, skipping post creation"
    }

    Start-Sleep -Seconds 1
}

Write-Host "`n============================================================"
Write-Host "SUMMARY"
Write-Host "============================================================"
Write-Host "Posts deleted: $deleted"
Write-Host "Total slides uploaded: $totalSlidesUploaded"
Write-Host "New posts created: $($newPostIds.Count)"
foreach ($p in $newPostIds) {
    Write-Host "  Slot $($p.slot): post ID $($p.post_id)"
}
