import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ImageComparisonComponent } from './image-comparison.component';
import { ImageStore } from '../../../store/image/image-store';
import { TranslateTestModule } from '../../../testing/translate-test.module';

describe('ImageComparisonComponent', () => {
    let component: ImageComparisonComponent;
    let fixture: ComponentFixture<ImageComparisonComponent>;
    let imageStoreMock: Partial<{
        originalImage: jasmine.Spy<() => string | null>;
        enhancedImage: jasmine.Spy<() => string | null>;
        filters: jasmine.Spy<() => any>;
        isApplyingFilters: jasmine.Spy<() => boolean>;
    }>;

    beforeEach(async () => {
        imageStoreMock = {
            originalImage: jasmine.createSpy('originalImage').and.returnValue('data:image/png'),
            enhancedImage: jasmine.createSpy('enhancedImage').and.returnValue('data:image/png'),
            filters: jasmine.createSpy('filters').and.returnValue({ sepia: 1 }),
            isApplyingFilters: jasmine.createSpy('isApplyingFilters').and.returnValue(false),
        };

        await TestBed.configureTestingModule({
            imports: [ImageComparisonComponent, TranslateTestModule],
            providers: [{ provide: ImageStore, useValue: imageStoreMock }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImageComparisonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render image-slider component', () => {
        const slider = fixture.nativeElement.querySelector("app-image-slider");
        expect(slider).toBeTruthy();
    });
});
