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
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;

    component.filter = {
      id: "1",
      type: "slider",
      name: "filterName",
      valueBuilder: () => ""
    }

    component.form = new FormGroup({
      "1": new FormControl(),
      "2": new FormControl()
    })

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show slider', () => {
    component.filter = {
      id: "1",
      type: "slider",
      name: "filterName",
      valueBuilder: () => ""
    }

    fixture.detectChanges();

    const slider = fixture.debugElement.query(By.css('mat-slider'))
    expect(slider).toBeTruthy();
  });

  it('should show slider', () => {
    component.filter = {
      id: "2",
      type: "radio",
      values: ["value1", "value2"],
      name: "filterName",
      valueBuilder: () => ""
    }

    fixture.detectChanges();

    const radioBtns = fixture.debugElement.queryAll(By.css('mat-radio-button'))
    expect(radioBtns.length).toBe(2);
  });
});
