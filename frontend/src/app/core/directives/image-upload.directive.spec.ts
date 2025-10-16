import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ImageUploadDirective } from './image-upload.directive';
import { ImageUtils } from '../../shared/utils/image.utils'
import { ImageStore } from '../../store/image/image-store';
import { ImageUploadService } from '../../features/services/image-upload.service';

@Component({
    selector: 'test-drop-zone',
    standalone: true,
    template: `
    <div appImageUpload>
        <div class="drop-zone"></div>
    </div>`,
    imports: [ImageUploadDirective]
})
class TestDropZoneComponent { }

describe('ImageUploadDirective', () => {
    let directiveEl: DebugElement;
    let directiveInstance: ImageUploadDirective;
    let fixture: ComponentFixture<TestDropZoneComponent>;
    let imageUploadServiceMock: jasmine.SpyObj<ImageUploadService>;
    let fileMock: File;

    beforeEach(async () => {
        imageUploadServiceMock = jasmine.createSpyObj("ImageUploadService", ["handleImageUpload"]);

        await TestBed.configureTestingModule({
            imports: [TestDropZoneComponent, ImageUploadDirective],
            providers: [{
                provide: ImageUploadService,
                useValue: imageUploadServiceMock
            }],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestDropZoneComponent);

        directiveEl = fixture.debugElement.query(By.directive(ImageUploadDirective));
        directiveInstance = directiveEl.injector.get(ImageUploadDirective);
        fileMock = new File([''], 'image.jpg');

        fixture.detectChanges();
    });

    it('should create the directive instance', () => {
        expect(directiveInstance).toBeTruthy();
    });

    it('should initialize drop zone element', () => {
        directiveInstance.ngAfterViewInit();
        expect(directiveInstance['dropZoneElement']).toBeTruthy();
    });

    it('should show drop zone on drag enter', () => {
        const spy = spyOn(directiveInstance, "toggleDropZone");
        const event = new DragEvent("dragenter");
        directiveEl.triggerEventHandler("dragenter", event);

        expect(directiveInstance.dragCounter).toBe(1);
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('should show hide zone on drag leave', () => {
        const spy = spyOn(directiveInstance, "toggleDropZone");
        directiveInstance.dragCounter = 1;

        const event = new DragEvent("dragleave");
        directiveEl.triggerEventHandler("dragleave", event);

        expect(directiveInstance.dragCounter).toBe(0);
        expect(spy).toHaveBeenCalledWith(false);
    });

    it('should handle drop', () => {
        const toggleDropZoneSpy = spyOn(directiveInstance, "toggleDropZone");
        spyOn(ImageUtils, "validateImageFile").and.returnValue(true);
        spyOn(ImageUtils, "convertFileToBase64").and.returnValue(of("base64"));
        directiveInstance.dragCounter = 5;

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(fileMock)

        const event = new DragEvent("drop", { dataTransfer });
        directiveEl.triggerEventHandler("drop", event);

        expect(directiveInstance.dragCounter).toBe(0);
        expect(toggleDropZoneSpy).toHaveBeenCalledWith(false);
        expect(imageUploadServiceMock.handleImageUpload).toHaveBeenCalledWith(fileMock);
    });

    it('toggleDropZone should call renderer.addClass with show=true', () => {
        const spy = spyOn(directiveInstance["renderer"], "addClass");
        directiveInstance.toggleDropZone(true);
        expect(spy).toHaveBeenCalled();
    });

    it('toggleDropZone should call renderer.removeClass with show=false', () => {
        const spy = spyOn(directiveInstance["renderer"], "removeClass");
        directiveInstance.toggleDropZone(false);
        expect(spy).toHaveBeenCalled();
    });
});
