from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from utils.image_filters import apply_filters
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

@api_router.post("/applyFilters")
def apply_image_filters(data: ImageFiltersData):
    result = apply_filters(data.image, data.filters)
    return {"image": result}

app.include_router(api_router)