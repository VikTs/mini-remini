import cv2
import numpy as np
from PIL import Image

_face_app = None

def _get_face_app():
    global _face_app
    if _face_app is None:
        import insightface
        _face_app = insightface.app.FaceAnalysis(
            name="buffalo_l",
            providers=["CPUExecutionProvider"]
        )
        _face_app.prepare(ctx_id=0, det_size=(512, 512))
    return _face_app

def apply_face_beauty(image_pil: Image, smooth_strength=0.5):
    image_np = np.array(image_pil)

    if image_np is None:
        return image_np

    result_img = image_np.copy()
    h, w = image_np.shape[:2]

    faces = _get_face_app().get(image_np)

    if not faces:
        return image_np

    for face in faces:
        x1, y1, x2, y2 = map(int, face.bbox)
        x1, y1 = max(0, x1), max(0, y1)
        x2, y2 = min(w, x2), min(h, y2)

        face_crop = result_img[y1:y2, x1:x2]
        if face_crop.size == 0:
            continue

        blur = cv2.bilateralFilter(face_crop, 11, 90 * smooth_strength, 90 * smooth_strength)
        sharpen = cv2.detailEnhance(blur, sigma_s=6, sigma_r=0.15)
        result_img[y1:y2, x1:x2] = cv2.addWeighted(face_crop, 0.6, sharpen, 0.4, 0)

    return result_img