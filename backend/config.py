from pathlib import Path

BASE_DIR = Path(__file__).parent.resolve()
VENV_DIR = BASE_DIR / "venv"

MODEL_DIR = BASE_DIR / "pretrained_models"
MODEL_LOCAL_PATH = MODEL_DIR / "GFPGANv1.3.pth"
MODEL_URL = "https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth"
