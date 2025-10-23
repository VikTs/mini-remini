import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FilterGroupComponent } from './filter-group.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';

describe('FilterGroupComponent', () => {
  let component: FilterGroupComponent;
  let fixture: ComponentFixture<FilterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterGroupComponent, TranslateTestModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterGroupComponent);
    component = fixture.componentInstance;

    component.group = {
      name: "name",
      description: "description",
      icon: "icon",
      filters: [
        {
          id: "1",
          type: "slider",
          name: "filterName",
          valueBuilder: () => ""
        },
        {
          id: "2",
          type: "slider",
          name: "filterName",
          valueBuilder: () => ""
        }
      ]
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

  it('should render the necessary amount of filters', () => {
    const filters = fixture.debugElement.queryAll(By.css("app-filter"))
    expect(filters.length).toBe(2);
  });
});
