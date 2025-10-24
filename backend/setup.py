import os
import subprocess
import venv
import urllib.request
from config import VENV_DIR, MODEL_LOCAL_PATH, MODEL_URL, BASE_DIR, MODEL_DIR

print("Crearing virtual environment...")
if not VENV_DIR.exists():
    venv.create(VENV_DIR, with_pip=True)

if os.name == "nt":  #Windows
    python_exec = VENV_DIR / "Scripts" / "python.exe"
else: # Linux/macOS
    python_exec = VENV_DIR / "bin" / "python" 

print("Installing dependencies...")
subprocess.check_call([str(python_exec), "-m", "pip", "install", "-r", str(BASE_DIR / "requirements.txt")])

print("Downloading AI model...")
MODEL_DIR.mkdir(parents=True, exist_ok=True)
if not MODEL_LOCAL_PATH.exists():
    urllib.request.urlretrieve(MODEL_URL, MODEL_LOCAL_PATH)
    print(f"Model downloaded to {MODEL_LOCAL_PATH}")
else:
    print(f"Model already exists: {MODEL_LOCAL_PATH}")

print("Setup complete")