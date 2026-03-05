import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FilterConfig } from '../../models/image-filters.model';

@Component({
  selector: 'app-filter',
  imports: [
    TranslateModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {
  @Input() filter!: FilterConfig;
  @Input() form!: FormGroup;

  getControlValue(name: string): number {
    return this.form.get(name)?.value ?? 0;
  }

  getFilterValue(filter: FilterConfig, value: number): string {
    return filter.valueBuilder?.(value) || "";
  }
}
