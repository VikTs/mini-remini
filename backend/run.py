import os
import subprocess
from config import VENV_DIR

if os.name == "nt":  #Windows
    python_exec = VENV_DIR / "Scripts" / "python.exe"
else: # Linux/macOS
    python_exec = VENV_DIR / "bin" / "python" 

host = os.environ.get("HOST", "0.0.0.0")
port = os.environ.get("PORT", "8000")

subprocess.run([
    str(python_exec), 
    "-m", "uvicorn", 
    "main:app", 
    "--host", host, 
    "--port", port,
    ], check=True)
