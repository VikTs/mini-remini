import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FilterConfig } from '../../models/image-filters.model';

@Component({
  selector: 'app-filter',
  imports: [
    CommonModule,
    TranslateModule,
    MatSliderModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  @Input() filter!: FilterConfig<any>;
  @Input() form!: FormGroup;

  getControlValue(name: string): number | string {
    return this.form.get(name)?.value ?? 0;
  }

  getFilterValue(filter: FilterConfig<any>, value: string | number): string {
    return filter.valueBuilder(value);
  }
}
