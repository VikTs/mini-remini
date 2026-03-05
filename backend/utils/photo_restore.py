from typing import Dict
from PIL import Image
import numpy as np
import cv2
import torch
import gc

from gfpgan import GFPGANer
from config import MODEL_LOCAL_PATH

def restore_photo(image_pil: Image, filters: Dict[str, float]):
    gfpgan_model = GFPGANer(
        model_path=str(MODEL_LOCAL_PATH),
        channel_multiplier=2,
        upscale=filters.get("upscale", 2),
        bg_upsampler=None
    )

    input_np = np.array(image_pil)[:, :, ::-1]

    with torch.no_grad():
        _, _, restored_img = gfpgan_model.enhance(input_np, weight=0.5)

    restored_img = cv2.cvtColor(restored_img, cv2.COLOR_BGR2RGB)

    gc.collect()
    torch.cuda.empty_cache()

    return Image.fromarray(restored_img)