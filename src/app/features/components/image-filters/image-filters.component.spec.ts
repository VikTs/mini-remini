import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ImageFiltersComponent } from './image-filters.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';
import { ImageStore } from '../../../store/image/image-store';
import { DialogService } from '../../../shared/services/dialog.service';

describe('ImageFiltersComponent', () => {
    let component: ImageFiltersComponent;
    let fixture: ComponentFixture<ImageFiltersComponent>;
    let imageStoreMock: jasmine.SpyObj<ImageStore>;
    let dialogServiceMock: jasmine.SpyObj<DialogService>;

    const defaultFilters = {
        sepia: 0,
        grayscale: 0,
        brightness: 1,
        contrast: 1,
    };

    beforeEach(async () => {
        imageStoreMock = jasmine.createSpyObj<ImageStore>("ImageStore", ["applyFilters"], {
            filters$: of(defaultFilters),
            isApplyingFilters$: of(false)
        });
        dialogServiceMock = jasmine.createSpyObj<DialogService>("DialogService", ["openErrorDialog"]);

        await TestBed.configureTestingModule({
            imports: [ImageFiltersComponent, TranslateTestModule],
            providers: [
                { provide: ImageStore, useValue: imageStoreMock },
                { provide: DialogService, useValue: dialogServiceMock },
                FormBuilder
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImageFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form', () => {
        expect(component.form).toBeTruthy();
        expect(Object.keys(component.form.controls)).toEqual(Object.keys(defaultFilters));
    });

    it('should render all the filters from the defaultFilters', () => {
        const filterSliders = fixture.debugElement.queryAll(By.css('.filter-slider'));
        const defaultFiltersList = Object.keys(defaultFilters);

        expect(filterSliders.length).toBe(defaultFiltersList.length);
    });

    it('should call applyFilters when apply button is clicked', () => {
        imageStoreMock.applyFilters.and.returnValue(of(null));
        component.form.get("sepia")?.setValue(1);
        fixture.detectChanges();

        const applyButton = fixture.debugElement.query(By.css('button'));
        applyButton.nativeElement.click();

        expect(imageStoreMock.applyFilters).toHaveBeenCalledWith(component.form.value);
    });

    it('should disable apply button when isApplyingFilters is true', (done) => {
        component.isDisabled$.subscribe({
            next: () => {
                const applyButton = fixture.debugElement.query(By.css('button')).nativeElement;
                expect(applyButton.disabled).toBeTrue();
                done();
            }
        });
    });

    it('should enable apply button when form value is changes', (done) => {
        component.form.get("sepia")?.setValue(1);
        fixture.detectChanges();
        component.isDisabled$.subscribe({
            next: () => {
                const applyButton = fixture.debugElement.query(By.css('button')).nativeElement;
                expect(applyButton.disabled).toBeFalse();
                done();
            }
        });
    });

    it('should open error dialog when applyFilters fails', () => {
        imageStoreMock.applyFilters.and.returnValue(throwError(() => { throw new Error("") }));
        component.form.get("sepia")?.setValue(1);
        fixture.detectChanges();

        const applyButton = fixture.debugElement.query(By.css('button'));
        applyButton.nativeElement.click();

        expect(dialogServiceMock.openErrorDialog).toHaveBeenCalled();
    });
});
