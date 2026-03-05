from typing import Dict
from PIL import Image
import numpy as np
from gfpgan import GFPGANer
from config import MODEL_LOCAL_PATH

def restore_photo(image_pil: Image, filters: Dict[str, float]):
    gfpgan_model = GFPGANer(
        model_path=str(MODEL_LOCAL_PATH),
        channel_multiplier=2,
        upscale=filters.get("upscale", 2)
    )

    input_np = np.array(image_pil)

    _, _, restored_img = gfpgan_model.enhance(
        input_np,
        has_aligned=False,
        weight=0.1,
        paste_back=True
    )

    return Image.fromarray(restored_img)
