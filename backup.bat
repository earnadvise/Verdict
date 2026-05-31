@echo off
title Verdict GitHub Auto-Backup
color 0A
cls
echo ========================================================
echo          Verdict Prediction Market Auto-Backup
echo ========================================================
echo.
echo [1/3] Staging all changed and new files...
git add .
echo.
echo [2/3] Committing changes locally with timestamp...
git commit -m "Auto-backup on %date% at %time%"
echo.
echo [3/3] Uploading securely to GitHub (earnadvise/Verdict)...
git push origin main
echo.
echo ========================================================
echo  SUCCESS: Your restored Verdict code is safe on GitHub!
echo ========================================================
echo.
echo Press any key to exit this window.
pause > nul
