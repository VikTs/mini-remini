import { Component, OnInit } from '@angular/core';
import { ImageComparisonComponent } from '../image-comparison/image-comparison.component';
import { filter, Observable, switchMap } from 'rxjs';
import { ImageFiltersComponent } from "../image-filters/image-filters.component";
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageStore } from '../../../store/image/image-store';
import { ImageUtils } from '../../../shared/utils/image.utils';
import { ImageUploadService } from '../../services/image-upload.service';
import { RouterModule } from '@angular/router';

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
export class ImageResultComponent implements OnInit {
  imageDimentions$!: Observable<{ width: number, height: number } | null>

  constructor(
    private imageStore: ImageStore,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit(): void {
    this.imageDimentions$ = this.imageStore.enhancedImage$.pipe(
      filter((image) => !!image),
      switchMap((image) => ImageUtils.getImageDimensions(image!))
    )
  }

  onUploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    this.imageUploadService.handleImageUpload(file);
    input.value = "";
  }
}
