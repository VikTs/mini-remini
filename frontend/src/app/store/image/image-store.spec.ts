import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ImageStore } from "./image-store";
import { ImageApiService } from "../../features/services/image-api.service";
import { ProcessStep } from './image-state.model';

describe('ImageStore', () => {
    let store: ImageStore;
    let imageApiServiceMock: jasmine.SpyObj<ImageApiService>;

    beforeEach(async () => {
        imageApiServiceMock = jasmine.createSpyObj("ImageApiService", ["upload", "enhance", "applyFilters"]);

        await TestBed.configureTestingModule({
            providers: [
                ImageStore,
                {
                    provide: ImageApiService,
                    useValue: imageApiServiceMock
                }],
        })
            .compileComponents();

        store = TestBed.inject(ImageStore);
    });

    it('should have initial state', (done) => {
        store.state$.subscribe(state => {
            expect(state.originalImage).toBeNull();
            expect(state.enhancedImage).toBeNull();
            expect(state.processStep).toBe(ProcessStep.Initial);
            expect(state.filters).toEqual(jasmine.any(Object));
            done();
        })
    });

    it('should set original image and reset state', (done) => {
        store.setOriginalImage("image.jpg");
        store.state$.subscribe(state => {
            expect(state.originalImage).toBe("image.jpg");
            expect(state.enhancedImage).toBeNull();
            expect(state.processStep).toBe(ProcessStep.Initial);
            expect(state.filters).toEqual(jasmine.any(Object));
            done();
        })
    });

    it('should reset to initial state', (done) => {
        store.setOriginalImage("originalImage.jpg");
        store.setEnhancedImage("originalImage.jpg");
        store.setProcessStep(ProcessStep.Done);
        store.reset();

        store.state$.subscribe(state => {
            expect(state.originalImage).toBeNull();
            expect(state.enhancedImage).toBeNull();
            expect(state.processStep).toBe(ProcessStep.Initial);
            done();
        })
    });

    it('should processImage successfully', (done) => {
        const uploadedImage = "uploadedImage.jpg";
        const enhancedImage = "enhancedImage.jpg";

        imageApiServiceMock.upload.and.returnValue(of(uploadedImage));
        imageApiServiceMock.enhance.and.returnValue(of(enhancedImage));

        store.setOriginalImage("originalImage.jpg");

        store.processImage().subscribe({
            next: (result) => {
                expect(result).toBe(enhancedImage);
                store.processStep$.subscribe(step => {
                    expect(step).toBe(ProcessStep.Done);
                    done();
                });
            },
            error: () => {
                fail("Should not emit error");
                done();
            }
        })
    });

    it('should processImage with an error', (done) => {
        imageApiServiceMock.upload.and.returnValue(throwError(() => { throw new Error("") }));

        store.setOriginalImage("originalImage.jpg");

        store.processImage().subscribe({
            next: () => {
                fail("Should not emit success");
                done();
            },
            error: () => {
                store.processStep$.subscribe(step => {
                    expect(step).toBe(ProcessStep.Error);
                    done();
                });
            }
        })
    });

    it('should apply filters and update enhanced image', (done) => {
        const filters = { brigthness: 0.1, contrast: 0.7 }
        const enhancedImage = "enhancedImage.jpg";

        imageApiServiceMock.applyFilters.and.returnValue(of(enhancedImage));
        store.setOriginalImage("originalImage.jpg");

        store.applyFilters(filters).subscribe({
            next: (result) => {
                expect(result).toBe(enhancedImage);
                store.filters$.subscribe((filters) => {
                    expect(filters).toEqual(filters);
                    done();
                })
            },
            error: () => {
                fail("Should not emit error");
                done();
            }
        })
    });

    it('should throw error if there is no original image', (done) => {
        const filters = { brigthness: 0.1, contrast: 0.7 }
        store.setOriginalImage(null);

        store.applyFilters(filters).subscribe({
            next: () => {
                fail("Should not emit success");
                done();
            },
            error: (error) => {
                expect(error.message).toBe("No image found");
                done();
            }
        })
    });
});
