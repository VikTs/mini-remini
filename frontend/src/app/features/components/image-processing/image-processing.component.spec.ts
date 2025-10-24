import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { ImageProcessingComponent } from './image-processing.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';
import { ProcessStep } from '../../../store/image/image-state.model';
import { ImageStore } from '../../../store/image/image-store';
import { ActivatedRoute, Router } from '@angular/router';

describe('ImageProcessingComponent', () => {
  let component: ImageProcessingComponent;
  let fixture: ComponentFixture<ImageProcessingComponent>;
  let processStep$: BehaviorSubject<ProcessStep>;
  let imageStoreMock: jasmine.SpyObj<ImageStore>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    processStep$ = new BehaviorSubject<ProcessStep>(ProcessStep.Initial);
    imageStoreMock = jasmine.createSpyObj('ImageStore', ['processImage'], { processStep$ });
    imageStoreMock.processImage.and.returnValue(of("image"));
    routerMock = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [
        ImageProcessingComponent,
        TranslateTestModule,
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: {} },
        { provide: ImageStore, useValue: imageStoreMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Uploading step text', () => {
    processStep$.next(ProcessStep.Uploading);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain("processing.uploading.title");
  });

  it('should display Enhancing step text', () => {
    processStep$.next(ProcessStep.Enhancing);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain("processing.enhancing.title");
  });

  it('should display Done step text', () => {
    processStep$.next(ProcessStep.Done);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain("processing.done.title");
  });

  it('should display Error state with retry and home buttons', () => {
    processStep$.next(ProcessStep.Error);
    fixture.detectChanges();

    const retryButton = fixture.debugElement.query(By.css('.btn.primary')).nativeElement;
    const homeButton = fixture.debugElement.query(By.css('.btn.secondary')).nativeElement;

    expect(retryButton.textContent).toContain("common.retry");
    expect(homeButton.textContent).toContain("common.home");
  });

  it('should call processImage() when click on retry button', () => {
    processStep$.next(ProcessStep.Error);
    fixture.detectChanges();

    const spy = spyOn(component, 'processImage');
    const retryButton = fixture.debugElement.query(By.css('.btn.primary')).nativeElement;
    retryButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call imageStore.processImage and navigate', () => {
    component.processImage();

    expect(imageStoreMock.processImage).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(["/result"]);
  });
});
