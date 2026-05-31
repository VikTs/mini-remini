from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from schemas.image import ImageData, ImageFiltersData
from utils.image_filters import apply_filters
import asyncio
import time

def _warmup_models():
    try:
        from utils.face_filters import _get_face_app
        from utils.photo_restore import _get_gfpgan
        _get_face_app()
        _get_gfpgan(upscale=2)
    except Exception as e:
        print(f"Warmup failed: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, _warmup_models)
    yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_router = APIRouter(prefix="/api")

@app.get("/health")
def health():
    return {"status": "ok"}

@api_router.post("/upload")
def upload_image(data: ImageData):
    time.sleep(0.5)
    return {"image": data.image}

@api_router.post("/applyFilters")
def apply_image_filters(data: ImageFiltersData):
    result = apply_filters(data.image, data.filters)
    return {"image": result}

app.include_router(api_router)