import os
import subprocess
import venv
import urllib.request
from config import VENV_DIR, GFPGAN_LOCAL_PATH, GFPGAN_MODEL_URL, REALESRGAN_X2_URL, REALS_X2_LOCAL_PATH, REALS_X4_LOCAL_PATH, REALESRGAN_X4_URL, BASE_DIR, MODEL_DIR

print("Creating virtual environment...")
if not VENV_DIR.exists():
    venv.create(VENV_DIR, with_pip=True)

if os.name == "nt":  #Windows
    python_exec = VENV_DIR / "Scripts" / "python.exe"
else: # Linux/macOS
    python_exec = VENV_DIR / "bin" / "python" 

print("Installing dependencies...")
subprocess.check_call([str(python_exec), "-m", "pip", "install", "-r", str(BASE_DIR / "requirements.txt")])

MODEL_DIR.mkdir(parents=True, exist_ok=True)

print("Downloading GFPGan model...")
if not GFPGAN_LOCAL_PATH.exists():
    urllib.request.urlretrieve(GFPGAN_MODEL_URL, GFPGAN_LOCAL_PATH)
    print(f"GFPGan model downloaded to {GFPGAN_LOCAL_PATH}")
else:
    print(f"GFPGan model already exists: {GFPGAN_LOCAL_PATH}")
    
    
print("Downloading Real-ESRGAN x2 model...")
if not REALS_X2_LOCAL_PATH.exists():
    urllib.request.urlretrieve(REALESRGAN_X2_URL, REALS_X2_LOCAL_PATH)
    print(f"Real-ESRGAN x2 model downloaded to {REALS_X2_LOCAL_PATH}")
else:
    print("Real-ESRGAN x2 model already exists")
    
print("Downloading Real-ESRGAN x4 model...")
if not REALS_X4_LOCAL_PATH.exists():
    urllib.request.urlretrieve(REALESRGAN_X4_URL, REALS_X4_LOCAL_PATH)
    print(f"Real-ESRGAN x4 model downloaded to {REALS_X4_LOCAL_PATH}")
else:
    print("Real-ESRGAN x4 model already exists")

print("Setup complete")