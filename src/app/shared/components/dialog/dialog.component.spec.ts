import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { TranslateTestModule } from '../../../testing/translate-test.module';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent, TranslateTestModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: "dialog.title", message: "dialog.message" }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and message', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.querySelector("h2")?.textContent).toContain("dialog.title");
    expect(nativeElement.querySelector("mat-dialog-content")?.textContent).toContain("dialog.message");
  });
});
