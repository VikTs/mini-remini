import { Observable } from "rxjs";

export const ImageUtils = {
    convertFileToBase64(file: File): Observable<string> {
        return new Observable((observer) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (event) => {
                observer.next(event.target?.result as string);
                observer.complete();
            }

            reader.onerror = (error) => {
                observer.error(error);
            }
        })
    },

    getImageDimensions(base64: string): Observable<{ width: number, height: number }> {
        return new Observable((observer) => {
            const img = new Image();
            img.src = base64;

            img.onload = () => {
                observer.next({ width: img.width, height: img.height });
                observer.complete();
            };
            img.onerror = () => {
                observer.error("Failed to load image from Base64 string.");
            };
        });
    },

    validateImageFile(file?: File): boolean {
        if (!file) { return false; }

        const validTypes = ['image/'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        const hasValidType = validTypes.some(type => file.type.startsWith(type));
        const hasAllowedSize = file.size < maxSize;

        return hasValidType && hasAllowedSize;
    }
}