from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from utils.image_filters import apply_filters
from utils.image_enhance import enhance_image
from schemas.image import ImageData, ImageFiltersData
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_router = APIRouter(prefix="/api")

@api_router.post("/upload")
def upload_image(data: ImageData):
    time.sleep(0.5)
    return {"image": data.image}

@api_router.post("/enhance")
def enhance(data: ImageData):  
    result = enhance_image(data.image, {})
    return {"image": result}

@api_router.post("/applyFilters")
def apply_image_filters(data: ImageFiltersData):
    enhanced_image = enhance_image(data.image, data.filters)
    result = apply_filters(enhanced_image, data.filters)
    return {"image": result}

app.include_router(api_router)