from typing import Dict
from PIL import ImageEnhance
from utils.base64 import decode_base64_to_img, encode_img_to_base64

def apply_filters(image_base64: str, filters: Dict[str, float]):
    image = decode_base64_to_img(image_base64)
    
    if "brightness" in filters:
        image = ImageEnhance.Brightness(image).enhance(filters["brightness"])
    if "contrast" in filters:
        image = ImageEnhance.Contrast(image).enhance(filters["contrast"])
    
    return encode_img_to_base64(image)