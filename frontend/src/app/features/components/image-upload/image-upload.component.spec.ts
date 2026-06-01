import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { ImageStore } from '../../../store/image/image-store';
import { TranslateTestModule } from '../../../testing/translate-test.module';
import { ImageUploadComponent } from './image-upload.component';
import { ImageUploadService } from '../../services/image-upload.service';

describe('ImageUpload', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;

  let imageStoreMock: {
    reset: jasmine.Spy;
    setOriginalImage: jasmine.Spy;
    setEnhancedImage: jasmine.Spy;
    originalImage: ReturnType<typeof signal<string | null>>;
    enhancedImage: ReturnType<typeof signal<string | null>>;
  };

  let imageUploadServiceMock: jasmine.SpyObj<ImageUploadService>;

  beforeEach(async () => {
    imageStoreMock = {
      reset: jasmine.createSpy('reset'),
      setOriginalImage: jasmine.createSpy('setOriginalImage'),
      setEnhancedImage: jasmine.createSpy('setEnhancedImage'),
      originalImage: signal<string | null>(null),
      enhancedImage: signal<string | null>(null),
    };

    imageUploadServiceMock = jasmine.createSpyObj(
      'ImageUploadService',
      ['handleImageUpload']
    );

    await TestBed.configureTestingModule({
      imports: [
        ImageUploadComponent,
        TranslateTestModule,
      ],
      providers: [
        {
          provide: ImageStore,
          useValue: imageStoreMock,
        },
        {
          provide: ImageUploadService,
          useValue: imageUploadServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reset in ngOnInit', () => {
    component.ngOnInit();

    expect(imageStoreMock.reset).toHaveBeenCalled();
  });

  it('should call handleImageUpload', () => {
    const fileMock = new File(['content'], 'test.png', {
      type: 'image/png',
    });

    const input = document.createElement('input');
    input.type = 'file';

    Object.defineProperty(input, 'files', {
      value: [fileMock],
    });

    const event = {
      target: input,
    } as unknown as Event;

    component.onUploadImage(event);

    expect(imageUploadServiceMock.handleImageUpload)
      .toHaveBeenCalledWith(fileMock);
  });
});