import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ImageStore } from '../../../store/image/image-store';
import { ImageUtils } from '../../../shared/utils/image.utils';
import { TranslateTestModule } from '../../../testing/translate-test.module';
import { ImageUploadComponent } from './image-upload.component';
import { ImageUploadService } from '../../services/image-upload.service';

describe('ImageUpload', () => {
    let component: ImageUploadComponent;
    let fixture: ComponentFixture<ImageUploadComponent>;
    let imageStoreMock: jasmine.SpyObj<ImageStore>;
    let imageUploadServiceMock: jasmine.SpyObj<ImageUploadService>;

    beforeEach(async () => {
        imageStoreMock = jasmine.createSpyObj("ImageStore", ["reset", "setOriginalImage"]);
        imageUploadServiceMock = jasmine.createSpyObj("ImageUploadService", ["handleImageUpload"]);

        await TestBed.configureTestingModule({
            imports: [ImageUploadComponent, TranslateTestModule],
            providers: [{
                provide: ImageStore,
                useValue: imageStoreMock
            },
            {
                provide: ImageUploadService,
                useValue: imageUploadServiceMock
            }]
        })
            .compileComponents();

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
