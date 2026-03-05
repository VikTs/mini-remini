import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  private imageStore = inject(ImageStore);

  form!: FormGroup;
  isDisabled!: Signal<boolean>;
  filtersConfig = filtersConfig;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  initForm(): void {
    const isApplyingFilters = this.imageStore.isApplyingFilters;
    const storeFilters = this.imageStore.filters;

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
