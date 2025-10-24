import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ImageStore } from '../../../store/image/image-store';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';

@Component({
  selector: 'app-image-comparison',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ImageSliderComponent
  ],
  templateUrl: './image-comparison.component.html',
  styleUrl: './image-comparison.component.scss'
})
export class ImageComparisonComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  beforeImage$!: Observable<string | null>;
  afterImage$!: Observable<string | null>;

  constructor(private imageStore: ImageStore) { }

  ngOnInit(): void {
    this.beforeImage$ = this.imageStore.originalImage$;
    this.afterImage$ = this.imageStore.enhancedImage$;
    this.isLoading$ = this.imageStore.isApplyingFilters$;
  }
}
