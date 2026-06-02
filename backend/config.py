from pathlib import Path

BASE_DIR = Path(__file__).parent.resolve()
VENV_DIR = BASE_DIR / "venv"

MODEL_DIR = BASE_DIR / "pretrained_models"

GFPGAN_LOCAL_PATH = MODEL_DIR / "GFPGANv1.3.pth"
GFPGAN_MODEL_URL = "https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth"

REALESRGAN_X2_URL = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth"
REALS_X2_LOCAL_PATH = MODEL_DIR / "RealESRGAN_x2plus.pth"

REALESRGAN_X4_URL = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth"
REALS_X4_LOCAL_PATH = MODEL_DIR / "RealESRGAN_x4plus.pth"
