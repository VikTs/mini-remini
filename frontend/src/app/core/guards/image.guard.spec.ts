import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ImageGuard } from './image.guard'
import { ImageStore } from '../../store/image/image-store';

describe('ImageGuard', () => {
    let guard: ImageGuard;
    let routerMock: jasmine.SpyObj<Router>;
    let imageStoreMock: jasmine.SpyObj<ImageStore>;

    beforeEach(async () => {
        routerMock = jasmine.createSpyObj("Router", ["navigate"]);
        imageStoreMock = jasmine.createSpyObj("ImageApiService", ["select"]);

        await TestBed.configureTestingModule({
            providers: [
                ImageGuard,
                {
                    provide: ImageStore,
                    useValue: imageStoreMock
                },
                {
                    provide: Router,
                    useValue: routerMock
                }],
        })
            .compileComponents();

        guard = TestBed.inject(ImageGuard);
    });

    it('should allow navigation if both originalImage and enhancedImage are set', async () => {
        imageStoreMock.select.and.returnValue(of(true));
        const result = await guard.canActivate();

        expect(result).toBeTrue();
        expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should block navigation and redirect if images are missing', async () => {
        imageStoreMock.select.and.returnValue(of(false));
        const result = await guard.canActivate();

        expect(result).toBeFalse();
        expect(routerMock.navigate).toHaveBeenCalledWith(["/"]);
    });
});
