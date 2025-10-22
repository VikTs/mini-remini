import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageResultComponent } from './image-result.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';
import { ImageStore } from '../../../store/image/image-store';
import { DialogService } from '../../../shared/services/dialog.service';
import { ImageUtils } from '../../../shared/utils/image.utils';
import { ImageUploadService } from '../../services/image-upload.service';
import { By } from '@angular/platform-browser';

describe('ImageResultComponent', () => {
    let component: ImageResultComponent;
    let fixture: ComponentFixture<ImageResultComponent>;
    let imageStoreMock: jasmine.SpyObj<ImageStore>;
    let imageUploadServiceMock: jasmine.SpyObj<ImageUploadService>;

    beforeEach(async () => {
        spyOn(ImageUtils, "getImageDimensions").and.returnValue(of({ width: 600, height: 200 }))

        imageStoreMock = jasmine.createSpyObj("ImageStore", ["setOriginalImage"], {
            enhancedImage$: of("data:image/png"),
            originalImage$: of("data:image/png"),
            filters$: of({}),
            isApplyingFilters$: of(false)
        });
        imageUploadServiceMock = jasmine.createSpyObj("ImageUploadService", ["handleImageUpload"]);

        await TestBed.configureTestingModule({
            imports: [ImageResultComponent, TranslateTestModule],
            providers: [
                { provide: ImageStore, useValue: imageStoreMock },
                { provide: ImageUploadService, useValue: imageUploadServiceMock },
                { provide: ActivatedRoute, useValue: {} }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImageResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute imageDimentions$ from enhancedImage$', fakeAsync(() => {
        let result: any = null;
        component.imageDimentions$.subscribe((dimentions) => {
            result = dimentions;
        });
        tick();
        expect(result).toEqual({ width: 600, height: 200 });
    }));

    it('should trigger anchor click when download button is clicked', fakeAsync(() => {
        const testUrl = "data:image/png";
        component.resultImage$ = of(testUrl);
        fixture.detectChanges();

        const anchor = fixture.debugElement.query(By.css('.download-link'));
        const clickSpy = spyOn(anchor.nativeElement, 'click');

        const downloadButton = fixture.debugElement.query(By.css('.download-btn')).nativeElement;
        downloadButton.click();

        expect(clickSpy).toHaveBeenCalled();
    }));

    it('should call handleImageUpload', () => {
        const fileMock = new File([''], 'data:image/pn');
        const event = {
            target: {
                files: [fileMock]
            }
        } as unknown as Event;
        component.onUploadImage(event);

        expect(imageUploadServiceMock.handleImageUpload).toHaveBeenCalledWith(fileMock);
    });
});
