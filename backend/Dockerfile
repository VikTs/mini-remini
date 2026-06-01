FROM python:3.10-slim

# System dependencies for OpenCV, insightface, etc.
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    wget \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Download GFPGAN model at build time
RUN python -c "\
import urllib.request; \
from pathlib import Path; \
model_dir = Path('pretrained_models'); \
model_dir.mkdir(parents=True, exist_ok=True); \
model_path = model_dir / 'GFPGANv1.3.pth'; \
print('Downloading GFPGAN model...'); \
urllib.request.urlretrieve('https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth', model_path); \
print('Done.')"

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
