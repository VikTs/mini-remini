import { ImageFilters } from "../../features/models/image-filters.model";

export interface ImageState {
    originalImage: string | null;
    enhancedImage: string | null;
    processStep: ProcessStep;
    filters: ImageFilters;
    isApplyingFilters: boolean;
}

export enum ProcessStep {
    Initial = 'Initial',
    Uploading = 'Uploading',
    Enhancing = 'Enhancing',
    Done = 'Done',
    Error = 'Error'
}
