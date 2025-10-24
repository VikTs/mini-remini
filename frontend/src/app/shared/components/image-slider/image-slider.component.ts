import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-image-slider',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  @Input() beforeImage: string | null = null;
  @Input() afterImage: string | null = null;
  @Input() isLoading: boolean | null = false;
  @Input() imageObjectFit = "contain";

  sliderValue = 50;
  sliderThumbDiameter = 30;

  constructor(private elRef: ElementRef) { }

  get clipPath(): string {
    const rightPercent = 100 - this.sliderValue;
    return `inset(0 ${rightPercent}% 0 0)`;
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (this.isLoading) return;

    let clientX;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
    } else {
      clientX = event.touches[0].clientX;
    }

    const container = this.elRef.nativeElement.querySelector('.container');
    const rect = container.getBoundingClientRect();

    const offsetX = clientX - rect.left;
    const persent = (offsetX / rect.width) * 100;

    // Prevent the thumb from extending beyong the container
    const minPersent = (this.sliderThumbDiameter * 0.5 / rect.width) * 100;
    const maxPersent = 100 - minPersent;

    this.sliderValue = Math.max(minPersent, Math.min(maxPersent, persent));
  }
}
