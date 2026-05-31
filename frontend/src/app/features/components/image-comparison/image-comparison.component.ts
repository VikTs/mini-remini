import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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

  readonly imageObjectFit = input<string>("contain");
  readonly beforeImage = input<string | null>(null);
  readonly afterImage = input<string | null>(null);
  readonly isLoading = input<boolean>(false);
}