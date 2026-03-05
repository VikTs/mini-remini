import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  private imageStore = inject(ImageStore);
  ProcessStepEnum = ProcessStep;
  currentStep = this.imageStore.processStep;

  constructor(private router: Router) { }

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
