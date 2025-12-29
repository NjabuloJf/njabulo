@echo off
REM Setup script untuk Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║     🔐 KATSUMI 2FA SETUP WIZARD        ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js tidak ditemukan. Install Node.js terlebih dahulu.
    exit /b 1
)

echo ✓ Node.js ditemukan
echo.

REM Run setup
echo 🔧 Menjalankan 2FA setup...
node lib/2fa-setup.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Setup berhasil!
    echo.
    echo Next steps:
    echo   npm run build   # Build dengan 2FA protection
    echo   npm start       # Start server dengan 2FA protection
) else (
    echo.
    echo ❌ Setup gagal
    exit /b 1
)
