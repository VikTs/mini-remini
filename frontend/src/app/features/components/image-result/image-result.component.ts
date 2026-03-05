import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
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
  private imageStore = inject(ImageStore);

  resultImage = this.imageStore.enhancedImage;
  imageDimensions: WritableSignal<{ width: number; height: number } | null> = signal(null);

  constructor(
    private imageUploadService: ImageUploadService
  ) {
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
