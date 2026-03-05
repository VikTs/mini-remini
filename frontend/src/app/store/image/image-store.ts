import { inject } from '@angular/core';
import {
    signalStore,
    withState,
    withMethods,
    patchState
} from '@ngrx/signals';
import { delay, finalize, switchMap, tap, catchError, of, throwError } from 'rxjs';

import { defaultFilters } from '../../features/models/image-filters.constant';
import { ImageFilters } from '../../features/models/image-filters.model';
import { ImageState, ProcessStep } from './image-state.model';
import { ImageApiService } from '../../features/services/image-api.service';

const initialState: ImageState = {
    originalImage: null,
    enhancedImage: null,
    processStep: ProcessStep.Initial,
    filters: { ...defaultFilters },
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
                processStep: ProcessStep.Initial,
                filters: { ...defaultFilters }
            });
        },

        setEnhancedImage(enhancedImage: string | null) {
            patchState(store, { enhancedImage });
        },

        setProcessStep(processStep: ProcessStep) {
            patchState(store, { processStep });
        },

        setFilters(filters: ImageFilters) {
            patchState(store, { filters });
        },

        setIsApplyingFilters(isApplyingFilters: boolean) {
            patchState(store, { isApplyingFilters });
        },

        processImage() {
            const image = store.originalImage();

            if (!image) {
                return throwError(() => new Error('No image found'));
            }

            patchState(store, { processStep: ProcessStep.Uploading });

            return api.upload(image).pipe(

                switchMap((image) => {
                    const filters = store.filters();

                    patchState(store, { processStep: ProcessStep.Enhancing });

                    return api.applyFilters(image, filters);
                }),

                tap((image) => {
                    patchState(store, {
                        enhancedImage: image,
                        processStep: ProcessStep.Done
                    });
                }),

                delay(500),

                catchError((error) => {
                    patchState(store, { processStep: ProcessStep.Error });
                    return throwError(() => error);
                })
            );
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
                processStep: ProcessStep.Initial,
                filters: { ...defaultFilters },
                isApplyingFilters: false
            });
        }

    }))
);