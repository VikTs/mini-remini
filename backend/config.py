import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_URL = "https://github.com/TencentARC/GFPGAN/releases/download/v0.2.0/GFPGANCleanv1-NoCE-C2.pth"
MODEL_LOCAL_PATH = os.path.join(BASE_DIR, './pretrained_models/GFPGANCleanv1-NoCE-C2.pth')