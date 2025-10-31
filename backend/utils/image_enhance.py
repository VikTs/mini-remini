from typing import Dict
from PIL import Image
import numpy as np
from utils.base64 import decode_base64_to_img, encode_img_to_base64
from gfpgan import GFPGANer
from config import MODEL_LOCAL_PATH

def enhance_image(image: str, filters: Dict[str, float]):
    gfpgan_model = GFPGANer(
        model_path=str(MODEL_LOCAL_PATH),
        channel_multiplier = 2,
        upscale = filters.get("upscale", 2),
        arch = filters.get("arch", "clean"),
        bg_upsampler = filters.get("bg_upsampler", None)
    )

    input_image = decode_base64_to_img(image)
    input_np = np.array(input_image)
    
    _,_,restored_img = gfpgan_model.enhance(input_np, has_aligned=False)
    
    restored_pil = Image.fromarray(restored_img)
    result = encode_img_to_base64(restored_pil)
    return result
