import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs';
import { isEqual } from 'lodash-es';
import { ImageStore } from '../../../store/image/image-store';
import { DialogService } from '../../../shared/services/dialog.service';
import { filtersConfig } from '../../models/image-filters.constant';
import { FilterGroupComponent } from '../filter-group/filter-group.component';

@Component({
  selector: 'app-image-filters',
  imports: [
    CommonModule,
    FormsModule,
    FilterGroupComponent,
    MatCardModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './image-filters.component.html',
  styleUrl: './image-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageFiltersComponent {
  form!: FormGroup;
  isDisabled!: Signal<boolean>;
  resultImage: Signal<string | null>;
  filtersConfig = filtersConfig;

  constructor(
    private imageStore: ImageStore,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) {
    this.resultImage = toSignal(this.imageStore.enhancedImage$, { initialValue: null });
    this.initForm();
  }

  initForm(): void {
    const isApplyingFilters = toSignal(this.imageStore.isApplyingFilters$, { initialValue: false });
    const storeFilters = toSignal(this.imageStore.filters$, { initialValue: {} });
    
    this.form = this.fb.group(storeFilters());
    const formValue = toSignal(
      this.form.valueChanges,
      { initialValue: this.form.value }
    );

    this.isDisabled =
      computed(() =>
        isApplyingFilters() || isEqual(storeFilters(), formValue()));
  }

  applyFilters(): void {
    if (!this.form.valid) return;

    this.imageStore.applyFilters(this.form.value)
      .pipe(take(1))
      .subscribe({
        error: () => {
          this.dialogService.openErrorDialog();
        }
      });
  }
}
