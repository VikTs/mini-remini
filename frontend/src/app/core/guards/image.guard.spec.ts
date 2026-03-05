import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ImageGuard } from './image.guard';
import { ImageStore } from '../../store/image/image-store';

describe('ImageGuard', () => {
  let guard: ImageGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let imageStoreMock: Partial<{
    originalImage: jasmine.Spy<() => string | null>;
    enhancedImage: jasmine.Spy<() => string | null>;
  }>;

  beforeEach(() => {

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    imageStoreMock = {
      originalImage: jasmine.createSpy('originalImage'),
      enhancedImage: jasmine.createSpy('enhancedImage')
    };

    TestBed.configureTestingModule({
      providers: [
        ImageGuard,
        { provide: ImageStore, useValue: imageStoreMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(ImageGuard);

  });

  it('should allow navigation if both originalImage and enhancedImage are set', async () => {
    imageStoreMock.originalImage! = jasmine.createSpy().and.returnValue('some-image.jpg');
    imageStoreMock.enhancedImage! = jasmine.createSpy().and.returnValue('enhanced.jpg');

    const result = await guard.canActivate();

    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should block navigation and redirect if images are missing', async () => {
    imageStoreMock.originalImage! = jasmine.createSpy().and.returnValue(null);
    imageStoreMock.enhancedImage! = jasmine.createSpy().and.returnValue(null);

    const result = await guard.canActivate();

    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

});