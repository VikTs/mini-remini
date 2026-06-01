FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    wget \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch==2.0.1+cpu torchvision==0.15.2+cpu \
        --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python -c "\
import urllib.request; \
from pathlib import Path; \
model_dir = Path('pretrained_models'); \
model_dir.mkdir(parents=True, exist_ok=True); \
model_path = model_dir / 'GFPGANv1.3.pth'; \
print('Downloading GFPGAN model...'); \
urllib.request.urlretrieve('https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth', model_path); \
print('Done.')"

RUN python -c "\
import insightface; \
from insightface.app import FaceAnalysis; \
app = FaceAnalysis(name='buffalo_l'); \
app.prepare(ctx_id=-1); \
print('Insightface model ready.')"

EXPOSE 8000

CMD uvicorn main:app --host 0.0.0.0 --port 7860