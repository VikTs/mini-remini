@echo off
setlocal

set ROOT_DIR=%~dp0
set VENV_DIR=%ROOT_DIR%/venv
set MODEL_DIR=%ROOT_DIR%/pretrained_models
set MODEL_PATH=%MODEL_DIR%/GFPGANCleanv1-NoCE-C2.pth
set MODEL_URL=https://github.com/TencentARC/GFPGAN/releases/download/v0.2.0/GFPGANCleanv1-NoCE-C2.pth

echo Crearing virtual environment...
if not exist %VENV_DIR% (
    python -m venv %VENV_DIR%
)
call "%VENV_DIR%/Scripts/activate.bat"

echo Installing dependencies...
pip install -r "%ROOT_DIR%/requirements.txt"

echo Downloading model...
if not exist %MODEL_PATH% (
    powershell -Command "Invoke-WebRequest -Uri '%MODEL_URL%' -OutFile '%MODEL_PATH%'"
) else (
    echo Model already exist: %MODEL_PATH%
)

endlocal
pause
