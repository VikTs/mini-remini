# Backend

All the backend files are placed inside /backend folder.

## Architecture

For enhancing the image [GFPGAN](https://github.com/TencentARC/GFPGAN) model is used. It's stored inside pretrained_models folder.

## Getting started

### Prerequisites

- [Python 3.10](https://www.python.org/downloads/release/python-3109/)

### Installation and launching

```bash
cd mini-remini/backend
python3 ./setup.py
python3 ./run.py
```

The server will be launched on `http://127.0.0.1:8000`. 

### Running in production mode
By default the server runs in **development mode**.

To start it in **prodaction mode**, use --env parameter:

```bash
python3 ./run.py --env prod
```

