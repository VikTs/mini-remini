from config import MODEL_URL, MODEL_LOCAL_PATH
import os
import requests

def download_model():
    os.makedirs(os.path.dirname(MODEL_LOCAL_PATH), exist_ok=True)
    if not os.path.exists(MODEL_LOCAL_PATH):
        print("Downloading GFPGAN model...")
        with requests.get(MODEL_URL, stream=True) as request:
            request.raise_for_status()
            with open(MODEL_LOCAL_PATH, "wb") as file:
                for chunk in request.iter_content(chunk_size=8192):
                    file.write(chunk)
        print("Model downloaded")