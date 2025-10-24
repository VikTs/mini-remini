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
python ./setup.py
python ./run.py
```

- Linux/MacOS (wasn't tested)
```bash
cd mini-remini/backend
python3 ./setup.py
python3 ./run.py
```

The server will be launched on `http://0.0.0.0:8000`. 

