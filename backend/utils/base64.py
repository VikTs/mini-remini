from PIL import Image
import io
import base64

def decode_base64_to_img (base64_str: str):
    image_data = base64.b64decode(base64_str.split(",")[-1])
    return Image.open(io.BytesIO(image_data)).convert("RGB")

def encode_img_to_base64 (image: Image.Image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    encoded = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{encoded}"