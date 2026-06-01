import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ImageStore } from './image-store';
import { ImageApiService } from '../../features/services/image-api.service';

describe('ImageStore', () => {
    let store: InstanceType<typeof ImageStore>;
    let imageApiServiceMock: jasmine.SpyObj<ImageApiService>;

    beforeEach(() => {

        imageApiServiceMock = jasmine.createSpyObj('ImageApiService', [
            'upload',
            'applyFilters'
        ]);

        TestBed.configureTestingModule({
            providers: [
                ImageStore,
                {
                    provide: ImageApiService,
                    useValue: imageApiServiceMock
                }
            ]
        });

        store = TestBed.inject(ImageStore);

    });

    it('should have initial state', () => {

        expect(store.originalImage()).toBeNull();
        expect(store.enhancedImage()).toBeNull();
        expect(store.filters()).toEqual(jasmine.any(Object));

    });

    it('should set original image and reset state', () => {

        store.setOriginalImage('image.jpg');

        expect(store.originalImage()).toBe('image.jpg');
        expect(store.enhancedImage()).toBeNull();
        expect(store.filters()).toEqual(jasmine.any(Object));

    });

    it('should reset to initial state', () => {

        store.setOriginalImage('originalImage.jpg');
        store.setEnhancedImage('enhancedImage.jpg');

        store.reset();

        expect(store.originalImage()).toBeNull();
        expect(store.enhancedImage()).toBeNull();

    });

    it('should apply filters and update enhanced image', (done) => {

        const filters = { brightness: 0.1, contrast: 0.7 };
        const enhancedImage = 'enhancedImage.jpg';

        imageApiServiceMock.applyFilters.and.returnValue(of(enhancedImage));

        store.setOriginalImage('originalImage.jpg');

        store.applyFilters(filters).subscribe({
            next: (result: string | null) => {

                expect(result).toBe(enhancedImage);
                expect(store.filters()).toEqual(filters);
                expect(store.enhancedImage()).toBe(enhancedImage);

                done();
            },
            error: () => {
                fail('Should not emit error');
                done();
            }
        });

    });

    it('should throw error if there is no original image', (done) => {

        const filters = { brightness: 0.1, contrast: 0.7 };

        store.setOriginalImage(null);

        store.applyFilters(filters).subscribe({
            next: () => {
                fail('Should not emit success');
                done();
            },
            error: (error: Error) => {

                expect(error.message).toBe('No image found');

                done();
            }
        });

    });

});