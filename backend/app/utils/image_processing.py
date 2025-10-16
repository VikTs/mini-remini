from typing import Dict
from PIL import Image, ImageEnhance
from io import BytesIO
import base64

def apply_filters(image_base64: str, filters: Dict[str, float]):
    if "," in image_base64:
        _, image_base64 = image_base64.split(",", 1)
        
    image_data = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_data)).convert("RGB")
    
    if "brightness" in filters:
        image = ImageEnhance.Brightness(image).enhance(filters["brightness"])
    if "contrast" in filters:
        image = ImageEnhance.Contrast(image).enhance(filters["contrast"])
    
    buffer = BytesIO()
    image.save(buffer,format="PNG")
    return f"data:image/png;base64,{base64.b64encode(buffer.getvalue()).decode('utf-8')}"