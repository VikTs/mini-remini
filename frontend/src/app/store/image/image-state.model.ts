import { ImageFilters } from "../../features/models/image-filters.model";

export interface ImageState {
    originalImage: string | null;
    enhancedImage: string | null;
    filters: ImageFilters;
    isApplyingFilters: boolean;
}
