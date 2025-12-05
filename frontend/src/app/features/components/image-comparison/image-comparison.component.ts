import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageStore } from '../../../store/image/image-store';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-image-comparison',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ImageSliderComponent
  ],
  templateUrl: './image-comparison.component.html',
  styleUrl: './image-comparison.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComparisonComponent {
  isLoading: Signal<boolean>;
  beforeImage: Signal<string | null>;
  afterImage: Signal<string | null>;

  constructor(private imageStore: ImageStore) {
    this.beforeImage = toSignal(this.imageStore.originalImage$, { initialValue: null });
    this.afterImage = toSignal(this.imageStore.enhancedImage$, { initialValue: null });
    this.isLoading = toSignal(this.imageStore.isApplyingFilters$, { initialValue: false });
  }
}
