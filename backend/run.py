import os
import sys
import subprocess
from config import VENV_DIR, BASE_DIR
from dotenv import load_dotenv

print("Loading environment variables...")

# Get env value from command line
args = sys.argv[1:]
if "--env" in args:
    try:
        env = args[args.index("--env")+1]
    except IndexError:
        print("Missing value for env (example: --env dev)")
else:
    env = "dev"

# Load .env file
env_file = BASE_DIR  / f".env.{env}"
if env_file.exists():
    load_dotenv(dotenv_path=env_file)
    print(f"Loaded {env_file.name}")
else:
    print(f"{env_file.name} not found. Using the default values")

host = os.environ.get("HOST", "0.0.0.0")
port = os.environ.get("PORT", "8000")
is_debug = os.environ.get("DEBUG", False)


print("Activating virtual environment...")
if os.name == "nt":  #Windows
    python_exec = VENV_DIR / "Scripts" / "python.exe"
else: # Linux/macOS
    python_exec = VENV_DIR / "bin" / "python" 
    

print("Running the server...")
cmd = [
    str(python_exec), 
    "-m", "uvicorn", 
    "main:app", 
    "--host", host, 
    "--port", port,
    ]

if is_debug:
    cmd.append("--reload")

subprocess.run(cmd, check=True)
