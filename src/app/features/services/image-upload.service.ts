import { Injectable } from "@angular/core";
import { ImageUtils } from "../../shared/utils/image.utils";
import { take } from "rxjs";
import { ImageStore } from "../../store/image/image-store";
import { Router } from "@angular/router";
import { DialogService } from "../../shared/services/dialog.service";

// ToDo: move file conversion to BE (POST /upload)
@Injectable({
    providedIn: 'root',
})
export class ImageUploadService {
    constructor(
        private imageStore: ImageStore,
        private router: Router,
        private dialogService: DialogService
    ) { }

    handleImageUpload(image?: File): void {
        if (!image) return;

        const isImageValid = ImageUtils.validateImageFile(image);

        if (isImageValid) {
            ImageUtils.convertFileToBase64(image)
                .pipe(take(1))
                .subscribe({
                    next: (base64) => {
                        this.imageStore.setOriginalImage(base64);
                        this.router.navigate(["/processing"]);
                    }
                });
        } else {
            this.dialogService.openErrorDialog({
                title: "upload.type_error.title",
                message: "upload.type_error.message"
            })
        }
    }
}