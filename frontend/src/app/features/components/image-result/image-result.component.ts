import { Component, effect, signal, Signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { ImageStore } from '../../../store/image/image-store';
import { ImageUtils } from '../../../shared/utils/image.utils';
import { ImageUploadService } from '../../services/image-upload.service';
import { ImageComparisonComponent } from '../image-comparison/image-comparison.component';
import { ImageFiltersComponent } from "../image-filters/image-filters.component";

@Component({
  selector: 'app-image-result',
  standalone: true,
  imports: [
    CommonModule,
    ImageComparisonComponent,
    ImageFiltersComponent,
    MatProgressSpinnerModule,
    RouterModule,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './image-result.component.html',
  styleUrl: './image-result.component.scss'
})
export class ImageResultComponent {
  resultImage: Signal<string | null>;
  imageDimensions: WritableSignal<{ width: number; height: number } | null> = signal(null);

  constructor(
    private imageStore: ImageStore,
    private imageUploadService: ImageUploadService
  ) {
    this.resultImage = toSignal(this.imageStore.enhancedImage$, { initialValue: null });

    effect(async () => {
      const image = this.resultImage();
      if (!image) {
        this.imageDimensions.set(null);
        return;
      }

      const dims = await firstValueFrom(ImageUtils.getImageDimensions(image));
      this.imageDimensions.set(dims);
    });
  }

  onUploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.imageUploadService.handleImageUpload(file);
    input.value = "";
  }
}
