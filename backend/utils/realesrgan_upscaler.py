import torch
import numpy as np
import cv2
from PIL import Image

from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet

_models = {}

def _get_model(scale: int):
    global _models

    if scale not in (2, 4):
        scale = 2

    if scale in _models:
        return _models[scale]

    model_path = (
        "pretrained_models/RealESRGAN_x2plus.pth"
        if scale == 2
        else "pretrained_models/RealESRGAN_x4plus.pth"
    )

    model = RRDBNet(
        num_in_ch=3,
        num_out_ch=3,
        num_feat=64,
        num_block=23,
        num_grow_ch=32,
        scale=scale
    )

    upsampler = RealESRGANer(
        scale=scale,
        model_path=model_path,
        model=model,
        tile=512,  #larger tile = faster but higher memory/CPU usage
        tile_pad=10,
        pre_pad=0,
        half=False
    )

    _models[scale] = upsampler
    return upsampler


def upscale_image(image_pil: Image.Image, scale: int = 2):
    img = np.array(image_pil)[:, :, ::-1]
    upsampler = _get_model(scale)
    output, _ = upsampler.enhance(img, outscale=scale)
    output = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)

    return Image.fromarray(output)