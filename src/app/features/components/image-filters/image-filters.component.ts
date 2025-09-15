import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, map, Observable, startWith, take } from 'rxjs';
import { isEqual } from 'lodash';
import { MatExpansionModule } from '@angular/material/expansion';
import { filtersConfig } from '../../models/image-filters.model';
import { ImageStore } from '../../../store/image/image-store';
import { DialogService } from '../../../shared/services/dialog.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-filters',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSliderModule,
    TranslateModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './image-filters.component.html',
  styleUrl: './image-filters.component.scss'
})
export class ImageFiltersComponent implements OnInit {
  form!: FormGroup;
  isDisabled$!: Observable<boolean>;
  filtersConfig = filtersConfig;

  constructor(
    private imageStore: ImageStore,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.imageStore.filters$
      .pipe(take(1))
      .subscribe({
        next: (filters) => {
          this.form = this.fb.group(filters);
          this.setupIsDisabled();
        }
      });
  }

  setupIsDisabled(): void {
    const isApplyingFilters$ = this.imageStore.isApplyingFilters$;
    const storeFilters$ = this.imageStore.filters$;
    const formValue$ = this.form.valueChanges.pipe(startWith(this.form.value));

    this.isDisabled$ = combineLatest([isApplyingFilters$, storeFilters$, formValue$]).pipe(
      map(([isApplyingFilters, storeFilters, formValue]) =>
        isApplyingFilters || isEqual(storeFilters, formValue))
    )
  }

  getControlValue(name: string): number {
    return this.form.get(name)?.value ?? 0;
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
