import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FilterComponent } from './filter.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent, TranslateTestModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Slider type', () => {
    beforeEach(() => {
      component.filter = {
        id: 'slider',
        type: 'slider',
        name: 'Slider Filter',
        minValue: 0,
        maxValue: 10,
        step: 1,
        valueBuilder: (v: number) => `Value: ${v}`
      };

      component.form = new FormGroup({
        slider: new FormControl(0.5),
        button: new FormControl('1')
      });

      fixture.detectChanges();
    });

    it('should render slider', () => {
      const slider = fixture.debugElement.query(By.css('mat-slider'));
      expect(slider).toBeTruthy();
    });

    it('should display formatted value', () => {
      const value = fixture.debugElement.query(By.css('.filter-value'));
      expect(value.nativeElement.textContent).toContain('Value: 0.5');
    });

    it('should return control value', () => {
      expect(component.getControlValue('slider')).toBe(0.5);
    });

    it('should return formatted filter value', () => {
      const result = component.getFilterValue(component.filter, 5);
      expect(result).toBe('Value: 5');
    });

    it('should not render slider if control does not exist', () => {
      const newFilter = {
        id: 'not-exist',
        type: 'slider',
        name: 'Invalid'
      };

      const newForm = new FormGroup({});

      fixture.componentRef.setInput('filter', newFilter);
      fixture.componentRef.setInput('form', newForm);

      fixture.detectChanges();

      const slider = fixture.debugElement.query(By.css('mat-slider'));
      expect(slider).toBeNull();
    });
  });

  describe('Button type', () => {
    beforeEach(() => {
      component.filter = {
        id: 'button',
        type: 'button',
        name: 'Button Filter',
        values: [
          { id: '1', name: 'One', image: 'one.png' },
          { id: '2', name: 'Two', image: 'two.png' }
        ]
      };

      component.form = new FormGroup({
        button: new FormControl('1')
      });

      fixture.detectChanges();
    });

    it('should render button group', () => {
      const buttons = fixture.debugElement.queryAll(By.css('.filter-button'));
      expect(buttons.length).toBe(2);
    });

    it('should update form value when radio selected', () => {
      const radioInputs = fixture.debugElement.queryAll(By.css('input[type="radio"]'));

      radioInputs[1].nativeElement.click();
      fixture.detectChanges();

      expect(component.form.get('button')?.value).toBe('2');
    });

    it('should not render button group if values is null', () => {
      const newFilter = {
        id: 'button',
        type: 'button',
        name: 'Button Filter',
        values: null
      };

      const newForm = new FormGroup({
        button: new FormControl('1')
      });

      fixture.componentRef.setInput('filter', newFilter);
      fixture.componentRef.setInput('form', newForm);

      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.css('.filter-button'));
      expect(buttons.length).toBe(0);
    });
  });

  describe('Toggle type', () => {
    beforeEach(() => {
      component.filter = {
        id: 'toggle',
        type: 'toggle',
        name: 'Toggle Filter'
      };

      component.form = new FormGroup({
        toggle: new FormControl(false)
      });

      fixture.detectChanges();
    });

    it('should render toggle', () => {
      const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
      expect(toggle).toBeTruthy();
    });

    it('should not render toggle if control does not exist', () => {
      const newFilter = {
        id: 'missingToggle',
        type: 'toggle',
        name: 'Missing Toggle'
      };

      const newForm = new FormGroup({});

      fixture.componentRef.setInput('filter', newFilter);
      fixture.componentRef.setInput('form', newForm);

      fixture.detectChanges();

      const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
      expect(toggle).toBeNull();
    });
  });
});