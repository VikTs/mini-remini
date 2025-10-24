import os
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).parent.resolve()
VENV_DIR = ROOT_DIR / "venv"

if os.name == "nt":  #Windows
    python_exec = VENV_DIR / "Scripts" / "python.exe"
else: # Linux/macOS
    python_exec = VENV_DIR / "bin" / "python" 

subprocess.run([str(python_exec), "-m", "uvicorn", "main:app", "--reload"], check=True)
