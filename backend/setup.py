import os
import subprocess
import venv
from pathlib import Path
import urllib.request

ROOT_DIR = Path(__file__).parent.resolve()
VENV_DIR = ROOT_DIR / "venv"
MODEL_DIR = ROOT_DIR / "pretrained_models"
MODEL_PATH = MODEL_DIR / "GFPGANv1.4.pth"
MODEL_URL = "https://github.com/TencentARC/GFPGAN/releases/download/v1.3.4/GFPGANv1.4.pth"

print("Crearing virtual environment...")
if not VENV_DIR.exists():
    venv.create(VENV_DIR, with_pip=True)

if os.name == "nt":  #Windows
    python_exec = VENV_DIR / "Scripts" / "python.exe"
else: # Linux/macOS
    python_exec = VENV_DIR / "bin" / "python" 

print("Installing dependencies...")
subprocess.check_call([str(python_exec), "-m", "pip", "install", "-r", str(ROOT_DIR / "requirements.txt")])

print("Downloading AI model...")
MODEL_DIR.mkdir(parents=True, exist_ok=True)
if not MODEL_PATH.exists():
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print(f"Model downloaded to {MODEL_PATH}")
else:
    print(f"Model already exists: {MODEL_PATH}")

print("Setup complete")