import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageStore } from '../../../store/image/image-store';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';

@Component({
  selector: 'app-image-comparison',
  standalone: true,
  imports: [
    MatIconModule,
    ImageSliderComponent
  ],
  templateUrl: './image-comparison.component.html',
  styleUrl: './image-comparison.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComparisonComponent {
  readonly imageStore = inject(ImageStore);

  readonly beforeImage = this.imageStore.originalImage;
  readonly afterImage = this.imageStore.enhancedImage;
  readonly isLoading = this.imageStore.isApplyingFilters;
}