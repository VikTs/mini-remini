# Backend

All the backend files are placed inside /backend folder.

## Architecture

For enhancing the image [GFPGAN](https://github.com/TencentARC/GFPGAN) model is used. It's stored inside pretrained_models folder.

## Getting started

### Prerequisites

- [Python 3.10](https://www.python.org/downloads/release/python-3109/)

### Installation and launching

- Windows
```bash
cd mini-remini/backend
./setup.bat
./run.bat
```

- Linux/MacOS (wasn't tested)
```bash
cd mini-remini/backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

wget https://github.com/TencentARC/GFPGAN/releases/download/v0.2.0/GFPGANCleanv1-NoCE-C2.pth -P pretrained_models/GFPGANCleanv1-NoCE-C2.pth

uvicorn main:app --reload
```

The server will be launched on `http://127.0.0.1:8000`. 

