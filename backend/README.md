# Backend

## Architecture

App is build with Python 3.10

For enhancing the image [GFPGAN](https://github.com/TencentARC/GFPGAN) model is used. 

GFPGAN model is stored locally - inside pretrained_models folder. 

## Getting started

### Prerequisites

- [Python 3.10](https://www.python.org/downloads/release/python-31020/)

### Installation and launching

```bash
cd mini-remini/backend
python3 setup.py
python3 run.py
```

> **Note**: If you have multiple versions of Python installed, use the full path to the [required version](#prerequisites) instead of *python3*:
>```bash
>/path/to/python setup.py
>```

The server will be launched on `http://127.0.0.1:8000`. 

### Running in production mode
By default the server runs in **development mode**.

To start it in **production mode**, use --env parameter:

```bash
python3 run.py --env prod
```

