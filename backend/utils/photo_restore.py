from typing import Dict
from PIL import Image
import numpy as np
import cv2
import torch
import gc

from config import MODEL_LOCAL_PATH

_gfpgan_model = None
_gfpgan_upscale = None 

def _get_gfpgan(upscale: int):
    global _gfpgan_model, _gfpgan_upscale
    if _gfpgan_model is None or _gfpgan_upscale != upscale:
        from gfpgan import GFPGANer
        _gfpgan_model = GFPGANer(
            model_path=str(MODEL_LOCAL_PATH),
            channel_multiplier=2,
            upscale=upscale,
            bg_upsampler=None
        )
        _gfpgan_upscale = upscale
    return _gfpgan_model

def restore_photo(image_pil: Image, filters: Dict[str, float]):
    upscale = filters.get("upscale", 2)
    model = _get_gfpgan(upscale)

    input_np = np.array(image_pil)[:, :, ::-1]

    with torch.no_grad():
        _, _, restored_img = model.enhance(input_np, weight=0.5)

    restored_img = cv2.cvtColor(restored_img, cv2.COLOR_BGR2RGB)

    gc.collect()
    torch.cuda.empty_cache()

    return Image.fromarray(restored_img)