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
            filters$: of({
                sepia: 1,
            })
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

    it('should get correct filter string from filters$', (done) => {
        component.afterImageFilter$.subscribe({
            next: (filterStr) => {
                expect(filterStr).toBe("sepia(1)");
                done();
            }
        })
    });

    it('should render image-slider component', () => {
        const slider = fixture.nativeElement.querySelector("app-image-slider");
        expect(slider).toBeTruthy();
    });

    it('getFilterAsString should format string correctly', () => {
        const filters = { sepia: 1, contrast: 0.8};
        const result = component.getFilterAsString(filters);
        expect(result).toBe("sepia(1) contrast(0.8)");
    });
});
