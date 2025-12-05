from pydantic import BaseModel
from typing import Dict, Union

class ImageData(BaseModel): 
    image: str

class ImageFiltersData(BaseModel): 
    image: str
    filters: Dict[str, Union[float, str]]