import numpy as np
import cv2
from PIL import ImageEnhance, Image

from utils.photo_restore import restore_face
from utils.base64 import decode_base64_to_img, encode_img_to_base64
from utils.realesrgan_upscaler import upscale_image

def apply_filters(image_base64: str, filters: dict):
    image_pil = decode_base64_to_img(image_base64)

    if image_pil is None:
        return image_base64
    
    if filters["enhanceFace"] is True:
        upscale = filters.get("upscale", 2)
        image_pil = restore_face(image_pil, upscale)

    if filters["restore"] is True:
        upscale = 4 if filters["restoreHightResolution"] is True else 2
        image_pil = upscale_image(image_pil, upscale)

    if "colorCorrection" in filters:
        match filters["colorCorrection"]:
            case "cinematic":
                image_pil = ImageEnhance.Contrast(image_pil).enhance(1.2)
            case "vintage":
                image_np = np.array(image_pil).astype(np.float32)
                image_np[:, :, 0] *= 1.1
                image_np[:, :, 1] *= 1.0
                image_np[:, :, 2] *= 0.9
                image_np = np.clip(image_np, 0, 255).astype(np.uint8)
                image_pil = Image.fromarray(image_np)
            case "cool":
                image_np = np.array(image_pil)
                overlay = np.full_like(image_np, (0, 10, 20))
                result = cv2.addWeighted(image_np, 1, overlay, 0.6, 0)
                image_pil = Image.fromarray(result.astype("uint8"))
            case "warm":
                image_np = np.array(image_pil)
                overlay = np.full_like(image_np, (20, 10, 0))
                result = cv2.addWeighted(image_np, 1, overlay, 0.6, 0)
                image_pil = Image.fromarray(result.astype("uint8"))

    return encode_img_to_base64(image_pil)