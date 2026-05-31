import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadDirective } from '../../../core/directives/image-upload.directive';
import { ImageUploadService } from '../../services/image-upload.service';
import { ImageStore } from '../../../store/image/image-store';
import { ImageComparisonComponent } from '../image-comparison/image-comparison.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    ImageUploadDirective,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    ImageComparisonComponent,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent implements OnInit {
  readonly imageStore = inject(ImageStore);

  constructor(
    private imageUploadService: ImageUploadService,
  ) { }

  ngOnInit(): void {
    this.imageStore.reset();
  }

  onUploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.imageUploadService.handleImageUpload(file);
    input.value = '';
  }
}