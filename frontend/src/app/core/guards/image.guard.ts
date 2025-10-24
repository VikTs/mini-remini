import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ImageStore } from "../../store/image/image-store";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ImageGuard
    implements CanActivate {
    constructor(
        private imageStore: ImageStore,
        private router: Router
    ) { }

    async canActivate(): Promise<boolean> {
        const hasImage = await firstValueFrom(
            this.imageStore.select((state) => !!state.originalImage && !!state.enhancedImage)
        );

        if (hasImage) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}