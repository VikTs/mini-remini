import { ComponentStore } from "@ngrx/component-store";
import { defaultFilters, ImageFilters } from "../../features/models/image-filters.model";
import { ImageState, ProcessStep } from "./image-state.model";
import { ImageApiService } from "../../features/services/image-api.service";
import { catchError, delay, finalize, Observable, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";

const initialState: ImageState = {
    originalImage: null,
    enhancedImage: null,
    processStep: ProcessStep.Initial,
    filters: { ...defaultFilters },
    isApplyingFilters: false,
}

@Injectable({ providedIn: 'root' })
export class ImageStore extends ComponentStore<ImageState> {
    constructor(private imageApiService: ImageApiService) {
        super(initialState);
    }

    readonly originalImage$ = this.select(state => state.originalImage);
    readonly enhancedImage$ = this.select(state => state.enhancedImage);
    readonly processStep$ = this.select(state => state.processStep);
    readonly filters$ = this.select(state => state.filters);
    readonly isApplyingFilters$ = this.select(state => state.isApplyingFilters);

    readonly setOriginalImage = this.updater<string | null>((state, originalImage) => ({
        ...state,
        originalImage,
        enhancedImage: null,
        processStep: ProcessStep.Initial,
        filters: { ...defaultFilters }
    }));

    readonly setEnhancedImage = this.updater<string | null>((state, enhancedImage) => ({
        ...state,
        enhancedImage
    }));

    readonly setProcessStep = this.updater<ProcessStep>((state, processStep) => ({
        ...state,
        processStep
    }));

    readonly setFilters = this.updater<ImageFilters>((state, filters) => ({
        ...state,
        filters
    }));

    readonly setIsApplyingFilters = this.updater<boolean>((state, isApplyingFilters) => ({
        ...state,
        isApplyingFilters
    }));


    readonly processImage = (): Observable<string | null> =>
        this.originalImage$
            .pipe(
                switchMap((image) => {
                    if (!image) throw new Error('No image found');

                    this.setProcessStep(ProcessStep.Uploading);
                    return this.imageApiService.upload(image);
                }),
                switchMap((image) => {
                    this.setProcessStep(ProcessStep.Enhancing);
                    return this.imageApiService.enhance(image);
                }),
                tap((image) => {
                    this.setEnhancedImage(image);
                    this.setProcessStep(ProcessStep.Done);
                }),
                delay(500), // Delay for showing Done step
                catchError((error) => {
                    this.setProcessStep(ProcessStep.Error);
                    throw new Error(error);
                })
            );

    readonly applyFilters = (filters: ImageFilters): Observable<string | null> => {
        this.setIsApplyingFilters(true);

        return this.originalImage$
            .pipe(
                tap(() => {
                    this.setFilters(filters);
                }),
                switchMap((image) => {
                    if (!image) throw new Error('No image found');

                    // Always use original image for applying filters
                    return this.imageApiService.applyFilters(image, filters);
                }),
                tap((image) => {
                    this.setEnhancedImage(image);
                }),
                finalize(() => this.setIsApplyingFilters(false))
            )
    };

    readonly reset = this.updater<void>(() => ({
        originalImage: null,
        enhancedImage: null,
        processStep: ProcessStep.Initial,
        filters: { ...defaultFilters },
        isApplyingFilters: false
    }));
}