@echo off
setlocal
set "REPO=C:\Users\zh577\.gemini\antigravity\scratch\jasoncholloway"
set "PORT=8080"
set "URL=http://localhost:%PORT%/content/social/preview/index.html"

cd /d "%REPO%"

:: Start server in a new window if port not already in use
netstat -ano | findstr ":%PORT% " | findstr "LISTENING" >nul
if errorlevel 1 (
  start "Social Preview Server" cmd /k "cd /d %REPO% && python -m http.server %PORT%"
  timeout /t 2 /nobreak >nul
)

start "" "%URL%"
echo Opened %URL%
echo Server: python -m http.server %PORT% from repo root
echo Close the "Social Preview Server" window to stop.
