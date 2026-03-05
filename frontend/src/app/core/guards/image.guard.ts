import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ImageStore } from "../../store/image/image-store";

@Injectable({ providedIn: 'root' })
export class ImageGuard
    implements CanActivate {
    private imageStore = inject(ImageStore);
    constructor(
        private router: Router
    ) { }

    canActivate(): boolean {
        const hasImage = !!this.imageStore.originalImage() && !!this.imageStore.enhancedImage();

        if (hasImage) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}