@echo off
cd /d C:\Users\Maxim\Documents\zaufani

echo ============================================
echo Firebase Login Setup
echo ============================================
echo.
echo This will open your browser for Firebase login
echo Please sign in with your Google account
echo.
pause

REM Run firebase with absolute paths
"C:\Program Files\nodejs\node.exe" "C:\Users\Maxim\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js" login

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Firebase login successful!
    echo.
    echo Next step: Initialize Firebase Hosting
    pause
    "C:\Program Files\nodejs\node.exe" "C:\Users\Maxim\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js" init hosting
) else (
    echo.
    echo ✗ Firebase login failed
    pause
)
