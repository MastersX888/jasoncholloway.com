# GR → StoryGraph export gate — agent wake loop
# Emits AGENT_LOOP_TICK_GR_STORYGRAPH every 20 minutes

$RepoRoot = "c:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
$PidFile = Join-Path $RepoRoot "scratch\ops\.gr-loop.pid"
$IntervalSec = 1200  # 20 minutes

$Prompt = "Run GR export gate tick per scratch/ops/prompts/gr-storygraph-export-loop.md. Read scratch/ops/gr_gate_state.json, poll logged-in Goodreads author page via browser MCP, update state, execute export/StoryGraph when gate passes."

$MyPid = $PID
$MyPid | Out-File -FilePath $PidFile -Encoding ascii -Force

[Console]::WriteLine("GR StoryGraph loop armed — PID $MyPid — interval ${IntervalSec}s")
[Console]::WriteLine("Repo: $RepoRoot")
[Console]::WriteLine("Stop: Stop-Process -Id $MyPid -Force")

while ($true) {
    Start-Sleep -Seconds $IntervalSec
    $payload = (@{ prompt = $Prompt } | ConvertTo-Json -Compress)
    [Console]::WriteLine("AGENT_LOOP_TICK_GR_STORYGRAPH $payload")
}
