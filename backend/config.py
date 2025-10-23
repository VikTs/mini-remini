import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_URL = "https://github.com/TencentARC/GFPGAN/releases/download/v1.3.4/GFPGANv1.4.pth"
MODEL_LOCAL_PATH = os.path.join(BASE_DIR, './pretrained_models/GFPGANv1.4.pth')