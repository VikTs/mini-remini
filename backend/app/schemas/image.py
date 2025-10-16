from pydantic import BaseModel
from typing import Dict

class ImageData(BaseModel): 
    image: str

class ImageFiltersData(BaseModel): 
    image: str
    filters: Dict[str, float]