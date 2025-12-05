import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessStep } from '../../../store/image/image-state.model';
import { ImageStore } from '../../../store/image/image-store';

@Component({
  selector: 'app-image-processing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './image-processing.component.html',
  styleUrl: './image-processing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageProcessingComponent implements OnInit {
  ProcessStepEnum = ProcessStep;
  currentStep: Signal<ProcessStep>;

  constructor(private imageStore: ImageStore, private router: Router) {
    this.currentStep = toSignal(this.imageStore.processStep$, { initialValue: ProcessStep.Initial });
  }

  ngOnInit(): void {
    this.processImage();
  }

  processImage(): void {
    this.imageStore.processImage()
      .pipe(take(1))
      .subscribe({
        next: (image) => {
          if (image) { this.router.navigate(["/result"]); }
        },
      });
  }
}
