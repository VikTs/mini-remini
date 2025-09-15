import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { ImageUploadService } from "../../features/services/image-upload.service";

@Directive({
  selector: '[appImageUpload]',
  standalone: true,
})
export class ImageUploadDirective implements AfterViewInit {
  private dropZoneElement: HTMLElement | null = null;

  // Contains the number of file drags over the child elements
  dragCounter = 0;

  constructor(
    private imageUploadService: ImageUploadService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    this.dropZoneElement = this.el.nativeElement.querySelector('.drop-zone');
  }

  @HostListener('dragenter', ["$event"]) onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter++;
    this.toggleDropZone(true);
  }

  @HostListener('dragleave', ["$event"]) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter--;
    if (this.dragCounter == 0) {
      this.toggleDropZone(false);
    }
  }

  @HostListener('dragover', ["$event"]) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ["$event"]) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.dragCounter = 0;
    this.toggleDropZone(false);

    const file = event.dataTransfer?.files[0];
    this.imageUploadService.handleImageUpload(file);
  }

  toggleDropZone(show: boolean): void {
    if (!this.dropZoneElement) return;
    if (show) {
      this.renderer.addClass(this.dropZoneElement, 'visible');
    } else {
      this.renderer.removeClass(this.dropZoneElement, 'visible');
    }
  }
}
