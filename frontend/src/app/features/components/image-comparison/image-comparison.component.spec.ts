import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ImageComparisonComponent } from './image-comparison.component';
import { ImageStore } from '../../../store/image/image-store';
import { TranslateTestModule } from '../../../testing/translate-test.module';

describe('ImageComparisonComponent', () => {
    let component: ImageComparisonComponent;
    let fixture: ComponentFixture<ImageComparisonComponent>;
    let imageStoreMock: jasmine.SpyObj<ImageStore>;

    beforeEach(async () => {
        imageStoreMock = jasmine.createSpyObj<ImageStore>("ImageStore", [], {
            enhancedImage$: of('data:image/png'),
            originalImage$: of('data:image/png'),
            filters$: of({
                sepia: 1,
            }),
            isApplyingFilters$: of(false)
        });

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
