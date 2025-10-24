import { TestBed } from '@angular/core/testing';
import { ImageUploadService } from './image-upload.service';
import { ImageStore } from '../../store/image/image-store';
import { DialogService } from '../../shared/services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUtils } from '../../shared/utils/image.utils';
import { of } from 'rxjs';

describe('ImageUploadService', () => {
    let service: ImageUploadService;
    let imageStoreMock: jasmine.SpyObj<ImageStore>;
    let dialogServiceMock: jasmine.SpyObj<DialogService>;
    let routerMock: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        imageStoreMock = jasmine.createSpyObj("ImageStore", ["setOriginalImage"]);
        dialogServiceMock = jasmine.createSpyObj<DialogService>("DialogService", ["openErrorDialog"]);
        routerMock = jasmine.createSpyObj("Router", ["navigate"]);

        spyOn(ImageUtils, "convertFileToBase64").and.callFake(() => of("base64"));
        spyOn(ImageUtils, "validateImageFile").and.callFake((file) => {
            if (file && file.name.endsWith(".jpg")) {
                return true;
            }
            return false;
        });

        await TestBed.configureTestingModule({
            providers: [
                ImageUploadService,
                { provide: ImageStore, useValue: imageStoreMock },
                { provide: DialogService, useValue: dialogServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: {} }
            ],
        })
            .compileComponents();

        service = TestBed.inject(ImageUploadService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should call setOriginalImage and navigate to /processing', () => {
        const fileMock = new File([''], 'image.jpg');
        service.handleImageUpload(fileMock);

        expect(imageStoreMock.setOriginalImage).toHaveBeenCalledWith("base64");
        expect(ImageUtils.validateImageFile).toHaveBeenCalledWith(fileMock);
        expect(ImageUtils.convertFileToBase64).toHaveBeenCalledWith(fileMock);
        expect(routerMock.navigate).toHaveBeenCalledWith(["/processing"]);
    });

    it('should open error dialog on invalid image upload', () => {
        const invalidFileMock = new File([''], 'text.txt', { type: "text/plain" });
        service.handleImageUpload(invalidFileMock);

        expect(imageStoreMock.setOriginalImage).not.toHaveBeenCalled();
        expect(ImageUtils.validateImageFile).toHaveBeenCalledWith(invalidFileMock);
        expect(dialogServiceMock.openErrorDialog).toHaveBeenCalledWith({
            title: "upload.upload_error.title",
            message: "upload.upload_error.message"
        });
        expect(routerMock.navigate).not.toHaveBeenCalled();
    });
});
