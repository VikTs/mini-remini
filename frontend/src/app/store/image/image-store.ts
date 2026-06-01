import { inject } from '@angular/core';
import {
    signalStore,
    withState,
    withMethods,
    patchState
} from '@ngrx/signals';
import { finalize, tap, throwError } from 'rxjs';

import { initialFilters } from '../../features/models/image-filters.constant';
import { ImageFilters } from '../../features/models/image-filters.model';
import { ImageState } from './image-state.model';
import { ImageApiService } from '../../features/services/image-api.service';

const initialState: ImageState = {
    originalImage: null,
    enhancedImage: null,
    filters: { ...initialFilters },
    isApplyingFilters: false
};

export const ImageStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withMethods((store, api = inject(ImageApiService)) => ({

        setOriginalImage(originalImage: string | null) {
            patchState(store, {
                originalImage,
                enhancedImage: null,
                filters: { ...initialFilters }
            });
        },

        setEnhancedImage(enhancedImage: string | null) {
            patchState(store, { enhancedImage });
        },

        setFilters(filters: ImageFilters) {
            patchState(store, { filters });
        },

        setIsApplyingFilters(isApplyingFilters: boolean) {
            patchState(store, { isApplyingFilters });
        },

        applyFilters(filters: ImageFilters) {
            const image = store.originalImage();

            if (!image) {
                return throwError(() => new Error('No image found'));
            }

            patchState(store, { isApplyingFilters: true });

            // Always use original image for applying filters

            return api.applyFilters(image, filters).pipe(

                tap((image) => {
                    patchState(store, {
                        filters,
                        enhancedImage: image
                    });
                }),

                finalize(() => {
                    patchState(store, { isApplyingFilters: false });
                })
            );
        },

        reset() {
            patchState(store, {
                originalImage: null,
                enhancedImage: null,
                filters: { ...initialFilters },
                isApplyingFilters: false
            });
        }

    }))
);