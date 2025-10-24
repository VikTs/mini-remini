import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageSliderComponent } from './image-slider.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSliderComponent, TranslateTestModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    component.beforeImage = "data:image/png";
    component.afterImage = "data:image/png";
    component.sliderValue = 30;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render images with the correct sources', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(2);

    const beforeImage = images[0].nativeElement as HTMLImageElement;
    const afterImage = images[1].nativeElement as HTMLImageElement;

    expect(beforeImage.src).toContain('data:image/png');
    expect(afterImage.src).toContain('data:image/png');
  });

  it('should apply clipPath to before image', () => {
    const beforeImage = fixture.debugElement.query(By.css('img.before')).nativeElement;
    expect(beforeImage.style.clipPath).toBe("inset(0px 70% 0px 0px)");
  });

  it('should move slider line to sliderValue', () => {
    const sliderLine = fixture.debugElement.query(By.css('.slider-line')).nativeElement;
    expect(sliderLine.style.left).toBe("30%");
  });

  it('should show loading section when isApplyingFilters is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingSection = fixture.debugElement.query(By.css('.loading-section'));
    const matSpinner = fixture.debugElement.query(By.css('mat-spinner'));

    expect(loadingSection).toBeTruthy();
    expect(matSpinner).toBeTruthy();
  });

  it('should hide loading section when isApplyingFilters is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const loadingSection = fixture.debugElement.query(By.css('.loading-section'));
    const matSpinner = fixture.debugElement.query(By.css('mat-spinner'));

    expect(loadingSection).toBeFalsy();
    expect(matSpinner).toBeFalsy();
  });

  it('should update sliderValue on mouse drag', () => {
    component.isLoading = false;

    const containerEl = fixture.debugElement.query(By.css('.container')).nativeElement;
    containerEl.getBoundingClientRect = () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 200,
      width: 200,
      height: 100
    });

    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100
    });

    containerEl.dispatchEvent(mouseEvent);
    fixture.detectChanges();

    expect(component.sliderValue).toBe(50);
  });
});
