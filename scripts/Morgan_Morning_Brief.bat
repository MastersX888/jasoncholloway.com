@echo off
setlocal
set "REPO=C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
cd /d "%REPO%"
python scripts\speak_morning_brief.py %*
if errorlevel 1 (
  echo.
  echo Brief failed. See scratch\ops_reports\SPOKEN_BRIEF_README.md
  pause
)
