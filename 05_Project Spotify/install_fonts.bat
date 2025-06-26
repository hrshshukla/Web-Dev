@echo off
:: ----------------------------------------------------
:: Combined batch file to install all .TTF fonts from the Fonts subfolder
:: and automatically elevate to Administrator if needed.
:: ----------------------------------------------------

:: Check if the script is running with administrator privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator privileges...
    PowerShell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo "Starting font installation..."

:: Change directory to the Fonts subfolder inside the main folder
pushd "%~dp0\Fonts"

:: Loop through each TTF file in the Fonts folder and install it
for %%F in (*.ttf) do (
    echo Installing %%F ...
    copy "%%F" "%WINDIR%\Fonts" >nul
    reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts" ^
        /v "%%~nF (TrueType)" ^
        /t REG_SZ ^
        /d "%%F" ^
        /f >nul
)

:: Return to the main directory
popd

echo "Font installation completed."
exit
