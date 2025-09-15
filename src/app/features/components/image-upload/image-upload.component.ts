import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ImageStore } from '../../../store/image/image-store';
import { ImageSliderComponent } from '../../../shared/components/image-slider/image-slider.component';
import { ImageUploadDirective } from '../../../core/directives/image-upload.directive';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    ImageUploadDirective,
    ImageSliderComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent implements OnInit {
  demoImagePath = "images/demo.jpg";
  demoImageFilter = "contrast(1.4)";

  constructor(
    private imageStore: ImageStore,
    private imageUploadService: ImageUploadService,
  ) { }

  ngOnInit(): void {
    this.imageStore.reset();
  }

  onUploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    this.imageUploadService.handleImageUpload(file);
    input.value = "";
  }
}
